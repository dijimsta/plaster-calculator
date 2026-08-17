import assert from "node:assert/strict";
import test from "node:test";

import {
    COMPLETED_COMPLETION_STATE,
    countAnswered,
    deriveFrom,
    IN_PROGRESS_COMPLETION_STATE,
    NOT_STARTED_COMPLETION_STATE,
    type QuestionnaireAnswerState,
} from "../../src/index.ts";

test("countAnswered counts questions with a non-empty, non-null answer", () => {
    const questions: QuestionnaireAnswerState[] = [
        { answer: "Yes" },
        { answer: "" },
        { answer: null },
        { answer: undefined },
        { answer: "No" },
    ];
    assert.equal(countAnswered(questions), 2);
});

test("countAnswered returns 0 for an empty question list", () => {
    assert.equal(countAnswered([]), 0);
});

test("countAnswered returns 0 when every answer is missing or blank", () => {
    const questions: QuestionnaireAnswerState[] = [
        { answer: null },
        { answer: "" },
        {},
    ];
    assert.equal(countAnswered(questions), 0);
});

test("deriveFrom reports NOT_STARTED when no question has an answer", () => {
    const questions: QuestionnaireAnswerState[] = [
        { answer: null },
        { answer: "" },
    ];
    assert.equal(deriveFrom(questions), NOT_STARTED_COMPLETION_STATE);
});

test("deriveFrom reports NOT_STARTED for an empty question list", () => {
    assert.equal(deriveFrom([]), NOT_STARTED_COMPLETION_STATE);
});

test("deriveFrom reports IN_PROGRESS when some but not all questions are answered", () => {
    const questions: QuestionnaireAnswerState[] = [
        { answer: "Yes" },
        { answer: null },
    ];
    assert.equal(deriveFrom(questions), IN_PROGRESS_COMPLETION_STATE);
});

test("deriveFrom reports COMPLETED when every question is answered", () => {
    const questions: QuestionnaireAnswerState[] = [
        { answer: "Yes" },
        { answer: "No" },
    ];
    assert.equal(deriveFrom(questions), COMPLETED_COMPLETION_STATE);
});
