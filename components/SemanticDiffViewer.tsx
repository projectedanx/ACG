
import React from 'react';
import { RefactorPlan, SemanticDiff } from '../types';

interface Props {
  plan: RefactorPlan | null;
  diff: SemanticDiff | null;
  onExecute: () => void;
  isProcessing: boolean;
}

const SemanticDiffViewer: React.FC<Props> = ({ plan, diff, onExecute, isProcessing }) => {
  if (!plan) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800">Governance Review: Semantic Proposal</h2>
        {plan.status === 'draft' && (
          <button
            onClick={onExecute}
            disabled={isProcessing}
            className="px-4 py-1.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {isProcessing ? 'Simulating Analysis...' : 'Approve & Analyze Drift'}
          </button>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Refactor Plan</h3>
          <div className="bg-slate-900 rounded-lg p-5 text-indigo-300 code-font text-sm">
            <p className="text-white font-bold mb-2">// Proposed Goal: {plan.goal}</p>
            <p className="mb-4 text-slate-400">/* {plan.consensusSummary} */</p>

            {plan.humanReflexion && (
              <div className="mb-4 p-3 border border-amber-500/30 bg-amber-500/10 rounded-md">
                <p className="text-amber-400 font-bold mb-1">// Tacit Habitus / Golden Scar (Φ = 1.618)</p>
                <p className="text-amber-200/80 italic">/* "{plan.humanReflexion}" */</p>
              </div>
            )}

            <div className="space-y-1">
              {plan.tasks.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-slate-600">{idx + 1}.</span>
                  <span><span className="text-emerald-400">[{t.impact.toUpperCase()}]</span> {t.file}: {t.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {diff && (
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Semantic Integrity Analysis</h3>
            <div className="space-y-4">
              {diff.changes.map((c, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 code-font">{c.file}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded font-bold uppercase tracking-wider">Semantic Diff</span>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase">Original Intent</p>
                      <p className="text-slate-600 italic">"{c.originalIntent}"</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase">New Intent</p>
                      <p className="text-indigo-600 font-medium">"{c.newIntent}"</p>
                    </div>
                    <div className="md:col-span-2 pt-2 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">Structural Impact</p>
                      <p className="text-slate-700">{c.structuralImpact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemanticDiffViewer;
