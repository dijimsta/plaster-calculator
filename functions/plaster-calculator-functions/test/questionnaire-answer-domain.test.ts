import assert from "node:assert/strict";
import test from "node:test";

import type { AnswerQuestionnaireInput } from "../src/ai/flows/answer-questionnaire.ts";
import type { RoomSummary } from "../src/ai/room-summary.ts";
import {
    createAnswerQuestionnaireService,
    MAX_TEXT_CHARACTERS,
} from "../src/questionnaire-answer-domain.ts";
import type {
    AnswerQuestionnaireDependencies,
    QuestionnaireQuestion,
} from "../src/questionnaire-answer-domain.ts";
import type { ProjectWithPages } from "../src/types.ts";

type FakePage = ProjectWithPages["pages"][number];

function projectFixture(
    overrides: Partial<ProjectWithPages> = {},
): ProjectWithPages {
    return {
        id: "project-1",
        teamId: "team-1",
        name: "Test Project",
        originalFileName: "plan.pdf",
        uploadType: "PDF",
        originalPath: "gs://bucket/plan.pdf",
        status: "READY",
        salesStatus: "ACTIVE",
        pageCount: 0,
        extractedTextJson: null,
        createdAt: "2026-08-01T00:00:00.000Z",
        updatedAt: "2026-08-01T00:00:00.000Z",
        pages: [],
        ...overrides,
    } as unknown as ProjectWithPages;
}

function analyzedPage(overrides: Partial<FakePage> = {}): FakePage {
    return {
        id: "page-1",
        pageNumber: 1,
        status: "READY",
        overlayJson: null,
        scaleMmPerPx: 10,
        ceilingHeightMm: 2400,
        ocrTextContent: "KITCHEN",
        ...overrides,
    } as unknown as FakePage;
}

function roomSummary(overrides: Partial<RoomSummary> = {}): RoomSummary {
    return {
        label: "Kitchen",
        roomType: "Kitchen",
        isWetArea: false,
        ceilingAreaM2: 12,
        wallAreaM2ByType: {},
        ceilingHeightMm: 2400,
        ceilingMode: "flat",
        ...overrides,
    };
}

function createDependencies(
    overrides: Partial<AnswerQuestionnaireDependencies> = {},
): AnswerQuestionnaireDependencies {
    return {
        getProject: async () => projectFixture(),
        getQuestions: async (): Promise<QuestionnaireQuestion[]> => [
            { id: "q1", label: "How many bedrooms?" },
        ],
        ensurePagesAnalyzed: async (project) => project,
        resolveExtractedText: async () => "",
        buildRoomSummaries: () => [],
        generate: async () => ({ answers: [] }),
        updateAnswer: async () => undefined,
        ...overrides,
    };
}

test("requires at least one question before auto-filling", async () => {
    const service = createAnswerQuestionnaireService(
        createDependencies({ getQuestions: async () => [] }),
    );

    await assert.rejects(
        service.run("project-1", "user-1"),
        hasErrorCode("failed-precondition"),
    );
});

test("answers from plan text alone when there are no pages yet, with an honest updatedCount", async () => {
    const generateCalls: AnswerQuestionnaireInput[] = [];
    const updates: { questionId: string; answer: string }[] = [];
    let ensureCalls = 0;
    const service = createAnswerQuestionnaireService(
        createDependencies({
            getProject: async () => projectFixture({ pages: [] }),
            getQuestions: async () => [
                { id: "q1", label: "How many bedrooms?" },
                { id: "q2", label: "Is there a garage?" },
            ],
            ensurePagesAnalyzed: async (project) => {
                ensureCalls += 1;
                return project;
            },
            resolveExtractedText: async () =>
                "3 bedroom house with attached garage.",
            generate: async (input) => {
                generateCalls.push(input);
                return {
                    answers: [
                        { questionId: "q1", answer: "3" },
                        { questionId: "q2", answer: null },
                    ],
                };
            },
            updateAnswer: async (questionId, answer) => {
                updates.push({ questionId, answer });
            },
        }),
    );

    const result = await service.run("project-1", "user-1");

    assert.deepEqual(result, { updatedCount: 1 });
    assert.deepEqual(updates, [{ questionId: "q1", answer: "3" }]);
    assert.equal(ensureCalls, 0);
    assert.equal(generateCalls.length, 1);
    assert.equal(generateCalls[0]?.hasPages, false);
    assert.equal(generateCalls[0]?.rooms, undefined);
    assert.equal(generateCalls[0]?.ocrText, "");
    assert.equal(
        generateCalls[0]?.pdfText,
        "3 bedroom house with attached garage.",
    );
});

