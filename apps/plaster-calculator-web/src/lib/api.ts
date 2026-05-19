import { httpsCallable } from "firebase/functions";
import { ref, uploadBytes } from "firebase/storage";

import { auth, functions, storage } from "../firebase/firebase.utils.js";

import type {
    AccountDetail,
    AccountSummary,
    FloorplanPage,
    ProcessingStrategyInfo,
    ProjectDetail,
    ProjectSummary,
    Reminder,
    UserSettings,
} from "../types.js";

const LONG_RUNNING_CALLABLE_TIMEOUT_MS = 60 * 60 * 1000;

type UploadResponse = {
    projectId: string;
    uploadType: "PDF" | "IMAGE";
    pageCount: number;
    status: string;
};

type CreateProjectFromUploadRequest = {
    projectId: string;
    accountId?: string | null;
    name: string;
    address?: string | null;
    originalFileName: string;
    contentType: string;
    size: number;
    storagePath: string;
    pageCount?: number;
};

type UpdateProjectRequest = {
    projectId: string;
    name?: string;
    accountId?: string | null;
    address?: string | null;
    salesStatus?: "QUOTING" | "QUOTE_SUBMITTED" | "WON" | "LOST";
};

type AccountPayload = {
    companyName?: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
};

type AccountContactPayload = {
    name?: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
};

type ReminderPayload = {
    projectId: string;
    accountId?: string | null;
    name: string;
    dueAt: string;
};

type UpdateReminderPayload = {
    reminderId: string;
    accountId?: string | null;
    name?: string;
    dueAt?: string;
    status?: "OPEN" | "DONE" | "CANCELLED";
};

type ProcessProjectRequest = {
    projectId: string;
    pageNumbers: number[];
    strategyKey?: string;
    pageImagePaths?: Record<number, string>;
};

type SavePageOverlayRequest = {
    projectId: string;
    pageId: string;
    overlay: unknown;
    scaleMmPerPx: number | null;
    ceilingHeightMm: number | null;
    referencePoints: unknown;
    referenceLengthMm: number | null;
};

type ExportCsvResponse = {
    fileName: string;
    mimeType: "text/csv";
    csv: string;
};

const listProjectsCallable = httpsCallable<
    unknown,
    { projects: ProjectSummary[] }
>(functions, "listProjects");
const createProjectFromUploadCallable = httpsCallable<
    CreateProjectFromUploadRequest,
    UploadResponse
>(functions, "createProjectFromUpload");
const getProjectCallable = httpsCallable<{ projectId: string }, ProjectDetail>(
    functions,
    "getProject",
);
const getProjectStatusCallable = httpsCallable<
    { projectId: string },
    ProjectSummary
>(functions, "getProjectStatus");
const renameProjectCallable = httpsCallable<
    { projectId: string; name: string },
    ProjectDetail
>(functions, "renameProject");
const updateProjectCallable = httpsCallable<
    UpdateProjectRequest,
    ProjectDetail
>(functions, "updateProject");
const deleteProjectCallable = httpsCallable<
    { projectId: string },
    { ok: true }
>(functions, "deleteProject");
const listAccountsCallable = httpsCallable<
    unknown,
    { accounts: AccountSummary[] }
>(functions, "listAccounts");
const getAccountCallable = httpsCallable<{ accountId: string }, AccountDetail>(
    functions,
    "getAccount",
);
const createAccountCallable = httpsCallable<AccountPayload, AccountDetail>(
    functions,
    "createAccount",
);
const updateAccountCallable = httpsCallable<
    AccountPayload & { accountId: string; primaryContactId?: string | null },
    AccountDetail
>(functions, "updateAccount");
const deleteAccountCallable = httpsCallable<
    { accountId: string },
    { ok: true }
>(functions, "deleteAccount");
const createAccountContactCallable = httpsCallable<
    AccountContactPayload & { accountId: string },
    AccountDetail
>(functions, "createAccountContact");
const updateAccountContactCallable = httpsCallable<
    AccountContactPayload & { accountId: string; contactId: string },
    AccountDetail
>(functions, "updateAccountContact");
const deleteAccountContactCallable = httpsCallable<
    { accountId: string; contactId: string },
    AccountDetail
