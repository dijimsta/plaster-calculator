import { Drawer } from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";
import { QuestionnaireTemplateForm } from "../questionnaire-template-form/index.ts";
import type { QuestionnaireTemplateFormValues } from "../questionnaire-template-form/index.ts";

export type NewQuestionnaireTemplateDrawerProps = {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly onCreate: (values: QuestionnaireTemplateFormValues) => void;
};

/** A drawer for drafting and creating a new questionnaire template. */
export function NewQuestionnaireTemplateDrawer({
    open,
    onClose,
    onCreate,
}: NewQuestionnaireTemplateDrawerProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const formId = useId();

    return (
        <Drawer
            open={open}
            onClose={onClose}
            title={t("newQuestionnaireTemplateDrawer.title")}
            description={t("newQuestionnaireTemplateDrawer.description")}
        >
            <QuestionnaireTemplateForm
                formId={formId}
                onCancel={onClose}
                onSubmit={onCreate}
            />
        </Drawer>
    );
}
