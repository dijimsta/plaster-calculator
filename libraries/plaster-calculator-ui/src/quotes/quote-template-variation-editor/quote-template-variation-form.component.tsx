import {
    Button,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    Table,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { QuoteTemplateVariationFormValues } from "./quote-template-variation-editor.types.ts";
import { QuoteTemplateVariationItemRow } from "./quote-template-variation-item-row.component.tsx";

export type { QuoteTemplateVariationFormValues };

export type QuoteTemplateVariationFormProps = {
    readonly formId: string;
    readonly initialValues: QuoteTemplateVariationFormValues;
    readonly disabled?: boolean;
    readonly onCancel: () => void;
    readonly onSubmit: (values: QuoteTemplateVariationFormValues) => void;
};

/**
 * A sibling of `QuoteTemplateForm` rather than that form rendering in a
 * "prices only" mode: `QuoteTemplateForm` owns add/remove, an
 * include-on-quotes selector, and editable keywords/unit -- none of which
 * this screen has -- plus its own `useFieldArray` for custom items, which a
 * variation has no use for since its item set is fixed at creation
 * (`CreateQuoteTemplateVariation` copies the default's items once; nothing
 * on this screen adds or removes rows after that). Threading a mode flag
 * through every row/field of that form to strip all of that back out would
 * leave both the default and the prices-only path harder to read than two
 * small, single-purpose forms sharing only `QuoteTemplateFormPriceInput`.
 * `QuoteTemplateVariationFormValues` (a flat, ordered `items` list) mirrors
 * that: it has no room for the fields this screen can't edit, rather than
 * `QuoteTemplateFormValues`'s full default/custom item shape with unused
 * fields ignored.
 */
export function QuoteTemplateVariationForm({
    formId,
    initialValues,
    disabled = false,
    onCancel,
    onSubmit,
}: QuoteTemplateVariationFormProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { control, handleSubmit } = useForm<QuoteTemplateVariationFormValues>(
        {
            defaultValues: initialValues,
        },
    );
    const resolvedSubmitLabel = disabled
        ? t("quoteTemplateForm.saving")
        : t("quoteTemplateForm.saveChanges");

    return (
        <FormLayout id={formId} onSubmit={handleSubmit(onSubmit)}>
            <FormLayoutField label="" span="full">
                <Table
                    label={t("quoteTemplateVariationEditor.itemsTableLabel")}
                >
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>
                                {t("quoteTemplateForm.itemNameLabel")}
                            </Table.Header>
                            <Table.Header fit>
                                {t("quoteTemplateForm.unitLabel")}
                            </Table.Header>
                            <Table.Header>
                                {t("quoteTemplateForm.keywordsLabel")}
                            </Table.Header>
                            <Table.Header fit>
                                {t("quoteTemplateForm.priceLabel")}
                            </Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {initialValues.items.map((item, index) => (
                            <QuoteTemplateVariationItemRow
                                key={item.itemTemplateId}
                                formId={formId}
                                index={index}
                                item={item}
                                control={control}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </FormLayoutField>
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
