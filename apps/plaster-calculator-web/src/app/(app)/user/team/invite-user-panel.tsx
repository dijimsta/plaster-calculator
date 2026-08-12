"use client";

import { TEAM_MEMBER_ROLE } from "@libraries/plaster-calculator-common";
import {
    Button,
    Card,
    FormLayout,
    FormLayoutField,
    Input,
    Text,
} from "@libraries/uikit-web";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactElement } from "react";

import {
    InvitationEmailModal,
    type InvitationEmailDraft,
} from "./invitation-email-modal.js";
import {
    buildInvitationEmailBody,
    buildInvitationEmailSubject,
    buildInvitationUrl,
} from "./team-invitation-links.js";
import type { UseTeamInvitationsResult } from "./use-team-invitations.js";

const INVITATION_ROLE = TEAM_MEMBER_ROLE;
const EMAIL_INPUT_ID = "team-invitation-email";

export type InviteUserPanelProps = Readonly<{
    invitations: UseTeamInvitationsResult;
    teamName: string;
}>;

export function InviteUserPanel({
    invitations,
    teamName,
}: InviteUserPanelProps): ReactElement {
    const [email, setEmail] = useState("");
    const [emailDraft, setEmailDraft] = useState<InvitationEmailDraft | null>(
        null,
    );

    async function submitInvitation(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setEmailDraft(null);
        const response = await invitations.invite({
            email: email.trim().toLowerCase(),
            role: INVITATION_ROLE,
        });
        if (response === null) return;

        const invitationUrl = buildInvitationUrl(
            response.path,
            window.location.origin,
        );
        setEmailDraft({
            email: response.invitation.email,
            subject: buildInvitationEmailSubject(teamName),
            body: buildInvitationEmailBody(invitationUrl, teamName),
        });
        setEmail("");
    }

    return (
        <>
            <FormLayout onSubmit={(event) => void submitInvitation(event)}>
                <Card>
                    <Card.Title>Invite a user</Card.Title>
                    <Text size="sm" variant="muted">
                        They will join the team as a member and can access the
                        team&apos;s projects. Invitations expire after seven
                        days.
                    </Text>
                    <Card.Body>
                        <FormLayoutField
                            label="Work email"
                            htmlFor={EMAIL_INPUT_ID}
                        >
                            <Input
                                id={EMAIL_INPUT_ID}
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                placeholder="name@example.com"
                                value={email}
                                required
                                disabled={isActionPending(invitations)}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </FormLayoutField>
                        <Button
                            type="submit"
                            fullWidth
                            icon={<UserPlus size={16} aria-hidden="true" />}
                            disabled={
                                isActionPending(invitations) ||
                                email.trim().length === 0
                            }
                        >
                            {invitations.isInviting
                                ? "Creating invitation..."
                                : "Create invitation"}
                        </Button>
                    </Card.Body>
                </Card>
            </FormLayout>
            <InvitationEmailModal
                draft={emailDraft}
                onClose={() => setEmailDraft(null)}
                onBodyChange={(body) =>
                    setEmailDraft((currentDraft) =>
                        currentDraft === null
                            ? null
                            : { ...currentDraft, body },
                    )
                }
            />
        </>
    );
}

function isActionPending(invitations: UseTeamInvitationsResult): boolean {
    return (
        invitations.isInviting ||
        invitations.copyingEmail !== null ||
        invitations.revokingEmail !== null
    );
}
