import { createContext } from "react";

import type { NotificationsManagerContextValue } from "./notifications-manager.types.ts";

export const NotificationsManagerContext =
    createContext<NotificationsManagerContextValue | null>(null);
