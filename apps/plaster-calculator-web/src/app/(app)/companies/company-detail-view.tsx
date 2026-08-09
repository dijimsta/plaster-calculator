"use client";

import {
    useCompaniesService,
    useProjectsService,
} from "@libraries/plaster-calculator-web-core";
import {
    Box,
    EmptyState,
    Paragraph,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { Building2, LoaderCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

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
import { BusyOverlay } from "../../../components/busy-overlay.js";
import { cx, ui } from "../../../lib/styles.js";

import type {
    CompanyContact,
    CompanyDetail,
    ProjectSummary,
} from "../../../types.js";

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
                    : "Unable to load company",
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
            setMessage(errorMessage(error, "Unable to save company"));
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
            notify({ intent: "success", title: "Contact added." });
        } catch (error) {
            setMessage(errorMessage(error, "Unable to add contact"));
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
            setMessage(errorMessage(error, "Unable to save contact"));
        }
    }

    async function removeContact(contact: CompanyContact): Promise<void> {
        const confirmed = window.confirm(`Delete contact "${contact.name}"?`);
        if (!confirmed) return;
        setBusyMessage("Deleting contact...");
        try {
            const updated = await companiesService.deleteCompanyContact(
                companyId,
                contact.id,
            );
            updateCompanyState(updated);
        } catch (error) {
            setMessage(errorMessage(error, "Unable to delete contact"));
        } finally {
            setBusyMessage("");
        }
    }

    async function removeCompany(): Promise<void> {
        if (!company) return;
        if (companyProjects.length > 0) {
            window.alert(
                "Remove or reassign linked projects before deleting this company.",
            );
            return;
        }
        const confirmed = window.confirm(
            `Delete "${company.companyName}" and all contacts?`,
        );
        if (!confirmed) return;
        setBusyMessage("Deleting company...");
        try {
            await companiesService.deleteCompany(company.id);
            onCompanyDeleted();
        } catch (error) {
            setBusyMessage("");
            setMessage(errorMessage(error, "Unable to delete company"));
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
                            Loading company...
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
                        title="Company not found"
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
