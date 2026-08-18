"use client";

import {
    CompanyContactsCard,
    CompanyDetailCard,
    CompanyPricingCard,
} from "@libraries/plaster-calculator-ui";
import {
    Box,
    BusyOverlay,
    EmptyState,
    Paragraph,
    Text,
} from "@libraries/uikit-web";
import { Building2, LoaderCircle } from "lucide-react";

import { useAppTranslation } from "../../../i18n/index.ts";

import { CompanyDetailHeader } from "./company-detail-header.js";
import { CompanyProjectsPanel } from "./company-projects-panel.js";
import { NewContactModal } from "./new-contact-modal.js";
import { useCompanyDetail } from "./use-company-detail.hook.ts";

type CompanyDetailViewProps = {
    readonly companyId: string;
    readonly onCompanyDeleted: () => void;
};

export function CompanyDetailView({
    companyId,
    onCompanyDeleted,
}: CompanyDetailViewProps) {
    const { t } = useAppTranslation();
    const detail = useCompanyDetail(companyId, onCompanyDeleted);

    if (detail.isLoading) {
        return (
            <Box direction="column" padding="md">
                <Box direction="row" align="center" justify="center" gap="sm">
                    <LoaderCircle className="animate-spin" size={24} />
                    <Text size="sm" variant="muted">
                        {t("companies.detail.loading")}
                    </Text>
                </Box>
            </Box>
        );
    }

    return (
        <>
            {detail.busyMessage && <BusyOverlay message={detail.busyMessage} />}
            <CompanyDetailHeader
                company={detail.company}
                refresh={detail.refresh}
            />
            <Box direction="column" gap="lg" padding="md">
                {detail.message && (
                    <Paragraph textSize="sm" variant="muted">
                        {detail.message}
                    </Paragraph>
                )}
                {detail.company && detail.draft ? (
                    <CompanyDetailSections
                        detail={detail}
                        company={detail.company}
                        draft={detail.draft}
                    />
                ) : (
                    <EmptyState
                        icon={<Building2 />}
                        title={t("companies.detail.notFound")}
                    />
                )}
                {detail.isContactModalOpen && (
                    <NewContactModal
                        close={detail.closeContactModal}
                        contactDraft={detail.contactDraft}
                        save={detail.addContact}
                        setContactDraft={detail.setContactDraft}
                    />
                )}
            </Box>
        </>
    );
}

type CompanyDetailHookResult = ReturnType<typeof useCompanyDetail>;

type CompanyDetailSectionsProps = {
    readonly detail: CompanyDetailHookResult;
    readonly company: NonNullable<CompanyDetailHookResult["company"]>;
    readonly draft: NonNullable<CompanyDetailHookResult["draft"]>;
};

/** The four loaded-state cards, split out of `CompanyDetailView` to keep that component's own JSX branching within this workspace's complexity limit. */
function CompanyDetailSections({
    detail,
    company,
    draft,
}: CompanyDetailSectionsProps) {
    return (
        <Box direction="column" gap="lg">
            <CompanyDetailCard
                values={draft}
                contacts={company.contacts}
                hasChanges={detail.hasCompanyChanges}
                onChange={(patch) => detail.setDraft({ ...draft, ...patch })}
                onSave={detail.saveCompany}
                onDelete={detail.removeCompany}
            />
            <CompanyPricingCard
                templates={detail.templates}
                selectedTemplateId={company.quoteTemplateId}
                editRatesHref={detail.editRatesHref}
                rateItems={detail.rateItems}
                disabled={detail.isSavingPricing}
                onChange={detail.changeQuoteTemplate}
            />
            <CompanyContactsCard
                contacts={company.contacts}
                primaryContactId={company.primaryContactId}
                editingContactId={detail.editContactId}
                editValues={detail.editContactDraft}
                onEditValuesChange={(patch) =>
                    detail.setEditContactDraft({
                        ...detail.editContactDraft,
                        ...patch,
                    })
                }
                onStartEdit={detail.startEditContact}
                onCancelEdit={detail.cancelEditContact}
                onSaveEdit={detail.saveContact}
                onDelete={detail.removeContact}
                onAddContact={detail.openContactModal}
            />
            <CompanyProjectsPanel companyId={company.id} />
        </Box>
    );
}
