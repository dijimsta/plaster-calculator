import { GridList } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { QuestionnaireTemplateCard } from "../questionnaire-template-card/index.ts";
import type { QuestionnaireTemplate } from "../questionnaire-template-card/index.ts";

export type QuestionnaireTemplateCardGridListProps = {
    readonly templates: readonly QuestionnaireTemplate[];
    readonly onOpen: (template: QuestionnaireTemplate) => void;
    readonly onDuplicate: (template: QuestionnaireTemplate) => void;
    readonly onDelete: (template: QuestionnaireTemplate) => void;
    readonly duplicatingTemplateIds?: ReadonlySet<string>;
};

/** Renders questionnaire templates as a responsive grid of cards. */
export function QuestionnaireTemplateCardGridList({
    templates,
    onOpen,
    onDuplicate,
    onDelete,
    duplicatingTemplateIds,
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
                        isDuplicating={duplicatingTemplateIds?.has(template.id)}
                    />
                </GridList.Item>
            ))}
        </GridList>
    );
}
