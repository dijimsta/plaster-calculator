import { httpsCallable } from "firebase/functions";

import { functions } from "../../firebase/firebase.utils.js";

import type { UserSettings } from "@libraries/plaster-calculator-common";

const updateSettingsCallable = httpsCallable<
    Partial<Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">>,
    UserSettings
>(functions, "updateSettings");

export async function updateSettings(
    payload: Partial<
        Pick<UserSettings, "quoteFollowUpEnabled" | "quoteFollowUpDays">
    >,
) {
    const result = await updateSettingsCallable(payload);
    return result.data;
}
