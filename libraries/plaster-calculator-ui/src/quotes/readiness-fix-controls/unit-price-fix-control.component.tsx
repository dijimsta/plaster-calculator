import type { ReadinessAffectedItem } from "@libraries/plaster-calculator-common";
import { Box, Input } from "@libraries/uikit-web";
import { centsToDollarsText, dollarsTextToCents } from "@libraries/utilities";
import { useId, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

const DOLLARS_TEXT_PATTERN = /^\d+(\.\d{1,2})?$/;

export type UnitPriceFixControlProps = {
    /** The affected `QuoteItemTemplateConfig` this input scopes its edit to. */
    readonly item: ReadinessAffectedItem;
    /** This template's current/proposed unit price in cents, always shown
     * formatted as dollars rather than left blank. */
    readonly valueCents: number;
    /**
     * Called on every keystroke with the parsed price, or `undefined` while
     * the current text doesn't parse as a valid price. Unlike the other
     * inline fix controls, this one commits nothing itself — "template
     * priced" can flag many affected items at once, so each input only
     * reports its live draft upward and a single shared
     * `UnitPriceBatchSaveControl` (this check's `renderCheckFooter`) submits
     * every draft together.
     */
    readonly onChange: (unitPriceCents: number | undefined) => void;
};

/**
 * Inline fix control for the "template priced" readiness check: a cents
 * input, scoped to one `QuoteItemTemplateConfig` via `item`. Displays and
 * edits the price as dollars (matching `QuoteTemplateFormPriceInput`'s
 * convention elsewhere in this package). Purely a controlled input with no
 * submit action or pending/error state of its own — see `onChange` above.
 */
export function UnitPriceFixControl({
    item,
    valueCents,
    onChange,
}: UnitPriceFixControlProps): ReactElement {
    const id = useId();
    const { t } = useQuotesTranslation();
    const [text, setText] = useState(() => centsToDollarsText(valueCents));
    const label = item.quoteItemTemplateLabel
        ? t("readinessFixControls.unitPrice.labelWithTemplate", {
              template: item.quoteItemTemplateLabel,
          })
        : t("readinessFixControls.unitPrice.label");
    const isValid = DOLLARS_TEXT_PATTERN.test(text.trim());

    return (
        <Box direction="row" align="center" gap="xs" wrap>
            <Input
                id={id}
                label={label}
                type="text"
                inputMode="decimal"
                leadingAddon="$"
                value={text}
                invalid={!isValid}
                onChange={(event) => {
                    const nextText = event.target.value;
                    setText(nextText);
                    onChange(
                        DOLLARS_TEXT_PATTERN.test(nextText.trim())
                            ? dollarsTextToCents(nextText)
                            : undefined,
                    );
                }}
            />
        </Box>
    );
}
