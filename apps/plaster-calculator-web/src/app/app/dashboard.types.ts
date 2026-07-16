import type { PdfPagePreview } from "../../lib/pdf.js";
import type { ProjectSummary } from "../../types.js";
import type { SalesStatus } from "@libraries/plaster-calculator-common";
import type { ChangeEvent, DragEvent, FormEvent } from "react";

export interface PageUploadProgress {
    readonly current: number;
    readonly total: number;
    readonly label: string;
}

export interface NewProjectFormProps {
    readonly accountId: string | null;
    readonly dragActive: boolean;
    readonly file: File | null;
    readonly loading: boolean;
    readonly message: string;
    readonly name: string;
    readonly handleDrop: (event: DragEvent<HTMLLabelElement>) => void;
    readonly handleFileSelection: (file?: File | null) => void;
    readonly setAccountId: (accountId: string | null) => void;
    readonly setDragActive: (active: boolean) => void;
    readonly setName: (name: string) => void;
    readonly submit: (event: FormEvent) => void;
}

export interface ProjectHistoryProps {
    readonly activeSalesStatus: Extract<
        SalesStatus,
        "QUOTING" | "QUOTE_SUBMITTED"
    >;
    readonly filtered: ProjectSummary[];
    readonly projectsLoading: boolean;
    readonly query: string;
    readonly renameValue: string;
    readonly renamingId: string | null;
    readonly refresh: () => Promise<void>;
    readonly removeProject: (project: ProjectSummary) => void;
    readonly saveRename: (projectId: string) => void;
    readonly setQuery: (query: string) => void;
    readonly setActiveSalesStatus: (
        status: Extract<SalesStatus, "QUOTING" | "QUOTE_SUBMITTED">,
    ) => void;
    readonly setRenamingId: (projectId: string | null) => void;
    readonly setRenameValue: (value: string) => void;
}

export interface PdfPageModalProps {
    readonly errorMessage: string | null;
    readonly loading: boolean;
    readonly pageUploadProgress: PageUploadProgress | null;
    readonly pdfPages: PdfPagePreview[];
    readonly processSelectedPdfPages: () => void;
    readonly closePdfModal: () => void;
    readonly selectedPages: number[];
    readonly togglePage: (pageNumber: number) => void;
}

export interface ToastState {
    readonly toast: string;
    readonly toastProject: { id: string; name: string } | null;
    readonly processingProjectId: string | null;
    readonly setToast: (toast: string) => void;
    readonly setToastProject: (
        project: { id: string; name: string } | null,
    ) => void;
}

export type FileInputChange = ChangeEvent<HTMLInputElement>;
