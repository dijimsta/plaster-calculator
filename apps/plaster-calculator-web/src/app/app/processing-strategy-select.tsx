import { ui } from "../../lib/styles.js";

import type { StrategySelectProps } from "./dashboard.types.js";

export function ProcessingStrategySelect({
    id,
    processingStrategies,
    selectedStrategyKey,
    setSelectedStrategyKey,
}: StrategySelectProps) {
    return (
        <div className={ui.field}>
            <label htmlFor={id}>Processing strategy</label>
            <select
                id={id}
                className={ui.input}
                value={selectedStrategyKey}
                onChange={(event) => setSelectedStrategyKey(event.target.value)}
                disabled={processingStrategies.length === 0}
            >
                {processingStrategies.length === 0 ? (
                    <option value="">Default strategy</option>
                ) : (
                    processingStrategies.map((strategy) => (
                        <option key={strategy.key} value={strategy.key}>
                            {strategy.label}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
}
