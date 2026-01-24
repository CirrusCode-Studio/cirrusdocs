import { ParsePlan } from "@/core/contracts/parsing/parser-plan.contract"
import { OCRParser } from "../parsers/ocr.parser"
import { PyComputeClient } from "../client/py-compute-client"
import { TableParser } from "../parsers/table.parser"

const ScannedParseProfile = (profile): ParsePlan =>  {
    return {
        profileName: 'SCANNED_PARSE',
        steps: [
            { parser: new OCRParser(), inputType: 'file', enabled: true},
            { parser: new TableParser(), inputType: 'file', enabled: true},
        ],
        qualityGates: []
    }
}

export default ScannedParseProfile;