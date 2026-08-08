"use client";

import { Button, ModalDialog } from "@libraries/uikit-web";
import { type FormEvent } from "react";

import { ContactFormFields } from "./contact-form-fields.js";

import type { ContactDraft } from "./company.types.js";

interface NewContactModalProps {
    readonly contactDraft: ContactDraft;
    readonly close: () => void;
    readonly save: (event: FormEvent) => Promise<void>;
    readonly setContactDraft: (draft: ContactDraft) => void;
}

const FORM_ID = "new-contact-form";

export function NewContactModal({
    close,
    contactDraft,
    save,
    setContactDraft,
}: NewContactModalProps) {
    return (
        <ModalDialog
            open
            onClose={close}
            title="New Contact"
            footer={
                <>
                    <Button variant="secondary" onClick={close} type="button">
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" form={FORM_ID}>
                        Add contact
                    </Button>
                </>
            }
        >
            <form id={FORM_ID} onSubmit={save}>
                <ContactFormFields
                    draft={contactDraft}
                    setDraft={setContactDraft}
                    showPrimaryCheckbox
                />
            </form>
        </ModalDialog>
    );
}
