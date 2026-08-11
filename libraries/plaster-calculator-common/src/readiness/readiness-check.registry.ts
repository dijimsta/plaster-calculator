import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    resolveAssumedWallTypesConfirmed,
    resolveCeilingHeightSet,
    resolveInferredAnswersConfirmed,
    resolveRoomsMeasured,
    resolveScaleApplied,
    resolveTemplatePriced,
    resolveWallTypeSet,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "./checks/index.ts";
import type { ReadinessCheck } from "./readiness-check.types.ts";

/**
 * The quote readiness gate, in the order the UI renders it. Each entry is a
 * self-contained `ReadinessCheck`; adding a check means appending one entry
 * here (with its resolver) — no change to the code that consumes the
 * registry.
 *
 * Every v1 check (WORK-129) is `severity: "BLOCK"` per the ticket. `fixMode`
 * reflects where each check's fix control sends the user: the two
 * floorplan-editor checks (scale applied, rooms measured) deep-link to the
 * floorplan editor, where WORK-139 builds their fix targets; the remaining
 * checks are inline because their fix controls (WORK-134) act directly in
 * the gate, with no separate screen to navigate to.
 */
export const READINESS_CHECKS: readonly ReadinessCheck[] = [
    {
        id: SCALE_APPLIED_CHECK_ID,
        severity: "BLOCK",
        fixMode: "DEEP_LINK",
        resolve: resolveScaleApplied,
    },
    {
        id: ROOMS_MEASURED_CHECK_ID,
        severity: "BLOCK",
        fixMode: "DEEP_LINK",
        resolve: resolveRoomsMeasured,
    },
    {
        id: WALL_TYPE_SET_CHECK_ID,
        severity: "BLOCK",
        fixMode: "INLINE",
        resolve: resolveWallTypeSet,
    },
    {
        id: CEILING_HEIGHT_SET_CHECK_ID,
        severity: "BLOCK",
        fixMode: "INLINE",
        resolve: resolveCeilingHeightSet,
    },
    {
        id: TEMPLATE_PRICED_CHECK_ID,
        severity: "BLOCK",
        fixMode: "INLINE",
        resolve: resolveTemplatePriced,
    },
    {
        id: INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
        severity: "BLOCK",
        fixMode: "INLINE",
        resolve: resolveInferredAnswersConfirmed,
    },
    {
        id: ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
        severity: "BLOCK",
        fixMode: "INLINE",
        resolve: resolveAssumedWallTypesConfirmed,
    },
];
