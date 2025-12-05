import React, { useState } from "react";
import UseStateDemo from "./UseStateDemo";
import UseReducerDemo from "./UseReducerDemo";
import UseEffectDemo from "./UseEffectDemo";
import UseRefDemo from "./UseRefDemo";
import UseMemoDemo from "./UseMemoDemo";
import UseCallbackDemo from "./UseCallbackDemo";
import UseContextDemo from "./UseContextDemo";
import UseLayoutEffectDemo from "./UseLayoutEffectDemo";
import UseImperativeHandleDemo from "./UseImperativeHandleDemo";
import CustomHookDemo from "./CustomHookDemo";

const demos = {
  useState: <UseStateDemo />,
  useReducer: <UseReducerDemo />,
  useEffect: <UseEffectDemo />,
  useRef: <UseRefDemo />,
  useMemo: <UseMemoDemo />,
  useCallback: <UseCallbackDemo />,
  useContext: <UseContextDemo />,
  useLayoutEffect: <UseLayoutEffectDemo />,
  useImperativeHandle: <UseImperativeHandleDemo />,
  customHook: <CustomHookDemo />,
};

export default function HooksPlayground() {
  const [current, setCurrent] = useState("useState");

  return (
    <>
      <div style={styles.container}>
        <h2>🎯 React Hooks Playground</h2>
        <select
          style={styles.select}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        >
          {Object.keys(demos).map((hook) => (
            <option key={hook} value={hook}>
              {hook}
            </option>
          ))}
        </select>
        <div style={styles.demo}>{demos[current]}</div>
      </div>
    </>
  );
}

const styles = {
  container: { padding: 20, fontFamily: "sans-serif" },
  select: { padding: 8, marginBottom: 20 },
  demo: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
