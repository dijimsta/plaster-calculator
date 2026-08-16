import { Box, Table, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTemplateFormPriceInput } from "../quote-template-form/quote-template-form-price-input.component.tsx";

import type { QuoteTemplateVariationFormValues } from "./quote-template-variation-editor.types.ts";
import { QuoteTemplateVariationEditorUtils } from "./quote-template-variation-editor.utils.ts";

export type QuoteTemplateVariationItemRowProps = {
    readonly formId: string;
    readonly index: number;
    readonly item: QuoteTemplateVariationFormValues["items"][number];
    readonly control: Control<QuoteTemplateVariationFormValues>;
};

/**
 * One item on a variation: name, unit and keywords read-only (this screen
 * has no add/remove/include-on-quotes controls -- see this folder's
 * `quote-template-variation-form.component.tsx` doc comment), price the
 * only editable cell, and a rate delta against the default rendered
 * underneath the price input so a negotiated line is visible without
 * opening the default template.
 */
export function QuoteTemplateVariationItemRow({
    formId,
    index,
    item,
    control,
}: QuoteTemplateVariationItemRowProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table.Row>
            <Table.Cell>
                <Text size="base">{item.name}</Text>
            </Table.Cell>
            <Table.Cell fit>
                {item.unit ? (
                    <Text size="sm">{item.unit}</Text>
                ) : (
                    <Text size="sm" variant="muted">
                        {t("quoteTemplateForm.unitNotSet")}
                    </Text>
                )}
            </Table.Cell>
            <Table.Cell>
                {item.hasKeywords && item.keywords.length > 0 ? (
                    <Text size="sm">{item.keywords.join(", ")}</Text>
                ) : (
                    <Text size="sm" variant="muted">
                        —
                    </Text>
                )}
            </Table.Cell>
            <Table.Cell fit>
                <Controller
                    name={`items.${index}.unitPriceCents`}
                    control={control}
                    render={({ field }) => (
                        <Box direction="column" gap="xs">
                            <QuoteTemplateFormPriceInput
                                id={`${formId}-variation-item-${item.itemTemplateId}-price`}
                                label={t("quoteTemplateForm.priceLabel")}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                            <RateDeltaText
                                deltaCents={
                                    field.value - item.defaultUnitPriceCents
                                }
                            />
                        </Box>
                    )}
                />
            </Table.Cell>
        </Table.Row>
    );
}

type RateDeltaTextProps = {
    readonly deltaCents: number;
};

function RateDeltaText({ deltaCents }: RateDeltaTextProps): ReactElement {
    const { t } = useQuotesTranslation();
    const delta =
        QuoteTemplateVariationEditorUtils.describeRateDelta(deltaCents);

    switch (delta.kind) {
        case "same":
            return (
                <Text size="xs" variant="muted">
                    {t("quoteTemplateVariationEditor.rateDeltaSame")}
                </Text>
            );
        case "increase":
            return (
                <Text size="xs" variant="muted">
                    {t("quoteTemplateVariationEditor.rateDeltaIncrease", {
                        amount: delta.amountDisplayText,
                    })}
                </Text>
            );
        case "decrease":
            return (
                <Text size="xs" variant="muted">
                    {t("quoteTemplateVariationEditor.rateDeltaDecrease", {
                        amount: delta.amountDisplayText,
                    })}
                </Text>
            );
    }
}
