import type { ReadinessAffectedItem } from "@libraries/plaster-calculator-common";
import { ButtonLink } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type FloorplanDeepLinkFixControlProps = {
    /** The affected page this link targets. `href` is already scoped to
     * `item.pageNumber` by the caller — this is used only to build a fuller
     * accessible name below. */
    readonly item: ReadinessAffectedItem;
    /**
     * The floorplan URL to navigate to, already carrying the page and tool
     * query params (built by the app layer, which owns the route shape).
     * `null` when the affected item has no `pageNumber` to link to — this
     * check's affected items always should, but a resolver bug shouldn't
     * turn into a broken link, so this renders nothing instead.
     */
    readonly href: string | null;
    /** Short verb phrase naming the tool this link opens, e.g. "Set scale"
     * or "Draw rooms". */
    readonly actionLabel: string;
};

/**
 * Inline fix control for the two `DEEP_LINK` readiness checks
 * (`SCALE_APPLIED`, `ROOMS_MEASURED`): a link straight to the floorplan
 * editor, on the exact page the check flagged, with the relevant tool
 * pre-selected — never a generic "go to Floorplan". Unlike the other fix
 * controls here, there is nothing to submit: the "fix" happens in the
 * floorplan editor, and returning to this tab re-evaluates readiness on its
 * own (`useQuoteReadiness` refetches on remount), so this control owns no
 * pending/error state.
 */
export function FloorplanDeepLinkFixControl({
    item,
    href,
    actionLabel,
}: FloorplanDeepLinkFixControlProps): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (!href) return null;

    const accessibleLabel =
        item.pageNumber != null
            ? t("readinessFixControls.floorplanDeepLink.actionWithPage", {
                  action: actionLabel,
                  pageNumber: item.pageNumber,
              })
            : actionLabel;

    return (
        <ButtonLink
            href={href}
            variant="secondary"
            size="small"
            label={accessibleLabel}
        >
            {actionLabel}
        </ButtonLink>
    );
}
