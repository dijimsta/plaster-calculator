import {
    Box,
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    Paragraph,
    Table,
} from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import type { ReactElement } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteTemplateFormCustomItemRow } from "./quote-template-form-custom-item-row.component.tsx";
import { QuoteTemplateFormDefaultItemRow } from "./quote-template-form-default-item-row.component.tsx";
import type {
    QuoteItemSystemKey,
    QuoteTemplateFormValues,
} from "./quote-template-form.types.ts";

export type { QuoteItemSystemKey, QuoteTemplateFormValues };

export type QuoteTemplateFormProps = {
    readonly formId: string;
    readonly initialValues?: QuoteTemplateFormValues;
    readonly submitLabel?: string;
    readonly disabled?: boolean;
    readonly onCancel: () => void;
    readonly onSubmit: (values: QuoteTemplateFormValues) => void;
};

const EMPTY_FORM_VALUES: QuoteTemplateFormValues = {
    defaultItems: [],
    customItems: [],
};

const EMPTY_CUSTOM_ITEM: QuoteTemplateFormValues["customItems"][number] = {
    name: "",
    unit: "",
    hasKeywords: false,
    enabled: true,
    keywords: [],
    unitPriceCents: 0,
};

/** A form for adjusting a quote template's default and custom items. */
export function QuoteTemplateForm({
    formId,
    initialValues,
    submitLabel,
    disabled = false,
    onCancel,
    onSubmit,
}: QuoteTemplateFormProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { control, handleSubmit } = useForm<QuoteTemplateFormValues>({
        defaultValues: initialValues ?? EMPTY_FORM_VALUES,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "customItems",
        keyName: "fieldKey",
    });
    const defaultItems =
        initialValues?.defaultItems ?? EMPTY_FORM_VALUES.defaultItems;
    const resolvedSubmitLabel = disabled
        ? t("quoteTemplateForm.saving")
        : (submitLabel ?? t("quoteTemplateForm.saveChanges"));

    return (
        <FormLayout id={formId} onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <Card.Title>
                    {t("quoteTemplateForm.defaultItemsTitle")}
                </Card.Title>
                <Paragraph measure="narrow" textSize="sm" variant="muted">
                    {t("quoteTemplateForm.defaultItemsDescription")}
                </Paragraph>
                <Card.Body>
                    <Table label={t("quoteTemplateForm.defaultItemsTitle")}>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>
                                    {t("quoteTemplateForm.itemNameLabel")}
                                </Table.Header>
                                <Table.Header fit>
                                    {t("quoteTemplateForm.unitLabel")}
                                </Table.Header>
                                <Table.Header fit>
                                    {t("quoteTemplateForm.priceLabel")}
                                </Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {defaultItems.map((item, index) => (
                                <QuoteTemplateFormDefaultItemRow
                                    key={item.itemTemplateId}
                                    formId={formId}
                                    index={index}
                                    item={item}
                                    control={control}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>
                    <Box direction="column" gap="xs">
                        <Card.Title>
                            {t("quoteTemplateForm.customItemsTitle")}
                        </Card.Title>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            {t("quoteTemplateForm.customItemsDescription")}
                        </Paragraph>
                    </Box>
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={disabled}
                        icon={<Plus size={16} aria-hidden="true" />}
                        onClick={() => append(EMPTY_CUSTOM_ITEM)}
                    >
                        {t("quoteTemplateForm.addItem")}
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table label={t("quoteTemplateForm.customItemsTitle")}>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>
                                    {t("quoteTemplateForm.itemNameLabel")}
                                </Table.Header>
                                <Table.Header fit>
                                    {t("quoteTemplateForm.unitLabel")}
                                </Table.Header>
                                <Table.Header>
                                    {t(
                                        "quoteTemplateForm.includeOnQuotesLabel",
                                    )}
                                </Table.Header>
                                <Table.Header fit>
                                    {t("quoteTemplateForm.priceLabel")}
                                </Table.Header>
                                <Table.Header fit />
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {fields.map((item, index) => (
                                <QuoteTemplateFormCustomItemRow
                                    key={item.fieldKey}
                                    formId={formId}
                                    fieldKey={item.fieldKey}
                                    index={index}
                                    control={control}
                                    onRemove={() => remove(index)}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </Card.Body>
            </Card>
            <FormLayoutActions>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={disabled}
                    onClick={onCancel}
                >
                    {t("common.cancel")}
                </Button>
                <Button type="submit" disabled={disabled}>
                    {resolvedSubmitLabel}
                </Button>
            </FormLayoutActions>
        </FormLayout>
    );
}
