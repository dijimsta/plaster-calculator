import { Drawer, Text } from "@libraries/uikit-web";
import { useId, useMemo } from "react";

import { QuestionnaireTemplateForm } from "../questionnaire-template-form/index.ts";

import type { QuestionnaireTemplateFormValues } from "../questionnaire-template-form/index.ts";
import type * as DataConnector from "@generated/data-connector-web";
import type { ReactElement } from "react";

export type QuestionnaireTemplateDetails = NonNullable<
    DataConnector.GetQuestionnaireTemplateData["questionnaireTemplate"]
>;

export interface EditQuestionnaireTemplateDrawerProps {
    readonly open: boolean;
    readonly template: QuestionnaireTemplateDetails | null;
    readonly isLoading: boolean;
    readonly onClose: () => void;
    readonly onSave: (values: QuestionnaireTemplateFormValues) => void;
}

/** A drawer for editing an existing questionnaire template and its questions. */
export function EditQuestionnaireTemplateDrawer({
    open,
    template,
    isLoading,
    onClose,
    onSave,
}: EditQuestionnaireTemplateDrawerProps): ReactElement {
    const formId = useId();
    const initialValues = useMemo(
        (): QuestionnaireTemplateFormValues | undefined =>
            template === null
                ? undefined
                : {
                      name: template.name,
                      questions: template.questions.map((question) => ({
                          id: question.id,
                          label: question.label,
                          description: question.description ?? "",
                      })),
                  },
        [template],
    );

    return (
        <Drawer
            open={open}
            onClose={onClose}
            title="Edit template"
            description="Update the template's name and questions."
        >
            {initialValues === undefined ? (
                <Text variant="muted">
                    {isLoading ? "Loading template…" : ""}
                </Text>
            ) : (
                <QuestionnaireTemplateForm
                    formId={formId}
                    initialValues={initialValues}
                    submitLabel="Save changes"
                    onCancel={onClose}
                    onSubmit={onSave}
                />
            )}
        </Drawer>
    );
}
