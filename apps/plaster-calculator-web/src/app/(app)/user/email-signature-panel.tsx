"use client";

import { useUserSignature } from "@libraries/plaster-calculator-web-core";
import {
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    Input,
    Paragraph,
    Textarea,
} from "@libraries/uikit-web";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

export function EmailSignaturePanel() {
    const { t } = useAppTranslation();
    const { signature, loading, saving, error, saveSignature } =
        useUserSignature();

    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [saveMessage, setSaveMessage] = useState("");

    useEffect(() => {
        if (!signature) return;
        setName(signature.signature.name ?? "");
        setCompanyName(signature.signature.companyName ?? "");
        setAddress(signature.signature.address ?? "");
        setMobile(signature.signature.mobile ?? "");
        setPhone(signature.signature.phone ?? "");
        setEmail(signature.signature.email ?? "");
    }, [signature]);

    async function handleSave(): Promise<void> {
        try {
            await saveSignature({
                name: name || null,
                companyName: companyName || null,
                address: address || null,
                mobile: mobile || null,
                phone: phone || null,
                email: email || null,
            });
            setSaveMessage(t("emailSignature.saved"));
        } catch {
            setSaveMessage("");
        }
    }

    const disabled = loading || saving;
    const statusMessage = error ? error.message : saveMessage;

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        void handleSave();
    }

    return (
        <Card>
            <Card.Title>{t("emailSignature.title")}</Card.Title>
            <Paragraph measure="narrow" textSize="sm" variant="muted">
                {t("emailSignature.description")}
            </Paragraph>
            {loading && (
                <Paragraph textSize="sm" variant="muted">
                    {t("emailSignature.loading")}
                </Paragraph>
            )}
            {statusMessage && (
                <Paragraph textSize="sm" variant="muted" status>
                    {statusMessage}
                </Paragraph>
            )}
            <FormLayout onSubmit={handleSubmit}>
                <FormLayoutField
                    label={t("emailSignature.fields.name")}
                    htmlFor="signature-name"
                >
                    <Input
                        id="signature-name"
                        disabled={disabled}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField
                    label={t("emailSignature.fields.companyName")}
                    htmlFor="signature-company-name"
                >
                    <Input
                        id="signature-company-name"
                        disabled={disabled}
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField
                    label={t("emailSignature.fields.address")}
                    htmlFor="signature-address"
                >
                    <Textarea
                        id="signature-address"
                        disabled={disabled}
                        rows={3}
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField
                    label={t("emailSignature.fields.mobile")}
                    htmlFor="signature-mobile"
                >
                    <Input
                        id="signature-mobile"
                        disabled={disabled}
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField
                    label={t("emailSignature.fields.phone")}
                    htmlFor="signature-phone"
                >
                    <Input
                        id="signature-phone"
                        disabled={disabled}
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField
                    label={t("emailSignature.fields.email")}
                    htmlFor="signature-email"
                >
                    <Input
                        id="signature-email"
                        disabled={disabled}
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutActions>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={disabled || !signature}
                    >
                        {saving
                            ? t("emailSignature.saving")
                            : t("emailSignature.save")}
                    </Button>
                </FormLayoutActions>
            </FormLayout>
        </Card>
    );
}
