import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function LetConst() {
  useEffect(() => {
    var x = 1;
    let y = 2;
    const z = 3;
    console.log("var:", x, "let:", y, "const:", z);
  }, []);

  const codeString = `
if (true) {
  let x = 10;
  const y = 20;
  var z = 30;
}
console.log(z); // ✅ accessible (var)
console.log(x, y); // ❌ ReferenceError (block scope)
`;

  return (
    <div>
      <h3>🔒 let / const</h3>
      <p>
        <b>let</b> and <b>const</b> are block-scoped, while <b>var</b> is
        function-scoped.
      </p>

      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
