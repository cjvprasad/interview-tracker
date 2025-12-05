import React, { useState, useEffect, useRef } from "react";
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
  Layout,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import SyntaxHighLighter from "../../common/SyntaxHighLighter";
import DsaDetailsAlgo from "../DsaDetailsAlgo";
import LogGroup from "../Logs/LogGroup";

const AlgorithmDetail = ({
  item,
  onBack,
  toggleStatus,
  isCompleted,
  isAlgo,
}) => {
  // Left Panel State
  const [activeTab, setActiveTab] = useState("desc");
  const [showDryRun, setShowDryRun] = useState(false);
  const [selectedSolIndex, setSelectedSolIndex] = useState(0);

  // Toggle for Right Panel (Editor)
  const [showMainJs, setShowMainJs] = useState(false);

  // Right Panel (Editor) State
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Refs for Scroll & Navigation
  const tabsRef = useRef(null);
  const editorPanelRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Helper: Check if solution is array
  const isMultiSolution = Array.isArray(item.solution);
  const currentSolutionCode = isMultiSolution
    ? item.solution[selectedSolIndex]?.code
    : item.solution || item.code;

  // Check Scroll Capability (Tabs)
  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };
  useEffect(() => {
    setActiveTab("dry");
  }, [isAlgo]);

  // Scroll Handlers
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle Copy & Auto-Scroll
  const handleCopyAndOpen = () => {
    setUserCode(currentSolutionCode);
    if (!showMainJs) {
      setShowMainJs(true);
    }
    // Small timeout to allow render before scrolling
    setTimeout(() => {
      editorPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // Reset state when item changes
  useEffect(() => {
    let defaultCode = "// Write your code here";
    if (item.starterCode) {
      defaultCode = item.starterCode;
    } else if (Array.isArray(item.solution)) {
      defaultCode = item.solution[0]?.code;
    } else if (item.solution) {
      defaultCode = item.solution;
    } else {
      defaultCode = `function solve(x){
  return false;
}
console.log(solve());`;
    }

    setUserCode(defaultCode);
    setOutput(null);
    setActiveTab("desc");
    setSelectedSolIndex(0);
    setShowMainJs(false);
  }, [item]);

  // Run Code Logic
  const handleRun = () => {
    setIsRunning(true);
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

        const resultHtml = (
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
        setOutput(resultHtml);
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

  console.log("Algorithm Details")
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

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">
              Time Complexity
            </span>
            <span className="text-xs font-mono text-green-400">
              {item.timeComplexity || "O(n)"}
            </span>
          </div>

          {/* 1. Visual Dry Run Button (Toggle) */}
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

          {/* 2. Playground Button */}
          <button
            onClick={() => setShowMainJs(!showMainJs)}
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

          {/* 3. Mark Done Button */}
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

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT PANEL: Content (Tabs) */}
        <div
          className={`flex flex-col border-r border-slate-700 bg-[#0f172a] transition-all duration-300 ease-in-out z-0
          ${showMainJs ? "w-full lg:w-1/2 h-1/2 lg:h-full" : "w-full h-full"}`}
        >
          {/* Tabs Header */}
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
                className="flex border-b border-slate-700 bg-[#1e293b] overflow-x-auto no-scrollbar"
              >
                {[
                  { id: "desc", label: "Concept", icon: BookOpen },
                  { id: "interview", label: "Interview", icon: HelpCircle },
                  ...(showDryRun
                    ? [{ id: "dry", label: "Dry Run", icon: Eye }]
                    : []),
                  { id: "sol", label: "Solution", icon: Code2 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-slate-300">
            {activeTab === "desc" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300 space-y-6">
                <div
                  className="prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
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
                        <li
                          style={{
                            textAlign: "start",
                          }}
                          key={i}
                          className="text-sm  text-slate-300 leading-relaxed"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.edgeCases && (
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                      <Lightbulb size={14} className="text-yellow-500" /> Edge
                      Cases
                    </h3>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400">
                      {item.edgeCases.map((c, i) => (
                        <li
                          style={{
                            textAlign: "start",
                          }}
                          key={i}
                          className="text-sm  text-slate-300 leading-relaxed"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    <ul className="space-y-2">
                      {item.tips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-400 flex items-start gap-2"
                        >
                          <span className="text-yellow-500 mt-0.5">•</span>{" "}
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "dry" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex justify-between items-center">
                  {isMultiSolution && (
                    <div className="relative w-full">
                      <select
                        value={selectedSolIndex}
                        onChange={(e) =>
                          setSelectedSolIndex(Number(e.target.value))
                        }
                        className="w-full appearance-none bg-[#1e293b] border border-slate-600 text-xs text-slate-200 pl-3 pr-8 py-2.5 rounded shadow-sm focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
                      >
                        {item.solution.map((sol, idx) => (
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
                {/* <LogGroup /> */}
                <div className="space-y-1  py-2 font-mono text-xs">
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
                          }
                        : item
                    }
                  />
                  {/* {isAlgo ? (
                    <>
                      <DsaDetailsAlgo item={item} />
                    </>
                  ) : (
                    <>
                      {item.dryRunStatic ? (
                        item.dryRunStatic.map((step, i) => (
                          <div
                            key={i}
                            className="border-l-2 border-slate-700 pl-4 py-2 hover:bg-slate-800/30 transition-colors"
                          >
                            <span className="text-slate-500 mr-2">
                              {i + 1}.
                            </span>{" "}
                            {step}
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-500 italic">
                          No static dry run data available. Use the playground
                          to run code.
                        </div>
                      )}
                    </>
                  )} */}
                </div>
              </div>
            )}

            {activeTab === "sol" && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-400 uppercase">
                      Reference Solution
                    </h3>
                    <button
                      onClick={handleCopyAndOpen}
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
                        {item.solution.map((sol, idx) => (
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

                <div className="bg-[#1e1e1e] p-4 rounded-lg border border-slate-700 overflow-x-auto relative shadow-inner mb-6">
                  <SyntaxHighLighter codeString={currentSolutionCode} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Code Editor & Console - CONDITIONAL RENDER */}
        {showMainJs && (
          <div
            ref={editorPanelRef}
            className="w-full lg:w-1/2 flex flex-col bg-[#1e1e1e] h-1/2 lg:h-full border-t lg:border-t-0 animate-in slide-in-from-bottom-10 lg:slide-in-from-right-10 duration-300"
          >
            {/* Editor Toolbar */}
            <div className="h-8 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-2 text-xs text-slate-300 shrink-0">
              <div className="px-3 h-full flex items-center border-t-2 border-blue-500 bg-[#2d2d2d]">
                main.js
              </div>
              <div className="flex items-center gap-3">
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
            </div>

            {/* Code Textarea */}
            <div className="flex-1 relative">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                spellCheck="false"
                className="absolute inset-0 w-full h-full bg-[#1e1e1e] text-slate-300 font-mono text-sm p-4 outline-none resize-none leading-relaxed custom-scrollbar"
                placeholder="// Enter your javascript code here..."
              />
            </div>

            {/* Console Output */}
            <div className="h-1/3 min-h-[140px] max-h-[300px] border-t border-slate-700 bg-[#0f172a] flex flex-col shrink-0">
              <div className="px-3 py-1.5 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                  <Terminal size={12} /> Console Output
                </div>
                {output && (
                  <button
                    onClick={() => setOutput(null)}
                    className="text-[10px] text-slate-500 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex-1 p-3 font-mono overflow-y-auto custom-scrollbar">
                {output || (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 opacity-50">
                    <Terminal size={24} />
                    <span className="text-xs">
                      Run your code to see results here
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmDetail;
