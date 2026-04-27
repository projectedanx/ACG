import * as fs from 'fs';
import * as yaml from 'js-yaml';

export interface CCDLSchema {
  metadata?: Record<string, any>;
  systemPrompt?: Record<string, any>;
  tools?: Record<string, any>[];
  inputSchema?: Record<string, any>;
  outputSchema?: Record<string, any>;
}

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
      const toolRegex = /####\s+\d+\.\s+([a-zA-Z0-9_-]+)\n+```yaml\n([\s\S]*?)\n```/g;

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

  return schema;
};
