import { useContext } from "react";

import { TeamsServiceContext } from "./teams.context.ts";

import type { TeamsService } from "./teams.service.ts";

export function useTeamsService(): TeamsService {
    const context = useContext(TeamsServiceContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "useTeamsService must be used within a TeamsServiceProvider",
        );
    }
}
