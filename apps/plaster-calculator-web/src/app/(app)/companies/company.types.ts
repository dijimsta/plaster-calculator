import type { RefObject } from "react";

import type { CompanyContact } from "../../../types.js";

export type CompanyDraft = {
    readonly companyName: string;
    readonly businessNumber: string;
    readonly phoneNumber: string;
};

export type CompanyDetailDraft = CompanyDraft & {
    readonly primaryContactId: string;
};

export type ContactDraft = {
    readonly name: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly role: string;
    readonly makePrimary: boolean;
};

export type CompanyDraftFieldsProps = {
    readonly draft: CompanyDraft;
    readonly setDraft: (draft: CompanyDraft) => void;
    /** Focuses the company name field on mount, e.g. when the draft was
     * seeded from a Companies-page search that found no match. */
    readonly nameInputRef?: RefObject<HTMLInputElement | null>;
};

export type CompanyDetailFieldsProps = {
    readonly contacts: readonly CompanyContact[];
    readonly draft: CompanyDetailDraft;
    readonly setDraft: (draft: CompanyDetailDraft) => void;
};

export type ContactFieldsProps = {
    readonly draft: ContactDraft;
    readonly setDraft: (draft: ContactDraft) => void;
    readonly showPrimaryCheckbox?: boolean;
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
