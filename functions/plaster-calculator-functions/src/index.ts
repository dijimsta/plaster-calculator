/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { randomUUID } from "node:crypto";

import {
    createAccount as dcCreateAccount,
    createAccountContact as dcCreateAccountContact,
    createFloorplanPage as dcCreateFloorplanPage,
    createProjectFromUpload as dcCreateProjectFromUpload,
    createReminder as dcCreateReminder,
    deleteAccount as dcDeleteAccount,
    deleteAccountContact as dcDeleteAccountContact,
    deleteAccountContacts as dcDeleteAccountContacts,
    deleteFloorplanPages as dcDeleteFloorplanPages,
    deleteProject as dcDeleteProject,
    getAccountById,
    type GetAccountByIdData,
    getAccountContactById,
    type GetAccountContactByIdData,
    updateProject as dcUpdateProject,
    updateFloorplanPage as dcUpdateFloorplanPage,
    getFloorplanPageById,
    type GetFloorplanPageByIdData,
    getOpenAutoQuoteReminder,
    getProjectById,
    type GetProjectByIdData,
    getProjectDetailsById,
    type GetProjectDetailsByIdData,
    getReminderById,
    type GetReminderByIdData,
    getUserSettings,
    listProjectsByOwner,
    type ListProjectsByOwnerData,
    listAccountsByOwner,
    type ListAccountsByOwnerData,
    listDueReminders as dcListDueReminders,
    type ListDueRemindersData,
    listProjectReminders as dcListProjectReminders,
    type ListProjectRemindersData,
    touchProject,
    updateAccount as dcUpdateAccount,
    updateAccountContact as dcUpdateAccountContact,
    updateReminder as dcUpdateReminder,
    upsertUserSettings,
} from "@generated/example-data-connector";
import { getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { setGlobalOptions } from "firebase-functions";
import {
    type CallableRequest,
    HttpsError,
    onCall,
} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { GoogleAuth } from "google-auth-library";
import JSZip from "jszip";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({
    maxInstances: 5,
    region: "us-west1",
});

if (getApps().length === 0) {
    initializeApp();
}

type ProjectListRow = ListProjectsByOwnerData["projects"][number];
type ProjectWithPages = NonNullable<GetProjectDetailsByIdData["project"]>;
type ProjectDetailsRow = NonNullable<GetProjectByIdData["project"]>;
type FloorplanPageRow = NonNullable<GetFloorplanPageByIdData["floorplanPage"]>;
type AccountListRow = ListAccountsByOwnerData["accounts"][number];
type AccountWithContacts = NonNullable<GetAccountByIdData["account"]>;
type AccountContactRow = NonNullable<
    GetAccountContactByIdData["accountContact"]
>;
type ReminderRow = NonNullable<GetReminderByIdData["reminder"]>;
type DueReminderRow = ListDueRemindersData["reminders"][number];
type ProjectReminderRow = ListProjectRemindersData["reminders"][number];

type UploadType = "PDF" | "IMAGE";
type ProjectStatus = "DRAFT" | "PROCESSING" | "READY" | "FAILED";
type SalesStatus = "QUOTING" | "QUOTE_SUBMITTED" | "WON" | "LOST";
type ReminderStatus = "OPEN" | "DONE" | "CANCELLED";

const defaultQuoteFollowUpEnabled = true;
const defaultQuoteFollowUpDays = 3;
const quoteFollowUpReminderPrefix = "Follow up quote for ";

interface ProjectSummary {
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

interface FloorplanPage {
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

interface ProjectDetail extends ProjectSummary {
    ownerId?: string | null;
    pages: FloorplanPage[];
}

interface AccountContact {
    id: string;
    accountId: string;
    name: string;
    email: string | null;
    phoneNumber: string | null;
    role: string | null;
    createdAt: string;
    updatedAt: string;
}

interface AccountSummary {
    id: string;
    ownerId?: string | null;
    companyName: string;
    businessNumber: string | null;
    phoneNumber: string | null;
    primaryContactId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface AccountDetail extends AccountSummary {
    contacts: AccountContact[];
}

interface UserSettings {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: string | null;
    updatedAt: string | null;
}

interface Reminder {
    id: string;
    ownerId?: string | null;
    projectId: string;
    accountId: string | null;
    name: string;
    status: ReminderStatus;
    dueAt: string;
    completedAt: string | null;
    autoCreated: boolean;
    createdAt: string;
    updatedAt: string;
    project?: {
        id: string;
        name: string;
    };
}

interface ProcessingStrategyInfo {
    key: string;
    label: string;
    description: string;
    defaultStrategy: boolean;
}

interface UploadResponse {
    projectId: string;
    uploadType: UploadType;
    pageCount: number;
    status: ProjectStatus;
}

interface CreateProjectFromUploadRequest {
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

interface ProjectIdRequest {
    projectId?: unknown;
}

interface RenameProjectRequest extends ProjectIdRequest {
    name?: unknown;
}

interface UpdateProjectRequest extends ProjectIdRequest {
    name?: unknown;
    accountId?: unknown;
    address?: unknown;
    salesStatus?: unknown;
}

interface AccountIdRequest {
    accountId?: unknown;
}

interface ContactIdRequest extends AccountIdRequest {
    contactId?: unknown;
}

interface CreateAccountRequest {
    companyName?: unknown;
    businessNumber?: unknown;
    phoneNumber?: unknown;
}

interface UpdateAccountRequest extends AccountIdRequest {
    companyName?: unknown;
    businessNumber?: unknown;
    phoneNumber?: unknown;
    primaryContactId?: unknown;
}

interface CreateAccountContactRequest extends AccountIdRequest {
    name?: unknown;
    email?: unknown;
    phoneNumber?: unknown;
    role?: unknown;
}

interface UpdateAccountContactRequest extends ContactIdRequest {
    name?: unknown;
    email?: unknown;
    phoneNumber?: unknown;
    role?: unknown;
}

interface UpdateSettingsRequest {
    quoteFollowUpEnabled?: unknown;
    quoteFollowUpDays?: unknown;
}

interface ReminderIdRequest {
    reminderId?: unknown;
}

interface CreateReminderRequest extends ProjectIdRequest {
    accountId?: unknown;
    name?: unknown;
    dueAt?: unknown;
}

interface UpdateReminderRequest extends ReminderIdRequest {
    accountId?: unknown;
    name?: unknown;
    dueAt?: unknown;
    status?: unknown;
}

interface ProcessProjectRequest extends ProjectIdRequest {
    pageNumbers?: unknown;
    strategyKey?: unknown;
    pageImagePaths?: unknown;
}

interface UpdateFloorplanPageRequest extends ProjectIdRequest {
    pageId?: unknown;
    overlay?: unknown;
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
    referencePoints?: unknown;
    referenceLengthMm?: unknown;
}

interface UpdateFloorplanPagesRequest extends ProjectIdRequest {
    scaleMmPerPx?: unknown;
    ceilingHeightMm?: unknown;
}

interface ExportProjectCsvResponse {
    fileName: string;
    mimeType: "text/csv";
    csv: string;
}

const FLOORPLAN_ANALYZER_REGION = "us-west1";
const LONG_RUNNING_TIMEOUT_SECONDS = 60 * 60;

type FloorplanAnalyzerEndpoint =
    | "ocr_flood_fill_smoothed"
    | "ocr_flood_fill"
    | "xixi_process";

interface ProcessingStrategy extends ProcessingStrategyInfo {
    endpoint: FloorplanAnalyzerEndpoint;
    queryParams: Record<string, string>;
    polygonsKey: "rooms" | "walls";
}

const processingStrategies: ProcessingStrategy[] = [
    {
        key: "ocr-flood-fill-smoothed",
        label: "Detected rooms (OCR + smoothed polygons)",
        description:
            "Reads room labels with OCR, floods within wall masks, and smooths polygons for editing.",
        defaultStrategy: true,
        endpoint: "ocr_flood_fill_smoothed",
        queryParams: {},
        polygonsKey: "rooms",
    },
    {
        key: "ocr-flood-fill",
        label: "Detected rooms (OCR flood fill)",
        description: "Reads room labels with OCR and floods within wall masks.",
        defaultStrategy: false,
        endpoint: "ocr_flood_fill",
        queryParams: {},
        polygonsKey: "rooms",
    },
    {
        key: "xixi-process",
        label: "Wall contour segmentation",
        description:
            "Extracts walls and rooms from the segmentation map without OCR seeds.",
        defaultStrategy: false,
        endpoint: "xixi_process",
        queryParams: {},
        polygonsKey: "walls",
    },
];

interface AnalyzerPolygon {
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

interface AnalyzerResult {
    image_size_px?: { width: number; height: number };
    rooms?: AnalyzerPolygon[];
    walls?: AnalyzerPolygon[];
    strategy?: string;
    ocr_seed_count?: number;
    room_count?: number;
    wall_count?: number;
}

interface OverlayArea {
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

interface OverlayDocument {
    sourceFile?: string;
    imageSizePx?: { width: number; height: number };
    areas: OverlayArea[];
}

const googleAuth = new GoogleAuth();

function requireAuth(request: CallableRequest<unknown>) {
    const auth = request.auth;

    if (!auth) {
        throw new HttpsError(
            "unauthenticated",
            "Must be signed in to call this function.",
        );
    }

    return auth;
}

function readRequiredString(value: unknown, field: string) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new HttpsError("invalid-argument", `${field} is required.`);
    }

    return value.trim();
}

function readRequiredNumber(value: unknown, field: string) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new HttpsError("invalid-argument", `${field} is required.`);
    }

    return value;
}

function readPdfPageCount(value: unknown) {
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
        throw new HttpsError(
            "invalid-argument",
            "PDF page count must be a positive integer.",
        );
    }

    return value;
}

function readOptionalString(value: unknown) {
    if (value == null || value === "") {
        return undefined;
    }

    if (typeof value !== "string") {
        throw new HttpsError("invalid-argument", "Expected a string value.");
    }

    return value.trim();
}

function readOptionalNullableString(value: unknown, field: string) {
    if (value == null) {
        return null;
    }

    if (typeof value !== "string") {
        throw new HttpsError("invalid-argument", `${field} must be a string.`);
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function readOptionalBoolean(value: unknown, field: string) {
    if (value == null) {
        return undefined;
    }

    if (typeof value !== "boolean") {
        throw new HttpsError("invalid-argument", `${field} must be a boolean.`);
    }

    return value;
}

function readPositiveInteger(value: unknown, field: string) {
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
        throw new HttpsError(
            "invalid-argument",
            `${field} must be a positive integer.`,
        );
    }

    return value;
}

function readOptionalPositiveInteger(value: unknown, field: string) {
    if (value == null) {
        return undefined;
    }

    return readPositiveInteger(value, field);
}

function readDueAt(value: unknown, field: string) {
    const dueAt = readRequiredString(value, field);
    const timestamp = Date.parse(dueAt);
    if (Number.isNaN(timestamp)) {
        throw new HttpsError(
            "invalid-argument",
            `${field} must be a valid timestamp.`,
        );
    }

    return new Date(timestamp).toISOString();
}

function readNullableNumber(value: unknown, field: string) {
    if (value == null || value === "") {
        return null;
    }

    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new HttpsError("invalid-argument", `${field} must be a number.`);
    }

    return value;
}

function hasField(data: object, field: string) {
    return Object.prototype.hasOwnProperty.call(data, field);
}

export const helloWorld = onCall((request) => {
    const auth = requireAuth(request);
    const name = auth.token["name"] ?? auth.token.email ?? "stranger";
    logger.info("Hello logs!", { structuredData: true });
    return { message: `Hello, ${name}!` };
});

export const listProjects = onCall<
    unknown,
    Promise<{ projects: ProjectSummary[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await listProjectsByOwner({ ownerId: auth.uid });
    return { projects: response.data.projects.map(toSummary) };
});

export const createProjectFromUpload = onCall<
    CreateProjectFromUploadRequest,
    Promise<UploadResponse>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const accountId = readOptionalNullableString(
        request.data.accountId,
        "Account ID",
    );
    const address = readOptionalNullableString(request.data.address, "Address");
    const name = readRequiredString(request.data.name, "Name");
    const originalFileName = readRequiredString(
        request.data.originalFileName,
        "Original file name",
    );
    const contentType = readRequiredString(
        request.data.contentType,
        "Content type",
    );
    const storagePath = readRequiredString(
        request.data.storagePath,
        "Storage path",
    );
    readRequiredNumber(request.data.size, "Size");

    if (!isOwnedUploadPath(storagePath, auth.uid, projectId)) {
        throw new HttpsError(
            "permission-denied",
            "Upload path must belong to the signed-in user.",
        );
    }

    if (accountId) {
        await requireOwnedAccount(accountId, auth.uid);
    }

    const [exists] = await getStorage().bucket().file(storagePath).exists();
    if (!exists) {
        throw new HttpsError("not-found", "Uploaded file was not found.");
    }

    const originalUrl = await ensureFileDownloadUrl(storagePath);

    const uploadType = inferUploadType(originalFileName, contentType);
    const pageCount =
        uploadType === "PDF" ? readPdfPageCount(request.data.pageCount) : 1;
    await dcCreateProjectFromUpload({
        id: projectId,
        ownerId: auth.uid,
        accountId,
        name,
        address,
        originalFileName,
        uploadType,
        originalPath: originalUrl,
        status: "DRAFT",
        salesStatus: "QUOTING",
        pageCount,
    });

    return {
        projectId,
        uploadType,
        pageCount,
        status: "DRAFT",
    };
});

