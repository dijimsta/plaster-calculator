import "./bootstrap.js";

import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { buildProjectCsv, csvFileNamePart } from "./csv-export.js";
import { requireOwnedProject } from "./ownership.js";
import { readRequiredString } from "./validation.js";

import type { ExportProjectCsvResponse, ProjectIdRequest } from "./types.js";

export const exportProjectCsv = onCall<
    ProjectIdRequest,
    Promise<ExportProjectCsvResponse>
>(async (request) => {
    const auth = requireAuth(request);
    const project = await requireOwnedProject(
        readRequiredString(request.data.projectId, "Project ID"),
        auth.uid,
    );
    return {
        fileName: `plaster-estimate-${csvFileNamePart(project.name)}.csv`,
        mimeType: "text/csv",
        csv: buildProjectCsv(project),
    };
});
