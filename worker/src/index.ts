export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  ALLOWED_ORIGIN: string;
}

// A submission is a handful of short strings — there is no legitimate
// reason for the body to be anywhere near this large.
const MAX_BODY_BYTES = 8 * 1024;
const MAX_STRING_LENGTH = 200;
const MAX_ID_LENGTH = 100;
const MAX_NO_CLICKS = 1000;

const JSON_CONTENT_TYPE = "application/json; charset=utf-8";

// --- CORS -------------------------------------------------------------

function isAllowedOrigin(origin: string | null, env: Env): boolean {
  if (!origin) return false;
  if (origin === env.ALLOWED_ORIGIN) return true;
  // Local dev only — Vite's default dev server origins.
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function corsHeaders(origin: string | null, env: Env): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  if (isAllowedOrigin(origin, env)) {
    headers["Access-Control-Allow-Origin"] = origin as string;
  }
  return headers;
}

function jsonResponse(
  body: unknown,
  status: number,
  origin: string | null,
  env: Env,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": JSON_CONTENT_TYPE,
      ...corsHeaders(origin, env),
    },
  });
}

// --- Submission DTO & validation ---------------------------------------

// Mirrors src/types/submission.ts on the frontend. Frontend TypeScript
// types are compile-time only — nothing stops an arbitrary POST body from
// reaching this endpoint, so every field is re-checked at runtime.
type Submission = {
  submissionId: string;
  selectedDate: { id: string; weekday: string; day: string; month: string };
  selectedMovie: { id: string; title: string; time: string };
  selectedFood: { id: string; label: string };
  selectedFoodPlace: { id: string; name: string };
  selectedDressCode: { id: string; label: string };
  selectedMeetingPoint: { id: string; label: string; time?: string };
  noClicks: number;
  completedAt: string;
};

function isNonEmptyString(value: unknown, maxLength: number): boolean {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
}

function isOptionalString(value: unknown, maxLength: number): boolean {
  return (
    value === undefined ||
    (typeof value === "string" && value.length <= maxLength)
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStringFields(
  value: unknown,
  fields: Array<[key: string, maxLength: number]>,
): value is Record<string, string> {
  if (!isPlainObject(value)) return false;
  return fields.every(([key, maxLength]) =>
    isNonEmptyString(value[key], maxLength),
  );
}

function validateSubmission(data: unknown): Submission | null {
  if (!isPlainObject(data)) return null;

  if (!isNonEmptyString(data.submissionId, MAX_ID_LENGTH)) return null;
  // Frontend always sends crypto.randomUUID(); keep the accepted charset
  // narrow so the id can never carry anything Telegram would interpret.
  if (!/^[a-zA-Z0-9-]+$/.test(data.submissionId as string)) return null;

  if (
    !hasStringFields(data.selectedDate, [
      ["id", MAX_ID_LENGTH],
      ["weekday", MAX_STRING_LENGTH],
      ["day", MAX_STRING_LENGTH],
      ["month", MAX_STRING_LENGTH],
    ])
  ) {
    return null;
  }

  if (
    !hasStringFields(data.selectedMovie, [
      ["id", MAX_ID_LENGTH],
      ["title", MAX_STRING_LENGTH],
      ["time", MAX_STRING_LENGTH],
    ])
  ) {
    return null;
  }

  if (
    !hasStringFields(data.selectedFood, [
      ["id", MAX_ID_LENGTH],
      ["label", MAX_STRING_LENGTH],
    ])
  ) {
    return null;
  }

  if (
    !hasStringFields(data.selectedFoodPlace, [
      ["id", MAX_ID_LENGTH],
      ["name", MAX_STRING_LENGTH],
    ])
  ) {
    return null;
  }

  if (
    !hasStringFields(data.selectedDressCode, [
      ["id", MAX_ID_LENGTH],
      ["label", MAX_STRING_LENGTH],
    ])
  ) {
    return null;
  }

  const meetingPoint = data.selectedMeetingPoint;
  if (!isPlainObject(meetingPoint)) return null;
  if (!isNonEmptyString(meetingPoint.id, MAX_ID_LENGTH)) return null;
  if (!isNonEmptyString(meetingPoint.label, MAX_STRING_LENGTH)) return null;
  if (!isOptionalString(meetingPoint.time, MAX_STRING_LENGTH)) return null;

  if (
    typeof data.noClicks !== "number" ||
    !Number.isInteger(data.noClicks) ||
    data.noClicks < 0 ||
    data.noClicks > MAX_NO_CLICKS
  ) {
    return null;
  }

  if (!isNonEmptyString(data.completedAt, 40)) return null;
  if (Number.isNaN(Date.parse(data.completedAt as string))) return null;

  return {
    submissionId: data.submissionId as string,
    selectedDate: data.selectedDate as Submission["selectedDate"],
    selectedMovie: data.selectedMovie as Submission["selectedMovie"],
    selectedFood: data.selectedFood as Submission["selectedFood"],
    selectedFoodPlace: data.selectedFoodPlace as Submission["selectedFoodPlace"],
    selectedDressCode: data.selectedDressCode as Submission["selectedDressCode"],
    selectedMeetingPoint: {
      id: meetingPoint.id as string,
      label: meetingPoint.label as string,
      time: meetingPoint.time as string | undefined,
    },
    noClicks: data.noClicks,
    completedAt: data.completedAt as string,
  };
}

// --- Telegram -----------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildTelegramMessage(submission: Submission): string {
  const e = escapeHtml;
  const meetingTimeLine = submission.selectedMeetingPoint.time
    ? `\n${e(submission.selectedMeetingPoint.time)}`
    : "";

  return [
    "❤️ <b>НОВОЕ СВИДАНИЕ</b>",
    "",
    `📅 ${e(submission.selectedDate.day)} ${e(submission.selectedDate.month)}, ${e(submission.selectedDate.weekday)}`,
    "",
    "🎬 <b>Фильм</b>",
    e(submission.selectedMovie.title),
    e(submission.selectedMovie.time),
    "",
    "🍝 <b>Перед кино</b>",
    e(submission.selectedFood.label),
    "",
    "📍 <b>Где едим</b>",
    e(submission.selectedFoodPlace.name),
    "",
    "👗 <b>Как одеваемся</b>",
    e(submission.selectedDressCode.label),
    "",
    "📍 <b>Где встречаемся</b>",
    `${e(submission.selectedMeetingPoint.label)}${meetingTimeLine}`,
    "",
    "😌 <b>«Нет» нажато</b>",
    `${submission.noClicks} раз`,
    "",
    "━━━━━━━━━━━━━━",
    "",
    "✨ До встречи ❤️",
    "",
    `<i>ID: ${e(submission.submissionId)}</i>`,
  ].join("\n");
}

async function sendTelegramMessage(env: Env, text: string): Promise<boolean> {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });

  // A 200 from Telegram's HTTP layer isn't proof of delivery — the body
  // still needs `ok: true` (Telegram reports rejected messages with 200 +
  // `ok: false` in some cases, so both checks matter).
  let body: { ok?: boolean } | null = null;
  try {
    body = await response.json();
  } catch {
    // Non-JSON response — `body` stays null, treated as delivery failure.
  }

  return response.ok && body?.ok === true;
}