test("keeps pages-present behaviour unchanged: analyzes pages and prefers room summaries", async () => {
    const page = analyzedPage();
    const analyzedProject = projectFixture({ pages: [page] });
    let ensureCalls = 0;
    let roomSummaryCalls = 0;
    const generateCalls: AnswerQuestionnaireInput[] = [];
    const service = createAnswerQuestionnaireService(
        createDependencies({
            getProject: async () => projectFixture({ pages: [page] }),
            ensurePagesAnalyzed: async () => {
                ensureCalls += 1;
                return analyzedProject;
            },
            resolveExtractedText: async () => "Spec notes.",
            buildRoomSummaries: (project) => {
                roomSummaryCalls += 1;
                assert.equal(project, analyzedProject);
                return [roomSummary()];
            },
            generate: async (input) => {
                generateCalls.push(input);
                return { answers: [{ questionId: "q1", answer: "1" }] };
            },
        }),
    );

    const result = await service.run("project-1", "user-1");

    assert.deepEqual(result, { updatedCount: 1 });
    assert.equal(ensureCalls, 1);
    assert.equal(roomSummaryCalls, 1);
    assert.equal(generateCalls.length, 1);
    const input = generateCalls[0];
    assert.equal(input?.hasPages, true);
    assert.equal(input?.ocrText, "KITCHEN");
    assert.equal(input?.pdfText, "Spec notes.");
    assert.equal(input?.rooms?.length, 1);
    assert.equal(input?.rooms?.[0]?.label, "Kitchen");
});

test("returns zero answers without calling the model for a non-PDF upload with no extractable text", async () => {
    let generateCalled = false;
    const service = createAnswerQuestionnaireService(
        createDependencies({
            getProject: async () =>
                projectFixture({ pages: [], uploadType: "IMAGE" }),
            resolveExtractedText: async () => "",
            generate: async () => {
                generateCalled = true;
                return { answers: [] };
            },
        }),
    );

    const result = await service.run("project-1", "user-1");

    assert.deepEqual(result, { updatedCount: 0 });
    assert.equal(generateCalled, false);
});

test("truncates plan text sent to the model when there are no pages yet", async () => {
    const longText = "x".repeat(MAX_TEXT_CHARACTERS + 500);
    const generateCalls: AnswerQuestionnaireInput[] = [];
    const service = createAnswerQuestionnaireService(
        createDependencies({
            getProject: async () => projectFixture({ pages: [] }),
            resolveExtractedText: async () => longText,
            generate: async (input) => {
                generateCalls.push(input);
                return { answers: [] };
            },
        }),
    );

    await service.run("project-1", "user-1");

    assert.equal(generateCalls[0]?.pdfText.length, MAX_TEXT_CHARACTERS);
});

test("wraps an unexpected model failure as an internal error", async () => {
    const service = createAnswerQuestionnaireService(
        createDependencies({
            getProject: async () => projectFixture({ pages: [] }),
            resolveExtractedText: async () => "some plan text",
            generate: async () => {
                throw new Error("boom");
            },
        }),
    );

    await assert.rejects(
        service.run("project-1", "user-1"),
        hasErrorCode("internal"),
    );
});

function hasErrorCode(code: string) {
    return (error: unknown) =>
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === code;
}
