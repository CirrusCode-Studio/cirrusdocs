import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import AcademicParseProfile from "../profiles/academic.profile";
import SlideParseProfile from "../profiles/slide.profile";
import ScannedParseProfile from "../profiles/scanned.profile";

export class ParserSelector {
    buildPlan(profile: DocumentProcessingProfile) {
        switch(profile.content_category) {
            case 'academic':
                return AcademicParseProfile(profile);
            case 'slide':
                return SlideParseProfile(profile);
            case 'scanned':
                return ScannedParseProfile(profile);
            default:
                return GenericParseProfile(profile);
        }_
    }
}