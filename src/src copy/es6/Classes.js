import React, { useEffect } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function Classes() {
  useEffect(() => {
    class Person {
      constructor(name) {
        this.name = name;
      }
      greet() {
        console.log("Hello, " + this.name);
      }
    }
    new Person("Jay").greet();
  }, []);
  const codeString = `
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hello, " + this.name);
  }
}

const jay = new Person("Jay");
jay.greet();
`;
  return (
    <div>
      <h3>Classes</h3>

      <SyntaxHighLighter codeString={codeString} />
    </div>
  );
}
