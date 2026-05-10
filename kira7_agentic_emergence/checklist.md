# Zero-Trust Epistemic Ingress (ZTEI) Verification Checklist

+++ContextLock(anchor="KIRA7_ZTEI_CHECKLIST", refresh_interval=2048)
+++PetzoldSequence(phase="THINK")

This checklist defines the binary (pass/fail) criteria to ensure the complete and correct implementation of the ZTEI feature according to KIRA-7 domain invariants.

+++PetzoldSequence(phase="WRITE")

- [ ] **URL Challenge Handshake Configured:** Webhook endpoints successfully detect the `url_verification` type and immediately return the corresponding challenge string.
- [ ] **Signature Verification Middleware Active:** `X-Lark-Signature` is mathematically verified using SHA256 against the timestamp, nonce, encrypt key, and raw body.
- [ ] **Replay Attack Mitigation Implemented:** Request timestamps older than 300 seconds are rejected with a 401 Unauthorized status.
- [ ] **AES Decryption Enabled:** When an Encrypt Key is present, payloads are successfully decoded using AES-256-CBC before semantic parsing.
- [ ] **Raw Body Extraction Verified:** Express JSON parser is configured to retain the `rawBody` for accurate signature verification (no JSON parsing artifacts).
- [ ] **Schema Compliance (DCCDSchemaGuard):** Outputs generated as a result of ingress are validated against the Feishu Card JSON v2.0 schema.
- [ ] **Symbolic Scar Registry Updated:** SCAR-001 through SCAR-007 are documented and enforced via the new ingress architecture.

```json
{
  "Hickam_Orientation": "The checklist is absolute; partial passes are failures.",
  "Contrastive_Delta": "Unchecked ingress allows chaotic execution; fully checked ingress ensures zero-entropy.",
  "Martensite_Metrics": {
    "Checklist_Completion": "100%"
  }
}
```
