import * as React from "react";
import MemoizedButton from "./MemoizedButton";
import FactorialCalculator from "./FactorialCalculator";
export default function ParentComponent() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("");

  // 📞 useCallback caches the function definition
  // It ONLY creates a new 'handleClick' function when 'count' changes.
  const handleClick = React.useCallback(() => {
    setCount((c) => c + 1);
  }, []); // Dependency array: Empty, so the function never changes.

//   React.useEffect(() => {
//     const id = setInterval(() => console.log("running"), 1000);
//     return () => clearInterval(id); // cleanup
//   }, []);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
      />
      <button onClick={() => setCount(count + 1)}>Parent Count: {count}</button>

      {/* This child will only re-render if its props (handleClick) change.
        Since handleClick is wrapped in useCallback, it only changes if its dependencies do.
      */}
      <MemoizedButton onClick={handleClick} />

      <FactorialCalculator number={10} />
    </div>
  );
}
