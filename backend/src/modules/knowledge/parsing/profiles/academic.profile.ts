import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract";
import { MissingTableGate } from "../fusion/quality-gates/missing-table.gate";
import { TooManyUnknownGate } from "../fusion/quality-gates/too-many-unknown.gate";
import { ParseProfile } from "../engine/parse-profile";
import { PdfTextCompute } from "../compute/pdf-text.compute";
import { TableCompute } from "../compute/table.compute";
import { FormulaCompute } from "../compute/formula.compute";
import { GenericParseProfile } from "./generic.profile";
import { ParseProfileBuilder } from "./parse-profile.builder";

export class AcademicParseProfile implements ParseProfileBuilder {

    constructor(
        private readonly mime: string
    ) {}

    build(): ParsePlan {
        const fallback = new GenericParseProfile(
            ParseProfile.TEXT_DOMINANT,
            this.mime
        ).build();

        return {
            profileName: 'ACADEMIC_PARSE',
            steps: [
                { compute: new PdfTextCompute(), inputType: 'file', enabled: true },
                { compute: new TableCompute(), inputType: 'file', enabled: true },
                { compute: new FormulaCompute(), inputType: 'blocks', enabled: true },
            ],
            qualityGates: [
                new MissingTableGate(),
                new TooManyUnknownGate(),
            ],
            fallback,
        };
    }
}
