import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback } from "react";
import type { Dispatch } from "react";

import type { QuestionnaireTemplatesPageAction } from "./page.reducer.js";

type RefreshTemplates = () => Promise<void>;
type DuplicateTemplate = (template: QuestionnaireTemplate) => Promise<void>;
type PageDispatch = Dispatch<QuestionnaireTemplatesPageAction>;

const COPY_NAME_SUFFIX = " (copy)";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

function buildDuplicateTemplateName(sourceName: string): string {
    return sourceName.endsWith(COPY_NAME_SUFFIX)
        ? sourceName
        : `${sourceName}${COPY_NAME_SUFFIX}`;
}

export function useDuplicateQuestionnaireTemplateCallback(
    refreshTemplates: RefreshTemplates,
    dispatch: PageDispatch,
): DuplicateTemplate {
    const { mutateAsync: createTemplate } =
        DataConnectorReact.useCreateQuestionnaireTemplate(dataConnect);
    const { mutateAsync: createQuestion } =
        DataConnectorReact.useCreateQuestionnaireTemplateQuestion(dataConnect);
    const { notify } = useNotificationsManager();

    return useCallback(
        async (template: QuestionnaireTemplate): Promise<void> => {
            dispatch({ type: "duplicateStarted", templateId: template.id });
            try {
                const sourceTemplate =
                    await DataConnector.getQuestionnaireTemplate(
                        dataConnect,
                        { id: template.id },
                        { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                    );
                const sourceQuestions = [
                    ...(sourceTemplate.data.questionnaireTemplate?.questions ??
                        []),
                ].sort((a, b) => a.position - b.position);
                const name = buildDuplicateTemplateName(template.name);

                const { questionnaireTemplate_insert } = await createTemplate({
                    id: crypto.randomUUID(),
                    name,
                });

                await Promise.all(
                    sourceQuestions.map((question, position) =>
                        createQuestion({
                            id: crypto.randomUUID(),
                            templateId: questionnaireTemplate_insert.id,
                            label: question.label,
                            position,
                        }),
                    ),
                );

                await refreshTemplates();
                dispatch({
                    type: "duplicateSucceeded",
                    templateId: template.id,
                });
                notify({
                    intent: "success",
                    title: "Clarification template duplicated",
                    description: `"${name}" is ready to use.`,
                });
            } catch {
                dispatch({ type: "duplicateFailed", templateId: template.id });
                notify({
                    intent: "error",
                    title: "Couldn't duplicate clarification template",
                    description:
                        "Something went wrong while saving. Please try again.",
                });
            }
        },
        [createQuestion, createTemplate, dispatch, notify, refreshTemplates],
    );
}
