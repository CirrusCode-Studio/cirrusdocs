import { BaseParser } from "../parsers/base-parser.interface";

export interface ParseProfile {
    name: string;
    parsers: BaseParser[];
}
