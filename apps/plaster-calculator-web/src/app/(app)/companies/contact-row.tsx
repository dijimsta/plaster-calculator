"use client";

import { Button, ButtonLink, Text } from "@libraries/uikit-web";
import { Mail, Pencil, Trash2, X } from "lucide-react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { ui } from "../../../lib/styles.js";
import type { CompanyContact } from "../../../types.js";

import type { ContactDraft } from "./company.types.js";
import { toContactDraft } from "./company.utils.js";
import { ContactFormFields } from "./contact-form-fields.js";

interface ContactRowProps {
    readonly contact: CompanyContact;
    readonly editContactDraft: ContactDraft;
    readonly editContactId: string | null;
    readonly isPrimary: boolean;
    readonly removeContact: (contact: CompanyContact) => Promise<void>;
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
    const { t } = useAppTranslation();
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
                        label={t("companies.contactRow.edit")}
                        type="button"
                    />
                )}
                {contact.email && (
                    <ButtonLink
                        variant="secondary"
                        href={`mailto:${contact.email}`}
                        label={t("companies.contactRow.email", {
                            name: contact.name,
                        })}
                    >
                        <Mail size={18} aria-hidden="true" />
                    </ButtonLink>
                )}
                <Button
                    variant="secondary"
                    icon={<Trash2 size={18} aria-hidden="true" />}
                    onClick={() => void removeContact(contact)}
                    label={t("companies.contactRow.delete")}
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
    readonly contact: CompanyContact;
    readonly isPrimary: boolean;
}) {
    const { t } = useAppTranslation();

    return (
        <div className="grid min-w-0 gap-1">
            <strong>
                {contact.name}
                {isPrimary ? t("companies.contactRow.primarySuffix") : ""}
            </strong>
            <Text size="sm" variant="muted" truncate>
                {contact.email ? (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                ) : (
                    t("companies.contactRow.noEmail")
                )}{" "}
                / {contact.phoneNumber || t("companies.contactRow.noPhone")} /{" "}
                {contact.role || t("companies.contactRow.noRole")}
            </Text>
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
    const { t } = useAppTranslation();

    return (
        <>
            <Button
                variant="primary"
                onClick={() => void saveContact(contactId)}
                type="button"
            >
                {t("companies.contactRow.save")}
            </Button>
            <Button
                variant="secondary"
                icon={<X size={18} aria-hidden="true" />}
                onClick={() => setEditContactId(null)}
                label={t("companies.contactRow.cancelEdit")}
                type="button"
            />
        </>
    );
}
