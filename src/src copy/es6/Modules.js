import React from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function Modules() {
  const codeString = `
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3));
`;
  return (
    <div>
      <h3>Modules</h3>
      <p>
        Use <code>import</code> and <code>export</code> to share code between
        files.
      </p>
      <p>Use Babel or bundlers like Vite/Webpack for browser compatibility.</p>
      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
