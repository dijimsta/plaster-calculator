import type {
    AreaPolygon,
    FloorplanPage,
    Point,
    ProjectDetail,
    ReadinessCompany,
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
        label: "Skim coat",
        enabled: true,
        unitPriceCents: 1000,
        unit: "ea",
        quantitySourceId: "WALL_AREA",
        ...overrides,
    };
}

export function questionnaireAnswer(
    overrides: Partial<ReadinessQuestionnaireAnswer> = {},
): ReadinessQuestionnaireAnswer {
    return {
        questionId: uniqueId("question"),
        label: "Is the ceiling raked?",
        answer: "Yes",
        answerSource: MANUAL_ANSWER_SOURCE,
        ...overrides,
    };
}

export function company(
    overrides: Partial<ReadinessCompany> = {},
): ReadinessCompany {
    return {
        id: uniqueId("company"),
        companyName: "Acme Plastering",
        phoneNumber: "555-0100",
        businessNumber: null,
        primaryContactName: null,
        primaryContactEmail: null,
        primaryContactPhone: null,
        ...overrides,
    };
}
