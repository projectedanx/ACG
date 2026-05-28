/**
 * @fileoverview Script to compile the AGENTS.md CCDL definitions into a JSON configuration.
 * Parses the markdown and outputs the structural schema to the public directory.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseCCDL } from '../services/ccdlParser.js';

/**
 * Main execution function for the agent compilation process.
 * Acts as the build-step ingestion mechanism, reading the declarative AGENTS.md file,
 * parsing the structured Cognitive Contract Definition Language (CCDL), and emitting
 * a static, deterministic JSON artifact to the public directory for runtime consumption.
 *
 * @returns {void} Returns nothing, but writes 'public/agent-config.json' to disk.
 */
const run = () => {
  const agentsFilePath = path.join(process.cwd(), 'AGENTS.md');
  const outputFilePath = path.join(process.cwd(), 'public', 'agent-config.json');

  if (!fs.existsSync(agentsFilePath)) {
    console.error(`Error: ${agentsFilePath} not found.`);
    process.exit(1);
  }

  const markdownContent = fs.readFileSync(agentsFilePath, 'utf8');

  console.log('Parsing AGENTS.md...');
  const schema = parseCCDL(markdownContent);

  if (!fs.existsSync(path.dirname(outputFilePath))) {
      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(schema, null, 2), 'utf8');
  console.log(`Agent configuration compiled successfully to ${outputFilePath}`);
};

run();
