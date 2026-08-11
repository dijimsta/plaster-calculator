import {
    EnsureMyTeamResponseSchema,
    ListMyTeamMembersResponseSchema,
    RemoveTeamMemberRequestSchema,
    RemoveTeamMemberResponseSchema,
    type ListMyTeamMembersResponse,
    type RemoveTeamMemberResponse,
} from "@libraries/plaster-calculator-common";
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

    public async listMyTeamMembers(): Promise<ListMyTeamMembersResponse> {
        const callable = httpsCallable(this.functions, "listMyTeamMembers");
        const { data } = await callable();
        return ListMyTeamMembersResponseSchema.parse(data);
    }

    public async removeTeamMember(
        userId: string,
    ): Promise<RemoveTeamMemberResponse> {
        const request = RemoveTeamMemberRequestSchema.parse({ userId });
        const callable = httpsCallable(this.functions, "removeTeamMember");
        const { data } = await callable(request);
        return RemoveTeamMemberResponseSchema.parse(data);
    }
}
