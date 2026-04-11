
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AgentRole, Persona, RefactorPlan, SemanticDiff, GroundingLink } from "../types";

export const getConsensusDiscussion = async (
  goal: string, 
  personas: Persona[], 
  isDeepThinking: boolean, 
  isWebSearch: boolean
): Promise<{ text: string; citations: GroundingLink[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const personaContext = personas.map(p => `${p.name} (${p.role}): ${p.expertise}`).join('\n');
  
  const prompt = `
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

export const generateRefactorPlan = async (goal: string, discussion: string): Promise<RefactorPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const prompt = `
    Based on the following architectural goal and discussion:
    Goal: ${goal}
    Discussion: ${discussion}
    
    Create a formal refactoring plan.
    Return a JSON object with:
    {
      "id": "uuid",
      "goal": "summarized goal",
      "tasks": [{"file": "path/to/file", "description": "task", "impact": "low|medium|high"}],
      "consensusSummary": "final conclusion",
      "status": "draft"
    }
  `;

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

  return JSON.parse(response.text || '{}');
};

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
