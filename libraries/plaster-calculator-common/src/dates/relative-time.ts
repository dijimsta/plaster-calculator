interface RelativeTimeDivision {
    amount: number;
    unit: Intl.RelativeTimeFormatUnit;
}

const RELATIVE_TIME_DIVISIONS: readonly RelativeTimeDivision[] = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.34524, unit: "week" },
    { amount: 12, unit: "month" },
    { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
});

interface RelativeTimeState {
    value: number;
    unit: Intl.RelativeTimeFormatUnit;
    settled: boolean;
}

function applyDivision(
    state: RelativeTimeState,
    division: RelativeTimeDivision,
): RelativeTimeState {
    if (state.settled) {
        return state;
    }

    if (Math.abs(state.value) < division.amount) {
        return { value: state.value, unit: division.unit, settled: true };
    }

    return {
        value: state.value / division.amount,
        unit: division.unit,
        settled: false,
    };
}

/**
 * Formats `date` relative to `now` (defaults to the current time), e.g. "2 days ago" or "in 3 hours".
 */
export function formatRelativeTime(date: Date, now: Date = new Date()): string {
    const initialState: RelativeTimeState = {
        value: (date.getTime() - now.getTime()) / 1000,
        unit: "second",
        settled: false,
    };

    const { value, unit } = RELATIVE_TIME_DIVISIONS.reduce(
        applyDivision,
        initialState,
    );

    return relativeTimeFormatter.format(Math.round(value), unit);
}
