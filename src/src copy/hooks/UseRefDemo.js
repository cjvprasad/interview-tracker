import React, { useEffect, useRef, useState } from "react";

const UseRefDemo = () => {
  const [text, setText] = useState("");
  const renderCount = useRef(0);
  const inputRef = useRef("");
  useEffect(() => {
    renderCount.current++;
  });
  return (
    <div>
      <h3>useRef Example</h3>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Render count: {renderCount.current}</p>
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
};

export default UseRefDemo;
