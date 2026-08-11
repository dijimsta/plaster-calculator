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

import { useAppTranslation } from "../../../i18n/index.ts";
import type { UserSettings } from "../../../types.js";

const minimumReminderDays = 1;

export function UserSettingsPanel() {
    const settingsService = useSettingsService();
    const { t } = useAppTranslation();
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
                    : t("userSettings.unableToLoad"),
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
            setMessage(t("userSettings.saved"));
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : t("userSettings.unableToSave"),
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
            <Card.Title>{t("userSettings.title")}</Card.Title>
            <Paragraph measure="narrow" textSize="sm" variant="muted">
                {t("userSettings.description")}
            </Paragraph>
            {loading && (
                <Paragraph textSize="sm" variant="muted">
                    {t("userSettings.loading")}
                </Paragraph>
            )}
            {message && (
                <Paragraph textSize="sm" variant="muted" status>
                    {message}
                </Paragraph>
            )}
            <FormLayout onSubmit={handleSubmit}>
                <FormLayoutField
                    label={t("userSettings.quoteFollowUpReminders")}
                    htmlFor="quoteFollowUpEnabled"
                    description={t("userSettings.quoteFollowUpDescription")}
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
                        label={t("userSettings.dueInDays")}
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
                        {saving
                            ? t("userSettings.saving")
                            : t("userSettings.save")}
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
