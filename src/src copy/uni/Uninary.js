import React, { useState } from "react";
import ParadigmComparison from "./ParadigmComparison";
import ComplexButtonDemo from "./ComplexButton";

const components = {
  ParadigmComparison,
  ComplexButtonDemo
};

const Uninary = () => {
  const [selectedConcept, setSelectedConcept] = useState("ParadigmComparison");
  const SelectedComponent = components[selectedConcept];

  return (
    <div style={styles.container}>
      <h2>🧩 Unary Explorer — Single Concept Viewer</h2>

      <label style={styles.label}>
        Select Concept:{" "}
        <select
          style={styles.select}
          value={selectedConcept}
          onChange={(e) => setSelectedConcept(e.target.value)}
        >
          {Object.keys(components).map((concept) => (
            <option key={concept} value={concept}>
              {concept.replace(/([A-Z])/g, " $1").trim()}
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

export default Uninary;

const styles = {
  container: {
    padding: 20,
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#fff",
  },
  label: { display: "block", marginBottom: 10, fontWeight: "bold" },
  select: {
    padding: 6,
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
  },
  demo: {
    marginTop: 20,
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
};
