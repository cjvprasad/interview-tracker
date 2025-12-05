import React, { useEffect, useState, useMemo } from "react"; // 1. Import useMemo
import SyntaxHighLighter from "../common/SyntaxHighLighter";
import {
  AlertCircle,
  ChevronLeft,
  Edit2,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import LogViewer from "./Logs/LogViewer";

// ... (Keep your parseInputValue function exactly as is) ...
const parseInputValue = (value, type) => {
  const cleanValue = value.trim();

  if (type === "N") {
    const num = Number(cleanValue);
    if (isNaN(num))
      throw new Error(`Expected a valid Number, got "${cleanValue}"`);
    return num;
  }

  if (type === "B") {
    if (cleanValue === "true") return true;
    if (cleanValue === "false") return false;
    throw new Error(`Expected boolean (true/false), got "${cleanValue}"`);
  }

  if (type === "A" || type === "Object") {
    try {
      const parsed = JSON.parse(cleanValue);
      if (type === "Array" && !Array.isArray(parsed)) {
        throw new Error("Expected an Array []");
      }
      return parsed;
    } catch (e) {
      throw new Error(`Invalid JSON format for ${type}: ${e.message}`);
    }
  }

  return cleanValue;
};

const DsaDetailsAlgo = (props) => {
  const { item, onBack, updateURL } = props || {};

  const [inputState, setInputState] = useState({});
  const [dynamicLogs, setDynamicLogs] = useState(null);
  const [error, setError] = useState(null);
  const [inputConfigs, setInputConfigs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // =========================================================
  // ✅ FIX: Memoize activeSolution to prevent infinite loops
  // =========================================================
  const activeSolution = useMemo(() => {
    const index = item?.selectedSolIndex || 0; // Default to 0 if undefined
    return item?.solution?.[index] ?? item;
  }, [item]);
  console.log(inputConfigs, "activeSolution", inputState, activeSolution);

  const hasImplementation = typeof item?.dryRunFunc === "function";

  useEffect(() => {
    updateURL?.({ id: item.id });
  }, [item?.id, updateURL]);

  // Helper to get configuration of inputs for the current solution
  // Moved up so it can be used in effects if needed,
  // but strictly speaking functions inside render are recreated too.
  // Ideally, wrap this in useCallback, but for now, it's not a dependency.
  const getinputConfig = () => {
    const configs = [];
    console.log(activeSolution,"activeSolution");
    
    if (activeSolution?.inputType1) {
      let i = 1;
      while (activeSolution[`inputType${i}`]) {
        configs.push({
          key: `input${i}`,
          type: activeSolution[`inputType${i}`],
          label: `Input ${i}`,
        });
        i++;
      }
    } else if (activeSolution?.inputType) {
      configs.push({
        key: "input",
        type: activeSolution.inputType,
        label: "Input",
      });
    } else if (item?.inputType) {
      configs.push({
        key: "input",
        type: item.inputType,
        label: "Input",
      });
    } else {
      configs.push({
        key: "input",
        type: item.input,
        label: "Input",
      });
    }
    setInputConfigs(configs);
  };

  const getInputState = () => {
    const initialInputs = {};
    if (activeSolution?.inputType1) {
      let i = 1;
      while (activeSolution[`inputType${i}`]) {
        const rawVal = activeSolution[`input${i}`];
        initialInputs[`input${i}`] =
          typeof rawVal === "object" ? JSON.stringify(rawVal) : String(rawVal);
        i++;
      }
    } else if (activeSolution?.input !== undefined) {
      const rawVal = activeSolution.input;
      initialInputs["input"] =
        typeof rawVal === "object" ? JSON.stringify(rawVal) : String(rawVal);
    } else if (item?.input !== undefined) {
      const rawVal = item.input;
      initialInputs["input"] =
        typeof rawVal === "object" ? JSON.stringify(rawVal) : String(rawVal);
    }
    setInputState(initialInputs);
  };

  // 1. Initialize logs/config when input changes (usually from raw data)
  useEffect(() => {
    setDynamicLogs(null);
    getinputConfig();
  }, [item?.input]); // Removed getInputState from here to avoid conflicts

  // 2. Initialize inputs when solution/ID changes
  useEffect(() => {
    setDynamicLogs(null);
    setError(null);
    setIsEditing(false);
    getInputState();
    getinputConfig(); // Ensure config updates when solution changes
  }, [item?.id, activeSolution]); // activeSolution is now stable thanks to useMemo

  const handleRun = () => {
    if (!hasImplementation) return;
    try {
      setError(null);
      const args = [];
      inputConfigs.forEach((config) => {
        const rawValue = inputState[config.key]; // Fixed: was inputConfigs[config.key]
        const parsed = parseInputValue(rawValue, config.type);
        args.push(parsed);
      });

      const logs = item.dryRunFunc(...args);
      setDynamicLogs(logs);
    } catch (err) {
      setError(err.message);
    }
  };

  const logsToDisplay = dynamicLogs || [];

  return (
    <div className="p-4 md:p-8 bg-[#1e293b] rounded-xl shadow-2xl border border-slate-700 animation-fade-in w-full max-w-6xl mx-auto">
      {onBack && (
        <>
          <button
            onClick={onBack}
            className="mb-6 text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 group"
          >
            <div className="p-1 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition">
              <ChevronLeft size={16} />
            </div>{" "}
            Back to List
          </button>

          <div className="border-b border-slate-700 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {item?.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-400">
              <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded border border-blue-500/30">
                {item?.category}
              </span>
              <span className="flex items-center gap-1 text-green-400">
                ⏱ {item?.timeComplexity || "Variable"}
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                💾 {item?.spaceComplexity || "Variable"}
              </span>
            </div>

            <div
              className="mt-4 text-slate-300"
              dangerouslySetInnerHTML={{ __html: item?.desc }}
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-full">
        {/* LEFT COLUMN: Inputs & Logs */}
        <div className="space-y-6">
          <section className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 md:gap-0">
              {" "}
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                🏃 Dry Run
                {dynamicLogs && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2 border border-green-500/20">
                    Live Result
                  </span>
                )}
              </h3>
              <div className="flex gap-2 items-center justify-end mt-4 pt-3 border-t border-slate-800/50">
                {/* RUN BUTTON */}
                <button
                  onClick={handleRun}
                  disabled={inputConfigs.length === 0}
                  // CHANGED:
                  // 1. px-3 py-1.5 (Mobile) -> md:px-5 md:py-2 (Desktop)
                  // 2. text-xs (Mobile) -> md:text-sm (Desktop)
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 md:px-5 md:py-2 rounded text-xs md:text-sm font-bold flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                >
                  <Play
                    size={14}
                    className="w-3 h-3 md:w-3.5 md:h-3.5"
                    fill="currentColor"
                  />
                  {isEditing ? "Save & Run" : "Run Code"}
                </button>

                {/* EDIT BUTTON */}
                {hasImplementation && (
                  <button
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setError(null);
                    }}
                    // CHANGED:
                    // 1. px-2 (Mobile) -> md:px-3 (Desktop)
                    // 2. text-[10px] (Mobile) -> md:text-xs (Desktop)
                    className={`flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-1.5 rounded transition font-medium text-[10px] md:text-xs
      ${
        isEditing
          ? "bg-slate-700 text-slate-300 hover:text-white"
          : "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-500/20"
      }`}
                  >
                    {isEditing ? (
                      <>
                        <X size={12} className="w-3 h-3" /> Cancel Edit
                      </>
                    ) : (
                      <>
                        <Edit2 size={12} className="w-3 h-3" /> Edit Inputs
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* DYNAMIC INPUTS */}
            {
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-4 animation-fade-in">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  {inputConfigs.length === 0 && (
                    <p className="text-slate-500 text-sm w-full">
                      No inputs required.
                    </p>
                  )}

                  {inputConfigs.map((config) => (
                    <div key={config.key} className="flex-1 min-w-0">
                      <label className="block text-xs text-slate-400 mb-1.5 font-mono uppercase flex justify-between items-center">
                        <span className="font-bold tracking-wider">
                          {config.label}
                        </span>
                        <span className="text-xs text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                          {config.type}
                        </span>
                      </label>

                      {/* LOGIC: Show Input OR Show Read-Only Div */}
                      {isEditing ? (
                        <input
                          type="text"
                          autoFocus={isEditing}
                          value={inputState[config.key] || ""}
                          onChange={(e) =>
                            setInputState((prev) => ({
                              ...prev,
                              [config.key]: e.target.value,
                            }))
                          }
                          className="w-full bg-slate-950 border border-blue-500/50 rounded px-3 py-2.5 text-sm font-mono text-white focus:ring-2 focus:ring-blue-500/30 outline-none transition shadow-inner"
                          placeholder={`Enter ${config.type}...`}
                        />
                      ) : (
                        <div className="w-full bg-slate-950/50 border border-slate-800 rounded px-3 py-2.5 text-sm font-mono text-blue-300 break-words whitespace-pre-wrap">
                          {inputState[config.key] || (
                            <span className="text-slate-600 italic">Empty</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="flex items-start gap-2 mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            }

            {/* LOG VIEWER */}
            <LogViewer logs={logsToDisplay} />

            {dynamicLogs && (
              <button
                onClick={() => setDynamicLogs(null)}
                className="mt-4 text-xs text-slate-500 hover:text-white flex items-center gap-1 mx-auto transition"
              >
                <RotateCcw size={12} /> Reset Logs
              </button>
            )}
          </section>

          {onBack && (
            <section className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
                <h4 className="text-red-400 font-bold mb-2 text-sm flex items-center gap-2">
                  ⚠️ CONSTRAINTS
                </h4>
                <ul className="list-disc pl-4 text-slate-400 text-sm space-y-1">
                  {item?.constraints?.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-yellow-900/10 border border-yellow-900/30 p-4 rounded-lg">
                <h4 className="text-yellow-400 font-bold mb-2 text-sm flex items-center gap-2">
                  💡 TIPS
                </h4>
                <ul className="list-disc pl-4 text-slate-400 text-sm space-y-1">
                  {item?.tips?.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Implementation Code */}
        {onBack && (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold text-white mb-3">
              Implementation ({activeSolution.type || "Default"})
            </h3>
            <div className="flex-1 min-h-[400px] relative">
              <div className="absolute inset-0">
                <SyntaxHighLighter
                  codeString={activeSolution.code || "// No code available"}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-400 mt-4 bg-slate-800/50 p-3 rounded border border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Input:</span>
                <span className="text-white">
                  ({inputConfigs.map((c) => c.type).join(", ")})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DsaDetailsAlgo;
