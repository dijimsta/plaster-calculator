"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import { Badge, Box, Button, Paragraph } from "@libraries/uikit-web";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { CompanySelect } from "../../../components/company-select.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import { ui } from "../../../lib/styles.js";
import type { CompanyDetail } from "../../../types.js";

type ProjectCompanyPanelProps = {
    readonly companyId: string | null;
    readonly draftCompanyId: string | null;
    readonly isSaving: boolean;
    readonly saveCompany: (companyId?: string) => Promise<void>;
    readonly setDraftCompanyId: (companyId: string | null) => void;
};

export function ProjectCompanyPanel({
    companyId,
    draftCompanyId,
    isSaving,
    saveCompany,
    setDraftCompanyId,
}: ProjectCompanyPanelProps) {
    const companiesService = useCompaniesService();
    const [company, setCompany] = useState<CompanyDetail | null>(null);
    const [isEditing, setIsEditing] = useState(!companyId);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsEditing(!companyId);
        setDraftCompanyId(companyId);
        void loadCompany(companyId);
    }, [companyId, companiesService]);

    async function loadCompany(nextCompanyId: string | null): Promise<void> {
        setCompany(null);
        setError("");
        if (!nextCompanyId) return;
        try {
            setCompany(await companiesService.getCompany(nextCompanyId));
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load company",
            );
        }
    }

    async function save(overrideCompanyId?: string): Promise<void> {
        try {
            await saveCompany(overrideCompanyId);
            setIsEditing(false);
        } catch {
            // Parent page owns the visible error state.
        }
    }

    /**
     * A company created inline from the picker must be linked to the
     * project immediately, without a page refresh: set the draft id and the
     * loaded company detail directly (rather than waiting on `loadCompany`'s
     * refetch), then save using the created id -- passing it explicitly
     * rather than relying on `draftCompanyId` state, which won't have
     * updated yet within this same call.
     */
    function handleCreated(created: CompanyDetail): void {
        setDraftCompanyId(created.id);
        setCompany(created);
        void save(created.id);
    }

    function cancelEdit(): void {
        setDraftCompanyId(companyId);
        setIsEditing(!companyId);
    }

    return (
        <div className={ui.stack}>
            {isEditing ? (
                <>
                    <CompanySelect
                        selectedCompanyId={draftCompanyId}
                        onChange={setDraftCompanyId}
                        onCreated={handleCreated}
                        disabled={isSaving}
                        label="Project company"
                        placeholder="Search company by company name"
                        selectedCompanyLabel={company?.companyName ?? null}
                    />
                    <div className={ui.buttonRow}>
                        <Button
                            variant="primary"
                            disabled={
                                !draftCompanyId ||
                                draftCompanyId === companyId ||
                                isSaving
                            }
                            onClick={() => void save()}
                            type="button"
                        >
                            Save company
                        </Button>
                        {companyId && (
                            <Button
                                variant="secondary"
                                disabled={isSaving}
                                onClick={cancelEdit}
                                type="button"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <CompanySummary company={company} error={error} />
                    {companyId && (
                        <Button
                            variant="secondary"
                            icon={<Pencil size={18} aria-hidden="true" />}
                            onClick={() => setIsEditing(true)}
                            label="Edit project company"
                            type="button"
                        />
                    )}
                </>
            )}
        </div>
    );
}

function CompanySummary({
    company,
    error,
}: {
    readonly company: CompanyDetail | null;
    readonly error: string;
}) {
    const { t } = useAppTranslation();

    if (error) return <p className={ui.error}>{error}</p>;
    if (!company)
        return (
            <Paragraph textSize="sm" variant="muted">
                Loading company...
            </Paragraph>
        );
    // Same rule as the COMPANY_CONTACT_DETAILS readiness check: met by a
    // phone number, or a primary contact with an email.
    const primaryContact = company.contacts.find(
        (contact) => contact.id === company.primaryContactId,
    );
    const hasContactDetails = Boolean(
        company.phoneNumber || primaryContact?.email,
    );
    return (
        <div className={ui.metric}>
            <Box direction="row" gap="xs" align="center">
                <strong>{company.companyName}</strong>
                {!hasContactDetails && (
                    <Badge color="yellow" dot size="xs">
                        {t(
                            "projectStatusContent.companyPanel.noContactDetails",
                        )}
                    </Badge>
                )}
            </Box>
            <Paragraph textSize="sm" variant="muted">
                {company.businessNumber || company.phoneNumber || "No details"}
            </Paragraph>
        </div>
    );
}
