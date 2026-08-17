# JB Medical Center — website

Next.js (App Router) + React + Tailwind CSS frontend, with a Node.js/Next.js API
backend that saves Book Appointment submissions to MySQL and forwards them to an
external CRM.

## Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** Next.js API routes (Node.js) — no separate server needed
- **Database:** MySQL, via `mysql2`
- **CRM integration:** outbound webhook on every new appointment, plus a secured
  polling endpoint

## Local development

```bash
npm install
cp .env.example .env.local   # fill in DB_* and CRM_* values
npm run dev
```

The app runs at http://localhost:3000. Without a reachable MySQL database, every
page renders fine but the Book Appointment form will show a friendly error on
submit (its API call fails) — that's expected until `DB_*` env vars point at a
real database.

## Database

Run `sql/schema.sql` once against your MySQL database to create the
`appointments` table (phpMyAdmin in cPanel, or `mysql -u user -p dbname <
sql/schema.sql`).

## Environment variables

See `.env.example`. In production (cPanel), set these in the "Setup Node.js
App" environment variables panel, not in a committed `.env` file.

| Variable | Purpose |
| --- | --- |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection |
| `APPOINTMENTS_API_KEY` | Required header (`x-api-key`) for your CRM to poll `GET /api/appointments` |
| `CRM_WEBHOOK_URL` | If set, every new appointment is POSTed here immediately |
| `CRM_WEBHOOK_SECRET` | Optional — sent as `Authorization: Bearer <value>` on the webhook call |

## Appointment API

- `POST /api/appointments` — public. Body: `{ fullName, phone, service?, preferredDate? }`.
  Saves to MySQL, then (if `CRM_WEBHOOK_URL` is set) POSTs
  `{ event: "appointment.created", data: {...} }` to it. The webhook is
  best-effort — a CRM outage never blocks the patient's booking.
- `GET /api/appointments` — requires header `x-api-key: <APPOINTMENTS_API_KEY>`.
  Optional query params: `since` (ISO datetime, only rows created after it) and
  `limit` (default 100, max 500). Use this for a CRM that prefers to poll
  instead of receiving webhooks.

## Deploying to cPanel

1. **Node.js App setup** — in cPanel, open "Setup Node.js App" → Create
   Application. Point the application root at this project, Node version 20+,
   application startup file `.next/standalone/server.js` (see build step
   below), or `npm start` if your cPanel lets you run npm scripts directly.
2. **Build:** `npm run build`. Because `next.config.ts` sets
   `output: "standalone"`, this produces `.next/standalone/` — a
   self-contained server plus only the dependencies it actually needs, which
   is the simplest thing to upload to shared hosting. Copy
   `.next/standalone/`, `.next/static/` (into `.next/standalone/.next/static/`),
   and `public/` (into `.next/standalone/public/`) to the server, or build the
   whole thing under Node's local development first, then upload just the
   `standalone` folder plus those two additions.
3. **Environment variables:** set `DB_*`, `APPOINTMENTS_API_KEY`,
   `CRM_WEBHOOK_URL`/`CRM_WEBHOOK_SECRET`, and `PORT` in the Node.js App's
   environment variable panel.
4. **MySQL:** create the database and user under cPanel's "MySQL Databases",
   then run `sql/schema.sql` via phpMyAdmin.
5. **Images:** Next's built-in image optimizer needs the `sharp` package.
   `npm install` should pull it in automatically on Linux hosting; if your
   cPanel plan blocks native module builds, add `images: { unoptimized: true }`
   to `next.config.ts` as a fallback.
6. Start (or restart) the app from the cPanel Node.js App panel.

## Project structure

- `src/app/` — pages (App Router)
- `src/components/` — shared UI (Header, Footer, forms, interactive widgets)
- `src/data/site.ts` — all site copy/content in one place (services, health
  packages, FAQs, departments, doctors, etc.)
- `src/lib/db.ts` — MySQL connection pool
- `src/lib/crm.ts` — outbound CRM webhook forwarding
- `sql/schema.sql` — database schema
