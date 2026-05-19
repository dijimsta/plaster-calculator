import { httpsCallable } from "firebase/functions";

import { functions } from "../../firebase/firebase.utils.js";

import type { UserSettings } from "../../types.js";

const getSettingsCallable = httpsCallable<unknown, UserSettings>(
    functions,
    "getSettings",
);
const updateSettingsCallable = httpsCallable<
    Partial<Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">>,
    UserSettings
>(functions, "updateSettings");

export async function getSettings() {
    const result = await getSettingsCallable();
    return result.data;
}

export async function updateSettings(
    payload: Partial<
        Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">
    >,
) {
    const result = await updateSettingsCallable(payload);
    return result.data;
}
