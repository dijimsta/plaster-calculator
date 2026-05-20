import type { AccountContact } from "../../../types.js";

export interface AccountDraft {
    readonly companyName: string;
    readonly businessNumber: string;
    readonly phoneNumber: string;
}

export interface AccountDetailDraft extends AccountDraft {
    readonly primaryContactId: string;
}

export interface ContactDraft {
    readonly name: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly role: string;
    readonly makePrimary: boolean;
}

export interface AccountDraftFieldsProps {
    readonly draft: AccountDraft;
    readonly setDraft: (draft: AccountDraft) => void;
}

export interface AccountDetailFieldsProps {
    readonly contacts: readonly AccountContact[];
    readonly draft: AccountDetailDraft;
    readonly setDraft: (draft: AccountDetailDraft) => void;
}

export interface ContactFieldsProps {
    readonly draft: ContactDraft;
    readonly setDraft: (draft: ContactDraft) => void;
    readonly showPrimaryCheckbox?: boolean;
}

export const EMPTY_ACCOUNT_DRAFT: AccountDraft = {
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
