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

import { useQuestionnairesTranslation } from "../i18n/index.ts";

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
    const { t } = useQuestionnairesTranslation();
    const onCopy = useCopyQuestionnaireEmailBodyCallback(body);
    const subjectId = useId();
    const bodyId = useId();

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="lg"
            title={t("generateQuestionnaireEmailModal.title")}
            description={t("generateQuestionnaireEmailModal.description")}
            footer={
                <>
                    <Button variant="secondary" onClick={onCopy}>
                        {t("generateQuestionnaireEmailModal.copyToClipboard")}
                    </Button>
                    <ButtonLink href={mailtoHref}>
                        {t("generateQuestionnaireEmailModal.openInEmailClient")}
                    </ButtonLink>
                </>
            }
        >
            <Box direction="column" gap="lg">
                <FormLayoutField
                    label={t("generateQuestionnaireEmailModal.subjectLabel")}
                    htmlFor={subjectId}
                >
                    <Input id={subjectId} value={subject} readOnly />
                </FormLayoutField>
                <FormLayoutField
                    label={t("generateQuestionnaireEmailModal.bodyLabel")}
                    htmlFor={bodyId}
                >
                    <Textarea id={bodyId} value={body} readOnly rows={10} />
                </FormLayoutField>
            </Box>
        </ModalDialog>
    );
}
