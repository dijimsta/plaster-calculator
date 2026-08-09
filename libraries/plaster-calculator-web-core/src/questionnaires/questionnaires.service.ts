import {
    AnswerQuestionnaireWithAiResponseSchema,
    type AnswerQuestionnaireWithAiResponse,
} from "@libraries/plaster-calculator-common";
import { httpsCallable, type Functions } from "firebase/functions";

import { FirebaseService } from "../firebase/firebase.service.ts";

// Matches the 120s server-side timeoutSeconds on answerQuestionnaireWithAI, plus buffer.
const ANSWER_QUESTIONNAIRE_WITH_AI_TIMEOUT_MS = 150 * 1000;

export class QuestionnairesService {
    public constructor(
        private readonly functions: Functions = FirebaseService.getFunctions(),
    ) {}

    public async answerQuestionnaireWithAI(
        projectId: string,
    ): Promise<AnswerQuestionnaireWithAiResponse> {
        const answerQuestionnaireWithAiCallable = httpsCallable(
            this.functions,
            "answerQuestionnaireWithAI",
            { timeout: ANSWER_QUESTIONNAIRE_WITH_AI_TIMEOUT_MS },
        );
        const { data } = await answerQuestionnaireWithAiCallable({
            projectId,
        });
        return AnswerQuestionnaireWithAiResponseSchema.parse(data);
    }
}
