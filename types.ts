/**
 * @fileoverview Type definitions for the Architecture AI application.
 * Defines the core data structures, agent roles, and application state.
 */

/**
 * Defines the available roles for the autonomous agents.
 */
export type AgentRole = 'LEAD_ARCHITECT' | 'BACKEND_ENGINEER' | 'SECURITY_SPECIALIST' | 'DEVOPS_ENGINEER' | 'EPISTEMIC_ENGINEER' | 'SYSTEM_ARCHITECT' | 'FRONTEND_ENGINEER' | 'PROJECT_MANAGER';

/**
 * Represents an AI agent persona configuration.
 * @interface Persona
 * @property {AgentRole} role - The designated role of the agent.
 * @property {string} name - The display name of the agent.
 * @property {string} expertise - Description of the agent's specific domain knowledge.
 * @property {string} avatar - URL or path to the agent's avatar image.
 * @property {string} color - Hex code or CSS color string for UI representation.
 * @property {string} [designation] - Optional internal system designation.
 * @property {string} [build_version] - Optional version string of the agent model.
 * @property {string[]} [specialty] - Optional list of specific technical specialties.
 * @property {string} [when_to_use] - Optional guidance on when to invoke this persona.
 * @property {any} [epistemic_matrix] - Optional cognitive biases or logical framework matrix.
 */
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

/**
 * Represents a citation or reference source used by an agent.
 * @interface GroundingLink
 * @property {string} uri - The URL or identifier of the source.
 * @property {string} title - The display title of the source.
 */
export interface GroundingLink {
  uri: string;
  title: string;
}

/**
 * Represents a single message in the multi-agent discussion.
 * @interface Message
 * @property {string} id - Unique identifier for the message.
 * @property {string} sender - The name of the agent who sent the message.
 * @property {AgentRole} role - The role of the sending agent.
 * @property {string} content - The actual text content of the message.
 * @property {Date} timestamp - The time the message was generated.
 * @property {GroundingLink[]} [citations] - Optional array of sources referenced in the message.
 */
export interface Message {
  id: string;
  sender: string;
  role: AgentRole;
  content: string;
  timestamp: Date;
  citations?: GroundingLink[];
}

/**
 * Represents a single actionable task in a refactoring plan.
 * @interface RefactorTask
 * @property {string} file - The file path to be modified.
 * @property {string} description - Details of the changes to be made.
 * @property {'low' | 'medium' | 'high'} impact - The estimated structural impact of the change.
 */
export interface RefactorTask {
  file: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

/**
 * Represents a comprehensive plan proposed by the multi-agent consensus.
 * @interface RefactorPlan
 * @property {string} id - Unique identifier for the plan.
 * @property {string} goal - The original objective this plan addresses.
 * @property {RefactorTask[]} tasks - Array of specific modifications.
 * @property {string} consensusSummary - A summary of how the agents agreed on this plan.
 * @property {string} [humanReflexion] - Optional feedback provided by a human user (Tacit Habitus).
 * @property {'draft' | 'approved' | 'rejected' | 'executed'} status - The current execution state of the plan.
 */
export interface RefactorPlan {
  id: string;
  goal: string;
  tasks: RefactorTask[];
  consensusSummary: string;
  humanReflexion?: string;
  status: 'draft' | 'approved' | 'rejected' | 'executed';
}

/**
 * Represents an analysis of structural drift and intent changes.
 * @interface SemanticDiff
 * @property {string} id - Unique identifier for the diff analysis.
 * @property {string} planId - The ID of the refactoring plan this diff corresponds to.
 * @property {string} summary - High-level overview of the semantic shifts.
 * @property {Array<{file: string, originalIntent: string, newIntent: string, structuralImpact: string}>} changes - Detailed breakdown of intent shifts per file.
 * @property {number} driftScore - A calculated metric (0-100) indicating the degree of deviation from the original architecture.
 * @property {Date} timestamp - The time the analysis was performed.
 */
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

/**
 * Represents an entry in the system's historical audit trail.
 * @interface AuditLogEntry
 * @property {string} id - Unique identifier for the log entry.
 * @property {string} action - The type of action performed.
 * @property {string} user - The entity (human or agent) that performed the action.
 * @property {string} details - Additional contextual information about the action.
 * @property {Date} timestamp - The time the action occurred.
 */
export interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: Date;
}

/**
 * Represents a detected logical fallacy, bias, or cognitive illiberalism.
 * @interface EpistemicBias
 * @property {string} id - Unique identifier for the detected bias.
 * @property {string} type - The classification of the bias (e.g., "Conway's Law").
 * @property {string} description - Explanation of how the bias is manifesting.
 * @property {'low' | 'medium' | 'high' | 'critical'} severity - The risk level posed by the bias.
 * @property {string} sourceMessageId - The ID of the message that exhibited this bias.
 * @property {boolean} isGoldenScar - Whether this bias has been codified into the Golden Scar Protocol.
 */
export interface EpistemicBias {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourceMessageId: string;
  isGoldenScar: boolean;
}

/**
 * Defines the possible states of the application's processing pipeline.
 */
export type WorkflowState = 'idle' | 'deliberating' | 'awaiting_reflexion' | 'synthesizing' | 'review';

/**
 * Represents the complete global state of the application.
 * @interface AppState
 * @property {string} goal - The current user objective or query.
 * @property {Record<AgentRole, string>} selectedPersonas - Map of selected agent names by their role.
 * @property {boolean} isDeepThinking - Flag indicating if deep analytical processing is enabled.
 * @property {boolean} isWebSearch - Flag indicating if external web searching is permitted.
 * @property {Message[]} messages - The current dialogue history.
 * @property {RefactorPlan | null} currentPlan - The currently active or proposed refactoring plan.
 * @property {SemanticDiff[]} diffs - Historical and current semantic diff analyses.
 * @property {AuditLogEntry[]} auditLogs - The chronological ledger of system actions.
 * @property {boolean} isProcessing - Flag indicating if an asynchronous operation is in progress.
 * @property {WorkflowState} workflowState - The current stage of the execution pipeline.
 * @property {string} humanReflexionInput - Temporary storage for human feedback before submission.
 * @property {EpistemicBias[]} biases - List of currently detected cognitive biases.
 */
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
  biases: EpistemicBias[];
}
