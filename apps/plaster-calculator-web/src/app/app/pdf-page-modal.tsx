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
            <section className={ui.modal}>
                <header className={ui.editorToolbar}>
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
                <div className={ui.previewGrid}>
                    {pdfPages.map((page) => (
                        <div className={ui.previewTile} key={page.pageNumber}>
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
                                    onChange={() => togglePage(page.pageNumber)}
                                />
                            </footer>
                        </div>
                    ))}
                </div>
                <footer className={cx(ui.buttonRow, "justify-end")}>
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
