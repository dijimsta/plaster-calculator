"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type {
    AreaPolygon,
    ReadinessAffectedItem,
    ReadinessCheck,
} from "@libraries/plaster-calculator-common";
import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    MANUAL_ANSWER_SOURCE,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    TEMPLATE_UNIT_SET_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "@libraries/plaster-calculator-common";
import type { ReadinessCheckListRenderFixControl } from "@libraries/plaster-calculator-ui";
import {
    CeilingHeightFixControl,
    ConfirmFixControl,
    FloorplanDeepLinkFixControl,
    parseOverlay,
    QuoteTemplateDeepLinkFixControl,
    UnitPriceFixControl,
    useActiveQuoteTemplate,
    useQuotesTranslation,
    WallBoardTypeFixControl,
} from "@libraries/plaster-calculator-ui";
import {
    FirebaseService,
    useProjectsService,
    useQuoteReadiness,
} from "@libraries/plaster-calculator-web-core";
import { QueryFetchPolicy } from "firebase/data-connect";
import type { ReactNode } from "react";
import { useCallback } from "react";

import { FloorplanDeepLinkUtils } from "../floorplan-deep-link.utils.js";

import { QuoteReadinessFixUtils } from "./quote-readiness-fix.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/**
 * Fetches one area (`patch`'s target) from the *latest* copy of its page —
 * not from whatever `GetQuoteReadiness` had cached — patches just that one
 * area, and saves the result back through `ProjectsService.savePageOverlay`,
 * the exact same call the floorplan editor's `useEditorPersistence.save()`
 * makes. `FloorplanPage.overlayJson` has no area-scoped mutation or
 * server-side merge (confirmed by reading `updateFloorplanPage` in
 * `functions/plaster-calculator-functions/src/floorplan-pages.ts`, which
 * replaces the whole JSON blob whenever `overlay` is present in the
 * request) — the safety here comes entirely from re-reading the page
 * immediately before this specific write and only ever changing the one
 * area this control owns (`QuoteReadinessFixUtils.patchArea`). A fix to
 * room A and a fix to room B each start from a fresh read and only touch
 * their own area, so neither clobbers the other's change; every other
 * overlay field, and every other area, passes through untouched.
 */
function useUpdateAreaOverlayFieldCallback(
    projectId: string,
): (item: ReadinessAffectedItem, patch: Partial<AreaPolygon>) => Promise<void> {
    const projectsService = useProjectsService();
    const { refresh } = useQuoteReadiness(projectId);

    return useCallback(
        async (item: ReadinessAffectedItem, patch: Partial<AreaPolygon>) => {
            const { pageId, areaId } = item;
            if (!pageId || !areaId) {
                throw new Error("This fix is missing its page or area.");
            }

            const page = await projectsService.getPage(projectId, pageId);
            const nextOverlay = QuoteReadinessFixUtils.patchArea(
                parseOverlay(page.overlay),
                areaId,
                patch,
            );
            await projectsService.savePageOverlay(projectId, pageId, {
                overlay: nextOverlay,
                scaleMmPerPx: page.scaleMmPerPx,
                ceilingHeightMm: page.ceilingHeightMm,
                referencePoints:
                    QuoteReadinessFixUtils.currentReferencePoints(page),
                referenceLengthMm: page.referenceLengthMm,
            });
            await refresh();
        },
        [projectId, projectsService, refresh],
    );
}

/**
 * Reuses `UpdateQuoteItemTemplateConfig` (already used by the quote-
 * template-form/panel feature to save prices) and resolves `quoteTemplateId`
 * the same way that feature does — `useActiveQuoteTemplate()`, the team's
 * first/only `QuoteTemplate`. That mutation updates the whole config row
 * (`enabled`/`unitPriceCents`/`materialUnitPriceCents`/`labourUnitPriceCents`
 * are all required arguments), so this re-reads the specific row fresh via
 * `ListQuoteItemTemplateConfigsForQuoteTemplate` immediately before writing
 * — the same "fetch fresh, patch one field, write the rest back unchanged"
 * shape as the overlay fix above — so an `enabled`/material/labour edit made
 * elsewhere (e.g. the quote template form) isn't clobbered by this price-only
 * change.
 */
function useUpdateUnitPriceCallback(
    projectId: string,
): (item: ReadinessAffectedItem, unitPriceCents: number) => Promise<void> {
    const { activeTemplate } = useActiveQuoteTemplate();
    const { mutateAsync: updateItemTemplateConfig } =
        DataConnectorReact.useUpdateQuoteItemTemplateConfig(dataConnect);
    const { refresh } = useQuoteReadiness(projectId);

    return useCallback(
        async (item: ReadinessAffectedItem, unitPriceCents: number) => {
            const itemTemplateId = item.quoteItemTemplateId;
            if (!itemTemplateId || !activeTemplate) {
                throw new Error("This fix is missing its quote item template.");
            }

            const quoteTemplateId = activeTemplate.id;
            const { data } =
                await DataConnector.listQuoteItemTemplateConfigsForQuoteTemplate(
                    dataConnect,
                    { quoteTemplateId },
                    { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                );
            const config = data.quoteItemTemplateConfigs.find(
                (candidate) => candidate.itemTemplateId === itemTemplateId,
            );
            if (!config) {
                throw new Error(
                    "This item is no longer in the quote template.",
                );
            }

            await updateItemTemplateConfig({
                quoteTemplateId,
                itemTemplateId,
                enabled: config.enabled,
                unitPriceCents,
                materialUnitPriceCents: config.materialUnitPriceCents,
                labourUnitPriceCents: config.labourUnitPriceCents,
            });
            await refresh();
        },
        [activeTemplate, refresh, updateItemTemplateConfig],
    );
}

/**
 * Reuses `UpdateProjectQuestionnaireQuestionAnswerSource` — already wired up
 * on the questionnaires page (`useConfirmProjectQuestionnaireQuestionAnswerCallback`)
 * for its own AI-confirm action. The mutation only ever sets `answerSource`,
 * never touching `answer`, so there is nothing to read-modify-write here.
 */
function useConfirmAnswerSourceCallback(
    projectId: string,
): (item: ReadinessAffectedItem) => Promise<void> {
    const { mutateAsync: updateAnswerSource } =
        DataConnectorReact.useUpdateProjectQuestionnaireQuestionAnswerSource(
            dataConnect,
        );
    const { refresh } = useQuoteReadiness(projectId);

    return useCallback(
        async (item: ReadinessAffectedItem) => {
            const questionId = item.questionId;
            if (!questionId) {
                throw new Error("This fix is missing its question.");
            }

            await updateAnswerSource({
                id: questionId,
                projectId,
                answerSource: MANUAL_ANSWER_SOURCE,
            });
            await refresh();
        },
        [projectId, refresh, updateAnswerSource],
    );
}

/**
 * Builds the `renderFixControl` passed to `ReadinessCheckList`, persisting
 * every WORK-134 inline fix control and re-evaluating the readiness gate
 * (`useQuoteReadiness().refresh()`, called inside each callback above) on
 * success — without a full page reload, since `refresh()` just re-runs the
 * `GetQuoteReadiness` query. `SCALE_APPLIED` and `ROOMS_MEASURED` are
 * `DEEP_LINK` checks and stay unchanged from WORK-139: their fix is a link
 * to the floorplan editor, not a value submitted here.
 *
 * Each control's starting value (e.g. the room's current wall board type)
 * is sourced from `useQuoteReadiness(projectId).data` directly (WORK-191),
 * the same resolved response the readiness gate itself is built from —
 * rather than a second, independent `useGetQuoteReadiness` call, which
 * would need its own `quoteTemplateId` resolution. That value is read-only
 * *display* seeding; every write path above re-fetches its own fresh copy
 * immediately before saving, rather than trusting this potentially-stale
 * snapshot.
 */
export function useQuoteReadinessFixControlRenderer(
    projectId: string,
): ReadinessCheckListRenderFixControl {
    const { t } = useQuotesTranslation();
    const { data: readinessData } = useQuoteReadiness(projectId);
    const updateAreaField = useUpdateAreaOverlayFieldCallback(projectId);
    const updateUnitPrice = useUpdateUnitPriceCallback(projectId);
    const confirmAnswerSource = useConfirmAnswerSourceCallback(projectId);

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
                            value={QuoteReadinessFixUtils.currentWallBoardType(
                                readinessData,
                                item,
                            )}
                            onChange={(value) =>
                                updateAreaField(item, { wallBoardType: value })
                            }
                        />
                    );
                case CEILING_HEIGHT_SET_CHECK_ID:
                    return (
                        <CeilingHeightFixControl
                            item={item}
                            value={QuoteReadinessFixUtils.currentCeilingHeightMm(
                                readinessData,
                                item,
                            )}
                            pageDefaultHeightMm={QuoteReadinessFixUtils.pageDefaultCeilingHeightMm(
                                readinessData,
                                item,
                            )}
                            onChange={(heightMm) =>
                                updateAreaField(item, {
                                    ceilingHeightMm: heightMm,
                                })
                            }
                        />
                    );
                case TEMPLATE_PRICED_CHECK_ID:
                    return (
                        <UnitPriceFixControl
                            item={item}
                            valueCents={QuoteReadinessFixUtils.currentUnitPriceCents(
                                readinessData,
                                item,
                            )}
                            onChange={(unitPriceCents) =>
                                updateUnitPrice(item, unitPriceCents)
                            }
                        />
                    );
                case TEMPLATE_UNIT_SET_CHECK_ID:
                    return <QuoteTemplateDeepLinkFixControl />;
                case INFERRED_ANSWERS_CONFIRMED_CHECK_ID:
                    return (
                        <ConfirmFixControl
                            item={item}
                            label={t(
                                "readinessCheckList.checkLabels.INFERRED_ANSWERS_CONFIRMED",
                            )}
                            value={QuoteReadinessFixUtils.currentQuestionnaireAnswer(
                                readinessData,
                                item,
                            )}
                            onConfirm={() => confirmAnswerSource(item)}
                        />
                    );
                case ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID:
                    return (
                        <ConfirmFixControl
                            item={item}
                            label={t(
                                "readinessCheckList.checkLabels.ASSUMED_WALL_TYPES_CONFIRMED",
                            )}
                            value={QuoteReadinessFixUtils.currentWallBoardType(
                                readinessData,
                                item,
                            )}
                            onConfirm={() =>
                                updateAreaField(item, {
                                    wallBoardTypeConfirmedAt:
                                        new Date().toISOString(),
                                })
                            }
                        />
                    );
                default:
                    return null;
            }
        },
        [
            confirmAnswerSource,
            projectId,
            readinessData,
            t,
            updateAreaField,
            updateUnitPrice,
        ],
    );
}
