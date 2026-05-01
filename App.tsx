
import React, { useState, useCallback } from 'react';
import { AppState, AgentRole, Message, RefactorPlan, SemanticDiff, AuditLogEntry, EpistemicBias } from './types';
import { PERSONAS } from './constants';
import ControlPanel from './components/ControlPanel';
import AgentPersonaSelector from './components/AgentPersonaSelector';
import ConsensusPanel from './components/ConsensusPanel';
import SemanticDiffViewer from './components/SemanticDiffViewer';
import ReflexiveInjectionPanel from './components/ReflexiveInjectionPanel';
import DriftDashboard from './components/DriftDashboard';
import AESADashboard from './components/AESADashboard';
import { getConsensusDiscussion, generateSymbioticPlan, generateSemanticDiff, analyzeEpistemicBiases } from './services/geminiService';
import { simulateZAxis } from './services/zAxisInference';


const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    goal: '',
    selectedPersonas: PERSONAS.reduce((acc, p) => ({ ...acc, [p.role]: p.name }), {} as Record<AgentRole, string>),
    isDeepThinking: true, // Default to deep thinking for architecture
    isWebSearch: false,
    messages: [],
    currentPlan: null,
    diffs: [],
    auditLogs: [],
    isProcessing: false,
    workflowState: 'idle',
    humanReflexionInput: '',
    biases: [],
  });

  const addAuditLog = (action: string, details: string) => {
    const entry: AuditLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      action,
      user: 'Architect Admin',
      details,
      timestamp: new Date(),
    };
    setState(prev => ({ ...prev, auditLogs: [entry, ...prev.auditLogs] }));
  };


  const handleMarkGoldenScar = useCallback((biasId: string) => {
    setState(prev => ({
      ...prev,
      biases: prev.biases.map(b =>
        b.id === biasId ? { ...b, isGoldenScar: true } : b
      )
    }));

    const bias = state.biases.find(b => b.id === biasId);
    if (bias) {
      addAuditLog(
        'Golden Scar Protocol Engaged',
        `Assigned weight [Φ = 1.618] to marginalized logic identified as "${bias.type}". AI critique preserved in superposition.`
      );
    }
  }, [state.biases]);

  const handleInitiateConsensus = async () => {
    setState(prev => ({ ...prev, isProcessing: true, messages: [], currentPlan: null }));
    addAuditLog('Orchestration Start', `Mode: ${state.isDeepThinking ? 'Deep Thinking' : 'Standard'} | Search: ${state.isWebSearch ? 'Enabled' : 'Disabled'}`);

    if (state.isDeepThinking && state.isWebSearch) {
      addAuditLog('PIRK Engaged', 'Contradictory constraints detected. Activating Z-Axis Inference (Phantom Dimension).');
      const zAxisResult = simulateZAxis();
      if (zAxisResult.success) {
        addAuditLog(
          'Paraconsistent State (B) Established',
          `Topological Novelty (B1) validated. Initial Div: ${zAxisResult.initialDivergence.toFixed(4)} -> Z-Axis Div: ${zAxisResult.newDivergence.toFixed(4)}`
        );
      } else {
        addAuditLog('PIRK Failure', 'Failed to establish Paraconsistent State.');
      }
    }

    try {
      const activePersonas = PERSONAS.filter(p => state.selectedPersonas[p.role] === p.name);
      const { text: discussionContent, citations } = await getConsensusDiscussion(
        state.goal, 
        activePersonas, 
        state.isDeepThinking, 
        state.isWebSearch
      );
      
      let formattedMessages: Message[] = [];
      
      try {
        // Try parsing JSON first (if not in search mode)
        const parsed = JSON.parse(discussionContent);
        formattedMessages = parsed.map((m: any, idx: number) => ({
          id: `msg-${idx}`,
          sender: m.sender,
          role: m.role as AgentRole,
          content: m.content,
          timestamp: new Date(),
          citations: citations.length > 0 ? citations : undefined
        }));
      } catch (e) {
        // Fallback for conversational responses (usually from Search mode)
        formattedMessages = [{
          id: 'msg-root',
          sender: "Team Consensus",
          role: "LEAD_ARCHITECT",
          content: discussionContent,
          timestamp: new Date(),
          citations: citations.length > 0 ? citations : undefined
        }];
      }

      setState(prev => ({ ...prev, messages: formattedMessages, workflowState: 'awaiting_reflexion' }));
      addAuditLog('Consensus Achieved', `Synthesized ${formattedMessages.length} agent reports.`);
      addAuditLog('Awaiting Reflexion', 'AI orchestration paused. Awaiting human Tacit Habitus injection (Golden Scar Protocol).');

      // [⊘] Run AESA asynchronously to avoid blocking the UI
      analyzeEpistemicBiases(formattedMessages).then(biases => {
        if (biases.length > 0) {
          setState(prev => ({ ...prev, biases }));
          addAuditLog('AESA Scan Complete', `Detected ${biases.length} potential epistemic biases/fallacies in the consensus log.`);
        }
      });
    } catch (error) {
      console.error(error);
      alert('Orchestration failed. Please verify API configuration.');
      setState(prev => ({ ...prev, workflowState: 'idle' }));
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleSynthesizePlan = async () => {
    setState(prev => ({ ...prev, isProcessing: true, workflowState: 'synthesizing' }));
    addAuditLog('Synthesis Initiated', 'Fusing formal AI topology with human Tacit Habitus (Φ = 1.618).');

    try {
      const discussionContent = JSON.stringify(state.messages.map(m => ({ sender: m.sender, role: m.role, content: m.content })));
      const plan = await generateSymbioticPlan(state.goal, discussionContent, state.humanReflexionInput);
      setState(prev => ({ ...prev, currentPlan: plan, workflowState: 'review' }));
      addAuditLog('Symbiotic Plan Finalized', `Ontological Shear resolved. Strategy mapped across ${plan?.tasks?.length || 0} modules.`);
    } catch (error) {
      console.error(error);
      alert('Synthesis failed.');
      setState(prev => ({ ...prev, workflowState: 'awaiting_reflexion' }));
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleApprovePlan = async () => {
    if (!state.currentPlan) return;
    setState(prev => ({ ...prev, isProcessing: true }));
    addAuditLog('Governance Sign-off', `Human approval recorded for ${state.currentPlan.id}`);

    try {
      const diff = await generateSemanticDiff(state.currentPlan);
      setState(prev => ({ 
        ...prev, 
        currentPlan: { ...prev.currentPlan!, status: 'executed' },
        diffs: [...prev.diffs, diff] 
      }));
      addAuditLog('Drift Analysis', `Semantic integrity drift: ${diff.driftScore}%`);
    } catch (error) {
      console.error(error);
      alert('Semantic diff simulation encountered an error.');
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const updatePersona = (role: AgentRole, name: string) => {
    setState(prev => ({
      ...prev,
      selectedPersonas: { ...prev.selectedPersonas, [role]: name }
    }));
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 border-b border-indigo-500/30 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg ring-2 ring-white/10">Ω</div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase italic">Arch-Consensus <span className="text-indigo-400">Governance</span></h1>
              <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold">System Reliability & Integrity Protocol</p>
            </div>
          </div>
          <div className="hidden sm:flex gap-6 items-center">
            <div className="text-right border-r border-slate-700 pr-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Agents Active</p>
              <p className="text-sm font-black text-indigo-400">{PERSONAS.length} / {PERSONAS.length} Online</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase">System Status</p>
              <p className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span> Secure
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Governance Logs */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Provenance Log</h3>
              <div className="px-2 py-0.5 bg-slate-200 rounded text-[9px] font-bold text-slate-600">v2.0</div>
            </div>
            <div className="p-4 space-y-5 max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin">
              {state.auditLogs.map((log) => (
                <div key={log.id} className="relative pl-4 border-l-2 border-indigo-500/30 hover:border-indigo-500 transition-colors py-1 group">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{log.action}</p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">{log.details}</p>
                  <p className="text-[9px] font-mono text-slate-400 mt-2">{log.timestamp.toLocaleTimeString()}</p>
                </div>
              ))}
              {state.auditLogs.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-slate-200 mb-2">
                    <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Awaiting Activity</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl shadow-indigo-200">
            <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-3">Governance Directives</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5"></div>
                <p className="text-[11px] leading-relaxed text-indigo-50">All structural changes require multi-agent consensus validation.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5"></div>
                <p className="text-[11px] leading-relaxed text-indigo-50">Human approval is mandatory for production drift analysis.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="lg:col-span-3 space-y-8 pb-12">
          <AgentPersonaSelector 
            selectedPersonas={state.selectedPersonas} 
            onSelect={updatePersona} 
          />

          <ControlPanel 
            goal={state.goal}
            setGoal={(g) => setState(prev => ({ ...prev, goal: g }))}
            isDeepThinking={state.isDeepThinking}
            setIsDeepThinking={(b) => setState(prev => ({ ...prev, isDeepThinking: b }))}
            isWebSearch={state.isWebSearch}
            setIsWebSearch={(b) => setState(prev => ({ ...prev, isWebSearch: b }))}
            onInitiate={handleInitiateConsensus}
            isProcessing={state.isProcessing}
          />


          <DriftDashboard diffs={state.diffs} />

          <AESADashboard
            biases={state.biases}
            onMarkGoldenScar={handleMarkGoldenScar}
          />


          <ConsensusPanel messages={state.messages} />

          <ReflexiveInjectionPanel
            workflowState={state.workflowState}
            humanReflexionInput={state.humanReflexionInput}
            setHumanReflexionInput={(val) => setState(prev => ({ ...prev, humanReflexionInput: val }))}
            onSynthesize={handleSynthesizePlan}
            isProcessing={state.isProcessing}
          />

          <SemanticDiffViewer 
            plan={state.currentPlan} 
            diff={state.diffs.find(d => d.planId === state.currentPlan?.id) || null}
            onExecute={handleApprovePlan}
            isProcessing={state.isProcessing}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
