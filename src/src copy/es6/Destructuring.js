import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function Destructuring() {
  useEffect(() => {
    const user = { name: "Jay", age: 25, city: "Hyderabad" };
    const { name, age } = user;
    console.log(name, age);

    const nums = [1, 2, 3];
    const [first, second] = nums;
    console.log(first, second);
  }, []);
  const codeString = `
const user = { name: "Jay", age: 25, city: "Hyderabad" };
const { name, age } = user;
console.log(name, age);

const nums = [1, 2, 3];
const [first, second] = nums;
console.log(first, second);
`;

  return (
    <div>
      <h3>Destructuring</h3>
      <p>Extract values from objects or arrays easily.</p>
      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
