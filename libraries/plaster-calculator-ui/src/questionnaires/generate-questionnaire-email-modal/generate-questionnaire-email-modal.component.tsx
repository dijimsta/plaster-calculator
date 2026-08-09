import {
    Box,
    Button,
    ButtonLink,
    FormLayoutField,
    Input,
    ModalDialog,
    Textarea,
} from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactElement } from "react";

import { useCopyQuestionnaireEmailBodyCallback } from "./generate-questionnaire-email-modal.hooks.ts";

export type GenerateQuestionnaireEmailModalProps = {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly subject: string;
    readonly body: string;
    readonly mailtoHref: string;
};

/** A modal for previewing, copying, and sending a generated scope-of-work email. */
export function GenerateQuestionnaireEmailModal({
    open,
    onClose,
    subject,
    body,
    mailtoHref,
}: GenerateQuestionnaireEmailModalProps): ReactElement {
    const onCopy = useCopyQuestionnaireEmailBodyCallback(body);
    const subjectId = useId();
    const bodyId = useId();

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="lg"
            title="Generate scope of work email"
            description="Review the generated email, then copy it or open it in your email client."
            footer={
                <>
                    <Button variant="secondary" onClick={onCopy}>
                        Copy to clipboard
                    </Button>
                    <ButtonLink href={mailtoHref}>
                        Open in email client
                    </ButtonLink>
                </>
            }
        >
            <Box direction="column" gap="lg">
                <FormLayoutField label="Subject" htmlFor={subjectId}>
                    <Input id={subjectId} value={subject} readOnly />
                </FormLayoutField>
                <FormLayoutField label="Body" htmlFor={bodyId}>
                    <Textarea id={bodyId} value={body} readOnly rows={10} />
                </FormLayoutField>
            </Box>
        </ModalDialog>
    );
}
