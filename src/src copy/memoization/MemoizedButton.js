import * as React from "react";

// A simple button component

function Button({ onClick }) {
  console.log("Button is rendering...");
  return <button onClick={onClick}>Memoized Button</button>;
}

// 🛡️ React.memo wraps the component
const MemoizedButton = React.memo(Button);
export default MemoizedButton;
