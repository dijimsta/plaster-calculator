import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";

export interface QuestionnaireTemplatesPageState {
    readonly isDrawerOpen: boolean;
    readonly isDeleting: boolean;
    readonly templatePendingDeletion: QuestionnaireTemplate | null;
    readonly templateBeingEdited: QuestionnaireTemplate | null;
    readonly duplicatingTemplateIds: ReadonlySet<string>;
}

export type QuestionnaireTemplatesPageAction =
    | { readonly type: "openDrawer" }
    | { readonly type: "closeDrawer" }
    | { readonly type: "createSucceeded" }
    | {
          readonly type: "requestEdit";
          readonly template: QuestionnaireTemplate;
      }
    | { readonly type: "closeEditDrawer" }
    | { readonly type: "editSucceeded" }
    | {
          readonly type: "requestDelete";
          readonly template: QuestionnaireTemplate;
      }
    | { readonly type: "cancelDelete" }
    | { readonly type: "deleteStarted" }
    | { readonly type: "deleteSucceeded" }
    | { readonly type: "deleteFailed" }
    | { readonly type: "duplicateStarted"; readonly templateId: string }
    | { readonly type: "duplicateSucceeded"; readonly templateId: string }
    | { readonly type: "duplicateFailed"; readonly templateId: string };

export function createInitialQuestionnaireTemplatesPageState(): QuestionnaireTemplatesPageState {
    return {
        isDrawerOpen: false,
        isDeleting: false,
        templatePendingDeletion: null,
        templateBeingEdited: null,
        duplicatingTemplateIds: new Set(),
    };
}

function withoutDuplicatingTemplateId(
    duplicatingTemplateIds: ReadonlySet<string>,
    templateId: string,
): ReadonlySet<string> {
    const next = new Set(duplicatingTemplateIds);
    next.delete(templateId);
    return next;
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
        case "requestEdit":
            return { ...state, templateBeingEdited: action.template };
        case "closeEditDrawer":
            return { ...state, templateBeingEdited: null };
        case "editSucceeded":
            return { ...state, templateBeingEdited: null };
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
        case "duplicateStarted":
            return {
                ...state,
                duplicatingTemplateIds: new Set(
                    state.duplicatingTemplateIds,
                ).add(action.templateId),
            };
        case "duplicateSucceeded":
        case "duplicateFailed":
            return {
                ...state,
                duplicatingTemplateIds: withoutDuplicatingTemplateId(
                    state.duplicatingTemplateIds,
                    action.templateId,
                ),
            };
    }
}
