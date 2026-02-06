import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import AcademicParseProfile from "../profiles/academic.profile";
import SlideParseProfile from "../profiles/slide.profile";
import ScannedParseProfile from "../profiles/scanned.profile";
import { GenericParseProfile } from "../profiles/generic.profile";

export class ParserSelector {
    select(profile: DocumentProcessingProfile) {
        switch (profile.content_category) {
            case 'academic':
                return new AcademicParseProfile(profile);
            case 'slide':
                return new SlideParseProfile(profile);
            case 'scanned':
                return new ScannedParseProfile(profile);
            default:
                return new GenericParseProfile(profile);
        }
    }
}
