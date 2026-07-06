import {
    Box,
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    FormLayoutSection,
    Input,
    Text,
    Textarea,
} from "@libraries/uikit-web";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import type { FormEvent, ReactElement } from "react";

export interface QuestionnaireTemplateFormValues {
    readonly name: string;
    readonly questions: readonly {
        readonly label: string;
        readonly description: string;
    }[];
}

export interface QuestionnaireTemplateFormProps {
    readonly formId: string;
    readonly onCancel: () => void;
    readonly onSubmit: (values: QuestionnaireTemplateFormValues) => void;
}

interface QuestionDraft {
    readonly id: string;
    readonly label: string;
    readonly description: string;
}

/** A form for drafting a questionnaire template's name and questions. */
export function QuestionnaireTemplateForm({
    formId,
    onCancel,
    onSubmit,
}: QuestionnaireTemplateFormProps): ReactElement {
    const [name, setName] = useState("");
    const [questions, setQuestions] = useState<readonly QuestionDraft[]>([]);

    function addQuestion(): void {
        setQuestions((current) => [
            ...current,
            { id: crypto.randomUUID(), label: "", description: "" },
        ]);
    }

    function removeQuestion(id: string): void {
        setQuestions((current) =>
            current.filter((question) => question.id !== id),
        );
    }

    function updateQuestion(
        id: string,
        updater: (question: QuestionDraft) => QuestionDraft,
    ): void {
        setQuestions((current) =>
            current.map((question) =>
                question.id === id ? updater(question) : question,
            ),
        );
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit({
            name,
            questions: questions.map(({ label, description }) => ({
                label,
                description,
            })),
        });
    }

    return (
        <FormLayout id={formId} onSubmit={handleSubmit}>
            <Input
                id={`${formId}-name`}
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                            <Card key={question.id}>
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
                                                removeQuestion(question.id)
                                            }
                                        />
                                    </Box>
                                    <FormLayoutField
                                        label="Label"
                                        htmlFor={`${formId}-question-${question.id}-label`}
                                    >
                                        <Input
                                            id={`${formId}-question-${question.id}-label`}
                                            value={question.label}
                                            onChange={(event) =>
                                                updateQuestion(
                                                    question.id,
                                                    (current) => ({
                                                        ...current,
                                                        label: event.target
                                                            .value,
                                                    }),
                                                )
                                            }
                                            required
                                        />
                                    </FormLayoutField>
                                    <FormLayoutField
                                        label="Description (optional)"
                                        htmlFor={`${formId}-question-${question.id}-description`}
                                    >
                                        <Textarea
                                            id={`${formId}-question-${question.id}-description`}
                                            rows={2}
                                            value={question.description}
                                            onChange={(event) =>
                                                updateQuestion(
                                                    question.id,
                                                    (current) => ({
                                                        ...current,
                                                        description:
                                                            event.target.value,
                                                    }),
                                                )
                                            }
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
                                onClick={addQuestion}
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
                <Button type="submit">Create template</Button>
            </FormLayoutActions>
        </FormLayout>
    );
}
