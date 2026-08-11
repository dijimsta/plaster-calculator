"use client";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";

import type { ContactFieldsProps } from "./company.types.js";

export function ContactFormFields({
    draft,
    setDraft,
    showPrimaryCheckbox = false,
}: ContactFieldsProps) {
    const { t } = useAppTranslation();

    return (
        <>
            <div className={ui.field}>
                <label htmlFor="contact-name">
                    {t("companies.contactFields.name")}
                </label>
                <input
                    id="contact-name"
                    className={ui.input}
                    value={draft.name}
                    onChange={(event) =>
                        setDraft({ ...draft, name: event.target.value })
                    }
                />
            </div>
            <div className={ui.field}>
                <label htmlFor="contact-email">
                    {t("companies.contactFields.email")}
                </label>
                <input
                    id="contact-email"
                    className={ui.input}
                    type="email"
                    value={draft.email}
                    onChange={(event) =>
                        setDraft({ ...draft, email: event.target.value })
                    }
                />
            </div>
            <div className={ui.field}>
                <label htmlFor="contact-phone">
                    {t("companies.contactFields.phoneNumber")}
                </label>
                <input
                    id="contact-phone"
                    className={ui.input}
                    value={draft.phoneNumber}
                    onChange={(event) =>
                        setDraft({ ...draft, phoneNumber: event.target.value })
                    }
                />
            </div>
            <div className={ui.field}>
                <label htmlFor="contact-role">
                    {t("companies.contactFields.role")}
                </label>
                <input
                    id="contact-role"
                    className={ui.input}
                    value={draft.role}
                    onChange={(event) =>
                        setDraft({ ...draft, role: event.target.value })
                    }
                />
            </div>
            {showPrimaryCheckbox && (
                <label className={cx(ui.muted, "flex items-center gap-2")}>
                    <input
                        checked={draft.makePrimary}
                        onChange={(event) =>
                            setDraft({
                                ...draft,
                                makePrimary: event.target.checked,
                            })
                        }
                        type="checkbox"
                    />
                    {t("companies.contactFields.makePrimary")}
                </label>
            )}
        </>
    );
}
