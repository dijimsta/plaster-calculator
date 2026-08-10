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

export function EmailSignaturePanel() {
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
            setSaveMessage("Email signature saved.");
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
            <Card.Title>Email signature</Card.Title>
            <Paragraph measure="narrow" textSize="sm" variant="muted">
                These details are used to build the signature appended to
                outgoing emails.
            </Paragraph>
            {loading && (
                <Paragraph textSize="sm" variant="muted">
                    Loading email signature...
                </Paragraph>
            )}
            {statusMessage && (
                <Paragraph textSize="sm" variant="muted" status>
                    {statusMessage}
                </Paragraph>
            )}
            <FormLayout onSubmit={handleSubmit}>
                <FormLayoutField label="Name" htmlFor="signature-name">
                    <Input
                        id="signature-name"
                        disabled={disabled}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField
                    label="Company name"
                    htmlFor="signature-company-name"
                >
                    <Input
                        id="signature-company-name"
                        disabled={disabled}
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField label="Address" htmlFor="signature-address">
                    <Textarea
                        id="signature-address"
                        disabled={disabled}
                        rows={3}
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField label="Mobile" htmlFor="signature-mobile">
                    <Input
                        id="signature-mobile"
                        disabled={disabled}
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField label="Phone" htmlFor="signature-phone">
                    <Input
                        id="signature-phone"
                        disabled={disabled}
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutField label="Email" htmlFor="signature-email">
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
                        {saving ? "Saving..." : "Save email signature"}
                    </Button>
                </FormLayoutActions>
            </FormLayout>
        </Card>
    );
}
