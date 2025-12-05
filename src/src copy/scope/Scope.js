import React, { useState } from "react";
import GlobalScope from "./GlobalScope";
import FunctionScope from "./FunctionScope";
import BlockScope from "./BlockScope";
import LexicalScope from "./LexicalScope";
import ModuleScope from "./ModuleScope";
import NestedScopes from "./NestedScopes";

const components = {
  GlobalScope,
  FunctionScope,
  BlockScope,
  LexicalScope,
  ModuleScope,
  NestedScopes,
};

const ScopePlayground = () => {
  const [selectedScope, setSelectedScope] = useState("GlobalScope");

  const SelectedComponent = components[selectedScope];

  return (
    <div style={styles.container}>
      <h2>🧠 JavaScript Scope Explorer</h2>

      <label style={styles.label}>
        Select Scope Type:{" "}
        <select
          style={styles.select}
          value={selectedScope}
          onChange={(e) => setSelectedScope(e.target.value)}
        >
          {Object.keys(components).map((scope) => (
            <option key={scope} value={scope}>
              {scope.replace("Scope", " Scope")}
            </option>
          ))}
        </select>
      </label>

      <div style={styles.demo}>
        <SelectedComponent />
      </div>
    </div>
  );
};

export default ScopePlayground;

const styles = {
  container: { padding: 20, fontFamily: "sans-serif" },
  label: { display: "block", marginBottom: 10, fontWeight: "bold" },
  select: { padding: 6, borderRadius: 4 },
  demo: {
    marginTop: 20,
    border: "1px solid #ccc",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
};
