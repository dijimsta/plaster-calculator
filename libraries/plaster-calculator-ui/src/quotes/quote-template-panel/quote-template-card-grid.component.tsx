"use client";

import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import {
    Box,
    Card,
    GridList,
    IconTile,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteTemplateCard } from "./quote-template-card.component.tsx";
import { QuoteTemplateNameDialog } from "./quote-template-name-dialog.component.tsx";
import type { QuoteTemplate } from "./quote-template-panel.types.ts";
import type { QuoteTemplateRateSummary } from "./use-quote-template-rate-summaries.hook.ts";

export type QuoteTemplateCardGridProps = {
    /** The default template plus its variations, default pinned first. */
    readonly templates: readonly QuoteTemplate[];
    readonly openTemplateId: string | null;
    readonly isMutating: boolean;
    readonly companiesByTemplateId: ReadonlyMap<
        string,
        readonly CompanySummary[]
    >;
    readonly unassignedCompanyCount: number;
    readonly rateByTemplateId: ReadonlyMap<string, QuoteTemplateRateSummary>;
    readonly onOpenTemplate: (id: string) => void;
    readonly onCreateVariation: (name: string) => Promise<void>;
};

/**
 * The team's templates as a row of selectable cards -- the default plus its
 * variations, each showing who it applies to and its "walls" rate -- with a
 * trailing dashed card to start a new variation. Replaces the earlier
 * table-based `QuoteTemplateList`: unlike a pure management list, a user
 * browsing prices across several negotiated variations benefits from
 * scanning them side by side, which is what motivated the card treatment
 * here.
 */
export function QuoteTemplateCardGrid({
    templates,
    openTemplateId,
    isMutating,
    companiesByTemplateId,
    unassignedCompanyCount,
    rateByTemplateId,
    onOpenTemplate,
    onCreateVariation,
}: QuoteTemplateCardGridProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { notify } = useNotificationsManager();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const defaultTemplateId = templates.find(
        (template) => template.isDefault,
    )?.id;
    const defaultRate =
        defaultTemplateId === undefined
            ? undefined
            : rateByTemplateId.get(defaultTemplateId);

    async function handleCreateVariation(name: string): Promise<void> {
        try {
            await onCreateVariation(name);
            setCreateDialogOpen(false);
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateList.createErrorTitle"),
                description: t("quoteTemplateList.createErrorDescription"),
            });
        }
    }

    return (
        <>
            <GridList columns={4}>
                {templates.map((template) => (
                    <GridList.Item key={template.id}>
                        <QuoteTemplateCard
                            template={template}
                            isOpen={template.id === openTemplateId}
                            assignedCompanies={
                                companiesByTemplateId.get(template.id) ?? []
                            }
                            fallbackCompanyCount={unassignedCompanyCount}
                            rate={rateByTemplateId.get(template.id)}
                            defaultRate={defaultRate}
                            onOpen={() => onOpenTemplate(template.id)}
                        />
                    </GridList.Item>
                ))}
                <GridList.Item>
                    <Card
                        variant="dashed"
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        <Box direction="column" align="center" gap="sm">
                            <IconTile tone="neutral">
                                <Plus size={20} aria-hidden="true" />
                            </IconTile>
                            <Text size="base" weight="semibold">
                                {t("quoteTemplateList.addVariation")}
                            </Text>
                            <Text size="sm" variant="muted">
                                {t("quoteTemplateCard.newVariationDescription")}
                            </Text>
                        </Box>
                    </Card>
                </GridList.Item>
            </GridList>
            <QuoteTemplateNameDialog
                open={createDialogOpen}
                isSaving={isMutating}
                onClose={() => setCreateDialogOpen(false)}
                onSubmit={(name) => void handleCreateVariation(name)}
            />
        </>
    );
}
