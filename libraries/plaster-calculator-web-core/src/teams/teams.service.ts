import * as DataConnector from "@generated/data-connector-web";
import {
    EnsureMyTeamResponseSchema,
    ListMyTeamMembersResponseSchema,
    MyTeamSummarySchema,
    RemoveTeamMemberRequestSchema,
    RemoveTeamMemberResponseSchema,
    type ListMyTeamMembersResponse,
    type MyTeamSummary,
    type RemoveTeamMemberResponse,
} from "@libraries/plaster-calculator-common";
import type { DataConnect } from "firebase/data-connect";
import { httpsCallable, type Functions } from "firebase/functions";

import { FirebaseService } from "../firebase/firebase.service.ts";

export class TeamsService {
    public constructor(
        private readonly functions: Functions = FirebaseService.getFunctions(),
        private readonly dataConnect: DataConnect = FirebaseService.getDataConnect(
            DataConnector.connectorConfig,
        ),
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

    public async getMyTeamSummary(): Promise<MyTeamSummary> {
        const result = await DataConnector.getMyTeam(this.dataConnect);
        const membership = result.data.teamMembers[0];
        if (result.data.teamMembers.length !== 1 || membership === undefined) {
            throw new Error("User must belong to exactly one team.");
        }
        return MyTeamSummarySchema.parse({
            teamId: membership.teamId,
            name: membership.team.name,
            role: membership.role,
        });
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
