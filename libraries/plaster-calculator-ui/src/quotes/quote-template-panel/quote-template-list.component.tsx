"use client";

import {
    Box,
    Button,
    Paragraph,
    Table,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteTemplateDeleteDialog } from "./quote-template-delete-dialog.component.tsx";
import { QuoteTemplateListRow } from "./quote-template-list-row.component.tsx";
import { QuoteTemplateNameDialog } from "./quote-template-name-dialog.component.tsx";
import type { QuoteTemplate } from "./quote-template-panel.types.ts";

export type QuoteTemplateListProps = {
    readonly templates: readonly QuoteTemplate[];
    readonly isLoading: boolean;
    readonly isMutating: boolean;
    readonly onCreateVariation: (name: string) => Promise<void>;
    readonly onRenameTemplate: (id: string, name: string) => Promise<void>;
    readonly onDeleteTemplate: (id: string) => Promise<void>;
    readonly onOpenVariation?: (variationId: string) => void;
};

type QuoteTemplateListDialogState =
    | { readonly kind: "closed" }
    | { readonly kind: "create" }
    | { readonly kind: "rename"; readonly template: QuoteTemplate }
    | { readonly kind: "delete"; readonly template: QuoteTemplate };

/**
 * The default plus its variations: a table, default pinned first
 * (`templates` already arrives sorted that way -- `ListQuoteTemplatesForTeam`
 * orders `isDefault: DESC`) and clearly badged. Create-variation, rename,
 * and delete live here; there is no "make default" control anywhere, on
 * this list or off it -- the default is fixed to whichever `QuoteTemplate`
 * has `isDefault: true`.
 *
 * A table over a card grid: this is a management list (name, a status
 * badge, row actions) rather than something a user browses visually, and a
 * table keeps the always-pinned default row and its variations legible as
 * one glanceable list without the extra chrome a card treatment would add
 * for the same information.
 */
export function QuoteTemplateList({
    templates,
    isLoading,
    isMutating,
    onCreateVariation,
    onRenameTemplate,
    onDeleteTemplate,
    onOpenVariation,
}: QuoteTemplateListProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { notify } = useNotificationsManager();
    const [dialog, setDialog] = useState<QuoteTemplateListDialogState>({
        kind: "closed",
    });

    async function handleCreateVariation(name: string): Promise<void> {
        try {
            await onCreateVariation(name);
            setDialog({ kind: "closed" });
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateList.createErrorTitle"),
                description: t("quoteTemplateList.createErrorDescription"),
            });
        }
    }

    async function handleRenameTemplate(
        id: string,
        name: string,
    ): Promise<void> {
        try {
            await onRenameTemplate(id, name);
            setDialog({ kind: "closed" });
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateList.renameErrorTitle"),
                description: t("quoteTemplateList.renameErrorDescription"),
            });
        }
    }

    async function handleDeleteTemplate(id: string): Promise<void> {
        try {
            await onDeleteTemplate(id);
            setDialog({ kind: "closed" });
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateList.deleteErrorTitle"),
                description: t("quoteTemplateList.deleteErrorDescription"),
            });
        }
    }

    return (
        <Box direction="column" gap="sm">
            <Table label={t("quoteTemplateList.tableLabel")}>
                <Table.Head>
                    <Table.Row>
                        <Table.Header>
                            {t("quoteTemplateList.nameColumn")}
                        </Table.Header>
                        <Table.Header fit />
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {isLoading && templates.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={2}>
                                <Paragraph textSize="sm" variant="muted">
                                    {t("quoteTemplateList.loading")}
                                </Paragraph>
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        templates.map((template) => (
                            <QuoteTemplateListRow
                                key={template.id}
                                template={template}
                                onOpenVariation={onOpenVariation}
                                onRename={() =>
                                    setDialog({ kind: "rename", template })
                                }
                                onDelete={() =>
                                    setDialog({ kind: "delete", template })
                                }
                            />
                        ))
                    )}
                </Table.Body>
            </Table>
            <Box>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={isLoading || isMutating}
                    icon={<Plus size={16} aria-hidden="true" />}
                    onClick={() => setDialog({ kind: "create" })}
                >
                    {t("quoteTemplateList.addVariation")}
                </Button>
            </Box>
            <QuoteTemplateNameDialog
                open={dialog.kind === "create"}
                mode="create"
                initialName=""
                isSaving={isMutating}
                onClose={() => setDialog({ kind: "closed" })}
                onSubmit={handleCreateVariation}
            />
            <QuoteTemplateNameDialog
                key={dialog.kind === "rename" ? dialog.template.id : "rename"}
                open={dialog.kind === "rename"}
                mode="rename"
                initialName={
                    dialog.kind === "rename" ? dialog.template.name : ""
                }
                isSaving={isMutating}
                onClose={() => setDialog({ kind: "closed" })}
                onSubmit={(name) => {
                    if (dialog.kind !== "rename") return;
                    void handleRenameTemplate(dialog.template.id, name);
                }}
            />
            <QuoteTemplateDeleteDialog
                open={dialog.kind === "delete"}
                templateName={
                    dialog.kind === "delete" ? dialog.template.name : ""
                }
                isDeleting={isMutating}
                onClose={() => setDialog({ kind: "closed" })}
                onConfirm={() => {
                    if (dialog.kind !== "delete") return;
                    void handleDeleteTemplate(dialog.template.id);
                }}
            />
        </Box>
    );
}
