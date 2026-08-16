"use client";

import { useAppTranslation } from "../../i18n/index.ts";
import { cx, ui } from "../../lib/styles.js";

import type { PdfPageModalContentProps } from "./dashboard.types.js";

/**
 * Step 3 of the new-project wizard (PDF uploads only): the page-preview
 * grid, upload progress, and any processing error. Purely content -- the
 * surrounding `ModalDialog` chrome (title, description, footer) belongs to
 * `NewProjectWizardModal`, which hosts this as its step-3 children.
 */
export function PdfPageModalContent({
    errorMessage,
    pageUploadProgress,
    pdfPages,
    selectedPages,
    togglePage,
}: PdfPageModalContentProps) {
    const { t } = useAppTranslation();

    return (
        <>
            {errorMessage && <p className={ui.error}>{errorMessage}</p>}
            {pageUploadProgress && (
                <div className={ui.pdfProgress}>
                    <div className={ui.pdfProgressLabel}>
                        <span>{pageUploadProgress.label}</span>
                        <span>
                            {pageUploadProgress.current} /{" "}
                            {pageUploadProgress.total}
                        </span>
                    </div>
                    <progress
                        className="w-full accent-slate-900 dark:accent-slate-100"
                        max={pageUploadProgress.total}
                        value={pageUploadProgress.current}
                    />
                </div>
            )}
            <div className={cx(ui.previewGrid, "mt-4")}>
                {pdfPages.map((page) => (
                    <div className={ui.previewTile} key={page.pageNumber}>
                        <img
                            src={page.previewUrl}
                            alt={t("pdfPageModal.page", {
                                number: page.pageNumber,
                            })}
                        />
                        <footer>
                            <span>
                                {t("pdfPageModal.page", {
                                    number: page.pageNumber,
                                })}
                            </span>
                            <input
                                type="checkbox"
                                checked={selectedPages.includes(
                                    page.pageNumber,
                                )}
                                onChange={() => togglePage(page.pageNumber)}
                            />
                        </footer>
                    </div>
                ))}
            </div>
        </>
    );
}
