"use client";

import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import { Badge, Box, Card, Text } from "@libraries/uikit-web";
import { centsToAudDisplayText } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { describeRatePercentDelta } from "../quote-template-variation-editor/index.ts";

import type { QuoteTemplate } from "./quote-template-panel.types.ts";
import type { QuoteTemplateRateSummary } from "./use-quote-template-rate-summaries.hook.ts";

export type QuoteTemplateCardProps = {
    readonly template: QuoteTemplate;
    readonly isOpen: boolean;
    /** Companies whose `quoteTemplateId` names this template. Ignored for the default -- see `fallbackCompanyCount`. */
    readonly assignedCompanies: readonly CompanySummary[];
    /** Companies with no variation of their own, i.e. priced by this template as the fallback. Only meaningful for the default's own card. */
    readonly fallbackCompanyCount: number;
    /** This template's price for the representative "walls" item, when loaded. */
    readonly rate?: QuoteTemplateRateSummary;
    /** The default template's own price for the same item, for the percent-delta line. Ignored for the default's own card. */
    readonly defaultRate?: QuoteTemplateRateSummary;
    readonly onOpen: () => void;
};

/** One template's card in `QuoteTemplateCardGrid`: name, default badge, who it applies to, and its "walls" rate (with a percent delta vs the default for a variation). */
export function QuoteTemplateCard({
    template,
    isOpen,
    assignedCompanies,
    fallbackCompanyCount,
    rate,
    defaultRate,
    onOpen,
}: QuoteTemplateCardProps): ReactElement {
    const { t } = useQuotesTranslation();
    const percentDelta =
        !template.isDefault && rate !== undefined && defaultRate !== undefined
            ? describeRatePercentDelta(
                  rate.unitPriceCents - defaultRate.unitPriceCents,
                  defaultRate.unitPriceCents,
              )
            : undefined;

    return (
        <Card selected={isOpen} onClick={onOpen}>
            <Box direction="column" gap="sm">
                <Box direction="row" align="center" gap="xs">
                    <Text size="base" weight="semibold">
                        {template.name}
                    </Text>
                    {template.isDefault && (
                        <Badge color="indigo">
                            {t("quoteTemplateList.defaultBadge")}
                        </Badge>
                    )}
                </Box>
                <Text size="sm" variant="muted">
                    {appliesToSummary(
                        t,
                        template,
                        assignedCompanies,
                        fallbackCompanyCount,
                    )}
                </Text>
                {rate !== undefined && (
                    <Box direction="column">
                        <Text size="sm">
                            {t("quoteTemplateCard.wallsRate", {
                                price: centsToAudDisplayText(
                                    rate.unitPriceCents,
                                ),
                                unit: rate.unit ?? "",
                            })}
                        </Text>
                        {percentDelta !== undefined &&
                            percentDelta.kind !== "same" && (
                                <Text size="xs" variant="muted">
                                    {percentDelta.kind === "decrease"
                                        ? t(
                                              "quoteTemplateCard.percentDeltaDecrease",
                                              {
                                                  amount: percentDelta.percentDisplayText,
                                              },
                                          )
                                        : t(
                                              "quoteTemplateCard.percentDeltaIncrease",
                                              {
                                                  amount: percentDelta.percentDisplayText,
                                              },
                                          )}
                                </Text>
                            )}
                    </Box>
                )}
            </Box>
        </Card>
    );
}

function appliesToSummary(
    t: ReturnType<typeof useQuotesTranslation>["t"],
    template: QuoteTemplate,
    assignedCompanies: readonly CompanySummary[],
    fallbackCompanyCount: number,
): string {
    if (template.isDefault) {
        return t("quoteTemplateCard.defaultAppliesTo", {
            count: fallbackCompanyCount,
        });
    }
    if (assignedCompanies.length === 0) {
        return t("quoteTemplateVariationEditor.noCompaniesAssigned");
    }
    return assignedCompanies.map((company) => company.companyName).join(", ");
}
