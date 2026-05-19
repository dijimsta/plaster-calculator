import { randomUUID } from "node:crypto";

import { getStorage } from "firebase-admin/storage";
import { HttpsError } from "firebase-functions/https";

import type { ProjectWithPages } from "./types.js";

export function isOwnedUploadPath(
    storagePath: string,
    uid: string,
    projectId: string,
) {
    return storagePath.startsWith(
        `uploads/${uid}/projects/${projectId}/uploads/`,
    );
}

export function isOwnedPageSourcePath(
    storagePath: string,
    uid: string,
    projectId: string,
    pageNumber: number,
) {
    return (
        storagePath ===
        `uploads/${uid}/projects/${projectId}/pages/${pageNumber}/source.png`
    );
}

export async function deleteOwnedProjectStorage(
    project: ProjectWithPages,
    uid: string,
) {
    const bucket = getStorage().bucket();
    const paths = [
        project.originalPath,
        ...project.pages.flatMap((page) => [
            page.sourceImagePath,
            page.previewImagePath,
            page.rawJsonPath,
            page.rawFloorplanPath,
        ]),
    ].filter((path): path is string => Boolean(path));

    for (const path of new Set(paths)) {
        if (path.startsWith(`uploads/${uid}/`) && !path.startsWith("data:")) {
            await bucket.file(path).delete({ ignoreNotFound: true });
        }
    }

    await bucket.deleteFiles({
        force: true,
        prefix: `uploads/${uid}/projects/${project.id}/`,
    });
}

export function storagePathToUrl(path?: string | null) {
    if (!path) {
        return "";
    }

    if (path.startsWith("data:") || path.startsWith("http")) {
        return path;
    }

    const bucketName = getStorage().bucket().name;
    return `https://storage.googleapis.com/${bucketName}/${encodeStoragePath(path)}`;
}

export function encodeStoragePath(path: string) {
    return path
        .split("/")
        .map((part) => encodeURIComponent(part))
        .join("/");
}

export async function requireStorageImage(path: string): Promise<void> {
    const file = getStorage().bucket().file(path);
    const [exists] = await file.exists();
    if (!exists) {
        throw new HttpsError(
            "not-found",
            "PDF page source image was not found.",
        );
    }

    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType ?? "";
    if (!contentType.startsWith("image/")) {
        throw new HttpsError(
            "invalid-argument",
            "PDF page source file must be an image.",
        );
    }
}

export async function fetchStorageImage(
    path: string,
): Promise<{ bytes: Buffer; url: string }> {
    await requireStorageImage(path);
    const file = getStorage().bucket().file(path);
    const [bytes] = await file.download();
    return {
        bytes,
        url: await ensureFileDownloadUrl(path),
    };
}
export async function uploadStorageBuffer(
    path: string,
    body: Buffer,
    contentType: string,
): Promise<string> {
    const token = randomUUID();
    const bucket = getStorage().bucket();
    const file = bucket.file(path);
    await file.save(body, {
        contentType,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: token,
            },
        },
    });
    return firebaseStorageDownloadUrl(bucket.name, path, token);
}

export async function ensureFileDownloadUrl(path: string): Promise<string> {
    const bucket = getStorage().bucket();
    const file = bucket.file(path);
    const [metadata] = await file.getMetadata();
    const customMetadata = (metadata.metadata ?? {}) as Record<string, unknown>;
    const existing = customMetadata["firebaseStorageDownloadTokens"];
    let token = typeof existing === "string" ? existing.split(",")[0] : "";
    if (!token) {
        token = randomUUID();
        await file.setMetadata({
            metadata: { firebaseStorageDownloadTokens: token },
        });
    }
    return firebaseStorageDownloadUrl(bucket.name, path, token);
}

export function firebaseStorageDownloadUrl(
    bucketName: string,
    path: string,
    token: string,
): string {
    const emulatorHost =
        process.env["STORAGE_EMULATOR_HOST"] ??
        process.env["FIREBASE_STORAGE_EMULATOR_HOST"];
    const base = emulatorHost
        ? emulatorHost.startsWith("http")
            ? emulatorHost
            : `http://${emulatorHost}`
        : "https://firebasestorage.googleapis.com";
    return `${base}/v0/b/${bucketName}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
}
