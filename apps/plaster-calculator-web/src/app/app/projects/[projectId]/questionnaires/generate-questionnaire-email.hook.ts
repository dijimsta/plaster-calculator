import { EmailTemplateBuilder } from "@libraries/plaster-calculator-common";
import { useUserSignature } from "@libraries/plaster-calculator-web-core";
import { useEffect, useState } from "react";

import { getAccount } from "../../../../../lib/api.js";

import type { ProjectQuestionnaireQuestion } from "./page.hooks.js";
import type { AccountContact, AccountDetail } from "../../../../../types.js";
import type {
    EmailTemplate,
    UserSignature,
} from "@libraries/plaster-calculator-common";

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

function useAccountForEmail(accountId: string | null): AccountDetail | null {
    const [account, setAccount] = useState<AccountDetail | null>(null);

    useEffect(() => {
        if (!accountId) {
            setAccount(null);
            return;
        }
        let cancelled = false;
        void getAccount(accountId).then((detail) => {
            if (!cancelled) setAccount(detail);
        });
        return () => {
            cancelled = true;
        };
    }, [accountId]);

    return account;
}

function findPrimaryContact(
    account: AccountDetail | null,
): AccountContact | undefined {
    if (!account) return undefined;
    return account.contacts.find(
        (item) => item.id === account.primaryContactId,
    );
}

function buildEmailContent(
    signature: UserSignature | undefined,
    unansweredQuestions: readonly ProjectQuestionnaireQuestion[],
    contact: AccountContact | undefined,
): EmailTemplate | null {
    if (!signature) return null;
    return new EmailTemplateBuilder(signature.signature).build(
        unansweredQuestions,
        contact?.name,
    );
}

function buildMailtoHref(
    contact: AccountContact | undefined,
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
    accountId: string | null,
    questions: readonly ProjectQuestionnaireQuestion[],
): GenerateQuestionnaireEmailModalState {
    const [isOpen, setOpen] = useState(false);
    const account = useAccountForEmail(accountId);
    const { signature } = useUserSignature();

    const unansweredQuestions = getUnansweredQuestions(questions);
    const contact = findPrimaryContact(account);
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
