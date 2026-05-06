# AEW Validation Checklist

- [ ] Verify Source Provenance Ratio >= 0.70 for all architectural claims.

```bash
npm run test:provenance -- --threshold 0.70
```

- [ ] Confirm Epistemic Escrow triggers when CFDI >= 0.15.

```typescript
assert(agent.cfdi < 0.15, "Epistemic Escrow constraint failed.");
```

- [ ] Validate Golden Scar Protocol weight application.

```python
assert human_input.weight == 1.618
assert ai_input.weight == 1.000
```
