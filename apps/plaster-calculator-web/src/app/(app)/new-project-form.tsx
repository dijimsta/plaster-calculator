"use client";

import { Button, Input, Label, Text } from "@libraries/uikit-web";
import { Upload } from "lucide-react";

import { CompanySelect } from "../../components/company-select.js";
import { useAppTranslation } from "../../i18n/index.ts";
import { cx, ui } from "../../lib/styles.js";

import type {
    FileInputChange,
    NewProjectFormProps,
} from "./dashboard.types.js";

export function NewProjectForm({
    companyCreatePending,
    companyId,
    dragActive,
    file,
    loading,
    message,
    name,
    handleDrop,
    handleFileSelection,
    onCompanyCreated,
    setCompanyCreatePending,
    setCompanyId,
    setDragActive,
    setName,
    submit,
}: NewProjectFormProps) {
    const { t } = useAppTranslation();

    return (
        <form
            className={cx(ui.panel, ui.stack, "self-start")}
            onSubmit={submit}
        >
            <h2>{t("newProjectForm.title")}</h2>
            <div className={ui.field}>
                <Label htmlFor="name">
                    {t("newProjectForm.projectNameLabel")}
                </Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={t("newProjectForm.projectNamePlaceholder")}
                />
            </div>
            <CompanySelect
                selectedCompanyId={companyId}
                onChange={setCompanyId}
                onCreated={onCompanyCreated}
                onCreatePendingChange={setCompanyCreatePending}
                disabled={loading}
                label={t("newProjectForm.companyLabel")}
                placeholder={t("newProjectForm.companyPlaceholder")}
            />
            <div className={ui.field}>
                <span className={ui.label}>
                    {t("newProjectForm.fileLabel")}
                </span>
                <label
                    className={cx(
                        ui.fileDropzone,
                        dragActive && ui.fileDropzoneActive,
                    )}
                    htmlFor="file"
                    onDragEnter={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                >
                    <input
                        id="file"
                        type="file"
                        accept="application/pdf,image/*"
                        className={ui.hiddenFileInput}
                        onChange={(event: FileInputChange) =>
                            handleFileSelection(event.target.files?.[0])
                        }
                    />
                    <Upload size={28} />
                    <strong>
                        {file
                            ? file.name
                            : t("newProjectForm.dropFileInstruction")}
                    </strong>
                    <Text size="sm" variant="muted">
                        {file
                            ? t("newProjectForm.chooseDifferentFile")
                            : t("newProjectForm.browseFileInstruction")}
                    </Text>
                </label>
            </div>
            <Button
                variant="primary"
                disabled={!file || loading || companyCreatePending}
            >
                <Upload size={18} /> {t("newProjectForm.upload")}
            </Button>
            {message && (
                <p
                    className={
                        message.includes("failed") || message.includes("Unable")
                            ? ui.error
                            : ui.muted
                    }
                >
                    {message}
                </p>
            )}
        </form>
    );
}
