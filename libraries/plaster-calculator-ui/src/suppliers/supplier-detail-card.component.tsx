"use client";

import {
    Badge,
    Box,
    Button,
    Card,
    Divider,
    FormLayoutField,
    Grid,
    Input,
    ModalDialog,
    Paragraph,
} from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { ReactElement } from "react";

import { useSuppliersTranslation } from "./i18n/index.ts";
import type { SupplierDetailFormValues } from "./supplier-detail-card.types.ts";

export type { SupplierDetailFormValues };

export type SupplierDetailCardProps = {
    readonly supplierName: string;
    readonly isDefault: boolean;
    readonly values: SupplierDetailFormValues;
    readonly hasChanges: boolean;
    readonly isDeleting?: boolean;
    readonly onChange: (patch: Partial<SupplierDetailFormValues>) => void;
    readonly onSave: () => void;
    readonly onSetAsDefault: () => void;
    readonly onDelete: () => void;
};

/**
 * The supplier detail page's "Details" card: editable contact fields plus
 * save, set-as-default, and delete-with-confirmation actions. Combines
 * `CompanyDetailCard`'s form/save/delete footer, `QuoteTemplateDetailCard`'s
 * default badge-or-button split, and `QuoteTemplateDeleteDialog`'s
 * confirmation dialog -- kept in one file since, unlike the quote templates
 * panel, no sibling supplier component needs to reuse the delete dialog.
 */
export function SupplierDetailCard({
    supplierName,
    isDefault,
    values,
    hasChanges,
    isDeleting = false,
    onChange,
    onSave,
    onSetAsDefault,
    onDelete,
}: SupplierDetailCardProps): ReactElement {
    const { t } = useSuppliersTranslation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function handleConfirmDelete(): void {
        onDelete();
        setDeleteDialogOpen(false);
    }

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSave();
                }}
            >
                <Card>
                    <Box direction="row" align="center" justify="between">
                        <Card.Title>{t("supplierDetailCard.title")}</Card.Title>
                        {isDefault ? (
                            <Badge color="indigo">
                                {t("supplierDetailCard.defaultBadge")}
                            </Badge>
                        ) : (
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={onSetAsDefault}
                            >
                                {t("supplierDetailCard.setAsDefault")}
                            </Button>
                        )}
                    </Box>
                    <Box direction="column" gap="lg">
                        <Grid columns={{ xs: 1, sm: 2 }} gap="md">
                            <FormLayoutField
                                label={t(
                                    "supplierDetailCard.fields.contactName",
                                )}
                                htmlFor="supplier-detail-contact-name"
                            >
                                <Input
                                    id="supplier-detail-contact-name"
                                    value={values.contactName}
                                    onChange={(event) =>
                                        onChange({
                                            contactName: event.target.value,
                                        })
                                    }
                                />
                            </FormLayoutField>
                            <FormLayoutField
                                label={t(
                                    "supplierDetailCard.fields.phoneNumber",
                                )}
                                htmlFor="supplier-detail-phone-number"
                            >
                                <Input
                                    id="supplier-detail-phone-number"
                                    type="tel"
                                    value={values.phoneNumber}
                                    onChange={(event) =>
                                        onChange({
                                            phoneNumber: event.target.value,
                                        })
                                    }
                                />
                            </FormLayoutField>
                            <FormLayoutField
                                label={t("supplierDetailCard.fields.email")}
                                htmlFor="supplier-detail-email"
                            >
                                <Input
                                    id="supplier-detail-email"
                                    type="email"
                                    value={values.email}
                                    onChange={(event) =>
                                        onChange({ email: event.target.value })
                                    }
                                />
                            </FormLayoutField>
                            <FormLayoutField
                                label={t(
                                    "supplierDetailCard.fields.accountNumber",
                                )}
                                htmlFor="supplier-detail-account-number"
                            >
                                <Input
                                    id="supplier-detail-account-number"
                                    value={values.accountNumber}
                                    onChange={(event) =>
                                        onChange({
                                            accountNumber: event.target.value,
                                        })
                                    }
                                />
                            </FormLayoutField>
                            <FormLayoutField
                                label={t("supplierDetailCard.fields.address")}
                                htmlFor="supplier-detail-address"
                                span="full"
                            >
                                <Input
                                    id="supplier-detail-address"
                                    value={values.address}
                                    onChange={(event) =>
                                        onChange({
                                            address: event.target.value,
                                        })
                                    }
                                />
                            </FormLayoutField>
                        </Grid>
                        <Divider />
                        <Box direction="row" justify="between" align="center">
                            <Button
                                variant="dangerSoft"
                                icon={<Trash2 size={18} aria-hidden="true" />}
                                title={
                                    isDefault
                                        ? t(
                                              "supplierDetailCard.cannotDeleteDefaultTitle",
                                          )
                                        : t("supplierDetailCard.deleteTitle")
                                }
                                type="button"
                                disabled={isDefault}
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                {t("supplierDetailCard.delete")}
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!hasChanges}
                            >
                                {t("supplierDetailCard.save")}
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </form>
            <ModalDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                size="sm"
                title={t("supplierDetailCard.deleteDialogTitle", {
                    name: supplierName,
                })}
                footer={
                    <>
                        <Button
                            variant="secondary"
                            disabled={isDeleting}
                            type="button"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            {t("supplierDetailCard.deleteCancel")}
                        </Button>
                        <Button
                            variant="danger"
                            disabled={isDeleting}
                            type="button"
                            onClick={handleConfirmDelete}
                        >
                            {isDeleting
                                ? t("supplierDetailCard.deletingAction")
                                : t("supplierDetailCard.deleteSubmit")}
                        </Button>
                    </>
                }
            >
                <Paragraph textSize="sm" variant="muted">
                    {t("supplierDetailCard.deleteDialogDescription", {
                        name: supplierName,
                    })}
                </Paragraph>
            </ModalDialog>
        </>
    );
}
