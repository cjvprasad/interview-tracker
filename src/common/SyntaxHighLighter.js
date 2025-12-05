import React, { useState, useEffect } from "react";
// 1. Import Read-Only Highlighter
import { Prism as SyntaxHighlighterRenderer } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// 2. Import Code Editor
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme for editor

const SyntaxHighLighter = ({
  codeString = "",
  language = "javascript",
  output = null,
  isEditable = false,
  onChange = () => {},
  fullHeight = false, // 👈 NEW PROP: Forces 100% height for Playgrounds
}) => {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [editorValue, setEditorValue] = useState(codeString);

  useEffect(() => {
    setEditorValue(codeString);
  }, [codeString]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(isEditable ? editorValue : codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleChange = (newCode) => {
    setEditorValue(newCode);
    onChange(newCode);
  };

  const containerBg = isDark ? "#1e1e1e" : "#f5f5f5";
  const textColor = isDark ? "#fff" : "#000";
  const borderColor = isDark ? "#444" : "#ddd";

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: containerBg,
        color: textColor,
        border: `1px solid ${borderColor}`,
        // If fullHeight, we fill the parent. If not, we auto-size.
        height: fullHeight ? "100%" : "auto", 
        display: fullHeight ? "flex" : "block",
        flexDirection: "column",
      }}
    >
      {/* --- HEADER --- */}
      <div
        style={{
          ...styles.header,
          background: isDark ? "#2d2d2d" : "#e6e6e6",
          color: textColor,
          borderBottom: `1px solid ${borderColor}`,
          flexShrink: 0, // Prevent header from shrinking
        }}
      >
        <span style={styles.language}>
          {language.toUpperCase()} {isEditable ? "(EDITABLE)" : ""}
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={handleCopy}
            style={{
              ...styles.button,
              borderColor: isDark ? "#666" : "#bbb",
              color: textColor,
            }}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>

          <button
            onClick={() => setIsDark((prev) => !prev)}
            style={{
              ...styles.button,
              borderColor: isDark ? "#666" : "#bbb",
              color: textColor,
            }}
          >
            {isDark ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* --- BODY --- */}
      <div 
        style={{ 
          // Logic: If fullHeight, take remaining space and scroll. 
          // If not, allow max 500px growth.
          flex: fullHeight ? 1 : "none",
          height: fullHeight ? "100%" : "auto",
          maxHeight: fullHeight ? "none" : "500px", 
          maxHeight: fullHeight ? "none" : "500px", 
          overflow: "auto",
          position: "relative"
        }}
      >
        {isEditable ? (
          <Editor
            value={editorValue}
            onValueChange={handleChange}
            highlight={(code) => highlight(code, languages.js)}
            padding={15}
            textareaClassName="focus:outline-none"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              color: isDark ? "#f8f8f2" : "#000",
              minHeight: "100%", // Ensure editor fills the scroll container
            }}
          />
        ) : (
          codeString && (
            <SyntaxHighlighterRenderer
              language={language}
              style={isDark ? oneDark : oneLight}
              showLineNumbers
              customStyle={{ margin: 0, borderRadius: 0, height: "100%" }}
              wrapLines
            >
              {codeString.trim()}
            </SyntaxHighlighterRenderer>
          )
        )}
      </div>

      {/* --- OUTPUT --- */}
      {output && (
        <div
          style={{
            background: isDark ? "#121212" : "#fafafa",
            color: isDark ? "#00ff88" : "#333",
            fontFamily: "monospace",
            padding: "10px",
            borderTop: `1px solid ${borderColor}`,
            fontSize: "13px",
            flexShrink: 0,
          }}
        >
          <strong style={{ opacity: 0.7, display: "block", marginBottom: "5px" }}>
            Console Output:
          </strong>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default SyntaxHighLighter;

const styles = {
  container: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    fontFamily: "monospace",
    marginTop: 10,
    transition: "background 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 12px",
    fontSize: 13,
  },
  language: {
    fontWeight: "bold",
    fontSize: "11px",
    letterSpacing: "1px",
    opacity: 0.8,
  },
  button: {
    background: "transparent",
    border: "1px solid #666",
    padding: "3px 8px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
    transition: "all 0.2s ease",
  },
};