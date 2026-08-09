import { EmailTemplateBuilder } from "@libraries/plaster-calculator-common";
import type {
    EmailTemplate,
    UserSignature,
} from "@libraries/plaster-calculator-common";
import {
    useCompaniesService,
    useUserSignature,
} from "@libraries/plaster-calculator-web-core";
import type { CompaniesService } from "@libraries/plaster-calculator-web-core";
import { useEffect, useState } from "react";

import type { CompanyContact, CompanyDetail } from "../../../../../types.js";

import type { ProjectQuestionnaireQuestion } from "./page.hooks.js";

export interface GenerateQuestionnaireEmailModalState {
    readonly isOpen: boolean;
    readonly disabled: boolean;
    readonly subject: string;
    readonly body: string;
    readonly mailtoHref: string;
    readonly openModal: () => void;
    readonly closeModal: () => void;
}

function getUnansweredQuestions(
    questions: readonly ProjectQuestionnaireQuestion[],
): readonly ProjectQuestionnaireQuestion[] {
    return questions.filter((question) => !question.answer?.trim());
}

function useCompanyForEmail(
    companyId: string | null,
    companiesService: CompaniesService,
): CompanyDetail | null {
    const [company, setCompany] = useState<CompanyDetail | null>(null);

    useEffect(() => {
        if (!companyId) {
            setCompany(null);
            return;
        }
        let cancelled = false;
        void companiesService.getCompany(companyId).then((detail) => {
            if (!cancelled) setCompany(detail);
        });
        return () => {
            cancelled = true;
        };
    }, [companyId, companiesService]);

    return company;
}

function findPrimaryContact(
    company: CompanyDetail | null,
): CompanyContact | undefined {
    if (!company) return undefined;
    return company.contacts.find(
        (item) => item.id === company.primaryContactId,
    );
}

function buildEmailContent(
    signature: UserSignature | undefined,
    unansweredQuestions: readonly ProjectQuestionnaireQuestion[],
    contact: CompanyContact | undefined,
): EmailTemplate | null {
    if (!signature) return null;
    return new EmailTemplateBuilder(signature.signature).build(
        unansweredQuestions,
        contact?.name,
    );
}

function buildMailtoHref(
    contact: CompanyContact | undefined,
    content: EmailTemplate | null,
): string {
    if (!content) return "";
    const query = [
        `subject=${encodeURIComponent(content.subject)}`,
        `body=${encodeURIComponent(content.body)}`,
    ].join("&");
    return `mailto:${contact?.email ?? ""}?${query}`;
}

export function useGenerateQuestionnaireEmailModal(
    companyId: string | null,
    questions: readonly ProjectQuestionnaireQuestion[],
): GenerateQuestionnaireEmailModalState {
    const companiesService = useCompaniesService();
    const [isOpen, setOpen] = useState(false);
    const company = useCompanyForEmail(companyId, companiesService);
    const { signature } = useUserSignature();

    const unansweredQuestions = getUnansweredQuestions(questions);
    const contact = findPrimaryContact(company);
    const content = buildEmailContent(signature, unansweredQuestions, contact);

    return {
        isOpen,
        disabled: unansweredQuestions.length === 0 || !content,
        subject: content?.subject ?? "",
        body: content?.body ?? "",
        mailtoHref: buildMailtoHref(contact, content),
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
    };
}
