import { RawBlock } from "@/core/contracts/parsing/raw-parse-result.contract";

const isFigureBlock = (block: RawBlock): boolean => {
    if (!block.bbox) return false;
    if (!block.content?.binary_ref) return false;

    const textLen = block.content?.text?.trim().length ?? 0;
    if (textLen > 50) return false;

    return true;
}

export default isFigureBlock;