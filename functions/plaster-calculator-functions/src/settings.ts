import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";

import type { UserSettings } from "./types.js";

const defaultQuoteFollowUpEnabled = true;
const defaultQuoteFollowUpDays = 3;

export async function getUserSettingsOrDefault(
    ownerId: string,
): Promise<UserSettings> {
    const settings = (await DataConnector.getUserSettings({ ownerId })).data
        .userSettings;
    if (!settings) {
        return {
            ownerId,
            quoteFollowUpEnabled: defaultQuoteFollowUpEnabled,
            quoteFollowUpDays: defaultQuoteFollowUpDays,
            createdAt: null,
            updatedAt: null,
        };
    }

    return {
        ownerId: settings.ownerId,
        quoteFollowUpEnabled: settings.quoteFollowUpEnabled,
        quoteFollowUpDays: settings.quoteFollowUpDays,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
    };
}
