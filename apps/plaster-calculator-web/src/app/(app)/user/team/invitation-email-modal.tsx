import {
    Box,
    Button,
    ButtonLink,
    FormLayoutField,
    Input,
    ModalDialog,
    Textarea,
} from "@libraries/uikit-web";
import { Mail } from "lucide-react";
import { useId } from "react";
import type { ReactElement } from "react";

import { buildInvitationMailtoHref } from "./team-invitation-links.js";

export type InvitationEmailDraft = Readonly<{
    email: string;
    subject: string;
    body: string;
}>;

export type InvitationEmailModalProps = Readonly<{
    draft: InvitationEmailDraft | null;
    onBodyChange(body: string): void;
    onClose(): void;
}>;

export function InvitationEmailModal({
    draft,
    onBodyChange,
    onClose,
}: InvitationEmailModalProps): ReactElement {
    const recipientId = useId();
    const bodyId = useId();
    const mailtoHref =
        draft === null
            ? undefined
            : buildInvitationMailtoHref(draft.email, draft.subject, draft.body);

    return (
        <ModalDialog
            open={draft !== null}
            onClose={onClose}
            size="lg"
            title="Invitation created"
            description="Review and edit the message before opening it in your email client."
            footer={
                <>
                    <Button variant="secondary" type="button" onClick={onClose}>
                        Close
                    </Button>
                    <ButtonLink href={mailtoHref}>
                        <Mail size={16} aria-hidden="true" />
                        Send email
                    </ButtonLink>
                </>
            }
        >
            <Box direction="column" gap="lg">
                <FormLayoutField label="To" htmlFor={recipientId}>
                    <Input
                        id={recipientId}
                        value={draft?.email ?? ""}
                        readOnly
                    />
                </FormLayoutField>
                <FormLayoutField label="Message" htmlFor={bodyId}>
                    <Textarea
                        id={bodyId}
                        value={draft?.body ?? ""}
                        rows={10}
                        onChange={(event) => onBodyChange(event.target.value)}
                    />
                </FormLayoutField>
            </Box>
        </ModalDialog>
    );
}
