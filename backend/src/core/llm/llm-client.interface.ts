// src/core/llm/llm-client.interface.ts
export interface LLMClient {
    generate(prompt: string): Promise<string>;
}