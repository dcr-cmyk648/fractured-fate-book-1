# Proposed Web-App Comment Tickets: 2026-06-28-001

Status: author-reviewed on 2026-06-28. Lower-level story-bible tickets resolved; chapter-architecture ticket deferred.

Tickets are not canon, accepted revisions, manuscript-edit authorization, or prose-preservation approval.

| Ticket ID | Status | Priority | Type | Target | Requires author decision |
|---|---|---|---|---|---|
| WC-2026-06-28-001 | accepted-for-workflow | medium | story-bible-review | `bible/cultures/culture-number-system-zan-script.md` | resolved |
| WC-2026-06-28-002 | accepted-for-workflow | low | story-bible-review | `bible/cultures/culture-number-system-zan-script.md` | resolved |
| WC-2026-06-28-003 | deferred | medium | chapter-architecture | `bible/locations/loc-sorevin-redbridge.md`; Prologue/Sorevin manor scene | deferred |
| WC-2026-06-28-004 | accepted-for-workflow | medium | story-bible-review | `bible/magic/magic-zan-lattices.md` | resolved |

## WC-2026-06-28-001: Zero Segment Notation

- Source: webapp-comments
- Batch ID: `2026-06-28-001`
- Status: accepted-for-workflow
- Priority: medium
- Ticket type: story-bible-review
- Source comment IDs: `comment-1782613827676-fbjt5h`
- Normalized comment IDs: `wc-9e9d2710e660b8b0`
- Commenter: Dustin
- Target file: `bible/cultures/culture-number-system-zan-script.md`
- Target heading: Number System / Zän Script
- Proposed destination: future accepted-file update or consistency queue item
- Blocking: no
- Requires author decision: no

Summary: The zero-value segment in longer zän numbers should not be represented by a shortened strike-line if that would make values like `2` and `12` visually identical. Candidate solutions are a lengthened line with no mark or a small notch showing the blank segment is intentional.

Disposition: Approved. Stored in `bible/cultures/culture-number-system-zan-script.md`: empty multi-digit places should use a lengthened blank segment or a small intentional notch, not a shortened ambiguous strike-line.

Rationale: This affects the internal legibility of the accepted base-six/zän notation and should be resolved before detailed zän-writing descriptions are used in chapter architecture or prose.

## WC-2026-06-28-002: Hexday Term

- Source: webapp-comments
- Batch ID: `2026-06-28-001`
- Status: accepted-for-workflow
- Priority: low
- Ticket type: story-bible-review
- Source comment IDs: `comment-1782613865594-04evbt`
- Normalized comment IDs: `wc-3ffb0ed1eccc27e5`
- Commenter: Dustin
- Target file: `bible/cultures/culture-number-system-zan-script.md`
- Target heading: Number System / Zän Script
- Proposed destination: future accepted-file update or terminology candidate
- Blocking: no
- Requires author decision: no

Summary: The six-day week may be called a `hexday`.

Disposition: Approved. Stored in `bible/cultures/culture-number-system-zan-script.md`.

Rationale: This is a compact terminology update. It is not structurally blocking but may improve calendar/worldbuilding consistency.

## WC-2026-06-28-003: Sorevin Back-Gateway Lattice and Everyday Zän Visibility

- Source: webapp-comments
- Batch ID: `2026-06-28-001`
- Status: deferred
- Priority: medium
- Ticket type: chapter-architecture
- Source comment IDs: `comment-1782614072454-9d0xcm`
- Normalized comment IDs: `wc-9426916b3b627e18`
- Commenter: Dustin
- Target file: `bible/locations/loc-sorevin-redbridge.md`
- Target heading: Sorevin Manor
- Proposed destination: Prologue/Sorevin chapter architecture and possible later location update
- Blocking: no
- Requires author decision: yes; deferred to chapter architecture/location work

Summary: The Sorevin manor back gateway should likely have a protective or alarm zän lattice that Kelyra disables by draining it. This makes her contribution difficult and helps justify Davian wanting to keep her out of the direct combat. More broadly, zän technology should be more visible in Clade architecture and rough lower-class utility uses.

Disposition: Deferred until Prologue/Sorevin chapter architecture or location work, after lower-level zän decisions are stable.

Rationale: This has chapter-level scene function, setting texture, and magic-system onboarding value.

## WC-2026-06-28-004: Ancient Zän Skill/Material Constraints and Archeon Knockoffs

- Source: webapp-comments
- Batch ID: `2026-06-28-001`
- Status: accepted-for-workflow
- Priority: medium
- Ticket type: story-bible-review
- Source comment IDs: `comment-1782614256236-vozds5`
- Normalized comment IDs: `wc-04349478ddc55bcb`
- Commenter: Dustin
- Target file: `bible/magic/magic-zan-lattices.md`
- Target heading: Zän / Zä Lattices / Zänwrights
- Proposed destination: future zän technology review; possible candidate links to `char-zirene`, `org-archeon`, and future-book planning
- Blocking: no
- Requires author decision: no

Summary: Ancient zän should require more technical ability, smaller detail, and more expensive materials, so Zirene's work is not easily reproducible. This should connect to Archeon knockoffs and a possible later Archeon zänwright who helps Kelyra make more anti-Clade zän-tech.

Disposition: Approved at high level. Stored in `bible/magic/magic-zan-lattices.md`, `bible/characters/char-zirene.md`, and `bible/organizations/org-archeon.md`. Possible later Archeon zänwright remains future/candidate material.

Rationale: This clarifies why advanced zän-tech is rare, why Zirene matters, and how Archeon imitation differs from true mastery.
