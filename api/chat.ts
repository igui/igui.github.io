import type { IncomingMessage, ServerResponse } from 'node:http';
import OpenAI from 'openai';
import { wrapOpenAI } from 'langsmith/wrappers';
import { traceable } from 'langsmith/traceable';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { CHAT_MODEL } from './constants';
import fs from 'node:fs';
import path from 'node:path';
import { encoding_for_model } from 'tiktoken';
import { profile, renderProfileForPrompt } from '../shared/content';

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

const openai = wrapOpenAI(
  new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
  }),
);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://dummy.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'dummy',
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '1 d'),
  analytics: true,
});

function getHeader(req: IncomingMessage, name: string): string | undefined {
  const v = req.headers[name.toLowerCase()];
  return Array.isArray(v) ? v[0] : v;
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

function trimToTokenBudget(messages: ChatMessage[], budget = 5000): ChatMessage[] {
  try {
    const enc = encoding_for_model('gpt-4');
    let total = 0;
    const kept: ChatMessage[] = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      const tokens = enc.encode(`${msg.role}: ${msg.content}`).length;
      if (total + tokens > budget) break;
      total += tokens;
      kept.unshift(msg);
    }
    enc.free();
    return kept;
  } catch (err) {
    console.error('Tokenization error:', err);
    let total = 0;
    const kept: ChatMessage[] = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (total + msg.content.length > budget * 4) break;
      total += msg.content.length;
      kept.unshift(msg);
    }
    return kept;
  }
}

const systemPromptTemplate = fs.readFileSync(
  path.join(process.cwd(), 'api', 'system-prompt.txt'),
  'utf8',
);

function buildSystemPrompt(): string {
  return systemPromptTemplate
    .replaceAll('{{name}}', profile.name)
    .replaceAll('{{email}}', profile.contact.email)
    .replaceAll('{{profile}}', renderProfileForPrompt(profile));
}

const chatPipeline = traceable(
  async function* (messages: ChatMessage[]) {
    const systemPrompt = buildSystemPrompt();

    const stream = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      max_tokens: 500,
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) yield delta;
    }
  },
  { name: 'Chat Pipeline', run_type: 'chain' },
);

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

    const body = await readJsonBody<{ messages: ChatMessage[] }>(req);
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.statusCode = 400;
      res.end('Invalid payload');
      return;
    }

    const latest = messages[messages.length - 1];
    if (typeof latest?.content !== 'string' || latest.content.length > 300) {
      res.statusCode = 400;
      res.end('Message exceeds the maximum limit of 300 characters.');
      return;
    }

    const trimmed = trimToTokenBudget(messages);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('X-Accel-Buffering', 'no');

    for await (const delta of chatPipeline(trimmed)) {
      res.write(delta);
    }
    res.end();
  } catch (error) {
    console.error('Chat API Error:', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      res.end();
    }
  }
}
