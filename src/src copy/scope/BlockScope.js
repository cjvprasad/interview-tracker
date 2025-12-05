import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function BlockScope() {
  useEffect(() => {
    if (true) {
      let block = "Inside block";
      console.log(block);
    }
  }, []);

  const code = `
if (true) {
  let block = "Inside block";
  console.log(block); // ✅ Works
}
console.log(block); // ❌ ReferenceError
  `;

  return (
    <div>
      <h3>🔒 Block Scope</h3>
      <SyntaxHighLighter codeString={code} />
    </div>
  );
}
