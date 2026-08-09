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

import { useQuestionnairesTranslation } from "../../i18n/index.ts";

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
    submitLabel,
    onCancel,
    onSubmit,
}: QuestionnaireTemplateFormProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const { control, handleSubmit } = useForm<QuestionnaireTemplateFormValues>({
        defaultValues: initialValues ?? EMPTY_FORM_VALUES,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
        keyName: "fieldKey",
    });
    const resolvedSubmitLabel =
        submitLabel ?? t("questionnaireTemplateForm.createTemplate");

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
                        placeholder={t(
                            "questionnaireTemplateForm.templateNameLabel",
                        )}
                        label={t("questionnaireTemplateForm.templateNameLabel")}
                        required
                    />
                )}
            />
            <FormLayoutSection
                title={t("questionnaireTemplateForm.questionsTitle")}
                description={t(
                    "questionnaireTemplateForm.questionsDescription",
                )}
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
                                            {t(
                                                "questionnaireTemplateForm.question",
                                                { number: index + 1 },
                                            )}
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
                                            label={t("common.removeQuestion", {
                                                number: index + 1,
                                            })}
                                            onClick={() => remove(index)}
                                        />
                                    </Box>
                                    <FormLayoutField
                                        label={t(
                                            "questionnaireTemplateForm.questionLabelFieldLabel",
                                        )}
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
                                {t("questionnaireTemplateForm.addQuestion")}
                            </Button>
                        </Box>
                    </Box>
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutActions>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    {t("common.cancel")}
                </Button>
                <Button type="submit">{resolvedSubmitLabel}</Button>
            </FormLayoutActions>
        </FormLayout>
    );
}
