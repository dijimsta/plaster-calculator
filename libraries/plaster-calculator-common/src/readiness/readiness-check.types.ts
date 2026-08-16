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
 * A quote item template's per-team pricing configuration, as needed by the
 * "template priced" readiness check. This package has no dependency on the
 * generated Data Connect SDK, so this is a minimal local shape rather than
 * `QuoteItemTemplateConfig` from `generated/data-connector-*` — callers are
 * responsible for mapping their Data Connect query results onto it.
 * `quantitySourceId` is the id of the `QuoteItemTemplate` this config prices;
 * `null` for a template with no wired automatic quantity source (e.g. a
 * purely manual/custom line item). `label` is the template's display name
 * (e.g. `QuoteItemTemplate.name`), carried alongside the id so a resolver
 * can populate `ReadinessAffectedItem.quoteItemTemplateLabel` without a
 * separate lookup.
 */
export type ReadinessQuoteItemTemplateConfig = {
    readonly quoteItemTemplateId: string;
    readonly label: string;
    readonly enabled: boolean;
    readonly unitPriceCents: number;
    readonly unit: string | null;
    readonly quantitySourceId: string | null;
};

/**
 * A single questionnaire question's answer state, as needed by the
 * "inferred answers confirmed" readiness check. See the note on
 * `ReadinessQuoteItemTemplateConfig` about why this isn't
 * `ProjectQuestionnaireQuestion` from the generated SDK. `label` is the
 * question's display text, carried alongside the id so the resolver can
 * populate `ReadinessAffectedItem.questionLabel` without a separate lookup.
 */
export type ReadinessQuestionnaireAnswer = {
    readonly questionId: string;
    readonly label: string;
    readonly answer: string | null;
    readonly answerSource: string;
};

/**
 * Data a `ReadinessCheck` resolver needs to evaluate whether a project is
 * ready to be quoted. `quoteItemTemplateConfigs` and `questionnaireAnswers`
 * were added by WORK-129 alongside the concrete resolvers that need them;
 * this shape can keep growing the same way as future checks need more data,
 * without changing the registry or its consumers.
 */
export type ReadinessCheckInput = {
    readonly project: ProjectDetail;
    readonly quoteItemTemplateConfigs?: readonly ReadinessQuoteItemTemplateConfig[];
    readonly questionnaireAnswers?: readonly ReadinessQuestionnaireAnswer[];
};

/**
 * One item affected by an unmet `ReadinessCheck` — e.g. one room missing a
 * wall type, or one unpriced quote item template. Every field is optional
 * because different checks affect different entity types; a resolver
 * populates whichever fields identify the item and, wherever possible, name
 * it in human-readable terms (a page number and room label, not raw ids) so
 * a UI can render it without a separate lookup.
 */
export type ReadinessAffectedItem = {
    readonly pageId?: string;
    readonly pageNumber?: number;
    readonly areaId?: string;
    readonly areaLabel?: string;
    readonly quoteItemTemplateId?: string;
    readonly quoteItemTemplateLabel?: string;
    readonly questionId?: string;
    readonly questionLabel?: string;
};

/**
 * The outcome of running a single `ReadinessCheck` resolver against a
 * project. `affectedItems` holds one `ReadinessAffectedItem` per item the
 * check found unmet, in the same order counted by `affectedItemCount` (so
 * `affectedItems.length === affectedItemCount` whenever `isMet` is
 * `false`) — a check can affect several rooms or pages at once (e.g. four
 * rooms missing a wall type), and a UI needs all of them, not just the
 * first, to let a row expand into per-item fixes. `affectedItems` is empty
 * when `isMet` is `true`.
 */
export type ReadinessResult = {
    readonly checkId: ReadinessCheckId;
    readonly isMet: boolean;
    readonly affectedItemCount: number;
    readonly affectedItems: readonly ReadinessAffectedItem[];
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