>(functions, "deleteAccountContact");
const setPrimaryAccountContactCallable = httpsCallable<
    { accountId: string; contactId: string },
    AccountDetail
>(functions, "setPrimaryAccountContact");
const getSettingsCallable = httpsCallable<unknown, UserSettings>(
    functions,
    "getSettings",
);
const updateSettingsCallable = httpsCallable<
    Partial<Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">>,
    UserSettings
>(functions, "updateSettings");
const listDueRemindersCallable = httpsCallable<
    unknown,
    { reminders: Reminder[] }
>(functions, "listDueReminders");
const listProjectRemindersCallable = httpsCallable<
    { projectId: string },
    { reminders: Reminder[] }
>(functions, "listProjectReminders");
const createReminderCallable = httpsCallable<ReminderPayload, Reminder>(
    functions,
    "createReminder",
);
const updateReminderCallable = httpsCallable<UpdateReminderPayload, Reminder>(
    functions,
    "updateReminder",
);
const completeReminderCallable = httpsCallable<
    { reminderId: string },
    Reminder
>(functions, "completeReminder");
const cancelReminderCallable = httpsCallable<{ reminderId: string }, Reminder>(
    functions,
    "cancelReminder",
);
const listProcessingStrategiesCallable = httpsCallable<
    unknown,
    { strategies: ProcessingStrategyInfo[] }
>(functions, "listProcessingStrategies");
const processProjectCallable = httpsCallable<
    ProcessProjectRequest,
    ProjectDetail
>(functions, "processProject", {
    timeout: LONG_RUNNING_CALLABLE_TIMEOUT_MS,
});
const getFloorplanPageCallable = httpsCallable<
    { projectId: string; pageId: string },
    FloorplanPage
>(functions, "getFloorplanPage");
const updateFloorplanPageCallable = httpsCallable<
    SavePageOverlayRequest,
    FloorplanPage
>(functions, "updateFloorplanPage");
const updateFloorplanPagesCallable = httpsCallable<
    {
        projectId: string;
        scaleMmPerPx?: number | null;
        ceilingHeightMm?: number | null;
    },
    ProjectDetail
>(functions, "updateFloorplanPages");
const exportProjectCsvCallable = httpsCallable<
    { projectId: string },
    ExportCsvResponse
>(functions, "exportProjectCsv");

export async function listProjects() {
    const result = await listProjectsCallable();
    return result.data.projects;
}

export async function uploadProject(
    name: string,
    file: File,
    pageCount?: number,
    options: { accountId?: string | null; address?: string | null } = {},
) {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error("Must be signed in to upload a project.");
    }

    const projectId = crypto.randomUUID();
    const storagePath = `uploads/${uid}/projects/${projectId}/uploads/${sanitizeStorageName(file.name)}`;
    await uploadBytes(ref(storage, storagePath), file, {
        contentType: file.type || "application/octet-stream",
    });

    const result = await createProjectFromUploadCallable({
        projectId,
        accountId: options.accountId ?? null,
        name,
        address: options.address ?? null,
        originalFileName: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
        storagePath,
        pageCount,
    });
    return result.data;
}

export async function uploadPdfPageSource(
    projectId: string,
    pageNumber: number,
    sourcePng: Blob,
) {
    const uid = auth.currentUser?.uid;
    if (!uid) {
        throw new Error("Must be signed in to upload PDF pages.");
    }

    const storagePath = `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/source.png`;
    await uploadBytes(ref(storage, storagePath), sourcePng, {
        contentType: "image/png",
    });
    return storagePath;
}

function sanitizeStorageName(value: string) {
    return (
        value
            .trim()
            .replace(/[^A-Za-z0-9._-]+/g, "-")
            .replace(/^-+|-+$/g, "") || "upload"
    );
}

export async function getProject(projectId: string) {
    const result = await getProjectCallable({ projectId });
    return result.data;
}

export async function getProjectStatus(projectId: string) {
    const result = await getProjectStatusCallable({ projectId });
    return result.data;
}

export async function renameProject(projectId: string, name: string) {
    const result = await renameProjectCallable({ projectId, name });
    return result.data;
}

export async function updateProject(payload: UpdateProjectRequest) {
    const result = await updateProjectCallable(payload);
    return result.data;
}

