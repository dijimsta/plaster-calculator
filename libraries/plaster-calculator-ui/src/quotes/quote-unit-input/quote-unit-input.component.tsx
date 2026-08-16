"use client";

import { Box, Input, SelectMenu } from "@libraries/uikit-web";
import type { ChangeEvent, ReactElement } from "react";
import { useEffect, useState } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

const PRESET_UNITS = ["m²", "m", "ea"] as const;
const OTHER_UNIT = "__OTHER__";

export type QuoteUnitInputProps = {
    readonly id: string;
    readonly value: string | null;
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly onChange: (value: string) => void;
    readonly onBlur?: () => void;
};

/** Preset quote units plus an explicit free-text "Other" value. */
export function QuoteUnitInput({
    id,
    value,
    disabled = false,
    required = false,
    onChange,
    onBlur,
}: QuoteUnitInputProps): ReactElement {
    const { t } = useQuotesTranslation();
    const resolvedValue = value ?? "";
    const [selection, setSelection] = useState(() =>
        presetSelection(resolvedValue),
    );

    useEffect(() => {
        if (resolvedValue) {
            setSelection(presetSelection(resolvedValue));
        } else if (selection !== OTHER_UNIT) {
            setSelection("");
        }
    }, [resolvedValue, selection]);

    return (
        <Box direction="column" gap="xs">
            <SelectMenu
                id={id}
                label={t("quoteUnitInput.label")}
                disabled={disabled}
                required={required}
                value={selection}
                options={[
                    { value: "", label: t("quoteUnitInput.selectUnit") },
                    { value: "m²", label: "m²" },
                    { value: "m", label: "m" },
                    { value: "ea", label: "ea" },
                    { value: OTHER_UNIT, label: t("quoteUnitInput.other") },
                ]}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const nextSelection = event.target.value;
                    setSelection(nextSelection);
                    onChange(nextSelection === OTHER_UNIT ? "" : nextSelection);
                }}
            />
            {selection === OTHER_UNIT && (
                <Input
                    id={`${id}-other`}
                    label={t("quoteUnitInput.otherLabel")}
                    value={resolvedValue}
                    disabled={disabled}
                    required={required}
                    onChange={(event) => onChange(event.target.value)}
                    onBlur={onBlur}
                />
            )}
        </Box>
    );
}

function presetSelection(value: string): string {
    if (!value) return "";
    return PRESET_UNITS.includes(value as (typeof PRESET_UNITS)[number])
        ? value
        : OTHER_UNIT;
}
