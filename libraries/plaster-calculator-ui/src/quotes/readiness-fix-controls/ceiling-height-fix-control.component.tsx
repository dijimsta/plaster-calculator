import type { ReadinessAffectedItem } from "@libraries/plaster-calculator-common";
import { Badge, Box, Button, Input } from "@libraries/uikit-web";
import { useId, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { useFixControlSubmission } from "./use-fix-control-submission.hook.ts";

export type CeilingHeightFixControlProps = {
    /** The affected room/area this input scopes its edit to. */
    readonly item: ReadinessAffectedItem;
    /**
     * This area's own ceiling height override in mm, or `null` if the area
     * has none set yet — in which case `pageDefaultHeightMm` is shown as the
     * starting value rather than leaving the field blank.
     */
    readonly value: number | null;
    /** The page-level ceiling height in mm, offered as this area's default. */
    readonly pageDefaultHeightMm: number;
    readonly onChange: (heightMm: number) => void | Promise<void>;
};

/**
 * Inline fix control for the "ceiling height set" readiness check: a number
 * input in mm, scoped to one room/area via `item`. Unlike the select-based
 * controls, a number field needs an explicit commit step — firing
 * `onChange` on every keystroke would submit a half-typed value — so this
 * renders its own compact Save action rather than committing on change.
 * Owns only its own pending/error state via `useFixControlSubmission`, so a
 * rejected `onChange` here never touches a sibling control's state.
 */
export function CeilingHeightFixControl({
    item,
    value,
    pageDefaultHeightMm,
    onChange,
}: CeilingHeightFixControlProps): ReactElement {
    const id = useId();
    const { t } = useQuotesTranslation();
    const [text, setText] = useState(() =>
        String(value ?? pageDefaultHeightMm),
    );
    const { isPending, error, run } = useFixControlSubmission(
        t("readinessFixControls.ceilingHeight.error"),
    );
    const label = item.areaLabel
        ? t("readinessFixControls.ceilingHeight.labelWithArea", {
              area: item.areaLabel,
          })
        : t("readinessFixControls.ceilingHeight.label");
    const parsedHeightMm = Number.parseInt(text, 10);
    const isValid = Number.isInteger(parsedHeightMm) && parsedHeightMm > 0;

    return (
        <Box direction="column" gap="xs">
            <Box direction="row" align="center" gap="xs" wrap>
                <Input
                    id={id}
                    label={label}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    trailingAddon="mm"
                    value={text}
                    disabled={isPending}
                    invalid={!isValid}
                    placeholder={String(pageDefaultHeightMm)}
                    onChange={(event) => setText(event.target.value)}
                />
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    disabled={isPending || !isValid}
                    onClick={() => void run(() => onChange(parsedHeightMm))}
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
