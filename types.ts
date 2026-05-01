
export type AgentRole = 'LEAD_ARCHITECT' | 'BACKEND_ENGINEER' | 'SECURITY_SPECIALIST' | 'DEVOPS_ENGINEER' | 'EPISTEMIC_ENGINEER' | 'SYSTEM_ARCHITECT' | 'FRONTEND_ENGINEER';

export interface Persona {
  role: AgentRole;
  name: string;
  expertise: string;
  avatar: string;
  color: string;
  designation?: string;
  build_version?: string;
  specialty?: string[];
  when_to_use?: string;
  epistemic_matrix?: any;
}

export interface GroundingLink {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  sender: string;
  role: AgentRole;
  content: string;
  timestamp: Date;
  citations?: GroundingLink[];
}

export interface RefactorTask {
  file: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

export interface RefactorPlan {
  id: string;
  goal: string;
  tasks: RefactorTask[];
  consensusSummary: string;
  humanReflexion?: string;
  status: 'draft' | 'approved' | 'rejected' | 'executed';
}

export interface SemanticDiff {
  id: string;
  planId: string;
  summary: string;
  changes: {
    file: string;
    originalIntent: string;
    newIntent: string;
    structuralImpact: string;
  }[];
  driftScore: number; // 0-100
  timestamp: Date;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: Date;
}


export type WorkflowState = 'idle' | 'deliberating' | 'awaiting_reflexion' | 'synthesizing' | 'review';

export interface AppState {
  goal: string;
  selectedPersonas: Record<AgentRole, string>;
  isDeepThinking: boolean;
  isWebSearch: boolean;
  messages: Message[];
  currentPlan: RefactorPlan | null;
  diffs: SemanticDiff[];
  auditLogs: AuditLogEntry[];
  isProcessing: boolean;
  workflowState: WorkflowState;
  humanReflexionInput: string;
}
