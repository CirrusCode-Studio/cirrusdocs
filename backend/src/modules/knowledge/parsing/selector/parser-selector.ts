import { DocumentProcessingProfile } from "@/core/contracts/classification/document-processing-profile.contract";
import { AcademicParseProfile } from "../profiles/academic.profile";
import SlideParseProfile from "../profiles/slide.profile";
import ScannedParseProfile from "../profiles/scanned.profile";
import { GenericParseProfile } from "../profiles/generic.profile";
import { mapDocProfileToParseProfile } from "./profile-mapper";

export class ParserSelector {
    select(profile: DocumentProcessingProfile) {
        const mime = profile.signals.deterministic.mimeType;

        switch (profile.content_category) {
            case 'academic':
                return new AcademicParseProfile(mime);
            case 'slide':
                return new SlideParseProfile(mime);
            case 'scanned':
                return new ScannedParseProfile(mime);
            default:
                return new GenericParseProfile(
                    mapDocProfileToParseProfile(profile),
                    mime
                );
        }
    }
}
