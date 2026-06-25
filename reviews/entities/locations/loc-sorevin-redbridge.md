---
id: loc-sorevin-redbridge
entity_type: location
display_name: Sorevin / Redbridge area
review_status: approved
source_scope:
  - imports/normalized/melissa-copy.md
  - imports/normalized/book-1-outline.md
  - imports/normalized/bullet-notes.md
  - bible/organizations/org-high-clades.md
  - bible/locations/loc-rezin-citadel.md
  - bible/locations/loc-concord-manor.md
  - CONSISTENCY_QUEUE.md
last_updated: 2026-06-25
---

# Entity Review: Sorevin / Redbridge Area

## Proposed identity

This packet treats `loc-sorevin-redbridge` as the Sorevin / Redbridge physical area or areas: Low Clade / contractor routes, districts, streets, named neighborhood references, and any relationship between Sorevin-controlled spaces and the Redbridge area.

It should not own:

- `culture-clade-hierarchy`: Low Clade status, council/proxy systems, and caste hierarchy
- `org-registry`: Registry organization and access rules
- `loc-rezin-citadel`: Rezin citadel contractor spaces and internal routes
- `org-concord`: Concord base, leadership, or Masked Clade structures
- `loc-concord-manor`: the Concord manor/hideout compound

## Established constraints from approved records

- High Clade city-wedges are governed through Low Clade councils and proxy structures reporting to the relevant High Clade. Provenance: `bible/organizations/org-high-clades.md`.
- The Rezin citadel can bring contractors inside and monitor them through Registry/security procedures. Provenance: `bible/locations/loc-rezin-citadel.md`; `bible/organizations/org-registry.md`.
- The Concord manor is in an old/decrepit district, but its exact district name remains deferred. Provenance: `bible/locations/loc-concord-manor.md`.

## Source-gathering status

Complete enough for author checkpoint.

## Manuscript-established information

- The Concord obtains files listing arcane craftsmen hired for the Rezin citadel ward overhaul. The contractors are to be added to the Rezin Registry and expected to live in the citadel during the project. Provenance: `imports/normalized/melissa-copy.md:1854-1915`.
- Arrek Hadrin is identified in those contractor files as a glyphwright scheduled to arrive in three days. Davian is selected to replace him. Provenance: `imports/normalized/melissa-copy.md:1854-1915`.
- Jalen later says a Concord lead places Arrek drinking near Redbridge. Their agent confirms Arrek is there that night. The group follows Arrek from the tavern into alleys, intending to kill him and replace him cleanly. Provenance: `imports/normalized/melissa-copy.md:2019-2095`.
- The tavern near Redbridge has warm light, cobbled street frontage, cracked/smudged windows, drunken laughter, and side shadows where a Concord agent can wait. Arrek takes alleys home by a predictable route. Provenance: `imports/normalized/melissa-copy.md:2019-2095`; `imports/normalized/book-1-outline.md:3124-3128`.
- After the assassination attempt inside the Rezin citadel, Maya says all contractors were vetted by the Sorevins, who are Low Clade and have an unimpeachable reputation. Provenance: `imports/normalized/melissa-copy.md:2920-2935`.
- Aldira says the assassin assumed the identity of an existing contractor approved by the Sorevins and that the real contractor was likely killed before reaching the citadel. Provenance: `imports/normalized/melissa-copy.md:2931-2946`.
- Aldira reports that the Sorevin manor was attacked two nights earlier, the same night as the Rezin attack. Records/lists of approved contractors were seized, making it possible to target individuals, replace them, and plant an assassin. Provenance: `imports/normalized/melissa-copy.md:2940-2964`.
- The Sorevins were wiped out. Aldira frames the attack as targeted, precise, and part of a larger pattern of Low Clade head-magus assassinations over the prior year. Provenance: `imports/normalized/melissa-copy.md:2946-2988`.
- Later, Maya asks Aldira for Arrek's files from Sorevin. Aldira retrieves the Sorevin vetting packet. The packet is in a Low Clade house scribe's hand and describes Arrek's identity, guild licensing, references, dead master, no surviving primary relatives, debt-contracted cousins, and ordinary Low Clade precarity. Provenance: `imports/normalized/melissa-copy.md:14769-14845`.
- Arrek's references are Rellen Jastor and Sera Vadrin, both affiliated with the Sorevin contractor network. Provenance: `imports/normalized/melissa-copy.md:14790-14796`.
- Aldira says Arrek had the fewest references and no master recommendation, but that Sorevin would never recommend someone truly unqualified. Provenance: `imports/normalized/melissa-copy.md:14808-14835`.
- Kelyra and Jalen later still have the stolen Sorevin documents, but the documents have become useless after Davian's chaotic return. Provenance: `imports/normalized/melissa-copy.md:16294-16305`.
- Karra says Davian saved her life during the Sorevin job. Provenance: `imports/normalized/melissa-copy.md:16486-16500`.

## Outline and planning information

- Outline summary repeats that the group tracks Arrek to a tavern near Redbridge, where a Concord agent identifies him. Provenance: `imports/normalized/book-1-outline.md:3124-3128`.
- Planning notes mention closing a plot issue around Elric making the Concord come back to him with the Sorevin documents. Provenance: `imports/normalized/book-1-outline.md:4012`.
- Bullet notes say Davian may have lied or altered intel about the Low Clade magus being out at Sorevin because he wanted to kill him, or Kelyra did and he notices the pattern. Provenance: `imports/normalized/bullet-notes.md:159`.

## Consistent information

