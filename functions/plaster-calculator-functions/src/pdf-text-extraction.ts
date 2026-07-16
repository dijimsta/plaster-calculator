import {
    getDocument,
    type PDFPageProxy,
} from "pdfjs-dist/legacy/build/pdf.mjs";

type TextContentItem = Awaited<
    ReturnType<PDFPageProxy["getTextContent"]>
>["items"][number];

export interface ExtractedPdfPage {
    readonly pageNumber: number;
    readonly text: string;
}

export async function extractPdfText(
    pdfBytes: Buffer,
): Promise<ExtractedPdfPage[]> {
    const loadingTask = getDocument({
        data: new Uint8Array(pdfBytes),
        useSystemFonts: true,
    });

    try {
        const document = await loadingTask.promise;
        const pages: ExtractedPdfPage[] = [];
        for (
            let pageNumber = 1;
            pageNumber <= document.numPages;
            pageNumber += 1
        ) {
            const page = await document.getPage(pageNumber);
            const content = await page.getTextContent();
            pages.push({ pageNumber, text: joinTextItems(content.items) });
        }
        return pages;
    } finally {
        await loadingTask.destroy();
    }
}

function joinTextItems(items: TextContentItem[]): string {
    let text = "";
    for (const item of items) {
        if (!("str" in item)) {
            continue;
        }
        text += item.str;
        text += item.hasEOL ? "\n" : " ";
    }
    return text.trim();
}
