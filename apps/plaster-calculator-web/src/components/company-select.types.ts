import type { FormEvent } from "react";

import type { CompanyDetail, CompanySummary } from "../types.js";

export interface CompanySelectProps {
    readonly selectedCompanyId: string | null;
    readonly onChange: (companyId: string | null) => void;
    readonly disabled?: boolean;
    readonly label?: string;
    readonly placeholder?: string;
    readonly selectedCompanyLabel?: string | null;
    readonly onCreated?: (company: CompanyDetail) => void;
    /**
     * Fires whenever an inline company creation starts or finishes. Callers
     * that submit their own form around this component (e.g. the upload
     * form) can use this to hold off submitting until an in-flight create
     * has resolved and its id has landed via `onChange`/`onCreated`.
     */
    readonly onCreatePendingChange?: (isPending: boolean) => void;
}

export interface CompanySelectMenuProps {
    readonly error: string;
    readonly filtered: readonly CompanySummary[];
    readonly isLoading: boolean;
    readonly onSelect: (company: CompanySummary) => void;
    readonly onStartCreate: () => void;
}

export type CompanyCreateDraft = {
    readonly companyName: string;
    readonly businessNumber: string;
    readonly phoneNumber: string;
};

export interface CompanyCreatePanelProps {
    readonly draft: CompanyCreateDraft;
    readonly setDraft: (draft: CompanyCreateDraft) => void;
    readonly error: string;
    readonly isSubmitting: boolean;
    readonly suggestions: readonly CompanySummary[];
    readonly onSubmit: (event: FormEvent) => void;
    readonly onUseSuggestion: (company: CompanySummary) => void;
    readonly onCancel: () => void;
}

export const EMPTY_CREATE_DRAFT: CompanyCreateDraft = {
    companyName: "",
    businessNumber: "",
    phoneNumber: "",
};
