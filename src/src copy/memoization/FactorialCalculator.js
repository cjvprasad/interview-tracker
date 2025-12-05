import * as React from "react";

function FactorialCalculator({ number }) {
  // ⚡ useMemo caches the result of the factorial calculation
  // It ONLY runs the 'calculateFactorial' function when 'number' changes.
  const factorial = React.useMemo(() => {
    console.log(`Calculating factorial for ${number}...`);
    // This function takes a long time!
    let result = 1;
    for (let i = 1; i <= (number); i++) {
      result *= i;
    }
    return result;
  }, [number]); // Dependency array: only recalculate if 'number' changes

  return (
    <div>
      <p>
        Factorial of {number} is: {factorial}
      </p>
    </div>
  );
}
export default FactorialCalculator;
