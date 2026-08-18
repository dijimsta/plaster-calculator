import type { SalesStatus } from "@libraries/plaster-calculator-common";

export type {
    ExportCsvResponse,
    FloorplanPage,
    ProjectDetail,
    ProjectSummary,
    UploadResponse,
} from "@libraries/plaster-calculator-common";

export type CreateProjectFromUploadRequest = {
    projectId: string;
    companyId?: string | null;
    name: string;
    address?: string | null;
    originalFileName: string;
    contentType: string;
    size: number;
    storagePath: string;
    pageCount?: number;
};

export type UpdateProjectRequest = {
    projectId: string;
    name?: string;
    companyId?: string | null;
    address?: string | null;
    salesStatus?: SalesStatus;
    scope?: string | null;
};

export type ListProjectsRequest = {
    salesStatus: SalesStatus;
};

export type ProcessProjectRequest = {
    projectId: string;
    pageNumbers: number[];
    strategyKey?: string;
    pageImagePaths?: Record<number, string>;
};

export type AnalyzeFloorplanPageRequest = {
    readonly projectId: string;
    readonly pageId: string;
    readonly scaleMmPerPx: number | null;
    readonly ceilingHeightMm: number | null;
    readonly referencePoints: string | null;
    readonly referenceLengthMm: number | null;
};

export type SavePageOverlayRequest = {
    projectId: string;
    pageId: string;
    overlay: unknown;
    scaleMmPerPx: number | null;
    ceilingHeightMm: number | null;
    referencePoints: unknown;
    referenceLengthMm: number | null;
};
