import { CanonicalParsedDocument } from "@/core/contracts/parsed-output";
import { FusionInput } from "./fusion-input";

export class FusionContext {
    readonly warnings: string[] = [];

    constructor (
        readonly input: FusionInput,
        readonly result: CanonicalParsedDocument,
    ) {}

    warn(message: string) {
        this.warnings.push(message);
    }
}