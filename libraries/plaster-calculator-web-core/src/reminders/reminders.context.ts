"use client";

import { createContext } from "react";

import type { RemindersService } from "./reminders.service.ts";

export const RemindersServiceContext = createContext<
    RemindersService | undefined
>(undefined);
