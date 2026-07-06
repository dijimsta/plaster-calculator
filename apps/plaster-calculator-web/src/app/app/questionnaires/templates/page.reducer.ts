import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";

export interface QuestionnaireTemplatesPageState {
    readonly isDrawerOpen: boolean;
    readonly createdTemplateName: string | null;
    readonly creationFailed: boolean;
    readonly deletedTemplateName: string | null;
    readonly deletionFailed: boolean;
    readonly isDeleting: boolean;
    readonly templatePendingDeletion: QuestionnaireTemplate | null;
}

export type QuestionnaireTemplatesPageAction =
    | { readonly type: "openDrawer" }
    | { readonly type: "closeDrawer" }
    | { readonly type: "createSucceeded"; readonly name: string }
    | { readonly type: "createFailed" }
    | { readonly type: "dismissCreatedNotification" }
    | { readonly type: "dismissCreationFailedNotification" }
    | {
          readonly type: "requestDelete";
          readonly template: QuestionnaireTemplate;
      }
    | { readonly type: "cancelDelete" }
    | { readonly type: "deleteStarted" }
    | { readonly type: "deleteSucceeded"; readonly name: string }
    | { readonly type: "deleteFailed" }
    | { readonly type: "dismissDeletedNotification" }
    | { readonly type: "dismissDeletionFailedNotification" };

export function createInitialQuestionnaireTemplatesPageState(): QuestionnaireTemplatesPageState {
    return {
        isDrawerOpen: false,
        createdTemplateName: null,
        creationFailed: false,
        deletedTemplateName: null,
        deletionFailed: false,
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
            return {
                ...state,
                isDrawerOpen: false,
                createdTemplateName: action.name,
                creationFailed: false,
                deletedTemplateName: null,
            };
        case "createFailed":
            return { ...state, creationFailed: true };
        case "dismissCreatedNotification":
            return { ...state, createdTemplateName: null };
        case "dismissCreationFailedNotification":
            return { ...state, creationFailed: false };
        case "requestDelete":
            return {
                ...state,
                deletionFailed: false,
                templatePendingDeletion: action.template,
            };
        case "cancelDelete":
            return state.isDeleting
                ? state
                : { ...state, templatePendingDeletion: null };
        case "deleteStarted":
            return { ...state, isDeleting: true };
        case "deleteSucceeded":
            return {
                ...state,
                createdTemplateName: null,
                deletedTemplateName: action.name,
                deletionFailed: false,
                isDeleting: false,
                templatePendingDeletion: null,
            };
        case "deleteFailed":
            return {
                ...state,
                deletionFailed: true,
                isDeleting: false,
                templatePendingDeletion: null,
            };
        case "dismissDeletedNotification":
            return { ...state, deletedTemplateName: null };
        case "dismissDeletionFailedNotification":
            return { ...state, deletionFailed: false };
    }
}
