import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract";

import { MissingTableGate } from "../fusion/quality-gates/missing-table.gate";
import { TooManyUnknownGate } from "../fusion/quality-gates/too-many-unknown.gate";
import { ParseProfile } from "../engine/parse-profile";
import { PdfTextCompute } from "../compute/pdf-text.compute";
import { TableCompute } from "../compute/table.compute";
import { FormulaCompute } from "../compute/formula.compute";
import { GenericParseProfile } from "./generic.profile";

const AcademicParseProfile = (
    profile: DocumentProcessingProfile
): ParsePlan => {
    const mime = profile.signals.deterministic.mimeType;

    return {
        profileName: 'ACADEMIC_PARSE',
        steps: [
            { compute: new PdfTextCompute(), inputType: 'file', enabled: true },
            { compute: new TableCompute(), inputType: 'file', enabled: true },
            { compute: new FormulaCompute(), inputType: 'blocks', enabled: true},
        ],
        qualityGates: [
            new MissingTableGate(),
            new TooManyUnknownGate(),
        ],
        fallback: GenericParseProfile(ParseProfile.TEXT_DOMINANT, mime),
    }
}

export default AcademicParseProfile;