import React from 'react';
import { WorkflowState } from '../types';

interface Props {
  workflowState: WorkflowState;
  humanReflexionInput: string;
  setHumanReflexionInput: (val: string) => void;
  onSynthesize: () => void;
  isProcessing: boolean;
}

/**
 * Renders a text area allowing human operators to inject empirical realities
 * (Ontological Shear mitigation) before the formal architectural plan is synthesized.
 *
 * @param {Props} props - Component properties.
 * @returns {JSX.Element} The rendered input panel.
 */
/**
 * Renders a text area allowing human operators to inject empirical realities
 * (Ontological Shear mitigation) before the formal architectural plan is synthesized.
 *
 * @param {Props} props - Component properties.
 * @returns {JSX.Element} The rendered input panel.
 */
const ReflexiveInjectionPanel: React.FC<Props> = ({
  workflowState,
  humanReflexionInput,
  setHumanReflexionInput,
  onSynthesize,
  isProcessing
}) => {
  if (workflowState !== 'awaiting_reflexion' && workflowState !== 'synthesizing') {
    return null;
  }

  return (
    <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-200 mb-6 relative overflow-hidden">
      {/* Decorative background element representing the "Golden Scar" */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-md">
            Φ
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-900">Symbiotic Reflexive Refactoring (SRR)</h2>
            <p className="text-[11px] uppercase tracking-widest text-amber-700 font-bold">Inject Tacit Habitus / Operational Friction</p>
          </div>
        </div>

        <p className="text-sm text-amber-800 mb-4 leading-relaxed">
          The AI has deliberated on the formal topological structure. However, this structure lacks grounding in your empirical, localized reality.
          Please define the <strong>"Golden Scar"</strong>—the informal constraints, unwritten rules, or physical team realities that the AI cannot know.
          This input will be given a weight of $\Phi = 1.618$ to prevent <em>Ontological Shear</em>.
        </p>

        <textarea
          value={humanReflexionInput}
          onChange={(e) => setHumanReflexionInput(e.target.value)}
          placeholder="e.g., The legacy payment API often drops connections during peak hours, and the ops team only works in ET timezone. We cannot rely purely on the event bus."
          className="w-full h-32 p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none mb-4 bg-white/80 backdrop-blur-sm shadow-inner"
          disabled={isProcessing}
        />

        <div className="flex justify-end">
          <button
            onClick={onSynthesize}
            disabled={!humanReflexionInput.trim() || isProcessing}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              !humanReflexionInput.trim() || isProcessing
                ? 'bg-amber-200 text-amber-500 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isProcessing ? 'Synthesizing Golden Scar...' : 'Execute Protocol (Synthesize Plan)'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflexiveInjectionPanel;
