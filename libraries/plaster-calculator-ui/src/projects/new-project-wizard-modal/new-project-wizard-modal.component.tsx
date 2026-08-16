import { Box, ModalDialog, MultiStepNavigation } from "@libraries/uikit-web";
import type { MultiStepNavigationStep } from "@libraries/uikit-web";
import type { ReactElement, ReactNode } from "react";

import { useProjectsTranslation } from "../i18n/index.ts";

/**
 * The wizard's fixed three steps, in order. This shell is specific to the
 * new-project wizard (not a generic stepper), so the step identities are
 * baked in here -- only the current step, navigation, and per-step content
 * come from the caller.
 */
const NEW_PROJECT_WIZARD_STEP_IDS = [
    "details",
    "clarifications",
    "pages",
] as const;

export type NewProjectWizardModalProps = {
    readonly open: boolean;
    readonly onClose: () => void;
    /** One-based index (1-3) of the step whose content is passed as `children`. */
    readonly currentStep: number;
    /**
     * Called with the one-based number of a rail step the user clicked.
     * Only steps before `currentStep` are clickable, so this only ever
     * requests backward navigation -- the parent decides what to do with it.
     */
    readonly onStepChange: (step: number) => void;
    /** Per-step footer actions (e.g. Back / Cancel / Continue), fully owned by the caller. */
    readonly footer: ReactNode;
    /** The current step's content. */
    readonly children: ReactNode;
};

/**
 * Shell for the three-step new-project wizard (project details ->
 * clarifications -> pages to annotate): a `ModalDialog` with a step rail
 * above the step content and a caller-owned footer.
 *
 * Purely presentational -- it has no data fetching and no knowledge of what
 * each step contains or does. `children` is rendered as-is and is never
 * keyed by step, so navigating back to a previous step doesn't unmount (and
 * therefore doesn't discard the state of) the content a parent is holding
 * for it.
 */
export function NewProjectWizardModal({
    open,
    onClose,
    currentStep,
    onStepChange,
    footer,
    children,
}: NewProjectWizardModalProps): ReactElement {
    const { t } = useProjectsTranslation();

    const steps: MultiStepNavigationStep[] = NEW_PROJECT_WIZARD_STEP_IDS.map(
        (stepId, index) => ({
            id: stepId,
            name: t(`newProjectWizardModal.steps.${stepId}`),
            // Only steps behind the current one are done and clickable;
            // the current step and upcoming ones are not.
            disabled: index + 1 >= currentStep,
        }),
    );

    return (
        <ModalDialog
            open={open}
            onClose={onClose}
            size="xl"
            title={t("newProjectWizardModal.title")}
            description={t("newProjectWizardModal.description")}
            footer={footer}
        >
            <Box direction="column" gap="lg">
                <MultiStepNavigation
                    steps={steps}
                    currentStep={currentStep}
                    onStepChange={onStepChange}
                    label={t("newProjectWizardModal.stepRailLabel")}
                />
                {children}
            </Box>
        </ModalDialog>
    );
}
