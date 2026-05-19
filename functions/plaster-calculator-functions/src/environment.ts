export function isEmulator(): boolean {
    return Boolean(process.env["FUNCTIONS_EMULATOR"]);
}

export function projectId(): string {
    return (
        process.env["GCLOUD_PROJECT"] ??
        process.env["GCP_PROJECT"] ??
        process.env["FIREBASE_PROJECT"] ??
        "plaster-calculator"
    );
}
