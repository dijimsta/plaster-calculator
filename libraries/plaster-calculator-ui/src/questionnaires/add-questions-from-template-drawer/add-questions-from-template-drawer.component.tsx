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

import type { QuestionnaireTemplate } from "../questionnaire-template-card/index.ts";
import type { ReactElement } from "react";

export interface AddQuestionsFromTemplateDrawerProps {
    readonly open: boolean;
    readonly templates: readonly QuestionnaireTemplate[];
    readonly applyingTemplateId: string | null;
    readonly onClose: () => void;
    readonly onSelectTemplate: (template: QuestionnaireTemplate) => void;
}

/** A drawer for choosing a questionnaire template to copy questions from into a project. */
export function AddQuestionsFromTemplateDrawer({
    open,
    templates,
    applyingTemplateId,
    onClose,
    onSelectTemplate,
}: AddQuestionsFromTemplateDrawerProps): ReactElement {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            title="Add from template"
            description="Copy a template's questions into this project's questionnaire."
        >
            {templates.length === 0 ? (
                <EmptyState
                    icon={<ClipboardList />}
                    title="No templates yet"
                    description="Create a questionnaire template first to copy questions from it."
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
                                            Updated{" "}
                                            {formatRelativeTime(
                                                new Date(template.updatedAt),
                                            )}
                                        </Text>
                                    </Box>
                                    <Button
                                        variant="secondary"
                                        disabled={applyingTemplateId !== null}
                                        onClick={() =>
                                            onSelectTemplate(template)
                                        }
                                    >
                                        {isApplying ? "Adding..." : "Add"}
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
