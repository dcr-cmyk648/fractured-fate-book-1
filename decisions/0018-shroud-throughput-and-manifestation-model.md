# Decision 0018: Shroud Throughput and Manifestation Model

Date: 2026-06-24

## Status

Accepted; stored in `bible/magic/magic-shroud.md`.

## Decision

The primary technical factors that determine a Shroud's ability to protect the user are throughput, appropriate energy absorption anchoring schema, and the user's ability to keep the Shroud up despite everything happening in a fight.

"Strong Shroud" and "weak Shroud" are in-world shorthand for the heuristic that combines throughput, anchoring, stability, and maintaining the Shroud. They should not be treated as literal statements that one Shroud has a fundamentally larger baseline capacity than another.

Shrouds are separate from hereditary magic. Culturally, and in most magi's awareness, Shrouds and hereditary magic are part and parcel of the same magus package.

Archeon's public claim that it has unusually powerful Shrouds is propaganda / PR rather than a technical statement of fact. Archeon's real power depends on the accepted stack of kinesis, Ink, Shroud use, martial arts, and technology.

Maya's awake-permanent Shroud is a manifestation of childhood emotional abuse by Niall after Alara's death, when he was grieving and frantically punishing and pushing Maya to develop a Shroud. Although the origin is traumatic, Niall and most magi would see the result as a positive ability because it protects against attacks when the magus is unaware.

High Clade magi generally try to keep their Shrouds up whenever they are not completely alone and safe.

Ink/Shroud interaction remains tentative and should be handled in `magic-ink-boons`.

## Rationale

This keeps the manuscript's common language of strong or weak Shrouds while clarifying the technical model underneath. It also separates actual magic taxonomy from High Clade cultural assumptions and preserves Archeon's public framing as political branding rather than truth.

## Consequences

- `magic-shroud` owns the accepted Shroud throughput/anchoring/maintenance model.
- Character files may use "strong" and "weak" as in-world shorthand, but technical records should explain the underlying factors.
- `org-archeon` should treat powerful-Shroud branding as propaganda / PR.
- `char-maya` should preserve that her awake-permanent Shroud is trauma-derived while socially valued by magi.
- Ink/Shroud mechanics remain candidate until `magic-ink-boons`.

## Related files

- `reviews/entities/magic/magic-shroud.md`
- `bible/magic/magic-shroud.md`
- `planning/candidates/magic/magic-shroud.md`
- `bible/characters/char-maya.md`
- `bible/characters/char-davian.md`
- `bible/characters/char-kelyra.md`
- `bible/characters/char-selwin.md`
- `bible/organizations/org-archeon.md`
- `bible/organizations/org-high-clades.md`
