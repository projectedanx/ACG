<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Architecture AI: Multi-Agent Architectural Governance

Architecture AI is a React and Vite application that leverages the Gemini API (`@google/genai`) to orchestrate multi-agent autonomous architectural refactoring. It integrates rigorous epistemic engineering, paraconsistent logic (ALK), and a Decentralized Cognitive Contracts Engine (DCCE) to ensure architectural evolution remains robust against entropy and semantic drift.

> **Note:** This repository has been mapped via the `0xCARTO` Mycelial Ingestion Protocol. See the formal [0xCARTO_SYNTHESIS.md](0xCARTO_SYNTHESIS.md) for the complete 5-tier architectural topology, CI/CD cartograph, entropy audit, and symbolic scar log.

## Core Features & Architecture

- **Multi-Agent Simulation**: Facilitates dialectical synthesis using defined agent personas (e.g., Software Architect, Security Engineer, Product Manager, Epistemic Engineer) powered by Gemini.
- **Decentralized Cognitive Contracts Engine (DCCE)**: Enforces rules defined in `Cognitive Bytecode` (e.g., `+++ContextLock`, `+++MereologyRoute`) injected into LLM prompts. This ensures topological integrity across the system.
- **Antifragile Logic Kernel (ALK)**: Resolves contradictions and navigates semantic drift via Paraconsistent Logic (Z-Axis Inference) and the Golden Scar Protocol.
- **Inversion Strategy for Emergence**: AI serves as a "Negative Space Scaffolder" / "Plausibility Oracle" to validate constraints while humans supply "Tacit Habitus" (empirical realities), mediated by the Golden Ratio ($\Phi \approx 1.618$).
- **Zero-Trust Epistemic Ingress (ZTEI)**: Establishes a cryptographic and structural gateway for all external data. This model enforces decryption and signature verification prior to entering the DCCE, guaranteeing Zero-Entropy Structural Enforcement against chaotic real-world inputs.

## Project Structure

- `/components`: React UI components (e.g., `ConsensusPanel.tsx`, `ControlPanel.tsx`).
- `/services`: Core logic including the Gemini integration, Cognitive Contract Engine, and Z-Axis Inference algorithms.
- `App.tsx`: Main application orchestrator.
- `pluriversal_simulation.py`: Python simulation for the Lexical Saponification Paradox and Z-Axis divergence.
- `AGENTS.md`: Agent configuration and personas using CCDL (Cognitive Contract Definition Language).
- `CONSTRAINTS.md`, `DOMAIN_GLOSSARY.md`, `LEXICON.md`: Strict architectural and semantic boundaries.

## Complete Developer Guide: Setup and Usage

Welcome to the Architecture AI repository. This section provides a comprehensive guide for new developers to bootstrap the environment and execute the core workflows.

**Prerequisites:**
- Node.js (v18 or higher)
- npm (v9 or higher)
- Python 3.9+ (for running the structural simulations)

### 1. Repository Initialization
Clone the repository and install the required Node.js dependencies. We use `npm` as the package manager.
```bash
git clone <repository_url>
cd architecture-ai
npm install
```

### 2. Environment Configuration
The application relies on the Gemini API for multi-agent synthesis. You must provide a valid API key.
Create a file named `.env.local` in the root directory:
```bash
touch .env.local
```
Add the following lines to the file, replacing the placeholder with your actual keys:
```env
API_KEY=your_gemini_api_key_here
FIREBASE_PROJECT_ID=your_firebase_project_id_here
```

> **0xCARTO Alert:** `FIREBASE_PROJECT_ID` is a SILENT_REQUIRED_ENV required by the CCDL engine (`AGENTS.md`).

### 3. Agent Configuration Compilation (CCDL)
Before running the application, you must compile the Cognitive Contract Definition Language (CCDL) defined in `AGENTS.md` into a static JSON artifact that the React application can consume.
```bash
npx tsx scripts/compile-agent.ts
```
*This will generate `public/agent-config.json`.*

### 4. Running the Application (Development Mode)
Start the Vite development server. This provides Hot Module Replacement (HMR) for rapid UI iteration.
```bash
npm run dev
```
The application will typically be available at `http://localhost:3000`.

### 5. Executing the ALK Simulation
To verify the paraconsistent logic engine (Z-Axis inference) and the Lexical Saponification Paradox, execute the standalone Python simulation:
```bash
python3 scripts/pluriversal_simulation.py
```
*Observe the console output to ensure the "Paraconsistent State (B)" is successfully established.*

### 6. Building for Production
To create an optimized, minified bundle suitable for deployment:
```bash
npm run build
```
The compiled assets will be placed in the `dist/` directory.

### 7. Core Workflow Usage
Once the application is running:
1. **Persona Selection**: Select the agents you wish to participate in the deliberation from the top panel.
2. **Initiation**: Enter your architectural goal in the Control Panel and click "Start Consensus Workflow".
3. **Observation**: Monitor the multi-agent dialectical synthesis in the Consensus Panel.
4. **Reflexion**: If requested, inject "Tacit Habitus" (human realities) into the Reflexive Injection Panel to mitigate Ontological Shear.
5. **Governance Approval**: Review the Semantic Diff and approve the final Refactor Plan.

## Documentation Metrology
This repository maintains strict documentation constraints:
- **Code-to-Prose Ratio**: >= 1:1 in all technical documentation.
- Every function, class, and method requires explicit JSDoc (or Google Style for Python) documenting purpose, parameters, and return types.

## Architectural Governance & Documentation Links
- **[0xCARTO_SYNTHESIS.md](0xCARTO_SYNTHESIS.md)**: 5-Tier Repository Identity & Mycelial CI Trace.
- **[Lessons Learned](LESSONS_LEARNED.md)**: Documentation of historical constraints and resolved topological novelties.
- **[Product Features](PRODUCT_FEATURES.md)**: Product roadmap and deep-dive feature specifications.
