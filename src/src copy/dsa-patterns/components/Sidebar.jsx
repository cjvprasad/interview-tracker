import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Layers, X, ChevronsUp, ChevronsDown } from 'lucide-react';
import { phases, patterns } from './data';

const Sidebar = ({ activePatternId, onSelectPattern, completedProblems, mobileOpen, closeMobile }) => {
  // Default to all phases expanded
  const [expandedPhases, setExpandedPhases] = useState(phases.map(p => p.id));

  // Check if all phases are currently open
  const allExpanded = expandedPhases.length === phases.length;

  // Toggle Logic
  const toggleAll = () => {
    if (allExpanded) {
      // Collapse All
      setExpandedPhases([]);
    } else {
      // Expand All
      setExpandedPhases(phases.map(p => p.id));
    }
  };

  const togglePhase = (id) => {
    setExpandedPhases(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const getProgress = (pattern) => {
    if (!pattern.problems.length) return 0;
    const solved = pattern.problems.filter((_, i) => completedProblems[`${pattern.id}-${i}`]).length;
    return Math.round((solved / pattern.problems.length) * 100);
  };

  const getTotalProgress = () => {
    let total = 0, solved = 0;
    patterns.forEach(p => {
      total += p.problems.length;
      solved += p.problems.filter((_, i) => completedProblems[`${p.id}-${i}`]).length;
    });
    return total === 0 ? 0 : Math.round((solved / total) * 100);
  };

  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-[#1e293b] border-r border-slate-700 flex flex-col transition-transform duration-300 shadow-2xl
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:shadow-none
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Layers size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">DSA Mastery</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle All Button */}
            <button 
              onClick={toggleAll} 
              className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
              title={allExpanded ? "Collapse All" : "Expand All"}
            >
              {allExpanded ? <ChevronsUp size={18} /> : <ChevronsDown size={18} />}
            </button>

            {/* Close Button for Mobile */}
            <button onClick={closeMobile} className="md:hidden text-slate-400 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
          {phases.map(phase => {
              const phasePatterns = patterns.filter(p => p.phase === phase.id);
              if(!phasePatterns.length) return null;
              
              const isExpanded = expandedPhases.includes(phase.id);

              return (
                <div key={phase.id}>
                  <button onClick={() => togglePhase(phase.id)} className="w-full flex items-center justify-between px-2 py-2 mb-1 text-xs font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-800 rounded group transition-colors">
                    <span>{phase.title}</span>
                    {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                  
                  {isExpanded && (
                    <div className="space-y-1 ml-1 animate-in slide-in-from-top-2 duration-200">
                      {phasePatterns.map(pat => {
                        const prog = getProgress(pat);
                        const isActive = pat.id === activePatternId;
                        return (
                          <div key={pat.id} onClick={() => { onSelectPattern(pat.id); closeMobile(); }} 
                               className={`cursor-pointer rounded-lg p-2.5 border border-transparent transition-all ${isActive ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : 'hover:bg-slate-800'}`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`text-xs font-medium truncate ${isActive ? 'text-blue-400' : 'text-slate-300'}`}>{pat.name}</span>
                              <span className="text-[10px] text-slate-500">{prog}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-500 ${prog === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${prog}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-[#1e293b] shrink-0">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Global Progress</span>
            <span>{getTotalProgress()}%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${getTotalProgress()}%` }}></div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;