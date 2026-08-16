"use client";

import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import { Badge, Box, Button, Paragraph, Text } from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteTemplateVariationCompanyPickerDialog } from "./quote-template-variation-company-picker-dialog.component.tsx";

export type QuoteTemplateVariationCompanyListProps = {
    readonly variationName: string;
    readonly assignedCompanies: readonly CompanySummary[];
    readonly candidateCompanies: readonly CompanySummary[];
    readonly isLoading: boolean;
    readonly isMutating: boolean;
    readonly onAssign: (companyId: string) => Promise<void>;
    readonly onUnassign: (companyId: string) => Promise<void>;
};

/**
 * Which companies this variation prices (WORK-195's "Applies to" list) --
 * companies, not builder roles, matching `Company.quoteTemplateId`
 * (WORK-190) rather than any role-scoped concept. Removing a company here
 * clears its assignment (`ClearCompanyQuoteTemplate`), which falls it back
 * to the team's default template; it does not delete the company.
 */
export function QuoteTemplateVariationCompanyList({
    variationName,
    assignedCompanies,
    candidateCompanies,
    isLoading,
    isMutating,
    onAssign,
    onUnassign,
}: QuoteTemplateVariationCompanyListProps): ReactElement {
    const { t } = useQuotesTranslation();
    const [pickerOpen, setPickerOpen] = useState(false);

    return (
        <Box direction="column" gap="sm">
            <Text size="lg" weight="semibold">
                {t("quoteTemplateVariationEditor.appliesToTitle")}
            </Text>
            <Paragraph measure="narrow" textSize="sm" variant="muted">
                {t("quoteTemplateVariationEditor.appliesToDescription")}
            </Paragraph>
            {isLoading ? (
                <Paragraph textSize="sm" variant="muted">
                    {t("quoteTemplateVariationEditor.loadingCompanies")}
                </Paragraph>
            ) : assignedCompanies.length === 0 ? (
                <Paragraph textSize="sm" variant="muted">
                    {t("quoteTemplateVariationEditor.noCompaniesAssigned")}
                </Paragraph>
            ) : (
                <Box direction="row" gap="xs" wrap>
                    {assignedCompanies.map((company) => (
                        <Badge
                            key={company.id}
                            color="indigo"
                            onRemove={
                                isMutating
                                    ? undefined
                                    : () => void onUnassign(company.id)
                            }
                        >
                            {company.companyName}
                        </Badge>
                    ))}
                </Box>
            )}
            <Box>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={isLoading || isMutating}
                    icon={<Plus size={16} aria-hidden="true" />}
                    onClick={() => setPickerOpen(true)}
                >
                    {t("quoteTemplateVariationEditor.addCompany")}
                </Button>
            </Box>
            <QuoteTemplateVariationCompanyPickerDialog
                open={pickerOpen}
                variationName={variationName}
                companies={candidateCompanies}
                isAssigning={isMutating}
                onClose={() => setPickerOpen(false)}
                onAssign={async (companyId) => {
                    await onAssign(companyId);
                    setPickerOpen(false);
                }}
            />
        </Box>
    );
}
