import sharp from "sharp";

const HEATMAP_CHANNELS = 21;
const ROOM_CHANNELS = 12;

/** Room class colours, in channel order. Mirrors `_ROOM_COLOUR_LUT` in
 * floorplan-analyzer's inference/overlay.py — keep in sync if that changes. */
const ROOM_COLOUR_LUT: readonly (readonly [number, number, number])[] = [
    [220, 220, 220], // Background
    [160, 200, 160], // Outdoor
    [90, 90, 90], // Wall
    [255, 200, 100], // Kitchen
    [255, 230, 130], // Living Room
    [140, 200, 255], // Bed Room
    [180, 230, 255], // Bath
    [220, 220, 180], // Entry/Corridor
    [200, 200, 200], // Railing
    [200, 170, 230], // Storage
    [170, 170, 170], // Garage
    [220, 200, 200], // Undefined
];

/** Renders a colour-coded room segmentation map from the model's raw
 * (1, 44, H, W) output. Room channels are 21:33 of the 44-channel output
 * (see `_SPLIT = [21, 12, 11]` in floorplan-analyzer's
 * segmentation/postprocess.py: heatmaps, rooms, icons). Softmax is skipped
 * since it doesn't change which class has the highest score per pixel. */
export async function renderSegmentationMap(
    output: Float32Array,
    height: number,
    width: number,
): Promise<Buffer> {
    const pixelCount = height * width;
    const rgb = Buffer.alloc(pixelCount * 3);

    for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex++) {
        let bestChannel = 0;
        let bestValue = -Infinity;
        for (let room = 0; room < ROOM_CHANNELS; room++) {
            const channel = HEATMAP_CHANNELS + room;
            const value =
                output[channel * pixelCount + pixelIndex] ?? -Infinity;
            if (value > bestValue) {
                bestValue = value;
                bestChannel = room;
            }
        }
        const [r, g, b] = ROOM_COLOUR_LUT[bestChannel] ?? [0, 0, 0];
        const byteOffset = pixelIndex * 3;
        rgb[byteOffset] = r;
        rgb[byteOffset + 1] = g;
        rgb[byteOffset + 2] = b;
    }

    return sharp(rgb, { raw: { width, height, channels: 3 } })
        .png()
        .toBuffer();
}