export const getProject = onCall<ProjectIdRequest, Promise<ProjectDetail>>(
    async (request) => {
        const auth = requireAuth(request);
        const project = await requireOwnedProject(
            readRequiredString(request.data.projectId, "Project ID"),
            auth.uid,
        );
        return toDetail(project);
    },
);

export const getProjectStatus = onCall<
    ProjectIdRequest,
    Promise<ProjectSummary>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await getProjectById({
        id: readRequiredString(request.data.projectId, "Project ID"),
    });
    const project = response.data.project;

    if (!project || project.ownerId !== auth.uid) {
        throw new HttpsError("not-found", "Project was not found.");
    }

    return toSummary(project);
});

export const renameProject = onCall<
    RenameProjectRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    return updateOwnedProject(projectId, auth.uid, {
        name: readRequiredString(request.data.name, "Name"),
    });
});

export const updateProject = onCall<
    UpdateProjectRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const data = request.data;
    const updates: ProjectUpdateFields = {};

    if (hasField(data, "name")) {
        updates.name = readRequiredString(data.name, "Name");
    }

    if (hasField(data, "accountId")) {
        updates.accountId = readOptionalNullableString(
            data.accountId,
            "Account ID",
        );
    }

    if (hasField(data, "address")) {
        updates.address = readOptionalNullableString(data.address, "Address");
    }

    if (hasField(data, "salesStatus")) {
        updates.salesStatus = readSalesStatus(data.salesStatus);
    }

    if (Object.keys(updates).length === 0) {
        throw new HttpsError(
            "invalid-argument",
            "At least one project field is required.",
        );
    }

    return updateOwnedProject(projectId, auth.uid, updates);
});

export const listAccounts = onCall<
    unknown,
    Promise<{ accounts: AccountSummary[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await listAccountsByOwner({ ownerId: auth.uid });
    return { accounts: response.data.accounts.map(toAccountSummary) };
});

export const getAccount = onCall<AccountIdRequest, Promise<AccountDetail>>(
    async (request) => {
        const auth = requireAuth(request);
        return toAccountDetail(
            await requireOwnedAccount(
                readRequiredString(request.data.accountId, "Account ID"),
                auth.uid,
            ),
        );
    },
);

