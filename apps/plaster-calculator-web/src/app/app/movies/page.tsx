"use client";

import { useEffect, useMemo, useState } from "react";
import { httpsCallable } from "firebase/functions";

import { functions } from "../../../firebase/firebase.utils.js";

import styles from "./movies.module.css";

interface Movie {
    id: string;
    title: string;
    genre?: string | null;
    imageUrl: string;
}

interface MoviesResponse {
    movies: Movie[];
}

interface CreateMovieRequest {
    title: string;
    genre: string;
    imageUrl: string;
}

interface DeleteMovieRequest {
    id: string;
}

const fallbackImageUrl =
    "https://placehold.co/640x400/f1f4f8/4b5563?text=Movie";

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [imageUrl, setImageUrl] = useState(fallbackImageUrl);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const api = useMemo(
        () => ({
            list: httpsCallable<unknown, MoviesResponse>(
                functions,
                "listExampleMovies",
            ),
            create: httpsCallable<CreateMovieRequest, MoviesResponse>(
                functions,
                "createExampleMovie",
            ),
            delete: httpsCallable<DeleteMovieRequest, MoviesResponse>(
                functions,
                "deleteExampleMovie",
            ),
        }),
        [],
    );

    useEffect(() => {
        let active = true;
        api.list()
            .then((result) => {
                if (active) {
                    setMovies(result.data.movies);
                    setError(null);
                }
            })
            .catch((err: unknown) => {
                if (active) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Could not load movies.",
                    );
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, [api]);

    async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setMessage(null);

        try {
            const result = await api.create({
                title,
                genre,
                imageUrl,
            });
            setMovies(result.data.movies);
            setTitle("");
            setGenre("");
            setImageUrl(fallbackImageUrl);
            setMessage("Movie added.");
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : "Could not add movie.",
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        setDeletingId(id);
        setError(null);
        setMessage(null);

        try {
            const result = await api.delete({ id });
            setMovies(result.data.movies);
            setMessage("Movie deleted.");
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : "Could not delete movie.",
            );
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <main className={styles["page"]}>
            <div className={styles["header"]}>
                <div>
                    <h1 className={styles["title"]}>Example Movies</h1>
                    <p className={styles["subtitle"]}>
                        A small Data Connect demo routed through
                        plaster-calculator-functions.
                    </p>
                </div>
                <div
                    className={`${styles["status"]} ${error ? styles["error"] : ""}`}
                >
                    {error ??
                        message ??
                        (loading
                            ? "Loading movies..."
                            : `${movies.length} movies`)}
                </div>
            </div>

            <div className={styles["layout"]}>
                <section className={styles["panel"]} aria-label="Add movie">
                    <form className={styles["form"]} onSubmit={handleCreate}>
                        <label className={styles["label"]}>
                            Title
                            <input
                                className={styles["input"]}
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                required
                                maxLength={120}
                                placeholder="The Lime Room"
                            />
                        </label>
                        <label className={styles["label"]}>
                            Genre
                            <input
                                className={styles["input"]}
                                value={genre}
                                onChange={(event) =>
                                    setGenre(event.target.value)
                                }
                                required
                                maxLength={60}
                                placeholder="Documentary"
                            />
                        </label>
                        <label className={styles["label"]}>
                            Image URL
                            <input
                                className={styles["input"]}
                                value={imageUrl}
                                onChange={(event) =>
                                    setImageUrl(event.target.value)
                                }
                                required
                                type="url"
                            />
                        </label>
                        <button
                            className={styles["button"]}
                            disabled={saving}
                            type="submit"
                        >
                            {saving ? "Adding..." : "Add movie"}
                        </button>
                    </form>
                </section>

                {movies.length === 0 && !loading ? (
                    <p className={styles["empty"]}>No movies yet.</p>
                ) : (
                    <section
                        className={styles["movieGrid"]}
                        aria-label="Movies"
                    >
                        {movies.map((movie) => (
                            <article
                                className={styles["movieCard"]}
                                key={movie.id}
                            >
                                <img
                                    alt=""
                                    className={styles["poster"]}
                                    src={movie.imageUrl}
                                />
                                <div className={styles["movieBody"]}>
                                    <div>
                                        <h2 className={styles["movieTitle"]}>
                                            {movie.title}
                                        </h2>
                                        <p className={styles["genre"]}>
                                            {movie.genre ?? "Uncategorised"}
                                        </p>
                                    </div>
                                    <button
                                        className={styles["deleteButton"]}
                                        disabled={deletingId === movie.id}
                                        onClick={() =>
                                            void handleDelete(movie.id)
                                        }
                                        type="button"
                                    >
                                        {deletingId === movie.id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}
