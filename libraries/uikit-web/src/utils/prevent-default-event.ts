import type { SyntheticEvent, EventHandler } from "react";

export function preventDefaultEvent<E extends SyntheticEvent<unknown>>(
    handler: EventHandler<E>,
) {
    return (event: E) => {
        event.preventDefault();
        return handler(event);
    };
}
