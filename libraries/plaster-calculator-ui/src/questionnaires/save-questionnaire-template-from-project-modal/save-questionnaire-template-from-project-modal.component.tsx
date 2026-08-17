import {
    Alert,
    Badge,
    Box,
    Button,
    FormLayout,
    FormLayoutField,
    Input,
    ModalDialog,
    Text,
} from "@libraries/uikit-web";
import { useId, useState } from "react";
import type { FormEvent, ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

import type { SaveQuestionnaireTemplateFromProjectModalQuestion } from "./save-questionnaire-template-from-project-modal.types.ts";

export type { SaveQuestionnaireTemplateFromProjectModalQuestion };

export type SaveQuestionnaireTemplateFromProjectModalProps = {
    readonly open: boolean;
    readonly isSaving: boolean;
    readonly onClose: () => void;
    readonly defaultName: string;
    readonly questions: readonly SaveQuestionnaireTemplateFromProjectModalQuestion[];
    readonly existingTemplateNames: readonly string[];
    readonly onSave: (name: string) => void;
};

/** A modal for saving a project's clarifications as a reusable clarification template. */
export function SaveQuestionnaireTemplateFromProjectModal({
    open,
    isSaving,
    onClose,
    defaultName,
    questions,
    existingTemplateNames,
    onSave,
}: SaveQuestionnaireTemplateFromProjectModalProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const [name, setName] = useState(defaultName);
    const [wasOpen, setWasOpen] = useState(open);
    if (open !== wasOpen) {
        setWasOpen(open);
        if (open) {
            setName(defaultName);
        }
    }

    const formId = useId();
    const nameInputId = useId();
    const trimmedName = name.trim();
    const isDuplicateName = isNameAlreadyTaken(
        trimmedName,
        existingTemplateNames,
    );

    function onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSave(trimmedName);
    }

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="md"
            title={t("saveQuestionnaireTemplateFromProjectModal.title")}
            description={t(
                "saveQuestionnaireTemplateFromProjectModal.description",
            )}
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={isSaving}
                        onClick={onClose}
                    >
                        {t("common.cancel")}
                    </Button>
                    <Button
                        type="submit"
                        form={formId}
                        disabled={isSaving || trimmedName === ""}
                    >
                        {isSaving
                            ? t(
                                  "saveQuestionnaireTemplateFromProjectModal.saving",
                              )
                            : t(
                                  "saveQuestionnaireTemplateFromProjectModal.save",
                              )}
                    </Button>
                </>
            }
        >
            <FormLayout id={formId} onSubmit={onSubmit}>
                <FormLayoutField
                    label={t(
                        "saveQuestionnaireTemplateFromProjectModal.nameLabel",
                    )}
                    htmlFor={nameInputId}
                >
                    <Input
                        id={nameInputId}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoFocus
                        required
                    />
                </FormLayoutField>
                {isDuplicateName && (
                    <Alert intent="warn">
                        {t(
                            "saveQuestionnaireTemplateFromProjectModal.duplicateNameWarning",
                        )}
                    </Alert>
                )}
                <FormLayoutField
                    label={t(
                        "saveQuestionnaireTemplateFromProjectModal.questionsLabel",
                    )}
                    span="full"
                >
                    <QuestionList questions={questions} />
                </FormLayoutField>
            </FormLayout>
        </ModalDialog>
    );
}

/** Returns whether a trimmed template name case-insensitively matches an existing one. */
function isNameAlreadyTaken(
    trimmedName: string,
    existingTemplateNames: readonly string[],
): boolean {
    if (trimmedName === "") {
        return false;
    }
    const normalizedName = trimmedName.toLowerCase();
    return existingTemplateNames.some(
        (existingName) => existingName.trim().toLowerCase() === normalizedName,
    );
}

type QuestionListProps = {
    readonly questions: readonly SaveQuestionnaireTemplateFromProjectModalQuestion[];
};

function QuestionList({ questions }: QuestionListProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    return (
        <Box direction="column" gap="sm">
            <Box direction="row" justify="between" align="center">
                <Text size="sm" variant="muted">
                    {t(
                        "saveQuestionnaireTemplateFromProjectModal.clarificationCount",
                        { count: questions.length },
                    )}
                </Text>
                <Text size="sm" variant="muted">
                    {t(
                        "saveQuestionnaireTemplateFromProjectModal.answersStayOnProject",
                    )}
                </Text>
            </Box>
            {questions.map((question, index) => (
                <QuestionRow key={index} question={question} index={index} />
            ))}
        </Box>
    );
}

type QuestionRowProps = {
    readonly question: SaveQuestionnaireTemplateFromProjectModalQuestion;
    readonly index: number;
};

function QuestionRow({ question, index }: QuestionRowProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    return (
        <Box direction="row" justify="between" align="center" gap="sm">
            <Text size="base">
                {index + 1}. {question.label}
            </Text>
            {!question.isFromSourceTemplate && (
                <Badge color="blue" size="xs">
                    {t(
                        "saveQuestionnaireTemplateFromProjectModal.addedOnProject",
                    )}
                </Badge>
            )}
        </Box>
    );
}
