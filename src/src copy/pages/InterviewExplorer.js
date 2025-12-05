import React, { useRef, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

const InterviewExplorer = () => {
  const tabs = [
    // { path: "/react", label: "React & JS", icon: "⚛️" },
    { path: "msq", label: "React MSQ DSA", icon: "🧠" },
    // { path: "/dsa", label: "Algorithms", icon: "🧠" },
    // { path: "/patterns", label: "Patterns", icon: "🎯" },
    // { path: "/design", label: "System Design", icon: "📐" },
  ];

  // --- Scroll Logic ---
  const tabsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* --- NAVIGATION BAR --- */}
      <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
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

          {/* Scrollable Tabs */}
          <div className="relative group/nav flex items-center max-w-full md:max-w-2xl">
            {canScrollLeft && (
              <button
                onClick={() => scrollTabs(-1)}
                className="absolute left-0 z-10 p-2 bg-gradient-to-r from-slate-900 to-transparent h-full flex items-center justify-center text-slate-400 hover:text-white transition-opacity"
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
              className="flex p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 backdrop-blur-sm overflow-x-auto no-scrollbar scroll-smooth gap-2"
            >
              {tabs.map((tab) => (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) => `
                    relative px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap shrink-0
                    ${
                      isActive
                        ? "text-white shadow-md shadow-black/20 ring-1 ring-white/10 bg-slate-800"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }
                  `}
                >
                  <span className="text-base filter drop-shadow-sm">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </NavLink>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scrollTabs(1)}
                className="absolute right-0 z-10 p-2 bg-gradient-to-l from-slate-900 to-transparent h-full flex items-center justify-center text-slate-400 hover:text-white transition-opacity"
              >
                <ChevronRight
                  className="bg-slate-800 rounded-full p-1 shadow-lg border border-slate-700"
                  size={24}
                />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- PAGE CONTENT RENDERED HERE --- */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-2 md:p-1 h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 py-2 mt-auto">
        <div className="max-w-7xl mx-auto px-2 text-center text-slate-500 text-sm">
          <p>Prepared for Technical Interviews. Built with React & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
};

export default InterviewExplorer;
