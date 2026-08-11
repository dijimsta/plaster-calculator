import assert from "node:assert/strict";
import test from "node:test";

import {
    AI_CONFIRMED_ANSWER_SOURCE,
    AI_SUGGESTED_ANSWER_SOURCE,
    MANUAL_ANSWER_SOURCE,
    resolveInferredAnswersConfirmed,
} from "../../src/index.ts";

import {
    page,
    project,
    questionnaireAnswer,
} from "./readiness-test-fixtures.ts";

test("resolveInferredAnswersConfirmed is met for manual and already-confirmed answers", () => {
    const result = resolveInferredAnswersConfirmed({
        project: project([page()]),
        questionnaireAnswers: [
            questionnaireAnswer({ answerSource: MANUAL_ANSWER_SOURCE }),
            questionnaireAnswer({ answerSource: AI_CONFIRMED_ANSWER_SOURCE }),
        ],
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveInferredAnswersConfirmed is unmet for an AI-suggested answer that hasn't been confirmed", () => {
    const unconfirmed = questionnaireAnswer({
        answerSource: AI_SUGGESTED_ANSWER_SOURCE,
        label: "How many storeys?",
    });
    const result = resolveInferredAnswersConfirmed({
        project: project([page()]),
        questionnaireAnswers: [unconfirmed],
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        {
            questionId: unconfirmed.questionId,
            questionLabel: "How many storeys?",
        },
    ]);
});

test("resolveInferredAnswersConfirmed ignores an AI-suggested question with no answer yet", () => {
    const result = resolveInferredAnswersConfirmed({
        project: project([page()]),
        questionnaireAnswers: [
            questionnaireAnswer({
                answerSource: AI_SUGGESTED_ANSWER_SOURCE,
                answer: null,
            }),
        ],
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});
