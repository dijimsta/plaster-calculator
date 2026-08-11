import { useCallback, useState } from "react";

export type FixControlSubmissionState = {
    /** True while `run`'s action is in flight for this control instance only. */
    readonly isPending: boolean;
    /** Set when `run`'s action rejects; cleared at the start of the next `run`. */
    readonly error: string | null;
    readonly run: (action: () => void | Promise<void>) => Promise<void>;
};

/**
 * Tracks pending/error state for one inline fix control's submit action.
 * Each control (wall board type, ceiling height, unit price, confirm) calls
 * this once, so a failed `run` in one control's instance never touches
 * another control's `isPending`/`error` — there is no shared or lifted
 * state. `run` accepts a caller-built closure (rather than a value plus a
 * fixed callback) so it works uniformly whether the underlying action takes
 * an argument (`onChange(value)`) or none (`onConfirm()`).
 */
export function useFixControlSubmission(
    errorMessage: string,
): FixControlSubmissionState {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const run = useCallback(
        async (action: () => void | Promise<void>): Promise<void> => {
            setError(null);
            setIsPending(true);
            try {
                await action();
            } catch {
                setError(errorMessage);
            } finally {
                setIsPending(false);
            }
        },
        [errorMessage],
    );

    return { isPending, error, run };
}
