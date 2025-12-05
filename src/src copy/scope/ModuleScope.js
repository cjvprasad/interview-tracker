import React from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function ModuleScope() {
  const code = `
// file: math.js
export const a = 10;
export const b = 20;

// file: main.js
import { a, b } from "./math.js";
console.log(a + b); // 30
  `;

  return (
    <div>
      <h3>📦 Module Scope</h3>
      <p>Each JavaScript module has its own scope — variables aren’t global by default.</p>
      <SyntaxHighLighter codeString={code} />
    </div>
  );
}
