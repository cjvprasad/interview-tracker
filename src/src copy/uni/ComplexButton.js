import React from "react";

// ✅ Simulate an async API that resolves after a delay
const getPromise = () => {
  return new Promise((resolve) => {
    console.log("⏳ Doing async task...");
    setTimeout(() => {
      console.log("✅ Promise resolved!");
      resolve();
    }, 1500);
  });
};

// ✅ Simulate an async check: "Is number even?"
const getEven = (num) => {
  console.log("🔍 Checking if even:", num);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num % 2 === 0);
    }, 1000); // Simulated network delay
  });
};

// ✅ Random function to generate numbers
const randomFunc = (setNum) => {
  const rand = Math.floor(Math.random() * 10);
  console.log("🎲 Random number generated:", rand);
  setNum(rand);
};

export default function ComplexButtonDemo() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h3>🧠 ComplexButton – Handling Async Side Effects</h3>
      <ComplexButton
        getPromise={getPromise}
        getEven={getEven}
        randomFunc={randomFunc}
      />
    </div>
  );
}

function ComplexButton({ getPromise, getEven, randomFunc }) {
  const [on, setOn] = React.useState(true);
  const [num, setNum] = React.useState(null);

  // 1️⃣ Generate first random number on mount
  React.useEffect(() => {
    randomFunc(setNum);
  }, []);

  // 2️⃣ Check if random number is even
  React.useEffect(() => {
    if (num == null) return;
    let mounted = true;

    getEven(num).then((isEven) => {
      if (!mounted) return; // 🧩 Prevent setting state if unmounted or stale
      console.log(`Result for ${num}: isEven=${isEven}`);
      setOn(isEven);
    });

    // Cleanup runs before next effect or unmount
    return () => {
      console.log("🧹 Cleanup for num:", num);
      mounted = false;
    };
  }, [num]);

  // 3️⃣ Handle click with async flow
  async function handleClick() {
    if (!on) {
      // If off, turn on immediately
      setOn(true);
      return;
    }

    try {
      await getPromise(); // Wait for async task
      setOn(false); // Hide button
    } catch (e) {
      console.error("❌ Promise failed:", e);
    }

    // Trigger a new random number → retriggers getEven effect
    randomFunc(setNum);
  }

  return (
    <>
      {on ? (
        <button onClick={handleClick} style={styles.button}>
          🔘 On (num={num})
        </button>
      ) : (
        <p>💤 Button is hidden, waiting for new random number...</p>
      )}
      <button onClick={() => randomFunc(setNum)}>Random Number</button>
    </>
  );
}

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
