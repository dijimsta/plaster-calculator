"use client";

import { Input, Label, SelectMenu } from "@libraries/uikit-web";

import type { AccountDetailFieldsProps } from "./account.types.js";

export function AccountDetailFields({
    contacts,
    draft,
    setDraft,
}: AccountDetailFieldsProps) {
    return (
        <>
            <div className="grid gap-1.5">
                <Label htmlFor="company-name">Company name</Label>
                <Input
                    id="company-name"
                    value={draft.companyName}
                    onChange={(e) =>
                        setDraft({ ...draft, companyName: e.target.value })
                    }
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="business-number">ACN/ABN</Label>
                <Input
                    id="business-number"
                    value={draft.businessNumber}
                    onChange={(e) =>
                        setDraft({ ...draft, businessNumber: e.target.value })
                    }
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="phone-number">Phone number</Label>
                <Input
                    id="phone-number"
                    value={draft.phoneNumber}
                    onChange={(e) =>
                        setDraft({ ...draft, phoneNumber: e.target.value })
                    }
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="primary-contact">Primary contact</Label>
                <SelectMenu
                    id="primary-contact"
                    value={draft.primaryContactId}
                    options={[
                        { value: "", label: "No primary contact" },
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
