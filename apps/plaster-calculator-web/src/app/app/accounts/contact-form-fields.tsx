"use client";

import { cx, ui } from "../../../lib/styles.js";

import type { ContactFieldsProps } from "./account.types.js";

export function ContactFormFields({
    draft,
    setDraft,
    showPrimaryCheckbox = false,
}: ContactFieldsProps) {
    return (
        <>
            <div className={ui.field}>
                <label htmlFor="contact-name">Name</label>
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
                <label htmlFor="contact-email">Email</label>
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
                <label htmlFor="contact-phone">Phone number</label>
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
                <label htmlFor="contact-role">Role</label>
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
                    Make this contact the primary contact
                </label>
            )}
        </>
    );
}
