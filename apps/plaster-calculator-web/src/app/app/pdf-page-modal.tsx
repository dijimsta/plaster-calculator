import { FileUp, X } from "lucide-react";
import { cx, ui } from "../../lib/styles.js";
import type { PdfPageModalProps } from "./dashboard.types.js";
import { ProcessingStrategySelect } from "./processing-strategy-select.js";

export function PdfPageModal({
    id,
    loading,
    pageUploadProgress,
    pdfPages,
    processingStrategies,
    selectedPages,
    selectedStrategyKey,
    closePdfModal,
    processSelectedPdfPages,
    setSelectedStrategyKey,
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
                    <button
                        className={cx(
                            ui.button,
                            ui.buttonDefault,
                            ui.buttonIcon,
                        )}
                        disabled={loading}
                        onClick={closePdfModal}
                    >
                        <X size={18} />
                    </button>
                </header>
                <ProcessingStrategySelect
                    id={id}
                    processingStrategies={processingStrategies}
                    selectedStrategyKey={selectedStrategyKey}
                    setSelectedStrategyKey={setSelectedStrategyKey}
                />
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
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        disabled={loading}
                        onClick={closePdfModal}
                    >
                        Cancel
                    </button>
                    <button
                        className={cx(ui.button, ui.buttonPrimary)}
                        disabled={loading || selectedPages.length === 0}
                        onClick={processSelectedPdfPages}
                    >
                        <FileUp size={18} />{" "}
                        {selectedPages.length === 0
                            ? "Select pages to continue"
                            : `Process selected ${selectedPages.length} ${selectedPages.length === 1 ? "page" : "pages"}`}
                    </button>
                </footer>
            </section>
        </div>
    );
}
