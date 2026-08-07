import { Button, ModalDialog } from "@libraries/uikit-web";
import { FileUp } from "lucide-react";

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
        <ModalDialog
            open
            onClose={closePdfModal}
            size="xl"
            title="Select PDF Pages"
            description="Tick the pages to annotate."
            footer={
                <>
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
        </ModalDialog>
    );
}
