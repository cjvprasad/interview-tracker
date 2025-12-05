import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const LogGroup = ({ group, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isResult =
    group.title &&
    (group.title.includes("Result") || group.title.includes("Final"));
  const isPass = group.title && group.title.includes("Pass");

  if (group.items.length === 0) {
    return (
      <div
        className={`p-3 rounded break-words border-l-2 bg-slate-900/50 border-slate-700 mb-2`}
      >
        <span className={isPass ? "text-blue-300 font-bold" : ""}>
          {group.title}
        </span>
      </div>
    );
  }

  return (
    <div className="mb-2 border border-slate-800 rounded bg-slate-900/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 text-left transition-colors ${
          isOpen ? "bg-slate-800/80" : "bg-slate-900 hover:bg-slate-800/50"
        }`}
      >
        <span
          className={`font-bold text-sm ${
            isPass ? "text-blue-400" : "text-slate-300"
          }`}
        >
          {group.title}
        </span>
        {isOpen ? (
          <ChevronDown size={14} className="text-slate-500" />
        ) : (
          <ChevronRight size={14} className="text-slate-500" />
        )}
      </button>
      {isOpen && (
        <div className="p-3 bg-slate-950/50 border-t border-slate-800 space-y-1.5">
          {group.items.map((item, i) => {
            const isSwap = typeof item === "string" && item.includes("swap");
            const isResultLog =
              typeof item === "string" && item.includes("Result");
            return (
              <div
                key={i}
                className={`pl-3 border-l-2 text-xs flex gap-2 ${
                  isSwap
                    ? "border-yellow-500/50 text-yellow-100"
                    : isResultLog
                    ? "border-green-500/50 text-green-100 font-semibold mt-2"
                    : "border-slate-700 text-slate-400"
                }`}
              >
                <span className="opacity-50 select-none">{i + 1}.</span>
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default LogGroup;
