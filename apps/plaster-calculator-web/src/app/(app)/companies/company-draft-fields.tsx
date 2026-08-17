"use client";

import { useAppTranslation } from "../../../i18n/index.ts";
import { ui } from "../../../lib/styles.js";

import type { CompanyDraftFieldsProps } from "./company.types.js";

export function CompanyDraftFields({
    draft,
    setDraft,
    nameInputRef,
}: CompanyDraftFieldsProps) {
    const { t } = useAppTranslation();

    return (
        <>
            <div className={ui.field}>
                <label htmlFor="company-name">
                    {t("companies.fields.companyName")}
                </label>
                <input
                    id="company-name"
                    ref={nameInputRef}
                    className={ui.input}
                    value={draft.companyName}
                    onChange={(event) =>
                        setDraft({ ...draft, companyName: event.target.value })
                    }
                />
            </div>
            <div className={ui.field}>
                <label htmlFor="business-number">
                    {t("companies.fields.businessNumber")}
                </label>
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
                <label htmlFor="phone-number">
                    {t("companies.fields.phoneNumber")}
                </label>
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
