/** Shared Cloud Function runtime options for the inference endpoints.
 *
 * Memory/CPU are a deliberately generous starting point, not a tuned
 * value: WORK-305's benchmark measured this service's own
 * onnxruntime-node process peaking at ~28GB on the larger of two real
 * (200 DPI, full-sheet) floorplan images tested -- and that's not
 * necessarily the largest real upload possible (untested ARCH-D-class
 * sheets would be bigger still; there's no size cap anywhere in the
 * upload pipeline, see WORK-305). 32GiB is the actual ceiling for a Gen
 * 2 Cloud Function, which requires 8 vCPU to unlock (Cloud Run's
 * memory/CPU coupling). Started with 16GiB/4 vCPU here originally, but
 * that's already below the measured peak on real data, so it went
 * straight to the max instead of a number already known to be
 * insufficient. Needs real production traffic data before narrowing;
 * the failure mode of under-provisioning is a crash, not just wasted
 * spend, and there isn't yet a principled reason to believe 32GiB is
 * enough either -- an explicit max-input-size cap may be the more
 * durable fix. See WORK-305. */
export const INFERENCE_RUNTIME_OPTIONS = {
    memory: "32GiB",
    timeoutSeconds: 300,
    cpu: 8,
} as const;
