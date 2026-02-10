// parse-profiles/generic.profile.ts
import { ParseProfileBuilder } from './parse-profile.builder';
import { ParseProfile } from "../engine/parse-profile";
import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract";
import { TxtCompute } from '../compute/txt.compute';
import { DocxCompute } from '../compute/docx.compute';
import { OCRCompute } from '../compute/ocr.compute';
import { PdfTextCompute } from '../compute/pdf-text.compute';
import { FormulaCompute } from '../compute/formula.compute';
import { TableCompute } from '../compute/table.compute';

export class GenericParseProfile implements ParseProfileBuilder {

    constructor(
        private readonly profile: ParseProfile,
        private readonly mime: string,
    ) {}

    private buildOcrFallback(): ParsePlan {
        return {
            profileName: 'GENERIC_OCR_FALLBACK',
            steps: [
                { compute: new OCRCompute(), inputType: 'file', enabled: true },
            ],
            qualityGates: [],
        };
    }

    build(): ParsePlan {
        const ocrFallback = this.buildOcrFallback();

        switch (this.profile) {

            case ParseProfile.PLAIN_TEXT:
                return {
                    profileName: 'GENERIC_PLAIN_TEXT',
                    steps: [
                        this.mime === 'text/plain'
                            ? { compute: new TxtCompute(), inputType: 'file', enabled: true }
                            : { compute: new DocxCompute(), inputType: 'file', enabled: true },
                    ],
                    qualityGates: [],
                    fallback: ocrFallback,
                };

            case ParseProfile.TEXT_DOMINANT:
                return {
                    profileName: 'GENERIC_TEXT_DOMINANT',
                    steps: [
                        { compute: new PdfTextCompute(), inputType: 'file', enabled: true },
                        { compute: new FormulaCompute(), inputType: 'blocks', enabled: true },
                    ],
                    qualityGates: [],
                    fallback: ocrFallback,
                };

            case ParseProfile.TABLE_DOMINANT:
                return {
                    profileName: 'GENERIC_TABLE_DOMINANT',
                    steps: [
                        { compute: new PdfTextCompute(), inputType: 'file', enabled: true },
                        { compute: new TableCompute(), inputType: 'file', enabled: true },
                    ],
                    qualityGates: [],
                    fallback: ocrFallback,
                };

            case ParseProfile.IMAGE_DOMINANT:
                return {
                    profileName: 'GENERIC_IMAGE_DOMINANT',
                    steps: [
                        { compute: new PdfTextCompute(), inputType: 'file', enabled: true },
                    ],
                    qualityGates: [],
                    fallback: ocrFallback,
                };

            case ParseProfile.MIXED_NOISY:
            default:
                return {
                    profileName: 'GENERIC_MIXED',
                    steps: [
                        { compute: new PdfTextCompute(), inputType: 'file', enabled: true },
                        { compute: new TableCompute(), inputType: 'file', enabled: true },
                        { compute: new FormulaCompute(), inputType: 'blocks', enabled: true },
                    ],
                    qualityGates: [],
                    fallback: ocrFallback,
                };
        }
    }
}