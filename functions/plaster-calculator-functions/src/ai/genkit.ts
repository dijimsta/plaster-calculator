import { openAICompatible } from "@genkit-ai/compat-oai";
import { vertexAI } from "@genkit-ai/google-genai";
import { genkit, modelRef, z } from "genkit";

import { isEmulator } from "../environment.js";

// Genkit has no local emulator for Vertex AI, so the Functions emulator talks to a
// local LM Studio server instead, via its OpenAI-compatible API. Gemma is Gemini's
// open-weight sibling, so it's the closest local equivalent to the production
// model. Load the model in LM Studio and start its local server before
// `pnpm start`; see the functions package README for setup details.
const LM_STUDIO_PLUGIN_NAME = "lmstudio";
const LM_STUDIO_BASE_URL = "http://localhost:1234/v1";
const LM_STUDIO_MODEL =
    process.env["GENKIT_LM_STUDIO_MODEL"] ?? "google/gemma-4-26b-a4b";

export const ai = isEmulator()
    ? genkit({
          plugins: [
              openAICompatible({
                  name: LM_STUDIO_PLUGIN_NAME,
                  apiKey: "lm-studio",
                  baseURL: LM_STUDIO_BASE_URL,
              }),
          ],
          model: modelRef({
              name: `${LM_STUDIO_PLUGIN_NAME}/${LM_STUDIO_MODEL}`,
          }),
      })
    : genkit({
          plugins: [vertexAI({ location: "us-central1" })],
          model: vertexAI.model("gemini-2.5-flash"),
      });

interface LmStudioModelsResponse {
    readonly data?: ReadonlyArray<{ readonly id: string }>;
}

/**
 * Checks that the local LM Studio server is reachable and has the configured
 * model downloaded, logging actionable setup steps to the console when it isn't.
 * Meant to be called before the first generate() of a request, so a dev sees a
 * clear reason instead of an opaque connection/model-not-found error from deep
 * inside the OpenAI-compatible plugin.
 */
export async function checkLmStudioSetup(): Promise<void> {
    if (!isEmulator()) {
        return;
    }

    let response: Response;
    try {
        response = await fetch(`${LM_STUDIO_BASE_URL}/models`);
    } catch (error) {
        logLmStudioSetupError(
            `Could not reach LM Studio at ${LM_STUDIO_BASE_URL} ` +
                `(${error instanceof Error ? error.message : String(error)}). ` +
                "Is LM Studio installed and its local server started? Run: lms server start",
        );
        return;
    }

    if (!response.ok) {
        logLmStudioSetupError(
            `LM Studio responded with HTTP ${response.status} at ${LM_STUDIO_BASE_URL}/models.`,
        );
        return;
    }

    const body = (await response.json()) as LmStudioModelsResponse;
    const downloadedModelIds = (body.data ?? []).map((model) => model.id);
    if (!downloadedModelIds.includes(LM_STUDIO_MODEL)) {
        logLmStudioSetupError(
            `LM Studio is running, but "${LM_STUDIO_MODEL}" isn't downloaded ` +
                `(downloaded: ${downloadedModelIds.length > 0 ? downloadedModelIds.join(", ") : "none"}). ` +
                `Run: lms get ${LM_STUDIO_MODEL}`,
        );
    }
}

function logLmStudioSetupError(message: string): void {
    console.error(
        `\n=== LM Studio setup problem ===\n${message}\n` +
            "See functions/plaster-calculator-functions/README.md#ai-genkit for setup steps.\n",
    );
}

export { z };
