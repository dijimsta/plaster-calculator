import { randomUUID } from "node:crypto";

import { HttpsError } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { GoogleAuth } from "google-auth-library";
import JSZip from "jszip";

import { isEmulator, projectId } from "./environment.js";
import {
    LONG_RUNNING_TIMEOUT_SECONDS,
    FLOORPLAN_ANALYZER_REGION,
} from "./types.js";

import type {
    AnalyzerPolygon,
    AnalyzerResult,
    FloorplanAnalyzerEndpoint,
    OverlayArea,
    OverlayDocument,
    ProcessingStrategy,
} from "./types.js";

const googleAuth = new GoogleAuth();

export async function callFloorplanAnalyzer(
    endpoint: FloorplanAnalyzerEndpoint,
    imageBytes: Buffer,
    filename: string,
    queryParams: Record<string, string>,
): Promise<{ result: AnalyzerResult; floorplanPng: Buffer }> {
    const url = floorplanAnalyzerUrl(endpoint, queryParams);
    const headers: Record<string, string> = {};
    if (!isEmulator()) {
        const audience = audienceForEndpoint(endpoint);
        headers["Authorization"] = `Bearer ${await getIdToken(audience)}`;
    }

    const response = await fetchFloorplanAnalyzerWithRetry(
        url,
        endpoint,
        imageBytes,
        filename,
        headers,
    );

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new HttpsError(
            "internal",
            `floorplan-analyzer ${endpoint} failed (HTTP ${response.status})${text ? `: ${text}` : ""}`,
        );
    }

    const zipBuffer = Buffer.from(await response.arrayBuffer());
    const zip = await JSZip.loadAsync(zipBuffer);

    const jsonFile =
        zip.file("rooms.json") ??
        zip.file("walls.json") ??
        zip.file("result.json");
    if (!jsonFile) {
        throw new HttpsError(
            "internal",
            "floorplan-analyzer response was missing rooms.json/walls.json.",
        );
    }

    const pngFile = zip.file("floorplan.png");
    if (!pngFile) {
        throw new HttpsError(
            "internal",
            "floorplan-analyzer response was missing floorplan.png.",
        );
    }

    const result = JSON.parse(await jsonFile.async("string")) as AnalyzerResult;
    const floorplanPng = Buffer.from(await pngFile.async("uint8array"));

    return { result, floorplanPng };
}

export async function fetchFloorplanAnalyzerWithRetry(
    url: string,
    endpoint: FloorplanAnalyzerEndpoint,
    imageBytes: Buffer,
    filename: string,
    headers: Record<string, string>,
): Promise<Response> {
    const maxAttempts = isEmulator() ? 2 : 1;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: buildAnalyzerForm(imageBytes, filename),
                headers,
                signal: AbortSignal.timeout(
                    LONG_RUNNING_TIMEOUT_SECONDS * 1000,
                ),
            });

            if (response.ok || attempt === maxAttempts) {
                return response;
            }

            const text = await response.text().catch(() => "");
            logger.warn("floorplan-analyzer request failed; retrying", {
                endpoint,
                attempt,
                status: response.status,
                text,
            });
        } catch (error) {
            lastError = error;
            if (attempt === maxAttempts) {
                throw error;
            }

            logger.warn("floorplan-analyzer request errored; retrying", {
                endpoint,
                attempt,
                message: error instanceof Error ? error.message : String(error),
            });
        }

        await sleep(3_000);
    }

    throw lastError instanceof Error
        ? lastError
        : new Error("floorplan-analyzer request failed.");
}

