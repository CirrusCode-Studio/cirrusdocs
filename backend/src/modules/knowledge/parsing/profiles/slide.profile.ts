import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract"
import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract"
import { PdfTextParser } from "../parsers/pdf-text.parser";
import { FigureParser } from "../parsers/figure.parser";

const SlideParseProfile = (
    profile: DocumentProcessingProfile
): ParsePlan => {
    return {
        profileName: 'SLIDE_PARSE',
        steps: [
            { parser: new PdfTextParser(), inputType: 'file', enabled: true},
            { parser: new FigureParser(), inputType: 'blocks', enabled: true},
        ],
        qualityGates: [],
    };
}

export default SlideParseProfile;