import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle,
  Circle,
  Terminal,
  BookOpen,
  HelpCircle,
  Code2,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Layout,
  X,
  Eye,
  EyeOff,
  ExternalLink,
  GripVertical,
  FileCode,
  Copy,
  // New Icons for File Tree
} from "lucide-react";
import DsaDetailsAlgo from "../pages/DsaDetailsAlgo";
import SyntaxHighLighter from "../common/SyntaxHighLighter";
import { msqLeetCodeLinks } from "../data/MainData";
import { DemoRegistry } from "../react-challenges/DemoRegistry"; // Import Registry

const AlgorithmDetail = ({
  item,
  onBack,
  toggleStatus,
  isCompleted,
  currentModeSlug,
  msqLeetCodeLink,
  activeId,
}) => {
  const isAlgo = currentModeSlug === "algorithms" || !currentModeSlug;
  const isReactJs = currentModeSlug === "react";
  const isRealQs = currentModeSlug === "realqs"; // Detect Real Qs Mode

  const [searchParams, setSearchParams] = useSearchParams();
  const [isDemoVisible, setIsDemoVisible] = useState(true); // Default open

  const activeTab = searchParams.get("tab") || "desc";

  const setActiveTab = (tab) => {
    setSearchParams({ tab }, { replace: true });
  };

  const [showDryRun, setShowDryRun] = useState(false);
  const [selectedSolIndex, setSelectedSolIndex] = useState(0);
  const [showMainJs, setShowMainJs] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Editor & Console Visibility State
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [expandedMethods, setExpandedMethods] = useState({ 0: true });

  // RESIZE STATE & REFS
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const isResizingRef = useRef(false);
  const containerRef = useRef(null);

  const tabsRef = useRef(null);
  const editorPanelRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // --- Real QS State ---
  const [activeFileId, setActiveFileId] = useState(null);

  // --- LOOKUP THE DEMO COMPONENT ---
  const DemoComponent = item.demoId ? DemoRegistry[item.demoId] : null;

  // --- SAFE CODE EXTRACTION ---
  const isMultiSolution = Array.isArray(item.solution);
  const currentSolutionCode = isMultiSolution
    ? item.solution[selectedSolIndex]?.code
    : item.solution?.code || item.solution || item.code || "";

  // Auto-Scroll Active Tab
  useEffect(() => {
    if (tabsRef.current) {
      const activeBtn = tabsRef.current.querySelector(
        `[data-tab-id="${activeTab}"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeTab]);

  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: direction * 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [tabsRef.current, item]);

  const handleCopyAndOpen = (codeToCopy) => {
    const code =
      typeof codeToCopy === "string" ? codeToCopy : currentSolutionCode;

    setUserCode(code);
    if (!showMainJs) setShowMainJs(true);
    if (!isEditorOpen) setIsEditorOpen(true);

    setTimeout(() => {
      editorPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const toggleMethod = (index) => {
    setExpandedMethods((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // --- INITIALIZATION ---
  useEffect(() => {
    let defaultCode = "// Write your code here";
    if (item.starterCode) defaultCode = item.starterCode;
    else if (currentSolutionCode) defaultCode = currentSolutionCode;
    else
      defaultCode = `function solve(x){\n  return false;\n}\nconsole.log(solve());`;

    setUserCode(defaultCode);
    setOutput(null);

    if (!selectedSolIndex) {
      setSelectedSolIndex(0);
    }
    setShowMainJs(false);
    setLeftWidth(50);
    setIsEditorOpen(true);
    setIsConsoleOpen(false);

    // Reset Accordion: Open only the first one when switching questions
    setExpandedMethods({ 0: true });
  }, [item.id, currentSolutionCode]);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const startResizing = useCallback(() => {
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizingRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newWidth >= 20 && newWidth <= 80) {
      setLeftWidth(newWidth);
    }
  }, []);

  const handleRun = () => {
    setIsRunning(true);
    if (!isConsoleOpen) setIsConsoleOpen(true);
    setOutput("Running...");
    setTimeout(() => {
      try {
        let logs = [];
        const mockConsole = {
          log: (...args) =>
            logs.push(
              args
                .map((a) => (typeof a === "object" ? JSON.stringify(a) : a))
                .join(" ")
            ),
        };
        const run = new Function("console", userCode);
        run(mockConsole);
        setOutput(
          <div className="space-y-1 animate-in fade-in">
            <div className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider mb-2 border-b border-emerald-900/30 pb-1">
              Execution Success
            </div>
            {logs.length > 0 ? (
              logs.map((l, i) => (
                <div
                  key={i}
                  className="font-mono text-slate-300 text-xs border-l-2 border-slate-700 pl-2"
                >
                  {l}
                </div>
              ))
            ) : (
              <div className="text-slate-500 italic text-xs">
                No console output returned.
              </div>
            )}
          </div>
        );
      } catch (e) {
        setOutput(
          <div className="text-red-400 text-xs animate-in fade-in">
            <div className="font-bold mb-1 uppercase tracking-wider">
              Runtime Error
            </div>
            {e.message}
          </div>
        );
      }
      setIsRunning(false);
    }, 500);
  };

  const extraData =
    msqLeetCodeLinks.find((link) => link.id === activeId)?.solution || [];

  const tabs = [
    { id: "desc", label: "Concept", icon: BookOpen },
    { id: "interview", label: "Interview", icon: HelpCircle },
    ...(showDryRun ? [{ id: "dry", label: "Dry Run", icon: Eye }] : []),
    { id: "sol", label: "Solution", icon: Code2 },
    ...(item.jsMethods
      ? [{ id: "methods", label: "Other Sol", icon: FileCode }]
      : []),
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f172a] absolute inset-0 w-full">
      {/* --- HEADER --- */}
      <header className="min-h-[56px] border-b border-slate-700 flex items-center justify-between px-4 bg-[#1e293b] shrink-0 z-10 gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white shrink-0 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col min-w-0">
            <h1 className="font-bold text-slate-200 text-sm truncate">
              {item.title}
            </h1>
            <span className="text-[10px] text-blue-400 truncate">
              {item.category}
            </span>
          </div>
        </div>

        {/* --- HEADER CONTROLS --- */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Complexity - Hidden for Real Qs */}
          {!(isRealQs || isReactJs) && (
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold">
                Complexity
              </span>
              <span className="text-xs font-mono text-green-400">
                {extraData?.[selectedSolIndex]?.timeComplexity || "N/A"}
              </span>
              <span className="text-xs font-mono text-pink-400">
                {extraData?.[selectedSolIndex]?.spaceComplexity || "N/A"}
              </span>
            </div>
          )}

          {/* Dry Run Button - Hidden for React/RealQs */}
          {!(isRealQs || isReactJs)&& (
            <button
              onClick={() => {
                setShowDryRun((prev) => !prev);
                setActiveTab(activeTab === "dry" ? "desc" : "dry");
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                activeTab === "dry"
                  ? "bg-purple-900/30 text-purple-400 border-purple-500/50"
                  : "bg-slate-800 text-slate-400 border-slate-600 hover:border-slate-400"
              }`}
            >
              {activeTab === "dry" ? <EyeOff size={14} /> : <Eye size={14} />}
              <span className="hidden sm:inline">
                {activeTab === "dry" ? "Hide Dry Run" : "Visual Dry Run"}
              </span>
            </button>
          )}

          {/* --- HIDE PLAYGROUND BUTTON FOR REAL QS --- */}
          {!isRealQs && (
            <button
              onClick={() => {
                setShowMainJs(!showMainJs);
                if (!showMainJs) {
                  setLeftWidth(50);
                  setIsEditorOpen(true);
                  setIsConsoleOpen(false);
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                showMainJs
                  ? "bg-blue-900/30 text-blue-400 border-blue-500/50"
                  : "bg-slate-800 text-slate-400 border-slate-600 hover:border-slate-400"
              }`}
            >
              {showMainJs ? <Layout size={14} /> : <Code2 size={14} />}
              <span className="hidden sm:inline">
                {showMainJs ? "Hide Code" : "Playground"}
              </span>
            </button>
          )}

          {/* Status Button */}
          <button
            onClick={() => toggleStatus(item.id)}
            className={`flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold border transition-all ${
              isCompleted
                ? "bg-emerald-900/20 text-emerald-400 border-emerald-500/50"
                : "bg-slate-800 text-slate-400 border-slate-600 hover:border-slate-400"
            }`}
          >
            {isCompleted ? (
              <CheckCircle size={12} className="md:w-[14px] md:h-[14px]" />
            ) : (
              <Circle size={12} className="md:w-[14px] md:h-[14px]" />
            )}
            <span className="hidden sm:inline">
              {isCompleted ? "Solved" : "Mark Done"}
            </span>
          </button>
        </div>
      </header>

      {/* --- CONTENT LAYOUT --- */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col lg:flex-row overflow-hidden relative"
      >
        {/* LEFT PANEL */}
        <div
          className={`flex flex-col bg-[#0f172a] transition-all duration-75 ease-linear z-0 
            ${
              showMainJs
                ? "h-1/2 lg:h-full lg:border-r border-slate-700"
                : "w-full h-full"
            }
          `}
          style={{
            width: showMainJs && isDesktop ? `${leftWidth}%` : "100%",
          }}
        >
          <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-50 px-4 py-4">
            <div className="relative group/nav flex items-center max-w-full md:max-w-2xl">
              {canScrollLeft && (
                <button
                  onClick={() => scrollTabs(-1)}
                  className="absolute left-0 z-10 p-2 bg-gradient-to-r from-slate-900 to-transparent h-full flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <ChevronLeft
                    className="bg-slate-800 rounded-full p-1 shadow-lg border border-slate-700"
                    size={24}
                  />
                </button>
              )}
              <div
                ref={tabsRef}
                onScroll={checkScroll}
                className="flex border-b border-slate-700 bg-[#1e293b] overflow-x-auto no-scrollbar scroll-smooth"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    data-tab-id={tab.id}
                    onClick={() => {
                      if (activeTab === "dry") {
                        setShowDryRun(false);
                      }
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-400 bg-[#0f172a]"
                        : "border-transparent text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <tab.icon size={14} /> {tab.label}
                  </button>
                ))}
              </div>
              {canScrollRight && (
                <button
                  onClick={() => scrollTabs(1)}
                  className="absolute right-0 z-10 p-2 bg-gradient-to-l from-slate-900 to-transparent h-full flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <ChevronRight
                    className="bg-slate-800 rounded-full p-1 shadow-lg border border-slate-700"
                    size={24}
                  />
                </button>
              )}
            </div>
          </nav>

          <div className="flex-1 overflow-y-auto p-6 no-scrollbar text-slate-300">
            {activeTab === "desc" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300 space-y-6 no-scrollbar">
                {/* --- TITLE & DESC --- */}
                {isReactJs ? (
                  <SyntaxHighLighter
                    codeString={item?.desc}
                    language="markdown"
                  />
                ) : (
                  <div
                    className="prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                )}

                {/* --- DYNAMIC DEMO SECTION (ONLY FOR REAL QS) --- */}
                {/* --- 2. DYNAMIC DEMO SECTION (ONLY FOR REAL QS) --- */}
                {isRealQs && DemoComponent && (
                  <div className="mt-4 mb-6 border-b border-slate-800/50 pb-4">
                    <button
                      onClick={() => setIsDemoVisible(!isDemoVisible)}
                      className="flex items-center gap-2 mb-3 w-full text-left group focus:outline-none"
                    >
                      <div
                        className={`transition-transform duration-200 ${
                          isDemoVisible ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <Play
                          size={14}
                          className={`transition-colors ${
                            isDemoVisible
                              ? "text-green-400 fill-green-400/20"
                              : "text-slate-500 group-hover:text-green-400"
                          }`}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                        Interactive Demo (Expected Output)
                      </span>
                      <span className="ml-auto text-[10px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {isDemoVisible ? "Click to Hide" : "Click to Show"}
                      </span>
                    </button>

                    {/* Render the specific demo from Registry */}
                    {isDemoVisible && (
                      <div className="animate-in slide-in-from-top-2 fade-in duration-300 origin-top">
                        <DemoComponent />
                      </div>
                    )}
                  </div>
                )}

                {item.algorithm && (
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                      <Lightbulb size={14} className="text-yellow-500" />{" "}
                      Strategy
                    </h3>
                    <p className="text-sm italic text-slate-300 leading-relaxed">
                      "{item.algorithm}"
                    </p>
                  </div>
                )}
                {item.constraints && (
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                      <Lightbulb size={14} className="text-yellow-500" /> Edge
                      Constraints
                    </h3>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400">
                      {item.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!(isRealQs || isReactJs) && msqLeetCodeLink && (
                  <a
                    href={msqLeetCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 mb-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-yellow-500/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-slate-700/50 text-yellow-500 group-hover:text-yellow-400 group-hover:bg-yellow-500/10 transition-colors">
                        <Code2 size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-200 group-hover:text-yellow-400 transition-colors">
                          Solve on LeetCode
                        </h3>
                        <p className="text-[10px] text-slate-500 group-hover:text-slate-400">
                          Click to open the original problem
                        </p>
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-slate-500 group-hover:text-yellow-400 transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}
              </div>
            )}

            {activeTab === "interview" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">
                  Common Questions
                </h3>
                {item.interviewQs?.map((q, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/30 border border-slate-700 rounded-lg p-4"
                  >
                    <div className="text-sm font-semibold text-slate-200 mb-2">
                      {q.q}
                    </div>
                    <div className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded border-l-2 border-blue-500">
                      {q.a}
                    </div>
                  </div>
                ))}
                {item.tips && (
                  <div className="mt-6">
                    <h3 className="text-xs font-bold text-yellow-500 uppercase mb-3">
                      Pro Tips
                    </h3>
                    {isReactJs && typeof item.tips === "string" ? (
                      <SyntaxHighLighter
                        codeString={item.tips}
                        isEditable={false}
                      />
                    ) : (
                      <ul className="space-y-2">
                        {Array.isArray(item.tips) &&
                          item.tips.map((tip, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-400 flex items-start gap-2"
                            >
                              <span className="text-yellow-500 mt-0.5">•</span>{" "}
                              {tip}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "dry" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCopyAndOpen()}
                    className="text-[10px] text-blue-400 mb-2 hover:underline flex items-center gap-1 transition-colors hover:text-blue-300"
                  >
                    <Code2 size={12} /> Copy to Playground
                  </button>
                </div>
                {isMultiSolution && (
                  <div className="flex flex-col justify-between items-center mb-4">
                    <div className="relative w-full">
                      <select
                        value={selectedSolIndex}
                        onChange={(e) =>
                          setSelectedSolIndex(Number(e.target.value))
                        }
                        className="w-full appearance-none bg-[#1e293b] border border-slate-600 text-xs text-slate-200 pl-3 pr-8 py-2.5 rounded shadow-sm focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
                      >
                        {item?.solution?.map((sol, idx) => (
                          <option
                            key={idx}
                            value={idx}
                            className="bg-[#1e293b]"
                          >
                            {sol.type}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <ChevronRight className="rotate-90" size={14} />
                      </div>
                    </div>
                  </div>
                )}
                <DsaDetailsAlgo
                  item={
                    isAlgo
                      ? item
                      : Array.isArray(item?.dryRunFunc)
                      ? {
                          ...item,
                          input: item?.solution[selectedSolIndex]?.input,
                          inputType:
                            item?.solution[selectedSolIndex]?.inputType,
                          dryRunFunc: item?.dryRunFunc[selectedSolIndex],
                          selectedSolIndex,
                          ...(item.solution
                            ? {
                                solution: item.solution.map((sol, i) => {
                                  const inputs = extraData?.[i] || {};
                                  return {
                                    ...sol,
                                    ...inputs,
                                  };
                                }),
                              }
                            : {}),
                        }
                      : item
                  }
                />
              </div>
            )}

            {activeTab === "sol" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-400 uppercase">
                      {item.implementationSteps
                        ? "Step-by-Step Implementation"
                        : "Reference Solution"}
                    </h3>
                    <button
                      onClick={() => handleCopyAndOpen()}
                      className="text-[10px] text-blue-400 hover:underline flex items-center gap-1 transition-colors hover:text-blue-300"
                    >
                      <Code2 size={12} /> Copy to Playground
                    </button>
                  </div>
                  {isMultiSolution && (
                    <div className="relative w-full">
                      <select
                        value={selectedSolIndex}
                        onChange={(e) =>
                          setSelectedSolIndex(Number(e.target.value))
                        }
                        className="w-full appearance-none bg-[#1e293b] border border-slate-600 text-xs text-slate-200 pl-3 pr-8 py-2.5 rounded shadow-sm focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
                      >
                        {item?.solution?.map((sol, idx) => (
                          <option
                            key={idx}
                            value={idx}
                            className="bg-[#1e293b]"
                          >
                            {sol.type}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <ChevronRight className="rotate-90" size={14} />
                      </div>
                    </div>
                  )}
                </div>

                {/* --- RENDER STEP-BY-STEP OR STANDARD CODE --- */}
                {item.implementationSteps ? (
                  // 1. RENDER STEP-BY-STEP GUIDE (For Real Qs)
                  <div className="space-y-8 pb-10">
                    {item.implementationSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="border-l-2 border-slate-700 pl-4 relative"
                      >
                        {/* Step Indicator Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-blue-500"></div>

                        <h4 className="text-sm font-bold text-blue-400 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                          {step.desc}
                        </p>

                        {/* Code Snippet for this step */}
                        {step.code && (
                          <div className="bg-[#1e1e1e] rounded-lg border border-slate-700 overflow-hidden">
                            <SyntaxHighLighter
                              codeString={step.code}
                              language="javascript"
                              isEditable={false}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // 2. RENDER STANDARD FULL CODE BLOCK (For Algorithms)
                  <div className="bg-[#1e1e1e] p-4 rounded-lg border border-slate-700 overflow-x-auto relative shadow-inner mb-6 no-scrollbar">
                    <SyntaxHighLighter codeString={currentSolutionCode || ""} />
                  </div>
                )}
              </div>
            )}

            {activeTab === "methods" && item.jsMethods && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300 space-y-4">
                {item.jsMethods.map((method, idx) => {
                  const isExpanded = expandedMethods[idx];

                  return (
                    <div
                      key={idx}
                      className="border border-slate-700 rounded-lg overflow-hidden bg-[#1e1e1e] shadow-sm hover:border-slate-500 transition-all"
                    >
                      <div
                        onClick={() => toggleMethod(idx)}
                        className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50 cursor-pointer gap-2 sm:gap-0 hover:bg-slate-700/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <button className="text-slate-400 hover:text-white transition-colors">
                            {isExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                          <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
                            <span className="text-blue-400">#{idx + 1}</span>{" "}
                            {method.title}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-7 sm:pl-0">
                          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-3">
                            {method.time && (
                              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-900/20">
                                T: {method.time}
                              </span>
                            )}
                            {method.space && (
                              <span className="flex items-center gap-1 text-purple-400 bg-purple-900/10 px-2 py-0.5 rounded border border-purple-900/20">
                                S: {method.space}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyAndOpen(method.code);
                            }}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-white bg-slate-700/50 hover:bg-blue-600 px-3 py-1.5 rounded transition-all border border-slate-600 hover:border-blue-500"
                            title="Copy code to Playground"
                          >
                            <Copy size={12} />{" "}
                            <span className="hidden sm:inline">Play</span>
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-0 animate-in slide-in-from-top-2 fade-in duration-200">
                          <SyntaxHighLighter
                            codeString={method.code}
                            language="javascript"
                            isEditable={false}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {showMainJs && (
          <div
            className="hidden lg:flex w-2 bg-[#1e293b] hover:bg-blue-500 cursor-col-resize items-center justify-center transition-colors z-20 group/resizer"
            onMouseDown={startResizing}
            title="Drag to resize"
          >
            <GripVertical
              size={12}
              className="text-slate-600 group-hover/resizer:text-white"
            />
          </div>
        )}

        {showMainJs && (
          <div
            ref={editorPanelRef}
            className="w-full flex flex-col bg-[#1e1e1e] h-1/2 lg:h-full border-t lg:border-t-0 animate-in slide-in-from-bottom-10 lg:slide-in-from-right-10 duration-300"
            style={{ flex: 1 }}
          >
            {/* === 1. CODE EDITOR SECTION === */}
            <div
              className={`flex flex-col transition-all duration-300 ${
                isEditorOpen
                  ? isConsoleOpen
                    ? "flex-[2] min-h-[100px]"
                    : "flex-1"
                  : "flex-none h-8"
              }`}
            >
              <div
                className="h-8 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-2 text-xs text-slate-300 shrink-0 cursor-pointer hover:bg-[#252525]"
                onClick={() => setIsEditorOpen(!isEditorOpen)}
              >
                <div className="flex items-center h-full">
                  <button className="mr-2 text-slate-500 hover:text-white">
                    {isEditorOpen ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                  <div
                    className={`px-3 h-full flex items-center border-t-2 ${
                      isEditorOpen
                        ? "border-blue-500 bg-[#2d2d2d]"
                        : "border-transparent"
                    }`}
                  >
                    main.js
                  </div>
                </div>

                {isEditorOpen && (
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[10px] text-slate-500 hidden sm:block mr-2">
                      JavaScript (Node)
                    </span>
                    <button
                      onClick={handleRun}
                      disabled={isRunning}
                      className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold text-white transition-all ${
                        isRunning
                          ? "bg-slate-600 cursor-wait"
                          : "bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20"
                      }`}
                    >
                      {isRunning ? (
                        <RotateCcw size={12} className="animate-spin" />
                      ) : (
                        <Play size={12} fill="currentColor" />
                      )}
                      Run
                    </button>
                    <button
                      onClick={() => setShowMainJs(false)}
                      className="ml-1 p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                      title="Close Editor"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {isEditorOpen && (
                <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden min-h-0">
                  <div className="absolute inset-0">
                    <SyntaxHighLighter
                      codeString={userCode}
                      onChange={(newCode) => setUserCode(newCode)}
                      isEditable={true}
                      language="javascript"
                      fullHeight={true}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* === 2. CONSOLE SECTION === */}
            <div
              className={`flex flex-col border-t border-slate-700 bg-[#0f172a] transition-all duration-300 ${
                isConsoleOpen ? "flex-1 min-h-[140px]" : "flex-none h-8"
              }`}
            >
              <div
                className="px-3 h-8 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between shrink-0 cursor-pointer hover:bg-slate-700/50"
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              >
                <div className="flex items-center gap-2">
                  <button className="text-slate-500 hover:text-white">
                    {isConsoleOpen ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                    <Terminal size={12} /> Console Output
                  </div>
                </div>

                {isConsoleOpen && output && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOutput(null);
                    }}
                    className="text-[10px] text-slate-500 hover:text-white px-2 py-0.5 rounded hover:bg-white/10"
                  >
                    Clear
                  </button>
                )}
              </div>

              {isConsoleOpen && (
                <div className="flex-1 p-3 font-mono overflow-y-auto no-scrollbar">
                  {output || (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 opacity-50">
                      <Terminal size={24} />
                      <span className="text-xs">
                        Run your code to see results here
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmDetail;
