"use client";

import type {
    ReadinessAffectedItem,
    ReadinessCheck,
} from "@libraries/plaster-calculator-common";
import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    DEFAULT_WALL_BOARD_TYPE,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "@libraries/plaster-calculator-common";
import type { ReadinessCheckListRenderFixControl } from "@libraries/plaster-calculator-ui";
import {
    CeilingHeightFixControl,
    ConfirmFixControl,
    FloorplanDeepLinkFixControl,
    UnitPriceFixControl,
    useQuotesTranslation,
    WallBoardTypeFixControl,
} from "@libraries/plaster-calculator-ui";
import type { ReactNode } from "react";
import { useCallback } from "react";

import { FloorplanDeepLinkUtils } from "../floorplan-deep-link.utils.js";

/**
 * Builds the `renderFixControl` passed to `ReadinessCheckList`. This wires
 * up the WORK-134 inline fix controls so the gate panel is visually
 * complete, but every control's `onChange`/`onConfirm` below is a
 * local no-op — actual persistence (calling a mutation and then
 * `useQuoteReadiness().refresh()`) lands in WORK-140. The starting values
 * shown (e.g. `DEFAULT_WALL_BOARD_TYPE`, a blank ceiling height, zero
 * cents) are placeholders for the same reason: `ReadinessAffectedItem`
 * carries a check's *location*, not its current value, so there is nothing
 * real to seed these controls with until WORK-140 sources it from the
 * query response.
 *
 * `SCALE_APPLIED` and `ROOMS_MEASURED` are `DEEP_LINK` checks — their fix
 * is a link straight to the floorplan editor, on the flagged page, with
 * the relevant tool pre-selected (WORK-139), rather than a control that
 * submits a value here.
 */
export function useQuoteReadinessFixControlRenderer(
    projectId: string,
): ReadinessCheckListRenderFixControl {
    const { t } = useQuotesTranslation();

    return useCallback(
        (item: ReadinessAffectedItem, check: ReadinessCheck): ReactNode => {
            switch (check.id) {
                case SCALE_APPLIED_CHECK_ID:
                    return (
                        <FloorplanDeepLinkFixControl
                            item={item}
                            href={FloorplanDeepLinkUtils.buildHref(
                                projectId,
                                item.pageNumber,
                                "scale",
                            )}
                            actionLabel={t(
                                "readinessFixControls.floorplanDeepLink.setScale",
                            )}
                        />
                    );
                case ROOMS_MEASURED_CHECK_ID:
                    return (
                        <FloorplanDeepLinkFixControl
                            item={item}
                            href={FloorplanDeepLinkUtils.buildHref(
                                projectId,
                                item.pageNumber,
                                "draw-room",
                            )}
                            actionLabel={t(
                                "readinessFixControls.floorplanDeepLink.drawRooms",
                            )}
                        />
                    );
                case WALL_TYPE_SET_CHECK_ID:
                    return (
                        <WallBoardTypeFixControl
                            item={item}
                            value={DEFAULT_WALL_BOARD_TYPE}
                            // TODO(WORK-140): persist the selection and
                            // call useQuoteReadiness().refresh() instead of
                            // discarding it locally.
                            onChange={() => {}}
                        />
                    );
                case CEILING_HEIGHT_SET_CHECK_ID:
                    return (
                        <CeilingHeightFixControl
                            item={item}
                            value={null}
                            pageDefaultHeightMm={2400}
                            // TODO(WORK-140): persist and refresh.
                            onChange={() => {}}
                        />
                    );
                case TEMPLATE_PRICED_CHECK_ID:
                    return (
                        <UnitPriceFixControl
                            item={item}
                            valueCents={0}
                            // TODO(WORK-140): persist and refresh.
                            onChange={() => {}}
                        />
                    );
                case INFERRED_ANSWERS_CONFIRMED_CHECK_ID:
                    return (
                        <ConfirmFixControl
                            item={item}
                            label={t(
                                "readinessCheckList.checkLabels.INFERRED_ANSWERS_CONFIRMED",
                            )}
                            value={item.questionLabel ?? item.areaLabel ?? ""}
                            // TODO(WORK-140): persist and refresh.
                            onConfirm={() => {}}
                        />
                    );
                case ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID:
                    return (
                        <ConfirmFixControl
                            item={item}
                            label={t(
                                "readinessCheckList.checkLabels.ASSUMED_WALL_TYPES_CONFIRMED",
                            )}
                            value={DEFAULT_WALL_BOARD_TYPE}
                            // TODO(WORK-140): persist and refresh.
                            onConfirm={() => {}}
                        />
                    );
                default:
                    return null;
            }
        },
        [projectId, t],
    );
}
