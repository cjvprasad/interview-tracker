import React, { useState } from "react";
import LetConst from "./LetConst";
import ArrowFunctions from "./ArrowFunctions";
import TemplateLiterals from "./TemplateLiterals";
import Destructuring from "./Destructuring";
import DefaultParams from "./DefaultParams";
import RestSpread from "./RestSpread";
import Classes from "./Classes";
import Modules from "./Modules";
import Promises from "./Promises";
import MapSet from "./MapSet";
import SymbolExample from "./SymbolExample";
import ForLoopsDemo from "./ForLoopsDemo";

const components = {
  LetConst,
  ArrowFunctions,
  TemplateLiterals,
  Destructuring,
  DefaultParams,
  RestSpread,
  Classes,
  Modules,
  Promises,
  MapSet,
  SymbolExample,
  ForLoopsDemo,
};

export default function ES6Features() {
  const [selected, setSelected] = useState("LetConst");
  const SelectedComponent = components[selected];

  return (
    <div style={styles.container}>
      <h2>⚡ ES6 Feature Explorer</h2>
      <label style={styles.label}>
        Select Feature:{" "}
        <select
          style={styles.select}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {Object.keys(components).map((feature) => (
            <option key={feature} value={feature}>
              {feature}
            </option>
          ))}
        </select>
      </label>

      <div style={styles.demo}>
        <SelectedComponent />
      </div>
    </div>
  );
}

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
