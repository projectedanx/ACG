import React from 'react';
import { EpistemicBias } from '../types';

interface AESADashboardProps {
  biases: EpistemicBias[];
  onMarkGoldenScar: (biasId: string) => void;
}

const AESADashboard: React.FC<AESADashboardProps> = ({ biases, onMarkGoldenScar }) => {
  if (biases.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Automated Epistemic Security Auditing (AESA)
        </h2>
        <span className="text-sm bg-orange-900 text-orange-300 px-3 py-1 rounded-full border border-orange-700">
          {biases.length} Biases Detected
        </span>
      </div>

      <p className="text-slate-400 text-sm mb-4">
        The system has scanned the consensus log for logical fallacies and "cognitive blind spots". Review these findings to prevent biased architectural decisions. You may elevate heuristic logic to a "Golden Scar" to preserve human intuition over AI strictness.
      </p>

      <div className="space-y-4">
        {biases.map((bias) => (
          <div
            key={bias.id}
            className={`p-4 rounded-lg border transition-all ${
              bias.isGoldenScar
                ? 'bg-amber-900/30 border-amber-500/50'
                : 'bg-slate-900 border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <h3 className={`font-semibold ${bias.isGoldenScar ? 'text-amber-400' : 'text-white'}`}>
                  {bias.type}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded uppercase tracking-wider ${
                  bias.severity === 'critical' ? 'bg-red-900 text-red-300' :
                  bias.severity === 'high' ? 'bg-orange-900 text-orange-300' :
                  bias.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-blue-900 text-blue-300'
                }`}>
                  {bias.severity}
                </span>
                {bias.isGoldenScar && (
                  <span className="text-xs bg-amber-500 text-amber-950 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    [Φ] Golden Scar
                  </span>
                )}
              </div>

              {!bias.isGoldenScar && (
                <button
                  onClick={() => onMarkGoldenScar(bias.id)}
                  className="text-xs bg-slate-700 hover:bg-amber-600 text-white px-3 py-1 rounded transition-colors flex items-center gap-1"
                  title="Elevate this heuristic logic to preserve it over AI strictness"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Mark as Golden Scar
                </button>
              )}
            </div>

            <p className="text-slate-300 text-sm">
              {bias.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AESADashboard;
