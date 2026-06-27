# Entity Index

Master inventory and processing queue for characters, organizations, Clades, locations, cultures, magic concepts, objects, artifacts, technologies, historical events, narrative threads, and terminology requiring dedicated reference.

Allowed statuses:

- `discovered`: detected in source material but not yet placed in the queue
- `queued`: ready for review
- `in-review`: Codex is currently assembling or revising its review packet
- `awaiting-author`: review packet has been presented and requires author input
- `approved`: accepted material has been written to durable files
- `needs-revisit`: previously approved but new material or a contradiction requires another review
- `deferred`: intentionally postponed
- `superseded`: folded into another entity and not reviewed separately

There must normally be no more than one entity marked `in-review`.

## Review Queue

| Order | ID | Type | Name | Status | Review packet | Accepted file | Candidate file | Last reviewed |
|---:|---|---|---|---|---|---|---|---|
| 1 | char-maya | character | Maya Rezin | approved | reviews/entities/characters/char-maya.md | bible/characters/char-maya.md | planning/candidates/characters/char-maya.md | 2026-06-23 |
| 2 | char-davian | character | Davian / Arrek identity | approved | reviews/entities/characters/char-davian.md | bible/characters/char-davian.md | planning/candidates/characters/char-davian.md | 2026-06-23 |
| 3 | char-niall | character | Niall Rezin | approved | reviews/entities/characters/char-niall.md | bible/characters/char-niall.md | planning/candidates/characters/char-niall.md | 2026-06-23 |
| 4 | char-kelyra | character | Kelyra | needs-revisit | reviews/entities/characters/char-kelyra.md | bible/characters/char-kelyra.md | planning/candidates/characters/char-kelyra.md | 2026-06-23 |
| 5 | char-elric | character | Elric | approved | reviews/entities/characters/char-elric.md | bible/characters/char-elric.md | planning/candidates/characters/char-elric.md | 2026-06-23 |
| 6 | char-harvick | character | Harvick | approved | reviews/entities/characters/char-harvick.md | bible/characters/char-harvick.md | planning/candidates/characters/char-harvick.md | 2026-06-24 |
| 7 | char-selwin | character | Selwin Rezin | approved | reviews/entities/characters/char-selwin.md | bible/characters/char-selwin.md | planning/candidates/characters/char-selwin.md | 2026-06-24 |
| 8 | char-jalen | character | Jalen | approved | reviews/entities/characters/char-jalen.md | bible/characters/char-jalen.md | planning/candidates/characters/char-jalen.md | 2026-06-24 |
| 9 | org-rezin | organization | Rezin family / Rezin Clade | approved | reviews/entities/organizations/org-rezin.md | bible/organizations/org-rezin.md | planning/candidates/organizations/org-rezin.md | 2026-06-24 |
| 10 | org-archeon | organization | Archeon | approved | reviews/entities/organizations/org-archeon.md | bible/organizations/org-archeon.md | planning/candidates/organizations/org-archeon.md | 2026-06-24 |
| 11 | org-drakhal | organization | Drakhal Clade | approved | reviews/entities/organizations/org-drakhal.md | bible/organizations/org-drakhal.md | planning/candidates/organizations/org-drakhal.md | 2026-06-24 |
| 12 | org-high-clades | organization | High Clades | approved | reviews/entities/organizations/org-high-clades.md | bible/organizations/org-high-clades.md | planning/candidates/organizations/org-high-clades.md | 2026-06-24 |
| 13 | org-harbingers-syndicate | organization | Harbingers / Syndicate | approved | reviews/entities/organizations/org-harbingers-syndicate.md | bible/organizations/org-harbingers-syndicate.md | planning/candidates/organizations/org-harbingers-syndicate.md | 2026-06-24 |
| 14 | org-concord | organization | Twilight Concord / Concord | approved | reviews/entities/organizations/org-concord.md | bible/organizations/org-concord.md | planning/candidates/organizations/org-concord.md | 2026-06-24 |
| 15 | org-registry | organization | Registry | approved | reviews/entities/organizations/org-registry.md | bible/organizations/org-registry.md | planning/candidates/organizations/org-registry.md | 2026-06-24 |
| 16 | magic-shroud | magic | Shroud / Shrouds | approved | reviews/entities/magic/magic-shroud.md | bible/magic/magic-shroud.md | planning/candidates/magic/magic-shroud.md | 2026-06-24 |
| 17 | magic-ink-boons | magic | Ink Pact | approved | reviews/entities/magic/magic-ink-boons.md | bible/magic/magic-ink-boons.md | planning/candidates/magic/magic-ink-boons.md | 2026-06-24 |
| 18 | magic-subversion | magic | Kinesis | approved | reviews/entities/magic/magic-subversion.md | bible/magic/magic-subversion.md | planning/candidates/magic/magic-subversion.md | 2026-06-24 |
| 19 | magic-fateweaving-skein | magic | Fateweaving / Skein / fate ties | approved | reviews/entities/magic/magic-fateweaving-skein.md | bible/magic/magic-fateweaving-skein.md | planning/candidates/magic/magic-fateweaving-skein.md | 2026-06-24 |
| 20 | magic-zan-lattices | magic | Zän / zä lattices / zänwrights | approved | reviews/entities/magic/magic-zan-lattices.md | bible/magic/magic-zan-lattices.md | planning/candidates/magic/magic-zan-lattices.md | 2026-06-26 |
| 21 | magic-antithesis | magic | Antithesis boundary record | approved | reviews/entities/magic/magic-antithesis.md | bible/magic/magic-antithesis.md | planning/candidates/magic/magic-antithesis.md | 2026-06-24 |
| 22 | magic-codex-memory | magic | Codex / memory journals / auratic codices | approved | reviews/entities/magic/magic-codex-memory.md | bible/magic/magic-codex-memory.md | planning/candidates/magic/magic-codex-memory.md | 2026-06-24 |
| 23 | loc-rezin-citadel | location | Rezin Citadel / Rezin fortress | approved | reviews/entities/locations/loc-rezin-citadel.md | bible/locations/loc-rezin-citadel.md | planning/candidates/locations/loc-rezin-citadel.md | 2026-06-24 |
| 24 | loc-registry | location | Registry chamber | approved | reviews/entities/locations/loc-registry.md | bible/locations/loc-registry.md | planning/candidates/locations/loc-registry.md | 2026-06-25 |
| 25 | loc-treasury | location | Treasury / vault chamber | approved | reviews/entities/locations/loc-treasury.md | bible/locations/loc-treasury.md | planning/candidates/locations/loc-treasury.md | 2026-06-25 |
| 26 | loc-spire | location | Spire | approved | reviews/entities/locations/loc-spire.md | bible/locations/loc-spire.md | planning/candidates/locations/loc-spire.md | 2026-06-25 |
| 27 | loc-concord-manor | location | Concord manor | approved | reviews/entities/locations/loc-concord-manor.md | bible/locations/loc-concord-manor.md | planning/candidates/locations/loc-concord-manor.md | 2026-06-25 |
| 28 | loc-archeon | location | Archeon | approved | reviews/entities/locations/loc-archeon.md | bible/locations/loc-archeon.md | planning/candidates/locations/loc-archeon.md | 2026-06-25 |
| 29 | loc-sorevin-redbridge | location | Sorevin / Redbridge area | approved | reviews/entities/locations/loc-sorevin-redbridge.md | bible/locations/loc-sorevin-redbridge.md | planning/candidates/locations/loc-sorevin-redbridge.md | 2026-06-25 |
| 30 | object-seraph-heart | object | Heart | approved | reviews/entities/objects/object-seraph-heart.md | bible/objects/object-seraph-heart.md | planning/candidates/objects/object-seraph-heart.md | 2026-06-25 |
| 31 | object-tzorrax-sphere | object | Tzorrax Sphere | superseded | reviews/entities/objects/object-seraph-heart.md | bible/objects/object-seraph-heart.md | planning/candidates/objects/object-seraph-heart.md | 2026-06-25 |
| 32 | object-antithesis | object | Antithesis | approved | reviews/entities/objects/object-antithesis.md | bible/objects/object-antithesis.md | planning/candidates/objects/object-antithesis.md | 2026-06-25 |
| 33 | object-paradox | object | Paradox | approved | reviews/entities/objects/object-paradox.md | bible/objects/object-paradox.md | planning/candidates/objects/object-paradox.md | 2026-06-25 |
| 34 | object-davian-mask | object | Davian's mask | approved | reviews/entities/objects/object-davian-mask.md | bible/objects/object-davian-mask.md | planning/candidates/objects/object-davian-mask.md | 2026-06-25 |
| 35 | object-alara-journal | object | Alara's journal / memory journal | approved | reviews/entities/objects/object-alara-journal.md | bible/objects/object-alara-journal.md | planning/candidates/objects/object-alara-journal.md | 2026-06-25 |
| 36 | object-haloes | object | Haloes | approved | reviews/entities/objects/object-haloes.md | bible/objects/object-haloes.md | planning/candidates/objects/object-haloes.md | 2026-06-25 |
| 37 | culture-clade-hierarchy | culture | Clade hierarchy / caste system | approved | reviews/entities/cultures/culture-clade-hierarchy.md | bible/cultures/culture-clade-hierarchy.md | planning/candidates/cultures/culture-clade-hierarchy.md | 2026-06-25 |
| 38 | culture-naeroth-lineages | culture | Naeroth and non-human lineages | approved | reviews/entities/cultures/culture-naeroth-lineages.md | bible/cultures/culture-naeroth-lineages.md | planning/candidates/cultures/culture-naeroth-lineages.md | 2026-06-25 |
| 39 | culture-magus-presentation | culture | Magus status / Presentation | approved | reviews/entities/cultures/culture-magus-presentation.md | bible/cultures/culture-magus-presentation.md | planning/candidates/cultures/culture-magus-presentation.md | 2026-06-25 |
| 40 | culture-creator-sheol | culture | Creator / Sheol / gods and religious language | approved | reviews/entities/cultures/culture-creator-sheol.md | bible/cultures/culture-creator-sheol.md | planning/candidates/cultures/culture-creator-sheol.md | 2026-06-25 |
| 41 | culture-number-system-zan-script | culture | Number system / zän script | approved | reviews/entities/cultures/culture-number-system-zan-script.md | bible/cultures/culture-number-system-zan-script.md | planning/candidates/cultures/culture-number-system-zan-script.md | 2026-06-26 |
| 42 | char-aldira | character | Aldira | approved | reviews/entities/characters/char-aldira.md | bible/characters/char-aldira.md | planning/candidates/characters/char-aldira.md | 2026-06-26 |
| 43 | char-erynn | character | Erynn | approved | reviews/entities/characters/char-erynn.md | bible/characters/char-erynn.md | planning/candidates/characters/char-erynn.md | 2026-06-26 |
| 44 | char-alara | character | Alara | approved | reviews/entities/characters/char-alara.md | bible/characters/char-alara.md | planning/candidates/characters/char-alara.md | 2026-06-26 |
| 45 | char-serathis | character | Serathis | approved | reviews/entities/characters/char-serathis.md | bible/characters/char-serathis.md | planning/candidates/characters/char-serathis.md | 2026-06-26 |
| 46 | char-vorren | character | Vorren | approved | reviews/entities/characters/char-vorren.md | bible/characters/char-vorren.md | planning/candidates/characters/char-vorren.md | 2026-06-26 |
| 47 | char-caius-drakhal | character | Caius Drakhal | approved | reviews/entities/characters/char-caius-drakhal.md | bible/characters/char-caius-drakhal.md | planning/candidates/characters/char-caius-drakhal.md | 2026-06-26 |
| 48 | char-alden | character | Alden | superseded | reviews/entities/characters/char-aldira.md | bible/characters/char-aldira.md | planning/candidates/characters/char-aldira.md | 2026-06-26 |
| 49 | char-tanelle | character | Tanelle | approved | reviews/entities/characters/char-tanelle.md | bible/characters/char-tanelle.md | planning/candidates/characters/char-tanelle.md | 2026-06-26 |
| 50 | char-marek | character | Marek | approved | reviews/entities/characters/char-marek.md | bible/characters/char-marek.md | planning/candidates/characters/char-marek.md | 2026-06-26 |
| 51 | char-zirene | character | Zirene | approved | reviews/entities/characters/char-zirene.md | bible/characters/char-zirene.md | planning/candidates/characters/char-zirene.md | 2026-06-26 |
| 52 | char-karra | character | Karra | approved | reviews/entities/characters/char-karra.md | bible/characters/char-karra.md | planning/candidates/characters/char-karra.md | 2026-06-26 |
| 53 | char-arrek | character | Arrek | approved | reviews/entities/characters/char-arrek.md | bible/characters/char-arrek.md | planning/candidates/characters/char-arrek.md | 2026-06-26 |
| 54 | char-selina | character | Selina | approved | reviews/entities/characters/char-selina.md | bible/characters/char-selina.md | planning/candidates/characters/char-selina.md | 2026-06-26 |
| 55 | char-kael | character | Kael | approved | reviews/entities/characters/char-kael.md | bible/characters/char-kael.md | planning/candidates/characters/char-kael.md | 2026-06-26 |
| 56 | group-minor-glyphwrights-contractors | character-group | Minor glyphwrights and contractors | deferred | reviews/entities/character-groups/group-minor-glyphwrights-contractors.md | bible/character-groups/group-minor-glyphwrights-contractors.md | planning/candidates/character-groups/group-minor-glyphwrights-contractors.md |  |
| 57 | thread-maya-davian-romance | narrative-thread | Maya / Davian romance and trust arc | approved | reviews/entities/threads/thread-maya-davian-romance.md | outline/arcs/thread-maya-davian-romance.md | planning/candidates/threads/thread-maya-davian-romance.md | 2026-06-27 |
| 58 | thread-niall-grief-recovery | narrative-thread | Niall grief, rigidity, and recovery arc | needs-revisit | reviews/entities/threads/thread-niall-grief-recovery.md | outline/arcs/thread-niall-grief-recovery.md | planning/candidates/threads/thread-niall-grief-recovery.md | 2026-06-23 |
| 59 | thread-davian-identity-guilt | narrative-thread | Davian identity, guilt, and agency arc | needs-revisit | reviews/entities/threads/thread-davian-identity-guilt.md | outline/arcs/thread-davian-identity-guilt.md | planning/candidates/threads/thread-davian-identity-guilt.md | 2026-06-23 |
| 60 | thread-elric-reality-skein | narrative-thread | Elric, trauma scripts, and reality/Skein arc | needs-revisit | reviews/entities/threads/thread-elric-reality-skein.md | outline/arcs/thread-elric-reality-skein.md | planning/candidates/threads/thread-elric-reality-skein.md | 2026-06-23 |
| 61 | thread-high-clade-politics | narrative-thread | High Clade politics and Archeon conflict | approved | reviews/entities/threads/thread-high-clade-politics.md | outline/arcs/thread-high-clade-politics.md | planning/candidates/threads/thread-high-clade-politics.md | 2026-06-27 |
| 62 | event-maya-presentation | historical-event | Maya's Presentation | approved | reviews/entities/events/event-maya-presentation.md | bible/events/event-maya-presentation.md | planning/candidates/events/event-maya-presentation.md | 2026-06-27 |
| 63 | event-heart-theft | historical-event | Heart theft / Treasury breach | approved | reviews/entities/events/event-heart-theft.md | bible/events/event-heart-theft.md | planning/candidates/events/event-heart-theft.md | 2026-06-27 |
| 64 | event-harbinger-raid | historical-event | Harbinger betrayal / Trial of Dominion and Kelyra capture | approved | reviews/entities/events/event-harbinger-raid.md | bible/events/event-harbinger-raid.md | planning/candidates/events/event-harbinger-raid.md | 2026-06-27 |
| 65 | event-alara-death-war-memory | historical-event | Alara's death and war memories | queued | reviews/entities/events/event-alara-death-war-memory.md | bible/events/event-alara-death-war-memory.md | planning/candidates/events/event-alara-death-war-memory.md |  |
| 66 | terminology-magic-social-glossary | terminology | Magic and social terminology glossary | deferred | reviews/entities/terminology/terminology-magic-social-glossary.md | bible/terminology/magic-social-glossary.md | planning/candidates/terminology/magic-social-glossary.md |  |
| 67 | culture-demi-human-peoples | culture | Demi-human peoples, origins, and social roles | queued | reviews/entities/cultures/culture-demi-human-peoples.md | bible/cultures/culture-demi-human-peoples.md | planning/candidates/cultures/culture-demi-human-peoples.md |  |
| 68 | magic-convergence-heat-transfer | magic | Convergence heat transfer | queued | reviews/entities/magic/magic-convergence-heat-transfer.md | bible/magic/magic-convergence-heat-transfer.md | planning/candidates/magic/magic-convergence-heat-transfer.md |  |
| 69 | thread-demi-human-mercenary-forces | narrative-thread | Demi-human mercenary forces and death payments | queued | reviews/entities/threads/thread-demi-human-mercenary-forces.md | outline/arcs/thread-demi-human-mercenary-forces.md | planning/candidates/threads/thread-demi-human-mercenary-forces.md |  |
| 70 | thread-kelyra-archeon-recovery | narrative-thread | Kelyra Archeon trauma and family-protection arc | needs-revisit | reviews/entities/threads/thread-kelyra-archeon-recovery.md | outline/arcs/thread-kelyra-archeon-recovery.md | planning/candidates/threads/thread-kelyra-archeon-recovery.md | 2026-06-23 |
| 71 | char-lirien | character | Lirien | queued | reviews/entities/characters/char-lirien.md | bible/characters/char-lirien.md | planning/candidates/characters/char-lirien.md |  |
| 72 | char-lethira | character | Lethira | queued | reviews/entities/characters/char-lethira.md | bible/characters/char-lethira.md | planning/candidates/characters/char-lethira.md |  |

