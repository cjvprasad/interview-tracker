import React from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function ForLoopsDemo() {
  const code = `
// ✅ for...of — iterates over VALUES
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
// Output: apple, banana, cherry

// ✅ for...in — iterates over KEYS
const person = { name: "Jay", age: 25, city: "Hyderabad" };
for (const key in person) {
  console.log(key, "→", person[key]);
}
// Output: name → Jay, age → 25, city → Hyderabad

// ⚠️ Don't use for...in on arrays
const arr = ["A", "B"];
arr.extra = "X";
for (const key in arr) console.log(key); // 0, 1, extra ❌
for (const val of arr) console.log(val); // A, B ✅
`;

  return (
    <div>
      <h3>🔁 for...of vs for...in vs Traditional for</h3>
      <p>
        <b>for...of</b> iterates over <b>values</b> of iterables like arrays,
        strings, or sets.
        <br />
        <b>for...in</b> iterates over <b>keys</b> (property names) of objects.
        <br />
        Use <b>for</b> only when you need index-based iteration or fine control.
      </p>
      <SyntaxHighLighter codeString={code} language="javascript" />
    </div>
  );
}
