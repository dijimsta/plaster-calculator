"use client";

import clsx from "clsx";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { ReactElement } from "react";

export type ComboboxOption = {
    readonly value: string;
    readonly label: string;
};

export type ComboboxProps = {
    readonly options: readonly ComboboxOption[];
    readonly value?: string | null;
    readonly onChange?: (value: string | null) => void;
    readonly placeholder?: string;
    readonly disabled?: boolean;
    readonly id?: string;
    readonly className?: string;
};

export function Combobox({
    options,
    value = null,
    onChange,
    placeholder,
    disabled = false,
    id: externalId,
    className,
}: ComboboxProps): ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const listboxId = `${id}-listbox`;
    const inputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        if (activeIndex < 0 || !listboxRef.current) return;
        const activeEl = listboxRef.current.querySelector<HTMLElement>(
            `#${id}-option-${activeIndex}`,
        );
        activeEl?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, id]);

    const selectedOption = useMemo(
        () => options.find((opt) => opt.value === value) ?? null,
        [options, value],
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [...options];
        return options.filter((opt) => opt.label.toLowerCase().includes(q));
    }, [options, query]);

    const inputDisplayValue = open ? query : (selectedOption?.label ?? "");

    function openDropdown(): void {
        setQuery(selectedOption?.label ?? "");
        setOpen(true);
        setActiveIndex(-1);
        inputRef.current?.focus();
    }

    function closeDropdown(): void {
        setOpen(false);
        setQuery("");
        setActiveIndex(-1);
    }

    function selectOption(option: ComboboxOption): void {
        onChange?.(option.value);
        closeDropdown();
    }

    const activeOptionId =
        activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined;

    return (
        <div className={clsx("relative", className)}>
            <input
                ref={inputRef}
                id={id}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-activedescendant={activeOptionId}
                value={inputDisplayValue}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete="off"
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    setActiveIndex(-1);
                }}
                onFocus={openDropdown}
                onBlur={() => {
                    window.setTimeout(closeDropdown, 120);
                }}
                onKeyDown={(e) => {
                    switch (e.key) {
                        case "ArrowDown":
                            e.preventDefault();
                            setActiveIndex((i) =>
                                Math.min(i + 1, filtered.length - 1),
                            );
                            break;
                        case "ArrowUp":
                            e.preventDefault();
                            setActiveIndex((i) => Math.max(i - 1, 0));
                            break;
                        case "Enter":
                            if (activeIndex >= 0 && filtered[activeIndex]) {
                                e.preventDefault();
                                selectOption(filtered[activeIndex]);
                            }
                            break;
                        case "Escape":
                            closeDropdown();
                            break;
                    }
                }}
                className={clsx(
                    "block",
                    "w-full",
                    "rounded-md",
                    "bg-white",
                    "py-1.5",
                    "pr-9",
                    "pl-3",
                    "text-base",
                    "text-gray-900",
                    "outline-1",
                    "-outline-offset-1",
                    "outline-gray-300",
                    "placeholder:text-gray-400",
                    "focus:outline-2",
                    "focus:-outline-offset-2",
                    "focus:outline-indigo-600",
                    "disabled:cursor-not-allowed",
                    "disabled:bg-gray-100",
                    "disabled:text-gray-400",
                    "dark:bg-white/5",
                    "dark:text-white",
                    "dark:outline-white/10",
                    "dark:placeholder:text-gray-500",
                    "dark:focus:outline-indigo-500",
                    "dark:disabled:bg-white/10",
                    "sm:text-sm/6",
                )}
            />
            <button
                type="button"
                tabIndex={-1}
                aria-expanded={open}
                aria-controls={listboxId}
                onClick={() => (open ? closeDropdown() : openDropdown())}
                className={clsx(
                    "absolute",
                    "inset-y-0",
                    "right-0",
                    "flex",
                    "items-center",
                    "rounded-r-md",
                    "px-2",
                )}
            >
                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={clsx("size-5", "text-gray-400")}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    />
                </svg>
            </button>

            {open && (
                <ul
                    ref={listboxRef}
                    id={listboxId}
                    role="listbox"
                    className={clsx(
                        "absolute",
                        "z-10",
                        "mt-1",
                        "max-h-60",
                        "w-full",
                        "overflow-auto",
                        "rounded-md",
                        "bg-white",
                        "py-1",
                        "text-base",
                        "shadow-lg",
                        "outline-1",
                        "outline-black/5",
                        "sm:text-sm",
                        "dark:bg-gray-800",
                        "dark:shadow-none",
                        "dark:outline-white/10",
                    )}
                >
                    {filtered.length === 0 ? (
                        <li
                            className={clsx(
                                "px-3",
                                "py-2",
                                "text-sm",
                                "text-gray-500",
                                "dark:text-gray-400",
                            )}
                        >
                            No results found.
                        </li>
                    ) : (
                        filtered.map((option, index) => (
                            <li
                                key={option.value}
                                id={`${id}-option-${index}`}
                                role="option"
                                aria-selected={option.value === value}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => selectOption(option)}
                                className={clsx(
                                    "block",
                                    "truncate",
                                    "cursor-pointer",
                                    "select-none",
                                    "px-3",
                                    "py-2",
                                    index === activeIndex ||
                                        option.value === value
                                        ? ["bg-indigo-600", "text-white"]
                                        : [
                                              "text-gray-900",
                                              "dark:text-gray-300",
                                          ],
                                )}
                            >
                                {option.label}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
