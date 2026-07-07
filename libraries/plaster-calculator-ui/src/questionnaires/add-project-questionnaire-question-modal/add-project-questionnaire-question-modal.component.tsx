import {
    Button,
    Input,
    ModalDialog,
    preventDefaultEvent,
} from "@libraries/uikit-web";
import { useId, useState } from "react";

import type { ReactElement } from "react";

export interface AddProjectQuestionnaireQuestionModalProps {
    readonly open: boolean;
    readonly isSaving: boolean;
    readonly onClose: () => void;
    readonly onAdd: (label: string) => void;
}

/** A modal for adding a single custom question to a project's questionnaire. */
export function AddProjectQuestionnaireQuestionModal({
    open,
    isSaving,
    onClose,
    onAdd,
}: AddProjectQuestionnaireQuestionModalProps): ReactElement {
    const [label, setLabel] = useState("");
    const formId = useId();
    const inputId = useId();

    function handleSubmit(): void {
        const trimmed = label.trim();
        if (trimmed === "") return;
        onAdd(trimmed);
        setLabel("");
    }

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="sm"
            title="Add question"
            description="Add a custom question to this project's questionnaire."
            footer={
                <>
                    <Button
                        variant="secondary"
                        disabled={isSaving}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form={formId}
                        disabled={isSaving || label.trim() === ""}
                    >
                        {isSaving ? "Adding..." : "Add"}
                    </Button>
                </>
            }
        >
            <form id={formId} onSubmit={preventDefaultEvent(handleSubmit)}>
                <Input
                    id={inputId}
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    placeholder="Question"
                    aria-label="Question"
                    autoFocus
                    required
                />
            </form>
        </ModalDialog>
    );
}
