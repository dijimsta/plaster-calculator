import sharp from "sharp";

/** A preprocessed image ready for the model, plus enough to map results back. */
export type PreparedImage = {
    readonly data: Float32Array;
    readonly shape: readonly [1, 3, number, number];
    readonly originalWidth: number;
    readonly originalHeight: number;
};

const CHANNEL_MEAN = 0.5;
const CHANNEL_STD = 0.5;

/** Rounds up to the nearest multiple of 32 — the hourglass network's pooling
 * stack requires both dimensions to divide evenly. Mirrors
 * `round32`/`resize_round32` in floorplan-analyzer's inference/preprocess.py. */
export function round32(value: number): number {
    return Math.ceil(value / 32) * 32;
}

/** Resizes an image so both sides are multiples of 32 (matching the Python
 * pipeline's `BaselineStrategy` — no crop, no long/short-edge fitting) and
 * normalizes to [-1, 1], returning a (1, 3, H, W) tensor in channel-first
 * layout. */
export async function prepare(imageBytes: Buffer): Promise<PreparedImage> {
    const source = sharp(imageBytes).rotate();
    const metadata = await source.metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;
    if (originalWidth === undefined || originalHeight === undefined) {
        throw new Error("Could not determine image dimensions.");
    }

    const targetWidth = round32(originalWidth);
    const targetHeight = round32(originalHeight);

    const { data, info } = await source
        .resize(targetWidth, targetHeight, {
            fit: "fill",
            kernel: sharp.kernel.lanczos3,
        })
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    return {
        data: toChannelFirstTensor(data, info.width, info.height),
        shape: [1, 3, info.height, info.width],
        originalWidth,
        originalHeight,
    };
}

function toChannelFirstTensor(
    pixels: Buffer,
    width: number,
    height: number,
): Float32Array {
    const pixelCount = width * height;
    const tensor = new Float32Array(3 * pixelCount);
    for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex++) {
        const byteOffset = pixelIndex * 3;
        for (let channel = 0; channel < 3; channel++) {
            const raw = pixels[byteOffset + channel] ?? 0;
            tensor[channel * pixelCount + pixelIndex] =
                (raw / 255 - CHANNEL_MEAN) / CHANNEL_STD;
        }
    }
    return tensor;
}
