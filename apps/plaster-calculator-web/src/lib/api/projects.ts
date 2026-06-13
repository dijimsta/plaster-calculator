import { httpsCallable } from "firebase/functions";
import { ref, uploadBytes } from "firebase/storage";

import { auth, functions, storage } from "../../firebase/firebase.utils.js";

import type {
    FloorplanPage,
    ProjectDetail,
    ProjectSummary,
    SalesStatus,
} from "../../types.js";

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
    salesStatus?: SalesStatus;
};

type ListProjectsRequest = {
    salesStatus: SalesStatus;
};

type ProcessProjectRequest = {
    projectId: string;
    pageNumbers: number[];
    strategyKey?: string;
    pageImagePaths?: Record<number, string>;
};

interface AnalyzeFloorplanPageRequest {
    readonly projectId: string;
    readonly pageId: string;
    readonly scaleMmPerPx: number | null;
    readonly ceilingHeightMm: number | null;
    readonly referencePoints: string | null;
    readonly referenceLengthMm: number | null;
}

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
    ListProjectsRequest,
    { projects: ProjectSummary[] }
>(functions, "listProjects");
const listProjectsByAccountCallable = httpsCallable<
    { accountId: string },
    { projects: ProjectSummary[] }
>(functions, "listProjectsByAccount");
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
const processProjectCallable = httpsCallable<
    ProcessProjectRequest,
    ProjectDetail
>(functions, "processProject", {
    timeout: LONG_RUNNING_CALLABLE_TIMEOUT_MS,
});
const initializeFloorplanPagesCallable = httpsCallable<
    { projectId: string; pageImagePaths: Record<number, string> },
    ProjectDetail
>(functions, "initializeFloorplanPages");
const analyzeFloorplanPageCallable = httpsCallable<
    AnalyzeFloorplanPageRequest,
    ProjectDetail
>(functions, "analyzeFloorplanPage", {
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

export async function listProjects(options: ListProjectsRequest) {
    const result = await listProjectsCallable(options);
    return result.data.projects;
}

export async function listProjectsByAccount(accountId: string) {
    const result = await listProjectsByAccountCallable({ accountId });
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

export async function initializeFloorplanPages(
    projectId: string,
    pageImagePaths: Record<number, string>,
): Promise<ProjectDetail> {
    const result = await initializeFloorplanPagesCallable({
        projectId,
        pageImagePaths,
    });
    return result.data;
}

export async function analyzeFloorplanPage(
    request: AnalyzeFloorplanPageRequest,
): Promise<ProjectDetail> {
    const result = await analyzeFloorplanPageCallable(request);
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

function sanitizeStorageName(value: string) {
    return (
        value
            .trim()
            .replace(/[^A-Za-z0-9._-]+/g, "-")
            .replace(/^-+|-+$/g, "") || "upload"
    );
}
