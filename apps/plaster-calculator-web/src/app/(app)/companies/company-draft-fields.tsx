"use client";

import { ui } from "../../../lib/styles.js";

import type { CompanyDraftFieldsProps } from "./company.types.js";

export function CompanyDraftFields({
    draft,
    setDraft,
}: CompanyDraftFieldsProps) {
    return (
        <>
            <div className={ui.field}>
                <label htmlFor="company-name">Company name</label>
                <input
                    id="company-name"
                    className={ui.input}
                    value={draft.companyName}
                    onChange={(event) =>
                        setDraft({ ...draft, companyName: event.target.value })
                    }
                />
            </div>
            <div className={ui.field}>
                <label htmlFor="business-number">ACN/ABN</label>
                <input
                    id="business-number"
                    className={ui.input}
                    value={draft.businessNumber}
                    onChange={(event) =>
                        setDraft({
                            ...draft,
                            businessNumber: event.target.value,
                        })
                    }
                />
            </div>
            <div className={ui.field}>
                <label htmlFor="phone-number">Phone number</label>
                <input
                    id="phone-number"
                    className={ui.input}
                    value={draft.phoneNumber}
                    onChange={(event) =>
                        setDraft({ ...draft, phoneNumber: event.target.value })
                    }
                />
            </div>
        </>
    );
}
