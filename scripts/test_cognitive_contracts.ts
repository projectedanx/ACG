import { validateContractCompliance } from '../services/cognitiveContractEngine';
import * as assert from 'assert';

/**
 * TDD Substrate for DCCE Runtime Enforcement.
 * Simulates red-green-refactor loop for epistemic structural boundaries.
 */
const runTests = () => {
    let failed = 0;

    const runTest = (name: string, fn: () => void) => {
        try {
            fn();
            console.log(`[PASS] ${name}`);
        } catch (e: any) {
            console.error(`[FAIL] ${name}: ${e.message}`);
            failed++;
        }
    };

    console.log("--- Executing DCCE Runtime Verification (Martensite Gate) ---");

    runTest("AdjectivalBound (PAT-004) - Reject evaluative adjectives", () => {
        const output = '{"sender": "System", "role": "DEVOPS_ENGINEER", "content": "This is a beautiful and robust architecture."}';
        const result = validateContractCompliance(output);
        assert.strictEqual(result.compliant, false);
        assert.ok(result.violations.some(v => v.includes("AdjectivalBound")));
    });

    runTest("Xenolinguistic Risk (CONSTRAINTS.md #3) - Require DOMAIN_GLOSSARY mapping", () => {
        // Assume 'Infomorphism' is valid, 'MagicSynergy' is undefined/xenolinguistic
        const output1 = '{"sender": "System", "content": "Applying Infomorphism logic to the layout."}';
        const output2 = '{"sender": "System", "content": "Applying MagicSynergy to the layout."}';

        const res1 = validateContractCompliance(output1);
        assert.strictEqual(res1.compliant, true);

        const res2 = validateContractCompliance(output2);
        assert.strictEqual(res2.compliant, false);
        assert.ok(res2.violations.some(v => v.includes("Xenolinguistic risk detected")));
    });

    runTest("Mereological Mandate (PAT-001) - Detect cross-domain mutation", () => {
        const output = '{"sender": "System", "content": "User bounded context directly mutates Order context database."}';
        const result = validateContractCompliance(output);
        assert.strictEqual(result.compliant, false);
        assert.ok(result.violations.some(v => v.includes("Mereological Mandate Violation")));
    });

    console.log(`--- Test Cycle Complete: ${failed > 0 ? failed + " tests failed [BETTI LOOP β1 > 0]" : "All tests passed [GREEN]"} ---`);
    if (failed > 0) process.exit(1);
};

runTests();
