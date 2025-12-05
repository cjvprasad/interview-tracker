import React, { useEffect, useState } from "react";
const UseStateDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h3>useState Example</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount((prev) => prev + 1)} id="btn">
          Update
        </button>
        <button onClick={() => setCount(0)}>Reset</button>
        {/* <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button> */}
      </div>
    </>
  );
};
export default UseStateDemo;
