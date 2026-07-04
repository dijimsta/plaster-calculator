export const formLayoutVariants = Object.freeze({
    "stacked": "space-y-12",
    "two-column": "space-y-12",
    "cards": "space-y-12",
    "labels-left": "space-y-12",
});

export type FormLayoutVariant = keyof typeof formLayoutVariants;
