import { Drawer } from "@libraries/uikit-web";
import { useId } from "react";

import { QuestionnaireTemplateForm } from "../questionnaire-template-form/index.ts";

import type { QuestionnaireTemplateFormValues } from "../questionnaire-template-form/index.ts";
import type { ReactElement } from "react";

export interface NewQuestionnaireTemplateDrawerProps {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreate: (values: QuestionnaireTemplateFormValues) => void;
}

/** A drawer for drafting and creating a new questionnaire template. */
export function NewQuestionnaireTemplateDrawer({
    open,
    onClose,
    onCreate,
}: NewQuestionnaireTemplateDrawerProps): ReactElement {
    const formId = useId();

    return (
        <Drawer
            open={open}
            onClose={onClose}
            title="New template"
            description="Draft a template and its questions."
        >
            <QuestionnaireTemplateForm
                formId={formId}
                onCancel={onClose}
                onSubmit={onCreate}
            />
        </Drawer>
    );
}
