"use client";

import { useMemo } from "react";
import type { PropsWithChildren, ReactElement } from "react";

import { RemindersServiceContext } from "./reminders.context.ts";
import { RemindersService } from "./reminders.service.ts";

export type RemindersServiceProviderProps = PropsWithChildren & {
    readonly remindersService?: RemindersService;
};

export function RemindersServiceProvider({
    children,
    remindersService,
}: RemindersServiceProviderProps): ReactElement {
    const value = useMemo(
        () => remindersService ?? new RemindersService(),
        [remindersService],
    );

    return (
        <RemindersServiceContext.Provider value={value}>
            {children}
        </RemindersServiceContext.Provider>
    );
}
