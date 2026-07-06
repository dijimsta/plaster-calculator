import { ensureFileDownloadUrl, storagePathToUrl } from "./storage.js";
import { toReminderStatus, toSalesStatus } from "./validation.js";

import type {
    FloorplanPage,
    FloorplanPageRow,
    ProjectDetail,
    ProjectDetailsRow,
    ProjectListRow,
    ProjectStatus,
    ProjectSummary,
    ProjectWithPages,
    Reminder,
    ReminderRow,
    UploadType,
    ProjectReminderRow,
} from "./types.js";

export function toSummary(
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

export function toDetail(project: ProjectWithPages): ProjectDetail {
    return {
        ...toSummary(project),
        ownerId: project.ownerId,
        pages: project.pages.map(toPage),
    };
}

export async function toDetailWithDownloadUrls(
    project: ProjectWithPages,
): Promise<ProjectDetail> {
    const detail = toDetail(project);
    return {
        ...detail,
        pages: await Promise.all(
            project.pages.map(async (page) => {
                const mapped = toPage(page);
                const imageUrl = await pagePathToDownloadUrl(
                    page.sourceImagePath,
                );
                const previewUrl = await pagePathToDownloadUrl(
                    page.previewImagePath,
                );
                return {
                    ...mapped,
                    imageUrl,
                    previewUrl: previewUrl || imageUrl,
                };
            }),
        ),
    };
}

async function pagePathToDownloadUrl(
    path: string | null | undefined,
): Promise<string> {
    if (!path) return "";
    if (path.startsWith("data:") || path.startsWith("http")) return path;
    return ensureFileDownloadUrl(path);
}

export function toReminder(
    reminder: ReminderRow | ProjectReminderRow,
): Reminder {
    return {
        id: reminder.id,
        ownerId: reminder.ownerId,
        projectId: reminder.projectId,
        accountId: reminder.accountId ?? null,
        name: reminder.name,
        status: toReminderStatus(reminder.status),
        dueAt: reminder.dueAt,
        completedAt: reminder.completedAt ?? null,
        createdAt: reminder.createdAt,
        updatedAt: reminder.updatedAt,
    };
}

export function toPage(page: FloorplanPageRow): FloorplanPage {
    const imageUrl = storagePathToUrl(page.sourceImagePath);
    return {
        id: page.id,
        pageNumber: page.pageNumber,
        status: toProjectStatus(page.status),
        processingError: page.processingError ?? null,
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

export function toUploadType(value: string): UploadType {
    return value === "PDF" ? "PDF" : "IMAGE";
}

export function toProjectStatus(value: string): ProjectStatus {
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