export const createAccount = onCall<
    CreateAccountRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = randomUUID();
    await dcCreateAccount({
        id: accountId,
        ownerId: auth.uid,
        companyName: readRequiredString(
            request.data.companyName,
            "Company name",
        ),
        businessNumber: readOptionalNullableString(
            request.data.businessNumber,
            "Business number",
        ),
        phoneNumber: readOptionalNullableString(
            request.data.phoneNumber,
            "Phone number",
        ),
    });

    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const updateAccount = onCall<
    UpdateAccountRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    const data = request.data;
    const primaryContactId = hasField(data, "primaryContactId")
        ? readOptionalNullableString(
              data.primaryContactId,
              "Primary contact ID",
          )
        : (account.primaryContactId ?? null);

    if (primaryContactId) {
        await requireOwnedAccountContact(accountId, primaryContactId, auth.uid);
    }

    await dcUpdateAccount({
        id: accountId,
        companyName: hasField(data, "companyName")
            ? readRequiredString(data.companyName, "Company name")
            : account.companyName,
        businessNumber: hasField(data, "businessNumber")
            ? readOptionalNullableString(data.businessNumber, "Business number")
            : (account.businessNumber ?? null),
        phoneNumber: hasField(data, "phoneNumber")
            ? readOptionalNullableString(data.phoneNumber, "Phone number")
            : (account.phoneNumber ?? null),
        primaryContactId,
    });

    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const deleteAccount = onCall<AccountIdRequest, Promise<{ ok: true }>>(
    async (request) => {
        const auth = requireAuth(request);
        const accountId = readRequiredString(
            request.data.accountId,
            "Account ID",
        );
        await requireOwnedAccount(accountId, auth.uid);
        await dcDeleteAccountContacts({ accountId });
        await dcDeleteAccount({ id: accountId });
        return { ok: true };
    },
);

export const createAccountContact = onCall<
    CreateAccountContactRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    await dcCreateAccountContact({
        id: randomUUID(),
        accountId,
        name: readRequiredString(request.data.name, "Contact name"),
        email: readOptionalNullableString(request.data.email, "Email"),
        phoneNumber: readOptionalNullableString(
            request.data.phoneNumber,
            "Phone number",
        ),
        role: readOptionalNullableString(request.data.role, "Role"),
    });
    await dcUpdateAccount({
        id: accountId,
        companyName: account.companyName,
        businessNumber: account.businessNumber ?? null,
        phoneNumber: account.phoneNumber ?? null,
        primaryContactId: account.primaryContactId ?? null,
    });
    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const updateAccountContact = onCall<
    UpdateAccountContactRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const contactId = readRequiredString(request.data.contactId, "Contact ID");
    const contact = await requireOwnedAccountContact(
        accountId,
        contactId,
        auth.uid,
    );
    const data = request.data;

    await dcUpdateAccountContact({
        id: contactId,
        name: hasField(data, "name")
            ? readRequiredString(data.name, "Contact name")
            : contact.name,
        email: hasField(data, "email")
            ? readOptionalNullableString(data.email, "Email")
            : (contact.email ?? null),
        phoneNumber: hasField(data, "phoneNumber")
            ? readOptionalNullableString(data.phoneNumber, "Phone number")
            : (contact.phoneNumber ?? null),
        role: hasField(data, "role")
            ? readOptionalNullableString(data.role, "Role")
            : (contact.role ?? null),
    });

    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const deleteAccountContact = onCall<
    ContactIdRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const contactId = readRequiredString(request.data.contactId, "Contact ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    await requireOwnedAccountContact(accountId, contactId, auth.uid);

    if (account.primaryContactId === contactId) {
        await dcUpdateAccount({
            id: accountId,
            companyName: account.companyName,
            businessNumber: account.businessNumber ?? null,
            phoneNumber: account.phoneNumber ?? null,
            primaryContactId: null,
        });
    }

    await dcDeleteAccountContact({ id: contactId });
    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const setPrimaryAccountContact = onCall<
    ContactIdRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const contactId = readRequiredString(request.data.contactId, "Contact ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    await requireOwnedAccountContact(accountId, contactId, auth.uid);
    await dcUpdateAccount({
        id: accountId,
        companyName: account.companyName,
        businessNumber: account.businessNumber ?? null,
        phoneNumber: account.phoneNumber ?? null,
        primaryContactId: contactId,
    });
    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const getSettings = onCall<unknown, Promise<UserSettings>>(
    async (request) => {
        const auth = requireAuth(request);
        return getUserSettingsOrDefault(auth.uid);
    },
);

export const updateSettings = onCall<
    UpdateSettingsRequest,
    Promise<UserSettings>
>(async (request) => {
    const auth = requireAuth(request);
    const settings = await getUserSettingsOrDefault(auth.uid);
    const quoteFollowUpEnabled =
        readOptionalBoolean(
            request.data.quoteFollowUpEnabled,
            "Quote follow-up enabled",
        ) ?? settings.quoteFollowUpEnabled;
    const quoteFollowUpDays =
        readOptionalPositiveInteger(
            request.data.quoteFollowUpDays,
            "Quote follow-up days",
        ) ?? settings.quoteFollowUpDays;

    await upsertUserSettings({
        ownerId: auth.uid,
        quoteFollowUpEnabled,
        quoteFollowUpDays,
    });

    return getUserSettingsOrDefault(auth.uid);
});

export const listDueReminders = onCall<
    unknown,
    Promise<{ reminders: Reminder[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await dcListDueReminders({ ownerId: auth.uid });
    return { reminders: response.data.reminders.map(toDueReminder) };
});

export const listProjectReminders = onCall<
    ProjectIdRequest,
    Promise<{ reminders: Reminder[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);
    const response = await dcListProjectReminders({ projectId });
    return {
        reminders: response.data.reminders
            .filter((reminder) => reminder.ownerId === auth.uid)
            .map(toReminder),
    };
});

export const createReminder = onCall<CreateReminderRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const project = await requireOwnedProject(
            readRequiredString(request.data.projectId, "Project ID"),
            auth.uid,
        );
        const accountId = hasField(request.data, "accountId")
            ? readOptionalNullableString(request.data.accountId, "Account ID")
            : (project.accountId ?? null);
        if (accountId) {
            await requireOwnedAccount(accountId, auth.uid);
        }

        const reminderId = randomUUID();
        await dcCreateReminder({
            id: reminderId,
            ownerId: auth.uid,
            projectId: project.id,
            accountId,
            name: readRequiredString(request.data.name, "Reminder name"),
            status: "OPEN",
            dueAt: readDueAt(request.data.dueAt, "Due date"),
            autoCreated: false,
        });

        return toReminder(await requireOwnedReminder(reminderId, auth.uid));
    },
);

export const updateReminder = onCall<UpdateReminderRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const reminder = await requireOwnedReminder(
            readRequiredString(request.data.reminderId, "Reminder ID"),
            auth.uid,
        );
        const data = request.data;
        const accountId = hasField(data, "accountId")
            ? readOptionalNullableString(data.accountId, "Account ID")
            : (reminder.accountId ?? null);

        if (accountId) {
            await requireOwnedAccount(accountId, auth.uid);
        }

        await dcUpdateReminder({
            id: reminder.id,
            accountId,
            name: hasField(data, "name")
                ? readRequiredString(data.name, "Reminder name")
                : reminder.name,
            status: hasField(data, "status")
                ? readReminderStatus(data.status)
                : toReminderStatus(reminder.status),
            dueAt: hasField(data, "dueAt")
                ? readDueAt(data.dueAt, "Due date")
                : reminder.dueAt,
            completedAt:
                hasField(data, "status") && data.status === "DONE"
                    ? new Date().toISOString()
                    : (reminder.completedAt ?? null),
        });

        return toReminder(await requireOwnedReminder(reminder.id, auth.uid));
    },
);

export const completeReminder = onCall<ReminderIdRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const reminder = await requireOwnedReminder(
            readRequiredString(request.data.reminderId, "Reminder ID"),
            auth.uid,
        );
        await dcUpdateReminder({
            id: reminder.id,
            accountId: reminder.accountId ?? null,
            name: reminder.name,
            status: "DONE",
            dueAt: reminder.dueAt,
            completedAt: new Date().toISOString(),
        });
        return toReminder(await requireOwnedReminder(reminder.id, auth.uid));
    },
);

export const cancelReminder = onCall<ReminderIdRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const reminder = await requireOwnedReminder(
            readRequiredString(request.data.reminderId, "Reminder ID"),
            auth.uid,
        );
        await dcUpdateReminder({
            id: reminder.id,
            accountId: reminder.accountId ?? null,
            name: reminder.name,
            status: "CANCELLED",
            dueAt: reminder.dueAt,
            completedAt: reminder.completedAt ?? null,
        });
        return toReminder(await requireOwnedReminder(reminder.id, auth.uid));
    },
);