export async function deleteProject(projectId: string) {
    await deleteProjectCallable({ projectId });
}

export async function listAccounts() {
    const result = await listAccountsCallable();
    return result.data.accounts;
}

export async function getAccount(accountId: string) {
    const result = await getAccountCallable({ accountId });
    return result.data;
}

export async function createAccount(
    payload: AccountPayload & { companyName: string },
) {
    const result = await createAccountCallable(payload);
    return result.data;
}

export async function updateAccount(
    accountId: string,
    payload: AccountPayload & { primaryContactId?: string | null },
) {
    const result = await updateAccountCallable({ accountId, ...payload });
    return result.data;
}

export async function deleteAccount(accountId: string) {
    await deleteAccountCallable({ accountId });
}

export async function createAccountContact(
    accountId: string,
    payload: AccountContactPayload & { name: string },
) {
    const result = await createAccountContactCallable({
        accountId,
        ...payload,
    });
    return result.data;
}

export async function updateAccountContact(
    accountId: string,
    contactId: string,
    payload: AccountContactPayload,
) {
    const result = await updateAccountContactCallable({
        accountId,
        contactId,
        ...payload,
    });
    return result.data;
}

export async function deleteAccountContact(
    accountId: string,
    contactId: string,
) {
    const result = await deleteAccountContactCallable({ accountId, contactId });
    return result.data;
}

export async function setPrimaryAccountContact(
    accountId: string,
    contactId: string,
) {
    const result = await setPrimaryAccountContactCallable({
        accountId,
        contactId,
    });
    return result.data;
}

export async function getSettings() {
    const result = await getSettingsCallable();
    return result.data;
}

export async function updateSettings(
    payload: Partial<
        Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">
    >,
) {
    const result = await updateSettingsCallable(payload);
    return result.data;
}

export async function listDueReminders() {
    const result = await listDueRemindersCallable();
    return result.data.reminders;
}

export async function listProjectReminders(projectId: string) {
    const result = await listProjectRemindersCallable({ projectId });
    return result.data.reminders;
}

export async function createReminder(payload: ReminderPayload) {
    const result = await createReminderCallable(payload);
    return result.data;
}

export async function updateReminder(payload: UpdateReminderPayload) {
    const result = await updateReminderCallable(payload);
    return result.data;
}

export async function completeReminder(reminderId: string) {
    const result = await completeReminderCallable({ reminderId });
    return result.data;
}

export async function cancelReminder(reminderId: string) {
    const result = await cancelReminderCallable({ reminderId });
    return result.data;
}

export async function listProcessingStrategies() {
    const result = await listProcessingStrategiesCallable();
    return result.data.strategies;
}

export async function processProject(
    projectId: string,
    pageNumbers: number[],
    strategyKey?: string,
    pageImagePaths?: Record<number, string>,
) {
    const result = await processProjectCallable({
        projectId,
        pageNumbers,
        strategyKey,
        pageImagePaths,
    });
    return result.data;
}

export async function getPage(projectId: string, pageId: string) {
    const result = await getFloorplanPageCallable({ projectId, pageId });
    return result.data;
}

export async function savePageOverlay(
    projectId: string,
    pageId: string,
    payload: unknown,
) {
    const body = payload as Partial<SavePageOverlayRequest>;
    const result = await updateFloorplanPageCallable({
        projectId,
        pageId,
        overlay: body.overlay ?? { areas: [] },
        scaleMmPerPx: body.scaleMmPerPx ?? null,
        ceilingHeightMm: body.ceilingHeightMm ?? null,
        referencePoints: body.referencePoints ?? null,
        referenceLengthMm: body.referenceLengthMm ?? null,
    });
    return result.data;
}

export async function applyCeilingHeightToProject(
    projectId: string,
    ceilingHeightMm: number | null,
) {
    const result = await updateFloorplanPagesCallable({
        projectId,
        ceilingHeightMm,
    });
    return result.data;
}

export async function applyScaleToProject(
    projectId: string,
    scaleMmPerPx: number | null,
) {
    const result = await updateFloorplanPagesCallable({
        projectId,
        scaleMmPerPx,
    });
    return result.data;
}

export async function exportProjectCsv(projectId: string) {
    const result = await exportProjectCsvCallable({ projectId });
    return result.data;
}
