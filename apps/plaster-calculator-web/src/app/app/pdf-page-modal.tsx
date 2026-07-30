import { Button, Paragraph } from "@libraries/uikit-web";
import { FileUp, X } from "lucide-react";

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
    return (
        <div className={ui.modalBackdrop}>
            <section className={ui.modalScrollable}>
                <header className={cx(ui.editorToolbar, "shrink-0")}>
                    <div>
                        <h2>Select PDF Pages</h2>
                        <Paragraph textSize="sm" variant="muted">
                            Tick the pages to annotate.
                        </Paragraph>
                    </div>
                    <Button
                        variant="ghost"
                        disabled={loading}
                        onClick={closePdfModal}
                    >
                        <X size={18} />
                    </Button>
                </header>
                {errorMessage && (
                    <p className={cx(ui.error, "shrink-0")}>{errorMessage}</p>
                )}
                {pageUploadProgress && (
                    <div className={cx(ui.pdfProgress, "shrink-0")}>
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
                <div className={ui.modalScrollableBody}>
                    <div className={ui.previewGrid}>
                        {pdfPages.map((page) => (
                            <div
                                className={ui.previewTile}
                                key={page.pageNumber}
                            >
                                <img
                                    src={page.previewUrl}
                                    alt={`Page ${page.pageNumber}`}
                                />
                                <footer>
                                    <span>Page {page.pageNumber}</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedPages.includes(
                                            page.pageNumber,
                                        )}
                                        onChange={() =>
                                            togglePage(page.pageNumber)
                                        }
                                    />
                                </footer>
                            </div>
                        ))}
                    </div>
                </div>
                <footer className={cx(ui.buttonRow, "justify-end shrink-0")}>
                    <Button
                        variant="secondary"
                        disabled={loading}
                        onClick={closePdfModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        disabled={loading || selectedPages.length === 0}
                        onClick={processSelectedPdfPages}
                    >
                        <FileUp size={18} />{" "}
                        {selectedPages.length === 0
                            ? "Select pages to continue"
                            : `Annotate ${selectedPages.length} selected ${selectedPages.length === 1 ? "page" : "pages"}`}
                    </Button>
                </footer>
            </section>
        </div>
    );
}
