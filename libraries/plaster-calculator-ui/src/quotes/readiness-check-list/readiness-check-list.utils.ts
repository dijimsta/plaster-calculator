import type {
    ReadinessAffectedItem,
    ReadinessCheckId,
} from "@libraries/plaster-calculator-common";

/**
 * Presentation helpers for `ReadinessCheckList`. Kept as static methods
 * rather than module-level functions so the component file only imports one
 * name.
 */
export class ReadinessCheckListUtils {
    /**
     * Derives a human-readable row title from a check id, e.g.
     * `"WALL_TYPE_SET"` -> `"Wall type set"`. The registry has no separate
     * title field, and deriving one this way means a new `READINESS_CHECKS`
     * entry gets a reasonable title with no change to this component.
     */
    public static checkTitle(checkId: ReadinessCheckId): string {
        return checkId
            .toLowerCase()
            .split("_")
            .filter((word) => word.length > 0)
            .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(" ");
    }

    /**
     * Names an affected item's location in human-readable terms, e.g.
     * `"Page 2 — Living Room"`, never a raw id. Falls back through the
     * entity types a `ReadinessAffectedItem` can describe — page/room,
     * quote item template, questionnaire question — and finally to a
     * generic label for a check with no location to report.
     */
    public static affectedItemLocation(item: ReadinessAffectedItem): string {
        if (item.pageNumber != null) {
            return item.areaLabel
                ? `Page ${item.pageNumber} — ${item.areaLabel}`
                : `Page ${item.pageNumber}`;
        }
        if (item.quoteItemTemplateLabel) return item.quoteItemTemplateLabel;
        if (item.questionLabel) return item.questionLabel;
        return "This project";
    }

    /**
     * A stable React key for an affected item, built from whichever ids are
     * present rather than array index, so re-ordering or re-fetching
     * `results` doesn't remount a row unnecessarily. Falls back to `index`
     * only for a check whose result carries no identifying ids at all.
     */
    public static affectedItemKey(
        item: ReadinessAffectedItem,
        index: number,
    ): string {
        const idParts = [
            item.pageId,
            item.areaId,
            item.quoteItemTemplateId,
            item.questionId,
        ].filter((part): part is string => part != null);
        return idParts.length > 0 ? idParts.join(":") : `item-${index}`;
    }
}
