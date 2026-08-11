"use client";

import { TEAM_MEMBER_ROLE } from "@libraries/plaster-calculator-common";
import {
    Button,
    ButtonLink,
    Card,
    FormLayout,
    FormLayoutField,
    Input,
    Text,
} from "@libraries/uikit-web";
import { Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactElement } from "react";

import {
    buildInvitationMailtoHref,
    buildInvitationUrl,
} from "./team-invitation-links.js";
import type { UseTeamInvitationsResult } from "./use-team-invitations.js";

const INVITATION_ROLE = TEAM_MEMBER_ROLE;
const EMAIL_INPUT_ID = "team-invitation-email";

export type InviteUserPanelProps = Readonly<{
    invitations: UseTeamInvitationsResult;
}>;

export function InviteUserPanel({
    invitations,
}: InviteUserPanelProps): ReactElement {
    const [email, setEmail] = useState("");
    const [emailDraftHref, setEmailDraftHref] = useState<string | null>(null);

    async function submitInvitation(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setEmailDraftHref(null);
        const reservedEmailWindow = window.open("", "_blank");
        const response = await invitations.invite({
            email: email.trim().toLowerCase(),
            role: INVITATION_ROLE,
        });
        if (response === null) {
            reservedEmailWindow?.close();
            return;
        }

        const invitationUrl = buildInvitationUrl(
            response.path,
            window.location.origin,
        );
        const mailtoHref = buildInvitationMailtoHref(
            response.invitation.email,
            invitationUrl,
        );
        setEmailDraftHref(mailtoHref);
        openEmailDraft(mailtoHref, reservedEmailWindow);
        setEmail("");
    }

    return (
        <FormLayout onSubmit={(event) => void submitInvitation(event)}>
            <Card>
                <Card.Title>Invite a user</Card.Title>
                <Text size="sm" variant="muted">
                    They will join the team as a member and can access the
                    team&apos;s projects. Invitations expire after seven days.
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
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setEmailDraftHref(null);
                            }}
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
                            ? "Sending invitation..."
                            : "Send invitation"}
                    </Button>
                    {emailDraftHref !== null && (
                        <ButtonLink
                            href={emailDraftHref}
                            variant="secondary"
                            fullWidth
                        >
                            <Mail size={16} aria-hidden="true" />
                            Open email draft
                        </ButtonLink>
                    )}
                </Card.Body>
            </Card>
        </FormLayout>
    );
}

function openEmailDraft(
    mailtoHref: string,
    reservedEmailWindow: Window | null,
): void {
    if (reservedEmailWindow === null) {
        window.location.href = mailtoHref;
    } else {
        reservedEmailWindow.location.href = mailtoHref;
    }
}

function isActionPending(invitations: UseTeamInvitationsResult): boolean {
    return (
        invitations.isInviting ||
        invitations.copyingEmail !== null ||
        invitations.revokingEmail !== null
    );
}
