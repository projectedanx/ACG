
import React from 'react';

interface Props {
  goal: string;
  setGoal: (g: string) => void;
  isDeepThinking: boolean;
  setIsDeepThinking: (b: boolean) => void;
  isWebSearch: boolean;
  setIsWebSearch: (b: boolean) => void;
  onInitiate: () => void;
  isProcessing: boolean;
}

const ControlPanel: React.FC<Props> = ({ 
  goal, setGoal, isDeepThinking, setIsDeepThinking, isWebSearch, setIsWebSearch, onInitiate, isProcessing 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Refactoring Initiation</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Architectural Objective</label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Migrate the PaymentService to a microservice architecture..."
            className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
          />
        </div>
        
        <div className="flex flex-wrap gap-6 items-center">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={isDeepThinking} 
                onChange={() => setIsDeepThinking(!isDeepThinking)}
                className="sr-only" 
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${isDeepThinking ? 'bg-indigo-600' : 'bg-slate-300'}`} />
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isDeepThinking ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Deep Thinking Mode</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={isWebSearch} 
                onChange={() => setIsWebSearch(!isWebSearch)}
                className="sr-only" 
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${isWebSearch ? 'bg-indigo-600' : 'bg-slate-300'}`} />
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isWebSearch ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Web Search Mode</span>
          </label>

          <button
            onClick={onInitiate}
            disabled={!goal || isProcessing}
            className={`ml-auto px-6 py-2 rounded-lg font-semibold transition-all ${
              !goal || isProcessing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isProcessing ? 'Agent Deliberation...' : 'Start Consensus Workflow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
