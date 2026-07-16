import assert from "node:assert/strict";
import test from "node:test";

import { extractPdfText } from "../out/pdf-text-extraction.js";

function minimalPdf(pageTexts) {
    const objects = [];
    const pageObjNums = [];
    const fontObjNum = 3 + pageTexts.length * 2;

    for (const [index, pageText] of pageTexts.entries()) {
        const pageObjNum = 3 + index * 2;
        const contentObjNum = pageObjNum + 1;
        pageObjNums.push(pageObjNum);

        const stream = `BT /F1 24 Tf 72 700 Td (${pageText}) Tj ET`;
        objects[pageObjNum] =
            `<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 ${fontObjNum} 0 R >> >> /MediaBox [0 0 612 792] /Contents ${contentObjNum} 0 R >>`;
        objects[contentObjNum] =
            `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    }

    objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
    objects[2] = `<< /Type /Pages /Kids [${pageObjNums.map((n) => `${n} 0 R`).join(" ")}] /Count ${pageTexts.length} >>`;
    objects[fontObjNum] =
        `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    for (let n = 1; n <= fontObjNum; n += 1) {
        offsets.push(pdf.length);
        pdf += `${n} 0 obj\n${objects[n]}\nendobj\n`;
    }
    const xrefStart = pdf.length;
    pdf += `xref\n0 ${fontObjNum + 1}\n0000000000 65535 f \n`;
    for (let n = 1; n <= fontObjNum; n += 1) {
        pdf += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${fontObjNum + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
    return Buffer.from(pdf, "latin1");
}

test("extractPdfText returns per-page text in reading order", async () => {
    const pdf = minimalPdf(["Hello floorplan", "Second page notes"]);
    const pages = await extractPdfText(pdf);
    assert.deepEqual(pages, [
        { pageNumber: 1, text: "Hello floorplan" },
        { pageNumber: 2, text: "Second page notes" },
    ]);
});

test("extractPdfText handles a single-page document", async () => {
    const pdf = minimalPdf(["Only page"]);
    const pages = await extractPdfText(pdf);
    assert.deepEqual(pages, [{ pageNumber: 1, text: "Only page" }]);
});
