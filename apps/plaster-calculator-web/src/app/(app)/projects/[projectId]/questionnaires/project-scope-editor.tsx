"use client";

import { useQuestionnairesTranslation } from "@libraries/plaster-calculator-ui";
import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import {
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    Textarea,
} from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import type { ProjectDetail } from "../../../../../types.js";

export type ProjectScopeEditorProps = {
    readonly project: ProjectDetail | null;
    readonly projectId: string;
    readonly onSaved: (project: ProjectDetail) => void;
    readonly onError: (message: string) => void;
};

export function ProjectScopeEditor({
    project,
    projectId,
    onSaved,
    onError,
}: ProjectScopeEditorProps) {
    const { t } = useQuestionnairesTranslation();
    const projectsService = useProjectsService();
    const savedScope = project?.scope ?? "";
    const [scopeValue, setScopeValue] = useState(savedScope);
    const [isSaving, setSaving] = useState(false);

    useEffect(() => {
        setScopeValue(savedScope);
    }, [savedScope]);

    async function saveScope(): Promise<void> {
        setSaving(true);
        try {
            const updated = await projectsService.updateProject({
                projectId,
                scope: scopeValue.trim() === "" ? null : scopeValue,
            });
            onSaved(updated);
            onError("");
        } catch (error) {
            onError(
                error instanceof Error
                    ? error.message
                    : t("projectQuestionnairesPage.unableToSaveScope"),
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <Card>
            <FormLayout
                onSubmit={(event) => {
                    event.preventDefault();
                    void saveScope();
                }}
            >
                <FormLayoutField
                    label={t("projectQuestionnairesPage.scopeLabel")}
                    description={t(
                        "projectQuestionnairesPage.scopeDescription",
                    )}
                    htmlFor="project-scope"
                >
                    <Textarea
                        id="project-scope"
                        rows={8}
                        value={scopeValue}
                        placeholder={t(
                            "projectQuestionnairesPage.scopePlaceholder",
                        )}
                        disabled={!project || isSaving}
                        onChange={(event) => setScopeValue(event.target.value)}
                    />
                </FormLayoutField>
                <FormLayoutActions>
                    <Button
                        type="submit"
                        disabled={
                            !project || isSaving || scopeValue === savedScope
                        }
                    >
                        {isSaving
                            ? t("projectQuestionnairesPage.savingScope")
                            : t("projectQuestionnairesPage.saveScope")}
                    </Button>
                </FormLayoutActions>
            </FormLayout>
        </Card>
    );
}
