import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Hook imports
import { Menu, Layers, Cpu, Star, Code2 } from "lucide-react";
import Sidebar from "./Sidebar";
import AlgorithmDetail from "./AlgorithmDetail";
import ProblemSolver from "../dsa-patterns/components/ProblemSolver";
import PatternDetail from "../dsa-patterns/components/PatternDetail";
// Data Imports
import {
  dsaAlgorithms,
  msqDSAData,
  patterns,
  phases,
  reactQuestionsData,
} from "../data/MainData";

const MODE_CONFIG = {
  algorithms: { label: "Algorithms", icon: Cpu, data: dsaAlgorithms },
  patterns: { label: "Patterns", icon: Layers, data: patterns },
  msq: { label: "MSQ DSA", icon: Star, data: msqDSAData },
  react: { label: "React/Js", icon: Code2, data: reactQuestionsData }, // Added React
};

function DsaMastery() {
  const { modeParam, idParam, subIdParam } = useParams();
  const navigate = useNavigate();
  const [completedItems, setCompletedItems] = useState({});
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Defaults to algorithms if URL param is missing or invalid
  const currentModeSlug = MODE_CONFIG[modeParam] ? modeParam : "algorithms";

  // Calculate active ID from URL
  const activeId = useMemo(() => {
    if (!idParam) return null;
    return currentModeSlug === "patterns" ? idParam : Number(idParam);
  }, [idParam, currentModeSlug]);

  console.log(activeId, "activeId", currentModeSlug, "currentModeSlug");

  useEffect(() => {
    const saved = localStorage.getItem("dsa-progress-v3");
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const toggleStatus = (id) => {
    const newStatus = { ...completedItems, [id]: !completedItems[id] };
    setCompletedItems(newStatus);
    localStorage.setItem("dsa-progress-v3", JSON.stringify(newStatus));
  };

  const handleSelect = (item) => {
    console.log(item, "item");

    navigate(`${currentModeSlug}/${item.id}`);
    setMobileSidebarOpen(false);
  };

  const handleModeChange = (modeLabel) => {
    // Convert Label (e.g. "MSQ DSA") to Slug (e.g. "msq")
    const entry = Object.entries(MODE_CONFIG).find(
      ([key, val]) => val.label === modeLabel
    );
    const slug = entry ? entry[0] : "algorithms";
    navigate(`${slug}`);
  };

  // Sidebar Data Logic
  const sidebarData = useMemo(() => {
    if (currentModeSlug === "patterns") {
      return {
        title: "Patterns",
        groups: phases,
        items: patterns,
        type: "pattern",
      };
    }
    const currentData = MODE_CONFIG[currentModeSlug]?.data || [];

    if (["algorithms", "msq", "react"].includes(currentModeSlug)) {
      const categories = [...new Set(currentData.map((a) => a.category))];
      const groups = categories.map((c, i) => ({
        id: `${currentModeSlug}-cat-${i}`,
        title: c,
      }));
      return {
        title: MODE_CONFIG[currentModeSlug].label,
        groups,
        items: currentData,
        type: "algo",
      };
    }
    // if (currentModeSlug === "algorithms") {
    //   const categories = [...new Set(dsaAlgorithms.map((a) => a.category))];
    //   const groups = categories.map((c, i) => ({
    //     id: `algo-cat-${i}`,
    //     title: c,
    //   }));
    //   return {
    //     title: "Algorithms",
    //     groups,
    //     items: dsaAlgorithms,
    //     type: "algo",
    //   };
    // }
    // if (currentModeSlug === "msq") {
    //   const categories = [...new Set(msqDSAData.map((q) => q.category))];
    //   const groups = categories.map((c, i) => ({
    //     id: `msq-cat-${i}`,
    //     title: c,
    //   }));
    //   return {
    //     title: "Top Questions",
    //     groups,
    //     items: msqDSAData,
    //     type: "algo",
    //   };
    // }
    return { title: "", groups: [], items: [] };
  }, [currentModeSlug]);
  const getDisplayItem = () => {
    if (!activeId) return null;

    let foundItem = null;
    const config = MODE_CONFIG[currentModeSlug];
    if (config) {
      foundItem = config.data.find((item) => item.id === activeId);
    }

    if (currentModeSlug === "react" && foundItem) {
      // Transformation Layer
      return {
        ...foundItem,
        // Map 'explanation' (React) to 'desc' (Algo)
        desc: foundItem.explanation,
        // Map 'codeString' (React) to 'solution' (Algo)
        solution: { code: foundItem.codeString, type: "Implementation" },
        // Ensure tips is an array (React data might have it as a single string)
        tips:
          currentModeSlug === "react"
            ? foundItem.tips
            : Array.isArray(foundItem.tips)
            ? foundItem.tips
            : [foundItem.tips],
        // Add dummy complexity if missing to prevent UI gaps
        timeComplexity: "Concept",
      };
    }

    return foundItem;
  };
  const selectedItem = getDisplayItem();

  return (
    <>
      <div className="flex items-center gap-3  py-2 px-2 group cursor-pointer">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 border border-white/10">
            <span className="text-white font-bold text-xl block transform group-hover:scale-110 transition-transform duration-300">
              🚀
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight leading-none">
            Fullstack<span className="text-blue-400">Prep</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            Mastery Hub
          </p>
        </div>
      </div>
      <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden relative">
        <Sidebar
          {...sidebarData}
          activeId={activeId}
          onSelect={handleSelect}
          completedIds={completedItems}
          mobileOpen={mobileSidebarOpen}
          closeMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 relative h-100% w-full flex flex-col">
          {/* Navbar */}
          <div className="h-14 border-b border-slate-700 bg-[#0f172a] flex items-center justify-between px-4 shrink-0 z-20">
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 text-slate-400 hover:text-white"
              >
                <Menu size={20} />
              </button>
              <div className="flex bg-[#1e293b] rounded-lg p-1 border border-slate-700 overflow-x-auto no-scrollbar">
                {Object.values(MODE_CONFIG).map((config) => {
                  const isActive =
                    config.label === MODE_CONFIG[currentModeSlug].label;
                  const Icon = config.icon;
                  return (
                    <button
                      key={config.label}
                      onClick={() => handleModeChange(config.label)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                      }`}
                    >
                      <Icon size={14} /> {config.label}
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
                  Select an item from the sidebar.
                </p>
              </div>
            ) : (
              <>
                {currentModeSlug}
                {currentModeSlug === "patterns" &&
                  (subIdParam ? (
                    // Render Problem Solver if subId exists
                    <ProblemSolver
                      key={`prob-${subIdParam}`}
                      problemName={
                        patterns.find((p) => p.id === activeId)?.problems[
                          Number(subIdParam)
                        ]
                      }
                      patternId={activeId}
                      problemIndex={Number(subIdParam)}
                      onBack={() => navigate(`${currentModeSlug}/${activeId}`)}
                      toggleProblemStatus={(pid, idx) =>
                        toggleStatus(`${pid}-${idx}`)
                      }
                      isCompleted={completedItems[`${activeId}-${subIdParam}`]}
                    />
                  ) : (
                    <PatternDetail
                      key={`pat-${activeId}`}
                      patternId={activeId}
                      onOpenProblem={(name, index) =>
                        navigate(`${currentModeSlug}/${activeId}/${index}`)
                      }
                      toggleProblemStatus={(pid, idx) =>
                        toggleStatus(`${pid}-${idx}`)
                      }
                      completedProblems={completedItems}
                      onMenuClick={() => setMobileSidebarOpen(true)}
                    />
                  ))}
                {/* 5. ADD REACT TO ALGORITHM DETAIL RENDER CONDITION */}
                {["algorithms", "msq", "react"].includes(currentModeSlug) &&
                  selectedItem && (
                    <AlgorithmDetail
                      key={`algo-${activeId}`}
                      item={selectedItem}
                      onBack={() => navigate(`${currentModeSlug}`)}
                      toggleStatus={toggleStatus}
                      isCompleted={!!completedItems[activeId]}
                      currentModeSlug={currentModeSlug}
                    />
                  )}
                {/* {(currentModeSlug === "algorithms" ||
                currentModeSlug === "msq") && (
                <AlgorithmDetail
                  key={`algo-${activeId}`}
                  item={
                    currentModeSlug === "algorithms"
                      ? dsaAlgorithms.find((a) => a.id === activeId)
                      : msqDSAData.find((q) => q.id === activeId)
                  }
                  isAlgo={currentModeSlug === "algorithms"}
                  onBack={() => navigate(`${currentModeSlug}`)}
                  toggleStatus={toggleStatus}
                  isCompleted={!!completedItems[activeId]}
                />
              )} */}
              </>
            )}
          </div>
        </main>

        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default DsaMastery;
