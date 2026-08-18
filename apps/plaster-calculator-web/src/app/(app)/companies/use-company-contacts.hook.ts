"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useState, type FormEvent } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import type { CompanyContact, CompanyDetail } from "../../../types.js";

import { EMPTY_CONTACT_DRAFT, type ContactDraft } from "./company.types.js";
import { optionalValue, toContactDraft } from "./company.utils.js";

export type UseCompanyContactsResult = {
    readonly contactDraft: ContactDraft;
    readonly editContactId: string | null;
    readonly editContactDraft: ContactDraft;
    readonly isContactModalOpen: boolean;
    readonly setContactDraft: (draft: ContactDraft) => void;
    readonly setEditContactDraft: (draft: ContactDraft) => void;
    readonly addContact: (event: FormEvent) => Promise<void>;
    readonly startEditContact: (contactId: string) => void;
    readonly cancelEditContact: () => void;
    readonly saveContact: (contactId: string) => void;
    readonly removeContact: (contact: CompanyContact) => void;
    readonly openContactModal: () => void;
    readonly closeContactModal: () => void;
};

type UseCompanyContactsParams = {
    readonly companyId: string;
    readonly contacts: readonly CompanyContact[];
    readonly onCompanyUpdated: (updated: CompanyDetail) => void;
    readonly setBusyMessage: (message: string) => void;
    readonly setMessage: (message: string) => void;
};

/** Every contact CRUD concern the company detail page needs, split out of `useCompanyDetail` to keep that file under this workspace's max-lines limit. */
export function useCompanyContacts({
    companyId,
    contacts,
    onCompanyUpdated,
    setBusyMessage,
    setMessage,
}: UseCompanyContactsParams): UseCompanyContactsResult {
    const companiesService = useCompaniesService();
    const { notify } = useNotificationsManager();
    const { t } = useAppTranslation();
    const [contactDraft, setContactDraft] =
        useState<ContactDraft>(EMPTY_CONTACT_DRAFT);
    const [editContactId, setEditContactId] = useState<string | null>(null);
    const [editContactDraft, setEditContactDraft] =
        useState<ContactDraft>(EMPTY_CONTACT_DRAFT);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    function closeContactModal(): void {
        setContactDraft(EMPTY_CONTACT_DRAFT);
        setIsContactModalOpen(false);
    }

    async function addContact(event: FormEvent): Promise<void> {
        event.preventDefault();
        const name = contactDraft.name.trim();
        if (!name) return;
        try {
            const updated = await companiesService.createCompanyContact(
                companyId,
                {
                    name,
                    email: optionalValue(contactDraft.email),
                    phoneNumber: optionalValue(contactDraft.phoneNumber),
                    role: optionalValue(contactDraft.role),
                    makePrimary: contactDraft.makePrimary,
                },
            );
            onCompanyUpdated(updated);
            closeContactModal();
            notify({
                intent: "success",
                title: t("companies.detail.contactAdded"),
            });
        } catch (error) {
            setMessage(
                errorMessage(error, t("companies.detail.unableToAddContact")),
            );
        }
    }

    function startEditContact(contactId: string): void {
        const contact = contacts.find(
            (candidate) => candidate.id === contactId,
        );
        if (!contact) return;
        setEditContactId(contactId);
        setEditContactDraft(toContactDraft(contact));
    }

    async function saveContact(contactId: string): Promise<void> {
        const name = editContactDraft.name.trim();
        if (!name) return;
        try {
            const updated = await companiesService.updateCompanyContact(
                companyId,
                contactId,
                {
                    name,
                    email: optionalValue(editContactDraft.email),
                    phoneNumber: optionalValue(editContactDraft.phoneNumber),
                    role: optionalValue(editContactDraft.role),
                },
            );
            onCompanyUpdated(updated);
            setEditContactId(null);
        } catch (error) {
            setMessage(
                errorMessage(error, t("companies.detail.unableToSaveContact")),
            );
        }
    }

    async function removeContact(contact: CompanyContact): Promise<void> {
        const confirmed = window.confirm(
            t("companies.detail.deleteContactConfirmation", {
                name: contact.name,
            }),
        );
        if (!confirmed) return;
        setBusyMessage(t("companies.detail.deletingContact"));
        try {
            const updated = await companiesService.deleteCompanyContact(
                companyId,
                contact.id,
            );
            onCompanyUpdated(updated);
        } catch (error) {
            setMessage(
                errorMessage(
                    error,
                    t("companies.detail.unableToDeleteContact"),
                ),
            );
        } finally {
            setBusyMessage("");
        }
    }

    return {
        contactDraft,
        editContactId,
        editContactDraft,
        isContactModalOpen,
        setContactDraft,
        setEditContactDraft,
        addContact,
        startEditContact,
        cancelEditContact: () => setEditContactId(null),
        saveContact: (contactId) => void saveContact(contactId),
        removeContact: (contact) => void removeContact(contact),
        openContactModal: () => setIsContactModalOpen(true),
        closeContactModal,
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
