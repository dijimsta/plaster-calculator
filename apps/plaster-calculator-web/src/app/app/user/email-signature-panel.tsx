"use client";

import { useUserSignature } from "@libraries/plaster-calculator-web-core";
import { Button, Input, Paragraph, Textarea } from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import { userPageStyles as styles } from "./page.styles.js";

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

    return (
        <section className={styles.section}>
            <div className={styles.sectionCopy}>
                <h2 className={styles.sectionTitle}>Email signature</h2>
                <Paragraph
                    className={styles.sectionDescription}
                    textSize="sm"
                    variant="muted"
                >
                    These details are used to build the signature appended to
                    outgoing emails.
                </Paragraph>
                <div className={styles.statusText}>
                    {loading && (
                        <Paragraph textSize="sm" variant="muted">
                            Loading email signature...
                        </Paragraph>
                    )}
                    {statusMessage && (
                        <Paragraph textSize="sm" variant="muted">
                            {statusMessage}
                        </Paragraph>
                    )}
                </div>
            </div>
            <div className={styles.settingsPanel}>
                <div className={styles.fieldsGrid}>
                    <div className={styles.fieldGroupCell}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="signature-name"
                        >
                            Name
                        </label>
                        <Input
                            id="signature-name"
                            disabled={disabled}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className={styles.fieldGroupCell}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="signature-company-name"
                        >
                            Company name
                        </label>
                        <Input
                            id="signature-company-name"
                            disabled={disabled}
                            value={companyName}
                            onChange={(event) =>
                                setCompanyName(event.target.value)
                            }
                        />
                    </div>
                    <div className={styles.fieldGroupCellWide}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="signature-address"
                        >
                            Address
                        </label>
                        <Textarea
                            id="signature-address"
                            disabled={disabled}
                            rows={3}
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                    <div className={styles.fieldGroupCell}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="signature-mobile"
                        >
                            Mobile
                        </label>
                        <Input
                            id="signature-mobile"
                            disabled={disabled}
                            value={mobile}
                            onChange={(event) => setMobile(event.target.value)}
                        />
                    </div>
                    <div className={styles.fieldGroupCell}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="signature-phone"
                        >
                            Phone
                        </label>
                        <Input
                            id="signature-phone"
                            disabled={disabled}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className={styles.fieldGroupCellWide}>
                        <label
                            className={styles.fieldLabel}
                            htmlFor="signature-email"
                        >
                            Email
                        </label>
                        <Input
                            id="signature-email"
                            disabled={disabled}
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.actionRow}>
                    <Button
                        variant="primary"
                        disabled={disabled || !signature}
                        onClick={() => void handleSave()}
                    >
                        {saving ? "Saving..." : "Save email signature"}
                    </Button>
                </div>
            </div>
        </section>
    );
}
