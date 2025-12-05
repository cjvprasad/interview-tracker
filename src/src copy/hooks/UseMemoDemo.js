import React, { useState, useMemo } from "react";

function expensiveCalculation(num) {
  console.log("Running expensive calculation...");
  let result = 0;
  for (let i = 0; i < 1e7; i++) {
    result += i * num;
  }
  return result;
}
const UseMemoDemo = () => {
  const [number, setNumber] = useState(1);
  const [theme, setTheme] = useState(false);
  const result = useMemo(() => expensiveCalculation(number), [number]);
  const themeStyle = {
    backgroundColor: theme ? "#333" : "#fff",
    color: theme ? "#fff" : "#000",
    padding: "10px",
  };
  
  return (
    <div style={themeStyle}>
      <h3>useMemo Example</h3>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <button onClick={() => setTheme((t) => !t)}>Toggle Theme</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default UseMemoDemo;
