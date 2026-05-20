import { describe, it, expect } from 'vitest';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { CHAT_MODEL } from './constants';

dotenv.config();

describe('External Services Connection', () => {
  it('should connect to Upstash Redis using environment variables', async () => {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    expect(redisUrl).toBeDefined();
    expect(redisToken).toBeDefined();

    const redis = new Redis({
      url: redisUrl!,
      token: redisToken!,
    });

    const testKey = 'test_connection_key';
    const testValue = 'hello_upstash';

    await redis.set(testKey, testValue, { ex: 5 });
    const value = await redis.get(testKey);

    expect(value).toBe(testValue);
  });

  it('should connect to OpenRouter via the OpenAI client and generate a simple response', async () => {
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    expect(openRouterKey).toBeDefined();

    const openai = new OpenAI({
      apiKey: openRouterKey!,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    const response = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [{ role: 'user', content: 'Reply with exactly the word "pong".' }],
      max_tokens: 5,
    });

    expect(response.choices[0]?.message?.content?.toLowerCase()).toContain('pong');
  }, 30000);
});
