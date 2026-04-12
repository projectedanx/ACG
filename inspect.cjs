const fs = require('fs');
['constants.tsx', 'services/geminiService.ts', 'components/ConsensusPanel.tsx', 'components/DriftDashboard.tsx'].forEach(f => {
  const code = fs.readFileSync(f, 'utf-8');
  console.log(`\n\n--- ${f} ---`);
  // Find exports and interfaces
  const exports = [...code.matchAll(/export (const|function|class|interface|type) (\w+)/g)].map(m => m[2]);
  const defaultExport = code.match(/export default (\w+)/)?.[1];
  const interfaces = [...code.matchAll(/interface (\w+)/g)].map(m => m[1]);
  console.log('Exports:', exports);
  console.log('Default Export:', defaultExport);
  console.log('Interfaces:', interfaces);
});
