import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import Router Hooks
import { ChevronLeft } from "lucide-react";
// { dsaAlgorithms, reactQuestionsData, msqDSAData ,DesignData};
import {
  dsaAlgorithms,
  reactQuestionsData,
  msqDSAData,
  DesignData,
} from "../data/MainData";
import SyntaxHighLighter from "../common/SyntaxHighLighter"; // Ensure path matches

// --- Local Sub-Component: Question Card ---
const QuestionCard = ({ id, title, explanation, category, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-[#1e293b] border border-gray-700 hover:border-blue-500 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-lg"
  >
    <div className="flex justify-between items-start mb-3 ">
      <span className="text-xs font-mono text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
        {category}
      </span>
      <span className="text-xs text-gray-600 group-hover:text-blue-400 transition">
        #{id}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition text-left">
      {title}
    </h3>
    <p className="text-gray-400 text-sm line-clamp-3 mb-4 text-left">
      {explanation}
    </p>
    <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide group-hover:underline text-left">
      View Details →
    </div>
  </div>
);

// --- Local Sub-Component: Detail View ---
const ReactDetail = ({ question, onBack }) => {
  return (
    <div className="p-4 md:p-8 bg-[#1e293b] rounded-xl shadow-2xl border border-slate-700 animation-fade-in">
      <button
        onClick={onBack}
        className="mb-6 text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 group"
      >
        <div className="p-1 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition">
          <ChevronLeft size={16} />
        </div>
        Back to List
      </button>
      <div className="border-b border-slate-700 pb-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
          <span className="text-blue-500">Q{question.id}:</span>{" "}
          {question.title}
        </h1>
        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide border border-blue-500/20">
          {question.category}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mt-8 mb-2 flex items-center gap-2">
        📝 Explanation
      </h3>
      <SyntaxHighLighter
        codeString={question.explanation}
        isExplanation={true}
      />
      <h3 className="text-lg font-semibold text-white mt-8 mb-2 flex items-center gap-2">
        💡 Interview Tips
      </h3>
      <SyntaxHighLighter codeString={question.tips} isExplanation={true} />
      <h3 className="text-lg font-semibold text-white mt-8 mb-2 flex items-center gap-2">
        💻 Code Snippet
      </h3>
      <SyntaxHighLighter codeString={question.codeString} />
      {question.output && (
        <>
          <h3 className="text-lg font-semibold text-white mt-8 mb-2 flex items-center gap-2">
            ✅ Expected Output
          </h3>
          <SyntaxHighLighter output={question.output} />
        </>
      )}
    </div>
  );
};

// --- Main Page Component ---
const ReactView = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const categories = useMemo(
    () => ["All", ...new Set(reactQuestionsData.map((q) => q.category))],
    []
  );

  // Filter Logic
  const filteredData = useMemo(() => {
    let data = reactQuestionsData.filter((q) => {
      const matchSearch =
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.explanation.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || q.category === category;
      return matchSearch && matchCat;
    });
    return data.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [search, category, sortBy, sortOrder]);

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setSortBy("id");
    setSortOrder("asc");
  };

  // 1. IF ID EXISTS: Show Detail View
  if (id) {
    const selectedQuestion = reactQuestionsData.find(
      (q) => q.id.toString() === id
    );
    console.log(selectedQuestion, "selectedQuestion");

    if (selectedQuestion) {
      return (
        <ReactDetail
          question={selectedQuestion}
          onBack={() => navigate("/react")} // Go back to list
        />
      );
    }
    return <div className="text-white p-4">Question not found.</div>;
  }

  // 2. ELSE: Show List View
  return (
    <div className="animation-fade-in">
      <header className="mb-8 text-center md:text-left mt-4">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
          <span className="bg-blue-500/20 p-2 rounded-lg text-2xl">⚛️</span>{" "}
          React Concepts
        </h2>
        <p className="text-slate-400 max-w-2xl">
          Master the Virtual DOM, Hooks, Lifecycle methods, and component
          patterns.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 shadow-lg mb-6">
        <div className="mb-4 relative">
          <span className="absolute left-3 top-3 text-slate-500">🔍</span>
          <input
            placeholder="Search keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white py-2 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-600"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1 ml-1 font-bold">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="dark-select w-full bg-slate-900 border border-slate-700 text-white py-2 px-3 rounded-lg text-sm focus:border-blue-500 outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1 ml-1 font-bold">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="dark-select w-full bg-slate-900 border border-slate-700 text-white py-2 px-3 rounded-lg text-sm focus:border-blue-500 outline-none"
            >
              <option value="id">ID</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1 ml-1 font-bold">
              Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="dark-select w-full bg-slate-900 border border-slate-700 text-white py-2 px-3 rounded-lg text-sm focus:border-blue-500 outline-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg font-bold text-sm transition border border-slate-600"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {filteredData.length > 0 ? (
          filteredData.map((q) => (
            <QuestionCard
              key={q.id}
              {...q}
              onClick={() => navigate(`/react/${q.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center p-10 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
            No matching questions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactView;
