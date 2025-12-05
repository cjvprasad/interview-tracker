// src/components/QuizDetail.jsx
import React, { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

const QuizDetail = ({ item, onBack, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === item.answer) onComplete(item.id);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] absolute inset-0 w-full animate-in fade-in duration-200">
      <header className="h-14 border-b border-slate-700 flex items-center px-4 bg-[#1e293b] shrink-0 gap-3">
        <button onClick={onBack} className="text-slate-400 hover:text-white">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-bold text-emerald-400 uppercase border border-emerald-900 bg-emerald-900/20 px-2 py-0.5 rounded">
            {item.difficulty}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-xl">
          <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg text-slate-200 font-semibold mb-6">{item.question}</h2>

            <div className="space-y-3">
              {item.options.map((opt) => {
                let statusClass = "border-slate-700 bg-slate-800/50";
                if (submitted) {
                  if (opt.id === item.answer) statusClass = "border-emerald-500 bg-emerald-900/20 text-emerald-400";
                  else if (selected === opt.id) statusClass = "border-red-500 bg-red-900/20 text-red-400";
                  else statusClass = "opacity-50 border-transparent";
                } else if (selected === opt.id) {
                  statusClass = "border-blue-500 bg-blue-900/20 text-blue-400";
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => !submitted && setSelected(opt.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center ${statusClass}`}
                  >
                    <span className="text-sm font-medium">{opt.text}</span>
                    {submitted && opt.id === item.answer && <CheckCircle size={16} />}
                    {submitted && selected === opt.id && opt.id !== item.answer && <XCircle size={16} />}
                  </button>
                );
              })}
            </div>

            {!submitted && (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
              >
                Submit Answer
              </button>
            )}

            {submitted && (
              <div className="mt-6 p-4 bg-slate-800 border-l-4 border-blue-500 rounded-r text-sm text-slate-300 leading-relaxed animate-in slide-in-from-bottom-2">
                <span className="font-bold text-blue-400 block mb-1">Explanation:</span>
                {item.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;