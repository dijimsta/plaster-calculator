"use client";

import { Input, Label, SelectMenu } from "@libraries/uikit-web";

import { useAppTranslation } from "../../../i18n/index.ts";

import type { CompanyDetailFieldsProps } from "./company.types.js";

export function CompanyDetailFields({
    contacts,
    draft,
    setDraft,
}: CompanyDetailFieldsProps) {
    const { t } = useAppTranslation();

    return (
        <>
            <div className="grid gap-1.5">
                <Label htmlFor="company-name">
                    {t("companies.fields.companyName")}
                </Label>
                <Input
                    id="company-name"
                    value={draft.companyName}
                    onChange={(e) =>
                        setDraft({ ...draft, companyName: e.target.value })
                    }
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="business-number">
                    {t("companies.fields.businessNumber")}
                </Label>
                <Input
                    id="business-number"
                    value={draft.businessNumber}
                    onChange={(e) =>
                        setDraft({ ...draft, businessNumber: e.target.value })
                    }
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="phone-number">
                    {t("companies.fields.phoneNumber")}
                </Label>
                <Input
                    id="phone-number"
                    value={draft.phoneNumber}
                    onChange={(e) =>
                        setDraft({ ...draft, phoneNumber: e.target.value })
                    }
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="primary-contact">
                    {t("companies.fields.primaryContact")}
                </Label>
                <SelectMenu
                    id="primary-contact"
                    value={draft.primaryContactId}
                    options={[
                        {
                            value: "",
                            label: t("companies.fields.noPrimaryContact"),
                        },
                        ...contacts.map((c) => ({
                            value: c.id,
                            label: c.name,
                        })),
                    ]}
                    onChange={(e) =>
                        setDraft({ ...draft, primaryContactId: e.target.value })
                    }
                />
            </div>
        </>
    );
}
