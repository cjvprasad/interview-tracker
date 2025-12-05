import React, { useState } from "react";
import {
  Lightbulb,
  Code,
  CheckCircle,
  Circle,
  Play,
  Layers,
} from "lucide-react";
import { phases, patterns } from "./MainData";

const PatternDetail = ({
  patternId,
  onOpenProblem,
  toggleProblemStatus,
  completedProblems,
  onMenuClick,
}) => {
  const pattern = patterns?.find((p) => p?.id === parseInt(patternId));
  const phase = phases?.find((ph) => ph?.id === pattern?.phase);
  const [filter, setFilter] = useState("All");

  const difficultyColors = {
    Easy: "text-green-400 bg-green-900/30 border-green-800",
    Medium: "text-yellow-400 bg-yellow-900/30 border-yellow-800",
    Hard: "text-red-400 bg-red-900/30 border-red-800",
  };
  const difficulties = ["Easy", "Medium", "Hard"];

  // Generate problem list with difficulties (simulated)
  console.log(pattern, patternId, "patternId", patterns);

  const problems = pattern?.problems
    ?.map((p, i) => ({
      name: p,
      index: i,
      difficulty: difficulties[i % 3],
    }))
    .filter((p) => filter === "All" || p.difficulty === filter);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0f172a] overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-700 flex items-center px-4 md:px-8 bg-[#0f172a]/90 backdrop-blur z-10 shrink-0 gap-4">
        <button onClick={onMenuClick} className="md:hidden text-slate-400">
          <Layers size={20} />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="hidden md:inline">{phase?.title}</span>
            <span>/</span>
            <span>Pattern {pattern?.id}</span>
          </div>
          <h1 className="text-xl font-bold text-white truncate">
            {pattern?.name}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto pb-20">
          {/* Strategy Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-sm uppercase">
                <Lightbulb size={16} /> The Strategy
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {pattern?.desc}
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3 border-l-2 border-blue-500 text-xs text-slate-400 italic">
                "{pattern?.strategy}"
              </div>
            </div>
            <div className="bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden flex flex-col">
              <div className="bg-[#1e293b] px-4 py-2 border-b border-slate-700 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>Anchor Code</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-emerald-400">
                  {pattern?.anchor.logic}
                </pre>
              </div>
            </div>
          </div>

          {/* Problem List */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 flex flex-col md:flex-row justify-between gap-4">
              <h2 className="font-bold text-white flex items-center gap-2">
                <Code size={16} className="text-slate-400" /> Practice Problems
              </h2>
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-800 text-slate-300 text-xs border border-slate-600 rounded px-2 py-1"
              >
                <option value="All">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="divide-y divide-slate-700/50">
              {problems?.map((prob) => {
                const pid = `${pattern?.id}-${prob.index}`;
                const isDone = completedProblems[pid];

                return (
                  <div
                    key={prob.index}
                    onClick={() => onOpenProblem(prob.name, prob.index)}
                    className={`group flex items-center px-4 md:px-6 py-4 cursor-pointer transition-colors ${
                      isDone
                        ? "bg-emerald-900/10 border-l-2 border-emerald-500"
                        : "hover:bg-slate-700/30 border-l-2 border-transparent"
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProblemStatus(pattern?.id, prob.index);
                      }}
                      className="shrink-0 mr-4"
                    >
                      {isDone ? (
                        <CheckCircle size={20} className="text-emerald-500" />
                      ) : (
                        <Circle
                          size={20}
                          className="text-slate-600 group-hover:text-slate-400"
                        />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-sm font-medium ${
                          isDone
                            ? "text-emerald-400 opacity-80"
                            : "text-slate-200 group-hover:text-blue-400"
                        }`}
                      >
                        {prob.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[10px] border px-2 py-0.5 rounded-full ${
                          difficultyColors[prob.difficulty]
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                      <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded hidden md:flex items-center gap-2">
                        Solve <Play size={10} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDetail;
