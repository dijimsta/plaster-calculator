import type { SalesStatus } from "@libraries/plaster-calculator-common";

export type ProjectSummary = {
    id: string;
    accountId: string | null;
    accountCompanyName?: string | null;
    name: string;
    address: string | null;
    originalFileName: string;
    uploadType: "PDF" | "IMAGE";
    status: string;
    salesStatus: SalesStatus;
    processingError?: string | null;
    createdAt: string;
    updatedAt: string;
    pageCount: number;
};

export type FloorplanPage = {
    id: string;
    pageNumber: number;
    status: string;
    processingError: string | null;
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

export type AccountContactPayload = {
    name?: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
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
    createdAt: string;
    updatedAt: string;
};
