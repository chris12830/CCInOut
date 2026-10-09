# Development, validation & unfinished work

## Reproduce

Node >=22.13, project-selected pnpm with committed lockfile. Install dependencies using the project's supported helper or `pnpm install --frozen-lockfile`; do not replace the package manager/lockfile. Generate schema migrations with `pnpm run db:generate` when the schema changes, inspect SQL, then build with `pnpm run build`. `.openai/hosting.json` declares logical `DB`; Sites owns actual resource wiring. The README at repository root describes local migration application and supported preview methods. Local configuration is not a hosted secret store.

Checks: `node node_modules/typescript/bin/tsc --noEmit`, `node scripts/verify-attendance.mjs`. Migration: `drizzle/0000_polite_genesis.sql`. No secrets, operational child records or export files are included. The fictional data is generated only on a signed-in owner's first workspace load. Subsequent reloads reuse persisted state. Open sessions are never silently closed at midnight.

## Architecture/API/data

Vinext/React client and server, Cloudflare Worker-compatible build, D1/SQLite. `GET /api/attendance` returns `{state, revision}` for the authenticated user. `POST /api/attendance` accepts `{revision, action}`; no client-supplied owner identity. Actions are the same validated actions used by the UI. Requests missing auth reject with 401; invalid/cross-role actions reject with 400/403; capacity/stale changes reject with 409; storage failure returns 503 with recoverable UI and preserved draft. Prepared SQL binds all values.

Schema: `attendance_workspaces(owner_id TEXT PRIMARY KEY, revision INTEGER, data TEXT, updated_at TEXT)`. JSON contains groups, locations, children, staff, immutable application activity entries, attendance sessions and early requests. One atomic conditional row update covers all changes in an action, including batch playground transfer. Compare-and-swap revision serializes competing writers. Schema migrations are generated/checked in; no runtime CREATE/ALTER. A production normalized tenant/event/session schema is still required for scale, reporting and enforceable permissions. No external integrations or additional environment secrets are used.

Time reports use exact elapsed milliseconds, including date-window clipping with timezone/DST-aware boundaries. Reporting numbers display two decimals; live open intervals continue to run. Shift schedule and child arrival times are local wall times. Paid breaks/overtime/rounding policies are not specified; work sessions are raw attendance rather than payable wages. History records location entry and exit together in one event with from/to IDs. Original rows are not user-editable in the preview; correction workflows must be added before production.

## Unfinished work register

| ID | Requirement | Current behavior | Missing / next action | Priority | Owner | Acceptance needed |
|---|---|---|---|---|---|---|
| U-01 | CC-01/03/04/07 | User-isolated preview + switchable roles | Actual child-care business tenants, staff invitations, credentials, permission-scoped reads/exports/writes and owner controls | Release blocker | Unassigned | Two businesses and roles cannot read or alter each other's data; no role self-escalation |
| U-02 | CC-10/11/19 | Simple sample rules | Confirm jurisdiction/licence, permitted ages/group sizes, qualified staff, mixed/reduced ratios and effective dates | Release blocker | Owner + developer | Owner-approved regulatory rule pack and verified edge-case scenarios |
| U-03 | CC-02 | Raw hours and CSV | Billing/payroll API selection, charge/pay policies, invoice handling, breaks/overtime and financial reconciliation | Required production milestone | Unassigned | Exports reconcile to source sessions and selected financial system |
| U-04 | CC-06/08/10 | In-app alerts while open | Reliable background checks, notification recipients, escalation, delivery/audit and offline behavior | Release blocker | Unassigned | Staff miss/ratio issue alerts reach approved recipients even with app closed |
| U-05 | CC-01/04/05 | Fictional records and activity log | Consent, retention, sensitive-note access, guardian pickup authorization, offline reconciliation and tamper-evident audit corrections | Release blocker | Owner + developer | Approved policy and security/attendance acceptance |
| U-06 | All | Private prototype hosted | Staging/production infrastructure, monitoring, backup/restore, rollback and real-device field testing | Release blocker | Unassigned | Verified restore/rollback, acceptance on actual devices and release sign-off |
| U-07 | CC-20 | Attendance-day settings and simple enrollment limit | Decide complementary part-time capacity, age transitions and roster archival rules | Unresolved decision | Owner | Approved occupancy/enrollment scenarios |
| U-08 | CC-13/22 | Live assignments and timestamped events | Historical roster changes must retain original group context in normalized reporting; staff location intervals for export | Required production milestone | Unassigned | Past-day staffing reports unchanged by later reassignment |
| U-09 | All | Domain name is a product label | Verify domain/repository/hosting ownership, recovery and billing control; invite named developers with limited access | Before production development | Owner | Owner can recover each asset and a new developer can clone/configure independently |

## Suggested milestones

1. Approve this prototype against all 22 items; confirm jurisdiction, production stack, payroll/billing systems and unresolved occupancy rules. Deliver signed-off spec and owner-selected repository.
2. Build authenticated business tenancy, real staff permissions, normalized migrations and audit correction flow. Demonstrate isolation and reproducible setup. Owner review follows working code/test delivery.
3. Implement verified ratio rules, location concurrency, background attendance alerts, guardian pickup verification and operational exception handling. Test on centre devices and noisy/offline conditions.
4. Connect financial exports, stage with fictitious/approved test data, verify backup restore/rollback and complete acceptance. Owner authorizes production only after gates have evidence.

## Owner control / operations

Domain, source repository, hosting, databases/backups, email/SMS and financial API accounts should remain in the owner/company's accounts. Verification of those external accounts is not complete. Developers receive named limited access, regular source commits, dependency/license information, migration/run instructions, environment inventory, design originals and termination handover duties. Signed legal agreements are not supplied or claimed. Credentials remain outside source and handoff.

Deploy the private prototype through Sites. Schema migrations precede Worker upload; once applied, append rather than rewrite migrations. Roll back only with compatible schema and saved source version. Production must have a separate environment, release commit, backup/restore evidence, health/error monitoring and named rollback owner. Production/staging gates are not passed by a successful prototype build.

## Verification record

October 5, 2026: acceptance script covers location-specific ratios, atomic blocked batches, playground exits, guardian sessions/re-entry, absence follow-up/acknowledgement, educator write scope, early approval/time/coverage, approved-space limits and timezone/date-window clipping. Actual result: all nine attendance scenarios passed; TypeScript checking completed with zero errors. Worker build and hosted publication are verified separately by the final workflow. Browser visual QA and live browser WebMCP validation are unavailable in this environment; no claim of those checks is made. Business multi-tenancy, production role credentials, real financial connections, background alerts, backups/restore, regulatory validation and production smoke checks are not run.
