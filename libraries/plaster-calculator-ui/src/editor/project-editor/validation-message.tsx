import { Text } from "@libraries/uikit-web";
import type { ReactNode } from "react";

export function ValidationMessage({
    message,
}: {
    readonly message: string;
}): ReactNode {
    return message ? (
        <Text size="xs" weight="semibold" variant="danger">
            {message}
        </Text>
    ) : null;
}
