import * as DataConnector from "@generated/data-connector-web";
import {
    QuoteAppearanceSchema,
    resolveQuoteAppearance,
    type QuoteAppearance,
} from "@libraries/plaster-calculator-common";
import { QueryFetchPolicy, type DataConnect } from "firebase/data-connect";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
    type FirebaseStorage,
} from "firebase/storage";

import { FirebaseService } from "../firebase/firebase.service.ts";
import { TeamsService } from "../teams/teams.service.ts";

type QuoteAppearanceRow = NonNullable<
    DataConnector.GetMyQuoteAppearanceData["quoteAppearances"][number]
>;

const ALLOWED_LOGO_CONTENT_TYPES: ReadonlySet<string> = new Set([
    "image/png",
    "image/svg+xml",
]);

// `storage.rules` caps the per-user `uploads/{uid}/...` path at 25 MB, but
// there is no existing precedent in the repo for a *logo*-sized limit. A
// letterhead logo is a small, simple image, so 5 MB is a reasonable ceiling
// — generous for a legitimate PNG/SVG logo, but small enough to guard
// against an accidental oversized upload.
const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Reads and writes the calling team's `QuoteAppearance` row (WORK-200/201) —
 * letterhead, output detail, and terms settings for generated quote
 * documents — plus the letterhead logo stored alongside it in Firebase
 * Storage. Shaped after `UserSignaturesService` (`../users/user-signatures.service.ts`):
 * a `get*`/`save*` pair the settings panel's hook binds to, resolved through
 * a shared schema helper (`resolveQuoteAppearance()`) rather than the panel
 * handling "no row saved yet" itself.
 */
export class QuoteAppearanceService {
    public constructor(
        private readonly dataConnect: DataConnect = FirebaseService.getDataConnect(
            DataConnector.connectorConfig,
        ),
        private readonly storage: FirebaseStorage = FirebaseService.getStorage(),
        private readonly teamsService: TeamsService = new TeamsService(),
    ) {}

