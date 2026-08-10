import { Button, FormLayout, Input, ModalDialog } from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

import type { AddProjectQuestionnaireQuestionModalFormValues } from "./add-project-questionnaire-question-modal.types.ts";

export type AddProjectQuestionnaireQuestionModalProps = {
    readonly open: boolean;
    readonly isSaving: boolean;
    readonly onClose: () => void;
    readonly onAdd: (label: string) => void;
};

/** A modal for adding a single custom question to a project's questionnaire. */
export function AddProjectQuestionnaireQuestionModal({
    open,
    isSaving,
    onClose,
    onAdd,
}: AddProjectQuestionnaireQuestionModalProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm<AddProjectQuestionnaireQuestionModalFormValues>({
        mode: "onChange",
        defaultValues: { label: "" },
    });
    const formId = useId();
    const inputId = useId();

    function onSubmit({
        label,
    }: AddProjectQuestionnaireQuestionModalFormValues): void {
        onAdd(label.trim());
        reset();
    }

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="sm"
            title={t("addProjectQuestionnaireQuestionModal.title")}
            description={t("addProjectQuestionnaireQuestionModal.description")}
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
                        disabled={isSaving || !isValid}
                    >
                        {isSaving ? t("common.adding") : t("common.add")}
                    </Button>
                </>
            }
        >
            <FormLayout id={formId} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="label"
                    control={control}
                    rules={{ validate: (label) => label.trim() !== "" }}
                    render={({ field }) => (
                        <Input
                            id={inputId}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder={t(
                                "addProjectQuestionnaireQuestionModal.questionLabel",
                            )}
                            label={t(
                                "addProjectQuestionnaireQuestionModal.questionLabel",
                            )}
                            autoFocus
                            required
                        />
                    )}
                />
            </FormLayout>
        </ModalDialog>
    );
}
