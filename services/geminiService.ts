import { injectCognitiveBytecode, validateContractCompliance } from './cognitiveContractEngine';
import { executeInfomorphism } from './infomorphismEngine';
import { buildEpistemicBiasPrompt, buildConsensusDiscussionPrompt, buildSymbioticPlanPrompt, buildSemanticDiffPrompt } from './promptBuilder';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AgentRole, Persona, RefactorPlan, SemanticDiff, GroundingLink, EpistemicBias, Message } from "../types";

/**
 * @fileoverview Service layer for interacting with the Google Gemini API.
 * Orchestrates multi-agent consensus, plan generation, bias detection, and semantic diff analysis.
 */

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

  const prompt = buildEpistemicBiasPrompt(discussionContext);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING },
              description: { type: Type.STRING },
              severity: { type: Type.STRING },
              sourceMessageId: { type: Type.STRING }
            }
          }
        }
      }
    });

    const parsed: EpistemicBias[] = JSON.parse(response.text || '[]');
    // Ensure all biases have the isGoldenScar flag set initially to false
    return parsed.map(b => ({ ...b, isGoldenScar: false }));
  } catch (e) {
    console.error("Failed to parse AESA response", e);
    return [];
  }
};


/**
 * Orchestrates a simulated debate between multiple AI agent personas to arrive at an architectural consensus.
 * Supports deep thinking (GoT topology mapping) and external web grounding.
 *
 * @async
 * @param {string} goal - The architectural objective to debate.
 * @param {Persona[]} personas - The array of agent personas participating in the discussion.
 * @param {boolean} isDeepThinking - Flag to enable reasoning loops (gemini-3-pro-preview).
 * @param {boolean} isWebSearch - Flag to enable grounding via Google Search.
 * @returns {Promise<{ text: string, citations: GroundingLink[] }>} A promise resolving to the discussion transcript and citations.
 */
export const getConsensusDiscussion = async (
  goal: string,
  personas: Persona[],
  isDeepThinking: boolean,
  isWebSearch: boolean
): Promise<{ text: string, citations: GroundingLink[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  let prompt = buildConsensusDiscussionPrompt(goal, personas, isWebSearch);

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

  const responseText = result.text || '[]';
  const validation = validateContractCompliance(responseText);

  if (!validation.compliant) {
    console.warn("DCCE Contract Violation Detected:", validation.violations);
    // In a real system, this might trigger +++SagaRecovery or EpistemicEscrow to regenerate.
    // For this implementation, we append the violation as a meta-message to ensure transparency.
    // Ensure we don't break JSON parsing if not using web search
    if (!isWebSearch) {
       try {
           const parsed = JSON.parse(responseText);
           parsed.push({
               sender: "DCCE Validator",
               role: "EPISTEMIC_ENGINEER",
               content: `[⊘] EpistemicEscrow Triggered. Violations: ${validation.violations.join(', ')}`
           });
           return { text: JSON.stringify(parsed), citations: [] };
       } catch (e) {
           // Fallback
       }
    }
  }


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
 * Synthesizes the formal AI discussion topology with empirical human feedback (Tacit Habitus)
 * to generate a definitive, actionable architectural refactoring plan.
 * Implements the 'Golden Scar Protocol' by assigning dominant mathematical weighting (Phi = 1.618)
 * to the human input, overriding potential stochastic hallucinations.
 *
 * @async
 * @param {string} goal - The original objective that initiated the workflow.
 * @param {string} discussion - The raw text transcript of the agent consensus deliberation.
 * @param {string} humanReflexion - The explicit, localized constraints provided by the human operator.
 * @returns {Promise<RefactorPlan>} A promise resolving to the fully structured and validated refactoring plan object.
 */
export const generateSymbioticPlan = async (goal: string, discussion: string, humanReflexion: string): Promise<RefactorPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  // Synthesize Inverse Safety State using Infomorphism Engine
  const infomorphism = executeInfomorphism(discussion, humanReflexion);
  console.log('Generated Infomorphic Safety State:', infomorphism);

  let prompt = buildSymbioticPlanPrompt(goal, discussion, humanReflexion, infomorphism);

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
 * Simulates the execution of an approved refactoring plan against the codebase to mathematically
 * analyze its structural impact and generate a quantifiable semantic drift score.
 * Acts as the final heuristic check before committing architectural changes.
 *
 * @async
 * @param {RefactorPlan} plan - The fully formed refactoring plan (including Tacit Habitus injections).
 * @returns {Promise<SemanticDiff>} A promise resolving to the structured semantic diff analysis containing intent changes and the drift score.
 */
export const generateSemanticDiff = async (plan: RefactorPlan): Promise<SemanticDiff> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const prompt = buildSemanticDiffPrompt(plan);

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  const data = JSON.parse(response.text || '{}');
  return { ...data, timestamp: new Date() };
};
