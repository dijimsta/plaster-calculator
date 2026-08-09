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
} from "@libraries/uikit-web";
import { Plus, Trash2 } from "lucide-react";
import type { ReactElement } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import type { QuestionnaireTemplateFormValues } from "./questionnaire-template-form.types.ts";

export type { QuestionnaireTemplateFormValues };

export type QuestionnaireTemplateFormProps = {
    readonly formId: string;
    readonly initialValues?: QuestionnaireTemplateFormValues;
    readonly submitLabel?: string;
    readonly onCancel: () => void;
    readonly onSubmit: (values: QuestionnaireTemplateFormValues) => void;
};

const EMPTY_FORM_VALUES: QuestionnaireTemplateFormValues = {
    name: "",
    questions: [],
};

/** A form for drafting a questionnaire template's name and questions. */
export function QuestionnaireTemplateForm({
    formId,
    initialValues,
    submitLabel = "Create template",
    onCancel,
    onSubmit,
}: QuestionnaireTemplateFormProps): ReactElement {
    const { control, handleSubmit } = useForm<QuestionnaireTemplateFormValues>({
        defaultValues: initialValues ?? EMPTY_FORM_VALUES,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
        keyName: "fieldKey",
    });

    return (
        <FormLayout id={formId} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input
                        id={`${formId}-name`}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Template name"
                        label="Template name"
                        required
                    />
                )}
            />
            <FormLayoutSection
                title="Questions"
                description="Add the questions this template asks."
            >
                <FormLayoutField label="" span="full">
                    <Box direction="column" gap="sm">
                        {fields.map((question, index) => (
                            <Card key={question.fieldKey}>
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
                                            label={`Remove question ${index + 1}`}
                                            onClick={() => remove(index)}
                                        />
                                    </Box>
                                    <FormLayoutField
                                        label="Label"
                                        htmlFor={`${formId}-question-${question.fieldKey}-label`}
                                    >
                                        <Controller
                                            name={`questions.${index}.label`}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    id={`${formId}-question-${question.fieldKey}-label`}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    required
                                                />
                                            )}
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
                                onClick={() => append({ label: "" })}
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
