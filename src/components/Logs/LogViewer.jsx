import React, { useMemo } from "react";
import LogGroup from "./LogGroup";

const LogViewer = ({ logs }) => {
  const groupedLogs = useMemo(() => {
    if (!logs || logs.length === 0) return [];
    const groups = [];
    let currentGroup = null;
    logs.forEach((log) => {
      const isPassHeader =
        typeof log === "string" && log.trim().match(/^(Pass|Step) \d+:/);
      if (isPassHeader) {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = { title: log, items: [] };
      } else {
        if (!currentGroup)
          currentGroup = { title: "Initialization / Setup", items: [] };
        currentGroup.items.push(log);
      }
    });
    if (currentGroup) groups.push(currentGroup);
    return groups;
  }, [logs]);

  return (
    <div className="space-y-2 font-mono text-sm text-slate-300 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {groupedLogs.length > 0 ? (
        groupedLogs.map((group, idx) => (
          <LogGroup key={idx} group={group} defaultOpen={true} />
        ))
      ) : (
        <div className="text-slate-500 italic p-4 text-center border border-dashed border-slate-800 rounded">
          No dry run data available.
        </div>
      )}
    </div>
  );
};

export default LogViewer;
