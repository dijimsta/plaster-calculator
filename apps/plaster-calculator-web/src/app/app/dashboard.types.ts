import type { PdfPagePreview } from "../../lib/pdf.js";
import type { ProcessingStrategyInfo, ProjectSummary } from "../../types.js";
import type { ChangeEvent, DragEvent, FormEvent } from "react";

export interface PageUploadProgress {
    readonly current: number;
    readonly total: number;
    readonly label: string;
}

export interface StrategySelectProps {
    readonly id: string;
    readonly processingStrategies: ProcessingStrategyInfo[];
    readonly selectedStrategyKey: string;
    readonly setSelectedStrategyKey: (key: string) => void;
}

export interface NewProjectFormProps extends Omit<StrategySelectProps, "id"> {
    readonly dragActive: boolean;
    readonly file: File | null;
    readonly loading: boolean;
    readonly message: string;
    readonly name: string;
    readonly handleDrop: (event: DragEvent<HTMLLabelElement>) => void;
    readonly handleFileSelection: (file?: File | null) => void;
    readonly setDragActive: (active: boolean) => void;
    readonly setName: (name: string) => void;
    readonly submit: (event: FormEvent) => void;
}

export interface ProjectHistoryProps {
    readonly filtered: ProjectSummary[];
    readonly projectsLoading: boolean;
    readonly query: string;
    readonly renameValue: string;
    readonly renamingId: string | null;
    readonly removeProject: (project: ProjectSummary) => void;
    readonly saveRename: (projectId: string) => void;
    readonly setQuery: (query: string) => void;
    readonly setRenamingId: (projectId: string | null) => void;
    readonly setRenameValue: (value: string) => void;
}

export interface PdfPageModalProps extends StrategySelectProps {
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
