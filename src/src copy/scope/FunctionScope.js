import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function FunctionScope() {
  useEffect(() => {
    function test() {
      var local = "Inside function";
      console.log(local);
    }
    test();
  }, []);

  const code = `
function test() {
  var local = "Inside function";
  console.log(local);
}

test();      // ✅ Works
console.log(local); // ❌ ReferenceError
  `;

  return (
    <div>
      <h3>🧩 Function Scope</h3>
      <SyntaxHighLighter codeString={code} />
    </div>
  );
}
