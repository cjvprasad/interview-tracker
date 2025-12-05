import React from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

export default function ParadigmComparison() {
  const code = `// Object-Oriented
class Car {
  constructor(model, mileage) {
    this.model = model;
    this.mileage = mileage;
    this.fuel = 0;
  }
  refuel(liters) { this.fuel += liters; }
  range() { return this.fuel * this.mileage; }
}

// Functional
function createCar(model, mileage, fuel = 0) {
  return {
    model,
    mileage,
    fuel,
    refuel(liters) {
      return createCar(model, mileage, fuel + liters);
    },
    range() {
      return fuel * mileage;
    }
  };
}`;

  return (
    <div>
      <h3>⚙️ OOP vs Functional in JavaScript</h3>
      <p>
        Functional code is easier to test and reason about; OOP code maps more
        directly to real-world domain models and mutable state. JavaScript
        supports both.
      </p>
      <SyntaxHighLighter codeString={code} language="javascript" />
    </div>
  );
}
