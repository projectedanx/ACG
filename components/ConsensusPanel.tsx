
/**
 * @fileoverview UI Component displaying the real-time multi-agent discussion transcript.
 */

import React from 'react';
import { Message, AgentRole } from '../types';
import { PERSONAS } from '../constants';

/**
 * Props for the ConsensusPanel component.
 * @interface Props
 * @property {Message[]} messages - The array of messages forming the current discussion.
 */
interface Props {
  messages: Message[];
}

/**
 * Renders the timeline of messages from various agent personas during the deliberation phase.
 *
 * @param {Props} props - Component properties.
 * @returns {JSX.Element | null} The rendered discussion panel, or null if no messages exist.
 */
const ConsensusPanel: React.FC<Props> = ({ messages }) => {
  if (messages.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex flex-col max-h-[700px]">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
          <div className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
          Multi-Agent Council Deliberation
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol: Consensus v2.4</span>
        </div>
      </div>
      <div className="p-6 overflow-y-auto space-y-8 flex-1 bg-slate-50/20 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg) => {
          const persona = PERSONAS.find(p => p.role === msg.role);
          return (
            <div key={msg.id} className="flex gap-5 group animate-in fade-in slide-in-from-bottom-2">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative">
                  <img src={persona?.avatar} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md group-hover:scale-105 transition-transform" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${persona?.color}`}></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-slate-900">{msg.sender}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md text-white uppercase shadow-sm ${persona?.color}`}>
                    {msg.role.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-sm text-slate-700 leading-relaxed whitespace-pre-wrap relative">
                  {msg.content}
                  
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Grounding Citations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-600 hover:text-white transition-all max-w-[200px] truncate"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsensusPanel;
