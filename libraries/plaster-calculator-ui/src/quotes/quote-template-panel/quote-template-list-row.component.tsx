"use client";

import { Badge, Box, Button, Table, Text } from "@libraries/uikit-web";
import { Pencil, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { QuoteTemplate } from "./quote-template-panel.types.ts";

export type QuoteTemplateListRowProps = {
    readonly template: QuoteTemplate;
    /** `QuoteTemplatePanel` always supplies this (WORK-195); it stays optional here, and the "Open" action stays disabled without it, only in case some other caller renders this row on its own. */
    readonly onOpenVariation?: (variationId: string) => void;
    readonly onRename: () => void;
    readonly onDelete: () => void;
};

/** One row of `QuoteTemplateList`: the default (pinned first, badged, no open/delete action -- it's already open in the editor below) or a variation (open/rename/delete). */
export function QuoteTemplateListRow({
    template,
    onOpenVariation,
    onRename,
    onDelete,
}: QuoteTemplateListRowProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table.Row>
            <Table.Cell>
                <Box direction="row" gap="xs" align="center">
                    <Text size="base">{template.name}</Text>
                    {template.isDefault && (
                        <Badge color="indigo">
                            {t("quoteTemplateList.defaultBadge")}
                        </Badge>
                    )}
                </Box>
            </Table.Cell>
            <Table.Cell fit>
                <Box direction="row" gap="xs">
                    {!template.isDefault && (
                        <Button
                            type="button"
                            variant="ghost"
                            icon={
                                <SquareArrowOutUpRight
                                    size={16}
                                    aria-hidden="true"
                                />
                            }
                            label={t("quoteTemplateList.openAction", {
                                name: template.name,
                            })}
                            disabled={onOpenVariation === undefined}
                            onClick={() => onOpenVariation?.(template.id)}
                        />
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        icon={<Pencil size={16} aria-hidden="true" />}
                        label={t("quoteTemplateList.renameAction", {
                            name: template.name,
                        })}
                        onClick={onRename}
                    />
                    {!template.isDefault && (
                        <Button
                            type="button"
                            variant="ghost"
                            icon={<Trash2 size={16} aria-hidden="true" />}
                            label={t("quoteTemplateList.deleteAction", {
                                name: template.name,
                            })}
                            onClick={onDelete}
                        />
                    )}
                </Box>
            </Table.Cell>
        </Table.Row>
    );
}
