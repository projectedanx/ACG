import * as fs from 'fs';
import * as path from 'path';
import { parseCCDL } from '../services/ccdlParser.js';

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
