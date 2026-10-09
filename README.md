# CCInOut — Childcarecheckinout.com

Child and staff attendance, live program ratios, shared playground capacity and time reports.

Owner and concept author: **Christopher H. McKinnon**. Original brief: September 9, 2025.

- Repository: https://github.com/chris12830/CCInOut
- Published private prototype: https://childcare-check-in-out.christ519.chatgpt.site

This repository contains the existing working prototype source and its development handoff. It uses fictional records and illustrative ratio rules. Production business tenancy, enforceable staff permissions, jurisdiction-approved rules, background notifications and financial integrations remain unfinished.

## Features

- Guardian drop-off/pickup, child care sessions, teacher notes and absence follow-up.
- Staff attendance, physical assignments and approved early departure requests.
- Live supervision ratios calculated separately for each occupied location.
- Shared playground occupancy across all groups; admission blocks at capacity.
- Approved program spaces, attendance counts and timestamped activity history.
- Daily, weekly and custom time reports with child/staff CSV exports.

## Start development

Use Node.js **22.13.0 or later** and **pnpm 11.25.0**, matching `package.json` and `pnpm-lock.yaml`.

```sh
git clone https://github.com/chris12830/CCInOut.git
cd CCInOut
pnpm install --frozen-lockfile
pnpm run dev
```

The portable development server normally starts on `http://localhost:5173`. Use `/signin-with-chatgpt?return_to=/` on the local server for the development sign-in simulation. This local identity is only for development.

Before using the attendance API locally, build once and apply the included D1 migration as described in [the runtime guide](docs/RUNTIME.md#local-d1-migrations). Hosted Sites supplies the production database binding and identity headers; GitHub stores source and does not host this application.

```sh
node node_modules/typescript/bin/tsc --noEmit
node scripts/verify-attendance.mjs
pnpm run build
```

The acceptance script checks nine attendance scenarios. Dependency installation, builds and migrations create local files excluded from version control.

## Developer handoff

1. [Start here](developer-handoff/README_START_HERE.md).
2. [All 22 requirements and acceptance scenarios](developer-handoff/REQUIREMENTS.md).
3. [Architecture, API, unfinished work and milestones](developer-handoff/DEVELOPMENT.md).
4. [Runtime, authentication and local migration reference](docs/RUNTIME.md).

## Source map

| Path | Purpose |
| --- | --- |
| `app/dashboard.tsx` | Seven workspace views, attendance forms and reports |
| `lib/attendance.ts` | Attendance rules, sessions, ratios, time calculations and fictional data |
| `app/api/attendance/route.ts` | Authenticated attendance API |
| `lib/store.ts` | D1 persistence and atomic revision checks |
| `db/`, `drizzle/` | Database schema and migrations |
| `components/`, `app/globals.css` | UI components and styles |
| `scripts/verify-attendance.mjs` | Existing attendance acceptance checks |
| `.openai/hosting.json` | Existing Site identity and logical database binding |

## Source continuity

Imported from the published Site's source commit `e4a94c22cb880707bf58636c356ab0bcfabfbd34` on October 9, 2026. Application code, dependency lockfile, database schema and migrations are preserved. This GitHub import adds project documentation and omits generated TypeScript build cache. Source transfer does not redeploy or change the existing private prototype.

No credentials, real attendance records, database dumps or local runtime state belong in this repository. Third-party license notices remain with their source files. Production release requires the unfinished work and acceptance checks in the handoff to be completed.
