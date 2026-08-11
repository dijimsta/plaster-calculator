import type { ProjectDetail } from "../projects/schemas/project-detail.schema.ts";

/**
 * How urgently a failed `ReadinessCheck` should block quoting:
 * - `BLOCK`: the project cannot be priced until the check is met.
 * - `WARN`: the project can still be priced, but the user should be nudged.
 *
 * Every v1 check is `BLOCK`; `WARN` exists so the first warning-level check
 * can be added without a type change.
 */
export const READINESS_CHECK_SEVERITIES = ["BLOCK", "WARN"] as const;
export type ReadinessCheckSeverity =
    (typeof READINESS_CHECK_SEVERITIES)[number];

/**
 * How a failed `ReadinessCheck` can be resolved from the UI:
 * - `INLINE`: fixed directly within the readiness gate.
 * - `DEEP_LINK`: fixed by navigating elsewhere, e.g. to a floorplan page or
 *   a quote template.
 */
export const READINESS_CHECK_FIX_MODES = ["INLINE", "DEEP_LINK"] as const;
export type ReadinessCheckFixMode = (typeof READINESS_CHECK_FIX_MODES)[number];

/** Stable identifier for a `ReadinessCheck`, e.g. `"WALL_BOARD_TYPE"`. */
export type ReadinessCheckId = string;

/**
 * Data a `ReadinessCheck` resolver needs to evaluate whether a project is
 * ready to be quoted. Deliberately minimal for now: WORK-129 implements the
 * concrete resolvers and can extend this shape as each check's data needs
 * become concrete, without changing the registry or its consumers.
 */
export type ReadinessCheckInput = {
    readonly project: ProjectDetail;
};

/**
 * The outcome of running a single `ReadinessCheck` resolver against a
 * project. `pageId`, `areaId`, and `quoteItemTemplateId` are optional
 * because different checks affect different entity types; a resolver
 * populates whichever field identifies the item its fix control should
 * target.
 */
export type ReadinessResult = {
    readonly checkId: ReadinessCheckId;
    readonly isMet: boolean;
    readonly affectedItemCount: number;
    readonly pageId?: string;
    readonly areaId?: string;
    readonly quoteItemTemplateId?: string;
};

/** Evaluates a `ReadinessCheck` against a project's readiness-gate input. */
export type ReadinessCheckResolver = (
    input: ReadinessCheckInput,
) => ReadinessResult;

/**
 * Describes one check in the quote readiness gate. Implementing a new check
 * is one `ReadinessCheck` entry in the registry plus its `resolve`
 * function — no change to the code that renders the registry.
 */
export type ReadinessCheck = {
    readonly id: ReadinessCheckId;
    readonly severity: ReadinessCheckSeverity;
    readonly fixMode: ReadinessCheckFixMode;
    readonly resolve: ReadinessCheckResolver;
};
