"use client";

import { Box, Button, Paragraph, Text } from "@libraries/uikit-web";
import { LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation.js";
import { useEffect, useState, type FormEvent } from "react";

import { AccountDetailHeader } from "./account-detail-header.js";
import { AccountDetailsPanel } from "./account-details-panel.js";
import { AccountProjectsPanel } from "./account-projects-panel.js";
import {
    EMPTY_CONTACT_DRAFT,
    type AccountDetailDraft,
    type ContactDraft,
} from "./account.types.js";
import {
    isAccountDetailDraftChanged,
    optionalValue,
    toAccountDetailDraft,
} from "./account.utils.js";
import { ContactsPanel } from "./contacts-panel.js";
import { NewContactModal } from "./new-contact-modal.js";
import { BusyOverlay } from "../../../components/busy-overlay.js";
import {
    createAccountContact,
    deleteAccount,
    deleteAccountContact,
    getAccount,
    listProjectsByAccount,
    updateAccount,
    updateAccountContact,
} from "../../../lib/api.js";
import { cx, ui } from "../../../lib/styles.js";

import type {
    AccountContact,
    AccountDetail,
    ProjectSummary,
} from "../../../types.js";

interface AccountDetailViewProps {
    readonly accountId: string;
}

export function AccountDetailView({ accountId }: AccountDetailViewProps) {
    const router = useRouter();
    const [account, setAccount] = useState<AccountDetail | null>(null);
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [draft, setDraft] = useState<AccountDetailDraft | null>(null);
    const [contactDraft, setContactDraft] =
        useState<ContactDraft>(EMPTY_CONTACT_DRAFT);
    const [editContactId, setEditContactId] = useState<string | null>(null);
    const [editContactDraft, setEditContactDraft] =
        useState<ContactDraft>(EMPTY_CONTACT_DRAFT);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [busyMessage, setBusyMessage] = useState("");
    const [message, setMessage] = useState("");
    const [toast, setToast] = useState("");

    useEffect(() => {
        void load();
    }, [accountId]);

    useEffect(() => {
        if (!toast) return;
        const timeout = window.setTimeout(() => setToast(""), 6000);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    const accountProjects = projects;
    const hasAccountChanges =
        account && draft ? isAccountDetailDraftChanged(account, draft) : false;

    async function load(): Promise<void> {
        setIsLoading(true);
        setMessage("");
        try {
            const [nextAccount, nextProjects] = await Promise.all([
                getAccount(accountId),
                listProjectsByAccount(accountId),
            ]);
            setAccount(nextAccount);
            setDraft(toAccountDetailDraft(nextAccount));
            setProjects(nextProjects);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load account",
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function saveAccount(event: FormEvent): Promise<void> {
        event.preventDefault();
        if (!draft) return;
        const companyName = draft.companyName.trim();
        if (!companyName) return;
        try {
            const updated = await updateAccount(accountId, {
                companyName,
                businessNumber: optionalValue(draft.businessNumber),
                phoneNumber: optionalValue(draft.phoneNumber),
                primaryContactId: optionalValue(draft.primaryContactId),
            });
            updateAccountState(updated);
        } catch (error) {
            setMessage(errorMessage(error, "Unable to save account"));
        }
    }

    async function addContact(event: FormEvent): Promise<void> {
        event.preventDefault();
        const name = contactDraft.name.trim();
        if (!name) return;
        try {
            const updated = await createAccountContact(accountId, {
                name,
                email: optionalValue(contactDraft.email),
                phoneNumber: optionalValue(contactDraft.phoneNumber),
                role: optionalValue(contactDraft.role),
                makePrimary: contactDraft.makePrimary,
            });
            updateAccountState(updated);
            closeContactModal();
            setToast("Contact added.");
        } catch (error) {
            setMessage(errorMessage(error, "Unable to add contact"));
        }
    }

    async function saveContact(contactId: string): Promise<void> {
        const name = editContactDraft.name.trim();
        if (!name) return;
        try {
            const updated = await updateAccountContact(accountId, contactId, {
                name,
                email: optionalValue(editContactDraft.email),
                phoneNumber: optionalValue(editContactDraft.phoneNumber),
                role: optionalValue(editContactDraft.role),
            });
            updateAccountState(updated);
            setEditContactId(null);
        } catch (error) {
            setMessage(errorMessage(error, "Unable to save contact"));
        }
    }

    async function removeContact(contact: AccountContact): Promise<void> {
        const confirmed = window.confirm(`Delete contact "${contact.name}"?`);
        if (!confirmed) return;
        setBusyMessage("Deleting contact...");
        try {
            const updated = await deleteAccountContact(accountId, contact.id);
            updateAccountState(updated);
        } catch (error) {
            setMessage(errorMessage(error, "Unable to delete contact"));
        } finally {
            setBusyMessage("");
        }
    }

    async function removeAccount(): Promise<void> {
        if (!account) return;
        if (accountProjects.length > 0) {
            window.alert(
                "Remove or reassign linked projects before deleting this account.",
            );
            return;
        }
        const confirmed = window.confirm(
            `Delete "${account.companyName}" and all contacts?`,
        );
        if (!confirmed) return;
        setBusyMessage("Deleting account...");
        try {
            await deleteAccount(account.id);
            router.replace("/app/accounts");
        } catch (error) {
            setBusyMessage("");
            setMessage(errorMessage(error, "Unable to delete account"));
        }
    }

    function closeContactModal(): void {
        setContactDraft(EMPTY_CONTACT_DRAFT);
        setIsContactModalOpen(false);
    }

    function updateAccountState(updated: AccountDetail): void {
        setAccount(updated);
        setDraft(toAccountDetailDraft(updated));
    }

    if (isLoading) {
        return (
            <>
                <Box direction="column" padding="md">
                    <div className={ui.projectListState}>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text size="sm" variant="muted">
                            Loading account...
                        </Text>
                    </div>
                </Box>
            </>
        );
    }

    return (
        <>
            {busyMessage && <BusyOverlay message={busyMessage} />}
            <AccountDetailHeader
                account={account}
                refresh={() => void load()}
            />
            <Box direction="column" gap="lg" padding="md">
                {toast && (
                    <div className={ui.toast}>
                        <span>{toast}</span>
                        <Button
                            variant="secondary"
                            icon={<X size={16} aria-hidden="true" />}
                            onClick={() => setToast("")}
                            aria-label="Dismiss message"
                            type="button"
                        />
                    </div>
                )}
                {message && (
                    <Paragraph textSize="sm" variant="muted">
                        {message}
                    </Paragraph>
                )}
                {account && draft ? (
                    <section
                        className={cx(
                            "mx-auto grid w-[min(1600px,calc(100vw-48px))] grid-cols-[minmax(520px,0.48fr)_minmax(0,1fr)] items-start gap-[18px] min-[1500px]:w-[min(1600px,80vw)] max-[980px]:grid-cols-1",
                        )}
                    >
                        <AccountDetailsPanel
                            account={account}
                            draft={draft}
                            hasAccountChanges={hasAccountChanges}
                            removeAccount={removeAccount}
                            saveAccount={saveAccount}
                            setDraft={setDraft}
                        />
                        <div className="grid gap-[18px]">
                            <ContactsPanel
                                account={account}
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
                            <AccountProjectsPanel projects={accountProjects} />
                        </div>
                    </section>
                ) : (
                    <section className={ui.panel}>Account not found.</section>
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