    public async getAppearance(): Promise<QuoteAppearance> {
        const result = await DataConnector.getMyQuoteAppearance(
            this.dataConnect,
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        return resolveQuoteAppearance(
            this.toQuoteAppearance(result.data.quoteAppearances[0]),
        );
    }

    public async saveAppearance(
        payload: Partial<QuoteAppearance>,
    ): Promise<QuoteAppearance> {
        const current = await this.getAppearance();
        const next = resolveQuoteAppearance({ ...current, ...payload });
        await DataConnector.upsertMyQuoteAppearance(this.dataConnect, {
            logoStoragePath: next.logoStoragePath,
            businessName: next.businessName,
            abn: next.abn,
            licenceNumber: next.licenceNumber,
            address: next.address,
            phoneNumber: next.phoneNumber,
            email: next.email,
            accentColor: next.accentColor,
            pricingDetail: next.pricingDetail,
            showScopeOfWork: next.showScopeOfWork,
            showTakeoffSummary: next.showTakeoffSummary,
            showSignatureBlock: next.showSignatureBlock,
            validForDays: next.validForDays,
            terms: next.terms,
        });
        return this.getAppearance();
    }

    /**
     * Uploads `file` to `teams/{teamId}/quote-appearance/logo.{ext}` (the
     * team-scoped Storage path `storage.rules` grants write access to via
     * the `teamId` custom claim), points `QuoteAppearance.logoStoragePath`
     * at it via `UpdateMyQuoteAppearanceLogo`, and removes whatever logo
     * object previously occupied a *different* path — e.g. a team that
     * replaces a `.png` logo with a `.svg` one — so switching formats never
     * leaves an orphaned object behind.
     */
    public async uploadLogo(file: File): Promise<string> {
        assertValidLogoFile(file);

        const [{ teamId }, current] = await Promise.all([
            this.teamsService.getMyTeamSummary(),
            this.getAppearance(),
        ]);
        const storagePath = `teams/${teamId}/quote-appearance/logo.${resolveLogoExtension(file)}`;

        await uploadBytes(ref(this.storage, storagePath), file, {
            contentType: file.type,
        });
        await DataConnector.updateMyQuoteAppearanceLogo(this.dataConnect, {
            logoStoragePath: storagePath,
        });

        if (
            current.logoStoragePath &&
            current.logoStoragePath !== storagePath
        ) {
            await this.deleteLogoObject(current.logoStoragePath);
        }

        return getDownloadURL(ref(this.storage, storagePath));
    }

    public async removeLogo(): Promise<void> {
        const current = await this.getAppearance();
        await DataConnector.updateMyQuoteAppearanceLogo(this.dataConnect, {
            logoStoragePath: null,
        });

        if (current.logoStoragePath) {
            await this.deleteLogoObject(current.logoStoragePath);
        }
    }

    private async deleteLogoObject(storagePath: string): Promise<void> {
        try {
            await deleteObject(ref(this.storage, storagePath));
        } catch (error) {
            // The object may already be gone (a previous remove/replace
            // that uploaded but failed to clean up); the caller only cares
            // that no logo remains at that path, which is already true.
            if (!isStorageObjectNotFoundError(error)) {
                throw error;
            }
        }
    }

    private toQuoteAppearance(
        row: QuoteAppearanceRow | undefined,
    ): QuoteAppearance | undefined {
        if (!row) {
            return undefined;
        }

        // `QuoteAppearanceSchema.parse()` (rather than a hand-written object
        // literal) narrows `row.pricingDetail` — typed as a plain `string`
        // by the generated SDK, since Data Connect has no enum scalar — down
        // to `QuotePricingDetail`'s closed literal union.
        return QuoteAppearanceSchema.parse({
            logoStoragePath: toNullable(row.logoStoragePath),
            businessName: toNullable(row.businessName),
            abn: toNullable(row.abn),
            licenceNumber: toNullable(row.licenceNumber),
            address: toNullable(row.address),
            phoneNumber: toNullable(row.phoneNumber),
            email: toNullable(row.email),
            accentColor: toNullable(row.accentColor),
            pricingDetail: row.pricingDetail,
            showScopeOfWork: row.showScopeOfWork,
            showTakeoffSummary: row.showTakeoffSummary,
            showSignatureBlock: row.showSignatureBlock,
            validForDays: row.validForDays,
            terms: toNullable(row.terms),
        });
    }
}

function toNullable<T>(value: T | null | undefined): T | null {
    return value ?? null;
}

function assertValidLogoFile(file: File): void {
    if (!ALLOWED_LOGO_CONTENT_TYPES.has(file.type)) {
        throw new Error("Logo must be a PNG or SVG image.");
    }
    if (file.size > MAX_LOGO_SIZE_BYTES) {
        throw new Error("Logo image must be smaller than 5 MB.");
    }
}

// Mirrors `ProjectsService.uploadProject()`'s sanitisation
// (`../projects/projects.service.ts`) so Storage object names stay
// consistent across upload paths in this package.
function sanitizeStorageName(value: string): string {
    return (
        value
            .trim()
            .replace(/[^A-Za-z0-9._-]+/g, "-")
            .replace(/^-+|-+$/g, "") || "upload"
    );
}

/**
 * Derives the logo's Storage path extension from the sanitised original
 * filename, falling back to the (already-validated) content type when the
 * filename has no recognisable `png`/`svg` extension — e.g. a
 * clipboard-pasted image with no name at all.
 */
function resolveLogoExtension(file: File): string {
    const sanitizedName = sanitizeStorageName(file.name);
    const dotIndex = sanitizedName.lastIndexOf(".");
    const nameExtension =
        dotIndex >= 0 ? sanitizedName.slice(dotIndex + 1).toLowerCase() : "";
    if (nameExtension === "png" || nameExtension === "svg") {
        return nameExtension;
    }
    return file.type === "image/svg+xml" ? "svg" : "png";
}

function isStorageObjectNotFoundError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "storage/object-not-found"
    );
}

export const quoteAppearanceService = new QuoteAppearanceService();
