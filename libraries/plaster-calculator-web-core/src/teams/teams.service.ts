import * as DataConnector from "@generated/data-connector-web";
import {
    CreateTeamInvitationRequestSchema,
    CreateTeamInvitationResponseSchema,
    InitializeMyTeamRequestSchema,
    InitializeMyTeamResponseSchema,
    ListPendingTeamInvitationsResponseSchema,
    ListMyTeamMembersResponseSchema,
    MyTeamSummarySchema,
    RemoveTeamMemberRequestSchema,
    RemoveTeamMemberResponseSchema,
    RevokeTeamInvitationRequestSchema,
    RevokeTeamInvitationResponseSchema,
    UpdateTeamNameRequestSchema,
    UpdateTeamNameResponseSchema,
    type CreateTeamInvitationRequest,
    type CreateTeamInvitationResponse,
    type InitializeMyTeamRequest,
    type ListPendingTeamInvitationsResponse,
    type ListMyTeamMembersResponse,
    type MyTeamSummary,
    type RemoveTeamMemberResponse,
    type RevokeTeamInvitationResponse,
    type UpdateTeamNameResponse,
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

    public async initializeMyTeam(invitationToken?: string): Promise<string> {
        const input = invitationToken === undefined ? {} : { invitationToken };
        const request: InitializeMyTeamRequest =
            InitializeMyTeamRequestSchema.parse(input);
        const callable = httpsCallable(this.functions, "initializeMyTeam");
        const { data } = await callable(request);
        return InitializeMyTeamResponseSchema.parse(data).teamId;
    }

    public async listMyTeamMembers(options?: {
        limit?: number;
        offset?: number;
    }): Promise<ListMyTeamMembersResponse> {
        const callable = httpsCallable(this.functions, "listMyTeamMembers");
        const { data } = await callable(options);
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

    public async updateMyTeamName(
        name: string,
    ): Promise<UpdateTeamNameResponse> {
        const request = UpdateTeamNameRequestSchema.parse({ name });
        const callable = httpsCallable(this.functions, "updateMyTeamName");
        const { data } = await callable(request);
        return UpdateTeamNameResponseSchema.parse(data);
    }

    public async listPendingTeamInvitations(options?: {
        limit?: number;
        offset?: number;
    }): Promise<ListPendingTeamInvitationsResponse> {
        const callable = httpsCallable(
            this.functions,
            "listPendingTeamInvitations",
        );
        const { data } = await callable(options);
        return ListPendingTeamInvitationsResponseSchema.parse(data);
    }

    public async createTeamInvitation(
        input: CreateTeamInvitationRequest,
    ): Promise<CreateTeamInvitationResponse> {
        const request = CreateTeamInvitationRequestSchema.parse(input);
        const callable = httpsCallable(this.functions, "createTeamInvitation");
        const { data } = await callable(request);
        return CreateTeamInvitationResponseSchema.parse(data);
    }

    public async revokeTeamInvitation(
        email: string,
    ): Promise<RevokeTeamInvitationResponse> {
        const request = RevokeTeamInvitationRequestSchema.parse({ email });
        const callable = httpsCallable(this.functions, "revokeTeamInvitation");
        const { data } = await callable(request);
        return RevokeTeamInvitationResponseSchema.parse(data);
    }
}
