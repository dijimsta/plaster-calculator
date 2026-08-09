import { formatRelativeTime } from "@libraries/plaster-calculator-common";
import {
    Box,
    Button,
    Card,
    Drawer,
    EmptyState,
    Text,
} from "@libraries/uikit-web";
import { ClipboardList } from "lucide-react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../../i18n/index.ts";
import type { QuestionnaireTemplate } from "../questionnaire-template-card/index.ts";

export type AddQuestionsFromTemplateDrawerProps = {
    readonly open: boolean;
    readonly templates: readonly QuestionnaireTemplate[];
    readonly applyingTemplateId: string | null;
    readonly onClose: () => void;
    readonly onSelectTemplate: (template: QuestionnaireTemplate) => void;
};

/** A drawer for choosing a questionnaire template to copy questions from into a project. */
export function AddQuestionsFromTemplateDrawer({
    open,
    templates,
    applyingTemplateId,
    onClose,
    onSelectTemplate,
}: AddQuestionsFromTemplateDrawerProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    return (
        <Drawer
            open={open}
            onClose={onClose}
            title={t("addQuestionsFromTemplateDrawer.title")}
            description={t("addQuestionsFromTemplateDrawer.description")}
        >
            {templates.length === 0 ? (
                <EmptyState
                    icon={<ClipboardList />}
                    title={t("addQuestionsFromTemplateDrawer.emptyStateTitle")}
                    description={t(
                        "addQuestionsFromTemplateDrawer.emptyStateDescription",
                    )}
                />
            ) : (
                <Box direction="column" gap="sm">
                    {templates.map((template) => {
                        const isApplying = applyingTemplateId === template.id;
                        return (
                            <Card key={template.id}>
                                <Box
                                    direction="row"
                                    justify="between"
                                    align="center"
                                    gap="md"
                                >
                                    <Box direction="column" grow>
                                        <Text size="base" truncate>
                                            {template.name}
                                        </Text>
                                        <Text size="sm" variant="muted">
                                            {t("common.updatedAt", {
                                                time: formatRelativeTime(
                                                    new Date(
                                                        template.updatedAt,
                                                    ),
                                                ),
                                            })}
                                        </Text>
                                    </Box>
                                    <Button
                                        variant="secondary"
                                        disabled={applyingTemplateId !== null}
                                        onClick={() =>
                                            onSelectTemplate(template)
                                        }
                                    >
                                        {isApplying
                                            ? t("common.adding")
                                            : t("common.add")}
                                    </Button>
                                </Box>
                            </Card>
                        );
                    })}
                </Box>
            )}
        </Drawer>
    );
}
