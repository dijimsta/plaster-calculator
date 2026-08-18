import type { ReadinessResult } from "@libraries/plaster-calculator-common";
import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    READINESS_CHECKS,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_HAS_ENABLED_ITEMS_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "@libraries/plaster-calculator-common";

/**
 * Every check reported as met, with no affected items — the baseline every
 * scenario below starts from and overrides the checks it wants unmet. Also
 * used directly by the "Ready" story.
 */
export const ALL_CHECKS_MET_RESULTS: readonly ReadinessResult[] =
    READINESS_CHECKS.map((check) => ({
        checkId: check.id,
        isMet: true,
        affectedItemCount: 0,
        affectedItems: [],
    }));

/** All eight checks unmet, one affected item each. */
export const FULLY_BLOCKED_RESULTS: readonly ReadinessResult[] = [
    {
        checkId: SCALE_APPLIED_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [{ pageId: "page-1", pageNumber: 1 }],
    },
    {
        checkId: ROOMS_MEASURED_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [{ pageId: "page-2", pageNumber: 2 }],
    },
    {
        checkId: WALL_TYPE_SET_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [
            {
                pageId: "page-1",
                pageNumber: 1,
                areaId: "area-lounge",
                areaLabel: "Lounge",
            },
        ],
    },
    {
        checkId: CEILING_HEIGHT_SET_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [
            {
                pageId: "page-1",
                pageNumber: 1,
                areaId: "area-kitchen",
                areaLabel: "Kitchen",
            },
        ],
    },
    {
        checkId: TEMPLATE_HAS_ENABLED_ITEMS_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [{}],
    },
    {
        checkId: TEMPLATE_PRICED_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [
            {
                quoteItemTemplateId: "tpl-cove-cornice",
                quoteItemTemplateLabel: "90mm cove cornice",
            },
        ],
    },
    {
        checkId: INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [
            {
                questionId: "q-ceiling-area",
                questionLabel:
                    "What is the total ceiling area to be plastered?",
            },
        ],
    },
    {
        checkId: ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
        isMet: false,
        affectedItemCount: 1,
        affectedItems: [
            {
                pageId: "page-2",
                pageNumber: 2,
                areaId: "area-bedroom-2",
                areaLabel: "Bedroom 2",
            },
        ],
    },
];

/** Six checks met, only "template priced" unmet. */
export const ONE_CHECK_UNMET_RESULTS: readonly ReadinessResult[] =
    ALL_CHECKS_MET_RESULTS.map((result) =>
        result.checkId === TEMPLATE_PRICED_CHECK_ID
            ? {
                  checkId: TEMPLATE_PRICED_CHECK_ID,
                  isMet: false,
                  affectedItemCount: 1,
                  affectedItems: [
                      {
                          quoteItemTemplateId: "tpl-ezy-jamb-door-sets",
                          quoteItemTemplateLabel: "Ezy jamb door sets",
                      },
                  ],
              }
            : result,
    );

/**
 * Only "scale applied" unmet, and only for page 2 — page 1 already has a
 * scale applied, so it never appears in affectedItems. Mirrors the real
 * per-page rollup behaviour the scale-applied resolver implements
 * (WORK-129), even though this is stub data rather than a resolved result.
 */
export const MULTI_PAGE_ONLY_PAGE_TWO_UNSCALED_RESULTS: readonly ReadinessResult[] =
    ALL_CHECKS_MET_RESULTS.map((result) =>
        result.checkId === SCALE_APPLIED_CHECK_ID
            ? {
                  checkId: SCALE_APPLIED_CHECK_ID,
                  isMet: false,
                  affectedItemCount: 1,
                  affectedItems: [{ pageId: "page-2", pageNumber: 2 }],
              }
            : result,
    );

/** Only "wall type set" unmet, across four rooms on two pages. */
export const CHECK_AFFECTING_SEVERAL_ROOMS_RESULTS: readonly ReadinessResult[] =
    ALL_CHECKS_MET_RESULTS.map((result) =>
        result.checkId === WALL_TYPE_SET_CHECK_ID
            ? {
                  checkId: WALL_TYPE_SET_CHECK_ID,
                  isMet: false,
                  affectedItemCount: 4,
                  affectedItems: [
                      {
                          pageId: "page-1",
                          pageNumber: 1,
                          areaId: "area-lounge",
                          areaLabel: "Lounge",
                      },
                      {
                          pageId: "page-1",
                          pageNumber: 1,
                          areaId: "area-kitchen",
                          areaLabel: "Kitchen",
                      },
                      {
                          pageId: "page-2",
                          pageNumber: 2,
                          areaId: "area-bedroom-1",
                          areaLabel: "Bedroom 1",
                      },
                      {
                          pageId: "page-2",
                          pageNumber: 2,
                          areaId: "area-bedroom-2",
                          areaLabel: "Bedroom 2",
                      },
                  ],
              }
            : result,
    );
