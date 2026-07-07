import {
    Box,
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    FormLayoutSection,
    Input,
    preventDefaultEvent,
    Text,
} from "@libraries/uikit-web";
import { Plus, Trash2 } from "lucide-react";
import { useReducer } from "react";

import {
    createInitialQuestionnaireTemplateFormState,
    questionnaireTemplateFormReducer,
} from "./questionnaire-template-form.reducer.ts";

import type { QuestionnaireTemplateFormValues } from "./questionnaire-template-form.reducer.ts";
import type { ReactElement } from "react";

export type { QuestionnaireTemplateFormValues };

export interface QuestionnaireTemplateFormProps {
    readonly formId: string;
    readonly initialValues?: QuestionnaireTemplateFormValues;
    readonly submitLabel?: string;
    readonly onCancel: () => void;
    readonly onSubmit: (values: QuestionnaireTemplateFormValues) => void;
}

/** A form for drafting a questionnaire template's name and questions. */
export function QuestionnaireTemplateForm({
    formId,
    initialValues,
    submitLabel = "Create template",
    onCancel,
    onSubmit,
}: QuestionnaireTemplateFormProps): ReactElement {
    const [{ name, questions }, dispatch] = useReducer(
        questionnaireTemplateFormReducer,
        initialValues,
        createInitialQuestionnaireTemplateFormState,
    );

    return (
        <FormLayout
            id={formId}
            onSubmit={preventDefaultEvent(() => onSubmit({ name, questions }))}
        >
            <Input
                id={`${formId}-name`}
                value={name}
                onChange={(event) =>
                    dispatch({ type: "setName", name: event.target.value })
                }
                placeholder="Template name"
                aria-label="Template name"
                required
            />
            <FormLayoutSection
                title="Questions"
                description="Add the questions this template asks."
            >
                <FormLayoutField label="" span="full">
                    <Box direction="column" gap="sm">
                        {questions.map((question, index) => (
                            <Card key={question.draftId}>
                                <Box direction="column" gap="sm">
                                    <Box
                                        direction="row"
                                        justify="between"
                                        align="center"
                                    >
                                        <Text size="base">
                                            Question {index + 1}
                                        </Text>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            icon={
                                                <Trash2
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                            }
                                            aria-label={`Remove question ${index + 1}`}
                                            onClick={() =>
                                                dispatch({
                                                    type: "removeQuestion",
                                                    draftId: question.draftId,
                                                })
                                            }
                                        />
                                    </Box>
                                    <FormLayoutField
                                        label="Label"
                                        htmlFor={`${formId}-question-${question.draftId}-label`}
                                    >
                                        <Input
                                            id={`${formId}-question-${question.draftId}-label`}
                                            value={question.label}
                                            onChange={(event) =>
                                                dispatch({
                                                    type: "updateQuestionLabel",
                                                    draftId: question.draftId,
                                                    label: event.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </FormLayoutField>
                                </Box>
                            </Card>
                        ))}
                        <Box>
                            <Button
                                type="button"
                                variant="secondary"
                                icon={<Plus size={16} aria-hidden="true" />}
                                onClick={() =>
                                    dispatch({ type: "addQuestion" })
                                }
                            >
                                Add question
                            </Button>
                        </Box>
                    </Box>
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutActions>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">{submitLabel}</Button>
            </FormLayoutActions>
        </FormLayout>
    );
}
