/**
 * @fileoverview Parser for the Cognitive Contract Definition Language (CCDL).
 * Extracts structured schema definitions and configuration from markdown files.
 */

import * as yaml from 'js-yaml';

/**
 * Represents the extracted structure of a CCDL definition file.
 * @interface CCDLSchema
 * @property {Record<string, any>} [metadata] - General information about the definition.
 * @property {Record<string, any>} [systemPrompt] - The core system prompt spec.
 * @property {Record<string, any>[]} [tools] - Array of parsed tool configurations.
 * @property {Record<string, any>} [inputSchema] - Parsed JSON defining input requirements.
 * @property {Record<string, any>} [outputSchema] - Parsed JSON defining output structure.
 * @property {Record<string, any>} [pdtSpecification] - Parsed YAML for Prompt Dimensioning & Tolerancing.
 */
export interface CCDLSchema {
  metadata?: Record<string, any>;
  systemPrompt?: Record<string, any>;
  tools?: Record<string, any>[];
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
  pdtSpecification?: Record<string, any>;
}

/**
 * Parses a markdown string containing CCDL definitions into a structured object.
 * Searches for specific headers and extracts embedded YAML/JSON blocks.
 *
 * @param {string} markdownContent - The raw text of the markdown file (e.g., AGENTS.md).
 * @returns {CCDLSchema} The parsed configuration schema.
 */
export const parseCCDL = (markdownContent: string): CCDLSchema => {
  const schema: CCDLSchema = {
    tools: []
  };

  const extractYAMLBlock = (content: string, heading: string): Record<string, any> | null => {
    // Look for heading, allowing for any markdown structure between heading and yaml block
    const regex = new RegExp(`##+\\s+${heading}[\\s\\S]*?\\n\\x60\\x60\\x60yaml\\n([\\s\\S]*?)\\n\\x60\\x60\\x60`, 'i');
    const match = content.match(regex);
    if (!match) return null;

    try {
        return yaml.load(match[1]) as Record<string, any>;
    } catch (e) {
      console.error(`Failed to parse YAML block for ${heading}`, e);
      return null;
    }
  };

  const extractJSONBlock = (content: string, heading: string): Record<string, any> | null => {
      const regex = new RegExp(`##+\\s+${heading}[\\s\\S]*?\\n\\x60\\x60\\x60json\\n([\\s\\S]*?)\\n\\x60\\x60\\x60`, 'i');
      const match = content.match(regex);
      if (!match) return null;
      try {
          return JSON.parse(match[1]);
      } catch (e) {
          console.error(`Failed to parse JSON block for ${heading}`, e);
          return null;
      }
  };

  const extractTools = (content: string): Record<string, any>[] => {
      const tools: Record<string, any>[] = [];
      const registryMatch = content.match(/###\s+Tools Registry([\s\S]*?)---/);
      if (!registryMatch) return tools;

      const registryContent = registryMatch[1];
      const toolRegex = /####\s+(?:\d+\.\s+)?([a-zA-Z0-9_-]+)\n+```yaml\n([\s\S]*?)\n```/g;

      let match;
      while ((match = toolRegex.exec(registryContent)) !== null) {
          try {
            const toolConfig = yaml.load(match[2]) as Record<string, any>;
            tools.push(toolConfig);
          } catch(e) {
            console.error(`Failed to parse Tool yaml for ${match[1]}`, e);
          }
      }
      return tools;
  };

  schema.metadata = extractYAMLBlock(markdownContent, 'Metadata') || {};
  schema.systemPrompt = extractYAMLBlock(markdownContent, 'System Prompt Spec') || {};
  schema.inputSchema = extractJSONBlock(markdownContent, 'Input Schema') || {};
  schema.outputSchema = extractJSONBlock(markdownContent, 'Output Schema') || {};
  schema.tools = extractTools(markdownContent);
  schema.pdtSpecification = extractYAMLBlock(markdownContent, 'PDT_SPECIFICATION_BLOCK') || {};

  return schema;
};
