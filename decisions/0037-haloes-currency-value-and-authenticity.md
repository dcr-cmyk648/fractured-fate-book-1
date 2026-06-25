# Haloes Currency, Value, and Authenticity

Date: 2026-06-25

Status: accepted

## Decision

Haloes are a dedicated object/currency record because they are the main currency and have relevant physical and magical properties.

Haloes are coins with a precious-metal center and a cheaper-metal halo around that center. A zan in the center marks the coin's value from 1 to 6 within its metal tier, and that zan can be activated to verify authenticity.

The value structure is base 6:

- 6 copper haloes = 1 silver halo
- 6 silver haloes = 1 gold halo
- 6 gold haloes = 36 silver haloes

A 6-gold halo is equivalent to a month of wages for normal low-level labor and can be called a Moon. Months have 36 days, and normal low-level labor pays about 1 silver halo per day, or about 0.5 to 1 copper per hour.

Fractional copper coins exist but are not haloed. Only values worth testing receive the zan authenticity mark.

One of the High Clades controls minting, but not Archeon, Drakhal, or Rezin. A Low Clade proxy handles day-to-day operations and functionally manages the minting process.

The mask vendor tests Davian's payment because Davian gives him a very large amount of money.

## Deferred

- Exact High Clade responsible for minting.
- Exact Low Clade proxy and mint location.
- Exact coin dimensions, weights, metals, and visual designs.
- Exact zan activation method and who can test authenticity.
- Whether `Moon` is formal, slang, or group-specific terminology.
- Exact final wording of the mask vendor payment scene.

## Rationale

This preserves the useful base-6 economy and anti-counterfeit zan detail without prematurely building a full economy or minting authority. The unresolved minting details can wait for culture/economy and High Clade review.

## Files

- `reviews/entities/objects/object-haloes.md`
- `bible/objects/object-haloes.md`
- `planning/candidates/objects/object-haloes.md`
