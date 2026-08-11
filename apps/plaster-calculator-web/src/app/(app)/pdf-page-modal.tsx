"use client";

import { Button, ModalDialog } from "@libraries/uikit-web";
import { FileUp } from "lucide-react";

import { useAppTranslation } from "../../i18n/index.ts";
import { cx, ui } from "../../lib/styles.js";

import type { PdfPageModalProps } from "./dashboard.types.js";

export function PdfPageModal({
    errorMessage,
    loading,
    pageUploadProgress,
    pdfPages,
    selectedPages,
    closePdfModal,
    processSelectedPdfPages,
    togglePage,
}: PdfPageModalProps) {
    const { t } = useAppTranslation();

    return (
        <ModalDialog
            open
            onClose={closePdfModal}
            size="xl"
            title={t("pdfPageModal.title")}
            description={t("pdfPageModal.description")}
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={loading}
                        onClick={closePdfModal}
                    >
                        {t("pdfPageModal.cancel")}
                    </Button>
                    <Button
                        variant="primary"
                        disabled={loading || selectedPages.length === 0}
                        onClick={processSelectedPdfPages}
                    >
                        <FileUp size={18} />{" "}
                        {selectedPages.length === 0
                            ? t("pdfPageModal.selectPagesToContinue")
                            : t(
                                  selectedPages.length === 1
                                      ? "pdfPageModal.annotateSelectedPage"
                                      : "pdfPageModal.annotateSelectedPages",
                                  { count: selectedPages.length },
                              )}
                    </Button>
                </>
            }
        >
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
        </ModalDialog>
    );
}
