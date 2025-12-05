import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function LexicalScope() {
  useEffect(() => {
    const x = 10;
    function outer() {
      const y = 20;
      function inner() {
        console.log("Lexical Scope Example:", x, y);
      }
      inner();
    }
    outer();
  }, []);

  const code = `
const x = 10;

function outer() {
  const y = 20;
  function inner() {
    console.log(x, y); // 10, 20
  }
  inner();
}

outer();
  `;

  return (
    <div>
      <h3>🧠 Lexical Scope</h3>
      <p>Variables are resolved based on where the function is <b>defined</b>, not where it’s called.</p>
      <SyntaxHighLighter codeString={code} language="javascript" />
    </div>
  );
}
