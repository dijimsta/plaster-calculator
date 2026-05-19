import "./bootstrap.js";

import {
    getUserSettings,
    upsertUserSettings,
} from "@generated/example-data-connector";
import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import {
    readOptionalBoolean,
    readOptionalPositiveInteger,
} from "./validation.js";

import type { UpdateSettingsRequest, UserSettings } from "./types.js";

const defaultQuoteFollowUpEnabled = true;
const defaultQuoteFollowUpDays = 3;

export const getSettings = onCall<unknown, Promise<UserSettings>>(
    async (request) => {
        const auth = requireAuth(request);
        return getUserSettingsOrDefault(auth.uid);
    },
);

export const updateSettings = onCall<
    UpdateSettingsRequest,
    Promise<UserSettings>
>(async (request) => {
    const auth = requireAuth(request);
    const settings = await getUserSettingsOrDefault(auth.uid);
    const quoteFollowUpEnabled =
        readOptionalBoolean(
            request.data.quoteFollowUpEnabled,
            "Quote follow-up enabled",
        ) ?? settings.quoteFollowUpEnabled;
    const quoteFollowUpDays =
        readOptionalPositiveInteger(
            request.data.quoteFollowUpDays,
            "Quote follow-up days",
        ) ?? settings.quoteFollowUpDays;

    await upsertUserSettings({
        ownerId: auth.uid,
        quoteFollowUpEnabled,
        quoteFollowUpDays,
    });

    return getUserSettingsOrDefault(auth.uid);
});

export async function getUserSettingsOrDefault(
    ownerId: string,
): Promise<UserSettings> {
    const settings = (await getUserSettings({ ownerId })).data.userSettings;
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
