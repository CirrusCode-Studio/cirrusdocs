import { CanonicalParsedDocument } from "@/core/contracts/parsing";
import { FushionDocument } from "./fusion-input.contract";

export class FusionContext {
    readonly warnings: string[] = [];

    constructor (
        readonly input: FushionDocument,
        readonly result: CanonicalParsedDocument,
    ) {}

    warn(message: string) {
        this.warnings.push(message);
    }
}