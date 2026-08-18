import type {
    ReadinessAffectedItem,
    ReadinessCheckId,
} from "@libraries/plaster-calculator-common";
import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    COMPANY_CONTACT_DETAILS_CHECK_ID,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_HAS_ENABLED_ITEMS_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    TEMPLATE_UNIT_SET_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "@libraries/plaster-calculator-common";

import type { useQuotesTranslation } from "../i18n/index.ts";

type QuotesTFunction = ReturnType<typeof useQuotesTranslation>["t"];

/**
 * Looks up a check's translated row title by id, e.g.
 * `SCALE_APPLIED_CHECK_ID` -> "Scale applied". `ReadinessCheckId` is a
 * bare `string` (the registry has no literal-union id type), so this is
 * a `switch` over the known v1 check ids rather than a template-literal
 * translation key — the latter can't be typed against an arbitrary
 * `string`. A check id with no case here falls back to the raw id so a
 * future `READINESS_CHECKS` entry degrades to something readable rather
 * than crashing before its translation key is added.
 */
export function checkTitle(
    checkId: ReadinessCheckId,
    t: QuotesTFunction,
): string {
    switch (checkId) {
        case SCALE_APPLIED_CHECK_ID:
            return t("readinessCheckList.checkLabels.SCALE_APPLIED");
        case ROOMS_MEASURED_CHECK_ID:
            return t("readinessCheckList.checkLabels.ROOMS_MEASURED");
        case WALL_TYPE_SET_CHECK_ID:
            return t("readinessCheckList.checkLabels.WALL_TYPE_SET");
        case CEILING_HEIGHT_SET_CHECK_ID:
            return t("readinessCheckList.checkLabels.CEILING_HEIGHT_SET");
        case TEMPLATE_HAS_ENABLED_ITEMS_CHECK_ID:
            return t(
                "readinessCheckList.checkLabels.TEMPLATE_HAS_ENABLED_ITEMS",
            );
        case TEMPLATE_PRICED_CHECK_ID:
            return t("readinessCheckList.checkLabels.TEMPLATE_PRICED");
        case TEMPLATE_UNIT_SET_CHECK_ID:
            return t("readinessCheckList.checkLabels.TEMPLATE_UNIT_SET");
        case INFERRED_ANSWERS_CONFIRMED_CHECK_ID:
            return t(
                "readinessCheckList.checkLabels.INFERRED_ANSWERS_CONFIRMED",
            );
        case ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID:
            return t(
                "readinessCheckList.checkLabels.ASSUMED_WALL_TYPES_CONFIRMED",
            );
        case COMPANY_CONTACT_DETAILS_CHECK_ID:
            return t("readinessCheckList.checkLabels.COMPANY_CONTACT_DETAILS");
        default:
            return checkId;
    }
}

/**
 * Names an affected item's location in human-readable terms, e.g.
 * `"Page 2 — Living Room"`, never a raw id. Falls back through the
 * entity types a `ReadinessAffectedItem` can describe — page/room,
 * quote item template, questionnaire question, company — and finally
 * to a translated generic label for a check with no location to
 * report.
 */
export function affectedItemLocation(
    item: ReadinessAffectedItem,
    t: QuotesTFunction,
): string {
    if (item.pageNumber != null) {
        return item.areaLabel
            ? t("readinessCheckList.pageLocationWithArea", {
                  pageNumber: item.pageNumber,
                  areaLabel: item.areaLabel,
              })
            : t("readinessCheckList.pageLocation", {
                  pageNumber: item.pageNumber,
              });
    }
    if (item.quoteItemTemplateLabel) return item.quoteItemTemplateLabel;
    if (item.questionLabel) return item.questionLabel;
    if (item.companyName) {
        return t("readinessCheckList.companyLocation", {
            companyName: item.companyName,
        });
    }
    return t("readinessCheckList.defaultAffectedItemLocation");
}

/**
 * A stable React key for an affected item, built from whichever ids are
 * present rather than array index, so re-ordering or re-fetching
 * `results` doesn't remount a row unnecessarily. Falls back to `index`
 * only for a check whose result carries no identifying ids at all.
 */
export function affectedItemKey(
    item: ReadinessAffectedItem,
    index: number,
): string {
    const idParts = [
        item.pageId,
        item.areaId,
        item.quoteItemTemplateId,
        item.questionId,
        item.companyId,
    ].filter((part): part is string => part != null);
    return idParts.length > 0 ? idParts.join(":") : `item-${index}`;
}
