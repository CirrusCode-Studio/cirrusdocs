export interface PromptTemplate {
    id: string;
    description?: string;

    systemPrompt: string;
    userPrompt: string;

    outputSchema: string; // instruction cho structured output
}
