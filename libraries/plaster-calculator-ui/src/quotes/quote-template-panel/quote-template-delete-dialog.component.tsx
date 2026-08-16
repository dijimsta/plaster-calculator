"use client";

import { Button, ModalDialog, Paragraph } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteTemplateDeleteDialogProps = {
    readonly open: boolean;
    readonly templateName: string;
    readonly isDeleting: boolean;
    readonly onClose: () => void;
    readonly onConfirm: () => void;
};

/** Confirms deleting a quote template variation before calling `onConfirm`. Never rendered for the default -- `QuoteTemplateList` doesn't offer a delete action on that row. */
export function QuoteTemplateDeleteDialog({
    open,
    templateName,
    isDeleting,
    onClose,
    onConfirm,
}: QuoteTemplateDeleteDialogProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="sm"
            title={t("quoteTemplateList.deleteDialogTitle", {
                name: templateName,
            })}
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={isDeleting}
                        onClick={onClose}
                    >
                        {t("common.cancel")}
                    </Button>
                    <Button
                        variant="danger"
                        disabled={isDeleting}
                        onClick={onConfirm}
                    >
                        {isDeleting
                            ? t("quoteTemplateList.deletingAction")
                            : t("quoteTemplateList.deleteSubmit")}
                    </Button>
                </>
            }
        >
            <Paragraph textSize="sm" variant="muted">
                {t("quoteTemplateList.deleteDialogDescription", {
                    name: templateName,
                })}
            </Paragraph>
        </ModalDialog>
    );
}
