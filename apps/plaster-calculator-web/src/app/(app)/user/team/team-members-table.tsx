import {
    TEAM_OWNER_ROLE,
    type TeamMember,
} from "@libraries/plaster-calculator-common";
import { Avatar, Badge, Box, Button, Table, Text } from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import type { ReactElement } from "react";

export type TeamMembersTableProps = Readonly<{
    currentUserId: string;
    canRemoveMembers: boolean;
    members: readonly TeamMember[];
    onRequestRemove(member: TeamMember): void;
}>;

export function TeamMembersTable({
    currentUserId,
    canRemoveMembers,
    members,
    onRequestRemove,
}: TeamMembersTableProps): ReactElement {
    return (
        <Table bordered label="Team members">
            <Table.Head>
                <Table.Row>
                    <Table.Header>Member</Table.Header>
                    <Table.Header fit>Role</Table.Header>
                    {canRemoveMembers && (
                        <Table.Header fit>Actions</Table.Header>
                    )}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {members.map((member) => (
                    <TeamMemberRow
                        key={member.userId}
                        member={member}
                        isCurrentUser={member.userId === currentUserId}
                        canRemove={
                            canRemoveMembers && member.role !== TEAM_OWNER_ROLE
                        }
                        showActions={canRemoveMembers}
                        onRequestRemove={onRequestRemove}
                    />
                ))}
            </Table.Body>
        </Table>
    );
}

type TeamMemberRowProps = Readonly<{
    member: TeamMember;
    isCurrentUser: boolean;
    canRemove: boolean;
    showActions: boolean;
    onRequestRemove(member: TeamMember): void;
}>;

function TeamMemberRow({
    member,
    isCurrentUser,
    canRemove,
    showActions,
    onRequestRemove,
}: TeamMemberRowProps): ReactElement {
    const displayName = member.displayName ?? "Unknown user";
    return (
        <Table.Row>
            <Table.Cell>
                <Box align="center" gap="md">
                    <Avatar
                        src={member.photoUrl ?? undefined}
                        initials={
                            member.photoUrl === null
                                ? memberInitials(member)
                                : undefined
                        }
                        size="sm"
                    />
                    <Box direction="column" gap="xs">
                        <Box align="center" gap="sm">
                            <Text>
                                <strong>{displayName}</strong>
                            </Text>
                            {isCurrentUser && (
                                <Badge color="indigo" size="xs">
                                    You
                                </Badge>
                            )}
                        </Box>
                        <Text size="sm" variant="muted">
                            {member.email ?? member.userId}
                        </Text>
                    </Box>
                </Box>
            </Table.Cell>
            <Table.Cell fit>
                <Badge
                    color={member.role === TEAM_OWNER_ROLE ? "indigo" : "gray"}
                >
                    {member.role === TEAM_OWNER_ROLE ? "Owner" : "Member"}
                </Badge>
            </Table.Cell>
            {showActions && (
                <Table.Cell fit>
                    {canRemove && (
                        <Button
                            variant="dangerSoft"
                            size="small"
                            label={`Remove ${displayName} from team`}
                            icon={<Trash2 size={16} aria-hidden="true" />}
                            onClick={() => onRequestRemove(member)}
                        />
                    )}
                </Table.Cell>
            )}
        </Table.Row>
    );
}

function memberInitials(member: TeamMember): string {
    const source = member.displayName ?? member.email ?? member.userId;
    const parts = source.trim().split(/\s+/).filter(Boolean);
    return parts
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}
