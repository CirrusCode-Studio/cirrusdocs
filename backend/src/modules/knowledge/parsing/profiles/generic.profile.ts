// parse-profiles/generic.profile.ts
import { ParseProfile } from "../engine/parse-profile";
import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract";

import { TxtParser } from "../parsers/txt.parser";
import { DocxParser } from "../parsers/docx.parser";
import { PdfTextParser } from "../parsers/pdf-text.parser";
import { TableParser } from "../parsers/table.parser";
import { FormulaParser } from "../parsers/formula.parser";
import { OCRParser } from "../parsers/ocr.parser";
import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";

export const GenericParseProfile = (
    parseProfile: DocumentProcessingProfile,
    mime: string
): ParsePlan => {

    const ocrFallback: ParsePlan = {
        profileName: 'GENERIC_OCR_FALLBACK',
        steps: [
            { parser: new OCRParser(), inputType: 'file', enabled: true },
        ],
        qualityGates: [],
    };

    switch (parseProfile) {

        case ParseProfile.PLAIN_TEXT:
            return {
                profileName: 'GENERIC_PLAIN_TEXT',
                steps: [
                    mime === 'text/plain'
                        ? { parser: new TxtParser(), inputType: 'file', enabled: true }
                        : { parser: new DocxParser(), inputType: 'file', enabled: true },
                ],
                qualityGates: [],
                fallback: ocrFallback,
            };

        case ParseProfile.TEXT_DOMINANT:
            return {
                profileName: 'GENERIC_TEXT_DOMINANT',
                steps: [
                    { parser: new PdfTextParser(), inputType: 'file', enabled: true },
                    { parser: new FormulaParser(), inputType: 'blocks', enabled: true },
                ],
                qualityGates: [],
                fallback: ocrFallback,
            };

        case ParseProfile.TABLE_DOMINANT:
            return {
                profileName: 'GENERIC_TABLE_DOMINANT',
                steps: [
                    { parser: new PdfTextParser(), inputType: 'file', enabled: true },
                    { parser: new TableParser(), inputType: 'file', enabled: true },
                ],
                qualityGates: [],
                fallback: ocrFallback,
            };

        case ParseProfile.IMAGE_DOMINANT:
            return {
                profileName: 'GENERIC_IMAGE_DOMINANT',
                steps: [
                    // cố gắng parse text layer trước (nếu có)
                    { parser: new PdfTextParser(), inputType: 'file', enabled: true },
                ],
                qualityGates: [],
                fallback: ocrFallback,
            };

        case ParseProfile.MIXED_NOISY:
        default:
            return {
                profileName: 'GENERIC_MIXED',
                steps: [
                    { parser: new PdfTextParser(), inputType: 'file', enabled: true },
                    { parser: new TableParser(), inputType: 'file', enabled: true },
                    { parser: new FormulaParser(), inputType: 'blocks', enabled: true },
                ],
                qualityGates: [],
                fallback: ocrFallback,
            };
    }
};
