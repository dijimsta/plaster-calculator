"use client";

import { useMemo } from "react";

import { RemindersServiceContext } from "./reminders.context.ts";
import { RemindersService } from "./reminders.service.ts";

import type { PropsWithChildren, ReactElement } from "react";

export interface RemindersServiceProviderProps extends PropsWithChildren {
    readonly remindersService?: RemindersService;
}

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
