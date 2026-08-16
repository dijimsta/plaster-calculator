import assert from "node:assert/strict";
import test from "node:test";

import { ClarificationsStepService } from "../../src/questionnaires/clarifications-step.service.ts";
import type {
    ClarificationRow,
    ClarificationsStepDependencies,
} from "../../src/questionnaires/clarifications-step.types.ts";
import type { QuestionnairesService } from "../../src/questionnaires/questionnaires.service.ts";

function rowFixture(
    overrides: Partial<ClarificationRow> = {},
): ClarificationRow {
    return {
        id: "row-1",
        label: "Ceiling height?",
        position: 0,
        answer: null,
        answerSource: "MANUAL",
        status: "ASK_BUILDER",
        ...overrides,
    };
}

function dependenciesFixture(calls: unknown[]): ClarificationsStepDependencies {
    return {
        getTemplateQuestions: async (templateId: string) => {
            calls.push({ getTemplateQuestions: templateId });
            return [{ label: "Wall type?" }, { label: "Wet area finish?" }];
        },
        batchApplyTemplate: async (variables) => {
            calls.push({ batchApplyTemplate: variables });
        },
        ensureQuestionnaire: async (projectId: string) => {
            calls.push({ ensureQuestionnaire: projectId });
        },
        createQuestion: async (input) => {
            calls.push({ createQuestion: input });
        },
        updateQuestionLabel: async (input) => {
            calls.push({ updateQuestionLabel: input });
        },
        deleteQuestion: async (input) => {
            calls.push({ deleteQuestion: input });
        },
        refresh: async () => {
            calls.push({ refresh: true });
        },
    };
}

test("applyTemplate reads the template, batch-applies starting after existing rows, then refreshes", async () => {
    const calls: unknown[] = [];
    const dependencies = dependenciesFixture(calls);
    const service = new ClarificationsStepService(dependencies);
    const existingRows = [rowFixture({ id: "row-1", position: 0 })];

    await service.applyTemplate("project-1", "template-1", existingRows);

    assert.deepEqual(calls, [
        { getTemplateQuestions: "template-1" },
        {
            batchApplyTemplate: {
                projectId: "project-1",
                sourceTemplateId: "template-1",
                includeQuestion1: true,
                question1Label: "Wall type?",
                question1Position: 1,
                includeQuestion2: true,
                question2Label: "Wet area finish?",
                question2Position: 2,
            },
        },
        { refresh: true },
    ]);
});

test("applyTemplate rejects without applying or refreshing when the template has too many questions", async () => {
    const calls: unknown[] = [];
    const dependencies: ClarificationsStepDependencies = {
        ...dependenciesFixture(calls),
        getTemplateQuestions: async () =>
            Array.from({ length: 21 }, (_, index) => ({
                label: `Question ${String(index + 1)}`,
            })),
    };
    const service = new ClarificationsStepService(dependencies);

    await assert.rejects(
        service.applyTemplate("project-1", "template-1", []),
        /TOO_MANY_QUESTIONS|only supports/,
    );
    assert.deepEqual(
        calls.filter(
            (call) =>
                typeof call === "object" &&
                call !== null &&
                ("batchApplyTemplate" in call || "refresh" in call),
        ),
        [],
    );
});

test("addRow ensures the questionnaire exists, creates the row after existing ones, then refreshes", async () => {
    const calls: unknown[] = [];
    const dependencies = dependenciesFixture(calls);
    const service = new ClarificationsStepService(dependencies);
    const existingRows = [rowFixture({ id: "row-1", position: 0 })];

    await service.addRow("project-1", existingRows, "New clarification?");

    assert.equal(calls.length, 3);
    assert.deepEqual(calls[0], { ensureQuestionnaire: "project-1" });
    const createCall = calls[1] as { createQuestion: Record<string, unknown> };
    assert.equal(createCall.createQuestion.projectId, "project-1");
    assert.equal(createCall.createQuestion.label, "New clarification?");
    assert.equal(createCall.createQuestion.position, 1);
    assert.equal(typeof createCall.createQuestion.id, "string");
    assert.deepEqual(calls[2], { refresh: true });
});

test("editRowLabel updates the label while keeping the row's position, then refreshes", async () => {
    const calls: unknown[] = [];
    const dependencies = dependenciesFixture(calls);
    const service = new ClarificationsStepService(dependencies);
    const row = rowFixture({ id: "row-2", position: 3 });

    await service.editRowLabel("project-1", row, "Updated label");

    assert.deepEqual(calls, [
        {
            updateQuestionLabel: {
                id: "row-2",
                projectId: "project-1",
                label: "Updated label",
                position: 3,
            },
        },
        { refresh: true },
    ]);
});

test("removeRow deletes the row then refreshes", async () => {
    const calls: unknown[] = [];
    const dependencies = dependenciesFixture(calls);
    const service = new ClarificationsStepService(dependencies);
    const row = rowFixture({ id: "row-3" });

    await service.removeRow("project-1", row);

    assert.deepEqual(calls, [
        { deleteQuestion: { id: "row-3", projectId: "project-1" } },
        { refresh: true },
    ]);
});

test("runFindAnswersOnPlan refreshes on success and returns the AI result", async () => {
    const calls: unknown[] = [];
    const dependencies = dependenciesFixture(calls);
    const questionnairesService = {
        answerQuestionnaireWithAI: async (projectId: string) => {
            calls.push({ answerQuestionnaireWithAI: projectId });
            return { updatedCount: 2 };
        },
    } as QuestionnairesService;
    const service = new ClarificationsStepService(
        dependencies,
        questionnairesService,
    );

    const result = await service.runFindAnswersOnPlan("project-1");

    assert.deepEqual(result, { updatedCount: 2 });
    assert.deepEqual(calls, [
        { answerQuestionnaireWithAI: "project-1" },
        { refresh: true },
    ]);
});

test("runFindAnswersOnPlan does not refresh on failure, so existing rows survive", async () => {
    const calls: unknown[] = [];
    const dependencies = dependenciesFixture(calls);
    const failure = new Error("AI auto-fill failed");
    const questionnairesService = {
        answerQuestionnaireWithAI: async () => {
            calls.push({ answerQuestionnaireWithAI: true });
            throw failure;
        },
    } as QuestionnairesService;
    const service = new ClarificationsStepService(
        dependencies,
        questionnairesService,
    );

    await assert.rejects(service.runFindAnswersOnPlan("project-1"), failure);
    assert.deepEqual(calls, [{ answerQuestionnaireWithAI: true }]);
});
