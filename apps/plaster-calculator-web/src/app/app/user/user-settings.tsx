"use client";

import { Button } from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import { getSettings, updateSettings } from "../../../lib/api.js";
import { cx, ui } from "../../../lib/styles.js";

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
        <section className={cx(ui.panel, ui.stack)}>
            <div>
                <h2>Reminder settings</h2>
                {loading && <p className={ui.muted}>Loading settings...</p>}
                {message && <p className={ui.muted}>{message}</p>}
            </div>
            <label className="flex items-center gap-3">
                <input
                    checked={quoteFollowUpEnabled}
                    disabled={loading || saving}
                    type="checkbox"
                    onChange={(event) =>
                        setQuoteFollowUpEnabled(event.target.checked)
                    }
                />
                <span>
                    Automatically create reminders to follow up on quotes
                </span>
            </label>
            {quoteFollowUpEnabled && (
                <div className={cx(ui.field, "max-w-[220px]")}>
                    <label htmlFor="quoteFollowUpDays">
                        Automatic reminder due date in days
                    </label>
                    <input
                        id="quoteFollowUpDays"
                        className={ui.input}
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
            <div className={ui.buttonRow}>
                <Button
                    variant="primary"
                    disabled={loading || saving || !settings}
                    onClick={() => void saveSettings()}
                >
                    {saving ? "Saving..." : "Save reminder settings"}
                </Button>
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
