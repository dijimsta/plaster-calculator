import type * as DataConnector from "@generated/data-connector-web";
import { formatRelativeTime } from "@libraries/plaster-calculator-common";
import { Box, Button, Card, IconTile, Text } from "@libraries/uikit-web";
import { ClipboardList, Copy, Pencil, Trash2 } from "lucide-react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../../i18n/index.ts";

export type QuestionnaireTemplate =
    DataConnector.ListQuestionnaireTemplatesData["questionnaireTemplates"][number];

export type QuestionnaireTemplateCardProps = {
    readonly template: QuestionnaireTemplate;
    readonly onOpen: () => void;
    readonly onDuplicate: () => void;
    readonly onDelete: () => void;
};

type TemplateHeaderProps = {
    readonly template: QuestionnaireTemplateCardProps["template"];
};

/** Renders one questionnaire template and its available actions. */
export function QuestionnaireTemplateCard({
    template,
    onOpen,
    onDuplicate,
    onDelete,
}: QuestionnaireTemplateCardProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    return (
        <Card>
            <Box direction="column" gap="lg">
                <TemplateHeader template={template} />
                <TemplateActions
                    onOpen={onOpen}
                    onDuplicate={onDuplicate}
                    onDelete={onDelete}
                />
            </Box>

            <Card.Footer>
                {t("common.updatedAt", {
                    time: formatRelativeTime(new Date(template.updatedAt)),
                })}
            </Card.Footer>
        </Card>
    );
}

function TemplateHeader({ template }: TemplateHeaderProps): ReactElement {
    return (
        <Box direction="row" align="center" gap="md">
            <IconTile tone="indigo">
                <ClipboardList size={20} aria-hidden="true" />
            </IconTile>
            <Box grow>
                <Text size="base" truncate>
                    {template.name}
                </Text>
            </Box>
        </Box>
    );
}

function TemplateActions({
    onOpen,
    onDuplicate,
    onDelete,
}: Pick<
    QuestionnaireTemplateCardProps,
    "onOpen" | "onDuplicate" | "onDelete"
>): ReactElement {
    const { t } = useQuestionnairesTranslation();
    return (
        <Box direction="row" gap="sm">
            <Button
                icon={<Pencil size={16} aria-hidden="true" />}
                grow
                onClick={onOpen}
            >
                {t("questionnaireTemplateCard.edit")}
            </Button>
            <Button
                variant="secondary"
                icon={<Copy size={16} aria-hidden="true" />}
                label={t("questionnaireTemplateCard.duplicateTemplate")}
                onClick={onDuplicate}
            />
            <Button
                variant="dangerSoft"
                icon={<Trash2 size={16} aria-hidden="true" />}
                label={t("questionnaireTemplateCard.deleteTemplate")}
                onClick={onDelete}
            />
        </Box>
    );
}
