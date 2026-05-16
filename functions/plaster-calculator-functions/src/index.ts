/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { getApps, initializeApp } from "firebase-admin/app";
import {
    createMovie,
    deleteMovie,
    listMovies,
    type ListMoviesData,
} from "@inivi/example-data-connector";
import { setGlobalOptions } from "firebase-functions";
import {
    onCall,
    HttpsError,
    type CallableRequest,
} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

if (getApps().length === 0) {
    initializeApp();
}

type Movie = ListMoviesData["movies"][number];

interface CreateExampleMovieRequest {
    title?: unknown;
    genre?: unknown;
    imageUrl?: unknown;
}

interface DeleteExampleMovieRequest {
    id?: unknown;
}

interface ExampleMoviesResponse {
    movies: Movie[];
}

function requireAuth(request: CallableRequest<unknown>) {
    const auth = request.auth;

    if (!auth) {
        throw new HttpsError(
            "unauthenticated",
            "Must be signed in to call this function.",
        );
    }

    return auth;
}

function readRequiredString(value: unknown, field: string) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new HttpsError("invalid-argument", `${field} is required.`);
    }

    return value.trim();
}

export const helloWorld = onCall((request) => {
    const auth = requireAuth(request);
    const name = auth.token["name"] ?? auth.token.email ?? "stranger";
    logger.info("Hello logs!", { structuredData: true });
    return { message: `Hello, ${name}!` };
});

export const listExampleMovies = onCall<
    unknown,
    Promise<ExampleMoviesResponse>
>(async (request) => {
    requireAuth(request);

    const response = await listMovies();
    return { movies: response.data.movies };
});

export const createExampleMovie = onCall<
    CreateExampleMovieRequest,
    Promise<ExampleMoviesResponse>
>(async (request) => {
    requireAuth(request);

    await createMovie({
        title: readRequiredString(request.data.title, "Title"),
        genre: readRequiredString(request.data.genre, "Genre"),
        imageUrl: readRequiredString(request.data.imageUrl, "Image URL"),
    });

    const response = await listMovies();
    return { movies: response.data.movies };
});

export const deleteExampleMovie = onCall<
    DeleteExampleMovieRequest,
    Promise<ExampleMoviesResponse>
>(async (request) => {
    requireAuth(request);

    await deleteMovie({
        id: readRequiredString(request.data.id, "Movie ID"),
    });

    const response = await listMovies();
    return { movies: response.data.movies };
});
