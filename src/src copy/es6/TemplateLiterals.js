import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function TemplateLiterals() {
  useEffect(() => {
    const name = "Jay";
    const age = 25;
    console.log(`My name is ${name} and I'm ${age} years old.`);
  }, []);
  const codeString = `
const name = "Jay";
const age = 25;
console.log(\`My name is \${name} and I'm \${age} years old.\`);
`;
  return (
    <div>
      <h3>Template Literals</h3>
      <p>Use backticks for string interpolation and multi-line strings.</p>
      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
