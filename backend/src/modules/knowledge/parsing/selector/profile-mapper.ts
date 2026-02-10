import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { ParseProfile } from "../engine/parse-profile";

export const mapDocProfileToParseProfile = (
    doc: DocumentProcessingProfile
): ParseProfile => {
    switch (doc.content_category) {
        case 'academic':
            return ParseProfile.TEXT_DOMINANT;
        case 'slide':
            return ParseProfile.LAYOUT_DOMINANT;
        case 'scanned':
            return ParseProfile.IMAGE_DOMINANT;
        default:
            return ParseProfile.MIXED_NOISY;
    }
}
