import { useEffect, useState, type RefObject } from "react";

interface ViewportSize {
    readonly width: number;
    readonly height: number;
}

export function useEditorViewport(
    canvasWrapRef: RefObject<HTMLDivElement | null>,
): ViewportSize {
    const [viewport, setViewport] = useState<ViewportSize>({
        width: 1200,
        height: 760,
    });

    useEffect(() => {
        const element = canvasWrapRef.current;
        if (!element) return;
        const update = () =>
            setViewport({
                width: element.clientWidth,
                height: element.clientHeight,
            });
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, [canvasWrapRef]);

    return viewport;
}
