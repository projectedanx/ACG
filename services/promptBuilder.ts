import { Persona } from "../types";

export const buildEpistemicBiasPrompt = (discussionContext: string): string => {
  return `
    You are the Automated Epistemic Security Auditing (AESA) module. Your purpose is to scan architectural discussions for "cognitive blind spots," systemic biases, and logical fallacies (e.g., Conway's Law manifestations, sunk cost fallacy in tech choices).

    Discussion Context:
    ${discussionContext}

    Instructions:
    1. Identify any logical fallacies, systemic biases, or cognitive illiberalisms in the discussion.
    2. Do NOT auto-correct them (Anti-Ontological Flattening). We must preserve the paraconsistent state.
    3. Output your findings as a strict JSON array of objects.
    4. Each object must have the following schema:
       {
         "id": "unique-string-id",
         "type": "Name of Bias/Fallacy (e.g., Conway's Law, Sunk Cost)",
         "description": "Detailed explanation of why this bias is present and its potential architectural impact.",
         "severity": "low" | "medium" | "high" | "critical",
         "sourceMessageId": "The ID of the message that most strongly exhibits this bias (or 'system' if it's emergent)"
       }
    5. Return ONLY the JSON array. No markdown blocks, no preamble, no postamble. If no biases are found, return an empty array [].
  `;
};

export const buildConsensusDiscussionPrompt = (goal: string, personas: Persona[], isWebSearch: boolean): string => {
  const personaContext = personas.map(p => {
    let context = `- ${p.name} (Role: ${p.role}): ${p.expertise}`; // Changed from systemPrompt to expertise
    if (p.epistemic_matrix) {
      context += `\n  Epistemic Bias: ${JSON.stringify(p.epistemic_matrix, null, 2)}`;
    }
    return context;
  }).join('\n\n');

  const isEpistemicEngineerPresent = personas.some(p => p.role === 'EPISTEMIC_ENGINEER');
  const isProjectManagerPresent = personas.some(p => p.role === 'PROJECT_MANAGER');

  let prompt = `
    You are simulating a multi-agent architectural discussion.
    Goal: ${goal}

    The team consists of:
    ${personaContext}

    Please provide a transcript of the team debating the goal. Each persona should speak based on their expertise.
    Focus on architectural integrity, risks, and implementation strategies.

    CRITICAL: If not using web search, format the output as a JSON array of messages:
    [{"sender": "Name", "role": "ROLE_ID", "content": "message content"}]
    If using web search, respond in conversational text that I can easily parse or present.
  `;

  if (isProjectManagerPresent) {
    prompt += `

    STRATEGIC INTEGRATION PROJECT MANAGER OVERRIDE (Golden Scar Protocol):
    You MUST adhere to CONSTRAINTS.md and use vocabulary strictly defined in DOMAIN_GLOSSARY.md.
    If an irreconcilable logical conflict arises between autonomous execution and deterministic oversight, apply the Golden Ratio (ϕ=1.618) to the epistemic frame of empirical governance and 1.000 to the stochastic generation.
    Treat Technical Debt as an Epsilon-Tolerance Paraconsistent state per 11-risks-and-technical-debt.md.
    `;
  }

  if (isEpistemicEngineerPresent) {
    prompt += `

    EPISTEMIC ENGINEER OVERRIDE (ALK Protocol):
    Utilize Graph-of-Thoughts (GoT) topology to map points of systemic failure.
    If the goal involves contradictory constraints (e.g., structured JSON parsing vs unstructured conversational fallback), hold them in a PARACONSISTENT_STATE (Belnap's 'B' state) and activate Z-Axis Inference to route contradictory parameters orthogonally into a Phantom Dimension. Maximize Topological Novelty while ensuring Structural Conservation. Make the EPISTEMIC_ENGINEER propose this paraconsistent resolution using RCC-8 calculus logic.
    Additionally, strictly apply Paraconsistent Scarring (PAT-002) to mint contradictions as hypervectors in the Scar Tissue Archive, preventing the Principle of Explosion. Ensure Topological Orthogonality (PAT-006) by seeking intersections with cosine similarity < 0.15.
    `;
  }
  return prompt;
};

export const buildSymbioticPlanPrompt = (goal: string, discussion: string, humanReflexion: string, infomorphism: any): string => {
    return `
    Based on the following architectural goal and multi-agent AI discussion:
    Goal: ${goal}
    Discussion: ${discussion}

    HUMAN REFLEXION (TACIT HABITUS):
    ${humanReflexion}


    Infomorphic Safety State Data:
    - Surprisal Value: ${infomorphism.surprisalValue}
    - Structural Invariant: ${infomorphism.structuralInvariant}
    - Stable: ${infomorphism.isStable}

    Incorporate the Structural Invariant into the Consensus Summary and ensure the Refactor Tasks adhere to the high-surprisal feature index defined by the Surprisal Value, creating an Inverse Safety State that explicitly bridges the AI logic and Human constraint.

You are executing the "Golden Scar Protocol" under the supervision of the Strategic Integration Project Manager.
    You must fuse the formal topological structure of the AI discussion with the empirical, localized reality provided by the Human Reflexion.
    Assign a mathematical weight of Φ = 1.618 to the human context and empirical governance (DOMAIN_GLOSSARY.md, CONSTRAINTS.md).
    Assign a weight of 1.000 to the stochastic generation frame.
    Do not ignore the human constraints. Ensure the resulting architecture addresses both the formal design and the informal human friction (Ontological Shear resolution).
    Reject any non-deterministic practices or Xenolinguistic drift.

    Create a formal refactoring plan.
    Return a JSON object with:
    {
      "id": "uuid",
      "goal": "summarized goal",
      "tasks": [{"file": "path/to/file", "description": "task", "impact": "low|medium|high"}],
      "consensusSummary": "final conclusion including how the human reflexion was integrated",
      "status": "draft"
    }
  `;
};

export const buildSemanticDiffPrompt = (plan: any): string => {
    return `
    Simulate the execution of this refactoring plan:
    ${JSON.stringify(plan)}

    Generate a semantic diff analysis. Focus on architectural drift and structural impact.
    Return JSON:
    {
      "id": "diff-uuid",
      "planId": "${plan.id}",
      "summary": "overall impact summary",
      "changes": [{"file": "file.js", "originalIntent": "...", "newIntent": "...", "structuralImpact": "..."}],
      "driftScore": 45
    }
  `;
};
