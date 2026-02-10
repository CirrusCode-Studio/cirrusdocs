import { CanonicalParsedDocument } from "@/core/contracts/parsing";
import { FusionDocument } from "./fusion-input.contract";

export class FusionContext {
    readonly warnings: string[] = [];

    constructor (
        readonly input: FusionDocument,
        readonly result: CanonicalParsedDocument,
    ) {}

    warn(message: string) {
        this.warnings.push(message);
    }
}