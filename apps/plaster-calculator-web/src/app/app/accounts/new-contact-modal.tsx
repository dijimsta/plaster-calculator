"use client";

import { Button } from "@libraries/uikit-web";
import { X } from "lucide-react";
import { type FormEvent } from "react";

import { ContactFormFields } from "./contact-form-fields.js";
import { ui } from "../../../lib/styles.js";

import type { ContactDraft } from "./account.types.js";

interface NewContactModalProps {
    readonly contactDraft: ContactDraft;
    readonly close: () => void;
    readonly save: (event: FormEvent) => Promise<void>;
    readonly setContactDraft: (draft: ContactDraft) => void;
}

export function NewContactModal({
    close,
    contactDraft,
    save,
    setContactDraft,
}: NewContactModalProps) {
    return (
        <div className={ui.modalBackdrop}>
            <form className={ui.modal} onSubmit={save}>
                <div className={ui.editorToolbar}>
                    <h2>New Contact</h2>
                    <Button
                        variant="ghost"
                        onClick={close}
                        title="Close new contact"
                        type="button"
                    >
                        <X size={18} />
                    </Button>
                </div>
                <ContactFormFields
                    draft={contactDraft}
                    setDraft={setContactDraft}
                    showPrimaryCheckbox
                />
                <div className={ui.buttonRow}>
                    <Button variant="primary">Add contact</Button>
                    <Button variant="secondary" onClick={close} type="button">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
