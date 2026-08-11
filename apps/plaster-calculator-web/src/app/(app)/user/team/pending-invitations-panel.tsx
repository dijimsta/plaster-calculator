import {
    formatRelativeTime,
    TEAM_MEMBER_ROLE,
    type PendingTeamInvitation,
    type TeamInvitationRole,
} from "@libraries/plaster-calculator-common";
import {
    Alert,
    Badge,
    Box,
    Button,
    Card,
    Table,
    Text,
} from "@libraries/uikit-web";
import { Mail } from "lucide-react";
import type { ReactElement } from "react";

import type { UseTeamInvitationsResult } from "./use-team-invitations.js";

const INVITATION_ROLE_LABELS: Readonly<Record<TeamInvitationRole, string>> = {
    [TEAM_MEMBER_ROLE]: "Member",
};

export type PendingInvitationsPanelProps = Readonly<{
    invitations: UseTeamInvitationsResult;
}>;

export function PendingInvitationsPanel({
    invitations,
}: PendingInvitationsPanelProps): ReactElement {
    return (
        <Card>
            <Card.Title>Pending invitations</Card.Title>
            <Card.Body>
                <PendingInvitationsContent invitations={invitations} />
            </Card.Body>
        </Card>
    );
}

function PendingInvitationsContent({
    invitations,
}: PendingInvitationsPanelProps): ReactElement {
    if (invitations.error !== null) {
        return (
            <Box direction="column" gap="md">
                <Alert intent="error" title="Unable to load invitations">
                    {invitations.error}
                </Alert>
                <Box>
                    <Button
                        variant="secondary"
                        onClick={() => void invitations.refresh()}
                    >
                        Try again
                    </Button>
                </Box>
            </Box>
        );
    }
    if (invitations.isLoading) {
        return (
            <Box status>
                <Text variant="muted">Loading pending invitations...</Text>
            </Box>
        );
    }
    if (invitations.data.length === 0) {
        return <Text variant="muted">No pending invitations.</Text>;
    }

    return (
        <Table bordered compact label="Pending invitations">
            <Table.Head>
                <Table.Row>
                    <Table.Header>Email</Table.Header>
                    <Table.Header fit>Role</Table.Header>
                    <Table.Header fit>Invited</Table.Header>
                    <Table.Header fit>Expires</Table.Header>
                    <Table.Header fit>Actions</Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {invitations.data.map((invitation) => (
                    <PendingInvitationRow
                        key={invitation.email}
                        invitation={invitation}
                        revokingEmail={invitations.revokingEmail}
                        onRevoke={(email) => void invitations.revoke(email)}
                    />
                ))}
            </Table.Body>
        </Table>
    );
}

type PendingInvitationRowProps = Readonly<{
    invitation: PendingTeamInvitation;
    revokingEmail: string | null;
    onRevoke(email: string): void;
}>;

function PendingInvitationRow({
    invitation,
    revokingEmail,
    onRevoke,
}: PendingInvitationRowProps): ReactElement {
    const isRevoking = revokingEmail === invitation.email;
    return (
        <Table.Row>
            <Table.Cell>
                <Box align="center" gap="sm">
                    <Mail size={18} aria-hidden="true" />
                    <Text>
                        <strong>{invitation.email}</strong>
                    </Text>
                </Box>
            </Table.Cell>
            <Table.Cell fit>
                <Badge color="gray">
                    {INVITATION_ROLE_LABELS[invitation.role]}
                </Badge>
            </Table.Cell>
            <Table.Cell fit>
                <InvitationTime value={invitation.createdAt} />
            </Table.Cell>
            <Table.Cell fit>
                <InvitationTime value={invitation.expiresAt} />
            </Table.Cell>
            <Table.Cell fit>
                <Button
                    variant="secondary"
                    size="small"
                    disabled={revokingEmail !== null}
                    onClick={() => onRevoke(invitation.email)}
                >
                    {isRevoking ? "Revoking..." : "Revoke"}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

type InvitationTimeProps = Readonly<{ value: string }>;

function InvitationTime({ value }: InvitationTimeProps): ReactElement {
    return (
        <time dateTime={value} title={new Date(value).toLocaleString()}>
            {formatRelativeTime(new Date(value))}
        </time>
    );
}
