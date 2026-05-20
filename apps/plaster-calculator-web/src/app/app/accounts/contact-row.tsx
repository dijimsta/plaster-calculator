"use client";

import { Mail, Pencil, Trash2, X } from "lucide-react";

import { toContactDraft } from "./account.utils.js";
import { ContactFormFields } from "./contact-form-fields.js";
import { cx, ui } from "../../../lib/styles.js";

import type { ContactDraft } from "./account.types.js";
import type { AccountContact } from "../../../types.js";

interface ContactRowProps {
    readonly contact: AccountContact;
    readonly editContactDraft: ContactDraft;
    readonly editContactId: string | null;
    readonly isPrimary: boolean;
    readonly removeContact: (contact: AccountContact) => Promise<void>;
    readonly saveContact: (contactId: string) => Promise<void>;
    readonly setEditContactDraft: (draft: ContactDraft) => void;
    readonly setEditContactId: (contactId: string | null) => void;
}

export function ContactRow({
    contact,
    editContactDraft,
    editContactId,
    isPrimary,
    removeContact,
    saveContact,
    setEditContactDraft,
    setEditContactId,
}: ContactRowProps) {
    const isEditing = editContactId === contact.id;
    return (
        <div className={ui.projectItem}>
            {isEditing ? (
                <ContactFormFields
                    draft={editContactDraft}
                    setDraft={setEditContactDraft}
                />
            ) : (
                <ContactSummary contact={contact} isPrimary={isPrimary} />
            )}
            <div className={ui.projectActions}>
                {isEditing ? (
                    <EditContactActions
                        contactId={contact.id}
                        saveContact={saveContact}
                        setEditContactId={setEditContactId}
                    />
                ) : (
                    <button
                        className={cx(
                            ui.button,
                            ui.buttonDefault,
                            ui.buttonIcon,
                        )}
                        onClick={() => {
                            setEditContactId(contact.id);
                            setEditContactDraft(toContactDraft(contact));
                        }}
                        title="Edit contact"
                        type="button"
                    >
                        <Pencil size={18} />
                    </button>
                )}
                {contact.email && (
                    <a
                        className={cx(
                            ui.button,
                            ui.buttonDefault,
                            ui.buttonIcon,
                        )}
                        href={`mailto:${contact.email}`}
                        title={`Email ${contact.name}`}
                    >
                        <Mail size={18} />
                    </a>
                )}
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={() => void removeContact(contact)}
                    title="Delete contact"
                    type="button"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}

function ContactSummary({
    contact,
    isPrimary,
}: {
    readonly contact: AccountContact;
    readonly isPrimary: boolean;
}) {
    return (
        <div className="grid min-w-0 gap-1">
            <strong>
                {contact.name}
                {isPrimary ? " (Primary)" : ""}
            </strong>
            <span className={cx(ui.muted, ui.projectMetaLine)}>
                {contact.email ? (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                ) : (
                    "No email"
                )}{" "}
                / {contact.phoneNumber || "No phone"} /{" "}
                {contact.role || "No role"}
            </span>
        </div>
    );
}

function EditContactActions({
    contactId,
    saveContact,
    setEditContactId,
}: {
    readonly contactId: string;
    readonly saveContact: (contactId: string) => Promise<void>;
    readonly setEditContactId: (contactId: string | null) => void;
}) {
    return (
        <>
            <button
                className={cx(ui.button, ui.buttonPrimary)}
                onClick={() => void saveContact(contactId)}
                type="button"
            >
                Save
            </button>
            <button
                className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                onClick={() => setEditContactId(null)}
                title="Cancel edit"
                type="button"
            >
                <X size={18} />
            </button>
        </>
    );
}
