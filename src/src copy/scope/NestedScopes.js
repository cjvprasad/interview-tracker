import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function NestedScopes() {
  useEffect(() => {
    const a = 1;
    function outer() {
      const b = 2;
      function inner() {
        const c = 3;
        console.log(a, b, c);
      }
      inner();
    }
    outer();
  }, []);

  const code = `
const a = 1;

function outer() {
  const b = 2;
  function inner() {
    const c = 3;
    console.log(a, b, c); // ✅ 1 2 3
  }
  inner();
}

outer();
  `;

  return (
    <div>
      <h3>🧩 Nested Scopes</h3>
      <p>Inner functions can access variables from outer scopes (closure).</p>
      <SyntaxHighLighter codeString={code} />
    </div>
  );
}
