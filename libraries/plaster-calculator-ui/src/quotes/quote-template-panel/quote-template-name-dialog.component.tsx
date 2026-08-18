"use client";

import { Button, FormLayout, Input, ModalDialog } from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteTemplateNameDialogProps = {
    readonly open: boolean;
    readonly isSaving: boolean;
    readonly onClose: () => void;
    readonly onSubmit: (name: string) => void;
};

type QuoteTemplateNameFormValues = {
    readonly name: string;
};

/**
 * Names a new quote template variation. Renaming an existing template no
 * longer goes through this dialog -- `QuoteTemplateDetailCard` edits the
 * currently-open template's name inline -- so this only ever creates.
 */
export function QuoteTemplateNameDialog({
    open,
    isSaving,
    onClose,
    onSubmit,
}: QuoteTemplateNameDialogProps): ReactElement {
    const { t } = useQuotesTranslation();
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<QuoteTemplateNameFormValues>({
        mode: "onChange",
        defaultValues: { name: "" },
    });
    const formId = useId();
    const inputId = useId();

    function submit({ name }: QuoteTemplateNameFormValues): void {
        onSubmit(name.trim());
    }

    const submitLabel = isSaving
        ? t("quoteTemplateList.savingAction")
        : t("quoteTemplateList.createSubmit");

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="sm"
            title={t("quoteTemplateList.createDialogTitle")}
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
                        {submitLabel}
                    </Button>
                </>
            }
        >
            <FormLayout id={formId} onSubmit={handleSubmit(submit)}>
                <Controller
                    name="name"
                    control={control}
                    rules={{ validate: (name) => name.trim() !== "" }}
                    render={({ field }) => (
                        <Input
                            id={inputId}
                            label={t("quoteTemplateList.nameLabel")}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            autoFocus
                            required
                        />
                    )}
                />
            </FormLayout>
        </ModalDialog>
    );
}
