/** Shared Cloud Function runtime options for the inference endpoints.
 *
 * Memory matches floorplan-analyzer's OCR_MEMORY (main.py) as a starting
 * point, not a tuned value: WORK-305's benchmark measured this service's
 * own onnxruntime-node process peaking at 25-28GB on real (large,
 * 200 DPI, full-sheet) floorplan images -- run without any explicit
 * memory option, which meant Cloud Functions' small default, well under
 * what a large upload actually needs. Needs real production traffic data
 * before tuning further; err generous, not tight, given the failure mode
 * of under-provisioning is a crash, not just wasted spend. */
export const INFERENCE_RUNTIME_OPTIONS = {
    memory: "16GiB",
    timeoutSeconds: 300,
    cpu: 4,
} as const;
