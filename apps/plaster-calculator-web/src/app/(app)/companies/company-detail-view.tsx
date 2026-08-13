"use client";

import {
    useCompaniesService,
    useProjectsService,
} from "@libraries/plaster-calculator-web-core";
import {
    Box,
    BusyOverlay,
    EmptyState,
    Paragraph,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { Building2, LoaderCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";
import type {
    CompanyContact,
    CompanyDetail,
    ProjectSummary,
} from "../../../types.js";

import { CompanyDetailHeader } from "./company-detail-header.js";
import { CompanyDetailsPanel } from "./company-details-panel.js";
import { CompanyProjectsPanel } from "./company-projects-panel.js";
import {
    EMPTY_CONTACT_DRAFT,
    type CompanyDetailDraft,
    type ContactDraft,
} from "./company.types.js";
import {
    isCompanyDetailDraftChanged,
    optionalValue,
    toCompanyDetailDraft,
} from "./company.utils.js";
import { ContactsPanel } from "./contacts-panel.js";
import { NewContactModal } from "./new-contact-modal.js";

interface CompanyDetailViewProps {
    readonly companyId: string;
    readonly onCompanyDeleted: () => void;
}

export function CompanyDetailView({
    companyId,
    onCompanyDeleted,
}: CompanyDetailViewProps) {
    const companiesService = useCompaniesService();
    const projectsService = useProjectsService();
    const { notify } = useNotificationsManager();
    const { t } = useAppTranslation();
    const [company, setCompany] = useState<CompanyDetail | null>(null);
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [draft, setDraft] = useState<CompanyDetailDraft | null>(null);
    const [contactDraft, setContactDraft] =
        useState<ContactDraft>(EMPTY_CONTACT_DRAFT);
    const [editContactId, setEditContactId] = useState<string | null>(null);
    const [editContactDraft, setEditContactDraft] =
        useState<ContactDraft>(EMPTY_CONTACT_DRAFT);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [busyMessage, setBusyMessage] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        void load();
    }, [companyId, companiesService, projectsService]);

    const companyProjects = projects;
    const hasCompanyChanges =
        company && draft ? isCompanyDetailDraftChanged(company, draft) : false;

    async function load(): Promise<void> {
        setIsLoading(true);
        setMessage("");
        try {
            const [nextCompany, nextProjects] = await Promise.all([
                companiesService.getCompany(companyId),
                projectsService.listProjectsByCompany(companyId),
            ]);
            setCompany(nextCompany);
            setDraft(toCompanyDetailDraft(nextCompany));
            setProjects(nextProjects);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : t("companies.detail.unableToLoad"),
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function saveCompany(event: FormEvent): Promise<void> {
        event.preventDefault();
        if (!draft) return;
        const companyName = draft.companyName.trim();
        if (!companyName) return;
        try {
            const updated = await companiesService.updateCompany(companyId, {
                companyName,
                businessNumber: optionalValue(draft.businessNumber),
                phoneNumber: optionalValue(draft.phoneNumber),
                primaryContactId: optionalValue(draft.primaryContactId),
            });
            updateCompanyState(updated);
        } catch (error) {
            setMessage(errorMessage(error, t("companies.detail.unableToSave")));
        }
    }

    async function addContact(event: FormEvent): Promise<void> {
        event.preventDefault();
        const name = contactDraft.name.trim();
        if (!name) return;
        try {
            const updated = await companiesService.createCompanyContact(
                companyId,
                {
                    name,
                    email: optionalValue(contactDraft.email),
                    phoneNumber: optionalValue(contactDraft.phoneNumber),
                    role: optionalValue(contactDraft.role),
                    makePrimary: contactDraft.makePrimary,
                },
            );
            updateCompanyState(updated);
            closeContactModal();
            notify({
                intent: "success",
                title: t("companies.detail.contactAdded"),
            });
        } catch (error) {
            setMessage(
                errorMessage(error, t("companies.detail.unableToAddContact")),
            );
        }
    }

    async function saveContact(contactId: string): Promise<void> {
        const name = editContactDraft.name.trim();
        if (!name) return;
        try {
            const updated = await companiesService.updateCompanyContact(
                companyId,
                contactId,
                {
                    name,
                    email: optionalValue(editContactDraft.email),
                    phoneNumber: optionalValue(editContactDraft.phoneNumber),
                    role: optionalValue(editContactDraft.role),
                },
            );
            updateCompanyState(updated);
            setEditContactId(null);
        } catch (error) {
            setMessage(
                errorMessage(error, t("companies.detail.unableToSaveContact")),
            );
        }
    }

    async function removeContact(contact: CompanyContact): Promise<void> {
        const confirmed = window.confirm(
            t("companies.detail.deleteContactConfirmation", {
                name: contact.name,
            }),
        );
        if (!confirmed) return;
        setBusyMessage(t("companies.detail.deletingContact"));
        try {
            const updated = await companiesService.deleteCompanyContact(
                companyId,
                contact.id,
            );
            updateCompanyState(updated);
        } catch (error) {
            setMessage(
                errorMessage(
                    error,
                    t("companies.detail.unableToDeleteContact"),
                ),
            );
        } finally {
            setBusyMessage("");
        }
    }

    async function removeCompany(): Promise<void> {
        if (!company) return;
        if (companyProjects.length > 0) {
            window.alert(t("companies.detail.linkedProjectsWarning"));
            return;
        }
        const confirmed = window.confirm(
            t("companies.detail.deleteCompanyConfirmation", {
                name: company.companyName,
            }),
        );
        if (!confirmed) return;
        setBusyMessage(t("companies.detail.deletingCompany"));
        try {
            await companiesService.deleteCompany(company.id);
            onCompanyDeleted();
        } catch (error) {
            setBusyMessage("");
            setMessage(
                errorMessage(
                    error,
                    t("companies.detail.unableToDeleteCompany"),
                ),
            );
        }
    }

    function closeContactModal(): void {
        setContactDraft(EMPTY_CONTACT_DRAFT);
        setIsContactModalOpen(false);
    }

    function updateCompanyState(updated: CompanyDetail): void {
        setCompany(updated);
        setDraft(toCompanyDetailDraft(updated));
    }

    if (isLoading) {
        return (
            <>
                <Box direction="column" padding="md">
                    <div className={ui.projectListState}>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text size="sm" variant="muted">
                            {t("companies.detail.loading")}
                        </Text>
                    </div>
                </Box>
            </>
        );
    }

    return (
        <>
            {busyMessage && <BusyOverlay message={busyMessage} />}
            <CompanyDetailHeader
                company={company}
                refresh={() => void load()}
            />
            <Box direction="column" gap="lg" padding="md">
                {message && (
                    <Paragraph textSize="sm" variant="muted">
                        {message}
                    </Paragraph>
                )}
                {company && draft ? (
                    <section
                        className={cx(
                            "grid grid-cols-[minmax(520px,0.48fr)_minmax(0,1fr)] items-start gap-[18px] max-[980px]:grid-cols-1",
                        )}
                    >
                        <CompanyDetailsPanel
                            company={company}
                            draft={draft}
                            hasCompanyChanges={hasCompanyChanges}
                            removeCompany={removeCompany}
                            saveCompany={saveCompany}
                            setDraft={setDraft}
                        />
                        <div className="grid gap-[18px]">
                            <ContactsPanel
                                company={company}
                                editContactDraft={editContactDraft}
                                editContactId={editContactId}
                                openNewContact={() =>
                                    setIsContactModalOpen(true)
                                }
                                removeContact={removeContact}
                                saveContact={saveContact}
                                setEditContactDraft={setEditContactDraft}
                                setEditContactId={setEditContactId}
                            />
                            <CompanyProjectsPanel projects={companyProjects} />
                        </div>
                    </section>
                ) : (
                    <EmptyState
                        icon={<Building2 />}
                        title={t("companies.detail.notFound")}
                    />
                )}
                {isContactModalOpen && (
                    <NewContactModal
                        close={closeContactModal}
                        contactDraft={contactDraft}
                        save={addContact}
                        setContactDraft={setContactDraft}
                    />
                )}
            </Box>
        </>
    );
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
