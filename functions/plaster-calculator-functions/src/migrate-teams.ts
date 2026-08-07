import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { getAuth } from "firebase-admin/auth";

import { ensureTeamForUser } from "./teams.js";

async function main() {
    const teamIds = new Map<string, string>();
    let pageToken: string | undefined;

    do {
        const page = await getAuth().listUsers(1000, pageToken);
        for (const user of page.users) {
            teamIds.set(user.uid, await ensureTeamForUser(user.uid));
        }
        pageToken = page.pageToken;
    } while (pageToken);

    const resources = await DataConnector.listLegacyTeamOwnedResources();
    await Promise.all([
        ...resources.data.projects.map((row) =>
            backfill(
                row.ownerId,
                row.id,
                DataConnector.backfillProjectTeam,
                teamIds,
            ),
        ),
        ...resources.data.accounts.map((row) =>
            backfill(
                row.ownerId,
                row.id,
                DataConnector.backfillAccountTeam,
                teamIds,
            ),
        ),
        ...resources.data.questionnaireTemplates.map((row) =>
            backfill(
                row.ownerId,
                row.id,
                DataConnector.backfillQuestionnaireTemplateTeam,
                teamIds,
            ),
        ),
        ...resources.data.reminders.map((row) =>
            backfill(
                row.ownerId,
                row.id,
                DataConnector.backfillReminderTeam,
                teamIds,
            ),
        ),
        ...resources.data.quoteItemTemplates
            .filter((row) => row.scope !== "SYSTEM")
            .map((row) =>
                backfill(
                    row.ownerId,
                    row.id,
                    DataConnector.backfillQuoteItemTemplateTeam,
                    teamIds,
                ),
            ),
        ...resources.data.suppliers.map((row) =>
            backfill(
                row.ownerId,
                row.id,
                DataConnector.backfillSupplierTeam,
                teamIds,
            ),
        ),
        ...resources.data.quotes.map((row) =>
            backfill(
                row.ownerId,
                row.id,
                DataConnector.backfillQuoteTeam,
                teamIds,
            ),
        ),
        ...resources.data.quoteItems.map((row) =>
            backfill(
                row.ownerId,
                row.id,
                DataConnector.backfillQuoteItemTeam,
                teamIds,
            ),
        ),
        ...resources.data.quoteItemTemplateConfigs.map(async (row) => {
            const teamId = requireTeamId(row.ownerId, teamIds);
            await DataConnector.backfillQuoteItemTemplateConfigTeam({
                ownerId: row.ownerId,
                templateId: row.templateId,
                teamId,
            });
        }),
        ...resources.data.supplierQuoteItemPrices.map(async (row) => {
            const teamId = requireTeamId(row.ownerId, teamIds);
            await DataConnector.backfillSupplierQuoteItemPriceTeam({
                supplierId: row.supplierId,
                templateId: row.templateId,
                teamId,
            });
        }),
    ]);
}

async function backfill(
    ownerId: string | null | undefined,
    id: string,
    update: (variables: { id: string; teamId: string }) => Promise<unknown>,
    teamIds: Map<string, string>,
) {
    await update({ id, teamId: requireTeamId(ownerId, teamIds) });
}

function requireTeamId(
    ownerId: string | null | undefined,
    teamIds: Map<string, string>,
) {
    if (!ownerId || !teamIds.has(ownerId)) {
        throw new Error(
            `Cannot resolve a team for legacy owner ${ownerId ?? "<none>"}.`,
        );
    }
    return teamIds.get(ownerId)!;
}

void main();
