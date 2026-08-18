import type * as DataConnector from "@generated/data-connector-admin";
import type {
    ReminderStatus,
    SalesStatus,
} from "@libraries/plaster-calculator-common";

export type ProjectListRow =
    | DataConnector.ListProjectsByTeamAndSalesStatusData["projects"][number]
    | DataConnector.ListProjectsByCompanyData["projects"][number];
export type ProjectWithPages = NonNullable<
    DataConnector.GetProjectDetailsByIdData["project"]
>;
export type ProjectDetailsRow = NonNullable<
    DataConnector.GetProjectByIdData["project"]
>;
export type FloorplanPageRow = NonNullable<
    DataConnector.GetFloorplanPageByIdData["floorplanPage"]
>;
export type ReminderRow = NonNullable<
    DataConnector.GetReminderByIdData["reminder"]
>;
export type ProjectReminderRow =
    DataConnector.ListProjectRemindersData["reminders"][number];

export type UploadType = "PDF" | "IMAGE";
export type ProjectStatus = "DRAFT" | "PROCESSING" | "READY" | "FAILED";

export type ProjectSummary = {
    id: string;
    companyId: string | null;
    name: string;
    address: string | null;
    originalFileName: string;
    uploadType: UploadType;
    status: ProjectStatus;
    salesStatus: SalesStatus;
    processingError?: string | null;
    createdAt: string;
    updatedAt: string;
    pageCount: number;
    teamId?: string | null;
    assignee?: string | null;
};

export type FloorplanPage = {
    id: string;
    pageNumber: number;
    status: ProjectStatus;
    processingError: string | null;
    imageUrl: string;
    previewUrl: string;
    overlay: string | null;
    scaleMmPerPx: number | null;
    ceilingHeightMm: number | null;
    referencePoints: string | null;
    referenceLengthMm: number | null;
    processingStrategy?: string | null;
    processingMetadata?: string | null;
    updatedAt: string;
};

export type ProjectDetail = ProjectSummary & {
    scope: string | null;
    pages: FloorplanPage[];
};

export type UserSettings = {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: string | null;
    updatedAt: string | null;
};

export type Reminder = {
    id: string;
    teamId?: string | null;
    projectId: string;
    companyId: string | null;
    assignee: string | null;
    name: string;
    status: ReminderStatus;
    dueAt: string;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

export type ProcessingStrategyInfo = {
    key: string;
    label: string;
    description: string;
    defaultStrategy: boolean;
};

export type UploadResponse = {
    projectId: string;
    uploadType: UploadType;
    pageCount: number;
    status: ProjectStatus;
};

export type CreateProjectFromUploadRequest = {
    projectId?: unknown;
    companyId?: unknown;
    name?: unknown;
    address?: unknown;
    originalFileName?: unknown;
    contentType?: unknown;
    size?: unknown;
    storagePath?: unknown;
    pageCount?: unknown;
    assignee?: unknown;
};

export type ProjectIdRequest = {
    projectId?: unknown;
};

export type ListProjectsRequest = {
    salesStatus?: unknown;
};

export type RenameProjectRequest = ProjectIdRequest & {
    name?: unknown;
};

export type UpdateProjectRequest = ProjectIdRequest & {
    name?: unknown;
    companyId?: unknown;
    address?: unknown;
    salesStatus?: unknown;
    assignee?: unknown;
    scope?: unknown;
};

export type CompanyIdRequest = {
    companyId?: unknown;
};

export type ReminderIdRequest = {
    reminderId?: unknown;
};

export type CreateReminderRequest = ProjectIdRequest & {
    companyId?: unknown;
    name?: unknown;
    dueAt?: unknown;
    assignee?: unknown;
};

export type UpdateReminderRequest = ReminderIdRequest & {
    companyId?: unknown;
    name?: unknown;
    dueAt?: unknown;
    status?: unknown;
    assignee?: unknown;
};

export type ProcessProjectRequest = ProjectIdRequest & {
    pageNumbers?: unknown;
    strategyKey?: unknown;
    pageImagePaths?: unknown;
};

export type InitializeFloorplanPagesRequest = ProjectIdRequest & {
    pageImagePaths?: unknown;
};

export type AnalyzeFloorplanPageRequest = ProjectIdRequest & {
    pageId?: unknown;
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
    referencePoints?: unknown;
    referenceLengthMm?: unknown;
};

export type UpdateFloorplanPageRequest = ProjectIdRequest & {
    pageId?: unknown;
    overlay?: unknown;
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
    referencePoints?: unknown;
    referenceLengthMm?: unknown;
};

export type UpdateFloorplanPagesRequest = ProjectIdRequest & {
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
};

export type ExportProjectCsvResponse = {
    fileName: string;
    mimeType: "text/csv";
    csv: string;
};
export const FLOORPLAN_ANALYZER_REGION = "us-west1";
export const LONG_RUNNING_TIMEOUT_SECONDS = 60 * 60;

export type FloorplanAnalyzerEndpoint =
    "ocr_flood_fill_smoothed" | "ocr_flood_fill" | "xixi_process";

export type ProcessingStrategy = ProcessingStrategyInfo & {
    endpoint: FloorplanAnalyzerEndpoint;
    queryParams: Record<string, string>;
    polygonsKey: "rooms" | "walls";
};

export type AnalyzerPolygon = {
    id?: number;
    label?: string;
    polygon?: number[][];
    bbox?: number[];
    room_type?: string | null;
    area_px?: number;
    pixel_area_px?: number;
    perimeter_px?: number;
    approx_length_px?: number;
    is_hole?: boolean;
};

export type AnalyzerResult = {
    image_size_px?: { width: number; height: number };
    rooms?: AnalyzerPolygon[];
    walls?: AnalyzerPolygon[];
    icons?: AnalyzerPolygon[];
    strategy?: string;
    ocr_seed_count?: number;
    ocr_detected_text?: { text: string; confidence: number }[];
    room_count?: number;
    wall_count?: number;
};

export type EdgeOverride = {
    wallBoardProfile?: string;
    wallBoardType?: string;
    wallPlasterType?: string;
    noPlaster?: boolean;
};

export type OverlayArea = {
    id: string;
    label: string;
    points: [number, number][];
    wallBoardProfile: string;
    wallBoardType: string;
    ceilingPlasterType: string;
    ceilingMode: "flat";
    edgeOverrides?: Record<string, EdgeOverride>;
    isOutdoor: boolean;
    source: "detected";
    deleted: false;
    sourceRoomType: string | null;
    sourceAreaPx?: number;
    sourceApproxLengthPx?: number;
    sourceIsHole?: boolean;
};

export type OverlayDocument = {
    sourceFile?: string;
    imageSizePx?: { width: number; height: number };
    areas: OverlayArea[];
};
export type JsonRecord = Record<string, unknown>;
export type Point = [number, number];
