import { Box, Button, Card, IconTile, Text } from "@libraries/uikit-web";
import {
    ClipboardCheck,
    ClipboardList,
    Copy,
    Eye,
    Pencil,
    Rows3,
    Trash2,
} from "lucide-react";

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

interface TemplateActionsProps {
    readonly isBuiltIn: boolean;
    readonly onOpen: () => void;
    readonly onDuplicate: () => void;
    readonly onDelete: () => void;
}

/** Renders one questionnaire template and its available actions. */
export function QuestionnaireTemplateCard({
    template,
    onOpen,
    onDuplicate,
    onDelete,
}: QuestionnaireTemplateCardProps): ReactElement {
    const isBuiltIn = template.origin === "standard";

    return (
        <Card>
            <Box direction="column" gap="lg">
                <TemplateHeader template={template} />
                <TemplateMetadata template={template} />
                <TemplateActions
                    isBuiltIn={isBuiltIn}
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
        <Box direction="row" align="start" gap="md">
            <IconTile tone={template.origin === "standard" ? "dark" : "indigo"}>
                <ClipboardList size={20} aria-hidden="true" />
            </IconTile>
            <Box direction="column" gap="xs" grow>
                <Box direction="row" align="center" gap="sm" wrap>
                    <Box grow>
                        <Text size="base" truncate>
                            {template.name}
                        </Text>
                    </Box>
                </Box>
                <Text size="sm" variant="muted">
                    {template.scope}
                </Text>
            </Box>
        </Box>
    );
}

function TemplateMetadata({
    template,
}: Pick<TemplateHeaderProps, "template">): ReactElement {
    return (
        <Box direction="row" align="center" gap="lg" wrap>
            <Box direction="row" align="center" gap="xs">
                <ClipboardCheck size={16} aria-hidden="true" />
                <Text size="sm" variant="muted">
                    {template.questionCount} questions
                </Text>
            </Box>
            <Box direction="row" align="center" gap="xs">
                <Rows3 size={16} aria-hidden="true" />
                <Text size="sm" variant="muted">
                    {template.sectionCount} sections
                </Text>
            </Box>
        </Box>
    );
}

function TemplateActions(props: TemplateActionsProps): ReactElement {
    if (props.isBuiltIn) {
        return (
            <BuiltInActions
                onOpen={props.onOpen}
                onDuplicate={props.onDuplicate}
            />
        );
    } else {
        return (
            <CustomActions
                onOpen={props.onOpen}
                onDuplicate={props.onDuplicate}
                onDelete={props.onDelete}
            />
        );
    }
}

function BuiltInActions({
    onOpen,
    onDuplicate,
}: Pick<TemplateActionsProps, "onOpen" | "onDuplicate">): ReactElement {
    return (
        <Box direction="row" gap="sm">
            <Button
                icon={<Copy size={16} aria-hidden="true" />}
                grow
                onClick={onDuplicate}
            >
                Duplicate
            </Button>
            <Button
                variant="secondary"
                icon={<Eye size={16} aria-hidden="true" />}
                onClick={onOpen}
            >
                Preview
            </Button>
        </Box>
    );
}

function CustomActions({
    onOpen,
    onDuplicate,
    onDelete,
}: Pick<
    TemplateActionsProps,
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
