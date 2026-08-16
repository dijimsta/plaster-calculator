"use client";

import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import {
    Box,
    Button,
    ModalDialog,
    Paragraph,
    Table,
    Text,
} from "@libraries/uikit-web";
import { useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteTemplateVariationCompanyPickerDialogProps = {
    readonly open: boolean;
    readonly variationName: string;
    /** Every company not already assigned to this variation -- `QuoteTemplateVariationCompanyList` excludes this variation's own roster before passing this list down. */
    readonly companies: readonly CompanySummary[];
    readonly isAssigning: boolean;
    readonly onClose: () => void;
    readonly onAssign: (companyId: string) => Promise<void>;
};

/**
 * Adds a company to this variation. `Company.quoteTemplateId` is a single
 * field (WORK-190), so a company already priced by another template can't
 * also be priced by this one -- picking one of those rows switches this
 * dialog to an explicit "move this company?" confirmation instead of
 * assigning immediately, the way a company with no assignment (or one
 * that's currently on the default) does. That confirmation is the only
 * thing standing between "adding a company here" and "silently taking it
 * off the template it was on" -- see WORK-195's "what success looks like".
 */
export function QuoteTemplateVariationCompanyPickerDialog({
    open,
    variationName,
    companies,
    isAssigning,
    onClose,
    onAssign,
}: QuoteTemplateVariationCompanyPickerDialogProps): ReactElement {
    const { t } = useQuotesTranslation();
    const [movingCompany, setMovingCompany] = useState<CompanySummary | null>(
        null,
    );

    function handleClose(): void {
        setMovingCompany(null);
        onClose();
    }

    function handlePick(company: CompanySummary): void {
        if (company.quoteTemplateId === null) {
            void onAssign(company.id);
            return;
        }
        setMovingCompany(company);
    }

    async function handleConfirmMove(): Promise<void> {
        if (movingCompany === null) {
            return;
        }
        await onAssign(movingCompany.id);
        setMovingCompany(null);
    }

    if (movingCompany !== null) {
        return (
            <MoveCompanyConfirmDialog
                open={open}
                company={movingCompany}
                variationName={variationName}
                isMoving={isAssigning}
                onCancel={() => setMovingCompany(null)}
                onClose={handleClose}
                onConfirm={() => void handleConfirmMove()}
            />
        );
    }

    return (
        <ModalDialog
            open={open}
            onClose={handleClose}
            size="sm"
            title={t("quoteTemplateVariationEditor.addCompanyDialogTitle", {
                name: variationName,
            })}
        >
            {companies.length === 0 ? (
                <Paragraph textSize="sm" variant="muted">
                    {t("quoteTemplateVariationEditor.noCompaniesToAdd")}
                </Paragraph>
            ) : (
                <Table
                    label={t(
                        "quoteTemplateVariationEditor.addCompanyDialogTitle",
                        {
                            name: variationName,
                        },
                    )}
                >
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>
                                {t(
                                    "quoteTemplateVariationEditor.companyColumn",
                                )}
                            </Table.Header>
                            <Table.Header fit />
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {companies.map((company) => (
                            <Table.Row key={company.id}>
                                <Table.Cell>
                                    <Box direction="column" gap="xs">
                                        <Text size="base">
                                            {company.companyName}
                                        </Text>
                                        {company.quoteTemplateId !== null && (
                                            <Text size="xs" variant="muted">
                                                {t(
                                                    "quoteTemplateVariationEditor.currentlyOnTemplate",
                                                    {
                                                        template:
                                                            company.quoteTemplateName ??
                                                            t(
                                                                "quoteTemplateVariationEditor.unnamedTemplateFallback",
                                                            ),
                                                    },
                                                )}
                                            </Text>
                                        )}
                                    </Box>
                                </Table.Cell>
                                <Table.Cell fit>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        disabled={isAssigning}
                                        onClick={() => handlePick(company)}
                                    >
                                        {t(
                                            "quoteTemplateVariationEditor.addCompanyAction",
                                        )}
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </ModalDialog>
    );
}

type MoveCompanyConfirmDialogProps = {
    readonly open: boolean;
    readonly company: CompanySummary;
    readonly variationName: string;
    readonly isMoving: boolean;
    readonly onCancel: () => void;
    readonly onClose: () => void;
    readonly onConfirm: () => void;
};

function MoveCompanyConfirmDialog({
    open,
    company,
    variationName,
    isMoving,
    onCancel,
    onClose,
    onConfirm,
}: MoveCompanyConfirmDialogProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="sm"
            title={t("quoteTemplateVariationEditor.moveCompanyDialogTitle", {
                name: company.companyName,
            })}
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={isMoving}
                        onClick={onCancel}
                    >
                        {t("common.cancel")}
                    </Button>
                    <Button disabled={isMoving} onClick={onConfirm}>
                        {isMoving
                            ? t(
                                  "quoteTemplateVariationEditor.movingCompanyAction",
                              )
                            : t(
                                  "quoteTemplateVariationEditor.moveCompanyConfirm",
                              )}
                    </Button>
                </>
            }
        >
            <Paragraph textSize="sm" variant="muted">
                {t(
                    "quoteTemplateVariationEditor.moveCompanyDialogDescription",
                    {
                        company: company.companyName,
                        fromTemplate:
                            company.quoteTemplateName ??
                            t(
                                "quoteTemplateVariationEditor.unnamedTemplateFallback",
                            ),
                        toTemplate: variationName,
                    },
                )}
            </Paragraph>
        </ModalDialog>
    );
}
