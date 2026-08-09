import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { HttpsError } from "firebase-functions/https";

import { ensureTeamForUser } from "./teams.js";

export async function requireTeamId(userId: string): Promise<string> {
    const response = await DataConnector.getTeamMembershipForUser({ userId });
    const membership = response.data.teamMembers[0];
    if (!membership) {
        return (await ensureTeamForUser(userId)).teamId;
    }
    if (response.data.teamMembers.length !== 1) {
        throw new HttpsError("failed-precondition", "User has multiple teams.");
    }

    return membership.teamId;
}

export async function requireTeamMember(teamId: string, userId: string) {
    const response = await DataConnector.getTeamMember({ teamId, userId });
    if (!response.data.teamMember) {
        throw new HttpsError("permission-denied", "User is not a team member.");
    }
}

export async function requireOwnedProject(projectId: string, userId: string) {
    // TODO: Add a lightweight ownership helper backed by getProjectById for
    // callsites that do not need floorplan pages.
    const response = await DataConnector.getProjectDetailsById({
        id: projectId,
    });
    const project = response.data.project;
    if (!project || project.teamId !== (await requireTeamId(userId))) {
        throw new HttpsError("not-found", "Project was not found.");
    }

    return project;
}

export async function requireOwnedCompany(companyId: string, userId: string) {
    const response = await DataConnector.getCompanyById({
        id: companyId,
    });
    const company = response.data.company;
    if (!company || company.teamId !== (await requireTeamId(userId))) {
        throw new HttpsError("not-found", "Company was not found.");
    }

    return company;
}

export async function requireOwnedCompanyContact(
    companyId: string,
    contactId: string,
    userId: string,
) {
    await requireOwnedCompany(companyId, userId);
    const response = await DataConnector.getCompanyContactById({
        companyId,
        contactId,
    });
    const contact = response.data.companyContact;
    if (!contact) {
        throw new HttpsError("not-found", "Contact was not found.");
    }

    return contact;
}

export async function requireOwnedReminder(reminderId: string, userId: string) {
    const response = await DataConnector.getReminderById({
        id: reminderId,
    });
    const reminder = response.data.reminder;
    if (!reminder || reminder.teamId !== (await requireTeamId(userId))) {
        throw new HttpsError("not-found", "Reminder was not found.");
    }

    return reminder;
}
export async function requireFloorplanPage(projectId: string, pageId: string) {
    const response = await DataConnector.getFloorplanPageById({
        projectId,
        pageId,
    });
    const page = response.data.floorplanPage;
    if (!page) {
        throw new HttpsError("not-found", "Page was not found.");
    }

    return page;
}
