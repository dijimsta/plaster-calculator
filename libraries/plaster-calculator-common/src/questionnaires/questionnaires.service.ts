import type {
    CreateQuestionnaireTemplateInput,
    QuestionnaireTemplate,
} from "./schemas/index.ts";

/**
 * Platform-neutral contract for reading and creating questionnaire templates.
 * Implementations live in consuming apps or infrastructure libraries (e.g. a
 * Firebase-backed implementation in plaster-calculator-node-core); Storybook
 * injects a deterministic stub through the same contract.
 */
export interface IQuestionnairesService {
    listTemplates(): Promise<readonly QuestionnaireTemplate[]>;
    createTemplate(
        input: CreateQuestionnaireTemplateInput,
    ): Promise<QuestionnaireTemplate>;
}
