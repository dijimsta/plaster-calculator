import { Button, FormLayout, Input, ModalDialog } from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";

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
            title="Add question"
            description="Add a custom question to this project's questionnaire."
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={isSaving}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form={formId}
                        disabled={isSaving || !isValid}
                    >
                        {isSaving ? "Adding..." : "Add"}
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
                            placeholder="Question"
                            label="Question"
                            autoFocus
                            required
                        />
                    )}
                />
            </FormLayout>
        </ModalDialog>
    );
}
