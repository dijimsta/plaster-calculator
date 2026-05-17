import {
    getDocument,
    GlobalWorkerOptions,
    type PDFDocumentProxy,
} from "pdfjs-dist/legacy/build/pdf.mjs";

export type PdfPagePreview = {
    pageNumber: number;
    previewUrl: string;
};

const PDF_POINTS_PER_INCH = 72;
const SOURCE_DPI = 200;
const THUMBNAIL_WIDTH_PX = 220;

let workerConfigured = false;

export async function loadPdfDocument(file: File): Promise<PDFDocumentProxy> {
    configurePdfWorker();
    const data = new Uint8Array(await file.arrayBuffer());
    return getDocument({ data }).promise;
}

export async function renderPdfThumbnails(
    pdf: PDFDocumentProxy,
): Promise<PdfPagePreview[]> {
    const previews: PdfPagePreview[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        previews.push({
            pageNumber,
            previewUrl: URL.createObjectURL(
                await renderPdfPageToPng(pdf, pageNumber, {
                    thumbnailWidthPx: THUMBNAIL_WIDTH_PX,
                }),
            ),
        });
    }

    return previews;
}

export async function renderPdfPageSourcePng(
    pdf: PDFDocumentProxy,
    pageNumber: number,
): Promise<Blob> {
    return renderPdfPageToPng(pdf, pageNumber, {
        scale: SOURCE_DPI / PDF_POINTS_PER_INCH,
    });
}

export function revokePdfPreviews(previews: PdfPagePreview[]) {
    previews.forEach((preview) => URL.revokeObjectURL(preview.previewUrl));
}

function configurePdfWorker() {
    if (workerConfigured) return;
    GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.mjs",
        import.meta.url,
    ).toString();
    workerConfigured = true;
}

async function renderPdfPageToPng(
    pdf: PDFDocumentProxy,
    pageNumber: number,
    options: { scale?: number; thumbnailWidthPx?: number },
): Promise<Blob> {
    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale =
        options.scale ??
        Math.min(
            1,
            (options.thumbnailWidthPx ?? THUMBNAIL_WIDTH_PX) /
                baseViewport.width,
        );
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    try {
        await page.render({
            canvas,
            viewport,
            background: "rgb(255,255,255)",
        }).promise;
        return await canvasToPng(canvas);
    } finally {
        page.cleanup();
        canvas.width = 0;
        canvas.height = 0;
    }
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error("Could not render PDF page as PNG."));
            }
        }, "image/png");
    });
}
