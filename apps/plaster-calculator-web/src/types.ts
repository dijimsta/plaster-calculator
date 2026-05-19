export type ProjectSummary = {
    id: string;
    accountId: string | null;
    name: string;
    address: string | null;
    originalFileName: string;
    uploadType: "PDF" | "IMAGE";
    status: string;
    salesStatus: "QUOTING" | "QUOTE_SUBMITTED" | "WON" | "LOST";
    processingError?: string | null;
    createdAt: string;
    updatedAt: string;
    pageCount: number;
};

export type FloorplanPage = {
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

export type ProjectDetail = ProjectSummary & {
    ownerId?: string | null;
    pages: FloorplanPage[];
};

export type AccountContact = {
    id: string;
    accountId: string;
    name: string;
    email: string | null;
    phoneNumber: string | null;
    role: string | null;
    createdAt: string;
    updatedAt: string;
};

export type AccountSummary = {
    id: string;
    ownerId?: string | null;
    companyName: string;
    businessNumber: string | null;
    phoneNumber: string | null;
    primaryContactId: string | null;
    createdAt: string;
    updatedAt: string;
};

export type AccountDetail = AccountSummary & {
    contacts: AccountContact[];
};

export type UserSettings = {
    ownerId: string;
    quoteFollowUpEnabled: boolean;
    quoteFollowUpDays: number;
    createdAt: string | null;
    updatedAt: string | null;
};

export type Reminder = {
    id: string;
    ownerId?: string | null;
    projectId: string;
    accountId: string | null;
    name: string;
    status: "OPEN" | "DONE" | "CANCELLED";
    dueAt: string;
    completedAt: string | null;
    autoCreated: boolean;
    createdAt: string;
    updatedAt: string;
    project?: {
        id: string;
        name: string;
    };
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
