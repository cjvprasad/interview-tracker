export const interviewQuestions = [
  // Q1: bind() vs call() vs apply()
  {
    id: 1,
    title: "bind(), call(), vs apply() (Complete Guide)",
    explanation:
      "All three methods are used to explicitly set 'this' inside a function.\n\n## Basic Summary\n* **.call(thisArg, arg1, arg2, ...):** Calls the function immediately; arguments are passed individually.\n* **.apply(thisArg, [arg1, arg2, ...]):** Calls the function immediately; arguments are passed as an array.\n* **.bind(thisArg, arg1, arg2, ...):** **Does NOT call immediately**; it returns a **NEW function** permanently bound to the specified 'this' context, which must be executed later.\n\n## Execution & Return Value\n`call()` and `apply()` execute the function and return the function's result immediately. `bind()` returns a new, bound function.",
    tips: '"Interview Tips / Pitfalls"\n* **Key takeaway:** `call()` and `apply()` execute immediately (temporary binding); `bind()` returns a new function (permanent binding).\n* Use `apply()` when you have an array of arguments (e.g., using `Math.max.apply(null, array)`).\n* Use `bind()` for event callbacks, function composition, and partial application (pre-setting arguments).\n* Arrow functions ignore all three methods for the `this` context because they capture `this` lexically.',
    codeString:
      'function greet(greeting, city, country) {\n  return greeting + \', \' + this.name + \' from \' + city + \', \' + country;\n}\nconst person = { name: "Jay" };\nconst alice = { name: \'Alice\' };\n\n// 1. call(): immediate execution, args individually\nconsole.log(greet.call(person, \'Hello\', "Hyderabad", "India"));\n\n// 2. apply(): immediate execution, args as an array\nconsole.log(greet.apply(alice, ["Hi", "Bangalore", "India"]));\n\n// 3. bind(): returns a new function (supports partial application)\nconst boundGreet = greet.bind(person, "Yo", "New York");\nconsole.log(boundGreet("USA")); // Execute the bound function later\n',
    output:
      "Hello, Jay from Hyderabad, India\nHi, Alice from Bangalore, India\nYo, Jay from New York, USA",
  },
  // Q2: Polyfill for Array.prototype.map
  {
    id: 2,
    title: "Polyfill: Write a polyfill for Array.prototype.map",
    explanation: `
A polyfill implements a newer API feature on older environments. Writing polyfills tests your understanding of **prototypes**, **this-binding**, and handling edge cases like sparse arrays and argument validation.

## Implementation Details
1.  Add the function to \`Array.prototype\`.
2.  Validate that the input is a function.
3.  Loop through the array using \`this.length\`.
4.  Inside the loop, call the callback function, ensuring to pass the correct arguments (\`currentValue\`, \`index\`, \`array\`).
5.  The return value of the callback is pushed to the new result array.

`,
    tips: `"Interview Tips / Pitfalls"
* Mention that a fully compliant polyfill needs to handle **sparse arrays** (skipping 'holes') and properly coerce \`this\` to an object (\`ToObject\`), but the provided solution is sufficient for most interview contexts.
* Contrast this with \`forEach\`, which does not return a new array.
`,
    codeString: `
// We use 'myMap' to avoid conflict with native map
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callbackFn) {
    if (typeof callbackFn !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    const result = [];
    // 'this' refers to the array on which myMap is called
    for (let i = 0; i < this.length; i++) {
      // Check for property existence for true compliance (sparse array handling)
      // if (Object.prototype.hasOwnProperty.call(this, i)) {
        // Call the callback with (value, index, array)
        const mappedValue = callbackFn(this[i], i, this);
        result.push(mappedValue);
      // }
    }
    return result;
  }
}

const arr = [1, 2, 3];
console.log(arr.myMap(x => x * 2));
`,
    output: `[2, 4, 6]`,
  },
  // Q3: LocalStorage vs SessionStorage vs Cookies
  {
    id: 3,
    title: "LocalStorage vs SessionStorage vs Cookies",
    explanation: `
These are client-side storage mechanisms differing primarily in **lifetime**, **scope**, and **capacity**.

| Feature | LocalStorage | SessionStorage | Cookies |
|---|---|---|---|
| **Lifetime** | Persistent (until manually cleared) | Tab/Window duration | Set by Expiration Date/Max-Age |
| **Scope** | Per origin (all tabs/windows) | Per origin and per tab/window | Per origin, path, and domain |
| **Capacity** | ~5-10 MB | ~5-10 MB | ~4 KB |
| **Transmitted in HTTP** | No | No | **Yes** (on every request) |
| **JS Accessible** | Yes | Yes | Yes (unless HttpOnly) |

`,
    tips: `"Interview Tips / Pitfalls"
* **Security:** Never store sensitive tokens in \`localStorage\` due to **XSS risk**. HttpOnly cookies are much safer for session tokens as JavaScript cannot access them.
* **Performance:** Cookies are sent with every HTTP request, contributing to request header size. Keep them small to minimize latency.
`,
    codeString: `
// localStorage
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
console.log('Local Storage Theme:', theme);

// sessionStorage
sessionStorage.setItem('tabId', 'abc123');
console.log('Session Storage ID:', sessionStorage.getItem('tabId'));

// Cookie (client-side setter)
document.cookie = "sessionId=xyz; path=/; max-age=3600; Secure; SameSite=Strict";
console.log('Cookies:', document.cookie);
`,
    output: `Local Storage Theme: dark
Session Storage ID: abc123
Cookies: sessionId=xyz; path=/; max-age=3600; Secure; SameSite=Strict (or similar)
`,
  },
  // Q4: Types of cookies and expiration time
  {
    id: 4,
    title: "Types of Cookies and Expiration",
    explanation: `
Cookie types are primarily differentiated by their **lifetime**. Expiration is **optional**.

* **Session Cookies:** These cookies **do not** have the \`Expires\` or \`Max-Age\` attributes set. They expire when the browser window or tab is closed.
* **Persistent Cookies:** These **do** have \`Expires\` (a specific date) or \`Max-Age\` (seconds from now) attributes set. They survive browser restarts until the expiration time is reached.
* **HttpOnly Cookie:** Inaccessible to client-side JavaScript (\`document.cookie\`). Used for security (session tokens).
* **Secure Cookie:** Only transmitted over HTTPS.
* **SameSite Cookie:** Controls when cookies are sent with cross-site requests (Lax, Strict, None).

`,
    tips: `"Interview Tips / Pitfalls"
* Discuss the importance of the \`SameSite\` attribute (Lax/Strict) to mitigate CSRF attacks.
* Mention that browsers are increasingly blocking third-party cookies and defaulting to \`SameSite=Lax\`.
`,
    codeString: `
// 1. Session Cookie (Expires on browser close)
document.cookie = "userPrefs=lightMode; path=/";

// 2. Persistent Cookie (Expires in 1 hour)
document.cookie = "auth=token123; path=/; max-age=3600";
`,
    output:
      "Requires browser console/network tab inspection to confirm expiration behavior.",
  },
  // Q5: Storage sizes
  {
    id: 5,
    title: "Storage Sizes: localStorage vs sessionStorage vs Cookies",
    explanation: `
* **LocalStorage & SessionStorage:** Typically allow **5–10 MB** of data storage per origin (domain). This is substantial and often sufficient for caching non-sensitive application data.
* **Cookies:** Have a very strict limit, roughly **4 KB per cookie**, and there is a limit on the total number of cookies per domain (around 20–50 depending on the browser).

`,
    tips: `"Interview Tips / Pitfalls"
* **Implications:** Cookies are inefficient for large data because they are sent in the HTTP header of **every single request**, increasing bandwidth and latency.
* **Recommendation:** Use IndexedDB or LocalStorage for large client-side data storage. Reserve cookies for small, essential pieces of information like session IDs.
`,
    codeString: `
// Attempting to set a key/value pair > 5MB in localStorage will fail.
// Cookies are restricted to around 4KB per cookie.
console.log("Maximum storage capacity is roughly 5MB per origin for Web Storage API.");
`,
    output:
      "Maximum storage capacity is roughly 5MB per origin for Web Storage API.",
  },
  // Q6: Normal cookie vs HttpOnly cookie
  {
    id: 6,
    title: "Normal Cookie vs HttpOnly Cookie",
    explanation: `
* **Normal Cookie:** Accessible via client-side JavaScript using \`document.cookie\`.
* **HttpOnly Cookie:** **Cannot be accessed by client-side JavaScript**. It is only included in the HTTP request headers when sent to the server.

## Security Implication
The \`HttpOnly\` flag is critical for security because it prevents malicious code injected via a **Cross-Site Scripting (XSS) attack** from stealing the user's session token.

`,
    tips: `"Interview Tips / Pitfalls"
* You must set the \`HttpOnly\` flag from the **server-side** (in the \`Set-Cookie\` HTTP header).
* \`HttpOnly\` mitigates XSS-based token theft but **does not** protect against **CSRF** (Cross-Site Request Forgery). You need \`SameSite\` and CSRF tokens for that.
`,
    codeString: `
// Example of accessing a normal cookie:
// const token = document.cookie.match(/token=([^;]+)/)[1];

// HttpOnly cookies cannot be accessed here, they are simply invisible to JS.
console.log("HttpOnly cookies cannot be accessed or manipulated by JavaScript, enhancing security against XSS.");
`,
    output:
      "HttpOnly cookies cannot be accessed or manipulated by JavaScript, enhancing security against XSS.",
  },
  // Q7: Closures
  {
    id: 7,
    title: "Closures — explanation and example",
    explanation: `
A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (its **lexical environment**).

In simple terms, a function forms a closure by retaining access to variables from its parent scope, even after the parent function has finished executing. Closures are powerful for achieving **data privacy** (encapsulation) and creating **function factories**.

`,
    tips: `"Interview Tips / Pitfalls"
* Explain **memory considerations**: closures keep the referenced variables alive in memory, which can lead to memory leaks if not handled correctly (though modern JS engines are good at garbage collection).
* Mention surprising behaviors in loops and closures, especially with \`var\` (which is function-scoped) versus \`let\` or \`const\` (which are block-scoped).
`,
    codeString: `
function makeCounter(start = 0) {
  // 'count' is part of the closure's lexical environment
  let count = start;

  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
}

const c = makeCounter(10);
console.log("Initial:", c.value());
c.increment();
console.log("After Increment:", c.value());
// The 'count' variable remains private and encapsulated.
`,
    output: `Initial: 10
After Increment: 11`,
  },
  // Q8: Hoisting
  {
    id: 8,
    title: "Hoisting (var vs let/const, function declarations)",
    explanation: `
**Hoisting** is the JavaScript engine's behavior of moving declarations to the top of their current scope during the compilation phase.

* **\`var\` and Function Declarations:** The declaration is hoisted to the top. \`var\` variables are initialized to \`undefined\`. Function declarations are hoisted completely (name and body).
* **\`let\` and \`const\`:** These are also hoisted, but they are placed in the **Temporal Dead Zone (TDZ)** from the start of the block until their declaration is processed. Accessing them in the TDZ results in a \`ReferenceError\`.

`,
    tips: `"Interview Tips / Pitfalls"
* **TDZ:** Explain that \`let/const\` are hoisted but inaccessible, leading to a \`ReferenceError\`, which is better than the confusing \`undefined\` you get with \`var\`.
* **Function Differences:** Function declarations are fully hoisted and can be called before they appear in the code, whereas function expressions (assigned to \`var\`, \`let\`, or \`const\`) behave like regular variables and are only partially hoisted.
`,
    codeString: `
// 1. var hoisting
console.log("A is:", a); // Output: undefined
var a = 2;

// 2. let/const and TDZ
try {
  console.log("B is:", b);
} catch (e) {
  console.log("B is:", e.name); // Output: ReferenceError
}
let b = 3;

// 3. Function declaration hoisting
function foo(){ return 'Function hoisted'; }
console.log(foo());
`,
    output: `A is: undefined
B is: ReferenceError
Function hoisted`,
  },
  // Q9: Event loop, microtask vs macrotask queues
  {
    id: 9,
    title: "Event Loop, Microtasks vs Macrotasks",
    explanation: `
The **Event Loop** is the mechanism that allows JavaScript (a single-threaded language) to perform non-blocking asynchronous operations.

1.  **Call Stack:** Executes synchronous code.
2.  **Web APIs/Node APIs:** Handle asynchronous operations (e.g., \`setTimeout\`, \`fetch\`).
3.  **Queues:** Callbacks from Web APIs go into one of two queues:

* **Microtask Queue (High Priority):** Includes **Promise callbacks** (\`.then()/.catch()/.finally()\`), **\`await\`** continuations, \`queueMicrotask\`, and \`MutationObserver\`. **Crucially, the Microtask Queue is emptied completely after the Call Stack is empty, and before the browser renders or processes the next macrotask.**
* **Macrotask Queue (Low Priority):** Includes **Timers** (\`setTimeout\`, \`setInterval\`), **I/O** callbacks, and UI rendering. Only one macrotask is processed per loop cycle.

`,
    tips: `"Interview Tips / Pitfalls"
* The primary ordering rule is: **Stack > Microtasks > Macrotasks**.
* This means a \`Promise.resolve().then()\` (microtask) will always execute *before* a \`setTimeout(() => {}, 0)\` (macrotask), even if the timer is set to 0ms.
`,
    codeString: `
console.log('1. Start (Sync)');

setTimeout(() => console.log('4. Timeout (Macrotask)'), 0);

Promise.resolve().then(() => console.log('3. Promise (Microtask)'));

console.log('2. End (Sync)');
`,
    output: `1. Start (Sync)
2. End (Sync)
3. Promise (Microtask)
4. Timeout (Macrotask)`,
  },

  // Q11: Spread vs Rest operator
  {
    id: 11,
    title: "Spread vs Rest Operator (`...`)",
    explanation: `
Both use the \`...\` syntax, but their function is opposite based on context:

| Operator | Context | Action | Result |
|---|---|---|---|
| **Spread** | Function call, array literal, object literal | **Expands** an iterable into its individual elements. | Copies elements/properties. |
| **Rest** | Function parameters, array/object destructuring | **Collects** the remaining individual elements into a new array or object. | Bundles elements/properties. |

`,
    tips: `"Interview Tips / Pitfalls"
* **Shallow Copy:** Both operators create a shallow copy. Nested objects or arrays will still share the same references.
* **Rest Position:** The rest operator must always be the **last element** in the array destructuring or function parameters.
`,
    codeString: `
// 1. Spread Operator (Expands)
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// 2. Rest Operator (Collects in function args)
function sum(x, ...restOfNumbers) {
  console.log('X:', x);
  console.log('Rest:', restOfNumbers);
  return restOfNumbers.reduce((s, n) => s + n, x);
}
console.log('Sum:', sum(1, 2, 3, 4));

// 3. Rest Operator (Collects in object destructuring)
const { id, ...details } = { id: 1, name: 'A', age: 30 };
console.log('Details:', details); // { name: 'A', age: 30 }
`,
    output: `X: 1
Rest: [2, 3, 4]
Sum: 10
Details: { name: 'A', age: 30 }`,
  },
  // Q12: call vs apply vs bind (Repeat, providing unique example)
  {
    id: 12,
    title: "call, apply, and bind with different return values",
    explanation: `
This is a summary focusing on the return values and execution timing.

* \`call()\` and \`apply()\` execute the function and return the function's result immediately.
* \`bind()\` returns a new function (a permanently bound function) that can be executed later.

`,
    tips: `"Interview Tips / Pitfalls"
* Arrow functions ignore \`call()\`, \`apply()\`, and \`bind()\` for **\`this\`** context because they capture \`this\` lexically from their enclosing scope. The only exception is setting arguments for a non-bound arrow function.
`,
    codeString: `
function greet(greeting, punc) {
  return greeting + ' ' + this.name + punc;
}
const alice = { name: 'Alice' };

// Call (immediate execution, individual args)
console.log(greet.call(alice, 'Hi', '!'));

// Apply (immediate execution, array args)
console.log(greet.apply(alice, ['Hello', '?']));

// Bind (returns a new function, also supports partial application)
const greetAlice = greet.bind(alice, 'Yo');
console.log(greetAlice('!!!')); // Execute the bound function later
`,
    output: `Hi Alice!
Hello Alice?
Yo Alice!!!`,
  },
  // Q13: Hooks - useEffect, useMemo, useCallback
  {
    id: 13,
    title: "React Hooks: useEffect, useMemo, useCallback",
    explanation: `
These hooks manage component side effects and performance optimization in functional components.

* **\`useEffect(effect, deps)\`:** Manages side-effects (data fetching, subscriptions, manual DOM changes) after render. The returned function is the **cleanup** logic.
* **\`useMemo(factory, deps)\`:** Memoizes a **computed value** (e.g., a heavy calculation or filtered list) to prevent recalculation across renders unless dependencies change.
* **\`useCallback(fn, deps)\`:** Memoizes a **function reference** (callback) to prevent it from being recreated on every render. Useful when passing callbacks down to memoized child components to prevent their unnecessary re-renders.

`,
    tips: `"Interview Tips / Pitfalls"
* **Misuse:** Overusing \`useMemo\`/\`useCallback\` can introduce complexity and memory overhead that outweighs the minimal performance gain. Always measure before optimizing.
* **Dependency Array:** Must include every variable from the component scope that the hook's function uses, otherwise you create a **stale closure** (the effect/memo uses outdated values).
`,
    codeString: `
import React, { useState, useEffect, useMemo, useCallback } from 'react';

// Mock expensive function
const computeHeavy = (a) => a * 1000;

function PerformanceDemo({ a, b }) {
  const [count, setCount] = useState(0);

  // useMemo: caches the result of the heavy computation
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return computeHeavy(a);
  }, [a]); // Recalculates only when 'a' changes

  // useCallback: caches the function reference
  const onClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependencies mean the function reference never changes

  // useEffect: handles side effects (runs only when 'b' changes or on mount)
  useEffect(() => {
    console.log(\`A changed to \${a}, or B changed to \${b}\`);
    return () => console.log('Cleanup before next run or unmount');
  }, [a, b]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Memoized Result: {expensiveValue}</p>
      <button onClick={onClick}>Increment</button>
    </div>
  );
}
// export default PerformanceDemo;
`,
    output:
      "Run in React environment. Logs 'Calculating expensive value...' and 'A changed to X, or B changed to Y'.",
  },
  // Q14: Custom Hooks
  {
    id: 14,
    title: "Custom Hooks — what and example",
    explanation: `
A **Custom Hook** is a JavaScript function whose name starts with \`use\` and that calls other built-in React Hooks. They are a convention that allows you to extract component logic (like state management or side effects) into reusable functions.

* **Goal:** Share stateful logic between components without sharing the state itself (each component gets its own independent copy).
* **Rule of Hooks:** Custom Hooks must only be called from the top level of other React function components or other custom Hooks.

`,
    tips: `"Interview Tips / Pitfalls"
* Show how to handle cleanup and include stable identities in dependencies.
* Always include logic to prevent state updates on unmounted components in any asynchronous custom hook.
`,
    codeString: `
import { useState, useEffect } from 'react';

// Custom hook for data fetching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    
    // Inner async function allows use of await without making useEffect callback async
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    fetchData();

    // Cleanup function runs on unmount or before next effect run
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
`,
    output:
      "This hook returns { data, loading, error } based on the fetch call results.",
  },
  // Q15: Custom hook for window width
  {
    id: 15,
    title: "Custom Hook for Window Width (`useWindowWidth`)",
    explanation: `
A highly practical custom hook that manages the side effect of listening to the global \`resize\` event. It demonstrates proper initialization and cleanup within \`useEffect\`.

## Implementation Details
1.  Initialize state with the current \`window.innerWidth\`.
2.  Use \`useEffect\` to subscribe to the \`resize\` event.
3.  Return a cleanup function that unsubscribes (\`removeEventListener\`) to prevent memory leaks.
4.  Handle Server-Side Rendering (SSR) by checking if \`window\` is defined.

`,
    tips: `"Interview Tips / Pitfalls"
* Mention that for heavy resize logic, you should **debounce** the \`onResize\` function call to prevent performance issues.
* The check for \`isClient\` (\`typeof window === 'object'\`) is vital for SSR compatibility.
`,
    codeString: `
import { useState, useEffect } from 'react';

function useWindowWidth() {
  // Check if we are running in a browser environment
  const isClient = typeof window === 'object';
  
  function getWidth() { 
    return isClient ? window.innerWidth : 0; 
  }
  
  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    if (!isClient) return; // Prevent errors on the server
    
    // Debouncing the resize handler is recommended for production
    function onResize() { 
      setWidth(window.innerWidth); 
    }

    window.addEventListener('resize', onResize);

    // Cleanup function: remove the event listener
    return () => window.removeEventListener('resize', onResize);
  }, [isClient]); // Re-runs if client environment somehow changes (not typically)

  return width;
}
`,
    output: "This hook returns the current window width in pixels.",
  },
  // Q16: Reconciliation / Virtual DOM / diffing
  {
    id: 16,
    title: "Reconciliation, Virtual DOM, and Diffing",
    explanation: `
**Virtual DOM (VDOM):** A lightweight, in-memory representation of the actual DOM.
**Reconciliation:** The process where React compares the new VDOM tree with the previous VDOM tree to determine the minimal necessary changes to apply to the real DOM.
**Diffing:** The specific algorithm used during Reconciliation to calculate the difference (the "diff") between the two VDOM trees.

## Reconciliation Heuristics
React uses two main heuristics (assumptions) for efficient diffing, which results in an O(n) complexity rather than O(n³):
1.  **Element Type:** If the root elements have different types (e.g., \`<div>\` changes to \`<span>\`), React tears down the old tree and builds the new one from scratch.
2.  **Keys:** When comparing lists of children, React uses **keys** to match children from the previous render to children in the current render.

`,
    tips: `"Interview Tips / Pitfalls"
* **Keys are Crucial:** Explain why using the array index as a key is detrimental when list items can be reordered, inserted, or deleted. This causes React to reuse DOM nodes incorrectly, leading to bugs, loss of state (like input values), or failed animations.
* **The Solution:** Always use a stable, unique key derived from the data item (e.g., a database ID).
`,
    codeString: `
function List({ items }) {
  // BAD: Index as key - causes issues if item order changes!
  /*
  return (
    <ul>
      {items.map((item, index) => <li key={index}>{item.text}</li>)}
    </ul>
  );
  */
 
  // GOOD: Stable ID as key
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.text}</li>)}
    </ul>
  );
}
`,
    output: "Renders a list using stable keys for efficient updates.",
  },
  // Q17: React Router: useParams and query params
  {
    id: 17,
    title: "React Router: useParams vs useSearchParams (Path vs Query Params)",
    explanation: `
* **Path Parameters (\`useParams\`):** Extract dynamic segments from the URL path defined in the route.
    * **Example Route:** \`/users/:userId\`
    * **Usage:** \`const { userId } = useParams();\`
* **Query Parameters (\`useSearchParams\`):** Extract key/value pairs from the URL search string, used for view state (filtering, sorting, pagination).
    * **Example URL:** \`/users/123?view=details&sort=asc\`
    * **Usage:** \`const [searchParams, setSearchParams] = useSearchParams();\`

`,
    tips: `"Interview Tips / Pitfalls"
* **Function:** Path params identify the specific resource (\`userId\`); Query params control the *view* of that resource (\`view\`, \`sort\`).
* **Re-render:** Changing a path parameter often leads to the component being *remounted* (new resource). Changing query parameters typically causes a *re-render* of the same component with updated props.
`,
    codeString: `
// Requires react-router-dom v6+
import { useParams, useSearchParams } from 'react-router-dom';

function UserProfile() {
  // Path Param (e.g., /user/42)
  const { userId } = useParams(); 

  // Query Params (e.g., /user/42?tab=activity)
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';

  const navigateToDetails = () => {
    // Update the query param
    setSearchParams({ tab: 'details' }); 
  };

  return (
    <div>
      <h1>User ID: {userId}</h1>
      <p>Current Tab: {tab}</p>
      <button onClick={navigateToDetails}>Show Details</button>
    </div>
  )
}
`,
    output: "Run in a React Router environment.",
  },
  // Q18: Passing & reading query params (v6)
  {
    id: 18,
    title: "Passing and Reading Query Params in React Router v6",
    explanation: `
In React Router v6, the primary way to manage query parameters is using the \`useSearchParams\` hook.

* **Reading:** It returns a URLSearchParams object (readable via \`.get()\`) and a setter function.
* **Setting:** The setter function (\`setSearchParams\`) replaces the current query string.

`,
    tips: `"Interview Tips / Pitfalls"
* **URL Encoding:** Always use \`encodeURIComponent()\` when creating query strings to handle special characters safely.
* **History Management:** When navigating, decide between \`history.push\` (adds to history, use for navigation) and \`history.replace\` (replaces current history entry, use for internal state updates like sorting). \`useSearchParams\` setter defaults to pushing history.
`,
    codeString: `
// Requires react-router-dom v6+
import { useSearchParams } from 'react-router-dom';

function SearchComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Reading:
  const searchTerm = searchParams.get('term') || '';

  // Setting:
  const handleSearch = (newTerm) => {
    setSearchParams({ term: newTerm, page: 1 });
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..." 
      />
      <p>Current search term: {searchTerm}</p>
    </div>
  )
}
`,
    output: "Run in a React Router environment.",
  },
  // Q19: Will component re-render if query param changes?
  {
    id: 19,
    title: "Component Re-render on Query Parameter Change",
    explanation: `
**Yes, a component will re-render if a query parameter changes, provided that the component is using a router hook that subscribes to the URL location.**

1.  The URL changes (e.g., \`?page=1\` to \`?page=2\`).
2.  The Router (\`BrowserRouter\`) detects the location change.
3.  The Router updates the internal context that hooks like \`useLocation\` or \`useSearchParams\` read from.
4.  Any component using these hooks will receive the new value and re-render.

`,
    tips: `"Interview Tips / Pitfalls"
* **Optimization:** If the query change only affects a small part of the UI, use \`useMemo\` or \`React.memo\` on expensive child components whose props do not rely on the query parameter to prevent unnecessary re-renders.
* **Dependency:** Ensure your \`useEffect\` hooks include the query parameter value in the dependency array if they need to fetch data based on that value.
`,
    codeString: `
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function DataFetcher() {
  const [searchParams] = useSearchParams();
  const sortOrder = searchParams.get('sort') || 'default';

  useEffect(() => {
    // This effect runs every time the 'sort' query param changes
    console.log(\`Fetching data with sort order: \${sortOrder}\`);
    // fetch('/api/data?sort=' + sortOrder)
  }, [sortOrder]); // <-- Dependency array ensures reaction to query change

  return <div>Data sorted by: {sortOrder}</div>;
}
`,
    output:
      "Run in a React Router environment. Logs when the 'sort' query parameter changes.",
  },
  // Q20: async/await vs Promises
  {
    id: 20,
    title: "async/await vs Promises",
    explanation: `
**\`async/await\` is syntactic sugar built on top of Promises.** They achieve the same goal (managing asynchronous operations) but with different syntax.

| Feature | Promises (\`.then/.catch\`) | async/await |
|---|---|---|
| **Syntax** | Chainable methods, function returns Promise | Looks synchronous, function returns Promise |
| **Error Handling** | \`.catch()\` method | \`try...catch\` blocks |
| **Concurrency** | Needs \`Promise.all()\` | Sequential by default (needs \`Promise.all()\` or firing promises first) |

`,
    tips: `"Interview Tips / Pitfalls"
* **Error Handling:** Demonstrate using \`try...catch\` with \`await\` as the equivalent of a \`.catch()\` block.
* **Concurrency Trap:** Explain that using \`await\` in a loop is inherently sequential and slow. For parallel execution, you must fire all asynchronous calls first and then \`await Promise.all([p1, p2, p3])\`.
* **Mechanism:** An \`await\` keyword essentially pauses the execution of the \`async\` function and schedules the rest of the function's body as a **microtask** once the awaited Promise resolves.
`,
    codeString: `
function mockFetch(success) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      success ? resolve({ data: 'Resolved Data' }) : reject('API Failed');
    }, 100);
  });
}

// 1. Promise Style
mockFetch(true)
  .then(data => console.log('Promise success:', data.data))
  .catch(err => console.error('Promise error:', err));

// 2. Async/Await Style
async function loadData() {
  try {
    const data = await mockFetch(false);
    console.log('Async success:', data.data); // Skipped on error
  } catch (err) {
    console.error('Async error:', err);
  }
}
loadData();
`,
    output: `Promise success: Resolved Data
Async error: API Failed (or similar based on execution order)`,
  },
  // Q21: display:none vs visibility:hidden vs opacity:0
  {
    id: 21,
    title: "CSS: display:none vs visibility:hidden vs opacity:0",
    explanation: `
These CSS properties all hide an element, but with drastically different effects on the page layout, performance, and accessibility.

| Property | Layout Space | Events/Interaction | Animation | Accessibility |
|---|---|---|---|---|
| **\`display:none\`** | **No** (Element removed from flow) | No | No (cannot transition) | Removed from accessibility tree |
| **\`visibility:hidden\`** | **Yes** (Space remains) | No (Cannot be clicked) | Yes (can transition) | Removed from accessibility tree |
| **\`opacity:0\`** | **Yes** (Space remains) | **Yes** (Can still be clicked/tabbed to) | Yes (smooth transition) | **Remains** in accessibility tree |

`,
    tips: `"Interview Tips / Pitfalls"
* **Accessibility:** \`opacity: 0\` elements can still be navigated to via the keyboard and read by screen readers unless you also set \`pointer-events: none\` and/or \`aria-hidden="true"\`.
* **Performance:** \`display: none\` causes a repaint and layout change (reflow), while \`visibility: hidden\` and \`opacity: 0\` only cause a repaint. \`opacity\` is often the most performant choice for simple toggles if layout preservation is acceptable.
`,
    codeString: `
/* HTML example structure:
<div class="box box-display">Display None</div>
<div class="box box-visibility">Visibility Hidden</div>
<div class="box box-opacity">Opacity Zero</div>
*/
.box-display {
  display: none; /* No space taken, not clickable */
}

.box-visibility {
  visibility: hidden; /* Space taken, not clickable */
}

.box-opacity {
  opacity: 0; /* Space taken, IS clickable/tabbable */
}
`,
    output: "Requires browser environment to see visual effects.",
  },
  // Q22: Exception handling in Java (short)
  {
    id: 22,
    title: "Exception Handling in Java (try/catch/finally)",
    explanation: `
Java uses the \`try-catch-finally\` construct for exception handling.

* **\`try\`:** Encloses code that might throw an exception.
* **\`catch\`:** Handles the exception if one is thrown in the \`try\` block. You can have multiple \`catch\` blocks for specific exception types.
* **\`finally\`:** Contains code that **always** executes, regardless of whether an exception occurred or was handled (critical for resource cleanup, like closing database connections or files).
* **Checked vs Unchecked:** **Checked exceptions** (like \`IOException\`) must be explicitly declared in the method signature using \`throws\` or handled. **Unchecked exceptions** (like \`NullPointerException\`, which are runtime errors) do not require explicit handling.

`,
    tips: `"Interview Tips / Pitfalls"
* Emphasize using specific \`catch\` blocks over catching the generic \`Exception\` class.
* Mention the **try-with-resources** statement (for AutoCloseable objects) as the modern and safest way to handle resource cleanup in Java.
`,
    codeString: `
// Java Code Example (Conceptual)
/*
public void processFile(String path) throws IOException {
    try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
        String line = reader.readLine();
        // process line...
    } catch (FileNotFoundException e) {
        System.err.println("File not found: " + e.getMessage());
    } catch (IOException e) {
        System.err.println("Error reading file: " + e.getMessage());
    }
    // No explicit finally needed due to try-with-resources, 
    // but code here would execute last.
}
*/
`,
    output: "Conceptual Java code.",
  },
  // Q23: Annotations in Spring Boot (short)
  {
    id: 23,
    title: "Key Annotations in Spring Boot",
    explanation: `
Spring Boot uses annotations heavily for configuration, dependency injection, and component scanning.

| Annotation | Purpose |
|---|---|
| **\`@SpringBootApplication\`** | Combines \`@Configuration\`, \`@EnableAutoConfiguration\`, and \`@ComponentScan\`. Used to bootstrap the application. |
| **\`@RestController\`** | Combines \`@Controller\` and \`@ResponseBody\`. Marks a class as a controller where methods return data directly (API). |
| **\`@Service\`** | Marks business logic components. |
| **\`@Repository\`** | Marks data access layer components (translates exceptions). |
| **\`@Autowired\`** | Used for field/setter/constructor injection (Dependency Injection). |
| **\`@Configuration\` / \`@Bean\`** | Defines configuration classes and methods that produce beans (objects) managed by the Spring container. |
| **\`@GetMapping\`** | Mapping HTTP GET requests to handler methods. |

`,
    tips: `"Interview Tips / Pitfalls"
* **Dependency Injection (DI):** Explain that **constructor injection** is the preferred method over field (\`@Autowired\` on a field) or setter injection, as it ensures dependencies are available when the object is constructed and supports immutability.
`,
    codeString: `
// Java/Spring Boot Code Example (Conceptual)
/*
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService; // Constructor Injection Preferred

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
*/
`,
    output: "Conceptual Spring Boot code.",
  },
  // Q24: Hibernate: how to use & connect (summary)
  {
    id: 24,
    title: "Hibernate/JPA in Spring Boot",
    explanation: `
Hibernate is the most popular Java Persistence API (JPA) implementation. Spring Data JPA simplifies its usage significantly.

1.  **Dependencies:** Add \`spring-boot-starter-data-jpa\` and a database driver (e.g., MySQL, Postgres).
2.  **Configuration:** Configure the database connection in \`application.properties\` or \`application.yml\` (\`spring.datasource.url\`, \`username\`, \`password\`).
3.  **Entities:** Annotate Java classes with \`@Entity\` and define the primary key with \`@Id\`.
4.  **Repositories:** Extend \`JpaRepository\` to get free CRUD (Create, Read, Update, Delete) methods.

`,
    tips: `"Interview Tips / Pitfalls"
* **N+1 Problem:** Discuss the \`N+1 SELECTs\` problem where fetching a list of entities followed by lazy loading their associations causes many separate database calls.
* **Loading:** Explain the difference between **Lazy Loading** (default, fetches association when accessed) and **Eager Loading** (fetches association immediately). Use \`@EntityGraph\` or JPQL joins to avoid N+1 issues.
`,
    codeString: `
// Java/JPA Code Example (Conceptual)
/*
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    // ...
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom query method
    List<Product> findByCategoryName(String categoryName);
}
*/
`,
    output: "Conceptual JPA code.",
  },
  // Q25: useMemo & useCallback examples
  {
    id: 25,
    title: "React: useMemo and useCallback in practice",
    explanation: `
Both hooks are used for **memoization** (caching) to improve performance by preventing unnecessary re-runs/re-creations.

* **\`useMemo\` (Value):** Memoizes the **result of a computation**. Use it for expensive calculations, or stabilizing object/array references passed to child components.
* **\`useCallback\` (Function):** Memoizes a **function reference**. Use it when passing functions as props to components wrapped in \`React.memo\`.

`,
    tips: `"Interview Tips / Pitfalls"
* **Avoid Premature Optimization:** Only use these hooks when profiling indicates a performance bottleneck. The hooks themselves incur a small overhead.
* **The Problem \`useCallback\` Solves:** If you pass an inline function to a \`React.memo\` child, the child re-renders every time because the function reference changes. \`useCallback\` ensures the reference is stable.
`,
    codeString: `
import React, { useState, useMemo, useCallback } from 'react';

function ParentComponent({ items, filterText }) {
  // 1. useMemo: Memoizes the filtered list
  const filteredList = useMemo(() => {
    // Only re-run this filtering if 'items' or 'filterText' changes
    console.log('Filtering list...');
    return items.filter(i => i.name.includes(filterText));
  }, [items, filterText]); 

  // State unrelated to the filter
  const [count, setCount] = useState(0); 

  // 2. useCallback: Memoizes the function reference
  const handleItemClick = useCallback((id) => {
    console.log('Item clicked:', id);
  }, []); // Empty dependency array: reference never changes

  // Use filteredList and handleItemClick in child components...
  return (
    <div>
      <p>Unrelated counter: {count}</p>
      <MemoizedChild list={filteredList} onClick={handleItemClick} />
    </div>
  )
}
`,
    output:
      "Run in a React environment. Logs 'Filtering list...' only when inputs change.",
  },
  // Q26: Class vs Functional components
  {
    id: 26,
    title: "Class vs Functional Components",
    explanation: `
Modern React development overwhelmingly prefers functional components with Hooks.

| Feature | Class Components | Functional Components (Hooks) |
|---|---|---|
| **State** | \`this.state\`, \`this.setState()\` | \`useState\` |
| **Lifecycle** | Dedicated methods (\`componentDidMount\`, etc.) | \`useEffect\`, \`useLayoutEffect\` |
| **Logic Reuse** | Higher-Order Components (HOCs), Render Props | **Custom Hooks** (Superior pattern) |
| **\`this\`** | Requires careful binding or arrow functions | Lexical \`this\` (simpler context) |

`,
    tips: `"Interview Tips / Pitfalls"
* **Mental Model:** Functional components use closures to capture state and props for a specific render, making them easier to reason about (no confusing lifecycle stages).
* **Hooks Advantage:** Hooks allow stateful logic to be extracted and shared without the complexity of HOCs or render props.
`,
    codeString: `
// Functional Component (Modern Standard)
function WelcomeFunctional({ name }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    // Equivalent to componentDidMount/Update/WillUnmount
  }, [name]);
  return <h1>Hello, {name}</h1>;
}

// Class Component (Legacy)
class WelcomeClass extends React.Component {
  constructor(props) { super(props); this.state = { count: 0 }; }
  componentDidMount() { console.log('Mounted'); }
  componentWillUnmount() { console.log('Unmounting'); }
  render() { return <h1>Hello, {this.props.name}</h1>; }
}
`,
    output: "Conceptual React code.",
  },
  // Q27: Lifecycle methods (class components)
  {
    id: 27,
    title: "Class Component Lifecycle Methods",
    explanation: `
The Class Component lifecycle is divided into three main phases, now largely replaced by \`useEffect\` in functional components.

| Phase | Method | Functional Equivalent | Purpose |
|---|---|---|---|
| **Mounting** | \`constructor\` | \`useState\` initialization | Initial setup and state. |
| **Mounting** | \`render\` | Function body return | Renders JSX output. |
| **Mounting** | \`componentDidMount\` | \`useEffect(..., [])\` | Initial side effects (data fetching, subscriptions). |
| **Updating** | \`shouldComponentUpdate\` | \`React.memo\` | Controls if a re-render is necessary (performance). |
| **Updating** | \`componentDidUpdate\` | \`useEffect(..., [deps])\` | Side effects after state/props change. |
| **Unmounting** | \`componentWillUnmount\` | \`useEffect\` cleanup return | Cleanup (e.g., clear intervals, remove listeners). |
| **Error Handling** | \`componentDidCatch\` | Error Boundary (Class only) | Catches JavaScript errors in child tree. |

`,
    tips: `"Interview Tips / Pitfalls"
* Side effects must never be executed in the \`render\` method (it must be a pure function).
* Always perform initial data fetching and subscriptions in \`componentDidMount\` or \`useEffect\` with an empty dependency array.
`,
    codeString: `
// Functional Equivalent Demonstration
function MyTimer() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    // componentDidMount (runs once)
    const id = setInterval(() => setSeconds(s => s + 1), 1000);

    // componentWillUnmount (cleanup)
    return () => clearInterval(id);
  }, []); 

  // The function body acts as render()
  return <h2>Seconds: {seconds}</h2>;
}
`,
    output: "Conceptual React code.",
  },
  // Q28: Hooks used day-to-day
  {
    id: 28,
    title: "Commonly Used React Hooks",
    explanation: `
The most frequently used hooks for day-to-day development are:

* **\`useState\`:** Local component state management.
* **\`useEffect\`:** Managing all side effects and component lifecycle logic.
* **\`useContext\`:** Subscribing to React Context for global state (e.g., theme, user data).
* **\`useRef\`:** Accessing the DOM directly or persisting mutable values across renders without causing a re-render.
* **\`useMemo / useCallback\`:** Performance optimization (memoization).
* **\`useReducer\`:** Alternative to \`useState\` for complex state logic or when the next state depends on the previous state in intricate ways.

`,
    tips: `"Interview Tips / Pitfalls"
* **useReducer vs useState:** Use \`useReducer\` when state transitions are complex, involve multiple sub-values, or when the next state depends on the previous state. It's also preferable when passing dispatch functions down to avoid unnecessary re-renders in children.
`,
    codeString: `
import { useState, useReducer, useRef } from 'react';

function HookDemo() {
  // useState
  const [count, setCount] = useState(0); 

  // useRef (persists 'current' value without re-render)
  const inputRef = useRef(null); 
  
  // useReducer (for complex state: equivalent of Redux-lite)
  const [state, dispatch] = useReducer((s, a) => a.type === 'inc' ? s + 1 : s, 0);

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => setCount(count + 1)}>State Count: {count}</button>
      <button onClick={() => dispatch({ type: 'inc' })}>Reducer State: {state}</button>
    </div>
  )
}
`,
    output: "Conceptual React code.",
  },
  // Q29: Syntax for useEffect
  {
    id: 29,
    title: "Syntax and Behavior of useEffect",
    explanation: `
The syntax for \`useEffect\` is: \`useEffect(effectFunction, dependencyArray)\`.

* **\`effectFunction\`:** Contains the side effect logic (runs after render).
* **Cleanup Function (returned from \`effectFunction\`):** This optional function runs right before the effect re-runs (if dependencies change) and runs on component **unmount**.
* **Dependency Array (\`[]\`):** Controls when the effect re-runs.

| Dependency Array | Behavior | Analogy |
|---|---|---|
| **Absent** | Runs after *every* render. | \`componentDidMount\` + \`componentDidUpdate\` (always) |
| **\`[]\` (Empty)** | Runs only **once** after the initial mount. | \`componentDidMount\` + \`componentWillUnmount\` (cleanup) |
| **\`[deps]\`** | Runs on mount and whenever one of the listed dependencies changes. | \`componentDidMount\` + \`componentDidUpdate\` (selectively) |

`,
    tips: `"Interview Tips / Pitfalls"
* **Rule of Thumb:** Always include all external values (props, state, or functions) used inside the effect function in the dependency array. If you omit one, you create a stale closure.
`,
    codeString: `
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    console.log('Effect mounted');
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    
    // The cleanup function
    return () => {
      console.log('Cleanup: interval cleared');
      clearInterval(id);
    };
  }, []); // Empty array: runs only on mount/unmount

  return <h2>Seconds: {seconds}</h2>;
}
`,
    output:
      "Run in a React environment. Logs 'Cleanup: interval cleared' on unmount.",
  },
  // Q30: Dependency array behavior
  {
    id: 30,
    title: "Dependency Array Best Practices and Stale Closures",
    explanation: `
The dependency array is key to performance and correctness in React Hooks. Its purpose is to tell React whether the state or props accessed inside the hook are **stale** (outdated) or **current**.

* **Stale Closure:** Occurs when a hook depends on a value that changes, but that value is not included in the dependency array. The effect will continue to use the *old* value captured from the initial render.
* **Functions as Dependencies:** Functions created inside the component body are recreated on every render, which often triggers unnecessary effect re-runs.

`,
    tips: `"Interview Tips / Pitfalls"
* **The Solution for Functions:** Use **\`useCallback\`** to memoize function references and pass the memoized function into the dependency array. This prevents the effect from re-running unless the function's internal dependencies change.
* **The Solution for Values:** Use **\`useMemo\`** to stabilize object or array references if they are being passed to a hook or down to a child component.
`,
    codeString: `
import React, { useState, useEffect, useCallback } from 'react';

function StaleClosureDemo() {
  const [count, setCount] = useState(0);

  // This function is recreated on every render!
  const logCount = () => {
    console.log('Logging count:', count);
  };
  
  // This effect would re-run on every render because 'logCount' is a new function reference
  // useEffect(() => { console.log('Log count changes'); }, [logCount]); 

  // Correct approach: Use useCallback to stabilize the reference
  const stableLogCount = useCallback(() => {
    console.log('Stable Log:', count);
  }, [count]); // This function only changes when 'count' changes

  useEffect(() => {
    console.log('Effect ran because stableLogCount changed');
  }, [stableLogCount]); // Effect only runs when count changes (correct behavior)

  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;
}
`,
    output: "Run in a React environment. Logs only when 'count' updates.",
  },
  // Q31: React Fragments
  {
    id: 31,
    title: "React Fragments",
    explanation: `
React components must return a single root element. **Fragments** solve the common problem of needing to return multiple sibling elements without introducing an extra, unnecessary DOM node (like an extra \`<div>\`) to wrap them.

* **Short Syntax:** \`<>...</>\` (cannot accept keys or props).
* **Full Syntax:** \`<React.Fragment>...</React.Fragment>\` (allows for the \`key\` attribute).

`,
    tips: `"Interview Tips / Pitfalls"
* **Use Case for Full Syntax:** The primary reason to use the full \`<React.Fragment>\` syntax is when rendering a list of elements where you need to apply a **key** to the fragment itself.
`,
    codeString: `
function TableRows({ data }) {
  // If we wrapped these in a <div>, the HTML table structure would break.
  return (
    // <> is shorthand for <React.Fragment>
    <>
      {data.map(item => (
        // Key is required when mapping, and applied here to the Fragment
        <React.Fragment key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
        </React.Fragment>
      ))}
    </>
  );
}
`,
    output: "Renders table data without extra wrapper elements.",
  },
  // Q32: JavaScript variable scope
  {
    id: 32,
    title: "JavaScript Variable Scope (Global, Function, Block)",
    explanation: `
Scope defines the visibility and accessibility of variables.

| Scope Type | Variables | Behavior |
|---|---|---|
| **Global** | Declared outside functions/blocks | Accessible everywhere. |
| **Function** | \`var\` declared inside function | Accessible throughout the entire function body (including nested blocks). |
| **Block** | \`let\` / \`const\` declared inside \`{}\` | Accessible only within the surrounding block (\`if\`, \`for\`, regular blocks). |

**Lexical Scoping:** Variables are resolved based on where they are defined (written in the source code), not where they are called. This is the foundation of closures.

`,
    tips: `"Interview Tips / Pitfalls"
* **\`var\` Leakage:** Demonstrate how a \`var\` declared inside an \`if\` block is still available outside the block but inside the function scope. This behavior is why \`let\` and \`const\` (block-scoped) are preferred in modern JS.
`,
    codeString: `
function scopeDemo() {
  var functionScoped = 'A';
  let blockScoped = 'B';
  
  if (true) {
    var blockVar = 'C'; // Function-scoped!
    let blockLet = 'D'; // Block-scoped!
    console.log('Inside Block:', blockLet); 
  }

  console.log('Outside Block, Var:', blockVar); // C (Accessible)
  
  try {
    console.log('Outside Block, Let:', blockLet);
  } catch(e) {
    console.log('Outside Block, Let:', e.name); // ReferenceError (Inaccessible)
  }
}
scopeDemo();
`,
    output: `Inside Block: D
Outside Block, Var: C
Outside Block, Let: ReferenceError`,
  },
  // Q33: ES6 Features (overview)
  {
    id: 33,
    title: "Key ES6+ (ECMAScript 2015) Features",
    explanation: `
ES6 introduced major changes that fundamentally improved JavaScript syntax, readability, and capabilities:

* **Variable Declarations:** \`let\` and \`const\` (block-scoped).
* **Functions:** Arrow functions (lexical \`this\`, cleaner syntax).
* **Collections:** \`Map\` and \`Set\` data structures.
* **Async:** Promises (standardized async behavior).
* **Syntax:** Template literals, Default parameters, Destructuring (array/object).
* **Iterables:** Rest/Spread operator, \`for...of\` loops.
* **OOP:** Classes (\`class\`, \`extends\`, \`super\`).
* **Modularity:** Modules (\`import\` and \`export\`).

`,
    tips: `"Interview Tips / Pitfalls"
* Mention that despite the new syntax, JS Classes are still built on the existing **prototypal inheritance** mechanism.
* Discuss the need for **transpilation** (using tools like Babel) to convert modern ES6+ code into older ES5 for better browser compatibility.
`,
    codeString: `
// 1. Arrow functions + Template literals
const welcome = (name, age) => \`Hello \${name}, you are \${age} years old.\`;
console.log(welcome('Lexi', 25));

// 2. Destructuring + Default params
const user = { name: 'Kai', role: 'Dev' };
const { name, title = 'N/A' } = user;
console.log(title); // N/A
`,
    output: `Hello Lexi, you are 25 years old.
N/A`,
  },
  // Q34: JavaScript class Car example (OOP)
  {
    id: 34,
    title: "JavaScript Class Example (OOP)",
    explanation: `
ES6 \`class\` syntax provides a cleaner way to implement object-oriented patterns, specifically **prototypal inheritance**.

* **\`constructor\`:** Initializes the instance properties when a new object is created via \`new ClassName()\`.
* **Methods:** Methods defined inside the class body are placed on the object's prototype, saving memory compared to defining a function on every instance.

`,
    tips: `"Interview Tips / Pitfalls"
* Mention that modern JavaScript supports **private fields** using the \`#\` symbol (e.g., \`#fuel\`), which genuinely enforces encapsulation at the language level.
* Discuss the importance of the \`super()\` call in the constructor of a derived class (\`extends\`).
`,
    codeString: `
class Car {
  #maxFuel = 50; // Private field (modern JS)
  
  constructor(modelName, mileage) {
    this.modelName = modelName;
    this.mileage = mileage; // km per liter
    this.fuel = 0;
  }
  
  // Method placed on the prototype
  calculateRange() { 
    return this.fuel * this.mileage; 
  }
  
  refuel(liters) { 
    const actualLiters = Math.min(liters, this.#maxFuel - this.fuel);
    this.fuel += actualLiters; 
    return \`Refueled \${actualLiters}L.\`;
  }
}

const myCar = new Car("Sedan X", 15);
console.log(myCar.refuel(20));
console.log(\`Range: \${myCar.calculateRange()} km\`);
`,
    output: `Refueled 20L.
Range: 300 km`,
  },
  // Q35: Functional vs OOP programming
  {
    id: 35,
    title: "Functional vs Object-Oriented Programming (FP vs OOP)",
    explanation: `
JavaScript supports both paradigms.

| Paradigm | Focus | Key Principles | Trade-offs |
|---|---|---|---|
| **OOP** | Objects and mutable state. | Encapsulation, Inheritance, Polymorphism. | Maps well to domain models; state changes can be complex to track. |
| **FP** | Pure functions and data flow. | Pure functions, Immutability, Function Composition. | Easier to test, predict, and parallelize; less natural for stateful entities. |

`,
    tips: `"Interview Tips / Pitfalls"
* **Pure Functions (FP):** A function that always returns the same output for the same input and causes **no side effects** (does not modify outside state). This is critical in React (e.g., in reducers).
* **Immutability:** A cornerstone of FP (and React state management). Instead of modifying an object/array, you create a new one with the necessary changes.
`,
    codeString: `
// OOP Example (Mutable State)
class Account {
  constructor(v = 0) { this.balance = v; }
  deposit(n) { this.balance += n; } // MUTATION
}
const oopAcc = new Account(10);
oopAcc.deposit(5); // Balance is now 15

// FP Example (Pure Function, Immutability)
const deposit = (balance, amount) => balance + amount; // PURE
let fpBalance = 10;
fpBalance = deposit(fpBalance, 5); // New variable assigned
console.log(\`OOP: \${oopAcc.balance}, FP: \${fpBalance}\`);
`,
    output: `OOP: 15, FP: 15`,
  },
  // Q36: Parent-child re-render behavior & optimization
  {
    id: 36,
    title: "Parent-Child Re-render Behavior and Optimization",
    explanation: `
In React, when a parent component re-renders (due to state or prop changes), by default, **all of its children re-render as well**, even if the child's props haven't conceptually changed.

## Avoiding Unnecessary Re-renders
To prevent this, use memoization techniques:

1.  **\`React.memo\` (Component):** A Higher-Order Component (HOC) that wraps a functional component. It performs a **shallow comparison** of the component's props between renders. If the props are identical, React skips the re-render.
2.  **Stable Props (\`useMemo\` / \`useCallback\`):** When passing complex props (objects, arrays, or functions) to a \`React.memo\` child, you must stabilize the reference using \`useMemo\` or \`useCallback\`. If you pass an inline object \`{{ count: 1 }}\`, the reference changes every render, defeating memoization.

`,
    tips: `"Interview Tips / Pitfalls"
* **Shallow Comparison:** Explain that \`React.memo\` only compares at the top level. If a prop is an object and an inner property changes, React.memo won't catch it unless you provide a custom comparison function.
`,
    codeString: `
// 1. Memoized Child Component
const Child = React.memo(function Child({ data, onClick }) {
  console.log('Child rendered (only on prop change)');
  return <div>Data: {data.value}</div>;
});

function ParentComponent() {
  const [parentCount, setParentCount] = React.useState(0);
  const [dataValue, setDataValue] = React.useState(1);
  
  // 2. Stable Props (MUST use useMemo/useCallback to stabilize object/function references)
  const stableData = React.useMemo(() => ({ value: dataValue }), [dataValue]);
  const stableCallback = React.useCallback(() => console.log('Click'), []);

  return (
    <div>
      <button onClick={() => setParentCount(c => c + 1)}>
        Re-render Parent ({parentCount})
      </button>
      <button onClick={() => setDataValue(d => d + 1)}>Change Data</button>
      {/* Child only re-renders when dataValue changes */}
      <Child data={stableData} onClick={stableCallback} />
    </div>
  );
}
`,
    output:
      "Run in a React environment. Logs 'Child rendered...' only when Data changes, not when ParentCount changes.",
  },
  // Q37: What is Redux? When to use?
  {
    id: 37,
    title: "Redux (and Redux Toolkit)",
    explanation: `
Redux is a predictable **state container** for JavaScript applications, following a strict unidirectional data flow:

1.  **View** dispatches an **Action**.
2.  The Action reaches the **Reducer** (pure function).
3.  The Reducer computes a new state based on the Action.
4.  The central **Store** holds the single source of truth (state).
5.  The View subscribes to the Store for updates.

## When to use Redux
Use Redux when you have:
* Global state shared by many components across different parts of the application.
* Complex state transitions that require predictable logic.
* Need for logging, time-travel debugging, and advanced middleware (Thunks/Sagas) for side effects.

`,
    tips: `"Interview Tips / Pitfalls"
* **Redux Toolkit (RTK):** Mention that RTK is the modern, recommended way to use Redux, drastically reducing boilerplate using \`createSlice\` and simplifying configuration with \`configureStore\`.
* **Immutability:** Stress that reducers *must* be pure and immutable (never modify the existing state object/array, always return a new one).
`,
    codeString: `
// Conceptual Redux Toolkit Code (Simplified)
/*
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1, // RTK uses Immer, allowing 'safe' mutation syntax
    add: (state, action) => state + action.payload,
  }
});

const store = configureStore({ 
  reducer: counterSlice.reducer // Add other slice reducers here
});

// Example dispatch
store.dispatch(counterSlice.actions.increment());
*/
`,
    output: "Conceptual Redux Toolkit code.",
  },
  // Q38: Context API vs Redux
  {
    id: 38,
    title: "Context API vs Redux",
    explanation: `
| Feature | Context API | Redux |
|---|---|---|
| **Best For** | Theme, localization, user settings (infrequently updated). | Complex, frequently updated global state, large-scale app data. |
| **Complexity** | Low (simple Provider/Consumer model). | High (requires actions, reducers, store configuration). |
| **Tooling** | Minimal. | Excellent (DevTools, middleware for side effects). |
| **Performance** | Can cause excessive re-renders (all consumers re-render when context value changes). | Optimized (only connected components re-render). |

`,
    tips: `"Interview Tips / Pitfalls"
* **Context Re-rendering:** Explain that Context's biggest performance challenge is that if the value passed to the \`Provider\` changes, **all consumers re-render, even if they only used a small part of the value**.
* **Solution:** Use \`useMemo\` to stabilize the Context value, or split state into multiple, smaller Contexts to isolate updates.
* **Combination:** It's common to use Context for simple, UI-related global state (theme, language) and Redux for complex application data.
`,
    codeString: `
// Context Example
const ThemeContext = React.createContext('light');

function ThemedComponent() {
  const theme = React.useContext(ThemeContext);
  return <p style={{ color: theme === 'dark' ? 'white' : 'black' }}>Styled text</p>
}
`,
    output: "Conceptual React Context code.",
  },
  // Q39: Accessibility (a11y) basics
  {
    id: 39,
    title: "Accessibility (A11y) Basics",
    explanation: `
Accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with the web.

## Key Principles
1.  **Semantic HTML:** Use native elements (\`<button>\`, \`<input>\`, \`<a href>\`) correctly. Avoid using \`<div>\` for everything.
2.  **Keyboard Navigation:** Ensure all interactive elements are focusable via \`Tab\` and operable via \`Enter\` or \`Space\`.
3.  **ARIA Attributes:** Use **Accessible Rich Internet Applications (ARIA)** roles, states, and properties (\`role\`, \`aria-label\`, \`aria-expanded\`) to provide missing semantics to custom widgets.
4.  **Color Contrast:** Ensure text contrast meets WCAG guidelines (minimum 4.5:1).
5.  **Labels:** Always associate form controls with proper \`<label>\` tags.

`,
    tips: `"Interview Tips / Pitfalls"
* **Screen Readers:** Test your application with screen readers (VoiceOver, NVDA, or JAWS) to confirm the user experience.
* **Tools:** Mention using automated auditing tools like **Lighthouse** or **axe DevTools** to catch common violations.
* **ARIA vs Semantic HTML:** Always prefer semantic HTML over ARIA attributes. ARIA should enhance, not replace, native HTML semantics.
`,
    codeString: `
function AccessibleButton() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      {/* Correct use of semantic button */}
      <button 
        onClick={() => setExpanded(!expanded)} 
        aria-expanded={expanded} // ARIA state for screen readers
        aria-controls="content-id" // Links button to the content below
      >
        Toggle Content
      </button>
      
      {/* Correct use of aria-hidden for visual-only elements */}
      <div id="content-id" aria-hidden={!expanded}>
        Content that is {expanded ? 'visible' : 'hidden'}
      </div>
    </div>
  );
}
`,
    output: "Conceptual React code demonstrating ARIA attributes.",
  },
  // Q40: Can you use async inside useEffect?
  {
    id: 40,
    title: "Using async/await inside useEffect",
    explanation: `
You **cannot** make the \`useEffect\` callback function itself \`async\`. If you did, it would implicitly return a \`Promise\`, and React expects the return value to be a synchronous cleanup function.

**The Solution:** Define and immediately call an inner \`async\` function *inside* the \`useEffect\` callback.

## Cleanup for Async Calls
When performing asynchronous operations (like \`fetch\`), you must handle cleanup to avoid:
1.  **Memory Leaks:** If the component unmounts while the request is in flight.
2.  **Race Conditions:** If dependencies change and a slower, older request resolves after a faster, newer one, potentially setting stale state.

The example below uses a **flag variable** (\`mounted\`) in the cleanup function to prevent state updates on an unmounted component.

`,
    tips: `"Interview Tips / Pitfalls"
* **AbortController:** For real-world fetch calls, demonstrate using \`AbortController\` for cleaner request cancellation instead of the local \`mounted\` flag.
`,
    codeString: `
import React, { useState, useEffect } from 'react';

function AsyncEffectDemo({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true; // Flag for cleanup
    
    // Define inner async function
    async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        
        // Only update state if component is still mounted
        if (mounted) { 
          setData(json);
        }
      } catch (e) {
        if (mounted) {
          console.error(e);
        }
      }
    }
    
    fetchData();

    // Cleanup function: runs on unmount or before effect re-runs
    return () => { 
      mounted = false; 
    };
  }, [url]); // Re-run when URL changes

  return <div>{data ? 'Data Loaded' : 'Loading...'}</div>
}
`,
    output: "Conceptual React code demonstrating safe async operations.",
  },
  // Q41: Memoization explanation
  {
    id: 41,
    title: "Memoization (Concept and Implementation)",
    explanation: `
**Memoization** is an optimization technique used primarily to speed up computer programs by **caching** the results of expensive function calls and returning the cached result when the same inputs occur again.

* **In JavaScript:** You implement memoization by storing input arguments and their corresponding output values (usually in a \`Map\` or closure).
* **In React:** \`useMemo\` and \`React.memo\` are React's built-in memoization mechanisms.

`,
    tips: `"Interview Tips / Pitfalls"
* **Cache Key:** The complexity lies in creating a stable and correct key for complex arguments (objects, arrays). Using \`JSON.stringify(args)\` is a simple but limited approach (cannot serialize functions, order-dependent).
* **Memory Leaks:** A custom memoization function that continuously stores unique inputs can lead to memory growth if the cache is never cleared.
`,
    codeString: `
// Custom general-purpose memoization utility
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    // Simple key creation (caution: doesn't handle objects well)
    const key = JSON.stringify(args); 

    if (cache.has(key)) {
      console.log('Cache hit for key:', key);
      return cache.get(key);
    }
    
    console.log('Cache miss, calculating...');
    const val = fn(...args);
    cache.set(key, val);
    return val;
  };
}

const addHeavy = (a, b) => { for(let i=0; i<1e6; i++); return a + b; };
const memoizedAdd = memoize(addHeavy);

memoizedAdd(1, 2); // Calculation, Cache miss
memoizedAdd(1, 2); // Cache hit
`,
    output: `Cache miss, calculating...
Cache hit for key: [1,2]`,
  },
  // Q42: Show/Hide div button example (React)
  {
    id: 42,
    title: "Show/Hide Div Button Example (React)",
    explanation: `
This is the simplest way to toggle visibility in React using local state and conditional rendering (\`&& operator\`).

* **Conditional Rendering:** The expression \`{show && <div>Content</div>}\` means the content \`div\` is only included in the output if the \`show\` state is \`true\`. If \`show\` is \`false\`, the entire block is skipped, equivalent to \`display: none\` (element removed from DOM).
* **State Update:** Using the updater function \`setShow(s => !s)\` is best practice, as it ensures you are always toggling the state based on its most recent value, preventing race conditions.

`,
    tips: `"Interview Tips / Pitfalls"
* **Accessibility:** For better accessibility, include an \`aria-expanded\` attribute on the button to inform screen readers of the state.
* **Alternative Hiding:** If you want the content to remain in the DOM (e.g., for animations), you would use a CSS class that sets \`visibility: hidden\` or \`height: 0\`, instead of conditional rendering.
`,
    codeString: `
import React from 'react';

function ToggleContent() {
  const [show, setShow] = React.useState(true);
  
  const handleToggle = () => {
    // Safely update state using the previous value
    setShow(s => !s);
  };

  return (
    <div className="p-4 border rounded shadow">
      <button 
        onClick={handleToggle} 
        className="bg-blue-500 text-white p-2 rounded"
        aria-expanded={show} // A11y
      >
        {show ? 'Hide Content' : 'Show Content'}
      </button>
      
      {/* Conditional Rendering: If show is true, render the div */}
      {show && (
        <div className="mt-4 p-4 bg-gray-100 border rounded" id="toggle-content">
          <p>This content is currently visible and in the DOM.</p>
        </div>
      )}
    </div>
  );
}
// export default ToggleContent;
`,
    output: "Run in a React environment. Clicking toggles visibility.",
  },
  // Q43: Type of useState (TypeScript example)
  {
    id: 43,
    title: "Typing useState in TypeScript",
    explanation: `
TypeScript can often infer the type of state from the initial value, but it is necessary to explicitly define the type using **Generics** when the state can hold multiple types (e.g., \`null\` or a specific object).

* **Inferred Type:** If the initial state is \`0\`, TypeScript infers \`number\`.
* **Explicit Type (\`<Type>\`):** Use generics to explicitly define the type, often required when setting initial state to \`null\` or \`undefined\`, which could otherwise be inferred as \`any\`.

`,
    tips: `"Interview Tips / Pitfalls"
* **Handling Null/Undefined:** Always use a **Union Type** (e.g., \`User | null\`) when the state might be initially empty (null) but later holds a complex object.
* **Typing Reducers:** For complex state, demonstrate typing the return value of \`useReducer\` to ensure correctness across actions.
`,
    codeString: `
// TypeScript Code (Conceptual)

// interface User {
//   id: number;
//   name: string;
// }

// 1. Inferred Type (type is 'number')
const [count, setCount] = useState(0); 
// console.log(typeof count); // number

// 2. Explicit Type (type is 'number')
const [n, setN] = useState<number>(0); 

// 3. Union Type (type is 'User | null') - necessary when initial value is null
const [user, setUser] = useState<User | null>(null);

// 4. Array Type (type is 'string[]')
const [list, setList] = useState<string[]>([]);
`,
    output: "Conceptual TypeScript code.",
  },
  // Q44: Callback vs Promise APIs
  {
    id: 44,
    title: "Callback vs Promise APIs — differences & migration",
    explanation: `
| Feature | Callback APIs | Promise APIs |
|---|---|---|
| **Success/Error** | Separate arguments or separate functions passed. | Single object handles both (\`.then\` / \`.catch\`). |
| **Composability** | Poor, leads to **Callback Hell** (Pyramid of Doom). | Excellent (\`.then\` chaining, \`Promise.all\`). |
| **Error Handling** | Must be checked manually in every callback. | Standardized with \`.catch\` or \`try...catch\` (with \`async/await\`). |

**Migration (Promisify):** The process of wrapping a callback-based function to return a Promise, allowing it to be used with modern \`.then\` syntax or \`async/await\`.

`,
    tips: `"Interview Tips / Pitfalls"
* **Callback Hell:** Use the \`fs.readFile\` Node.js example to visually show the deeply nested nature of callback hell.
* **Promisify Utility:** Show the common pattern of wrapping a callback function inside a new Promise constructor, resolving on success and rejecting on error.
`,
    codeString: `
// 1. Callback-style API (Example: Node.js fs module)
/*
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('Callback error:', err);
    return;
  }
  fs.writeFile('out.txt', data, (err) => {
    // Nested callbacks lead to 'Pyramid of Doom'
  });
});
*/

// 2. Promisifying a callback function
function promisify(callbackFn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      // Pass the standard Node (err, result) callback function
      callbackFn(...args, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}
`,
    output: "Conceptual code showing callback vs promise migration.",
  },
  // Q45: Fruits API & fetch example
  {
    id: 45,
    title: "Modern Data Fetching with `fetch` and `async/await`",
    explanation: `
The native \`fetch\` API returns a Promise that resolves when the request completes, but importantly, it only **rejects on network errors** (e.g., DNS error, offline). It **does not reject on HTTP error statuses** (like 404, 500).

## Critical Error Handling
You must manually check the \`response.ok\` property (which is \`true\` for status 200–299) to determine if the HTTP response was successful.

`,
    tips: `"Interview Tips / Pitfalls"
* Always include a check for \`!res.ok\` and manually throw an \`Error\` to catch HTTP errors in the \`try...catch\` block.
* Mention using \`AbortController\` for cleanup to handle request cancellation.
`,
    codeString: `
// Function to handle the actual fetching
async function getFruits() {
  const URL = '/api/fruits'; // Mock endpoint
  try {
    const res = await fetch(URL);
    
    // IMPORTANT: fetch does not throw on 404/500, so we check manually
    if (!res.ok) { 
      throw new Error(\`Network response was not ok, status: \${res.status}\`);
    }
    
    // Convert to JSON
    const fruits = await res.json();
    console.log('Fetched:', fruits);
    return fruits;
    
  } catch (err) {
    console.error('Fetch failed:', err.message);
    // Rethrow or handle error state
    throw err;
  }
}
`,
    output: "Conceptual function for robust data fetching.",
  },
  // Q46: Axios example & differences vs fetch
  {
    id: 46,
    title: "Axios vs Fetch",
    explanation: `
**Axios** is a third-party library that wraps the older \`XMLHttpRequest\` (or \`fetch\` in Node) but provides a much more developer-friendly API.

| Feature | Fetch (Native) | Axios (Library) |
|---|---|---|
| **Error Handling** | Manual check for \`response.ok\` required. | **Rejects automatically** on 4xx/5xx status. |
| **Data Handling** | Requires manual \`response.json()\` call. | Automatic JSON data parsing. |
| **API** | Promise-based. | Promise-based. |
| **Interceptors** | No native support. | **Supports interceptors** (global pre/post hooks). |

`,
    tips: `"Interview Tips / Pitfalls"
* **Interceptors:** Explain the primary benefit of Axios is interceptors, which allow you to automatically inject an authorization token into every request or handle global error notifications in one place.
* **Cancellation:** Axios traditionally used cancellation tokens; now, both libraries support \`AbortController\`.
`,
    codeString: `
// Requires Axios library to run
/*
import axios from 'axios';

axios.get('/api/fruits')
  .then(res => {
    // No need for res.json(), data is directly in res.data
    console.log('Axios Data:', res.data); 
  })
  .catch(err => {
    // Axios catches 4xx/5xx errors here automatically
    console.error('Axios Error:', err.response || err.message); 
  });
*/
`,
    output: "Conceptual Axios code.",
  },
  // Q47: Accessibility for disabled users
  {
    id: 47,
    title: "Designing for Disabled Users (A11y)",
    explanation: `
Designing for disabled users involves adhering to the **Web Content Accessibility Guidelines (WCAG)** and ensuring four core principles are met: **Perceivable, Operable, Understandable, and Robust (POUR)**.

## Key Practices
1.  **Screen Reader Support:** Use correct semantic HTML and ARIA attributes (e.g., \`aria-live\` for dynamic updates).
2.  **Keyboard Only:** Ensure the entire site is usable without a mouse (correct tab order, proper focus management).
3.  **Visual:** Maintain high color contrast (4.5:1 ratio) and allow text resizing without breaking layout.
4.  **Alternatives:** Provide text alternatives for non-text content (e.g., \`alt\` text for images).

`,
    tips: `"Interview Tips / Pitfalls"
* Explain that the best way to design for this is to **test it**. Conduct a **keyboard-only walkthrough** of your application and use a screen reader (like macOS VoiceOver) to experience the site as a non-sighted user would.
`,
    codeString: `
// Use of role and aria-live for dynamic updates
/*
<div aria-live="polite" role="status">
  {statusMessage} // Screen reader announces changes to this text
</div>
*/
`,
    output: "Conceptual code for accessibility.",
  },
  // Q48: Keyboard arrows default behaviour & management
  {
    id: 48,
    title: "Keyboard Arrow Key Behavior and Management",
    explanation: `
By default, standard HTML elements only use **Tab** and **Shift+Tab** for navigation. Arrow keys primarily control scrolling and native controls (like changing volume on a slider or selecting options in a \`<select>\`).

## Custom Widget Management
When creating custom components (like menus, carousels, or tree views), you must implement arrow key management manually:
1.  Use the \`keydown\` event listener.
2.  Check \`e.key\` for \`'ArrowUp'\`, \`'ArrowDown'\`, etc.
3.  Use \`e.preventDefault()\` to stop the default browser behavior (like scrolling).
4.  Programmatically manage focus (e.g., using \`element.focus()\`) to move between items.

`,
    tips: `"Interview Tips / Pitfalls"
* Ensure that when you prevent default arrow behavior, you still provide a clear visual **focus state** for the user.
* Mention setting the appropriate ARIA role (\`role="menu"\`, \`role="tablist"\`) and using ARIA attributes like \`aria-activedescendant\` to inform screen readers of the currently focused element.
`,
    codeString: `
function handleKeyDown(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault(); // Stop page scrolling
    // Logic to move focus to the next item
    console.log('Moving focus down');
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    // Logic to move focus up
    console.log('Moving focus up');
  }
}

// document.addEventListener('keydown', handleKeyDown);
`,
    output: "Conceptual function for keyboard event handling.",
  },
  // Q49: tabindex usage
  {
    id: 49,
    title: "Tabindex Usage",
    explanation: `
The \`tabindex\` HTML attribute controls whether an element can be focused and whether it participates in sequential keyboard navigation (the Tab key).

| Value | Behavior | Use Case |
|---|---|---|
| **\`tabindex="0"\`** | Included in sequential tab order, placed in its default position. | Use for non-focusable elements (like a \`div\`) that require keyboard interaction. |
| **\`tabindex="-1"\`** | **Not** included in sequential tab order, but can be focused programmatically via JavaScript (\`element.focus()\`). | Use for dynamic focus management (modals, error messages, custom menus). |
| **\`tabindex="1+"\`** | Included in sequential tab order, with priority. **(Avoid this!)** | **Discouraged.** This creates confusing, non-standard tab orders. |

`,
    tips: `"Interview Tips / Pitfalls"
* **Avoid Positive Tabindex:** Never use positive \`tabindex\` values as it breaks the natural flow of the page, making it unusable for keyboard users and difficult to maintain.
* **Focus Management:** Use \`tabindex="-1"\` frequently to direct focus in response to user actions (e.g., closing a modal and returning focus to the trigger button).
`,
    codeString: `
/* HTML Examples */
/*
// Focusable via Tab key (position in order determined by document flow)
<div tabindex="0" onclick="alert('clicked')">Clickable Container</div> 

// Not focusable by Tab, but can be focused by JS: element.focus()
<div tabindex="-1">Programmatic Target</div> 

// DO NOT USE - breaks natural tab order
// <button tabindex="10">First Tab Target</button> 
*/
`,
    output: "Conceptual HTML/JS behavior for tabindex.",
  },
  // Q50: Color contrast best practices
  {
    id: 50,
    title: "Color Contrast Best Practices (WCAG)",
    explanation: `
Good color contrast is essential for users with low vision or color blindness. Best practices are defined by the **Web Content Accessibility Guidelines (WCAG)**.

* **AA Standard (Minimum):** The minimum required for acceptable accessibility.
    * **Normal Text:** Contrast ratio of **4.5:1** or greater.
    * **Large Text** (18pt / 14pt bold or larger): Contrast ratio of **3:1** or greater.
* **AAA Standard (Enhanced):** The highest level of accessibility.
    * **Normal Text:** Contrast ratio of **7:1** or greater.
    * **Large Text:** Contrast ratio of **4.5:1** or greater.

`,
    tips: `"Interview Tips / Pitfalls"
* **Tools:** Mention using browser DevTools (Accessibility panel) or dedicated contrast checkers to test color combinations using hex codes.
* **Non-Text Elements:** Contrast applies not only to text but also to crucial graphical elements and component states (e.g., focus indicators, required field icons).
* **Customization:** Mention using CSS media queries for \`prefers-color-scheme\` (dark mode) and \`prefers-contrast\` to offer users alternatives.
`,
    codeString: `
/* CSS Example: Ensuring contrast is met */
.accessible-text {
  /* White text on a dark blue background provides high contrast */
  color: #ffffff; 
  background-color: #1e3a8a; /* WCAG AA rating is met */
}

/* If the background were light gray (#f0f0f0), white text would fail. */
`,
    output: "Conceptual CSS demonstrating contrast considerations.",
  },
  // Q51: `this` keyword explained
  {
    id: 51,
    title: "The `this` Keyword in JavaScript",
    explanation: `
The value of \`this\` is determined dynamically by **how a function is called** (the call-site), not where the function is defined.

| Binding Rule | Call-Site Example | \`this\` Reference |
|---|---|---|
| **Default** | \`f()\` (standalone function call) | \`window\` (non-strict) or \`undefined\` (strict mode) |
| **Implicit** | \`obj.f()\` (called as a method) | \`obj\` (the object left of the dot) |
| **Explicit** | \`f.call(obj, ...)\` or \`f.apply(obj, ...)\` | Explicitly forced to \`obj\` |
| **New** | \`new f()\` (constructor call) | The newly created instance object |
| **Lexical (Arrow Functions)** | N/A | \`this\` is inherited from the outer scope (cannot be changed) |

`,
    tips: `"Interview Tips / Pitfalls"
* **Strict Mode:** Always point out the difference between strict mode (\`undefined\`) and non-strict mode (\`window\`) for the default binding.
* **Arrow Functions:** Emphasize that **arrow functions ignore all four standard rules** and rely solely on lexical binding, making them poor choices for traditional object methods but ideal for callbacks where you want to preserve the surrounding scope's \`this\`.
`,
    codeString: `
"use strict";

function getThis() { 
  return this; 
}

const obj = { name: 'Context A', getThis };

// 1. Default Binding (strict mode)
console.log('Default:', typeof getThis() === 'undefined' ? 'undefined' : 'window'); 

// 2. Implicit Binding
console.log('Implicit:', obj.getThis().name);

// 3. Explicit Binding
const boundThis = getThis.call({ name: 'Context B' });
console.log('Explicit:', boundThis.name);

// 4. Lexical Binding
const arrow = () => this; 
console.log('Arrow:', typeof arrow() === 'undefined' ? 'undefined' : 'window'); // Inherits outer scope ('window' or 'undefined')
`,
    output: `Default: undefined
Implicit: Context A
Explicit: Context B
Arrow: undefined`,
  },
  // Q52: Lexical Environment (JS internals)
  {
    id: 52,
    title: "Lexical Environment (JS Internals)",
    explanation: `
The **Lexical Environment** is a conceptual, internal object created by the JavaScript engine to manage variable scoping during code execution.

It consists of two main parts:
1.  **Environment Record:** Stores all identifier bindings (variables, functions, and arguments) within the scope (e.g., the function scope, or block scope).
2.  **Outer Environment Reference:** A pointer to the lexical environment of the outer scope.

**How it Relates to Closures:** When a function is created, it captures the *Outer Environment Reference* from where it was defined. This reference is what allows a closure to access variables from its parent scope, even after the parent function has completed execution.

`,
    tips: `"Interview Tips / Pitfalls"
* This concept is often used to explain *why* closures work and why hoisting behaves the way it does.
* Keep the explanation focused on scope resolution and closures, avoiding overly technical engine details unless prompted.
`,
    codeString: `
function outer() { // Outer Environment 
  let x = 10;
  
  function inner() { // Inner Environment has reference to Outer
    // Closure: inner function accesses x via its Outer Environment Reference
    console.log(x); 
  }
  return inner;
}

const closureFn = outer();
closureFn(); // 10, even though outer() is finished
`,
    output: `10`,
  },
  // Q53: let vs var vs const
  {
    id: 53,
    title: "let vs var vs const (Scope and Hoisting)",
    explanation: `
| Feature | var | let | const |
|---|---|---|---|
| **Scope** | Function-scoped | **Block-scoped** | **Block-scoped** |
| **Hoisting** | Hoisted to \`undefined\` | Hoisted to **TDZ** (ReferenceError) | Hoisted to **TDZ** (ReferenceError) |
| **Re-declaration** | Yes (in the same scope) | No | No |
| **Re-assignment** | Yes | Yes | No (The binding is immutable) |

`,
    tips: `"Interview Tips / Pitfalls"
* **Best Practice:** Prefer \`const\` by default. Use \`let\` only if you need to reassign the variable. Avoid \`var\` in modern code to prevent scoping confusion and accidental re-declarations.
* **\`const\` and Objects:** Explain that \`const\` only prevents the variable from being *rebound* to a new value; it **does not prevent mutation** of object properties or array elements.
`,
    codeString: `
const user = { name: 'Alice' };

// OK: Mutation is allowed
user.name = 'Bob'; 
console.log(user.name);

try {
  // ERROR: Rebinding is NOT allowed
  // user = { name: 'Charlie' }; 
} catch(e) {
  console.log('Rebinding error:', e.name);
}
`,
    output: `Bob
Rebinding error: TypeError`,
  },
  // Q54: Temporal Dead Zone (TDZ)
  {
    id: 54,
    title: "Temporal Dead Zone (TDZ)",
    explanation: `
The **Temporal Dead Zone (TDZ)** is the time span between the creation of a scope and the moment when \`let\` or \`const\` variables within that scope are initialized.

* During the TDZ, attempting to access the variable will result in a **\`ReferenceError\`**.
* This mechanism prevents the confusing behavior seen with \`var\` (which allows access and returns \`undefined\` before initialization). The TDZ enforces cleaner code by making it impossible to use variables before their declaration.

`,
    tips: `"Interview Tips / Pitfalls"
* The TDZ is temporal (based on time of execution), not spatial (based on location in code).
* The function that contains the \`let/const\` variable can be executed outside the TDZ, but the variable inside the function remains in the TDZ until the line of declaration is reached.
`,
    codeString: `
function testTDZ() {
  // Start of TDZ for 'b'

  try {
    console.log(b); // Throws ReferenceError because 'b' is in TDZ
  } catch(e) {
    console.log('Error:', e.name);
  }

  const b = 'Initialized'; // End of TDZ

  console.log('Success:', b);
}
testTDZ();
`,
    output: `Error: ReferenceError
Success: Initialized`,
  },
  // Q55: Make function-scoped var available globally
  {
    id: 55,
    title: "Exposing Function-Scoped Variables Globally",
    explanation: `
To expose a function-scoped variable (declared with \`var\`, \`let\`, or \`const\` inside a function) to the global scope, you must explicitly attach it to the global object.

* **In Browsers:** The global object is \`window\`.
* **In Node.js/Universal:** Use \`globalThis\` for a standard reference to the global object.

`,
    tips: `"Interview Tips / Pitfalls"
* **Bad Practice:** Emphasize that this is almost always considered bad practice because it pollutes the global namespace, leading to potential naming collisions and making code harder to maintain.
* **Alternatives:** Modern solutions use ES Modules (\`import/export\`) or a single global object namespace (e.g., \`window.MyApp = {...}\`) to prevent pollution.
`,
    codeString: `
(function() {
  const secret = 'My Secret Value';
  
  // Explicitly attach 'secret' to the global object (window)
  // Check if window exists (for browser compatibility)
  if (typeof window !== 'undefined') {
    window.globalSecret = secret;
  }
})();

// Access the variable globally
if (typeof globalSecret !== 'undefined') {
  console.log('Globally available:', globalSecret);
} else {
  console.log('Run this in a browser to see the output.');
}
`,
    output: `Run this in a browser to see the output. (If run in a console: Globally available: My Secret Value)`,
  },
  // Q56: memo vs useMemo
  {
    id: 56,
    title: "React: `React.memo` vs `useMemo`",
    explanation: `
| Feature | React.memo | useMemo |
|---|---|---|
| **What it Caches** | The rendered **output of a component** (avoids re-rendering the whole component). | A computed **value** (avoids re-calculating a value). |
| **Input** | A component function. | A function and a dependency array. |
| **Behavior** | HOC (Higher-Order Component). Performs shallow comparison of **props**. | Hook. Performs shallow comparison of **dependencies**. |

`,
    tips: `"Interview Tips / Pitfalls"
* **Use \`React.memo\`** to prevent a child component from re-rendering when its parent re-renders, provided the child's props haven't changed.
* **Use \`useMemo\`** to prevent expensive local calculations *inside* a component, or to stabilize an object/array reference being passed as a prop to a \`React.memo\` child.
`,
    codeString: `
// 1. React.memo (Component Memoization)
const Display = React.memo(({ value }) => {
  console.log('Display component rendering...');
  return <div>Value: {value}</div>;
});

// 2. useMemo (Value Memoization)
function Parent({ list }) {
  const [filter, setFilter] = React.useState('');
  
  // This value is only recalculated if 'list' or 'filter' changes
  const filteredList = React.useMemo(() => {
    // Heavy filtering logic here
    return list.filter(item => item.includes(filter));
  }, [list, filter]);

  return (
    <div>
      <input onChange={e => setFilter(e.target.value)} />
      <Display value={filteredList.length} />
    </div>
  );
}
`,
    output: "Conceptual React code demonstrating memoization.",
  },
  // Q57: componentWillUnmount equivalent in function components
  {
    id: 57,
    title: "componentWillUnmount Equivalent in Functional Components",
    explanation: `
The cleanup logic previously handled by \`componentWillUnmount\` in class components is now managed by the **return function** inside \`useEffect\`.

* **Mechanism:** React calls the cleanup function when the component unmounts from the DOM.
* **Additionally:** React also runs the cleanup function **before the effect re-runs** due to a dependency change, ensuring a clean slate.

## Use Case
This is essential for canceling subscriptions, clearing timers, removing event listeners, and aborting long-running asynchronous requests to prevent memory leaks and state updates on unmounted components.

`,
    tips: `"Interview Tips / Pitfalls"
* Show an example of clearing a \`setInterval\` using the cleanup return. This is the most common and clearest demonstration.
* The dependency array must be \`[]\` for the cleanup to run *only* on unmount, or include dependencies for cleanup logic that should run *before* each re-run of the effect.
`,
    codeString: `
import React, { useEffect } from 'react';

function Logger() {
  useEffect(() => {
    console.log('Component Mounted: Starting log interval.');
    const logId = setInterval(() => console.log('TICK...'), 2000);
    
    // Cleanup function (Equivalent to componentWillUnmount)
    return () => {
      console.log('Component Unmounting: Clearing log interval.');
      clearInterval(logId);
    };
  }, []); // Only runs on mount and cleanup on unmount

  return <div>Check console for logs.</div>;
}
`,
    output: "Conceptual React code demonstrating cleanup on unmount.",
  },
  // Q58: Expand/collapse nested folder algorithm (conceptual)
  {
    id: 58,
    title: "Expand/Collapse Nested Folder Algorithm (Conceptual)",
    explanation: `
The core of a collapsible tree view is managing the **state** of each node (whether it's open or closed) and using **recursion** to render the structure.

1.  **Data Structure:** The data is usually a nested array of objects, where each object has a \`name\`, an \`id\`, an \`isOpen\` boolean, and an optional \`children\` array.
2.  **State Management:** The \`isOpen\` state for all nodes is typically managed centrally at the top-level component, which passes down a \`toggle\` function.
3.  **Recursion:** The component calls itself (\`TreeNode\`) for every item in its \`children\` array.
4.  **Conditional Rendering:** The children are only rendered if \`node.isOpen\` is \`true\`.

`,
    tips: `"Interview Tips / Pitfalls"
* **Unique Keys:** Highlight the necessity of stable, unique \`key\` props for every node rendered in the loop.
* **Performance:** For very large trees, discuss using **Virtualization** (only rendering nodes currently visible in the viewport) to maintain performance.
`,
    codeString: `
// Mock Data Structure: Array of nested objects
const initialData = [
  { id: 1, name: "Root", isOpen: true, children: [
    { id: 2, name: "Folder A", isOpen: false, children: [
      { id: 3, name: "File 1" }
    ]},
    { id: 4, name: "Folder B", isOpen: true, children: [
      { id: 5, name: "File 2" }
    ]}
  ]}
];

function TreeNode({ node, onToggle }) {
  // Base case: If no children, render the name
  if (!node.children) {
    return <div className="ml-4">📄 {node.name}</div>;
  }

  return (
    <div className="p-1">
      <div 
        onClick={() => onToggle(node.id)} 
        className="cursor-pointer font-bold"
      >
        {node.isOpen ? '[-] ' : '[+] '} 📁 {node.name}
      </div>
      
      {/* Recursive step: conditionally render children */}
      {node.isOpen && (
        <div className="ml-4 border-l pl-2">
          {node.children.map(c => (
            <TreeNode key={c.id} node={c} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
// Top-level component would manage the state of the whole tree
`,
    output: "Conceptual React code for a recursive tree view.",
  },
  // Q59: Debugger techniques
  {
    id: 59,
    title: "Effective Debugging Techniques (Browser DevTools)",
    explanation: `
Effective debugging is crucial for finding root causes quickly.

1.  **\`debugger;\` statement:** Acts like an explicit breakpoint in your code, forcing the debugger to pause execution.
2.  **Breakpoints (DevTools):** Click the line number in the Sources/Source tab to set a breakpoint.
3.  **Conditional Breakpoints:** Right-click a breakpoint and add a condition (e.g., \`i === 10\` in a loop) to only pause when the condition is met.
4.  **Watch Expressions:** Allows you to monitor the value of specific variables or expressions as execution progresses.
5.  **Source Maps:** Essential for debugging transpiled code (Webpack/Babel). They map the compiled code back to your original source files.

`,
    tips: `"Interview Tips / Pitfalls"
* Show familiarity with the debugger controls: **Step Over** (F10), **Step Into** (F11), and **Step Out** (Shift+F11).
* For asynchronous code, mention using the **Call Stack** trace to see which asynchronous operation led to the current callback execution.
`,
    codeString: `
function calculate(a, b) {
  let result = a + b;
  // Execution will pause here if DevTools is open
  debugger; 
  result *= 2;
  return result;
}
calculate(5, 3);
`,
    output: "Execution pauses at the debugger statement in DevTools.",
  },
  // Q60: Design an e-commerce application (high-level)
  {
    id: 60,
    title: "High-Level E-Commerce Application Design",
    explanation: `
Designing an e-commerce app requires covering user-facing features, core services, and infrastructure concerns.

## Key Services and Components
* **Client (Frontend):** Product Listing (PLP), Product Detail (PDP), Cart, Checkout, User Profile. Requires robust React/Vue/Angular structure.
* **Product Service:** Manages product catalog, pricing, and inventory.
* **Order Service:** Handles order creation, status updates, and shipping integration.
* **Payment Service:** Securely integrates with external payment processors (Stripe, PayPal).

## Database Schema (Simplified)
* **products:** (id, name, price, description, stock, categoryId)
* **users:** (id, name, email, address)
* **orders:** (id, userId, status, total, createdAt, shippingAddress)
* **order_items:** (orderId, productId, quantity, unitPrice)

## Key Technical Considerations
* **Performance:** Use **CDN** for static assets, lazy-loading for images, and server-side rendering (SSR) for initial page load speed (SEO).
* **Inventory/Payments:** Must be **ACID-compliant** (Atomic, Consistent, Isolated, Durable) or use robust queues and transactional integrity to ensure products aren't oversold and payments are processed only once (**Idempotency**).
* **Security:** Use HttpOnly cookies for session, secure payment pages, and implement rate limiting.
`,
    codeString: `
// Conceptual API Endpoints
/*
GET /api/products
GET /api/products/:id
POST /api/cart/items
POST /api/orders (triggers payment & inventory update)
*/
`,
    output: "High-level design and conceptual endpoints.",
  },
  // Q61: Regular expressions
  {
    id: 61,
    title: "Regular Expressions (Regex)",
    explanation: `
Regular expressions are patterns used to match character combinations in strings.

| Feature | Description | Example |
|---|---|---|
| **Literal** | Matches the exact sequence of characters. | \`/hello/\` |
| **Character Sets** | Matches any one of the characters inside the brackets. | \`/[aeiou]/\` |
| **Quantifiers** | Specifies how many times a character/group can occur. | \`a+\` (one or more), \`b*\` (zero or more), \`c?\` (zero or one) |
| **Anchors** | Defines the start (\`^\`) or end (\`$\`) of the string/line. | \`/^start/\` (must start with 'start') |
| **Groups** | Uses parentheses to group patterns. | \`/(ab)+\` (one or more 'ab' sequences) |

`,
    tips: `"Interview Tips / Pitfalls"
* **Usage:** Demonstrate \`.test()\` (returns boolean), \`.exec()\` (returns match array), and \`.replace()\` (string manipulation).
* **Catastrophic Backtracking:** Explain the danger of using naive, nested quantifiers (e.g., \`/(a+)+/ \`) on complex inputs, which can cause the engine to spend excessive time testing combinations, leading to denial-of-service (ReDoS).
`,
    codeString: `
const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log('Valid email:', emailRE.test('test@example.com'));

// Using replace with groups ($1 is the first group)
const date = "10-05-2023";
const formattedDate = date.replace(/(\\d{2})-(\\d{2})-(\\d{4})/, '$3/$2/$1');
console.log('Date:', formattedDate);
`,
    output: `Valid email: true
Date: 2023/05/10`,
  },
  // Q62: Sorting logic - comparator functions
  {
    id: 62,
    title: "Array Sorting with Comparator Functions",
    explanation: `
The native JavaScript \`Array.prototype.sort()\` method sorts array elements and **mutates the array in place**.

The optional **comparator function** \`sort((a, b) => ...)\` dictates the sort order based on its return value:

* **Positive (> 0):** \`a\` comes **after** \`b\` (e.g., \`a > b\`)
* **Negative (< 0):** \`a\` comes **before** \`b\` (e.g., \`a < b\`)
* **Zero (= 0):** Keep original relative order.

`,
    tips: `"Interview Tips / Pitfalls"
* **Numeric Sort:** For numeric sorting, simply return the difference: \`a - b\` for ascending, \`b - a\` for descending.
* **String Sort:** For complex string sorting (especially for international characters), use \`String.prototype.localeCompare(b)\`, which handles case and locales correctly.
* **Immutability:** To avoid mutating the original array, create a shallow copy first: \`[...arr].sort(...)\`.
`,
    codeString: `
const numbers = [5, 20, 10];
numbers.sort((a, b) => a - b); // Ascending numeric sort
console.log('Numeric:', numbers); 

const users = [{ name: 'Zulu' }, { name: 'Alpha' }];
users.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sort
console.log('Users:', users.map(u => u.name));
`,
    output: `Numeric: [5, 10, 20]
Users: [Alpha, Zulu]`,
  },
  // Q63: Bubble sort vs binary search
  {
    id: 63,
    title: "Bubble Sort vs Binary Search (Conceptual Differences)",
    explanation: `
These algorithms belong to entirely different categories and serve different purposes:

| Algorithm | Category | Average Time Complexity | Precondition | Purpose |
|---|---|---|---|---|
| **Bubble Sort** | **Sorting** | O(n²) | None | Reorders elements into a sorted sequence. |
| **Binary Search** | **Searching** | O(log n) | **Array MUST be sorted.** | Finds the position of a target value efficiently. |

## Bubble Sort (\`O(n²)\`)
Compares adjacent elements and swaps them if they are in the wrong order. Highly inefficient and not used in practice, but good for understanding basic sorting.

## Binary Search (\`O(log n)\`)
Repeatedly divides the search interval in half. This exponential reduction in search space makes it extremely fast for large datasets, provided the array is already sorted.

`,
    tips: `"Interview Tips / Pitfalls"
* The key point is that Binary Search's speed is entirely dependent on the data being sorted. If you have to sort the data first (O(n log n)), the total time complexity might not be worth it for a single search.
`,
    codeString: `
// Binary Search (conceptual)
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1; // Not found
}
const sortedArray = [2, 4, 6, 8, 10];
console.log('Binary Search Index:', binarySearch(sortedArray, 6));
`,
    output: `Binary Search Index: 2`,
  },
  // Q64: Replace spaces with %20
  {
    id: 64,
    title: "Replacing Spaces with %20 (URL Encoding)",
    explanation: `
The character sequence \`%20\` is the URL-encoded representation of a space. While manual replacement is possible, the safest and most standard way to prepare a string for use in a URL (especially a query string) is using the native \`encodeURIComponent()\` function.

* **\`encodeURIComponent()\`:** Encodes characters that have special meaning in a URL (including spaces, \`&\`, \`=\`, etc.).
* **Manual \`.split().join()\`:** Only replaces spaces, leaving other special characters potentially breaking the URL.

`,
    tips: `"Interview Tips / Pitfalls"
* Always prefer the native encoding functions for robustness, as they handle a wider range of edge cases and international characters correctly.
`,
    codeString: `
const originalString = 'hello world & good day';

// 1. Recommended (Handles all special URL characters)
const encodedURI = encodeURIComponent(originalString);
console.log('URI Encoded:', encodedURI);

// 2. Manual Replacement (Only replaces spaces)
const manualEncoded = originalString.split(' ').join('%20');
console.log('Manual Encoded:', manualEncoded);
`,
    output: `URI Encoded: hello%20world%20%26%20good%20day
Manual Encoded: hello%20world%20&%20good%20day`,
  },
  // Q65: Debugging & minifying (webpack, source maps)
  {
    id: 65,
    title: "Debugging Minified Code with Source Maps",
    explanation: `
**Minification** removes comments, whitespace, and shortens variable names to reduce file size. This makes debugging impossible without help.

**Source Maps** solve this by creating a hidden file (usually ending in \`.map\`) that maps the lines and characters in the minified code back to the corresponding lines and characters in the original source code.

## Workflow
1.  **Bundler (Webpack/Vite/Rollup):** Configured to generate source maps during the build process (often using the \`devtool: 'source-map'\` setting).
2.  **Browser:** When DevTools is open, it detects the source map reference in the minified file's header.
3.  **Debugging:** DevTools loads the source map and allows you to set breakpoints and view variables in your original, unminified source files.

`,
    tips: `"Interview Tips / Pitfalls"
* **Security:** Mention that source maps should ideally not be accessible to the public in production to protect source code. Alternatives include hosting them on a private server or using \`hidden-source-map\` combined with error reporting services.
`,
    codeString: `
/*
// Webpack Config (Conceptual)
module.exports = {
  mode: 'production',
  devtool: 'source-map', // Generates source maps for debugging
  // ... other config
};

// Minified output includes a reference to the source map file
// //# sourceMappingURL=bundle.js.map
*/
`,
    output: "Conceptual configuration for source maps.",
  },
  // Q66: HTML5, CSS positions, and styles summary
  {
    id: 66,
    title: "HTML5, CSS Positions, and Styling Methods",
    explanation: `
## HTML5 Features
HTML5 introduced **semantic tags** to describe the content's purpose: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, and \`<footer>\`. This is vital for SEO and Accessibility.

## CSS Position Property
* **\`static\` (Default):** No special positioning; flows normally. \`top/left/etc.\` properties are ignored.
* **\`relative\`:** Flows normally, but \`top/left/etc.\` offset the element *from its normal position*. Other elements are unaffected.
* **\`absolute\`:** Removed from the document flow and positioned relative to the nearest **positioned** (\`relative\`, \`absolute\`, \`fixed\`, or \`sticky\`) ancestor.
* **\`fixed\`:** Removed from the document flow and positioned relative to the **viewport** (stays visible during scroll).
* **\`sticky\`:** Positioned based on the user's scroll position. Behaves as \`relative\` until a scroll threshold is met, then acts as \`fixed\`.

## Styling Methods
1.  **External:** Separate \`.css\` file (best practice).
2.  **Internal:** \`<style>\` tag in the \`<head>\`.
3.  **Inline:** \`style="..."\` attribute on the element (highest specificity, often discouraged).
`,
    codeString: `
/* Example of Absolute positioning */
.parent {
  position: relative; /* Sets the context for absolute children */
  height: 200px;
}
.child {
  position: absolute; /* Positioned relative to .parent */
  top: 10px;
  right: 10px;
}

/* Example of Fixed positioning */
.header-fixed {
  position: fixed; /* Always visible at the top of the viewport */
  top: 0;
  width: 100%;
}
`,
    output: "Conceptual CSS for positioning.",
  },
  // Q67: Responsive design & best practices
  {
    id: 67,
    title: "Responsive Design Best Practices",
    explanation: `
Responsive design ensures the layout adapts gracefully to different screen sizes and devices.

1.  **Viewport Meta Tag (Mandatory):** \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`
2.  **Mobile-First Approach:** Design for the smallest screen first, then use \`min-width\` media queries to add enhancements for larger screens.
3.  **Fluid Layouts:** Use relative units (\`%\`, \`vh\`, \`vw\`) or modern layout methods (Flexbox, CSS Grid) instead of fixed pixel widths.
4.  **Media Queries:** Apply different styles based on screen size, orientation, and resolution.
5.  **Responsive Images:** Use the \`<picture>\` element or \`srcset\` attribute to serve appropriate image sizes based on device capabilities.

`,
    tips: `"Interview Tips / Pitfalls"
* **CSS Grid/Flexbox:** Emphasize that these are the primary tools for responsive layout and should replace older float-based methods.
* **Performance:** Mention optimizing the Critical Rendering Path by inlining "Above the Fold" CSS and deferring the loading of non-critical assets.
`,
    codeString: `
/* Mobile-First Example */
.container {
  width: 100%;
  padding: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column on mobile */
  gap: 16px;
}

/* Breakpoint for Tablets/Small Desktops */
@media (min-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* Two columns on larger screens */
  }
}

/* Breakpoint for Large Desktops */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr); /* Four columns on desktop */
  }
}
`,
    output: "Conceptual mobile-first responsive CSS.",
  },
  // Q68: Loading CSS optimally
  {
    id: 68,
    title: "Optimizing CSS Loading",
    explanation: `
Optimally loading CSS minimizes the Time To First Contentful Paint (TTFCP) by ensuring the browser can render content as quickly as possible.

1.  **Critical CSS:** Extract the CSS required for the "Above the Fold" content and **inline** it directly into the HTML \`<head>\`. This allows the browser to render the initial view without waiting for a separate CSS file download.
2.  **Asynchronous Loading:** Load the rest of the non-critical CSS files asynchronously using a combination of \`rel="preload"\` and a JS snippet or by setting \`rel="stylesheet"\` only after page load.
3.  **Media Attribute:** Use the \`media\` attribute on \`<link>\` tags to conditionally load styles (e.g., \`media="print"\`).

`,
    tips: `"Interview Tips / Pitfalls"
* **FOIT/FOUC:** Optimizing is necessary to avoid **Flash of Invisible Text (FOIT)** or **Flash of Unstyled Content (FOUC)**.
* **CSS Tree:** Explain that CSS is render-blocking. The browser must construct the CSSOM (CSS Object Model) before it can paint the page, so minimizing its size is paramount.
`,
    codeString: `
<!-- 1. Inline Critical CSS -->
<style>
  /* Essential styles for header, navigation, and primary content */
  .header { display: flex; }
</style>

<!-- 2. Asynchronously load the rest of the CSS -->
<link 
  rel="preload" 
  href="non-critical.css" 
  as="style" 
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet" href="non-critical.css">
</noscript>
`,
    output: "Conceptual HTML for optimal CSS delivery.",
  },
  // Q69: Layout problem (6 labels inside 300x300)
  {
    id: 69,
    title: "Layout: 6 Labels Inside a 300x300 Container (CSS Grid)",
    explanation: `
The best way to arrange and center a fixed number of items within a container is using **CSS Grid** or **Flexbox**. Grid is ideal for two-dimensional layouts like this.

## CSS Grid Solution
Define a container as a Grid and explicitly set the number of columns and rows required.

1.  **\`display: grid\`:** Activates the grid context.
2.  **\`grid-template-columns: repeat(3, 1fr)\`:** Creates three equal-width columns.
3.  **\`place-items: center\`:** Centers the labels both horizontally and vertically within their grid cells.

`,
    tips: `"Interview Tips / Pitfalls"
* **Flexbox Alternative:** Mention Flexbox would also work well, typically using \`flex-wrap: wrap\` and ensuring the items have a fixed width (\`flex: 0 0 33.33%\`).
* **Accessibility:** Ensure the final labels have sufficient size and spacing for easy interaction on touch devices.
`,
    codeString: `
<div id="grid-container">
  <label>Label 1</label>
  <label>Label 2</label>
  <label>Label 3</label>
  <label>Label 4</label>
  <label>Label 5</label>
  <label>Label 6</label>
</div>

<style>
#grid-container {
  display: grid;
  /* 3 columns, each taking an equal fraction of the space */
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  width: 300px;
  height: 300px;
  border: 2px solid #333;
  padding: 10px;
  /* Center the content of the entire grid */
  align-items: center; 
  justify-content: center;
}
#grid-container label {
  background-color: #f0f4ff;
  border: 1px solid #aaa;
  padding: 5px;
  text-align: center;
}
</style>
`,
    output: "Conceptual HTML/CSS for a 3x2 grid.",
  },
  // Q70: Networking & algorithms - graph display and shortest path
  {
    id: 70,
    title: "Graph Display and Shortest Path Algorithms",
    explanation: `
## Graph Display (Visualization)
Complex network graphs (nodes and edges) are typically rendered using specialized libraries:
* **D3.js:** The industry standard for data-driven documents, providing low-level control for force-directed layouts and rendering the SVG/Canvas elements.
* **Cytoscape.js / Vis.js:** Higher-level libraries built specifically for interactive graph and network visualization.

## Shortest Path Algorithms
The choice of algorithm depends on whether the graph edges have weights and if those weights can be negative.
* **Dijkstra's Algorithm:** Finds the shortest path between nodes in a graph with **non-negative** edge weights. It uses a priority queue for efficiency (\`O((E+V) log V)\`).
* **A\* Search:** An extension of Dijkstra's that uses a **heuristic** to guide its search, making it much faster in practical applications like pathfinding on maps.
* **Bellman-Ford Algorithm:** Can find the shortest path even if the graph contains **negative** edge weights, but it is slower than Dijkstra's (\`O(V*E)\`).

`,
    tips: `"Interview Tips / Pitfalls"
* If asked to implement Dijkstra's, mention the need for a min-priority queue to store and efficiently retrieve the unvisited node with the smallest known distance.
`,
    codeString: `
// JavaScript / Dijkstra's Concept
/*
function dijkstra(graph, startNode, endNode) {
  const distances = {}; // Stores shortest distance from startNode
  const visited = new Set();
  const priorityQueue = []; // Min-Heap based queue (conceptual)

  // Initialization: all distances are Infinity, startNode is 0
  // ...

  while (priorityQueue.length > 0) {
    const currentNode = priorityQueue.popMin(); // Get closest unvisited node
    if (visited.has(currentNode)) continue;
    visited.add(currentNode);

    // Relaxation step: update distances to neighbors
    // for (neighbor of currentNode.neighbors) {
    //   if (newDist < distances[neighbor]) {
    //     distances[neighbor] = newDist;
    //     priorityQueue.insert(neighbor, newDist);
    //   }
    // }
  }
  return distances[endNode];
}
*/
`,
    output: "Conceptual framework for Dijkstra's algorithm.",
  },
  // Q71: inline vs inline-block
  {
    id: 71,
    title: "CSS: inline vs inline-block",
    explanation: `
Both \`inline\` and \`inline-block\` elements flow horizontally with text, but they handle box model properties differently.

* **\`display: inline\`:** (e.g., \`<span>\`, \`<a>\`)
    * **Ignores** explicit \`width\` and \`height\` settings.
    * **Ignores** top and bottom \`margin\` and \`padding\`.
    * Content dictates size.
* **\`display: inline-block\`:**
    * **Accepts** explicit \`width\` and \`height\`.
    * **Accepts** all \`margin\` and \`padding\` properties.
    * Flows inline horizontally.

`,
    tips: `"Interview Tips / Pitfalls"
* **The Spacing Problem:** The most famous pitfall of \`inline-block\` is the mysterious space that appears between elements due to the **whitespace** (newline/space) characters in the HTML source code.
* **Solution to Spacing:** Remove whitespace in HTML (bad practice), set the font size of the parent to 0 (ugly hack), or use Flexbox (the modern solution).
`,
    codeString: `
/* HTML Example: <span class="inline">Inline</span><span class="inline-block">Inline-Block</span> */

.inline {
  display: inline;
  width: 100px;    /* Ignored */
  height: 100px;   /* Ignored */
  padding: 20px;   /* Top/Bottom padding ignored */
  background: yellow;
}

.inline-block {
  display: inline-block;
  width: 100px;    /* Applied */
  height: 100px;   /* Applied */
  padding: 20px;   /* All padding applied */
  background: lightblue;
}
`,
    output: "Conceptual CSS for inline vs inline-block.",
  },
  // Q72: Complex React component task
  {
    id: 72,
    title: "Complex React Component Task (State Machine Logic)",
    explanation: `
This task requires managing three asynchronous operations and component state simultaneously, demanding careful use of \`useState\` and \`useEffect\` to handle side effects and dependencies.

## Key Logic
1.  **Async/Await in Handler:** The \`handleClick\` function is \`async\` to sequentially call \`getPromise()\` and then \`randomFunc()\`.
2.  **External Effect:** An initial \`useEffect\` is used to trigger \`randomFunc\` on mount to set the initial \`num\` state.
3.  **Dependent Effect:** A second \`useEffect\` runs whenever \`num\` changes to calculate parity via \`getEven(num)\` and update the \`on\` state accordingly.
4.  **Cleanup:** The dependent effect includes cleanup using the \`mounted\` flag to prevent race conditions (if \`num\` changes while \`getEven\` is in flight) and setting state on an unmounted component.

`,
    tips: `"Interview Tips / Pitfalls"
* The primary pitfall is the **race condition** in the second \`useEffect\`. The cleanup flag (\`mounted = false\`) is the simplest way to solve this by ignoring stale promise results.
`,
    codeString: `
import React, { useState, useEffect, useCallback } from 'react';

// Mock functions (passed as props in the task description)
const getPromise = () => new Promise(res => setTimeout(res, 500, 'Done'));
const getEven = (num) => new Promise(res => setTimeout(res, 200, num % 2 === 0));
const randomFunc = (setter) => setter(Math.floor(Math.random() * 10));

function ComplexButton() { // Using mock functions locally for demonstration
  const [on, setOn] = useState(true);
  const [num, setNum] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Initial/Cleanup Effect: Set initial random number on mount
  useEffect(() => {
    randomFunc(setNum); 
  }, []); 

  // 2. State-Dependent Effect: Check parity of the number
  useEffect(() => {
    if (num === null) return;
    setLoading(true);
    let mounted = true;

    getEven(num).then(isEven => {
      if (mounted) {
        setOn(isEven);
        setLoading(false);
      }
    }).catch(console.error);

    return () => { mounted = false; }; // Cleanup for race conditions/unmount
  }, [num]);

  // 3. Click Handler: Controls main state transition
  const handleClick = useCallback(async () => {
    if (!on || loading) { 
      setOn(true); // If Off, just set On
      return; 
    }
    
    setLoading(true);
    try {
      await getPromise();
      setOn(false); // Turn off after successful promise
    } catch(e) {
      console.error("Promise failed:", e);
    } finally {
      randomFunc(setNum); // Always set new random number after attempt
      setLoading(false);
    }
  }, [on, loading]);

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg">
      <p className="text-lg">Current Number: {num === null ? '...' : num}</p>
      <p className="text-xl font-semibold mb-4">State: {loading ? 'Processing...' : (on ? 'ON' : 'OFF')}</p>
      
      <button 
        onClick={handleClick} 
        disabled={loading}
        className={\`p-3 rounded-full text-white w-32 font-bold transition duration-150 \${on ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} \${loading ? 'opacity-50 cursor-not-allowed' : ''}\`}
      >
        {loading ? 'WAIT' : (on ? 'Click to Run' : 'Turn ON')}
      </button>
    </div>
  );
}
// export default ComplexButton;
`,
    output: "Conceptual React code for a complex state component.",
  },
  // Q73: Misc — shallow vs deep copy, flexbox alignment
  {
    id: 73,
    title: "Shallow vs Deep Copy and Flexbox Alignment",
    explanation: `
## Shallow vs Deep Copy
* **Shallow Copy:** Creates a new object/array, but copies references to the nested objects/arrays. Mutation of inner values affects both the original and the copy.
    * **Methods:** \`{...obj}\`, \`[...arr]\`, \`Object.assign()\`.
* **Deep Copy:** Creates a completely independent clone, including all nested structures. Mutation of any value only affects the copy.
    * **Methods:** \`structuredClone(obj)\` (modern standard, best option), \`JSON.parse(JSON.stringify(obj))\` (simple but fails on functions, Dates, Maps, etc.).

## Flexbox Alignment
Flexbox uses two main properties for alignment:
1.  **\`justify-content\`:** Aligns items along the **Main Axis** (default horizontal).
2.  **\`align-items\`:** Aligns items along the **Cross Axis** (default vertical).

`,
    tips: `"Interview Tips / Pitfalls"
* If supporting older environments, mention the need for a third-party library (like Lodash's \`cloneDeep\`) if \`structuredClone\` is unavailable.
* Mention that \`flex-direction: column\` flips the axes, making \`justify-content\` vertical and \`align-items\` horizontal.
`,
    codeString: `
const original = { a: 1, nested: { b: 2 } };

// 1. Shallow Copy (nested is a shared reference)
const shallow = { ...original };
shallow.nested.b = 99;
console.log('Original Nested B after shallow mutation:', original.nested.b); // 99

// 2. Deep Copy (modern JS)
const deep = structuredClone(original);
deep.nested.b = 50; // New change
console.log('Original Nested B after deep mutation:', original.nested.b); // 99 (retains previous mutation)
console.log('Deep Nested B:', deep.nested.b); // 50

//3.Safe Deep Cope:
function safeClone(obj) {
  const cloneable = structuredClone(
    Object.fromEntries(Object.entries(obj).filter(([k, v]) => typeof v !== "function"))
  );
  
  // Reattach functions manually
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "function") {
      cloneable[key] = value;
    }
  }
  return cloneable;
}

const clone = safeClone(original);
console.log("Safe Deep Copy");
clone.greet(); // ✅ "Hi, I'm Jay"
console.log(clone.date instanceof Date); // ✅ true
console.log(clone.map instanceof Map);   // ✅ true

`,
    output: `Original Nested B after shallow mutation: 99
Original Nested B after deep mutation: 99
Deep Nested B: 50

console.log("Safe Deep Copy");
Hi, I'm Jay
true
true
`,
  },
  // Q74: Event loop ordering code snippet
  {
    id: 74,
    title: "Event Loop Ordering (Microtask vs Macrotask)",
    explanation: `
This is a classic Event Loop question testing the understanding of the Microtask Queue's priority.

1.  **Sync Code:** \`console.log('1')\` and \`console.log('4')\` run immediately in the Call Stack.
2.  **Microtask:** \`Promise.resolve().then(()=>console.log('3'))\` is placed in the Microtask Queue.
3.  **Macrotask:** \`setTimeout(()=>console.log('2'),0)\` is placed in the Macrotask Queue.
4.  The Event Loop empties the Microtask Queue entirely (running '3') before checking the Macrotask Queue (running '2').

## Ordering: Stack (1, 4) -> Microtask (3) -> Macrotask (2)
`,
    codeString: `
console.log('1');

// Macrotask (runs last)
setTimeout(()=>console.log('2'), 0); 

// Microtask (runs before macrotasks)
Promise.resolve().then(()=>console.log('3')); 

console.log('4');
`,
    output: `1
4
3
2`,
  },
  // Q75: Flatten nested object keys to dotted keys function
  {
    id: 75,
    title: "Utility: Flatten Nested Object Keys to Dotted Keys",
    explanation: `
This is a utility function that converts a deeply nested object into a single-level object where the keys are separated by dots (e.g., \`user.address.city\`). This is commonly used for form data processing or internationalization keys.

* **Approach:** Uses **recursion** to traverse the object.
* **Key Logic:** It builds the key path by concatenating the parent key with the current key (e.g., \`prefix + '.' + k\`). The recursion stops when the value is not a plain object (e.g., it's a primitive, \`null\`, or an array).

`,
    tips: `"Interview Tips / Pitfalls"
* **Array Handling:** The provided solution treats arrays as leaf nodes (values). If the requirement were to flatten arrays (e.g., \`items.0.name\`), the logic would need to iterate over the array indices.
* **\`hasOwnProperty\`:** Using \`Object.prototype.hasOwnProperty.call(obj, k)\` is crucial to avoid processing inherited properties from the prototype chain.
`,
    codeString: `
function flatten(obj, prefix = '', res = {}) {
  for (const k in obj) {
    // Ensure we only process own properties
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    
    const val = obj[k];
    // Construct the new dotted key path
    const key = prefix ? \`\${prefix}.\${k}\` : k; 
    
    // Recursive condition: check if value is a non-null, non-array object
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      flatten(val, key, res); // Recurse with new prefix
    } else {
      res[key] = val; // Assign the value to the flattened object
    }
  }
  return res;
}

const nestedObj = {
  id: 1,
  details: {
    name: 'Jane',
    config: {
      theme: 'dark'
    }
  },
  tags: ['a', 'b'],
  status: null
};

console.log(flatten(nestedObj));
`,
    output: `{ id: 1, 'details.name': 'Jane', 'details.config.theme': 'dark', tags: [ 'a', 'b' ], status: null }`,
  },

  {
    id: 76,
    title: "Debounce vs Throttle (JS Implementation)",
    explanation:
      "Debouncing and throttling are performance patterns to control the rate at which functions execute.\n\n| Feature | Debounce | Throttle |\n|---|---|---|\n| **Definition** | Wait until event triggering stops | Limit rate to at most once every `delay` ms |\n| **Use Case** | Search input, API calls, window resize end | Scroll, mouse move, continuous animation |\n| **Behavior** | Resets timer on each call | Ignores calls until delay expires |\n\n## React-Safe Implementation Note\nWhen integrating into React, **always extract primitive values** (`e.target.value` or `window.scrollY`) before passing them to the delayed function, as React's Synthetic Events are pooled (cleared immediately).",
    tips: '"Interview Tips / Pitfalls"\n* **Key Distinction:** Debounce = "wait for quiet"; Throttle = "limit frequency."\n* **React Pooling:** Mention that React Synthetic Events are pooled, making it a bug to pass the event object directly into delayed callbacks.\n* **Closures:** Explain that the `timer` variable must be held in a closure (or `useRef` in React) to persist across function calls.',
    codeString:
      "// --- 1. Debounce (JS Standard) ---\nfunction debounce(fn, delay) {\n  let timer = null;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}\n\n// --- 2. Throttle (JS Standard) ---\nfunction throttle(fn, delay) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\n// Example Usage (Debounce will run after 500ms pause)\nconst debouncedLog = debounce((msg) => console.log('Debounced:', msg), 500);\nconst throttledLog = throttle((msg) => console.log('Throttled:', msg), 500);\n\ndebouncedLog(1); debouncedLog(2); debouncedLog(3);\n\nthrottledLog('A'); // Executes immediately\nthrottledLog('B'); // Ignored\nsetTimeout(() => throttledLog('C'), 600); // Executes (after delay)\n",
    output:
      "Throttled: A\nDebounced: 3 (after 500ms)\nThrottled: C (after ~600ms total)",
  },
  {
    id: 78,
    title: "Event Delegation",
    explanation: `
Event Delegation is a technique where instead of attaching event listeners to **each child element**, you:
- Attach **one listener** to a parent element.
- Use event bubbling to detect which child triggered the event.

This improves:
- Performance (fewer listeners)
- Memory usage
- Supports dynamically added elements

## How It Works
1. Add one listener to the parent.
2. Let events bubble up.
3. Inside the handler, inspect \`event.target\`.
4. Trigger behavior only if the target matches your criteria (e.g. via \`matches()\` selector).
`,
    tips: `"Interview Tips / Pitfalls"
* Demonstrate understanding of **event bubbling**.
* Use \`event.target\` and \`element.matches(selector)\`.
* Mention that delegation does NOT work for non-bubbling events (e.g., focus).
* Useful for dynamic lists, tables, menus, etc.
`,
    codeString: `
// Event Delegation Example
document.querySelector("#parent").addEventListener("click", function(event) {
  if (event.target.matches(".child")) {
    console.log("Child clicked:", event.target.innerText);
  }
});

// HTML:
// <ul id="parent">
//   <li class="child">A</li>
//   <li class="child">B</li>
//   <li class="child">C</li>
// </ul>
`,
    output: `Clicking any <li> logs: "Child clicked: A" (or B or C)`,
  },
  {
    id: 79,
    title: "Currying",
    explanation: `
Currying transforms a function with multiple arguments into a sequence of functions each taking **one argument at a time**.

Example:
\`\`\`
f(a, b, c) -> f(a)(b)(c)
\`\`\`

Currying demonstrates:
- Closures
- Higher-order functions
- Function transformation

## Implementation Details
1. Write a function \`curry(fn)\`.
2. Return a wrapper that collects arguments.
3. If enough arguments are collected → call original function.
4. Otherwise → return another function expecting the remaining arguments.
`,
    tips: `"Interview Tips / Pitfalls"
* Mention real use cases: partial application, functional programming, reusability.
* Ensure you understand how closures accumulate arguments.
* Edge case: handle both full and partial argument passing.
`,
    codeString: `
// Curry implementation
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);  // enough arguments
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs)); // accumulate
      };
    }
  };
}

// Example usage:
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3));
console.log(curriedSum(1, 2)(3));
console.log(curriedSum(1)(2, 3));
`,
    output: `All calls result in: 6`,
  },
  {
    id: 80,
    title: "Promise Static Methods (Complete Set & Parallel Execution)",
    explanation:
      "JavaScript Promises provide static methods to handle multiple asynchronous tasks, aggregate results, or control timing. These methods are crucial for complex asynchronous orchestration.\n\n| Method | Behavior | Key Takeaway |\n|---|---|---|\n| **.all(iter)** | Resolves when **all** promises resolve. Rejects immediately on first rejection. | Fail-fast, parallel execution. |\n| **.race(iter)** | Settles with the **first promise** that resolves or rejects. | Useful for setting timeouts. |\n| **.allSettled(iter)** | Resolves when **all** promises settle (fulfilled or rejected). | Never rejects, provides status for every outcome. |\n| **.any(iter)** | Resolves when **any** promise resolves. Rejects only if **all** promises fail. | Success-first, resilient aggregation. |\n\n### Parallel Execution\n`Promise.all` executes tasks concurrently (in parallel) and aggregates the results, preserving the original order of the input Promises.",
    tips: '"Interview Tips"\n* **Concurrency:** `Promise.all` achieves parallelism, significantly faster than sequential execution (Q83).\n* **Order Preservation:** The result array from `Promise.all` always matches the order of the input array, regardless of which promise finished first.\n* **Error Handling:** If using `Promise.all`, wrap the call in `try...catch` or use `.catch()` to handle the failure of the first rejected promise.',
    codeString:
      "const delayAndResolve = (i, delay) => {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      resolve(i);\n    }, delay);\n  });\n};\n\nconst tasks = [\n  delayAndResolve(1, 400), \n  delayAndResolve(2, 100), \n  delayAndResolve(3, 200), \n];\n\n// Promise.all: Executes all tasks in parallel\nPromise.all(tasks).then(results => {\n  console.log('Promise.all Results (Order preserved):', results); // [1, 2, 3]\n});\n\n// Promise.race: Finishes with the fastest one (Task 2)\nPromise.race(tasks).then(fastest => {\n  console.log('Promise.race Result:', fastest); // 2\n});\n\n// Promise.reject()\nPromise.reject('Error!').catch(e => console.log('Promise.reject:', e));\n",
    output:
      "Promise.race Result: 2\nPromise.reject: Error!\nPromise.all Results (Order preserved): [1, 2, 3]",
  },
  {
    id: 81,
    title: "Debounce vs Throttle (React Safe Implementation)",
    explanation: `
Debouncing and throttling are essential performance patterns to control how often functions run—especially for events like typing, scrolling, or resizing.

| Feature | Debounce | Throttle |
|--------|----------|----------|
| **Definition** | Wait until user stops triggering the event | Allow function to run at most once every \`delay\` ms |
| **Use Case** | Search input, API calls, auto-save | Scroll, resize, button spam prevention |
| **Behavior** | Resets timer on each event | Ignores events until delay expires |
| **Runs** | Only after quiet period | At fixed intervals |

## Why extract the value early?
React uses Synthetic Events which get *pooled* (cleared after event handler finishes).  
So you **must not pass \`event\` into debounced/throttled functions**.  
Instead, extract the primitive value before calling them:

\`\`\`
onChange={(e) => debouncedChange(e.target.value)}
\`\`\`

This prevents stale or null events inside delayed callbacks.

  `,
    tips: `"Interview Tips / Pitfalls"
* Mention that **React Synthetic Events are pooled**, so passing the event itself inside a delayed function is a common bug.
* Explain how **useRef creates stable storage** for timers that persists across renders.
* Show you know use cases: Debounce for search inputs, Throttle for scroll/resize/burst events.
* Clarify the behavior: Debounce = "wait"; Throttle = "limit frequency".
  `,
    codeString: `
// --- Debounce Hook (Outside Component) ---
export const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);

  return (...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback(...args);
      timerRef.current = null;
    }, delay);
  };
};

// --- Throttle Hook (Outside Component) ---
export const useThrottle = (callback, delay) => {
  const timerRef = useRef(null);

  return (...args) => {
    if (timerRef.current) return; // Locked: ignore extra calls

    callback(...args); // Fire immediately

    timerRef.current = setTimeout(() => {
      timerRef.current = null; // Unlock
    }, delay);
  };
};

// --- React Component Using Both ---
const DebounceThrottle = () => {
  const [debounceValue, setDebounceValue] = useState("");
  const [throttleValue, setThrottleValue] = useState("");

  const debounceTime = 400;
  const throttleTime = 1000;

  const firstHandleChange = (value) => {
    console.log("Debounced:", value);
    setDebounceValue(value);
  };

  const secondHandleChange = (value) => {
    console.log("Throttled fired:", value);
    setThrottleValue(value);
  };

  const debouncedChange = useDebounce(firstHandleChange, debounceTime);
  const throttledChange = useThrottle(secondHandleChange, throttleTime);

  return (
    <>
      <input
        placeholder="Debounce"
        onChange={(e) => debouncedChange(e.target.value)}
      />

      <input
        placeholder="Throttle"
        onChange={(e) => throttledChange(e.target.value)}
      />
    </>
  );
};
  `,
    output: "Debounced and throttled input behaviors demonstrated.",
  },

  {
    id: 82,
    title: "Essential JavaScript Array Methods Reference (with Console Output)",
    explanation:
      "JavaScript Arrays provide a robust set of methods for efficient manipulation, transformation, and traversal of data. These methods are categorized by their primary function: conversion/combination, modification, searching, transformation, reduction, and utility.",
    tips: '"Interview Tips / Pitfalls"\n* **Mutability is Key:** Know which methods modify the original array (**mutators**): `push`, `pop`, `unshift`, `shift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`. Methods that return a **new** array (**non-mutators**): `map`, `filter`, `slice`, `concat`, `reduce`, `from`.\n* **The `sort()` trap:** The default `sort()` is lexicographical (string-based). Always use a custom comparator function for numbers or complex objects: `arr.sort((a, b) => a - b)`.\n* **Avoid `delete`:** Using the `delete` operator on an array element leaves an empty slot (`undefined`) and **does not change the array\'s length**. Use `splice()` or `pop`/`shift` for reliable removal.\n* **`from()` vs. Spread:** Explain that `Array.from()` can create an array from any iterable or array-like object (like `arguments` or a NodeList), and can also apply a `map` function during creation, which is often more versatile than the spread operator (`...`).',
    codeString:
      "// --- Setup (Note: Mutators change 'data' array state over time) --- \nlet data = [5, 20, 3, 10];\nconst words = ['apple', 'banana', 'cherry'];\nlet combined = [1, 2, 3, 4, 5];\n\n// --------------------------------\n// 🔹 Convert & Combine Methods \n// --------------------------------\nconst string1 = data.toString();\nconsole.log('toString():', string1); // Output: 5,20,3,10\nconst string2 = data.join(' | ');\nconsole.log('join():', string2); // Output: 5 | 20 | 3 | 10\nconst newArray = data.concat([1, 2]);\nconsole.log('concat():', newArray); // Output: [5, 20, 3, 10, 1, 2] (data remains [5, 20, 3, 10])\nconst iterable = 'abc';\nconst arrFrom = Array.from(iterable);\nconsole.log('Array.from():', arrFrom); // Output: ['a', 'b', 'c']\n\n// --------------------------------\n// ➕➖ Add / Remove Elements (Mutates 'data')\n// --------------------------------\nconst pushLength = data.push(50); \nconsole.log('push():', data, 'Length:', pushLength); // Output: [5, 20, 3, 10, 50] Length: 5\nconst removedPop = data.pop();\nconsole.log('pop():', data, 'Removed:', removedPop); // Output: [5, 20, 3, 10] Removed: 50\nconst unshiftLength = data.unshift(1);\nconsole.log('unshift():', data, 'Length:', unshiftLength); // Output: [1, 5, 20, 3, 10] Length: 5\nconst removedShift = data.shift();\nconsole.log('shift():', data, 'Removed:', removedShift); // Output: [5, 20, 3, 10] Removed: 1\nconst spliced = data.splice(1, 1, 25); // Remove 1 element at index 1 (20), insert 25\nconsole.log('splice():', data, 'Removed:', spliced); // Output: [5, 25, 3, 10] Removed: [20]\nconst sliced = data.slice(1, 3); // Copy elements from index 1 up to (but not including) 3\nconsole.log('slice():', sliced); // Output: [25, 3] (data remains [5, 25, 3, 10])\ndelete data[1]; // Sets element at index 1 to undefined\nconsole.log('delete:', data); // Output: [5, <1 empty item>, 3, 10] \n\n// --------------------------------\n// 🔍 Search & Check Methods\n// --------------------------------\nconst idx = data.indexOf(10);\nconsole.log('indexOf(10):', idx); // Output: 3\nconst lastIdx = [1, 2, 1].lastIndexOf(1);\nconsole.log('lastIndexOf(1):', lastIdx); // Output: 2\nconst exists = words.includes('cherry');\nconsole.log('includes(\"cherry\"):', exists); // Output: true\nconst foundElem = data.find(n => n > 5);\nconsole.log('find(> 5):', foundElem); // Output: 10\nconst foundIndex = data.findIndex(n => n > 5);\nconsole.log('findIndex(> 5):', foundIndex); // Output: 3\nconst isItArray = Array.isArray(data);\nconsole.log('isArray(data):', isItArray); // Output: true\n\n// --------------------------------\n// 🔄 Transform & Loop Methods\n// --------------------------------\nconsole.log('forEach: (will log each element in console)'); \ndata.forEach(n => console.log('forEach element:', n)); \nconst mapped = data.map(n => n * 2);\nconsole.log('map():', mapped); // Output: [10, NaN, 6, 20] (Note: 'empty' slot maps to undefined, which makes NaN when multiplied)\nconst filtered = data.filter(n => n % 2 === 0 && typeof n === 'number');\nconsole.log('filter(even):', filtered); // Output: [10]\nconst allEven = data.every(n => n % 2 === 0);\nconsole.log('every(even):', allEven); // Output: false\nconst anyEven = data.some(n => n % 2 === 0);\nconsole.log('some(even):', anyEven); // Output: true\n\n// --------------------------------\n// 🧮 Reduce & Accumulate Methods\n// --------------------------------\n// Recalculating sum on 'data' after 'delete' operation. Empty slots are skipped.\nconst currentData = [5, 3, 10].filter(n => typeof n === 'number'); // Cleaned up for reduce clarity\nconst sum = currentData.reduce((acc, curr) => acc + curr, 0);\nconsole.log('reduce(sum):', sum); // Output: 18\nconst revSum = currentData.reduceRight((acc, curr) => acc + curr, 0);\nconsole.log('reduceRight(sum):', revSum); // Output: 18\n\n// --------------------------------\n// 🛠 Fill & Copy Methods\n// --------------------------------\nlet fillArr = [1, 2, 3];\nconst filled = fillArr.fill(0, 1, 3); \nconsole.log('fill():', fillArr); // Output: [1, 0, 0] (Mutator)\ncombined.copyWithin(3, 0, 2); // Copy elements from index 0-2 into position 3\nconsole.log('copyWithin():', combined); // Output: [1, 2, 3, 1, 2] (Mutator)\n\n// --------------------------------\n// 📊 Sort & Reorder Methods\n// --------------------------------\nlet sortArr = [5, 20, 3];\nconst sorted = sortArr.sort((a, b) => a - b); \nconsole.log('sort():', sortArr); // Output: [3, 5, 20] (Mutator: Sorted numerically)\nconst reversed = sortArr.reverse();   \nconsole.log('reverse():', sortArr); // Output: [20, 5, 3] (Mutator: Flipped)\n\n// --------------------------------\n// 🔗 Bonus Utility Methods\n// --------------------------------\nconst iterator = words.entries(); \nconsole.log('entries():', iterator.next().value); // Output: [0, 'apple'] (First value from iterator)\nconst originalArr = words.valueOf(); \nconsole.log('valueOf():', originalArr); // Output: ['apple', 'banana', 'cherry']\n",
    output:
      "toString(): 5,20,3,10\njoin(): 5 | 20 | 3 | 10\nconcat(): [5, 20, 3, 10, 1, 2]\nArray.from(): ['a', 'b', 'c']\npush(): [5, 20, 3, 10, 50] Length: 5\npop(): [5, 20, 3, 10] Removed: 50\nunshift(): [1, 5, 20, 3, 10] Length: 5\nshift(): [5, 20, 3, 10] Removed: 1\nsplice(): [5, 25, 3, 10] Removed: [20]\nslice(): [25, 3]\ndelete: [5, <1 empty item>, 3, 10]\nindexOf(10): 3\nlastIndexOf(1): 2\nincludes(\"cherry\"): true\nfind(> 5): 10\nfindIndex(> 5): 3\nisArray(data): true\nforEach: (will log each element in console)\nforEach element: 5\nforEach element: 3\nforEach element: 10\nmap(): [10, NaN, 6, 20]\nfilter(even): [10]\nevery(even): false\nsome(even): true\nreduce(sum): 18\nreduceRight(sum): 18\nfill(): [1, 0, 0]\ncopyWithin(): [1, 2, 3, 1, 2]\nsort(): [3, 5, 20]\nreverse(): [20, 5, 3]\nentries(): [0, 'apple']\nvalueOf(): ['apple', 'banana', 'cherry']",
  },
  {
    id: 83,
    title: "Promises in Sequence (Sequential Execution)",
    explanation:
      "Executing an array of promises or async functions sequentially (one after the other) is crucial when the next task depends on the previous one, or when you need to avoid overwhelming a resource with concurrent requests.\n\n## Implementation via Reduce\nThis is best achieved using the **Array.prototype.reduce()** method. The accumulator starts as a resolved promise. In each iteration, we chain the next promise using `.then()` onto the accumulator, ensuring the chain only moves forward after the current promise resolves.",
    tips: '"Interview Tips / Pitfalls"\n* **Contrast with Promise.all:** Promise.all executes concurrently; sequential execution ensures order and dependency handling.\n* **Reduce Starting Point:** The accumulator must be initialized to a resolved promise (`Promise.resolve()`) to start the chain.\n* **Error Handling:** A single rejection will stop the entire chain and propagate to the final `.catch()` block.',
    codeString:
      "const asyncTask = (msg, delay) => {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      console.log(`Task: ${msg} resolved after ${delay}ms`);\n      resolve(msg);\n    }, delay);\n  });\n};\n\nconst tasks = [\n  () => asyncTask('Task A', 100),\n  () => asyncTask('Task B', 50),\n  () => asyncTask('Task C', 150),\n];\n\n// Sequential execution using Array.reduce\nfunction executeSequentially(asyncFns) {\n  return asyncFns.reduce((promiseChain, currentTask) => {\n    // Chain the next task onto the result of the previous promise\n    return promiseChain.then(currentTask);\n  }, Promise.resolve()); // Start the chain with an immediately resolved promise\n}\n\nexecuteSequentially(tasks);\n",
    output:
      "Task: Task A resolved after 100ms\nTask: Task B resolved after 50ms\nTask: Task C resolved after 150ms",
  },
  {
    id: 84,
    title: "Chain Calculator (Method Chaining)",
    explanation:
      "A Chain Calculator (or fluent interface) allows methods to be called sequentially on an object, often leading to highly readable code. The key to implementing method chaining is ensuring that **every method returns the object instance itself** (`return this`).\n\n## Implementation Details\n1. The object stores an internal `value` state (closure).\n2. Each method (e.g., `add`, `subtract`) modifies the internal `value`.\n3. Each method returns `this` to allow the next method to be called.",
    tips: '"Interview Tips / Pitfalls"\n* Mention that the pattern relies on object mutation, which is generally discouraged in pure functional programming (like Redux reducers), but is common in builder patterns.\n* Ensure the final method (`equal` or `value`) returns the final primitive value, breaking the chain.',
    codeString:
      "class Calculator {\n  constructor(initialValue = 0) {\n    this.result = initialValue;\n  }\n\n  add(n) {\n    this.result += n;\n    return this; // Return 'this' to continue the chain\n  }\n\n  subtract(n) {\n    this.result -= n;\n    return this; // Return 'this' to continue the chain\n  }\n\n  multiply(n) {\n    this.result *= n;\n    return this;\n  }\n\n  value() {\n    return this.result; // Return the final value, breaking the chain\n  }\n}\n\nconst calc = new Calculator(10);\n\nconst finalValue = calc\n  .add(5)         // 10 + 5 = 15\n  .multiply(2)    // 15 * 2 = 30\n  .subtract(10)   // 30 - 10 = 20\n  .value();\n\nconsole.log('Chained Result:', finalValue);",
    output: "Chained Result: 20",
  },
  {
    id: 85,
    title: "Pipe and Compose (Functional Composition)",
    explanation:
      "Pipe and Compose are core utilities in Functional Programming (FP) for combining multiple simple functions into a single, complex function. They both achieve **function composition**.\n\n### ➡️ Pipe (Left-to-Right)\nData flows through the functions sequentially, like a water pipe: `pipe(f, g, h)(x) -> h(g(f(x)))`\n\n### ⬅️ Compose (Right-to-Left)\nData flows backward, combining the last function first (standard mathematical composition): `compose(f, g, h)(x) -> f(g(h(x)))`",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize that both functions take **multiple functions** as arguments and return a **single new function**.\n* The implementation relies heavily on `Array.prototype.reduce()` or `reduceRight()` to correctly chain the functions.\n* `pipe` is often preferred for readability, as the code reads in the order of execution.',
    codeString:
      "const add1 = x => x + 1;\nconst multiply2 = x => x * 2;\nconst square = x => x * x;\n\n// Implementation using Array.reduce\n\n// ⬅️ Compose: Executes R to L (square then multiply then add)\nfunction compose(...fns) {\n  return (initialValue) => fns.reduceRight((acc, fn) => fn(acc), initialValue);\n}\n\n// ➡️ Pipe: Executes L to R (add then multiply then square)\nfunction pipe(...fns) {\n  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);\n}\n\n// Example 1: Pipe (add1 -> multiply2 -> square)\n// 10 + 1 = 11 -> 11 * 2 = 22 -> 22 * 22 = 484\nconst pipedResult = pipe(add1, multiply2, square)(10);\nconsole.log('Pipe Result:', pipedResult);\n\n// Example 2: Compose (square -> multiply2 -> add1)\n// 10 * 10 = 100 -> 100 * 2 = 200 -> 200 + 1 = 201\nconst composedResult = compose(add1, multiply2, square)(10);\nconsole.log('Compose Result:', composedResult);",
    output: "Pipe Result: 484\nCompose Result: 201",
  },
  {
    id: 86,
    title: "Polyfill: Array.prototype.filter",
    explanation:
      "The `filter()` method creates a **new array** containing all elements that satisfy the condition provided by the callback function. This polyfill demonstrates understanding of **prototypes**, **`this` context**, and conditional array building.\n\n## Implementation Details\n1. The function is added to `Array.prototype` (e.g., `myFilter`).\n2. The callback function is called for each element, receiving `(value, index, array)`.\n3. If the callback returns a **truthy** value, the original element is pushed into the `result` array.",
    tips: "\"Interview Tips / Pitfalls\"\n* Like `map`, `filter` must return a **new array** and not mutate the original.\n* A compliant polyfill should check for the callback function type and handle sparse arrays (skipping 'holes').\n* The element itself (`this[i]`) is what gets pushed to the result array, not the return value of the callback (unlike `map`).",
    codeString:
      "// We use 'myFilter' to avoid conflict with native filter\nif (!Array.prototype.myFilter) {\n  Array.prototype.myFilter = function(callbackFn) {\n    if (typeof callbackFn !== 'function') {\n      throw new TypeError('Callback must be a function');\n    }\n\n    const result = [];\n    // 'this' refers to the array on which myFilter is called\n    for (let i = 0; i < this.length; i++) {\n      // Check for property existence for sparse array handling\n      if (Object.prototype.hasOwnProperty.call(this, i)) {\n        // If callback returns true (truthy), keep the element\n        if (callbackFn(this[i], i, this)) {\n          result.push(this[i]);\n        }\n      }\n    }\n    return result;\n  };\n}\n\nconst arr = [10, 5, 20, 3];\nconst filtered = arr.myFilter(x => x > 7);\nconsole.log('Filtered Array:', filtered);\n\nconst sparseArr = [1, , 3];\nconst sparseFiltered = sparseArr.myFilter(x => x % 2 === 1);\nconsole.log('Sparse Filtered:', sparseFiltered);",
    output: "Filtered Array: [10, 20]\nSparse Filtered: [1, 3]",
  },
  {
    id: 87,
    title: "Polyfill: Array.prototype.reduce",
    explanation:
      "The `reduce()` method executes a callback function (`reducer`) on each element of the array, resulting in a single output value (accumulator). This is the most complex polyfill, testing careful argument handling.\n\n## Implementation Details\n1. The `initialValue` argument is optional. If it's missing, the accumulator starts as the first element (`this[0]`), and iteration starts at the second element (`this[1]`).\n2. If the array is empty and no initial value is provided, it throws a `TypeError` (edge case).\n3. The callback receives `(accumulator, currentValue, currentIndex, array)`.",
    tips: '"Interview Tips / Pitfalls"\n* The primary pitfall is correctly handling the **optional initial value**.\n* Ensure the implementation correctly initializes the accumulator and the starting index based on the presence of `initialValue`.\n* `reduce` is the most versatile array method; you can implement `map`, `filter`, and `forEach` using only `reduce`.',
    codeString:
      "// We use 'myReduce' to avoid conflict with native reduce\nif (!Array.prototype.myReduce) {\n  Array.prototype.myReduce = function(callbackFn, initialValue) {\n    if (typeof callbackFn !== 'function') {\n      throw new TypeError('Callback must be a function');\n    }\n\n    const len = this.length;\n    let accumulator = initialValue;\n    let startingIndex = 0;\n\n    // 1. Handle optional initialValue\n    if (arguments.length < 2) {\n      if (len === 0) {\n        throw new TypeError('Reduce of empty array with no initial value');\n      }\n      // Set first element as accumulator, start iterating from the second\n      accumulator = this[0];\n      startingIndex = 1;\n    }\n    \n    // 2. Iterate and accumulate\n    for (let i = startingIndex; i < len; i++) {\n      // Important for sparse arrays, skips unassigned indices\n      if (Object.prototype.hasOwnProperty.call(this, i)) {\n        accumulator = callbackFn(accumulator, this[i], i, this);\n      }\n    }\n\n    return accumulator;\n  };\n}\n\nconst numbers = [1, 2, 3, 4];\n\n// Example 1: Sum with initial value (0)\nconst sum = numbers.myReduce((acc, val) => acc + val, 0);\nconsole.log('Sum with 0:', sum);\n\n// Example 2: Max value without initial value\nconst max = numbers.myReduce((acc, val) => (acc > val ? acc : val));\nconsole.log('Max without initial:', max);\n",
    output: "Sum with 0: 10\nMax without initial: 4",
  },
  {
    id: 88,
    title: "Prototype and Prototype Inheritance",
    explanation:
      "JavaScript uses **prototypal inheritance**—objects inherit properties and methods from other objects. This differs from class-based inheritance.\n\n### Key Concepts\n1. **`[[Prototype]]` (The Link):** Every object has an internal, hidden link to another object (its prototype). In modern JS, this is accessed via `Object.getPrototypeOf(obj)` or the deprecated `obj.__proto__`.\n2. **`prototype` Property (The Blueprint):** Only function objects have a public `prototype` property. When a function is used as a constructor (`new Func()`), the `[[Prototype]]` of the *new instance* is set to point to the `Func.prototype` object.\n3. **Prototype Chain:** When trying to access a property, the engine first looks on the object itself. If not found, it traverses up the `[[Prototype]]` link to the next object, repeating until the property is found or the chain ends at `Object.prototype` (which points to `null`).",
    tips: '"Interview Tips / Pitfalls"\n* Clearly distinguish between the public `prototype` property (on the constructor function) and the internal `[[Prototype]]` link (on the instance object).\n* Show the `Object.create(proto)` method as the simplest, direct way to create an object that inherits from a specified prototype.\n* Mention that ES6 `class` syntax is purely syntactic sugar over this core prototypal mechanism.',
    codeString:
      "// 1. Constructor Function (Blueprint)\nfunction Animal(name) {\n  this.name = name;\n}\n\n// 2. Add methods to the prototype (shared by all instances)\nAnimal.prototype.makeSound = function() {\n  console.log(`${this.name} makes a sound.`);\n};\n\n// 3. Create an instance\nconst dog = new Animal('Bingo');\n\n// 4. Inheritance demonstration\nconsole.log(`Bingo has makeSound: ${dog.hasOwnProperty('makeSound') ? 'No' : 'Yes (inherited)'}`);\nconsole.log(`Bingo's prototype link is: ${Object.getPrototypeOf(dog) === Animal.prototype}`);\n\ndog.makeSound();\n\n// 5. Direct Prototype Creation\nconst proto = { value: 42 };\nconst obj = Object.create(proto);\nconsole.log(`Object.create value: ${obj.value}`); // Inherited from proto",
    output:
      "Bingo has makeSound: Yes (inherited)\nBingo's prototype link is: true\nBingo makes a sound.\nObject.create value: 42",
  },
  {
    id: 89,
    title: "Flatten Array (Deep Flattening)",
    explanation:
      "Flattening an array means taking a multi-dimensional array and converting it into a single-dimensional array. This is a common recursive algorithm question.\n\n### Methods\n1. **Native `Array.prototype.flat(depth)`:** The modern, built-in solution. Use `Infinity` for deep flattening.\n2. **Recursion:** Implement a custom function using recursion to handle arbitrary nesting levels.\n3. **Stack/Iterative:** Non-recursive approach using a stack (often preferred to avoid exceeding the call stack limit on extremely deep arrays).",
    tips: '"Interview Tips / Pitfalls"\n* Always mention the native `arr.flat(Infinity)` first.\n* The custom recursive solution is the expected implementation challenge.\n* Ensure the recursive solution correctly distinguishes between an array (`Array.isArray()`) and non-array elements.',
    codeString:
      "const nestedArray = [1, [2, [3, 4], 5], 6, [7, 8]];\n\n// 1. Native Solution (ES2019+)\nconst nativeFlat = nestedArray.flat(Infinity);\nconsole.log('Native Flat:', nativeFlat);\n\n// 2. Recursive Solution (Custom Polyfill)\nfunction customFlat(arr) {\n  const result = [];\n  \n  for (let i = 0; i < arr.length; i++) {\n    const element = arr[i];\n    \n    if (Array.isArray(element)) {\n      // Recursively call for nested array\n      result.push(...customFlat(element));\n    } else {\n      // Push primitive elements\n      result.push(element);\n    }\n  }\n  \n  return result;\n}\n\nconst customFlatResult = customFlat(nestedArray);\nconsole.log('Custom Flat:', customFlatResult);\n",
    output:
      "Native Flat: [1, 2, 3, 4, 5, 6, 7, 8]\nCustom Flat: [1, 2, 3, 4, 5, 6, 7, 8]",
  },

  {
    id: 90,
    title: "Event Emitter (Pub/Sub with `once`)",
    explanation:
      "An Event Emitter implements the **Publish-Subscribe (Pub/Sub)** pattern. It allows decoupled communication using a central dispatcher.\n\n### Core Methods\n1. **`on(event, listener)`:** Subscribes a function to an event.\n2. **`off(event, listener)`:** Removes a listener for an event.\n3. **`emit(event, ...args)`:** Executes all listeners subscribed to that event.\n4. **`once(event, listener)`:** Subscribes a function that is executed only **once**, then automatically removed from the listener list.",
    tips: '"Interview Tips / Pitfalls"\n* The core data structure is a **Map** where keys are **event names** and values are **arrays of listener functions**.\n* The `once` method is implemented by creating a wrapper function that calls the original listener and then immediately calls `this.off` on itself.',
    codeString:
      "class EventEmitter {\n  constructor() {\n    this.listeners = new Map();\n  }\n\n  on(event, listener) {\n    if (!this.listeners.has(event)) {\n      this.listeners.set(event, []);\n    }\n    this.listeners.get(event).push(listener);\n  }\n\n  off(event, listener) {\n    const eventListeners = this.listeners.get(event);\n    if (!eventListeners) return;\n    this.listeners.set(event, eventListeners.filter(l => l !== listener));\n  }\n\n  once(event, listener) {\n    const wrapper = (...args) => {\n      listener(...args);\n      this.off(event, wrapper);\n    };\n    // Store wrapper instead of original listener\n    this.on(event, wrapper);\n  }\n\n  emit(event, ...args) {\n    const listeners = this.listeners.get(event);\n    if (!listeners) return;\n    // Clone array to prevent errors if a listener calls 'off' during emit\n    [...listeners].forEach(listener => {\n      listener(...args);\n    });\n  }\n}\n\nconst emitter = new EventEmitter();\nemitter.once('load', (data) => console.log('Once:', data));\nemitter.on('load', (data) => console.log('Always:', data));\n\nemitter.emit('load', 1); // Both fire\nemitter.emit('load', 2); // Only 'Always' fires\n",
    output: "Once: 1\nAlways: 1\nAlways: 2",
  },
  {
    id: 91,
    title: "Debouncing with Leading and Trailing Options",
    explanation:
      "Advanced Debouncing controls when the function fires relative to the event burst:\n\n* **Trailing Edge (Default):** Fires the function **after** the cooldown period following the *last* event (The event burst stops, then wait).\n* **Leading Edge:** Fires the function **immediately** upon the *first* event, and then suppresses all further calls until the cooldown period ends.",
    tips: '"Interview Tips / Pitfalls"\n* The **`leading`** option requires checking if `timer` is `null` to know if it\'s the *first* call in a burst.\n* The **`trailing`** option requires setting `timer = null` *after* the `setTimeout` executes the function to allow the next call to start a new burst.\n* The implementation must handle the `timer` correctly in a closure.',
    codeString:
      "function debounce(fn, wait = 300, options = {}) {\n  let timer = null;\n  let { leading = false, trailing = true } = options;\n\n  return function(...args) {\n    const context = this;\n    const isFirstCall = timer === null;\n\n    clearTimeout(timer);\n\n    // 1. Leading Edge Logic (Execute immediately)\n    if (leading && isFirstCall) {\n      fn.apply(context, args);\n    }\n\n    // 2. Trailing Edge Logic (Delayed execution)\n    timer = setTimeout(() => {\n      timer = null; // Unlock for the next burst\n      \n      // Execute only if trailing is enabled and leading hasn't already executed\n      if (trailing && !leading) {\n         fn.apply(context, args);\n      }\n      // Note: If both leading and trailing are true, the trailing part is often skipped\n      // or implemented with more complexity to avoid double firing. \n      // For simplicity, we execute trailing only if leading is false.\n    }, wait);\n  };\n}\n\n// Example 1: Trailing (Standard Debounce)\nconst logTrailing = debounce((m) => console.log('Trailing:', m), 500, { leading: false });\nlogTrailing(1); logTrailing(2); logTrailing(3); \n// Output: Trailing: 3 (after 500ms)\n\n// Example 2: Leading\nconst logLeading = debounce((m) => console.log('Leading:', m), 500, { leading: true, trailing: false });\nlogLeading(4); logLeading(5); logLeading(6); \n// Output: Leading: 4 (immediately, then suppressed)\n",
    output: "Leading: 4\nTrailing: 3 (after 500ms)",
  },
  {
    id: 92,
    title: "MapLimit (Controlling Concurrency)",
    explanation:
      "`MapLimit` is a utility that limits the maximum number of asynchronous operations running at any given time. It takes a list of tasks and a concurrency limit (`limit`), ensuring tasks are processed efficiently without overwhelming system resources or rate limits.\n\n### Approach\n1.  Initialize a pool of tasks running up to the `limit` using `Promise.all()`.\n2.  Use a queue or recursion to feed the next pending task into the pool as soon as one slot becomes free (i.e., one promise resolves).\n3.  Collect all results in the correct original order.",
    tips: '"Interview Tips / Pitfalls"\n* This question tests advanced Promise management beyond `Promise.all()`.\n* The key challenge is maintaining concurrency while preserving the order of results.\n* A simpler, common approach is to use `Array.reduce` to build a promise chain that executes the next task when the previous one is done, but this is **sequential** (Q83), not concurrent.',
    codeString:
      "// Simple mock task that returns its index after a delay\nconst createAsyncTask = (i) => new Promise(resolve => {\n  const delay = Math.random() * 500;\n  setTimeout(() => resolve(`Result ${i}`), delay);\n});\n\n// MapLimit implementation (Conceptual, showing the recursive loop pattern)\nfunction mapLimit(items, limit, asyncFunction) {\n  const results = [];\n  let index = 0;\n  \n  // Recursive function that runs one task and schedules the next\n  const runTask = () => {\n    if (index >= items.length) return Promise.resolve();\n    \n    const currentItem = items[index++];\n    \n    return asyncFunction(currentItem)\n      .then(result => {\n        results.push(result); // Store result (order must be maintained externally)\n        return runTask(); // Run the next task\n      })\n  };\n  \n  // Start the initial 'limit' number of concurrent tasks\n  const initialTasks = Array(limit).fill(0).map(runTask);\n  \n  return Promise.all(initialTasks).then(() => results);\n}\n\nconst items = [0, 1, 2, 3, 4, 5, 6, 7];\n\nmapLimit(items, 3, createAsyncTask).then(results => {\n  // Note: Actual implementation would need to handle result order carefully\n  console.log('Finished processing with limit of 3. Total results:', results.length);\n});\n",
    output:
      "Finished processing with limit of 3. Total results: 8 (Execution time is reduced vs. sequential)",
  },
  {
    id: 94,
    title: "Cancelable Promise (using AbortController)",
    explanation:
      "A standard Promise is *not* inherently cancelable. Once started, it must either resolve or reject. However, modern asynchronous operations, especially `fetch`, can be canceled using the **`AbortController`** interface.\n\n### Implementation\n1.  The cancellation mechanism (`AbortController`) is external to the Promise logic.\n2.  The Promise is modified to accept the `signal` from the controller.\n3.  The asynchronous operation (e.g., `fetch`) must natively support the signal.\n4.  A canceled operation causes the Promise to reject with an `AbortError`.",
    tips: '"Interview Tips / Pitfalls"\n* This demonstrates knowledge of modern browser APIs and clean-up in asynchronous operations.\n* Emphasize that the *promise chain* itself is not being canceled, but the underlying asynchronous **work** is stopped, leading to a rejection.\n* This pattern is crucial in React\'s `useEffect` for data fetching cleanup.',
    codeString:
      "function fetchWithCancellation(url, signal) {\n  return new Promise(async (resolve, reject) => {\n    // 1. Add listener for abortion\n    signal.addEventListener('abort', () => {\n      reject(new Error('Operation aborted'));\n    });\n\n    try {\n      // 2. Pass signal to fetch\n      const response = await fetch(url, { signal });\n      const data = await response.json();\n      resolve(data);\n    } catch (error) {\n      if (error.name === 'AbortError') {\n        // Handle native AbortError (e.g., in a fetch call)\n        reject(new Error('Operation aborted by user'));\n      } else {\n        reject(error);\n      }\n    }\n  });\n}\n\n// --- Usage ---\nconst controller = new AbortController();\nconst mockUrl = 'https://mockapi.com/data';\n\nconst p = fetchWithCancellation(mockUrl, controller.signal);\n\n// Cancel the operation after 100ms\nsetTimeout(() => {\n  controller.abort();\n  console.log('Cancellation signal sent.');\n}, 100);\n\np.catch(err => {\n  console.error('Promise caught:', err.message);\n});\n",
    output:
      "Cancellation signal sent.\nPromise caught: Operation aborted by user",
  },
  {
    id: 95,
    title: "LRU Cache Implementation (for Typeahead)",
    explanation:
      "A **Least Recently Used (LRU) Cache** is a simple yet effective caching strategy. When the cache reaches its capacity, the item that hasn't been accessed for the longest time is evicted to make room for the new item.\n\n### Data Structures\n1.  **`Map` (for fast lookup):** Stores the key-value pairs (e.g., `search_term` -> `results`). Lookups are O(1).\n2.  **`Doubly Linked List` (or `Map` insertion order):** Used to maintain the access order. When an item is accessed or added, it moves to the 'Most Recently Used' end.\n\nUsing a modern **`Map`** is often sufficient as its iteration order is guaranteed to be insertion order, mimicking the eviction policy.",
    tips: "\"Interview Tips / Pitfalls\"\n* The key operation is **access** (`get`): The item must be deleted and re-inserted to move it to the 'Most Recently Used' position.\n* **Capacity Check:** The cache size must be checked on every `set` operation. If capacity is exceeded, the oldest (first item in the Map) is evicted.",
    codeString:
      "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map(); // Map preserves insertion order\n  }\n\n  get(key) {\n    if (!this.cache.has(key)) return -1; \n    \n    const value = this.cache.get(key);\n    // Re-insert to mark as 'Most Recently Used' (moves it to the end)\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n\n  set(key, value) {\n    // If key exists, treat as access + update (move to end)\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    }\n\n    // Check if capacity is exceeded\n    if (this.cache.size >= this.capacity) {\n      // Evict the LRU item (the first key in the Map)\n      const lruKey = this.cache.keys().next().value;\n      this.cache.delete(lruKey);\n      console.log(`Cache full. Evicted: ${lruKey}`);\n    }\n\n    this.cache.set(key, value);\n  }\n}\n\nconst cache = new LRUCache(3);\ncache.set('a', 1); // [a]\ncache.set('b', 2); // [a, b]\ncache.set('c', 3); // [a, b, c]\ncache.get('a');    // [b, c, a] ('a' is now MRU)\ncache.set('d', 4); // [b, c, a] -> Evict 'b' -> [c, a, d]\n\nconsole.log('Cache Keys:', Array.from(cache.cache.keys()));\nconsole.log('Value for B (Evicted):', cache.get('b'));\n",
    output:
      "Cache full. Evicted: b\nCache Keys: [c, a, d]\nValue for B (Evicted): -1",
  },
  {
    id: 96,
    title: "Deep Clone Methods: Recursion vs JSON.stringify",
    explanation:
      "Deep cloning ensures a new, fully independent copy of an object and all its nested structures, preventing reference issues.\n\n### 1. Recursive Solution (Pure JS)\nUses recursion and a **WeakMap** to handle nested objects, arrays, and critically, **circular references**.\n\n### 2. `JSON.parse(JSON.stringify(obj))`\nFast and simple for plain data, but **fails silently** on several key data types:\n* **Functions** are stripped.\n* **`Date`** objects become strings (losing their prototype).\n* **`undefined`** is stripped.\n* **Circular references** throw an error.",
    tips: '"Interview Tips / Pitfalls"\n* **Circular Reference Trap:** Demonstrate using a WeakMap in the recursive solution to track visited objects and prevent infinite loops.\n* **Modern API:** Always mention **`structuredClone()`** as the modern, safest native API for deep copying JSON-safe values, Dates, Maps, etc., without needing a custom recursive function.\n* **Array Handling:** Ensure the recursive function correctly identifies and handles arrays (`Array.isArray`).',
    codeString:
      "function deepClone(original, cache = new WeakMap()) {\n  if (original === null || typeof original !== 'object') return original;\n  \n  // CRUCIAL: Handle circular references\n  if (cache.has(original)) return cache.get(original);\n\n  const clone = Array.isArray(original) ? [] : {};\n  cache.set(original, clone);\n\n  for (const key in original) {\n    if (Object.prototype.hasOwnProperty.call(original, key)) {\n      clone[key] = deepClone(original[key], cache);\n    }\n  }\n  return clone;\n}\n\nconst original = { id: 1, date: new Date(), func: () => 0 };\noriginal.self = original; // Circular Reference\n\n// 1. JSON Method Test\nconst jsonResult = JSON.parse(JSON.stringify(original));\nconsole.log('JSON.stringify Failed:', jsonResult.date, jsonResult.func);\n\n// 2. Recursive Method Test\nconst recursiveResult = deepClone(original);\nconsole.log('Recursive Date Check:', recursiveResult.date instanceof Date);\nconsole.log('Recursive Circular Check:', recursiveResult.self === recursiveResult);\n",
    output:
      "JSON.stringify Failed: 2025-11-18T...Z undefined\nRecursive Date Check: true\nRecursive Circular Check: true",
  },
  {
    id: 97,
    title: "React DOM Rendering Process (The Three Phases)",
    explanation:
      "The React rendering pipeline is split into three phases: **Trigger**, **Render**, and **Commit**. This ensures updates are batched and the DOM is only manipulated once per update cycle, maximizing efficiency.\n\n### 1. Trigger\nAn update is initiated by a component's state change (e.g., `setState`, `useState` setter, `useReducer` dispatch) or a prop change from the parent.\n\n### 2. Render (Reconciliation)\nReact performs its calculations in memory:\n* It calls the component functions (`render` method or function body).\n* It generates a new element tree (Virtual DOM).\n* It compares the **New VDOM** with the **Previous VDOM** using the **Diffing Algorithm** (Q16) to find minimal changes (the 'patch').\n* This phase can be paused or interrupted (allowing concurrent rendering).\n\n### 3. Commit\nReact applies the changes found in the Diffing phase to the actual browser DOM. This phase is synchronous and blocking, as it directly manipulates the browser's view:\n* React updates the real DOM nodes.\n* The browser performs the final paint.\n* Lifecycle effects run (`useEffect`, `componentDidMount/Update`).",
    tips: '"Interview Tips / Pitfalls"\n* The key takeaway is the separation: **Render is pure and happens in memory; Commit is impure and touches the DOM.**\n* Explain that state updates **don\'t guarantee an immediate DOM update** because of the reconciliation process and potential batching.\n* Emphasize that the Render phase must be **pure** (no side effects, no direct DOM access, no mutating state).',
    codeString:
      "function Component() {\n  const [count, setCount] = React.useState(0);\n  \n  // Phase 1: Trigger (User action calls setter)\n  const handleClick = () => setCount(c => c + 1);\n\n  // Phase 2: Render (Function executes, JSX is generated/compared)\n  console.log('Rendering component...');\n\n  // Phase 3: Commit (Effect runs after DOM updates)\n  React.useEffect(() => {\n    console.log('Commit Phase: DOM update is visible now.');\n  }, [count]);\n\n  return <button onClick={handleClick}>Click</button>;\n}\n",
    output:
      "Rendering component...\nCommit Phase: DOM update is visible now. (The order repeats on subsequent clicks)",
  },
  {
    id: 99,
    title: "Retry Promises N Times",
    explanation:
      "When dealing with unreliable network calls, implementing a retry mechanism ensures the application can recover from transient failures (e.g., temporary network glitches, rate limiting). The function should attempt the asynchronous task up to a maximum number of times before finally giving up.\n\n### Approach\n1.  Use a **recursive** function that takes the current attempt count.\n2.  Call the original function/promise.\n3.  If successful (`.then()`), resolve the outer promise.\n4.  If it fails (`.catch()`):\n    * If attempts remaining, wait for a delay (often with backoff) and call the function recursively.\n    * If no attempts remain, reject the outer promise.",
    tips: '"Interview Tips / Pitfalls"\n* Mention **Exponential Backoff**: This is the best practice for retry mechanisms, where the delay time increases after each failure (e.g., 1s, 2s, 4s, 8s). This prevents overwhelming the server.\n* Ensure the final rejection passes the original error reason.',
    codeString:
      "let attemptCount = 0;\n\n// Mock API that fails 3 times, succeeds on the 4th\nfunction mockApiCall() {\n  attemptCount++;\n  console.log(`Attempt ${attemptCount} made...`);\n  if (attemptCount < 4) {\n    return Promise.reject(new Error('Transient Network Failure'));\n  }\n  return Promise.resolve('Success!');\n}\n\nfunction retryPromise(fn, retries = 3, delay = 100) {\n  return new Promise((resolve, reject) => {\n    function attempt(currentAttempt) {\n      fn()\n        .then(resolve) // Success: resolve immediately\n        .catch(error => {\n          if (currentAttempt < retries) {\n            console.log(`Retry attempt ${currentAttempt + 1} scheduled after ${delay}ms`);\n            // Backoff logic: increase delay for next attempt\n            const nextDelay = delay * 2;\n            setTimeout(() => attempt(currentAttempt + 1), nextDelay);\n          } else {\n            // Failure: reject after max retries\n            reject(new Error(`Failed after ${retries} attempts: ${error.message}`));\n          }\n        });\n    }\n    attempt(0);\n  });\n}\n\nretryPromise(mockApiCall, 5, 50).then(result => {\n  console.log('FINAL RESULT:', result);\n}).catch(err => {\n  console.error('FINAL ERROR:', err.message);\n});\n",
    output:
      "Attempt 1 made...\nRetry attempt 1 scheduled after 100ms\nAttempt 2 made...\nRetry attempt 2 scheduled after 200ms\nAttempt 3 made...\nRetry attempt 3 scheduled after 400ms\nAttempt 4 made...\nFINAL RESULT: Success!",
  },
];
