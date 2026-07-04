import { Box, Button, Card, IconTile, Text } from "@libraries/uikit-web";
import { ClipboardList, Copy, Pencil, Trash2 } from "lucide-react";

import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-common";
import type { ReactElement } from "react";

export interface QuestionnaireTemplateCardProps {
    readonly template: QuestionnaireTemplate;
    readonly onOpen: () => void;
    readonly onDuplicate: () => void;
    readonly onDelete: () => void;
}

interface TemplateHeaderProps {
    readonly template: QuestionnaireTemplateCardProps["template"];
}

/** Renders one questionnaire template and its available actions. */
export function QuestionnaireTemplateCard({
    template,
    onOpen,
    onDuplicate,
    onDelete,
}: QuestionnaireTemplateCardProps): ReactElement {
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
                {template.usedByLabel} · {template.updated}
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
    return (
        <Box direction="row" gap="sm">
            <Button
                icon={<Pencil size={16} aria-hidden="true" />}
                grow
                onClick={onOpen}
            >
                Edit
            </Button>
            <Button
                variant="secondary"
                icon={<Copy size={16} aria-hidden="true" />}
                aria-label="Duplicate template"
                onClick={onDuplicate}
            />
            <Button
                variant="secondary"
                icon={<Trash2 size={16} aria-hidden="true" />}
                aria-label="Delete template"
                onClick={onDelete}
            />
        </Box>
    );
}
