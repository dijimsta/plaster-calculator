import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { getStorage } from "firebase-admin/storage";
import { HttpsError, onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { toDetail, toDetailWithDownloadUrls, toSummary } from "./mappers.js";
import {
    requireOwnedCompany,
    requireOwnedProject,
    requireTeamId,
    requireTeamMember,
} from "./ownership.js";
import {
    type ProjectUpdateFields,
    nextNullableProjectField,
    nextSalesStatusFor,
} from "./project-fields.js";
import { inferUploadType } from "./project-upload.js";
import { syncQuoteReminderForStatusUpdate } from "./quote-follow-up.js";
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
    CompanyIdRequest,
    CreateProjectFromUploadRequest,
    ListProjectsRequest,
    ProjectDetail,
    ProjectIdRequest,
    ProjectSummary,
    RenameProjectRequest,
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
    const response = await DataConnector.listProjectsByTeamAndSalesStatus({
        teamId: await requireTeamId(auth.uid),
        salesStatus,
    });
    return { projects: response.data.projects.map(toSummary) };
});

export const listProjectsByCompany = onCall<
    CompanyIdRequest,
    Promise<{ projects: ProjectSummary[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const companyId = readRequiredString(request.data.companyId, "Company ID");
    await requireOwnedCompany(companyId, auth.uid);
    const response = await DataConnector.listProjectsByCompany({
        companyId,
    });
    return { projects: response.data.projects.map(toSummary) };
});

export const createProjectFromUpload = onCall<
    CreateProjectFromUploadRequest,
    Promise<UploadResponse>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const companyId = readOptionalNullableString(
        request.data.companyId,
        "Company ID",
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

    if (companyId) {
        await requireOwnedCompany(companyId, auth.uid);
    }

    const [exists] = await getStorage().bucket().file(storagePath).exists();
    if (!exists) {
        throw new HttpsError("not-found", "Uploaded file was not found.");
    }

    const originalUrl = await ensureFileDownloadUrl(storagePath);

    const uploadType = inferUploadType(originalFileName, contentType);
    const pageCount =
        uploadType === "PDF" ? readPdfPageCount(request.data.pageCount) : 1;
    const teamId = await requireTeamId(auth.uid);
    const assignee = readOptionalNullableString(
        request.data.assignee,
        "Assignee",
    );
    if (assignee) {
        await requireTeamMember(teamId, assignee);
    }
    await DataConnector.createProjectFromUpload({
        id: projectId,
        teamId,
        assignee,
        companyId,
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
        await DataConnector.createFloorplanPage({
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
    const response = await DataConnector.getProjectById({
        id: readRequiredString(request.data.projectId, "Project ID"),
    });
    const project = response.data.project;

    if (!project || project.teamId !== (await requireTeamId(auth.uid))) {
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

    if (hasField(data, "companyId")) {
        updates.companyId = readOptionalNullableString(
            data.companyId,
            "Company ID",
        );
    }

    if (hasField(data, "address")) {
        updates.address = readOptionalNullableString(data.address, "Address");
    }

    if (hasField(data, "salesStatus")) {
        updates.salesStatus = readSalesStatus(data.salesStatus);
    }

    if (hasField(data, "assignee")) {
        updates.assignee = readOptionalNullableString(
            data.assignee,
            "Assignee",
        );
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
        await DataConnector.deleteFloorplanPages({ projectId });
        await DataConnector.deleteProject({ id: projectId });

        return { ok: true };
    },
);

async function updateOwnedProject(
    projectId: string,
    userId: string,
    updates: ProjectUpdateFields,
) {
    const project = await requireOwnedProject(projectId, userId);
    const teamId = await requireTeamId(userId);
    const nextCompanyId = nextNullableProjectField(
        updates,
        "companyId",
        project.companyId,
    );

    if (nextCompanyId) {
        await requireOwnedCompany(nextCompanyId, userId);
    }

    const nextSalesStatus = nextSalesStatusFor(updates, project.salesStatus);
    const nextAssignee = nextNullableProjectField(
        updates,
        "assignee",
        project.assignee,
    );
    if (nextAssignee) {
        await requireTeamMember(teamId, nextAssignee);
    }

    await DataConnector.updateProject({
        id: projectId,
        name: updates.name ?? project.name,
        companyId: nextCompanyId,
        address: nextNullableProjectField(updates, "address", project.address),
        salesStatus: nextSalesStatus,
        assignee: nextAssignee,
    });

    const updatedProject = await requireOwnedProject(projectId, userId);
    await syncQuoteReminderForStatusUpdate(
        updates,
        nextSalesStatus,
        updatedProject,
        projectId,
        userId,
    );

    return toDetail(await requireOwnedProject(projectId, userId));
}
