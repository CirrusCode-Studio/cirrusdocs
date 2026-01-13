import { PromptRequest } from './prompt-request.contract';
import { Answer } from './answer.contract';

export interface PromptEngine {
    generate(request: PromptRequest): Promise<Answer>;
}
