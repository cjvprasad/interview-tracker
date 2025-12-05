import React from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function Promises() {
  const codeString = `
    const fetchData = new Promise((resolve) => {
    setTimeout(() => resolve("✅ Data loaded"), 1000);
    });
    fetchData.then(console.log);
    `;

  return (
    <div>
      <h3>🔁 Promises</h3>
      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
