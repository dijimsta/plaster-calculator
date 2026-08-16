import { Box, Button, Card, IconTile, Text } from "@libraries/uikit-web";
import { Sparkles } from "lucide-react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

export type ClarificationsFindAnswersActionProps = {
    /** Credits this run will spend, shown before the run starts. */
    readonly creditCost: number;
    readonly isRunning: boolean;
    readonly disabled: boolean;
    readonly onRun: () => void;
};

/** The "Find Answers on Plan" action: states its credit cost up front, then swaps to a running/in-progress state while the AI scan is in flight. */
export function ClarificationsFindAnswersAction({
    creditCost,
    isRunning,
    disabled,
    onRun,
}: ClarificationsFindAnswersActionProps): ReactElement {
    const { t } = useQuestionnairesTranslation();

    return (
        <Card>
            <Box direction="row" justify="between" align="center" gap="md" wrap>
                <Box direction="row" gap="sm" align="center">
                    <IconTile tone="indigo">
                        <Sparkles size={20} aria-hidden="true" />
                    </IconTile>
                    <Box direction="column" gap="xs">
                        <Text weight="semibold">
                            {t("clarificationsStep.findAnswers.action")}
                        </Text>
                        <Text size="sm" variant="muted">
                            {isRunning
                                ? t("clarificationsStep.findAnswers.running")
                                : t(
                                      "clarificationsStep.findAnswers.creditCost",
                                      {
                                          count: creditCost,
                                      },
                                  )}
                        </Text>
                    </Box>
                </Box>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={isRunning || disabled}
                    onClick={onRun}
                >
                    {isRunning
                        ? t("clarificationsStep.findAnswers.running")
                        : t("clarificationsStep.findAnswers.action")}
                </Button>
            </Box>
        </Card>
    );
}
