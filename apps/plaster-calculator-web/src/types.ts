import type { SalesStatus } from "@libraries/plaster-calculator-common";

export type ProjectSummary = {
    id: string;
    companyId: string | null;
    companyName?: string | null;
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
    teamId?: string | null;
    assignee?: string | null;
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
    teamId?: string | null;
    assignee?: string | null;
    pages: FloorplanPage[];
};

export type CompanyContactPayload = {
    name?: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
};

export type CompanyContact = {
    id: string;
    companyId: string;
    name: string;
    email: string | null;
    phoneNumber: string | null;
    role: string | null;
    createdAt: string;
    updatedAt: string;
};

export type CompanySummary = {
    id: string;
    teamId?: string | null;
    companyName: string;
    businessNumber: string | null;
    phoneNumber: string | null;
    primaryContactId: string | null;
    createdAt: string;
    updatedAt: string;
};

export type CompanyDetail = CompanySummary & {
    contacts: CompanyContact[];
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
    teamId?: string | null;
    projectId: string;
    companyId: string | null;
    assignee: string | null;
    name: string;
    status: "OPEN" | "DONE" | "CANCELLED";
    dueAt: string;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
};
