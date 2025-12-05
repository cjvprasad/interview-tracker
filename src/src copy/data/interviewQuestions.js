 const interviewQuestions = [
  // JS CORE

  // Q1: bind() vs call() vs apply() - COMBINED Q1 & Q12
  {
    id: 1,
    title: "bind(), call(), vs apply() (Complete Guide)",
    category: "JavaScript Core",
    explanation:
      "All three methods are used to explicitly set 'this' inside a function.\n\n## Basic Summary\n* **.call(thisArg, arg1, arg2, ...):** Calls the function immediately; arguments are passed individually.\n* **.apply(thisArg, [arg1, arg2, ...]):** Calls the function immediately; arguments are passed as an array.\n* **.bind(thisArg, arg1, arg2, ...):** **Does NOT call immediately**; it returns a **NEW function** permanently bound to the specified 'this' context, which must be executed later.\n\n## Execution & Return Value\n`call()` and `apply()` execute the function and return the function's result immediately. `bind()` returns a new, bound function.",
    tips: '"Interview Tips / Pitfalls"\n* **Key takeaway:** `call()` and `apply()` execute immediately (temporary binding); `bind()` returns a new function (permanent binding).\n* Use `apply()` when you have an array of arguments (e.g., using `Math.max.apply(null, array)`).\n* Use `bind()` for event callbacks, function composition, and partial application (pre-setting arguments).\n* Arrow functions ignore all three methods for the `this` context because they capture `this` lexically.',
    codeString:
      'function greet(greeting, city, country) {\n  return greeting + \', \' + this.name + \' from \' + city + \', \' + country;\n}\nconst person = { name: "Jay" };\nconst alice = { name: \'Alice\' };\n\n// 1. call(): immediate execution, args individually\nconsole.log(greet.call(person, \'Hello\', "Hyderabad", "India"));\n\n// 2. apply(): immediate execution, args as an array\nconsole.log(greet.apply(alice, ["Hi", "Bangalore", "India"]));\n\n// 3. bind(): returns a new function (supports partial application)\nconst boundGreet = greet.bind(person, "Yo", "New York");\nconsole.log(boundGreet("USA")); // Execute the bound function later\n',
    output:
      "Hello, Jay from Hyderabad, India\nHi, Alice from Bangalore, India\nYo, Jay from New York, USA",
  }, // Q7: Closures
  {
    id: 7,
    title: "Closures — explanation and example",
    category: "JavaScript Core",

    explanation:
      "A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (its **lexical environment**).\n\nIn simple terms, a function forms a closure by retaining access to variables from its parent scope, even after the parent function has finished executing. Closures are powerful for achieving **data privacy** (encapsulation) and creating **function factories**.\n",
    tips: '"Interview Tips / Pitfalls"\n* Explain **memory considerations**: closures keep the referenced variables alive in memory, which can lead to memory leaks if not handled correctly (though modern JS engines are good at garbage collection).\n* Mention surprising behaviors in loops and closures, especially with `var` (which is function-scoped) versus `let` or `const` (which are block-scoped).\n',
    codeString:
      "function makeCounter(start = 0) {\n  // 'count' is part of the closure's lexical environment\n  let count = start;\n\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    value: () => count\n  };\n}\n\nconst c = makeCounter(10);\nconsole.log(\"Initial:\", c.value());\nc.increment();\nconsole.log(\"After Increment:\", c.value());\n// The 'count' variable remains private and encapsulated.\n",
    output: "Initial: 10\nAfter Increment: 11",
  },
  // Q8: Hoisting
  {
    id: 8,
    title: "Hoisting (var vs let/const, function declarations)",
    category: "JavaScript Core",

    explanation:
      "**Hoisting** is the JavaScript engine's behavior of moving declarations to the top of their current scope during the compilation phase.\n\n* **`var` and Function Declarations:** The declaration is hoisted to the top. `var` variables are initialized to `undefined`. Function declarations are hoisted completely (name and body).\n* **`let` and `const`:** These are also hoisted, but they are placed in the **Temporal Dead Zone (TDZ)** from the start of the block until their declaration is processed. Accessing them in the TDZ results in a `ReferenceError`.\n",
    tips: '"Interview Tips / Pitfalls"\n* **TDZ:** Explain that `let/const` are hoisted but inaccessible, leading to a `ReferenceError`, which is better than the confusing `undefined` you get with `var`.\n* **Function Differences:** Function declarations are fully hoisted and can be called before they appear in the code, whereas function expressions (assigned to `var`, `let`, or `const`) behave like regular variables and are only partially hoisted.\n',
    codeString:
      '// 1. var hoisting\nconsole.log("A is:", a); // Output: undefined\nvar a = 2;\n\n// 2. let/const and TDZ\ntry {\n  console.log("B is:", b);\n} catch (e) {\n  console.log("B is:", e.name); // Output: ReferenceError\n}\nlet b = 3;\n\n// 3. Function declaration hoisting\nfunction foo(){ return \'Function hoisted\'; }\nconsole.log(foo());\n',
    output: "A is: undefined\nB is: ReferenceError\nFunction hoisted",
  },
  // Q10: Spread vs Rest operator
  {
    id: 10,
    title: "Spread vs Rest Operator (`...`)",
    category: "JavaScript Core",

    explanation:
      "Both use the `...` syntax, but their function is opposite based on context:\n\n| Operator | Context | Action | Result |\n|---|---|---|---|\n| **Spread** | Function call, array literal, object literal | **Expands** an iterable into its individual elements. | Copies elements/properties. |\n| **Rest** | Function parameters, array/object destructuring | **Collects** the remaining individual elements into a new array or object. | Bundles elements/properties. |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Shallow Copy:** Both operators create a shallow copy. Nested objects or arrays will still share the same references.\n* **Rest Position:** The rest operator must always be the **last element** in the array destructuring or function parameters.\n',
    codeString:
      "// 1. Spread Operator (Expands)\nconst arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]\n\n// 2. Rest Operator (Collects in function args)\nfunction sum(x, ...restOfNumbers) {\n  console.log('X:', x);\n  console.log('Rest:', restOfNumbers);\n  return restOfNumbers.reduce((s, n) => s + n, x);\n}\nconsole.log('Sum:', sum(1, 2, 3, 4));\n\n// 3. Rest Operator (Collects in object destructuring)\nconst { id, ...details } = { id: 1, name: 'A', age: 30 };\nconsole.log('Details:', details); // { name: 'A', age: 30 }\n",
    output: "X: 1\nRest: [2, 3, 4]\nSum: 10\nDetails: { name: 'A', age: 30 }",
  }, // Q30: JavaScript variable scope
  {
    id: 30,
    title: "JavaScript Variable Scope (Global, Function, Block)",
    category: "JavaScript Core",

    explanation:
      "Scope defines the visibility and accessibility of variables.\n\n| Scope Type | Variables | Behavior |\n|---|---|---|\n| **Global** | Declared outside functions/blocks | Accessible everywhere. |\n| **Function** | `var` declared inside function | Accessible throughout the entire function body (including nested blocks). |\n| **Block** | `let` / `const` declared inside `{}` | Accessible only within the surrounding block (`if`, `for`, regular blocks). |\n\n**Lexical Scoping:** Variables are resolved based on where they are defined (written in the source code), not where they are called. This is the foundation of closures.\n",
    tips: '"Interview Tips / Pitfalls"\n* **`var` Leakage:** Demonstrate how a `var` declared inside an `if` block is still available outside the block but inside the function scope. This behavior is why `let` and `const` (block-scoped) are preferred in modern JS.\n',
    codeString:
      "function scopeDemo() {\n  var functionScoped = 'A';\n  let blockScoped = 'B';\n  \n  if (true) {\n    var blockVar = 'C'; // Function-scoped!\n    let blockLet = 'D'; // Block-scoped!\n    console.log('Inside Block:', blockLet); \n  }\n\n  console.log('Outside Block, Var:', blockVar); // C (Accessible)\n  \n  try {\n    console.log('Outside Block, Let:', blockLet);\n  } catch(e) {\n    console.log('Outside Block, Let:', e.name); // ReferenceError (Inaccessible)\n  }\n}\nscopeDemo();\n",
    output:
      "Inside Block: D\nOutside Block, Var: C\nOutside Block, Let: ReferenceError",
  }, // Q31: ES6 Features (overview)
  {
    id: 31,
    title: "Key ES6+ (ECMAScript 2015) Features",
    category: "JavaScript Core",

    explanation:
      "ES6 introduced major changes that fundamentally improved JavaScript syntax, readability, and capabilities:\n\n* **Variable Declarations:** `let` and `const` (block-scoped).\n* **Functions:** Arrow functions (lexical `this`, cleaner syntax).\n* **Collections:** `Map` and `Set` data structures.\n* **Async:** Promises (standardized async behavior).\n* **Syntax:** Template literals, Default parameters, Destructuring (array/object).\n* **Iterables:** Rest/Spread operator, `for...of` loops.\n* **OOP:** Classes (`class`, `extends`, `super`).\n* **Modularity:** Modules (`import` and `export`).\n",
    tips: '"Interview Tips / Pitfalls"\n* Mention that despite the new syntax, JS Classes are still built on the existing **prototypal inheritance** mechanism.\n* Discuss the need for **transpilation** (using tools like Babel) to convert modern ES6+ code into older ES5 for better browser compatibility.\n',
    codeString:
      "// 1. Arrow functions + Template literals\nconst welcome = (name, age) => `Hello ${name}, you are ${age} years old.`;\nconsole.log(welcome('Lexi', 25));\n\n// 2. Destructuring + Default params\nconst user = { name: 'Kai', role: 'Dev' };\nconst { name, title = 'N/A' } = user;\nconsole.log(title); // N/A\n",
    output: "Hello Lexi, you are 25 years old.\nN/A",
  },
  // Q32: JavaScript class Car example (OOP)
  {
    id: 32,
    title: "JavaScript Class Example (OOP)",
    category: "JavaScript Core",

    explanation:
      "ES6 `class` syntax provides a cleaner way to implement object-oriented patterns, specifically **prototypal inheritance**.\n\n* **`constructor`:** Initializes the instance properties when a new object is created via `new ClassName()`.\n* **Methods:** Methods defined inside the class body are placed on the object's prototype, saving memory compared to defining a function on every instance.\n",
    tips: '"Interview Tips / Pitfalls"\n* Mention that modern JavaScript supports **private fields** using the `#` symbol (e.g., `#fuel`), which genuinely enforces encapsulation at the language level.\n* Discuss the importance of the `super()` call in the constructor of a derived class (`extends`).\n',
    codeString:
      'class Car {\n  #maxFuel = 50; // Private field (modern JS)\n  \n  constructor(modelName, mileage) {\n    this.modelName = modelName;\n    this.mileage = mileage; // km per liter\n    this.fuel = 0;\n  }\n  \n  // Method placed on the prototype\n  calculateRange() { \n    return this.fuel * this.mileage; \n  }\n  \n  refuel(liters) { \n    const actualLiters = Math.min(liters, this.#maxFuel - this.fuel);\n    this.fuel += actualLiters; \n    return `Refueled ${actualLiters}L.`;\n  }\n}\n\nconst myCar = new Car("Sedan X", 15);\nconsole.log(myCar.refuel(20));\nconsole.log(`Range: ${myCar.calculateRange()} km`);\n',
    output: "Refueled 20L.\nRange: 300 km",
  },
  // Q33: Functional vs OOP programming
  {
    id: 33,
    title: "Functional vs Object-Oriented Programming (FP vs OOP)",
    category: "JavaScript Core",

    explanation:
      "JavaScript supports both paradigms.\n\n| Paradigm | Focus | Key Principles | Trade-offs |\n|---|---|---|---|\n| **OOP** | Objects and mutable state. | Encapsulation, Inheritance, Polymorphism. | Maps well to domain models; state changes can be complex to track. |\n| **FP** | Pure functions and data flow. | Pure functions, Immutability, Function Composition. | Easier to test, predict, and parallelize; less natural for stateful entities. |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Pure Functions (FP):** A function that always returns the same output for the same input and causes **no side effects** (does not modify outside state). This is critical in React (e.g., in reducers).\n* **Immutability:** A cornerstone of FP (and React state management). Instead of modifying an object/array, you create a new one with the necessary changes.\n',
    codeString:
      "// OOP Example (Mutable State)\nclass Account {\n  constructor(v = 0) { this.balance = v; }\n  deposit(n) { this.balance += n; } // MUTATION\n}\nconst oopAcc = new Account(10);\noopAcc.deposit(5); // Balance is now 15\n\n// FP Example (Pure Function, Immutability)\nconst deposit = (balance, amount) => balance + amount; // PURE\nlet fpBalance = 10;\nfpBalance = deposit(fpBalance, 5); // New variable assigned\nconsole.log(`OOP: ${oopAcc.balance}, FP: ${fpBalance}`);\n",
    output: "OOP: 15, FP: 15",
  },
  // Q49: `this` keyword explained
  {
    id: 49,
    title: "The `this` Keyword in JavaScript",
    category: "JavaScript Core",

    explanation:
      "The value of `this` is determined dynamically by **how a function is called** (the call-site), not where the function is defined.\n\n| Binding Rule | Call-Site Example | `this` Reference |\n|---|---|---|\n| **Default** | `f()` (standalone function call) | `window` (non-strict) or `undefined` (strict mode) |\n| **Implicit** | `obj.f()` (called as a method) | `obj` (the object left of the dot) |\n| **Explicit** | `f.call(obj, ...)` or `f.apply(obj, ...)` | Explicitly forced to `obj` |\n| **New** | `new f()` (constructor call) | The newly created instance object |\n| **Lexical (Arrow Functions)** | N/A | `this` is inherited from the outer scope (cannot be changed) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Strict Mode:** Always point out the difference between strict mode (`undefined`) and non-strict mode (`window`) for the default binding.\n* **Arrow Functions:** Emphasize that **arrow functions ignore all four standard rules** and rely solely on lexical binding, making them poor choices for traditional object methods but ideal for callbacks where you want to preserve the surrounding scope\'s `this`.\n',
    codeString:
      "\"use strict\";\n\nfunction getThis() { \n  return this; \n}\n\nconst obj = { name: 'Context A', getThis };\n\n// 1. Default Binding (strict mode)\nconsole.log('Default:', typeof getThis() === 'undefined' ? 'undefined' : 'window'); \n\n// 2. Implicit Binding\nconsole.log('Implicit:', obj.getThis().name);\n\n// 3. Explicit Binding\nconst boundThis = getThis.call({ name: 'Context B' });\nconsole.log('Explicit:', boundThis.name);\n\n// 4. Lexical Binding\nconst arrow = () => this; \nconsole.log('Arrow:', typeof arrow() === 'undefined' ? 'undefined' : 'window'); // Inherits outer scope ('window' or 'undefined')\n",
    output:
      "Default: undefined\nImplicit: Context A\nExplicit: Context B\nArrow: undefined",
  }, // Q50: Lexical Environment (JS internals)
  {
    id: 50,
    title: "Lexical Environment (JS Internals)",
    category: "JavaScript Core",

    explanation:
      "The **Lexical Environment** is a conceptual, internal object created by the JavaScript engine to manage variable scoping during code execution.\n\nIt consists of two main parts:\n1.  **Environment Record:** Stores all identifier bindings (variables, functions, and arguments) within the scope (e.g., the function scope, or block scope).\n2.  **Outer Environment Reference:** A pointer to the lexical environment of the outer scope.\n\n**How it Relates to Closures:** When a function is created, it captures the *Outer Environment Reference* from where it was defined. This reference is what allows a closure to access variables from its parent scope, even after the parent function has completed execution.\n",
    tips: '"Interview Tips / Pitfalls"\n* This concept is often used to explain *why* closures work and why hoisting behaves the way it does.\n* Keep the explanation focused on scope resolution and closures, avoiding overly technical engine details unless prompted.\n',
    codeString:
      "function outer() { // Outer Environment \n  let x = 10;\n  \n  function inner() { // Inner Environment has reference to Outer\n    // Closure: inner function accesses x via its Outer Environment Reference\n    console.log(x); \n  }\n  return inner;\n}\n\nconst closureFn = outer();\nclosureFn(); // 10, even though outer() is finished\n",
    output: "10",
  }, // Q51: let vs var vs const
  {
    id: 51,
    title: "let vs var vs const (Scope and Hoisting)",
    category: "JavaScript Core",

    explanation:
      "| Feature | var | let | const |\n|---|---|---|---|\n| **Scope** | Function-scoped | **Block-scoped** | **Block-scoped** |\n| **Hoisting** | Hoisted to `undefined` | Hoisted to **TDZ** (ReferenceError) | Hoisted to **TDZ** (ReferenceError) |\n| **Re-declaration** | Yes (in the same scope) | No | No |\n| **Re-assignment** | Yes | Yes | No (The binding is immutable) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Best Practice:** Prefer `const` by default. Use `let` only if you need to reassign the variable. Avoid `var` in modern code to prevent scoping confusion and accidental re-declarations.\n* **`const` and Objects:** Explain that `const` only prevents the variable from being *rebound* to a new value; it **does not prevent mutation** of object properties or array elements.\n',
    codeString:
      "const user = { name: 'Alice' };\n\n// OK: Mutation is allowed\nuser.name = 'Bob'; \nconsole.log(user.name);\n\ntry {\n  // ERROR: Rebinding is NOT allowed\n  // user = { name: 'Charlie' }; \n} catch(e) {\n  console.log('Rebinding error:', e.name);\n}\n",
    output: "Bob\nRebinding error: TypeError",
  },

  // Q52: Temporal Dead Zone (TDZ)
  {
    id: 52,
    title: "Temporal Dead Zone (TDZ)",
    category: "JavaScript Core",

    explanation:
      "The **Temporal Dead Zone (TDZ)** is the time span between the creation of a scope and the moment when `let` or `const` variables within that scope are initialized.\n\n* During the TDZ, attempting to access the variable will result in a **`ReferenceError`**.\n* This mechanism prevents the confusing behavior seen with `var` (which allows access and returns `undefined` before initialization). The TDZ enforces cleaner code by making it impossible to use variables before their declaration.\n",
    tips: '"Interview Tips / Pitfalls"\n* The TDZ is temporal (based on time of execution), not spatial (based on location in code).\n* The function that contains the `let/const` variable can be executed outside the TDZ, but the variable inside the function remains in the TDZ until the line of declaration is reached.\n',
    codeString:
      "function testTDZ() {\n  // Start of TDZ for 'b'\n\n  try {\n    console.log(b); // Throws ReferenceError because 'b' is in TDZ\n  } catch(e) {\n    console.log('Error:', e.name);\n  }\n\n  const b = 'Initialized'; // End of TDZ\n\n  console.log('Success:', b);\n}\ntestTDZ();\n",
    output: "Error: ReferenceError\nSuccess: Initialized",
  },

  // Q53: Make function-scoped var available globally
  {
    id: 53,
    title: "Exposing Function-Scoped Variables Globally",
    category: "JavaScript Core",

    explanation:
      "To expose a function-scoped variable (declared with `var`, `let`, or `const` inside a function) to the global scope, you must explicitly attach it to the global object.\n\n* **In Browsers:** The global object is `window`.\n* **In Node.js/Universal:** Use `globalThis` for a standard reference to the global object.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Bad Practice:** Emphasize that this is almost always considered bad practice because it pollutes the global namespace, leading to potential naming collisions and making code harder to maintain.\n* **Alternatives:** Modern solutions use ES Modules (`import/export`) or a single global object namespace (e.g., `window.MyApp = {...}`) to prevent pollution.\n',
    codeString:
      "(function() {\n  const secret = 'My Secret Value';\n  \n  // Explicitly attach 'secret' to the global object (window)\n  // Check if window exists (for browser compatibility)\n  if (typeof window !== 'undefined') {\n    window.globalSecret = secret;\n  }\n})();\n\n// Access the variable globally\nif (typeof globalSecret !== 'undefined') {\n  console.log('Globally available:', globalSecret);\n} else {\n  console.log('Run this in a browser to see the output.');\n}\n",
    output:
      "Run this in a browser to see the output. (If run in a console: Globally available: My Secret Value)",
  },
  // Q75: Event Delegation
  {
    id: 75,
    title: "Event Delegation",
    explanation:
      "Event Delegation is a technique where instead of attaching event listeners to **each child element**, you:\n- Attach **one listener** to a parent element.\n- Use event bubbling to detect which child triggered the event.\n\nThis improves:\n- Performance (fewer listeners)\n- Memory usage\n- Supports dynamically added elements\n\n## How It Works\n1. Add one listener to the parent.\n2. Let events bubble up.\n3. Inside the handler, inspect `event.target`.\n4. Trigger behavior only if the target matches your criteria (e.g. via `matches()` selector).\n",
    tips: '"Interview Tips / Pitfalls"\n* Demonstrate understanding of **event bubbling**.\n* Use `event.target` and `element.matches(selector)`.\n* Mention that delegation does NOT work for non-bubbling events (e.g., focus).\n* Useful for dynamic lists, tables, menus, etc.\n',
    codeString:
      '// Event Delegation Example\ndocument.querySelector("#parent").addEventListener("click", function(event) {\n  if (event.target.matches(".child")) {\n    console.log("Child clicked:", event.target.innerText);\n  }\n});\n\n// HTML:\n// <ul id="parent">\n//   <li class="child">A</li>\n//   <li class="child">B</li>\n//   <li class="child">C</li>\n// </ul>\n',
    output: 'Clicking any <li> logs: "Child clicked: A" (or B or C)',
    category: "JavaScript Core",
  }, // Q76: Currying
  {
    id: 76,
    title: "Currying",
    category: "JavaScript Core",
    explanation:
      "Currying transforms a function with multiple arguments into a sequence of functions each taking **one argument at a time**.\n\nExample:\n```\nf(a, b, c) -> f(a)(b)(c)\n```\n\nCurrying demonstrates:\n- Closures\n- Higher-order functions\n- Function transformation\n\n## Implementation Details\n1. Write a function `curry(fn)`.\n2. Return a wrapper that collects arguments.\n3. If enough arguments are collected → call original function.\n4. Otherwise → return another function expecting the remaining arguments.\n",
    tips: '"Interview Tips / Pitfalls"\n* Mention real use cases: partial application, functional programming, reusability.\n* Ensure you understand how closures accumulate arguments.\n* Edge case: handle both full and partial argument passing.\n',
    codeString:
      "// Curry implementation\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);  // enough arguments\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs)); // accumulate\n      };\n    }\n  };\n}\n\n// Example usage:\nfunction sum(a, b, c) {\n  return a + b + c;\n}\n\nconst curriedSum = curry(sum);\n\nconsole.log(curriedSum(1)(2)(3));\nconsole.log(curriedSum(1, 2)(3));\nconsole.log(curriedSum(1)(2, 3));\n",
    output: "All calls result in: 6",
  },
  // Q80: Chain Calculator (Method Chaining)
  {
    id: 80,
    title: "Chain Calculator (Method Chaining)",
    explanation:
      "A Chain Calculator (or fluent interface) allows methods to be called sequentially on an object, often leading to highly readable code. The key to implementing method chaining is ensuring that **every method returns the object instance itself** (`return this`).\n\n## Implementation Details\n1. The object stores an internal `value` state (closure).\n2. Each method (e.g., `add`, `subtract`) modifies the internal `value`.\n3. Each method returns `this` to allow the next method to be called.",
    tips: '"Interview Tips / Pitfalls"\n* Mention that the pattern relies on object mutation, which is generally discouraged in pure functional programming (like Redux reducers), but is common in builder patterns.\n* Ensure the final method (`equal` or `value`) returns the final primitive value, breaking the chain.',
    codeString:
      "class Calculator {\n  constructor(initialValue = 0) {\n    this.result = initialValue;\n  }\n\n  add(n) {\n    this.result += n;\n    return this; // Return 'this' to continue the chain\n  }\n\n  subtract(n) {\n    this.result -= n;\n    return this; // Return 'this' to continue the chain\n  }\n\n  multiply(n) {\n    this.result *= n;\n    return this;\n  }\n\n  value() {\n    return this.result; // Return the final value, breaking the chain\n  }\n}\n\nconst calc = new Calculator(10);\n\nconst finalValue = calc\n  .add(5)         // 10 + 5 = 15\n  .multiply(2)    // 15 * 2 = 30\n  .subtract(10)   // 30 - 10 = 20\n  .value();\n\nconsole.log('Chained Result:', finalValue);",
    output: "Chained Result: 20",
    category: "JavaScript Core",
  },
  // Q81: Pipe and Compose (Functional Composition)
  {
    id: 81,
    title: "Pipe and Compose (Functional Composition)",
    explanation:
      "Pipe and Compose are core utilities in Functional Programming (FP) for combining multiple simple functions into a single, complex function. They both achieve **function composition**.\n\n### ➡️ Pipe (Left-to-Right)\nData flows through the functions sequentially, like a water pipe: `pipe(f, g, h)(x) -> h(g(f(x)))`\n\n### ⬅️ Compose (Right-to-Left)\nData flows backward, combining the last function first (standard mathematical composition): `compose(f, g, h)(x) -> f(g(h(x)))`",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize that both functions take **multiple functions** as arguments and return a **single new function**.\n* The implementation relies heavily on `Array.prototype.reduce()` or `reduceRight()` to correctly chain the functions.\n* `pipe` is often preferred for readability, as the code reads in the order of execution.',
    codeString:
      "const add1 = x => x + 1;\nconst multiply2 = x => x * 2;\nconst square = x => x * x;\n\n// Implementation using Array.reduce\n\n// ⬅️ Compose: Executes R to L (square then multiply then add)\nfunction compose(...fns) {\n  return (initialValue) => fns.reduceRight((acc, fn) => fn(acc), initialValue);\n}\n\n// ➡️ Pipe: Executes L to R (add then multiply then square)\nfunction pipe(...fns) {\n  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);\n}\n\n// Example 1: Pipe (add1 -> multiply2 -> square)\n// 10 + 1 = 11 -> 11 * 2 = 22 -> 22 * 22 = 484\nconst pipedResult = pipe(add1, multiply2, square)(10);\nconsole.log('Pipe Result:', pipedResult);\n\n// Example 2: Compose (square -> multiply2 -> add1)\n// 10 * 10 = 100 -> 100 * 2 = 200 -> 200 + 1 = 201\nconst composedResult = compose(add1, multiply2, square)(10);\nconsole.log('Compose Result:', composedResult);",
    output: "Pipe Result: 484\nCompose Result: 201",
    category: "JavaScript Core",
  },
  // Q84: Prototype and Prototype Inheritance
  {
    id: 84,
    title: "Prototype and Prototype Inheritance",
    explanation:
      "JavaScript uses **prototypal inheritance**—objects inherit properties and methods from other objects. This differs from class-based inheritance.\n\n### Key Concepts\n1. **`[[Prototype]]` (The Link):** Every object has an internal, hidden link to another object (its prototype). In modern JS, this is accessed via `Object.getPrototypeOf(obj)` or the deprecated `obj.__proto__`.\n2. **`prototype` Property (The Blueprint):** Only function objects have a public `prototype` property. When a function is used as a constructor (`new Func()`), the `[[Prototype]]` of the *new instance* is set to point to the `Func.prototype` object.\n3. **Prototype Chain:** When trying to access a property, the engine first looks on the object itself. If not found, it traverses up the `[[Prototype]]` link to the next object, repeating until the property is found or the chain ends at `Object.prototype` (which points to `null`).",
    tips: '"Interview Tips / Pitfalls"\n* Clearly distinguish between the public `prototype` property (on the constructor function) and the internal `[[Prototype]]` link (on the instance object).\n* Show the `Object.create(proto)` method as the simplest, direct way to create an object that inherits from a specified prototype.\n* Mention that ES6 `class` syntax is purely syntactic sugar over this core prototypal mechanism.',
    codeString:
      "// 1. Constructor Function (Blueprint)\nfunction Animal(name) {\n  this.name = name;\n}\n\n// 2. Add methods to the prototype (shared by all instances)\nAnimal.prototype.makeSound = function() {\n  console.log(`${this.name} makes a sound.`);\n};\n\n// 3. Create an instance\nconst dog = new Animal('Bingo');\n\n// 4. Inheritance demonstration\nconsole.log(`Bingo has makeSound: ${dog.hasOwnProperty('makeSound') ? 'No' : 'Yes (inherited)'}`);\nconsole.log(`Bingo's prototype link is: ${Object.getPrototypeOf(dog) === Animal.prototype}`);\n\ndog.makeSound();\n\n// 5. Direct Prototype Creation\nconst proto = { value: 42 };\nconst obj = Object.create(proto);\nconsole.log(`Object.create value: ${obj.value}`); // Inherited from proto",
    output:
      "Bingo has makeSound: Yes (inherited)\nBingo's prototype link is: true\nBingo makes a sound.\nObject.create value: 42",
    category: "JavaScript Core",
  }, // Q86: Event Emitter (Pub/Sub with `once`) - EXTENDED Q90
  {
    id: 86,
    title: "Event Emitter (Pub/Sub with `once`)",
    explanation:
      "An Event Emitter implements the **Publish-Subscribe (Pub/Sub)** pattern. It allows decoupled communication using a central dispatcher.\n\n### Core Methods\n1. **`on(event, listener)`:** Subscribes a function to an event.\n2. **`off(event, listener)`:** Removes a listener for an event.\n3. **`emit(event, ...args)`:** Executes all listeners subscribed to that event.\n4. **`once(event, listener)`:** Subscribes a function that is executed only **once**, then automatically removed from the listener list.",
    tips: '"Interview Tips / Pitfalls"\n* The core data structure is a **Map** where keys are **event names** and values are **arrays of listener functions**.\n* The `once` method is implemented by creating a wrapper function that calls the original listener and then immediately calls `this.off` on itself.',
    codeString:
      "class EventEmitter {\n  constructor() {\n    this.listeners = new Map();\n  }\n\n  on(event, listener) {\n    if (!this.listeners.has(event)) {\n      this.listeners.set(event, []);\n    }\n    this.listeners.get(event).push(listener);\n  }\n\n  off(event, listener) {\n    const eventListeners = this.listeners.get(event);\n    if (!eventListeners) return;\n    this.listeners.set(event, eventListeners.filter(l => l !== listener));\n  }\n\n  once(event, listener) {\n    const wrapper = (...args) => {\n      listener(...args);\n      this.off(event, wrapper);\n    };\n    // Store wrapper instead of original listener\n    this.on(event, wrapper);\n  }\n\n  emit(event, ...args) {\n    const listeners = this.listeners.get(event);\n    if (!listeners) return;\n    // Clone array to prevent errors if a listener calls 'off' during emit\n    [...listeners].forEach(listener => {\n      listener(...args);\n    });\n  }\n}\n\nconst emitter = new EventEmitter();\nemitter.once('load', (data) => console.log('Once:', data));\nemitter.on('load', (data) => console.log('Always:', data));\n\nemitter.emit('load', 1); // Both fire\nemitter.emit('load', 2); // Only 'Always' fires\n",
    output: "Once: 1\nAlways: 1\nAlways: 2",
    category: "JavaScript Core",
  },

  // REACT FUNDAMENTALS

  // Q11: React Hooks: useEffect, useMemo, useCallback
  {
    id: 11,
    title: "React Hooks: useEffect, useMemo, useCallback (Overview)",
    explanation:
      "These hooks manage component side effects and performance optimization in functional components.\n\n* **`useEffect(effect, deps)`:** Manages side-effects (data fetching, subscriptions, manual DOM changes) after render. The returned function is the **cleanup** logic.\n* **`useMemo(factory, deps)`:** Memoizes a **computed value** (e.g., a heavy calculation or filtered list) to prevent recalculation across renders unless dependencies change.\n* **`useCallback(fn, deps)`:** Memoizes a **function reference** (callback) to prevent it from being recreated on every render. Useful when passing callbacks down to memoized child components.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Misuse:** Overusing `useMemo`/`useCallback` can introduce complexity and memory overhead. Use them only when performance profiling indicates a bottleneck.\n* **Dependency Array:** Must include every variable from the component scope that the hook\'s function uses, otherwise you create a **stale closure**.\n',
    codeString:
      "import React, { useState, useEffect } from 'react';\n\n// Mock component for conceptual output\nfunction HooksOverview({ a, b }) {\n  const [count, setCount] = useState(0);\n\n  // useEffect: runs when dependencies change\n  useEffect(() => {\n    console.log(`Effect runs because A or B changed: a=${a}`);\n    return () => console.log('Cleanup before next run or unmount');\n  }, [a, b]);\n\n  return <div>Hooks Demo. Count: {count}</div>;\n}\n",
    output:
      "Conceptual overview of hooks. Refer to Q23 and Q27 for deep dives on memoization and effects.",
    category: "React Fundamentals",
  },
  // Q12: Custom Hooks
  {
    id: 12,
    title: "Custom Hooks — what and example",
    explanation:
      "A **Custom Hook** is a JavaScript function whose name starts with `use` and that calls other built-in React Hooks. They are a convention that allows you to extract component logic (like state management or side effects) into reusable functions.\n\n* **Goal:** Share stateful logic between components without sharing the state itself (each component gets its own independent copy).\n* **Rule of Hooks:** Custom Hooks must only be called from the top level of other React function components or other custom Hooks.\n",
    tips: '"Interview Tips / Pitfalls"\n* Show how to handle cleanup and include stable identities in dependencies.\n* Always include logic to prevent state updates on unmounted components in any asynchronous custom hook.\n',
    codeString:
      "import { useState, useEffect } from 'react';\n\n// Custom hook for data fetching\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n    \n    // Inner async function allows use of await without making useEffect callback async\n    async function fetchData() {\n      try {\n        const response = await fetch(url);\n        const json = await response.json();\n        if (!cancelled) {\n          setData(json);\n        }\n      } catch (err) {\n        if (!cancelled) {\n          setError(err);\n        }\n      } finally {\n        if (!cancelled) {\n          setLoading(false);\n        }\n      }\n    }\n    fetchData();\n\n    // Cleanup function runs on unmount or before next effect run\n    return () => { cancelled = true; };\n  }, [url]);\n\n  return { data, loading, error };\n}\n",
    output:
      "This hook returns { data, loading, error } based on the fetch call results.",
    category: "React Fundamentals",
  },

  // Q14: Reconciliation / Virtual DOM / diffing
  {
    id: 14,
    title: "Reconciliation, Virtual DOM, and Diffing",
    explanation:
      '**Virtual DOM (VDOM):** A lightweight, in-memory representation of the actual DOM.\n**Reconciliation:** The process where React compares the new VDOM tree with the previous VDOM tree to determine the minimal necessary changes to apply to the real DOM.\n**Diffing:** The specific algorithm used during Reconciliation to calculate the difference (the "diff") between the two VDOM trees.\n\n## Reconciliation Heuristics\nReact uses two main heuristics (assumptions) for efficient diffing, which results in an O(n) complexity rather than O(n³):\n1.  **Element Type:** If the root elements have different types (e.g., `<div>` changes to `<span>`), React tears down the old tree and builds the new one from scratch.\n2.  **Keys:** When comparing lists of children, React uses **keys** to match children from the previous render to children in the current render.\n',
    tips: '"Interview Tips / Pitfalls"\n* **Keys are Crucial:** Explain why using the array index as a key is detrimental when list items can be reordered, inserted, or deleted. This causes React to reuse DOM nodes incorrectly, leading to bugs, loss of state (like input values), or failed animations.\n* **The Solution:** Always use a stable, unique key derived from the data item (e.g., a database ID).\n',
    category: "React Fundamentals",

    codeString:
      "function List({ items }) {\n  // BAD: Index as key - causes issues if item order changes!\n  /*\n  return (\n    <ul>\n      {items.map((item, index) => <li key={index}>{item.text}</li>)}\n    </ul>\n  );\n  */\n \n  // GOOD: Stable ID as key\n  return (\n    <ul>\n      {items.map(item => <li key={item.id}>{item.text}</li>)}\n    </ul>\n  );\n}\n",
    output: "Renders a list using stable keys for efficient updates.",
  },

  // Q24: Class vs Functional components
  {
    id: 24,
    title: "Class vs Functional Components",
    explanation:
      "Modern React development overwhelmingly prefers functional components with Hooks.\n\n| Feature | Class Components | Functional Components (Hooks) |\n|---|---|---|\n| **State** | `this.state`, `this.setState()` | `useState` |\n| **Lifecycle** | Dedicated methods (`componentDidMount`, etc.) | `useEffect`, `useLayoutEffect` |\n| **Logic Reuse** | Higher-Order Components (HOCs), Render Props | **Custom Hooks** (Superior pattern) |\n| **`this`** | Requires careful binding or arrow functions | Lexical `this` (simpler context) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Mental Model:** Functional components use closures to capture state and props for a specific render, making them easier to reason about (no confusing lifecycle stages).\n* **Hooks Advantage:** Hooks allow stateful logic to be extracted and shared without the complexity of HOCs or render props.\n',
    codeString:
      "// Functional Component (Modern Standard)\nfunction WelcomeFunctional({ name }) {\n  const [count, setCount] = React.useState(0);\n  React.useEffect(() => {\n    // Equivalent to componentDidMount/Update/WillUnmount\n  }, [name]);\n  return <h1>Hello, {name}</h1>;\n}\n\n// Class Component (Legacy)\nclass WelcomeClass extends React.Component {\n  constructor(props) { super(props); this.state = { count: 0 }; }\n  componentDidMount() { console.log('Mounted'); }\n  componentWillUnmount() { console.log('Unmounting'); }\n  render() { return <h1>Hello, {this.props.name}</h1>; }\n}\n",
    output: "Conceptual React code.",
    category: "React Fundamentals",
  },

  // Q25: Lifecycle methods (class components)
  {
    id: 25,
    title: "Class Component Lifecycle Methods",
    explanation:
      "The Class Component lifecycle is divided into three main phases, now largely replaced by `useEffect` in functional components.\n\n| Phase | Method | Functional Equivalent | Purpose |\n|---|---|---|---|\n| **Mounting** | `constructor` | `useState` initialization | Initial setup and state. |\n| **Mounting** | `render` | Function body return | Renders JSX output. |\n| **Mounting** | `componentDidMount` | `useEffect(..., [])` | Initial side effects (data fetching, subscriptions). |\n| **Updating** | `shouldComponentUpdate` | `React.memo` | Controls if a re-render is necessary (performance). |\n| **Updating** | `componentDidUpdate` | `useEffect(..., [deps])` | Side effects after state/props change. |\n| **Unmounting** | `componentWillUnmount` | `useEffect` cleanup return | Cleanup (e.g., clear intervals, remove listeners). |\n| **Error Handling** | `componentDidCatch` | Error Boundary (Class only) | Catches JavaScript errors in child tree. |\n",
    tips: '"Interview Tips / Pitfalls"\n* Side effects must never be executed in the `render` method (it must be a pure function).\n* Always perform initial data fetching and subscriptions in `componentDidMount` or `useEffect` with an empty dependency array.\n',
    codeString:
      "// Functional Equivalent Demonstration\nfunction MyTimer() {\n  const [seconds, setSeconds] = React.useState(0);\n\n  React.useEffect(() => {\n    // componentDidMount (runs once)\n    const id = setInterval(() => setSeconds(s => s + 1), 1000);\n\n    // componentWillUnmount (cleanup)\n    return () => clearInterval(id);\n  }, []); \n\n  // The function body acts as render()\n  return <h2>Seconds: {seconds}</h2>;\n}\n",
    output: "Conceptual React code.",
    category: "React Fundamentals",
  },

  // Q26: Hooks used day-to-day
  {
    id: 26,
    title: "Commonly Used React Hooks",
    explanation:
      "The most frequently used hooks for day-to-day development are:\n\n* **`useState`:** Local component state management.\n* **`useEffect`:** Managing all side effects and component lifecycle logic.\n* **`useContext`:** Subscribing to React Context for global state (e.g., theme, user data).\n* **`useRef`:** Accessing the DOM directly or persisting mutable values across renders without causing a re-render.\n* **`useMemo / useCallback`:** Performance optimization (memoization).\n* **`useReducer`:** Alternative to `useState` for complex state logic or when the next state depends on the previous state in intricate ways.\n",
    tips: '"Interview Tips / Pitfalls"\n* **useReducer vs useState:** Use `useReducer` when state transitions are complex, involve multiple sub-values, or when the next state depends on the previous state. It\'s also preferable when passing dispatch functions down to avoid unnecessary re-renders in children.\n',
    codeString:
      "import { useState, useReducer, useRef } from 'react';\n\nfunction HookDemo() {\n  // useState\n  const [count, setCount] = useState(0); \n\n  // useRef (persists 'current' value without re-render)\n  const inputRef = useRef(null); \n  \n  // useReducer (for complex state: equivalent of Redux-lite)\n  const [state, dispatch] = useReducer((s, a) => a.type === 'inc' ? s + 1 : s, 0);\n\n  return (\n    <div>\n      <input ref={inputRef} />\n      <button onClick={() => setCount(count + 1)}>State Count: {count}</button>\n      <button onClick={() => dispatch({ type: 'inc' })}>Reducer State: {state}</button>\n    </div>\n  )\n}\n",
    output: "Conceptual React code.",
    category: "React Fundamentals",
  },

  // Q27: Syntax for useEffect
  {
    id: 27,
    title: "Syntax and Behavior of useEffect (Deep Dive)",
    explanation:
      "The syntax for `useEffect` is: `useEffect(effectFunction, dependencyArray)`.\n\n* **`effectFunction`:** Contains the side effect logic (runs after render).\n* **Cleanup Function (returned from `effectFunction`):** This optional function runs right before the effect re-runs (if dependencies change) and runs on component **unmount**.\n* **Dependency Array (`[]`):** Controls when the effect re-runs.\n\n| Dependency Array | Behavior | Analogy |\n|---|---|---|\n| **Absent** | Runs after *every* render. | `componentDidMount` + `componentDidUpdate` (always) |\n| **`[]` (Empty)** | Runs only **once** after the initial mount. | `componentDidMount` + `componentWillUnmount` (cleanup) |\n| **`[deps]`** | Runs on mount and whenever one of the listed dependencies changes. | `componentDidMount` + `componentDidUpdate` (selectively) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Rule of Thumb:** Always include all external values (props, state, or functions) used inside the effect function in the dependency array. If you omit one, you create a stale closure.\n',
    codeString:
      "import React, { useState, useEffect } from 'react';\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  \n  useEffect(() => {\n    console.log('Effect mounted');\n    const id = setInterval(() => setSeconds(s => s + 1), 1000);\n    \n    // The cleanup function\n    return () => {\n      console.log('Cleanup: interval cleared');\n      clearInterval(id);\n    };\n  }, []); // Empty array: runs only on mount/unmount\n\n  return <h2>Seconds: {seconds}</h2>;\n}\n",
    output:
      "Run in a React environment. Logs 'Cleanup: interval cleared' on unmount.",
    category: "React Fundamentals",
  },

  // Q28: Dependency array behavior
  {
    id: 28,
    title: "Dependency Array Best Practices and Stale Closures",
    explanation:
      "The dependency array is key to performance and correctness in React Hooks. Its purpose is to tell React whether the state or props accessed inside the hook are **stale** (outdated) or **current**.\n\n* **Stale Closure:** Occurs when a hook depends on a value that changes, but that value is not included in the dependency array. The effect will continue to use the *old* value captured from the initial render.\n* **Functions as Dependencies:** Functions created inside the component body are recreated on every render, which often triggers unnecessary effect re-runs.\n",
    tips: '"Interview Tips / Pitfalls"\n* **The Solution for Functions:** Use **`useCallback`** to memoize function references and pass the memoized function into the dependency array. This prevents the effect from re-running unless the function\'s internal dependencies change.\n* **The Solution for Values:** Use **`useMemo`** to stabilize object or array references if they are being passed to a hook or down to a child component.\n',
    codeString:
      "import React, { useState, useEffect, useCallback } from 'react';\n\nfunction StaleClosureDemo() {\n  const [count, setCount] = useState(0);\n\n  // This function is recreated on every render!\n  const logCount = () => {\n    console.log('Logging count:', count);\n  };\n  \n  // This effect would re-run on every render because 'logCount' is a new function reference\n  // useEffect(() => { console.log('Log count changes'); }, [logCount]); \n\n  // Correct approach: Use useCallback to stabilize the reference\n  const stableLogCount = useCallback(() => {\n    console.log('Stable Log:', count);\n  }, [count]); // This function only changes when 'count' changes\n\n  useEffect(() => {\n    console.log('Effect ran because stableLogCount changed');\n  }, [stableLogCount]); // Effect only runs when count changes (correct behavior)\n\n  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;\n}\n",
    output: "Run in a React environment. Logs only when 'count' updates.",
    category: "React Fundamentals",
  },

  // Q29: React Fragments
  {
    id: 29,
    title: "React Fragments",
    explanation:
      "React components must return a single root element. **Fragments** solve the common problem of needing to return multiple sibling elements without introducing an extra, unnecessary DOM node (like an extra `<div>`) to wrap them.\n\n* **Short Syntax:** `<>...</>` (cannot accept keys or props).\n* **Full Syntax:** `<React.Fragment>...</React.Fragment>` (allows for the `key` attribute).\n",
    tips: '"Interview Tips / Pitfalls"\n* **Use Case for Full Syntax:** The primary reason to use the full `<React.Fragment>` syntax is when rendering a list of elements where you need to apply a **key** to the fragment itself.\n',
    codeString:
      "function TableRows({ data }) {\n  // If we wrapped these in a <div>, the HTML table structure would break.\n  return (\n    // <> is shorthand for <React.Fragment>\n    <>\n      {data.map(item => (\n        // Key is required when mapping, and applied here to the Fragment\n        <React.Fragment key={item.id}>\n          <td>{item.id}</td>\n          <td>{item.name}</td>\n        </React.Fragment>\n      ))}\n    </>\n  );\n}\n",
    output: "Renders table data without extra wrapper elements.",
    category: "React Fundamentals",
  },

  // Q34: Parent-child re-render behavior & optimization
  {
    id: 34,
    title: "Parent-Child Re-render Behavior and Optimization",
    explanation:
      "In React, when a parent component re-renders (due to state or prop changes), by default, **all of its children re-render as well**, even if the child's props haven't conceptually changed.\n\n## Avoiding Unnecessary Re-renders\nTo prevent this, use memoization techniques:\n\n1.  **`React.memo` (Component):** A Higher-Order Component (HOC) that wraps a functional component. It performs a **shallow comparison** of the component's props between renders. If the props are identical, React skips the re-render.\n2.  **Stable Props (`useMemo` / `useCallback`):** When passing complex props (objects, arrays, or functions) to a `React.memo` child, you must stabilize the reference using `useMemo` or `useCallback`. If you pass an inline object `{{ count: 1 }}`, the reference changes every render, defeating memoization.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Shallow Comparison:** Explain that `React.memo` only compares at the top level. If a prop is an object and an inner property changes, React.memo won\'t catch it unless you provide a custom comparison function.\n',
    codeString:
      "// 1. Memoized Child Component\nconst Child = React.memo(function Child({ data, onClick }) {\n  console.log('Child rendered (only on prop change)');\n  return <div>Data: {data.value}</div>;\n});\n\nfunction ParentComponent() {\n  const [parentCount, setParentCount] = React.useState(0);\n  const [dataValue, setDataValue] = React.useState(1);\n  \n  // 2. Stable Props (MUST use useMemo/useCallback to stabilize object/function references)\n  const stableData = React.useMemo(() => ({ value: dataValue }), [dataValue]);\n  const stableCallback = React.useCallback(() => console.log('Click'), []);\n\n  return (\n    <div>\n      <button onClick={() => setParentCount(c => c + 1)}>\n        Re-render Parent ({parentCount})\n      </button>\n      <button onClick={() => setDataValue(d => d + 1)}>Change Data</button>\n      {/* Child only re-renders when dataValue changes */}\n      <Child data={stableData} onClick={stableCallback} />\n    </div>\n  );\n}\n",
    output:
      "Run in a React environment. Logs 'Child rendered...' only when Data changes, not when ParentCount changes.",
    category: "React Fundamentals",
  },

  // Q35: What is Redux? When to use?
  {
    id: 35,
    title: "Redux (and Redux Toolkit)",
    explanation:
      "Redux is a predictable **state container** for JavaScript applications, following a strict unidirectional data flow:\n\n1.  **View** dispatches an **Action**.\n2.  The Action reaches the **Reducer** (pure function).\n3.  The Reducer computes a new state based on the Action.\n4.  The central **Store** holds the single source of truth (state).\n5.  The View subscribes to the Store for updates.\n\n## When to use Redux\nUse Redux when you have:\n* Global state shared by many components across different parts of the application.\n* Complex state transitions that require predictable logic.\n* Need for logging, time-travel debugging, and advanced middleware (Thunks/Sagas) for side effects.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Redux Toolkit (RTK):** Mention that RTK is the modern, recommended way to use Redux, drastically reducing boilerplate using `createSlice` and simplifying configuration with `configureStore`.\n* **Immutability:** Stress that reducers *must* be pure and immutable (never modify the existing state object/array, always return a new one).\n',
    codeString:
      "// Conceptual Redux Toolkit Code (Simplified)\n/*\nimport { configureStore, createSlice } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: 0,\n  reducers: {\n    increment: state => state + 1, // RTK uses Immer, allowing 'safe' mutation syntax\n    add: (state, action) => state + action.payload,\n  }\n});\n\nconst store = configureStore({ \n  reducer: counterSlice.reducer // Add other slice reducers here\n});\n\n// Example dispatch\nstore.dispatch(counterSlice.actions.increment());\n*/\n",
    output: "Conceptual Redux Toolkit code.",
    category: "React Fundamentals",
  },
  // Q36: Context API vs Redux
  {
    id: 36,
    title: "Context API vs Redux",
    explanation:
      "| Feature | Context API | Redux |\n|---|---|---|\n| **Best For** | Theme, localization, user settings (infrequently updated). | Complex, frequently updated global state, large-scale app data. |\n| **Complexity** | Low (simple Provider/Consumer model). | High (requires actions, reducers, store configuration). |\n| **Tooling** | Minimal. | Excellent (DevTools, middleware for side effects). |\n| **Performance** | Can cause excessive re-renders (all consumers re-render when context value changes). | Optimized (only connected components re-render). |\n",
    tips: "\"Interview Tips / Pitfalls\"\n* **Context Re-rendering:** Explain that Context's biggest performance challenge is that if the value passed to the `Provider` changes, **all consumers re-render, even if they only used a small part of the value**.\n* **Solution:** Use `useMemo` to stabilize the Context value, or split state into multiple, smaller Contexts to isolate updates.\n* **Combination:** It's common to use Context for simple, UI-related global state (theme, language) and Redux for complex application data.\n",
    codeString:
      "// Context Example\nconst ThemeContext = React.createContext('light');\n\nfunction ThemedComponent() {\n  const theme = React.useContext(ThemeContext);\n  return <p style={{ color: theme === 'dark' ? 'white' : 'black' }}>Styled text</p>\n}\n",
    output: "Conceptual React Context code.",
    category: "React Fundamentals",
  },
  // Q40: Show/Hide div button example (React)
  {
    id: 40,
    title: "Show/Hide Div Button Example (React)",
    explanation:
      "This is the simplest way to toggle visibility in React using local state and conditional rendering (`&& operator`).\n\n* **Conditional Rendering:** The expression `{show && <div>Content</div>}` means the content `div` is only included in the output if the `show` state is `true`. If `show` is `false`, the entire block is skipped, equivalent to `display: none` (element removed from DOM).\n* **State Update:** Using the updater function `setShow(s => !s)` is best practice, as it ensures you are always toggling the state based on its most recent value, preventing race conditions.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Accessibility:** For better accessibility, include an `aria-expanded` attribute on the button to inform screen readers of the state.\n* **Alternative Hiding:** If you want the content to remain in the DOM (e.g., for animations), you would use a CSS class that sets `visibility: hidden` or `height: 0`, instead of conditional rendering.\n',
    codeString:
      'import React from \'react\';\n\nfunction ToggleContent() {\n  const [show, setShow] = React.useState(true);\n  \n  const handleToggle = () => {\n    // Safely update state using the previous value\n    setShow(s => !s);\n  };\n\n  return (\n    <div className="p-4 border rounded shadow">\n      <button \n        onClick={handleToggle} \n        className="bg-blue-500 text-white p-2 rounded"\n        aria-expanded={show} // A11y\n      >\n        {show ? \'Hide Content\' : \'Show Content\'}\n      </button>\n      \n      {/* Conditional Rendering: If show is true, render the div */}\n      {show && (\n        <div className="mt-4 p-4 bg-gray-100 border rounded" id="toggle-content">\n          <p>This content is currently visible and in the DOM.</p>\n        </div>\n      )}\n    </div>\n  );\n}\n// export default ToggleContent;\n',
    output: "Run in a React environment. Clicking toggles visibility.",
    category: "React Fundamentals",
  },
  // Q54: memo vs useMemo
  {
    id: 54,
    title: "React: `React.memo` vs `useMemo`",
    explanation:
      "| Feature | React.memo | useMemo |\n|---|---|---|\n| **What it Caches** | The rendered **output of a component** (avoids re-rendering the whole component). | A computed **value** (avoids re-calculating a value). |\n| **Input** | A component function. | A function and a dependency array. |\n| **Behavior** | HOC (Higher-Order Component). Performs shallow comparison of **props**. | Hook. Performs shallow comparison of **dependencies**. |\n",
    tips: "\"Interview Tips / Pitfalls\"\n* **Use `React.memo`** to prevent a child component from re-rendering when its parent re-renders, provided the child's props haven't changed.\n* **Use `useMemo`** to prevent expensive local calculations *inside* a component, or to stabilize an object/array reference being passed as a prop to a `React.memo` child.\n",
    codeString:
      "// 1. React.memo (Component Memoization)\nconst Display = React.memo(({ value }) => {\n  console.log('Display component rendering...');\n  return <div>Value: {value}</div>;\n});\n\n// 2. useMemo (Value Memoization)\nfunction Parent({ list }) {\n  const [filter, setFilter] = React.useState('');\n  \n  // This value is only recalculated if 'list' or 'filter' changes\n  const filteredList = React.useMemo(() => {\n    // Heavy filtering logic here\n    return list.filter(item => item.includes(filter));\n  }, [list, filter]);\n\n  return (\n    <div>\n      <input onChange={e => setFilter(e.target.value)} />\n      <Display value={filteredList.length} />\n    </div>\n  );\n}\n",
    output: "Conceptual React code demonstrating memoization.",
    category: "React Fundamentals",
  },

  // Q55: componentWillUnmount equivalent in function components
  {
    id: 55,
    title: "componentWillUnmount Equivalent in Functional Components",
    explanation:
      "The cleanup logic previously handled by `componentWillUnmount` in class components is now managed by the **return function** inside `useEffect`.\n\n* **Mechanism:** React calls the cleanup function when the component unmounts from the DOM.\n* **Additionally:** React also runs the cleanup function **before the effect re-runs** due to a dependency change, ensuring a clean slate.\n\n## Use Case\nThis is essential for canceling subscriptions, clearing timers, removing event listeners, and aborting long-running asynchronous requests to prevent memory leaks and state updates on unmounted components.\n",
    tips: '"Interview Tips / Pitfalls"\n* Show an example of clearing a `setInterval` using the cleanup return. This is the most common and clearest demonstration.\n* The dependency array must be `[]` for the cleanup to run *only* on unmount, or include dependencies for cleanup logic that should run *before* each re-run of the effect.\n',
    codeString:
      "import React, { useEffect } from 'react';\n\nfunction Logger() {\n  useEffect(() => {\n    console.log('Component Mounted: Starting log interval.');\n    const logId = setInterval(() => console.log('TICK...'), 2000);\n    \n    // Cleanup function (Equivalent to componentWillUnmount)\n    return () => {\n      console.log('Component Unmounting: Clearing log interval.');\n      clearInterval(logId);\n    };\n  }, []); // Only runs on mount and cleanup on unmount\n\n  return <div>Check console for logs.</div>;\n}\n",
    output: "Conceptual React code demonstrating cleanup on unmount.",
    category: "React Fundamentals",
  },

  // Q56: Expand/collapse nested folder algorithm (conceptual)
  {
    id: 56,
    title: "Expand/Collapse Nested Folder Algorithm (Conceptual)",
    explanation:
      "The core of a collapsible tree view is managing the **state** of each node (whether it's open or closed) and using **recursion** to render the structure.\n\n1.  **Data Structure:** The data is usually a nested array of objects, where each object has a `name`, an `id`, an `isOpen` boolean, and an optional `children` array.\n2.  **State Management:** The `isOpen` state for all nodes is typically managed centrally at the top-level component, which passes down a `toggle` function.\n3.  **Recursion:** The component calls itself (`TreeNode`) for every item in its `children` array.\n4.  **Conditional Rendering:** The children are only rendered if `node.isOpen` is `true`.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Unique Keys:** Highlight the necessity of stable, unique `key` props for every node rendered in the loop.\n* **Performance:** For very large trees, discuss using **Virtualization** (only rendering nodes currently visible in the viewport) to maintain performance.\n',
    codeString:
      '// Mock Data Structure: Array of nested objects\nconst initialData = [\n  { id: 1, name: "Root", isOpen: true, children: [\n    { id: 2, name: "Folder A", isOpen: false, children: [\n      { id: 3, name: "File 1" }\n    ]},\n    { id: 4, name: "Folder B", isOpen: true, children: [\n      { id: 5, name: "File 2" }\n    ]}\n  ]}\n];\n\nfunction TreeNode({ node, onToggle }) {\n  // Base case: If no children, render the name\n  if (!node.children) {\n    return <div className="ml-4">📄 {node.name}</div>;\n  }\n\n  return (\n    <div className="p-1">\n      <div \n        onClick={() => onToggle(node.id)} \n        className="cursor-pointer font-bold"\n      >\n        {node.isOpen ? \'[-] \' : \'[+] \'} 📁 {node.name}\n      </div>\n      \n      {/* Recursive step: conditionally render children */}\n      {node.isOpen && (\n        <div className="ml-4 border-l pl-2">\n          {node.children.map(c => (\n            <TreeNode key={c.id} node={c} onToggle={onToggle} />\n          ))}\n        </div>\n      )}\n    </div>\n  );\n}\n// Top-level component would manage the state of the whole tree\n',
    output: "Conceptual React code for a recursive tree view.",
    category: "React Fundamentals",
  },
  // Q70: Complex React component task
  {
    id: 70,
    title: "Complex React Component Task (State Machine Logic)",
    explanation:
      "This task requires managing three asynchronous operations and component state simultaneously, demanding careful use of `useState` and `useEffect` to handle side effects and dependencies.\n\n## Key Logic\n1.  **Async/Await in Handler:** The `handleClick` function is `async` to sequentially call `getPromise()` and then `randomFunc()`.\n2.  **External Effect:** An initial `useEffect` is used to trigger `randomFunc` on mount to set the initial `num` state.\n3.  **Dependent Effect:** A second `useEffect` runs whenever `num` changes to calculate parity via `getEven(num)` and update the `on` state accordingly.\n4.  **Cleanup:** The dependent effect includes cleanup using the `mounted` flag to prevent race conditions (if `num` changes while `getEven` is in flight) and setting state on an unmounted component.\n",
    tips: '"Interview Tips / Pitfalls"\n* The primary pitfall is the **race condition** in the second `useEffect`. The cleanup flag (`mounted = false`) is the simplest way to solve this by ignoring stale promise results.\n',
    codeString:
      "import React, { useState, useEffect, useCallback } from 'react';\n\n// Mock functions (passed as props in the task description)\nconst getPromise = () => new Promise(res => setTimeout(res, 500, 'Done'));\nconst getEven = (num) => new Promise(res => setTimeout(res, 200, num % 2 === 0));\nconst randomFunc = (setter) => setter(Math.floor(Math.random() * 10));\n\nfunction ComplexButton() { // Using mock functions locally for demonstration\n  const [on, setOn] = useState(true);\n  const [num, setNum] = useState(null);\n  const [loading, setLoading] = useState(false);\n\n  // 1. Initial/Cleanup Effect: Set initial random number on mount\n  useEffect(() => {\n    randomFunc(setNum); \n  }, []); \n\n  // 2. State-Dependent Effect: Check parity of the number\n  useEffect(() => {\n    if (num === null) return;\n    setLoading(true);\n    let mounted = true;\n\n    getEven(num).then(isEven => {\n      if (mounted) {\n        setOn(isEven);\n        setLoading(false);\n      }\n    }).catch(console.error);\n\n    return () => { mounted = false; }; // Cleanup for race conditions/unmount\n  }, [num]);\n\n  // 3. Click Handler: Controls main state transition\n  const handleClick = useCallback(async () => {\n    if (!on || loading) { \n      setOn(true); // If Off, just set On\n      return; \n    }\n    \n    setLoading(true);\n    try {\n      await getPromise();\n      setOn(false); // Turn off after successful promise\n    } catch(e) {\n      console.error(\"Promise failed:\", e);\n    } finally {\n      randomFunc(setNum); // Always set new random number after attempt\n      setLoading(false);\n    }\n  }, [on, loading]);\n\n  return (\n    <div className=\"flex flex-col items-center p-6 border rounded-lg shadow-lg\">\n      <p className=\"text-lg\">Current Number: {num === null ? '...' : num}</p>\n      <p className=\"text-xl font-semibold mb-4\">State: {loading ? 'Processing...' : (on ? 'ON' : 'OFF')}</p>\n      \n      <button \n        onClick={handleClick} \n        disabled={loading}\n        className={`p-3 rounded-full text-white w-32 font-bold transition duration-150 ${on ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}\n      >\n        {loading ? 'WAIT' : (on ? 'Click to Run' : 'Turn ON')}\n      </button>\n    </div>\n  );\n}\n// export default ComplexButton;\n",
    output: "Conceptual React code for a complex state component.",
    category: "React Fundamentals",
  },

  // Q92: React DOM Rendering Process (The Three Phases) - MASTER Q98
  {
    id: 92,
    title: "React DOM Rendering Process (The Three Phases)",
    explanation:
      "The React rendering pipeline is split into three phases: **Trigger**, **Render**, and **Commit**. This ensures updates are batched and the DOM is only manipulated once per update cycle, maximizing efficiency.\n\n### 1. Trigger\nAn update is initiated by a component's state change (e.g., `setState`, `useState` setter, `useReducer` dispatch) or a prop change from the parent.\n\n### 2. Render (Reconciliation)\nReact performs its calculations in memory:\n* It calls the component functions (`render` method or function body).\n* It generates a new element tree (Virtual DOM).\n* It compares the **New VDOM** with the **Previous VDOM** using the **Diffing Algorithm** (Q14) to find minimal changes (the 'patch').\n* This phase can be paused or interrupted (allowing concurrent rendering).\n\n### 3. Commit\nReact applies the changes found in the Diffing phase to the actual browser DOM. This phase is synchronous and blocking, as it directly manipulates the browser's view:\n* React updates the real DOM nodes.\n* The browser performs the final paint.\n* Lifecycle effects run (`useEffect`, `componentDidMount/Update`).",
    tips: '"Interview Tips / Pitfalls"\n* The key takeaway is the separation: **Render is pure and happens in memory; Commit is impure and touches the DOM.**\n* Explain that state updates **don\'t guarantee an immediate DOM update** because of the reconciliation process and potential batching.\n* Emphasize that the Render phase must be **pure** (no side effects, no direct DOM access, no mutating state).',
    codeString:
      "function Component() {\n  const [count, setCount] = React.useState(0);\n  \n  // Phase 1: Trigger (User action calls setter)\n  const handleClick = () => setCount(c => c + 1);\n\n  // Phase 2: Render (Function executes, JSX is generated/compared)\n  console.log('Rendering component...');\n\n  // Phase 3: Commit (Effect runs after DOM updates)\n  React.useEffect(() => {\n    console.log('Commit Phase: DOM update is visible now.');\n  }, [count]);\n\n  return <button onClick={handleClick}>Click</button>;\n}\n",
    output:
      "Rendering component...\nCommit Phase: DOM update is visible now. (The order repeats on subsequent clicks)",
    category: "React Fundamentals",
  },

  // ASYNCHRONICITY & PROMISES

  // Q9: Event loop, microtask vs macrotask queues
  {
    id: 9,
    title: "Event Loop, Microtasks vs Macrotasks",
    category: "Asynchronicity & Promises",

    explanation:
      "The **Event Loop** is the mechanism that allows JavaScript (a single-threaded language) to perform non-blocking asynchronous operations.\n\n1.  **Call Stack:** Executes synchronous code.\n2.  **Web APIs/Node APIs:** Handle asynchronous operations (e.g., `setTimeout`, `fetch`).\n3.  **Queues:** Callbacks from Web APIs go into one of two queues:\n\n* **Microtask Queue (High Priority):** Includes **Promise callbacks** (`.then()/.catch()/.finally()`), **`await`** continuations, `queueMicrotask`, and `MutationObserver`. **Crucially, the Microtask Queue is emptied completely after the Call Stack is empty, and before the browser renders or processes the next macrotask.**\n* **Macrotask Queue (Low Priority):** Includes **Timers** (`setTimeout`, `setInterval`), **I/O** callbacks, and UI rendering. Only one macrotask is processed per loop cycle.\n",
    tips: '"Interview Tips / Pitfalls"\n* The primary ordering rule is: **Stack > Microtasks > Macrotasks**.\n* This means a `Promise.resolve().then()` (microtask) will always execute *before* a `setTimeout(() => {}, 0)` (macrotask), even if the timer is set to 0ms.\n',
    codeString:
      "console.log('1. Start (Sync)');\n\nsetTimeout(() => console.log('4. Timeout (Macrotask)'), 0);\n\nPromise.resolve().then(() => console.log('3. Promise (Microtask)'));\n\nconsole.log('2. End (Sync)');\n",
    output:
      "1. Start (Sync)\n2. End (Sync)\n3. Promise (Microtask)\n4. Timeout (Macrotask)",
  },

  // Q18: async/await vs Promises
  {
    id: 18,
    title: "async/await vs Promises",
    explanation:
      "**`async/await` is syntactic sugar built on top of Promises.** They achieve the same goal (managing asynchronous operations) but with different syntax.\n\n| Feature | Promises (`.then/.catch`) | async/await |\n|---|---|---|\n| **Syntax** | Chainable methods, function returns Promise | Looks synchronous, function returns Promise |\n| **Error Handling** | `.catch()` method | `try...catch` blocks |\n| **Concurrency** | Needs `Promise.all()` | Sequential by default (needs `Promise.all()` or firing promises first) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Error Handling:** Demonstrate using `try...catch` with `await` as the equivalent of a `.catch()` block.\n* **Concurrency Trap:** Explain that using `await` in a loop is inherently sequential and slow. For parallel execution, you must fire all asynchronous calls first and then `await Promise.all([p1, p2, p3])`.\n* **Mechanism:** An `await` keyword essentially pauses the execution of the `async` function and schedules the rest of the function\'s body as a **microtask** once the awaited Promise resolves.\n',
    codeString:
      "function mockFetch(success) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      success ? resolve({ data: 'Resolved Data' }) : reject('API Failed');\n    }, 100);\n  });\n}\n\n// 1. Promise Style\nmockFetch(true)\n  .then(data => console.log('Promise success:', data.data))\n  .catch(err => console.error('Promise error:', err));\n\n// 2. Async/Await Style\nasync function loadData() {\n  try {\n    const data = await mockFetch(false);\n    console.log('Async success:', data.data); // Skipped on error\n  } catch (err) {\n    console.error('Async error:', err);\n  }\n}\nloadData();\n",
    output:
      "Promise success: Resolved Data\nAsync error: API Failed (or similar based on execution order)",
    category: "Asynchronicity & Promises",
  },
  // Q42: Callback vs Promise APIs
  {
    id: 42,
    title: "Callback vs Promise APIs — differences & migration",
    explanation:
      "| Feature | Callback APIs | Promise APIs |\n|---|---|---|\n| **Success/Error** | Separate arguments or separate functions passed. | Single object handles both (`.then` / `.catch`). |\n| **Composability** | Poor, leads to **Callback Hell** (Pyramid of Doom). | Excellent (`.then` chaining, `Promise.all`). |\n| **Error Handling** | Must be checked manually in every callback. | Standardized with `.catch` or `try...catch` (with `async/await`). |\n\n**Migration (Promisify):** The process of wrapping a callback-based function to return a Promise, allowing it to be used with modern `.then` syntax or `async/await`.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Callback Hell:** Use the `fs.readFile` Node.js example to visually show the deeply nested nature of callback hell.\n* **Promisify Utility:** Show the common pattern of wrapping a callback function inside a new Promise constructor, resolving on success and rejecting on error.\n',
    codeString:
      "// 1. Callback-style API (Example: Node.js fs module)\n/*\nfs.readFile('file.txt', (err, data) => {\n  if (err) {\n    console.error('Callback error:', err);\n    return;\n  }\n  fs.writeFile('out.txt', data, (err) => {\n    // Nested callbacks lead to 'Pyramid of Doom'\n  });\n});\n*/\n\n// 2. Promisifying a callback function\nfunction promisify(callbackFn) {\n  return function(...args) {\n    return new Promise((resolve, reject) => {\n      // Pass the standard Node (err, result) callback function\n      callbackFn(...args, (err, result) => {\n        if (err) return reject(err);\n        resolve(result);\n      });\n    });\n  };\n}\n",
    output: "Conceptual code showing callback vs promise migration.",
    category: "Asynchronicity & Promises",
  },

  // Q43: Modern Data Fetching with `fetch` and `async/await`
  {
    id: 43,
    title: "Modern Data Fetching with `fetch` and `async/await`",
    explanation:
      "The native `fetch` API returns a Promise that resolves when the request completes, but importantly, it only **rejects on network errors** (e.g., DNS error, offline). It **does not reject on HTTP error statuses** (like 404, 500).\n\n## Critical Error Handling\nYou must manually check the `response.ok` property (which is `true` for status 200–299) to determine if the HTTP response was successful.\n",
    tips: '"Interview Tips / Pitfalls"\n* Always include a check for `!res.ok` and manually throw an `Error` to catch HTTP errors in the `try...catch` block.\n* Mention using `AbortController` for cleanup to handle request cancellation.\n',
    codeString:
      "// Function to handle the actual fetching\nasync function getFruits() {\n  const URL = '/api/fruits'; // Mock endpoint\n  try {\n    const res = await fetch(URL);\n    \n    // IMPORTANT: fetch does not throw on 404/500, so we check manually\n    if (!res.ok) { \n      throw new Error(`Network response was not ok, status: ${res.status}`);\n    }\n    \n    // Convert to JSON\n    const fruits = await res.json();\n    console.log('Fetched:', fruits);\n    return fruits;\n    \n  } catch (err) {\n    console.error('Fetch failed:', err.message);\n    // Rethrow or handle error state\n    throw err;\n  }\n}\n",
    output: "Conceptual function for robust data fetching.",
    category: "Asynchronicity & Promises",
  },

  // Q44: Axios example & differences vs fetch
  {
    id: 44,
    title: "Axios vs Fetch",
    explanation:
      "**Axios** is a third-party library that wraps the older `XMLHttpRequest` (or `fetch` in Node) but provides a much more developer-friendly API.\n\n| Feature | Fetch (Native) | Axios (Library) |\n|---|---|---|\n| **Error Handling** | Manual check for `response.ok` required. | **Rejects automatically** on 4xx/5xx status. |\n| **Data Handling** | Requires manual `response.json()` call. | Automatic JSON data parsing. |\n| **API** | Promise-based. | Promise-based. |\n| **Interceptors** | No native support. | **Supports interceptors** (global pre/post hooks). |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Interceptors:** Explain the primary benefit of Axios is interceptors, which allow you to automatically inject an authorization token into every request or handle global error notifications in one place.\n* **Cancellation:** Axios traditionally used cancellation tokens; now, both libraries support `AbortController`.\n',
    codeString:
      "// Requires Axios library to run\n/*\nimport axios from 'axios';\n\naxios.get('/api/fruits')\n  .then(res => {\n    // No need for res.json(), data is directly in res.data\n    console.log('Axios Data:', res.data); \n  })\n  .catch(err => {\n    // Axios catches 4xx/5xx errors here automatically\n    console.error('Axios Error:', err.response || err.message); \n  });\n*/\n",
    output: "Conceptual Axios code.",
    category: "Asynchronicity & Promises",
  },

  // Q72: Event loop ordering code snippet
  {
    id: 72,
    title: "Event Loop Ordering (Microtask vs Macrotask)",
    explanation:
      "This is a classic Event Loop question testing the understanding of the Microtask Queue's priority.\n\n1.  **Sync Code:** `console.log('1')` and `console.log('4')` run immediately in the Call Stack.\n2.  **Microtask:** `Promise.resolve().then(()=>console.log('3'))` is placed in the Microtask Queue.\n3.  **Macrotask:** `setTimeout(()=>console.log('2'),0)` is placed in the Macrotask Queue.\n4.  The Event Loop empties the Microtask Queue entirely (running '3') before checking the Macrotask Queue (running '2').\n\n## Ordering: Stack (1, 4) -> Microtask (3) -> Macrotask (2)\n",
    tips: '"Interview Tips / Pitfalls"\n* The primary ordering rule is: **Stack > Microtasks > Macrotasks**.\n* This means a `Promise.resolve().then()` (microtask) will always execute *before* a `setTimeout(() => {}, 0)` (macrotask), even if the timer is set to 0ms.\n',
    codeString:
      "console.log('1');\n\n// Macrotask (runs last)\nsetTimeout(()=>console.log('2'), 0); \n\n// Microtask (runs before macrotasks)\nPromise.resolve().then(()=>console.log('3')); \n\nconsole.log('4');\n",
    output: "1\n4\n3\n2",
    category: "Asynchronicity & Promises",
  },

  // Q77: Promise Static Methods (Complete Set & Parallel Execution) - MASTER Q80
  {
    id: 77,
    title: "Promise Static Methods (Complete Set & Parallel Execution)",
    explanation:
      "JavaScript Promises provide static methods to handle multiple asynchronous tasks, aggregate results, or control timing. These methods are crucial for complex asynchronous orchestration.\n\n| Method | Behavior | Key Takeaway |\n|---|---|---|\n| **.all(iter)** | Resolves when **all** promises resolve. Rejects immediately on first rejection. | Fail-fast, parallel execution. |\n| **.race(iter)** | Settles with the **first promise** that resolves or rejects. | Useful for setting timeouts. |\n| **.allSettled(iter)** | Resolves when **all** promises settle (fulfilled or rejected). | Never rejects, provides status for every outcome. |\n| **.any(iter)** | Resolves when **any** promise resolves. Rejects only if **all** promises fail. | Success-first, resilient aggregation. |\n\n### Parallel Execution\n`Promise.all` executes tasks concurrently (in parallel) and aggregates the results, preserving the original order of the input Promises.",
    tips: '"Interview Tips"\n* **Concurrency:** `Promise.all` achieves parallelism, significantly faster than sequential execution (Q83).\n* **Order Preservation:** The result array from `Promise.all` always matches the order of the input array, regardless of which promise finished first.\n* **Error Handling:** If using `Promise.all`, wrap the call in `try...catch` or use `.catch()` to handle the failure of the first rejected promise.',
    codeString:
      "const delayAndResolve = (i, delay) => {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      resolve(i);\n    }, delay);\n  });\n};\n\nconst tasks = [\n  delayAndResolve(1, 400), \n  delayAndResolve(2, 100), \n  delayAndResolve(3, 200), \n];\n\n// Promise.all: Executes all tasks in parallel\nPromise.all(tasks).then(results => {\n  console.log('Promise.all Results (Order preserved):', results); // [1, 2, 3]\n});\n\n// Promise.race: Finishes with the fastest one (Task 2)\nPromise.race(tasks).then(fastest => {\n  console.log('Promise.race Result:', fastest); // 2\n});\n\n// Promise.reject()\nPromise.reject('Error!').catch(e => console.log('Promise.reject:', e));\n",
    output:
      "Promise.race Result: 2\nPromise.reject: Error!\nPromise.all Results (Order preserved): [1, 2, 3]",
    category: "Asynchronicity & Promises",
  },
  // Q79: Promises in Sequence (Sequential Execution)
  {
    id: 79,
    title: "Promises in Sequence (Sequential Execution)",
    explanation:
      "Executing an array of promises or async functions sequentially (one after the other) is crucial when the next task depends on the previous one, or when you need to avoid overwhelming a resource with concurrent requests.\n\n## Implementation via Reduce\nThis is best achieved using the **Array.prototype.reduce()** method. The accumulator starts as a resolved promise. In each iteration, we chain the next promise using `.then()` onto the accumulator, ensuring the chain only moves forward after the current promise resolves.",
    tips: '"Interview Tips / Pitfalls"\n* **Contrast with Promise.all:** Promise.all executes concurrently; sequential execution ensures order and dependency handling.\n* **Reduce Starting Point:** The accumulator must be initialized to a resolved promise (`Promise.resolve()`) to start the chain.\n* **Error Handling:** A single rejection will stop the entire chain and propagate to the final `.catch()` block.',
    codeString:
      "const asyncTask = (msg, delay) => {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      console.log(`Task: ${msg} resolved after ${delay}ms`);\n      resolve(msg);\n    }, delay);\n  });\n};\n\nconst tasks = [\n  () => asyncTask('Task A', 100),\n  () => asyncTask('Task B', 50),\n  () => asyncTask('Task C', 150),\n];\n\n// Sequential execution using Array.reduce\nfunction executeSequentially(asyncFns) {\n  return asyncFns.reduce((promiseChain, currentTask) => {\n    // Chain the next task onto the result of the previous promise\n    return promiseChain.then(currentTask);\n  }, Promise.resolve()); // Start the chain with an immediately resolved promise\n}\n\nexecuteSequentially(tasks);\n",
    output:
      "Task: Task A resolved after 100ms\nTask: Task B resolved after 50ms\nTask: Task C resolved after 150ms",
    category: "Asynchronicity & Promises",
  },

  // Q88: MapLimit (Controlling Concurrency)
  {
    id: 88,
    title: "MapLimit (Controlling Concurrency)",
    explanation:
      "`MapLimit` is a utility that limits the maximum number of asynchronous operations running at any given time. It takes a list of tasks and a concurrency limit (`limit`), ensuring tasks are processed efficiently without overwhelming system resources or rate limits.\n\n### Approach\n1.  Initialize a pool of tasks running up to the `limit` using `Promise.all()`.\n2.  Use a queue or recursion to feed the next pending task into the pool as soon as one slot becomes free (i.e., one promise resolves).\n3.  Collect all results in the correct original order.",
    tips: '"Interview Tips / Pitfalls"\n* This question tests advanced Promise management beyond `Promise.all()`.\n* The key challenge is maintaining concurrency while preserving the order of results.\n* A simpler, common approach is to use `Array.reduce` to build a promise chain that executes the next task when the previous one is done, but this is **sequential** (Q79), not concurrent.',
    codeString:
      "// Simple mock task that returns its index after a delay\nconst createAsyncTask = (i) => new Promise(resolve => {\n  const delay = Math.random() * 500;\n  setTimeout(() => resolve(`Result ${i}`), delay);\n});\n\n// MapLimit implementation (Conceptual, showing the recursive loop pattern)\nfunction mapLimit(items, limit, asyncFunction) {\n  const results = [];\n  let index = 0;\n  \n  // Recursive function that runs one task and schedules the next\n  const runTask = () => {\n    if (index >= items.length) return Promise.resolve();\n    \n    const currentItem = items[index++];\n    \n    return asyncFunction(currentItem)\n      .then(result => {\n        results.push(result); // Store result (order must be maintained externally)\n        return runTask(); // Run the next task\n      })\n  };\n  \n  // Start the initial 'limit' number of concurrent tasks\n  const initialTasks = Array(limit).fill(0).map(runTask);\n  \n  return Promise.all(initialTasks).then(() => results);\n}\n\nconst items = [0, 1, 2, 3, 4, 5, 6, 7];\n\nmapLimit(items, 3, createAsyncTask).then(results => {\n  // Note: Actual implementation would need to handle result order carefully\n  console.log('Finished processing with limit of 3. Total results:', results.length);\n});\n",
    output:
      "Finished processing with limit of 3. Total results: 8 (Execution time is reduced vs. sequential)",
    category: "Asynchronicity & Promises",
  },
  // Q89: Cancelable Promise (using AbortController)
  {
    id: 89,
    title: "Cancelable Promise (using AbortController)",
    explanation:
      "A standard Promise is *not* inherently cancelable. Once started, it must either resolve or reject. However, modern asynchronous operations, especially `fetch`, can be canceled using the **`AbortController`** interface.\n\n### Implementation\n1.  The cancellation mechanism (`AbortController`) is external to the Promise logic.\n2.  The Promise is modified to accept the `signal` from the controller.\n3.  The asynchronous operation (e.g., `fetch`) must natively support the signal.\n4.  A canceled operation causes the Promise to reject with an `AbortError`.",
    tips: '"Interview Tips / Pitfalls"\n* This demonstrates knowledge of modern browser APIs and clean-up in asynchronous operations.\n* Emphasize that the *promise chain* itself is not being canceled, but the underlying asynchronous **work** is stopped, leading to a rejection.\n* This pattern is crucial in React\'s `useEffect` for data fetching cleanup.',
    codeString:
      "function fetchWithCancellation(url, signal) {\n  return new Promise(async (resolve, reject) => {\n    // 1. Add listener for abortion\n    signal.addEventListener('abort', () => {\n      reject(new Error('Operation aborted'));\n    });\n\n    try {\n      // 2. Pass signal to fetch\n      const response = await fetch(url, { signal });\n      const data = await response.json();\n      resolve(data);\n    } catch (error) {\n      if (error.name === 'AbortError') {\n        // Handle native AbortError (e.g., in a fetch call)\n        reject(new Error('Operation aborted by user'));\n      } else {\n        reject(error);\n      }\n    }\n  });\n}\n\n// --- Usage ---\nconst controller = new AbortController();\nconst mockUrl = 'https://mockapi.com/data';\n\nconst p = fetchWithCancellation(mockUrl, controller.signal);\n\n// Cancel the operation after 100ms\nsetTimeout(() => {\n  controller.abort();\n  console.log('Cancellation signal sent.');\n}, 100);\n\np.catch(err => {\n  console.error('Promise caught:', err.message);\n});\n",
    output:
      "Cancellation signal sent.\nPromise caught: Operation aborted by user",
    category: "Asynchronicity & Promises",
  },

  // Q93: Retry Promises N Times - MASTER Q99
  {
    id: 93,
    title: "Retry Promises N Times",
    explanation:
      "When dealing with unreliable network calls, implementing a retry mechanism ensures the application can recover from transient failures (e.g., temporary network glitches, rate limiting). The function should attempt the asynchronous task up to a maximum number of times before finally giving up.\n\n### Approach\n1.  Use a **recursive** function that takes the current attempt count.\n2.  Call the original function/promise.\n3.  If successful (`.then()`), resolve the outer promise.\n4.  If it fails (`.catch()`):\n    * If attempts remaining, wait for a delay (often with backoff) and call the function recursively.\n    * If no attempts remain, reject the outer promise.",
    tips: '"Interview Tips / Pitfalls"\n* Mention **Exponential Backoff**: This is the best practice for retry mechanisms, where the delay time increases after each failure (e.g., 1s, 2s, 4s, 8s). This prevents overwhelming the server.\n* Ensure the final rejection passes the original error reason.',
    codeString:
      "let attemptCount = 0;\n\n// Mock API that fails 3 times, succeeds on the 4th\nfunction mockApiCall() {\n  attemptCount++;\n  console.log(`Attempt ${attemptCount} made...`);\n  if (attemptCount < 4) {\n    return Promise.reject(new Error('Transient Network Failure'));\n  }\n  return Promise.resolve('Success!');\n}\n\nfunction retryPromise(fn, retries = 3, delay = 100) {\n  return new Promise((resolve, reject) => {\n    function attempt(currentAttempt) {\n      fn()\n        .then(resolve) // Success: resolve immediately\n        .catch(error => {\n          if (currentAttempt < retries) {\n            console.log(`Retry attempt ${currentAttempt + 1} scheduled after ${delay}ms`);\n            // Backoff logic: increase delay for next attempt\n            const nextDelay = delay * 2;\n            setTimeout(() => attempt(currentAttempt + 1), nextDelay);\n          } else {\n            // Failure: reject after max retries\n            reject(new Error(`Failed after ${retries} attempts: ${error.message}`));\n          }\n        });\n    }\n    attempt(0);\n  });\n}\n\nretryPromise(mockApiCall, 5, 50).then(result => {\n  console.log('FINAL RESULT:', result);\n}).catch(err => {\n  console.error('FINAL ERROR:', err.message);\n});\n",
    output:
      "Attempt 1 made...\nRetry attempt 1 scheduled after 100ms\nAttempt 2 made...\nRetry attempt 2 scheduled after 200ms\nAttempt 3 made...\nRetry attempt 3 scheduled after 400ms\nAttempt 4 made...\nFINAL RESULT: Success!",
    category: "Asynchronicity & Promises",
  },

  // PERFORMANCE & OPTIMIZATION

  // Q23: useMemo & useCallback examples - COMBINED Q25
  {
    id: 23,
    title: "React: useMemo and useCallback in practice (Deep Dive)",
    explanation:
      "Both hooks are used for **memoization** (caching) to improve performance by preventing unnecessary re-runs/re-creations.\n\n* **`useMemo` (Value):** Memoizes the **result of a computation**. Use it for expensive calculations, or stabilizing object/array references passed to child components.\n* **`useCallback` (Function):** Memoizes a **function reference**. Use it when passing functions as props to components wrapped in `React.memo`.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Avoid Premature Optimization:** Only use these hooks when profiling indicates a performance bottleneck. The hooks themselves incur a small overhead.\n* **The Problem `useCallback` Solves:** If you pass an inline function to a `React.memo` child, the child re-renders every time because the function reference changes. `useCallback` ensures the reference is stable.\n',
    codeString:
      "import React, { useState, useMemo, useCallback } from 'react';\n\nfunction ParentComponent({ items, filterText }) {\n  // 1. useMemo: Memoizes the filtered list\n  const filteredList = useMemo(() => {\n    // Only re-run this filtering if 'items' or 'filterText' changes\n    console.log('Filtering list...');\n    return items.filter(i => i.name.includes(filterText));\n  }, [items, filterText]);  \n\n  // State unrelated to the filter\n  const [count, setCount] = useState(0); \n\n  // 2. useCallback: Memoizes the function reference\n  const handleItemClick = useCallback((id) => {\n    console.log('Item clicked:', id);\n  }, []); // Empty dependency array: reference never changes\n\n  // Use filteredList and handleItemClick in child components...\n  return (\n    <div>\n      <p>Unrelated counter: {count}</p>\n      <MemoizedChild list={filteredList} onClick={handleItemClick} />\n    </div>\n  )\n}\n",
    output:
      "Run in React environment. Logs 'Filtering list...' only when inputs change.",
    category: "Performance & Optimization",
  },

  // Q39: Memoization explanation
  {
    id: 39,
    title: "Memoization (Concept and Implementation)",
    explanation:
      "**Memoization** is an optimization technique used primarily to speed up computer programs by **caching** the results of expensive function calls and returning the cached result when the same inputs occur again.\n\n* **In JavaScript:** You implement memoization by storing input arguments and their corresponding output values (usually in a `Map` or closure).\n* **In React:** `useMemo` and `React.memo` are React's built-in memoization mechanisms.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Cache Key:** The complexity lies in creating a stable and correct key for complex arguments (objects, arrays). Using `JSON.stringify(args)` is a simple but limited approach (cannot serialize functions, order-dependent).\n* **Memory Leaks:** A custom memoization function that continuously stores unique inputs can lead to memory growth if the cache is never cleared.\n',
    codeString:
      "// Custom general-purpose memoization utility\nfunction memoize(fn) {\n  const cache = new Map();\n  \n  return function(...args) {\n    // Simple key creation (caution: doesn't handle objects well)\n    const key = JSON.stringify(args); \n\n    if (cache.has(key)) {\n      console.log('Cache hit for key:', key);\n      return cache.get(key);\n    }\n    \n    console.log('Cache miss, calculating...');\n    const val = fn(...args);\n    cache.set(key, val);\n    return val;\n  };\n}\n\nconst addHeavy = (a, b) => { for(let i=0; i<1e6; i++); return a + b; };\nconst memoizedAdd = memoize(addHeavy);\n\nmemoizedAdd(1, 2); // Calculation, Cache miss\nmemoizedAdd(1, 2); // Cache hit\n",
    output: "Cache miss, calculating...\nCache hit for key: [1,2]",
    category: "Performance & Optimization",
  },

  // Q66: Optimizing CSS Loading
  {
    id: 66,
    title: "Optimizing CSS Loading",
    explanation:
      'Optimally loading CSS minimizes the Time To First Contentful Paint (TTFCP) by ensuring the browser can render content as quickly as possible.\n\n1.  **Critical CSS:** Extract the CSS required for the "Above the Fold" content and **inline** it directly into the HTML `<head>`. This allows the browser to render the initial view without waiting for a separate CSS file download.\n2.  **Asynchronous Loading:** Load the rest of the non-critical CSS files asynchronously using a combination of `rel="preload"` and a JS snippet or by setting `rel="stylesheet"` only after page load.\n3.  **Media Attribute:** Use the `media` attribute on `<link>` tags to conditionally load styles (e.g., `media="print"`).\n',
    tips: '"Interview Tips / Pitfalls"\n* **FOIT/FOUC:** Optimizing is necessary to avoid **Flash of Invisible Text (FOIT)** or **Flash of Unstyled Content (FOUC)**.\n* **CSS Tree:** Explain that CSS is render-blocking. The browser must construct the CSSOM (CSS Object Model) before it can paint the page, so minimizing its size is paramount.\n',
    codeString:
      '\n<style>\n  /* Essential styles for header, navigation, and primary content */\n  .header { display: flex; }\n</style>\n\n\n<link \n  rel="preload" \n  href="non-critical.css" \n  as="style" \n  onload="this.onload=null;this.rel=\'stylesheet\'"\n/>\n<noscript>\n  <link rel="stylesheet" href="non-critical.css">\n</noscript>\n',
    output: "Conceptual HTML for optimal CSS delivery.",
    category: "Performance & Optimization",
  },

  // Q74: Debounce vs Throttle (JS/React Complete) - COMBINED Q76, Q10, Q77, Q81
  {
    id: 74,
    title: "Debounce vs Throttle (JS and React-Safe Implementation)",
    explanation:
      "Debouncing and throttling are performance patterns to control the rate at which functions execute.\n\n| Feature | Debounce | Throttle |\n|---|---|---|\n| **Definition** | Wait until event triggering stops | Limit rate to at most once every `delay` ms |\n| **Use Case** | Search input, API calls, window resize end | Scroll, mouse move, continuous animation |\n| **Behavior** | Resets timer on each call | Ignores calls until delay expires |\n\n## React-Safe Implementation Note\nWhen integrating into React, **always extract primitive values** (`e.target.value` or `window.scrollY`) before passing them to the delayed function, as React's Synthetic Events are pooled (cleared immediately).",
    tips: '"Interview Tips / Pitfalls"\n* **Key Distinction:** Debounce = "wait for quiet"; Throttle = "limit frequency."\n* **React Pooling:** Mention that React Synthetic Events are pooled, making it a bug to pass the event object directly into delayed callbacks.\n* **Closures:** Explain that the `timer` variable must be held in a closure (or `useRef` in React) to persist across function calls.',
    codeString:
      "// --- 1. Debounce (JS Standard) ---\nfunction debounce(fn, delay) {\n  let timer = null;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}\n\n// --- 2. Throttle (JS Standard) ---\nfunction throttle(fn, delay) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\n// Example Usage (Debounce will run after 500ms pause)\nconst debouncedLog = debounce((msg) => console.log('Debounced:', msg), 500);\nconst throttledLog = throttle((msg) => console.log('Throttled:', msg), 500);\n\ndebouncedLog(1); debouncedLog(2); debouncedLog(3);\n\nthrottledLog('A'); // Executes immediately\nthrottledLog('B'); // Ignored\nsetTimeout(() => throttledLog('C'), 600); // Executes (after delay)\n",
    output:
      "Throttled: A\nDebounced: 3 (after 500ms)\nThrottled: C (after ~600ms total)",
    category: "Performance & Optimization",
  },

  // Q87: Debouncing with Leading and Trailing Options
  {
    id: 87,
    title: "Debouncing with Leading and Trailing Options",
    explanation:
      "Advanced Debouncing controls when the function fires relative to the event burst:\n\n* **Trailing Edge (Default):** Fires the function **after** the cooldown period following the *last* event (The event burst stops, then wait).\n* **Leading Edge:** Fires the function **immediately** upon the *first* event, and then suppresses all further calls until the cooldown period ends.",
    tips: '"Interview Tips / Pitfalls"\n* The **`leading`** option requires checking if `timer` is `null` to know if it\'s the *first* call in a burst.\n* The **`trailing`** option requires setting `timer = null` *after* the `setTimeout` executes the function to allow the next call to start a new burst.\n* The implementation must handle the `timer` correctly in a closure.',
    codeString:
      "function debounce(fn, wait = 300, options = {}) {\n  let timer = null;\n  let { leading = false, trailing = true } = options;\n\n  return function(...args) {\n    const context = this;\n    const isFirstCall = timer === null;\n\n    clearTimeout(timer);\n\n    // 1. Leading Edge Logic (Execute immediately)\n    if (leading && isFirstCall) {\n      fn.apply(context, args);\n    }\n\n    // 2. Trailing Edge Logic (Delayed execution)\n    timer = setTimeout(() => {\n      timer = null; // Unlock for the next burst\n      \n      // Execute only if trailing is enabled and leading hasn't already executed\n      if (trailing && !leading) {\n         fn.apply(context, args);\n      }\n      // Note: If both leading and trailing are true, the trailing part is often skipped\n      // or implemented with more complexity to avoid double firing. \n      // For simplicity, we execute trailing only if leading is false.\n    }, wait);\n  };\n}\n\n// Example 1: Trailing (Standard Debounce)\nconst logTrailing = debounce((m) => console.log('Trailing:', m), 500, { leading: false });\nlogTrailing(1); logTrailing(2); logTrailing(3); \n// Output: Trailing: 3 (after 500ms)\n\n// Example 2: Leading\nconst logLeading = debounce((m) => console.log('Leading:', m), 500, { leading: true, trailing: false });\nlogLeading(4); logLeading(5); logLeading(6); \n// Output: Leading: 4 (immediately, then suppressed)\n",
    output: "Leading: 4\nTrailing: 3 (after 500ms)",
    category: "Performance & Optimization",
  },
  // Q90: LRU Cache Implementation (for Typeahead)
  {
    id: 90,
    title: "LRU Cache Implementation (for Typeahead)",
    explanation:
      "A **Least Recently Used (LRU) Cache** is a simple yet effective caching strategy. When the cache reaches its capacity, the item that hasn't been accessed for the longest time is evicted to make room for the new item.\n\n### Data Structures\n1.  **`Map` (for fast lookup):** Stores the key-value pairs (e.g., `search_term` -> `results`). Lookups are O(1).\n2.  **`Doubly Linked List` (or `Map` insertion order):** Used to maintain the access order. When an item is accessed or added, it moves to the 'Most Recently Used' end.\n\nUsing a modern **`Map`** is often sufficient as its iteration order is guaranteed to be insertion order, mimicking the eviction policy.",
    tips: `\"Interview Tips / Pitfalls"\n* The key operation is **access** ('get'): The item must be deleted and re-inserted to move it to the 'Most Recently Used' position.\n* **Capacity Check:** The cache size must be checked on every 'set' operation. If capacity is exceeded, the oldest (first item in the Map) is evicted.`,
    codeString:
      "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map(); // Map preserves insertion order\n  }\n\n  get(key) {\n    if (!this.cache.has(key)) return -1; \n    \n    const value = this.cache.get(key);\n    // Re-insert to mark as 'Most Recently Used' (moves it to the end)\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n\n  set(key, value) {\n    // If key exists, treat as access + update (move to end)\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    }\n\n    // Check if capacity is exceeded\n    if (this.cache.size >= this.capacity) {\n      // Evict the LRU item (the first key in the Map)\n      const lruKey = this.cache.keys().next().value;\n      this.cache.delete(lruKey);\n      console.log(`Cache full. Evicted: ${lruKey}`);\n    }\n\n    this.cache.set(key, value);\n  }\n}\n\nconst cache = new LRUCache(3);\ncache.set('a', 1); // [a]\ncache.set('b', 2); // [a, b]\ncache.set('c', 3); // [a, b, c]\ncache.get('a');    // [b, c, a] ('a' is now MRU)\ncache.set('d', 4); // [b, c, a] -> Evict 'b' -> [c, a, d]\n\nconsole.log('Cache Keys:', Array.from(cache.cache.keys()));\nconsole.log('Value for B (Evicted):', cache.get('b'));\n",
    output:
      "Cache full. Evicted: b\nCache Keys: [c, a, d]\nValue for B (Evicted): -1",
    category: "Performance & Optimization",
  },

  // BROWSER & WEB APIS
  // Q3: LocalStorage vs SessionStorage vs Cookies
  {
    id: 3,
    title: "LocalStorage vs SessionStorage vs Cookies",
    explanation:
      "These are client-side storage mechanisms differing primarily in **lifetime**, **scope**, and **capacity**.\n\n| Feature | LocalStorage | SessionStorage | Cookies |\n|---|---|---|---|\n| **Lifetime** | Persistent (until manually cleared) | Tab/Window duration | Set by Expiration Date/Max-Age |\n| **Scope** | Per origin (all tabs/windows) | Per origin and per tab/window | Per origin, path, and domain |\n| **Capacity** | ~5-10 MB | ~5-10 MB | ~4 KB |\n| **Transmitted in HTTP** | No | No | **Yes** (on every request) |\n| **JS Accessible** | Yes | Yes | Yes (unless HttpOnly) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Security:** Never store sensitive tokens in `localStorage` due to **XSS risk**. HttpOnly cookies are much safer for session tokens as JavaScript cannot access them.\n* **Performance:** Cookies are sent with every HTTP request, contributing to request header size. Keep them small to minimize latency.\n',
    codeString:
      "// localStorage\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\nconsole.log('Local Storage Theme:', theme);\n\n// sessionStorage\nsessionStorage.setItem('tabId', 'abc123');\nconsole.log('Session Storage ID:', sessionStorage.getItem('tabId'));\n\n// Cookie (client-side setter)\ndocument.cookie = \"sessionId=xyz; path=/; max-age=3600; Secure; SameSite=Strict\";\nconsole.log('Cookies:', document.cookie);\n",
    output:
      "Local Storage Theme: dark\nSession Storage ID: abc123\nCookies: sessionId=xyz; path=/; max-age=3600; Secure; SameSite=Strict (or similar)\n",
    category: "Browser & Web APIs",
  },

  // Q4: Types of cookies and expiration time
  {
    id: 4,
    category: "Browser & Web APIs",

    title: "Types of Cookies and Expiration",
    explanation:
      "Cookie types are primarily differentiated by their **lifetime**. Expiration is **optional**.\n\n* **Session Cookies:** These cookies **do not** have the `Expires` or `Max-Age` attributes set. They expire when the browser window or tab is closed.\n* **Persistent Cookies:** These **do** have `Expires` (a specific date) or `Max-Age` (seconds from now) attributes set. They survive browser restarts until the expiration time is reached.\n* **HttpOnly Cookie:** Inaccessible to client-side JavaScript (`document.cookie`). Used for security (session tokens).\n* **Secure Cookie:** Only transmitted over HTTPS.\n* **SameSite Cookie:** Controls when cookies are sent with cross-site requests (Lax, Strict, None).\n",
    tips: '"Interview Tips / Pitfalls"\n* Discuss the importance of the `SameSite` attribute (Lax/Strict) to mitigate CSRF attacks.\n* Mention that browsers are increasingly blocking third-party cookies and defaulting to `SameSite=Lax`.\n',
    codeString:
      '// 1. Session Cookie (Expires on browser close)\ndocument.cookie = "userPrefs=lightMode; path=/";\n\n// 2. Persistent Cookie (Expires in 1 hour)\ndocument.cookie = "auth=token123; path=/; max-age=3600";\n',
    output:
      "Requires browser console/network tab inspection to confirm expiration behavior.",
  },
  // Q5: Storage sizes
  {
    id: 5,
    title: "Storage Sizes: localStorage vs sessionStorage vs Cookies",
    explanation:
      "* **LocalStorage & SessionStorage:** Typically allow **5–10 MB** of data storage per origin (domain). This is substantial and often sufficient for caching non-sensitive application data.\n* **Cookies:** Have a very strict limit, roughly **4 KB per cookie**, and there is a limit on the total number of cookies per domain (around 20–50 depending on the browser).\n",
    tips: '"Interview Tips / Pitfalls"\n* **Implications:** Cookies are inefficient for large data because they are sent in the HTTP header of **every single request**, increasing bandwidth and latency.\n* **Recommendation:** Use IndexedDB or LocalStorage for large client-side data storage. Reserve cookies for small, essential pieces of information like session IDs.\n',
    codeString:
      '// Attempting to set a key/value pair > 5MB in localStorage will fail.\n// Cookies are restricted to around 4KB per cookie.\nconsole.log("Maximum storage capacity is roughly 5MB per origin for Web Storage API.");\n',
    output:
      "Maximum storage capacity is roughly 5MB per origin for Web Storage API.",
    category: "Browser & Web APIs",
  },

  // Q6: Normal cookie vs HttpOnly cookie
  {
    id: 6,
    title: "Normal Cookie vs HttpOnly Cookie",
    explanation:
      "* **Normal Cookie:** Accessible via client-side JavaScript using `document.cookie`.\n* **HttpOnly Cookie:** **Cannot be accessed by client-side JavaScript**. It is only included in the HTTP request headers when sent to the server.\n\n## Security Implication\nThe `HttpOnly` flag is critical for security because it prevents malicious code injected via a **Cross-Site Scripting (XSS) attack** from stealing the user's session token.\n",
    tips: '"Interview Tips / Pitfalls"\n* You must set the `HttpOnly` flag from the **server-side** (in the `Set-Cookie` HTTP header).\n* `HttpOnly` mitigates XSS-based token theft but **does not** protect against **CSRF** (Cross-Site Request Forgery). You need `SameSite` and CSRF tokens for that.\n',
    codeString:
      '// Example of accessing a normal cookie:\n// const token = document.cookie.match(/token=([^;]+)/)[1];\n\n// HttpOnly cookies cannot be accessed here, they are simply invisible to JS.\nconsole.log("HttpOnly cookies cannot be accessed or manipulated by JavaScript, enhancing security against XSS.");\n',
    output:
      "HttpOnly cookies cannot be accessed or manipulated by JavaScript, enhancing security against XSS.",
    category: "Browser & Web APIs",
  },

  // Q13: Custom hook for window width
  {
    id: 13,
    title: "Custom Hook for Window Width (`useWindowWidth`)",
    explanation:
      "A highly practical custom hook that manages the side effect of listening to the global `resize` event. It demonstrates proper initialization and cleanup within `useEffect`.\n\n## Implementation Details\n1.  Initialize state with the current `window.innerWidth`.\n2.  Use `useEffect` to subscribe to the `resize` event.\n3.  Return a cleanup function that unsubscribes (`removeEventListener`) to prevent memory leaks.\n4.  Handle Server-Side Rendering (SSR) by checking if `window` is defined.\n",
    tips: "\"Interview Tips / Pitfalls\"\n* Mention that for heavy resize logic, you should **debounce** the `onResize` function call to prevent performance issues.\n* The check for `isClient` (`typeof window === 'object'`) is vital for SSR compatibility.\n",
    codeString:
      "import { useState, useEffect } from 'react';\n\nfunction useWindowWidth() {\n  // Check if we are running in a browser environment\n  const isClient = typeof window === 'object';\n  \n  function getWidth() { \n    return isClient ? window.innerWidth : 0; \n  }\n  \n  const [width, setWidth] = useState(getWidth);\n\n  useEffect(() => {\n    if (!isClient) return; // Prevent errors on the server\n    \n    // Debouncing the resize handler is recommended for production\n    function onResize() { \n      setWidth(window.innerWidth); \n    }\n\n    window.addEventListener('resize', onResize);\n\n    // Cleanup function: remove the event listener\n    return () => window.removeEventListener('resize', onResize);\n  }, [isClient]); // Re-runs if client environment somehow changes (not typically)\n\n  return width;\n}\n",
    output: "This hook returns the current window width in pixels.",
    category: "Browser & Web APIs",
  }, // Q19: CSS: display:none vs visibility:hidden vs opacity:0
  {
    id: 19,
    title: "CSS: display:none vs visibility:hidden vs opacity:0",
    explanation:
      "These CSS properties all hide an element, but with drastically different effects on the page layout, performance, and accessibility.\n\n| Property | Layout Space | Events/Interaction | Animation | Accessibility |\n|---|---|---|---|---|\n| **`display:none`** | **No** (Element removed from flow) | No | No (cannot transition) | Removed from accessibility tree |\n| **`visibility:hidden`** | **Yes** (Space remains) | No (Cannot be clicked) | Yes (can transition) | Removed from accessibility tree |\n| **`opacity:0`** | **Yes** (Space remains) | **Yes** (Can still be clicked/tabbed to) | Yes (smooth transition) | **Remains** in accessibility tree |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Accessibility:** `opacity: 0` elements can still be navigated to via the keyboard and read by screen readers unless you also set `pointer-events: none` and/or `aria-hidden="true"`.\n* **Performance:** `display: none` causes a repaint and layout change (reflow), while `visibility: hidden` and `opacity: 0` only cause a repaint. `opacity` is often the most performant choice for simple toggles if layout preservation is acceptable.\n',
    codeString:
      '/* HTML example structure:\n<div class="box box-display">Display None</div>\n<div class="box box-visibility">Visibility Hidden</div>\n<div class="box box-opacity">Opacity Zero</div>\n*/\n.box-display {\n  display: none; /* No space taken, not clickable */\n}\n\n.box-visibility {\n  visibility: hidden; /* Space taken, not clickable */\n}\n\n.box-opacity {\n  opacity: 0; /* Space taken, IS clickable/tabbable */\n}\n',
    output: "Requires browser environment to see visual effects.",
    category: "Browser & Web APIs",
  },

  // Q37: Accessibility (a11y) basics
  {
    id: 37,
    title: "Accessibility (A11y) Basics",
    explanation:
      "Accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with the web.\n\n## Key Principles\n1.  **Semantic HTML:** Use native elements (`<button>`, `<input>`, `<a href>`) correctly. Avoid using `<div>` for everything.\n2.  **Keyboard Navigation:** Ensure all interactive elements are focusable via `Tab` and operable via `Enter` or `Space`.\n3.  **ARIA Attributes:** Use **Accessible Rich Internet Applications (ARIA)** roles, states, and properties (`role`, `aria-label`, `aria-expanded`) to provide missing semantics to custom widgets.\n4.  **Color Contrast:** Ensure text contrast meets WCAG guidelines (minimum 4.5:1).\n5.  **Labels:** Always associate form controls with proper `<label>` tags.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Screen Readers:** Test your application with screen readers (VoiceOver, NVDA, or JAWS) to confirm the user experience.\n* **Tools:** Mention using automated auditing tools like **Lighthouse** or **axe DevTools** to catch common violations.\n* **ARIA vs Semantic HTML:** Always prefer semantic HTML over ARIA attributes. ARIA should enhance, not replace, native HTML semantics.\n',
    codeString:
      "function AccessibleButton() {\n  const [expanded, setExpanded] = React.useState(false);\n\n  return (\n    <div>\n      {/* Correct use of semantic button */}\n      <button \n        onClick={() => setExpanded(!expanded)} \n        aria-expanded={expanded} // ARIA state for screen readers\n        aria-controls=\"content-id\" // Links button to the content below\n      >\n        Toggle Content\n      </button>\n      \n      {/* Correct use of aria-hidden for visual-only elements */}\n      <div id=\"content-id\" aria-hidden={!expanded}>\n        Content that is {expanded ? 'visible' : 'hidden'}\n      </div>\n    </div>\n  );\n}\n",
    output: "Conceptual React code demonstrating ARIA attributes.",
    category: "Browser & Web APIs",
  },

  // Q41: Typing useState in TypeScript
  {
    id: 41,
    title: "Typing useState in TypeScript",
    explanation:
      "TypeScript can often infer the type of state from the initial value, but it is necessary to explicitly define the type using **Generics** when the state can hold multiple types (e.g., `null` or a specific object).\n\n* **Inferred Type:** If the initial state is `0`, TypeScript infers `number`.\n* **Explicit Type (`<Type>`):** Use generics to explicitly define the type, often required when setting initial state to `null` or `undefined`, which could otherwise be inferred as `any`.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Handling Null/Undefined:** Always use a **Union Type** (e.g., `User | null`) when the state might be initially empty (null) but later holds a complex object.\n* **Typing Reducers:** For complex state, demonstrate typing the return value of `useReducer` to ensure correctness across actions.\n',
    codeString:
      "// TypeScript Code (Conceptual)\n\n// interface User {\n//    id: number;\n//    name: string;\n// }\n\n// 1. Inferred Type (type is 'number')\nconst [count, setCount] = useState(0); \n// console.log(typeof count); // number\n\n// 2. Explicit Type (type is 'number')\nconst [n, setN] = useState<number>(0); \n\n// 3. Union Type (type is 'User | null') - necessary when initial value is null\nconst [user, setUser] = useState<User | null>(null);\n\n// 4. Array Type (type is 'string[]')\nconst [list, setList] = useState<string[]>([]);\n",
    category: "Browser & Web APIs",
    output: "Conceptual TypeScript code.",
  },

  // Q45: Accessibility for disabled users
  {
    id: 45,
    title: "Designing for Disabled Users (A11y)",
    explanation:
      "Designing for disabled users involves adhering to the **Web Content Accessibility Guidelines (WCAG)** and ensuring four core principles are met: **Perceivable, Operable, Understandable, and Robust (POUR)**.\n\n## Key Practices\n1.  **Screen Reader Support:** Use correct semantic HTML and ARIA attributes (e.g., `aria-live` for dynamic updates).\n2.  **Keyboard Only:** Ensure the entire site is usable without a mouse (correct tab order, proper focus management).\n3.  **Visual:** Maintain high color contrast (4.5:1 ratio) and allow text resizing without breaking layout.\n4.  **Alternatives:** Provide text alternatives for non-text content (e.g., `alt` text for images).\n",
    tips: '"Interview Tips / Pitfalls"\n* Explain that the best way to design for this is to **test it**. Conduct a **keyboard-only walkthrough** of your application and use a screen reader (like macOS VoiceOver) to experience the site as a non-sighted user would.\n',
    codeString:
      '// Use of role and aria-live for dynamic updates\n/*\n<div aria-live="polite" role="status">\n  {statusMessage} // Screen reader announces changes to this text\n</div>\n*/\n',
    category: "Browser & Web APIs",
    output: "Conceptual code for accessibility.",
  },
  // Q46: Keyboard arrows default behaviour & management
  {
    id: 46,
    title: "Keyboard Arrow Key Behavior and Management",
    explanation:
      "By default, standard HTML elements only use **Tab** and **Shift+Tab** for navigation. Arrow keys primarily control scrolling and native controls (like changing volume on a slider or selecting options in a `<select>`).\n\n## Custom Widget Management\nWhen creating custom components (like menus, carousels, or tree views), you must implement arrow key management manually:\n1.  Use the `keydown` event listener.\n2.  Check `e.key` for `'ArrowUp'`, `'ArrowDown'`, etc.\n3.  Use `e.preventDefault()` to stop the default browser behavior (like scrolling).\n4.  Programmatically manage focus (e.g., using `element.focus()`) to move between items.\n",
    tips: '"Interview Tips / Pitfalls"\n* Ensure that when you prevent default arrow behavior, you still provide a clear visual **focus state** for the user.\n* Mention setting the appropriate ARIA role (`role="menu"`, `role="tablist"`) and using ARIA attributes like `aria-activedescendant` to inform screen readers of the currently focused element.\n',
    codeString:
      "function handleKeyDown(e) {\n  if (e.key === 'ArrowDown') {\n    e.preventDefault(); // Stop page scrolling\n    // Logic to move focus to the next item\n    console.log('Moving focus down');\n  } else if (e.key === 'ArrowUp') {\n    e.preventDefault();\n    // Logic to move focus up\n    console.log('Moving focus up');\n  }\n}\n\n// document.addEventListener('keydown', handleKeyDown);\n",
    category: "Browser & Web APIs",
    output: "Conceptual function for keyboard event handling.",
  },
  // Q47: tabindex usage
  {
    id: 47,
    title: "Tabindex Usage",
    explanation:
      'The `tabindex` HTML attribute controls whether an element can be focused and whether it participates in sequential keyboard navigation (the Tab key).\n\n| Value | Behavior | Use Case |\n|---|---|---|\n| **`tabindex="0"`** | Included in sequential tab order, placed in its default position. | Use for non-focusable elements (like a `div`) that require keyboard interaction. |\n| **`tabindex="-1"`** | **Not** included in sequential tab order, but can be focused programmatically via JavaScript (`element.focus()`). | Use for dynamic focus management (modals, error messages, custom menus). |\n| **`tabindex="1+"`** | Included in sequential tab order, with priority. **(Avoid this!)** | **Discouraged.** This creates confusing, non-standard tab orders. |\n',
    tips: '"Interview Tips / Pitfalls"\n* **Avoid Positive Tabindex:** Never use positive `tabindex` values as it breaks the natural flow of the page, making it unusable for keyboard users and difficult to maintain.\n* **Focus Management:** Use `tabindex="-1"` frequently to direct focus in response to user actions (e.g., closing a modal and returning focus to the trigger button).\n',
    codeString:
      '/* HTML Examples */\n/*\n// Focusable via Tab key (position in order determined by document flow)\n<div tabindex="0" onclick="alert(\'clicked\')">Clickable Container</div> \n\n// Not focusable by Tab, but can be focused by JS: element.focus()\n<div tabindex="-1">Programmatic Target</div> \n\n// DO NOT USE - breaks natural tab order\n// <button tabindex="10">First Tab Target</button> \n*/\n',
    category: "Browser & Web APIs",
    output: "Conceptual HTML/JS behavior for tabindex.",
  },
  // Q48: Color contrast best practices
  {
    id: 48,
    title: "Color Contrast Best Practices (WCAG)",
    explanation:
      "Good color contrast is essential for users with low vision or color blindness. Best practices are defined by the **Web Content Accessibility Guidelines (WCAG)**.\n\n* **AA Standard (Minimum):** The minimum required for acceptable accessibility.\n    * **Normal Text:** Contrast ratio of **4.5:1** or greater.\n    * **Large Text** (18pt / 14pt bold or larger): Contrast ratio of **3:1** or greater.\n* **AAA Standard (Enhanced):** The highest level of accessibility.\n    * **Normal Text:** Contrast ratio of **7:1** or greater.\n    * **Large Text:** Contrast ratio of **4.5:1** or greater.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Tools:** Mention using browser DevTools (Accessibility panel) or dedicated contrast checkers to test color combinations using hex codes.\n* **Non-Text Elements:** Contrast applies not only to text but also to crucial graphical elements and component states (e.g., focus indicators, required field icons).\n* **Customization:** Mention using CSS media queries for `prefers-color-scheme` (dark mode) and `prefers-contrast` to offer users alternatives.\n',
    codeString:
      "/* CSS Example: Ensuring contrast is met */\n.accessible-text {\n  /* White text on a dark blue background provides high contrast */\n  color: #ffffff; \n  background-color: #1e3a8a; /* WCAG AA rating is met */\n}\n\n/* If the background were light gray (#f0f0f0), white text would fail. */\n",
    output: "Conceptual CSS demonstrating contrast considerations.",
    category: "Browser & Web APIs",
  }, // Q57: Debugger techniques
  {
    id: 57,
    title: "Effective Debugging Techniques (Browser DevTools)",
    explanation:
      "Effective debugging is crucial for finding root causes quickly.\n\n1.  **`debugger;` statement:** Acts like an explicit breakpoint in your code, forcing the debugger to pause execution.\n2.  **Breakpoints (DevTools):** Click the line number in the Sources/Source tab to set a breakpoint.\n3.  **Conditional Breakpoints:** Right-click a breakpoint and add a condition (e.g., `i === 10` in a loop) to only pause when the condition is met.\n4.  **Watch Expressions:** Allows you to monitor the value of specific variables or expressions as execution progresses.\n5.  **Source Maps:** Essential for debugging transpiled code (Webpack/Babel). They map the compiled code back to your original source files.\n",
    tips: '"Interview Tips / Pitfalls"\n* Show familiarity with the debugger controls: **Step Over** (F10), **Step Into** (F11), and **Step Out** (Shift+F11).\n* For asynchronous code, mention using the **Call Stack** trace to see which asynchronous operation led to the current callback execution.\n',
    codeString:
      "function calculate(a, b) {\n  let result = a + b;\n  // Execution will pause here if DevTools is open\n  debugger; \n  result *= 2;\n  return result;\n}\ncalculate(5, 3);\n",
    output: "Execution pauses at the debugger statement in DevTools.",
    category: "Browser & Web APIs",
  }, // Q62: Replacing Spaces with %20 (URL Encoding)
  {
    id: 62,
    title: "Replacing Spaces with %20 (URL Encoding)",
    explanation:
      "The character sequence `%20` is the URL-encoded representation of a space. While manual replacement is possible, the safest and most standard way to prepare a string for use in a URL (especially a query string) is using the native `encodeURIComponent()` function.\n\n* **`encodeURIComponent()`:** Encodes characters that have special meaning in a URL (including spaces, `&`, `=`, etc.).\n* **Manual `.split().join()`:** Only replaces spaces, leaving other special characters potentially breaking the URL.\n",
    tips: '"Interview Tips / Pitfalls"\n* Always prefer the native encoding functions for robustness, as they handle a wider range of edge cases and international characters correctly.\n',
    codeString:
      "const originalString = 'hello world & good day';\n\n// 1. Recommended (Handles all special URL characters)\nconst encodedURI = encodeURIComponent(originalString);\nconsole.log('URI Encoded:', encodedURI);\n\n// 2. Manual Replacement (Only replaces spaces)\nconst manualEncoded = originalString.split(' ').join('%20');\nconsole.log('Manual Encoded:', manualEncoded);\n",
    output:
      "URI Encoded: hello%20world%20%26%20good%20day\nManual Encoded: hello%20world%20&%20good%20day",
    category: "Browser & Web APIs",
  },

  // Q63: Debugging Minified Code with Source Maps
  {
    id: 63,
    title: "Debugging Minified Code with Source Maps",
    explanation:
      "**Minification** removes comments, whitespace, and shortens variable names to reduce file size. This makes debugging impossible without help.\n\n**Source Maps** solve this by creating a hidden file (usually ending in `.map`) that maps the lines and characters in the minified code back to the corresponding lines and characters in the original source code.\n\n## Workflow\n1.  **Bundler (Webpack/Vite/Rollup):** Configured to generate source maps during the build process (often using the `devtool: 'source-map'` setting).\n2.  **Browser:** When DevTools is open, it detects the source map reference in the minified file's header.\n3.  **Debugging:** DevTools loads the source map and allows you to set breakpoints and view variables in your original, unminified source files.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Security:** Mention that source maps should ideally not be accessible to the public in production to protect source code. Alternatives include hosting them on a private server or using `hidden-source-map` combined with error reporting services.\n',
    codeString:
      "/*\n// Webpack Config (Conceptual)\nmodule.exports = {\n  mode: 'production',\n  devtool: 'source-map', // Generates source maps for debugging\n  // ... other config\n};\n\n// Minified output includes a reference to the source map file\n// //# sourceMappingURL=bundle.js.map\n*/\n",
    category: "Browser & Web APIs",
    output: "Conceptual configuration for source maps.",
  },
  // Q64: HTML5, CSS Positions, and Styling Methods
  {
    id: 64,
    title: "HTML5, CSS Positions, and Styling Methods",
    explanation:
      "## HTML5 Features\nHTML5 introduced **semantic tags** to describe the content's purpose: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`. This is vital for SEO and Accessibility.\n\n## CSS Position Property\n* **`static` (Default):** No special positioning; flows normally. `top/left/etc.` properties are ignored.\n* **`relative`:** Flows normally, but `top/left/etc.` offset the element *from its normal position*. Other elements are unaffected.\n* **`absolute`:** Removed from the document flow and positioned relative to the nearest **positioned** (`relative`, `absolute`, `fixed`, or `sticky`) ancestor.\n* **`fixed`:** Removed from the document flow and positioned relative to the **viewport** (stays visible during scroll).\n* **`sticky`:** Positioned based on the user's scroll position. Behaves as `relative` until a scroll threshold is met, then acts as `fixed`.\n\n## Styling Methods\n1.  **External:** Separate `.css` file (best practice).\n2.  **Internal:** `<style>` tag in the `<head>`.\n3.  **Inline:** `style=\"...\"` attribute on the element (highest specificity, often discouraged).\n",
    codeString:
      "/* Example of Absolute positioning */\n.parent {\n  position: relative; /* Sets the context for absolute children */\n  height: 200px;\n}\n.child {\n  position: absolute; /* Positioned relative to .parent */\n  top: 10px;\n  right: 10px;\n}\n\n/* Example of Fixed positioning */\n.header-fixed {\n  position: fixed; /* Always visible at the top of the viewport */\n  top: 0;\n  width: 100%;\n}\n",
    category: "Browser & Web APIs",
    output: "Conceptual CSS for positioning.",
  },
  // Q65: Responsive Design Best Practices
  {
    id: 65,
    title: "Responsive Design Best Practices",
    explanation:
      'Responsive design ensures the layout adapts gracefully to different screen sizes and devices.\n\n1.  **Viewport Meta Tag (Mandatory):** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`\n2.  **Mobile-First Approach:** Design for the smallest screen first, then use `min-width` media queries to add enhancements for larger screens.\n3.  **Fluid Layouts:** Use relative units (`%`, `vh`, `vw`) or modern layout methods (Flexbox, CSS Grid) instead of fixed pixel widths.\n4.  **Media Queries:** Apply different styles based on screen size, orientation, and resolution.\n5.  **Responsive Images:** Use the `<picture>` element or `srcset` attribute to serve appropriate image sizes based on device capabilities.\n',
    tips: '"Interview Tips / Pitfalls"\n* **CSS Grid/Flexbox:** Emphasize that these are the primary tools for responsive layout and should replace older float-based methods.\n* **Performance:** Mention optimizing the Critical Rendering Path by inlining "Above the Fold" CSS and deferring the loading of non-critical assets.\n',
    codeString:
      "/* Mobile-First Example */\n.container {\n  width: 100%;\n  padding: 1rem;\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: 1fr; /* Single column on mobile */\n  gap: 16px;\n}\n\n/* Breakpoint for Tablets/Small Desktops */\n@media (min-width: 640px) {\n  .card-grid {\n    grid-template-columns: repeat(2, 1fr); /* Two columns on larger screens */\n  }\n}\n\n/* Breakpoint for Large Desktops */\n@media (min-width: 1024px) {\n  .card-grid {\n    grid-template-columns: repeat(4, 1fr); /* Four columns on desktop */\n  }\n}\n",
    category: "Browser & Web APIs",
    output: "Conceptual mobile-first responsive CSS.",
  },

  // Q67: Layout: 6 Labels Inside a 300x300 Container (CSS Grid)
  {
    id: 67,
    title: "Layout: 6 Labels Inside a 300x300 Container (CSS Grid)",
    explanation:
      "The best way to arrange and center a fixed number of items within a container is using **CSS Grid** or **Flexbox**. Grid is ideal for two-dimensional layouts like this.\n\n## CSS Grid Solution\nDefine a container as a Grid and explicitly set the number of columns and rows required.\n\n1.  **`display: grid`:** Activates the grid context.\n2.  **`grid-template-columns: repeat(3, 1fr)`:** Creates three equal-width columns.\n3.  **`place-items: center`:** Centers the labels both horizontally and vertically within their grid cells.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Flexbox Alternative:** Mention Flexbox would also work well, typically using `flex-wrap: wrap` and ensuring the items have a fixed width (`flex: 0 0 33.33%`).\n* **Accessibility:** Ensure the final labels have sufficient size and spacing for easy interaction on touch devices.\n',
    codeString:
      '<div id="grid-container">\n  <label>Label 1</label>\n  <label>Label 2</label>\n  <label>Label 3</label>\n  <label>Label 4</label>\n  <label>Label 5</label>\n  <label>Label 6</label>\n</div>\n\n<style>\n#grid-container {\n  display: grid;\n  /* 3 columns, each taking an equal fraction of the space */\n  grid-template-columns: repeat(3, 1fr); \n  gap: 10px;\n  width: 300px;\n  height: 300px;\n  border: 2px solid #333;\n  padding: 10px;\n  /* Center the content of the entire grid */\n  align-items: center; \n  justify-content: center;\n}\n#grid-container label {\n  background-color: #f0f4ff;\n  border: 1px solid #aaa;\n  padding: 5px;\n  text-align: center;\n}\n</style>\n',
    category: "Browser & Web APIs",
    output: "Conceptual HTML/CSS for a 3x2 grid.",
  }, // Q69: inline vs inline-block
  {
    id: 69,
    title: "CSS: inline vs inline-block",
    explanation:
      "Both `inline` and `inline-block` elements flow horizontally with text, but they handle box model properties differently.\n\n* **`display: inline`:** (e.g., `<span>`, `<a>`)\n    * **Ignores** explicit `width` and `height` settings.\n    * **Ignores** top and bottom `margin` and `padding`.\n    * Content dictates size.\n* **`display: inline-block`:**\n    * **Accepts** explicit `width` and `height`.\n    * **Accepts** all `margin` and `padding` properties.\n    * Flows inline horizontally.\n",
    tips: '"Interview Tips / Pitfalls"\n* **The Spacing Problem:** The most famous pitfall of `inline-block` is the mysterious space that appears between elements due to the **whitespace** (newline/space) characters in the HTML source code.\n* **Solution to Spacing:** Remove whitespace in HTML (bad practice), set the font size of the parent to 0 (ugly hack), or use Flexbox (the modern solution).\n',
    codeString:
      '/* HTML Example: <span class="inline">Inline</span><span class="inline-block">Inline-Block</span> */\n\n.inline {\n  display: inline;\n  width: 100px;     /* Ignored */\n  height: 100px;    /* Ignored */\n  padding: 20px;    /* Top/Bottom padding ignored */\n  background: yellow;\n}\n\n.inline-block {\n  display: inline-block;\n  width: 100px;     /* Applied */\n  height: 100px;    /* Applied */\n  padding: 20px;    /* All padding applied */\n  background: lightblue;\n}\n',
    category: "Browser & Web APIs",
    output: "Conceptual CSS for inline vs inline-block.",
  },

  // DATA STRUCTURES & ALGORITHMS (DSA)
  // Q2: Polyfill for Array.prototype.map
  {
    id: 2,
    title: "Polyfill: Write a polyfill for Array.prototype.map",
    explanation:
      "A polyfill implements a newer API feature on older environments. Writing polyfills tests your understanding of **prototypes**, **this-binding**, and handling edge cases like sparse arrays and argument validation.\n\n## Implementation Details\n1.  Add the function to `Array.prototype`.\n2.  Validate that the input is a function.\n3.  Loop through the array using `this.length`.\n4.  Inside the loop, call the callback function, ensuring to pass the correct arguments (`currentValue`, `index`, `array`).\n5.  The return value of the callback is pushed to the new result array.\n",
    tips: "\"Interview Tips / Pitfalls\"\n* Mention that a fully compliant polyfill needs to handle **sparse arrays** (skipping 'holes') and properly coerce `this` to an object (`ToObject`), but the provided solution is sufficient for most interview contexts.\n* Contrast this with `forEach`, which does not return a new array.\n",
    codeString:
      "// We use 'myMap' to avoid conflict with native map\nif (!Array.prototype.myMap) {\n  Array.prototype.myMap = function(callbackFn) {\n    if (typeof callbackFn !== 'function') {\n      throw new TypeError('Callback must be a function');\n    }\n\n    const result = [];\n    // 'this' refers to the array on which myMap is called\n    for (let i = 0; i < this.length; i++) {\n      // Check for property existence for true compliance (sparse array handling)\n      // if (Object.prototype.hasOwnProperty.call(this, i)) {\n        // Call the callback with (value, index, array)\n        const mappedValue = callbackFn(this[i], i, this);\n        result.push(mappedValue);\n      // }\n    }\n    return result;\n  }\n}\n\nconst arr = [1, 2, 3];\nconsole.log(arr.myMap(x => x * 2));\n",
    output: "[2, 4, 6]",
    category: "DSA",
  }, // Q59: Regular expressions
  {
    id: 59,
    title: "Regular Expressions (Regex)",
    explanation:
      "Regular expressions are patterns used to match character combinations in strings.\n\n| Feature | Description | Example |\n|---|---|---|\n| **Literal** | Matches the exact sequence of characters. | `/hello/` |\n| **Character Sets** | Matches any one of the characters inside the brackets. | `/[aeiou]/` |\n| **Quantifiers** | Specifies how many times a character/group can occur. | `a+` (one or more), `b*` (zero or more), `c?` (zero or one) |\n| **Anchors** | Defines the start (`^`) or end (`$`) of the string/line. | `/^start/` (must start with 'start') |\n| **Groups** | Uses parentheses to group patterns. | `/(ab)+` (one or more 'ab' sequences) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Usage:** Demonstrate `.test()` (returns boolean), `.exec()` (returns match array), and `.replace()` (string manipulation).\n* **Catastrophic Backtracking:** Explain the danger of using naive, nested quantifiers (e.g., `/(a+)+/ `) on complex inputs, which can cause the engine to spend excessive time testing combinations, leading to denial-of-service (ReDoS).\n',
    codeString:
      "const emailRE = /^[^s@]+@[^s@]+.[^s@]+$/;\n\nconsole.log('Valid email:', emailRE.test('test@example.com'));\n\n// Using replace with groups ($1 is the first group)\nconst date = \"10-05-2023\";\nconst formattedDate = date.replace(/(\\d{2})-(\\d{2})-(\\d{4})/, '$3/$2/$1');\nconsole.log('Date:', formattedDate);\n",
    output: "Valid email: true\nDate: 2023/05/10",
    category: "DSA",
  },
  // Q60: Array Sorting with Comparator Functions
  {
    id: 60,
    title: "Array Sorting with Comparator Functions",
    explanation:
      "The native JavaScript `Array.prototype.sort()` method sorts array elements and **mutates the array in place**.\n\nThe optional **comparator function** `sort((a, b) => ...)` dictates the sort order based on its return value:\n\n* **Positive (> 0):** `a` comes **after** `b` (e.g., `a > b`)\n* **Negative (< 0):** `a` comes **before** `b` (e.g., `a < b`)\n* **Zero (= 0):** Keep original relative order.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Numeric Sort:** For numeric sorting, simply return the difference: `a - b` for ascending, `b - a` for descending.\n* **String Sort:** For complex string sorting (especially for international characters), use `String.prototype.localeCompare(b)`, which handles case and locales correctly.\n* **Immutability:** To avoid mutating the original array, create a shallow copy first: `[...arr].sort(...)`.\n',
    codeString:
      "const numbers = [5, 20, 10];\nnumbers.sort((a, b) => a - b); // Ascending numeric sort\nconsole.log('Numeric:', numbers); \n\nconst users = [{ name: 'Zulu' }, { name: 'Alpha' }];\nusers.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sort\nconsole.log('Users:', users.map(u => u.name));\n",
    output: "Numeric: [5, 10, 20]\nUsers: [Alpha, Zulu]",
    category: "DSA",
  },

  // Q61: Bubble sort vs Binary Search
  {
    id: 61,
    title: "Bubble Sort vs Binary Search (Conceptual Differences)",
    explanation:
      "These algorithms belong to entirely different categories and serve different purposes:\n\n| Algorithm | Category | Average Time Complexity | Precondition | Purpose |\n|---|---|---|---|---|\n| **Bubble Sort** | **Sorting** | O(n²) | None | Reorders elements into a sorted sequence. |\n| **Binary Search** | **Searching** | O(log n) | **Array MUST be sorted.** | Finds the position of a target value efficiently. |\n\n## Bubble Sort (`O(n²)`) \nCompares adjacent elements and swaps them if they are in the wrong order. Highly inefficient and not used in practice, but good for understanding basic sorting.\n\n## Binary Search (`O(log n)`) \nRepeatedly divides the search interval in half. This exponential reduction in search space makes it extremely fast for large datasets, provided the array is already sorted.\n",
    tips: '"Interview Tips / Pitfalls"\n* The key point is that Binary Search\'s speed is entirely dependent on the data being sorted. If you have to sort the data first (O(n log n)), the total time complexity might not be worth it for a single search.\n',
    codeString:
      "// Binary Search (conceptual)\nfunction binarySearch(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1; // Not found\n}\nconst sortedArray = [2, 4, 6, 8, 10];\nconsole.log('Binary Search Index:', binarySearch(sortedArray, 6));\n",
    output: "Binary Search Index: 2",
    category: "DSA",
  },

  // Q68: Graph Display and Shortest Path Algorithms
  {
    id: 68,
    title: "Graph Display and Shortest Path Algorithms",
    explanation:
      "## Graph Display (Visualization)\nComplex network graphs (nodes and edges) are typically rendered using specialized libraries:\n* **D3.js:** The industry standard for data-driven documents, providing low-level control for force-directed layouts and rendering the SVG/Canvas elements.\n* **Cytoscape.js / Vis.js:** Higher-level libraries built specifically for interactive graph and network visualization.\n\n## Shortest Path Algorithms\nThe choice of algorithm depends on whether the graph edges have weights and if those weights can be negative.\n* **Dijkstra's Algorithm:** Finds the shortest path between nodes in a graph with **non-negative** edge weights. It uses a priority queue for efficiency (`O((E+V) log V)`).\n* **A* Search:** An extension of Dijkstra's that uses a **heuristic** to guide its search, making it much faster in practical applications like pathfinding on maps.\n* **Bellman-Ford Algorithm:** Can find the shortest path even if the graph contains **negative** edge weights, but it is slower than Dijkstra's (`O(V*E)`).\n",
    tips: '"Interview Tips / Pitfalls"\n* If asked to implement Dijkstra\'s, mention the need for a min-priority queue to store and efficiently retrieve the unvisited node with the smallest known distance.\n',
    codeString:
      "// JavaScript / Dijkstra's Concept\n/*\nfunction dijkstra(graph, startNode, endNode) {\n  const distances = {}; // Stores shortest distance from startNode\n  const visited = new Set();\n  const priorityQueue = []; // Min-Heap based queue (conceptual)\n\n  // Initialization: all distances are Infinity, startNode is 0\n  // ...\n\n  while (priorityQueue.length > 0) {\n    const currentNode = priorityQueue.popMin(); // Get closest unvisited node\n    if (visited.has(currentNode)) continue;\n    visited.add(currentNode);\n\n    // Relaxation step: update distances to neighbors\n    // for (neighbor of currentNode.neighbors) {\n    //   if (newDist < distances[neighbor]) {\n    //     distances[neighbor] = newDist;\n    //     priorityQueue.insert(neighbor, newDist);\n    //   }\n    // }\n  }\n  return distances[endNode];\n}\n*/\n",
    output: "Conceptual framework for Dijkstra's algorithm.",
    category: "DSA",
  },

  // Q71: Shallow vs Deep Copy and Flexbox Alignment
  {
    id: 71,
    title: "Shallow vs Deep Copy and Flexbox Alignment (Overview)",
    explanation:
      "## Shallow vs Deep Copy\n* **Shallow Copy:** Creates a new object/array, but copies references to the nested objects/arrays. Mutation of inner values affects both the original and the copy.\n    * **Methods:** `{...obj}`, `[...arr]`, `Object.assign()`.\n* **Deep Copy:** Creates a completely independent clone, including all nested structures. Mutation of any value only affects the copy.\n    * **Methods:** `structuredClone(obj)` (modern standard, best option), `JSON.parse(JSON.stringify(obj))` (simple but fails on functions, Dates, Maps, etc.).\n\n## Flexbox Alignment\nFlexbox uses two main properties for alignment:\n1.  **`justify-content`:** Aligns items along the **Main Axis** (default horizontal).\n2.  **`align-items`:** Aligns items along the **Cross Axis** (default vertical).\n",
    tips: '"Interview Tips / Pitfalls"\n* If supporting older environments, mention the need for a third-party library (like Lodash\'s `cloneDeep`) if `structuredClone` is unavailable.\n* Mention that `flex-direction: column` flips the axes, making `justify-content` vertical and `align-items` horizontal.\n',
    codeString:
      'const original = { a: 1, nested: { b: 2 } };\n\n// 1. Shallow Copy (nested is a shared reference)\nconst shallow = { ...original };\nshallow.nested.b = 99;\nconsole.log(\'Original Nested B after shallow mutation:\', original.nested.b); // 99\n\n// 2. Deep Copy (modern JS)\nconst deep = structuredClone(original);\ndeep.nested.b = 50; // New change\nconsole.log(\'Original Nested B after deep mutation:\', original.nested.b); // 99 (retains previous mutation)\nconsole.log(\'Deep Nested B:\', deep.nested.b); // 50\n\n//3.Safe Deep Cope:\nfunction safeClone(obj) {\n  const cloneable = structuredClone(\n    Object.fromEntries(Object.entries(obj).filter(([k, v]) => typeof v !== "function"))\n  );\n  \n  // Reattach functions manually\n  for (const [key, value] of Object.entries(obj)) {\n    if (typeof value === "function") {\n      cloneable[key] = value;\n    }\n  }\n  return cloneable;\n}\n\nconst clone = safeClone(original);\nconsole.log("Safe Deep Copy");\nclone.greet(); // ✅ "Hi, I\'m Jay"\nconsole.log(clone.date instanceof Date); // ✅ true\nconsole.log(clone.map instanceof Map);   // ✅ true\n',
    output:
      'Original Nested B after shallow mutation: 99\nOriginal Nested B after deep mutation: 99\nDeep Nested B: 50\n\nconsole.log("Safe Deep Copy");\nHi, I\'m Jay\ntrue\ntrue\n',
    category: "DSA",
  },

  // Q73: Flatten nested object keys to dotted keys function
  {
    id: 73,
    title: "Utility: Flatten Nested Object Keys to Dotted Keys",
    explanation:
      "This is a utility function that converts a deeply nested object into a single-level object where the keys are separated by dots (e.g., `user.address.city`). This is commonly used for form data processing or internationalization keys.\n\n* **Approach:** Uses **recursion** to traverse the object.\n* **Key Logic:** It builds the key path by concatenating the parent key with the current key (e.g., `prefix + '.' + k`). The recursion stops when the value is not a plain object (e.g., it's a primitive, `null`, or an array).\n",
    tips: '"Interview Tips / Pitfalls"\n* **Array Handling:** The provided solution treats arrays as leaf nodes (values). If the requirement were to flatten arrays (e.g., `items.0.name`), the logic would need to iterate over the array indices.\n* **`hasOwnProperty`:** Using `Object.prototype.hasOwnProperty.call(obj, k)` is crucial to avoid processing inherited properties from the prototype chain.\n',
    codeString:
      "function flatten(obj, prefix = '', res = {}) {\n  for (const k in obj) {\n    // Ensure we only process own properties\n    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;\n    \n    const val = obj[k];\n    // Construct the new dotted key path\n    const key = prefix ? `${prefix}.${k}` : k; \n    \n    // Recursive condition: check if value is a non-null, non-array object\n    if (val && typeof val === 'object' && !Array.isArray(val)) {\n      flatten(val, key, res); // Recurse with new prefix\n    } else {\n      res[key] = val; // Assign the value to the flattened object\n    }\n  }\n  return res;\n}\n\nconst nestedObj = {\n  id: 1,\n  details: {\n    name: 'Jane',\n    config: {\n      theme: 'dark'\n    }\n  },\n  tags: ['a', 'b'],\n  status: null\n};\n\nconsole.log(flatten(nestedObj));\n",
    output:
      "{ id: 1, 'details.name': 'Jane', 'details.config.theme': 'dark', tags: [ 'a', 'b' ], status: null }",
    category: "DSA",
  }, // Q82: Polyfill: Array.prototype.filter
  {
    id: 82,
    title: "Polyfill: Array.prototype.filter",
    explanation:
      "The `filter()` method creates a **new array** containing all elements that satisfy the condition provided by the callback function. This polyfill demonstrates understanding of **prototypes**, **`this` context**, and conditional array building.\n\n## Implementation Details\n1. The function is added to `Array.prototype` (e.g., `myFilter`).\n2. The callback function is called for each element, receiving `(value, index, array)`.\n3. If the callback returns a **truthy** value, the original element is pushed into the `result` array.",
    tips: "\"Interview Tips / Pitfalls\"\n* Like `map`, `filter` must return a **new array** and not mutate the original.\n* A compliant polyfill should check for the callback function type and handle sparse arrays (skipping 'holes').\n* The element itself (`this[i]`) is what gets pushed to the result array, not the return value of the callback (unlike `map`).",
    codeString:
      "// We use 'myFilter' to avoid conflict with native filter\nif (!Array.prototype.myFilter) {\n  Array.prototype.myFilter = function(callbackFn) {\n    if (typeof callbackFn !== 'function') {\n      throw new TypeError('Callback must be a function');\n    }\n\n    const result = [];\n    // 'this' refers to the array on which myFilter is called\n    for (let i = 0; i < this.length; i++) {\n      // Check for property existence for sparse array handling\n      if (Object.prototype.hasOwnProperty.call(this, i)) {\n        // If callback returns true (truthy), keep the element\n        if (callbackFn(this[i], i, this)) {\n          result.push(this[i]);\n        }\n      }\n    }\n    return result;\n  };\n}\n\nconst arr = [10, 5, 20, 3];\nconst filtered = arr.myFilter(x => x > 7);\nconsole.log('Filtered Array:', filtered);\n\nconst sparseArr = [1, , 3];\nconst sparseFiltered = sparseArr.myFilter(x => x % 2 === 1);\nconsole.log('Sparse Filtered:', sparseFiltered);",
    output: "Filtered Array: [10, 20]\nSparse Filtered: [1, 3]",
    category: "DSA",
  },
  // Q83: Polyfill: Array.prototype.reduce
  {
    id: 83,
    title: "Polyfill: Array.prototype.reduce",
    explanation:
      "The `reduce()` method executes a callback function (`reducer`) on each element of the array, resulting in a single output value (accumulator). This is the most complex polyfill, testing careful argument handling.\n\n## Implementation Details\n1. The `initialValue` argument is optional. If it's missing, the accumulator starts as the first element (`this[0]`), and iteration starts at the second element (`this[1]`).\n2. If the array is empty and no initial value is provided, it throws a `TypeError` (edge case).\n3. The callback receives `(accumulator, currentValue, currentIndex, array)`.",
    tips: '"Interview Tips / Pitfalls"\n* The primary pitfall is correctly handling the **optional initial value**.\n* Ensure the implementation correctly initializes the accumulator and the starting index based on the presence of `initialValue`.\n* `reduce` is the most versatile array method; you can implement `map`, `filter`, and `forEach` using only `reduce`.',
    codeString:
      "// We use 'myReduce' to avoid conflict with native reduce\nif (!Array.prototype.myReduce) {\n  Array.prototype.myReduce = function(callbackFn, initialValue) {\n    if (typeof callbackFn !== 'function') {\n      throw new TypeError('Callback must be a function');\n    }\n\n    const len = this.length;\n    let accumulator = initialValue;\n    let startingIndex = 0;\n\n    // 1. Handle optional initialValue\n    if (arguments.length < 2) {\n      if (len === 0) {\n        throw new TypeError('Reduce of empty array with no initial value');\n      }\n      // Set first element as accumulator, start iterating from the second\n      accumulator = this[0];\n      startingIndex = 1;\n    }\n    \n    // 2. Iterate and accumulate\n    for (let i = startingIndex; i < len; i++) {\n      // Important for sparse arrays, skips unassigned indices\n      if (Object.prototype.hasOwnProperty.call(this, i)) {\n        accumulator = callbackFn(accumulator, this[i], i, this);\n      }\n    }\n\n    return accumulator;\n  };\n}\n\nconst numbers = [1, 2, 3, 4];\n\n// Example 1: Sum with initial value (0)\nconst sum = numbers.myReduce((acc, val) => acc + val, 0);\nconsole.log('Sum with 0:', sum);\n\n// Example 2: Max value without initial value\nconst max = numbers.myReduce((acc, val) => (acc > val ? acc : val));\nconsole.log('Max without initial:', max);\n",
    output: "Sum with 0: 10\nMax without initial: 4",
    category: "DSA",
  },
  // 85: Flatten Array (Deep Flattening)
  {
    id: 85,
    title: "Flatten Array (Deep Flattening)",
    explanation:
      "Flattening an array means taking a multi-dimensional array and converting it into a single-dimensional array. This is a common recursive algorithm question.\n\n### Methods\n1. **Native `Array.prototype.flat(depth)`:** The modern, built-in solution. Use `Infinity` for deep flattening.\n2. **Recursion:** Implement a custom function using recursion to handle arbitrary nesting levels.\n3. **Stack/Iterative:** Non-recursive approach using a stack (often preferred to avoid exceeding the call stack limit on extremely deep arrays).",
    tips: '"Interview Tips / Pitfalls"\n* Always mention the native `arr.flat(Infinity)` first.\n* The custom recursive solution is the expected implementation challenge.\n* Ensure the recursive solution correctly distinguishes between an array (`Array.isArray()`) and non-array elements.',
    codeString:
      "const nestedArray = [1, [2, [3, 4], 5], 6, [7, 8]];\n\n// 1. Native Solution (ES2019+)\nconst nativeFlat = nestedArray.flat(Infinity);\nconsole.log('Native Flat:', nativeFlat);\n\n// 2. Recursive Solution (Custom Polyfill)\nfunction customFlat(arr) {\n  const result = [];\n  \n  for (let i = 0; i < arr.length; i++) {\n    const element = arr[i];\n    \n    if (Array.isArray(element)) {\n      // Recursively call for nested array\n      result.push(...customFlat(element));\n    } else {\n      // Push primitive elements\n      result.push(element);\n    }\n  }\n  \n  return result;\n}\n\nconst customFlatResult = customFlat(nestedArray);\nconsole.log('Custom Flat:', customFlatResult);\n",
    output:
      "Native Flat: [1, 2, 3, 4, 5, 6, 7, 8]\nCustom Flat: [1, 2, 3, 4, 5, 6, 7, 8]",
    category: "DSA",
  },

  // Q91: Deep Clone Methods: Recursion vs JSON.stringify - MASTER Q96/Q97
  {
    id: 91,
    title: "Deep Clone Methods: Recursion vs JSON.stringify",
    explanation:
      "Deep cloning ensures a new, fully independent copy of an object and all its nested structures, preventing reference issues.\n\n### 1. Recursive Solution (Pure JS)\nUses recursion and a **WeakMap** to handle nested objects, arrays, and critically, **circular references**.\n\n### 2. `JSON.parse(JSON.stringify(obj))`\nFast and simple for plain data, but **fails silently** on several key data types:\n* **Functions** are stripped.\n* **`Date`** objects become strings (losing their prototype).\n* **`undefined`** is stripped.\n* **Circular references** throw an error.",
    tips: `\"Interview Tips / Pitfalls"\n* **Circular Reference Trap:** Demonstrate using a WeakMap in the recursive solution to track visited objects and prevent infinite loops.\n* **Modern API:** Always mention **structuredClone()** as the modern, safest native API for deep copying JSON-safe values, Dates, Maps, etc., without needing a custom recursive function.\n* **Array Handling:** Ensure the recursive function correctly identifies and handles arrays ('Array.isArray').`,
    codeString:
      "function deepClone(original, cache = new WeakMap()) {\n  if (original === null || typeof original !== 'object') return original;\n  \n  // CRUCIAL: Handle circular references\n  if (cache.has(original)) return cache.get(original);\n\n  const clone = Array.isArray(original) ? [] : {};\n  cache.set(original, clone);\n\n  for (const key in original) {\n    if (Object.prototype.hasOwnProperty.call(original, key)) {\n      clone[key] = deepClone(original[key], cache);\n    }\n  }\n  return clone;\n}\n\nconst original = { id: 1, date: new Date(), func: () => 0 };\noriginal.self = original; // Circular Reference\n\n// 1. JSON Method Test\nconst jsonResult = JSON.parse(JSON.stringify(original));\nconsole.log('JSON.stringify Failed:', jsonResult.date, jsonResult.func);\n\n// 2. Recursive Method Test\nconst recursiveResult = deepClone(original);\nconsole.log('Recursive Date Check:', recursiveResult.date instanceof Date);\nconsole.log('Recursive Circular Check:', recursiveResult.self === recursiveResult);\n",
    output:
      "JSON.stringify Failed: 2025-11-18T...Z undefined\nRecursive Date Check: true\nRecursive Circular Check: true",
    category: "DSA",
  },

  // Q15: React Router: useParams and query params
  {
    id: 15,
    title: "React Router: useParams vs useSearchParams (Path vs Query Params)",
    explanation:
      "* **Path Parameters (`useParams`):** Extract dynamic segments from the URL path defined in the route.\n    * **Example Route:** `/users/:userId`\n    * **Usage:** `const { userId } = useParams();`\n* **Query Parameters (`useSearchParams`):** Extract key/value pairs from the URL search string, used for view state (filtering, sorting, pagination).\n    * **Example URL:** `/users/123?view=details&sort=asc`\n    * **Usage:** `const [searchParams, setSearchParams] = useSearchParams();`\n",
    tips: '"Interview Tips / Pitfalls"\n* **Function:** Path params identify the specific resource (`userId`); Query params control the *view* of that resource (`view`, `sort`).\n* **Re-render:** Changing a path parameter often leads to the component being *remounted* (new resource). Changing query parameters typically causes a *re-render* of the same component with updated props.\n',
    codeString:
      "// Requires react-router-dom v6+\nimport { useParams, useSearchParams } from 'react-router-dom';\n\nfunction UserProfile() {\n  // Path Param (e.g., /user/42)\n  const { userId } = useParams(); \n\n  // Query Params (e.g., /user/42?tab=activity)\n  const [searchParams, setSearchParams] = useSearchParams();\n  const tab = searchParams.get('tab') || 'profile';\n\n  const navigateToDetails = () => {\n    // Update the query param\n    setSearchParams({ tab: 'details' }); \n  };\n\n  return (\n    <div>\n      <h1>User ID: {userId}</h1>\n      <p>Current Tab: {tab}</p>\n      <button onClick={navigateToDetails}>Show Details</button>\n    </div>\n  )\n}\n",
    output: "Run in a React Router environment.",
    category: "Others",
  },
  // Q16: Passing & reading query params (v6)
  {
    category: "Others",
    id: 16,
    title: "Passing and Reading Query Params in React Router v6",
    explanation:
      "In React Router v6, the primary way to manage query parameters is using the `useSearchParams` hook.\n\n* **Reading:** It returns a URLSearchParams object (readable via `.get()`) and a setter function.\n* **Setting:** The setter function (`setSearchParams`) replaces the current query string.\n",
    tips: '"Interview Tips / Pitfalls"\n* **URL Encoding:** Always use `encodeURIComponent()` when creating query strings to handle special characters safely.\n* **History Management:** When navigating, decide between `history.push` (adds to history, use for navigation) and `history.replace` (replaces current history entry, use for internal state updates like sorting). `useSearchParams` setter defaults to pushing history.\n',
    codeString:
      "// Requires react-router-dom v6+\nimport { useSearchParams } from 'react-router-dom';\n\nfunction SearchComponent() {\n  const [searchParams, setSearchParams] = useSearchParams();\n  \n  // Reading:\n  const searchTerm = searchParams.get('term') || '';\n\n  // Setting:\n  const handleSearch = (newTerm) => {\n    setSearchParams({ term: newTerm, page: 1 });\n  };\n\n  return (\n    <div>\n      <input \n        type=\"text\" \n        value={searchTerm} \n        onChange={(e) => handleSearch(e.target.value)}\n        placeholder=\"Search...\" \n      />\n      <p>Current search term: {searchTerm}</p>\n    </div>\n  )\n}\n",
    output: "Run in a React Router environment.",
  },

  // Q17: Will component re-render if query param changes?
  {
    id: 17,
    title: "Component Re-render on Query Parameter Change",
    explanation:
      "**Yes, a component will re-render if a query parameter changes, provided that the component is using a router hook that subscribes to the URL location.**\n\n1.  The URL changes (e.g., `?page=1` to `?page=2`).\n2.  The Router (`BrowserRouter`) detects the location change.\n3.  The Router updates the internal context that hooks like `useLocation` or `useSearchParams` read from.\n4.  Any component using these hooks will receive the new value and re-render.\n",
    tips: '"Interview Tips / Pitfalls"\n* **Optimization:** If the query change only affects a small part of the UI, use `useMemo` or `React.memo` on expensive child components whose props do not rely on the query parameter to prevent unnecessary re-renders.\n* **Dependency:** Ensure your `useEffect` hooks include the query parameter value in the dependency array if they need to fetch data based on that value.\n',
    codeString:
      "import React, { useEffect } from 'react';\nimport { useSearchParams } from 'react-router-dom';\n\nfunction DataFetcher() {\n  const [searchParams] = useSearchParams();\n  const sortOrder = searchParams.get('sort') || 'default';\n\n  useEffect(() => {\n    // This effect runs every time the 'sort' query param changes\n    console.log(`Fetching data with sort order: ${sortOrder}`);\n    // fetch('/api/data?sort=' + sortOrder)\n  }, [sortOrder]); // <-- Dependency array ensures reaction to query change\n\n  return <div>Data sorted by: {sortOrder}</div>;\n}\n",
    output:
      "Run in a React Router environment. Logs when the 'sort' query parameter changes.",
    category: "Others",
  },

  // Q20: Exception handling in Java (short)
  {
    id: 20,
    title: "Exception Handling in Java (try/catch/finally)",
    explanation:
      "Java uses the `try-catch-finally` construct for exception handling.\n\n* **`try`:** Encloses code that might throw an exception.\n* **`catch`:** Handles the exception if one is thrown in the `try` block. You can have multiple `catch` blocks for specific exception types.\n* **`finally`:** Contains code that **always** executes, regardless of whether an exception occurred or was handled (critical for resource cleanup, like closing database connections or files).\n* **Checked vs Unchecked:** **Checked exceptions** (like `IOException`) must be explicitly declared in the method signature using `throws` or handled. **Unchecked exceptions** (like `NullPointerException`, which are runtime errors) do not require explicit handling.\n",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize using specific `catch` blocks over catching the generic `Exception` class.\n* Mention the **try-with-resources** statement (for AutoCloseable objects) as the modern and safest way to handle resource cleanup in Java.\n',
    codeString:
      '// Java Code Example (Conceptual)\n/*\npublic void processFile(String path) throws IOException {\n    try (BufferedReader reader = new BufferedReader(new FileReader(path))) {\n        String line = reader.readLine();\n        // process line...\n    } catch (FileNotFoundException e) {\n        System.err.println("File not found: " + e.getMessage());\n    } catch (IOException e) {\n        System.err.println("Error reading file: " + e.getMessage());\n    }\n    // No explicit finally needed due to try-with-resources, \n    // but code here would execute last.\n}\n*/\n',
    category: "Others",
    output: "Conceptual Java code.",
  },
  // Q21: Annotations in Spring Boot (short)
  {
    id: 21,
    title: "Key Annotations in Spring Boot",
    explanation:
      "Spring Boot uses annotations heavily for configuration, dependency injection, and component scanning.\n\n| Annotation | Purpose |\n|---|---|\n| **`@SpringBootApplication`** | Combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`. Used to bootstrap the application. |\n| **`@RestController`** | Combines `@Controller` and `@ResponseBody`. Marks a class as a controller where methods return data directly (API). |\n| **`@Service`** | Marks business logic components. |\n| **`@Repository`** | Marks data access layer components (translates exceptions). |\n| **`@Autowired`** | Used for field/setter/constructor injection (Dependency Injection). |\n| **`@Configuration` / `@Bean`** | Defines configuration classes and methods that produce beans (objects) managed by the Spring container. |\n| **`@GetMapping`** | Mapping HTTP GET requests to handler methods. |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Dependency Injection (DI):** Explain that **constructor injection** is the preferred method over field (`@Autowired` on a field) or setter injection, as it ensures dependencies are available when the object is constructed and supports immutability.\n',
    codeString:
      '// Java/Spring Boot Code Example (Conceptual)\n/*\n@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    private final UserService userService; // Constructor Injection Preferred\n\n    public UserController(UserService userService) {\n        this.userService = userService;\n    }\n\n    @GetMapping("/{id}")\n    public User getUser(@PathVariable Long id) {\n        return userService.findById(id);\n    }\n}\n*/\n',
    output: "Conceptual Spring Boot code.",
    category: "Others",
  },
  // Q22: Hibernate: how to use & connect (summary)
  {
    id: 22,
    title: "Hibernate/JPA in Spring Boot",
    explanation:
      "Hibernate is the most popular Java Persistence API (JPA) implementation. Spring Data JPA simplifies its usage significantly.\n\n1.  **Dependencies:** Add `spring-boot-starter-data-jpa` and a database driver (e.g., MySQL, Postgres).\n2.  **Configuration:** Configure the database connection in `application.properties` or `application.yml` (`spring.datasource.url`, `username`, `password`).\n3.  **Entities:** Annotate Java classes with `@Entity` and define the primary key with `@Id`.\n4.  **Repositories:** Extend `JpaRepository` to get free CRUD (Create, Read, Update, Delete) methods.\n",
    tips: '"Interview Tips / Pitfalls"\n* **N+1 Problem:** Discuss the `N+1 SELECTs` problem where fetching a list of entities followed by lazy loading their associations causes many separate database calls.\n* **Loading:** Explain the difference between **Lazy Loading** (default, fetches association when accessed) and **Eager Loading** (fetches association immediately). Use `@EntityGraph` or JPQL joins to avoid N+1 issues.\n',
    codeString:
      "// Java/JPA Code Example (Conceptual)\n/*\n@Entity\npublic class Product {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String name;\n    // ...\n}\n\n@Repository\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    // Custom query method\n    List<Product> findByCategoryName(String categoryName);\n}\n*/\n",
    output: "Conceptual JPA code.",
    category: "Others",
  },

  // Q38: Can you use async inside useEffect?
  {
    id: 38,
    title: "Using async/await inside useEffect",
    explanation:
      "You **cannot** make the `useEffect` callback function itself `async`. If you did, it would implicitly return a `Promise`, and React expects the return value to be a synchronous cleanup function.\n\n**The Solution:** Define and immediately call an inner `async` function *inside* the `useEffect` callback.\n\n## Cleanup for Async Calls\nWhen performing asynchronous operations (like `fetch`), you must handle cleanup to avoid:\n1.  **Memory Leaks:** If the component unmounts while the request is in flight.\n2.  **Race Conditions:** If dependencies change and a slower, older request resolves after a faster, newer one, potentially setting stale state.\n\nThe example below uses a **flag variable** (`mounted`) in the cleanup function to prevent state updates on an unmounted component.\n",
    tips: '"Interview Tips / Pitfalls"\n* **AbortController:** For real-world fetch calls, demonstrate using `AbortController` for cleaner request cancellation instead of the local `mounted` flag.\n',
    codeString:
      "import React, { useState, useEffect } from 'react';\n\nfunction AsyncEffectDemo({ url }) {\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    let mounted = true; // Flag for cleanup\n    \n    // Define inner async function\n    async function fetchData() {\n      try {\n        const res = await fetch(url);\n        const json = await res.json();\n        \n        // Only update state if component is still mounted\n        if (mounted) { \n          setData(json);\n        }\n      } catch (e) {\n        if (mounted) {\n          console.error(e);\n        }\n      }\n    }\n    \n    fetchData();\n\n    // Cleanup function: runs on unmount or before effect re-runs\n    return () => { \n      mounted = false; \n    };\n  }, [url]); // Re-run when URL changes\n\n  return <div>{data ? 'Data Loaded' : 'Loading...'}</div>\n}\n",
    output: "Conceptual React code demonstrating safe async operations.",
    category: "Others",
  },

  // Q58: Design an e-commerce application (high-level)
  {
    category: "Others",
    id: 58,
    title: "High-Level E-Commerce Application Design",
    explanation:
      "Designing an e-commerce app requires covering user-facing features, core services, and infrastructure concerns.\n\n## Key Services and Components\n* **Client (Frontend):** Product Listing (PLP), Product Detail (PDP), Cart, Checkout, User Profile. Requires robust React/Vue/Angular structure.\n* **Product Service:** Manages product catalog, pricing, and inventory.\n* **Order Service:** Handles order creation, status updates, and shipping integration.\n* **Payment Service:** Securely integrates with external payment processors (Stripe, PayPal).\n\n## Database Schema (Simplified)\n* **products:** (id, name, price, description, stock, categoryId)\n* **users:** (id, name, email, address)\n* **orders:** (id, userId, status, total, createdAt, shippingAddress)\n* **order_items:** (orderId, productId, quantity, unitPrice)\n\n## Key Technical Considerations\n* **Performance:** Use **CDN** for static assets, lazy-loading for images, and server-side rendering (SSR) for initial page load speed (SEO).\n* **Inventory/Payments:** Must be **ACID-compliant** (Atomic, Consistent, Isolated, Durable) or use robust queues and transactional integrity to ensure products aren't oversold and payments are processed only once (**Idempotency**).\n* **Security:** Use HttpOnly cookies for session, secure payment pages, and implement rate limiting.\n",
    codeString:
      "// Conceptual API Endpoints\n/*\nGET /api/products\nGET /api/products/:id\nPOST /api/cart/items\nPOST /api/orders (triggers payment & inventory update)\n*/\n",
    output: "High-level design and conceptual endpoints.",
  },

  // Q78: Essential JavaScript Array Methods Reference
  {
    id: 78,
    category: "Others",
    title: "Essential JavaScript Array Methods Reference (Polyfills/Mutators)",
    explanation:
      "JavaScript Arrays provide a robust set of methods for efficient manipulation, transformation, and traversal of data. These methods are categorized by their primary function: conversion/combination, modification, searching, transformation, reduction, and utility.",
    tips: '"Interview Tips / Pitfalls"\n* **Mutability is Key:** Know which methods modify the original array (**mutators**): `push`, `pop`, `unshift`, `shift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`. Methods that return a **new** array (**non-mutators**): `map`, `filter`, `slice`, `concat`, `reduce`, `from`.\n* **The `sort()` trap:** The default `sort()` is lexicographical (string-based). Always use a custom comparator function for numbers or complex objects: `arr.sort((a, b) => a - b)`.\n* **Avoid `delete`:** Using the `delete` operator on an array element leaves an empty slot (`undefined`) and **does not change the array\'s length**. Use `splice()` or `pop`/`shift` for reliable removal.\n* **`from()` vs. Spread:** Explain that `Array.from()` can create an array from any iterable or array-like object (like `arguments` or a NodeList), and can also apply a `map` function during creation, which is often more versatile than the spread operator (`...`).',
    codeString:
      "// --- Setup (Note: Mutators change 'data' array state over time) --- \nlet data = [5, 20, 3, 10];\nconst words = ['apple', 'banana', 'cherry'];\nlet combined = [1, 2, 3, 4, 5];\n\n// --------------------------------\n// 🔹 Convert & Combine Methods \n// --------------------------------\nconst string1 = data.toString();\nconsole.log('toString():', string1); // Output: 5,20,3,10\nconst string2 = data.join(' | ');\nconsole.log('join():', string2); // Output: 5 | 20 | 3 | 10\n// ... (rest of the array method demonstrations)\n",
    output:
      "toString(): 5,20,3,10\njoin(): 5 | 20 | 3 | 10\nconcat(): [5, 20, 3, 10, 1, 2]\nArray.from(): ['a', 'b', 'c']\n// ... (full console output from Q82)",
  },
];
