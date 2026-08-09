import * as DataConnector from "@generated/data-connector-web";
import { UserSettingsSchema } from "@libraries/plaster-calculator-common";
import { QueryFetchPolicy, type DataConnect } from "firebase/data-connect";

import { FirebaseService } from "../firebase/firebase.service.ts";

import type { UserSettings } from "./settings.types.ts";
import type { Auth } from "firebase/auth";

const DEFAULT_QUOTE_FOLLOW_UP_ENABLED = true;
const DEFAULT_QUOTE_FOLLOW_UP_DAYS = 3;

type UserSettingsRow = NonNullable<
    DataConnector.GetMyUserSettingsData["userSettings"]
>;

export class SettingsService {
    public constructor(
        private readonly dataConnect: DataConnect = FirebaseService.getDataConnect(
            DataConnector.connectorConfig,
        ),
        private readonly auth: Auth = FirebaseService.getAuth(),
    ) {}

    public async getSettings(): Promise<UserSettings> {
        const result = await DataConnector.getMyUserSettings(this.dataConnect, {
            fetchPolicy: QueryFetchPolicy.SERVER_ONLY,
        });
        return this.toUserSettings(result.data.userSettings);
    }

    public async updateSettings(
        payload: Partial<
            Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">
        >,
    ): Promise<UserSettings> {
        const settings = await this.getSettings();
        await DataConnector.upsertMyUserSettings(this.dataConnect, {
            quoteFollowUpEnabled:
                payload.quoteFollowUpEnabled ?? settings.quoteFollowUpEnabled,
            quoteFollowUpDays:
                payload.quoteFollowUpDays ?? settings.quoteFollowUpDays,
        });
        return this.getSettings();
    }

    private toUserSettings(
        settings: UserSettingsRow | null | undefined,
    ): UserSettings {
        if (!settings) {
            return UserSettingsSchema.parse({
                ownerId: this.auth.currentUser?.uid ?? "",
                quoteFollowUpEnabled: DEFAULT_QUOTE_FOLLOW_UP_ENABLED,
                quoteFollowUpDays: DEFAULT_QUOTE_FOLLOW_UP_DAYS,
                createdAt: null,
                updatedAt: null,
            });
        }

        return UserSettingsSchema.parse({
            ownerId: settings.ownerId,
            quoteFollowUpEnabled: settings.quoteFollowUpEnabled,
            quoteFollowUpDays: settings.quoteFollowUpDays,
            createdAt: settings.createdAt,
            updatedAt: settings.updatedAt,
        });
    }
}
