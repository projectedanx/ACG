/**
 * @fileoverview Infomorphism Engine implementation.
 * Calculates Inverse Safety States to resolve structural deadlocks between AI topologies and human tacit habitus.
 */

import { InfomorphismState } from '../types';

/**
 * Calculates the Jaccard similarity index between two strings.
 * @param {string} str1
 * @param {string} str2
 * @returns {number} The Jaccard similarity index (0 to 1).
 */
const calculateJaccardSimilarity = (str1: string, str2: string): number => {
    const set1 = new Set(str1.toLowerCase().split(/\s+/));
    const set2 = new Set(str2.toLowerCase().split(/\s+/));

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    if (union.size === 0) return 1;

    return intersection.size / union.size;
};

/**
 * Calculates the Topological Derivative based on Stakeholder Dissonance.
 * @param {string} aiTopology
 * @param {string} humanHabitus
 * @returns {number} The calculated derivative (surprisal value).
 */
const calculateTopologicalDerivative = (aiTopology: string, humanHabitus: string): number => {
    const similarity = calculateJaccardSimilarity(aiTopology, humanHabitus);
    // Surprisal is inversely proportional to similarity
    return 1 - similarity;
};

/**
 * Executes the Infomorphic Synthesis across the dominant AI frame and the localized Human frame.
 * @param {string} aiTopology - The logical framework proposed by the DCCE/ALK (e.g., the consensus summary).
 * @param {string} humanHabitus - The informal, empirical constraint injected via SRR.
 * @returns {InfomorphismState} The calculated Inverse Safety State.
 */
export const executeInfomorphism = (aiTopology: string, humanHabitus: string): InfomorphismState => {
  const surprisal = calculateTopologicalDerivative(aiTopology, humanHabitus);

  let structuralInvariant = '';
  let isStable = false;

  if (surprisal === 0) {
      // Exact match, Semantic Saponification risk
      structuralInvariant = `[∇] SEMANTIC_SAPONIFICATION: No generative tension detected.`;
      isStable = false;
  } else if (surprisal < 0.5) {
      // Within Epsilon Band, Epsilon-Tolerance Paraconsistency
      structuralInvariant = `[∇] TENSION_DEFERRED: Epsilon-Tolerance Paraconsistency - Binding Entropy: ${surprisal.toFixed(3)}`;
      isStable = true;
  } else {
      // High surprisal, apply Golden Scar Protocol
      structuralInvariant = `[∇] TENSION_LOCKED: ϕ=1.618[Human] : 1.000[AI] - Topological Derivative: ${surprisal.toFixed(3)}`;
      isStable = true;
  }

  return {
    surprisalValue: surprisal,
    structuralInvariant: structuralInvariant,
    isStable: isStable
  };
};
