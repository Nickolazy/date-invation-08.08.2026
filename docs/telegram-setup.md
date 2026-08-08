# Telegram + Cloudflare setup

End-to-end setup for the submission flow: the app POSTs the final choice
to a Cloudflare Worker, which validates it and forwards it to a Telegram
chat via the Bot API.

```text
React (GitHub Pages)  →  Cloudflare Worker  →  Telegram Bot API  →  your Telegram
```

## 1. Create a Telegram bot

1. Open Telegram and message [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts (name, username).
3. BotFather replies with a **Bot Token** — looks like
   `123456789:AAExampleTokenDoNotShareThis`. Save it somewhere private for
   now; it goes into a Cloudflare secret in step 3, never into the repo.
4. Open the bot BotFather just created (the link it gives you) and press
   **Start**, or send it `/start` — until you do this, the bot can't
   message you.

## 2. Get your Chat ID

1. With the bot started, send it any message (e.g. "hi").
2. In a browser, open:
   ```text
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
3. Find `"chat":{"id":<NUMBER>, ...}` in the response — that number is
   your **Chat ID**.

## 3. Cloudflare account + Worker secrets

```bash
cd worker
npm install
npx wrangler login       # opens a browser to authorize the CLI
npx wrangler whoami       # confirms which account you're logged into

npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

Each `secret put` prompts for the value and stores it encrypted on
Cloudflare's side. Secrets never touch `wrangler.jsonc`, git, or the
deployed source — they're injected into `env` at request time only.

## 4. Configure the allowed origin

Edit `worker/wrangler.jsonc`:

```jsonc
"vars": {
  "ALLOWED_ORIGIN": "https://YOUR_USERNAME.github.io"
}
```

Use the **origin only** — no trailing path. Even if GitHub Pages serves
the app from `https://YOUR_USERNAME.github.io/PROJECT/`, the value here
is `https://YOUR_USERNAME.github.io`. `localhost`/`127.0.0.1` are always
allowed in addition to this, for local development.

## 5. Deploy the Worker

```bash
npm run deploy
# or from the repo root: npm run worker:deploy
```

Wrangler prints the deployed URL, e.g.
`https://date-invitation-worker.<your-subdomain>.workers.dev`.

Verify it's alive:

```bash
curl https://date-invitation-worker.<your-subdomain>.workers.dev/health
# {"ok":true}
```

## 6. Point the frontend at the Worker

At the repo root:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUBMISSION_ENDPOINT=https://date-invitation-worker.<your-subdomain>.workers.dev/submit
```

For the production build served from GitHub Pages, set the same
`VITE_SUBMISSION_ENDPOINT` value as a **repository variable or secret**
and pass it into the build step in `.github/workflows/deploy.yml`
alongside the existing `VITE_BASE_PATH`, e.g.:

```yaml
- name: Build
  env:
    VITE_BASE_PATH: /${{ github.event.repository.name }}/
    VITE_SUBMISSION_ENDPOINT: ${{ vars.VITE_SUBMISSION_ENDPOINT }}
  run: npm run build
```

(Add `VITE_SUBMISSION_ENDPOINT` under the repo's Settings → Secrets and
variables → Actions → Variables.)

## 7. Build and deploy the frontend

```bash
npm run build
```

Push to `main` — the existing GitHub Actions workflow deploys `dist/` to
GitHub Pages automatically.

## 8. Verify the full flow

Open the deployed app, go through the whole scenario, and press
**"До встречи ❤️"** on the final screen. A message should arrive in your
Telegram chat within a couple of seconds, and the app should show its
final cinematic state only after that.

---

## Local development

```bash
cd worker
cp .dev.vars.example .dev.vars
# fill in TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .dev.vars
npm run dev          # or: npm run worker:dev from the repo root
```

`.dev.vars` is git-ignored — real credentials never need to leave your
machine for local testing. In another terminal:

```bash
npm run dev           # starts Vite at http://localhost:5173
```

with `.env` pointing `VITE_SUBMISSION_ENDPOINT` at
`http://localhost:8787/submit`.

## Testing with curl

### Health

```bash
curl https://YOUR-WORKER.workers.dev/health
```

Expected:

```json
{ "ok": true }
```

### Submission

```bash
curl -X POST https://YOUR-WORKER.workers.dev/submit \
  -H "Content-Type: application/json" \
  -d '{
    "submissionId": "test-submission",
    "selectedDate": {
      "id": "date-1",
      "weekday": "Суббота",
      "day": "15",
      "month": "августа"
    },
    "selectedMovie": {
      "id": "movie-1",
      "title": "Example Movie",
      "time": "19:30"
    },
    "selectedFood": {
      "id": "food-1",
      "label": "Пицца"
    },
    "selectedFoodPlace": {
      "id": "place-1",
      "name": "Example Place"
    },
    "selectedDressCode": {
      "id": "dress-1",
      "label": "Красиво"
    },
    "selectedMeetingPoint": {
      "id": "meeting-1",
      "label": "Example Meeting Point",
      "time": "18:40"
    },
    "noClicks": 2,
    "completedAt": "2026-08-08T12:00:00.000Z"
  }'
```

Expected on success:

```json
{ "success": true }
```

An invalid or incomplete body returns `400` with
`{ "success": false, "error": "Invalid submission" }`; a Telegram
delivery failure returns `502` with a generic error — neither leaks
internal details or secrets.

Note: field names (`weekday`/`day`/`month`, `label`, `name`) match this
project's existing option types in `src/types/invitation.ts` rather than
a generic `title` — see `src/types/submission.ts` for the exact DTO the
frontend actually sends.
