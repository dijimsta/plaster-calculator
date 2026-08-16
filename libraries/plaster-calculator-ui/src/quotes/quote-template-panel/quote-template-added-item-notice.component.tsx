"use client";

import { Alert, Box, Button, Paragraph } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { QuoteTemplate } from "./quote-template-panel.types.ts";

export type QuoteTemplateAddedItemNoticeProps = {
    /** Names of the custom item(s) just added to the default template. */
    readonly itemNames: readonly string[];
    /** The team's variations (the default itself excluded). */
    readonly variations: readonly QuoteTemplate[];
    /** `QuoteTemplatePanel` always supplies this (WORK-195); it stays optional here, and each variation's link stays disabled without it, only in case some other caller renders this notice on its own. */
    readonly onOpenVariation?: (variationId: string) => void;
    readonly onDismiss: () => void;
};

/**
 * Shown once, right after saving the default adds one or more new custom
 * items. `use-quote-item-templates.hook.ts`'s backfill means every
 * variation picks up a `QuoteItemTemplateConfig` for the new item at the
 * default's *current* price the next time that variation loads -- not at
 * $0 -- but a team still needs telling that happened, since the price may
 * not be right for every variation. When the team has variations, each
 * appears as its own action so a user can jump straight to the one that
 * needs re-pricing.
 */
export function QuoteTemplateAddedItemNotice({
    itemNames,
    variations,
    onOpenVariation,
    onDismiss,
}: QuoteTemplateAddedItemNoticeProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Alert
            intent="info"
            title={t("quoteTemplateList.addedItemNoticeTitle", {
                items: itemNames.join(", "),
            })}
            onDismiss={onDismiss}
        >
            <Paragraph textSize="sm">
                {t("quoteTemplateList.addedItemNoticeDescription")}
            </Paragraph>
            {variations.length > 0 && (
                <Box direction="row" gap="xs" wrap>
                    {variations.map((variation) => (
                        <Button
                            key={variation.id}
                            type="button"
                            variant="secondary"
                            disabled={onOpenVariation === undefined}
                            onClick={() => onOpenVariation?.(variation.id)}
                        >
                            {t("quoteTemplateList.openVariationToReprice", {
                                name: variation.name,
                            })}
                        </Button>
                    ))}
                </Box>
            )}
        </Alert>
    );
}
