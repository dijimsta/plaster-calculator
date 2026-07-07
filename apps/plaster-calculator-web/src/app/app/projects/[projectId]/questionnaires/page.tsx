"use client";

import { Box, EmptyState } from "@libraries/uikit-web";
import { ClipboardList } from "lucide-react";
import { use, useCallback, useEffect, useState } from "react";

import { getProject, renameProject } from "../../../../../lib/api.js";
import { ui } from "../../../../../lib/styles.js";
import { ProjectHeader } from "../project-page-header.js";

import type { ProjectDetail } from "../../../../../types.js";

export default function ProjectQuestionnairesPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [error, setError] = useState("");
    const [renaming, setRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");

    const load = useCallback(async (): Promise<void> => {
        try {
            const detail = await getProject(projectId);
            setProject(detail);
            setRenameValue(detail.name);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load project",
            );
        }
    }, [projectId]);

    useEffect(() => {
        void load();
    }, [load]);

    async function saveRename() {
        if (!project || !renameValue.trim()) return;
        try {
            const renamed = await renameProject(project.id, renameValue.trim());
            setProject(renamed);
            setRenaming(false);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to rename project",
            );
        }
    }

    return (
        <>
            <ProjectHeader
                project={project}
                projectId={projectId}
                activeTab="questionnaires"
                renaming={renaming}
                renameValue={renameValue}
                load={load}
                saveRename={saveRename}
                setRenaming={setRenaming}
                setRenameValue={setRenameValue}
            />
            <Box padding="md">
                {error && <p className={ui.error}>{error}</p>}
                <EmptyState
                    icon={<ClipboardList />}
                    title="No questionnaire yet"
                    description="This project's questionnaire will appear here."
                />
            </Box>
        </>
    );
}
