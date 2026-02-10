import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract"
import { ParseProfileBuilder } from "./parse-profile.builder";
import { ParseProfile } from "../engine/parse-profile";
import { PdfTextCompute } from "../compute/pdf-text.compute";
import { FigureCompute } from "../compute/figure.compute";
import { GenericParseProfile } from "./generic.profile";

class SlideParseProfile implements ParseProfileBuilder {
    constructor(
        private readonly mime: string) {}

    build(): ParsePlan {
            const fallback = new GenericParseProfile(
                ParseProfile.TEXT_DOMINANT,
                this.mime
            ).build();
    
            return {
                profileName: 'SLIDE_PARSE',
                steps: [
                    { compute: new PdfTextCompute(), inputType: 'file', enabled: true },
                    { compute: new FigureCompute(), inputType: 'blocks', enabled: true}
                ],
                qualityGates: [],
                fallback,
            };
        }
};

export default SlideParseProfile;