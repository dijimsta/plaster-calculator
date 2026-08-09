"use client";

import { useContext } from "react";

import { RemindersServiceContext } from "./reminders.context.ts";

import type { RemindersService } from "./reminders.service.ts";

export function useRemindersService(): RemindersService {
    const context = useContext(RemindersServiceContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "useRemindersService must be used within a RemindersServiceProvider",
        );
    }
}
