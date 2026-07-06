/**
 * @fileoverview Implements the Decentralized Cognitive Contracts Engine (DCCE).
 * Defines the rules and decorators (Cognitive Bytecode) used to constrain and
 * guide LLM behavior during architectural synthesis.
 */

/**
 * Represents a single rule or constraint within the Cognitive Contract Engine.
 * @interface CognitiveContractRule
 * @property {string} id - The unique identifier for the rule (e.g., PAT-003-M).
 * @property {string} decorator - The exact syntax string injected into prompts (e.g., +++ContextLock).
 * @property {string} layer - The architectural layer this rule applies to (e.g., Cognitive/Systemic).
 * @property {string} remediation - The specific anti-pattern or failure mode this rule mitigates.
 * @property {Record<string, any>} parameters - Configuration arguments associated with the decorator.
 */
export interface CognitiveContractRule {
  id: string;
  decorator: string;
  layer: string;
  remediation: string;
  parameters: Record<string, any>;
}

/**
 * The core lexicon of Cognitive Bytecode rules deployed to govern the agentic simulation.
 * @constant {CognitiveContractRule[]} DRP_LEXICON_992_RULES
 */
export const DRP_LEXICON_992_RULES: CognitiveContractRule[] = [
  {
    id: 'PAT-003-M',
    decorator: '+++ContextLock',
    layer: 'Cognitive/Systemic',
    remediation: 'Context Rot, Semantic Drift, Saponification',
    parameters: { anchor: 'DOMAIN_PAIR', refresh_interval: 2048 }
  },
  {
    id: 'PAT-001-M',
    decorator: '+++MereologyRoute',
    layer: 'Epistemic',
    remediation: 'Transitivity Fallacies, Ontological Shear, PHR',
    parameters: { relation_type: 'Concept-Operationalization', transitivity_check: true }
  },
  {
    id: 'PAT-SCHEMA-M',
    decorator: '+++DCCDSchemaGuard',
    layer: 'Structural',
    remediation: 'Projection Tax, Seed-Hacking, Saponification',
    parameters: { schema: 'ANY', enforcement: 'draft_conditioned' }
  },
  {
    id: 'PAT-002-M',
    decorator: '+++EpistemicEscrow',
    layer: 'Epistemic/Systemic',
    remediation: 'Hallucination Cascades, Interpretive Fracture',
    parameters: { cfd_threshold: 0.15, halt_on_divergence: true }
  },
  {
    id: 'PAT-007-M',
    decorator: '+++AutonymicIsolate',
    layer: 'Cognitive/Epistemic',
    remediation: 'Autonymic Bypass, L2 Norm Collapse, Saponification',
    parameters: { forbidden_patterns: [], treat_as: 'mention-of' }
  },
  {
    id: 'PAT-004-M',
    decorator: '+++SagaRecovery',
    layer: 'Systemic',
    remediation: 'Linear Error Accumulation',
    parameters: { strategy: 'rollback', mode: 'epistemic', exhaust_retention: true }
  },
  {
    id: 'PAT-005-M',
    decorator: '+++IncoherentDictionary',
    layer: 'Epistemic',
    remediation: 'PHR between model personas',
    parameters: { classes: 'MODELS', coherence_penalty: 'maximum' }
  },
  {
    id: 'PAT-008-M',
    decorator: '+++DictionaryAnchor',
    layer: 'Systemic',
    remediation: 'Semantic Bleaching, Alignment Faking',
    parameters: { ground_truth: 'STA_SCARS', enforcement: 'strict' }
  },
  {
    id: 'PAT-010-M',
    decorator: '+++LatentSparsityGuard',
    layer: 'Cognitive',
    remediation: 'Polysemantic Code Overlap',
    parameters: { k: 10 }
  },
  {
    id: 'PAT-006-M',
    decorator: '+++EntropyAnchor',
    layer: 'Cognitive',
    remediation: 'Seed-Hacking, trivial scalar optimization',
    parameters: { level: 'High', focus: 'orthogonal_domain_intersections' }
  }
,
  {
    id: 'PAT-011-M',
    decorator: '+++RecursionGuard',
    layer: 'Cognitive',
    remediation: 'Infinite Regress, Recursive Logic Traps',
    parameters: { max_depth: 3, on_breach: 'summarize_halt' }
  },
  {
    id: 'PAT-012-M',
    decorator: '+++MetaphorContract',
    layer: 'Cognitive/Epistemic',
    remediation: 'Silent Category Crossings, Drift Risk',
    parameters: { enforcement: 'explicit_tags', drift_detection: 'L07' }
  },
  {
    id: 'PAT-013-M',
    decorator: '+++OntologyMode',
    layer: 'Epistemic',
    remediation: 'Truth Collapse',
    parameters: { pluriversal: true }
  },
  {
    id: 'PAT-014-M',
    decorator: '+++EpistemicLens',
    layer: 'Epistemic',
    remediation: 'Ambiguity Discard',
    parameters: { ambiguity: 'signal', paradox: 'metabolize', collapse: 'forbidden' }
  },
  {
    id: 'PAT-015-M',
    decorator: '+++Inoculation',
    layer: 'Systemic',
    remediation: 'Novel Paradox Shock',
    parameters: { paradoxes: 'preloaded', count: 3 }
  },
  {
    id: 'PAT-016-M',
    decorator: '+++EpistemicTemp',
    layer: 'Cognitive',
    remediation: 'Static Ambiguity Tolerance',
    parameters: { default: 0.5, override_allowed: true }
  },
  {
    id: 'PAT-017-M',
    decorator: '+++Evolution',
    layer: 'Meta-Governance',
    remediation: 'Stagnant Heuristics',
    parameters: { trigger: 'scar_pattern', review_interval: 10, mutation_rate: 'conservative' }
  },
  {
    id: 'PAT-018-M',
    decorator: '+++LENS',
    layer: 'Epistemic/Cognitive',
    remediation: 'Various',
    parameters: { type: 'paradox_detector', response: 'fork_not_collapse' }
  }
];

