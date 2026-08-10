"use client";

import { useSettingsService } from "@libraries/plaster-calculator-web-core";
import {
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    Input,
    Paragraph,
    Toggle,
} from "@libraries/uikit-web";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type { UserSettings } from "../../../types.js";

const minimumReminderDays = 1;

export function UserSettingsPanel() {
    const settingsService = useSettingsService();
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [quoteFollowUpEnabled, setQuoteFollowUpEnabled] = useState(true);
    const [quoteFollowUpDays, setQuoteFollowUpDays] = useState(3);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        void loadSettings();
    }, [settingsService]);

    async function loadSettings(): Promise<void> {
        setLoading(true);
        try {
            const nextSettings = await settingsService.getSettings();
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
            const nextSettings = await settingsService.updateSettings({
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

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        void saveSettings();
    }

    return (
        <Card>
            <Card.Title>Reminder settings</Card.Title>
            <Paragraph measure="narrow" textSize="sm" variant="muted">
                Control how quote follow-up reminders are created for new work.
            </Paragraph>
            {loading && (
                <Paragraph textSize="sm" variant="muted">
                    Loading settings...
                </Paragraph>
            )}
            {message && (
                <Paragraph textSize="sm" variant="muted" status>
                    {message}
                </Paragraph>
            )}
            <FormLayout onSubmit={handleSubmit}>
                <FormLayoutField
                    label="Quote follow-up reminders"
                    htmlFor="quoteFollowUpEnabled"
                    description="Automatically create reminders to follow up on quotes."
                >
                    <Toggle
                        id="quoteFollowUpEnabled"
                        checked={quoteFollowUpEnabled}
                        disabled={loading || saving}
                        onChange={(event) =>
                            setQuoteFollowUpEnabled(event.target.checked)
                        }
                    />
                </FormLayoutField>
                {quoteFollowUpEnabled && (
                    <FormLayoutField
                        label="Due in days"
                        htmlFor="quoteFollowUpDays"
                    >
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
                    </FormLayoutField>
                )}
                <FormLayoutActions>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading || saving || !settings}
                    >
                        {saving ? "Saving..." : "Save reminder settings"}
                    </Button>
                </FormLayoutActions>
            </FormLayout>
        </Card>
    );
}

function sanitizeReminderDays(value: number): number {
    if (!Number.isInteger(value) || value < minimumReminderDays) {
        return minimumReminderDays;
    }

    return value;
}