## Grouping Notes

- `char-davian` should review Davian's use of the Arrek identity, but `char-arrek` remains a separate queued entity because Arrek also appears as the killed glyphwright whose life, records, and identity matter to the plot.
- `org-harbingers-syndicate` groups the Syndicate and Harbingers. Review established Syndicate as the earlier/former name and Harbingers as the current Ink-powered identity.
- `org-registry`, `loc-registry`, and `magic-zan-lattices` are separate because the sources appear to use Registry as an institution/system, a physical chamber, and a technical magical infrastructure.
- `magic-antithesis` and `object-antithesis` are separate because the sources appear to use Antithesis both as a concept/principle and as a physical weapon.
- `object-alara-journal` should be reviewed alongside `magic-codex-memory`, but kept separate unless the author chooses to fold all codex artifacts into one record.
- `group-minor-glyphwrights-contractors` currently groups names such as Jessa, Kolvar, Drosin, Nire, and similar incidental contractor/glyphwright figures until review shows one needs a dedicated file.
- `terminology-magic-social-glossary` is deferred as a catch-all for terms that may not deserve independent entity files after the first review pass.
- `culture-demi-human-peoples`, `magic-convergence-heat-transfer`, and `thread-demi-human-mercenary-forces` were opened from the Maya review so broader demi-human worldbuilding, Naeroth exceptions, and mercenary/death-payment material can be reviewed separately from Maya's accepted character record.
- `char-alden` is superseded because Alden is the prior name/gender version of Aldira from earlier drafting. All old Alden references are now references to Aldira; manuscript/prose cleanup remains a later revision task.

## Default Review Order

1. Principal characters
2. Major organizations
3. Core magic systems
4. Important locations
5. Major objects
6. Cultures and world systems
7. Secondary characters
8. Narrative threads and remaining entities

The author may reorder the queue at any point.
