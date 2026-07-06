import "./bootstrap.js";

import {
    createFloorplanPage as dcCreateFloorplanPage,
    createProjectFromUpload as dcCreateProjectFromUpload,
    deleteFloorplanPages as dcDeleteFloorplanPages,
    deleteProject as dcDeleteProject,
    getProjectById,
    listProjectsByAccount as dcListProjectsByAccount,
    listProjectsByOwnerAndSalesStatus,
    updateProject as dcUpdateProject,
} from "@generated/example-data-connector";
import { getStorage } from "firebase-admin/storage";
import { HttpsError, onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { buildProjectCsv, csvFileNamePart } from "./csv-export.js";
import { exampleDataConnect } from "./data-connect.js";
import { toDetail, toDetailWithDownloadUrls, toSummary } from "./mappers.js";
import { requireOwnedAccount, requireOwnedProject } from "./ownership.js";
import {
    type ProjectUpdateFields,
    nextNullableProjectField,
    nextSalesStatusFor,
} from "./project-fields.js";
import { inferUploadType } from "./project-upload.js";
import {
    upsertAutoQuoteReminder,
    cancelOpenProjectReminder,
} from "./quote-follow-up.js";
import {
    deleteOwnedProjectStorage,
    ensureFileDownloadUrl,
    isOwnedUploadPath,
} from "./storage.js";
import {
    hasField,
    readOptionalNullableString,
    readPdfPageCount,
    readRequiredNumber,
    readRequiredString,
    readSalesStatus,
} from "./validation.js";

import type {
    AccountIdRequest,
    CreateProjectFromUploadRequest,
    ExportProjectCsvResponse,
    ListProjectsRequest,
    ProjectDetail,
    ProjectIdRequest,
    ProjectSummary,
    RenameProjectRequest,
    SalesStatus,
    UpdateProjectRequest,
    UploadResponse,
} from "./types.js";

export const listProjects = onCall<
    ListProjectsRequest,
    Promise<{ projects: ProjectSummary[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const data = request.data ?? {};
    const salesStatus = readSalesStatus(data.salesStatus);
    const response = await listProjectsByOwnerAndSalesStatus(
        exampleDataConnect,
        {
            ownerId: auth.uid,
            salesStatus,
        },
    );
    return { projects: response.data.projects.map(toSummary) };
});

export const listProjectsByAccount = onCall<
    AccountIdRequest,
    Promise<{ projects: ProjectSummary[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    await requireOwnedAccount(accountId, auth.uid);
    const response = await dcListProjectsByAccount(exampleDataConnect, {
        accountId,
    });
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
    await dcCreateProjectFromUpload(exampleDataConnect, {
        id: projectId,
        ownerId: auth.uid,
        accountId,
        name,
        address,
        originalFileName,
        uploadType,
        originalPath: originalUrl,
        status: uploadType === "IMAGE" ? "READY" : "DRAFT",
        salesStatus: "QUOTING",
        pageCount,
    });

    if (uploadType === "IMAGE") {
        await dcCreateFloorplanPage(exampleDataConnect, {
            projectId,
            pageNumber: 1,
            status: "READY",
            processingError: null,
            sourceImagePath: originalUrl,
            previewImagePath: originalUrl,
            overlayJson: JSON.stringify({
                sourceFile: originalFileName,
                areas: [],
            }),
            scaleMmPerPx: null,
            ceilingHeightMm: null,
            referencePointsJson: null,
            referenceLengthMm: null,
            processingStrategy: null,
            processingMetadataJson: null,
        });
    }

    return {
        projectId,
        uploadType,
        pageCount,
        status: uploadType === "IMAGE" ? "READY" : "DRAFT",
    };
});

export const getProject = onCall<ProjectIdRequest, Promise<ProjectDetail>>(
    async (request) => {
        const auth = requireAuth(request);
        const project = await requireOwnedProject(
            readRequiredString(request.data.projectId, "Project ID"),
            auth.uid,
        );
        return toDetailWithDownloadUrls(project);
    },
);

export const getProjectStatus = onCall<
    ProjectIdRequest,
    Promise<ProjectSummary>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await getProjectById(exampleDataConnect, {
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

export const deleteProject = onCall<ProjectIdRequest, Promise<{ ok: true }>>(
    async (request) => {
        const auth = requireAuth(request);
        const projectId = readRequiredString(
            request.data.projectId,
            "Project ID",
        );
        const project = await requireOwnedProject(projectId, auth.uid);

        await deleteOwnedProjectStorage(project, auth.uid, projectId);
        await dcDeleteFloorplanPages(exampleDataConnect, { projectId });
        await dcDeleteProject(exampleDataConnect, { id: projectId });

        return { ok: true };
    },
);

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

async function updateOwnedProject(
    projectId: string,
    ownerId: string,
    updates: ProjectUpdateFields,
) {
    const project = await requireOwnedProject(projectId, ownerId);
    const nextAccountId = nextNullableProjectField(
        updates,
        "accountId",
        project.accountId,
    );

    if (nextAccountId) {
        await requireOwnedAccount(nextAccountId, ownerId);
    }

    const nextSalesStatus = nextSalesStatusFor(updates, project.salesStatus);

    await dcUpdateProject(exampleDataConnect, {
        id: projectId,
        name: updates.name ?? project.name,
        accountId: nextAccountId,
        address: nextNullableProjectField(updates, "address", project.address),
        salesStatus: nextSalesStatus,
    });

    const updatedProject = await requireOwnedProject(projectId, ownerId);
    await syncQuoteReminderForStatusUpdate(
        updates,
        nextSalesStatus,
        updatedProject,
        projectId,
        ownerId,
    );

    return toDetail(await requireOwnedProject(projectId, ownerId));
}

async function syncQuoteReminderForStatusUpdate(
    updates: ProjectUpdateFields,
    salesStatus: SalesStatus,
    project: Awaited<ReturnType<typeof requireOwnedProject>>,
    projectId: string,
    ownerId: string,
) {
    if (!hasField(updates, "salesStatus")) {
        return;
    }

    if (salesStatus === "QUOTE_SUBMITTED") {
        await upsertAutoQuoteReminder(project, ownerId);
        return;
    }

    if (salesStatus === "WON" || salesStatus === "LOST") {
        await cancelOpenProjectReminder(projectId, ownerId);
    }
}
