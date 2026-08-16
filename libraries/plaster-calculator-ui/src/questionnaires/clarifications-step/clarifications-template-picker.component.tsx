import {
    Box,
    Button,
    Card,
    FormLayoutField,
    SelectMenu,
} from "@libraries/uikit-web";
import type { SelectMenuOption } from "@libraries/uikit-web";
import { useId } from "react";
import type { ChangeEventHandler, ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

import { START_FROM_SCRATCH_OPTION_VALUE } from "./clarifications-step.styles.ts";
import type { ClarificationsStepProps } from "./clarifications-step.types.ts";

export type ClarificationsTemplatePickerProps = Pick<
    ClarificationsStepProps,
    | "templates"
    | "selectedTemplateId"
    | "onSelectTemplate"
    | "onApplyTemplate"
    | "isApplyingTemplate"
>;

/** The step's top-of-modal template picker: a dropdown (including "start from scratch") plus an Apply action. */
export function ClarificationsTemplatePicker({
    templates,
    selectedTemplateId,
    onSelectTemplate,
    onApplyTemplate,
    isApplyingTemplate,
}: ClarificationsTemplatePickerProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const selectId = useId();
    const options: SelectMenuOption[] = [
        {
            value: START_FROM_SCRATCH_OPTION_VALUE,
            label: t("clarificationsStep.templatePicker.startFromScratch"),
        },
        ...templates.map((template) => ({
            value: template.id,
            label: template.name,
        })),
    ];
    const value = selectedTemplateId ?? START_FROM_SCRATCH_OPTION_VALUE;
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const next = event.target.value;
        onSelectTemplate(
            next === START_FROM_SCRATCH_OPTION_VALUE ? null : next,
        );
    };

    return (
        <Card>
            <Box direction="row" gap="md" align="end" wrap>
                <Box grow>
                    <FormLayoutField
                        label={t("clarificationsStep.templatePicker.label")}
                        htmlFor={selectId}
                    >
                        <SelectMenu
                            id={selectId}
                            options={options}
                            value={value}
                            disabled={isApplyingTemplate}
                            onChange={handleChange}
                        />
                    </FormLayoutField>
                </Box>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={isApplyingTemplate}
                    onClick={onApplyTemplate}
                >
                    {isApplyingTemplate
                        ? t("clarificationsStep.templatePicker.applying")
                        : t("clarificationsStep.templatePicker.apply")}
                </Button>
            </Box>
        </Card>
    );
}
