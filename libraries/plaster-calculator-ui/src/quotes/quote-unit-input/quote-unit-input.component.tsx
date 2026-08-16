"use client";

import {
    DAY_QUOTE_UNIT,
    EACH_QUOTE_UNIT,
    HOUR_QUOTE_UNIT,
    ITEM_QUOTE_UNIT,
    LINEAR_METRE_QUOTE_UNIT,
    QuoteUnitSchema,
    SQUARE_METRE_QUOTE_UNIT,
} from "@libraries/plaster-calculator-common";
import { SelectMenu } from "@libraries/uikit-web";
import type { ChangeEvent, ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

// The fixed vocabulary, read from `QuoteUnitSchema` (`plaster-calculator-common`)
// rather than redefined here -- see that schema's doc comment.
const QUOTE_UNITS = [
    SQUARE_METRE_QUOTE_UNIT,
    LINEAR_METRE_QUOTE_UNIT,
    EACH_QUOTE_UNIT,
    ITEM_QUOTE_UNIT,
    HOUR_QUOTE_UNIT,
    DAY_QUOTE_UNIT,
] as const;

export type QuoteUnitInputProps = {
    readonly id: string;
    readonly value: string | null;
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly onChange: (value: string) => void;
};

/**
 * The fixed `QuoteUnitSchema` unit picker. Replaces the old m²/m/ea presets
 * plus free-text "Other" escape hatch: `QuoteItemTemplate.unit` is now a
 * closed vocabulary end to end (schema -> connector -> this input), so
 * there is nothing left for free text to do.
 *
 * A stored value outside the six-unit list (data written before this
 * vocabulary closed) is appended as an extra, selectable option rather than
 * being silently snapped to one of the six or blanked out -- losing or
 * mutating a team's existing data on an unrelated render is worse than
 * showing one non-standard option alongside the standard six. Picking any
 * other option replaces it, same as picking any other option ever does.
 */
export function QuoteUnitInput({
    id,
    value,
    disabled = false,
    required = false,
    onChange,
}: QuoteUnitInputProps): ReactElement {
    const { t } = useQuotesTranslation();
    const resolvedValue = value ?? "";
    const isRecognizedUnit =
        resolvedValue === "" ||
        QuoteUnitSchema.safeParse(resolvedValue).success;

    return (
        <SelectMenu
            id={id}
            label={t("quoteUnitInput.label")}
            disabled={disabled}
            required={required}
            value={resolvedValue}
            options={[
                { value: "", label: t("quoteUnitInput.selectUnit") },
                ...QUOTE_UNITS.map((unit) => ({ value: unit, label: unit })),
                ...(isRecognizedUnit
                    ? []
                    : [
                          {
                              value: resolvedValue,
                              label: t("quoteUnitInput.unrecognizedUnit", {
                                  unit: resolvedValue,
                              }),
                          },
                      ]),
            ]}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                onChange(event.target.value)
            }
        />
    );
}
