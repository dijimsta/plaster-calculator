import type { QuestionnaireTemplate } from "./schemas/index.ts";

/**
 * Platform-neutral contract for reading questionnaire templates. Implementations
 * live in consuming apps or infrastructure libraries (e.g. a Firebase-backed
 * implementation in plaster-calculator-node-core); Storybook injects a
 * deterministic stub through the same contract.
 */
export interface QuestionnairesService {
    listTemplates(): Promise<readonly QuestionnaireTemplate[]>;
}
