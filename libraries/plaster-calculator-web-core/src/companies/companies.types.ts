export type {
    CompanyContact,
    CompanyDetail,
    CompanySummary,
} from "@libraries/plaster-calculator-common";

export type CompanyPayload = {
    companyName?: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
};

export type CompanyContactPayload = {
    name?: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    makePrimary?: boolean;
};
