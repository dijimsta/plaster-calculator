import type { UploadType } from "./types.js";

export function inferUploadType(
    fileName: string,
    contentType: string,
): UploadType {
    const lowerName = fileName.toLowerCase();
    const lowerType = contentType.toLowerCase();
    return lowerName.endsWith(".pdf") || lowerType.includes("pdf")
        ? "PDF"
        : "IMAGE";
}
