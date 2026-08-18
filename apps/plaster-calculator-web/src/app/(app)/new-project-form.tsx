"use client";

import {
    Box,
    Button,
    Card,
    IconTile,
    Input,
    Label,
    Text,
} from "@libraries/uikit-web";
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
    const isErrorMessage =
        message.includes("failed") || message.includes("Unable");

    return (
        <Card overflow="visible">
            <form onSubmit={submit}>
                <Card.Title>{t("newProjectForm.title")}</Card.Title>
                <Card.Body>
                    <Box direction="row" gap="md" wrap>
                        <Box direction="column" grow>
                            <div className={ui.field}>
                                <Label htmlFor="name">
                                    {t("newProjectForm.projectNameLabel")}
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder={t(
                                        "newProjectForm.projectNamePlaceholder",
                                    )}
                                />
                            </div>
                        </Box>
                        <Box direction="column" basis="2/5">
                            <CompanySelect
                                selectedCompanyId={companyId}
                                onChange={setCompanyId}
                                onCreated={onCompanyCreated}
                                onCreatePendingChange={setCompanyCreatePending}
                                disabled={loading}
                                label={t("newProjectForm.companyLabel")}
                                placeholder={t(
                                    "newProjectForm.companyPlaceholder",
                                )}
                            />
                        </Box>
                    </Box>
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
                        <IconTile size="lg" tone="indigoSoft">
                            <Upload size={24} />
                        </IconTile>
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
                    <Button
                        variant="primary"
                        disabled={!file || loading || companyCreatePending}
                    >
                        <Upload size={18} /> {t("newProjectForm.upload")}
                    </Button>
                    {message && (
                        <Text
                            size="sm"
                            variant={isErrorMessage ? "danger" : "muted"}
                        >
                            {message}
                        </Text>
                    )}
                </Card.Body>
            </form>
        </Card>
    );
}
