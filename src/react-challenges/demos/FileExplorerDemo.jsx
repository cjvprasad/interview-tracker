import React, { useState } from "react";
import { Folder, FolderOpen, FileText, Code2, FileCode, FileJson } from "lucide-react";

// Simple recursive component for the DEMO
const Node = ({ node }) => {
  const [isOpen, setIsOpen] = useState(true); // Default open for demo purposes to show depth
  const isFolder = node.isFolder;

  // Helper to get specific icons based on extension
  const getIcon = () => {
    if (isFolder) return isOpen ? <FolderOpen size={16} className="text-blue-400" /> : <Folder size={16} className="text-blue-400" />;
    if (node.name.endsWith("jsx") || node.name.endsWith("js")) return <Code2 size={16} className="text-yellow-400" />;
    if (node.name.endsWith("css")) return <FileCode size={16} className="text-blue-300" />;
    if (node.name.endsWith("json")) return <FileJson size={16} className="text-green-400" />;
    return <FileText size={16} className="text-slate-400" />;
  };

  return (
    <div className="pl-4 text-left">
      <div 
        onClick={(e) => {
            e.stopPropagation();
            if(isFolder) setIsOpen(!isOpen);
        }} 
        className="flex items-center gap-2 cursor-pointer py-1 hover:bg-slate-800/50 rounded select-none"
      >
        <span className="shrink-0">{getIcon()}</span>
        <span className={`text-sm ${isFolder ? 'font-bold text-slate-200' : 'text-slate-400'}`}>{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div className="border-l border-slate-800 ml-2">
            {node.children.map((child) => <Node key={child.id} node={child} />)}
        </div>
      )}
    </div>
  );
};

const FileExplorerDemo = () => {
  // Hardcoded Deep Data for the Preview
  const data = {
    id: "root",
    name: "root",
    isFolder: true,
    children: [
      {
        id: "src",
        name: "src",
        isFolder: true,
        children: [
          {
            id: "components",
            name: "components",
            isFolder: true,
            children: [
              {
                id: "ui",
                name: "ui",
                isFolder: true,
                children: [
                  {
                    id: "Button",
                    name: "Button",
                    isFolder: true,
                    children: [
                      { id: "Button.jsx", name: "Button.jsx", isFolder: false },
                      { id: "Button.css", name: "Button.css", isFolder: false }
                    ]
                  },
                  {
                    id: "Card",
                    name: "Card",
                    isFolder: true,
                    children: [
                      { id: "Card.jsx", name: "Card.jsx", isFolder: false }
                    ]
                  }
                ]
              },
              { id: "Header.js", name: "Header.js", isFolder: false },
              { id: "Footer.js", name: "Footer.js", isFolder: false }
            ]
          },
          {
            id: "utils",
            name: "utils",
            isFolder: true,
            children: [
              {
                id: "helpers",
                name: "helpers",
                isFolder: true,
                children: [
                  { id: "date.js", name: "date.js", isFolder: false }
                ]
              }
            ]
          },
          { id: "App.js", name: "App.js", isFolder: false },
          { id: "index.css", name: "index.css", isFolder: false }
        ]
      },
      {
        id: "public",
        name: "public",
        isFolder: true,
        children: [
          { id: "index.html", name: "index.html", isFolder: false },
          { id: "favicon.ico", name: "favicon.ico", isFolder: false }
        ]
      },
      { id: "package.json", name: "package.json", isFolder: false },
      { id: "README.md", name: "README.md", isFolder: false }
    ]
  };

  return (
    <div className="p-4 bg-[#0f172a] rounded-lg border border-slate-700 text-slate-300 font-mono text-sm shadow-xl max-h-[400px] overflow-y-auto no-scrollbar">
      <h3 className="text-xs font-bold text-yellow-500 mb-4 uppercase tracking-wider border-b border-slate-800 pb-2">Expected Output</h3>
      <Node node={data} />
    </div>
  );
};

export default FileExplorerDemo;