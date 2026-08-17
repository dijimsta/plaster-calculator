import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    COMPANY_CONTACT_DETAILS_CHECK_ID,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    resolveAssumedWallTypesConfirmed,
    resolveCeilingHeightSet,
    resolveCompanyContactDetails,
    resolveInferredAnswersConfirmed,
    resolveRoomsMeasured,
    resolveScaleApplied,
    resolveTemplatePriced,
    resolveTemplateUnitSet,
    resolveWallTypeSet,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    TEMPLATE_UNIT_SET_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "./checks/index.ts";
import type { ReadinessCheck } from "./readiness-check.types.ts";

/**
 * The quote readiness gate, in the order the UI renders it. Each entry is a
 * self-contained `ReadinessCheck`; adding a check means appending one entry
 * here (with its resolver) — no change to the code that consumes the
 * registry.
 *
 * Every check through WORK-129 is `severity: "BLOCK"` per that ticket;
 * `COMPANY_CONTACT_DETAILS` (WORK-221) is `WARN` — the project can still be
 * priced while it's unmet, so it nudges rather than blocks. `fixMode`
 * reflects where each check's fix control sends the user: the two
 * floorplan-editor checks (scale applied, rooms measured) deep-link to the
 * floorplan editor, where WORK-139 builds their fix targets; most of the
 * remaining checks are inline because their fix controls (WORK-134) act
 * directly in the gate, with no separate screen to navigate to.
 * `COMPANY_CONTACT_DETAILS` also deep-links, to wherever the company's
 * contact details get edited (WORK-223).
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
        id: TEMPLATE_UNIT_SET_CHECK_ID,
        severity: "BLOCK",
        fixMode: "DEEP_LINK",
        resolve: resolveTemplateUnitSet,
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
    {
        id: COMPANY_CONTACT_DETAILS_CHECK_ID,
        severity: "WARN",
        fixMode: "DEEP_LINK",
        resolve: resolveCompanyContactDetails,
    },
];
