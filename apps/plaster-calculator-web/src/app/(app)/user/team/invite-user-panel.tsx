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

    async function submitInvitation(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const wasInvited = await invitations.invite({
            email: email.trim().toLowerCase(),
            role: INVITATION_ROLE,
        });
        if (wasInvited) setEmail("");
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
                            disabled={invitations.isInviting}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </FormLayoutField>
                    <Button
                        type="submit"
                        fullWidth
                        icon={<UserPlus size={16} aria-hidden="true" />}
                        disabled={
                            invitations.isInviting || email.trim().length === 0
                        }
                    >
                        {invitations.isInviting
                            ? "Sending invitation..."
                            : "Send invitation"}
                    </Button>
                </Card.Body>
            </Card>
        </FormLayout>
    );
}
