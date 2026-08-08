import type { DateSubmission } from "../types/submission";

const ENDPOINT = import.meta.env.VITE_SUBMISSION_ENDPOINT;

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Talks to the Cloudflare Worker. A 200 status alone isn't proof of
 * delivery — the Worker only reports `success: true` once Telegram has
 * actually confirmed the message, so that's the one thing we trust here.
 */
export async function submitDatePlan(
  payload: DateSubmission,
): Promise<SubmitResult> {
  if (!ENDPOINT) {
    return { ok: false, error: "Submission endpoint is not configured." };
  }

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: "Network error while submitting." };
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || !data || data.success !== true) {
    return { ok: false, error: "Submission was not confirmed." };
  }

  return { ok: true };
}
