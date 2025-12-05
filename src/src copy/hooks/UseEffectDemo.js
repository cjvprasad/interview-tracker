import React, { useEffect, useState } from "react";
const UseEffectDemo = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Clicked ${count} times`;
    console.log("Effect: updating title");
    return () => {
      console.log("Cleanup before next effect");
    };
  }, [count]);
  return (
    <>
      <div>
        <h3>useEffect Example</h3>
        <button onClick={() => setCount(count + 1)}>Click {count}</button>
      </div>
    </>
  );
};
export default UseEffectDemo;
