import {
    ExportCsvResponseSchema,
    FloorplanPageSchema,
    ListProjectsResponseSchema,
    ProjectDetailSchema,
    ProjectSummarySchema,
    UploadResponseSchema,
} from "@libraries/plaster-calculator-common";
import { httpsCallable, type Functions } from "firebase/functions";
import { ref, uploadBytes, type FirebaseStorage } from "firebase/storage";

import { FirebaseService } from "../firebase/firebase.service.ts";

import type {
    AnalyzeFloorplanPageRequest,
    ExportCsvResponse,
    FloorplanPage,
    ListProjectsRequest,
    ProjectDetail,
    ProjectSummary,
    SavePageOverlayRequest,
    UpdateProjectRequest,
    UploadResponse,
} from "./projects.types.ts";
import type { Auth } from "firebase/auth";

const LONG_RUNNING_CALLABLE_TIMEOUT_MS = 60 * 60 * 1000;

export class ProjectsService {
    public constructor(
        private readonly functions: Functions = FirebaseService.getFunctions(),
        private readonly storage: FirebaseStorage = FirebaseService.getStorage(),
        private readonly auth: Auth = FirebaseService.getAuth(),
    ) {}

    public async listProjects(
        options: ListProjectsRequest,
    ): Promise<ProjectSummary[]> {
        const listProjectsCallable = httpsCallable(
            this.functions,
            "listProjects",
        );
        const { data } = await listProjectsCallable(options);
        return ListProjectsResponseSchema.parse(data).projects;
    }

    public async listProjectsByCompany(
        companyId: string,
    ): Promise<ProjectSummary[]> {
        const listProjectsByCompanyCallable = httpsCallable(
            this.functions,
            "listProjectsByCompany",
        );
        const { data } = await listProjectsByCompanyCallable({ companyId });
        return ListProjectsResponseSchema.parse(data).projects;
    }

    public async uploadProject(
        name: string,
        file: File,
        pageCount?: number,
        options: { companyId?: string | null; address?: string | null } = {},
    ): Promise<UploadResponse> {
        const uid = this.auth.currentUser?.uid;
        if (!uid) {
            throw new Error("Must be signed in to upload a project.");
        }

        const projectId = crypto.randomUUID();
        const storagePath = `uploads/${uid}/projects/${projectId}/uploads/${sanitizeStorageName(file.name)}`;
        await uploadBytes(ref(this.storage, storagePath), file, {
            contentType: file.type || "application/octet-stream",
        });

        const createProjectFromUploadCallable = httpsCallable(
            this.functions,
            "createProjectFromUpload",
        );
        const { data } = await createProjectFromUploadCallable({
            projectId,
            companyId: options.companyId ?? null,
            name,
            address: options.address ?? null,
            originalFileName: file.name,
            contentType: file.type || "application/octet-stream",
            size: file.size,
            storagePath,
            pageCount,
        });
        return UploadResponseSchema.parse(data);
    }

    public async uploadPdfPageSource(
        projectId: string,
        pageNumber: number,
        sourcePng: Blob,
    ): Promise<string> {
        const uid = this.auth.currentUser?.uid;
        if (!uid) {
            throw new Error("Must be signed in to upload PDF pages.");
        }

        const storagePath = `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/source.png`;
        await uploadBytes(ref(this.storage, storagePath), sourcePng, {
            contentType: "image/png",
        });
        return storagePath;
    }

    public async getProject(projectId: string): Promise<ProjectDetail> {
        const getProjectCallable = httpsCallable(this.functions, "getProject");
        const { data } = await getProjectCallable({ projectId });
        return ProjectDetailSchema.parse(data);
    }

    public async getProjectStatus(projectId: string): Promise<ProjectSummary> {
        const getProjectStatusCallable = httpsCallable(
            this.functions,
            "getProjectStatus",
        );
        const { data } = await getProjectStatusCallable({ projectId });
        return ProjectSummarySchema.parse(data);
    }

    public async renameProject(
        projectId: string,
        name: string,
    ): Promise<ProjectDetail> {
        const renameProjectCallable = httpsCallable(
            this.functions,
            "renameProject",
        );
        const { data } = await renameProjectCallable({ projectId, name });
        return ProjectDetailSchema.parse(data);
    }

    public async updateProject(
        payload: UpdateProjectRequest,
    ): Promise<ProjectDetail> {
        const updateProjectCallable = httpsCallable(
            this.functions,
            "updateProject",
        );
        const { data } = await updateProjectCallable(payload);
        return ProjectDetailSchema.parse(data);
    }

