export type PlanSummary = {
    id: string;
    name: string;
    originalFileName: string;
    uploadType: "PDF" | "IMAGE";
    status: string;
    processingError?: string | null;
    createdAt: string;
    updatedAt: string;
    pageCount: number;
};

export type PlanPage = {
    id: string;
    pageNumber: number;
    status: string;
    imageUrl: string;
    previewUrl: string;
    overlay: string | null;
    scaleMmPerPx: number | null;
    ceilingHeightMm: number | null;
    referencePoints: string | null;
    referenceLengthMm: number | null;
    processingStrategy?: string | null;
    processingMetadata?: string | null;
    updatedAt: string;
};

export type PlanDetail = PlanSummary & {
    ownerId?: string | null;
    pages: PlanPage[];
};

export type PdfPagePreview = {
    pageNumber: number;
    previewUrl: string;
};

export type ProcessingStrategyInfo = {
    key: string;
    label: string;
    description: string;
    defaultStrategy: boolean;
};

export type Point = [number, number];

export type EdgeOverride = {
    wallPlasterType?: string;
    noPlaster?: boolean;
};

export type RakedCeiling = {
    lowEdgeIndex: number;
    highEdgeIndex: number;
    lowHeightMm: number | null;
    highHeightMm: number | null;
};

export type AreaPolygon = {
    id: string;
    label: string;
    points: Point[];
    wallPlasterType: string;
    ceilingPlasterType: string;
    edgeOverrides?: Record<string, EdgeOverride>;
    ceilingHeightMm?: number | null;
    ceilingMode?: "flat" | "raked";
    rakedCeiling?: RakedCeiling;
    isOutdoor?: boolean;
    source: "detected" | "manual";
    deleted: boolean;
    sourceRoomType?: string | null;
    sourceAreaPx?: number;
    sourceApproxLengthPx?: number;
    sourceIsHole?: boolean;
};

export type Overlay = {
    sourceFile?: string;
    imageSizePx?: { width: number; height: number };
    areas: AreaPolygon[];
};
