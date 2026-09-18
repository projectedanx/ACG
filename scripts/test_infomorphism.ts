import { executeInfomorphism } from '../services/infomorphismEngine';
import * as assert from 'assert';

/**
 * TDD Substrate for Infomorphism Engine (Z-Axis).
 * Simulates red-green-refactor loop for Stakeholder Dissonance & Golden Scar verification.
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

    console.log("--- Executing Infomorphism Synthesis Verification (Topological Derivative) ---");

    runTest("Semantic Saponification Rejection - Exact Match", () => {
        const aiTopology = "Microservice deployment with Kafka";
        const humanHabitus = "Microservice deployment with Kafka";

        const result = executeInfomorphism(aiTopology, humanHabitus);

        // Exact match should have 1 Jaccard similarity, resulting in 0 dissonance.
        assert.strictEqual(result.surprisalValue, 0);
        // Is stable? Tension is 0, so it might fail the tension check (isStable = false)
        assert.strictEqual(result.isStable, false);
    });

    runTest("Topological Derivative - Interference Fit", () => {
        const aiTopology = "Event-driven architecture with eventual consistency";
        const humanHabitus = "Strict ACID transactions required for ledger";

        const result = executeInfomorphism(aiTopology, humanHabitus);

        // Jaccard similarity should be low, generating high surprisal
        assert.ok(result.surprisalValue > 0.5, "Surprisal value should be high due to dissonance");
        assert.ok(result.structuralInvariant.includes("ϕ=1.618[Human] : 1.000[AI]"), "Must apply Golden Scar Protocol");
        assert.ok(result.structuralInvariant.includes("Topological Derivative"), "Must include Topological Derivative in invariant");
    });

    runTest("Resolution Collapse Prevention - Epsilon Band", () => {
        const aiTopology = "Deploy using Docker";
        const humanHabitus = "Deploy using Docker containers";

        const result = executeInfomorphism(aiTopology, humanHabitus);

        // Jaccard similarity will be high (e.g. 0.6 to 0.9), dissonance will be low (e.g. 0.1 to 0.4)
        assert.ok(result.surprisalValue > 0, "Surprisal should be > 0");
        assert.ok(result.surprisalValue < 0.5, "Surprisal should be < 0.5");
        // Should detect it as Paraconsistent Technical Debt or Resolution Collapse
        assert.ok(result.structuralInvariant.includes("Epsilon-Tolerance Paraconsistency"), "Must include Epsilon-Tolerance Paraconsistency for minor drift");
    });

    console.log(`--- Test Cycle Complete: ${failed > 0 ? failed + " tests failed [BETTI LOOP β1 > 0]" : "All tests passed [GREEN]"} ---`);
    if (failed > 0) process.exit(1);
};

runTests();
