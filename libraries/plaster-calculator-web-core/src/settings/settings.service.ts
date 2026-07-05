import {
    UserSettingsSchema,
    type UserSettings,
} from "@libraries/plaster-calculator-common";
import { httpsCallable, type Functions } from "firebase/functions";
import { useMemo } from "react";

export class SettingsService {
    public constructor(private readonly functions: Functions) {}

    public async getSettings(): Promise<UserSettings> {
        const callable = httpsCallable(this.functions, "getSettings");
        const result = await callable();
        return await UserSettingsSchema.parseAsync(result.data);
    }

    public static use(functions: Functions): SettingsService {
        return useMemo(() => new SettingsService(functions), [functions]);
    }
}
