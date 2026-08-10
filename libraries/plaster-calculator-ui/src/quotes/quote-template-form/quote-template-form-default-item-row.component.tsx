import { Box, Table, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteTemplateFormPriceInput } from "./quote-template-form-price-input.component.tsx";
import type { QuoteTemplateFormValues } from "./quote-template-form.types.ts";

export type QuoteTemplateFormDefaultItemRowProps = {
    readonly formId: string;
    readonly index: number;
    readonly item: QuoteTemplateFormValues["defaultItems"][number];
    readonly control: Control<QuoteTemplateFormValues>;
};

export function QuoteTemplateFormDefaultItemRow({
    formId,
    index,
    item,
    control,
}: QuoteTemplateFormDefaultItemRowProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table.Row>
            <Table.Cell>
                <Box direction="column" gap="xs">
                    <Text size="base">{item.name}</Text>
                    <Text size="sm" variant="muted">
                        {t(
                            `quoteTemplateForm.quantitySourceDescription.${item.systemKey}`,
                        )}
                    </Text>
                </Box>
            </Table.Cell>
            <Table.Cell fit>
                <Controller
                    name={`defaultItems.${index}.unitPriceCents`}
                    control={control}
                    render={({ field }) => (
                        <QuoteTemplateFormPriceInput
                            id={`${formId}-default-item-${item.itemTemplateId}-price`}
                            label={t("quoteTemplateForm.priceLabel")}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </Table.Cell>
        </Table.Row>
    );
}
