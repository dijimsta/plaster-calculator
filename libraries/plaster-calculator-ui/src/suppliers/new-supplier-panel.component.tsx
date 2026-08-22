"use client";

import {
    Box,
    Button,
    Card,
    FormLayoutField,
    Input,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useSuppliersTranslation } from "./i18n/index.ts";
import type { NewSupplierFormValues } from "./new-supplier-panel.types.ts";

export type { NewSupplierFormValues };

export type NewSupplierPanelProps = {
    readonly values: NewSupplierFormValues;
    readonly disabled?: boolean;
    readonly onChange: (patch: Partial<NewSupplierFormValues>) => void;
    readonly onCreate: () => void;
    readonly onCancel?: () => void;
};

/**
 * A new supplier's minimal starting fields -- name, phone, account number --
 * with only name required; the rest of a supplier's contact details fill in
 * later on `SupplierDetailCard`.
 */
export function NewSupplierPanel({
    values,
    disabled = false,
    onChange,
    onCreate,
    onCancel,
}: NewSupplierPanelProps): ReactElement {
    const { t } = useSuppliersTranslation();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onCreate();
            }}
        >
            <Card>
                <Card.Title>{t("newSupplierPanel.title")}</Card.Title>
                <Box direction="column" gap="lg">
                    <FormLayoutField
                        label={t("newSupplierPanel.fields.name")}
                        htmlFor="new-supplier-name"
                    >
                        <Input
                            id="new-supplier-name"
                            value={values.name}
                            required
                            disabled={disabled}
                            onChange={(event) =>
                                onChange({ name: event.target.value })
                            }
                        />
                    </FormLayoutField>
                    <FormLayoutField
                        label={t("newSupplierPanel.fields.phoneNumber")}
                        htmlFor="new-supplier-phone-number"
                    >
                        <Input
                            id="new-supplier-phone-number"
                            type="tel"
                            value={values.phoneNumber}
                            disabled={disabled}
                            onChange={(event) =>
                                onChange({ phoneNumber: event.target.value })
                            }
                        />
                    </FormLayoutField>
                    <FormLayoutField
                        label={t("newSupplierPanel.fields.accountNumber")}
                        htmlFor="new-supplier-account-number"
                    >
                        <Input
                            id="new-supplier-account-number"
                            value={values.accountNumber}
                            disabled={disabled}
                            onChange={(event) =>
                                onChange({ accountNumber: event.target.value })
                            }
                        />
                    </FormLayoutField>
                    <Box direction="row" justify="end" gap="sm">
                        {onCancel && (
                            <Button
                                variant="secondary"
                                type="button"
                                disabled={disabled}
                                onClick={onCancel}
                            >
                                {t("newSupplierPanel.cancel")}
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={disabled}
                        >
                            {t("newSupplierPanel.create")}
                        </Button>
                    </Box>
                </Box>
            </Card>
        </form>
    );
}
