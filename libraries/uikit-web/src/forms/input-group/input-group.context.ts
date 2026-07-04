import { createContext, useContext } from "react";

import type { InputGroupOrientation } from "./input-group.component.tsx";

export type InputGroupContextValue = {
    readonly orientation: InputGroupOrientation;
};

export const InputGroupContext = createContext<InputGroupContextValue | null>(
    null,
);

export function useInputGroup(): InputGroupContextValue | null {
    return useContext(InputGroupContext);
}
