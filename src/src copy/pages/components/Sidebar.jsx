// // src/components/Sidebar.jsx
// import React, { useState, useEffect } from "react";
// import { ChevronDown, ChevronRight, X, Circle, CheckCircle } from "lucide-react";

// const Sidebar = ({ title, groups, items, type, activeId, onSelect, completedIds, mobileOpen, closeMobile }) => {
//   const [expandedGroups, setExpandedGroups] = useState([]);

//   // Auto-expand all groups on load
//   useEffect(() => {
//     if (groups) setExpandedGroups(groups.map(g => g.id));
//   }, [groups]);

//   const toggleGroup = (id) => {
//     setExpandedGroups(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
//   };

//   return (
//     <aside className={`
//         fixed inset-y-0 left-0 z-40 w-72 bg-[#1e293b] border-r border-slate-700 flex flex-col transition-transform duration-300 shadow-2xl
//         ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
//         md:relative md:translate-x-0 md:shadow-none
//       `}>
//       <div className="h-14 flex items-center justify-between px-4 border-b border-slate-700 shrink-0">
//         <span className="font-bold text-base tracking-tight text-white">{title} List</span>
//         <button onClick={closeMobile} className="md:hidden text-slate-400 hover:text-white p-1">
//             <X size={18} />
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
//         {groups.map(group => {
//           // Filter logic based on type
//           const groupItems = items.filter(i => {
//              if (type === 'pattern') return i.phase === group.id;
//              if (type === 'algo' || type === 'msq') return i.category === group.title;
//              return false;
//           });

//           if(!groupItems.length) return null;
//           const isExpanded = expandedGroups.includes(group.id);

//           return (
//             <div key={group.id} className="mb-2">
//               <button
//                 onClick={() => toggleGroup(group.id)}
//                 className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-800 rounded transition-colors"
//               >
//                 <span>{group.title}</span>
//                 {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
//               </button>

//               {isExpanded && (
//                 <div className="mt-1 space-y-0.5 ml-2 border-l border-slate-700 pl-2">
//                   {groupItems.map(item => {
//                     const isActive = item.id === activeId;
//                     const isDone = completedIds[item.id];

//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => { onSelect(item); closeMobile(); }}
//                         className={`w-full text-left rounded px-3 py-2 text-xs font-medium transition-all flex items-center justify-between group ${
//                             isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
//                         }`}
//                       >
//                         <span className="truncate pr-2">{item.title || item.name}</span>
//                         {/* Status Icon */}
//                         {isDone ? (
//                             <CheckCircle size={12} className={isActive ? "text-blue-200" : "text-emerald-500"} />
//                         ) : (
//                             <Circle size={12} className={`opacity-20 group-hover:opacity-50 ${isActive ? "text-white" : ""}`} />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
  Circle,
  CheckCircle,
} from "lucide-react";

const Sidebar = ({
  title,
  groups,
  items,
  type,
  activeId,
  onSelect,
  completedIds,
  toggleStatus,
  mobileOpen,
  closeMobile,
}) => {
  const [expandedGroups, setExpandedGroups] = useState([]);

  // Auto-expand all groups on load
  useEffect(() => {
    if (groups) setExpandedGroups(groups.map((g) => g.id));
  }, [groups]);

  const toggleGroup = (id) => {
    setExpandedGroups((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // --- Calculations ---

  // 1. Calculate Global Progress for the current list
  const globalProgress = useMemo(() => {
    if (!items || items.length === 0) return 0;
    const completedCount = items.filter((i) => completedIds[i.id]).length;
    return Math.round((completedCount / items.length) * 100);
  }, [items, completedIds]);

  // 2. Helper to get stats for a specific group
  const getGroupStats = (groupItems) => {
    if (!groupItems.length) return { count: 0, percent: 0 };
    const completedCount = groupItems.filter((i) => completedIds[i.id]).length;
    const percent = Math.round((completedCount / groupItems.length) * 100);
    return { count: completedCount, percent };
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-[#1e293b] border-r border-slate-700 flex flex-col transition-transform duration-300 shadow-2xl
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:shadow-none
      `}
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-700 shrink-0 bg-[#1e293b]">
        <span className="font-bold text-base tracking-tight text-white">
          {title} List
        </span>
        CloseIcon
        <button
          onClick={closeMobile}
          className="md text-slate-400 hover:text-white p-1"
        >
          <X size={18} />
        </button>
        <button
          onClick={closeMobile}
          className="md:hidden text-slate-400 hover:text-white p-1"
        >
          <X size={18} />
        </button>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {groups.map((group) => {
          // Filter logic based on type to get items for this group
          const groupItems = items.filter((i) => {
            if (type === "pattern") return i.phase === group.id;
            if (type === "algo" || type === "msq")
              return i.category === group.title;
            return false;
          });

          if (!groupItems.length) return null;

          const isExpanded = expandedGroups.includes(group.id);
          const { percent } = getGroupStats(groupItems);

          return (
            <div key={group.id} className="mb-2">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-800 rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{group.title}</span>
                  {/* Group Progress Badge */}
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
                {isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {isExpanded && (
                <div className="mt-1 space-y-0.5 ml-2 border-l border-slate-700 pl-2">
                  {groupItems.map((item) => {
                    const isActive = item.id === activeId;
                    const isDone = completedIds[item.id];

                    return (
                      <div
                        key={item.id}
                        className={`w-full rounded px-3 py-2 text-xs font-medium transition-all flex items-center justify-between group ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                        }`}
                      >
                        <button
                          onClick={() => {
                            onSelect(item);
                            closeMobile();
                          }}
                          className="flex-1 text-left truncate pr-2 focus:outline-none"
                        >
                          {item.title || item.name}
                        </button>

                        {/* Status Icon Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (toggleStatus) toggleStatus(item.id);
                          }}
                          className="shrink-0 focus:outline-none p-1 -mr-1 rounded-full hover:bg-white/10"
                          title={
                            isDone ? "Mark as incomplete" : "Mark as complete"
                          }
                        >
                          {isDone ? (
                            <CheckCircle
                              size={12}
                              className={
                                isActive ? "text-blue-200" : "text-emerald-500"
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
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer - Global Progress */}
      <div className="p-4 border-t border-slate-700 bg-[#1e293b] shrink-0">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="text-slate-400 font-medium">Total Progress</span>
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
