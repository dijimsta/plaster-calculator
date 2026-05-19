import { storagePathToUrl } from "./storage.js";
import { toReminderStatus, toSalesStatus } from "./validation.js";

import type {
    AccountContact,
    AccountContactListRow,
    AccountContactRow,
    AccountDetail,
    AccountListRow,
    AccountSummary,
    AccountWithContacts,
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

export function toAccountSummary(
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

export function toAccountDetail(account: AccountWithContacts): AccountDetail {
    return {
        ...toAccountSummary(account),
        contacts: account.contacts.map(toAccountContact),
    };
}

export function toAccountContact(
    contact: AccountContactRow | AccountContactListRow,
): AccountContact {
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
