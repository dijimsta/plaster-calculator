"use client";

import { READINESS_CHECKS } from "@libraries/plaster-calculator-common";
import {
    ReadinessCheckList,
    ReadinessSummaryHeader,
    useQuotesTranslation,
} from "@libraries/plaster-calculator-ui";
import {
    useProjectsService,
    useQuoteReadiness,
} from "@libraries/plaster-calculator-web-core";
import { Box, Text } from "@libraries/uikit-web";
import { LoaderCircle } from "lucide-react";
import { use, useCallback, useEffect, useState } from "react";

import { ui } from "../../../../../lib/styles.js";
import type { ProjectDetail } from "../../../../../types.js";
import { ProjectHeader } from "../project-page-header.js";

import { useQuoteReadinessFixControlRenderer } from "./page.hooks.js";

export default function ProjectQuoteReadinessPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
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
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : t("projectQuoteReadinessPage.unableToLoadProject"),
            );
        }
    }, [projectId, projectsService, t]);

    useEffect(() => {
        void load();
    }, [load]);

    async function saveRename() {
        if (!project || !renameValue.trim()) return;
        try {
            const renamed = await projectsService.renameProject(
                project.id,
                renameValue.trim(),
            );
            setProject(renamed);
            setRenaming(false);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : t("projectQuoteReadinessPage.unableToLoadProject"),
            );
        }
    }

    const readiness = useQuoteReadiness(projectId);
    const renderFixControl = useQuoteReadinessFixControlRenderer(projectId);

    // Quote generation itself belongs to the take-off/generation epic, not
    // WORK-124 (Quote readiness gate) — the epic's scope guard explicitly
    // calls those out as a sibling epic. This button stays inert until that
    // epic wires real navigation/generation.
    function handleGenerateQuote(): void {
        // TODO: wire actual quote generation once the take-off/generation
        // epic lands it — out of scope for WORK-124.
    }

    return (
        <>
            <ProjectHeader
                project={project}
                projectId={projectId}
                activeTab="quote"
                renaming={renaming}
                renameValue={renameValue}
                load={load}
                saveRename={saveRename}
                setRenaming={setRenaming}
                setRenameValue={setRenameValue}
            />
            <Box padding="md" direction="column" gap="md">
                {error && <p className={ui.error}>{error}</p>}
                {readiness.loading ? (
                    <Box align="center" justify="center" gap="sm" status>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text variant="muted">
                            {t("projectQuoteReadinessPage.loadingReadiness")}
                        </Text>
                    </Box>
                ) : readiness.error ? (
                    <p className={ui.error}>
                        {t("projectQuoteReadinessPage.unableToLoadReadiness")}
                    </p>
                ) : (
                    <Box direction="column" gap="lg">
                        <ReadinessSummaryHeader
                            results={readiness.results}
                            onGenerateQuote={handleGenerateQuote}
                        />
                        <ReadinessCheckList
                            checks={READINESS_CHECKS}
                            results={readiness.results}
                            renderFixControl={renderFixControl}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
}
