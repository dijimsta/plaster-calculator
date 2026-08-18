import { READINESS_CHECKS } from "@libraries/plaster-calculator-common";
import {
    EditableQuoteForm,
    QuoteDetailDocument,
    ReadinessSummaryHeader,
    useQuotesTranslation,
} from "@libraries/plaster-calculator-ui";
import type {
    ReadinessCheckListRenderCheckFooter,
    ReadinessCheckListRenderFixControl,
} from "@libraries/plaster-calculator-ui";
import type { useQuoteReadiness } from "@libraries/plaster-calculator-web-core";
import { Box, Text } from "@libraries/uikit-web";
import { LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";

import { ui } from "../../../../../lib/styles.js";

import type { ProjectQuoteEditorState } from "./project-quote-page.hooks.js";
import type { ProjectQuoteState } from "./quote-generation.hooks.js";

export type ProjectQuoteContentProps = {
    readonly projectError: string;
    readonly readiness: ReturnType<typeof useQuoteReadiness>;
    readonly renderFixControl: ReadinessCheckListRenderFixControl;
    readonly renderCheckFooter: ReadinessCheckListRenderCheckFooter;
    readonly projectQuote: ProjectQuoteState;
    readonly editor: ProjectQuoteEditorState;
    readonly isGenerating: boolean;
    readonly generationErrorMessage: string | null;
    readonly onGenerateQuote: () => void;
};

export function ProjectQuoteContent({
    projectError,
    readiness,
    renderFixControl,
    renderCheckFooter,
    projectQuote,
    editor,
    isGenerating,
    generationErrorMessage,
    onGenerateQuote,
}: ProjectQuoteContentProps): ReactElement {
    return (
        <Box padding="md" direction="column" gap="lg">
            {projectError && <p className={ui.error}>{projectError}</p>}
            <ReadinessContent
                readiness={readiness}
                renderFixControl={renderFixControl}
                renderCheckFooter={renderCheckFooter}
                isGenerating={isGenerating}
                generationErrorMessage={generationErrorMessage}
                onGenerateQuote={onGenerateQuote}
            />
            <ProjectQuoteBody projectQuote={projectQuote} editor={editor} />
        </Box>
    );
}

function ReadinessContent({
    readiness,
    renderFixControl,
    renderCheckFooter,
    isGenerating,
    generationErrorMessage,
    onGenerateQuote,
}: Pick<
    ProjectQuoteContentProps,
    | "readiness"
    | "renderFixControl"
    | "renderCheckFooter"
    | "isGenerating"
    | "generationErrorMessage"
    | "onGenerateQuote"
>): ReactElement {
    const { t } = useQuotesTranslation();

    if (readiness.loading) {
        return (
            <PageStatus
                label={t("projectQuoteReadinessPage.loadingReadiness")}
            />
        );
    }
    if (readiness.error) {
        return (
            <p className={ui.error}>
                {t("projectQuoteReadinessPage.unableToLoadReadiness")}
            </p>
        );
    }

    return (
        <>
            <ReadinessSummaryHeader
                results={readiness.results}
                onGenerateQuote={onGenerateQuote}
                isGenerating={isGenerating}
                summaryChecks={READINESS_CHECKS}
                renderFixControl={renderFixControl}
                renderCheckFooter={renderCheckFooter}
            />
            {generationErrorMessage && (
                <p className={ui.error}>{generationErrorMessage}</p>
            )}
        </>
    );
}

function ProjectQuoteBody({
    projectQuote,
    editor,
}: Pick<
    ProjectQuoteContentProps,
    "projectQuote" | "editor"
>): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (projectQuote.isLoading) {
        return <PageStatus label={t("quoteDetailPage.loading")} />;
    }
    if (projectQuote.error) {
        return (
            <p className={ui.error}>
                {t("projectQuoteReadinessPage.unableToLoadQuote")}
            </p>
        );
    }
    if (!projectQuote.editableValues) {
        return projectQuote.document ? (
            <QuoteDetailDocument {...projectQuote.document} />
        ) : null;
    }

    return (
        <>
            <EditableQuoteForm
                formId="project-quote-form"
                initialValues={projectQuote.editableValues}
                disabled={editor.isSaving}
                onSubmit={editor.save}
            />
            {projectQuote.document && (
                <QuoteDetailDocument {...projectQuote.document} printOnly />
            )}
        </>
    );
}

function PageStatus({ label }: { readonly label: string }): ReactElement {
    return (
        <Box align="center" justify="center" gap="sm" padding="md" status>
            <LoaderCircle className="animate-spin" size={24} />
            <Text variant="muted">{label}</Text>
        </Box>
    );
}
