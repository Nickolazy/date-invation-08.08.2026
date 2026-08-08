# date-invitation-worker

Cloudflare Worker that receives the final submission from the invitation
app and relays it to Telegram. Stateless — no KV, R2, D1, or Durable
Objects; just validation and a `fetch` to the Telegram Bot API.

Routes:

```text
POST /submit    validate a submission and send it to Telegram
GET  /health    { "ok": true } — no secrets required
OPTIONS *       CORS preflight for the two routes above
```

Full setup walkthrough (Telegram bot + Cloudflare): [`../docs/telegram-setup.md`](../docs/telegram-setup.md).

## Install

```bash
npm install
```

## Local development

Secrets are never read from `wrangler.jsonc` — locally they come from a
`.dev.vars` file that stays out of git.

```bash
cp .dev.vars.example .dev.vars
# then edit .dev.vars and fill in TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID
npm run dev
```

`npm run dev` (or `npm run worker:dev` from the repo root) starts the
Worker on `http://localhost:8787`. `ALLOWED_ORIGIN` in `wrangler.jsonc`
only needs to match your production frontend — `localhost`/`127.0.0.1`
origins are always allowed for local development regardless of that
value.

## Secrets (production)

```bash
npx wrangler login
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

These are stored encrypted by Cloudflare and are only readable by the
Worker at runtime — they never appear in `wrangler.jsonc`, in git, or in
the deployed bundle.

## Configuration

Edit `wrangler.jsonc`:

- `name` — the Worker's name (`https://<name>.<your-subdomain>.workers.dev`).
- `vars.ALLOWED_ORIGIN` — the GitHub Pages **origin** serving the
  frontend, e.g. `https://your-username.github.io` (no trailing path,
  even if Pages serves the app from `/your-repo/`).

## Deploy

```bash
npm run deploy
```

## Manual checks

```bash
curl https://YOUR-WORKER.workers.dev/health
# {"ok":true}

curl -i -X OPTIONS https://YOUR-WORKER.workers.dev/submit \
  -H "Origin: https://your-username.github.io" \
  -H "Access-Control-Request-Method: POST"
# 204 with Access-Control-Allow-Origin echoing the Origin header

curl -X POST https://YOUR-WORKER.workers.dev/submit \
  -H "Content-Type: application/json" \
  -d '{"nonsense": true}'
# 400 {"success":false,"error":"Invalid submission"}
```

See [`../docs/telegram-setup.md`](../docs/telegram-setup.md) for a full
valid payload example and the end-to-end setup steps.
