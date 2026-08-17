# JB Medical Center — website

Next.js (App Router) + React + Tailwind CSS frontend, with a Node.js/Next.js API
backend that saves Book Appointment submissions to MySQL, forwards them to an
external CRM, and a role-gated admin panel for managing doctors and reviewing
bookings.

## Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4
- **Backend:** Next.js API routes (Node.js) — no separate server needed
- **Database:** MySQL, via `mysql2`
- **CRM integration:** outbound webhook on every new appointment, plus a secured
  polling endpoint
- **Admin panel:** `/admin-login`, JWT session cookie (`jose`), passwords hashed
  with `bcryptjs`

## Local development

```bash
npm install
cp .env.example .env.local   # fill in DB_*, CRM_*, ADMIN_SESSION_SECRET, UPLOADS_DIR
npm run dev
node scripts/create-admin-user.mjs admin "a-strong-password" administrator
```

The app runs at http://localhost:3000, the admin panel at
http://localhost:3000/admin-login. Without a reachable MySQL database, public
pages still render, but the Book Appointment form and the whole admin panel
need `DB_*` to point at a real database.

## Database

Run `sql/schema.sql` once against your MySQL database to create the
`appointments`, `doctors`, and `admin_users` tables (phpMyAdmin in cPanel, or
`mysql -u user -p dbname < sql/schema.sql`).

## Admin panel

- **Login:** `/admin-login`. There is no default account — create one with
  `node scripts/create-admin-user.mjs <username> <password> <role>` (role is
  `administrator`, `admin`, or `staff`). Re-running it for an existing username
  resets that account's password/role.
- **Roles:**
  - `staff` — can add doctors, cannot edit or delete them
  - `admin` — full doctor CRUD (add, edit, delete)
  - `administrator` — full doctor CRUD, plus the Users page to create/remove
    other admin panel logins
- **Menus:** Doctors (public `/doctors` page is now database-driven, not
  static), Appointments (consultation/service bookings), Test Booking
  (health-checkup package bookings — see "Appointment types" below), and
  Users (administrator only).
- Doctor photos are uploaded (not linked by URL) and stored under
  `UPLOADS_DIR`, served via `/uploads/doctors/[filename]`.

## Appointment types

Every Book Appointment submission is tagged `type: "appointment"` or
`type: "test"` depending on where the visitor clicked from — health-checkup
package buttons (Buy Now / Add to Cart / Show Price) set `type=test` on the
`/book-appointment` link; everything else (services, doctor profiles, general
CTAs) defaults to `appointment`. This is what separates the Appointments menu
from the Test Booking menu in the admin panel.

## Environment variables

See `.env.example`. In production (cPanel), set these in the "Setup Node.js
App" environment variables panel, not in a committed `.env` file.

| Variable | Purpose |
| --- | --- |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection |
| `APPOINTMENTS_API_KEY` | Required header (`x-api-key`) for your CRM to poll `GET /api/appointments` |
| `CRM_WEBHOOK_URL` | If set, every new appointment is POSTed here immediately |
| `CRM_WEBHOOK_SECRET` | Optional — sent as `Authorization: Bearer <value>` on the webhook call |
| `ADMIN_SESSION_SECRET` | Signs the admin panel's login session cookie — long random string, required |
| `UPLOADS_DIR` | Absolute path, outside `.next`, where doctor photos are stored |

## Appointment API

- `POST /api/appointments` — public. Body: `{ fullName, phone, service?, preferredDate?, type? }`
  (`type` is `"appointment"` or `"test"`, defaults to `"appointment"`).
  Saves to MySQL, then (if `CRM_WEBHOOK_URL` is set) POSTs
  `{ event: "appointment.created", data: {...} }` to it. The webhook is
  best-effort — a CRM outage never blocks the patient's booking.
- `GET /api/appointments` — requires header `x-api-key: <APPOINTMENTS_API_KEY>`.
  Optional query params: `since` (ISO datetime, only rows created after it),
  `type` (`appointment` or `test`, omit for both), and `limit` (default 100,
  max 500). Use this for a CRM that prefers to poll instead of receiving
  webhooks.

## Deploying to cPanel

See `CPANEL-DEPLOY.txt` for the full non-developer walkthrough (MySQL setup,
uploading, environment variables, building on the server, creating the first
admin login, troubleshooting). Short version:

1. **Node.js App setup** — in cPanel, open "Setup Node.js App" → Create
   Application, Node 20+.
2. **Build on the server** (not on Windows — see the `sharp`/image note
   below): `npm install && npm run build`. Because `next.config.ts` sets
   `output: "standalone"`, this produces a self-contained `.next/standalone/`
   — the `postbuild` script automatically copies `public/` and
   `.next/static/` into it, so no manual copying is needed.
3. Point the Node.js App's application root at `.next/standalone`, startup
   file `server.js`.
4. **Environment variables:** set everything in the table above, plus `PORT`
   if cPanel requires it.
5. **MySQL:** create the database/user under cPanel's "MySQL Databases", then
   run `sql/schema.sql` via phpMyAdmin.
6. **First admin login:** from the same server Terminal used to build, run
   `node scripts/create-admin-user.mjs <username> <password> administrator`.
7. **Images:** Next's built-in image optimizer needs the `sharp` package,
   which is platform-specific — always `npm install`/`npm run build` on the
   server itself, never upload a `node_modules` built on Windows.
8. Start (or restart) the app from the cPanel Node.js App panel.

## Project structure

- `src/app/(site)/` — public pages (App Router route group, wrapped with the
  public Header/Footer)
- `src/app/admin/` — admin panel pages (protected by `src/middleware.ts`)
- `src/app/admin-login/` — public login page
- `src/app/api/` — API routes (`appointments`, `admin/*`)
- `src/app/uploads/doctors/[filename]/route.ts` — serves uploaded doctor photos
- `src/components/` — shared public-site UI
- `src/components/admin/` — admin panel UI
- `src/data/site.ts` — static site copy (services, health packages, FAQs,
  departments, footer links, etc. — doctors are database-driven, not here)
- `src/lib/db.ts` — MySQL connection pool
- `src/lib/auth.ts`, `src/lib/password.ts` — admin session (JWT) and password hashing
- `src/lib/doctors.ts`, `src/lib/users.ts`, `src/lib/appointments.ts` — DB query helpers
- `src/lib/crm.ts` — outbound CRM webhook forwarding
- `src/lib/upload.ts` — doctor photo upload handling
- `sql/schema.sql` — database schema
- `scripts/create-admin-user.mjs` — CLI to create/reset an admin panel login
