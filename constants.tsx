
import { Persona } from './types';

export const PERSONAS: Persona[] = [
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
  }
];

export const INITIAL_DRIFT_DATA = [
  { timestamp: '2025-01-01', drift: 5 },
  { timestamp: '2025-01-10', drift: 12 },
  { timestamp: '2025-01-20', drift: 18 },
  { timestamp: '2025-02-01', drift: 15 },
];
