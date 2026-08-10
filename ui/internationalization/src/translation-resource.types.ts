export type TranslationResource<T> = {
    readonly [K in keyof T]: T[K] extends string
        ? string
        : TranslationResource<T[K]>;
};