export function buildAnalyzerForm(
    imageBytes: Buffer,
    filename: string,
): FormData {
    const form = new FormData();
    const arrayBuffer = imageBytes.buffer.slice(
        imageBytes.byteOffset,
        imageBytes.byteOffset + imageBytes.byteLength,
    ) as ArrayBuffer;
    const blob = new Blob([arrayBuffer], {
        type: "application/octet-stream",
    });
    form.append("image", blob, filename || "upload.bin");
    return form;
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function floorplanAnalyzerUrl(
    endpoint: FloorplanAnalyzerEndpoint,
    queryParams: Record<string, string>,
): string {
    const project = projectId();
    const query = toQueryString(queryParams);
    if (isEmulator()) {
        const host = process.env["FUNCTIONS_EMULATOR_HOST"] ?? "127.0.0.1:5001";
        return `http://${host}/${project}/${FLOORPLAN_ANALYZER_REGION}/${endpoint}${query}`;
    }
    return `https://${FLOORPLAN_ANALYZER_REGION}-${project}.cloudfunctions.net/${endpoint}${query}`;
}

export function audienceForEndpoint(
    endpoint: FloorplanAnalyzerEndpoint,
): string {
    const project = projectId();
    return `https://${FLOORPLAN_ANALYZER_REGION}-${project}.cloudfunctions.net/${endpoint}`;
}

export function toQueryString(queryParams: Record<string, string>): string {
    const entries = Object.entries(queryParams);
    if (entries.length === 0) {
        return "";
    }
    const search = new URLSearchParams(entries);
    return `?${search.toString()}`;
}

export async function getIdToken(audience: string): Promise<string> {
    const client = await googleAuth.getIdTokenClient(audience);
    return client.idTokenProvider.fetchIdToken(audience);
}

export function buildOverlayFromAnalyzerResult(
    strategy: ProcessingStrategy,
    sourceFile: string,
    result: AnalyzerResult,
): OverlayDocument {
    const items =
        strategy.polygonsKey === "walls"
            ? (result.walls ?? [])
            : (result.rooms ?? []);
    const areas = items
        .map((item) => analyzerItemToOverlayArea(item))
        .filter((area): area is OverlayArea => area !== null);
    return {
        sourceFile,
        ...(result.image_size_px ? { imageSizePx: result.image_size_px } : {}),
        areas,
    };
}

export function analyzerItemToOverlayArea(
    item: AnalyzerPolygon,
): OverlayArea | null {
    const points = analyzerPolygonPoints(item);
    if (points.length < 3) {
        return null;
    }

    const roomType = item.room_type ?? null;
    const isOutdoor = roomType === "Outdoor";
    const defaultPlasterType = defaultPlasterTypeForRoom(roomType);
    const candidateLabel =
        (typeof item.label === "string" && item.label.trim()) ||
        (roomType ? roomType : "") ||
        (typeof item.id === "number" ? `Area ${item.id}` : "Area");

    const area: OverlayArea = {
        id: randomUUID(),
        label: candidateLabel,
        points,
        wallPlasterType: defaultPlasterType,
        ceilingPlasterType: defaultPlasterType,
        ceilingMode: "flat",
        isOutdoor,
        source: "detected",
        deleted: false,
        sourceRoomType: roomType,
    };

    applyAnalyzerSourceFields(area, item);
    return area;
}

function analyzerPolygonPoints(item: AnalyzerPolygon): [number, number][] {
    if (!Array.isArray(item.polygon) || item.polygon.length < 3) {
        return [];
    }

    const points: [number, number][] = [];
    for (const pt of item.polygon) {
        if (isAnalyzerPoint(pt)) {
            points.push([pt[0], pt[1]]);
        }
    }
    return points;
}

function isAnalyzerPoint(point: number[]): point is [number, number] {
    return (
        Array.isArray(point) &&
        point.length >= 2 &&
        typeof point[0] === "number" &&
        typeof point[1] === "number"
    );
}

function applyAnalyzerSourceFields(
    area: OverlayArea,
    item: AnalyzerPolygon,
): void {
    if (typeof item.area_px === "number") {
        area.sourceAreaPx = item.area_px;
    }
    if (typeof item.approx_length_px === "number") {
        area.sourceApproxLengthPx = item.approx_length_px;
    } else if (typeof item.perimeter_px === "number") {
        area.sourceApproxLengthPx = item.perimeter_px;
    }
    if (typeof item.is_hole === "boolean") {
        area.sourceIsHole = item.is_hole;
    }
}

export function defaultPlasterTypeForRoom(roomType: string | null): string {
    return roomType === "Bath" ? "Water Resistant" : "Recessed Edge";
}
