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
    ReadinessCheckList,
    ReadinessSummaryHeader,
    UnitPriceFixControl,
    WallBoardTypeFixControl,
} from "@libraries/plaster-calculator-ui";
import { Box } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
    ALL_CHECKS_MET_RESULTS,
    CHECK_AFFECTING_SEVERAL_ROOMS_RESULTS,
    FULLY_BLOCKED_RESULTS,
    MULTI_PAGE_ONLY_PAGE_TWO_UNSCALED_RESULTS,
    ONE_CHECK_UNMET_RESULTS,
} from "./quote-readiness-gate.stubs.ts";

const meta: Meta<typeof ReadinessCheckList> = {
    title: "Plaster Calculator/Quotes/QuoteReadinessGate",
    component: ReadinessCheckList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The quote readiness gate panel — ReadinessSummaryHeader and ReadinessCheckList composed together, as they'll appear on the (not yet built) quote readiness route. Results are stub data here; the real route wires them up from useQuoteReadiness() in a later ticket.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ReadinessCheckList>;

export const FullyBlocked: Story = {
    name: "Fully blocked",
    render: () => {
        const handleFixControlChange = fn();

        return (
            <Box direction="column" gap="lg">
                <ReadinessSummaryHeader
                    results={FULLY_BLOCKED_RESULTS}
                    onGenerateQuote={fn()}
                />
                <ReadinessCheckList
                    checks={READINESS_CHECKS}
                    results={FULLY_BLOCKED_RESULTS}
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
            </Box>
        );
    },
};

export const OneCheckUnmet: Story = {
    name: "One check unmet",
    render: () => (
        <Box direction="column" gap="lg">
            <ReadinessSummaryHeader
                results={ONE_CHECK_UNMET_RESULTS}
                onGenerateQuote={fn()}
            />
            <ReadinessCheckList
                checks={READINESS_CHECKS}
                results={ONE_CHECK_UNMET_RESULTS}
                renderFixControl={(item, check: ReadinessCheck) =>
                    check.id === TEMPLATE_PRICED_CHECK_ID ? (
                        <UnitPriceFixControl
                            item={item}
                            valueCents={0}
                            onChange={fn()}
                        />
                    ) : null
                }
            />
        </Box>
    ),
};

export const Ready: Story = {
    render: () => (
        <Box direction="column" gap="lg">
            <ReadinessSummaryHeader
                results={ALL_CHECKS_MET_RESULTS}
                onGenerateQuote={fn()}
            />
            <ReadinessCheckList
                checks={READINESS_CHECKS}
                results={ALL_CHECKS_MET_RESULTS}
            />
        </Box>
    ),
};

export const MultiPageOnlyPageTwoUnscaled: Story = {
    name: "Multi-page, only page 2 unscaled",
    render: () => (
        <Box direction="column" gap="lg">
            <ReadinessSummaryHeader
                results={MULTI_PAGE_ONLY_PAGE_TWO_UNSCALED_RESULTS}
                onGenerateQuote={fn()}
            />
            <ReadinessCheckList
                checks={READINESS_CHECKS}
                results={MULTI_PAGE_ONLY_PAGE_TWO_UNSCALED_RESULTS}
            />
        </Box>
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
        <Box direction="column" gap="lg">
            <ReadinessSummaryHeader
                results={CHECK_AFFECTING_SEVERAL_ROOMS_RESULTS}
                onGenerateQuote={fn()}
            />
            <ReadinessCheckList
                checks={READINESS_CHECKS}
                results={CHECK_AFFECTING_SEVERAL_ROOMS_RESULTS}
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
        </Box>
    ),
};
