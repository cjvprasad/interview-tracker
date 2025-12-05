const interviewQuestions = [
  // JS CORE
  {
    id: 1,
    title: "bind(), call(), vs apply() (Complete Guide)",
    category: "JavaScript Core",
    explanation:
      "All three methods are used to explicitly set 'this' inside a function. Call/Apply execute immediately, Bind returns a new function.",
    tips: "Key takeaway: Call/Apply execute immediately; Bind returns a new function (permanent binding).",
    codeString: "function greet() { /* ... */ }",
    output: "Hello, Jay...",
  },
  {
    id: 7,
    title: "Closures — explanation and example",
    category: "JavaScript Core",
    explanation:
      "A closure retains access to variables from its parent scope, even after the parent function has finished executing.",
    tips: "Explain memory considerations and data privacy.",
    codeString: "function makeCounter() { /* ... */ }",
    output: "Initial: 10\nAfter Increment: 11",
  },
  {
    id: 8,
    title: "Hoisting (var vs let/const, function declarations)",
    category: "JavaScript Core",
    explanation:
      "Hoisting moves declarations to the top of their scope. `var` is initialized to undefined; `let`/`const` enter the Temporal Dead Zone (TDZ).",
    tips: "Emphasize TDZ and ReferenceError.",
    codeString: "console.log(a); var a = 2;",
    output: "A is: undefined\nB is: ReferenceError",
  },
  {
    id: 10,
    title: "Spread vs Rest Operator (`...`)",
    category: "JavaScript Core",
    explanation:
      "Spread expands iterables; Rest collects remaining elements into an array/object.",
    tips: "Rest must be the last parameter/destructured item. Both create a shallow copy.",
    codeString: "function sum(x, ...rest) { /* ... */ }",
    output: "X: 1\nRest: [2, 3, 4]",
  },
  {
    id: 30,
    title: "JavaScript Variable Scope (Global, Function, Block)",
    category: "JavaScript Core",
    explanation:
      "Defines visibility: Global, Function (`var`), and Block (`let`/`const`). Based on Lexical Scoping.",
    tips: "Contrast `var` leakage with block-scoped `let`/`const`.",
    codeString: "function scopeDemo() { /* ... */ }",
    output: "Inside Block: D\nOutside Block, Var: C",
  },
  {
    id: 31,
    title: "Key ES6+ (ECMAScript 2015) Features",
    category: "JavaScript Core",
    explanation:
      "Introduced `let`/`const`, Arrow functions, Promises, Destructuring, and Classes.",
    tips: "Mention classes are syntactic sugar over prototypal inheritance.",
    codeString: "const welcome = (name) => `Hello ${name}`;",
    output: "Hello Lexi, you are 25 years old.\nN/A",
  },
  {
    id: 32,
    title: "JavaScript Class Example (OOP)",
    category: "JavaScript Core",
    explanation:
      "ES6 `class` syntax uses `constructor` and methods on the prototype for prototypal inheritance.",
    tips: "Discuss `#` for private fields and `super()`.",
    codeString: "class Car { /* ... */ }",
    output: "Refueled 20L.\nRange: 300 km",
  },
  {
    id: 33,
    title: "Functional vs Object-Oriented Programming (FP vs OOP)",
    category: "JavaScript Core",
    explanation:
      "OOP focuses on mutable state and objects; FP focuses on pure functions and immutability.",
    tips: "Define Pure Functions: same input = same output, no side effects.",
    codeString: "class Account { /* ... */ }",
    output: "OOP: 15, FP: 15",
  },
  {
    id: 49,
    title: "The `this` Keyword in JavaScript",
    category: "JavaScript Core",
    explanation:
      "The value of `this` is determined dynamically by *how* a function is called (call-site), except for arrow functions (lexical binding).",
    tips: "Cover Default, Implicit, Explicit, New, and Lexical binding rules.",
    codeString: '"use strict"; function getThis() { /* ... */ }',
    output: "Default: undefined\nImplicit: Context A",
  },
  {
    id: 50,
    title: "Lexical Environment (JS Internals)",
    category: "JavaScript Core",
    explanation:
      "Internal object managing variable scoping, consisting of an Environment Record and an Outer Environment Reference (the foundation of Closures).",
    tips: "Connect Lexical Environment directly to how Closures work.",
    codeString: "function outer() { /* ... */ }",
    output: "10",
  },
  {
    id: 51,
    title: "let vs var vs const (Scope and Hoisting)",
    category: "JavaScript Core",
    explanation:
      "Comparison of scoping (function vs block), hoisting behavior (undefined vs TDZ), and re-assignment rules.",
    tips: "Prefer `const`, use `let` when reassignment is necessary, avoid `var`.",
    codeString: "const user = { /* ... */ };",
    output: "Bob\nRebinding error: TypeError",
  },
  {
    id: 52,
    title: "Temporal Dead Zone (TDZ)",
    category: "JavaScript Core",
    explanation:
      "The period where `let`/`const` exist but cannot be accessed before initialization, resulting in a `ReferenceError`.",
    tips: "TDZ is temporal, not spatial. Prevents `var`'s confusing `undefined` behavior.",
    codeString: "function testTDZ() { /* ... */ }",
    output: "Error: ReferenceError\nSuccess: Initialized",
  },
  {
    id: 53,
    title: "Exposing Function-Scoped Variables Globally",
    category: "JavaScript Core",
    explanation:
      "Requires explicit attachment to the global object (`window` or `globalThis`). Generally considered poor practice.",
    tips: "Use modules (`import/export`) or single namespace objects instead.",
    codeString: "(function() { /* ... */ })();",
    output: "Run this in a browser to see the output.",
  },
  {
    id: 75,
    title: "Event Delegation",
    category: "JavaScript Core",
    explanation:
      "Attaching one listener to a parent element to manage events on many children, improving performance and supporting dynamic elements.",
    tips: "Requires understanding event bubbling and using `event.target`.",
    codeString: 'document.querySelector("#parent").addEventListener(/* ... */)',
    output: 'Clicking any <li> logs: "Child clicked: A" (or B or C)',
  },
  {
    id: 76,
    title: "Currying",
    category: "JavaScript Core",
    explanation:
      "Transforms a function taking multiple arguments into a sequence of functions, each taking one argument.",
    tips: "Used for partial application and demonstrated via closures and recursion.",
    codeString: "function curry(fn) { /* ... */ }",
    output: "All calls result in: 6",
  },
  {
    id: 80,
    title: "Chain Calculator (Method Chaining)",
    category: "JavaScript Core",
    explanation:
      "Fluent interface pattern where each method returns `this` to allow the next method to be called sequentially.",
    tips: "Key is `return this` in every method.",
    codeString: "class Calculator { /* ... */ }",
    output: "Chained Result: 20",
  },
  {
    id: 81,
    title: "Pipe and Compose (Functional Composition)",
    category: "JavaScript Core",
    explanation:
      "Combining functions: Pipe (L->R via reduce) and Compose (R->L via reduceRight).",
    tips: "Pipe is often preferred for readability (execution order).",
    codeString: "function pipe(...fns) { /* ... */ }",
    output: "Pipe Result: 484\nCompose Result: 201",
  },
  {
    id: 84,
    title: "Prototype and Prototype Inheritance",
    category: "JavaScript Core",
    explanation:
      "JS uses prototypal inheritance: objects inherit properties via the `[[Prototype]]` link.",
    tips: "Distinguish public `prototype` (on function) from internal `[[Prototype]]` (on instance).",
    codeString: "function Animal(name) { /* ... */ }",
    output:
      "Bingo has makeSound: Yes (inherited)\nBingo's prototype link is: true",
  },
  {
    id: 86,
    title: "Event Emitter (Pub/Sub with `once`)",
    category: "JavaScript Core",
    explanation:
      "Implements Publish-Subscribe using `on`, `off`, `emit`, and `once` (wrapper that removes itself).",
    tips: "Uses a Map to store event listeners.",
    codeString: "class EventEmitter { /* ... */ }",
    output: "Once: 1\nAlways: 1\nAlways: 2",
  },

  // REACT FUNDAMENTALS
  {
    id: 11,
    title: "React Hooks: useEffect, useMemo, useCallback (Overview)",
    category: "React Fundamentals",
    explanation:
      "Hooks manage side-effects (`useEffect`) and performance (`useMemo`, `useCallback`).",
    tips: "Dependencies are crucial to prevent stale closures.",
    codeString: "function HooksOverview({ a, b }) { /* ... */ }",
    output: "Conceptual overview of hooks.",
  },
  {
    id: 12,
    title: "Custom Hooks — what and example",
    category: "React Fundamentals",
    explanation:
      "JS functions starting with `use` that encapsulate stateful logic for reuse between components.",
    tips: "Use cleanup functions to prevent memory leaks.",
    codeString: "function useFetch(url) { /* ... */ }",
    output: "This hook returns { data, loading, error }...",
  },
  {
    id: 14,
    title: "Reconciliation, Virtual DOM, and Diffing",
    category: "React Fundamentals",
    explanation:
      "VDOM is in-memory representation. Reconciliation/Diffing compares VDOM trees to find minimal DOM changes (O(n)).",
    tips: "Stable keys are essential for efficient diffing when lists change order.",
    codeString: "function List({ items }) { /* ... */ }",
    output: "Renders a list using stable keys for efficient updates.",
  },
  {
    id: 24,
    title: "Class vs Functional Components",
    category: "React Fundamentals",
    explanation:
      "Functional components (with Hooks) are the modern standard, replacing lifecycle methods with `useEffect` and simplifying `this` binding.",
    tips: "Hooks allow stateful logic extraction via Custom Hooks.",
    codeString: "function WelcomeFunctional() { /* ... */ }",
    output: "Conceptual React code.",
  },
  {
    id: 25,
    title: "Class Component Lifecycle Methods",
    category: "React Fundamentals",
    explanation:
      "Lifecycle stages: Mounting (`componentDidMount`), Updating (`componentDidUpdate`), Unmounting (`componentWillUnmount`). Now replaced by `useEffect`.",
    tips: "Side effects must be in mount/update/effect, never `render`.",
    codeString: "function MyTimer() { /* ... */ }",
    output: "Conceptual React code.",
  },
  {
    id: 26,
    title: "Commonly Used React Hooks",
    category: "React Fundamentals",
    explanation:
      "Overview of `useState`, `useEffect`, `useRef`, `useContext`, and `useReducer`.",
    tips: "Use `useReducer` for complex state transitions.",
    codeString: "function HookDemo() { /* ... */ }",
    output: "Conceptual React code.",
  },
  {
    id: 27,
    title: "Syntax and Behavior of useEffect (Deep Dive)",
    category: "React Fundamentals",
    explanation:
      "Controls side effects based on dependency array (`[]` for mount/unmount). Return function handles cleanup.",
    tips: "Cleanup runs before re-run and on unmount.",
    codeString: "function Timer() { /* ... */ }",
    output:
      "Run in a React environment. Logs 'Cleanup: interval cleared' on unmount.",
  },
  {
    id: 28,
    title: "Dependency Array Best Practices and Stale Closures",
    category: "React Fundamentals",
    explanation:
      "The dependency array prevents **stale closures** by ensuring effect logic uses current state/props. Use `useCallback`/`useMemo` to stabilize dependencies.",
    tips: "If a value is used in the hook, it must be in the dependency array.",
    codeString: "function StaleClosureDemo() { /* ... */ }",
    output: "Run in a React environment. Logs only when 'count' updates.",
  },
  {
    id: 29,
    title: "React Fragments",
    category: "React Fundamentals",
    explanation:
      "Allows returning multiple sibling elements without adding an unnecessary wrapper DOM node.",
    tips: "Use full `<React.Fragment key={...}>` syntax when keys are needed in lists.",
    codeString: "function TableRows({ data }) { /* ... */ }",
    output: "Renders table data without extra wrapper elements.",
  },
  {
    id: 34,
    title: "Parent-Child Re-render Behavior and Optimization",
    category: "React Fundamentals",
    explanation:
      "Parent re-render causes all children to re-render by default. Use `React.memo` (props shallow comparison) and `useMemo`/`useCallback` (stable references) to optimize.",
    tips: "Memoization works best when used with stable props.",
    codeString: "const Child = React.memo(function Child() { /* ... */ });",
    output: "Logs 'Child rendered...' only when Data changes.",
  },
  {
    id: 35,
    title: "Redux (and Redux Toolkit)",
    category: "React Fundamentals",
    explanation:
      "Predictable state container using unidirectional flow (Action -> Reducer -> Store). RTK is the modern standard.",
    tips: "Reducers must be pure and immutable.",
    codeString: "// Conceptual Redux Toolkit Code",
    output: "Conceptual Redux Toolkit code.",
  },
  {
    id: 36,
    title: "Context API vs Redux",
    category: "React Fundamentals",
    explanation:
      "Context is simpler, best for infrequent updates (theme). Redux is better for complex, frequently updated global state due to optimized re-rendering.",
    tips: "Context re-renders *all* consumers when its value changes.",
    codeString: "const ThemeContext = React.createContext('light');",
    output: "Conceptual React Context code.",
  },
  {
    id: 40,
    title: "Show/Hide Div Button Example (React)",
    category: "React Fundamentals",
    explanation:
      "Toggling visibility using `useState` and conditional rendering (`&&`). Removes element from DOM.",
    tips: "Use CSS hiding (`opacity: 0`) if element must remain in the DOM.",
    codeString: "function ToggleContent() { /* ... */ }",
    output: "Run in a React environment. Clicking toggles visibility.",
  },
  {
    id: 54,
    title: "React: `React.memo` vs `useMemo`",
    category: "React Fundamentals",
    explanation:
      "`React.memo` caches **component output** (based on props); `useMemo` caches a **computed value** (based on dependencies).",
    tips: "Use memoization only when profiling indicates a need.",
    codeString: "const Display = React.memo(({ value }) => { /* ... */ });",
    output: "Conceptual React code demonstrating memoization.",
  },
  {
    id: 55,
    title: "componentWillUnmount Equivalent in Functional Components",
    category: "React Fundamentals",
    explanation:
      "Cleanup logic is handled by the **return function** inside `useEffect`. Runs on unmount and before the next effect run.",
    tips: "Crucial for clearing timers (`clearInterval`) and unregistering listeners.",
    codeString: "function Logger() { /* ... */ }",
    output: "Component Unmounting: Clearing log interval.",
  },
  {
    id: 56,
    title: "Expand/Collapse Nested Folder Algorithm (Conceptual)",
    category: "React Fundamentals",
    explanation:
      "Tree structure managed via central state and rendered using recursion. Children are conditionally rendered based on `isOpen` state.",
    tips: "Requires stable, unique keys and is a classic recursion challenge.",
    codeString: "function TreeNode({ node, onToggle }) { /* ... */ }",
    output: "Conceptual React code for a recursive tree view.",
  },
  {
    id: 70,
    title: "Complex React Component Task (State Machine Logic)",
    category: "React Fundamentals",
    explanation:
      "Managing asynchronous transitions and multiple dependent states within a single component using `useState`, `useEffect`, and `useCallback`.",
    tips: "Use a local flag or `AbortController` to handle race conditions/cleanup inside `useEffect`.",
    codeString: "function ComplexButton() { /* ... */ }",
    output: "Conceptual React code for a complex state component.",
  },
  {
    id: 92,
    title: "React DOM Rendering Process (The Three Phases)",
    category: "React Fundamentals",
    explanation:
      "The lifecycle phases: Trigger (state/props change), Render (VDOM diffing in memory), and Commit (DOM update and effects run).",
    tips: "Render phase must be pure; Commit phase is blocking and touches the DOM.",
    codeString: "function Component() { /* ... */ }",
    output: "Rendering component...\nCommit Phase: DOM update is visible now.",
  },

  // ASYNCHRONICITY & PROMISES
  {
    id: 9,
    title: "Event Loop, Microtasks vs Macrotasks",
    category: "Asynchronicity & Promises",
    explanation:
      "Mechanism for non-blocking operations. Priority: Stack > Microtasks (Promises) > Macrotasks (Timers).",
    tips: "A 0ms `setTimeout` (macrotask) runs after `Promise.resolve().then()` (microtask).",
    codeString: "console.log('1. Start (Sync)');",
    output: "1. Start (Sync)\n2. End (Sync)\n3. Promise (Microtask)",
  },
  {
    id: 18,
    title: "async/await vs Promises",
    category: "Asynchronicity & Promises",
    explanation:
      "`async`/`await` is syntactic sugar over Promises, offering synchronous-looking code using `try...catch` for error handling.",
    tips: "Avoid using `await` in loops for parallel tasks; use `Promise.all()` instead.",
    codeString: "async function loadData() { /* ... */ }",
    output: "Promise success: Resolved Data\nAsync error: API Failed",
  },
  {
    id: 42,
    title: "Callback vs Promise APIs — differences & migration",
    category: "Asynchronicity & Promises",
    explanation:
      "Promises fix Callback Hell by using chaining (`.then`) and standardized error handling (`.catch`). Promisify converts callback functions to return Promises.",
    tips: "Promises are highly composable; callbacks lead to nested 'pyramid of doom'.",
    codeString: "function promisify(callbackFn) { /* ... */ }",
    output: "Conceptual code showing callback vs promise migration.",
  },
  {
    id: 43,
    title: "Modern Data Fetching with `fetch` and `async/await`",
    category: "Asynchronicity & Promises",
    explanation:
      "`fetch` resolves on 404/500 statuses. Manual check (`if (!res.ok) throw...`) is required to treat HTTP errors as promise rejections.",
    tips: "Always check `res.ok` after `await fetch()`.",
    codeString: "async function getFruits() { /* ... */ }",
    output: "Conceptual function for robust data fetching.",
  },
  {
    id: 44,
    title: "Axios vs Fetch",
    category: "Asynchronicity & Promises",
    explanation:
      "Axios rejects automatically on 4xx/5xx status and includes interceptors. Native `fetch` requires manual error checking.",
    tips: "Axios Interceptors are a major benefit for global auth/error handling.",
    codeString: "// Requires Axios library to run",
    output: "Conceptual Axios code.",
  },
  {
    id: 72,
    title: "Event Loop Ordering (Microtask vs Macrotask)",
    category: "Asynchronicity & Promises",
    explanation:
      "Detailed example proving the priority order: Synchronous Code > Microtask Queue > Macrotask Queue.",
    tips: "Microtasks empty completely before the next macrotask is processed.",
    codeString: "console.log('1'); setTimeout(()=>console.log('2'));",
    output: "1\n4\n3\n2",
  },
  {
    id: 77,
    title: "Promise Static Methods (Complete Set & Parallel Execution)",
    category: "Asynchronicity & Promises",
    explanation:
      "Overview of `.all()`, `.race()`, `.allSettled()`, and `.any()`. `.all()` is used for parallel execution.",
    tips: "`.all` fails fast; `.allSettled` gathers all results/reasons.",
    codeString: "Promise.all([delay(100), delay(400)])",
    output: "Promise.race Result: 2\nPromise.reject: Error!",
  },
  {
    id: 79,
    title: "Promises in Sequence (Sequential Execution)",
    category: "Asynchronicity & Promises",
    explanation:
      "Using `Array.prototype.reduce()` to chain promises, ensuring execution only proceeds after the previous one resolves.",
    tips: "Crucial for dependency-based tasks or rate limiting.",
    codeString: "function executeSequentially(asyncFns) { /* ... */ }",
    output:
      "Task: Task A resolved after 100ms\nTask: Task B resolved after 50ms",
  },
  {
    id: 88,
    title: "MapLimit (Controlling Concurrency)",
    category: "Asynchronicity & Promises",
    explanation:
      "Utility to limit the maximum number of asynchronous operations running simultaneously using recursion and Promise pooling.",
    tips: "Tests advanced Promise management beyond basic `Promise.all`.",
    codeString: "function mapLimit(items, limit, asyncFunction) { /* ... */ }",
    output: "Finished processing with limit of 3. Total results: 8",
  },
  {
    id: 89,
    title: "Cancelable Promise (using AbortController)",
    category: "Asynchronicity & Promises",
    explanation:
      "How to stop an ongoing asynchronous task (`fetch`) using `AbortController` and its `signal`.",
    tips: "Best practice for cleanup in React `useEffect` to avoid race conditions/memory leaks.",
    codeString: "function fetchWithCancellation(url, signal) { /* ... */ }",
    output:
      "Cancellation signal sent.\nPromise caught: Operation aborted by user",
  },
  {
    id: 93,
    title: "Retry Promises N Times",
    category: "Asynchronicity & Promises",
    explanation:
      "Recursive function implementation to automatically retry a failing promise up to N times, often using exponential backoff.",
    tips: "Crucial for handling transient network failures.",
    codeString: "function retryPromise(fn, retries, delay) { /* ... */ }",
    output: "Attempt 1 made...\nFINAL RESULT: Success!",
  },

  // PERFORMANCE & OPTIMIZATION
  {
    id: 23,
    title: "React: useMemo and useCallback in practice (Deep Dive)",
    category: "Performance & Optimization",
    explanation:
      "Deep dive into memoizing values (`useMemo`) and function references (`useCallback`) to avoid unnecessary re-renders in optimized child components (`React.memo`).",
    tips: "Stabilizing function/object references is key to effective memoization.",
    codeString: "function ParentComponent({ items, filterText }) { /* ... */ }",
    output:
      "Run in React environment. Logs 'Filtering list...' only when inputs change.",
  },
  {
    id: 39,
    title: "Memoization (Concept and Implementation)",
    category: "Performance & Optimization",
    explanation:
      "Caching results of expensive function calls based on input arguments (using a Map/closure) to prevent recalculation.",
    tips: "Show custom `memoize` helper function structure.",
    codeString: "function memoize(fn) { /* ... */ }",
    output: "Cache miss, calculating...\nCache hit for key: [1,2]",
  },
  {
    id: 66,
    title: "Optimizing CSS Loading",
    category: "Performance & Optimization",
    explanation:
      'Minimizing Render Blocking CSS by inlining Critical CSS and loading remaining styles asynchronously (using `rel="preload"`).',
    tips: "Prevents Flash of Unstyled Content (FOUC).",
    codeString: "<!-- 1. Inline Critical CSS -->",
    output: "Conceptual HTML for optimal CSS delivery.",
  },
  {
    id: 74,
    title: "Debounce vs Throttle (JS and React-Safe Implementation)",
    category: "Performance & Optimization",
    explanation:
      "Debounce waits for quiet; Throttle limits execution rate. Essential for input handling and resource-heavy events.",
    tips: "Must extract values from React Synthetic Events before delay.",
    codeString: "// --- 1. Debounce (JS Standard) ---",
    output: "Throttled: A\nDebounced: 3 (after 500ms)",
  },
  {
    id: 87,
    title: "Debouncing with Leading and Trailing Options",
    category: "Performance & Optimization",
    explanation:
      "Advanced debounce allowing execution on the *first* event (leading edge) or the *last* event (trailing edge).",
    tips: "Leading edge requires checking if `timer` is `null`.",
    codeString: "function debounce(fn, wait, options) { /* ... */ }",
    output: "Leading: 4\nTrailing: 3 (after 500ms)",
  },
  {
    id: 90,
    title: "LRU Cache Implementation (for Typeahead)",
    category: "Performance & Optimization",
    explanation:
      "Caching strategy where the least recently used item is evicted when capacity is reached (best implemented with `Map` for order preservation).",
    tips: "Accessing an item requires deletion and re-insertion to move it to the MRU position.",
    codeString: "class LRUCache { /* ... */ }",
    output: "Cache full. Evicted: b\nCache Keys: [c, a, d]",
  },

  // BROWSER & WEB APIS
  {
    id: 3,
    title: "LocalStorage vs SessionStorage vs Cookies",
    category: "Browser & Web APIs",
    explanation:
      "Comparison of storage mechanisms based on scope, lifetime, capacity, and HTTP transmission.",
    tips: "Cookies are sent on every request (small capacity); localStorage is persistent (large capacity).",
    codeString: "// localStorage",
    output: "Local Storage Theme: dark\nSession Storage ID: abc123",
  },
  {
    id: 4,
    title: "Types of Cookies and Expiration",
    category: "Browser & Web APIs",
    explanation:
      "Session vs Persistent cookies, HttpOnly (security), Secure (HTTPS only), and SameSite (CSRF mitigation).",
    tips: "SameSite (Lax/Strict) prevents cross-site request forgery.",
    codeString: "// 1. Session Cookie",
    output: "Requires browser console/network tab inspection...",
  },
  {
    id: 5,
    title: "Storage Sizes: localStorage vs sessionStorage vs Cookies",
    category: "Browser & Web APIs",
    explanation:
      "Web storage is 5-10MB; Cookies are limited to ~4KB per cookie.",
    tips: "Cookies overhead affects every request header.",
    codeString: 'console.log("Maximum storage capacity...");',
    output: "Maximum storage capacity is roughly 5MB...",
  },
  {
    id: 6,
    title: "Normal Cookie vs HttpOnly Cookie",
    category: "Browser & Web APIs",
    explanation:
      "HttpOnly cookies are inaccessible to client-side JavaScript, mitigating XSS attacks.",
    tips: "HttpOnly must be set by the server.",
    codeString: 'console.log("HttpOnly cookies cannot be accessed...");',
    output: "HttpOnly cookies cannot be accessed...",
  },
  {
    id: 13,
    title: "Custom Hook for Window Width (`useWindowWidth`)",
    category: "Browser & Web APIs",
    explanation:
      "Hook to track window dimensions, demonstrating `useEffect` subscription and cleanup for DOM events.",
    tips: "Requires checking for `window` in SSR environments.",
    codeString: "function useWindowWidth() { /* ... */ }",
    output: "This hook returns the current window width in pixels.",
  },
  {
    id: 19,
    title: "CSS: display:none vs visibility:hidden vs opacity:0",
    category: "Browser & Web APIs",
    explanation:
      "Comparison of hiding methods regarding layout, event interaction, and animation support.",
    tips: "Only `display: none` removes the element from the flow (reflows).",
    codeString: "/* HTML example structure: */",
    output: "Requires browser environment to see visual effects.",
  },
  {
    id: 37,
    title: "Accessibility (A11y) Basics",
    category: "Browser & Web APIs",
    explanation:
      "POUR principles: Perceivable, Operable, Understandable, Robust. Practices: Semantic HTML, Keyboard navigation, ARIA.",
    tips: "Always prefer semantic HTML over ARIA.",
    codeString: "function AccessibleButton() { /* ... */ }",
    output: "Conceptual React code demonstrating ARIA attributes.",
  },
  {
    id: 41,
    title: "Typing useState in TypeScript",
    category: "Browser & Web APIs",
    explanation:
      "Using Generics (`useState<Type>`) to explicitly define state types, especially union types (`Type | null`) for initial empty state.",
    tips: "Inference works well for primitives, but explicit types are needed for complex or union types.",
    codeString: "// TypeScript Code (Conceptual)",
    output: "Conceptual TypeScript code.",
  },
  {
    id: 45,
    title: "Designing for Disabled Users (A11y)",
    category: "Browser & Web APIs",
    explanation:
      "Practices covering screen reader support, keyboard-only use, contrast, and text alternatives (WCAG).",
    tips: "Test with keyboard-only walkthroughs and screen readers (VoiceOver, NVDA).",
    codeString: "// Use of role and aria-live for dynamic updates",
    output: "Conceptual code for accessibility.",
  },
  {
    id: 46,
    title: "Keyboard Arrow Key Behavior and Management",
    category: "Browser & Web APIs",
    explanation:
      "Implementing custom arrow key navigation using `keydown` and `e.preventDefault()`, crucial for custom widgets (menus, sliders).",
    tips: "Always use `e.preventDefault()` to stop page scrolling.",
    codeString: "function handleKeyDown(e) { /* ... */ }",
    output: "Conceptual function for keyboard event handling.",
  },
  {
    id: 47,
    title: "Tabindex Usage",
    category: "Browser & Web APIs",
    explanation:
      "Controls keyboard focus and tab order: `0` (focusable in order), `-1` (programmatic focus only), `1+` (avoid).",
    tips: "Use `-1` for focus management (e.g., modals). Avoid positive values.",
    codeString: "/* HTML Examples */",
    output: "Conceptual HTML/JS behavior for tabindex.",
  },
  {
    id: 48,
    title: "Color Contrast Best Practices (WCAG)",
    category: "Browser & Web APIs",
    explanation: "WCAG standards (AA: 4.5:1, AAA: 7:1) for text contrast.",
    tips: "Contrast must be checked for graphical elements and focus states, not just text.",
    codeString: "/* CSS Example: Ensuring contrast is met */",
    output: "Conceptual CSS demonstrating contrast considerations.",
  },
  {
    id: 57,
    title: "Effective Debugging Techniques (Browser DevTools)",
    category: "Browser & Web APIs",
    explanation:
      "Using `debugger;`, breakpoints, conditional breakpoints, and Source Maps to debug complex code.",
    tips: "Use Step Over/Into/Out (F10/F11) and check the Call Stack for async traces.",
    codeString: "function calculate(a, b) { /* ... */ }",
    output: "Execution pauses at the debugger statement in DevTools.",
  },
  {
    id: 62,
    title: "Replacing Spaces with %20 (URL Encoding)",
    category: "Browser & Web APIs",
    explanation:
      "`%20` is URL encoding for space. Always prefer `encodeURIComponent()` over manual replacement.",
    tips: "`encodeURIComponent()` handles all special URL characters, not just spaces.",
    codeString: "const originalString = 'hello world & good day';",
    output: "URI Encoded: hello%20world%20%26%20good%20day",
  },
  {
    id: 63,
    title: "Debugging Minified Code with Source Maps",
    category: "Browser & Web APIs",
    explanation:
      "Source Maps map minified code back to original source, crucial for debugging production builds.",
    tips: "Source maps should not be publicly accessible in production.",
    codeString: "// Webpack Config (Conceptual)",
    output: "Conceptual configuration for source maps.",
  },
  {
    id: 64,
    title: "HTML5, CSS Positions, and Styling Methods",
    category: "Browser & Web APIs",
    explanation:
      "Semantic HTML tags, summary of CSS `position` values (`relative`, `absolute`, `fixed`, `sticky`), and styling methods.",
    tips: "`position: relative` sets the anchor for `position: absolute` children.",
    codeString: "/* Example of Absolute positioning */",
    output: "Conceptual CSS for positioning.",
  },
  {
    id: 65,
    title: "Responsive Design Best Practices",
    category: "Browser & Web APIs",
    explanation:
      "Mobile-first approach, fluid units (`vw`/`vh`), media queries, and the Viewport meta tag.",
    tips: "Use Flexbox/Grid for fluid layouts instead of fixed widths.",
    codeString: "/* Mobile-First Example */",
    output: "Conceptual mobile-first responsive CSS.",
  },
  {
    id: 67,
    title: "Layout: 6 Labels Inside a 300x300 Container (CSS Grid)",
    category: "Browser & Web APIs",
    explanation:
      "Using CSS Grid (`display: grid`, `grid-template-columns`, `place-items: center`) for two-dimensional component layout.",
    tips: "Grid is superior to Flexbox for simultaneous row/column control.",
    codeString: '<div id="grid-container">',
    output: "Conceptual HTML/CSS for a 3x2 grid.",
  },
  {
    id: 69,
    title: "CSS: inline vs inline-block",
    category: "Browser & Web APIs",
    explanation:
      "Comparison based on width/height acceptance and margin/padding behavior.",
    tips: "`inline-block` accepts dimensions but is prone to whitespace gaps (solved by Flexbox).",
    codeString: "/* HTML Example: */",
    output: "Conceptual CSS for inline vs inline-block.",
  },

  // DATA STRUCTURES & ALGORITHMS (DSA)
  {
    id: 2,
    title: "Polyfill: Write a polyfill for Array.prototype.map",
    category: "DSA",
    explanation:
      "Custom implementation of `map` using `Array.prototype` and a loop.",
    tips: "Must return a new array and handle sparse arrays.",
    codeString: "// We use 'myMap' to avoid conflict with native map",
    output: "[2, 4, 6]",
  },
  {
    id: 59,
    title: "Regular Expressions (Regex)",
    category: "DSA",
    explanation:
      "Syntax for patterns, quantifiers, and anchors. Used for string validation and extraction.",
    tips: "Be aware of catastrophic backtracking (ReDoS).",
    codeString: "const emailRE = /^[^s@]+@[^s@]+\\.[^\\s@]+$/;",
    output: "Valid email: true\nDate: 2023/05/10",
  },
  {
    id: 60,
    title: "Array Sorting with Comparator Functions",
    category: "DSA",
    explanation:
      "How to use `Array.prototype.sort()` with a comparator function (`a - b` for numeric ascending). Mutates the array in place.",
    tips: "Always create a shallow copy (`[...arr]`) to avoid mutation in React.",
    codeString: "const numbers = [5, 20, 10];",
    output: "Numeric: [5, 10, 20]\nUsers: [Alpha, Zulu]",
  },
  {
    id: 61,
    title: "Bubble Sort vs Binary Search (Conceptual Differences)",
    category: "DSA",
    explanation:
      "Comparison of a Sorting algorithm (Bubble Sort: O(n²)) and a Searching algorithm (Binary Search: O(log n)).",
    tips: "Binary search requires a sorted array.",
    codeString: "function binarySearch(arr, target) { /* ... */ }",
    output: "Binary Search Index: 2",
  },
  {
    id: 68,
    title: "Graph Display and Shortest Path Algorithms",
    category: "DSA",
    explanation:
      "Algorithms like Dijkstra's (non-negative weights, O((E+V) log V)) and Bellman-Ford (negative weights).",
    tips: "Dijkstra's uses a priority queue.",
    codeString: "// JavaScript / Dijkstra's Concept",
    output: "Conceptual framework for Dijkstra's algorithm.",
  },
  {
    id: 71,
    title: "Shallow vs Deep Copy and Flexbox Alignment (Overview)",
    category: "DSA",
    explanation:
      "Comparison of shallow copy (`{...}`) vs deep copy (`structuredClone()`/recursion). Deep copy avoids shared references.",
    tips: "Use `structuredClone()` for reliable deep copy of data.",
    codeString: "const original = { a: 1, nested: { b: 2 } };",
    output: "Original Nested B after shallow mutation: 99\nDeep Nested B: 50",
  },
  {
    id: 73,
    title: "Utility: Flatten Nested Object Keys to Dotted Keys",
    category: "DSA",
    explanation:
      "Recursive function to convert nested object keys to dot-notation (e.g., `a.b.c`).",
    tips: "Requires handling recursion and checking for own properties.",
    codeString: "function flatten(obj, prefix = '', res = {}) { /* ... */ }",
    output: "{ id: 1, 'details.name': 'Jane', 'details.config.theme': 'dark'}",
  },
  {
    id: 82,
    title: "Polyfill: Array.prototype.filter",
    category: "DSA",
    explanation:
      "Custom implementation of `filter` returning a new array based on the callback's truthy return value.",
    tips: "Must return a new array and push the original element, not the callback's return value.",
    codeString: "// We use 'myFilter' to avoid conflict with native filter",
    output: "Filtered Array: [10, 20]\nSparse Filtered: [1, 3]",
  },
  {
    id: 83,
    title: "Polyfill: Array.prototype.reduce",
    category: "DSA",
    explanation:
      "Custom implementation of `reduce`, correctly handling the accumulator and the optional initial value argument.",
    tips: "The main challenge is handling the optional initial value and array emptiness.",
    codeString: "// We use 'myReduce' to avoid conflict with native reduce",
    output: "Sum with 0: 10\nMax without initial: 4",
  },
  {
    id: 85,
    title: "Flatten Array (Deep Flattening)",
    category: "DSA",
    explanation:
      "Converting a multi-dimensional array into a single dimension using native `flat(Infinity)` or custom recursion.",
    tips: "Always mention the native `flat(Infinity)` first.",
    codeString: "const nestedArray = [1, [2, [3, 4], 5], 6, [7, 8]];",
    output: "Native Flat: [1, 2, 3, 4, 5, 6, 7, 8]",
  },
  {
    id: 91,
    title: "Deep Clone Methods: Recursion vs JSON.stringify",
    category: "DSA",
    explanation:
      "Deep clone implementation using recursion and a WeakMap to protect against circular references.",
    tips: "JSON method fails on functions, Dates, and circular refs.",
    codeString:
      "function deepClone(original, cache = new WeakMap()) { /* ... */ }",
    output:
      "JSON.stringify Failed: 2025-11-18T...Z undefined\nRecursive Date Check: true",
  },
];