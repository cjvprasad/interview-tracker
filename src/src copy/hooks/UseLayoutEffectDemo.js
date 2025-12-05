import React, { useLayoutEffect, useEffect, useRef } from "react";

export default function UseLayoutEffectDemo() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    boxRef.current.style.transform = "translateX(100px)";
    console.log("useLayoutEffect ran");
  }, []);

  useEffect(() => {
    console.log("useEffect ran (after paint)");
  }, []);

  return (
    <div>
      <h3>useLayoutEffect Example</h3>
      <div
        ref={boxRef}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "skyblue",
          transition: "0.5s",
        }}
      />
    </div>
  );
}
