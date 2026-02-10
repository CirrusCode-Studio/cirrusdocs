import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract";
import { ParseProfile } from "../engine/parse-profile";

export interface ParseProfileBuilder {
    build(
        parseProfile: ParseProfile,
        mime: string
    ): ParsePlan;
}