    public async deleteProject(projectId: string): Promise<void> {
        const deleteProjectCallable = httpsCallable(
            this.functions,
            "deleteProject",
        );
        await deleteProjectCallable({ projectId });
    }

    public async processProject(
        projectId: string,
        pageNumbers: number[],
        strategyKey?: string,
        pageImagePaths?: Record<number, string>,
    ): Promise<ProjectDetail> {
        const processProjectCallable = httpsCallable(
            this.functions,
            "processProject",
            { timeout: LONG_RUNNING_CALLABLE_TIMEOUT_MS },
        );
        const { data } = await processProjectCallable({
            projectId,
            pageNumbers,
            strategyKey,
            pageImagePaths,
        });
        return ProjectDetailSchema.parse(data);
    }

    public async initializeFloorplanPages(
        projectId: string,
        pageImagePaths: Record<number, string>,
    ): Promise<ProjectDetail> {
        const initializeFloorplanPagesCallable = httpsCallable(
            this.functions,
            "initializeFloorplanPages",
            { timeout: LONG_RUNNING_CALLABLE_TIMEOUT_MS },
        );
        const { data } = await initializeFloorplanPagesCallable({
            projectId,
            pageImagePaths,
        });
        return ProjectDetailSchema.parse(data);
    }

    public async analyzeFloorplanPage(
        request: AnalyzeFloorplanPageRequest,
    ): Promise<ProjectDetail> {
        const analyzeFloorplanPageCallable = httpsCallable(
            this.functions,
            "analyzeFloorplanPage",
            { timeout: LONG_RUNNING_CALLABLE_TIMEOUT_MS },
        );
        const { data } = await analyzeFloorplanPageCallable(request);
        return ProjectDetailSchema.parse(data);
    }

    public async getPage(
        projectId: string,
        pageId: string,
    ): Promise<FloorplanPage> {
        const getFloorplanPageCallable = httpsCallable(
            this.functions,
            "getFloorplanPage",
        );
        const { data } = await getFloorplanPageCallable({
            projectId,
            pageId,
        });
        return FloorplanPageSchema.parse(data);
    }

    public async savePageOverlay(
        projectId: string,
        pageId: string,
        payload: unknown,
    ): Promise<FloorplanPage> {
        const updateFloorplanPageCallable = httpsCallable(
            this.functions,
            "updateFloorplanPage",
        );
        const body = payload as Partial<SavePageOverlayRequest>;
        const { data } = await updateFloorplanPageCallable({
            projectId,
            pageId,
            overlay: body.overlay ?? { areas: [] },
            scaleMmPerPx: body.scaleMmPerPx ?? null,
            ceilingHeightMm: body.ceilingHeightMm ?? null,
            referencePoints: body.referencePoints ?? null,
            referenceLengthMm: body.referenceLengthMm ?? null,
        });
        return FloorplanPageSchema.parse(data);
    }

    public async applyCeilingHeightToProject(
        projectId: string,
        ceilingHeightMm: number | null,
    ): Promise<ProjectDetail> {
        return this.updateFloorplanPages({ projectId, ceilingHeightMm });
    }

    public async applyScaleToProject(
        projectId: string,
        scaleMmPerPx: number | null,
    ): Promise<ProjectDetail> {
        return this.updateFloorplanPages({ projectId, scaleMmPerPx });
    }

    public async exportProjectCsv(
        projectId: string,
    ): Promise<ExportCsvResponse> {
        const exportProjectCsvCallable = httpsCallable(
            this.functions,
            "exportProjectCsv",
        );
        const { data } = await exportProjectCsvCallable({ projectId });
        return ExportCsvResponseSchema.parse(data);
    }

    private async updateFloorplanPages(payload: {
        projectId: string;
        scaleMmPerPx?: number | null;
        ceilingHeightMm?: number | null;
    }): Promise<ProjectDetail> {
        const updateFloorplanPagesCallable = httpsCallable(
            this.functions,
            "updateFloorplanPages",
        );
        const { data } = await updateFloorplanPagesCallable(payload);
        return ProjectDetailSchema.parse(data);
    }
}

function sanitizeStorageName(value: string): string {
    return (
        value
            .trim()
            .replace(/[^A-Za-z0-9._-]+/g, "-")
            .replace(/^-+|-+$/g, "") || "upload"
    );
}
