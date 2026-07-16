import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { httpsCallable } from "firebase/functions";

const functions = FirebaseService.getFunctions();

// Matches the 120s server-side timeoutSeconds on answerQuestionnaireWithAI, plus buffer.
const ANSWER_QUESTIONNAIRE_WITH_AI_TIMEOUT_MS = 150 * 1000;

type AnswerQuestionnaireWithAiResponse = {
    updatedCount: number;
};

const answerQuestionnaireWithAiCallable = httpsCallable<
    { projectId: string },
    AnswerQuestionnaireWithAiResponse
>(functions, "answerQuestionnaireWithAI", {
    timeout: ANSWER_QUESTIONNAIRE_WITH_AI_TIMEOUT_MS,
});

export async function answerQuestionnaireWithAI(projectId: string) {
    const result = await answerQuestionnaireWithAiCallable({ projectId });
    return result.data;
}
