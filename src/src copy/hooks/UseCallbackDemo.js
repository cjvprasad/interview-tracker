import React, { useState, useCallback } from "react";

function Child({ onAdd }) {
  console.log("Child rendered");
  return <button onClick={onAdd}>Add</button>;
}

const MemoChild = React.memo(Child);

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleAdd = useCallback(() => {
    setCount((c) => c + 1);
  }, [count]);

  return (
    <>
      <h3>useCallback Example</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <MemoChild onAdd={handleAdd} />
      <p>Count: {count}</p>
    </>
  );
}
