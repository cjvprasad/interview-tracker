import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function DefaultParams() {
  useEffect(() => {
    const greet = (name = "Guest") => console.log("Hello, " + name);
    greet("Jay");
    greet();
  }, []);
  const codeString = `
function greet(name = "Guest") {
  console.log("Hello, " + name);
}
greet("Jay");
greet(); // "Hello, Guest"
`;
  return (
    <div>
      <h3>Default Parameters</h3>

      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
