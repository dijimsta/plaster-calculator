import { Badge, Box, Button } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { useFixControlSubmission } from "./use-fix-control-submission.hook.ts";

export type UnitPriceBatchSaveControlProps = {
    /** How many `UnitPriceFixControl` inputs this action will submit — shown
     * in the button label so "Save all prices" reads as one action covering
     * every currently-visible price, not just the one the user last typed
     * in. */
    readonly itemCount: number;
    /** True while any sibling `UnitPriceFixControl` currently holds
     * unparseable text — saving with a draft missing is worse than leaving
     * the action disabled until every visible input is a valid price. */
    readonly disabled?: boolean;
    readonly onSaveAll: () => Promise<void>;
};

/**
 * The "template priced" check's `renderCheckFooter`: one Save action for
 * every affected item's `UnitPriceFixControl`, replacing what used to be a
 * separate Save button (and separate readiness re-fetch) per item. Owns the
 * only pending/error state left in this check's fix controls, via
 * `useFixControlSubmission` — the per-item inputs are now plain controlled
 * inputs with no submission state of their own.
 */
export function UnitPriceBatchSaveControl({
    itemCount,
    disabled = false,
    onSaveAll,
}: UnitPriceBatchSaveControlProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { isPending, error, run } = useFixControlSubmission(
        t("readinessFixControls.unitPrice.error"),
    );

    return (
        <Box direction="column" gap="xs">
            <Box direction="row" justify="end">
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    disabled={disabled || isPending}
                    onClick={() => void run(onSaveAll)}
                >
                    {isPending
                        ? t("readinessFixControls.saving")
                        : t("readinessFixControls.unitPrice.saveAll", {
                              count: itemCount,
                          })}
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
