import React, { useState, useCallback, useRef } from "react";

/* ============================================================================
   Custom Debounce
   ========================================================================== */
const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);

  return (...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback(...args);
      timerRef.current = null;
    }, delay);
  };
};

/* ============================================================================
   Custom Throttle
   ========================================================================== */
const useThrottle = (callback, delay) => {
  const timerRef = useRef(null);

  return (...args) => {
    if (timerRef.current) return;

    callback(...args);

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
    }, delay);
  };
};

/* ============================================================================
   Shooting Gallery (Final Correct Version)
   ========================================================================== */
const DebounceThrottle = () => {
  const [normalShots, setNormalShots] = useState(0);
  const [debouncedShots, setDebouncedShots] = useState(0);
  const [throttledShots, setThrottledShots] = useState(0);

  const debounceRef = useRef(0); // FIXED — start from 0
  const throttleRef = useRef(0); // FIXED — start from 0

  const debounceDelay = 400;
  const throttleDelay = 1000;

  /* NORMAL GUN */
  const handleNormalShot = () => {
    setNormalShots((prev) => prev + 1);
  };

  /* DEBOUNCED GUN — accumulate clicks inside debounceRef */
  const debouncedFire = useDebounce(() => {
    setDebouncedShots((prev) => prev + debounceRef.current);
    debounceRef.current = 0; // reset AFTER firing
  }, debounceDelay);

  const handleDebouncedShot = () => {
    debounceRef.current += 1; // accumulate clicks
    debouncedFire(); // fire once after pause
  };

  /* THROTTLED GUN — limit firing to 1 click per delay */
  const throttledFire = useThrottle(() => {
    setThrottledShots((prev) => prev + 1);
  }, throttleDelay);

  const handleThrottledShot = () => {
    throttledFire(); // ignore excess clicks during delay
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", lineHeight: 2 }}>
      <h1>🔫 Shooting Gallery</h1>

      {/* NORMAL */}
      <div style={box}>
        <button style={btn} onClick={handleNormalShot}>
          Normal Gun 🔫
        </button>
        <p>Shots Fired: {normalShots}</p>
      </div>

      {/* DEBOUNCED */}
      <div style={box}>
        <button style={btn} onClick={handleDebouncedShot}>
          Debounced Gun 🎯
        </button>
        <p>Shots Fired (after rest): {debouncedShots}</p>
      </div>

      {/* THROTTLED */}
      <div style={box}>
        <button style={btn} onClick={handleThrottledShot}>
          Throttled Gun 🚀
        </button>
        <p>Shots Fired (rate limited): {throttledShots}</p>
      </div>
    </div>
  );
};

/* ============================================================================
   Styles
   ========================================================================== */
const box = {
  border: "1px solid #ccc",
  padding: "16px",
  marginBottom: "16px",
  width: "300px",
  borderRadius: "8px",
};

const btn = {
  padding: "10px 16px",
  fontSize: "16px",
  cursor: "pointer",
};

const CounterInterval = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const handleStart = () => {
    // Prevent multiple intervals
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const newCount = count + 1;
      setCount(newCount); // correct way
      // setCount((prev) => prev + 1); // correct way
    }, 500);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
};
export default DebounceThrottle;
