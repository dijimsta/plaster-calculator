"use client";

import { PDF_UPLOAD_TYPE } from "@libraries/plaster-calculator-common";
import { NewProjectWizardModal } from "@libraries/plaster-calculator-ui";
import { Box, Button, DescriptionList, Text } from "@libraries/uikit-web";
import { FileUp, LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";

import type { UseDashboardUploadResult } from "./hooks/use-dashboard-upload.js";
import { PdfPageModalContent } from "./pdf-page-modal-content.js";
import { WizardClarificationsStep } from "./wizard-clarifications-step.js";

interface NewProjectWizardProps {
    readonly upload: UseDashboardUploadResult;
    readonly progressMessage: string;
}

/**
 * Hosts the new-project wizard once an upload starts: step 1 recaps what's
 * being uploaded while it processes, step 2 is the clarifications step
 * (persisted against the project created in step 1), and step 3 -- PDF
 * uploads only -- is the existing page picker. Non-PDF uploads have no
 * step 3: step 2's primary action finishes the wizard and routes to the
 * project directly, the same way the PDF flow does once its pages are
 * processed.
 */
export function NewProjectWizard({
    upload,
    progressMessage,
}: NewProjectWizardProps): ReactElement | null {
    if (!upload.wizardOpen) return null;

    return (
        <NewProjectWizardModal
            open={upload.wizardOpen}
            onClose={upload.closeWizard}
            currentStep={upload.wizardStep}
            onStepChange={upload.goToWizardStep}
            footer={<WizardFooter upload={upload} />}
        >
            {upload.wizardStep === 1 && (
                <WizardDetailsStep
                    file={upload.file}
                    name={upload.name}
                    progressMessage={progressMessage}
                />
            )}
            {upload.wizardStep === 2 && upload.draftProjectId && (
                <WizardClarificationsStep
                    projectId={upload.draftProjectId}
                    companyId={upload.companyId}
                />
            )}
            {upload.wizardStep === 3 && (
                <PdfPageModalContent
                    errorMessage={upload.pdfPageError}
                    pageUploadProgress={upload.pageUploadProgress}
                    pdfPages={upload.pdfPages}
                    selectedPages={upload.selectedPages}
                    togglePage={upload.togglePage}
                />
            )}
        </NewProjectWizardModal>
    );
}

function WizardDetailsStep({
    file,
    name,
    progressMessage,
}: {
    readonly file: File | null;
    readonly name: string;
    readonly progressMessage: string;
}): ReactElement {
    const { t } = useAppTranslation();

    return (
        <Box direction="column" gap="lg">
            <DescriptionList
                items={[
                    {
                        term: t(
                            "newProjectWizard.detailsStep.projectNameLabel",
                        ),
                        details: name || file?.name || "—",
                    },
                    {
                        term: t("newProjectWizard.detailsStep.fileLabel"),
                        details: file?.name ?? "—",
                    },
                ]}
            />
            <Box direction="row" gap="sm" align="center">
                <LoaderCircle size={16} className="animate-spin" />
                <Text size="sm" variant="muted">
                    {progressMessage ||
                        t("newProjectWizard.detailsStep.creatingProject")}
                </Text>
            </Box>
        </Box>
    );
}

function WizardFooter({
    upload,
}: {
    readonly upload: UseDashboardUploadResult;
}): ReactElement {
    if (upload.wizardStep === 1)
        return <WizardDetailsStepFooter upload={upload} />;
    if (upload.wizardStep === 2)
        return <WizardClarificationsStepFooter upload={upload} />;
    return <WizardPagesStepFooter upload={upload} />;
}

function WizardDetailsStepFooter({
    upload,
}: {
    readonly upload: UseDashboardUploadResult;
}): ReactElement {
    const { t } = useAppTranslation();
    const cancelButton = (
        <Button
            variant="secondary"
            disabled={upload.loading}
            onClick={upload.closeWizard}
        >
            {t("newProjectWizard.footer.cancel")}
        </Button>
    );

    // The upload is still in flight (or hasn't produced a project yet) --
    // there's nothing to move forward to.
    if (upload.loading || !upload.draftProjectId) {
        return cancelButton;
    }

    // Reached by navigating back from a later step via the rail (the rail
    // allows clicking any step before the current one) -- the upload
    // already succeeded, so offer a way forward again rather than a dead end.
    return (
        <>
            {cancelButton}
            <Button variant="primary" onClick={() => upload.goToWizardStep(2)}>
                {t("newProjectWizard.footer.continueToClarifications")}
            </Button>
        </>
    );
}

function WizardClarificationsStepFooter({
    upload,
}: {
    readonly upload: UseDashboardUploadResult;
}): ReactElement {
    const { t } = useAppTranslation();
    const isPdf = upload.uploadType === PDF_UPLOAD_TYPE;

    return (
        <>
            <Button variant="secondary" onClick={upload.closeWizard}>
                {t("newProjectWizard.footer.cancel")}
            </Button>
            <Button
                variant="secondary"
                onClick={() => upload.goToWizardStep(1)}
            >
                {t("newProjectWizard.footer.back")}
            </Button>
            <Button
                variant="primary"
                onClick={isPdf ? upload.goToPagesStep : upload.finishWizard}
            >
                {isPdf
                    ? t("newProjectWizard.footer.continueToPages")
                    : t("newProjectWizard.footer.finish")}
            </Button>
        </>
    );
}

function WizardPagesStepFooter({
    upload,
}: {
    readonly upload: UseDashboardUploadResult;
}): ReactElement {
    const { t } = useAppTranslation();

    return (
        <>
            <Button
                variant="secondary"
                disabled={upload.loading}
                onClick={upload.closeWizard}
            >
                {t("newProjectWizard.footer.cancel")}
            </Button>
            <Button
                variant="secondary"
                disabled={upload.loading}
                onClick={() => upload.goToWizardStep(2)}
            >
                {t("newProjectWizard.footer.back")}
            </Button>
            <Button
                variant="primary"
                disabled={upload.loading || upload.selectedPages.length === 0}
                onClick={upload.processSelectedPdfPages}
            >
                <FileUp size={18} />{" "}
                {upload.selectedPages.length === 0
                    ? t("pdfPageModal.selectPagesToContinue")
                    : t(
                          upload.selectedPages.length === 1
                              ? "pdfPageModal.annotateSelectedPage"
                              : "pdfPageModal.annotateSelectedPages",
                          { count: upload.selectedPages.length },
                      )}
            </Button>
        </>
    );
}
