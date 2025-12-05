// src/DsaMastery.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Menu, Layers, Cpu, Star } from "lucide-react";
import Sidebar from "./Sidebar";
import PatternDetail from "../../dsa-patterns/components/PatternDetail";
import ProblemSolver from "../../dsa-patterns/components/ProblemSolver";
import AlgorithmDetail from "./AlgorithmDetail";

// Import Consolidated Data
// import { phases, patterns, dsaAlgorithms, msqDSAData } from "./data";
import { dsaAlgorithms } from "../data";
import { phases, patterns } from "../../dsa-patterns/components/data";
import { msqDSAData } from "./data";

const MODES = ["Algorithms", "Patterns", "MSQ DSA"];

function DsaMastery() {
  const [currentMode, setCurrentMode] = useState("Algorithms");
  const [activeId, setActiveId] = useState(null);
  const [subView, setSubView] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem("dsa-progress-v3");
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const toggleStatus = (id) => {
    const newStatus = { ...completedItems, [id]: !completedItems[id] };
    setCompletedItems(newStatus);
    localStorage.setItem("dsa-progress-v3", JSON.stringify(newStatus));
  };

  // --- Sidebar Configuration ---
  const sidebarData = useMemo(() => {
    // 1. Patterns Mode
    if (currentMode === "Patterns") {
      return {
        title: "Patterns",
        groups: phases,
        items: patterns,
        type: "pattern",
      };
    }

    // 2. Algorithms Mode
    if (currentMode === "Algorithms") {
      const categories = [...new Set(dsaAlgorithms.map((a) => a.category))];
      const groups = categories.map((c, i) => ({
        id: `algo-cat-${i}`,
        title: c,
      }));
      return {
        title: "Algorithms",
        groups,
        items: dsaAlgorithms,
        type: "algo",
      };
    }

    // 3. MSQ DSA Mode (Treated as Algorithms now)
    if (currentMode === "MSQ DSA") {
      const categories = [...new Set(msqDSAData.map((q) => q.category))];
      const groups = categories.map((c, i) => ({
        id: `msq-cat-${i}`,
        title: c,
      }));
      return {
        title: "Top Questions",
        groups,
        items: msqDSAData,
        type: "algo",
      }; // type='algo' uses generic filtering
    }
  }, [currentMode]);

  const handleSelect = (item) => {
    setActiveId(item.id);
    setSubView(null);
    setMobileSidebarOpen(false);
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    setActiveId(null);
    setSubView(null);
  };

  const filtered = useMemo(() => {
    return dsaAlgorithms.filter((item) => item.id === activeId);
  }, [activeId]);
  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        {...sidebarData}
        activeId={activeId}
        onSelect={handleSelect}
        completedIds={completedItems}
        mobileOpen={mobileSidebarOpen}
        closeMobile={() => setMobileSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 relative h-full w-full flex flex-col">
        {/* Navbar */}
        <div className="h-14 border-b border-slate-700 bg-[#0f172a] flex items-center justify-between px-4 shrink-0 z-20">
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu size={20} />
            </button>

            {/* Mode Switcher */}
            <div className="flex bg-[#1e293b] rounded-lg p-1 border border-slate-700 overflow-x-auto no-scrollbar">
              {MODES.map((mode) => {
                const icons = {
                  Algorithms: Cpu,
                  Patterns: Layers,
                  "MSQ DSA": Star,
                };
                const Icon = icons[mode];
                const isActive = currentMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon size={14} /> {mode}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden bg-[#0f172a]">
          {!activeId ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 p-4 text-center">
              <div className="p-6 rounded-full bg-slate-800/50 border border-slate-700 animate-pulse">
                <Layers size={48} className="opacity-50" />
              </div>
              <p className="text-sm font-medium text-slate-400">
                Select an item from the sidebar to view {currentMode}
              </p>
            </div>
          ) : (
            <>
              {/* 1. PATTERNS VIEW */}
              {currentMode === "Patterns" &&
                (subView ? (
                  <ProblemSolver
                    key={`prob-${subView.index}`}
                    problemName={subView.name}
                    patternId={activeId}
                    problemIndex={subView.index}
                    onBack={() => setSubView(null)}
                    toggleProblemStatus={(pid, idx) =>
                      toggleStatus(`${pid}-${idx}`)
                    }
                    isCompleted={completedItems[`${activeId}-${subView.index}`]}
                  />
                ) : (
                  <PatternDetail
                    key={`pat-${activeId}`}
                    patternId={activeId}
                    onOpenProblem={(name, index) => setSubView({ name, index })}
                    toggleProblemStatus={(pid, idx) =>
                      toggleStatus(`${pid}-${idx}`)
                    }
                    completedProblems={completedItems}
                    onMenuClick={() => setMobileSidebarOpen(true)}
                  />
                ))}

              {/* 2. ALGORITHMS & MSQ DSA VIEW (Unified) */}
              {(currentMode === "Algorithms" || currentMode === "MSQ DSA") && (
                <AlgorithmDetail
                  key={`algo-${activeId}`}
                  item={
                    currentMode === "Algorithms"
                      ? dsaAlgorithms.find((a) => a.id === activeId)
                      : msqDSAData.find((q) => q.id === activeId)
                  }
                  isAlgo={currentMode === "Algorithms"}
                  onBack={() => setActiveId(null)}
                  // --- ADD THESE TWO PROPS ---
                  toggleStatus={toggleStatus}
                  activeId={activeId}
                  isCompleted={!!completedItems[activeId]}
                />
              )}
            </>
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

export default DsaMastery;
