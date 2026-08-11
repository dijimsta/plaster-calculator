import type {
    AreaPolygon,
    FloorplanPage,
    Point,
    ProjectDetail,
    ReadinessQuestionnaireAnswer,
    ReadinessQuoteItemTemplateConfig,
} from "../../src/index.ts";
import { MANUAL_ANSWER_SOURCE } from "../../src/index.ts";

export const SQUARE_100PX: Point[] = [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
];

let nextId = 0;

function uniqueId(prefix: string): string {
    nextId += 1;
    return `${prefix}-${nextId}`;
}

export function area(overrides: Partial<AreaPolygon> = {}): AreaPolygon {
    return {
        id: uniqueId("area"),
        label: "Room",
        points: SQUARE_100PX,
        wallBoardType: "10mm Plasterboard",
        ceilingPlasterType: "Standard",
        ceilingHeightMm: 2400,
        source: "detected",
        deleted: false,
        ...overrides,
    };
}

export function overlayJson(areas: AreaPolygon[]): string {
    return JSON.stringify({ areas });
}

export function page(overrides: Partial<FloorplanPage> = {}): FloorplanPage {
    return {
        id: uniqueId("page"),
        pageNumber: 1,
        status: "READY",
        processingError: null,
        imageUrl: "https://example.test/image.png",
        previewUrl: "https://example.test/preview.png",
        overlay: overlayJson([area()]),
        scaleMmPerPx: 5,
        ceilingHeightMm: 2400,
        referencePoints: null,
        referenceLengthMm: null,
        updatedAt: "2026-08-11T00:00:00.000Z",
        ...overrides,
    };
}

export function project(
    pages: FloorplanPage[],
    overrides: Partial<ProjectDetail> = {},
): ProjectDetail {
    return {
        id: uniqueId("project"),
        companyId: null,
        name: "Test project",
        address: null,
        originalFileName: "plan.pdf",
        uploadType: "PDF",
        status: "READY",
        salesStatus: "QUOTING",
        createdAt: "2026-08-11T00:00:00.000Z",
        updatedAt: "2026-08-11T00:00:00.000Z",
        pageCount: pages.length,
        pages,
        ...overrides,
    };
}

export function quoteItemTemplateConfig(
    overrides: Partial<ReadinessQuoteItemTemplateConfig> = {},
): ReadinessQuoteItemTemplateConfig {
    return {
        quoteItemTemplateId: uniqueId("template"),
        enabled: true,
        unitPriceCents: 1000,
        quantitySourceId: "WALL_AREA",
        ...overrides,
    };
}

export function questionnaireAnswer(
    overrides: Partial<ReadinessQuestionnaireAnswer> = {},
): ReadinessQuestionnaireAnswer {
    return {
        questionId: uniqueId("question"),
        answer: "Yes",
        answerSource: MANUAL_ANSWER_SOURCE,
        ...overrides,
    };
}
