# Requirements & acceptance

IDs match the author's original numbered brief. Status below describes prototype behavior only. `A` = administrator preview; `E` = assigned educator preview. All saved writes produce timestamped activity records with the acting signed-in identity. Education role is a preview selection and cannot serve as production access control.

| ID | Original requirement | Prototype / location | Acceptance scenario |
|---|---|---|---|
| CC-01 | Child/staff check in/out throughout day/week | Implemented: Children, Staff, Time reports | Record repeated daily arrivals/departures; each closes/opens a distinct session; date-range history survives refresh. |
| CC-02 | Collected data for billing/payroll | Implemented hours and CSV; financial integrations unfinished | Care/work hours sum elapsed sessions, clip report dates, flag open punches and exclude location transfers. |
| CC-03 | Manage children in admin-defined program groups | Implemented: Program setup, Add child, roster | A creates named group; assigns a child; dashboard/roster count updates. |
| CC-04 | Assigned staff manually note condition/concerns | Implemented: Child notes and arrival/departure forms | E records note for own group; another group's write is rejected; notes retain author/time/context. |
| CC-05 | Guardian drop-off/pickup, playground/off-site movement | Implemented: attendance and batch location movements | Drop-off/pickup name is required; transfers retain from/to locations while care stays open. Guardian authorization verification is unfinished. |
| CC-06 | Flag absence and alert staff | Implemented: overdue/unconfirmed alerts and confirmed absences | Expected child beyond grace period is flagged; no automated claim that a child is actually absent; staff confirm whereabouts. |
| CC-07 | Monitor staff by assigned area | Implemented: Staff, classroom/location coverage | Teacher appears at one assigned group and location; reassignment produces history. |
| CC-08 | Alert admin to missed expected staff check-in | Implemented in-app, no push delivery | Scheduled shift beyond grace with no attendance today produces late alert, which clears on check-in. |
| CC-09 | Admin approval required for early checkout | Implemented: request, approval/decline, checkout | Pending/declined requests cannot permit checkout; approved time must be reached and cover cannot worsen. |
| CC-10 | Continuous group ratio status | Implemented: 5-second refresh plus action updates | Split groups calculate requirements separately for each occupied area; uncovered room is red even if a playground has spare teachers. |
| CC-11 | Minimum staff to maximum children definition | Implemented simple example rules | Required staff at each location = ceil(present children / children-per-staff rule); sum deficits without double-counting staff. |
| CC-12 | Real-time ratios per program group | Implemented per CC-10 | Ratios update after child and staff check-in/out/moves and new group rules. |
| CC-13 | Teachers in each group throughout day | Implemented live names and timestamped staff history | Current group/area names update; Movement & notes history shows assignment entries/exits across date ranges. |
| CC-14 | Teacher notes absent children per group | Implemented absence reason and acknowledgement | Admin-recorded absence needs acknowledgement; assigned E acknowledges; educator-recorded absence counts as acknowledged. |
| CC-15 | Repeated playground check-in/out | Implemented location movement events | Every transfer records from/to; moving to playground does not end care session. |
| CC-16 | Playground maximum child limit | Implemented editable location cap | Shared playground admission exceeding limit fails before any child or event is changed. |
| CC-17 | Combine groups using same playground | Implemented global location headcount | Count includes all present children at location, independent of group. |
| CC-18 | Red alert; block entry until children leave | Implemented red full state and admission block | At capacity no additional entries save; a recorded exit frees spaces; simultaneous stale operations reject. |
| CC-19 | Approved spaces for each group | Implemented editable approved capacity and arrival cap | Group cannot admit more present children than its capacity; cannot lower limit below attendance. |
| CC-20 | Enrolled/present/absent child spaces | Implemented group dashboard and filtered roster | Enrolled, present, absent, unconfirmed and currently open places remain distinct. |
| CC-21 | Real-time ratios (repeated) | Implemented per CC-10/12 | Preserve as distinct source item; same location-safe ratio acceptance. |
| CC-22 | Teachers per group (repeated) | Implemented per CC-13 | Preserve as distinct source item; current teacher names and history. |

## Decisions and assumptions

- October 5, 2026: Attendance at the business and movements inside/outside it are separate. Only guardian pickup ends care time. Transfers do not change billing/payroll durations.
- October 5, 2026: Physical location controls supervision counts. A teacher cannot cover children in a classroom and playground simultaneously. Surplus teachers at one location do not cover a different location.
- October 5, 2026: Full playground and approved-space admissions are blocked. Recorded guardian departures and regular scheduled staff departures remain recordable; insufficient ratios raise alerts. Early staff departures additionally require approved time and cannot worsen staffing deficits.
- October 5, 2026: A missed arrival creates a follow-up alert, not an automatically confirmed absence. Teachers record or acknowledge a reason. Confirmed absences are distinct from not-scheduled, waiting and already-picked-up children.
- October 5, 2026: Sample timezone is America/Toronto. Simple sample ratios of 1:3, 1:5, 1:8 and 1:10 are illustrative, not validated jurisdiction rules. No automatic legal-rule determination.
- October 5, 2026: Part-time attendance days are supported; new enrollment uses one roster space per child in the preview. A production enrollment-capacity algorithm for complementary days and age transitions remains unresolved.
- October 5, 2026: All in-app alerts recalculate while a page is open; no background alert service is claimed.
- October 5, 2026: This turn does not select Laravel or authorize a conversion of an existing project. The prototype uses the Sites stack; production stack should be selected before backend work begins.

## Screen/action and permission inventory

Overview: counts, ratio/capacity cards, live teachers, alert review and recent history. Children: filter/search, enrollment (A), schedule (A), check-in/out and notes (A/assigned E), absence and acknowledgement (A/assigned E), batch transfer. Staff: current assignments, shift start/end, area assignment, weekly schedule (A), request early departure (A/own E), approve/decline (A). Locations: global occupancy and group breakdown, staff present, select occupants, edit caps/add areas (A). Alerts: dynamic actionable ratio, full area, late staff, missing arrival, absence acknowledgement, pending request and old open-session warnings. Time reports: daily/weekly/custom date windows, child care hours, staff hours, movement/notes and CSV. Program setup: business/grace period, named groups, simple rules and approved spaces (A).
