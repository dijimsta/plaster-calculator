export interface QuestionnaireTemplateFormValues {
    readonly name: string;
    readonly questions: readonly {
        readonly id?: string;
        readonly label: string;
    }[];
}

export interface QuestionDraft {
    readonly draftId: string;
    readonly id?: string;
    readonly label: string;
}

export interface QuestionnaireTemplateFormState {
    readonly name: string;
    readonly questions: readonly QuestionDraft[];
}

export type QuestionnaireTemplateFormAction =
    | { readonly type: "setName"; readonly name: string }
    | { readonly type: "addQuestion" }
    | { readonly type: "removeQuestion"; readonly draftId: string }
    | {
          readonly type: "updateQuestionLabel";
          readonly draftId: string;
          readonly label: string;
      };

export function createInitialQuestionnaireTemplateFormState(
    initialValues: QuestionnaireTemplateFormValues | undefined,
): QuestionnaireTemplateFormState {
    return {
        name: initialValues?.name ?? "",
        questions: (initialValues?.questions ?? []).map((question) => ({
            draftId: crypto.randomUUID(),
            id: question.id,
            label: question.label,
        })),
    };
}

export function questionnaireTemplateFormReducer(
    state: QuestionnaireTemplateFormState,
    action: QuestionnaireTemplateFormAction,
): QuestionnaireTemplateFormState {
    switch (action.type) {
        case "setName":
            return { ...state, name: action.name };
        case "addQuestion":
            return {
                ...state,
                questions: [
                    ...state.questions,
                    { draftId: crypto.randomUUID(), label: "" },
                ],
            };
        case "removeQuestion":
            return {
                ...state,
                questions: state.questions.filter(
                    (question) => question.draftId !== action.draftId,
                ),
            };
        case "updateQuestionLabel":
            return {
                ...state,
                questions: state.questions.map((question) =>
                    question.draftId === action.draftId
                        ? { ...question, label: action.label }
                        : question,
                ),
            };
    }
}