// --- Route handlers -------------------------------------------------------

async function handleSubmit(
  request: Request,
  env: Env,
  origin: string | null,
): Promise<Response> {
  const contentLength = request.headers.get("Content-Length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return jsonResponse(
      { success: false, error: "Payload too large" },
      413,
      origin,
      env,
    );
  }

  const contentType = request.headers.get("Content-Type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse(
      { success: false, error: "Invalid submission" },
      400,
      origin,
      env,
    );
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return jsonResponse(
      { success: false, error: "Payload too large" },
      413,
      origin,
      env,
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid submission" },
      400,
      origin,
      env,
    );
  }

  const submission = validateSubmission(parsed);
  if (!submission) {
    return jsonResponse(
      { success: false, error: "Invalid submission" },
      400,
      origin,
      env,
    );
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID secret");
    return jsonResponse(
      { success: false, error: "Submission service is not configured" },
      502,
      origin,
      env,
    );
  }

  let delivered: boolean;
  try {
    delivered = await sendTelegramMessage(env, buildTelegramMessage(submission));
  } catch (err) {
    console.error("Telegram request failed", err);
    delivered = false;
  }

  if (!delivered) {
    return jsonResponse(
      { success: false, error: "Could not deliver submission" },
      502,
      origin,
      env,
    );
  }

  return jsonResponse({ success: true }, 200, origin, env);
}

function handleHealth(origin: string | null, env: Env): Response {
  return jsonResponse({ ok: true }, 200, origin, env);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (
      request.method === "OPTIONS" &&
      (url.pathname === "/submit" || url.pathname === "/health")
    ) {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return handleHealth(origin, env);
    }

    if (request.method === "POST" && url.pathname === "/submit") {
      return handleSubmit(request, env, origin);
    }

    return jsonResponse({ success: false, error: "Not found" }, 404, origin, env);
  },
} satisfies ExportedHandler<Env>;
