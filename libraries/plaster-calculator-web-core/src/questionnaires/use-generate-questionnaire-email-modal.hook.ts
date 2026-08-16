"use client";

import { EmailTemplateBuilder } from "@libraries/plaster-calculator-common";
import type {
    EmailTemplate,
    UserSignature,
} from "@libraries/plaster-calculator-common";
import { useEffect, useState } from "react";

import { useCompaniesService } from "../companies/companies.hooks.ts";
import type { CompaniesService } from "../companies/companies.service.ts";
import type {
    CompanyContact,
    CompanyDetail,
} from "../companies/companies.types.ts";
import { useUserSignature } from "../users/user-signature.hook.ts";

import type {
    GenerateQuestionnaireEmailModalState,
    QuestionnaireEmailClarification,
} from "./questionnaire-email-modal.types.ts";

function getUnansweredClarifications(
    clarifications: readonly QuestionnaireEmailClarification[],
): readonly QuestionnaireEmailClarification[] {
    return clarifications.filter(
        (clarification) => !clarification.answer?.trim(),
    );
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
    unansweredClarifications: readonly QuestionnaireEmailClarification[],
    contact: CompanyContact | undefined,
): EmailTemplate | null {
    if (!signature) return null;
    return new EmailTemplateBuilder(signature.signature).build(
        unansweredClarifications,
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

/**
 * Builds the scope-of-work email preview (subject/body/mailto href) and the
 * open/close state for its preview modal. Only unanswered clarifications are
 * listed in the body; a project with no company attached simply yields an
 * empty recipient — the draft still opens. Whether the affordance that opens
 * this modal is enabled or visible is left entirely to the caller.
 */
export function useGenerateQuestionnaireEmailModal(
    companyId: string | null,
    clarifications: readonly QuestionnaireEmailClarification[],
): GenerateQuestionnaireEmailModalState {
    const companiesService = useCompaniesService();
    const [isOpen, setOpen] = useState(false);
    const company = useCompanyForEmail(companyId, companiesService);
    const { signature } = useUserSignature();

    const unansweredClarifications =
        getUnansweredClarifications(clarifications);
    const contact = findPrimaryContact(company);
    const content = buildEmailContent(
        signature,
        unansweredClarifications,
        contact,
    );

    return {
        isOpen,
        subject: content?.subject ?? "",
        body: content?.body ?? "",
        mailtoHref: buildMailtoHref(contact, content),
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
    };
}
