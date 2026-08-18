import {
    Box,
    ButtonLink,
    Card,
    GridList,
    Paragraph,
    SelectMenu,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { CompanyRateItemCard } from "./company-rate-item-card.component.tsx";
import { useCompaniesTranslation } from "./i18n/index.ts";
import type { CompanyRateItemSummary } from "./use-company-rate-item-summaries.hook.ts";

export type CompanyPricingCardTemplate = {
    readonly id: string;
    readonly name: string;
    readonly isDefault: boolean;
};

export type CompanyPricingCardProps = {
    readonly templates: readonly CompanyPricingCardTemplate[];
    /** `null` means the company uses the team's default rates. */
    readonly selectedTemplateId: string | null;
    readonly editRatesHref: string;
    /** A handful of representative item rates for the selected template, from `useCompanyRateItemSummaries`. */
    readonly rateItems: readonly CompanyRateItemSummary[];
    readonly disabled?: boolean;
    readonly onChange: (templateId: string | null) => void;
};

/** Sentinel `<select>` value for "clear the assignment / use the team's default rates". */
const USE_DEFAULT_VALUE = "";

/**
 * The company detail page's "Pricing" card: which rates variation prices
 * this company's quotes, plus a preview of a few representative item rates
 * and how they compare to the team's default. Purely presentational --
 * `rateItems` comes from `useCompanyRateItemSummaries`, called by the host
 * page, the same split `QuoteTemplateCard`/`QuoteTemplateCardGrid` use for
 * their own rate summaries.
 */
export function CompanyPricingCard({
    templates,
    selectedTemplateId,
    editRatesHref,
    rateItems,
    disabled = false,
    onChange,
}: CompanyPricingCardProps): ReactElement {
    const { t } = useCompaniesTranslation();
    const selectedTemplate = templates.find(
        (template) => template.id === selectedTemplateId,
    );
    const selectedValue = selectedTemplateId ?? USE_DEFAULT_VALUE;
    const options = [
        {
            value: USE_DEFAULT_VALUE,
            label: t("companyPricingCard.useDefaultOption"),
        },
        ...templates.map((template) => ({
            value: template.id,
            label: template.isDefault
                ? t("companyPricingCard.defaultTemplateOption", {
                      name: template.name,
                  })
                : template.name,
        })),
    ];

    return (
        <Card>
            <Card.Title>{t("companyPricingCard.title")}</Card.Title>
            <Box direction="column" gap="lg">
                <Paragraph textSize="sm" variant="muted">
                    {selectedTemplate !== undefined
                        ? t("companyPricingCard.description", {
                              name: selectedTemplate.name,
                          })
                        : t("companyPricingCard.descriptionDefault")}
                </Paragraph>
                <Box direction="row" align="end" gap="md">
                    <Box grow>
                        <SelectMenu
                            id="company-pricing-template"
                            label={t("companyPricingCard.fieldLabel")}
                            value={selectedValue}
                            options={options}
                            disabled={disabled}
                            onChange={(event) =>
                                onChange(
                                    event.target.value === USE_DEFAULT_VALUE
                                        ? null
                                        : event.target.value,
                                )
                            }
                        />
                    </Box>
                    <ButtonLink variant="secondary" href={editRatesHref}>
                        {t("companyPricingCard.editRates")}
                    </ButtonLink>
                </Box>
                {rateItems.length > 0 && (
                    <GridList columns={3}>
                        {rateItems.map((item) => (
                            <GridList.Item key={item.id}>
                                <CompanyRateItemCard item={item} />
                            </GridList.Item>
                        ))}
                    </GridList>
                )}
            </Box>
        </Card>
    );
}
