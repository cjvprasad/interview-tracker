import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Play, RotateCcw, Terminal } from "lucide-react";
import { getProblemDetails } from "./data";

const ProblemSolver = ({
  problemName,
  patternId,
  problemIndex,
  onBack,
  toggleProblemStatus,
  isCompleted,
}) => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("desc");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // FIX: Data population logic
  useEffect(() => {
    // 1. Reset data to null immediately to remove old question
    setData(null);
    setOutput(null);

    // 2. Fetch new data (simulate slight delay or instant fetch)
    const details = getProblemDetails(problemName);

    // 3. Update state
    if (details) {
      setData(details);
      setCode(details.starterCode || "// Write your code here");
    }
  }, [problemName, patternId]); // Depend on problemName

  if (!data)
    return (
      <div className="flex h-full w-full items-center justify-center text-slate-500 flex-col gap-2">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs">Loading Problem...</span>
      </div>
    );

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running...");

    setTimeout(() => {
      try {
        let logs = [];
        const mockConsole = { log: (...args) => logs.push(args.join(" ")) };

        // Execute code
        new Function("console", code)(mockConsole);

        const resultHtml = (
          <>
            <div className="text-emerald-400 font-bold mb-2 text-xs uppercase tracking-wider">
              Execution Complete
            </div>
            {logs.length > 0 ? (
              <div className="space-y-1">
                <div className="text-slate-500 text-[10px] border-b border-slate-700 pb-1 mb-1">
                  Console Output:
                </div>
                {logs.map((l, i) => (
                  <div key={i} className="font-mono text-slate-300 text-xs">
                     {l}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 italic text-xs">
                No console output.
              </div>
            )}
            {data.examples && data.examples[0] && (
              <div className="mt-4 pt-2 border-t border-slate-700">
                <div className="text-blue-400 text-[10px] font-bold uppercase">
                  Expected Output (Ex 1):
                </div>
                <div className="font-mono text-slate-400 text-xs mt-1 bg-slate-800 p-2 rounded">
                  {data.examples[0].output}
                </div>
              </div>
            )}
          </>
        );
        setOutput(resultHtml);
      } catch (e) {
        setOutput(
          <div className="text-red-400 text-xs">
            <div className="font-bold mb-1">Runtime Error:</div>
            {e.message}
          </div>
        );
      }
      setIsRunning(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] w-full absolute inset-0">
      {/* Header - Responsive for Z Fold 5 (wrap content) */}
      <header className="min-h-[56px] border-b border-slate-700 flex flex-wrap items-center justify-between px-4 bg-[#1e293b] shrink-0 gap-2 py-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-xs font-medium shrink-0"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div className="h-4 w-px bg-slate-600 shrink-0"></div>
          <h1 className="font-bold text-slate-200 text-sm truncate">
            {data.title}
          </h1>
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => toggleProblemStatus(patternId, problemIndex)}
            className={`px-3 py-1.5 text-xs border rounded flex items-center gap-2 transition-colors ${
              isCompleted
                ? "bg-emerald-900/30 text-emerald-400 border-emerald-800"
                : "border-slate-600 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Check
              size={12}
              className={isCompleted ? "opacity-100" : "opacity-50"}
            />
            <span className="hidden sm:inline">
              {isCompleted ? "Completed" : "Mark Done"}
            </span>
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-500 text-white rounded font-bold flex items-center gap-2 shadow-lg shadow-green-500/20"
          >
            {isRunning ? (
              <RotateCcw className="animate-spin" size={12} />
            ) : (
              <Play size={12} fill="currentColor" />
            )}{" "}
            <span className="hidden sm:inline">Run</span>
          </button>
        </div>
      </header>

      {/* Content - Flex col on Mobile, Row on Desktop */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-700 bg-[#0f172a] h-1/2 lg:h-full">
          <div className="flex border-b border-slate-700 bg-[#1e293b] overflow-x-auto no-scrollbar">
            {["desc", "interview", "solution"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-xs font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-400 text-blue-400 bg-[#0f172a]"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-sm text-slate-300 leading-relaxed">
            {activeTab === "desc" && (
              <div className="animate-in fade-in duration-300">
                <div dangerouslySetInnerHTML={{ __html: data.desc }} />
                <div className="mt-6 space-y-4">
                  {data.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/50 p-3 rounded border-l-2 border-slate-600 font-mono text-xs"
                    >
                      <p className="break-all">
                        <span className="text-slate-500">In:</span> {ex.input}
                      </p>
                      <p className="break-all">
                        <span className="text-slate-500">Out:</span> {ex.output}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-xs font-bold text-slate-400 mb-2">
                    Constraints:
                  </p>
                  <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                    {data.constraints &&
                      data.constraints.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "interview" && (
              <div className="space-y-2 animate-in fade-in duration-300">
                {data.interviewQs.map((q, i) => (
                  <details
                    key={i}
                    className="bg-slate-800/30 border border-slate-700 rounded open:bg-slate-800/50"
                  >
                    <summary className="px-4 py-3 cursor-pointer font-medium text-xs text-slate-200 hover:text-blue-400">
                      {q.q}
                    </summary>
                    <div className="px-4 py-3 border-t border-slate-700 text-xs text-slate-400 bg-slate-900/50">
                      {q.a}
                    </div>
                  </details>
                ))}
              </div>
            )}
            {activeTab === "solution" && (
              <div className="bg-[#1e1e1e] p-4 rounded border border-slate-700 overflow-x-auto animate-in fade-in duration-300">
                <pre className="font-mono text-blue-300 text-xs">
                  {data.solution}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#1e1e1e] h-1/2 lg:h-full">
          <div className="h-8 bg-[#1e1e1e] border-b border-[#333] flex items-center px-2 text-xs text-slate-300 shrink-0 justify-between">
            <div className="px-3 h-full flex items-center border-t-2 border-blue-500 bg-[#2d2d2d]">
              Solution.js
            </div>
            <div className="text-[10px] text-slate-500 mr-2">
              JavaScript (Node)
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            className="flex-1 w-full bg-[#1e1e1e] text-slate-300 font-mono text-sm p-4 outline-none resize-none leading-relaxed"
          />
          <div className="h-1/3 min-h-[120px] max-h-[200px] border-t border-slate-700 bg-[#0f172a] flex flex-col shrink-0">
            <div className="px-3 py-1 bg-[#1e293b] border-b border-slate-700 text-[10px] font-bold text-slate-400 flex items-center gap-2">
              <Terminal size={10} /> CONSOLE
            </div>
            <div className="p-3 font-mono text-xs overflow-y-auto flex-1">
              {output ? (
                output
              ) : (
                <div className="text-slate-600 italic opacity-50">
                  Run code to see output...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
