import "./bootstrap.js";

import {
    touchProject,
    updateFloorplanPage as dcUpdateFloorplanPage,
} from "@generated/example-data-connector";
import { HttpsError, onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { toDetail, toPage } from "./mappers.js";
import { requireFloorplanPage, requireOwnedProject } from "./ownership.js";
import {
    hasField,
    readNullableNumber,
    readRequiredString,
} from "./validation.js";

import type {
    FloorplanPage,
    ProjectDetail,
    UpdateFloorplanPageRequest,
    UpdateFloorplanPagesRequest,
} from "./types.js";

export const getFloorplanPage = onCall<
    UpdateFloorplanPageRequest,
    Promise<FloorplanPage>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);
    return toPage(
        await requireFloorplanPage(
            projectId,
            readRequiredString(request.data.pageId, "Page ID"),
        ),
    );
});

export const updateFloorplanPage = onCall<
    UpdateFloorplanPageRequest,
    Promise<FloorplanPage>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);

    const page = await requireFloorplanPage(
        projectId,
        readRequiredString(request.data.pageId, "Page ID"),
    );
    const data = request.data;
    const overlayJson = hasField(data, "overlay")
        ? JSON.stringify(data.overlay ?? { areas: [] })
        : page.overlayJson;
    const scaleMmPerPx = hasField(data, "scaleMmPerPx")
        ? readNullableNumber(data.scaleMmPerPx, "Scale")
        : (page.scaleMmPerPx ?? null);
    const ceilingHeightMm = hasField(data, "ceilingHeightMm")
        ? readNullableNumber(data.ceilingHeightMm, "Ceiling height")
        : (page.ceilingHeightMm ?? null);
    const referencePointsJson = hasField(data, "referencePoints")
        ? data.referencePoints == null
            ? null
            : JSON.stringify(data.referencePoints)
        : (page.referencePointsJson ?? null);
    const referenceLengthMm = hasField(data, "referenceLengthMm")
        ? readNullableNumber(data.referenceLengthMm, "Reference length")
        : (page.referenceLengthMm ?? null);

    await dcUpdateFloorplanPage({
        id: page.id,
        overlayJson: overlayJson ?? null,
        scaleMmPerPx,
        ceilingHeightMm,
        referencePointsJson,
        referenceLengthMm,
    });
    await touchProject({ id: projectId });

    return toPage(await requireFloorplanPage(projectId, page.id));
});

export const updateFloorplanPages = onCall<
    UpdateFloorplanPagesRequest,
    Promise<ProjectDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    const project = await requireOwnedProject(projectId, auth.uid);
    const data = request.data;

    const hasScale = hasField(data, "scaleMmPerPx");
    const hasCeilingHeight = hasField(data, "ceilingHeightMm");

    if (!hasScale && !hasCeilingHeight) {
        throw new HttpsError(
            "invalid-argument",
            "Scale or ceiling height is required.",
        );
    }

    for (const page of project.pages) {
        const nextScaleMmPerPx: number | null = hasScale
            ? (readNullableNumber(data.scaleMmPerPx, "Scale") ??
              page.scaleMmPerPx ??
              null)
            : (page.scaleMmPerPx ?? null);
        const nextCeilingHeightMm: number | null = hasCeilingHeight
            ? (readNullableNumber(data.ceilingHeightMm, "Ceiling height") ??
              page.ceilingHeightMm ??
              null)
            : (page.ceilingHeightMm ?? null);

        await dcUpdateFloorplanPage({
            id: page.id,
            overlayJson: page.overlayJson ?? null,
            scaleMmPerPx: nextScaleMmPerPx,
            ceilingHeightMm: nextCeilingHeightMm,
            referencePointsJson: page.referencePointsJson ?? null,
            referenceLengthMm: page.referenceLengthMm ?? null,
        });
    }

    await touchProject({ id: projectId });
    return toDetail(await requireOwnedProject(projectId, auth.uid));
});
