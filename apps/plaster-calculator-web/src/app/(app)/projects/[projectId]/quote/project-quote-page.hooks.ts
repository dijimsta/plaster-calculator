"use client";

import type { EditableQuoteFormValues } from "@libraries/plaster-calculator-ui";
import { useQuotesTranslation } from "@libraries/plaster-calculator-ui";
import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

import type { ProjectDetail } from "../../../../../types.js";

import { useSaveProjectQuote } from "./quote-editing.hooks.js";
import type { ProjectQuoteState } from "./quote-generation.hooks.js";

export type ProjectQuotePageProjectState = {
    readonly project: ProjectDetail | null;
    readonly error: string;
    readonly renaming: boolean;
    readonly renameValue: string;
    readonly saveRename: () => Promise<void>;
    readonly setRenaming: Dispatch<SetStateAction<boolean>>;
    readonly setRenameValue: Dispatch<SetStateAction<string>>;
};

export function useProjectQuotePageProject(
    projectId: string,
): ProjectQuotePageProjectState {
    const { t } = useQuotesTranslation();
    const projectsService = useProjectsService();
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [error, setError] = useState("");
    const [renaming, setRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");

    const load = useCallback(async (): Promise<void> => {
        try {
            const detail = await projectsService.getProject(projectId);
            setProject(detail);
            setRenameValue(detail.name);
        } catch (loadError) {
            setError(
                loadError instanceof Error
                    ? loadError.message
                    : t("projectQuoteReadinessPage.unableToLoadProject"),
            );
        }
    }, [projectId, projectsService, t]);

    useEffect(() => {
        void load();
    }, [load]);

    const saveRename = useCallback(async (): Promise<void> => {
        if (!project || !renameValue.trim()) return;
        try {
            const renamed = await projectsService.renameProject(
                project.id,
                renameValue.trim(),
            );
            setProject(renamed);
            setRenaming(false);
        } catch (renameError) {
            setError(
                renameError instanceof Error
                    ? renameError.message
                    : t("projectQuoteReadinessPage.unableToLoadProject"),
            );
        }
    }, [project, projectsService, renameValue, t]);

    return {
        project,
        error,
        renaming,
        renameValue,
        saveRename,
        setRenaming,
        setRenameValue,
    };
}

export type ProjectQuoteEditorState = {
    readonly isSaving: boolean;
    readonly save: (values: EditableQuoteFormValues) => Promise<void>;
};

export function useProjectQuoteEditor(
    projectId: string,
    projectQuote: ProjectQuoteState,
): ProjectQuoteEditorState {
    const { isSaving, saveQuote } = useSaveProjectQuote(projectId);
    const save = useCallback(
        async (values: EditableQuoteFormValues): Promise<void> => {
            if (!projectQuote.quoteId || !projectQuote.editableValues) return;
            await saveQuote(
                projectQuote.quoteId,
                projectQuote.editableValues,
                values,
            );
        },
        [projectQuote.editableValues, projectQuote.quoteId, saveQuote],
    );

    return {
        isSaving,
        save,
    };
}
