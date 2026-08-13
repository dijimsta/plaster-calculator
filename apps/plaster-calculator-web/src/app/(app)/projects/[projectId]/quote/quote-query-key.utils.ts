import * as DataConnector from "@generated/data-connector-web";
import type { DataConnect } from "firebase/data-connect";

/** Shared React Query keys for project quote reads and the all-quotes list. */
export class QuoteQueryKeyUtils {
    public static forProjectQuote(
        dataConnect: DataConnect,
        projectId: string,
    ): readonly [string, unknown] {
        const ref = DataConnector.getProjectQuoteRef(dataConnect, {
            projectId,
        });
        return [ref.name, ref.variables ?? null];
    }

    public static forQuotesForTeam(
        dataConnect: DataConnect,
    ): readonly [string, unknown] {
        const ref = DataConnector.listQuotesForTeamRef(dataConnect);
        return [ref.name, ref.variables ?? null];
    }
}
