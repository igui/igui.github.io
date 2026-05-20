import type { IncomingMessage, ServerResponse } from 'node:http';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { CHAT_MODEL } from './constants';
import fs from 'node:fs';
import path from 'node:path';
import { encoding_for_model } from 'tiktoken';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://dummy.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'dummy',
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '1 d'),
  analytics: true,
});

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

function readJsonBody<T = unknown>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve(body ? (JSON.parse(body) as T) : ({} as T));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function getHeader(req: IncomingMessage, name: string): string | undefined {
  const v = req.headers[name.toLowerCase()];
  return Array.isArray(v) ? v[0] : v;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  try {
    const ip = getHeader(req, 'x-forwarded-for') || '127.0.0.1';

    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { success, limit, reset, remaining } = await ratelimit.limit(`chat_${ip}`);

      if (!success) {
        res.statusCode = 429;
        res.setHeader('X-RateLimit-Limit', limit.toString());
        res.setHeader('X-RateLimit-Remaining', remaining.toString());
        res.setHeader('X-RateLimit-Reset', reset.toString());
        res.end('Rate limit exceeded. You can only send 10 messages per day.');
        return;
      }
    }

    let { messages } = await readJsonBody<{ messages: UIMessage[] }>(req);

    if (!messages || !Array.isArray(messages)) {
      res.statusCode = 400;
      res.end('Invalid payload');
      return;
    }

    const latestMessage = messages[messages.length - 1];
    if (latestMessage && getMessageText(latestMessage).length > 300) {
      res.statusCode = 400;
      res.end('Message exceeds the maximum limit of 300 characters.');
      return;
    }

    try {
      const enc = encoding_for_model('gpt-4');
      let totalTokens = 0;
      const keptMessages: UIMessage[] = [];

      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        const tokens = enc.encode(msg.role + ': ' + getMessageText(msg)).length;
        if (totalTokens + tokens <= 5000) {
          totalTokens += tokens;
          keptMessages.unshift(msg);
        } else {
          break;
        }
      }
      messages = keptMessages;
      enc.free();
    } catch (err) {
      console.error('Tokenization error:', err);
      let totalChars = 0;
      const keptMessages: UIMessage[] = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        const text = getMessageText(msg);
        if (totalChars + text.length <= 20000) {
          totalChars += text.length;
          keptMessages.unshift(msg);
        } else {
          break;
        }
      }
      messages = keptMessages;
    }

    const systemPromptPath = path.join(process.cwd(), 'api', 'system-prompt.txt');
    const systemPrompt = fs.readFileSync(systemPromptPath, 'utf8');

    const result = streamText({
      model: openrouter(CHAT_MODEL),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 500,
    });

    result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    console.error('Chat API Error:', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
}
