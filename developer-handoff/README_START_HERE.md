# Childcarecheckinout.com — working prototype

Owner / concept author: Christopher H. McKinnon. Original brief: September 9, 2025. Implementation and handoff: October 5, 2026.

Stage: WORK → SPECIFY → CODE → TEST. Private prototype; production/staging operation with real child-care records is not verified. This is a separate project from Child Care Owners Network and the registration and invoicing projects.

Start with [REQUIREMENTS.md](REQUIREMENTS.md), then [DEVELOPMENT.md](DEVELOPMENT.md). All 22 original items are preserved in the requirements matrix, including the repeated ratio and teacher-visibility requirements.

## What works

Persistent fictional child/staff rosters; guardian drop-off and pickup capture; care/work sessions; location exit/entry events; condition notes; overdue-arrival and shift alerts; confirmed absence and teacher acknowledgement; administrator early-departure decisions; program group/location setup; per-group/per-location ratios; shared playground limits; daily and weekly date-range hours and CSV exports; append-only application activity history. State refreshes every five seconds while open; successful actions update immediately. Database revision checks reject simultaneous stale updates instead of permitting capacity overruns.

## Honest boundaries

Each signed-in ChatGPT visitor has an isolated preview workspace. Administrator and educator modes are switchable demonstrations within that visitor's workspace, not production employment credentials or business tenant memberships. Use fictional data. No jurisdiction has been legally validated. Sample ratios are configurable simple children-per-staff rules. No reduced-ratio, mixed-age, qualification, paid-break, overtime, billing rate, invoice, payroll, SMS/email or background alert integration is implemented. CSV exports provide source data for review; they do not run billing or payroll.

The source is kept with the Site repository. The publication workflow records the canonical commit and archive. No external GitHub repository was selected for this project and no save to the unrelated Child Care Owners Network repository is requested or claimed. The requested domain name remains a concept label; no DNS or custom-domain ownership is verified.

## Main source

- `app/dashboard.tsx`: all seven workspace views, forms, administrator/educator preview and exports.
- `lib/attendance.ts`: business rules, sessions, audit events, ratios, date calculations and fictional seeds.
- `app/api/attendance/route.ts`: authenticated API, origin checks, validation/error responses.
- `lib/store.ts`: owner-keyed D1 storage and atomic revision predicate.
- `db/schema.ts`, `drizzle/`: schema and generated schema-only migrations.
- `scripts/verify-attendance.mjs`: meaningful acceptance checks tied to brief items.

Authoritative scope comes from this turn's 22-item brief. No unavailable historical artifacts, signed agreements or deployed production systems were inspected. The original concept attribution is preserved; this is not a legal opinion or proof of signed IP assignment.
