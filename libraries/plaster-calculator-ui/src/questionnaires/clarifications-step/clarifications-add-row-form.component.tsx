import { Box, Button, Input } from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

import type { ClarificationsStepProps } from "./clarifications-step.types.ts";

export type ClarificationsAddRowFormProps = {
    readonly onAddRow: ClarificationsStepProps["onAddRow"];
};

/** A single-field "add your own clarification" row, always available below the template picker and rows — including with zero rows. */
export function ClarificationsAddRowForm({
    onAddRow,
}: ClarificationsAddRowFormProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const [label, setLabel] = useState("");
    const inputId = useId();

    function submit(): void {
        const trimmed = label.trim();
        if (!trimmed) return;
        onAddRow(trimmed);
        setLabel("");
    }

    return (
        <Box direction="row" gap="sm" align="end">
            <Box grow>
                <Input
                    id={inputId}
                    value={label}
                    placeholder={t("clarificationsStep.rows.addRowPlaceholder")}
                    label={t("clarificationsStep.rows.addRowPlaceholder")}
                    onChange={(event) => setLabel(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            submit();
                        }
                    }}
                />
            </Box>
            <Button
                type="button"
                variant="secondary"
                icon={<Plus size={16} aria-hidden="true" />}
                disabled={!label.trim()}
                onClick={submit}
            >
                {t("common.add")}
            </Button>
        </Box>
    );
}
