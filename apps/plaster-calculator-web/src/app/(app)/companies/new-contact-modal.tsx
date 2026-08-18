"use client";

import { Button, ModalDialog } from "@libraries/uikit-web";
import { type FormEvent } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

import type { ContactDraft } from "./company.types.js";
import { ContactFormFields } from "./contact-form-fields.js";

type NewContactModalProps = {
    readonly contactDraft: ContactDraft;
    readonly close: () => void;
    readonly save: (event: FormEvent) => Promise<void>;
    readonly setContactDraft: (draft: ContactDraft) => void;
};

const FORM_ID = "new-contact-form";

export function NewContactModal({
    close,
    contactDraft,
    save,
    setContactDraft,
}: NewContactModalProps) {
    const { t } = useAppTranslation();

    return (
        <ModalDialog
            open
            onClose={close}
            title={t("companies.newContact.title")}
            footer={
                <>
                    <Button variant="secondary" onClick={close} type="button">
                        {t("companies.newContact.cancel")}
                    </Button>
                    <Button variant="primary" type="submit" form={FORM_ID}>
                        {t("companies.newContact.add")}
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
