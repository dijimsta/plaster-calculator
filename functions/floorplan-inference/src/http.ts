import Busboy from "busboy";
import type { Request } from "firebase-functions/https";

export class HttpStatusError extends Error {
    public constructor(
        public readonly status: number,
        message: string,
    ) {
        super(message);
    }
}

/** Extracts the `image` file field from a multipart/form-data request —
 * matches floorplan-analyzer's `read_image_bytes` (api/request.py) so this
 * service accepts the same request shape. */
export function readImageBytes(request: Request): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const contentType = request.headers["content-type"];
        if (typeof contentType !== "string" || !request.rawBody) {
            reject(
                new HttpStatusError(400, "Missing multipart form data body."),
            );
            return;
        }

        const busboy = Busboy({ headers: { "content-type": contentType } });
        const chunks: Buffer[] = [];
        let found = false;

        busboy.on("file", (fieldName, stream) => {
            if (fieldName !== "image") {
                stream.resume();
                return;
            }
            found = true;
            stream.on("data", (chunk: Buffer) => chunks.push(chunk));
        });
        busboy.on("error", reject);
        busboy.on("finish", () => {
            if (!found) {
                reject(
                    new HttpStatusError(
                        400,
                        "Missing 'image' file in multipart form data.",
                    ),
                );
                return;
            }
            resolve(Buffer.concat(chunks));
        });

        busboy.end(request.rawBody);
    });
}
