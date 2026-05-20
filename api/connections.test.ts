import { describe, it, expect } from 'vitest';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
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

    // Test the connection by setting and getting a test key
    const testKey = 'test_connection_key';
    const testValue = 'hello_upstash';

    await redis.set(testKey, testValue, { ex: 5 }); // Set with 5s expiration
    const value = await redis.get(testKey);
    
    expect(value).toBe(testValue);
  });

  it('should connect to OpenRouter and generate a simple response', async () => {
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    expect(openRouterKey).toBeDefined();

    const openrouter = createOpenRouter({
      apiKey: openRouterKey!,
    });

    // Send a very small ping-like request
    const response = await generateText({
      model: openrouter('deepseek/deepseek-v4-flash'),
      prompt: 'Reply with exactly the word "pong".',
      maxTokens: 5,
    });

    expect(response.text.toLowerCase()).toContain('pong');
  }, 30000); // Allow some time for the API call
});