export const deleteProject = onCall<ProjectIdRequest, Promise<{ ok: true }>>(
    async (request) => {
        const auth = requireAuth(request);
        const projectId = readRequiredString(
            request.data.projectId,
            "Project ID",
        );
        const project = await requireOwnedProject(projectId, auth.uid);

        await deleteOwnedProjectStorage(project, auth.uid);
        await dcDeleteFloorplanPages({ projectId });
        await dcDeleteProject({ id: projectId });

        return { ok: true };
    },
);

export const listProcessingStrategies = onCall<
    unknown,
    { strategies: ProcessingStrategyInfo[] }
>((request) => {
    requireAuth(request);
    return { strategies: processingStrategies };
});

export const processProject = onCall<
    ProcessProjectRequest,
    Promise<ProjectDetail>
>(
    { timeoutSeconds: LONG_RUNNING_TIMEOUT_SECONDS, memory: "512MiB" },
    async (request) => {
        const auth = requireAuth(request);
        const projectId = readRequiredString(
            request.data.projectId,
            "Project ID",
        );
        const project = await requireOwnedProject(projectId, auth.uid);
        const pageNumbers = readPageNumbers(request.data.pageNumbers, project);
        const strategyKey = readOptionalString(request.data.strategyKey);
        const strategy =
            processingStrategies.find((item) => item.key === strategyKey) ??
            processingStrategies.find((item) => item.defaultStrategy) ??
            processingStrategies[0];

        if (!strategy) {
            throw new HttpsError(
                "internal",
                "No processing strategy is configured.",
            );
        }

        const pdfPageImagePaths =
            project.uploadType === "PDF"
                ? await readPdfPageImagePaths(
                      request.data.pageImagePaths,
                      pageNumbers,
                      auth.uid,
                      projectId,
                  )
                : new Map<number, string>();

        await touchProject({
            id: projectId,
            status: "PROCESSING",
            processingError: null,
        });
        await dcDeleteFloorplanPages({ projectId });

        try {
            if (project.uploadType === "IMAGE") {
                const imageBytes = await fetchOriginalImage(
                    project.originalPath,
                );
                for (const pageNumber of pageNumbers) {
                    await analysePage(
                        auth.uid,
                        projectId,
                        pageNumber,
                        project.originalPath,
                        project.originalFileName,
                        imageBytes,
                        strategy,
                    );
                }
            } else {
                for (const pageNumber of pageNumbers) {
                    const sourcePath = pdfPageImagePaths.get(pageNumber);
                    if (!sourcePath) {
                        throw new HttpsError(
                            "invalid-argument",
                            `Missing source image for PDF page ${pageNumber}.`,
                        );
                    }
                    const { bytes, url } = await fetchStorageImage(sourcePath);
                    await analysePage(
                        auth.uid,
                        projectId,
                        pageNumber,
                        url,
                        `${project.originalFileName} page ${pageNumber}`,
                        bytes,
                        strategy,
                    );
                }
            }
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Floorplan analysis failed.";
            logger.error("processProject failed", { projectId, message });
            await touchProject({
                id: projectId,
                status: "FAILED",
                processingError: message,
            });
            throw error instanceof HttpsError
                ? error
                : new HttpsError("internal", message);
        }

        await touchProject({
            id: projectId,
            status: "READY",
            processingError: null,
        });
        return toDetail(await requireOwnedProject(projectId, auth.uid));
    },
);

export const getFloorplanPage = onCall<
    UpdateFloorplanPageRequest,
    Promise<FloorplanPage>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);
    return toPage(
        await requireFloorplanPage(
            projectId,
            readRequiredString(request.data.pageId, "Page ID"),
        ),
    );
});

export const updateFloorplanPage = onCall<
    UpdateFloorplanPageRequest,
    Promise<FloorplanPage>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);

    const page = await requireFloorplanPage(
        projectId,
        readRequiredString(request.data.pageId, "Page ID"),
    );
    const data = request.data;
    const overlayJson = hasField(data, "overlay")
        ? JSON.stringify(data.overlay ?? { areas: [] })
        : page.overlayJson;
    const scaleMmPerPx = hasField(data, "scaleMmPerPx")
        ? readNullableNumber(data.scaleMmPerPx, "Scale")
        : (page.scaleMmPerPx ?? null);
    const ceilingHeightMm = hasField(data, "ceilingHeightMm")
        ? readNullableNumber(data.ceilingHeightMm, "Ceiling height")
        : (page.ceilingHeightMm ?? null);
    const referencePointsJson = hasField(data, "referencePoints")
        ? data.referencePoints == null
            ? null
            : JSON.stringify(data.referencePoints)
        : (page.referencePointsJson ?? null);
    const referenceLengthMm = hasField(data, "referenceLengthMm")
        ? readNullableNumber(data.referenceLengthMm, "Reference length")
        : (page.referenceLengthMm ?? null);

    await dcUpdateFloorplanPage({
        id: page.id,
        overlayJson: overlayJson ?? null,
        scaleMmPerPx,
        ceilingHeightMm,
        referencePointsJson,
        referenceLengthMm,
    });
    await touchProject({ id: projectId });

    return toPage(await requireFloorplanPage(projectId, page.id));
});

export const updateFloorplanPages = onCall<
    UpdateFloorplanPagesRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const project = await requireOwnedProject(projectId, auth.uid);
    const data = request.data;

    const hasScale = hasField(data, "scaleMmPerPx");
    const hasCeilingHeight = hasField(data, "ceilingHeightMm");

    if (!hasScale && !hasCeilingHeight) {
        throw new HttpsError(
            "invalid-argument",
            "Scale or ceiling height is required.",
        );
    }

    for (const page of project.pages) {
        const nextScaleMmPerPx: number | null = hasScale
            ? (readNullableNumber(data.scaleMmPerPx, "Scale") ??
              page.scaleMmPerPx ??
              null)
            : (page.scaleMmPerPx ?? null);
        const nextCeilingHeightMm: number | null = hasCeilingHeight
            ? (readNullableNumber(data.ceilingHeightMm, "Ceiling height") ??
              page.ceilingHeightMm ??
              null)
            : (page.ceilingHeightMm ?? null);

        await dcUpdateFloorplanPage({
            id: page.id,
            overlayJson: page.overlayJson ?? null,
            scaleMmPerPx: nextScaleMmPerPx,
            ceilingHeightMm: nextCeilingHeightMm,
            referencePointsJson: page.referencePointsJson ?? null,
            referenceLengthMm: page.referenceLengthMm ?? null,
        });
    }

    await touchProject({ id: projectId });
    return toDetail(await requireOwnedProject(projectId, auth.uid));
});

export const exportProjectCsv = onCall<
    ProjectIdRequest,
    Promise<ExportProjectCsvResponse>
>(async (request) => {
    const auth = requireAuth(request);
    const project = await requireOwnedProject(
        readRequiredString(request.data.projectId, "Project ID"),
        auth.uid,
    );

    return {
        fileName: `plaster-estimate-${csvFileNamePart(project.name)}.csv`,
        mimeType: "text/csv",
        csv: buildProjectCsv(project),
    };
});

interface ProjectUpdateFields {
    name?: string;
    accountId?: string | null;
    address?: string | null;
    salesStatus?: SalesStatus;
}

async function updateOwnedProject(
    projectId: string,
    ownerId: string,
    updates: ProjectUpdateFields,
) {
    const project = await requireOwnedProject(projectId, ownerId);
    const nextAccountId = hasField(updates, "accountId")
        ? (updates.accountId ?? null)
        : (project.accountId ?? null);

    if (nextAccountId) {
        await requireOwnedAccount(nextAccountId, ownerId);
    }

    const nextSalesStatus = hasField(updates, "salesStatus")
        ? (updates.salesStatus ?? toSalesStatus(project.salesStatus))
        : toSalesStatus(project.salesStatus);

    await dcUpdateProject({
        id: projectId,
        name: updates.name ?? project.name,
        accountId: nextAccountId,
        address: hasField(updates, "address")
            ? (updates.address ?? null)
            : (project.address ?? null),
        salesStatus: nextSalesStatus,
    });

    const updatedProject = await requireOwnedProject(projectId, ownerId);

    if (
        hasField(updates, "salesStatus") &&
        nextSalesStatus === "QUOTE_SUBMITTED"
    ) {
        await upsertAutoQuoteReminder(updatedProject, ownerId);
    } else if (
        hasField(updates, "salesStatus") &&
        (nextSalesStatus === "WON" || nextSalesStatus === "LOST")
    ) {
        await cancelOpenAutoQuoteReminder(projectId, ownerId);
    }

    return toDetail(await requireOwnedProject(projectId, ownerId));
}

