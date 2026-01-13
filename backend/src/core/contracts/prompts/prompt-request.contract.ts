import { PromptTemplate } from './prompt-template.contract';
import { PromptContext } from './prompt-context.contract';

export interface PromptRequest {
    template: PromptTemplate;
    context: PromptContext;

    model: string;
    temperature: number;
}
