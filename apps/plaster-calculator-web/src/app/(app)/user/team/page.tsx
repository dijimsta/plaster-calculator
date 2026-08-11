"use client";

import {
    TEAM_OWNER_ROLE,
    type TeamMember,
} from "@libraries/plaster-calculator-common";
import { useUser } from "@libraries/plaster-calculator-web-core";
import {
    Alert,
    Box,
    Button,
    Container,
    ModalDialog,
    Text,
} from "@libraries/uikit-web";
import { useState } from "react";
import type { ReactElement } from "react";

import { UserPageHeader } from "../user-page-header.js";

import { InviteUserPanel } from "./invite-user-panel.js";
import { PendingInvitationsPanel } from "./pending-invitations-panel.js";
import { TeamMembersTable } from "./team-members-table.js";
import { useTeamInvitations } from "./use-team-invitations.js";
import { useTeamMembers } from "./use-team-members.js";

export default function UserTeamPage() {
    const user = useUser();
    const team = useTeamMembers();
    const [memberPendingRemoval, setMemberPendingRemoval] =
        useState<TeamMember | null>(null);
    const isTeamOwner = team.data?.currentUserRole === TEAM_OWNER_ROLE;
    const invitations = useTeamInvitations(isTeamOwner);

    if (!user) return null;

    async function confirmRemoval(): Promise<void> {
        if (memberPendingRemoval === null) return;

        const removed = await team.remove(memberPendingRemoval.userId);
        if (removed) setMemberPendingRemoval(null);
    }

    return (
        <>
            <UserPageHeader activeTab="team" />
            <Container size="wide" padding="always">
                <TeamContent
                    userId={user.uid}
                    team={team}
                    isTeamOwner={isTeamOwner}
                    invitations={invitations}
                    onRequestRemove={setMemberPendingRemoval}
                />
            </Container>
            <RemoveMemberDialog
                member={memberPendingRemoval}
                isRemoving={team.isRemoving}
                onCancel={() => setMemberPendingRemoval(null)}
                onConfirm={() => void confirmRemoval()}
            />
        </>
    );
}

type TeamContentProps = Readonly<{
    userId: string;
    team: ReturnType<typeof useTeamMembers>;
    invitations: ReturnType<typeof useTeamInvitations>;
    isTeamOwner: boolean;
    onRequestRemove(member: TeamMember): void;
}>;

function TeamContent({
    userId,
    team,
    invitations,
    isTeamOwner,
    onRequestRemove,
}: TeamContentProps): ReactElement | null {
    if (team.isLoading) {
        return (
            <Box status>
                <Text variant="muted">Loading team members...</Text>
            </Box>
        );
    }
    if (team.error !== null) {
        return (
            <Box direction="column" gap="md">
                <Alert intent="error" title="Unable to load team members">
                    {team.error}
                </Alert>
                <Box>
                    <Button
                        variant="secondary"
                        onClick={() => void team.refresh()}
                    >
                        Try again
                    </Button>
                </Box>
            </Box>
        );
    }
    if (team.data === null) return null;

    return (
        <Box direction="column" gap="lg">
            <TeamMembersTable
                currentUserId={userId}
                canRemoveMembers={isTeamOwner}
                members={team.data.members}
                onRequestRemove={onRequestRemove}
            />
            {isTeamOwner && (
                <>
                    <PendingInvitationsPanel invitations={invitations} />
                    <InviteUserPanel invitations={invitations} />
                </>
            )}
        </Box>
    );
}

type RemoveMemberDialogProps = Readonly<{
    member: TeamMember | null;
    isRemoving: boolean;
    onCancel(): void;
    onConfirm(): void;
}>;

function RemoveMemberDialog({
    member,
    isRemoving,
    onCancel,
    onConfirm,
}: RemoveMemberDialogProps): ReactElement {
    const displayName = member?.displayName ?? member?.email ?? "This member";
    return (
        <ModalDialog
            open={member !== null}
            onClose={onCancel}
            size="sm"
            title="Remove team member?"
            description="They will lose access to this team workspace."
            showCloseButton={false}
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={isRemoving}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        disabled={isRemoving}
                        onClick={onConfirm}
                    >
                        {isRemoving ? "Removing..." : "Remove member"}
                    </Button>
                </>
            }
        >
            <Text variant="muted">
                {displayName} will be removed from the team.
            </Text>
        </ModalDialog>
    );
}
