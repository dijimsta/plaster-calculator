"use client";

import { Button, Input, Paragraph, Toggle } from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import { userPageStyles as styles } from "./page.styles.js";
import { getSettings, updateSettings } from "../../../lib/api.js";

import type { UserSettings } from "../../../types.js";

const minimumReminderDays = 1;

export function UserSettingsPanel() {
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [quoteFollowUpEnabled, setQuoteFollowUpEnabled] = useState(true);
    const [quoteFollowUpDays, setQuoteFollowUpDays] = useState(3);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        void loadSettings();
    }, []);

    async function loadSettings(): Promise<void> {
        setLoading(true);
        try {
            const nextSettings = await getSettings();
            setSettings(nextSettings);
            setQuoteFollowUpEnabled(nextSettings.quoteFollowUpEnabled);
            setQuoteFollowUpDays(nextSettings.quoteFollowUpDays);
            setMessage("");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load settings.",
            );
        } finally {
            setLoading(false);
        }
    }

    async function saveSettings(): Promise<void> {
        setSaving(true);
        try {
            const nextSettings = await updateSettings({
                quoteFollowUpEnabled,
                quoteFollowUpDays: sanitizeReminderDays(quoteFollowUpDays),
            });
            setSettings(nextSettings);
            setQuoteFollowUpEnabled(nextSettings.quoteFollowUpEnabled);
            setQuoteFollowUpDays(nextSettings.quoteFollowUpDays);
            setMessage("Settings saved.");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to save settings.",
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className={styles.section}>
            <div className={styles.sectionCopy}>
                <h2 className={styles.sectionTitle}>Reminder settings</h2>
                <Paragraph
                    className={styles.sectionDescription}
                    textSize="sm"
                    variant="muted"
                >
                    Control how quote follow-up reminders are created for new
                    work.
                </Paragraph>
                <div className={styles.statusText}>
                    {loading && (
                        <Paragraph textSize="sm" variant="muted">
                            Loading settings...
                        </Paragraph>
                    )}
                    {message && (
                        <Paragraph textSize="sm" variant="muted">
                            {message}
                        </Paragraph>
                    )}
                </div>
            </div>
            <div className={styles.settingsPanel}>
                <div className={styles.settingRow}>
                    <div className={styles.settingText}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="quoteFollowUpEnabled"
                        >
                            Quote follow-up reminders
                        </label>
                        <Paragraph textSize="sm" variant="muted">
                            Automatically create reminders to follow up on
                            quotes.
                        </Paragraph>
                    </div>
                    <Toggle
                        id="quoteFollowUpEnabled"
                        checked={quoteFollowUpEnabled}
                        disabled={loading || saving}
                        onChange={(event) =>
                            setQuoteFollowUpEnabled(event.target.checked)
                        }
                    />
                </div>
                {quoteFollowUpEnabled && (
                    <div className={styles.fieldGroup}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="quoteFollowUpDays"
                        >
                            Due in days
                        </label>
                        <Input
                            id="quoteFollowUpDays"
                            disabled={loading || saving}
                            min={minimumReminderDays}
                            step={1}
                            type="number"
                            value={quoteFollowUpDays}
                            onChange={(event) =>
                                setQuoteFollowUpDays(
                                    sanitizeReminderDays(
                                        Number(event.target.value),
                                    ),
                                )
                            }
                        />
                    </div>
                )}
                <div className={styles.actionRow}>
                    <Button
                        variant="primary"
                        disabled={loading || saving || !settings}
                        onClick={() => void saveSettings()}
                    >
                        {saving ? "Saving..." : "Save reminder settings"}
                    </Button>
                </div>
            </div>
        </section>
    );
}

function sanitizeReminderDays(value: number): number {
    if (!Number.isInteger(value) || value < minimumReminderDays) {
        return minimumReminderDays;
    }

    return value;
}
