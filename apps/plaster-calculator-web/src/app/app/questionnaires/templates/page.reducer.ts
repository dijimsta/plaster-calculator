import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";

export interface QuestionnaireTemplatesPageState {
    readonly isDrawerOpen: boolean;
    readonly isDeleting: boolean;
    readonly templatePendingDeletion: QuestionnaireTemplate | null;
}

export type QuestionnaireTemplatesPageAction =
    | { readonly type: "openDrawer" }
    | { readonly type: "closeDrawer" }
    | { readonly type: "createSucceeded" }
    | {
          readonly type: "requestDelete";
          readonly template: QuestionnaireTemplate;
      }
    | { readonly type: "cancelDelete" }
    | { readonly type: "deleteStarted" }
    | { readonly type: "deleteSucceeded" }
    | { readonly type: "deleteFailed" };

export function createInitialQuestionnaireTemplatesPageState(): QuestionnaireTemplatesPageState {
    return {
        isDrawerOpen: false,
        isDeleting: false,
        templatePendingDeletion: null,
    };
}

export function questionnaireTemplatesPageReducer(
    state: QuestionnaireTemplatesPageState,
    action: QuestionnaireTemplatesPageAction,
): QuestionnaireTemplatesPageState {
    switch (action.type) {
        case "openDrawer":
            return { ...state, isDrawerOpen: true };
        case "closeDrawer":
            return { ...state, isDrawerOpen: false };
        case "createSucceeded":
            return { ...state, isDrawerOpen: false };
        case "requestDelete":
            return { ...state, templatePendingDeletion: action.template };
        case "cancelDelete":
            return state.isDeleting
                ? state
                : { ...state, templatePendingDeletion: null };
        case "deleteStarted":
            return { ...state, isDeleting: true };
        case "deleteSucceeded":
            return {
                ...state,
                isDeleting: false,
                templatePendingDeletion: null,
            };
        case "deleteFailed":
            return {
                ...state,
                isDeleting: false,
                templatePendingDeletion: null,
            };
    }
}
