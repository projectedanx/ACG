
/**
 * @fileoverview Service layer for interacting with the Google Gemini API.
 * Orchestrates multi-agent consensus, plan generation, bias detection, and semantic diff analysis.
 */

import { injectCognitiveBytecode } from './cognitiveContractEngine';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AgentRole, Persona, RefactorPlan, SemanticDiff, GroundingLink, EpistemicBias, Message } from "../types";

/**
 * Scans a multi-agent architectural discussion for cognitive biases, logical fallacies,
 * and epistemic blind spots using the Gemini 2.5 Flash model.
 *
 * @async
 * @param {Message[]} messages - The array of messages representing the discussion context.
 * @returns {Promise<EpistemicBias[]>} A promise that resolves to an array of detected biases.
 */
export const analyzeEpistemicBiases = async (messages: Message[]): Promise<EpistemicBias[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const discussionContext = messages.map(m => `[${m.role}] ${m.sender}: ${m.content}`).join('\n\n');

  const prompt = `
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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
      }
    });

    const text = response.text || '[]';
    const cleanedText = text.replace(/^```json\n/, '').replace(/\n```$/, '');

    const biases: Omit<EpistemicBias, 'isGoldenScar'>[] = JSON.parse(cleanedText);

    return biases.map(b => ({ ...b, isGoldenScar: false }));

  } catch (error) {
    console.error("AESA Analysis failed:", error);
    return [];
  }
};


/**
 * Orchestrates a simulated multi-agent discussion based on a specific goal.
 * Injects Cognitive Bytecode and role-specific Epistemic Matrices to guide generation.
 *
 * @async
 * @param {string} goal - The architectural objective or problem to discuss.
 * @param {Persona[]} personas - The array of agent personas participating in the discussion.
 * @param {boolean} isDeepThinking - If true, utilizes the Gemini Pro model with an extended thinking budget.
 * @param {boolean} isWebSearch - If true, enables external web search grounding (disables strict JSON output).
 * @returns {Promise<{text: string, citations: GroundingLink[]}>} A promise resolving to the raw transcript and any web citations.
 */
export const getConsensusDiscussion = async (
  goal: string, 
  personas: Persona[], 
  isDeepThinking: boolean, 
  isWebSearch: boolean
): Promise<{ text: string; citations: GroundingLink[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const personaContext = personas.map(p => {
    let context = `${p.name} (${p.role}): ${p.expertise}`;
    if (p.epistemic_matrix) {
      context += `\nEpistemic Matrix:\n${JSON.stringify(p.epistemic_matrix, null, 2)}`;
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


  // Model Selection Rule
  // Use pro for complex/thinking, flash for search
  const modelName = isDeepThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

  const config: any = {};

  if (isDeepThinking) {
    // MAX budget for gemini-3-pro-preview as per instructions
    config.thinkingConfig = { thinkingBudget: 32768 };
  } else if (!isWebSearch) {
    // Only use JSON mode if NOT using search (as search response isn't guaranteed JSON)
    config.responseMimeType = "application/json";
    config.responseSchema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          sender: { type: Type.STRING },
          role: { type: Type.STRING },
          content: { type: Type.STRING }
        },
        required: ["sender", "role", "content"]
      }
    };
  }

  if (isWebSearch) {
    config.tools = [{ googleSearch: {} }];
  }

  prompt = injectCognitiveBytecode(prompt);

  const result = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config
  });

  const citations: GroundingLink[] = [];
  const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (groundingChunks) {
    groundingChunks.forEach((chunk: any) => {
      if (chunk.web) {
        citations.push({
          uri: chunk.web.uri,
          title: chunk.web.title || chunk.web.uri
        });
      }
    });
  }

  return { 
    text: result.text || '[]', 
    citations 
  };
};


/**
 * Synthesizes the AI discussion with human feedback (Tacit Habitus) to generate
 * a formal architectural refactoring plan. Implements the Golden Scar Protocol.
 *
 * @async
 * @param {string} goal - The original architectural goal.
 * @param {string} discussion - The generated multi-agent discussion transcript.
 * @param {string} humanReflexion - The feedback or constraints provided by the human user.
 * @returns {Promise<RefactorPlan>} A promise resolving to the generated refactoring plan object.
 */
export const generateSymbioticPlan = async (goal: string, discussion: string, humanReflexion: string): Promise<RefactorPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  let prompt = `
    Based on the following architectural goal and multi-agent AI discussion:
    Goal: ${goal}
    Discussion: ${discussion}
    
    HUMAN REFLEXION (TACIT HABITUS):
    ${humanReflexion}

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

  prompt = injectCognitiveBytecode(prompt);

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          goal: { type: Type.STRING },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                file: { type: Type.STRING },
                description: { type: Type.STRING },
                impact: { type: Type.STRING }
              }
            }
          },
          consensusSummary: { type: Type.STRING },
          status: { type: Type.STRING }
        }
      }
    }
  });

  const plan = JSON.parse(response.text || '{}');
  plan.humanReflexion = humanReflexion;
  return plan;
};


/**
 * Simulates the execution of a refactoring plan to analyze its structural impact
 * and generate a semantic drift score.
 *
 * @async
 * @param {RefactorPlan} plan - The approved refactoring plan to analyze.
 * @returns {Promise<SemanticDiff>} A promise resolving to the semantic diff analysis.
 */
export const generateSemanticDiff = async (plan: RefactorPlan): Promise<SemanticDiff> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const prompt = `
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

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  const data = JSON.parse(response.text || '{}');
  return { ...data, timestamp: new Date() };
};