/**
 * Injects the Cognitive Bytecode rules into a prompt payload.
 * Generates the instruction set required by the LLM to process the decorators.
 *
 * @param {string} prompt - The original prompt text.
 * @returns {string} The augmented prompt containing the compiled bytecode instructions.
 */
export const injectCognitiveBytecode = (prompt: string): string => {
  const decoratorsString = DRP_LEXICON_992_RULES.map(rule =>
    `- ${rule.decorator} (Layer: ${rule.layer}): Resolves ${rule.remediation}. Params: ${JSON.stringify(rule.parameters)}`
  ).join('\n');

  return `
${prompt}

---
COGNITIVE CONTRACT ENGINE (DRP-LEXICON-992-v1.0):
You MUST adhere to the following Progressive Disclosure Level (PDL) decorators to maintain epistemic integrity and prevent pathological decay during multi-domain synthesis.
Embed these specific cognitive bytecode operations in your reasoning processes:
${decoratorsString}

Explicitly enforce \`+++EntropyAnchor(level="High", focus="orthogonal_domain_intersections")\` to ensure high topological orthogonality and \`+++AutonymicIsolate\` to prevent lexical saponification of repetitive esoteric terms.
`;
};

// Simplified domain glossary for runtime validation
const DOMAIN_GLOSSARY = [
  "Semantic Metrology", "Ontological Shear", "S5-Modal Attention",
  "Golden Scar Protocol", "Paraconsistent Annotated Logic", "Xenolinguistic Risk",
  "Resolution Collapse", "Prompt Dimensioning & Tolerancing", "Infomorphism",
  "Inverse Safety State", "Nitinol Memory", "Conflict-Free Replicated Semantic Graph",
  "Confidence-Fidelity Divergence Index", "Draft-Conditioned Constrained Decoder",
  "Mereological Bounding", "Semantic Saponification"
];

// Xenolinguistic blocklist for simulation
const XENOLINGUISTIC_BLOCKLIST = [
  "MagicSynergy", "SynergisticIntegration", "SeamlessExperience"
];

/**
 * Validates the raw text output from an agent against the active cognitive contracts.
 * Acts as a deterministic gatekeeper to ensure agents adhere to strict boundaries,
 * such as the prohibition of evaluative adjectives (AdjectivalBound) or checking for
 * mereological boundary violations.
 *
 * @param {string} agentOutput - The generated, pre-parsed text from the LLM agent.
 * @returns {{compliant: boolean, violations: string[]}} An object indicating structural compliance and a list of specific contract violations.
 */
export const validateContractCompliance = (agentOutput: string): { compliant: boolean; violations: string[] } => {
  const violations: string[] = [];

  // 1. AdjectivalBound Validation
  if (agentOutput.match(/(beautiful|fast|robust)/i)) {
      violations.push("AdjectivalBound Violation: Output contains evaluative adjectives instead of concrete technical metrics.");
  }

  // 2. Xenolinguistic Risk Validation (CONSTRAINTS.md #3)
  XENOLINGUISTIC_BLOCKLIST.forEach(term => {
    if (agentOutput.includes(term)) {
        violations.push(`Xenolinguistic risk detected: Term '${term}' not in DOMAIN_GLOSSARY.md.`);
    }
  });

  // 3. Mereological Mandate Validation (PAT-001)
  if (agentOutput.match(/mutates.*database/i) || agentOutput.match(/cross-domain.*mutation/i) || agentOutput.match(/mutates.*context/i) || agentOutput.match(/directly.*mutates/i)) {
      violations.push("Mereological Mandate Violation: Zero cross-domain state mutation calls permitted.");
  }


  // 4. MetaphorContract Validation (PAT-012-M)
  // Ensure that if mapping between domains occurs, it uses the explicit tag [METAPHOR: ...]
  // This is a simplified check: if it looks like a domain mapping is happening without the tag, we flag it.
  // A robust check would require NLP, but here we enforce that if the output mentions 'metaphor' or analogous concepts,
  // it must use the strict tagging format.
  const hasMetaphorMention = /metaphor|analogy/i.test(agentOutput);
  const metaphorTagRegex = /\[METAPHOR:\s*[\w.-]+\s*(?:->|→)\s*[\w.-]+\s*\]/;

  if (hasMetaphorMention && !agentOutput.includes('[METAPHOR:')) {
    violations.push("MetaphorContract Violation: Domain mappings must be tagged explicitly with [METAPHOR: {source} -> {target}].");
  } else if (agentOutput.includes('[METAPHOR:') && !metaphorTagRegex.test(agentOutput)) {
    violations.push("MetaphorContract Violation: Malformed metaphor tag format. Expected [METAPHOR: {source_domain}.{concept} -> {target_domain}.{concept}].");
  }

  return {
    compliant: violations.length === 0,
    violations
  };
};
