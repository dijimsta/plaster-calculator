import type { TranslationResource } from "./translation-resource.types.ts";

/** Checks `resource` matches the shape of `reference` without an explicit type annotation. */
export function createTranslationResource<Reference extends object>(
    _reference: Reference,
    resource: TranslationResource<Reference>,
): TranslationResource<Reference> {
    return resource;
}
