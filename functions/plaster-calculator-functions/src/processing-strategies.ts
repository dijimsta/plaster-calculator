import type { ProcessingStrategy } from "./types.js";

export const processingStrategies: ProcessingStrategy[] = [
    {
        key: "ocr-flood-fill-smoothed",
        label: "Detected rooms (OCR + smoothed polygons)",
        description:
            "Reads room labels with OCR, floods within wall masks, and smooths polygons for editing.",
        defaultStrategy: true,
        endpoint: "ocr_flood_fill_smoothed",
        queryParams: {},
        polygonsKey: "rooms",
    },
    {
        key: "ocr-flood-fill",
        label: "Detected rooms (OCR flood fill)",
        description: "Reads room labels with OCR and floods within wall masks.",
        defaultStrategy: false,
        endpoint: "ocr_flood_fill",
        queryParams: {},
        polygonsKey: "rooms",
    },
    {
        key: "xixi-process",
        label: "Wall contour segmentation",
        description:
            "Extracts walls and rooms from the segmentation map without OCR seeds.",
        defaultStrategy: false,
        endpoint: "xixi_process",
        queryParams: {},
        polygonsKey: "walls",
    },
];