- `Sorevin` appears primarily as a Low Clade house/family and contractor-vetting network, not clearly as a district.
- The Sorevin manor is a physical Low Clade manor attacked for contractor records.
- `Redbridge` appears as a place near a tavern where Arrek drinks and as a useful neighborhood/landmark for the Concord lead.
- The "Sorevin job" likely refers to the operation involving Sorevin records / Arrek / contractor infiltration, but it may also include or overlap with the Low Clade manor attack if that manor is the Sorevin manor.
- Sorevin material ties together Low Clade contractor vetting, Rezin Registry access, Concord/Harbinger manipulation, and the early plot route into the Rezin citadel.

## Contradictions and version conflicts

### Sorevin location vs Sorevin organization

- Version A: `Sorevins` are Low Clade contractors/vetters with a reputation and a contractor network.
- Version B: there is also a Sorevin manor, a physical place that is attacked.
- Likely resolution: this location record should own the Sorevin manor and any physical Sorevin-associated places, while later organization/culture records own the Sorevin family/network if needed.

### Redbridge relationship to Sorevin

- Version A: Arrek drinks near Redbridge, and Redbridge functions like a neighborhood/landmark.
- Version B: Sorevin records/network identify Arrek, but the text does not clearly state Redbridge is Sorevin territory.
- Likely resolution: keep Redbridge as a separate tavern-area / district landmark unless the author wants it tied to Sorevin-controlled territory.

### Prologue Low Clade manor vs Sorevin manor

- Version A: the prologue/early material has Davian fighting a Low Clade magus in a Low Clade manor near the Rezin citadel.
- Version B: later investigation says the Sorevin manor was attacked the same night as the Rezin attack and its records were taken.
- Version C: bullet notes mention Davian or Kelyra altering intel about the Low Clade magus being out at Sorevin.
- Likely resolution: these may be the same event/location, but the packet needs author confirmation before merging them.

## Speculative or alternative material

- Whether Sorevin is a Low Clade family, manor, contractor network, district, or all of these.
- Whether the Sorevin manor is the prologue Low Clade manor where Davian fights the Low Clade magus.
- Whether Redbridge is a bridge, neighborhood, market/tavern district, slum edge, or named street area.
- Whether Redbridge is inside Sorevin territory, adjacent to Sorevin territory, or unrelated except through Arrek's routine.
- Exact relationship between Concord manor, Redbridge, Sorevin manor, the Rezin citadel, and contractor routes.
- Exact identity and fate of the real Arrek Hadrin.
- Whether Arrek is dead by Davian's/Concord's action, Harbinger action, or another mechanism in final canon.
- Exact Sorevin contractor-network hierarchy and whether it needs an organization record later.

## Proposed accepted record

### present-canon

- Sorevin is a Low Clade house/family that acts as one of the Rezin proxy administrators.
- Sorevin primarily vets contractors and handles other contracts, along with other local tasks around the Sorevin manor.
- The Sorevin manor is the Low Clade manor from the prologue where Davian fights the Sorevin Head Magus.
- The Sorevin manor was attacked for contractor records.
- The Sorevins were not necessarily completely wiped out, but losing their Head Magus / only significant magic user and most of their personnel effectively cripples them for plot purposes.
- Sorevin records include the approved contractor list and Arrek Hadrin's vetting packet.
- The Sorevin job was the specific Concord operation to retrieve contractor records.
- The later Arrek / Rezin-citadel contractor infiltration is an add-on from the Harbingers.
- Karra was saved by Davian during the Sorevin job.
- Redbridge remains candidate-only location material: likely a district named for a landmark.
- Redbridge is not established as Sorevin territory; it is just where Arrek happened to drink.
- Arrek's routine near Redbridge lets the Concord locate and follow him into alleys as part of the replacement plan.
- Arrek's fate and other details belong to his eventual character record or other plot-relevant files.

### candidate

- Redbridge may be a bridge, neighborhood, market/tavern district, or street area.
- Redbridge may be a district named for a landmark.
- Exact relationship between Redbridge and broader city maps remains deferred.
- Sorevin contractor/proxy-administrator details may need a later organization/culture note rather than a location record.
- Exact map relationships remain deferred.

## Questions for the author

Resolved by author feedback on 2026-06-25:

1. Redbridge stays candidate-only location material.
2. Sorevin is a Low Clade that acts as one of the Rezin proxy administrators, primarily vetting contractors and handling other contracts and local tasks around the Sorevin manor.
3. The Sorevin manor is the Low Clade manor from the prologue; the magus Davian fights is the Sorevin Head Magus.
4. The Sorevin job was the specific Concord operation to retrieve contractor records. The later infiltration is an add-on from the Harbingers.
5. Redbridge exact form remains deferred; it is probably a district named for a landmark.
6. Redbridge is just where Arrek happened to drink, not established Sorevin-associated territory.
7. The Sorevins were likely not completely wiped out, but the loss of their Head Magus / only significant magic user along with most personnel would accomplish essentially the same plot effect.
8. Arrek's fate and other details remain for his record and other more plot-relevant files.

## File changes after approval

Created or updated:

- `bible/locations/loc-sorevin-redbridge.md`
- `planning/candidates/locations/loc-sorevin-redbridge.md`
- `decisions/0031-sorevin-manor-and-redbridge-candidate.md`
- direct dependent notes in `bible/characters/char-davian.md`, `bible/organizations/org-high-clades.md`, `planning/candidates/characters/char-davian.md`, `PROJECT_STATE.md`, `ENTITY_INDEX.md`, and `CONSISTENCY_QUEUE.md` as needed
