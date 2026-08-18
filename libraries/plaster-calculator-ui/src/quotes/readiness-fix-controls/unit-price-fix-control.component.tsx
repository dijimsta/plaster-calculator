import type { ReadinessAffectedItem } from "@libraries/plaster-calculator-common";
import { Badge, Box, Button, Input } from "@libraries/uikit-web";
import { centsToDollarsText, dollarsTextToCents } from "@libraries/utilities";
import { useId, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { useFixControlSubmission } from "./use-fix-control-submission.hook.ts";

const DOLLARS_TEXT_PATTERN = /^\d+(\.\d{1,2})?$/;

export type UnitPriceFixControlProps = {
    /** The affected `QuoteItemTemplateConfig` this input scopes its edit to. */
    readonly item: ReadinessAffectedItem;
    /** This template's current/proposed unit price in cents, always shown
     * formatted as dollars rather than left blank. */
    readonly valueCents: number;
    readonly onChange: (unitPriceCents: number) => void | Promise<void>;
};

/**
 * Inline fix control for the "template priced" readiness check: a cents
 * input, scoped to one `QuoteItemTemplateConfig` via `item`. Displays and
 * edits the price as dollars (matching `QuoteTemplateFormPriceInput`'s
 * convention elsewhere in this package) but, unlike that form field, commits
 * via an explicit Save action rather than on every keystroke — this
 * control's `onChange` can reject, and a keystroke-driven submit would fire
 * a write attempt (and a pending/error state) on every character typed.
 * Owns only its own pending/error state via `useFixControlSubmission`, so a
 * rejected `onChange` here never touches a sibling control's state.
 */
export function UnitPriceFixControl({
    item,
    valueCents,
    onChange,
}: UnitPriceFixControlProps): ReactElement {
    const id = useId();
    const { t } = useQuotesTranslation();
    const [text, setText] = useState(() => centsToDollarsText(valueCents));
    const { isPending, error, run } = useFixControlSubmission(
        t("readinessFixControls.unitPrice.error"),
    );
    const label = item.quoteItemTemplateLabel
        ? t("readinessFixControls.unitPrice.labelWithTemplate", {
              template: item.quoteItemTemplateLabel,
          })
        : t("readinessFixControls.unitPrice.label");
    const isValid = DOLLARS_TEXT_PATTERN.test(text.trim());

    return (
        <Box direction="column" gap="xs">
            <Box direction="row" align="center" gap="xs" wrap>
                <Input
                    id={id}
                    label={label}
                    type="text"
                    inputMode="decimal"
                    leadingAddon="$"
                    value={text}
                    disabled={isPending}
                    invalid={!isValid}
                    onChange={(event) => setText(event.target.value)}
                />
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    disabled={isPending || !isValid}
                    onClick={() =>
                        void run(() => onChange(dollarsTextToCents(text)))
                    }
                >
                    {isPending
                        ? t("readinessFixControls.saving")
                        : t("readinessFixControls.save")}
                </Button>
            </Box>
            {error && (
                <Box status>
                    <Badge color="red" size="sm">
                        {error}
                    </Badge>
                </Box>
            )}
        </Box>
    );
}
