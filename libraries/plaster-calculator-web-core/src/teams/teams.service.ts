import { EnsureMyTeamResponseSchema } from "@libraries/plaster-calculator-common";
import { httpsCallable, type Functions } from "firebase/functions";

import { FirebaseService } from "../firebase/firebase.service.ts";

export class TeamsService {
    public constructor(
        private readonly functions: Functions = FirebaseService.getFunctions(),
    ) {}

    public async ensureMyTeam(): Promise<string> {
        const ensureMyTeamCallable = httpsCallable(
            this.functions,
            "ensureMyTeam",
        );
        const { data } = await ensureMyTeamCallable();
        return EnsureMyTeamResponseSchema.parse(data).teamId;
    }
}
