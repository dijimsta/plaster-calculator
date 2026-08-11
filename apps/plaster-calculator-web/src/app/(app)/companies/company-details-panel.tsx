"use client";

import { Button } from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import { type FormEvent } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";
import type { CompanyDetail } from "../../../types.js";

import { CompanyDetailFields } from "./company-detail-fields.js";
import type { CompanyDetailDraft } from "./company.types.js";

interface CompanyDetailsPanelProps {
    readonly company: CompanyDetail;
    readonly draft: CompanyDetailDraft;
    readonly hasCompanyChanges: boolean;
    readonly removeCompany: () => Promise<void>;
    readonly saveCompany: (event: FormEvent) => Promise<void>;
    readonly setDraft: (draft: CompanyDetailDraft) => void;
}

export function CompanyDetailsPanel({
    company,
    draft,
    hasCompanyChanges,
    removeCompany,
    saveCompany,
    setDraft,
}: CompanyDetailsPanelProps) {
    const { t } = useAppTranslation();

    return (
        <form
            className={cx(ui.panel, ui.stack, "min-w-0")}
            onSubmit={saveCompany}
        >
            <div className={ui.editorToolbar}>
                <h2>{t("companies.detailsPanel.title")}</h2>
                <div className={ui.buttonRow}>
                    <Button variant="primary" disabled={!hasCompanyChanges}>
                        {t("companies.detailsPanel.save")}
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Trash2 size={18} aria-hidden="true" />}
                        onClick={() => void removeCompany()}
                        title={t("companies.detailsPanel.deleteTitle")}
                        type="button"
                    >
                        {t("companies.detailsPanel.delete")}
                    </Button>
                </div>
            </div>
            <CompanyDetailFields
                contacts={company.contacts}
                draft={draft}
                setDraft={setDraft}
            />
        </form>
    );
}
