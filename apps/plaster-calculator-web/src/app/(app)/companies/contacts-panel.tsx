"use client";

import { Button, EmptyState } from "@libraries/uikit-web";
import { Plus, Users } from "lucide-react";

import { cx, ui } from "../../../lib/styles.js";
import type { CompanyContact, CompanyDetail } from "../../../types.js";

import type { ContactDraft } from "./company.types.js";
import { ContactRow } from "./contact-row.js";

interface ContactsPanelProps {
    readonly company: CompanyDetail;
    readonly editContactDraft: ContactDraft;
    readonly editContactId: string | null;
    readonly openNewContact: () => void;
    readonly removeContact: (contact: CompanyContact) => Promise<void>;
    readonly saveContact: (contactId: string) => Promise<void>;
    readonly setEditContactDraft: (draft: ContactDraft) => void;
    readonly setEditContactId: (contactId: string | null) => void;
}

export function ContactsPanel({
    company,
    editContactDraft,
    editContactId,
    openNewContact,
    removeContact,
    saveContact,
    setEditContactDraft,
    setEditContactId,
}: ContactsPanelProps) {
    return (
        <section className={cx(ui.panel, ui.stack)}>
            <div className={ui.editorToolbar}>
                <h2>Contacts</h2>
                <Button
                    variant="secondary"
                    onClick={openNewContact}
                    type="button"
                >
                    <Plus size={18} /> Add contact
                </Button>
            </div>
            {company.contacts.map((contact) => (
                <ContactRow
                    key={contact.id}
                    contact={contact}
                    editContactDraft={editContactDraft}
                    editContactId={editContactId}
                    isPrimary={contact.id === company.primaryContactId}
                    removeContact={removeContact}
                    saveContact={saveContact}
                    setEditContactDraft={setEditContactDraft}
                    setEditContactId={setEditContactId}
                />
            ))}
            {company.contacts.length === 0 && (
                <EmptyState icon={<Users />} title="No contacts yet" />
            )}
        </section>
    );
}
