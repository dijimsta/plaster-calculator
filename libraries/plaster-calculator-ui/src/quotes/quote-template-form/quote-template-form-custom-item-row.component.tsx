import {
    Button,
    Input,
    SelectMenu,
    Table,
    Text,
    Textarea,
} from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import type { ChangeEvent, ReactElement } from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteUnitInput } from "../quote-unit-input/index.ts";

import { QuoteTemplateFormPriceInput } from "./quote-template-form-price-input.component.tsx";
import type { QuoteTemplateFormValues } from "./quote-template-form.types.ts";

export type QuoteTemplateFormCustomItemRowProps = {
    readonly formId: string;
    readonly fieldKey: string;
    readonly index: number;
    readonly control: Control<QuoteTemplateFormValues>;
    readonly onRemove: () => void;
};

type IncludeOnQuotesValue =
    "keywordMatch" | "includeByDefault" | "dontIncludeByDefault";

function includeOnQuotesValue(
    hasKeywords: boolean,
    enabled: boolean,
): IncludeOnQuotesValue {
    if (hasKeywords) {
        return "keywordMatch";
    }
    return enabled ? "includeByDefault" : "dontIncludeByDefault";
}

export function QuoteTemplateFormCustomItemRow({
    formId,
    fieldKey,
    index,
    control,
    onRemove,
}: QuoteTemplateFormCustomItemRowProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table.Row>
            <Table.Cell>
                <Controller
                    name={`customItems.${index}.name`}
                    control={control}
                    render={({ field }) => (
                        <Input
                            id={`${formId}-custom-item-${fieldKey}-name`}
                            label={t("quoteTemplateForm.itemNameLabel")}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            required
                        />
                    )}
                />
            </Table.Cell>
            <Table.Cell>
                <Controller
                    name={`customItems.${index}.hasKeywords`}
                    control={control}
                    render={({ field: hasKeywordsField }) => (
                        <Controller
                            name={`customItems.${index}.enabled`}
                            control={control}
                            render={({ field: enabledField }) => (
                                <SelectMenu
                                    id={`${formId}-custom-item-${fieldKey}-include`}
                                    label={t(
                                        "quoteTemplateForm.includeOnQuotesLabel",
                                    )}
                                    options={[
                                        {
                                            value: "keywordMatch",
                                            label: t(
                                                "quoteTemplateForm.includeWhenKeywordsMatch",
                                            ),
                                        },
                                        {
                                            value: "includeByDefault",
                                            label: t(
                                                "quoteTemplateForm.includeByDefault",
                                            ),
                                        },
                                        {
                                            value: "dontIncludeByDefault",
                                            label: t(
                                                "quoteTemplateForm.dontIncludeByDefault",
                                            ),
                                        },
                                    ]}
                                    value={includeOnQuotesValue(
                                        hasKeywordsField.value,
                                        enabledField.value,
                                    )}
                                    onChange={(
                                        event: ChangeEvent<HTMLSelectElement>,
                                    ) => {
                                        const value = event.target
                                            .value as IncludeOnQuotesValue;
                                        if (value === "keywordMatch") {
                                            hasKeywordsField.onChange(true);
                                            return;
                                        }
                                        hasKeywordsField.onChange(false);
                                        enabledField.onChange(
                                            value === "includeByDefault",
                                        );
                                    }}
                                />
                            )}
                        />
                    )}
                />
            </Table.Cell>
            <Table.Cell>
                <Controller
                    name={`customItems.${index}.hasKeywords`}
                    control={control}
                    render={({ field: hasKeywordsField }) =>
                        hasKeywordsField.value ? (
                            <Controller
                                name={`customItems.${index}.keywords`}
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        id={`${formId}-custom-item-${fieldKey}-keywords`}
                                        label={t(
                                            "quoteTemplateForm.keywordsLabel",
                                        )}
                                        value={field.value.join(",")}
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value.split(","),
                                            )
                                        }
                                        onBlur={field.onBlur}
                                        placeholder={t(
                                            "quoteTemplateForm.keywordsPlaceholder",
                                        )}
                                        rows={1}
                                    />
                                )}
                            />
                        ) : (
                            <Text size="sm" variant="muted">
                                —
                            </Text>
                        )
                    }
                />
            </Table.Cell>
            <Table.Cell fit>
                <Controller
                    name={`customItems.${index}.unit`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <QuoteUnitInput
                            id={`${formId}-custom-item-${fieldKey}-unit`}
                            value={field.value}
                            required
                            onChange={field.onChange}
                        />
                    )}
                />
            </Table.Cell>
            <Table.Cell fit>
                <Controller
                    name={`customItems.${index}.unitPriceCents`}
                    control={control}
                    render={({ field }) => (
                        <QuoteTemplateFormPriceInput
                            id={`${formId}-custom-item-${fieldKey}-price`}
                            label={t("quoteTemplateForm.priceLabel")}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </Table.Cell>
            <Table.Cell fit>
                <Button
                    type="button"
                    variant="ghost"
                    icon={<Trash2 size={16} aria-hidden="true" />}
                    label={t("quoteTemplateForm.removeItem", {
                        number: index + 1,
                    })}
                    onClick={onRemove}
                />
            </Table.Cell>
        </Table.Row>
    );
}
