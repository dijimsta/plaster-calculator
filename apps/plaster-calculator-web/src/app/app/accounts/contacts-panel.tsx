"use client";

import { Button } from "@libraries/uikit-web";
import { Plus } from "lucide-react";

import { ContactRow } from "./contact-row.js";
import { cx, ui } from "../../../lib/styles.js";

import type { ContactDraft } from "./account.types.js";
import type { AccountContact, AccountDetail } from "../../../types.js";

interface ContactsPanelProps {
    readonly account: AccountDetail;
    readonly editContactDraft: ContactDraft;
    readonly editContactId: string | null;
    readonly openNewContact: () => void;
    readonly removeContact: (contact: AccountContact) => Promise<void>;
    readonly saveContact: (contactId: string) => Promise<void>;
    readonly setEditContactDraft: (draft: ContactDraft) => void;
    readonly setEditContactId: (contactId: string | null) => void;
}

export function ContactsPanel({
    account,
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
            {account.contacts.map((contact) => (
                <ContactRow
                    key={contact.id}
                    contact={contact}
                    editContactDraft={editContactDraft}
                    editContactId={editContactId}
                    isPrimary={contact.id === account.primaryContactId}
                    removeContact={removeContact}
                    saveContact={saveContact}
                    setEditContactDraft={setEditContactDraft}
                    setEditContactId={setEditContactId}
                />
            ))}
            {account.contacts.length === 0 && (
                <p className={ui.muted}>No contacts yet.</p>
            )}
        </section>
    );
}
