import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function SymbolExample() {
  useEffect(() => {
    const sym = Symbol("id");
    const user = { [sym]: 123 };
    console.log(user[sym]);
  }, []);
  const codeString = `
const sym = Symbol("id");
const user = { [sym]: 123 };
console.log(user[sym]);
`;
  return (
    <div>
      <h3>Symbol</h3>
      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
