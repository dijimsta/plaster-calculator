"use client";

import { Button, FormLayout, Input, ModalDialog } from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteTemplateNameDialogMode = "create" | "rename";

export type QuoteTemplateNameDialogProps = {
    readonly open: boolean;
    readonly mode: QuoteTemplateNameDialogMode;
    readonly initialName: string;
    readonly isSaving: boolean;
    readonly onClose: () => void;
    readonly onSubmit: (name: string) => void;
};

type QuoteTemplateNameFormValues = {
    readonly name: string;
};

/**
 * Names a new quote template variation, or renames an existing one --
 * `mode` only changes copy, both submit a trimmed, non-empty `name`. Callers
 * that render this for a specific existing template (rename) should key the
 * instance by that template's id so `initialName` is picked up fresh each
 * time a different template is renamed, matching `QuoteTemplateForm`'s own
 * `key`-remount-over-`reset()` convention for syncing form state to a new
 * record.
 */
export function QuoteTemplateNameDialog({
    open,
    mode,
    initialName,
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
        defaultValues: { name: initialName },
    });
    const formId = useId();
    const inputId = useId();

    function submit({ name }: QuoteTemplateNameFormValues): void {
        onSubmit(name.trim());
    }

    const title =
        mode === "create"
            ? t("quoteTemplateList.createDialogTitle")
            : t("quoteTemplateList.renameDialogTitle");
    const submitLabel = isSaving
        ? t("quoteTemplateList.savingAction")
        : mode === "create"
          ? t("quoteTemplateList.createSubmit")
          : t("quoteTemplateList.renameSubmit");

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="sm"
            title={title}
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
