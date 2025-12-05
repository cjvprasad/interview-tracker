import React from "react";

function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window?.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function CustomHookDemo() {
  const width = useWindowWidth();
  return (
    <>
      <h3>Custom Hook Example</h3>
      <p>Window width: {width}px</p>
    </>
  );
}
