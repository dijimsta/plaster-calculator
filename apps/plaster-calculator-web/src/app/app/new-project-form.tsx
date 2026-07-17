import { Button, Text } from "@libraries/uikit-web";
import { Upload } from "lucide-react";

import { AccountSelect } from "../../components/account-select.js";
import { cx, ui } from "../../lib/styles.js";

import type {
    FileInputChange,
    NewProjectFormProps,
} from "./dashboard.types.js";

export function NewProjectForm({
    accountId,
    dragActive,
    file,
    loading,
    message,
    name,
    handleDrop,
    handleFileSelection,
    setAccountId,
    setDragActive,
    setName,
    submit,
}: NewProjectFormProps) {
    return (
        <form className={cx(ui.panel, ui.stack)} onSubmit={submit}>
            <h2>New Project</h2>
            <div className={ui.field}>
                <label htmlFor="name">Address or project name</label>
                <input
                    id="name"
                    className={ui.input}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="12 Example Street"
                />
            </div>
            <AccountSelect
                selectedAccountId={accountId}
                onChange={setAccountId}
                disabled={loading}
                label="Account"
                placeholder="Search account by company name"
            />
            <div className={ui.field}>
                <span className={ui.label}>PDF or image file</span>
                <label
                    className={cx(
                        ui.fileDropzone,
                        dragActive && ui.fileDropzoneActive,
                    )}
                    htmlFor="file"
                    onDragEnter={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                >
                    <input
                        id="file"
                        type="file"
                        accept="application/pdf,image/*"
                        className={ui.hiddenFileInput}
                        onChange={(event: FileInputChange) =>
                            handleFileSelection(event.target.files?.[0])
                        }
                    />
                    <Upload size={28} />
                    <strong>
                        {file ? file.name : "Drop a PDF or image here"}
                    </strong>
                    <Text size="sm" variant="muted">
                        {file
                            ? "Click to choose a different file"
                            : "Click to browse from your computer"}
                    </Text>
                </label>
            </div>
            <Button variant="primary" disabled={!file || loading}>
                <Upload size={18} /> Upload
            </Button>
            {message && (
                <p
                    className={
                        message.includes("failed") || message.includes("Unable")
                            ? ui.error
                            : ui.muted
                    }
                >
                    {message}
                </p>
            )}
        </form>
    );
}
