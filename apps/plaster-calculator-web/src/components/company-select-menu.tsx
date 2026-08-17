"use client";

import { Button, Text } from "@libraries/uikit-web";
import { LoaderCircle, Plus } from "lucide-react";

import { useAppTranslation } from "../i18n/index.ts";
import { ui } from "../lib/styles.js";

import type { CompanySelectMenuProps } from "./company-select.types.js";

export function CompanySelectMenu({
    error,
    filtered,
    isLoading,
    onSelect,
    onStartCreate,
}: CompanySelectMenuProps) {
    const { t } = useAppTranslation();

    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" size={16} />
                <Text size="sm" variant="muted">
                    Loading companies...
                </Text>
            </div>
        );
    }

    if (error) {
        return <p className={ui.error}>{error}</p>;
    }

    return (
        <>
            {filtered.map((company) => (
                <Button
                    key={company.id}
                    variant="secondary"
                    align="start"
                    fullWidth
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelect(company)}
                    type="button"
                >
                    <span className="grid gap-0.5">
                        <strong>{company.companyName}</strong>
                        <Text size="sm" variant="muted">
                            {company.businessNumber ||
                                company.phoneNumber ||
                                t("companySelect.noCompanyDetails")}
                        </Text>
                    </span>
                </Button>
            ))}
            <Button
                variant="secondary"
                align="start"
                fullWidth
                icon={<Plus size={16} aria-hidden="true" />}
                onMouseDown={(event) => event.preventDefault()}
                onClick={onStartCreate}
                type="button"
            >
                {t("companySelect.addNewCompany")}
            </Button>
        </>
    );
}
