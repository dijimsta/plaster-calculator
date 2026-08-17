"use client";

import { Button, Text } from "@libraries/uikit-web";
import { LoaderCircle, Plus } from "lucide-react";

import { useAppTranslation } from "../i18n/index.ts";
import { ui } from "../lib/styles.js";

import type { CompanyCreatePanelProps } from "./company-select.types.js";

export function CompanyCreatePanel({
    draft,
    setDraft,
    error,
    isSubmitting,
    suggestions,
    onSubmit,
    onUseSuggestion,
    onCancel,
}: CompanyCreatePanelProps) {
    const { t } = useAppTranslation();

    return (
        <form className={ui.stack} onSubmit={onSubmit}>
            <div className={ui.field}>
                <label htmlFor="company-select-new-name">
                    {t("companySelect.newCompanyNameLabel")}
                </label>
                <input
                    id="company-select-new-name"
                    className={ui.input}
                    value={draft.companyName}
                    onChange={(event) =>
                        setDraft({ ...draft, companyName: event.target.value })
                    }
                />
            </div>
            <div className={ui.field}>
                <label htmlFor="company-select-new-business-number">
                    {t("companySelect.newCompanyBusinessNumberLabel")}
                </label>
                <input
                    id="company-select-new-business-number"
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
                <label htmlFor="company-select-new-phone">
                    {t("companySelect.newCompanyPhoneLabel")}
                </label>
                <input
                    id="company-select-new-phone"
                    className={ui.input}
                    value={draft.phoneNumber}
                    onChange={(event) =>
                        setDraft({ ...draft, phoneNumber: event.target.value })
                    }
                />
            </div>
            {suggestions.length > 0 && (
                <div className={ui.stack}>
                    <Text size="sm" variant="muted">
                        {t("companySelect.similarCompaniesHeading")}
                    </Text>
                    {suggestions.map((company) => (
                        <Button
                            key={company.id}
                            variant="secondary"
                            align="start"
                            fullWidth
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => onUseSuggestion(company)}
                            type="button"
                        >
                            <span className="grid gap-0.5">
                                <strong>{company.companyName}</strong>
                                <Text size="sm" variant="muted">
                                    {t("companySelect.useThisCompany")}
                                </Text>
                            </span>
                        </Button>
                    ))}
                </div>
            )}
            {error && <p className={ui.error}>{error}</p>}
            <div className={ui.buttonRow}>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    icon={
                        isSubmitting ? (
                            <LoaderCircle
                                className="animate-spin"
                                size={16}
                                aria-hidden="true"
                            />
                        ) : (
                            <Plus size={16} aria-hidden="true" />
                        )
                    }
                >
                    {t("companySelect.createCompany")}
                </Button>
                <Button variant="secondary" type="button" onClick={onCancel}>
                    {t("companySelect.cancel")}
                </Button>
            </div>
        </form>
    );
}
