import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

const BlockScopeInsideLoops = () => {
  useEffect(() => {
    console.log("---- Using var ----");
    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log("var i:", i), 100);
    }

    console.log("---- Using let ----");
    for (let j = 0; j < 3; j++) {
      setTimeout(() => console.log("let j:", j), 100);
    }
  }, []);

  const code = `
// Using var (function-scoped)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// Output: 3, 3, 3

// Using let (block-scoped)
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// Output: 0, 1, 2
`;

  return (
    <div>
      <h3>🔁 Block Scope Inside Loops</h3>
      <p>
        <b>let</b> creates a new variable for each loop iteration, while{" "}
        <b>var</b> shares a single function-scoped variable.
      </p>
      <SyntaxHighLighter codeString={code} language="javascript" />
    </div>
  );
};

export default BlockScopeInsideLoops;
