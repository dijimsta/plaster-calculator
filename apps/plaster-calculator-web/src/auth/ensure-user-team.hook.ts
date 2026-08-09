"use client";

import { useTeamsService } from "@libraries/plaster-calculator-web-core";
import { useEffect, useState } from "react";

import type { User } from "firebase/auth";

export function useEnsureUserTeam(user: User | null | undefined): boolean {
    const teamsService = useTeamsService();
    const [teamEnsuredForUid, setTeamEnsuredForUid] = useState<string>();

    useEffect(() => {
        if (user) {
            void (async () => {
                try {
                    await teamsService.ensureMyTeam();
                    await user.getIdToken(true);
                } finally {
                    setTeamEnsuredForUid(user.uid);
                }
            })();
        }
    }, [user, teamsService]);

    return (
        user !== null && user !== undefined && teamEnsuredForUid === user.uid
    );
}
