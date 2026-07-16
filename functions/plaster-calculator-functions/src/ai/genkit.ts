import { vertexAI } from "@genkit-ai/google-genai";
import { genkit, z } from "genkit";

export const ai = genkit({
    plugins: [vertexAI({ location: "us-central1" })],
    model: vertexAI.model("gemini-2.5-flash"),
});

export { z };
