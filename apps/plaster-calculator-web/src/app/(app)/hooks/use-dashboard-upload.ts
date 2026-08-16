import { PDF_UPLOAD_TYPE } from "@libraries/plaster-calculator-common";
import type { UploadType } from "@libraries/plaster-calculator-common";
import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import { useRouter } from "next/navigation.js";
import type { PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import { useState, type DragEvent, type FormEvent } from "react";

import {
    loadPdfDocument,
    renderPdfPageSourcePng,
    renderPdfThumbnails,
    revokePdfPreviews,
    type PdfPagePreview,
} from "../../../lib/pdf.js";
import type { PageUploadProgress } from "../dashboard.types.js";

/** One-based step of the new-project wizard: details -> clarifications -> pages (PDF uploads only). */
export type WizardStep = 1 | 2 | 3;

interface PreparedPdfUpload {
    pdfDocument: PDFDocumentProxy | null;
    pages: PdfPagePreview[];
}

interface DashboardUploadOptions {
    readonly refresh: () => Promise<void>;
    readonly setMessage: (message: string) => void;
    readonly setProcessingProjectId: (projectId: string | null) => void;
}

export function useDashboardUpload({
    refresh,
    setMessage,
}: DashboardUploadOptions) {
    const projectsService = useProjectsService();
    const router = useRouter();
    const [name, setName] = useState("");
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [wizardOpen, setWizardOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState<WizardStep>(1);
    const [uploadType, setUploadType] = useState<UploadType | null>(null);
    const [draftProjectId, setDraftProjectId] = useState<string | null>(null);
    const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(
        null,
    );
    const [pdfPages, setPdfPages] = useState<PdfPagePreview[]>([]);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const [pageUploadProgress, setPageUploadProgress] =
        useState<PageUploadProgress | null>(null);
    const [pdfPageError, setPdfPageError] = useState<string | null>(null);

    /**
     * Tears down every piece of state the wizard holds -- the draft
     * project's id, any prepared PDF document/thumbnails, page-selection
     * progress, and the wizard's own open/step state -- and revokes the PDF
     * preview object URLs. Must run on every exit path (closing at any
     * step, finishing, or an error while uploading) so nothing leaks.
     */
    function cleanupPdfModal() {
        void pdfDocument?.cleanup();
        revokePdfPreviews(pdfPages);
        setDraftProjectId(null);
        setPdfDocument(null);
        setPdfPages([]);
        setSelectedPages([]);
        setPageUploadProgress(null);
        setPdfPageError(null);
        setWizardOpen(false);
        setWizardStep(1);
        setUploadType(null);
    }

    async function submit(event: FormEvent) {
        event.preventDefault();
        if (!file) return;
        cleanupPdfModal();
        setLoading(true);
        setWizardOpen(true);
        setWizardStep(1);
        setMessage("Uploading floorplan...");
        let preparedPdf = emptyPreparedPdfUpload();
        try {
            preparedPdf = await preparePdfUpload(file);
            const upload = await projectsService.uploadProject(
                name || file.name,
                file,
                preparedPdf.pdfDocument?.numPages,
                { companyId },
            );
            if (upload.uploadType === PDF_UPLOAD_TYPE) {
                if (
                    !preparedPdf.pdfDocument ||
                    preparedPdf.pages.length === 0
                ) {
                    throw new Error("Unable to prepare PDF pages.");
                }
                setPdfDocument(preparedPdf.pdfDocument);
                setPdfPages(preparedPdf.pages);
                setSelectedPages([]);
                preparedPdf = emptyPreparedPdfUpload();
            }
            setUploadType(upload.uploadType);
            setDraftProjectId(upload.projectId);
            setMessage("");
            setWizardStep(2);
            await refresh();
        } catch (error) {
            cleanupPreparedPdfUpload(preparedPdf);
            cleanupPdfModal();
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

    async function processSelectedPdfPages() {
        if (!draftProjectId || !pdfDocument || selectedPages.length === 0) {
            return;
        }
        setLoading(true);
        setPdfPageError(null);
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
                pageImagePaths[pageNumber] =
                    await projectsService.uploadPdfPageSource(
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
            setMessage("Creating editable PDF pages...");
            const projectId = draftProjectId;
            await projectsService.initializeFloorplanPages(
                projectId,
                pageImagePaths,
            );
            cleanupPdfModal();
            router.push(`/projects/${projectId}`);
        } catch (error) {
            setPdfPageError(
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

    /** Closes the wizard from any step, e.g. the modal's own close button/backdrop or a footer Cancel. No-ops while an upload/processing call is in flight. */
    function closeWizard() {
        if (loading) return;
        cleanupPdfModal();
    }

    /** Backward navigation only -- `NewProjectWizardModal`'s rail and footer Back buttons only ever request a step before the current one. */
    function goToWizardStep(step: number) {
        setWizardStep(step as WizardStep);
    }

    /** Step 2 (PDF uploads) -> step 3, the page picker. */
    function goToPagesStep() {
        setWizardStep(3);
    }

    /**
     * Finishes the wizard for a non-PDF upload -- there's no page-selection
     * step for it, so completing clarifications is the end of the flow.
     * Routes to the project the same way the PDF flow does once its pages
     * are processed.
     */
    function finishWizard() {
        if (!draftProjectId) return;
        const projectId = draftProjectId;
        cleanupPdfModal();
        router.push(`/projects/${projectId}`);
    }

    function togglePage(pageNumber: number) {
        setSelectedPages((current) =>
            current.includes(pageNumber)
                ? current.filter((page) => page !== pageNumber)
                : [...current, pageNumber].sort((a, b) => a - b),
        );
    }

    return {
        companyId,
        dragActive,
        draftProjectId,
        file,
        loading,
        name,
        pageUploadProgress,
        pdfPageError,
        pdfPages,
        selectedPages,
        uploadType,
        wizardOpen,
        wizardStep,
        closeWizard,
        finishWizard,
        goToPagesStep,
        goToWizardStep,
        handleDrop,
        handleFileSelection,
        processSelectedPdfPages,
        setCompanyId,
        setDragActive,
        setName,
        submit,
        togglePage,
    };
}

export type UseDashboardUploadResult = ReturnType<typeof useDashboardUpload>;

function emptyPreparedPdfUpload(): PreparedPdfUpload {
    return { pdfDocument: null, pages: [] };
}

function cleanupPreparedPdfUpload(preparedPdf: PreparedPdfUpload) {
    void preparedPdf.pdfDocument?.cleanup();
    revokePdfPreviews(preparedPdf.pages);
}

function isPdfFile(candidate: File) {
    return (
        candidate.type === "application/pdf" ||
        candidate.name.toLowerCase().endsWith(".pdf")
    );
}
