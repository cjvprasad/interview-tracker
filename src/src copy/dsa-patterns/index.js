import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; // Import Menu icon
import Sidebar from './components/Sidebar';
import PatternDetail from './components/PatternDetail';
import ProblemSolver from './components/ProblemSolver';

function DsaPatterns() {
  const [activePatternId, setActivePatternId] = useState(1);
  const [activeProblem, setActiveProblem] = useState(null); // { name, index }
  const [completedProblems, setCompletedProblems] = useState({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('dsa-progress');
    if (saved) setCompletedProblems(JSON.parse(saved));
  }, []);

  const toggleProblemStatus = (patId, probIndex) => {
    const uid = `${patId}-${probIndex}`;
    const newStatus = { ...completedProblems, [uid]: !completedProblems[uid] };
    setCompletedProblems(newStatus);
    localStorage.setItem('dsa-progress', JSON.stringify(newStatus));
  };

  // When selecting a pattern, ensure we close mobile menu and reset active problem
  const handleSelectPattern = (id) => {
    setActivePatternId(id);
    setActiveProblem(null);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden relative">
      
      {/* Mobile Menu Trigger (Visible only when sidebar is closed on mobile) */}
      {!mobileSidebarOpen && (
        <button 
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden absolute top-4 left-4 z-10 p-2 bg-slate-800 text-white rounded-md shadow-lg border border-slate-700"
        >
          <Menu size={20} />
        </button>
      )}

      <Sidebar 
        activePatternId={activePatternId} 
        onSelectPattern={handleSelectPattern}
        completedProblems={completedProblems}
        mobileOpen={mobileSidebarOpen}
        closeMobile={() => setMobileSidebarOpen(false)}
      />
      
      <main className="flex-1 min-w-0 relative h-full w-full">
        {activeProblem ? (
          <ProblemSolver 
            // CRITICAL FIX: The key ensures the component remounts when data changes
            key={`${activePatternId}-${activeProblem.index}-${activeProblem.name}`} 
            problemName={activeProblem.name}
            patternId={activePatternId}
            problemIndex={activeProblem.index}
            onBack={() => setActiveProblem(null)}
            toggleProblemStatus={toggleProblemStatus}
            isCompleted={completedProblems[`${activePatternId}-${activeProblem.index}`]}
          />
        ) : (
          <PatternDetail 
            key={`pattern-${activePatternId}`} // Force refresh on pattern switch
            patternId={activePatternId} 
            onOpenProblem={(name, index) => setActiveProblem({ name, index })}
            toggleProblemStatus={toggleProblemStatus}
            completedProblems={completedProblems}
            onMenuClick={() => setMobileSidebarOpen(true)}
          />
        )}
      </main>
      
      {/* Mobile Overlay Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DsaPatterns;