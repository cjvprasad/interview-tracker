import React from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function Modules() {
  const codeString = `
const map = new Map([["name", "Jay"], ["age", 25]]);
const set = new Set([1, 2, 2, 3]);
console.log(map.get("name"), set);
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
