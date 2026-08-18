import type { ReadinessCheck } from "@libraries/plaster-calculator-common";
import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    DEFAULT_WALL_BOARD_TYPE,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    READINESS_CHECKS,
    TEMPLATE_PRICED_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "@libraries/plaster-calculator-common";
import {
    CeilingHeightFixControl,
    ConfirmFixControl,
    ReadinessSummaryHeader,
    UnitPriceBatchSaveControl,
    UnitPriceFixControl,
    WallBoardTypeFixControl,
} from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
    ALL_CHECKS_MET_RESULTS,
    CHECK_AFFECTING_SEVERAL_ROOMS_RESULTS,
    FULLY_BLOCKED_RESULTS,
    MULTI_PAGE_ONLY_PAGE_TWO_UNSCALED_RESULTS,
    ONE_CHECK_UNMET_RESULTS,
} from "./quote-readiness-gate.stubs.ts";

const meta: Meta<typeof ReadinessSummaryHeader> = {
    title: "Plaster Calculator/Quotes/QuoteReadinessGate",
    component: ReadinessSummaryHeader,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The quote readiness gate card, with every readiness check presented as a light bordered alert. Results are stub data here; the project quote route wires them up from useQuoteReadiness().",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ReadinessSummaryHeader>;

export const FullyBlocked: Story = {
    name: "Fully blocked",
    render: () => {
        const handleFixControlChange = fn();
        const handleSaveAllPrices = fn();

        return (
            <ReadinessSummaryHeader
                results={FULLY_BLOCKED_RESULTS}
                onGenerateQuote={fn()}
                summaryChecks={READINESS_CHECKS}
                renderCheckFooter={(check) =>
                    check.id === TEMPLATE_PRICED_CHECK_ID ? (
                        <UnitPriceBatchSaveControl
                            itemCount={1}
                            onSaveAll={async () => handleSaveAllPrices()}
                        />
                    ) : null
                }
                renderFixControl={(item, check: ReadinessCheck) => {
                    switch (check.id) {
                        case WALL_TYPE_SET_CHECK_ID:
                            return (
                                <WallBoardTypeFixControl
                                    item={item}
                                    value={DEFAULT_WALL_BOARD_TYPE}
                                    onChange={handleFixControlChange}
                                />
                            );
                        case CEILING_HEIGHT_SET_CHECK_ID:
                            return (
                                <CeilingHeightFixControl
                                    item={item}
                                    value={null}
                                    pageDefaultHeightMm={2400}
                                    onChange={handleFixControlChange}
                                />
                            );
                        case TEMPLATE_PRICED_CHECK_ID:
                            return (
                                <UnitPriceFixControl
                                    item={item}
                                    valueCents={0}
                                    onChange={handleFixControlChange}
                                />
                            );
                        case INFERRED_ANSWERS_CONFIRMED_CHECK_ID:
                            return (
                                <ConfirmFixControl
                                    item={item}
                                    label="Inferred answer"
                                    value="Approximately 142m², excluding wet areas."
                                    onConfirm={handleFixControlChange}
                                />
                            );
                        case ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID:
                            return (
                                <ConfirmFixControl
                                    item={item}
                                    label="Assumed wall type"
                                    value={DEFAULT_WALL_BOARD_TYPE}
                                    onConfirm={handleFixControlChange}
                                />
                            );
                        default:
                            // SCALE_APPLIED and ROOMS_MEASURED are
                            // DEEP_LINK checks — their fix targets land
                            // in WORK-139, so there's nothing to render
                            // here yet.
                            return null;
                    }
                }}
            />
        );
    },
};

export const OneCheckUnmet: Story = {
    name: "One check unmet",
    render: () => {
        const handleSaveAllPrices = fn();

        return (
            <ReadinessSummaryHeader
                results={ONE_CHECK_UNMET_RESULTS}
                onGenerateQuote={fn()}
                summaryChecks={READINESS_CHECKS}
                renderFixControl={(item, check: ReadinessCheck) =>
                    check.id === TEMPLATE_PRICED_CHECK_ID ? (
                        <UnitPriceFixControl
                            item={item}
                            valueCents={0}
                            onChange={fn()}
                        />
                    ) : null
                }
                renderCheckFooter={(check) =>
                    check.id === TEMPLATE_PRICED_CHECK_ID ? (
                        <UnitPriceBatchSaveControl
                            itemCount={1}
                            onSaveAll={async () => handleSaveAllPrices()}
                        />
                    ) : null
                }
            />
        );
    },
};

export const Ready: Story = {
    render: () => (
        <ReadinessSummaryHeader
            results={ALL_CHECKS_MET_RESULTS}
            onGenerateQuote={fn()}
            summaryChecks={READINESS_CHECKS}
        />
    ),
};

export const MultiPageOnlyPageTwoUnscaled: Story = {
    name: "Multi-page, only page 2 unscaled",
    render: () => (
        <ReadinessSummaryHeader
            results={MULTI_PAGE_ONLY_PAGE_TWO_UNSCALED_RESULTS}
            onGenerateQuote={fn()}
            summaryChecks={READINESS_CHECKS}
        />
    ),
};

export const CheckAffectingSeveralRoomsExpanded: Story = {
    name: "Check affecting several rooms, expanded",
    parameters: {
        docs: {
            description: {
                story: 'ReadinessCheckList\'s per-row expand state has no override prop — it always starts collapsed. Click "Show 4 affected items" on the Wall type set row to expand it and see all four affected rooms.',
            },
        },
    },
    render: () => (
        <ReadinessSummaryHeader
            results={CHECK_AFFECTING_SEVERAL_ROOMS_RESULTS}
            onGenerateQuote={fn()}
            summaryChecks={READINESS_CHECKS}
            renderFixControl={(item, check: ReadinessCheck) =>
                check.id === WALL_TYPE_SET_CHECK_ID ? (
                    <WallBoardTypeFixControl
                        item={item}
                        value={DEFAULT_WALL_BOARD_TYPE}
                        onChange={fn()}
                    />
                ) : null
            }
        />
    ),
};
