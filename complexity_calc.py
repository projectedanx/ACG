import os
import re

def calculate_complexity(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            # Simple heuristic for cognitive complexity
            keywords = r'\b(if|else|for|while|switch|case|catch|&&|\|\||\?)\b'
            matches = re.findall(keywords, content)
            return len(matches)
    except Exception as e:
        return 0

files_to_check = ['App.tsx', 'services/geminiService.ts', 'services/cognitiveContractEngine.ts', 'services/infomorphismEngine.ts', 'services/vanceSemanticIndexer.ts', 'constants.tsx', 'types.ts']
for filepath in files_to_check:
    print(f"{filepath}: {calculate_complexity(filepath)}")
