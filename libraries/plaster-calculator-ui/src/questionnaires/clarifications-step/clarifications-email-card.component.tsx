import { Badge, Box, Button, Card, IconTile, Text } from "@libraries/uikit-web";
import { Mail } from "lucide-react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

import type { ClarificationsStepProps } from "./clarifications-step.types.ts";

export type ClarificationsEmailCardProps = Pick<
    ClarificationsStepProps,
    | "notAnsweredOnPlanCount"
    | "hasRunFindAnswersOnPlan"
    | "isEmailSent"
    | "onSendEmail"
>;

/**
 * Emails the builder about the clarifications not (yet) answered from the
 * plan. Visible whenever there are clarifications at all — the caller
 * doesn't gate it on `hasRunFindAnswersOnPlan` — but its wording adapts
 * before vs. after a run, and it shows a sent confirmation once sent.
 */
export function ClarificationsEmailCard({
    notAnsweredOnPlanCount,
    hasRunFindAnswersOnPlan,
    isEmailSent,
    onSendEmail,
}: ClarificationsEmailCardProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const description = hasRunFindAnswersOnPlan
        ? t("clarificationsStep.emailCard.descriptionAfterRun", {
              count: notAnsweredOnPlanCount,
          })
        : t("clarificationsStep.emailCard.descriptionBeforeRun", {
              count: notAnsweredOnPlanCount,
          });

    return (
        <Card>
            <Box direction="row" justify="between" align="center" gap="md" wrap>
                <Box direction="row" gap="sm" align="center">
                    <IconTile tone="neutral">
                        <Mail size={20} aria-hidden="true" />
                    </IconTile>
                    <Box direction="column" gap="xs">
                        <Text weight="semibold">
                            {t("clarificationsStep.emailCard.title")}
                        </Text>
                        <Text size="sm" variant="muted">
                            {description}
                        </Text>
                        {isEmailSent && (
                            <Badge color="green" variant="pill-with-border">
                                {t(
                                    "clarificationsStep.emailCard.sentConfirmation",
                                )}
                            </Badge>
                        )}
                    </Box>
                </Box>
                <Button type="button" variant="secondary" onClick={onSendEmail}>
                    {isEmailSent
                        ? t("clarificationsStep.emailCard.resend")
                        : t("clarificationsStep.emailCard.send")}
                </Button>
            </Box>
        </Card>
    );
}
