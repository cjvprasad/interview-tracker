import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
  Circle,
  CheckCircle,
  ChevronsDown,
  ChevronsUp,
  Filter,
  RefreshCcw,
} from "lucide-react";

const Sidebar = ({
  title,
  groups,
  items,
  currentModeSlug,
  type,
  activeId,
  onSelect,
  completedIds,
  toggleStatus,
  mobileOpen,
  closeMobile,
  desktopOpen,
  difficultyFilter,
  setDifficultyFilter,
}) => {
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [groupFilters, setGroupFilters] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    setGroupFilters({});
  }, [difficultyFilter, currentModeSlug]);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    if (groups && groups.length > 0 && activeId && items.length > 0) {
      const activeItem = items.find((i) => i.id === activeId);
      if (activeItem) {
        let targetGroupId = null;
        if (type === "pattern") {
          targetGroupId = activeItem.phase;
        } else {
          const group = groups.find((g) => g.title === activeItem.category);
          if (group) targetGroupId = group.id;
        }

        if (targetGroupId) {
          setExpandedGroups((prev) => {
            if (!prev.includes(targetGroupId)) return [...prev, targetGroupId];
            return prev;
          });
        }
      }
    }
  }, [groups, activeId, items, type]);

  const toggleGroup = (id) => {
    setExpandedGroups((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const allGroupIds = useMemo(() => groups.map((g) => g.id), [groups]);
  const isAllExpanded =
    allGroupIds.length > 0 &&
    allGroupIds.every((id) => expandedGroups.includes(id));

  const toggleAll = () => {
    if (isAllExpanded) setExpandedGroups([]);
    else setExpandedGroups(allGroupIds);
  };

  const resetAllFilters = () => {
    setDifficultyFilter("All");
    setGroupFilters({});
  };

  const globalProgress = useMemo(() => {
    if (!items || items.length === 0) return 0;
    const completedCount = items.filter((i) => completedIds[i.id]).length;
    return Math.round((completedCount / items.length) * 100);
  }, [items, completedIds]);

  const getGroupStats = (groupItems) => {
    if (!groupItems.length) return { count: 0, percent: 0 };
    const completedCount = groupItems.filter((i) => completedIds[i.id]).length;
    const percent = Math.round((completedCount / groupItems.length) * 100);
    return { count: completedCount, percent };
  };

  const handleLocalFilterSelect = (groupId, value, e) => {
    e.stopPropagation();
    setGroupFilters((prev) => ({ ...prev, [groupId]: value }));
    setOpenMenuId(null);
  };

  const totalItems = groups.reduce((acc, group) => {
    const activeFilter = groupFilters[group.id] || difficultyFilter || "All";
    const groupItems = items.filter((i) => {
      let matchesCategory = false;
      if (type === "pattern") matchesCategory = i.phase === group.id;
      else if (type === "algo" || type === "msq")
        matchesCategory = i.category === group.title;

      let matchesDifficulty = true;
      if (currentModeSlug === "msq" && activeFilter !== "All") {
        matchesDifficulty = i.type === activeFilter;
      }
      return matchesCategory && matchesDifficulty;
    });
    return acc + groupItems.length;
  }, 0);

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 bg-[#1e293b] border-r border-slate-700 flex flex-col transition-all duration-300 shadow-2xl w-72
        
        /* Mobile State */
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        
        /* Desktop State */
        md:relative md:translate-x-0 md:shadow-none md:h-full
        ${
          desktopOpen
            ? "md:w-72 md:opacity-100"
            : "md:w-0 md:opacity-0 md:overflow-hidden md:border-none"
        }
      `}
    >
      {/* --- Header --- */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-slate-700 shrink-0 bg-[#1e293b] min-w-[18rem]">
        <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
          <span className="font-bold text-sm tracking-tight text-white truncate shrink-0">
            {title}
          </span>

          {currentModeSlug === "msq" && (
            <div className="flex items-center gap-1 ml-auto">
              {(difficultyFilter !== "All" ||
                Object.keys(groupFilters).length > 0) && (
                <button
                  onClick={resetAllFilters}
                  className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors"
                  title="Reset All Filters"
                >
                  <RefreshCcw size={10} />
                </button>
              )}

              <div className="relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Filter size={10} />
                </div>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-slate-800 text-[10px] font-medium text-blue-300 border border-slate-600 rounded pl-6 pr-2 py-1 appearance-none cursor-pointer hover:border-blue-500 focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="All" className="text-slate-50">
                    All
                  </option>
                  <option value="Easy" className="text-emerald-400">
                    Easy
                  </option>
                  <option value="Medium" className="text-yellow-400">
                    Med
                  </option>
                  <option value="Hard" className="text-rose-400">
                    Hard
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleAll}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors"
            title={isAllExpanded ? "Collapse All" : "Expand All"}
          >
            {isAllExpanded ? (
              <ChevronsUp size={18} />
            ) : (
              <ChevronsDown size={18} />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeMobile();
            }}
            className="md:hidden text-slate-400 hover:text-white p-1 bg-slate-800/50 rounded-full ml-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* --- Scrollable List --- */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar min-w-[18rem]">
        {groups.map((group) => {
          const activeFilter =
            groupFilters[group.id] || difficultyFilter || "All";

          const groupItems = items.filter((i) => {
            let matchesCategory = false;
            if (type === "pattern") matchesCategory = i.phase === group.id;
            else if (type === "algo" || type === "msq")
              matchesCategory = i.category === group.title;

            let matchesDifficulty = true;
            if (currentModeSlug === "msq" && activeFilter !== "All") {
              matchesDifficulty = i.type === activeFilter;
            }

            return matchesCategory && matchesDifficulty;
          });

          if (!groupItems.length && activeFilter === "All") return null;

          const isExpanded = expandedGroups.includes(group.id);
          const { percent } = getGroupStats(groupItems);
          const isLocalOverride = !!groupFilters[group.id];

          return (
            <div key={group.id} className="mb-2 relative">
              <div
                className="w-full flex items-center justify-between px-3 py-2 bg-[#1e293b] hover:bg-slate-800 rounded transition-colors group/header cursor-pointer"
                onClick={() => toggleGroup(group.id)}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-xs font-bold uppercase text-slate-500 truncate">
                    <sup>{groupItems?.length}</sup> {group.title} -
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded ${
                      percent === 100
                        ? "bg-emerald-900/30 text-emerald-400"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {percent}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {currentModeSlug === "msq" && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === group.id ? null : group.id
                          );
                        }}
                        className={`p-1 rounded hover:bg-slate-700 transition-colors ${
                          isLocalOverride || openMenuId === group.id
                            ? "text-blue-400 bg-slate-700/50"
                            : "text-slate-600 hover:text-slate-300"
                        }`}
                        title={`Filter: ${activeFilter}`}
                      >
                        <Filter
                          size={12}
                          fill={isLocalOverride ? "currentColor" : "none"}
                        />
                      </button>

                      {openMenuId === group.id && (
                        <div
                          className="absolute right-0 top-6 z-50 w-24 bg-slate-800 border border-slate-600 rounded shadow-xl py-1 animate-in fade-in zoom-in-95 duration-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-3 py-1.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-700/50 mb-1">
                            Override
                          </div>
                          {["All", "Easy", "Medium", "Hard"].map((opt) => {
                            const isSelected = activeFilter === opt;
                            const difficultyColor =
                              opt === "Easy"
                                ? "text-emerald-400"
                                : opt === "Medium"
                                ? "text-yellow-400"
                                : opt === "Hard"
                                ? "text-rose-400"
                                : "text-slate-500";
                            return (
                              <button
                                key={opt}
                                onClick={(e) =>
                                  handleLocalFilterSelect(group.id, opt, e)
                                }
                                className={`w-full text-left px-3 py-1.5 text-[10px] hover:bg-slate-700 flex justify-between items-center ${
                                  isSelected
                                    ? "text-blue-400 font-bold"
                                    : difficultyColor
                                }`}
                              >
                                {opt}
                                {isSelected && <CheckCircle size={8} />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-slate-500">
                    {isExpanded ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-1 space-y-0.5 ml-2 border-l border-slate-700 pl-2 animate-in slide-in-from-left-2 duration-200">
                  {groupItems.length === 0 ? (
                    <div className="px-3 py-2 text-[10px] text-slate-500 italic">
                      No {activeFilter} questions found.
                    </div>
                  ) : (
                    groupItems.map((item, idx) => {
                      const isActive = item.id === activeId;
                      const isDone = completedIds[item.id];
                      const difficultyColor =
                        item.type === "Easy"
                          ? "text-emerald-400"
                          : item.type === "Medium"
                          ? "text-yellow-400"
                          : item.type === "Hard"
                          ? "text-rose-400"
                          : "text-slate-500";

                      return (
                        <div
                          key={item.id}
                          // UPDATED LOGIC HERE:
                          // 1. If Active: "bg-blue-600 text-white" (White text overrides everything)
                          // 2. If Done (and Not Active): "text-emerald-400" (Green)
                          // 3. Default: Slate
                          className={`w-full rounded px-3 py-2 text-xs font-medium transition-all flex items-center justify-between group ${
                            isActive
                              ? "bg-green-600 text-white shadow-md"
                              : isDone
                              ? " text-emerald-400 hover:bg-slate-800 hover:text-emerald-300"
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <button
                            onClick={() => {
                              onSelect(item);
                              closeMobile();
                            }}
                            className="flex-1 text-left truncate pr-2 focus:outline-none flex items-center gap-2"
                          >
                            <span className="opacity-50 w-5 text-[10px]">
                              {idx + 1}.
                            </span>
                            <span className="truncate">
                              {item.title || item.name}
                            </span>
                            {currentModeSlug === "msq" && item.type && (
                              <span
                                className={`ml-auto text-[8px] ${difficultyColor}`}
                                title={item.type}
                              >
                                ●
                              </span>
                            )}
                          </button>

                          {toggleStatus && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStatus(item.id);
                              }}
                              className="shrink-0 focus:outline-none p-1 -mr-1 rounded-full hover:bg-white/10"
                              title={
                                isDone
                                  ? "Mark as incomplete"
                                  : "Mark as complete"
                              }
                            >
                              {isDone ? (
                                <CheckCircle
                                  size={12}
                                  className={
                                    isActive
                                      ? "text-blue-200"
                                      : "text-emerald-500"
                                  }
                                />
                              ) : (
                                <Circle
                                  size={12}
                                  className={`opacity-20 group-hover:opacity-50 ${
                                    isActive ? "text-white" : ""
                                  }`}
                                />
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer - Global Progress */}
      <div className="p-4 border-t border-slate-700 bg-[#1e293b] shrink-0 min-w-[18rem]">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="text-slate-400 font-medium">
            <sup>{totalItems}</sup> Total Progress
          </span>
          <span
            className={`font-bold ${
              globalProgress === 100 ? "text-emerald-400" : "text-blue-400"
            }`}
          >
            {globalProgress}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              globalProgress === 100 ? "bg-emerald-500" : "bg-blue-500"
            }`}
            style={{ width: `${globalProgress}%` }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
