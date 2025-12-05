import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function GlobalScope() {
  useEffect(() => {
    var globalVar = "Accessible anywhere";
    console.log(globalVar);
  }, []);

  const code = `
var globalVar = "Accessible anywhere";

function showGlobal() {
  console.log(globalVar);
}

showGlobal(); // Accessible anywhere
  `;

  return (
    <div>
      <h3>🌍 Global Scope</h3>
      <p>Variables declared outside functions are globally accessible.</p>
      <SyntaxHighLighter codeString={code} />
    </div>
  );
}
