"use client";

import { X } from "lucide-react";
import { type FormEvent } from "react";

import { ContactFormFields } from "./contact-form-fields.js";
import { cx, ui } from "../../../lib/styles.js";

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
                    <button
                        className={cx(
                            ui.button,
                            ui.buttonDefault,
                            ui.buttonIcon,
                        )}
                        onClick={close}
                        title="Close new contact"
                        type="button"
                    >
                        <X size={18} />
                    </button>
                </div>
                <ContactFormFields
                    draft={contactDraft}
                    setDraft={setContactDraft}
                    showPrimaryCheckbox
                />
                <div className={ui.buttonRow}>
                    <button className={cx(ui.button, ui.buttonPrimary)}>
                        Add contact
                    </button>
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        onClick={close}
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