async function upsertAutoQuoteReminder(
    project: ProjectWithPages,
    ownerId: string,
) {
    const settings = await getUserSettingsOrDefault(ownerId);
    if (!settings.quoteFollowUpEnabled) {
        return;
    }

    const dueAt = addDays(new Date(), settings.quoteFollowUpDays).toISOString();
    const name = `${quoteFollowUpReminderPrefix}${project.name}`;
    const existing = (await getOpenAutoQuoteReminder({ projectId: project.id }))
        .data.reminder;

    if (existing && existing.ownerId === ownerId) {
        await dcUpdateReminder({
            id: existing.id,
            accountId: project.accountId ?? null,
            name,
            status: "OPEN",
            dueAt,
            completedAt: existing.completedAt ?? null,
        });
        return;
    }

    await dcCreateReminder({
        id: randomUUID(),
        ownerId,
        projectId: project.id,
        accountId: project.accountId ?? null,
        name,
        status: "OPEN",
        dueAt,
        autoCreated: true,
    });
}

async function cancelOpenAutoQuoteReminder(projectId: string, ownerId: string) {
    const reminder = (await getOpenAutoQuoteReminder({ projectId })).data
        .reminder;
    if (!reminder || reminder.ownerId !== ownerId) {
        return;
    }

    await dcUpdateReminder({
        id: reminder.id,
        accountId: reminder.accountId ?? null,
        name: reminder.name,
        status: "CANCELLED",
        dueAt: reminder.dueAt,
        completedAt: reminder.completedAt ?? null,
    });
}

async function requireOwnedProject(projectId: string, ownerId: string) {
    // TODO: Add a lightweight ownership helper backed by getProjectById for
    // callsites that do not need floorplan pages.
    const response = await getProjectDetailsById({ id: projectId });
    const project = response.data.project;
    if (!project || project.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Project was not found.");
    }

    return project;
}

async function requireOwnedAccount(accountId: string, ownerId: string) {
    const response = await getAccountById({ id: accountId });
    const account = response.data.account;
    if (!account || account.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Account was not found.");
    }

    return account;
}

async function requireOwnedAccountContact(
    accountId: string,
    contactId: string,
    ownerId: string,
) {
    await requireOwnedAccount(accountId, ownerId);
    const response = await getAccountContactById({ accountId, contactId });
    const contact = response.data.accountContact;
    if (!contact) {
        throw new HttpsError("not-found", "Contact was not found.");
    }

    return contact;
}

async function requireOwnedReminder(reminderId: string, ownerId: string) {
    const response = await getReminderById({ id: reminderId });
    const reminder = response.data.reminder;
    if (!reminder || reminder.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Reminder was not found.");
    }

    return reminder;
}

async function getUserSettingsOrDefault(
    ownerId: string,
): Promise<UserSettings> {
    const settings = (await getUserSettings({ ownerId })).data.userSettings;
    if (!settings) {
        return {
            ownerId,
            quoteFollowUpEnabled: defaultQuoteFollowUpEnabled,
            quoteFollowUpDays: defaultQuoteFollowUpDays,
            createdAt: null,
            updatedAt: null,
        };
    }

    return {
        ownerId: settings.ownerId,
        quoteFollowUpEnabled: settings.quoteFollowUpEnabled,
        quoteFollowUpDays: settings.quoteFollowUpDays,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
    };
}

async function requireFloorplanPage(projectId: string, pageId: string) {
    const response = await getFloorplanPageById({ projectId, pageId });
    const page = response.data.floorplanPage;
    if (!page) {
        throw new HttpsError("not-found", "Page was not found.");
    }

    return page;
}

function toSummary(
    project: ProjectListRow | ProjectWithPages | ProjectDetailsRow,
): ProjectSummary {
    return {
        id: project.id,
        accountId: project.accountId ?? null,
        name: project.name,
        address: project.address ?? null,
        originalFileName: project.originalFileName,
        uploadType: toUploadType(project.uploadType),
        status: toProjectStatus(project.status),
        salesStatus: toSalesStatus(project.salesStatus),
        processingError: project.processingError ?? null,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        pageCount: project.pageCount,
    };
}

function toDetail(project: ProjectWithPages): ProjectDetail {
    return {
        ...toSummary(project),
        ownerId: project.ownerId,
        pages: project.pages.map(toPage),
    };
}

function toAccountSummary(
    account: AccountListRow | AccountWithContacts,
): AccountSummary {
    return {
        id: account.id,
        ownerId: account.ownerId,
        companyName: account.companyName,
        businessNumber: account.businessNumber ?? null,
        phoneNumber: account.phoneNumber ?? null,
        primaryContactId: account.primaryContactId ?? null,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
    };
}

function toAccountDetail(account: AccountWithContacts): AccountDetail {
    return {
        ...toAccountSummary(account),
        contacts: account.contacts.map(toAccountContact),
    };
}

function toAccountContact(contact: AccountContactRow): AccountContact {
    return {
        id: contact.id,
        accountId: contact.accountId,
        name: contact.name,
        email: contact.email ?? null,
        phoneNumber: contact.phoneNumber ?? null,
        role: contact.role ?? null,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
    };
}

function toReminder(reminder: ReminderRow | ProjectReminderRow): Reminder {
    return {
        id: reminder.id,
        ownerId: reminder.ownerId,
        projectId: reminder.projectId,
        accountId: reminder.accountId ?? null,
        name: reminder.name,
        status: toReminderStatus(reminder.status),
        dueAt: reminder.dueAt,
        completedAt: reminder.completedAt ?? null,
        autoCreated: reminder.autoCreated,
        createdAt: reminder.createdAt,
        updatedAt: reminder.updatedAt,
    };
}

function toDueReminder(reminder: DueReminderRow): Reminder {
    return {
        ...toReminder(reminder),
        project: {
            id: reminder.project.id,
            name: reminder.project.name,
        },
    };
}

function toPage(page: FloorplanPageRow): FloorplanPage {
    const imageUrl = storagePathToUrl(page.sourceImagePath);
    return {
        id: page.id,
        pageNumber: page.pageNumber,
        status: toProjectStatus(page.status),
        imageUrl,
        previewUrl: storagePathToUrl(page.previewImagePath) || imageUrl,
        overlay: page.overlayJson ?? null,
        scaleMmPerPx: page.scaleMmPerPx ?? null,
        ceilingHeightMm: page.ceilingHeightMm ?? null,
        referencePoints: page.referencePointsJson ?? null,
        referenceLengthMm: page.referenceLengthMm ?? null,
        processingStrategy: page.processingStrategy ?? null,
        processingMetadata: page.processingMetadataJson ?? null,
        updatedAt: page.updatedAt,
    };
}

function toUploadType(value: string): UploadType {
    return value === "PDF" ? "PDF" : "IMAGE";
}

function toProjectStatus(value: string): ProjectStatus {
    if (
        value === "DRAFT" ||
        value === "PROCESSING" ||
        value === "READY" ||
        value === "FAILED"
    ) {
        return value;
    }

    return "DRAFT";
}

function readSalesStatus(value: unknown): SalesStatus {
    if (typeof value !== "string") {
        throw new HttpsError(
            "invalid-argument",
            "Sales status must be a string.",
        );
    }

    const status = toSalesStatus(value);
    if (status !== value) {
        throw new HttpsError(
            "invalid-argument",
            "Sales status must be QUOTING, QUOTE_SUBMITTED, WON, or LOST.",
        );
    }

    return status;
}

function toSalesStatus(value: string): SalesStatus {
    if (
        value === "QUOTING" ||
        value === "QUOTE_SUBMITTED" ||
        value === "WON" ||
        value === "LOST"
    ) {
        return value;
    }

    return "QUOTING";
}

