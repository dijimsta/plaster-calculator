import {
    getAccountById,
    getAccountContactById,
    getFloorplanPageById,
    getProjectDetailsById,
    getReminderById,
} from "@generated/example-data-connector";
import { HttpsError } from "firebase-functions/https";

export async function requireOwnedProject(projectId: string, ownerId: string) {
    // TODO: Add a lightweight ownership helper backed by getProjectById for
    // callsites that do not need floorplan pages.
    const response = await getProjectDetailsById({ id: projectId });
    const project = response.data.project;
    if (!project || project.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Project was not found.");
    }

    return project;
}

export async function requireOwnedAccount(accountId: string, ownerId: string) {
    const response = await getAccountById({ id: accountId });
    const account = response.data.account;
    if (!account || account.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Account was not found.");
    }

    return account;
}

export async function requireOwnedAccountContact(
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

export async function requireOwnedReminder(
    reminderId: string,
    ownerId: string,
) {
    const response = await getReminderById({ id: reminderId });
    const reminder = response.data.reminder;
    if (!reminder || reminder.ownerId !== ownerId) {
        throw new HttpsError("not-found", "Reminder was not found.");
    }

    return reminder;
}
export async function requireFloorplanPage(projectId: string, pageId: string) {
    const response = await getFloorplanPageById({ projectId, pageId });
    const page = response.data.floorplanPage;
    if (!page) {
        throw new HttpsError("not-found", "Page was not found.");
    }

    return page;
}
