import { useEffect, useState } from "react";

interface EditorImageState {
    readonly image: HTMLImageElement | null;
    readonly imageError: string;
}

export function useEditorImage(imageUrl: string): EditorImageState {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        setImage(null);
        setImageError("");
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => setImage(img);
        img.onerror = () =>
            setImageError(`Could not load floorplan image: ${imageUrl}`);
        img.src = imageUrl;
    }, [imageUrl]);

    return { image, imageError };
}
