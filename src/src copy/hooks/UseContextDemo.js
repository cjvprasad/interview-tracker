import React, { createContext, useContext, useState } from "react";
const ThemeContext = createContext();

function Child() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const lightTheme = theme === "light";
  const themeStyle = {
    backgroundColor: !lightTheme ? "#333" : "#fff",
    color: !lightTheme ? "#fff" : "#000",
    padding: "10px",
  };
  return (
    <>
      <div style={themeStyle}>
        <p>Current Theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    </>
  );
}
const UseContextDemo = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <h3>useContext Example</h3>

      <Child />
    </ThemeContext.Provider>
  );
};

export default UseContextDemo;
