import clsx from "clsx";
import { Check } from "lucide-react";

import {
    styles,
    type MultiStepStatus,
} from "./multi-step-navigation.styles.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type MultiStepNavigationStep = {
    readonly id: string;
    readonly name: ReactNode;
    readonly description?: ReactNode;
    readonly disabled?: boolean;
};

export type MultiStepNavigationProps = Omit<
    HTMLAttributes<HTMLElement>,
    "onChange"
> & {
    readonly steps: readonly MultiStepNavigationStep[];
    /** Current step, using one-based numbering. */
    readonly currentStep: number;
    /** Called with the selected one-based step number. */
    readonly onStepChange?: (step: number) => void;
};

function getStatus(step: number, currentStep: number): MultiStepStatus {
    if (step < currentStep) return "complete";
    if (step === currentStep) return "current";
    return "upcoming";
}

/** Shows progress through an ordered workflow and optionally allows step navigation. */
export function MultiStepNavigation({
    steps,
    currentStep,
    onStepChange,
    className,
    "aria-label": ariaLabel = "Progress",
    ...props
}: MultiStepNavigationProps): ReactElement {
    const normalizedCurrentStep = Math.min(
        Math.max(1, Math.floor(currentStep)),
        Math.max(steps.length, 1),
    );

    return (
        <nav
            aria-label={ariaLabel}
            className={clsx(styles.root, className)}
            {...props}
        >
            <ol role="list" className={styles.list}>
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const status = getStatus(stepNumber, normalizedCurrentStep);
                    const isDisabled =
                        step.disabled === true || onStepChange === undefined;

                    return (
                        <li className={styles.item} key={step.id}>
                            {index < steps.length - 1 && (
                                <div
                                    aria-hidden="true"
                                    className={clsx(
                                        styles.connector,
                                        stepNumber < normalizedCurrentStep
                                            ? styles.connectorComplete
                                            : styles.connectorUpcoming,
                                    )}
                                />
                            )}
                            <button
                                type="button"
                                aria-current={
                                    status === "current" ? "step" : undefined
                                }
                                aria-label={`Step ${stepNumber}: ${typeof step.name === "string" ? step.name : status}`}
                                className={styles.button}
                                disabled={isDisabled}
                                onClick={() => onStepChange?.(stepNumber)}
                            >
                                <span
                                    className={clsx(
                                        styles.marker,
                                        styles.markerStates[status],
                                    )}
                                >
                                    {status === "complete" ? (
                                        <Check
                                            aria-hidden="true"
                                            className={styles.checkIcon}
                                        />
                                    ) : (
                                        stepNumber
                                    )}
                                </span>
                                <span className={styles.content}>
                                    <span
                                        className={clsx(
                                            styles.name,
                                            styles.nameStates[status],
                                        )}
                                    >
                                        {step.name}
                                    </span>
                                    {step.description !== undefined && (
                                        <span className={styles.description}>
                                            {step.description}
                                        </span>
                                    )}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
