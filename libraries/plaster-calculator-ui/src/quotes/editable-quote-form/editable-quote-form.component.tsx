"use client";

import { QuoteTotalsUtils } from "@libraries/plaster-calculator-common";
import {
    Box,
    Button,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    FormLayoutSection,
    Input,
    Table,
} from "@libraries/uikit-web";
import { Plus, Trash2 } from "lucide-react";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTotalsBlock } from "../quote-totals-block/index.ts";
import { QuoteUnitInput } from "../quote-unit-input/index.ts";

import type { EditableQuoteFormValues } from "./editable-quote-form.types.ts";
import { EditableQuotePriceInput } from "./editable-quote-price-input.component.tsx";

export type EditableQuoteFormProps = {
    readonly formId: string;
    readonly initialValues: EditableQuoteFormValues;
    readonly disabled?: boolean;
    readonly onCancel?: () => void;
    readonly onSubmit: (
        values: EditableQuoteFormValues,
    ) => void | Promise<void>;
};

const EMPTY_LINE_ITEM: EditableQuoteFormValues["lineItems"][number] = {
    name: "",
    quantity: 1,
    unit: "",
    unitPriceCents: 0,
};

/** Edits the independent snapshot created when a project quote is generated. */
export function EditableQuoteForm({
    formId,
    initialValues,
    disabled = false,
    onCancel,
    onSubmit,
}: EditableQuoteFormProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { control, handleSubmit, reset } = useForm<EditableQuoteFormValues>({
        defaultValues: initialValues,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "lineItems",
        keyName: "fieldKey",
    });
    const lineItems = useWatch({ control, name: "lineItems" });
    const subtotalCents = QuoteTotalsUtils.subtotalCents(
        lineItems.map((item) =>
            QuoteTotalsUtils.lineAmountCents(
                item.quantity,
                item.unitPriceCents,
            ),
        ),
    );
    const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    return (
        <FormLayout
            id={formId}
            variant="stacked-wide"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLayoutSection
                title={t("editableQuoteForm.quoteDetailsTitle")}
                description={t("editableQuoteForm.quoteDetailsDescription")}
                bodySpacing="compact"
            >
                <FormLayoutField
                    label={t("editableQuoteForm.referenceLabel")}
                    htmlFor={`${formId}-reference`}
                >
                    <Controller
                        name="reference"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id={`${formId}-reference`}
                                value={field.value}
                                disabled={disabled}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutSection
                title={t("editableQuoteForm.lineItemsTitle")}
                description={t("editableQuoteForm.lineItemsDescription")}
                bodySpacing="compact"
            >
                <FormLayoutField label="" span="full">
                    <Box direction="column" gap="md">
                        <Table
                            bordered
                            label={t("editableQuoteForm.lineItemsTitle")}
                        >
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>
                                        {t("quoteDetailDocument.columnItem")}
                                    </Table.Header>
                                    <Table.Header fit>
                                        {t("quoteUnitInput.label")}
                                    </Table.Header>
                                    <Table.Header fit>
                                        {t(
                                            "quoteDetailDocument.columnQuantity",
                                        )}
                                    </Table.Header>
                                    <Table.Header fit>
                                        {t(
                                            "quoteDetailDocument.columnUnitPrice",
                                        )}
                                    </Table.Header>
                                    <Table.Header fit />
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {fields.map((item, index) => (
                                    <Table.Row key={item.fieldKey}>
                                        <Table.Cell>
                                            <Controller
                                                name={`lineItems.${index}.name`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        id={`${formId}-item-${item.fieldKey}-name`}
                                                        label={t(
                                                            "quoteDetailDocument.columnItem",
                                                        )}
                                                        value={field.value}
                                                        disabled={disabled}
                                                        required
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        </Table.Cell>
                                        <Table.Cell fit>
                                            <Controller
                                                name={`lineItems.${index}.unit`}
                                                control={control}
                                                rules={{
                                                    required:
                                                        item.id === undefined,
                                                }}
                                                render={({ field }) => (
                                                    <QuoteUnitInput
                                                        id={`${formId}-item-${item.fieldKey}-unit`}
                                                        value={field.value}
                                                        disabled={disabled}
                                                        required={
                                                            item.id ===
                                                            undefined
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        </Table.Cell>
                                        <Table.Cell fit>
                                            <Controller
                                                name={`lineItems.${index}.quantity`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        id={`${formId}-item-${item.fieldKey}-quantity`}
                                                        label={t(
                                                            "quoteDetailDocument.columnQuantity",
                                                        )}
                                                        type="number"
                                                        inputMode="decimal"
                                                        min={0}
                                                        step="any"
                                                        value={field.value}
                                                        disabled={disabled}
                                                        required
                                                        onChange={(event) =>
                                                            field.onChange(
                                                                event.target
                                                                    .value ===
                                                                    ""
                                                                    ? 0
                                                                    : event
                                                                          .target
                                                                          .valueAsNumber,
                                                            )
                                                        }
                                                        onBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        </Table.Cell>
                                        <Table.Cell fit>
                                            <Controller
                                                name={`lineItems.${index}.unitPriceCents`}
                                                control={control}
                                                render={({ field }) => (
                                                    <EditableQuotePriceInput
                                                        id={`${formId}-item-${item.fieldKey}-price`}
                                                        label={t(
                                                            "quoteDetailDocument.columnUnitPrice",
                                                        )}
                                                        value={field.value}
                                                        disabled={disabled}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                    />
                                                )}
                                            />
                                        </Table.Cell>
                                        <Table.Cell fit>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                icon={
                                                    <Trash2
                                                        size={16}
                                                        aria-hidden="true"
                                                    />
                                                }
                                                label={t(
                                                    "editableQuoteForm.removeItem",
                                                    { number: index + 1 },
                                                )}
                                                disabled={disabled}
                                                onClick={() => remove(index)}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <Box>
                            <Button
                                type="button"
                                variant="secondary"
                                icon={<Plus size={16} aria-hidden="true" />}
                                disabled={disabled}
                                onClick={() => append(EMPTY_LINE_ITEM)}
                            >
                                {t("editableQuoteForm.addItem")}
                            </Button>
                        </Box>
                        <QuoteTotalsBlock
                            subtotalCents={subtotalCents}
                            gstCents={gstCents}
                            totalIncGstCents={QuoteTotalsUtils.totalIncGstCents(
                                subtotalCents,
                                gstCents,
                            )}
                        />
                    </Box>
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutActions divided={false}>
                {onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={disabled}
                        onClick={onCancel}
                    >
                        {t("common.cancel")}
                    </Button>
                )}
                <Button type="submit" disabled={disabled}>
                    {disabled
                        ? t("editableQuoteForm.saving")
                        : t("editableQuoteForm.save")}
                </Button>
            </FormLayoutActions>
        </FormLayout>
    );
}
