import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Hook imports
import { Menu, Layers } from "lucide-react";
import Sidebar from "./Sidebar";
import PatternDetail from "../dsa-patterns/components/PatternDetail";
import ProblemSolver from "../dsa-patterns/components/ProblemSolver";

// Data Imports
import { patterns, phases } from "../data/MainData"; // Adjust path to your data file

function DsaPatterns() {
  // 1. Get Params from URL
  const { patternId, problemIndex } = useParams();
  const navigate = useNavigate();

  // 2. Derived State
  // If no ID in URL, default to 1 (Sliding Window), else parse URL
  const activePatternId = patternId ? parseInt(patternId) : 1;

  // 3. Local State
  const [completedProblems, setCompletedProblems] = useState({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 4. Load Progress from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("dsa-progress");
    if (saved) setCompletedProblems(JSON.parse(saved));
  }, []);

  const toggleProblemStatus = (patId, probIndex) => {
    const uid = `${patId}-${probIndex}`;
    const newStatus = { ...completedProblems, [uid]: !completedProblems[uid] };
    setCompletedProblems(newStatus);
    localStorage.setItem("dsa-progress", JSON.stringify(newStatus));
  };

  // 5. Navigation Handlers
  const handleSelectPattern = (item) => {
    // The Sidebar passes the whole item, we just need the ID
    navigate(`/patterns/${item.id}`);
    setMobileSidebarOpen(false);
  };

  const handleOpenProblem = (name, index) => {
    navigate(`/patterns/${activePatternId}/${index}`);
  };

  const handleBackToPattern = () => {
    navigate(`/patterns/${activePatternId}`);
  };

  // 6. Sidebar Configuration
  const sidebarData = useMemo(() => {
    return {
      title: "Patterns",
      groups: phases, // e.g. "Basics", "Pointers"
      items: patterns, // The actual pattern objects
      type: "pattern", // Tells Sidebar how to render list items
    };
  }, []);

  // 7. Determine Active Problem (if URL has index)
  let activeProblemData = null;
  if (problemIndex !== undefined) {
    const pattern = patterns.find((p) => p.id === activePatternId);
    if (pattern && pattern.problems[problemIndex]) {
      activeProblemData = {
        name: pattern.problems[problemIndex],
        index: parseInt(problemIndex),
      };
    }
  }

  return (
    <div className="flex h-full w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        {...sidebarData}
        activeId={activePatternId}
        onSelect={handleSelectPattern}
        completedIds={completedProblems} // Note: Pattern completion logic might differ, passing full obj
        mobileOpen={mobileSidebarOpen}
        closeMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0 relative h-full w-full flex flex-col">
        {/* Mobile Header (Only visible if Sidebar is hidden) */}
        {!mobileSidebarOpen && (
          <div className="md:hidden h-14 border-b border-slate-700 bg-[#0f172a] flex items-center px-4 shrink-0 z-20">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <span className="ml-2 font-bold text-slate-200 flex items-center gap-2">
              <Layers size={16} className="text-blue-500" /> Patterns
            </span>
          </div>
        )}

        <div className="flex-1 relative overflow-hidden bg-[#0f172a]">
          {activeProblemData ? (
            // VIEW: Problem Solver (Coding Interface)
            <ProblemSolver
              key={`${activePatternId}-${activeProblemData.index}`}
              problemName={activeProblemData.name}
              patternId={activePatternId}
              problemIndex={activeProblemData.index}
              onBack={handleBackToPattern}
              toggleProblemStatus={toggleProblemStatus}
              isCompleted={
                completedProblems[
                  `${activePatternId}-${activeProblemData.index}`
                ]
              }
            />
          ) : (
            // VIEW: Pattern Details (List of problems)
            <PatternDetail
              key={`pattern-${activePatternId}`}
              patternId={activePatternId}
              onOpenProblem={handleOpenProblem}
              toggleProblemStatus={toggleProblemStatus}
              completedProblems={completedProblems}
              onMenuClick={() => setMobileSidebarOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DsaPatterns;