function readReminderStatus(value: unknown): ReminderStatus {
    if (typeof value !== "string") {
        throw new HttpsError(
            "invalid-argument",
            "Reminder status must be a string.",
        );
    }

    const status = toReminderStatus(value);
    if (status !== value) {
        throw new HttpsError(
            "invalid-argument",
            "Reminder status must be OPEN, DONE, or CANCELLED.",
        );
    }

    return status;
}

function toReminderStatus(value: string): ReminderStatus {
    if (value === "OPEN" || value === "DONE" || value === "CANCELLED") {
        return value;
    }

    return "OPEN";
}

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
}

function readPageNumbers(value: unknown, project: ProjectWithPages) {
    if (!Array.isArray(value) || value.length === 0) {
        return [1];
    }

    const numbers = value.map((item) =>
        readRequiredNumber(item, "Page number"),
    );
    const unique = Array.from(new Set(numbers)).sort(
        (left, right) => left - right,
    );

    if (project.uploadType === "IMAGE") {
        return [1];
    }

    unique.forEach((pageNumber) => {
        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1 ||
            pageNumber > project.pageCount
        ) {
            throw new HttpsError(
                "invalid-argument",
                "Page number is outside the uploaded PDF range.",
            );
        }
    });

    return unique;
}

async function readPdfPageImagePaths(
    value: unknown,
    pageNumbers: number[],
    uid: string,
    projectId: string,
) {
    if (!isRecord(value)) {
        throw new HttpsError(
            "invalid-argument",
            "Selected PDF page images are required.",
        );
    }

    const paths = new Map<number, string>();
    for (const pageNumber of pageNumbers) {
        const rawPath = value[String(pageNumber)];
        if (typeof rawPath !== "string" || rawPath.trim().length === 0) {
            throw new HttpsError(
                "invalid-argument",
                `Source image is required for PDF page ${pageNumber}.`,
            );
        }

        const path = rawPath.trim();
        if (!isOwnedPageSourcePath(path, uid, projectId, pageNumber)) {
            throw new HttpsError(
                "permission-denied",
                "PDF page source image path must belong to the signed-in user and project.",
            );
        }

        await requireStorageImage(path);
        paths.set(pageNumber, path);
    }

    return paths;
}

function inferUploadType(fileName: string, contentType: string): UploadType {
    const lowerName = fileName.toLowerCase();
    const lowerType = contentType.toLowerCase();
    return lowerName.endsWith(".pdf") || lowerType.includes("pdf")
        ? "PDF"
        : "IMAGE";
}

function isOwnedUploadPath(
    storagePath: string,
    uid: string,
    projectId: string,
) {
    return storagePath.startsWith(
        `uploads/${uid}/projects/${projectId}/uploads/`,
    );
}

function isOwnedPageSourcePath(
    storagePath: string,
    uid: string,
    projectId: string,
    pageNumber: number,
) {
    return (
        storagePath ===
        `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/source.png`
    );
}

async function deleteOwnedProjectStorage(
    project: ProjectWithPages,
    uid: string,
) {
    const bucket = getStorage().bucket();
    const paths = [
        project.originalPath,
        ...project.pages.flatMap((page) => [
            page.sourceImagePath,
            page.previewImagePath,
            page.rawJsonPath,
            page.rawFloorplanPath,
        ]),
    ].filter((path): path is string => Boolean(path));

    for (const path of new Set(paths)) {
        if (path.startsWith(`uploads/${uid}/`) && !path.startsWith("data:")) {
            await bucket.file(path).delete({ ignoreNotFound: true });
        }
    }

    await bucket.deleteFiles({
        force: true,
        prefix: `uploads/${uid}/projects/${project.id}/`,
    });
}

function storagePathToUrl(path?: string | null) {
    if (!path) {
        return "";
    }

    if (path.startsWith("data:") || path.startsWith("http")) {
        return path;
    }

    const bucketName = getStorage().bucket().name;
    return `https://storage.googleapis.com/${bucketName}/${encodeStoragePath(path)}`;
}

function encodeStoragePath(path: string) {
    return path
        .split("/")
        .map((part) => encodeURIComponent(part))
        .join("/");
}

async function analysePage(
    uid: string,
    projectId: string,
    pageNumber: number,
    originalUrl: string,
    originalFileName: string,
    imageBytes: Buffer,
    strategy: ProcessingStrategy,
): Promise<void> {
    const { result, floorplanPng } = await callFloorplanAnalyzer(
        strategy.endpoint,
        imageBytes,
        originalFileName,
        strategy.queryParams,
    );

    const overlay = buildOverlayFromAnalyzerResult(
        strategy,
        originalFileName,
        result,
    );

    const floorplanPath = `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/floorplan.png`;
    const floorplanUrl = await uploadStorageBuffer(
        floorplanPath,
        floorplanPng,
        "image/png",
    );

    const jsonPath = `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/result.json`;
    const jsonUrl = await uploadStorageBuffer(
        jsonPath,
        Buffer.from(JSON.stringify(result), "utf-8"),
        "application/json",
    );

    await dcCreateFloorplanPage({
        projectId,
        pageNumber,
        status: "READY",
        sourceImagePath: originalUrl,
        previewImagePath: floorplanUrl,
        overlayJson: JSON.stringify(overlay),
        scaleMmPerPx: null,
        ceilingHeightMm: null,
        referencePointsJson: null,
        referenceLengthMm: null,
        processingStrategy: strategy.key,
        processingMetadataJson: JSON.stringify({
            strategy: strategy.key,
            endpoint: strategy.endpoint,
            polygonsKey: strategy.polygonsKey,
            imageSizePx: result.image_size_px ?? null,
            roomCount: overlay.areas.length,
            ocrSeedCount: result.ocr_seed_count ?? null,
            jsonUrl,
            floorplanUrl,
        }),
    });
}

async function fetchOriginalImage(originalUrl: string): Promise<Buffer> {
    if (!originalUrl) {
        throw new HttpsError(
            "failed-precondition",
            "Project is missing an uploaded image.",
        );
    }

    const response = await fetch(originalUrl);
    if (!response.ok) {
        throw new HttpsError(
            "internal",
            `Could not fetch the uploaded image (HTTP ${response.status}).`,
        );
    }

    return Buffer.from(await response.arrayBuffer());
}

async function requireStorageImage(path: string): Promise<void> {
    const file = getStorage().bucket().file(path);
    const [exists] = await file.exists();
    if (!exists) {
        throw new HttpsError(
            "not-found",
            "PDF page source image was not found.",
        );
    }

    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType ?? "";
    if (!contentType.startsWith("image/")) {
        throw new HttpsError(
            "invalid-argument",
            "PDF page source file must be an image.",
        );
    }
}

async function fetchStorageImage(
    path: string,
): Promise<{ bytes: Buffer; url: string }> {
    await requireStorageImage(path);
    const file = getStorage().bucket().file(path);
    const [bytes] = await file.download();
    return {
        bytes,
        url: await ensureFileDownloadUrl(path),
    };
}

async function callFloorplanAnalyzer(
    endpoint: FloorplanAnalyzerEndpoint,
    imageBytes: Buffer,
    filename: string,
    queryParams: Record<string, string>,
): Promise<{ result: AnalyzerResult; floorplanPng: Buffer }> {
    const url = floorplanAnalyzerUrl(endpoint, queryParams);
    const headers: Record<string, string> = {};
    if (!isEmulator()) {
        const audience = audienceForEndpoint(endpoint);
        headers["Authorization"] = `Bearer ${await getIdToken(audience)}`;
    }

    const response = await fetchFloorplanAnalyzerWithRetry(
        url,
        endpoint,
        imageBytes,
        filename,
        headers,
    );

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new HttpsError(
            "internal",
            `floorplan-analyzer ${endpoint} failed (HTTP ${response.status})${text ? `: ${text}` : ""}`,
        );
    }

    const zipBuffer = Buffer.from(await response.arrayBuffer());
    const zip = await JSZip.loadAsync(zipBuffer);

    const jsonFile =
        zip.file("rooms.json") ??
        zip.file("walls.json") ??
        zip.file("result.json");
    if (!jsonFile) {
        throw new HttpsError(
            "internal",
            "floorplan-analyzer response was missing rooms.json/walls.json.",
        );
    }

    const pngFile = zip.file("floorplan.png");
    if (!pngFile) {
        throw new HttpsError(
            "internal",
            "floorplan-analyzer response was missing floorplan.png.",
        );
    }

    const result = JSON.parse(await jsonFile.async("string")) as AnalyzerResult;
    const floorplanPng = Buffer.from(await pngFile.async("uint8array"));

    return { result, floorplanPng };
}

