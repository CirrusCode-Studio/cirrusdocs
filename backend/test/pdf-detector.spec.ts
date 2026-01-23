jest.mock('pdfjs-dist');
import { PDFDetector } from "@/modules/knowledge/classification/detector/pdf.detector";
import { ParseInput } from "@/modules/knowledge/parsing/engine/parse-engine";
import * as fs from "fs";
import * as path from "path";

describe("PDFDetector", () => {
    let detector: PDFDetector;

    beforeAll(() => {
        detector = new PDFDetector();
    });

    it("should support application/pdf mime type", () => {
        const input = {
            mime: "application/pdf",
        } as ParseInput;

        expect(detector.supports(input)).toBe(true);
    });

    it("should reject non-pdf mime type", () => {
        const input = {
            mime: "text/plain",
        } as ParseInput;

        expect(detector.supports(input)).toBe(false);
    });

    it("should analyze a PDF document and return DocumentSignals", async () => {
        const pdfPath = path.join(
            __dirname,
            "fixtures",
            "sample.pdf"
        );

        const buffer = fs.readFileSync(pdfPath);

        const input: ParseInput = {
            mime: "application/pdf",
            buffer,
        };

        const result = await detector.detect(input);

        // ---------- deterministic ----------
        expect(result.deterministic).toBeDefined();
        expect(result.deterministic.mimeType).toBe("application/pdf");
        expect(result.deterministic.fileExtension).toBe("pdf");
        expect(result.deterministic.pageCount).toBeGreaterThan(0);
        expect(result.deterministic.fileSizeMB).toBeGreaterThan(0);

        // ---------- structural ----------
        expect(result.structural).toBeDefined();

        expect(result.structural.avgTextPerPage).toBeGreaterThanOrEqual(0);
        expect(result.structural.imageOnlyPageRatio).toBeGreaterThanOrEqual(0);
        expect(result.structural.imageOnlyPageRatio).toBeLessThanOrEqual(1);

        expect(result.structural.scannedPageRatio).toBeGreaterThanOrEqual(0);
        expect(result.structural.scannedPageRatio).toBeLessThanOrEqual(1);

        expect(result.structural.structuredLayoutRatio).toBeGreaterThanOrEqual(0);
        expect(result.structural.structuredLayoutRatio).toBeLessThanOrEqual(1);

        expect(result.structural.fontVariance).toBeGreaterThanOrEqual(0);
        expect(result.structural.headingCount).toBeGreaterThanOrEqual(0);
        expect(result.structural.tableCount).toBeGreaterThanOrEqual(0);

        expect(typeof result.structural.hasComplexFormatting).toBe("boolean");
        expect(typeof result.structural.likelyScanned).toBe("boolean");

        // ---------- sanity invariants ----------
        if (result.structural.likelyScanned) {
            expect(result.structural.scannedPageRatio).toBeGreaterThan(0.3);
        }

        if (result.structural.hasComplexFormatting) {
            expect(result.structural.fontVariance).toBeGreaterThan(3);
        }
    });
});