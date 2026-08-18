import type { ChangeEvent, DragEvent, FormEvent } from "react";

import type { PdfPagePreview } from "../../lib/pdf.js";
import type { CompanyDetail } from "../../types.js";

import type { EnrichedProject } from "./hooks/use-projects-listing.js";

export type PageUploadProgress = {
    readonly current: number;
    readonly total: number;
    readonly label: string;
};

export type NewProjectFormProps = {
    readonly companyCreatePending: boolean;
    readonly companyId: string | null;
    readonly dragActive: boolean;
    readonly file: File | null;
    readonly loading: boolean;
    readonly message: string;
    readonly name: string;
    readonly handleDrop: (event: DragEvent<HTMLLabelElement>) => void;
    readonly handleFileSelection: (file?: File | null) => void;
    readonly onCompanyCreated: (company: CompanyDetail) => void;
    readonly setCompanyCreatePending: (isPending: boolean) => void;
    readonly setCompanyId: (companyId: string | null) => void;
    readonly setDragActive: (active: boolean) => void;
    readonly setName: (name: string) => void;
    readonly submit: (event: FormEvent) => void;
};

export type NeedsAttentionPanelProps = {
    readonly projects: readonly EnrichedProject[];
    readonly loading: boolean;
    readonly activeProjectsCount: number;
};

export type RecentProjectsPanelProps = {
    readonly projects: readonly EnrichedProject[];
    readonly loading: boolean;
};

export type PdfPageModalContentProps = {
    readonly errorMessage: string | null;
    readonly pageUploadProgress: PageUploadProgress | null;
    readonly pdfPages: PdfPagePreview[];
    readonly selectedPages: number[];
    readonly togglePage: (pageNumber: number) => void;
};

export type FileInputChange = ChangeEvent<HTMLInputElement>;