async function fetchFloorplanAnalyzerWithRetry(
    url: string,
    endpoint: FloorplanAnalyzerEndpoint,
    imageBytes: Buffer,
    filename: string,
    headers: Record<string, string>,
): Promise<Response> {
    const maxAttempts = isEmulator() ? 2 : 1;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: buildAnalyzerForm(imageBytes, filename),
                headers,
                signal: AbortSignal.timeout(
                    LONG_RUNNING_TIMEOUT_SECONDS * 1000,
                ),
            });

            if (response.ok || attempt === maxAttempts) {
                return response;
            }

            const text = await response.text().catch(() => "");
            logger.warn("floorplan-analyzer request failed; retrying", {
                endpoint,
                attempt,
                status: response.status,
                text,
            });
        } catch (error) {
            lastError = error;
            if (attempt === maxAttempts) {
                throw error;
            }

            logger.warn("floorplan-analyzer request errored; retrying", {
                endpoint,
                attempt,
                message: error instanceof Error ? error.message : String(error),
            });
        }

        await sleep(3_000);
    }

    throw lastError instanceof Error
        ? lastError
        : new Error("floorplan-analyzer request failed.");
}

function buildAnalyzerForm(imageBytes: Buffer, filename: string): FormData {
    const form = new FormData();
    const arrayBuffer = imageBytes.buffer.slice(
        imageBytes.byteOffset,
        imageBytes.byteOffset + imageBytes.byteLength,
    ) as ArrayBuffer;
    const blob = new Blob([arrayBuffer], {
        type: "application/octet-stream",
    });
    form.append("image", blob, filename || "upload.bin");
    return form;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function floorplanAnalyzerUrl(
    endpoint: FloorplanAnalyzerEndpoint,
    queryParams: Record<string, string>,
): string {
    const project = projectId();
    const query = toQueryString(queryParams);
    if (isEmulator()) {
        const host = process.env["FUNCTIONS_EMULATOR_HOST"] ?? "127.0.0.1:5001";
        return `http://${host}/${project}/${FLOORPLAN_ANALYZER_REGION}/${endpoint}${query}`;
    }
    return `https://${FLOORPLAN_ANALYZER_REGION}-${project}.cloudfunctions.net/${endpoint}${query}`;
}

function audienceForEndpoint(endpoint: FloorplanAnalyzerEndpoint): string {
    const project = projectId();
    return `https://${FLOORPLAN_ANALYZER_REGION}-${project}.cloudfunctions.net/${endpoint}`;
}

function toQueryString(queryParams: Record<string, string>): string {
    const entries = Object.entries(queryParams);
    if (entries.length === 0) {
        return "";
    }
    const search = new URLSearchParams(entries);
    return `?${search.toString()}`;
}

async function getIdToken(audience: string): Promise<string> {
    const client = await googleAuth.getIdTokenClient(audience);
    return client.idTokenProvider.fetchIdToken(audience);
}

function buildOverlayFromAnalyzerResult(
    strategy: ProcessingStrategy,
    sourceFile: string,
    result: AnalyzerResult,
): OverlayDocument {
    const items =
        strategy.polygonsKey === "walls"
            ? (result.walls ?? [])
            : (result.rooms ?? []);
    const areas = items
        .map((item) => analyzerItemToOverlayArea(item))
        .filter((area): area is OverlayArea => area !== null);
    return {
        sourceFile,
        ...(result.image_size_px ? { imageSizePx: result.image_size_px } : {}),
        areas,
    };
}

function analyzerItemToOverlayArea(item: AnalyzerPolygon): OverlayArea | null {
    if (!Array.isArray(item.polygon) || item.polygon.length < 3) {
        return null;
    }

    const points: [number, number][] = [];
    for (const pt of item.polygon) {
        if (
            Array.isArray(pt) &&
            pt.length >= 2 &&
            typeof pt[0] === "number" &&
            typeof pt[1] === "number"
        ) {
            points.push([pt[0], pt[1]]);
        }
    }
    if (points.length < 3) {
        return null;
    }

    const roomType = item.room_type ?? null;
    const isOutdoor = roomType === "Outdoor";
    const defaultPlasterType = defaultPlasterTypeForRoom(roomType);
    const candidateLabel =
        (typeof item.label === "string" && item.label.trim()) ||
        (roomType ? roomType : "") ||
        (typeof item.id === "number" ? `Area ${item.id}` : "Area");

    const area: OverlayArea = {
        id: randomUUID(),
        label: candidateLabel,
        points,
        wallPlasterType: defaultPlasterType,
        ceilingPlasterType: defaultPlasterType,
        ceilingMode: "flat",
        isOutdoor,
        source: "detected",
        deleted: false,
        sourceRoomType: roomType,
    };

    if (typeof item.area_px === "number") {
        area.sourceAreaPx = item.area_px;
    }
    if (typeof item.approx_length_px === "number") {
        area.sourceApproxLengthPx = item.approx_length_px;
    } else if (typeof item.perimeter_px === "number") {
        area.sourceApproxLengthPx = item.perimeter_px;
    }
    if (typeof item.is_hole === "boolean") {
        area.sourceIsHole = item.is_hole;
    }

    return area;
}

function defaultPlasterTypeForRoom(roomType: string | null): string {
    return roomType === "Bath" ? "Water Resistant" : "Recessed Edge";
}

async function uploadStorageBuffer(
    path: string,
    body: Buffer,
    contentType: string,
): Promise<string> {
    const token = randomUUID();
    const bucket = getStorage().bucket();
    const file = bucket.file(path);
    await file.save(body, {
        contentType,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: token,
            },
        },
    });
    return firebaseStorageDownloadUrl(bucket.name, path, token);
}

async function ensureFileDownloadUrl(path: string): Promise<string> {
    const bucket = getStorage().bucket();
    const file = bucket.file(path);
    const [metadata] = await file.getMetadata();
    const customMetadata = (metadata.metadata ?? {}) as Record<string, unknown>;
    const existing = customMetadata["firebaseStorageDownloadTokens"];
    let token = typeof existing === "string" ? existing.split(",")[0] : "";
    if (!token) {
        token = randomUUID();
        await file.setMetadata({
            metadata: { firebaseStorageDownloadTokens: token },
        });
    }
    return firebaseStorageDownloadUrl(bucket.name, path, token);
}

