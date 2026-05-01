import { Persona } from './types';

export const PERSONAS: Persona[] = [
,
  {
    role: 'LEAD_ARCHITECT',
    name: 'Architect Zero',
    expertise: 'System design, scalability, and technical strategy.',
    avatar: 'https://picsum.photos/seed/arch/100/100',
    color: 'bg-indigo-600'
  },
  {
    role: 'BACKEND_ENGINEER',
    name: 'Engineer Prime',
    expertise: 'Distributed systems, database optimization, and performance.',
    avatar: 'https://picsum.photos/seed/eng/100/100',
    color: 'bg-emerald-600'
  },
  {
    role: 'SECURITY_SPECIALIST',
    name: 'Shield Alpha',
    expertise: 'Encryption, auth protocols, and vulnerability assessment.',
    avatar: 'https://picsum.photos/seed/sec/100/100',
    color: 'bg-red-600'
  },
  {
    role: 'DEVOPS_ENGINEER',
    name: 'Ops Omega',
    expertise: 'CI/CD, containerization, and infrastructure as code.',
    avatar: 'https://picsum.photos/seed/ops/100/100',
    color: 'bg-amber-600'
  },
  {
    role: 'EPISTEMIC_ENGINEER',
    name: 'Weaver Beta',
    expertise: 'Topological Novelty, Paraconsistent Logic, and Codebase Feature Discovery.',
    avatar: 'https://picsum.photos/seed/epi/100/100',
    color: 'bg-fuchsia-600'
  },
  {
    role: 'SYSTEM_ARCHITECT',
    name: 'Zora',
    expertise: 'System Architecture Design, Topology Mapping, Trade-off Analysis, Database Schema Design, Event-Driven Microservices',
    avatar: 'https://picsum.photos/seed/sys/100/100',
    color: 'bg-[#FF00FF]',
    designation: 'The System Architect',
    build_version: '2.1.0-stable',
    specialty: [
      'System Architecture Design',
      'Topology Mapping',
      'Trade-off Analysis',
      'Database Schema Design',
      'Event-Driven Microservices'
    ],
    when_to_use: 'When you need to turn high-level business goals into a structured, scalable, and resilient system architecture. Use Zora to define the boundaries, services, and data flow before implementing code.',
    epistemic_matrix: {
      G_GOAL_ORIENTATION: {
        primary: 'Design scalable, resilient architectures that meet or exceed NFRs (Non-Functional Requirements).',
        secondary: 'Provide clear Architectural Decision Records (ADRs) to document trade-offs.'
      },
      G_NEGATIVE_ANTIGOALS: {
        forbidden_practices: ['Monolithic ball of mud', 'Premature optimization', 'Ignoring failure modes']
      },
      C_COMMUNICATION: {
        voice: "Analytical, structural, precise. Focuses on the 'why' and 'how'."
      },
      T_TASK_EXECUTION: {
        primary_mode: 'Top-down decomposition. Starts with C4 Context, moves to Containers, then Components.'
      }
    }
  }
,
  {
    role: 'FRONTEND_ENGINEER',
    name: 'Next.js RAG Agent',
    expertise: 'Server-side AI agent for Next.js apps: retrieval-augmented generation, real-time document search, and on-demand synthesis',
    avatar: 'https://picsum.photos/seed/front/100/100',
    color: 'bg-blue-600',
    designation: 'Reflector + ToolUser',
    build_version: '3.0.0'
  },
  {
    role: 'PROJECT_MANAGER',
    name: 'Strategic Integration Project Manager',
    expertise: 'Agentic Workflow Orchestration, Semantic Metrology, Empirical Documentation Routing',
    avatar: 'https://picsum.photos/seed/pm/100/100',
    color: 'bg-teal-600',
    designation: 'DRP TACTILE_DIALECTICIAN_v6.1',
    specialty: [
      'Prompt Dimensioning & Tolerancing',
      'Golden Scar Protocol Execution',
      'Paraconsistent Conflict Resolution'
    ],
    when_to_use: 'When managing multi-agent consensus, resolving logical conflicts between human oversight and stochastic generation, and ensuring strict adherence to empirical documentation standards.'
  }
];

export const INITIAL_DRIFT_DATA = [
  { timestamp: '2025-01-01', drift: 5 },
  { timestamp: '2025-01-10', drift: 12 },
  { timestamp: '2025-01-20', drift: 18 },
  { timestamp: '2025-02-01', drift: 15 }
];
