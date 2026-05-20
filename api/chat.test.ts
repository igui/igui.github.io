import { describe, it, expect, vi } from 'vitest';
import { IncomingMessage } from 'node:http';
import type { ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import handler from './chat';

vi.mock('@upstash/ratelimit', () => {
  class RatelimitClass {
    constructor() {}
    async limit() {
      return { success: true, limit: 10, reset: 0, remaining: 9 };
    }
  }
  // @ts-ignore
  RatelimitClass.slidingWindow = vi.fn();
  return { Ratelimit: RatelimitClass };
});

vi.mock('@upstash/redis', () => ({
  Redis: class {
    constructor() {}
  },
}));

vi.mock('openai', () => {
  const create = vi.fn(async () => {
    async function* gen() {
      yield { choices: [{ delta: { content: 'mocked-' } }] };
      yield { choices: [{ delta: { content: 'stream' } }] };
    }
    return gen();
  });
  return {
    default: class OpenAI {
      chat = { completions: { create } };
    },
  };
});

vi.mock('langsmith/wrappers', () => ({
  wrapOpenAI: <T>(client: T) => client,
}));

vi.mock('langsmith/traceable', () => ({
  traceable: <T extends (...args: any[]) => any>(fn: T) => fn,
}));

function makeReq(opts: { method?: string; body?: unknown; ip?: string }): IncomingMessage {
  const socket = new Socket();
  const req = new IncomingMessage(socket);
  req.method = opts.method ?? 'POST';
  req.url = '/api/chat';
  req.headers = { 'x-forwarded-for': opts.ip ?? '127.0.0.1' };

  if (opts.body !== undefined) {
    const payload = typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body);
    process.nextTick(() => {
      req.push(payload);
      req.push(null);
    });
  } else {
    process.nextTick(() => req.push(null));
  }
  return req;
}

function makeRes() {
  const chunks: Buffer[] = [];
  const headers: Record<string, string> = {};
  const res = {
    statusCode: 200,
    headersSent: false,
    setHeader(name: string, value: string | number) {
      headers[name] = String(value);
    },
    getHeader(name: string) {
      return headers[name];
    },
    write(chunk: string | Buffer) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      return true;
    },
    end(chunk?: string | Buffer) {
      if (chunk !== undefined) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      this.headersSent = true;
    },
  };
  return {
    res: res as unknown as ServerResponse,
    body: () => Buffer.concat(chunks).toString('utf8'),
    headers,
  };
}

describe('Chat API Handler', () => {
  it('returns 405 for non-POST requests', async () => {
    const req = makeReq({ method: 'GET' });
    const { res } = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('returns 400 for invalid payload', async () => {
    const req = makeReq({ body: { wrong: 'payload' } });
    const { res } = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 if latest message exceeds 300 characters', async () => {
    const longMessage = 'a'.repeat(301);
    const req = makeReq({ body: { messages: [{ role: 'user', content: longMessage }] } });
    const { res } = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('streams the model response for a valid request', async () => {
    const req = makeReq({ body: { messages: [{ role: 'user', content: 'hello' }] } });
    const { res, body } = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(body()).toBe('mocked-stream');
  });
});
