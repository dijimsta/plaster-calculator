import * as DataConnector from "@generated/data-connector-web";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { QueryFetchPolicy } from "firebase/data-connect";

import type { UserSettings } from "../../types.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

const defaultQuoteFollowUpEnabled = true;
const defaultQuoteFollowUpDays = 3;

type UserSettingsRow = NonNullable<
    DataConnector.GetMyUserSettingsData["userSettings"]
>;

export async function getSettings(): Promise<UserSettings> {
    const result = await DataConnector.getMyUserSettings(dataConnect, {
        fetchPolicy: QueryFetchPolicy.SERVER_ONLY,
    });
    return toUserSettings(result.data.userSettings);
}

export async function updateSettings(
    payload: Partial<
        Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">
    >,
): Promise<UserSettings> {
    const settings = await getSettings();
    await DataConnector.upsertMyUserSettings(dataConnect, {
        quoteFollowUpEnabled:
            payload.quoteFollowUpEnabled ?? settings.quoteFollowUpEnabled,
        quoteFollowUpDays:
            payload.quoteFollowUpDays ?? settings.quoteFollowUpDays,
    });
    return getSettings();
}

function toUserSettings(
    settings: UserSettingsRow | null | undefined,
): UserSettings {
    if (!settings) {
        return {
            ownerId: FirebaseService.getAuth().currentUser?.uid ?? "",
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
