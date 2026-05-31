import { Button } from "@libraries/uikit-web";
import { FileUp, X } from "lucide-react";

import { cx, ui } from "../../lib/styles.js";

import type { PdfPageModalProps } from "./dashboard.types.js";

export function PdfPageModal({
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
                        <p className={ui.muted}>Tick the pages to process.</p>
                    </div>
                    <Button
                        variant="ghost"
                        disabled={loading}
                        onClick={closePdfModal}
                    >
                        <X size={18} />
                    </Button>
                </header>
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
                            : `Process selected ${selectedPages.length} ${selectedPages.length === 1 ? "page" : "pages"}`}
                    </Button>
                </footer>
            </section>
        </div>
    );
}
