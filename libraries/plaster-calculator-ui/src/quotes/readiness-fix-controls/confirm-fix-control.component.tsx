import type { ReadinessAffectedItem } from "@libraries/plaster-calculator-common";
import { Badge, Box, Button, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { useFixControlSubmission } from "./use-fix-control-submission.hook.ts";

export type ConfirmFixControlProps = {
    /** The affected question or area this confirmation applies to. */
    readonly item: ReadinessAffectedItem;
    /** Short noun phrase naming what's being confirmed, e.g. "Inferred
     * answer" or "Assumed wall type". */
    readonly label: string;
    /**
     * The value being accepted. Always rendered alongside the action —
     * confirming blind is worse than not confirming, so this control never
     * renders its button without this next to it.
     */
    readonly value: string;
    readonly onConfirm: () => void | Promise<void>;
};

/**
 * Inline fix control for the two confirmation readiness checks (inferred
 * questionnaire answers, assumed wall types): a single action that accepts
 * whatever value `label`/`value` display. The affected-item row above this
 * control already names the location visually, so `item` is used only to
 * give the confirm button a fuller accessible name for a screen-reader user
 * tabbing directly to it. Owns only its own pending/error state via
 * `useFixControlSubmission`, so a rejected `onConfirm` here never touches a
 * sibling control's state.
 */
export function ConfirmFixControl({
    item,
    label,
    value,
    onConfirm,
}: ConfirmFixControlProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { isPending, error, run } = useFixControlSubmission(
        t("readinessFixControls.confirmError"),
    );
    const location = item.questionLabel ?? item.areaLabel;
    const accessibleLabel = location
        ? t("readinessFixControls.confirmAccessibleLabelWithLocation", {
              label,
              value,
              location,
          })
        : t("readinessFixControls.confirmAccessibleLabel", { label, value });

    return (
        <Box direction="column" gap="xs">
            <Box direction="row" align="center" gap="xs" wrap>
                <Text size="sm" variant="muted">
                    {label}:
                </Text>
                <Badge color="blue" size="sm">
                    {value}
                </Badge>
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    label={accessibleLabel}
                    disabled={isPending}
                    onClick={() => void run(() => onConfirm())}
                >
                    {isPending
                        ? t("readinessFixControls.confirming")
                        : t("readinessFixControls.confirm")}
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
