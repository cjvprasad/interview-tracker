import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function ArrowFunctions() {
  useEffect(() => {
    const add = (a, b) => a + b;
    const user = {
      name: "Jay",
      greet: () => console.log("Hello " + user.name),
    };
    user.greet();
    console.log("Sum:", add(5, 10));
  }, []);

  const codeString = `
const add = (a, b) => a + b;
console.log(add(5, 10)); // 15

const user = {
  name: "Jay",
  greet: () => console.log("Hello " + user.name),
};
user.greet(); // "Hello Jay"
`;

  return (
    <div>
      <h3>⚡ Arrow Functions</h3>
      <p>
        Arrow functions have <b>lexical this</b> binding and concise syntax.
      </p>

      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
