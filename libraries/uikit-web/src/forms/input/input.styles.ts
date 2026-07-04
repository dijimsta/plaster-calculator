import clsx from "clsx";

export const inputGroupStyles = Object.freeze({
    horizontal:
        "flex-1 rounded-none first:rounded-l-md last:rounded-r-md not-first:-ml-px",
    vertical:
        "rounded-none first:rounded-t-md last:rounded-b-md not-first:-mt-px",
});

export const inputRoot =
    "relative flex w-full min-w-0 overflow-hidden text-base text-gray-900 focus-within:z-20 sm:text-sm/6 dark:text-white";

export const variants = Object.freeze({
    default:
        "bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500",
    subtle: "border-0 border-b-2 border-gray-300 bg-gray-50 focus-within:border-indigo-600 dark:border-white/20 dark:bg-white/10 dark:focus-within:border-indigo-500",
});

export type InputVariant = keyof typeof variants;

export const shapes = Object.freeze({
    default: "rounded-md",
    pill: "rounded-full",
});

export type InputShape = keyof typeof shapes;

export type InputAppearanceOptions = {
    readonly groupOrientation?: keyof typeof inputGroupStyles;
    readonly invalid: boolean;
    readonly shape: InputShape;
    readonly variant: InputVariant;
};

export type InputAppearance = {
    readonly groupStyle: string;
    readonly invalidStyle?: string;
    readonly pill: boolean;
    readonly shapeStyle?: string;
    readonly variantStyle: string;
};

export const disabledInputRoot =
    "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-white/10";

export const invalidVariants = Object.freeze({
    default:
        "z-10 outline-red-300 focus-within:outline-red-600 dark:outline-red-500/50 dark:focus-within:outline-red-500",
    subtle: "z-10 border-red-500 focus-within:border-red-600 dark:border-red-500 dark:focus-within:border-red-400",
});

export function inputAppearance({
    groupOrientation,
    invalid,
    shape,
    variant,
}: InputAppearanceOptions): InputAppearance {
    const isGrouped = groupOrientation !== undefined;
    const effectiveVariant = isGrouped ? "default" : variant;
    const isPill =
        !isGrouped && effectiveVariant === "default" && shape === "pill";

    return {
        groupStyle: isGrouped ? inputGroupStyles[groupOrientation] : "",
        invalidStyle: invalid ? invalidVariants[effectiveVariant] : undefined,
        pill: isPill,
        shapeStyle:
            isGrouped || effectiveVariant === "subtle"
                ? undefined
                : shapes[shape],
        variantStyle: variants[effectiveVariant],
    };
}

export const addon =
    "flex shrink-0 items-center border-gray-300 px-3 text-gray-500 select-none dark:border-white/10 dark:text-gray-400";

export const addonBorders = Object.freeze({
    leading: "border-r",
    trailing: "border-l",
});

export const inputContainer = "relative flex min-w-0 flex-1 items-center";

export const iconContainer =
    "pointer-events-none absolute left-0 flex items-center pl-3";

export const pillIconContainer = "pl-4";

export const inputControl =
    "min-w-0 flex-1 bg-transparent outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-400 dark:placeholder:text-gray-500";

export const inputControlPaddings = Object.freeze({
    defaultWithIcon: "py-2 pr-3 pl-9",
    defaultWithoutIcon: "px-3 py-2",
    pillWithIcon: "py-1.5 pr-4 pl-10",
    pillWithoutIcon: "px-4 py-1.5",
});

export function inputControlPadding(
    hasLeadingIcon: boolean,
    pill: boolean,
): string {
    if (pill) {
        return hasLeadingIcon
            ? inputControlPaddings.pillWithIcon
            : inputControlPaddings.pillWithoutIcon;
    }

    return hasLeadingIcon
        ? inputControlPaddings.defaultWithIcon
        : inputControlPaddings.defaultWithoutIcon;
}

export type InputRootClassNameOptions = {
    readonly className?: string;
    readonly disabled: boolean;
    readonly groupStyle: string;
    readonly invalidStyle?: string;
    readonly shapeStyle?: string;
    readonly variantStyle: string;
};

export function inputRootClassName({
    className,
    disabled,
    groupStyle,
    invalidStyle,
    shapeStyle,
    variantStyle,
}: InputRootClassNameOptions): string {
    return clsx(
        inputRoot,
        variantStyle,
        shapeStyle,
        groupStyle,
        disabled && disabledInputRoot,
        invalidStyle,
        className,
    );
}
