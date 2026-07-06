import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { httpsCallable } from "firebase/functions";

import type { UserSettings } from "@libraries/plaster-calculator-common";

const functions = FirebaseService.getFunctions();

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
