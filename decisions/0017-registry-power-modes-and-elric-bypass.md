# Decision 0017: Registry Power, Modes, and Elric Bypass

Date: 2026-06-24

Status: accepted; stored in approved `org-registry` record

## Decision

The Registry is Rezin-specific. The Rezin citadel's access to it is part of why that citadel position is so desirable, and the other High Clades covet it.

The Registry has active and passive modes.

- Passive mode identifies and alarms.
- Active mode identifies and triggers lethal response.

Active mode has limited short-period discharge capacity. It cannot be used during full-scale battles without almost immediately running out of power. The limits of its attacks are seen when Caius enters the Rezin citadel while the Registry is active.

The Heart provides most of the Registry's power, and the Registry cannot function in the overpowered way it was designed without the Heart. However, the Registry was not originally designed with the Heart in mind. In its original form, it would have been assumed to be passive and to have much more limited scope.

Rezin confidence in the Registry is not simple overconfidence. It overlooks unknown Elric-supplied magic under extremely specific circumstances. Elric was Head Magus of the citadel before his death and knows the Registry very well.

Davian's accepted heist process is the simplified version: he adds Arrek's name and relies on the Ink Pact/Boon. He does not also add and later remove his true name.

Maya's gateway/passive-only redesign is a band-aid measure after the loss of the Heart causes the Registry to attempt to run a grossly outsized and inefficient system. These redesign plans are not realized during the course of Book 1.

## Rationale

This preserves the Registry as a genuinely powerful Rezin advantage while explaining the Heart theft as an exceptional Elric-enabled bypass rather than a generic security failure. It also keeps detailed power, discharge, and zan-lattice mechanics in the later technical owner files.

## Implications

- `org-registry` owns the Registry's institutional role, active/passive modes, Rezin-specific status, and accepted heist simplification.
- `object-seraph-heart` should own Heart power implications and loss-of-Heart consequences.
- `magic-zan-lattices` should own detailed power storage, discharge, and active-mode mechanics.
- `loc-registry` should own the chamber, platform, and physical operating interface.
- `char-davian` should reflect that the accepted heist path uses Arrek's name plus the Ink Pact/Boon.
- Later Caius/Drakhal review should reconcile the active-mode encounter.

## Related files

- `reviews/entities/organizations/org-registry.md`
- `bible/organizations/org-registry.md`
- `planning/candidates/organizations/org-registry.md`
- `bible/organizations/org-rezin.md`
- `bible/organizations/org-high-clades.md`
- `bible/characters/char-davian.md`
- `bible/organizations/org-harbingers-syndicate.md`
- `CONSISTENCY_QUEUE.md`
