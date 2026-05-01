# Operational Constraints

## 1. Epistemic Escrow
Any contextual claim or generated schema demonstrating a Source Provenance Ratio below 0.70 MUST be immediately quarantined. Agents are prohibited from using these tokens in downstream structural mutations.

## 2. Deterministic Numbering (Arc42)
All Architecture Decision Records MUST adhere to deterministic, sequentially numbered Arc42 templates (e.g., `01-introduction-and-goals.md`, `11-risks-and-technical-debt.md`). No logic branching or unindexed narrative records are permitted.

## 3. Strict Domain Disambiguation
Any term used in architectural output MUST map deterministically to a definition in `DOMAIN_GLOSSARY.md`. Undefined terms are considered a Xenolinguistic risk and will trigger an automatic PR rejection by the validation linter.

## 4. No Synchronous Calls Crossing Tenant Boundaries
Under no circumstances may an agentic workflow or architectural plan propose a synchronous API call that crosses isolated tenant boundaries within the execution manifold.

## 5. Golden Ratio Tension Maintenance
When resolving logical conflicts between human oversight and stochastic generation, the Golden Ratio (ϕ=1.618) MUST be applied to the deterministic human empirical frame. The Golden Scar Protocol is an absolute invariant.
