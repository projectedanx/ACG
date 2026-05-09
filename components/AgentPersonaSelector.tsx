
/**
 * @fileoverview UI Component for selecting agent personas for the governance council.
 */

import React from 'react';
import { PERSONAS } from '../constants';
import { AgentRole } from '../types';

/**
 * Props for the AgentPersonaSelector component.
 * @interface Props
 * @property {Record<AgentRole, string>} selectedPersonas - Map of currently selected persona names keyed by their role.
 * @property {(role: AgentRole, personaName: string) => void} onSelect - Callback fired when an agent card is clicked.
 */
interface Props {
  selectedPersonas: Record<AgentRole, string>;
  onSelect: (role: AgentRole, personaName: string) => void;
}

/**
 * Renders a grid of selectable agent persona cards.
 * Highlights the currently active persona for each role category.
 *
 * @param {Props} props - Component properties.
 * @returns {JSX.Element} The rendered component block.
 */
const AgentPersonaSelector: React.FC<Props> = ({ selectedPersonas, onSelect }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Governance Council Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERSONAS.map((p) => (
          <div 
            key={p.role} 
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedPersonas[p.role] === p.name 
              ? 'border-indigo-600 bg-indigo-50' 
              : 'border-slate-100 hover:border-slate-200'
            }`}
            onClick={() => onSelect(p.role, p.name)}
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full border border-slate-200" />
              <div>
                <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase">{p.role.replace('_', ' ')}</p>
                <p className="text-sm font-bold text-slate-800">{p.name}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{p.expertise}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentPersonaSelector;
