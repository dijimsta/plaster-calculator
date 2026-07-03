import { GridList } from "@libraries/uikit-web";

import { QuestionnaireTemplateCard } from "../questionnaire-template-card/index.ts";

import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-common";
import type { ReactElement } from "react";

export interface QuestionnaireTemplateCardGridListProps {
    readonly templates: readonly QuestionnaireTemplate[];
    readonly onOpen: (template: QuestionnaireTemplate) => void;
    readonly onDuplicate: (template: QuestionnaireTemplate) => void;
    readonly onDelete: (template: QuestionnaireTemplate) => void;
}

/** Renders questionnaire templates as a responsive grid of cards. */
export function QuestionnaireTemplateCardGridList({
    templates,
    onOpen,
    onDuplicate,
    onDelete,
}: QuestionnaireTemplateCardGridListProps): ReactElement {
    return (
        <GridList>
            {templates.map((template) => (
                <GridList.Item key={template.id}>
                    <QuestionnaireTemplateCard
                        template={template}
                        onOpen={() => onOpen(template)}
                        onDuplicate={() => onDuplicate(template)}
                        onDelete={() => onDelete(template)}
                    />
                </GridList.Item>
            ))}
        </GridList>
    );
}
