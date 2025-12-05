import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  dsaAlgorithms,
  reactQuestionsData,
  msqDSAData,
  DesignData,
} from "../data/MainData";
import DsaDetailsAlgo from "../pages/DsaDetailsAlgo"; // Ensure this path is correct

// --- Shared Components (UniversalCard) ---
const UniversalCard = ({ id, title, subtitle, meta, category, onClick }) => (
  <div
    onClick={onClick}
    className="relative group card-hover bg-[#1e293b] border border-slate-700 rounded-xl shadow-md cursor-pointer overflow-hidden h-full min-h-[180px] hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="p-5 pr-12 flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-slate-500 font-mono">ID: {id}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-3 font-medium">
          {subtitle}
        </p>
      </div>
      {meta && (
        <div className="pt-3 border-t border-slate-700 flex gap-4 text-xs text-slate-500 font-mono">
          {meta}
        </div>
      )}
    </div>
    <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-800/50 border-l border-slate-700 flex items-center justify-center hover:bg-slate-700 transition">
      <div
        className="vertical-text text-[10px] font-bold text-emerald-400 tracking-widest whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
      >
        {category ? category.toUpperCase() : "GENERAL"}
      </div>
    </div>
  </div>
);

const DSAView = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(dsaAlgorithms.map((a) => a.category))],
    []
  );

  const selected = useMemo(() => {
    if (!id) return null;
    return dsaAlgorithms.find((item) => item.id === parseInt(id));
  }, [id]);

  const filtered = useMemo(() => {
    return dsaAlgorithms.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.algorithm.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || item.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  // If URL has ID, show Detail
  if (selected) {
    return (
      <DsaDetailsAlgo
        item={selected}
        onBack={() => navigate("/dsa")}
        // We pass updateURL just in case child needs it, but we rely on React Router mostly
        updateURL={() => {}}
      />
    );
  }

  // Show List
  return (
    <div className="animation-fade-in h-full overflow-y-auto custom-scrollbar pb-10">
      <header className="mb-8 text-center md:text-left mt-4">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
          <span className="bg-purple-500/20 p-2 rounded-lg text-2xl">🧠</span>{" "}
          Algorithms
        </h2>
        <p className="text-slate-400 max-w-2xl">
          Your quick reference guide for complexity analysis, edge cases, and
          dry run logic.
        </p>
      </header>

      <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 shadow-lg mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <span className="absolute left-3 top-3 text-slate-500">🔍</span>
            <input
              placeholder="Search algorithms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white p-2.5 pr-10 rounded-lg min-w-[150px] focus:border-blue-500 outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 rounded-lg font-medium transition"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <UniversalCard
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={item.algorithm}
            category={item.category}
            meta={
              <>
                <span className="text-green-400">⏱ {item.timeComplexity}</span>
                <span className="text-purple-400">
                  💾 {item.spaceComplexity}
                </span>
              </>
            }
            onClick={() => navigate(`/dsa/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default DSAView;
