import type {
    GetAccountByIdData,
    GetAccountContactByIdData,
    GetFloorplanPageByIdData,
    GetProjectByIdData,
    GetProjectDetailsByIdData,
    GetReminderByIdData,
    ListAccountContactsByAccountIdData,
    ListAccountsByOwnerData,
    ListProjectRemindersData,
    ListProjectsByOwnerData,
} from "@generated/example-data-connector";

export type ProjectListRow = ListProjectsByOwnerData["projects"][number];
export type ProjectWithPages = NonNullable<
    GetProjectDetailsByIdData["project"]
>;
export type ProjectDetailsRow = NonNullable<GetProjectByIdData["project"]>;
export type FloorplanPageRow = NonNullable<
    GetFloorplanPageByIdData["floorplanPage"]
>;
export type AccountListRow = ListAccountsByOwnerData["accounts"][number];
export type AccountWithContacts = NonNullable<GetAccountByIdData["account"]>;
export type AccountContactRow = NonNullable<
    GetAccountContactByIdData["accountContact"]
>;
export type AccountContactListRow =
    ListAccountContactsByAccountIdData["accountContacts"][number];
export type ReminderRow = NonNullable<GetReminderByIdData["reminder"]>;
export type ProjectReminderRow = ListProjectRemindersData["reminders"][number];

export type UploadType = "PDF" | "IMAGE";
export type ProjectStatus = "DRAFT" | "PROCESSING" | "READY" | "FAILED";
export type SalesStatus = "QUOTING" | "QUOTE_SUBMITTED" | "WON" | "LOST";
export type ReminderStatus = "OPEN" | "DONE" | "CANCELLED";

export interface ProjectSummary {
    id: string;
    accountId: string | null;
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
}

export interface FloorplanPage {
    id: string;
    pageNumber: number;
    status: ProjectStatus;
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
}

export interface ProjectDetail extends ProjectSummary {
    ownerId?: string | null;
    pages: FloorplanPage[];
}

export interface AccountContact {
    id: string;
    accountId: string;
    name: string;
    email: string | null;
    phoneNumber: string | null;
    role: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AccountSummary {
    id: string;
    ownerId?: string | null;
    companyName: string;
    businessNumber: string | null;
    phoneNumber: string | null;
    primaryContactId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AccountDetail extends AccountSummary {
    contacts: AccountContact[];
}

export interface UserSettings {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface Reminder {
    id: string;
    ownerId?: string | null;
    projectId: string;
    accountId: string | null;
    name: string;
    status: ReminderStatus;
    dueAt: string;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ProcessingStrategyInfo {
    key: string;
    label: string;
    description: string;
    defaultStrategy: boolean;
}

export interface UploadResponse {
    projectId: string;
    uploadType: UploadType;
    pageCount: number;
    status: ProjectStatus;
}

export interface CreateProjectFromUploadRequest {
    projectId?: unknown;
    accountId?: unknown;
    name?: unknown;
    address?: unknown;
    originalFileName?: unknown;
    contentType?: unknown;
    size?: unknown;
    storagePath?: unknown;
    pageCount?: unknown;
}

export interface ProjectIdRequest {
    projectId?: unknown;
}

export interface RenameProjectRequest extends ProjectIdRequest {
    name?: unknown;
}

export interface UpdateProjectRequest extends ProjectIdRequest {
    name?: unknown;
    accountId?: unknown;
    address?: unknown;
    salesStatus?: unknown;
}

export interface AccountIdRequest {
    accountId?: unknown;
}

export interface ContactIdRequest extends AccountIdRequest {
    contactId?: unknown;
}

export interface CreateAccountRequest {
    companyName?: unknown;
    businessNumber?: unknown;
    phoneNumber?: unknown;
}

export interface UpdateAccountRequest extends AccountIdRequest {
    companyName?: unknown;
    businessNumber?: unknown;
    phoneNumber?: unknown;
    primaryContactId?: unknown;
}

export interface CreateAccountContactRequest extends AccountIdRequest {
    name?: unknown;
    email?: unknown;
    phoneNumber?: unknown;
    role?: unknown;
    makePrimary?: unknown;
}

export interface UpdateAccountContactRequest extends ContactIdRequest {
    name?: unknown;
    email?: unknown;
    phoneNumber?: unknown;
    role?: unknown;
}

export interface UpdateSettingsRequest {
    quoteFollowUpEnabled?: unknown;
    quoteFollowUpDays?: unknown;
}

export interface ReminderIdRequest {
    reminderId?: unknown;
}

export interface CreateReminderRequest extends ProjectIdRequest {
    accountId?: unknown;
    name?: unknown;
    dueAt?: unknown;
}

export interface UpdateReminderRequest extends ReminderIdRequest {
    accountId?: unknown;
    name?: unknown;
    dueAt?: unknown;
    status?: unknown;
}

export interface ProcessProjectRequest extends ProjectIdRequest {
    pageNumbers?: unknown;
    strategyKey?: unknown;
    pageImagePaths?: unknown;
}

export interface UpdateFloorplanPageRequest extends ProjectIdRequest {
    pageId?: unknown;
    overlay?: unknown;
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
    referencePoints?: unknown;
    referenceLengthMm?: unknown;
}

export interface UpdateFloorplanPagesRequest extends ProjectIdRequest {
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
}

export interface ExportProjectCsvResponse {
    fileName: string;
    mimeType: "text/csv";
    csv: string;
}
export const FLOORPLAN_ANALYZER_REGION = "us-west1";
export const LONG_RUNNING_TIMEOUT_SECONDS = 60 * 60;

export type FloorplanAnalyzerEndpoint =
    | "ocr_flood_fill_smoothed"
    | "ocr_flood_fill"
    | "xixi_process";

export interface ProcessingStrategy extends ProcessingStrategyInfo {
    endpoint: FloorplanAnalyzerEndpoint;
    queryParams: Record<string, string>;
    polygonsKey: "rooms" | "walls";
}

export interface AnalyzerPolygon {
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
}

export interface AnalyzerResult {
    image_size_px?: { width: number; height: number };
    rooms?: AnalyzerPolygon[];
    walls?: AnalyzerPolygon[];
    strategy?: string;
    ocr_seed_count?: number;
    room_count?: number;
    wall_count?: number;
}

export interface OverlayArea {
    id: string;
    label: string;
    points: [number, number][];
    wallPlasterType: string;
    ceilingPlasterType: string;
    ceilingMode: "flat";
    isOutdoor: boolean;
    source: "detected";
    deleted: false;
    sourceRoomType: string | null;
    sourceAreaPx?: number;
    sourceApproxLengthPx?: number;
    sourceIsHole?: boolean;
}

export interface OverlayDocument {
    sourceFile?: string;
    imageSizePx?: { width: number; height: number };
    areas: OverlayArea[];
}
export type JsonRecord = Record<string, unknown>;
export type Point = [number, number];
