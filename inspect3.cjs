const fs = require('fs');
const code = fs.readFileSync('types.ts', 'utf-8');
const exportsList = [...code.matchAll(/export (const|function|class|interface|type) (\w+)/g)].map(m => m[2]);
console.log('types.ts Exports:', exportsList);
