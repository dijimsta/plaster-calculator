"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    deleteObject,
    getDownloadURL,
    getMetadata,
    listAll,
    ref,
    uploadBytesResumable,
    type StorageReference,
} from "firebase/storage";

import { useUser } from "../../../auth/user.hook.js";
import { storage } from "../../../firebase/firebase.utils.js";

import styles from "./uploads.module.css";

interface UploadItem {
    name: string;
    path: string;
    url: string;
    size: number;
    updated: string;
}

function formatBytes(size: number) {
    if (size < 1024) {
        return `${size} B`;
    }

    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function readMessage(error: unknown, fallback: string) {
    return error instanceof Error ? error.message : fallback;
}

async function readUploadItem(fileRef: StorageReference): Promise<UploadItem> {
    const [url, metadata] = await Promise.all([
        getDownloadURL(fileRef),
        getMetadata(fileRef),
    ]);

    return {
        name: metadata.name,
        path: fileRef.fullPath,
        url,
        size: metadata.size,
        updated: metadata.updated,
    };
}

export default function UploadsPage() {
    const user = useUser();
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [deletingPath, setDeletingPath] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const uploadsRef = useMemo(() => {
        return user ? ref(storage, `uploads/${user.uid}`) : null;
    }, [user]);

    const loadUploads = useCallback(async () => {
        if (!uploadsRef) {
            setUploads([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await listAll(uploadsRef);
            const items = await Promise.all(result.items.map(readUploadItem));
            items.sort(
                (first, second) =>
                    Date.parse(second.updated) - Date.parse(first.updated),
            );
            setUploads(items);
        } catch (err: unknown) {
            setError(readMessage(err, "Could not load uploads."));
        } finally {
            setLoading(false);
        }
    }, [uploadsRef]);

    useEffect(() => {
        void loadUploads();
    }, [loadUploads]);

    async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!uploadsRef || !selectedFiles || selectedFiles.length === 0) {
            return;
        }

        setUploading(true);
        setUploadProgress(0);
        setError(null);
        setMessage(null);

        try {
            const files = Array.from(selectedFiles);

            for (const file of files) {
                if (!file.type.startsWith("image/")) {
                    throw new Error(`${file.name} is not an image.`);
                }

                const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
                const fileRef = ref(uploadsRef, `${Date.now()}-${safeName}`);
                const uploadTask = uploadBytesResumable(fileRef, file, {
                    contentType: file.type,
                });

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                snapshot.bytesTransferred / snapshot.totalBytes;
                            setUploadProgress(Math.round(progress * 100));
                        },
                        reject,
                        resolve,
                    );
                });
            }

            setSelectedFiles(null);
            setMessage(
                files.length === 1
                    ? "Image uploaded."
                    : `${files.length} images uploaded.`,
            );
            await loadUploads();
        } catch (err: unknown) {
            setError(readMessage(err, "Could not upload image."));
        } finally {
            setUploading(false);
            setUploadProgress(null);
        }
    }

    async function handleDelete(upload: UploadItem) {
        setDeletingPath(upload.path);
        setError(null);
        setMessage(null);

        try {
            await deleteObject(ref(storage, upload.path));
            setUploads((current) =>
                current.filter((item) => item.path !== upload.path),
            );
            setMessage("Image deleted.");
        } catch (err: unknown) {
            setError(readMessage(err, "Could not delete image."));
        } finally {
            setDeletingPath(null);
        }
    }

    return (
        <main className={styles["page"]}>
            <div className={styles["header"]}>
                <div>
                    <h1 className={styles["title"]}>Uploads</h1>
                    <p className={styles["subtitle"]}>
                        Upload and manage images stored in your Firebase Storage
                        folder.
                    </p>
                </div>
                <div
                    className={`${styles["status"]} ${error ? styles["error"] : ""}`}
                >
                    {error ??
                        message ??
                        (loading
                            ? "Loading uploads..."
                            : `${uploads.length} images`)}
                </div>
            </div>

            <div className={styles["layout"]}>
                <section className={styles["panel"]} aria-label="Upload image">
                    <form className={styles["form"]} onSubmit={handleUpload}>
                        <label className={styles["label"]}>
                            Images
                            <input
                                accept="image/*"
                                className={styles["fileInput"]}
                                disabled={uploading}
                                multiple
                                onChange={(event) =>
                                    setSelectedFiles(event.target.files)
                                }
                                type="file"
                            />
                        </label>
                        <button
                            className={styles["button"]}
                            disabled={
                                uploading ||
                                !selectedFiles ||
                                selectedFiles.length === 0
                            }
                            type="submit"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                        {uploadProgress !== null ? (
                            <progress
                                className={styles["progress"]}
                                max={100}
                                value={uploadProgress}
                            />
                        ) : null}
                    </form>
                </section>

                {uploads.length === 0 && !loading ? (
                    <p className={styles["empty"]}>No uploads yet.</p>
                ) : (
                    <section
                        className={styles["uploadGrid"]}
                        aria-label="Uploaded images"
                    >
                        {uploads.map((upload) => (
                            <article
                                className={styles["uploadCard"]}
                                key={upload.path}
                            >
                                <img
                                    alt=""
                                    className={styles["preview"]}
                                    src={upload.url}
                                />
                                <div className={styles["uploadBody"]}>
                                    <div>
                                        <h2 className={styles["uploadName"]}>
                                            {upload.name}
                                        </h2>
                                        <p className={styles["meta"]}>
                                            {formatBytes(upload.size)}
                                        </p>
                                    </div>
                                    <button
                                        className={styles["deleteButton"]}
                                        disabled={deletingPath === upload.path}
                                        onClick={() =>
                                            void handleDelete(upload)
                                        }
                                        type="button"
                                    >
                                        {deletingPath === upload.path
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
