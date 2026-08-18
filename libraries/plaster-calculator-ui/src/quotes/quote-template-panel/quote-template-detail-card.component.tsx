"use client";

import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import {
    Badge,
    Box,
    Button,
    Card,
    Divider,
    Input,
    Label,
    Paragraph,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import { useId, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTemplateVariationCompanyList } from "../quote-template-variation-editor/index.ts";

import { QuoteTemplateDeleteDialog } from "./quote-template-delete-dialog.component.tsx";
import type { QuoteTemplate } from "./quote-template-panel.types.ts";

export type QuoteTemplateDetailCardProps = {
    readonly template: QuoteTemplate;
    readonly isMutatingTemplateList: boolean;
    readonly onRename: (name: string) => Promise<void>;
    readonly onSetAsDefault: () => Promise<void>;
    readonly onDelete: () => Promise<void>;
    /** Companies with no variation of their own -- shown read-only for the default's own "Applies to" section. */
    readonly unassignedCompanies: readonly CompanySummary[];
    /** Companies assigned to this template -- shown, with add/remove controls, for a variation's own "Applies to" section. Ignored for the default. */
    readonly assignedCompanies: readonly CompanySummary[];
    readonly candidateCompanies: readonly CompanySummary[];
    readonly isLoadingCompanies: boolean;
    readonly isMutatingCompanies: boolean;
    readonly onAssignCompany: (companyId: string) => Promise<void>;
    readonly onUnassignCompany: (companyId: string) => Promise<void>;
};

/**
 * The currently-open template's own name, default status, and "Applies to"
 * companies -- shared between the default and a variation, since both need
 * the same three things, just with different affordances (a variation gets
 * "Set as team default", "Delete variation", and an editable company list;
 * the default gets neither, since it can't be deleted and every unassigned
 * company already falls back to it automatically).
 */
export function QuoteTemplateDetailCard({
    template,
    isMutatingTemplateList,
    onRename,
    onSetAsDefault,
    onDelete,
    unassignedCompanies,
    assignedCompanies,
    candidateCompanies,
    isLoadingCompanies,
    isMutatingCompanies,
    onAssignCompany,
    onUnassignCompany,
}: QuoteTemplateDetailCardProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { notify } = useNotificationsManager();
    const nameInputId = useId();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [name, setName] = useState(template.name);

    async function handleNameBlur(): Promise<void> {
        const trimmed = name.trim();
        if (trimmed === "" || trimmed === template.name) {
            setName(template.name);
            return;
        }
        try {
            await onRename(trimmed);
        } catch {
            setName(template.name);
            notify({
                intent: "error",
                title: t("quoteTemplateList.renameErrorTitle"),
                description: t("quoteTemplateList.renameErrorDescription"),
            });
        }
    }

    async function handleSetAsDefault(): Promise<void> {
        try {
            await onSetAsDefault();
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateCard.setAsDefaultErrorTitle"),
                description: t(
                    "quoteTemplateCard.setAsDefaultErrorDescription",
                ),
            });
        }
    }

    async function handleDelete(): Promise<void> {
        try {
            await onDelete();
            setDeleteDialogOpen(false);
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateList.deleteErrorTitle"),
                description: t("quoteTemplateList.deleteErrorDescription"),
            });
        }
    }

    return (
        <Card>
            <Card.Body>
                <Box direction="row" gap="lg" align="end">
                    <Box direction="column" gap="xs" grow>
                        <Label htmlFor={nameInputId}>
                            {t("quoteTemplateList.nameLabel")}
                        </Label>
                        <Input
                            id={nameInputId}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            onBlur={() => void handleNameBlur()}
                            required
                        />
                    </Box>
                    <Box direction="row" gap="xs">
                        {template.isDefault ? (
                            <Badge color="indigo">
                                {t("quoteTemplateCard.teamDefaultTemplate")}
                            </Badge>
                        ) : (
                            <Button
                                type="button"
                                variant="secondary"
                                disabled={isMutatingTemplateList}
                                onClick={() => void handleSetAsDefault()}
                            >
                                {t("quoteTemplateCard.setAsTeamDefault")}
                            </Button>
                        )}
                        {!template.isDefault && (
                            <Button
                                type="button"
                                variant="dangerSoft"
                                icon={<Trash2 size={16} aria-hidden="true" />}
                                label={t("quoteTemplateList.deleteAction", {
                                    name: template.name,
                                })}
                                onClick={() => setDeleteDialogOpen(true)}
                            />
                        )}
                    </Box>
                </Box>
                <Divider />
                {template.isDefault ? (
                    <Box direction="column" gap="sm">
                        <Text size="lg" weight="semibold">
                            {t("quoteTemplateVariationEditor.appliesToTitle")}
                        </Text>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            {t("quoteTemplateCard.defaultAppliesToDescription")}
                        </Paragraph>
                        {isLoadingCompanies ? (
                            <Paragraph textSize="sm" variant="muted">
                                {t(
                                    "quoteTemplateVariationEditor.loadingCompanies",
                                )}
                            </Paragraph>
                        ) : unassignedCompanies.length === 0 ? (
                            <Paragraph textSize="sm" variant="muted">
                                {t("quoteTemplateCard.noFallbackCompanies")}
                            </Paragraph>
                        ) : (
                            <Box direction="row" gap="xs" wrap>
                                {unassignedCompanies.map((company) => (
                                    <Badge key={company.id} color="gray">
                                        {company.companyName}
                                    </Badge>
                                ))}
                            </Box>
                        )}
                    </Box>
                ) : (
                    <QuoteTemplateVariationCompanyList
                        variationName={template.name}
                        assignedCompanies={assignedCompanies}
                        candidateCompanies={candidateCompanies}
                        isLoading={isLoadingCompanies}
                        isMutating={isMutatingCompanies}
                        onAssign={onAssignCompany}
                        onUnassign={onUnassignCompany}
                    />
                )}
            </Card.Body>
            <QuoteTemplateDeleteDialog
                open={deleteDialogOpen}
                templateName={template.name}
                isDeleting={isMutatingTemplateList}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={() => void handleDelete()}
            />
        </Card>
    );
}
