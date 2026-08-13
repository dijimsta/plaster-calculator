"use client";

import "@libraries/plaster-calculator-ui/quote-detail-document.print.css";

import { DRAFT_QUOTE_STATUS } from "@libraries/plaster-calculator-common";
import { usePrintQuoteDocument } from "@libraries/plaster-calculator-ui";
import { useQuoteReadiness } from "@libraries/plaster-calculator-web-core";
import { useSearchParams } from "next/navigation.js";
import { use } from "react";

import { ProjectHeader } from "../project-page-header.js";

import { useQuoteReadinessFixControlRenderer } from "./page.hooks.js";
import { ProjectQuoteContent } from "./project-quote-content.js";
import {
    useProjectQuoteEditor,
    useProjectQuotePageProject,
} from "./project-quote-page.hooks.js";
import { ProjectQuoteActions } from "./quote-detail-actions.js";
import { useAutoPrintOnMount } from "./quote-detail.hooks.js";
import {
    useGenerateQuoteAction,
    useProjectQuoteState,
} from "./quote-generation.hooks.js";

export default function ProjectQuoteReadinessPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
    const searchParams = useSearchParams();
    const projectState = useProjectQuotePageProject(projectId);
    const readiness = useQuoteReadiness(projectId);
    const renderFixControl = useQuoteReadinessFixControlRenderer(projectId);
    const projectQuote = useProjectQuoteState(projectId, projectState.project);
    const editor = useProjectQuoteEditor(projectId, projectQuote);
    const { isGenerating, errorMessage, handleGenerateQuote } =
        useGenerateQuoteAction(projectId, projectQuote.refresh);
    const { printQuoteDocument } = usePrintQuoteDocument();

    useAutoPrintOnMount(
        printQuoteDocument,
        searchParams.get("print") === "1",
        projectQuote.document !== null,
    );

    return (
        <>
            <ProjectHeader
                project={projectState.project}
                projectId={projectId}
                activeTab="quote"
                renaming={projectState.renaming}
                renameValue={projectState.renameValue}
                saveRename={projectState.saveRename}
                setRenaming={projectState.setRenaming}
                setRenameValue={projectState.setRenameValue}
                additionalActions={
                    <ProjectQuoteActions
                        projectId={projectId}
                        quoteId={projectQuote.quoteId}
                        status={
                            projectQuote.document?.status ?? DRAFT_QUOTE_STATUS
                        }
                        hasQuote={projectQuote.hasQuote}
                        hasDocument={projectQuote.document !== null}
                        isSaving={editor.isSaving}
                        onDownload={printQuoteDocument}
                    />
                }
            />
            <ProjectQuoteContent
                projectError={projectState.error}
                readiness={readiness}
                renderFixControl={renderFixControl}
                projectQuote={projectQuote}
                editor={editor}
                isGenerating={isGenerating}
                generationErrorMessage={errorMessage}
                onGenerateQuote={handleGenerateQuote}
            />
        </>
    );
}
