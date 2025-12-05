import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Menu,
  Layers,
  Cpu,
  Star,
  Code2,
  Search,
  X,
  FolderGit2,
} from "lucide-react";
import Sidebar from "./Sidebar";
import AlgorithmDetail from "./AlgorithmDetail";
import ProblemSolver from "./ProblemSolver";
import PatternDetail from "./PatternDetail";
// Data Imports
import {
  dsaAlgorithms,
  msqDSAData,
  patterns,
  phases,
  reactQuestionsData,
  msqLeetCodeLinks,
  // IMPORT THE NEW DATA HERE
  realQsData,
} from "../data/MainData";

// 1. ADD NEW MODE TO CONFIG
const MODE_CONFIG = {
  algorithms: { label: "Algorithms", icon: Cpu, data: dsaAlgorithms },
  patterns: { label: "Patterns", icon: Layers, data: patterns },
  msq: { label: "MSQ DSA", icon: Star, data: msqDSAData },
  react: { label: "React/Js", icon: Code2, data: reactQuestionsData },
  // New Tab
  realqs: { label: "Real Qs", icon: FolderGit2, data: realQsData },
};

function DsaMastery() {
  const { modeParam, idParam, subIdParam } = useParams();
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const [completedItems, setCompletedItems] = useState({});
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const currentModeSlug = MODE_CONFIG[modeParam] ? modeParam : "algorithms";

  useEffect(() => {
    setDifficultyFilter("All");
    // Optionally reset search on tab change, or keep it to persist search across tabs
    setSearchQuery("");
    setIsSearchOpen(false);
  }, [modeParam]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const activeId = useMemo(() => {
    if (!idParam) return null;
    return currentModeSlug === "patterns" ? idParam : Number(idParam);
  }, [idParam, currentModeSlug]);

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
    navigate(`${currentModeSlug}/${item.id}`);
    setMobileSidebarOpen(false);
  };

  const handleModeChange = (modeLabel) => {
    const entry = Object.entries(MODE_CONFIG).find(
      ([key, val]) => val.label === modeLabel
    );
    const slug = entry ? entry[0] : "algorithms";
    navigate(`${slug}`);

    if (window.innerWidth < 768) {
      setMobileSidebarOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setDesktopSidebarOpen(!desktopSidebarOpen);
    }
  };

  const sidebarData = useMemo(() => {
    // 1. Get raw data for current mode
    let currentData = MODE_CONFIG[currentModeSlug]?.data || [];

    // 2. Apply Search Filter (Universal)
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery?.toLowerCase();
      currentData = currentData.filter((item) =>
        item.title?.toLowerCase()?.includes(lowerQuery)
      );
    }

    // 3. Handle "Patterns" Mode (Special Structure)
    if (currentModeSlug === "patterns") {
      // If search is active, we might filter the items array directly
      // but Sidebar expects groups (phases).
      // For simplicity, we filter items but keep groups static or filtered.
      return {
        title: "Patterns",
        groups: phases,
        items: currentData, // Filtered items
        type: "pattern",
      };
    }

    // 4. Handle "MSQ" Mode (Enrich Data)
    if (currentModeSlug === "msq") {
      currentData = currentData.map((item) => {
        const linkObj = msqLeetCodeLinks.find((l) => l.id === item.id);
        return {
          ...item,
          type: linkObj ? linkObj.type : "Medium",
          link: linkObj ? linkObj.link : "",
        };
      });
    }

    // 5. Handle Standard Grouping (Algorithms, React, RealQs, MSQ)
    if (["algorithms", "msq", "react", "realqs"].includes(currentModeSlug)) {
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
        currentModeSlug,
        searchQuery,
      };
    }

    return { title: "", groups: [], items: [] };
  }, [currentModeSlug, searchQuery]);


  const getDisplayItem = () => {
    if (!activeId) return null;
    let foundItem = null;
    const config = MODE_CONFIG[currentModeSlug];
    if (config) {
      foundItem = config.data.find((item) => item?.id === activeId);
    }

    if (currentModeSlug === "react" && foundItem) {
      return {
        ...foundItem,
        desc: foundItem.explanation,
        solution: { code: foundItem.codeString, type: "Implementation" },
        tips: Array.isArray(foundItem.tips) ? foundItem.tips : [foundItem.tips],
        timeComplexity: "Concept",
      };
    }

    // Pass Real Qs items through directly
    if (currentModeSlug === "realqs" && foundItem) {
      return foundItem;
    }

    return foundItem;
  };
  const selectedItem = getDisplayItem();

  return (
    <>
      <div className="flex items-center gap-3 py-2 px-2 group cursor-pointer">
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
          desktopOpen={desktopSidebarOpen}
          currentModeSlug={currentModeSlug}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
        />

        <main className="flex-1 min-w-0 relative h-100% w-full flex flex-col">
          {/* Navbar */}
          <div className="h-14 border-b border-slate-700 bg-[#0f172a] flex items-center justify-between px-4 shrink-0 z-20">
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleMenuClick}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title={desktopSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
              >
                <Menu size={20} />
              </button>

              {/* Tabs Container */}
              <div className="flex items-center bg-[#1e293b] rounded-lg p-1 border border-slate-700 w-full md:w-auto overflow-hidden no-scrollbar">
                <div className="flex overflow-x-auto no-scrollbar items-center">
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

                {/* --- UNIVERSAL SEARCH INPUT (Enabled for All Tabs) --- */}
                {currentModeSlug !== "patterns" && (
                  <div
                    className={`flex items-center border-l border-slate-600 ml-1 pl-1 transition-all duration-300 ease-in-out ${
                      isSearchOpen ? "w-40 md:w-60" : "w-8"
                    }`}
                  >
                    {isSearchOpen ? (
                      <div className="flex items-center w-full bg-slate-800 rounded ml-1">
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search..."
                          className="w-full bg-transparent border-none outline-none text-xs text-slate-200 px-2 py-1.5 placeholder-slate-500"
                        />
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearchOpen(false);
                          }}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-colors ml-auto"
                        title="Search Questions"
                      >
                        <Search size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden bg-[#0f172a]">
            {!activeId ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 p-4 text-center">
                <div className="p-6 rounded-full bg-slate-800/50 border border-slate-700 animate-pulse">
                  <Layers size={48} className="opacity-50" />
                </div>
                <p className="text-sm font-medium text-slate-400">
                  Select an item from the sidebar.
                </p>
                {searchQuery && (
                  <p className="text-xs text-blue-400">
                    Filtering for: "{searchQuery}"
                  </p>
                )}
              </div>
            ) : (
              <>
                {currentModeSlug === "patterns" &&
                  (subIdParam ? (
                    <ProblemSolver
                      key={`prob-${subIdParam}`}
                      problemName={
                        patterns.find((p) => p.id === Number(activeId))
                          ?.problems[Number(subIdParam)]
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

                {/* Handle Algorithms, MSQ, React AND RealQs here */}
                {["algorithms", "msq", "react", "realqs"].includes(
                  currentModeSlug
                ) &&
                  selectedItem && (
                    <AlgorithmDetail
                      key={`algo-${activeId}`}
                      item={selectedItem}
                      onBack={() => navigate(`${currentModeSlug}`)}
                      toggleStatus={toggleStatus}
                      isCompleted={!!completedItems[activeId]}
                      currentModeSlug={currentModeSlug}
                      activeId={activeId}
                      msqLeetCodeLink={
                        msqLeetCodeLinks?.find(
                          (link) => link?.id === selectedItem?.id
                        )?.link || null
                      }
                    />
                  )}
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
