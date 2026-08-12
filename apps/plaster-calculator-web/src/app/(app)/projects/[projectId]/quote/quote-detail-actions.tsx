import type { QuoteStatus } from "@libraries/plaster-calculator-common";
import { useQuotesTranslation } from "@libraries/plaster-calculator-ui";
import { Button, ButtonGroup } from "@libraries/uikit-web";
import { Download, Pencil } from "lucide-react";
import type { ReactElement } from "react";

import { useQuoteStatusActions } from "./quote-detail.hooks.js";

export type ProjectQuoteActionsProps = {
    readonly projectId: string;
    readonly quoteId: string | null;
    readonly status: QuoteStatus;
    readonly hasQuote: boolean;
    readonly hasDocument: boolean;
    readonly hasEditableValues: boolean;
    readonly isEditing: boolean;
    readonly isSaving: boolean;
    readonly onDownload: () => void;
    readonly onEdit: () => void;
};

export function ProjectQuoteActions({
    projectId,
    quoteId,
    status,
    hasQuote,
    hasDocument,
    hasEditableValues,
    isEditing,
    isSaving,
    onDownload,
    onEdit,
}: ProjectQuoteActionsProps): ReactElement | null {
    const { t } = useQuotesTranslation();
    const statusActions = useQuoteStatusActions(projectId, quoteId, status);

    if (!hasQuote) return null;

    return (
        <QuoteDetailActions
            label={t("quoteDetailPage.breadcrumb")}
            downloadLabel={t("quoteDetailPage.downloadPdf")}
            markAsSentLabel={t("quoteDetailPage.markAsSent")}
            markAcceptedLabel={t("quoteDetailPage.markAccepted")}
            editLabel={t("editableQuoteForm.edit")}
            canDownload={hasDocument && !isEditing && !isSaving}
            canEdit={hasEditableValues && !isEditing && !isSaving}
            canMarkAsSent={
                statusActions.canMarkAsSent && !isEditing && !isSaving
            }
            canMarkAccepted={
                statusActions.canMarkAccepted && !isEditing && !isSaving
            }
            onDownload={onDownload}
            onEdit={onEdit}
            onMarkAsSent={() => void statusActions.markAsSent()}
            onMarkAccepted={() => void statusActions.markAccepted()}
        />
    );
}

export type QuoteDetailActionsProps = {
    readonly label: string;
    readonly downloadLabel: string;
    readonly markAsSentLabel: string;
    readonly markAcceptedLabel: string;
    readonly editLabel: string;
    readonly canDownload: boolean;
    readonly canEdit: boolean;
    readonly canMarkAsSent: boolean;
    readonly canMarkAccepted: boolean;
    readonly onDownload: () => void;
    readonly onEdit: () => void;
    readonly onMarkAsSent: () => void;
    readonly onMarkAccepted: () => void;
};

/** The Download PDF / Mark as sent / Mark accepted action row. */
export function QuoteDetailActions({
    label,
    downloadLabel,
    markAsSentLabel,
    markAcceptedLabel,
    editLabel,
    canDownload,
    canEdit,
    canMarkAsSent,
    canMarkAccepted,
    onDownload,
    onEdit,
    onMarkAsSent,
    onMarkAccepted,
}: QuoteDetailActionsProps): ReactElement {
    return (
        <ButtonGroup label={label}>
            <Button
                variant="secondary"
                icon={<Download size={16} aria-hidden="true" />}
                disabled={!canDownload}
                onClick={onDownload}
            >
                {downloadLabel}
            </Button>
            <Button
                variant="secondary"
                icon={<Pencil size={16} aria-hidden="true" />}
                disabled={!canEdit}
                onClick={onEdit}
            >
                {editLabel}
            </Button>
            <Button
                variant="secondary"
                disabled={!canMarkAsSent}
                onClick={onMarkAsSent}
            >
                {markAsSentLabel}
            </Button>
            <Button
                variant="secondary"
                disabled={!canMarkAccepted}
                onClick={onMarkAccepted}
            >
                {markAcceptedLabel}
            </Button>
        </ButtonGroup>
    );
}
