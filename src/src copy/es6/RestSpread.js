import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function RestSpread() {
  useEffect(() => {
    const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
    console.log(sum(1, 2, 3));

    const arr = [1, 2, 3];
    const newArr = [...arr, 4, 5];
    console.log(newArr);
  }, []);
  const codeString = `
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6

const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
console.log(newArr);
`;

  return (
    <div>
      <h3>Rest / Spread</h3> <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
