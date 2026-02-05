import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract";
import { PdfTextParser } from "../parsers/pdf-text.parser";
import { TableParser } from "../parsers/table.parser";
import { FormulaParser } from "../parsers/formula.parser";
import { MissingTableGate } from "../fusion/quality-gates/missing-table.gate";
import { TooManyUnknownGate } from "../fusion/quality-gates/too-many-unknown.gate";
import { GenericProfile } from "./generic.profile";
import { ParseProfile } from "../engine/parse-profile";

const AcademicParseProfile = (
    profile: DocumentProcessingProfile
): ParsePlan => {
    const mime = profile.signals.deterministic.mimeType;

    return {
        profileName: 'ACADEMIC_PARSE',
        steps: [
            { parser: new PdfTextParser(), inputType: 'file', enabled: true},
            { parser: new TableParser(), inputType: 'file', enabled: true},
            { parser: new FormulaParser(), inputType: 'blocks', enabled: true},
        ],
        qualityGates: [
            new MissingTableGate(),
            new TooManyUnknownGate(),
        ],
        fallback: GenericProfile(ParseProfile.TEXT_DOMINANT, mime),
    }
}

export default AcademicParseProfile;