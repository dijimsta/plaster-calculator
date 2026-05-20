import { useState, type DragEvent, type FormEvent } from "react";

import {
    processProject,
    uploadPdfPageSource,
    uploadProject,
} from "../../../lib/api.js";
import {
    loadPdfDocument,
    renderPdfPageSourcePng,
    renderPdfThumbnails,
    revokePdfPreviews,
    type PdfPagePreview,
} from "../../../lib/pdf.js";

import type { PageUploadProgress } from "../dashboard.types.js";
import type { PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";

const OCR_FLOOD_FILL_SMOOTHED_STRATEGY_KEY = "ocr-flood-fill-smoothed";

interface PreparedPdfUpload {
    pdfDocument: PDFDocumentProxy | null;
    pages: PdfPagePreview[];
}

interface DashboardUploadOptions {
    readonly refresh: () => Promise<void>;
    readonly setMessage: (message: string) => void;
    readonly setProcessingProjectId: (projectId: string | null) => void;
    readonly setToast: (toast: string) => void;
    readonly setToastProject: (
        project: { id: string; name: string } | null,
    ) => void;
}

export function useDashboardUpload({
    refresh,
    setMessage,
    setProcessingProjectId,
    setToast,
    setToastProject,
}: DashboardUploadOptions) {
    const [name, setName] = useState("");
    const [accountId, setAccountId] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [draftProjectId, setDraftProjectId] = useState<string | null>(null);
    const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(
        null,
    );
    const [pdfPages, setPdfPages] = useState<PdfPagePreview[]>([]);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const [pageUploadProgress, setPageUploadProgress] =
        useState<PageUploadProgress | null>(null);

    async function submit(event: FormEvent) {
        event.preventDefault();
        if (!file) return;
        setLoading(true);
        setMessage("Uploading floorplan...");
        let preparedPdf = emptyPreparedPdfUpload();
        try {
            preparedPdf = await preparePdfUpload(file);
            const upload = await uploadProject(
                name || file.name,
                file,
                preparedPdf.pdfDocument?.numPages,
                { accountId },
            );
            if (upload.uploadType === "PDF") {
                openPdfPageSelection(upload.projectId, preparedPdf);
                preparedPdf = emptyPreparedPdfUpload();
            } else {
                await processUploadedImage(upload.projectId);
            }
            await refresh();
        } catch (error) {
            cleanupPreparedPdfUpload(preparedPdf);
            setMessage(
                error instanceof Error ? error.message : "Upload failed",
            );
        } finally {
            setLoading(false);
        }
    }

    async function preparePdfUpload(
        uploadFile: File,
    ): Promise<PreparedPdfUpload> {
        if (!isPdfFile(uploadFile)) {
            return emptyPreparedPdfUpload();
        }

        setMessage("Preparing PDF preview...");
        const nextPdfDocument = await loadPdfDocument(uploadFile);
        const pages = await renderPdfThumbnails(nextPdfDocument);
        setMessage("Uploading original PDF...");
        return { pdfDocument: nextPdfDocument, pages };
    }

    function openPdfPageSelection(
        projectId: string,
        preparedPdf: PreparedPdfUpload,
    ) {
        if (!preparedPdf.pdfDocument || preparedPdf.pages.length === 0) {
            throw new Error("Unable to prepare PDF pages.");
        }

        cleanupPdfModal();
        setDraftProjectId(projectId);
        setPdfDocument(preparedPdf.pdfDocument);
        setPdfPages(preparedPdf.pages);
        setSelectedPages([]);
        setMessage("");
    }

    async function processUploadedImage(projectId: string) {
        setMessage("Processing image in the background...");
        setProcessingProjectId(projectId);
        setToast("Project is processing.");
        const project = await processProject(
            projectId,
            [1],
            OCR_FLOOD_FILL_SMOOTHED_STRATEGY_KEY,
        );
        setProcessingProjectId(null);
        setToast(`${project.name} finished processing.`);
        setToastProject({ id: project.id, name: project.name });
    }

    async function processSelectedPdfPages() {
        if (!draftProjectId || !pdfDocument || selectedPages.length === 0) {
            return;
        }
        setLoading(true);
        const pageImagePaths: Record<number, string> = {};
        const total = selectedPages.length;
        try {
            for (const [index, pageNumber] of selectedPages.entries()) {
                setPageUploadProgress({
                    current: index,
                    total,
                    label: `Rendering page ${pageNumber} at 200 DPI...`,
                });
                const sourcePng = await renderPdfPageSourcePng(
                    pdfDocument,
                    pageNumber,
                );
                setPageUploadProgress({
                    current: index,
                    total,
                    label: `Uploading page ${pageNumber}...`,
                });
                pageImagePaths[pageNumber] = await uploadPdfPageSource(
                    draftProjectId,
                    pageNumber,
                    sourcePng,
                );
                setPageUploadProgress({
                    current: index + 1,
                    total,
                    label: `Uploaded page ${pageNumber}.`,
                });
            }
            setMessage("Processing PDF pages in the background...");
            const processingProjectId = draftProjectId;
            cleanupPdfModal();
            setProcessingProjectId(processingProjectId);
            setToast("Project is processing.");
            const project = await processProject(
                processingProjectId,
                selectedPages,
                OCR_FLOOD_FILL_SMOOTHED_STRATEGY_KEY,
                pageImagePaths,
            );
            setProcessingProjectId(null);
            setToast(`${project.name} finished processing.`);
            setToastProject({ id: project.id, name: project.name });
            await refresh();
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Processing failed",
            );
        } finally {
            setPageUploadProgress(null);
            setLoading(false);
        }
    }

    function handleFileSelection(nextFile?: File | null) {
        if (!nextFile) return;
        setFile(nextFile);
        setMessage("");
    }

    function handleDrop(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setDragActive(false);
        handleFileSelection(event.dataTransfer.files?.[0]);
    }

    function closePdfModal() {
        if (loading) return;
        cleanupPdfModal();
    }

    function cleanupPdfModal() {
        pdfDocument?.destroy();
        revokePdfPreviews(pdfPages);
        setDraftProjectId(null);
        setPdfDocument(null);
        setPdfPages([]);
        setSelectedPages([]);
        setPageUploadProgress(null);
    }

    function togglePage(pageNumber: number) {
        setSelectedPages((current) =>
            current.includes(pageNumber)
                ? current.filter((page) => page !== pageNumber)
                : [...current, pageNumber].sort((a, b) => a - b),
        );
    }

    return {
        accountId,
        draftProjectId,
        dragActive,
        file,
        loading,
        name,
        pageUploadProgress,
        pdfPages,
        selectedPages,
        closePdfModal,
        handleDrop,
        handleFileSelection,
        processSelectedPdfPages,
        setAccountId,
        setDragActive,
        setName,
        submit,
        togglePage,
    };
}

function emptyPreparedPdfUpload(): PreparedPdfUpload {
    return { pdfDocument: null, pages: [] };
}

function cleanupPreparedPdfUpload(preparedPdf: PreparedPdfUpload) {
    preparedPdf.pdfDocument?.destroy();
    revokePdfPreviews(preparedPdf.pages);
}

function isPdfFile(candidate: File) {
    return (
        candidate.type === "application/pdf" ||
        candidate.name.toLowerCase().endsWith(".pdf")
    );
}
