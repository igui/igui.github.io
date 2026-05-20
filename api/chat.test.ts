import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  return {
    Ratelimit: RatelimitClass,
  };
});

vi.mock('@upstash/redis', () => {
  return {
    Redis: class {
      constructor() {}
      set() {}
      get() {}
    }
  };
});

vi.mock('@openrouter/ai-sdk-provider', () => {
  return {
    createOpenRouter: vi.fn().mockReturnValue((model: string) => model),
  };
});

vi.mock('ai', () => {
  return {
    streamText: vi.fn().mockReturnValue({
      toDataStreamResponse: vi.fn().mockReturnValue(new Response('mocked-stream', { status: 200 })),
    }),
  };
});

describe('Chat API Handler', () => {
  it('should return 405 for non-POST requests', async () => {
    const req = new Request('http://localhost/api/chat', { method: 'GET' });
    const res = await handler(req);
    expect(res.status).toBe(405);
  });

  it('should return 400 for invalid payload', async () => {
    const req = new Request('http://localhost/api/chat', { 
      method: 'POST',
      body: JSON.stringify({ wrong: 'payload' })
    });
    const res = await handler(req);
    expect(res.status).toBe(400);
  });

  it('should return 400 if latest message exceeds 300 characters', async () => {
    const longMessage = 'a'.repeat(301);
    const req = new Request('http://localhost/api/chat', { 
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: longMessage }] })
    });
    const res = await handler(req);
    expect(res.status).toBe(400);
  });

  it('should process valid request and return stream response', async () => {
    const req = new Request('http://localhost/api/chat', { 
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
      headers: new Headers({
        'x-forwarded-for': '127.0.0.1'
      })
    });
    const res = await handler(req);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBe('mocked-stream');
  });
});
