import type {
    CompanyContactFormValues,
    CompanyDetailFormValues,
} from "@libraries/plaster-calculator-ui";
import type { RefObject } from "react";

export type CompanyDraft = {
    readonly companyName: string;
    readonly businessNumber: string;
    readonly phoneNumber: string;
};

export type CompanyDetailDraft = CompanyDetailFormValues;

export type ContactDraft = CompanyContactFormValues;

export type CompanyDraftFieldsProps = {
    readonly draft: CompanyDraft;
    readonly setDraft: (draft: CompanyDraft) => void;
    /** Focuses the company name field on mount, e.g. when the draft was
     * seeded from a Companies-page search that found no match. */
    readonly nameInputRef?: RefObject<HTMLInputElement | null>;
};

export const EMPTY_ACCOUNT_DRAFT: CompanyDraft = {
    companyName: "",
    businessNumber: "",
    phoneNumber: "",
};

export const EMPTY_CONTACT_DRAFT: ContactDraft = {
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    makePrimary: false,
};
