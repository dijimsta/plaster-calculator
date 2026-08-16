import assert from "node:assert/strict";
import test from "node:test";

import {
    AI_CONFIRMED_ANSWER_SOURCE,
    AI_SUGGESTED_ANSWER_SOURCE,
    MANUAL_ANSWER_SOURCE,
} from "@libraries/plaster-calculator-common";

import { ClarificationsStepUtils } from "../../src/questionnaires/clarifications-step.utils.ts";

test("deriveRowStatus returns ASK_BUILDER when there is no answer yet", () => {
    assert.equal(
        ClarificationsStepUtils.deriveRowStatus(null, MANUAL_ANSWER_SOURCE),
        "ASK_BUILDER",
    );
    assert.equal(
        ClarificationsStepUtils.deriveRowStatus(
            undefined,
            AI_SUGGESTED_ANSWER_SOURCE,
        ),
        "ASK_BUILDER",
    );
    assert.equal(
        ClarificationsStepUtils.deriveRowStatus("   ", MANUAL_ANSWER_SOURCE),
        "ASK_BUILDER",
    );
});

test("deriveRowStatus returns UNCHECKED for a manually typed answer", () => {
    assert.equal(
        ClarificationsStepUtils.deriveRowStatus(
            "Standard plasterboard",
            MANUAL_ANSWER_SOURCE,
        ),
        "UNCHECKED",
    );
});

test("deriveRowStatus returns ON_PLAN for an AI-suggested or AI-confirmed answer", () => {
    assert.equal(
        ClarificationsStepUtils.deriveRowStatus(
            "10mm plasterboard",
            AI_SUGGESTED_ANSWER_SOURCE,
        ),
        "ON_PLAN",
    );
    assert.equal(
        ClarificationsStepUtils.deriveRowStatus(
            "10mm plasterboard",
            AI_CONFIRMED_ANSWER_SOURCE,
        ),
        "ON_PLAN",
    );
});

test("toClarificationRows maps raw questions onto rows with derived status", () => {
    const rows = ClarificationsStepUtils.toClarificationRows([
        {
            id: "q1",
            label: "Ceiling height?",
            position: 0,
            answer: "2.4m",
            answerSource: AI_SUGGESTED_ANSWER_SOURCE,
        },
        {
            id: "q2",
            label: "Wall type?",
            position: 1,
            answer: null,
            answerSource: MANUAL_ANSWER_SOURCE,
        },
        {
            id: "q3",
            label: "Wet area finish?",
            position: 2,
            answer: "Villaboard",
            answerSource: MANUAL_ANSWER_SOURCE,
        },
    ]);

    assert.deepEqual(
        rows.map((row) => ({ id: row.id, status: row.status })),
        [
            { id: "q1", status: "ON_PLAN" },
            { id: "q2", status: "ASK_BUILDER" },
            { id: "q3", status: "UNCHECKED" },
        ],
    );
});

test("countNotAnsweredOnPlan counts everything that isn't ON_PLAN, before and after a run", () => {
    const beforeRun = ClarificationsStepUtils.toClarificationRows([
        {
            id: "q1",
            label: "Ceiling height?",
            position: 0,
            answer: null,
            answerSource: MANUAL_ANSWER_SOURCE,
        },
        {
            id: "q2",
            label: "Wall type?",
            position: 1,
            answer: null,
            answerSource: MANUAL_ANSWER_SOURCE,
        },
    ]);
    assert.equal(ClarificationsStepUtils.countNotAnsweredOnPlan(beforeRun), 2);

    const afterRun = ClarificationsStepUtils.toClarificationRows([
        {
            id: "q1",
            label: "Ceiling height?",
            position: 0,
            answer: "2.4m",
            answerSource: AI_SUGGESTED_ANSWER_SOURCE,
        },
        {
            id: "q2",
            label: "Wall type?",
            position: 1,
            answer: null,
            answerSource: MANUAL_ANSWER_SOURCE,
        },
    ]);
    assert.equal(ClarificationsStepUtils.countNotAnsweredOnPlan(afterRun), 1);
});

test("nextPositionAfter appends after the highest existing position, and starts at 0 when empty", () => {
    assert.equal(ClarificationsStepUtils.nextPositionAfter([]), 0);

    const rows = ClarificationsStepUtils.toClarificationRows([
        {
            id: "q1",
            label: "Ceiling height?",
            position: 0,
            answer: null,
            answerSource: MANUAL_ANSWER_SOURCE,
        },
        {
            id: "q2",
            label: "Wall type?",
            position: 3,
            answer: null,
            answerSource: MANUAL_ANSWER_SOURCE,
        },
    ]);
    assert.equal(ClarificationsStepUtils.nextPositionAfter(rows), 4);
});

test("buildBatchApplyTemplateVariables fills fixed slots starting at the given position", () => {
    const result = ClarificationsStepUtils.buildBatchApplyTemplateVariables(
        "project-1",
        "template-1",
        [{ label: "Ceiling height?" }, { label: "Wall type?" }],
        2,
    );

    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.deepEqual(result.variables, {
        projectId: "project-1",
        sourceTemplateId: "template-1",
        includeQuestion1: true,
        question1Label: "Ceiling height?",
        question1Position: 2,
        includeQuestion2: true,
        question2Label: "Wall type?",
        question2Position: 3,
    });
});

test("buildBatchApplyTemplateVariables refuses a template with more than 20 questions", () => {
    const questions = Array.from({ length: 21 }, (_, index) => ({
        label: `Question ${String(index + 1)}`,
    }));

    const result = ClarificationsStepUtils.buildBatchApplyTemplateVariables(
        "project-1",
        "template-1",
        questions,
        0,
    );

    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.reason, "TOO_MANY_QUESTIONS");
});
