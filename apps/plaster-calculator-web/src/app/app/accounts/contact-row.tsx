"use client";

import { Button, ButtonLink } from "@libraries/uikit-web";
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
                    <Button
                        variant="secondary"
                        icon={<Pencil size={18} aria-hidden="true" />}
                        onClick={() => {
                            setEditContactId(contact.id);
                            setEditContactDraft(toContactDraft(contact));
                        }}
                        aria-label="Edit contact"
                        type="button"
                    />
                )}
                {contact.email && (
                    <ButtonLink
                        variant="secondary"
                        href={`mailto:${contact.email}`}
                        aria-label={`Email ${contact.name}`}
                    >
                        <Mail size={18} aria-hidden="true" />
                    </ButtonLink>
                )}
                <Button
                    variant="secondary"
                    icon={<Trash2 size={18} aria-hidden="true" />}
                    onClick={() => void removeContact(contact)}
                    aria-label="Delete contact"
                    type="button"
                />
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
            <Button
                variant="primary"
                onClick={() => void saveContact(contactId)}
                type="button"
            >
                Save
            </Button>
            <Button
                variant="secondary"
                icon={<X size={18} aria-hidden="true" />}
                onClick={() => setEditContactId(null)}
                aria-label="Cancel edit"
                type="button"
            />
        </>
    );
}