function firebaseStorageDownloadUrl(
    bucketName: string,
    path: string,
    token: string,
): string {
    const emulatorHost =
        process.env["STORAGE_EMULATOR_HOST"] ??
        process.env["FIREBASE_STORAGE_EMULATOR_HOST"];
    const base = emulatorHost
        ? emulatorHost.startsWith("http")
            ? emulatorHost
            : `http://${emulatorHost}`
        : "https://firebasestorage.googleapis.com";
    return `${base}/v0/b/${bucketName}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
}

function isEmulator(): boolean {
    return Boolean(process.env["FUNCTIONS_EMULATOR"]);
}

function projectId(): string {
    return (
        process.env["GCLOUD_PROJECT"] ??
        process.env["GCP_PROJECT"] ??
        process.env["FIREBASE_PROJECT"] ??
        "plaster-calculator"
    );
}

function buildProjectCsv(project: ProjectWithPages) {
    const rows: ExportRow[] = [];
    const wallColumns = new Set<string>();
    const ceilingColumns = new Set<string>();

    for (const page of project.pages) {
        if (!page.overlayJson || page.scaleMmPerPx == null) {
            continue;
        }

        const overlay = parseJsonObject(page.overlayJson);
        const areas = Array.isArray(overlay["areas"]) ? overlay["areas"] : [];

        for (const area of areas) {
            if (!isRecord(area) || Boolean(area["deleted"])) {
                continue;
            }

            const row: ExportRow = {
                label:
                    typeof area["label"] === "string" ? area["label"] : "Area",
                pageNumber: page.pageNumber,
                wallValues: wallBreakdown(
                    area,
                    page.scaleMmPerPx,
                    page.ceilingHeightMm ?? null,
                ),
                ceilingValues: new Map([
                    [
                        ceilingColumn(area),
                        ceilingAreaM2(area, page.scaleMmPerPx),
                    ],
                ]),
            };

            row.wallValues.forEach((_, key) => wallColumns.add(key));
            row.ceilingValues.forEach((_, key) => ceilingColumns.add(key));
            rows.push(row);
        }
    }

    const sortedWallColumns = Array.from(wallColumns).sort();
    const sortedCeilingColumns = Array.from(ceilingColumns).sort();
    const totals = new Map<string, number>();
    const csvRows = [
        [
            "Area Label",
            "Page Number",
            ...sortedWallColumns,
            ...sortedCeilingColumns,
        ],
    ];

    for (const row of rows) {
        const cells = [row.label, String(row.pageNumber)];
        for (const column of sortedWallColumns) {
            const value = row.wallValues.get(column) ?? 0;
            addTotal(totals, column, value);
            cells.push(formatNumber(value));
        }
        for (const column of sortedCeilingColumns) {
            const value = row.ceilingValues.get(column) ?? 0;
            addTotal(totals, column, value);
            cells.push(formatNumber(value));
        }
        csvRows.push(cells);
    }

    csvRows.push([
        "Total",
        "",
        ...sortedWallColumns.map((column) =>
            formatNumber(totals.get(column) ?? 0),
        ),
        ...sortedCeilingColumns.map((column) =>
            formatNumber(totals.get(column) ?? 0),
        ),
    ]);

    return csvRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
}

interface ExportRow {
    label: string;
    pageNumber: number;
    wallValues: Map<string, number>;
    ceilingValues: Map<string, number>;
}

type JsonRecord = Record<string, unknown>;
type Point = [number, number];

function addTotal(totals: Map<string, number>, column: string, value: number) {
    totals.set(column, (totals.get(column) ?? 0) + value);
}

function ceilingColumn(area: JsonRecord) {
    const ceilingType = readString(area["ceilingPlasterType"], "Recessed Edge");
    return `Ceiling (${ceilingType}) in m2`;
}

function ceilingAreaM2(area: JsonRecord, scaleMmPerPx: number) {
    const points = readPoints(area["points"]);
    const flatM2 = polygonAreaPx(points) * Math.pow(scaleMmPerPx / 1000, 2);
    if (readString(area["ceilingMode"], "flat") !== "raked") {
        return flatM2;
    }

    const raked = isRecord(area["rakedCeiling"]) ? area["rakedCeiling"] : null;
    if (!raked) {
        return flatM2;
    }

    const lowEdgeIndex = readInteger(raked["lowEdgeIndex"], -1);
    const highEdgeIndex = readInteger(raked["highEdgeIndex"], -1);
    const lowHeight = readNumberOrNull(raked["lowHeightMm"]);
    const highHeight = readNumberOrNull(raked["highHeightMm"]);
    if (
        lowHeight == null ||
        highHeight == null ||
        lowEdgeIndex === highEdgeIndex
    ) {
        return flatM2;
    }

    const runM =
        (edgeMidpointDistance(points, lowEdgeIndex, highEdgeIndex) *
            scaleMmPerPx) /
        1000;
    if (runM <= 0) {
        return flatM2;
    }

    const riseM = Math.abs(highHeight - lowHeight) / 1000;
    return flatM2 * Math.sqrt(1 + Math.pow(riseM / runM, 2));
}

function edgeMidpointDistance(
    points: Point[],
    firstEdge: number,
    secondEdge: number,
) {
    if (
        firstEdge < 0 ||
        secondEdge < 0 ||
        firstEdge >= points.length ||
        secondEdge >= points.length
    ) {
        return 0;
    }

    const firstA = points[firstEdge];
    const firstB = points[(firstEdge + 1) % points.length];
    const secondA = points[secondEdge];
    const secondB = points[(secondEdge + 1) % points.length];
    if (!firstA || !firstB || !secondA || !secondB) {
        return 0;
    }

    const firstX = (firstA[0] + firstB[0]) / 2;
    const firstY = (firstA[1] + firstB[1]) / 2;
    const secondX = (secondA[0] + secondB[0]) / 2;
    const secondY = (secondA[1] + secondB[1]) / 2;
    return Math.hypot(secondX - firstX, secondY - firstY);
}

function wallBreakdown(
    area: JsonRecord,
    scaleMmPerPx: number,
    pageHeightMm: number | null,
) {
    const totals = new Map<string, number>();
    if (area["isOutdoor"]) {
        return totals;
    }

    const points = readPoints(area["points"]);
    if (points.length < 2) {
        return totals;
    }

    const overrides: JsonRecord = isRecord(area["edgeOverrides"])
        ? area["edgeOverrides"]
        : {};

    for (let index = 0; index < points.length; index += 1) {
        const rawOverride = overrides[String(index)];
        const override: JsonRecord | null = isRecord(rawOverride)
            ? rawOverride
            : null;
        if (override && Boolean(override["noPlaster"])) {
            continue;
        }

        const wallType =
            override && typeof override["wallPlasterType"] === "string"
                ? override["wallPlasterType"]
                : readString(area["wallPlasterType"], "Recessed Edge");
        const height = wallHeightForEdge(area, pageHeightMm, index);
        const column = `${wallType} @ ${heightLabel(height)} in m`;
        const a = points[index];
        const b = points[(index + 1) % points.length];
        if (!a || !b) {
            continue;
        }

        const lengthM =
            (Math.hypot(b[0] - a[0], b[1] - a[1]) * scaleMmPerPx) / 1000;
        totals.set(column, (totals.get(column) ?? 0) + lengthM);
    }

    return totals;
}

function wallHeightForEdge(
    area: JsonRecord,
    pageHeightMm: number | null,
    edgeIndex: number,
) {
    if (
        readString(area["ceilingMode"], "flat") === "raked" &&
        isRecord(area["rakedCeiling"])
    ) {
        const raked = area["rakedCeiling"];
        const low = readNumberOrNull(raked["lowHeightMm"]);
        const high = readNumberOrNull(raked["highHeightMm"]);
        if (low != null && high != null) {
            return edgeIndex === readInteger(raked["lowEdgeIndex"], -1)
                ? low
                : high;
        }
    }

    const areaHeight = readNumberOrNull(area["ceilingHeightMm"]);
    if (areaHeight != null) {
        return areaHeight;
    }

    return pageHeightMm ?? 0;
}

function parseJsonObject(value: string): JsonRecord {
    try {
        const parsed: unknown = JSON.parse(value);
        return isRecord(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

function readPoints(value: unknown): Point[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.flatMap((item) => {
        if (
            Array.isArray(item) &&
            item.length >= 2 &&
            typeof item[0] === "number" &&
            typeof item[1] === "number"
        ) {
            return [[item[0], item[1]] as Point];
        }

        return [];
    });
}

function polygonAreaPx(points: Point[]) {
    if (points.length < 3) {
        return 0;
    }

    let sum = 0;
    for (let index = 0; index < points.length; index += 1) {
        const current = points[index];
        const next = points[(index + 1) % points.length];
        if (!current || !next) {
            continue;
        }
        sum += current[0] * next[1] - next[0] * current[1];
    }

    return Math.abs(sum) / 2;
}

function isRecord(value: unknown): value is JsonRecord {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, fallback: string) {
    return typeof value === "string" ? value : fallback;
}

function readInteger(value: unknown, fallback: number) {
    return typeof value === "number" && Number.isInteger(value)
        ? value
        : fallback;
}

function readNumberOrNull(value: unknown) {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function heightLabel(heightMm: number) {
    return `${heightMm.toFixed(0)}mm`;
}

function formatNumber(value: number) {
    return value.toFixed(3);
}

function csvFileNamePart(value: string) {
    const cleaned = value
        .trim()
        .replace(/[^A-Za-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return cleaned || "project";
}

function csvCell(value: string) {
    return `"${value.replace(/"/g, '""')}"`;
}
