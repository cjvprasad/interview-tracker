const msqDSAData = [
  // =========================================================
  // 1️⃣ Palindrome Number
  // =========================================================
  {
    id: 1,
    title: "Palindrome Number",
    category: "Most Asked",
    desc: `<p>Check whether a number reads the same forward and backward.</p>`,
    examples: [
      { input: "121", output: "true" },
      { input: "123", output: "false" },
    ],
    constraints: [
      "Input must be an integer.",
      "Negative numbers are not palindromes.",
    ],
    interviewQs: [
      {
        q: "Can you solve it without converting to string?",
        a: "Yes, reverse half the number mathematically.",
      },
    ],
    tips: [
      "Modulus (%) helps extract digits.",
      "Avoid reversing the whole number — overflow risk.",
    ],
    solution: [
      {
        type: "Brute Force (String Method)",
        inputType: "N",
        input: 121,
        code: `
function isPalindrome_str(x){
  if(x < 0) return false;
  return x.toString() === x.toString().split("").reverse().join("");
}
      `,
      },
      {
        type: "Optimal (Reverse Half Mathematically)",
        inputType: "N",
        input: 12321,
        code: `
function isPalindrome_optimal(x){
  if(x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let rev = 0;
  while(x > rev){
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === rev || x === Math.floor(rev / 10);
}
      `,
      },
      {
        type: "Universal (Check Numbers + Strings)",
        inputType: "X",
        input: "madam",
        code: `
function isPalindrome(value){
  const s = value.toString();
  let i = 0, j = s.length - 1;

  while(i < j){
    if(s[i] !== s[j]) return false;
    i++;
    j--;
  }
  return true;
}
      `,
      },
    ],

    // ============================
    // DRY RUN FUNCTIONS (MATCHES SOLUTION INDEX)
    // ============================
    dryRunFunc: [
      // Index 0 → Brute Force
      (num) => {
        const logs = [];
        let Pass = 1;
        const s = num.toString();
        logs.push(`Pass ${Pass}:`);
        logs.push(`Input: ${num}`);
        logs.push(`Converted to string: "${s}"`);
        logs.push(`Reversed string: "${s.split("").reverse().join("")}"`);
        logs.push(
          s === s.split("").reverse().join("")
            ? `✔ Palindrome (${s}===${s.split("").reverse().join("")})`
            : `❌ Not Palindrome  (${s}===${s.split("").reverse().join("")})`
        );
        return logs;
      },

      // Index 1 → Optimal Half-Reversal
      (num) => {
        const logs = [];
        let x = num,
          rev = 0,
          Pass = 1;

        logs.push(`Pass ${Pass}:`);
        logs.push(`Input: ${num}`);
        logs.push(`Initial rev = 0`);

        if (x < 0 || (x % 10 === 0 && x !== 0)) {
          logs.push(
            `❌ Number is negative or ends with zero → Not a palindrome`
          );
          return logs;
        }

        while (x > rev) {
          const digit = x % 10;
          logs.push(`Extracted digit: ${digit}`);
          rev = rev * 10 + digit;
          logs.push(`Updated rev = ${rev}`);
          x = Math.floor(x / 10);
          logs.push(`Updated x = ${x}`);
          Pass++;
          logs.push(`Pass ${Pass}:`);
        }

        logs.push(`Loop ended: x=${x}, rev=${rev}`);

        if (x === rev || x === Math.floor(rev / 10)) {
          logs.push(
            `✔ Palindrome match ${x} === ${rev} || ${x} === ${Math.floor(
              rev / 10
            )} `
          );
        } else {
          logs.push(
            `❌ Not a palindrome ${x} === ${rev} || ${x} === ${Math.floor(
              rev / 10
            )}`
          );
        }

        return logs;
      },

      // Index 2 → Universal String/Number Checker
      (value) => {
        const logs = [];
        const s = value.toString();
        let Pass = 1;

        logs.push(`Pass ${Pass}:`);
        logs.push(`Converted to string: "${s}"`);

        let i = 0,
          j = s.length - 1;

        while (i < j) {
          logs.push(
            `Compare ${s[i]} and ${s[j]} (i=${i},j=${j} -> s[i] !== s[j])`
          );
          if (s[i] !== s[j]) {
            logs.push(`❌ Mismatch found → Not palindrome ${s[i]} !== ${s[j]}`);
            return logs;
          }
          i++;
          j--;
          logs.push(`Increment  i++ (${i})`);
          logs.push(`Decerement  j-- (${j})`);
          logs.push(`Pass ${++Pass}:`);
        }

        logs.push("✔ All characters match → Palindrome");
        return logs;
      },
    ],

    starterCode: `function solve(x){
  return false;
}
console.log(solve(121));`,

    input: "121",
  },

  // =========================================================
  // 2️⃣ Fibonacci Number
  // =========================================================
  {
    id: 2,
    title: "Fibonacci Number",
    category: "Most Asked",

    desc: `
      <p>Return the Nth Fibonacci number using recursion or iteration.</p>
    `,

    examples: [
      { input: "5", output: "5" },
      { input: "10", output: "55" },
    ],
    constraints: ["0 ≤ n ≤ 30"],
    interviewQs: [
      {
        q: "Recursive vs iterative complexity?",
        a: "Recursive: O(2^n), Iterative: O(n).",
      },
    ],
    tips: ["Use memoization to optimize recursion."],
    solution: [
      {
        type: "Brute Force (Recursive)",
        inputType1: "Number",
        input1: 5,
        code: `function fib_bruteforce(n){
  if(n <= 1) return n;
  return fib_bruteforce(n-1) + fib_bruteforce(n-2);
}`,
      },
      {
        type: "Better (Memoized)",
        inputType1: "Number",
        input1: 10,
        code: `function fib_memo(n, memo = {}){
  if(n <= 1) return n;
  if(memo[n]) return memo[n];
  memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo);
  return memo[n];
}`,
      },
      {
        type: "Optimal (Iterative)",
        inputType1: "Number",
        input1: 8,
        code: `function fib_optimal(n){
  if(n <= 1) return n;
  let a = 0, b = 1;
  for(let i = 2; i <= n; i++){
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
      },
    ],
    dryRunFunc: [
      (n) => {
        return [
          `Input: ${n}`,
          "⚠️ Recursion tree too large to trace linearly.",
        ];
      },
      (n) => {
        return [`Input: ${n}`, "Using Memoization Object to store results..."];
      },
      (n) => {
        const logs = [];
        logs.push(`Input: ${n}`);
        let a = 0,
          b = 1;
        if (n <= 1) return [`Result: ${n}`];
        for (let i = 2; i <= n; i++) {
          let c = a + b;
          logs.push(`i=${i}: ${a} + ${b} = ${c}`);
          a = b;
          b = c;
        }
        logs.push(`Final Result: ${b}`);
        return logs;
      },
    ],
    starterCode: `function solve(n) { return 0; }`,
  },

  // =========================================================
  // 3️⃣ Valid Anagram
  // =========================================================
  {
    id: 3,
    title: "Valid Anagram",
    category: "Most Asked",
    desc: `<p>Two strings are anagram if they contain the same characters in any order.</p>`,
    examples: [
      { input: `"anagram", "nagaram"`, output: "true" },
      { input: `"rat", "car"`, output: "false" },
    ],
    constraints: ["Strings only contain lowercase letters."],
    interviewQs: [
      {
        q: "How to solve in O(n)?",
        a: "Use frequency counting instead of sorting.",
      },
    ],
    tips: ["Sorting is O(n log n), counting is O(n)."],
    solution: [
      {
        type: "Brute Force (Sorting)",
        inputType1: "String",
        input1: "anagram",
        inputType2: "String",
        input2: "nagaram",
        code: `function isAnagram_sort(s, t){
  if(s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
}`,
      },
      {
        type: "Optimal (Hash Map Counting)",
        inputType1: "String",
        input1: "rat",
        inputType2: "String",
        input2: "car",
        code: `function isAnagram_optimal(s, t){
  if(s.length !== t.length) return false;
  const count = {};
  for(const c of s) count[c] = (count[c] || 0) + 1;
  for(const c of t){
    if(!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
      },
    ],
    dryRunFunc: [
      (s, t) => {
        const logs = [];
        logs.push(`s: "${s}", t: "${t}"`);
        const sSort = s.split("").sort().join("");
        const tSort = t.split("").sort().join("");
        logs.push(`Sorted s: "${sSort}"`);
        logs.push(`Sorted t: "${tSort}"`);
        logs.push(sSort === tSort ? "✔ Anagram" : "❌ Not Anagram");
        return logs;
      },
      (s, t) => {
        const logs = [];
        if (s.length !== t.length) return ["❌ Length mismatch"];
        const count = {};
        logs.push("Counting chars in s...");
        for (const c of s) {
          count[c] = (count[c] || 0) + 1;
        }
        logs.push(`Map: ${JSON.stringify(count)}`);
        for (const c of t) {
          if (!count[c]) {
            logs.push(`❌ "${c}" not found or empty`);
            return logs;
          }
          count[c]--;
        }
        logs.push("✔ All counts balanced");
        return logs;
      },
    ],
    starterCode: `function solve(s, t) { return false; }`,
  },

  // =========================================================
  // 4️⃣ Two Sum
  // =========================================================
  {
    id: 4,
    title: "Two Sum",
    category: "Most Asked",
    desc: `<p>Return indices of the two numbers that sum to target.</p>`,
    examples: [{ input: `[2,7,11,15], target=9`, output: "[0,1]" }],
    constraints: ["Only one valid answer exists."],
    interviewQs: [
      {
        q: "Can you solve in O(n)?",
        a: "Use a hash map storing visited values.",
      },
    ],
    tips: ["Store number → index mapping."],
    solution: [
      {
        type: "Brute Force (O(n²))",
        inputType1: "Array",
        input1: [2, 7, 11, 15],
        inputType2: "Number",
        input2: 9,
        code: `function twoSum_bruteforce(nums, target){
  for(let i=0;i<nums.length;i++){
    for(let j=i+1;j<nums.length;j++){
      if(nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}`,
      },
      {
        type: "Optimal (Hash Map)",
        inputType1: "Array",
        input1: [3, 2, 4],
        inputType2: "Number",
        input2: 6,
        code: `function twoSum_optimal(nums, target){
  const map = {};
  for(let i=0;i<nums.length;i++){
    const diff = target - nums[i];
    if(map[diff] !== undefined) return [map[diff], i];
    map[nums[i]] = i;
  }
  return [];
}`,
      },
    ],
    dryRunFunc: [
      (nums, target) => {
        const logs = [];
        logs.push(`Target: ${target}`);
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            logs.push(`Checking [${i}](${nums[i]}) + [${j}](${nums[j]})`);
            if (nums[i] + nums[j] === target) {
              logs.push(`✔ Found! [${i}, ${j}]`);
              return logs;
            }
          }
        }
        return logs;
      },
      (nums, target) => {
        const logs = [];
        const map = {};
        logs.push(`Target: ${target}`);
        for (let i = 0; i < nums.length; i++) {
          const diff = target - nums[i];
          logs.push(`Idx ${i}: Val ${nums[i]}. Need ${diff}.`);
          if (map[diff] !== undefined) {
            logs.push(`✔ Found ${diff} at idx ${map[diff]}`);
            return logs;
          }
          map[nums[i]] = i;
          logs.push(`Store ${nums[i]} -> ${i}`);
        }
        return logs;
      },
    ],
    starterCode: `function solve(nums, target) { return []; }`,
  },

  // =========================================================
  // 5️⃣ Best Time to Buy/Sell Stock
  // =========================================================
  {
    id: 5,
    title: "Best Time to Buy & Sell Stock",
    category: "Most Asked",
    desc: `<p>Find max profit by choosing a single buy and sell day.</p>`,
    examples: [{ input: "[7,1,5,3,6,4]", output: "5" }],
    constraints: ["Prices length ≥ 1", "You must buy before selling"],
    interviewQs: [
      {
        q: "Why only one transaction?",
        a: "This is the basic version of the stock problem.",
      },
    ],
    tips: ["Track minimum price so far."],
    solution: [
      {
        type: "Brute Force (O(n²))",
        inputType1: "Array",
        input1: [7, 1, 5, 3, 6, 4],
        code: `function maxProfit_bruteforce(prices){
  let profit = 0;
  for(let i=0;i<prices.length;i++){
    for(let j=i+1;j<prices.length;j++){
      profit = Math.max(profit, prices[j] - prices[i]);
    }
  }
  return profit;
}`,
      },
      {
        type: "Optimal (Single Pass)",
        inputType1: "Array",
        input1: [7, 1, 5, 3, 6, 4],
        code: `function maxProfit_optimal(prices){
  let min = Infinity, profit = 0;
  for(const p of prices){
    min = Math.min(min, p);
    profit = Math.max(profit, p - min);
  }
  return profit;
}`,
      },
    ],
    dryRunFunc: [
      (prices) => {
        return ["Slow scan (nested loops). Tracing optimal instead..."];
      },
      (prices) => {
        const logs = [];
        let min = Infinity,
          profit = 0;
        for (const p of prices) {
          logs.push(`Price: ${p}`);
          if (p < min) {
            min = p;
            logs.push(`📉 New Min: ${min}`);
          }
          const pot = p - min;
          if (pot > profit) {
            profit = pot;
            logs.push(`💰 New Max Profit: ${profit}`);
          }
        }
        logs.push(`Final Profit: ${profit}`);
        return logs;
      },
    ],
    starterCode: `function solve(prices) { return 0; }`,
  },

  // =========================================================
  // 6️⃣ Second Largest Number
  // =========================================================
  {
    id: 6,
    title: "Second Largest Number",
    category: "Array",
    desc: `<p>Return the second largest value from an array.</p>`,
    examples: [{ input: "[3,5,2,4,1]", output: "4" }],
    constraints: ["Array length ≥ 2"],
    interviewQs: [
      {
        q: "Can duplicates exist?",
        a: "Yes, skip duplicates when tracking second max.",
      },
    ],
    tips: ["Use two variables: max & secondMax."],
    solution: [
      {
        type: "Brute Force (Sorting)",
        inputType1: "Array",
        input1: [3, 5, 2, 4, 1],
        code: `function secondLargest_sort(arr){
  const unique = [...new Set(arr)];
  unique.sort((a,b)=>b-a);
  return unique[1];
}`,
      },
      {
        type: "Optimal (One Pass)",
        inputType1: "Array",
        input1: [12, 35, 1, 10, 34, 1],
        code: `function secondLargest_optimal(arr){
  let max = -Infinity, second = -Infinity;
  for(const n of arr){
    if(n > max){
      second = max;
      max = n;
    } else if(n > second && n < max){
      second = n;
    }
  }
  return second;
}`,
      },
    ],
    dryRunFunc: [
      (arr) => {
        const logs = [];
        const u = [...new Set(arr)].sort((a, b) => b - a);
        logs.push(`Unique & Sorted: [${u.join(", ")}]`);
        logs.push(`Second Element: ${u[1]}`);
        return logs;
      },
      (arr) => {
        const logs = [];
        let max = -Infinity,
          sec = -Infinity;
        for (const n of arr) {
          logs.push(`Val: ${n} | Max: ${max} | 2nd: ${sec}`);
          if (n > max) {
            sec = max;
            max = n;
            logs.push(`-> Update Max: ${max}, 2nd: ${sec}`);
          } else if (n > sec && n < max) {
            sec = n;
            logs.push(`-> Update 2nd: ${sec}`);
          }
        }
        return logs;
      },
    ],
    starterCode: `function solve(arr) { return -1; }`,
  },

  // =========================================================
  // 7️⃣ Rotate Array by K
  // =========================================================
  {
    id: 7,
    title: "Rotate Array by K",
    category: "Array",
    desc: `<p>Rotate an array to the right by K positions.</p>`,
    examples: [{ input: "[1,2,3,4,5,6,7], k=3", output: "[5,6,7,1,2,3,4]" }],
    constraints: ["0 ≤ k < n"],
    interviewQs: [
      { q: "Can you do this in-place?", a: "Yes, reverse algorithm works." },
    ],
    tips: ["Use reversal technique for O(1) space"],
    solution: [
      {
        type: "Brute Force",
        inputType1: "Array",
        input1: [1, 2, 3, 4, 5],
        inputType2: "Number",
        input2: 2,
        code: `function rotate_bruteforce(arr, k){
  k = k % arr.length;
  for(let i=0;i<k;i++){
    arr.unshift(arr.pop());
  }
  return arr;
}`,
      },
      {
        type: "Better (Extra Array)",
        inputType1: "Array",
        input1: [1, 2, 3, 4, 5],
        inputType2: "Number",
        input2: 2,
        code: `function rotate_extra(arr, k){
  k = k % arr.length;
  const copy = [...arr];
  for(let i=0; i<arr.length; i++){
    arr[(i+k) % arr.length] = copy[i];
  }
  return arr;
}`,
      },
      {
        type: "Optimal (Reverse In-place)",
        inputType1: "Array",
        input1: [1, 2, 3, 4, 5, 6, 7],
        inputType2: "Number",
        input2: 3,
        code: `function rotate_optimal(arr, k){
  k = k % arr.length;
  reverse(arr, 0, arr.length-1);
  reverse(arr, 0, k-1);
  reverse(arr, k, arr.length-1);
  return arr;
}

function reverse(arr, l, r){
  while(l < r){
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++; r--;
  }
}`,
      },
    ],
    dryRunFunc: [
      (arr, k) => {
        const logs = [];
        logs.push(`Initial: [${arr}]`);
        k = k % arr.length;
        for (let i = 0; i < k; i++) {
          const val = arr.pop();
          arr.unshift(val);
          logs.push(`Step ${i + 1} (Pop ${val} & Unshift): [${arr}]`);
        }
        return logs;
      },
      (arr, k) => {
        return ["Creates a copy array and maps indices. (O(n) space)"];
      },
      (arr, k) => {
        const logs = [];
        logs.push(`Input: [${arr}], k=${k}`);
        logs.push("1. Reverse Full Array");
        arr.reverse();
        logs.push(`[${arr}]`);
        logs.push("2. Reverse First K");
        // Note: Actual logic is partial reverse, this log simplifies visualization
        logs.push("3. Reverse Rest");
        return logs;
      },
    ],
    starterCode: `function solve(arr, k) { return arr; }`,
  },

  // =========================================================
  // 8️⃣ Remove Duplicates from Sorted Array
  // =========================================================
  {
    id: 8,
    title: "Remove Duplicates from Sorted Array",
    category: "Array",
    desc: `<p>Remove duplicates in-place and return new length.</p>`,
    examples: [{ input: "[1,1,2]", output: "2" }],
    constraints: ["Sorted array"],
    interviewQs: [
      {
        q: "Why two-pointer approach?",
        a: "One pointer for overwriting unique values.",
      },
    ],
    tips: ["Use i=1 pointer to overwrite duplicates"],
    solution: [
      {
        type: "Brute Force (Set)",
        inputType1: "Array",
        input1: [1, 1, 2],
        code: `function removeDuplicates_set(nums){
  const unique = [...new Set(nums)];
  for(let i=0;i<unique.length;i++){
    nums[i] = unique[i];
  }
  return unique.length;
}`,
      },
      {
        type: "Optimal (Two Pointer)",
        inputType1: "Array",
        input1: [0, 0, 1, 1, 1, 2, 2, 3],
        code: `function removeDuplicates_optimal(nums){
  if(nums.length === 0) return 0;
  let i = 1;
  for(let j = 1; j < nums.length; j++){
    if(nums[j] !== nums[j-1]){
      nums[i] = nums[j];
      i++;
    }
  }
  return i;
}`,
      },
    ],
    dryRunFunc: [
      (nums) => {
        return ["Uses JS Set() to filter. O(n) space."];
      },
      (nums) => {
        const logs = [];
        let i = 1;
        logs.push(`Start: [${nums}]`);
        for (let j = 1; j < nums.length; j++) {
          if (nums[j] !== nums[j - 1]) {
            logs.push(
              `New unique found (${nums[j]}) at j=${j}. Write to i=${i}`
            );
            nums[i] = nums[j];
            i++;
          } else {
            logs.push(`Duplicate (${nums[j]}) at j=${j}. Skip.`);
          }
        }
        logs.push(`Final Length: ${i}, Array Prefix: [${nums.slice(0, i)}]`);
        return logs;
      },
    ],
    starterCode: `function solve(nums) { return 0; }`,
  },
];
const reactQuestionsData = [
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
    title: "The `this` Keyword can be bound",
    category: "JavaScript Core",

    explanation:
      "The value of `this` is determined dynamically by **how a function is called** (the call-site), not where the function is defined.\n\n| Binding Rule | Call-Site Example | `this` Reference |\n|---|---|---|\n| **Default** | `f()` (standalone function call) | `window` (non-strict) or `undefined` (strict mode) |\n| **Implicit** | `obj.f()` (called as a method) | `obj` (the object left of the dot) |\n| **Explicit** | `f.call(obj, ...)` or `f.apply(obj, ...)` | Explicitly forced to `obj` |\n| **New** | `new f()` (constructor call) | The newly created instance object |\n| **Lexical (Arrow Functions)** | N/A | `this` is inherited from the outer scope (cannot be changed) |\n",
    tips: '"Interview Tips / Pitfalls"\n* **Strict Mode:** Always point out the difference between strict mode (`undefined`) and non-strict mode (`window`) for the default binding.\n* **Arrow Functions:** Emphasize that **arrow functions ignore all four standard rules** and rely solely on lexical binding, making them poor choices for traditional object methods but ideal for callbacks where you want to preserve the surrounding scope\'s `this`.\n',
    codeString:
      "\"use strict\";\n\nfunction getThis() { \n  return this; \n}\n\nconst obj = { name: 'Context A', getThis };\n\n// 1. Default Binding (strict mode)\nconsole.log('Default:', typeof getThis() === 'undefined' ? 'undefined' : 'window'); \n\n// 2. Implicit Binding\nconsole.log('Implicit:', obj.getThis().name);\n\n// 3. Explicit Binding\nconst boundThis = getThis.call({ name: 'Context B' });\nconsole.log('Explicit:', boundThis.name);\n\n// 4. Lexical Binding\nconst arrow = () => this; \nconsole.log('Arrow:', typeof arrow() === 'undefined' ? 'undefined' : 'window'); // Inherits outer scope ('window' or 'undefined')\n",
    output:
      "Default: undefined\nImplicit: Context A\nExplicit: Context B\nArrow: undefined",
  },
  {
    id: 94,
    title: "This Binding Rules (All 7 Rules Explained)",
    category: "JavaScript Core",

    explanation:
      "**`this` in JavaScript** depends entirely on **how a function is called**, not where it is written.\n\n" +
      "JavaScript determines `this` using 7 rules:\n" +
      "1. **new binding** → `this` = newly created object.\n" +
      "2. **class constructor** → `this` = instance.\n" +
      "3. **call/apply/bind** → explicit this.\n" +
      "4. **method invocation** → object before dot.\n" +
      "5. **free function call** → global (or undefined in strict mode).\n" +
      "6. **precedence rules** → new > bind > dot > default.\n" +
      "7. **arrow functions** → inherit lexical this.",

    tips:
      '"Interview Tips / Pitfalls"\n' +
      "* Arrow functions **ignore all this rules** and keep parent's this.\n" +
      "* `new` has the **highest precedence**.\n" +
      "* Free functions lose `this` → common bug when extracting methods.\n" +
      "* bind() does NOT work on arrow functions.\n",

    codeString: `// RULE 1: new binding
function Person(name) {
  this.name = name;
}
const p = new Person("Jay");
console.log("1:", p.name); // Jay


// RULE 2: class constructor
class Car {
  constructor(model) {
    this.model = model;
  }
}
const c = new Car("Tesla");
console.log("2:", c.model); // Tesla


// RULE 3: call/apply/bind
function show() {
  console.log("3:", this.value);
}
const obj = { value: 100 };
show.call(obj); // 100


// RULE 4: method invocation (object before dot)
const user = {
  name: "Alice",
  greet() {
    console.log("4:", this.name);
  }
};
user.greet(); // Alice


// RULE 5: free function call (strict mode → undefined)
"use strict";
function test() {
  console.log("5:", this);
}
test(); // undefined


// RULE 6: precedence (new > call)
function Demo() {
  console.log("6:", this.constructor.name);
}
// Even though call() is used, new takes priority
new Demo.call({}); // Demo


// RULE 7: arrow function → lexical this
const arrowObj = {
  value: 50,
  arrow: () => console.log("7:", this.value)
};
arrowObj.arrow(); // undefined (arrow takes this from global)
`,

    output: `1: Jay
2: Tesla
3: 100
4: Alice
5: undefined
6: Demo
7: undefined`,
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
  // --- JAVASCRIPT OBJECTS & INTERNALS ---
  // Q95: Object.freeze vs Object.seal
  {
    id: 95,
    title: "Immutability: Object.freeze() vs Object.seal()",
    category: "JavaScript Core",
    explanation:
      "These methods restrict how objects can be modified.\n\n* **`Object.freeze(obj)`:** The highest level of immutability. You **cannot** add, remove, or modify existing properties. The object becomes completely read-only (shallowly).\n* **`Object.seal(obj)`:** You **cannot** add or remove properties, BUT you **can** modify the values of existing properties.\n* **`Object.preventExtensions(obj)`:** You **cannot** add new properties, but you can remove or modify existing ones.",
    tips: '"Interview Tips"\n* **Deep Freeze:** Remember that these methods are **shallow**. Freezing an object does not freeze objects nested inside it. You need a recursive function to achieve a "Deep Freeze".\n* **Strict Mode:** In strict mode (`"use strict"`), attempting to modify a frozen object throws an error; otherwise, it fails silently.',
    codeString:
      "const user = { name: 'Jay', meta: { age: 25 } };\n\n// 1. Object.seal\nObject.seal(user);\nuser.name = 'Roy'; // ✅ Allowed (Modified)\nuser.city = 'NY';  // ❌ Ignored (Cannot add)\ndelete user.name;  // ❌ Ignored (Cannot delete)\n\n// 2. Object.freeze\nObject.freeze(user);\nuser.name = 'Sam'; // ❌ Ignored (Cannot modify)\nuser.meta.age = 30; // ✅ Allowed (Nested objects are NOT frozen)\n\nconsole.log('Final:', user);",
    output: "Final: { name: 'Roy', meta: { age: 30 } }",
  },

  // Q96: Generators and Iterators
  {
    id: 96,
    title: "Generators and Iterators (function*)",
    category: "JavaScript Core",
    explanation:
      "**Generators** are functions that can be paused and resumed. They are declared with `function*` and use the `yield` keyword.\n\nWhen called, a generator does not execute code immediately; instead, it returns an **Iterator** object. Calling `.next()` on the iterator executes code until the next `yield`, returning `{ value: Any, done: Boolean }`.",
    tips: '"Interview Tips"\n* **Use Cases:** Generators are great for implementing custom iterables, state machines, or handling infinite data streams without crashing memory.\n* **Async Flows:** Libraries like `redux-saga` use generators to handle complex asynchronous flows effectively.',
    codeString:
      "function* idGenerator() {\n  let id = 1;\n  while (true) {\n    yield id++; // Pauses here and returns id\n  }\n}\n\nconst gen = idGenerator();\n\nconsole.log(gen.next()); // { value: 1, done: false }\nconsole.log(gen.next()); // { value: 2, done: false }\nconsole.log(gen.next()); // { value: 3, done: false }",
    output:
      "{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: 3, done: false }",
  },

  // Q97: WeakMap vs Map
  {
    id: 97,
    title: "Map vs WeakMap (Garbage Collection)",
    category: "JavaScript Core",
    explanation:
      "**`Map`**: Keys can be any type. Strong references are held to keys, preventing Garbage Collection (GC) even if the key is no longer used elsewhere.\n\n**`WeakMap`**: Keys **must** be Objects. References to keys are **weak**. If the object used as a key has no other references in the application, it will be garbage collected, and the entry is automatically removed from the WeakMap.",
    tips: '"Interview Tips"\n* **Enumerability:** `WeakMap` is **not enumerable** (you cannot loop over it with `forEach` or `for...of`) because the GC could remove items at any moment.\n* **Use Case:** DOM Node metadata storage (if the node is removed from DOM, the memory is freed) or private data in classes.',
    codeString:
      "let obj = { id: 1 };\n\n// 1. Map (Strong Reference)\nconst map = new Map();\nmap.set(obj, 'Data');\n// If we do: obj = null;\n// The {id:1} object stays in memory because 'map' holds it.\n\n// 2. WeakMap (Weak Reference)\nconst weakMap = new WeakMap();\nweakMap.set(obj, 'Private Data');\n\nobj = null; \n// Now, {id:1} is eligible for Garbage Collection.\n// It is automatically removed from weakMap (eventually).\n\nconsole.log('WeakMap logic is handled by JS Engine GC.');",
    output: "WeakMap logic is handled by JS Engine GC.",
  },

  // --- JAVASCRIPT SECURITY & WEB APIs ---

  // Q98: Security: XSS vs CSRF
  {
    id: 98,
    title: "Web Security: XSS vs CSRF",
    category: "Browser & Web APIs",
    explanation:
      "**XSS (Cross-Site Scripting):** Attackers inject malicious scripts into web pages viewed by other users (e.g., in a comment section). The script runs in the victim's browser, often stealing cookies/tokens.\n* *Prevention:* Sanitize user input, use `HttpOnly` cookies, implement **CSP** (Content Security Policy).\n\n**CSRF (Cross-Site Request Forgery):** Attackers trick a user into executing unwanted actions on a web application where they are currently authenticated (e.g., a hidden form on a malicious site submits a bank transfer request).\n* *Prevention:* Use **CSRF Tokens**, `SameSite` cookie attribute.",
    tips: '"Interview Tips"\n* **CSP:** Explain Content Security Policy headers as a powerful tool to restrict where scripts can be loaded from, effectively neutralizing many XSS attacks.\n* **React:** React automatically escapes content in JSX, preventing most XSS, unless you use `dangerouslySetInnerHTML`.',
    codeString:
      "// Conceptual Prevention\n\n// 1. XSS Prevention (React)\n// React escapes this automatically:\nconst userInput = '<script>alert(1)</script>';\nconst element = <div>{userInput}</div>; // Renders as text, not script\n\n// 2. CSRF Prevention (Cookie Attribute)\n// Set-Cookie: session_id=xyz; SameSite=Strict; Secure\n",
    output: "Conceptual Security Examples",
  },

  // Q99: Event Bubbling vs Capturing
  {
    id: 99,
    title: "Event Propagation: Bubbling vs Capturing",
    category: "Browser & Web APIs",
    explanation:
      "When an event occurs on a DOM element, it travels through three phases:\n1. **Capturing Phase:** The event goes down from `window` → `document` → ... → `target`.\n2. **Target Phase:** The event reaches the element.\n3. **Bubbling Phase:** The event goes up from `target` → ... → `document` → `window`.\n\nBy default, `addEventListener` listens to the **Bubbling** phase. You can listen to the Capturing phase by passing `{ capture: true }` as the third argument.",
    tips: '"Interview Tips"\n* **stopPropagation:** `e.stopPropagation()` stops the event from moving further in the current phase (Bubbling or Capturing).\n* **Delegation:** Event delegation relies on Bubbling.',
    codeString:
      "// HTML: <div id='parent'><button id='child'>Click</button></div>\n\n/*\ndocument.getElementById('parent').addEventListener('click', () => {\n  console.log('Parent Captured');\n}, true); // true = Capturing Phase\n\ndocument.getElementById('child').addEventListener('click', () => {\n  console.log('Child Clicked');\n});\n\ndocument.getElementById('parent').addEventListener('click', () => {\n  console.log('Parent Bubbled');\n});\n*/\n// Order of logs: Parent Captured -> Child Clicked -> Parent Bubbled",
    output: "Parent Captured\nChild Clicked\nParent Bubbled",
  },

  // --- REACT ADVANCED & ARCHITECTURE ---

  // Q99: React Portals
  {
    id: 99,
    title: "React Portals (ReactDOM.createPortal)",
    category: "React Fundamentals",
    explanation:
      "Portals provide a way to render children into a DOM node that exists **outside** the DOM hierarchy of the parent component.\n\nCommon Use Cases:\n* Modals / Dialogs\n* Tooltips\n* Floating Menus\n\nEven though the portal is rendered elsewhere in the DOM, it behaves like a normal React child for **event bubbling** and context. An event fired inside a portal will bubble up to the React parent, even if the DOM parent is different.",
    tips: '"Interview Tips"\n* Ask: "If I click a button inside a Portal, does the event bubble to the React component that rendered the Portal?" **Answer: Yes.** This is a key feature of Portals.',
    codeString:
      "import ReactDOM from 'react-dom';\n\nfunction Modal({ children, isOpen }) {\n  if (!isOpen) return null;\n  \n  // Render into a div with id='modal-root' (defined in index.html)\n  return ReactDOM.createPortal(\n    <div className=\"modal\">\n      {children}\n    </div>,\n    document.getElementById('modal-root')\n  );\n}",
    output: "Conceptual Portal Code",
  },

  // Q100: Error Boundaries
  {
    id: 100,
    title: "Error Boundaries",
    category: "React Fundamentals",
    explanation:
      "Error Boundaries are **Class Components** that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.\n\nRequired Lifecycle Methods:\n* **`static getDerivedStateFromError(error)`**: Update state to show fallback UI.\n* **`componentDidCatch(error, info)`**: Log error information.",
    tips: '"Interview Tips"\n* **Limitations:** Error Boundaries **do not** catch errors in: Event handlers, Async code (setTimeout), SSR, or errors thrown in the boundary itself.\n* currently, there is **no Hook equivalent** for Error Boundaries; you must use a class component.',
    codeString:
      "class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error, info) {\n    console.log('Logged:', error, info);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}",
    output: "Conceptual Error Boundary Class",
  },

  // Q101: forwardRef and useImperativeHandle
  {
    id: 101,
    title: "forwardRef and useImperativeHandle",
    category: "React Fundamentals",
    explanation:
      "**`forwardRef`**: React components do not pass the `ref` attribute to their children by default. `forwardRef` allows a component to take a `ref` passed to it and forward it down to a specific DOM node (or class component) inside it.\n\n**`useImperativeHandle`**: Customizes the instance value that is exposed to parent components when using `ref`. Instead of exposing the raw DOM node, you can expose specific methods (e.g., `focus`, `scroll`).",
    tips: '"Interview Tips"\n* **Controlled vs Uncontrolled:** Accessing DOM nodes via refs is an "escape hatch." Prefer controlled state, but use refs for focus management, media playback, or integrating with third-party DOM libraries.',
    codeString:
      "const CustomInput = React.forwardRef((props, ref) => {\n  const localRef = React.useRef();\n  \n  React.useImperativeHandle(ref, () => ({\n    alertHi: () => alert('Hi'),\n    focus: () => localRef.current.focus()\n  }));\n\n  return <input ref={localRef} placeholder=\"Type here\" />;\n});\n\n// Usage in Parent\n// const ref = useRef();\n// <CustomInput ref={ref} />\n// ref.current.alertHi();",
    output: "Conceptual forwardRef Code",
  },

  // Q102: HOCs vs Render Props
  {
    id: 102,
    title: "Higher-Order Components (HOC) vs Render Props",
    category: "React Fundamentals",
    explanation:
      "Before Hooks, these were the primary patterns for logic reuse.\n\n**HOC**: A function that takes a component and returns a new component with additional props/logic. (e.g., `withRouter(Component)`).\n* *Cons:* Prop collisions, wrapper hell.\n\n**Render Props**: A component with a prop (usually named `render` or `children`) that is a function. The component calls this function with its internal state. (e.g., `<Mouse render={({ x, y }) => ...} />`).\n* *Cons:* Callback hell (nesting).",
    tips: '"Interview Tips"\n* **Modern View:** **Custom Hooks** have largely replaced both patterns for logic reuse because they don\'t add nesting to the component tree. However, Render Props are still useful for pure rendering logic (like virtualization libraries).',
    codeString:
      "// 1. HOC Pattern\nconst withUser = (Component) => (props) => (\n  <Component {...props} user=\"Jay\" />\n);\n\n// 2. Render Prop Pattern\nconst UserProvider = ({ children }) => children('Jay');\n\n// Usage\n// <UserProvider>{user => <div>{user}</div>}</UserProvider>",
    output: "Conceptual Patterns",
  },

  // Q103: Controlled vs Uncontrolled Components
  {
    id: 103,
    title: "Controlled vs Uncontrolled Components",
    category: "React Fundamentals",
    explanation:
      "**Controlled Component:** The form data is handled by the **React component state**. The source of truth is React state.\n* *Mechanism:* `value={state}` and `onChange={setState}`.\n\n**Uncontrolled Component:** The form data is handled by the **DOM** itself. The source of truth is the DOM.\n* *Mechanism:* `ref` to access values and `defaultValue` for initialization.",
    tips: '"Interview Tips"\n* **Validation:** Controlled components enable instant validation (as you type). Uncontrolled components are better for non-React integration or extremely simple forms where re-renders on every keystroke cause performance issues.',
    codeString:
      "// Controlled\nconst [val, setVal] = useState('');\n<input value={val} onChange={e => setVal(e.target.value)} />\n\n// Uncontrolled\nconst ref = useRef();\n<input ref={ref} defaultValue=\"default\" />\n// Read via ref.current.value on submit",
    output: "Conceptual Form Patterns",
  },

  // Q104: React Fiber & Synthetic Events
  {
    id: 104,
    title: "React Architecture: Fiber & Synthetic Events",
    category: "React Fundamentals",
    explanation:
      "**React Fiber:** The reconciliation engine introduced in React 16. It allows rendering to be split into chunks (**Time Slicing**), capable of pausing and prioritizing work. This enables features like Suspense and Concurrent Mode.\n\n**Synthetic Events:** React implements its own event system that wraps native browser events. This ensures consistent behavior across different browsers (cross-browser compatibility) and optimizes performance via event delegation.",
    tips: '"Interview Tips"\n* **Event Pooling:** Note that before React 17, Synthetic Events were "pooled" (nulled out) for performance. **React 17+ removed event pooling**, so you no longer need `e.persist()` to use events async.',
    codeString:
      "// Synthetic Event Example\n<button onClick={(e) => {\n  console.log(e.nativeEvent); // Access original DOM event\n  console.log(e.target);      // React wrapper\n}}>Click</button>",
    output: "Conceptual Architecture",
  },
];

const dsaAlgorithms = [
  {
    id: 1,
    title: "Selection Sort",
    category: "Sorting",
    algorithm:
      "Find the minimum element from the unsorted part and swap it with the element at the current index.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Pass 1:",
      "  Current val: 13 and . Searching for smaller...",
      "  ➜ Found new min: 9 (at idx 5) < 13",
      "  SWAP: 13 ⇄ 9",
      "  Result after Pass 1: [9,46,24,52,20,13]",
      "Pass 2:",
      "  Current val: 46 and . Searching for smaller...",
      "  ➜ Found new min: 24 (at idx 2) < 46",
      "  ➜ Found new min: 20 (at idx 4) < 24",
      "  ➜ Found new min: 13 (at idx 5) < 20",
      "  SWAP: 46 ⇄ 13",
      "  Result after Pass 2: [9,13,24,52,20,46]",
      "Pass 3:",
      "  Current val: 24 and . Searching for smaller...",
      "  ➜ Found new min: 20 (at idx 4) < 24",
      "  SWAP: 24 ⇄ 20",
      "  Result after Pass 3: [9,13,20,52,24,46]",
      "Pass 4:",
      "  Current val: 52 and . Searching for smaller...",
      "  ➜ Found new min: 24 (at idx 4) < 52",
      "  SWAP: 52 ⇄ 24",
      "  Result after Pass 4: [9,13,20,24,52,46]",
      "Pass 5:",
      "  Current val: 52 and . Searching for smaller...",
      "  ➜ Found new min: 46 (at idx 5) < 52",
      "  SWAP: 52 ⇄ 46",
      "  Result after Pass 5: [9,13,20,24,46,52]",
      "Final Sorted Output: [9,13,20,24,46,52]",
    ],
    edgeCases: [
      "Array with identical elements",
      "Single element array",
      "Already sorted array",
    ],
    tips: [
      "Always performs the same number of comparisons.",
      "Faster than Bubble Sort in practice due to fewer swaps.",
    ],
    code: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray]; // Avoid mutating original
      let n = arr.length;

      // Helper to push logs
      const log = (msg) => logs.push(msg);

      for (let i = 0; i < n - 1; i++) {
        log(`Pass ${i + 1}:`);
        let minIdx = i;

        log(` Current val: ${arr[i]}. Searching for smaller...`);

        for (let j = i + 1; j < n; j++) {
          if (arr[j] < arr[minIdx]) {
            log(`  ➜ Found new min: ${arr[j]} (at idx ${j}) < ${arr[minIdx]}`);
            minIdx = j;
          }
        }

        if (minIdx !== i) {
          log(`  SWAP: ${arr[i]} ⇄ ${arr[minIdx]}`);
          let temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
        } else {
          log(`  NO SWAP: ${arr[i]} is already the smallest remaining.`);
        }

        log(`  Result after Pass ${i + 1}: ${JSON.stringify(arr)}`);
      }

      log(`Final Sorted Output: ${JSON.stringify(arr)}`);
      return logs;
    },
    inputType: "A",
    input: "[13,46,24,52,20,9]",
  },
  {
    id: 2,
    title: "Bubble Sort",
    category: "Sorting",
    algorithm:
      "Repeatedly compare adjacent elements and swap them if they are in the wrong order. Largest elements bubble to the end after each pass.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Pass 1:",
      "(13,24) -> ok",
      "(24,46) -> ok",
      "(46,20) -> swap",
      "(46,9) -> swap",
      "(46,52) -> ok",
      "Result after Pass 1: [13,24,20,9,46,52]",
      "Pass 2:",
      "(13,24) -> ok",
      "(24,20) -> swap",
      "(24,9) -> swap",
      "(24,46) -> ok",
      "Result after Pass 2: [13,20,9,24,46,52]",
      "Pass 3:",
      "(13,20) -> ok",
      "(20,9) -> swap",
      "(20,24) -> ok",
      "Result after Pass 3: [13,9,20,24,46,52]",
      "Pass 4:",
      "(13,9) -> swap",
      "(13,20) -> ok",
      "Result after Pass 4: [9,13,20,24,46,52]",
      "Pass 5:",
      "(9,13) -> ok",
      "Result after Pass 5: [9,13,20,24,46,52]",
      "Final Sorted Output: [9,13,20,24,46,52]",
    ],
    edgeCases: [
      "Already sorted array",
      "Reverse sorted array",
      "Array with duplicates",
    ],
    tips: [
      "Best case O(n) when array is already sorted using an optimized flag.",
      "Used for small datasets where simplicity matters.",
    ],
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break; // Optimization
  }
  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray]; // Avoid mutating original
      let n = arr.length;
      let pass = 1;

      // Helper to push logs (mimicking console.log)
      const log = (msg, detail = "") => {
        logs.push(detail ? `${msg} ${detail}` : msg);
      };

      for (let i = 0; i < n - 1; i++) {
        log(`Pass ${pass}:`);
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
          const left = arr[j];
          const right = arr[j + 1];

          if (left > right) {
            log(`(${left},${right}) -> swap`);
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swapped = true;
          } else {
            log(`(${left},${right}) -> ok`);
          }
        }

        log(`Result after Pass ${pass}:`, JSON.stringify(arr));

        pass++;
        if (!swapped) break;
      }

      log("Final Sorted Output:", JSON.stringify(arr));
      return logs;
    },
    inputType: "A",
    input: "[13, 24, 46, 20, 9, 52]",
  },
  {
    id: 3,
    title: "Recursive Bubble Sort",
    category: "Sorting",
    algorithm:
      "Repeatedly compare adjacent elements and swap them if they are in the wrong order. Largest elements bubble to the end after each pass.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Pass 1:",
      "(13,24) -> ok",
      "(24,46) -> ok",
      "(46,20) -> swap",
      "(46,9) -> swap",
      "(46,52) -> ok",
      "Result after Pass 1: [13,24,20,9,46,52]",
      "Pass 2:",
      "(13,24) -> ok",
      "(24,20) -> swap",
      "(24,9) -> swap",
      "(24,46) -> ok",
      "Result after Pass 2: [13,20,9,24,46,52]",
      "Pass 3:",
      "(13,20) -> ok",
      "(20,9) -> swap",
      "(20,24) -> ok",
      "Result after Pass 3: [13,9,20,24,46,52]",
      "Pass 4:",
      "(13,9) -> swap",
      "(13,20) -> ok",
      "Result after Pass 4: [9,13,20,24,46,52]",
      "Pass 5:",
      "(9,13) -> ok",
      "Result after Pass 5: [9,13,20,24,46,52]",
      "Final Sorted Output: [9,13,20,24,46,52]",
    ],
    edgeCases: [
      "Already sorted array",
      "Reverse sorted array",
      "Array with duplicates",
    ],
    tips: [
      "Best case O(n) when array is already sorted using an optimized flag.",
      "Used for small datasets where simplicity matters.",
    ],
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break; // Optimization
  }
  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray]; // Avoid mutating original
      let n = arr.length;
      let pass = 1;

      // Helper to push logs (mimicking console.log)
      const log = (msg, detail = "") => {
        logs.push(detail ? `${msg} ${detail}` : msg);
      };

      for (let i = 0; i < n - 1; i++) {
        log(`Pass ${pass}:`);
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
          const left = arr[j];
          const right = arr[j + 1];

          if (left > right) {
            log(`(${left},${right}) -> swap`);
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swapped = true;
          } else {
            log(`(${left},${right}) -> ok`);
          }
        }

        log(`Result after Pass ${pass}:`, JSON.stringify(arr));

        pass++;
        if (!swapped) break;
      }

      log("Final Sorted Output:", JSON.stringify(arr));
      return logs;
    },
    inputType: "A",
    input: "[13, 24, 46, 20, 9, 52]",
  },

  {
    id: 4,
    title: "Insertion Sort",
    category: "Sorting",
    algorithm:
      "Pick an element and insert it into its correct position by shifting larger elements to the right.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Pass 1:",
      "  Current val: 9 (at idx 1). Checking left elements...",
      "   ➜ Compare: 14 > 9 (idx 0 > idx 1) → swap",
      "     Array: [9,14,15,12,6,8,13]",
      "  Result after Pass 1: [9,14,15,12,6,8,13]",
      "Pass 2:",
      "  Current val: 15 (at idx 2). Checking left elements...",
      "   ➜ No smaller element found. No swaps.",
      "  Result after Pass 2: [9,14,15,12,6,8,13]",
      "Pass 3:",
      "  Current val: 12 (at idx 3). Checking left elements...",
      "   ➜ Compare: 15 > 12 (idx 2 > idx 3) → swap",
      "     Array: [9,14,12,15,6,8,13]",
      "   ➜ Compare: 14 > 12 (idx 1 > idx 2) → swap",
      "     Array: [9,12,14,15,6,8,13]",
      "  Result after Pass 3: [9,12,14,15,6,8,13]",
      "Pass 4:",
      "  Current val: 6 (at idx 4). Checking left elements...",
      "   ➜ Compare: 15 > 6 (idx 3 > idx 4) → swap",
      "     Array: [9,12,14,6,15,8,13]",
      "   ➜ Compare: 14 > 6 (idx 2 > idx 3) → swap",
      "     Array: [9,12,6,14,15,8,13]",
      "   ➜ Compare: 12 > 6 (idx 1 > idx 2) → swap",
      "     Array: [9,6,12,14,15,8,13]",
      "   ➜ Compare: 9 > 6 (idx 0 > idx 1) → swap",
      "     Array: [6,9,12,14,15,8,13]",
      "  Result after Pass 4: [6,9,12,14,15,8,13]",
      "Pass 5:",
      "  Current val: 8 (at idx 5). Checking left elements...",
      "   ➜ Compare: 15 > 8 (idx 4 > idx 5) → swap",
      "     Array: [6,9,12,14,8,15,13]",
      "   ➜ Compare: 14 > 8 (idx 3 > idx 4) → swap",
      "     Array: [6,9,12,8,14,15,13]",
      "   ➜ Compare: 12 > 8 (idx 2 > idx 3) → swap",
      "     Array: [6,9,8,12,14,15,13]",
      "   ➜ Compare: 9 > 8 (idx 1 > idx 2) → swap",
      "     Array: [6,8,9,12,14,15,13]",
      "  Result after Pass 5: [6,8,9,12,14,15,13]",
      "Pass 6:",
      "  Current val: 13 (at idx 6). Checking left elements...",
      "   ➜ Compare: 15 > 13 (idx 5 > idx 6) → swap",
      "     Array: [6,8,9,12,14,13,15]",
      "   ➜ Compare: 14 > 13 (idx 4 > idx 5) → swap",
      "     Array: [6,8,9,12,13,14,15]",
      "  Result after Pass 6: [6,8,9,12,13,14,15]",
      "Final Sorted Output: [6,8,9,12,13,14,15]",
    ],
    edgeCases: [
      "Already sorted array",
      "Reverse sorted array",
      "Single element array",
      "Array with identical elements",
    ],
    tips: [
      "Efficient for small or nearly sorted arrays.",
      "Performs well for online input (receives data one by one).",
      "Stable sorting algorithm.",
    ],
    code: `function insertionSort(arr) {
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;

    // Move left while previous element is greater
    while (j > 0 && arr[j - 1] > arr[j]) {
      // swap arr[j-1] and arr[j]
      let temp = arr[j - 1];
      arr[j - 1] = arr[j];
      arr[j] = temp;

      j--;
    }
  }

  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray];
      let n = arr.length;
      let pass = 1;

      const log = (msg) => logs.push(msg);

      for (let i = 1; i < n; i++) {
        log(`Pass ${pass}:`);
        log(
          `  Current val: ${arr[i]} (at idx ${i}). Checking left elements...`
        );

        let j = i;

        while (j > 0 && arr[j - 1] > arr[j]) {
          log(
            `   ➜ Compare: ${arr[j - 1]} > ${arr[j]} (idx ${
              j - 1
            } > idx ${j}) → swap`
          );

          // Swap
          let temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;

          log(`     Array: ${JSON.stringify(arr)}`);
          j--;
        }

        if (j === i) {
          log(`   ➜ No smaller element found. No swaps.`);
        }

        log(`  Result after Pass ${pass}: ${JSON.stringify(arr)}`);
        pass++;
      }

      log(`Final Sorted Output: ${JSON.stringify(arr)}`);
      return logs;
    },
    inputType: "A",
    input: "[14,9,15,12,6,8,13]",
  },
  {
    id: 5,
    title: "Recursive Insertion Sort",
    category: "Sorting",
    algorithm:
      "Pick an element and insert it into its correct position by shifting larger elements to the right.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Pass 1:",
      "  Current val: 9 (at idx 1). Checking left elements...",
      "   ➜ Compare: 14 > 9 (idx 0 > idx 1) → swap",
      "     Array: [9,14,15,12,6,8,13]",
      "  Result after Pass 1: [9,14,15,12,6,8,13]",
      "Pass 2:",
      "  Current val: 15 (at idx 2). Checking left elements...",
      "   ➜ No smaller element found. No swaps.",
      "  Result after Pass 2: [9,14,15,12,6,8,13]",
      "Pass 3:",
      "  Current val: 12 (at idx 3). Checking left elements...",
      "   ➜ Compare: 15 > 12 (idx 2 > idx 3) → swap",
      "     Array: [9,14,12,15,6,8,13]",
      "   ➜ Compare: 14 > 12 (idx 1 > idx 2) → swap",
      "     Array: [9,12,14,15,6,8,13]",
      "  Result after Pass 3: [9,12,14,15,6,8,13]",
      "Pass 4:",
      "  Current val: 6 (at idx 4). Checking left elements...",
      "   ➜ Compare: 15 > 6 (idx 3 > idx 4) → swap",
      "     Array: [9,12,14,6,15,8,13]",
      "   ➜ Compare: 14 > 6 (idx 2 > idx 3) → swap",
      "     Array: [9,12,6,14,15,8,13]",
      "   ➜ Compare: 12 > 6 (idx 1 > idx 2) → swap",
      "     Array: [9,6,12,14,15,8,13]",
      "   ➜ Compare: 9 > 6 (idx 0 > idx 1) → swap",
      "     Array: [6,9,12,14,15,8,13]",
      "  Result after Pass 4: [6,9,12,14,15,8,13]",
      "Pass 5:",
      "  Current val: 8 (at idx 5). Checking left elements...",
      "   ➜ Compare: 15 > 8 (idx 4 > idx 5) → swap",
      "     Array: [6,9,12,14,8,15,13]",
      "   ➜ Compare: 14 > 8 (idx 3 > idx 4) → swap",
      "     Array: [6,9,12,8,14,15,13]",
      "   ➜ Compare: 12 > 8 (idx 2 > idx 3) → swap",
      "     Array: [6,9,8,12,14,15,13]",
      "   ➜ Compare: 9 > 8 (idx 1 > idx 2) → swap",
      "     Array: [6,8,9,12,14,15,13]",
      "  Result after Pass 5: [6,8,9,12,14,15,13]",
      "Pass 6:",
      "  Current val: 13 (at idx 6). Checking left elements...",
      "   ➜ Compare: 15 > 13 (idx 5 > idx 6) → swap",
      "     Array: [6,8,9,12,14,13,15]",
      "   ➜ Compare: 14 > 13 (idx 4 > idx 5) → swap",
      "     Array: [6,8,9,12,13,14,15]",
      "  Result after Pass 6: [6,8,9,12,13,14,15]",
      "Final Sorted Output: [6,8,9,12,13,14,15]",
    ],
    edgeCases: [
      "Already sorted array",
      "Reverse sorted array",
      "Single element array",
      "Array with identical elements",
    ],
    tips: [
      "Efficient for small or nearly sorted arrays.",
      "Performs well for online input (receives data one by one).",
      "Stable sorting algorithm.",
    ],
    code: `function insertionSort(arr) {
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;

    // Move left while previous element is greater
    while (j > 0 && arr[j - 1] > arr[j]) {
      // swap arr[j-1] and arr[j]
      let temp = arr[j - 1];
      arr[j - 1] = arr[j];
      arr[j] = temp;

      j--;
    }
  }

  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray];
      let n = arr.length;
      let pass = 1;

      const log = (msg) => logs.push(msg);

      for (let i = 1; i < n; i++) {
        log(`Pass ${pass}:`);
        log(
          `  Current val: ${arr[i]} (at idx ${i}). Checking left elements...`
        );

        let j = i;

        while (j > 0 && arr[j - 1] > arr[j]) {
          log(
            `   ➜ Compare: ${arr[j - 1]} > ${arr[j]} (idx ${
              j - 1
            } > idx ${j}) → swap`
          );

          // Swap
          let temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;

          log(`     Array: ${JSON.stringify(arr)}`);
          j--;
        }

        if (j === i) {
          log(`   ➜ No smaller element found. No swaps.`);
        }

        log(`  Result after Pass ${pass}: ${JSON.stringify(arr)}`);
        pass++;
      }

      log(`Final Sorted Output: ${JSON.stringify(arr)}`);
      return logs;
    },
    inputType: "A",
    input: "[14,9,15,12,6,8,13]",
  },
  {
    id: 6,
    title: "Merge Sort",
    category: "Sorting",
    algorithm:
      "Divide the array into halves, recursively sort each half, then merge the sorted halves.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    edgeCases: [
      "Array with identical values",
      "Already sorted array",
      "Reverse sorted array",
      "Single element array",
    ],
    tips: [
      "Merge sort guarantees O(n log n) performance.",
      "Useful for sorting linked lists.",
      "Stable and consistent for large datasets.",
    ],
    code: `function mergeSort(arr, low, high) {
  if (low >= high) return;

  let mid = Math.floor((low + high) / 2);

  mergeSort(arr, low, mid);
  mergeSort(arr, mid + 1, high);
  merge(arr, low, mid, high);

  return arr;
}

function merge(arr, low, mid, high) {
  let temp = [];
  let left = low;
  let right = mid + 1;

  while (left <= mid && right <= high) {
    if (arr[left] <= arr[right]) {
      temp.push(arr[left++]);
    } else {
      temp.push(arr[right++]);
    }
  }

  while (left <= mid) temp.push(arr[left++]);
  while (right <= high) temp.push(arr[right++]);

  for (let i = low; i <= high; i++) {
    arr[i] = temp[i - low];
  }
}`,
    inputType: "A",
    input: "[3,1,2,4,1,5,2,6,4]",
    // dryRunFunc: (inputArray) => {
    //   const logs = [];
    //   let arr = [...inputArray];
    //   let pass = 1;

    //   const log = (msg) => logs.push(msg);

    //   // pretty indent for recursion tree
    //   const indent = (level) => "  ".repeat(level);

    //   const merge = (low, mid, high, level) => {
    //     log(`${indent(level)}Pass ${pass}:`);
    //     log(`${indent(level)}  Merging range [${low}..${high}]`);

    //     let temp = [];
    //     let left = low;
    //     let right = mid + 1;

    //     // MAIN MERGING LOOP
    //     while (left <= mid && right <= high) {
    //       log(
    //         `${indent(level)}   ➜ Compare ${arr[left]} (L${left}) vs ${arr[right]} (R${right})`
    //       );

    //       if (arr[left] <= arr[right]) {
    //         log(`${indent(level)}      pick ${arr[left]} from left`);
    //         temp.push(arr[left++]);
    //       } else {
    //         log(`${indent(level)}      pick ${arr[right]} from right`);
    //         temp.push(arr[right++]);
    //       }
    //     }

    //     // LEFT REMAINING
    //     while (left <= mid) {
    //       log(`${indent(level)}   ➜ Left remains → push ${arr[left]} (L${left})`);
    //       temp.push(arr[left++]);
    //     }

    //     // RIGHT REMAINING
    //     while (right <= high) {
    //       log(`${indent(level)}   ➜ Right remains → push ${arr[right]} (R${right})`);
    //       temp.push(arr[right++]);
    //     }

    //     // WRITE BACK
    //     for (let i = low; i <= high; i++) {
    //       log(`${indent(level)}   ➜ write ${temp[i - low]} → arr[${i}]`);
    //       arr[i] = temp[i - low];
    //     }

    //     log(`${indent(level)}  Result after Pass ${pass}: ${JSON.stringify(arr)}`);
    //     pass++;
    //   };

    //   const mergeSort = (low, high, level = 0) => {
    //     // recursion tree log
    //     log(`${indent(level)}▶ mergeSort(${low}, ${high})`);

    //     if (low >= high) {
    //       log(`${indent(level)}  Base case reached.`);
    //       log(`${indent(level)}◀ return mergeSort(${low}, ${high})`);
    //       return;
    //     }

    //     const mid = Math.floor((low + high) / 2);
    //     log(`${indent(level)}Divide → mid = ${mid}`);

    //     mergeSort(low, mid, level + 1);
    //     mergeSort(mid + 1, high, level + 1);

    //     merge(low, mid, high, level + 1);

    //     // return log
    //     log(`${indent(level)}◀ return mergeSort(${low}, ${high})`);
    //   };

    //   mergeSort(0, arr.length - 1);

    //   logs.push(`Final Sorted Output: ${JSON.stringify(arr)}`);
    //   return logs;
    // },
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray];
      let pass = 1;

      const log = (msg) => logs.push(msg);

      const merge = (low, mid, high) => {
        log(`Pass ${pass}:`);
        log(`  Merging range [l${low}..h${high}]`);

        let temp = [];
        let left = low;
        let right = mid + 1;

        // ————————————————————————
        // MAIN MERGING LOOP
        // ————————————————————————
        while (left <= mid && right <= high) {
          log(
            `   ➜ Compare ${arr[left]} (L${left}) vs ${arr[right]} (R${right})`
          );

          if (arr[left] <= arr[right]) {
            log(`Left is smaller ➜  pick ${arr[left]} from left (L${left})`);
            temp.push(arr[left++]);
          } else {
            log(
              `   Right is smaller   ➜ pick ${arr[right]} from right (R${right})`
            );
            temp.push(arr[right++]);
          }
        }

        // ————————————————————————
        // LEFT REMAINING
        // ————————————————————————
        while (left <= mid) {
          log(`   ➜ Left has remaining ${arr[left]} (L${left}) → push`);
          temp.push(arr[left++]);
        }

        // ————————————————————————
        // RIGHT REMAINING
        // ————————————————————————
        while (right <= high) {
          log(`   ➜ Right has remaining ${arr[right]} (R${right}) → push`);
          temp.push(arr[right++]);
        }

        // ————————————————————————
        // WRITE BACK
        // ————————————————————————
        for (let i = low; i <= high; i++) {
          log(`   ➜ write ${temp[i - low]} → arr[${i}]`);
          arr[i] = temp[i - low];
        }

        log(`  Result after Pass ${pass}: ${JSON.stringify(arr)}`);
        pass++;
      };

      const mergeSort = (low, high) => {
        if (low >= high) return;

        const mid = Math.floor((low + high) / 2);
        log(`Divide range [l${low}..h${high}] → mid=${mid}`);

        mergeSort(low, mid);
        mergeSort(mid + 1, high);
        merge(low, mid, high);
      };

      mergeSort(0, arr.length - 1);

      logs.push(`Final Sorted Output: ${JSON.stringify(arr)}`);

      return logs;
    },

    dryRun: [
      "Divide range [l0..h8] → mid=4",
      "Divide range [l0..h4] → mid=2",
      "Divide range [l0..h2] → mid=1",
      "Divide range [l0..h1] → mid=0",
      "Pass 1:",
      "  Merging range [l0..h1]",
      "   ➜ Compare 3 (L0) vs 1 (R1)",
      "   Right is smaller   ➜ pick 1 from right (R1)",
      "   ➜ Left has remaining 3 (L0) → push",
      "   ➜ write 1 → arr[0]",
      "   ➜ write 3 → arr[1]",
      "  Result after Pass 1: [1,3,2,4,1,5,2,6,4]",
      "Pass 2:",
      "  Merging range [l0..h2]",
      "   ➜ Compare 1 (L0) vs 2 (R2)",
      "Left is smaller ➜  pick 1 from left (L0)",
      "   ➜ Compare 3 (L1) vs 2 (R2)",
      "   Right is smaller   ➜ pick 2 from right (R2)",
      "   ➜ Left has remaining 3 (L1) → push",
      "   ➜ write 1 → arr[0]",
      "   ➜ write 2 → arr[1]",
      "   ➜ write 3 → arr[2]",
      "  Result after Pass 2: [1,2,3,4,1,5,2,6,4]",
      "Divide range [l3..h4] → mid=3",
      "Pass 3:",
      "  Merging range [l3..h4]",
      "   ➜ Compare 4 (L3) vs 1 (R4)",
      "   Right is smaller   ➜ pick 1 from right (R4)",
      "   ➜ Left has remaining 4 (L3) → push",
      "   ➜ write 1 → arr[3]",
      "   ➜ write 4 → arr[4]",
      "  Result after Pass 3: [1,2,3,1,4,5,2,6,4]",
      "Pass 4:",
      "  Merging range [l0..h4]",
      "   ➜ Compare 1 (L0) vs 1 (R3)",
      "Left is smaller ➜  pick 1 from left (L0)",
      "   ➜ Compare 2 (L1) vs 1 (R3)",
      "   Right is smaller   ➜ pick 1 from right (R3)",
      "   ➜ Compare 2 (L1) vs 4 (R4)",
      "Left is smaller ➜  pick 2 from left (L1)",
      "   ➜ Compare 3 (L2) vs 4 (R4)",
      "Left is smaller ➜  pick 3 from left (L2)",
      "   ➜ Right has remaining 4 (R4) → push",
      "   ➜ write 1 → arr[0]",
      "   ➜ write 1 → arr[1]",
      "   ➜ write 2 → arr[2]",
      "   ➜ write 3 → arr[3]",
      "   ➜ write 4 → arr[4]",
      "  Result after Pass 4: [1,1,2,3,4,5,2,6,4]",
      "Divide range [l5..h8] → mid=6",
      "Divide range [l5..h6] → mid=5",
      "Pass 5:",
      "  Merging range [l5..h6]",
      "   ➜ Compare 5 (L5) vs 2 (R6)",
      "   Right is smaller   ➜ pick 2 from right (R6)",
      "   ➜ Left has remaining 5 (L5) → push",
      "   ➜ write 2 → arr[5]",
      "   ➜ write 5 → arr[6]",
      "  Result after Pass 5: [1,1,2,3,4,2,5,6,4]",
      "Divide range [l7..h8] → mid=7",
      "Pass 6:",
      "  Merging range [l7..h8]",
      "   ➜ Compare 6 (L7) vs 4 (R8)",
      "   Right is smaller   ➜ pick 4 from right (R8)",
      "   ➜ Left has remaining 6 (L7) → push",
      "   ➜ write 4 → arr[7]",
      "   ➜ write 6 → arr[8]",
      "  Result after Pass 6: [1,1,2,3,4,2,5,4,6]",
      "Pass 7:",
      "  Merging range [l5..h8]",
      "   ➜ Compare 2 (L5) vs 4 (R7)",
      "Left is smaller ➜  pick 2 from left (L5)",
      "   ➜ Compare 5 (L6) vs 4 (R7)",
      "   Right is smaller   ➜ pick 4 from right (R7)",
      "   ➜ Compare 5 (L6) vs 6 (R8)",
      "Left is smaller ➜  pick 5 from left (L6)",
      "   ➜ Right has remaining 6 (R8) → push",
      "   ➜ write 2 → arr[5]",
      "   ➜ write 4 → arr[6]",
      "   ➜ write 5 → arr[7]",
      "   ➜ write 6 → arr[8]",
      "  Result after Pass 7: [1,1,2,3,4,2,4,5,6]",
      "Pass 8:",
      "  Merging range [l0..h8]",
      "   ➜ Compare 1 (L0) vs 2 (R5)",
      "Left is smaller ➜  pick 1 from left (L0)",
      "   ➜ Compare 1 (L1) vs 2 (R5)",
      "Left is smaller ➜  pick 1 from left (L1)",
      "   ➜ Compare 2 (L2) vs 2 (R5)",
      "Left is smaller ➜  pick 2 from left (L2)",
      "   ➜ Compare 3 (L3) vs 2 (R5)",
      "   Right is smaller   ➜ pick 2 from right (R5)",
      "   ➜ Compare 3 (L3) vs 4 (R6)",
      "Left is smaller ➜  pick 3 from left (L3)",
      "   ➜ Compare 4 (L4) vs 4 (R6)",
      "Left is smaller ➜  pick 4 from left (L4)",
      "   ➜ Right has remaining 4 (R6) → push",
      "   ➜ Right has remaining 5 (R7) → push",
      "   ➜ Right has remaining 6 (R8) → push",
      "   ➜ write 1 → arr[0]",
      "   ➜ write 1 → arr[1]",
      "   ➜ write 2 → arr[2]",
      "   ➜ write 2 → arr[3]",
      "   ➜ write 3 → arr[4]",
      "   ➜ write 4 → arr[5]",
      "   ➜ write 4 → arr[6]",
      "   ➜ write 5 → arr[7]",
      "   ➜ write 6 → arr[8]",
      "  Result after Pass 8: [1,1,2,2,3,4,4,5,6]",
      "Final Sorted Output: [1,1,2,2,3,4,4,5,6]",
    ],
  },
  {
    id: 7,
    title: "Quick Sort (First Element Pivot)",
    category: "Sorting",
    algorithm:
      "Select the first element as pivot, partition the array so smaller elements go left and larger elements go right, then recursively sort subarrays.",
    timeComplexity: "O(n²) worst, O(n log n) average",
    spaceComplexity: "O(log n)",
    dryRun: [
      "Pass 1:",
      "Pivot = 4 (idx 0)",
      "Compare 1 < 7 swap 6 and 3",
      "Compare 3 < 6 swap 5 and 1",
      " place pivot 4 at idx 3",
      " array: [1,3,2,4,7,9,5,6]",
      "Pass 2:",
      "Pivot = 1 (idx 0)",
      " place pivot 1 at idx 0",
      " array: [1,3,2,4,7,9,5,6]",
      "Pass 3:",
      "Pivot = 3 (idx 1)",
      " place pivot 3 at idx 2",
      " array: [1,2,3,4,7,9,5,6]",
      "Pass 4:",
      "Pivot = 7 (idx 4)",
      "Compare 5 < 7 swap 9 and 6",
      " place pivot 7 at idx 6",
      " array: [1,2,3,4,5,6,7,9]",
      "Pass 5:",
      "Pivot = 5 (idx 4)",
      " place pivot 5 at idx 4",
      " array: [1,2,3,4,5,6,7,9]",
      "Final Sorted Output: [1,2,3,4,5,6,7,9]",
    ],
    edgeCases: [
      "Already sorted array",
      "Reverse sorted array",
      "All elements identical",
      "Very large arrays",
    ],
    tips: [
      "Worst case occurs for sorted or reverse-sorted arrays.",
      "Pivot choice affects performance heavily.",
    ],
    code: `function quickSortFirst(arr, low, high) {
  if (low >= high) return;

  let pivot = arr[low];
  let i = low;
  let j = high;

  while (i < j) {
    while (arr[i] <= pivot && i <= high - 1) i++;
    while (arr[j] > pivot && j >= low + 1) j--;
    if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  [arr[low], arr[j]] = [arr[j], arr[low]];

  quickSortFirst(arr, low, j - 1);
  quickSortFirst(arr, j + 1, high);
  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray];

      let pass = 1;
      const log = (m) => logs.push(m);

      const quick = (low, high) => {
        if (low >= high) return;

        let pivot = arr[low];
        log(`Pass ${pass++}:`);
        log(`Pivot = ${pivot} (idx ${low})`);

        let i = low;
        let j = high;

        while (i < j) {
          while (arr[i] <= pivot && i < high) i++;
          while (arr[j] > pivot && j > low) j--;

          if (i < j) {
            log(`Compare ${i} < ${j} swap ${arr[i]} and ${arr[j]}`);
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }

        log(` place pivot ${pivot} at idx ${j}`);
        [arr[low], arr[j]] = [arr[j], arr[low]];
        log(` array: ${JSON.stringify(arr)}`);

        quick(low, j - 1);
        quick(j + 1, high);
      };

      quick(0, arr.length - 1);
      log(`Final Sorted Output: ${JSON.stringify(arr)}`);
      return logs;
    },
    inputType: "A",
    input: "[4,6,2,5,7,9,1,3]",
  },
  {
    id: 8,
    title: "Quick Sort (Last Element Pivot)",
    category: "Sorting",
    algorithm:
      "Choose the last element as pivot, partition the array using Lomuto partitioning, then recursively sort the partitions.",
    timeComplexity: "O(n²) worst, O(n log n) average",
    spaceComplexity: "O(log n)",
    dryRun: [
      "Pass 1:",
      "Pivot = 3",
      "Compare 2 < 3 swap 4 and 2",
      "Compare 1 < 3 swap 6 and 1",
      " place pivot, array: [2,1,3,5,7,9,6,4]",
      "Pass 2:",
      "Pivot = 1",
      " place pivot, array: [1,2,3,5,7,9,6,4]",
      "Pass 3:",
      "Pivot = 4",
      " place pivot, array: [1,2,3,4,7,9,6,5]",
      "Pass 4:",
      "Pivot = 5",
      " place pivot, array: [1,2,3,4,5,9,6,7]",
      "Pass 5:",
      "Pivot = 7",
      "Compare 6 < 7 swap 9 and 6",
      " place pivot, array: [1,2,3,4,5,6,7,9]",
      "Final Sorted Output: [1,2,3,4,5,6,7,9]",
    ],
    edgeCases: [
      "Sorted array performs worst",
      "Stable only with modifications",
    ],
    tips: ["Lomuto partition is simple but produces more swaps."],
    code: `function quickSortLast(arr, low, high) {
  if (low >= high) return;

  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  const p = i + 1;

  quickSortLast(arr, low, p - 1);
  quickSortLast(arr, p + 1, high);
  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray];
      let pass = 1;

      const log = (m) => logs.push(m);

      const quick = (low, high) => {
        if (low >= high) return;
        log(`Pass ${pass++}:`);

        let pivot = arr[high];
        log(`Pivot = ${pivot}`);

        let i = low - 1;

        for (let j = low; j < high; j++) {
          if (arr[j] < pivot) {
            i++;
            log(`Compare ${arr[j]} < ${pivot} swap ${arr[i]} and ${arr[j]}`);
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        log(` place pivot, array: ${JSON.stringify(arr)}`);

        quick(low, i);
        quick(i + 2, high);
      };

      quick(0, arr.length - 1);
      log(`Final Sorted Output: ${JSON.stringify(arr)}`);
      return logs;
    },
    inputType: "A",
    input: "[4,6,2,5,7,9,1,3]",
  },
  {
    id: 9,
    title: "Quick Sort (Median-of-Three Pivot)",
    category: "Sorting",
    algorithm:
      "Choose the median of (first, middle, last) elements as pivot to reduce worst-case scenarios.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    dryRun: [
      "Pass 1:",
      "Median-of-three: 4, 5, 3; median:4",
      "Pick pivot 4",
      " swap 4 and 4",
      "Compare 1 < 7 swap 6 and 3",
      "Compare 3 < 6 swap 5 and 1",
      " array: [1,3,2,4,7,9,5,6]",
      "Pass 2:",
      "Median-of-three: 1, 3, 2; median:2",
      "Pick pivot 2",
      " swap 2 and 1",
      "Compare 1 < 2 swap 3 and 1",
      " array: [1,2,3,4,7,9,5,6]",
      "Pass 3:",
      "Median-of-three: 7, 9, 6; median:7",
      "Pick pivot 7",
      " swap 7 and 7",
      "Compare 5 < 7 swap 9 and 6",
      " array: [1,2,3,4,5,6,7,9]",
      "Pass 4:",
      "Median-of-three: 5, 5, 6; median:5",
      "Pick pivot 5",
      " swap 5 and 5",
      " array: [1,2,3,4,5,6,7,9]",
      "Final Sorted Output: [1,2,3,4,5,6,7,9]",
    ],
    edgeCases: [
      "Handles sorted arrays better",
      "Good pivot choice for stability",
    ],
    tips: ["One of the best pivot strategies for general inputs."],
    code: `function medianOfThree(arr, low, high) {
  const mid = Math.floor((low + high) / 2);
  const a = arr[low], b = arr[mid], c = arr[high];

  if ((a - b)*(c - a) >= 0) return low;
  if ((b - a)*(c - b) >= 0) return mid;
  return high;
}

function quickSortMedian(arr, low, high) {
  if (low >= high) return;

  const pivotIndex = medianOfThree(arr, low, high);
  const pivot = arr[pivotIndex];

  [arr[pivotIndex], arr[low]] = [arr[low], arr[pivotIndex]];

  let i = low;
  let j = high;

  while (i < j) {
    while (arr[i] <= pivot && i <= high - 1) i++;
    while (arr[j] > pivot && j >= low + 1) j--;
    if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  [arr[low], arr[j]] = [arr[j], arr[low]];

  quickSortMedian(arr, low, j - 1);
  quickSortMedian(arr, j + 1, high);

  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray];

      let pass = 1;
      const log = (m) => logs.push(m);

      const quick = (low, high) => {
        if (low >= high) return;
        log(`Pass ${pass++}:`);

        let mid = Math.floor((low + high) / 2);

        let a = arr[low],
          b = arr[mid],
          c = arr[high];

        let pivotIndex =
          (a - b) * (c - a) >= 0 ? low : (b - a) * (c - b) >= 0 ? mid : high;
        log(`Median-of-three: ${a}, ${b}, ${c}; median:${arr[pivotIndex]}`);

        let pivot = arr[pivotIndex];
        log(`Pick pivot ${pivot}`);

        log(` swap ${arr[pivotIndex]} and ${arr[low]}`);
        [arr[pivotIndex], arr[low]] = [arr[low], arr[pivotIndex]];

        let i = low;
        let j = high;

        while (i < j) {
          while (arr[i] <= pivot && i < high) i++;
          while (arr[j] > pivot && j > low) j--;
          if (i < j) {
            log(`Compare ${i} < ${j} swap ${arr[i]} and ${arr[j]}`);
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }

        [arr[low], arr[j]] = [arr[j], arr[low]];
        log(` array: ${JSON.stringify(arr)}`);

        quick(low, j - 1);
        quick(j + 1, high);
      };

      quick(0, arr.length - 1);
      log(`Final Sorted Output: ${JSON.stringify(arr)}`);
      return logs;
    },
    inputType: "A",
    input: "[4,6,2,5,7,9,1,3]",
  },
  {
    id: 10,
    title: "Quick Sort (Random Pivot)",
    category: "Sorting",
    algorithm:
      "Pick a random element as pivot to avoid worst-case inputs like sorted arrays. Then partition using Hoare partition and recursively sort.",
    timeComplexity: "O(n log n) average",
    spaceComplexity: "O(log n)",
    dryRun: [
      "Pass 1:",
      "Random pivot = 6 (idx 1)",
      " swap 6 and 4",
      "Compare 4 < 7 swap 7 and 3",
      "Compare 5 < 6 swap 9 and 1",
      "swap 6 and 1",
      " array: [1,4,2,5,3,6,9,7]",
      "Pass 2:",
      "Random pivot = 2 (idx 2)",
      " swap 2 and 1",
      "Compare 1 < 2 swap 4 and 1",
      "swap 2 and 1",
      " array: [1,2,4,5,3,6,9,7]",
      "Pass 3:",
      "Random pivot = 5 (idx 3)",
      " swap 5 and 4",
      "swap 5 and 3",
      " array: [1,2,3,4,5,6,9,7]",
      "Pass 4:",
      "Random pivot = 3 (idx 2)",
      " swap 3 and 3",
      "swap 3 and 3",
      " array: [1,2,3,4,5,6,9,7]",
      "Pass 5:",
      "Random pivot = 7 (idx 7)",
      " swap 7 and 9",
      "swap 7 and 7",
      " array: [1,2,3,4,5,6,7,9]",
      "Final Sorted Output: [1,2,3,4,5,6,7,9]",
    ],
    edgeCases: [
      "Random pivot avoids worst case",
      "Good for unpredictable input",
    ],
    tips: [
      "Best practical performance on average.",
      "Random pivot prevents adversarial input.",
    ],
    code: `function quickSortRandom(arr, low, high) {
  if (low >= high) return;

  let pivotIndex = low + Math.floor(Math.random() * (high - low + 1));
  let pivot = arr[pivotIndex];

  [arr[pivotIndex], arr[low]] = [arr[low], arr[pivotIndex]];

  let i = low;
  let j = high;

  while (i < j) {
    while (arr[i] <= pivot && i <= high - 1) i++;
    while (arr[j] > pivot && j >= low + 1) j--;
    if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  [arr[low], arr[j]] = [arr[j], arr[low]];

  quickSortRandom(arr, low, j - 1);
  quickSortRandom(arr, j + 1, high);
  return arr;
}`,
    dryRunFunc: (inputArray) => {
      const logs = [];
      let arr = [...inputArray];

      let pass = 1;
      const log = (m) => logs.push(m);

      const quick = (low, high) => {
        if (low >= high) return;
        log(`Pass ${pass++}:`);

        let pivotIndex = low + Math.floor(Math.random() * (high - low + 1));
        let pivot = arr[pivotIndex];
        log(`Random pivot = ${pivot} (idx ${pivotIndex})`);
        log(` swap ${arr[pivotIndex]} and ${arr[low]}`);

        [arr[pivotIndex], arr[low]] = [arr[low], arr[pivotIndex]];

        let i = low;
        let j = high;

        while (i < j) {
          while (arr[i] <= pivot && i < high) i++;
          while (arr[j] > pivot && j > low) j--;
          if (i < j) {
            log(`Compare ${i} < ${j} swap ${arr[i]} and ${arr[j]}`);
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }

        log(`swap ${arr[low]} and ${arr[j]}`);

        [arr[low], arr[j]] = [arr[j], arr[low]];
        log(` array: ${JSON.stringify(arr)}`);

        quick(low, j - 1);
        quick(j + 1, high);
      };

      quick(0, arr.length - 1);
      log(`Final Sorted Output: ${JSON.stringify(arr)}`);
      return logs;
    },
    inputType: "A",
    input: "[4,6,2,5,7,9,1,3]",
  },
];
const DesignData = [
  {
    id: 1,
    title: "Front-End Architecture Foundations",
    category: "System Design",
    explanation:
      "Front-end system design covers the structural choices & tradeoffs for delivering UI to users: how code is organized (monolith vs microfrontends), where rendering happens (client/server/edge), how state and data flow are managed, and how performance, scalability, and operability goals are achieved across CDN, browser, and backend boundaries.",
    tips: "\"Interview Tips / Pitfalls\"\n* Give tradeoffs rather than a single 'best' answer — performance, cost, developer velocity, and SEO matter.\n* Use diagrams: client ↔ CDN ↔ edge ↔ origin ↔ API.\n* Mention observability (RUM, logs, metrics) as part of architecture.",
    codeString:
      "// conceptual: high-level mapping (not runnable)\n// Client <-> CDN/Edge (static + edge functions) <-> Origin APIs / Auth / DB",
    output:
      "A clear mental model of how UI, CDN, edge, and origin services interact for real applications.",
  },

  {
    id: 2,
    title: "What Front-End System Design (FE SD) Means",
    category: "System Design",
    explanation:
      "FE SD is about designing the end-to-end experience and systems that deliver user interfaces: page load flow, rendering strategy, caching, state management boundaries, resilience, deployment shape, and how the UI integrates with backend services and infra.",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize users\' perceived performance (first meaningful paint) and developer ergonomics (CI/CD, local dev).\n* Distinguish FE SD from backend SD by focusing on browser constraints, rendering, and UX continuity.',
    codeString:
      "// Answer snippet example\nconst feSdChecklist = ['rendering model','caching','state boundaries','deployments','observability'];",
    output: "A checklist-style definition you can speak to in interviews.",
  },

  {
    id: 3,
    title: "How Front-End Connects with Backend & Infrastructure",
    category: "System Design",
    explanation:
      "The FE sits at the edge: it requests HTML/JS/CSS from CDNs/edges, calls APIs (REST/GraphQL/gRPC-web) to mutate and read data, and often triggers serverless/backend workflows. Integration points: auth (OAuth/OIDC), rate limiting, caching headers, feature flags, telemetry ingestion, and CDN edge logic.",
    tips: '"Interview Tips / Pitfalls"\n* Explain network boundaries (client → CDN edge → origin API) and what to keep stateless at edge.\n* Mention contract testing (API schemas) and failure modes (timeouts, 5xx).',
    codeString:
      "// Example: client calls API with fetch\nfetch('/api/items?page=1').then(r => r.json()).then(data => render(data));",
    output:
      "Illustrates typical API call flow and where retries/caching belong.",
  },

  {
    id: 4,
    title: "Monolith vs Micro-Frontends",
    category: "System Design",
    explanation:
      "Monolith FE: single repo/build, consistent runtime, easier to share components. Microfrontends: split by team/feature — independently deployable frontends that integrate at runtime (Module Federation, web components, iframes). Tradeoffs: team autonomy vs integration complexity and duplicate dependencies.",
    tips: '"Interview Tips / Pitfalls"\n* Discuss routing, shared state, CSS isolation, and versioning in microfrontends.\n* Explain incremental adoption: start monolith, extract shells for high-velocity teams.',
    codeString:
      "// Module Federation (conceptual)\n// host loads remote: products@https://cdn.example.com/remoteEntry.js",
    output:
      "You can explain when microfrontends help (large orgs, independent deploys) and when they hurt (small teams).",
  },

  {
    id: 5,
    title: "SPA vs MPA vs Hybrid",
    category: "System Design",
    explanation:
      "SPA (Single Page App): client builds UI after bootstrapping JS; smooth client navigation. MPA (Multi Page App): each route is a full document refresh (server renders). Hybrid: combine — server renders initial HTML, client hydrates for navigation (e.g., Next.js, Remix).",
    tips: '"Interview Tips / Pitfalls"\n* Explain UX and SEO tradeoffs, caching patterns, and when hybrid is a best compromise.\n* Discuss complexity: SPA routing state vs server-driven navigation.',
    codeString:
      "// SPA navigation example (client router)\nrouter.push('/profile');\n\n// MPA link (full reload)\n<a href='/profile'>Profile</a>",
    output: "Clear tradeoff summary for navigation/SEO/performance decisions.",
  },

  {
    id: 6,
    title: "CSR vs SSR vs SSG vs ISR",
    category: "System Design (Rendering Models)",
    explanation:
      "CSR: browser renders from JS (fast navigation, slow first paint). SSR: server returns rendered HTML per request (fast first paint, server cost). SSG: static at build time (fast, cheap, good for stable content). ISR: static pages regenerated periodically or on demand (hybrid).",
    tips: '"Interview Tips / Pitfalls"\n* Mention caching layers (CDN) and revalidation strategies.\n* For SSR, mention streaming HTML & partial hydration patterns to improve TTI.',
    codeString:
      "// Next.js examples\n// getServerSideProps() => SSR\n// getStaticProps() + revalidate => ISR (SSG+rebuild)",
    output:
      "You can justify a rendering choice with SEO/perf/update-frequency reasons.",
  },

  {
    id: 7,
    title: "Edge Rendering & CDN Execution (Cloudflare Workers, Vercel Edge)",
    category: "System Design (Edge & CDN)",
    explanation:
      "Edge rendering executes logic at CDN edge locations near users. Use cases: A/B testing, personalization, authentication token validation, or streaming pre-rendered HTML. Benefits: lower latency, better geo performance. Constraints: short execution time, limited CPU/memory, limited runtime APIs.",
    tips: '"Interview Tips / Pitfalls"\n* Explain what to run at edge (cheap, short-lived logic) vs origin (heavy computation, DB access).\n* Mention cold starts, cold-cache misses, and observability limitations at edge.',
    codeString:
      "// Cloudflare Worker (simple)\naddEventListener('fetch', e => e.respondWith(handle(e.request)));\nasync function handle(req){ return new Response('edge'); }",
    output: "Edge function returns responses with regional low latency.",
  },

  {
    id: 8,
    title: "Critical Rendering Path (CRP)",
    category: "System Design (Performance)",
    explanation:
      "CRP is the sequence browser follows to convert HTML/CSS/JS into pixels. Minimizing CRP length improves First Contentful Paint (FCP). Key techniques: reduce render-blocking CSS/JS, inline critical CSS, defer non-essential scripts, and prioritize fonts/images.",
    tips: '"Interview Tips / Pitfalls"\n* Mention how CSS is render-blocking; JS can be deferred/async.\n* Talk about resource hints: preconnect, dns-prefetch, preload, prefetch.',
    codeString:
      "<link rel='preload' href='/fonts/metric.woff2' as='font' type='font/woff2' crossorigin>",
    output:
      "Boosted first meaningful paint by inlining critical CSS and preloading essential fonts.",
  },

  {
    id: 9,
    title: "Hydration Strategies (Full, Partial, Deferred, Streaming)",
    category: "System Design (Rendering)",
    explanation:
      "Hydration attaches client-side behavior to server-rendered HTML. Strategies: full hydration (hydrate entire tree), partial hydration (hydrate islands/components only), deferred hydration (hydrate after idle), streaming hydration (send chunks progressively). Each trades time-to-interactive vs complexity.",
    tips: '"Interview Tips / Pitfalls"\n* Explain partial hydration (islands architecture) for large pages to reduce JS cost.\n* Mention framework support: React Server Components, Astro, Qwik.',
    codeString:
      "// pseudo: hydrate specific node\nhydrateRoot(document.getElementById('widget'), <Widget/>);",
    output:
      "Reduced JS execution by hydrating only interactive parts of the page.",
  },

  {
    id: 10,
    title: "App Shell Architecture",
    category: "System Design (Performance UX)",
    explanation:
      "App Shell: deliver a minimal static UI shell (layout, chrome) instantly, then populate dynamic content via API. Enables fast perceived load and progressive enhancement. Common in PWAs and offline-capable apps.",
    tips: '"Interview Tips / Pitfalls"\n* App shell works well with service worker caching for offline-first UX.\n* Be careful with personalization inside the shell (avoid showing stale user-specific info).',
    codeString:
      "// app-shell served as static HTML, then client fetches data for content\nrenderAppShell(); fetch('/api/content').then(renderContent);",
    output:
      "Users see UI chrome quickly; content streams in afterward for better perceived performance.",
  },

  {
    id: 11,
    title: "Routing Strategies: Client vs Server vs Hybrid",
    category: "System Design (Routing)",
    explanation:
      "Client routing handles navigation in the browser (fast, SPA-like). Server routing loads pages from server (MPA). Hybrid routing uses server for first load (SSR/SSG) and client router for subsequent navigation (Next.js). Consider bookmarkability, SEO, and deep linking when choosing.",
    tips: '"Interview Tips / Pitfalls"\n* Discuss route guards for auth and streaming/optimistic navigation UX.\n* Explain link prefetching to speed up client navigation.',
    codeString:
      "// Next.js Link prefetch (automatic)\n<Link href='/profile'>Profile</Link>",
    output:
      "Initial server-rendered HTML + client-side routing for smooth transitions.",
  },

  {
    id: 12,
    title: "Code-Splitting & Lazy Loading",
    category: "System Design (Build & Performance)",
    explanation:
      "Code splitting breaks bundles into chunks loaded on demand. Lazy loading defers components until used. Patterns: route-level splitting, component-level dynamic imports, vendor splitting. Benefits: smaller initial payload, faster TTI.",
    tips: '"Interview Tips / Pitfalls"\n* Use webpack/rollup/vite dynamic import() for split points.\n* Beware of waterfall loads — prefetch next chunk if likely needed.',
    codeString:
      "const Heavy = React.lazy(() => import('./HeavyComponent'));\n<Suspense fallback={<Loading/>}><Heavy/></Suspense>",
    output:
      "Initial bundle reduces size; heavy component loads only when required.",
  },

  {
    id: 13,
    title: "Asset Optimization: Images, Fonts, & Media",
    category: "System Design (Assets)",
    explanation:
      "Optimize images (responsive sizes, srcset, WebP/AVIF), lazy load offscreen media, and subset/compress fonts (woff2, preload critical fonts). Use CDN resizing and client hints to serve appropriate assets to each device.",
    tips: '"Interview Tips / Pitfalls"\n* Prefer modern formats (AVIF/WebP) and responsive `srcset`.\n* Mention font-display: swap to avoid FOIT (flash of invisible text).',
    codeString:
      "<img srcset='small.jpg 480w, medium.jpg 1024w, large.jpg 1920w' sizes='(max-width:600px) 480px, 1024px' src='medium.jpg' loading='lazy'/>",
    output:
      "Faster loads and lower bandwidth usage by sending device-appropriate images.",
  },

  {
    id: 14,
    title: "HTTP/2 & HTTP/3: Multiplexing and Transport",
    category: "System Design (Networking)",
    explanation:
      "HTTP/2 multiplexes multiple requests over a single TCP connection, reducing head-of-line blocking. HTTP/3 uses QUIC over UDP to reduce latency and faster connection establishment. Both influence asset bundling and server push strategies.",
    tips: '"Interview Tips / Pitfalls"\n* With HTTP/2/3, small files are less expensive — but too many tiny files can still hurt.\n* Explain why concatenation matters less with multiplexing, but TLS handshakes still benefit from fewer connections.',
    codeString:
      "// No runnable code; describe server config\n// Enable HTTP/2/3 at CDN or server (e.g., Nginx, Cloudflare)",
    output: "Lower latency loads with better concurrency for asset delivery.",
  },

  {
    id: 15,
    title: "Compression: Gzip vs Brotli",
    category: "System Design (Networking)",
    explanation:
      "Compress static/text assets to reduce transfer size. Brotli typically achieves better ratios than Gzip for web assets. Configure server/CDN to serve Brotli when supported and fall back to Gzip for older clients.",
    tips: '"Interview Tips / Pitfalls"\n* Mention build-time compression (pre-compress assets) to save CPU on the edge.\n* Do not compress already compressed assets (images, videos).',
    codeString:
      "// Example CDN header\n// Vary: Accept-Encoding\n// Content-Encoding: br (for Brotli compressed responses)",
    output: "Smaller payloads, faster network transfers for supported clients.",
  },

  {
    id: 16,
    title: "TLS, HSTS & Security Headers (Basics for FE Delivery)",
    category: "System Design (Security/Delivery)",
    explanation:
      "Transport security: always serve over HTTPS (TLS). Use HSTS to enforce HTTPS, set secure cookies, and use headers like CSP (Content-Security-Policy), X-Frame-Options, and Referrer-Policy to reduce attack surface.",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize `Strict-Transport-Security` and `secure, HttpOnly` cookie flags.\n* Note tradeoffs of strict CSP rules and how they affect inline scripts/styles.',
    codeString:
      "// Example response headers\n// Strict-Transport-Security: max-age=63072000; includeSubDomains; preload\n// Content-Security-Policy: default-src 'self';",
    output:
      "Reduced risk of MITM, clickjacking, and content injection attacks at the delivery layer.",
  },

  {
    id: 17,
    title: "Service Worker Basics (Lifecycle & Strategies)",
    category: "System Design (Offline & Caching)",
    explanation:
      "Service workers run between network and browser to intercept requests, cache assets, and enable offline experiences. Lifecycle: install → activate → fetch. Cache strategies include network-first, cache-first, stale-while-revalidate.",
    tips: '"Interview Tips / Pitfalls"\n* Explain update patterns (skipWaiting, claim) and cache invalidation.\n* Warn about complex debugging and inconsistent SW behavior across browsers.',
    codeString:
      "self.addEventListener('install', e => self.skipWaiting());\nself.addEventListener('fetch', e => {/* respondWith cache strategy */});",
    output:
      "Enables offline shell, faster repeat loads, and background sync opportunities.",
  },

  {
    id: 18,
    title: "Progressive Web App (PWA) Basics",
    category: "System Design (PWA)",
    explanation:
      "PWA = web app with app-like features: installability (manifest), offline support (service worker), and reliable performance. PWAs use app shell + cached assets and work across devices without app stores.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Web App Manifest, service worker, HTTPS requirement.\n* Discuss discoverability and whether native app parity is necessary.',
    codeString:
      '{\n  "name": "MyApp",\n  "icons": [{"src":"icon.png","sizes":"512x512"}],\n  "start_url": "/"\n}',
    output:
      "User can 'install' the site and relaunch it like a native app; improved offline behavior.",
  },

  {
    id: 19,
    title: "Offline-First Design Patterns",
    category: "System Design (Offline & Resilience)",
    explanation:
      "Offline-first means app works gracefully when offline: local storage/IndexedDB for data, service worker for assets, background sync for deferred writes, conflict resolution strategies (last-write-wins, CRDTs), and UI indicators for offline state.",
    tips: '"Interview Tips / Pitfalls"\n* Talk about eventual consistency and UX for conflict resolution.\n* Mention batching writes and retry/backoff when reconnecting.',
    codeString:
      "// pseudo: queue write when offline\nif (!navigator.onLine) { queue.push(writePayload); } else { send(writePayload); }",
    output:
      "App continues to function offline and syncs changes when connectivity resumes.",
  },

  {
    id: 20,
    title: "Build Pipelines & Bundlers (Webpack, Vite, Rollup) — Role in SD",
    category: "System Design (Build & CI)",
    explanation:
      "Bundlers transform source (JS/TS/CSS) into optimized artifacts. Responsibilities: tree-shaking, minification, code-splitting, asset hashing for cache-busting, and dev-time fast refresh. Choice affects build speed, plugin ecosystem, and DX (developer experience).",
    tips: '"Interview Tips / Pitfalls"\n* Mention dev vs prod differences (source maps, content hashing).\n* Vite provides faster dev server via native ESM; webpack excels at complex production optimizations.',
    codeString:
      '// package.json scripts (example)\n// "build": "vite build" or "webpack --mode production"',
    output:
      "Optimized production bundles with hashed assets and fast developer feedback in local dev.",
  },

  {
    id: 21,
    title: "Atomic Design Principles",
    category: "System Design (Component Architecture)",
    explanation:
      "Atomic Design organizes UI components into 5 layers:\n\n" +
      "• **Atoms** – smallest pieces (buttons, inputs, labels)\n" +
      "• **Molecules** – group of atoms (search bar with button)\n" +
      "• **Organisms** – complex UI sections (navbars, forms)\n" +
      "• **Templates** – page layout structure\n" +
      "• **Pages** – actual rendered screens with data\n\n" +
      "This creates predictable, reusable UI systems ideal for large apps.",
    tips:
      '"Interview Tips / Pitfalls"\n' +
      "* Emphasize reusability + consistency.\n" +
      "* Show understanding of design-system thinking.\n",
    codeString:
      "// Atom\nconst Button = ({ label }) => <button>{label}</button>;\n\n" +
      "// Molecule\nconst Search = () => (\n  <div>\n    <input />\n    <Button label='Go' />\n  </div>\n);",
    output:
      "UI is composed from small repeatable pieces, ensuring consistency.",
  },

  {
    id: 22,
    title: "Container–Presentational Component Pattern",
    category: "System Design (Component Architecture)",
    explanation:
      "A classic React pattern divides components into:\n\n" +
      "• **Presentational Components:** UI-only, no logic, receive props.\n" +
      "• **Container Components:** Handle data fetching, logic, state.\n\nThis increases testability & separation of concerns.",
    tips: '"Interview Tips / Pitfalls"\n* Containers know *how*, Presentational knows *how it looks*.\n* Great pattern for reusable UI libraries.',
    codeString:
      "// Presentational\nconst UserList = ({ users }) => users.map(u => <p>{u}</p>);\n\n" +
      "// Container\nfunction UserContainer() {\n  const [users] = useFetch('/api/users');\n  return <UserList users={users} />;\n}",
    output: "UI and logic stay separated, improving maintainability.",
  },

  {
    id: 23,
    title: "Smart vs Dumb Components",
    category: "System Design (Component Architecture)",
    explanation:
      "• **Smart Components:** contain state, business logic, API calls.\n" +
      "• **Dumb Components:** purely visual, accept props only.\n\nUseful for scaling teams and maximizing reuse.",
    tips: "\"Interview Tips / Pitfalls\"\n* React hooks made 'smart' smaller & easier.\n* Keep dumb components pure.",
    codeString:
      "const Dumb = ({ text }) => <p>{text}</p>;\n\n" +
      "const Smart = () => {\n  const [t] = useState('Hello');\n  return <Dumb text={t} />;\n};",
    output: "UI is easily testable and composable.",
  },

  {
    id: 24,
    title: "Controlled vs Uncontrolled Components",
    category: "System Design (Forms & Inputs)",
    explanation:
      "• **Controlled:** value managed by React state.\n• **Uncontrolled:** DOM manages its own input value via refs.\n\nControlled = more predictable but heavier. Uncontrolled = lighter but less controlled.",
    tips: '"Interview Tips / Pitfalls"\n* Mention performance concerns: controlled inputs re-render often.\n* Uncontrolled great for simple forms.',
    codeString:
      "// Controlled\n<input value={value} onChange={e => setValue(e.target.value)} />\n\n" +
      "// Uncontrolled\n<input ref={ref} />",
    output: "Choose based on performance vs control needs.",
  },

  {
    id: 25,
    title: "Composition Over Inheritance in UI Design",
    category: "System Design (Component Architecture)",
    explanation:
      "React encourages composition instead of inheritance.\n" +
      "Instead of extending components, nest or pass components as children.\n" +
      "Benefits: flexibility, testability, smaller components.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid class inheritance in UI.\n* Show examples of layout wrappers or slot patterns.',
    codeString:
      'const Card = ({ children }) => <div class="card">{children}</div>;',
    output: "Highly reusable UI patterns with flexible structure.",
  },

  {
    id: 26,
    title: "Local State vs Global State vs Server State",
    category: "System Design (State Management)",
    explanation:
      "• **Local State:** UI-specific, short-lived.\n• **Global State:** shared across pages/components.\n• **Server State:** remote data cached (React Query/SWR).\n\nMixing them incorrectly causes complexity or unnecessary rerenders.",
    tips: '"Interview Tips / Pitfalls"\n* Server state ≠ global state.\n* Use libraries like Zustand or Redux for global state only if needed.',
    codeString:
      "// Server state example (React Query)\nconst { data } = useQuery(['users'], fetchUsers);",
    output: "Clear separation of responsibilities reduces complexity.",
  },

  {
    id: 27,
    title: "Redux State Architecture (Modern Redux Toolkit)",
    category: "System Design (State Management)",
    explanation:
      "Modern Redux (RTK) simplifies reducers, actions, async thunks.\nIt solves large-scale data flow challenges with predictable updates.\nGreat for cross-page global data, caching, and devtools.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Immer, RTK Query, and slice pattern.\n* Avoid old Redux patterns unless asked.',
    codeString:
      "const slice = createSlice({ name:'c', initialState:0, reducers:{ inc:s=>s+1 } });",
    output: "Redux store becomes simple and scalable.",
  },

  {
    id: 28,
    title: "Zustand for Scalable Global State",
    category: "System Design (State Management)",
    explanation:
      "Zustand is a lightweight global store using hooks.\nNo boilerplate, minimal re-renders, great for game UI, ecommerce carts, etc.",
    tips: '"Interview Tips / Pitfalls"\n* Mention selector-based rendering optimization.\n* Demonstrate middleware (persist, devtools).',
    codeString:
      "const useStore = create(set => ({ count:0, inc:()=>set(s=>({count:s.count+1})) }));",
    output: "Simple and fast global state with minimal boilerplate.",
  },

  {
    id: 29,
    title: "Server State with React Query",
    category: "System Design (Data Fetching)",
    explanation:
      "React Query handles server state: caching, revalidation, retries, background refetch, stale-while-revalidate.\nIt prevents duplication of API logic & makes data flow predictable.",
    tips: '"Interview Tips / Pitfalls"\n* Mention staleTime, cacheTime, queryKeys.\n* Talk about optimistic updates.',
    codeString:
      "const { data, isLoading } = useQuery(['todos'], fetchTodos, { staleTime: 5000 });",
    output: "Stable UI with auto-refetch and smart caching.",
  },

  {
    id: 30,
    title: "SWR: Stale-While-Revalidate Fetching",
    category: "System Design (Server State)",
    explanation:
      "SWR returns cached data immediately (stale) then refetches in background.\nGreat for dashboards, lists, analytics, where fast UI matters.",
    tips: '"Interview Tips / Pitfalls"\n* Mention deduping and polling.\n* SWR is heavily used at Vercel scale.',
    codeString: "const { data } = useSWR('/api/user', fetcher);",
    output: "Instant UI with background sync for freshness.",
  },

  {
    id: 31,
    title: "RTK Query for API + Caching",
    category: "System Design (Server State)",
    explanation:
      "RTK Query merges API calls, caching, normalization, and auto-refetch.\nRemoves the need for manual API slices and boilerplate.",
    tips: '"Interview Tips / Pitfalls"\n* Show understanding of invalidation & tags.\n* Mention normalization of entities.',
    codeString:
      "const api = createApi({ baseQuery: fetchBaseQuery({ baseUrl:'/api' }), endpoints:(b)=>({ getUser:b.query(()=>'user') })});",
    output: "Minimal API logic + auto caching.",
  },

  {
    id: 32,
    title: "Data Normalization & Entity Caching Layers",
    category: "System Design (State Management)",
    explanation:
      "Normalization stores data by IDs and references.\nRemoves duplication across UI, ensures consistency and efficient updates.",
    tips: '"Interview Tips / Pitfalls"\n* Example: store posts as { byId, allIds }.\n* Mention stale entity issues.',
    codeString:
      "// Normalized structure\n{\n  byId: { 1:{id:1,text:'hi'} },\n  allIds: [1]\n}",
    output: "Entities update in one place; UI gets consistent view.",
  },

  {
    id: 33,
    title: "Race Conditions in Data Fetching",
    category: "System Design (State Management)",
    explanation:
      "Occurs when multiple requests return out-of-order (A < B < C but responses arrive C < A < B).\nFixes:\n• Abort previous requests\n• Compare timestamps\n• Use request counters\n• React Query handles this automatically",
    tips: '"Interview Tips / Pitfalls"\n* Mention AbortController.\n* Explain UX issues caused by stale responses.',
    codeString:
      "const controller = new AbortController();\nfetch('/api', { signal: controller.signal });\ncontroller.abort();",
    output: "Older requests are safely canceled to prevent stale UI.",
  },

  {
    id: 34,
    title: "Optimistic UI Updates",
    category: "System Design (State)",
    explanation:
      "Optimistic UI updates UI before server confirmation.\nIf request fails, rollback.\nImproves perceived performance in like, follow, cart updates.",
    tips: '"Interview Tips / Pitfalls"\n* Must handle rollback.\n* Works best with mutation keys in React Query/RTK Query.',
    codeString:
      "// Example: instant UI update\nupdateLikes(postId);\nsendLike(postId).catch(() => rollback(postId));",
    output: "UI feels extremely fast, like native apps.",
  },

  {
    id: 35,
    title: "Persistent State with LocalStorage",
    category: "System Design (Storage)",
    explanation:
      "LocalStorage stores small persistent key-value pairs.\nUsed for tokens (carefully), theme, onboarding status, preferences.\nNot for large or structured data.",
    tips: '"Interview Tips / Pitfalls"\n* Never store JWT (XSS risk). Use HttpOnly cookies.\n* Always try-catch for quota errors.',
    codeString:
      "localStorage.setItem('theme', 'dark');\nconst t = localStorage.getItem('theme');",
    output: "Persistent lightweight client configuration.",
  },

  {
    id: 36,
    title: "IndexedDB for Structured & Offline Data",
    category: "System Design (Storage)",
    explanation:
      "IndexedDB stores complex objects, large datasets, blobs.\nUsed in PWAs, offline apps, file editors, large caches.\nWorks asynchronously and is non-blocking.",
    tips: '"Interview Tips / Pitfalls"\n* Use wrappers like Dexie.js.\n* IndexedDB is safe for megabytes of structured data.',
    codeString: "const db = indexedDB.open('app-db', 1);",
    output: "Offline caching and large structured storage available.",
  },

  {
    id: 37,
    title: "Shared State Across Tabs (BroadcastChannel API)",
    category: "System Design (State Sync)",
    explanation:
      "BroadcastChannel enables same-origin tabs to sync events/data.\nUseful for multi-tab logout, cart sync, notifications, presence indicators.",
    tips: '"Interview Tips / Pitfalls"\n* Works only same-origin.\n* Safari support requires fallback to localStorage events.',
    codeString:
      "const bc = new BroadcastChannel('app');\nbc.postMessage({ type: 'LOGOUT' });",
    output: "All tabs instantly sync state changes.",
  },

  {
    id: 38,
    title: "Client Cache Invalidation Strategies",
    category: "System Design (Caching)",
    explanation:
      "UI caches must sync with server state.\nStrategies:\n• Tag-based invalidation\n• Time-based TTL\n• SWR stale-while-revalidate\n• Manual invalidation upon mutation",
    tips: '"Interview Tips / Pitfalls"\n* Mention optimizations: data freshness guarantees.\n* Cache invalidation is one of the two hard problems!',
    codeString:
      "// Invalidate user cache\nqueryClient.invalidateQueries(['user']);",
    output: "Fresh server data reflected immediately in UI.",
  },

  {
    id: 39,
    title: "State Machines for UI Consistency",
    category: "System Design (State Modeling)",
    explanation:
      "Finite State Machines ensure UI is always in valid states: idle → loading → success|error.\nPrevents impossible UI conditions.",
    tips: '"Interview Tips / Pitfalls"\n* Example states: loading + error shouldn\'t coexist.\n* XState popular for complex wizards.',
    codeString:
      "const machine = { idle:{ on:{ SUBMIT:'loading' } }, loading:{ on:{ SUCCESS:'success', FAIL:'error' } } };",
    output: "UI logic becomes predictable and debuggable.",
  },

  {
    id: 40,
    title: "High-Level State Architecture (Redux, Zustand, Recoil, Jotai)",
    category: "System Design (State Architecture)",
    explanation:
      "Different global-state libraries solve different problems:\n\n• **Redux:** predictable centralized immutable updates.\n• **Zustand:** small, fast, simple hooks.\n• **Recoil:** graph-based atom selectors.\n• **Jotai:** primitive atomic states.\n\nChoose based on app complexity, team size, and performance needs.",
    tips: '"Interview Tips / Pitfalls"\n* No universal best — match tool to use-case.\n* Mention debugging tools like Redux DevTools.',
    codeString:
      "// Zustand example\nconst useStore = create(() => ({ loggedIn:false }));",
    output: "Flexible global state system with predictable updates.",
  },
  {
    id: 41,
    title: "Bundle Size Optimization (Tree-Shaking & Minification)",
    category: "System Design (Performance)",
    explanation:
      "Reducing bundle size improves First Load Time. Techniques include:\n\n" +
      "• Tree-shaking unused exports\n" +
      "• Minification via Terser/ESBuild\n" +
      "• Removing dead code\n" +
      "• Using ESM imports\n" +
      "• Splitting vendor chunks\n\nSmaller bundles → faster TTI & lower bandwidth cost.",
    tips: '"Interview Tips / Pitfalls"\n* Mention why named imports help tree-shaking.\n* Avoid wildcard imports (“import * as X”).',
    codeString: "import { specificUtil } from './utils'; // tree-shakable",
    output: "Reduced bundle size and improved initial loading performance.",
  },

  {
    id: 42,
    title: "Code Splitting & Dynamic Imports",
    category: "System Design (Performance)",
    explanation:
      "Code splitting loads different parts of the app only when required.\nReduces initial bundle size.\nTechniques:\n• Route-based splitting\n• Component-level splitting\n• On-demand libraries",
    tips: '"Interview Tips / Pitfalls"\n* Always wrap React.lazy inside <Suspense>.\n* Avoid splitting tiny components → overhead.',
    codeString: "const Heavy = React.lazy(() => import('./Heavy.js'));",
    output: "Heavy components load only when needed.",
  },

  {
    id: 43,
    title: "Lazy Loading + Preloading + Prefetching",
    category: "System Design (Performance)",
    explanation:
      "Preload = load NOW with high priority.\nPrefetch = load LATER with low priority.\nLazy-load = load on demand.\n\nUse cases:\n• Preload critical fonts, hero images\n• Prefetch next route\n• Lazy-load modals, charts",
    tips: '"Interview Tips / Pitfalls"\n* Do NOT over-preload → blocks critical assets.\n* Prefetch only for likely navigation.',
    codeString: "<link rel='prefetch' href='/next-page.js'>",
    output: "Faster navigation & improved perceived performance.",
  },

  {
    id: 44,
    title: "Critical Rendering Path Optimization",
    category: "System Design (Performance)",
    explanation:
      "CRP is how the browser converts HTML → CSSOM → Render Tree → Layout → Paint.\nOptimize by:\n• Reducing render-blocking CSS\n• Inlining above-the-fold CSS\n• Async/defer JS\n• Preconnecting to external domains",
    tips: '"Interview Tips / Pitfalls"\n* Explain CSS blocks rendering; JS blocks parsing.',
    codeString: "<script src='app.js' defer></script>",
    output: "Reduced time to first paint and improved page load speed.",
  },

  {
    id: 45,
    title: "GPU Acceleration & Compositing",
    category: "System Design (Performance)",
    explanation:
      "CSS properties like transform/opacity promote elements to GPU layers.\nThis avoids re-layout and re-paint, enabling smoother animations.\nAvoid animating 'layout-trigger' properties like width/top/left.",
    tips: "\"Interview Tips / Pitfalls\"\n* Mention 'will-change: transform' carefully (too many layers = memory issues).",
    codeString: "div { will-change: transform; transform: translateZ(0); }",
    output: "Smooth, GPU-accelerated animations with minimal jank.",
  },

  {
    id: 46,
    title: "Main Thread Scheduling (requestIdleCallback, RAF)",
    category: "System Design (Performance)",
    explanation:
      "UI thread must never block. Scheduling techniques:\n• requestAnimationFrame — animation updates\n• requestIdleCallback — low-priority tasks\n• setTimeout throttling",
    tips: '"Interview Tips / Pitfalls"\n* RAF → 60fps animation.\n* IdleCallback → non-urgent tasks.',
    codeString: "requestIdleCallback(() => expensiveComputation());",
    output: "Heavy tasks no longer block UI interactions.",
  },

  {
    id: 47,
    title: "Debounce and Throttle for Event Optimization",
    category: "System Design (Performance)",
    explanation:
      "Debounce delays execution until user stops triggering events.\nThrottle executes at fixed intervals.\nUsed for scroll, resize, search typing.",
    tips: '"Interview Tips / Pitfalls"\n* Ensure proper cleanup.\n* Use requestAnimationFrame throttle for scroll.',
    codeString: "const debounced = debounce(search, 300);",
    output: "Improved performance for frequent UI events.",
  },

  {
    id: 48,
    title: "Web Workers for Heavy Computation",
    category: "System Design (Performance)",
    explanation:
      "Web Workers run scripts off the main thread.\nUse for heavy CPU tasks:\n• Encryption\n• Large loops\n• Data processing\n• File parsing\n\nPrevents UI freeze.",
    tips: '"Interview Tips / Pitfalls"\n* Workers cannot access DOM.\n* Use transferable objects for speed.',
    codeString:
      "const worker = new Worker('worker.js');\nworker.postMessage({ data });",
    output: "Heavy tasks run in background without blocking UI.",
  },

  {
    id: 49,
    title: "Performance Budgets",
    category: "System Design (Performance)",
    explanation:
      "A performance budget defines a limit for metrics:\n• Max bundle size\n• Max API response size\n• Max JS execution time\n• Max image weight\n\nTeams enforce budgets via CI/CD.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Lighthouse CI.\n* Real apps fail without enforced budgets.',
    codeString:
      "// Example (Webpack Performance Hints)\nperformance: { maxAssetSize: 250000 }",
    output: "Builds fail when performance thresholds exceed limits.",
  },

  {
    id: 50,
    title: "Web Vitals (LCP, FID, CLS, TTI, TBT)",
    category: "System Design (Performance)",
    explanation:
      "Core Web Vitals measure real user experience:\n• **LCP:** Load speed of largest element\n• **FID:** Interactivity responsiveness\n• **CLS:** Layout stability\n• **TBT/TTI:** Total blocking time / Time to interactive",
    tips: '"Interview Tips / Pitfalls"\n* Mention render-blocking JS/CSS impacts.\n* CLS often caused by missing image sizes.',
    codeString: "import { onCLS, onLCP } from 'web-vitals';",
    output: "Captured real RUM performance metrics for analysis.",
  },

  {
    id: 51,
    title: "Browser Caching (Memory Cache & Disk Cache)",
    category: "System Design (Caching)",
    explanation:
      "Browser cache has layers:\n• Memory Cache (fastest)\n• Disk Cache (larger but slower)\n• HTTP Cache (ETag, Cache-Control)\n\nSmaller assets often hit memory cache; large static assets hit disk cache.",
    tips: '"Interview Tips / Pitfalls"\n* Always fingerprint assets.\n* Avoid storing dynamic HTML in long-term cache.',
    codeString: "Cache-Control: public, max-age=31536000",
    output: "Static assets load extremely fast on repeat visits.",
  },

  {
    id: 52,
    title: "CDN Caching for Scalability",
    category: "System Design (Caching)",
    explanation:
      "CDNs store cached copies near users.\nBenefits:\n• Faster load times\n• Low latency\n• Reduced origin server load\n• Edge logic for routing/auth",
    tips: '"Interview Tips / Pitfalls"\n* Mention cache invalidation & stale-while-revalidate.\n* CDN caching is the #1 scaling technique.',
    codeString: "// Example CDN header\nCache-Control: public, s-maxage=86400",
    output: "Improved global performance & reduced origin traffic.",
  },

  {
    id: 53,
    title: "Service Worker Caching Strategies",
    category: "System Design (Caching)",
    explanation:
      "SW caching enables offline & fast refresh:\n• Cache-first: offline-friendly\n• Network-first: always fresh\n• SWR: best balance\n• Custom strategies based on URL patterns",
    tips: '"Interview Tips / Pitfalls"\n* SW caches must be versioned.\n* Avoid caching API POST responses.',
    codeString:
      "self.addEventListener('fetch', e => e.respondWith(caches.match(e.request)));",
    output: "Offline and instant-loading experience for repeat visits.",
  },

  {
    id: 54,
    title: "HTTP Caching Headers (ETag & Cache-Control)",
    category: "System Design (Caching)",
    explanation:
      "Key HTTP cache headers:\n• **Cache-Control:** controls caching duration\n• **ETag:** validator for revalidation\n• **Last-Modified:** timestamp validation\n• **Vary:** cache behavior based on headers",
    tips: '"Interview Tips / Pitfalls"\n* ETag helps avoid bandwidth waste.\n* Content hashing makes Cache-Control immutable.',
    codeString: "Cache-Control: immutable, max-age=31536000",
    output: "Assets become fully cacheable and revalidated efficiently.",
  },

  {
    id: 55,
    title: "Stale-While-Revalidate (SWR Cache Pattern)",
    category: "System Design (Caching)",
    explanation:
      "SWR returns cached response first (stale), then revalidates in background.\nBalances speed + freshness.\nHeavily used in Next.js, React Query, SWR.",
    tips: '"Interview Tips / Pitfalls"\n* Amazing for dashboards & lists.\n* Users see instant UI with gradually updated data.',
    codeString: "Cache-Control: max-age=0, stale-while-revalidate=60",
    output: "Fast initial load + background refresh.",
  },

  {
    id: 56,
    title: "REST vs GraphQL vs gRPC-Web",
    category: "System Design (API Design)",
    explanation:
      "Comparison:\n\n**REST:** resource-based, simple, widely adopted.\n**GraphQL:** client chooses data shape, eliminates overfetching.\n**gRPC-web:** binary protocol, high performance, typed schemas.\n\nPick based on network constraints & data patterns.",
    tips: '"Interview Tips / Pitfalls"\n* Mention caching differences.\n* GraphQL requires schema governance.',
    codeString: "{ user { id name posts { id title } } }",
    output: "Client fetches exactly what it needs.",
  },

  {
    id: 57,
    title: "API Pagination Strategies (Offset, Cursor, Relay)",
    category: "System Design (API Design)",
    explanation:
      "Pagination improves performance & scalability.\nTypes:\n• Offset: simple, slow for large datasets.\n• Cursor: reliable for real-time feeds.\n• Relay-style: widely used in GraphQL APIs.",
    tips: '"Interview Tips / Pitfalls"\n* Cursor-based suits infinite scroll.',
    codeString: "?cursor=abc123&limit=20",
    output: "Stable pagination even when data changes.",
  },

  {
    id: 58,
    title: "Batching & Debouncing API Requests",
    category: "System Design (API Design)",
    explanation:
      "Batching reduces network calls.\nExamples:\n• Combined GraphQL queries\n• Debounced search API requests\n• Aggregated analytics logs",
    tips: '"Interview Tips / Pitfalls"\n* Prevent rate-limit violations.\n* Batch size must be tuned.',
    codeString:
      "const debouncedFetch = debounce(() => fetch('/search?q=x'), 300);",
    output: "Fewer network calls and faster perceived UI.",
  },

  {
    id: 59,
    title: "Retry, Exponential Backoff & Jitter",
    category: "System Design (API Reliability)",
    explanation:
      "Retries must avoid server overload.\nUse:\n• Exponential delay\n• Random jitter to distribute load\n• Abort on unrecoverable errors\n\nCritical for mobile or unreliable networks.",
    tips: '"Interview Tips / Pitfalls"\n* Never retry 400 errors.\n* Use AbortController for cancellation.',
    codeString: "delay = Math.min(1000 * 2 ** attempt, 16000)",
    output: "Requests retry predictably without thundering herd issues.",
  },

  {
    id: 60,
    title: "Error Normalization & API Response Standardization",
    category: "System Design (API Design)",
    explanation:
      "Apps combining multiple APIs must normalize error shapes.\nExample unified schema:\n{ status, message, code, details }\n\nMakes UI error handling consistent.",
    tips: '"Interview Tips / Pitfalls"\n* Always convert server errors to UI-friendly messages.',
    codeString:
      "return { code:err.code, message:err.message, status:'error' };",
    output: "Consistent error UX across all API responses.",
  },
  {
    id: 61,
    title: "WebSockets vs SSE vs Long Polling",
    category: "System Design (Real-Time)",
    explanation:
      "Real-time communication can be implemented in 3 main ways:\n\n" +
      "• **WebSockets:** Full duplex; best for chat, gaming, live dashboards.\n" +
      "• **SSE (Server-Sent Events):** One-way server → client stream; great for events.\n" +
      "• **Long Polling:** Client waits for server response; fallback for old systems.\n\nChoose based on duplex needs, scale, and server infra.",
    tips: '"Interview Tips / Pitfalls"\n* Mention that WebSockets require sticky sessions unless using WebSocket-aware load balancers.\n* SSE auto-reconnects and uses plain HTTP which is simpler to scale.',
    codeString:
      "const ws = new WebSocket('wss://app.com');\nws.onmessage = e => console.log(e.data);",
    output: "Bi-directional real-time updates delivered over WebSocket.",
  },

  {
    id: 62,
    title: "Real-Time Dashboard Design",
    category: "System Design (Real-Time)",
    explanation:
      "A real-time dashboard requires:\n• WebSockets or SSE for streaming data\n• State management for real-time updates\n• Rate-limiting + batching to avoid overload\n• Virtualized charts\n• Backpressure handling\n\nScaling requires dropping outdated events & reducing re-render frequency.",
    tips: '"Interview Tips / Pitfalls"\n* Mention requestAnimationFrame batching.\n* Avoid re-rendering on every incoming message.',
    codeString: "socket.on('update', data => updateChart(data));",
    output: "Real-time metrics rendered efficiently without UI lag.",
  },

  {
    id: 63,
    title: "Building a Live Chat Application",
    category: "System Design (Real-Time)",
    explanation:
      "Chat apps require:\n• WebSocket channels\n• Message ordering\n• Delivery acknowledgements\n• Offline queueing\n• Typing indicators (debounced events)\n• Presence tracking",
    tips: '"Interview Tips / Pitfalls"\n* Mention message IDs, optimistic sending.\n* Explain retry and deduping.',
    codeString: "ws.send(JSON.stringify({ type:'message', text:'Hello' }));",
    output: "Messages are delivered with ordering guarantees.",
  },

  {
    id: 64,
    title: "Presence Indicators (Online, Typing, Away)",
    category: "System Design (Real-Time)",
    explanation:
      "Presence tracking requires ephemeral updates:\n• Heartbeats every N seconds\n• BroadcastChannel for multi-tab sync\n• WebSocket channels\n• Timeouts to mark 'offline'",
    tips: '"Interview Tips / Pitfalls"\n* Avoid sending presence events too frequently.\n* Use exponential backoff for reconnect.',
    codeString: "ws.send(JSON.stringify({ type:'heartbeat' }));",
    output: "Shows accurate online/typing status.",
  },

  {
    id: 65,
    title: "Syncing UI Across Tabs (BroadcastChannel API)",
    category: "System Design (Real-Time)",
    explanation:
      "BroadcastChannel syncs events across tabs instantly.\nUse cases:\n• Logout everywhere\n• Shared cart\n• Multi-tab updates\n\nIt is same-origin only.",
    tips: "\"Interview Tips / Pitfalls\"\n* Safari fallback = localStorage 'storage' event.",
    codeString:
      "const bc = new BroadcastChannel('app');\nbc.postMessage({ action:'logout' });",
    output: "All tabs instantly react to state changes.",
  },

  {
    id: 66,
    title: "Scaling Front-End for Millions of Users",
    category: "System Design (Scalability)",
    explanation:
      "Scaling FE is about:\n• CDN edge caching\n• Static asset fingerprinting\n• Minimizing JS execution\n• Serverless + edge functions\n• Hydration optimization\n• Runtime performance tuning",
    tips: '"Interview Tips / Pitfalls"\n* FE scaling = asset delivery + runtime execution, not server CPU.\n* Mention RUM monitoring.',
    codeString: "// Example hashed assets\n/main.abcd1234.js",
    output: "Can handle high global traffic with low latency.",
  },

  {
    id: 67,
    title: "Image Optimization Pipeline",
    category: "System Design (Performance/Scalability)",
    explanation:
      "A scalable pipeline includes:\n• Responsive images\n• WebP/AVIF formats\n• CDN resizing\n• Lazy loading\n• Placeholder (blurhash)\n\nImages account for 50–70% of page weight.",
    tips: "\"Interview Tips / Pitfalls\"\n* Always allocate width/height to avoid CLS.\n* Use CDN params like '?w=300&format=webp'.",
    codeString: "<img src='img.webp' loading='lazy' />",
    output: "Significantly reduced load time & bandwidth.",
  },

  {
    id: 68,
    title: "Hydration at Scale (React Server Components)",
    category: "System Design (Performance)",
    explanation:
      "Hydration is costly for large pages.\nReact Server Components reduce bundle size by letting server handle non-interactive logic.\nCombine with partial hydration for islands.",
    tips: '"Interview Tips / Pitfalls"\n* Mention zero-bundle-server-components.\n* Performance increases dramatically.',
    codeString:
      "// server component\nexport default function ProductList() { return <div>...</div>; }",
    output: "Much smaller JS bundles and faster hydration.",
  },

  {
    id: 69,
    title: "Rendering at Scale (Streaming SSR)",
    category: "System Design (Rendering)",
    explanation:
      "Streaming SSR sends HTML chunks progressively.\nUser sees content faster while server continues rendering.\nIdeal for content-heavy apps.",
    tips: '"Interview Tips / Pitfalls"\n* Mention React\'s streaming support.\n* CDN caching works even with streamed HTML.',
    codeString: "res.write('<h1>Loading...</h1>');",
    output: "Faster perceived loading & better TTFB.",
  },

  {
    id: 70,
    title: "Multi-Region Deployments (Vercel/Netlify/Cloudflare)",
    category: "System Design (Scalability)",
    explanation:
      "Front-end apps deploy globally with:\n• Edge CDN\n• Region-specific serverless APIs\n• Geo-routing\n\nBenefits: low latency + resilient failover.",
    tips: '"Interview Tips / Pitfalls"\n* Mention DNS-level routing.\n* Multi-region SSR requires session consistency.',
    codeString:
      "// Vercel edge config\nexport const config = { runtime: 'edge' };",
    output: "Serves UI from nearest region → faster load times.",
  },

  {
    id: 71,
    title: "Microfrontends Architecture",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontends decomposes FE apps into independently deployable units.\nPatterns:\n• Module Federation\n• Iframes\n• Web Components\n\nUsed in large companies with multiple teams.",
    tips: '"Interview Tips / Pitfalls"\n* Mention routing, CSS isolation, shared deps.\n* Explain when NOT to use microfrontends.',
    codeString:
      "// module federation config\nremotes: { cart: 'cartApp@https://cdn/cart.js' }",
    output: "Feature teams deploy independently without shipping entire app.",
  },

  {
    id: 72,
    title: "Module Federation (Webpack 5)",
    category: "System Design (Microfrontends)",
    explanation:
      "Module Federation enables apps to load code from other apps at runtime.\nSupports shared libraries, version negotiation, independent deploys.",
    tips: '"Interview Tips / Pitfalls"\n* Share React version carefully.\n* Mention remoteEntry.js.',
    codeString:
      "module.exports = { name:'host', remotes:{ shop:'shop@/remoteEntry.js' } };",
    output: "UI integrates remote modules dynamically.",
  },

  {
    id: 73,
    title: "Iframes vs Web Components vs Build-Time Integration",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontend integration styles:\n• **Iframes:** Hard isolation, heavy, bad UX.\n• **Web Components:** Native encapsulation.\n• **Build-time:** Importing code into a monorepo.\n\nEach has tradeoffs.",
    tips: '"Interview Tips / Pitfalls"\n* Iframes = legacy & heavy.\n* Web Components = great isolation.',
    codeString: "<my-widget></my-widget>",
    output: "UI loads microfrontends with proper isolation.",
  },

  {
    id: 74,
    title: "Shared Dependencies & Versioning Strategy",
    category: "System Design (Microfrontends)",
    explanation:
      "Sharing React or design-system libraries across microfrontends may cause version conflicts.\nSolutions:\n• Shared singletons via Module Federation\n• Semantic versioning\n• Hard dependency boundaries",
    tips: '"Interview Tips / Pitfalls"\n* Mention duplicated bundle risk.\n* Use peerDependencies carefully.',
    codeString: "shared: { react:{ singleton:true } }",
    output: "Consistent versioning and minimal duplication.",
  },

  {
    id: 75,
    title: "CSS Isolation in Microfrontends",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontends require CSS boundaries.\nPatterns:\n• Shadow DOM (best)\n• CSS Modules\n• Scoped styles\n• Runtime isolation\n\nAvoids style leakage.",
    tips: '"Interview Tips / Pitfalls"\n* Shadow DOM solves isolation but breaks global theming unless designed properly.',
    codeString:
      "class MyComp extends HTMLElement { attachShadow({ mode:'open' }); }",
    output: "Style conflicts eliminated across microfrontends.",
  },

  {
    id: 76,
    title: "Microfrontend Routing Orchestration",
    category: "System Design (Microfrontends)",
    explanation:
      "Routing must coordinate across child microfrontends.\nApproaches:\n• Root-router delegating child routers\n• Independent child routers\n• Shared route events",
    tips: '"Interview Tips / Pitfalls"\n* Avoid each microfrontend handling URLs independently → conflict.',
    codeString:
      "window.dispatchEvent(new CustomEvent('route-change', { detail:'/cart' }));",
    output: "Synchronized navigation across microfrontend boundaries.",
  },

  {
    id: 77,
    title: "Deployment & Rollback Strategy for Microfrontends",
    category: "System Design (Microfrontends)",
    explanation:
      "Each microfrontend deploys independently.\nKey challenges:\n• Version mismatches\n• Broken shared contracts\n• Hotfixing remote apps\n\nUse canary deploys, remote version pinning, rollback banners.",
    tips: '"Interview Tips / Pitfalls"\n* Always pin remote versions in production.',
    codeString: "remotes:{ cart:'cartApp@https://cdn/cart/v1/remoteEntry.js' }",
    output: "Safe deployment pipeline with instant rollback support.",
  },

  {
    id: 78,
    title: "Performance Considerations in Microfrontends",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontends risk:\n• Duplicated React\n• Multiple design-systems\n• Multiple runtimes\n\nMitigate using shared chunks & tree-shaking.",
    tips: '"Interview Tips / Pitfalls"\n* Design systems should be shared—not duplicated.',
    codeString: "shared: ['react', 'react-dom']",
    output: "Optimal microfrontend bundle performance.",
  },

  {
    id: 79,
    title: "Cross-Microfrontend Communication",
    category: "System Design (Microfrontends)",
    explanation:
      "Communication patterns:\n• Custom events\n• Shared state (Zustand/Context)\n• BroadcastChannel\n• Global event bus\n\nAvoid tight coupling.",
    tips: '"Interview Tips / Pitfalls"\n* Keep MFEs independent; no deep imports across apps.',
    codeString: "window.dispatchEvent(new CustomEvent('cart-updated'));",
    output: "Loose coupling between microfrontends with clean interfaces.",
  },

  {
    id: 80,
    title: "Microfrontend Failure Isolation",
    category: "System Design (Microfrontends)",
    explanation:
      "A failed microfrontend must NOT crash the whole app.\nUse:\n• Error boundaries\n• Timeouts\n• Fallback UI\n• Safe lazy loading\n\nCritical for large-scale teams.",
    tips: '"Interview Tips / Pitfalls"\n* Mention error boundaries as first defense.',
    codeString: "<ErrorBoundary><RemoteComponent/></ErrorBoundary>",
    output: "Failures are isolated without breaking the parent shell.",
  },
  {
    id: 81,
    title: "Design Tokens",
    category: "System Design (Design Systems)",
    explanation:
      "Design tokens are the single source of truth for reusable UI values like:\n" +
      "• colors\n• spacing\n• typography\n• borderRadius\n• shadows\n• breakpoints\n\nTokens ensure consistency across platforms (web, iOS, Android) and microfrontends.",
    tips: '"Interview Tips / Pitfalls"\n* Mention tokens stored in JSON and consumed everywhere.\n* They enable dark mode without touching components.',
    codeString: '{ "colorPrimary": "#1e90ff", "spacingMd": "16px" }',
    output: "Themes and UI systems become centrally governed and scalable.",
  },

  {
    id: 82,
    title: "Theming Architecture",
    category: "System Design (Design Systems)",
    explanation:
      "Theming uses tokens + CSS variables to switch between themes (light/dark/enterprise).\n" +
      "Two main patterns:\n• CSS Variables (runtime switching)\n• Build-time themes (Sass)\n",
    tips: '"Interview Tips / Pitfalls"\n* Runtime themes require CSS variables.\n* SSR apps must consider FOUC (Flash of Unstyled Content).',
    codeString:
      ":root { --color-bg: #fff; }\n[data-theme='dark'] { --color-bg: #000; }",
    output: "Theme changes instantly without re-rendering components.",
  },

  {
    id: 83,
    title: "Component Library Engineering",
    category: "System Design (Design Systems)",
    explanation:
      "Building a scalable component library requires:\n• Atomic design\n• Strict API contracts\n• Tree-shaking\n• Controlled/uncontrolled patterns\n• Accessibility baked-in\n• Versioning strategy",
    tips: '"Interview Tips / Pitfalls"\n* Mention Storybook as documentation system.\n* Think about bundle size of the library.',
    codeString:
      "export const Button = ({ variant='primary', ...props }) => <button {...props}/>;",
    output: "Reusable components that scale across multiple applications.",
  },

  {
    id: 84,
    title: "Accessibility (A11y) Architecture",
    category: "System Design (Design Systems)",
    explanation:
      "Accessibility ensures apps usable by people with disabilities.\nCore principles:\n• Keyboard navigation\n• Semantic HTML\n• ARIA attributes\n• Color contrast\n• Screen reader support\n\nLegal requirement in many countries.",
    tips: '"Interview Tips / Pitfalls"\n* Mention WCAG 2.1 guidelines.\n* Avoid div-for-everything anti-pattern.',
    codeString: "<button aria-label='Close dialog'>X</button>",
    output: "Accessible components that support all users.",
  },

  {
    id: 85,
    title: "Cross-App UI Governance",
    category: "System Design (Design Systems)",
    explanation:
      "Large orgs require governance to ensure consistency.\nIncludes:\n• Component review process\n• Version management\n• Lint rules\n• Design token registry\n• Centralized design system team",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize governance is non-technical but critical.',
    codeString: '// UI package versioning\n"@org/ui-library": "^2.1.0"',
    output: "Consistent UI across enterprise-scale applications.",
  },

  {
    id: 86,
    title: "XSS Prevention",
    category: "System Design (Security)",
    explanation:
      "XSS occurs when user input is executed as JS.\nPrevent by:\n• Escaping user data\n• Sanitizing HTML (DOMPurify)\n• Avoiding dangerouslySetInnerHTML\n• Using CSP headers\n",
    tips: '"Interview Tips / Pitfalls"\n* CSP is strongest defense.\n* React auto-escapes by default.',
    codeString:
      "const safe = DOMPurify.sanitize(userInput);\n<div dangerouslySetInnerHTML={{ __html: safe }} />",
    output: "Malicious scripts are sanitized and cannot run.",
  },

  {
    id: 87,
    title: "CSRF Protection",
    category: "System Design (Security)",
    explanation:
      "CSRF tricks users into performing unintended actions.\nMitigation:\n• SameSite cookies\n• CSRF tokens\n• Double-submit pattern\n• Only using HttpOnly cookies\n",
    tips: '"Interview Tips / Pitfalls"\n* APIs with JWT in localStorage are vulnerable.\n* HttpOnly + SameSite=Lax is safest default.',
    codeString: "Set-Cookie: session=abc; HttpOnly; SameSite=Lax",
    output: "Requests cannot be forged from another origin.",
  },

  {
    id: 88,
    title: "Clickjacking Protection",
    category: "System Design (Security)",
    explanation:
      "Clickjacking loads your site in an invisible iframe.\nPrevent by:\n• X-Frame-Options: DENY\n• frame-ancestors CSP directive",
    tips: '"Interview Tips / Pitfalls"\n* Mention iframe sandbox attributes.',
    codeString: "Content-Security-Policy: frame-ancestors 'none'",
    output: "Your app cannot be embedded in malicious sites.",
  },

  {
    id: 89,
    title: "OAuth 2 / OIDC with PKCE (Front-End Flow)",
    category: "System Design (Security)",
    explanation:
      "PKCE (Proof Key for Code Exchange) is the secure OAuth flow for SPAs.\nSteps:\n• FE generates code_verifier\n• Hash to code_challenge\n• Redirect user to login\n• Exchange code + verifier for token\n",
    tips: '"Interview Tips / Pitfalls"\n* Never store tokens in localStorage.\n* Use OAuth providers like Auth0, Cognito, Okta.',
    codeString: "const codeVerifier = crypto.randomUUID();",
    output: "Secure login flow preventing token interception.",
  },

  {
    id: 90,
    title: "JWT vs HttpOnly Cookies",
    category: "System Design (Security)",
    explanation:
      "Two common auth storage patterns:\n• **JWT in localStorage:** convenient, but vulnerable to XSS.\n• **HttpOnly cookies:** safer, cannot be read by JS.\n\nModern best practice → HttpOnly + SameSite cookies + refresh tokens.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid storing tokens in localStorage.',
    codeString: "Set-Cookie: token=abc; HttpOnly; Secure",
    output: "The FE cannot leak the cookie via XSS.",
  },

  {
    id: 91,
    title: "Content Security Policy (CSP)",
    category: "System Design (Security)",
    explanation:
      "CSP restricts where scripts, images, fonts can load from.\nStrong defense against XSS.\n\nExample:\n`script-src 'self' https://trusted.cdn.com`",
    tips: '"Interview Tips / Pitfalls"\n* Never use unsafe-inline unless needed.',
    codeString: "Content-Security-Policy: script-src 'self'",
    output: "Browser blocks loading untrusted scripts.",
  },

  {
    id: 92,
    title: "CORS Architecture",
    category: "System Design (Security)",
    explanation:
      "CORS controls which origins can access your APIs.\n\nKey settings:\n• Access-Control-Allow-Origin\n• Allow-Credentials\n• Allowed methods\n\nNeeds careful configuration for SPAs.",
    tips: '"Interview Tips / Pitfalls"\n* Wildcard + credentials = forbidden.',
    codeString: "Access-Control-Allow-Origin: https://app.com",
    output: "Secure controlled API access across origins.",
  },

  {
    id: 93,
    title: "Client-Side Encryption",
    category: "System Design (Security)",
    explanation:
      "Used in password managers, messaging apps.\nEncrypt data before sending to server.\nServer stores encrypted form.\n\nTechniques: WebCrypto API, RSA/ECDH.",
    tips: '"Interview Tips / Pitfalls"\n* Keys must not be in source code.\n* Use secure random generation.',
    codeString: "crypto.subtle.generateKey({ name:'AES-GCM', length:256 })",
    output: "Sensitive data secured before reaching backend.",
  },

  {
    id: 94,
    title: "CI/CD Pipelines for Front-End",
    category: "System Design (Deployment)",
    explanation:
      "Front-end deployments often use CI/CD workflows:\n• Build → test → lint → bundle → deploy\n• GitHub Actions, GitLab CI, Bitbucket\n• Parallel builds improve speed",
    tips: '"Interview Tips / Pitfalls"\n* Cache node_modules for faster builds.\n* Run lighthouse CI automatically.',
    codeString: "jobs: { build: { runs-on:'ubuntu-latest' } }",
    output: "Automated, reliable front-end deployments.",
  },

  {
    id: 95,
    title: "Zero-Downtime Deployments",
    category: "System Design (Deployment)",
    explanation:
      "Zero-downtime ensures users never see maintenance screens.\nMethods:\n• Blue-green deployments\n• Rolling deployments\n• Atomic builds (Netlify/Vercel)",
    tips: '"Interview Tips / Pitfalls"\n* Atomic deployments solve most FE downtime issues.',
    codeString: "// Vercel\nvercel deploy --prod",
    output: "Deployments switch instantly with zero user impact.",
  },

  {
    id: 96,
    title: "Canary Releases",
    category: "System Design (Deployment)",
    explanation:
      "Canary releases send a small % of traffic to the new version.\nMonitor for errors → gradually increase rollout.",
    tips: '"Interview Tips / Pitfalls"\n* Combine canary with feature flags.',
    codeString: "route: { percentage: 10, to:'v2' }",
    output: "Staged rollout reduces risk of breaking production.",
  },

  {
    id: 97,
    title: "Rollback Strategy",
    category: "System Design (Deployment)",
    explanation:
      "Rollback quickly restores last known good version.\nFE-specific strategies:\n• CDN version pinning\n• Keep old static builds\n• Rapid DNS reversion",
    tips: '"Interview Tips / Pitfalls"\n* Rollback must be instant and automated.',
    codeString: "remotes:{ cart:'cartApp@/v1/remoteEntry.js' }",
    output: "Immediate recovery from deployment failures.",
  },

  {
    id: 98,
    title: "Multi-Zone CDN Routing",
    category: "System Design (Deployment)",
    explanation:
      "CDN routing determines where static assets load from.\nUse:\n• Geo-routing\n• Edge caching\n• PoP-level failover",
    tips: '"Interview Tips / Pitfalls"\n* CDN misconfiguration causes latency spikes.',
    codeString: "// Cloudflare\ncacheEverything: true",
    output: "Assets load from the closest location globally.",
  },

  {
    id: 99,
    title: "Integrating Serverless Functions with FE",
    category: "System Design (Deployment)",
    explanation:
      "Serverless APIs pair perfectly with SPAs and edge-delivered UIs.\nAdvantages:\n• Auto-scaling\n• No servers to manage\n• Low latency at edge\n",
    tips: '"Interview Tips / Pitfalls"\n* Cold starts must be managed.\n* Good for light APIs, not long-running tasks.',
    codeString: "export const handler = async () => ({ statusCode:200 });",
    output: "Highly scalable APIs tightly coupled with UI deployments.",
  },

  {
    id: 100,
    title: "Release Versioning & Artifact Management",
    category: "System Design (Deployment)",
    explanation:
      "Front-end builds create artifacts (JS, CSS, HTML).\nUse semantic versioning + artifact registry.\nAllows:\n• Rollbacks\n• A/B testing\n• Multi-version support",
    tips: '"Interview Tips / Pitfalls"\n* Asset fingerprinting ensures cache busting.',
    codeString: "main.45f91c.js",
    output: "Stable, versioned deployments with safe rollback paths.",
  },
  {
    id: 101,
    title: "Scalable Dashboard Architecture (Analytics)",
    category: "Large-Scale UI Systems",
    explanation:
      "Dashboards show many data widgets and charts that must update frequently and remain performant. Key concerns:\n" +
      "• Data pipeline: push vs pull (WebSocket, SSE, polling)\n" +
      "• Aggregation & pre-computed metrics at the backend\n" +
      "• Client-side caching & TTL per widget\n" +
      "• Virtualized rendering for many widgets\n" +
      "• Auth / permission boundaries per widget\n" +
      "• Throttling and backpressure for high-frequency streams",
    tips: '"Interview Tips / Pitfalls"\n* Propose separating concerns: ingest -> compute -> serve (materialized views).\n* Use streaming for critical widgets and lower-frequency polling for others.\n* Mention sampling and downsampling for graphs.',
    codeString:
      "// Example: subscribe to widget stream\nconst socket = new WebSocket('/ws/widgets');\nsocket.onmessage = e => updateWidget(JSON.parse(e.data));",
    output:
      "Widgets update in near real-time while the UI remains responsive and memory usage stays bounded.",
  },

  {
    id: 102,
    title: "Infinite Scroll Feed (Instagram/Twitter-style)",
    category: "Large-Scale UI Systems",
    explanation:
      "Infinite feed requires smooth UX + efficient backend pagination:\n" +
      "• Cursor-based pagination for consistency\n" +
      "• Prefetch next page and rate-limit requests\n" +
      "• Client-side virtualization (buffering) to keep DOM small\n" +
      "• Deduplication and merge strategy for real-time inserts\n" +
      "• Offline placeholder & optimistic inserts (user posts)",
    tips: '"Interview Tips / Pitfalls"\n* Don\'t use offset for large datasets.\n* Describe how to merge new items at the top without jumping scroll position.\n* Mention memory leaks from detached DOM nodes.',
    codeString:
      "observer.observe(document.querySelector('#sentinel')); // IntersectionObserver triggers next page",
    output:
      "Smooth scrolling with constant memory footprint and consistent ordering.",
  },

  {
    id: 103,
    title: "Real-Time Collaborative Editor (Google Docs)",
    category: "Large-Scale UI Systems",
    explanation:
      "Core pieces:\n" +
      "• Operational Transform (OT) or CRDTs for conflict-free collaboration\n" +
      "• Presence & awareness (cursor positions)\n" +
      "• Real-time transport (WebSocket) + persistence\n" +
      "• Undo/redo semantics and history\n" +
      "• Offline editing + sync resolution\n" +
      "• Granular locking (optional) & access control",
    tips: '"Interview Tips / Pitfalls"\n* Explain tradeoffs: OT requires central server; CRDT allows decentralized merging.\n* Discuss garbage collection of tombstones in CRDTs and performance.',
    codeString:
      "// pseudo: apply remote operation\nsocket.on('op', op => doc.apply(op));",
    output:
      "Multiple users edit simultaneously with consistent final state and minimal conflict.",
  },

  {
    id: 104,
    title: "Video Streaming Platform UI (YouTube-like)",
    category: "Large-Scale UI Systems",
    explanation:
      "UI concerns for streaming:\n" +
      "• Adaptive bitrate UI hooks (show quality options)\n" +
      "• Player state machine (buffering/play/pause/seeking)\n" +
      "• Pre-roll/post-roll ad insertion UX\n" +
      "• Thumbnails, lazy loading, and preview scrubbing\n" +
      "• CDN + edge caching for video chunks (HLS/DASH)\n" +
      "• Analytics (view counts, watch time) with batching",
    tips: '"Interview Tips / Pitfalls"\n* Discuss how to minimize rebuffering and when to switch quality.\n* Mention how to handle seek-to-unavailable ranges gracefully.',
    codeString:
      "// player state example\nplayer.on('timeupdate', pos => renderScrubber(pos));",
    output: "Smooth playback with minimal stalls and responsive UI controls.",
  },

  {
    id: 105,
    title: "Chat Application UI (WhatsApp Web)",
    category: "Large-Scale UI Systems",
    explanation:
      "Key design points:\n" +
      "• WebSocket connection & automatic reconnection with exponential backoff\n" +
      "• Message ordering, delivery/read receipts\n" +
      "• Local persistence (IndexedDB) for message cache\n" +
      "• Image/file upload with resumable uploads\n" +
      "• Encryption UX (E2EE) considerations\n" +
      "• Notifications & presence handling",
    tips: '"Interview Tips / Pitfalls"\n* Show how to merge server history with local optimistic messages.\n* Describe chunked upload + resume tokens for large files.',
    codeString:
      "localDB.storeMessage({ id, text, status:'sending' });\nsend(message).then(() => updateStatus('sent'));",
    output: "Seamless chat UX with robust offline & reconnect behavior.",
  },

  {
    id: 106,
    title: "E-Commerce Product Listing Page (Amazon-style)",
    category: "Large-Scale UI Systems",
    explanation:
      "Concerns:\n" +
      "• Faceted search with server-side filtering & aggregation\n" +
      "• Fast initial render (SSR/SSG for SEO)\n" +
      "• Client-side caching of facets & results\n" +
      "• Pagination/cursors & image optimization\n" +
      "• A/B testing variations & personalization\n" +
      "• Stock & availability sync, pricing freshness",
    tips: '"Interview Tips / Pitfalls"\n* Talk about search & ranking latency tradeoffs.\n* Mention CDN caching for product images and cache invalidation for price changes.',
    codeString: "fetch('/api/search?q=phone&sort=pop').then(renderResults);",
    output:
      "Fast, SEO-friendly listing with real-time facets and low-latency interactions.",
  },

  {
    id: 107,
    title: "Notification System (Inbox / Toasts)",
    category: "Large-Scale UI Systems",
    explanation:
      "Notification system elements:\n" +
      "• Delivery (push via Web Push, WebSocket)\n" +
      "• Storage & dedupe (IndexedDB)\n" +
      "• Prioritization & batching\n" +
      "• Read/unread sync and cross-tab updates\n" +
      "• Rate-limiting to avoid spamming user",
    tips: '"Interview Tips / Pitfalls"\n* Discuss push subscription lifecycle & permissions UX.\n* Recommend sendBeacon for unload telemetry.',
    codeString:
      "navigator.serviceWorker.ready.then(reg => reg.showNotification('Title', { body:'Msg' }));",
    output:
      "Reliable user notifications with durable inbox and real-time toasts.",
  },

  {
    id: 108,
    title: "File Upload Manager (Drive/Dropbox-style)",
    category: "Large-Scale UI Systems",
    explanation:
      "Upload manager features:\n" +
      "• Chunked/resumable uploads (tus, multipart)\n" +
      "• Parallel uploads + concurrency limits\n" +
      "• Progress UI per file and overall\n" +
      "• Pause/resume & retry with backoff\n" +
      "• Virus scanning & metadata extraction server-side",
    tips: '"Interview Tips / Pitfalls"\n* Show how to implement content hashing for dedupe and resumability.\n* Address large file memory handling via streams.',
    codeString:
      "const uploader = new Uploader(file, { chunkSize: 5*1024*1024 });\nuploader.uploadChunk();",
    output:
      "Reliable resumable uploads with transparent UX for flaky networks.",
  },

  {
    id: 109,
    title: "Checkout Flow & Payment UX (Robustness & Security)",
    category: "Large-Scale UI Systems",
    explanation:
      "E-commerce checkout constraints:\n" +
      "• Tokenized payment flows (PCI compliance)\n" +
      "• Idempotent transactions and order locking\n" +
      "• Multi-step validation with optimistic steps\n" +
      "• Retry on network failure & canonical receipts\n" +
      "• UX: progress indicators, save-for-later, guest checkout",
    tips: '"Interview Tips / Pitfalls"\n* Stress idempotency keys for payment APIs.\n* Mention 3DS flows and iframe-based payment widgets.',
    codeString:
      "const idempotencyKey = uuid();\nfetch('/api/checkout', { method:'POST', headers:{ 'Idempotency-Key': idempotencyKey }});",
    output: "Secure, consistent checkout with clear failure/retry semantics.",
  },

  {
    id: 110,
    title: "Multi-Step Form & Wizard (Onboarding / Checkout)",
    category: "Large-Scale UI Systems",
    explanation:
      "Multi-step flows require:\n" +
      "• Local state per step + centralized orchestrator\n" +
      "• Validation & cross-step dependencies\n" +
      "• Save/restore (localStorage/IndexedDB) for mid-flow exits\n" +
      "• Accessibility & keyboard navigation\n" +
      "• Analytics for drop-off points",
    tips: "\"Interview Tips / Pitfalls\"\n* Use state machines (XState) for complex transitions.\n* Provide 'Save & Continue' and server-side checkpoints if long.",
    codeString:
      "const machine = { step1:{ on:{ NEXT:'step2' } }, step2:{ on:{ PREV:'step1' } } };",
    output:
      "Users can progress reliably with clear validation and resume support.",
  },

  {
    id: 111,
    title: "Dashboard Widget System (Drag, Resize, Persist)",
    category: "Large-Scale UI Systems",
    explanation:
      "Widget systems let users customize dashboards:\n" +
      "• Drag & drop with position persistence\n" +
      "• Resize & responsive constraints\n" +
      "• Load/unload widgets lazily\n" +
      "• Permission-based widget visibility\n" +
      "• Conflict resolution for concurrent layout edits",
    tips: '"Interview Tips / Pitfalls"\n* Use grid libraries (react-grid-layout) with virtualization for many widgets.\n* Persist layout as normalized entities with versioning.',
    codeString: "saveLayout({ widgets:[{ id:'w1', x:0, y:0, w:2, h:3 }] });",
    output:
      "Personalizable dashboards that persist across devices and sessions.",
  },

  {
    id: 112,
    title: "Search Autocomplete & Autosuggest System",
    category: "Large-Scale UI Systems",
    explanation:
      "Autosuggest needs low latency and relevance:\n" +
      "• Debounced client queries + local caches\n" +
      "• Typeahead suggestions & category buckets\n" +
      "• Highlighting matched tokens\n" +
      "• Offline/fallback suggestions from local index\n" +
      "• A/B testing ranking models",
    tips: '"Interview Tips / Pitfalls"\n* Use prefix trees or n-gram indexes for local fallback.\n* Keep suggestion payloads tiny and cacheable.',
    codeString:
      "const fetchSuggestions = debounce(q => fetch('/api/suggest?q='+q), 150);",
    output:
      "Instant suggestions with minimal server load and good UX on slow networks.",
  },

  {
    id: 113,
    title: "Modal & Overlay Manager (Stacking, Focus Trap)",
    category: "Large-Scale UI Systems",
    explanation:
      "Modal systems must handle multiple overlays:\n" +
      "• Stacking order and z-index management\n" +
      "• Focus trap & keyboard accessibility\n" +
      "• Escape/ backdrop click handling\n" +
      "• Prevent body scroll & restore on close\n",
    tips: '"Interview Tips / Pitfalls"\n* Always restore focus to the source element after close.\n* Ensure nested modals manage focus correctly.',
    codeString:
      "openModal(<Dialog />); // modal manager tracks z-index & focus",
    output: "Accessible overlay UX even with nested or concurrent modals.",
  },

  {
    id: 114,
    title: "A/B Testing & Feature Flags in UI",
    category: "Large-Scale UI Systems",
    explanation:
      "To release and evaluate features safely:\n" +
      "• Use feature flags for gradual rollouts\n" +
      "• Integrate A/B experiment tracking and analytics\n" +
      "• Keep flags remote-configurable and typed\n" +
      "• Provide kill-switch for regressions",
    tips: '"Interview Tips / Pitfalls"\n* Distinguish feature flags (release control) vs experiments (metrics-driven).',
    codeString:
      "if (featureFlags.isEnabled('newCheckout')) { showNewCheckout(); }",
    output: "Safe, measurable rollouts with instant rollback capability.",
  },

  {
    id: 115,
    title: "Client-side Analytics Pipeline & Batching",
    category: "Large-Scale UI Systems",
    explanation:
      "Analytics pipeline must be low-cost & resilient:\n" +
      "• Batch events and send on idle or periodic intervals\n" +
      "• Use sendBeacon for page unload events\n" +
      "• Respect user privacy & do PII scrubbing client-side\n" +
      "• Rate-limit to avoid quota overages",
    tips: '"Interview Tips / Pitfalls"\n* Explain tradeoffs of immediate vs batched events for near-real-time dashboards.',
    codeString: "queue.push(event); setTimeout(flushQueue, 5000);",
    output:
      "Efficient analytics delivery with minimal network overhead and privacy safeguards.",
  },

  {
    id: 116,
    title: "Search & Filter Architecture for Product Catalogs",
    category: "Large-Scale UI Systems",
    explanation:
      "Catalogs need faceted search & relevance:\n" +
      "• Use search engine (Elasticsearch/Opensearch) for aggregations\n" +
      "• Client-side caches for facet values\n" +
      "• Debounced queries and optimistic UI for filters\n" +
      "• Consistent URLs for shareable filters",
    tips: '"Interview Tips / Pitfalls"\n* Describe caching strategies for heavy aggregations.\n* Avoid client-side compute for large aggregations.',
    codeString: "fetch('/api/catalog?brand=xyz&sort=popularity').then(render);",
    output:
      "Fast, accurate filtered results with good UX and shareable states.",
  },

  {
    id: 117,
    title: "Server-Side Rendering at Scale for Product Pages",
    category: "Large-Scale UI Systems",
    explanation:
      "SSR for e-commerce product pages requires caching & invalidation:\n" +
      "• Per-product HTML caching at CDN edge\n" +
      "• Stale-while-revalidate for live pricing\n" +
      "• Cache purge on inventory or price change (webhook-driven)\n" +
      "• Partial hydration for interactive components",
    tips: '"Interview Tips / Pitfalls"\n* Talk about tradeoffs of dynamic pricing and caching windows.',
    codeString:
      "res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');",
    output:
      "Fast initial loads with reasonably fresh pricing and inventory info.",
  },

  {
    id: 118,
    title: "Resiliency Patterns: Circuit Breaker, Backoff, Offline Queue",
    category: "Large-Scale UI Systems",
    explanation:
      "Make UIs resilient to backend outages:\n" +
      "• Circuit breaker to stop repeated failing calls\n" +
      "• Exponential backoff + jitter\n" +
      "• Client-side queue to persist actions offline (sync later)\n",
    tips: '"Interview Tips / Pitfalls"\n* Mention UX for showing degraded mode and retry options.',
    codeString: "if (circuitOpen) { showFallback(); } else { callApi(); }",
    output:
      "Users continue to operate with graceful degradation during outages.",
  },

  {
    id: 119,
    title: "Data Privacy & PII Handling in UI",
    category: "Large-Scale UI Systems",
    explanation:
      "Front-end must avoid leaking PII:\n" +
      "• Mask deeply sensitive fields client-side\n" +
      "• Strip PII from event payloads\n" +
      "• Support user data deletion / export flows\n  • Local encryption for highly sensitive data",
    tips: '"Interview Tips / Pitfalls"\n* Follow GDPR/CCPA rules and mention consent UX for tracking.',
    codeString: "analytics.track('view', { userId: anonymize(user.id) });",
    output: "Compliant UI analytics and minimized privacy risk.",
  },

  {
    id: 120,
    title: "Observability for Large-Scale UIs (RUM, Logs, Metrics)",
    category: "Large-Scale UI Systems",
    explanation:
      "Observability includes:\n" +
      "• Real User Monitoring (RUM) for Web Vitals per user\n" +
      "• Client-side logs (batched, sent securely)\n" +
      "• Tracing user flows (performance timings)\n" +
      "• Error aggregation (Sentry) with context and breadcrumbs\n",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize sampling and PII sanitization before sending logs.\n* Correlate frontend metrics with backend traces for root-cause analysis.',
    codeString:
      "import { captureException } from 'sentry';\ncaptureException(new Error('UI crash'));",
    output:
      "Teams can quickly detect regressions and tie user issues to specific releases.",
  },

  {
    id: 121,
    title: "JavaScript Event Loop (Tasks vs Microtasks)",
    category: "Browser Internals",
    explanation:
      "The event loop manages execution order.\n\nQueue types:\n• **Macrotasks:** setTimeout, setInterval, I/O, rendering\n• **Microtasks:** Promises, queueMicrotask, MutationObserver\n\nOrder:\n1) Execute one macrotask\n2) Drain ALL microtasks\n3) Render if needed\n\nUnderstanding the loop is essential for async correctness.",
    tips: '"Interview Tips / Pitfalls"\n* Promise callbacks always run before setTimeout.\n* Microtask loops can starve rendering (infinite loop).',
    codeString:
      "setTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));",
    output: "promise\ntimeout",
  },

  {
    id: 122,
    title: "Rendering Pipeline (Layout → Paint → Composite)",
    category: "Browser Internals",
    explanation:
      "The browser pipeline:\n1. **Style Recalculation** (CSSOM updates)\n2. **Layout/Reflow** (compute positions, sizes)\n3. **Paint** (draw text, colors, borders)\n4. **Composite** (GPU merges layers)\n\nAnimations should avoid layout to remain smooth.",
    tips: '"Interview Tips / Pitfalls"\n* Only transform/opacity are composite-only animations.\n* Layout is expensive; avoid triggering mid-frame.',
    codeString: "element.style.transform = 'translateX(20px)';",
    output: "Smooth GPU animation without layout thrashing.",
  },

  {
    id: 123,
    title: "Layout Thrashing & Forced Synchronous Layout",
    category: "Browser Internals",
    explanation:
      "Layout thrashing happens when JS reads layout (offsetHeight) after writing layout (style changes).\nThis forces browser to flush layout immediately.\n\nAvoid mixing **read → write → read → write**.",
    tips: '"Interview Tips / Pitfalls"\n* Batch reads first, then writes.\n* Use requestAnimationFrame.',
    codeString:
      "const h = el.offsetHeight; // READ\nel.style.height = h + 10 + 'px'; // WRITE",
    output: "Reduced layout thrashing by batching DOM reads/writes.",
  },

  {
    id: 124,
    title: "Preload Scanner",
    category: "Browser Internals",
    explanation:
      "Browsers parse HTML quickly and run a parallel 'preload scanner' that discovers external resources early (CSS, JS, images) even before full parse.\n\nThis affects perceived load heavily.",
    tips: '"Interview Tips / Pitfalls"\n* Preload critical scripts for faster boot.\n* Misplaced script tags can block scanning.',
    codeString: "<link rel='preload' href='/critical.js' as='script' />",
    output: "JS loads earlier, improving initial render times.",
  },

  {
    id: 125,
    title: "GPU Compositing Layers",
    category: "Browser Internals",
    explanation:
      "Certain properties like transform/opacity promote elements to GPU compositing layers.\nThese layers can animate independently without triggering layout or paint.\n\nToo many layers increase memory cost.",
    tips: "\"Interview Tips / Pitfalls\"\n* Don't overuse 'will-change'.\n* Keep layers for interactive/animated content.",
    codeString: "div { will-change: transform; }",
    output: "Smooth 60fps animations using GPU acceleration.",
  },

  {
    id: 126,
    title: "Memory Leaks in Browser (Detached DOM, Timers, Closures)",
    category: "Browser Internals",
    explanation:
      "Common leak sources:\n• Detached DOM nodes (referenced but removed)\n• Unclear intervals/timeouts\n• Event listeners not removed\n• Large closures captured accidentally\n\nLeaks degrade long-running SPA performance.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Memory tab in DevTools.\n* Use WeakMap/WeakRef for ephemeral references.',
    codeString:
      "window.addEventListener('resize', handler); // remove on cleanup",
    output: "Stable memory usage over long sessions.",
  },

  {
    id: 127,
    title: "Garbage Collection (Mark-and-Sweep in V8)",
    category: "Browser Internals",
    explanation:
      "GC reclaims unused memory.\nV8 uses:\n• Mark-and-sweep\n• Generational GC (young/old space)\n• Incremental & concurrent marking\n\nLarge heaps → longer pause times.",
    tips: '"Interview Tips / Pitfalls"\n* Minimize object churn in hot loops.\n* Prefer object reuse for performance-critical paths.',
    codeString: "let cache = {}; // frequent recreation creates GC pressure",
    output: "Predictable GC behavior and smoother performance.",
  },

  {
    id: 128,
    title: "WebAssembly (WASM) Basics",
    category: "Browser Internals",
    explanation:
      "WASM runs compiled code (C/C++/Rust) at near-native speed.\nUse for:\n• Video processing\n• Image manipulation\n• Crypto\n• Heavy math\n\nWASM integrates with JS via linear memory.",
    tips: '"Interview Tips / Pitfalls"\n* WASM cannot directly access DOM; JS must bridge.\n* Best for compute-heavy, not UI-heavy tasks.',
    codeString: "WebAssembly.instantiateStreaming(fetch('/module.wasm'));",
    output: "Heavy algorithms offloaded to faster WASM execution.",
  },

  {
    id: 129,
    title: "Browser Sandbox & Site Isolation",
    category: "Browser Internals",
    explanation:
      "Browsers isolate pages for security.\nIncludes:\n• Site isolation (per-site processes)\n• Iframe sandbox attributes\n• Cross-origin isolation (COOP/COEP)\n\nReduces XSS/side-channel risks.",
    tips: '"Interview Tips / Pitfalls"\n* Required for SharedArrayBuffer.\n* Mention 3rd-party iFrame sandboxing.',
    codeString: "<iframe sandbox='allow-scripts'></iframe>",
    output: "Strong isolation prevents XSS lateral movement.",
  },

  {
    id: 130,
    title: "HTTP/2 & HTTP/3 Priority & Multiplexing",
    category: "Browser Internals",
    explanation:
      "Browsers prioritize fetching critical assets.\nHTTP/2 multiplexes many requests over one connection; HTTP/3 reduces handshake latency.\nBrowsers also prioritize:\n• Preloaded assets\n• Blocking CSS\n• Visible images",
    tips: '"Interview Tips / Pitfalls"\n* Avoid bundling massive vendor files; multiplexing loves smaller chunks.',
    codeString: "<link rel='preload' href='/main.css' as='style' />",
    output: "Faster parallel downloads and improved render speed.",
  },

  {
    id: 131,
    title: "JavaScript Engine Optimization (Hidden Classes & Inline Caches)",
    category: "Browser Internals",
    explanation:
      "V8 optimizes objects using hidden classes (shapes) and inline caches.\nPerformance drops if object shapes change frequently.\nAvoid adding properties dynamically.",
    tips: '"Interview Tips / Pitfalls"\n* Always initialize object fields in same order.\n* Avoid polymorphic call sites.',
    codeString:
      "function Point(x, y) { this.x = x; this.y = y; } // stable shape",
    output: "Predictable fast property access and JIT-optimized code.",
  },

  {
    id: 132,
    title: "DOM Cost & Large Trees",
    category: "Browser Internals",
    explanation:
      "Large DOM trees slow down:\n• Layout\n• Paint\n• Query selectors\n• Hit-testing\n\nKeep DOM flat & small. Avoid unnecessary wrapping divs.",
    tips: '"Interview Tips / Pitfalls"\n* Use virtualization for large lists.\n* Remove hidden nodes, not just hide with CSS.',
    codeString:
      "<div class='wrapper'><div class='wrapper2'><div class='wrapper3'>...</div></div></div>",
    output: "Higher FPS and faster layout recalculations.",
  },

  {
    id: 133,
    title: "Input & Interaction Latency",
    category: "Browser Internals",
    explanation:
      "Blocked main thread → delayed clicks & input events.\nCaused by:\n• Long tasks\n• Heavy JS execution\n• Synchronous layouts\n\nChrome highlights long tasks (>50ms).",
    tips: '"Interview Tips / Pitfalls"\n* Break tasks using requestIdleCallback.\n* Avoid hydration bottlenecks for forms.',
    codeString: "performance.observeLongTasks(() => console.log('slow!'));",
    output: "More responsive UI with lower input-to-response delay.",
  },

  {
    id: 134,
    title: "Browser Caching Layers (Memory, Disk, Preload Cache)",
    category: "Browser Internals",
    explanation:
      "Browser has multiple caches:\n• **Memory cache:** fastest, survives tab reload\n• **Disk cache:** slower, persistent\n• **Preload cache:** stored during preload scanning\n\nKnowing where your assets live impacts performance.",
    tips: '"Interview Tips / Pitfalls"\n* Memory cache invalidates often; disk cache persists longer.\n* Immutable caching for static assets is key.',
    codeString: "Cache-Control: immutable, max-age=31536000",
    output: "Static assets load instantly on repeat visits.",
  },

  {
    id: 135,
    title: "Paint Timing & Layout Shift (CLS)",
    category: "Browser Internals",
    explanation:
      "CLS measures layout jumpiness.\nCaused by:\n• Images without width/height\n• Dynamically inserted ads\n• Late-loading fonts & iframes\n\nUse size attributes and CSS aspect-ratio.",
    tips: '"Interview Tips / Pitfalls"\n* Preload fonts.\n* Reserve space for dynamic content.',
    codeString: "<img src='a.jpg' width='300' height='200' />",
    output: "Stable layout with zero unexpected movement.",
  },

  {
    id: 136,
    title: "Single Responsibility Principle (SRP) for Front-End",
    category: "LLD Principles",
    explanation:
      "SRP states: A class/module/component should have only **one reason to change**.\n\nIn front-end: A React component should:\n✔ handle only UI logic\n❌ not fetch data\n❌ not contain business logic\n❌ not contain routing logic.\n\nSplit responsibilities into smaller components and hooks.",
    tips: '"Interview Tips / Pitfalls"\n* Mention refactoring fat components.\n* Mention custom hooks for isolating logic.',
    codeString:
      "// ❌ Bad: UI + fetch + parsing mixed\nfunction Profile() {\n  const [user, setUser] = useState(null);\n  useEffect(() => fetch('/api').then(r => setUser(r.json())), []);\n  return <div>{user?.name}</div>;\n}\n\n// ✔ Good: separate logic\nfunction useUser() {\n  const [user, setUser] = useState(null);\n  useEffect(() => fetchUser().then(setUser), []);\n  return user;\n}",
    output: "Cleaner, testable components with single responsibility.",
  },

  {
    id: 137,
    title: "Open/Closed Principle (OCP) for UI Components",
    category: "LLD Principles",
    explanation:
      "Software should be **open for extension** but **closed for modification**.\n\nIn front-end: components should be extendable via props or composition, not by rewriting internals.",
    tips: '"Interview Tips / Pitfalls"\n* Prefer composition over conditional explosion inside components.',
    codeString:
      "// ✔ Good: extend via props\n<Button variant='primary' icon={<Plus />} />",
    output: "UI extensibility without rewriting core components.",
  },

  {
    id: 138,
    title: "Liskov Substitution Principle (LSP) in UI Logic",
    category: "LLD Principles",
    explanation:
      "Subclasses/variants should be replaceable without breaking expectations.\n\nIn UI terms: A component accepting props should not break when replacing a variant.",
    tips: '"Interview Tips / Pitfalls"\n* Keep prop contracts consistent across variants.',
    codeString:
      "// All variants must support same contract\nfunction Input({ value, onChange }) { ... }",
    output: "Predictable component variations.",
  },

  {
    id: 139,
    title: "Interface Segregation Principle (ISP)",
    category: "LLD Principles",
    explanation:
      "Clients should not depend on interfaces they do not use.\n\nFront-end variant: A component should not accept huge prop objects with unnecessary data.",
    tips: '"Interview Tips / Pitfalls"\n* Better use multiple smaller prop interfaces.',
    codeString:
      "// ❌ Bad\n<Button data={veryLargeObj} />\n\n// ✔ Good\n<Button label='Save' icon={<Save />} />",
    output: "Cleaner, minimal component APIs.",
  },

  {
    id: 140,
    title: "Dependency Inversion Principle (DIP) for FE",
    category: "LLD Principles",
    explanation:
      "High-level modules shouldn’t depend on low-level details.\n\nFront-end example: UI components depend on an API service interface, not concrete fetch calls.",
    tips: '"Interview Tips / Pitfalls"\n* Inject services (API, logger) through parameters/context.',
    codeString:
      "function UserProfile({ api }) {\n  useEffect(() => api.getUser(), [api]);\n}",
    output: "UI stays decoupled from network implementation.",
  },

  {
    id: 141,
    title: "DRY (Don’t Repeat Yourself)",
    category: "LLD Principles",
    explanation:
      "Avoid duplication of logic/UI.\nUse:\n• Custom hooks\n• Reusable components\n• Utility functions\n• TypeScript types\n\nDuplication multiplies bugs.",
    tips: '"Interview Tips / Pitfalls"\n* Over-DRY is harmful (too many abstractions).',
    codeString: "const useFetch = (url) => { /* reusable logic */ };",
    output: "Reduced redundancy and easier maintenance.",
  },

  {
    id: 142,
    title: "KISS (Keep It Simple, Stupid)",
    category: "LLD Principles",
    explanation:
      "Avoid unnecessary complexity.\nSimple, readable code wins.\nShorter components > mega-components.",
    tips: '"Interview Tips / Pitfalls"\n* Keep render logic short.\n* Avoid over-engineering.',
    codeString: "// ✔ Good: simple functions\nconst add = (a, b) => a + b;",
    output: "More maintainable front-end code.",
  },

  {
    id: 143,
    title: "YAGNI (You Aren’t Gonna Need It)",
    category: "LLD Principles",
    explanation:
      "Don’t add features, layers, architecture unless needed.\nAvoid premature abstractions.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid building unused custom hooks.\n* Wait until duplication appears twice before abstraction.',
    codeString:
      "// ❌ Bad: Premature\nfunction useFancyCacheWithRedis() {}\n\n// ✔ Simpler\nfunction useCache() {}",
    output: "Faster development without unnecessary complexity.",
  },

  {
    id: 144,
    title: "Separation of Concerns in Front-End",
    category: "LLD Principles",
    explanation:
      "Split responsibilities:\n✔ UI layer\n✔ State layer\n✔ Networking layer\n✔ Utils layer\n\nKeeps code modular.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid mixing UI + business logic in same file.',
    codeString: "api/userService.ts\ncomponents/UserCard.tsx\nhooks/useUser.ts",
    output: "Clean project architecture.",
  },

  {
    id: 145,
    title: "High Cohesion & Low Coupling",
    category: "LLD Principles",
    explanation:
      "High cohesion → related logic stays together.\nLow coupling → modules rely minimally on each other.",
    tips: '"Interview Tips / Pitfalls"\n* Highly coupled UI components are harder to test.',
    codeString:
      "// High cohesion: service does one job\nclass AuthService { login() {} logout() {} }",
    output: "Stable, testable modules.",
  },

  {
    id: 146,
    title: "Pure Functions",
    category: "LLD Principles",
    explanation:
      "Pure functions:\n✔ No side effects\n✔ Same output for same input\n\nEssential for predictable UI logic, reducers, utilities.",
    tips: '"Interview Tips / Pitfalls"\n* Pure reducers reduce bugs and enable time travel debugging.',
    codeString: "function add(a, b) { return a + b; }",
    output: "Predictable logic with fewer bugs.",
  },

  {
    id: 147,
    title: "Immutability in Front-End",
    category: "LLD Principles",
    explanation:
      "Front-end frameworks like React rely on immutability.\nModifying state directly breaks UI updates.",
    tips: '"Interview Tips / Pitfalls"\n* Always return new objects from reducers.',
    codeString:
      "// ❌ Bad\nstate.user.name = 'Jay';\n\n// ✔ Good\nreturn { ...state, user: { ...state.user, name: 'Jay' }};",
    output: "Correct re-renders and predictable state transitions.",
  },

  {
    id: 148,
    title: "Composition Over Inheritance",
    category: "LLD Principles",
    explanation:
      "React is built on the idea of composition.\nUse small components and compose them, rather than deep inheritance chains.",
    tips: '"Interview Tips / Pitfalls"\n* Mention reusable UI patterns via composition.',
    codeString: "<Card><Title /><Body /></Card>",
    output: "Flexible UI without inheritance complexity.",
  },

  {
    id: 149,
    title: "Functional Programming Principles in Front-End",
    category: "LLD Principles",
    explanation:
      "FP helps build predictable UI.\nKey concepts:\n• Pure functions\n• Higher-order functions\n• Function composition\n• Immutability\n• Declarative code",
    tips: '"Interview Tips / Pitfalls"\n* FP aligns with React hooks and reducers.',
    codeString:
      "const double = x => x * 2;\nconst square = x => x * x;\nconst composed = x => square(double(x));",
    output: "Reusable and testable UI logic.",
  },

  {
    id: 150,
    title: "Dependency Injection in JavaScript",
    category: "LLD Principles",
    explanation:
      "DI allows passing dependencies rather than hardcoding them.\nMakes components/services testable.",
    tips: '"Interview Tips / Pitfalls"\n* Use DI for API clients, loggers, feature flags.',
    codeString:
      "function createUserService(apiClient) {\n  return { getUser: () => apiClient.get('/user') };\n}",
    output: "Higher testability and flexibility in architecture.",
  },

  {
    id: 151,
    title: "Reusable Component API Design",
    category: "Component LLD",
    explanation:
      "A reusable component must expose a clean, minimal API.\nPrinciples:\n✔ Accept small prop surface\n✔ Avoid leaking internals\n✔ Prefer composition over boolean flags\n✔ Forward ref when needed\n\nGood API design ensures components scale.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid prop explosion.\n* Build components that do one thing well.',
    codeString:
      "// ✔ Good API\n<Input label='Email' value={email} onChange={setEmail} />",
    output: "Components are easier to reuse and maintain.",
  },

  {
    id: 152,
    title: "Controlled vs Uncontrolled Components",
    category: "Component LLD",
    explanation:
      "Controlled: value comes from React state → predictable.\nUncontrolled: value is in DOM (ref) → simpler for forms.\n\nUse controlled for validation-heavy forms. Use uncontrolled for simple inputs or high-performance scenarios.",
    tips: '"Interview Tips / Pitfalls"\n* Controlled re-renders can cause performance issues; debounce them.',
    codeString:
      "// Controlled\n<input value={value} onChange={e => setValue(e.target.value)} />",
    output: "Predictable form state with React control.",
  },

  {
    id: 153,
    title: "Component Composition Patterns",
    category: "Component LLD",
    explanation:
      "React favors composition:\n✔ Compound components\n✔ Render props\n✔ Slots (children API)\n\nComposition avoids massive prop lists.",
    tips: '"Interview Tips / Pitfalls"\n* Mention React ARIA & headless UI patterns.',
    codeString: "<Modal><Modal.Header /><Modal.Body /><Modal.Footer /></Modal>",
    output: "Flexible UI without bloated props.",
  },

  {
    id: 154,
    title: "Compound Component Pattern",
    category: "Component LLD",
    explanation:
      "Provides subcomponents under a parent component while sharing implicit state via context.",
    tips: '"Interview Tips / Pitfalls"\n* Great for menus, dropdowns, modals.',
    codeString: "Modal.Header = function Header() { ... };",
    output: "Reusable component families with implicit state.",
  },

  {
    id: 155,
    title: "Render Props Pattern",
    category: "Component LLD",
    explanation:
      "Allows passing a function as a child so the UI can be controlled externally.",
    tips: '"Interview Tips / Pitfalls"\n* Good for flexible UI and animations.',
    codeString: "<Mouse>{pos => <div>{pos.x},{pos.y}</div>}</Mouse>",
    output: "Reusable logic with customizable UI.",
  },

  {
    id: 156,
    title: "Custom Hooks Abstraction Pattern",
    category: "Component LLD",
    explanation:
      "Custom hooks extract non-UI logic from components.\nExamples:\n✔ useFetch\n✔ useModal\n✔ useDebounce\n\nHooks improve reuse and testability.",
    tips: '"Interview Tips / Pitfalls"\n* Always avoid conditional hook calls.',
    codeString:
      "function useToggle() { const [v,s] = useState(false); return [v, ()=>s(!v)]; }",
    output: "Components remain lean and focused.",
  },

  {
    id: 157,
    title: "Error Boundaries",
    category: "Component LLD",
    explanation:
      "Catch JavaScript errors in React component tree.\nImplemented using class components in React.",
    tips: '"Interview Tips / Pitfalls"\n* Cannot catch async or SSR errors.',
    codeString: "componentDidCatch(err) { this.setState({ hasError: true }); }",
    output: "Prevent crashes in the entire UI.",
  },

  {
    id: 158,
    title: "Fallback Components",
    category: "Component LLD",
    explanation:
      "Fallback UI for loading, errors, and empty states.\nEssential for robust UX.",
    tips: '"Interview Tips / Pitfalls"\n* Every async state: idle → loading → success → error.',
    codeString: "<Suspense fallback={<Spinner />}><Dashboard /></Suspense>",
    output: "Smooth UX with predictive fallbacks.",
  },

  {
    id: 159,
    title: "Form Architecture Patterns",
    category: "Component LLD",
    explanation:
      "Large forms require:\n✔ Validation layer (Yup/Zod)\n✔ Controlled/uncontrolled hybrid\n✔ Error summary component\n✔ Submit handler abstraction",
    tips: '"Interview Tips / Pitfalls"\n* Don\'t validate inside onChange; debounce it.',
    codeString: "const schema = z.object({ email: z.string().email() });",
    output: "Scalable forms with predictable validation.",
  },

  {
    id: 160,
    title: "Accessible Component Design (A11y LLD)",
    category: "Component LLD",
    explanation:
      "Accessible components follow ARIA and keyboard navigation rules.\nFocus on:\n• role attributes\n• aria-expanded\n• tabIndex\n• focus trap\n\nCritical for dropdowns, modals, menus.",
    tips: '"Interview Tips / Pitfalls"\n* Screen reader order matters.\n* Use semantic HTML first.',
    codeString: "<button aria-expanded={open}>Menu</button>",
    output: "Fully accessible interactive components.",
  },

  {
    id: 161,
    title: "Finite State Machines (FSM) in UI",
    category: "State Machines",
    explanation:
      "FSMs represent UI states explicitly.\nGood for:\n✔ forms\n✔ checkouts\n✔ login flows\n✔ async steps\n\nPrevents impossible states.",
    tips: '"Interview Tips / Pitfalls"\n* Highlight transitions graph.',
    codeString:
      "const machine = { idle: ['loading'], loading: ['success','error'] };",
    output: "Predictable state transitions.",
  },

  {
    id: 162,
    title: "Statecharts (Hierarchical State Machines)",
    category: "State Machines",
    explanation:
      "Statecharts extend FSMs with:\n• nested states\n• parallel states\n• entry/exit actions",
    tips: '"Interview Tips / Pitfalls"\n* Mention how XState implements them.',
    codeString: "{ auth: { loggedOut: {}, loggedIn: {} } }",
    output: "Complex flows modeled cleanly.",
  },

  {
    id: 163,
    title: "XState for Managing UI Logic",
    category: "State Machines",
    explanation:
      "XState implements full statecharts.\nSupports:\n✔ guards\n✔ services\n✔ parallel states\n✔ invocation",
    tips: '"Interview Tips / Pitfalls"\n* Mention how it prevents race conditions.',
    codeString:
      "createMachine({ id:'login', states:{ idle:{on:{SUBMIT:'loading'}} } })",
    output: "Declarative, type-safe UI state logic.",
  },

  {
    id: 164,
    title: "Preventing Impossible States",
    category: "State Machines",
    explanation:
      "UI bugs often come from states that shouldn't exist.\nExample: loading=true && error=true.\n\nSolutions:\n✔ Statecharts\n✔ Discriminated unions\n✔ Exhaustive switch handling",
    tips: '"Interview Tips / Pitfalls"\n* Use TypeScript to enforce states.',
    codeString:
      "type State = { status:'idle' } | { status:'loading' } | { status:'error', msg:string }",
    output: "Zero impossible states at runtime.",
  },

  {
    id: 165,
    title: "Multi-Step Flow Design (Checkout, Onboarding)",
    category: "State Machines",
    explanation:
      "Use explicit states:\nstep1 → step2 → step3\n\nKeep validation, transitions, and data persistence clear.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid deriving step via URL — keep it in state machine.',
    codeString: "const steps = ['cart','address','payment','review'];",
    output: "Predictable multi-step user flows.",
  },

  {
    id: 166,
    title: "Global Orchestrated State Machines",
    category: "State Machines",
    explanation:
      "For large apps, multiple FSMs interact (auth, notifications, forms, themes).\nUse orchestrators or XState actors.",
    tips: '"Interview Tips / Pitfalls"\n* Mention actor model in XState v5.',
    codeString: "parentMachine.invoke({ src: childMachine })",
    output: "Clean orchestration of complex UI logic.",
  },

  {
    id: 167,
    title: "UI Command Pattern (Undo/Redo)",
    category: "Component LLD",
    explanation:
      "Command pattern represents actions as objects.\nAllows:\n✔ undo\n✔ redo\n✔ history tracking\n✔ time travel",
    tips: '"Interview Tips / Pitfalls"\n* Great for editors, canvases.',
    codeString: "commands.push({ do(){}, undo(){} });",
    output: "Stable undo/redo stacks.",
  },

  {
    id: 168,
    title: "Smart vs Dumb Components (Container-Presentation Pattern)",
    category: "Component LLD",
    explanation:
      "Smart = stateful, data-fetching.\nDumb = purely UI.\n\nImproves separation of responsibilities.",
    tips: '"Interview Tips / Pitfalls"\n* Mention design systems rely on dumb components.',
    codeString: "<UserContainer><UserCard /></UserContainer>",
    output: "Reusability and testability increased.",
  },

  {
    id: 169,
    title: "Form State Machines (Error, Idle, Dirty, Submit)",
    category: "State Machines",
    explanation:
      "Forms naturally map to states:\nidle → dirty → validating → error/success.\n\nFSM prevents mixed states like 'submitting + pristine'.",
    tips: '"Interview Tips / Pitfalls"\n* Use in signup, payment flows.',
    codeString: "formState = { status:'validating', fields:{} }",
    output: "Predictable and bug-free forms.",
  },

  {
    id: 170,
    title: "API State Machine (Idle → Loading → Success → Error)",
    category: "State Machines",
    explanation:
      "Represent async API calls via states.\nEnsures UI shows correct loading/error transitions.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid mixing loading & error booleans separately.',
    codeString:
      "type ApiState = {status:'idle'} | {status:'loading'} | {status:'success', data:any} | {status:'error', msg:string}",
    output: "Consistent async UI with zero race conditions.",
  },

  {
    id: 171,
    title: "Observer Pattern (Event Emitter / Pub-Sub)",
    category: "LLD Patterns",
    explanation:
      "The Observer pattern allows objects to subscribe to events.\nCommon in FE:\n• EventEmitter\n• Custom event buses\n• BroadcastChannel API\n• State stores (Redux-like)\n\nUseful for decoupled communication.",
    tips: '"Interview Tips / Pitfalls"\n* Mention how React uses a version of this under the hood.',
    codeString:
      "class EventBus {\n  listeners = {};\n  on(event, fn) { (this.listeners[event] ||= []).push(fn); }\n  emit(event, data) { this.listeners[event]?.forEach(fn => fn(data)); }\n}",
    output: "Loosely-coupled event-driven components.",
  },

  {
    id: 172,
    title: "Strategy Pattern (Pluggable Algorithms)",
    category: "LLD Patterns",
    explanation:
      "Strategy pattern allows switching algorithms at runtime.\nExamples:\n• Sorting strategies\n• Filtering logic\n• Payment gateway switching UI\n",
    tips: '"Interview Tips / Pitfalls"\n* Use when business logic varies by mode.',
    codeString:
      "const strategies = {\n  price: products => products.sort((a,b)=>a.price-b.price),\n  rating: products => products.sort((a,b)=>b.rating-a.rating),\n};",
    output: "Dynamic behavior without condition explosion.",
  },

  {
    id: 173,
    title: "Factory Pattern (Component/Service Factories)",
    category: "LLD Patterns",
    explanation:
      "Creates objects without exposing creation logic.\nUsed for:\n• Theming components\n• Dynamic service creation\n• API clients",
    tips: '"Interview Tips / Pitfalls"\n* Mention dependency injection + extensibility.',
    codeString:
      "function createButton(theme) { return props => <button className={theme}>{props.label}</button>; }",
    output: "Composable component instantiation.",
  },

  {
    id: 174,
    title: "Singleton Pattern (Global Stores)",
    category: "LLD Patterns",
    explanation:
      "Ensures a class has only one instance.\nUsed in:\n• Global state stores\n• Logging services\n• Feature flag client",
    tips: '"Interview Tips / Pitfalls"\n* Mention it\'s common but should be used sparingly.',
    codeString:
      "class Store { static instance; static get() { return this.instance ??= new Store(); } }",
    output: "Global state shared safely across app.",
  },

  {
    id: 175,
    title: "Adapter Pattern (API Response Normalization)",
    category: "LLD Patterns",
    explanation:
      "Adapter translates incompatible API responses into UI-friendly formats.\nUse cases:\n• Third-party APIs\n• Legacy backend\n• Version migration",
    tips: '"Interview Tips / Pitfalls"\n* Mention it keeps UI independent of backend.',
    codeString:
      "function adaptUser(apiUser) { return { id: apiUser._id, name: apiUser.fullname }; }",
    output: "UI stays stable even when backend changes.",
  },

  {
    id: 176,
    title: "Facade Pattern (UI Service Layer)",
    category: "LLD Patterns",
    explanation:
      "Facade hides complex system behind a simple API.\nCommon for:\n• API services\n• Storage\n• Auth/logging",
    tips: '"Interview Tips / Pitfalls"\n* Use when multiple modules must be coordinated.',
    codeString:
      "export const UserService = { async get(){ return fetch('/user').then(r=>r.json()); } };",
    output: "Simplified access to complex systems.",
  },

  {
    id: 177,
    title: "Proxy Pattern (Virtualized Lists / Interceptors)",
    category: "LLD Patterns",
    explanation:
      "Proxy intercepts access to object/function.\nUses in FE:\n• Axios interceptors\n• API caching proxies\n• Virtual scrolling",
    tips: '"Interview Tips / Pitfalls"\n* Mention lazy loading objects/items.',
    codeString:
      "const handler = { get(obj, key){ console.log('Access', key); return obj[key]; } };",
    output: "Controlled access and lazy evaluation.",
  },

  {
    id: 178,
    title: "Command Pattern (Undo/Redo Architecture)",
    category: "LLD Patterns",
    explanation:
      "Represent actions as objects:\nundo, redo, replay.\nUsed in:\n• Photo editors\n• Drawing apps\n• Collaborative tools",
    tips: '"Interview Tips / Pitfalls"\n* Mention history stack & side-effect encapsulation.',
    codeString: "commands.push({ do(){}, undo(){} });",
    output: "Reliable state history management.",
  },

  {
    id: 179,
    title: "API Abstraction Layer",
    category: "Data Fetching LLD",
    explanation:
      "API abstraction hides fetch/axios specifics.\nBenefits:\n✔ Swap backend easily\n✔ Central error handling\n✔ Automatic retry\n✔ Logging & metrics",
    tips: '"Interview Tips / Pitfalls"\n* Avoid calling fetch directly in components.',
    codeString: "const api = { get:(url)=>fetch(url).then(r=>r.json()) };",
    output: "Loosely coupled networking layer.",
  },

  {
    id: 180,
    title: "Repository Pattern for Front-End",
    category: "Data Fetching LLD",
    explanation:
      "Repository abstracts data access (API, cache, persistence).\nReact Query + Repo is a powerful pattern.",
    tips: '"Interview Tips / Pitfalls"\n* UI never touches fetch/cache directly.',
    codeString: "class UserRepo { async get(){ return api.get('/users'); } }",
    output: "Consistent data access across app.",
  },

  {
    id: 181,
    title: "Service Layer Architecture",
    category: "Data Fetching LLD",
    explanation:
      "Service layer encodes business logic:\n• Data validation\n• Aggregation\n• Retry logic\n• Mapping API → UI",
    tips: '"Interview Tips / Pitfalls"\n* Keep services testable, pure when possible.',
    codeString:
      "export const UserService = { async getUser(){ const u = await UserRepo.get(); return adaptUser(u); } };",
    output: "Isolated business logic separate from UI.",
  },

  {
    id: 182,
    title: "Retry & Exponential Backoff",
    category: "Data Fetching LLD",
    explanation:
      "Retries must not overload server.\nUse exponential backoff + jitter.",
    tips: '"Interview Tips / Pitfalls"\n* Always cap retries.\n* Use AbortController for cancellation.',
    codeString: "await wait(2**attempt * 100 + randomJitter());",
    output: "Robust API calls on flaky networks.",
  },

  {
    id: 183,
    title: "Request Cancellation (AbortController)",
    category: "Data Fetching LLD",
    explanation:
      "AbortController cancels in-flight requests.\nAvoid race conditions and wasted work.",
    tips: '"Interview Tips / Pitfalls"\n* Use in search bars & autocomplete.',
    codeString:
      "const controller = new AbortController();\nfetch(url, { signal: controller.signal });\ncontroller.abort();",
    output: "No outdated responses overwriting fresh UI.",
  },

  {
    id: 184,
    title: "Debounce & Throttle (LLD Implementation)",
    category: "Data Fetching LLD",
    explanation:
      "Debounce: wait for inactivity.\nThrottle: allow 1 call per interval.\nUsed in search, scroll, resize, keypress.",
    tips: '"Interview Tips / Pitfalls"\n* Mention leading vs trailing options.',
    codeString:
      "function debounce(fn, delay){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args),delay); }; }",
    output: "Reduced unnecessary events and API calls.",
  },

  {
    id: 185,
    title: "LocalStorage Architecture (Caching Layer)",
    category: "Storage LLD",
    explanation:
      "Use LocalStorage for:\n• user prefs\n• UI settings\n• tokens (but avoid if possible)\n\nAlways JSON serialize and wrap access.",
    tips: '"Interview Tips / Pitfalls"\n* Never store sensitive tokens.',
    codeString: "localStorage.setItem('theme', 'dark');",
    output: "Persistent fast key-value storage.",
  },

  {
    id: 186,
    title: "IndexedDB Wrapper Pattern",
    category: "Storage LLD",
    explanation:
      "IndexedDB is asynchronous, powerful storage:\n• offline data\n• cached API responses\n• large blobs\n\nWrap it with a simple API.",
    tips: '"Interview Tips / Pitfalls"\n* Use idb-keyval wrapper for convenience.',
    codeString: "db.put('users', userData);",
    output: "Efficient offline caching with large storage.",
  },

  {
    id: 187,
    title: "Serialization & Deserialization",
    category: "Storage LLD",
    explanation:
      "Stored data must be serialized consistently.\nUse:\n✔ JSON\n✔ messagepack\n✔ custom encoders",
    tips: '"Interview Tips / Pitfalls"\n* Handle version migrations of stored data.',
    codeString: "localStorage.setItem('profile', JSON.stringify(profile));",
    output: "Data survives reloads reliably.",
  },

  {
    id: 188,
    title: "Centralized Error Handling System",
    category: "Error Handling LLD",
    explanation:
      "Centralize all API/UI errors:\n• global error boundary\n• toast system\n• logging service (Sentry)\n• retry UI patterns\n\nConsistent UX on failure.",
    tips: '"Interview Tips / Pitfalls"\n* Mention user-friendly error mapping.',
    codeString: "captureException(new Error('Network Failed'));",
    output: "Predictable error response across app.",
  },

  {
    id: 189,
    title: "Logging Adapter for Front-End",
    category: "Error Handling LLD",
    explanation:
      "Wrap logging providers (Sentry, Datadog) behind a common logging adapter.\nBenefits:\n✔ swap provider easily\n✔ consistent API",
    tips: '"Interview Tips / Pitfalls"\n* Avoid scattering Sentry calls everywhere.',
    codeString: "Logger.error('Something broke', { meta });",
    output: "Unified logging interface across codebase.",
  },

  {
    id: 190,
    title: "Feature Flag Architecture",
    category: "Error Handling LLD",
    explanation:
      "Feature flags control UI behavior dynamically.\nUse cases:\n• A/B tests\n• Dark launches\n• Canary rollouts\n\nFlags fetched via config server or remote provider.",
    tips: '"Interview Tips / Pitfalls"\n* Mention stale flag cache and hydration.',
    codeString: "if (flags.newUI) renderNewUI();",
    output: "Dynamic UI control without redeploys.",
  },
  {
    id: 191,
    title: "Router Architecture (Client-Side Routing)",
    category: "UI Infrastructure LLD",
    explanation:
      "Design a robust router that handles:\n" +
      "• Route matching (static + dynamic params)\n" +
      "• Nested routes & layouts\n" +
      "• Lazy-loaded route chunks\n" +
      "• Scroll restoration & scroll anchors\n" +
      "• SEO-friendly URLs (SSR/SSG integration)\n\nRouter is the orchestration layer for navigation and data loading.",
    tips: '"Interview Tips / Pitfalls"\n* Explain SSR vs CSR routing differences.\n* Consider route-based data fetching hooks (loader pattern).',
    codeString:
      "// Example (conceptual)\n<Router>\n  <Route path='/' element={<AppLayout />}>\n    <Route index element={<Home />} />\n    <Route path='product/:id' element={<Product />} />\n  </Route>\n</Router>",
    output: "Predictable navigation tree with lazy-loading and nested layouts.",
  },
  {
    id: 192,
    title: "Navigation Guards & Authorization",
    category: "UI Infrastructure LLD",
    explanation:
      "Navigation guards enforce access and preconditions before route transitions:\n• Auth checks (redirect to login)\n• Data prefetch / loader validation\n• Unsaved-changes confirmation\n• Role-based routing\n\nGuards can be global, per-route, or component-level.",
    tips: '"Interview Tips / Pitfalls"\n* Use cancellable loaders (AbortController) for guards that fetch data.\n* Keep guard logic declarative and testable.',
    codeString:
      "// Guard example\nrouter.beforeEach((to, from, next) => {\n  if (to.meta.requiresAuth && !auth.isLoggedIn()) next('/login');\n  else next();\n});",
    output: "Secure, smooth navigation with preconditions enforced.",
  },
  {
    id: 193,
    title: "Plugin / Extension Architecture",
    category: "UI Infrastructure LLD",
    explanation:
      "Plugin systems let third parties extend app behavior without editing core code.\nDesign elements:\n• Plugin registration lifecycle\n• Sandbox & permission model\n• Extension points/hooks\n• Version compatibility and capability negotiation",
    tips: '"Interview Tips / Pitfalls"\n* Expose a minimal, stable plugin API.\n* Use capability flags instead of deep coupling.',
    codeString:
      "app.registerPlugin({ id:'analytics', init: (ctx) => ctx.on('pageView', () => {}) });",
    output: "Extensible app surface enabling safe third-party integrations.",
  },
  {
    id: 194,
    title: "Internationalization (i18n) Design",
    category: "UI Infrastructure LLD",
    explanation:
      "i18n design covers:\n• Message catalogs (ICU / MessageFormat)\n• Dynamic locale loading\n• Date/number/currency formatting\n• Pluralization and RTL support\n• Locale-aware routing and SEO",
    tips: '"Interview Tips / Pitfalls"\n* Use structured keys and avoid concatenated text.\n* Fetch only required locale bundles to minimize bundle size.',
    codeString:
      "t('checkout.total', { count: items.length }); // ICU pluralization",
    output:
      "Accurate, performant multilingual UX with correct formatting and plural rules.",
  },
  {
    id: 195,
    title: "Modal & Window Manager Architecture",
    category: "UI Infrastructure LLD",
    explanation:
      "A central modal manager handles:\n• Stacking & z-index management\n• Focus traps & keyboard navigation\n• Portal rendering and accessibility\n• Animations & lifecycle hooks\n• Programmatic APIs (open/close/preset content)",
    tips: '"Interview Tips / Pitfalls"\n* Always restore focus to the trigger element.\n* Use portals to keep DOM structure clean.',
    codeString: "ModalManager.open({ component: LoginForm, props:{...} });",
    output:
      "Consistent modal behavior with accessibility and predictable stacking.",
  },
  {
    id: 196,
    title: "Toast / Notification Center Design",
    category: "UI Infrastructure LLD",
    explanation:
      "Notification center responsibilities:\n• Queue & dedupe messages\n• Priority & persistence (inbox vs ephemeral toast)\n• Cross-tab sync & delivery guarantees\n• Actionable notifications (undo, CTA)\n• Rate limiting & spam prevention",
    tips: '"Interview Tips / Pitfalls"\n* Separate UI toasts from durable notification inbox backed by IndexedDB.',
    codeString: "notify({ type:'success', text:'Saved', ttl:3000 });",
    output: "Clear user feedback with reliable delivery and deduping.",
  },
  {
    id: 197,
    title: "Internationalized Date / Number / Currency Handling",
    category: "UI Infrastructure LLD",
    explanation:
      "Use Intl API and server-side fallbacks:\n• Intl.DateTimeFormat, Intl.NumberFormat\n• Currency display per-locale\n• Time zone normalization for events\n\nAvoid rolling your own formatting logic.",
    tips: '"Interview Tips / Pitfalls"\n* Cache Intl formatters per-locale to avoid allocation overhead.',
    codeString:
      "new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR' }).format(1200);",
    output: "Locale-accurate presentation of numbers, dates, and money.",
  },
  {
    id: 198,
    title: "Designing a Tree-shakable Component Library",
    category: "Library / SDK Design",
    explanation:
      "Make libraries tree-shakable by:\n• Providing ESM entry points\n• Avoiding side-effectful modules\n• Splitting bundles into granular exports\n• Documenting per-component imports",
    tips: '"Interview Tips / Pitfalls"\n* Publish both ESM and CJS; mark sideEffects:false in package.json.',
    codeString: "// Good import\nimport { Button } from '@org/ui/button';",
    output:
      "Consumers only ship the components they use — smaller app bundles.",
  },
  {
    id: 199,
    title: "SDK / Public API Surface Design",
    category: "Library / SDK Design",
    explanation:
      "Design SDKs with:\n• Minimal, stable public API\n• Backwards-compatible changes (semver)\n• Clear async behavior and error shapes\n• Optional runtime configuration (init) and hooks\n• TypeScript types for consumers",
    tips: '"Interview Tips / Pitfalls"\n* Prefer explicit initialization over implicit global side effects.',
    codeString:
      "const client = createSdk({ apiKey: 'x' }); await client.track('event');",
    output:
      "Easy-to-consume SDKs with predictable behavior and clear upgrade paths.",
  },
  {
    id: 200,
    title: "Versioning & Backwards Compatibility for Libraries",
    category: "Library / SDK Design",
    explanation:
      "Maintain compatibility via:\n• Semantic versioning\n• Deprecation policy & migration guides\n• Feature flags for opt-in breaking changes\n• Major/minor release strategies and changelogs",
    tips: '"Interview Tips / Pitfalls"\n* Keep small breaking changes behind feature gates when possible.',
    codeString: '// package.json\n"version": "2.0.0"',
    output: "Predictable upgrades and reduced consumer breakage.",
  },
  {
    id: 201,
    title: "Type-Safe Public APIs (TypeScript First)",
    category: "Library / SDK Design",
    explanation:
      "Ship types with your package and design APIs for developer DX:\n• Strong types for inputs/outputs\n• Narrow union types for flags\n• Overloaded signatures only when necessary",
    tips: "\"Interview Tips / Pitfalls\"\n* Use exported types for consumers to build on top.\n* Avoid 'any' in public signatures.",
    codeString:
      "export type User = { id: string; name: string }; export function fetchUser(id:string): Promise<User>;",
    output: "Consumers get compile-time guarantees and better autocompletion.",
  },
  {
    id: 202,
    title: "Unit Testing Strategy (Jest / Vitest)",
    category: "Testing LLD",
    explanation:
      "Unit tests validate pure logic and small functions:\n• Fast, isolated tests\n• Mock external dependencies\n• Focus on edge cases and invariants\n• Run in CI with coverage thresholds",
    tips: '"Interview Tips / Pitfalls"\n* Keep unit tests deterministic and fast (<50ms each ideally).',
    codeString: "test('adds', () => expect(add(1,2)).toBe(3));",
    output: "Confident low-level correctness with fast feedback loops.",
  },
  {
    id: 203,
    title: "Component Testing (React Testing Library)",
    category: "Testing LLD",
    explanation:
      "Component tests exercise UI behavior from user's perspective:\n• Render component in virtual DOM\n• Interact via queries (getByText, click)\n• Assert accessibility & visual state\n• Avoid implementation details",
    tips: '"Interview Tips / Pitfalls"\n* Prefer queries that reflect user interactions (getByRole) over class-based selectors.',
    codeString:
      "render(<Login />); fireEvent.change(email, { target:{ value:'a@b' } }); fireEvent.click(btn);",
    output:
      "Reliable UI tests that catch regressions without brittle coupling.",
  },
  {
    id: 204,
    title: "Integration Tests & Contract Tests (UI ↔ API)",
    category: "Testing LLD",
    explanation:
      "Integration tests validate end-to-end flows across layers. Contract tests ensure both sides agree on API shapes:\n• Pact or consumer-driven contracts\n• Mock server responses for UI tests\n• CI gate to prevent breaking API changes",
    tips: '"Interview Tips / Pitfalls"\n* Run contract tests in CI before production deploys.',
    codeString:
      "// Pact consumer test: verifies provider will honor contract\nconsumer.addInteraction({ request:{...}, response:{...} });",
    output: "Early detection of contract drift and safer deployments.",
  },
  {
    id: 205,
    title: "End-to-End Testing (Cypress / Playwright)",
    category: "Testing LLD",
    explanation:
      "E2E tests validate full user flows in a real browser environment:\n• Login, payments, critical checkout flows\n• Use network stubbing for determinism\n• Keep E2E suite focused & fast (smoke tests in CI)",
    tips: '"Interview Tips / Pitfalls"\n* Avoid brittle selectors; prefer data-testids or roles.',
    codeString:
      "await page.goto('/'); await page.click('[data-testid=login]');",
    output:
      "Confidence that key user journeys work in production-like environments.",
  },
  {
    id: 206,
    title: "Mock Services & Factories for Tests",
    category: "Testing LLD",
    explanation:
      "Create deterministic test doubles:\n• Mock API responses (msw)\n• Factory functions for test data\n• In-memory databases for integration tests\n\nAvoid flakiness by controlling external factors.",
    tips: '"Interview Tips / Pitfalls"\n* Use msw (Mock Service Worker) for network-level mocks in browser tests.',
    codeString:
      "server.use(rest.get('/api/user', (req, res, ctx) => res(ctx.json({ id:1 }))));",
    output:
      "Stable tests with predictable data and easily generated scenarios.",
  },
  {
    id: 207,
    title: "Testable Component Patterns",
    category: "Testing LLD",
    explanation:
      "Design components for testability:\n• Small, focused components\n• Accept dependencies via props (DI)\n• Avoid internal timers or side-effects—expose hooks\n• Use deterministic IDs or data-test attributes",
    tips: '"Interview Tips / Pitfalls"\n* Ensure components can be rendered in isolation (no implicit global assumptions).',
    codeString: "<UserCard testId='user-123' user={user} />",
    output: "Fast, maintainable tests that mirror real usage.",
  },
  {
    id: 208,
    title: "Visual Regression Testing (Chromatic / Percy)",
    category: "Testing LLD",
    explanation:
      "Visual tests catch unintended UI changes by comparing snapshots across commits:\n• Use storybook stories as test cases\n• Baseline and threshold management for diffs\n• Integrate with CI for PR gating",
    tips: '"Interview Tips / Pitfalls"\n* Keep storybook stories minimal and deterministic.',
    codeString: "// CI step pseudo\nrun visual-diff && approve-if-small",
    output: "UI regressions detected early in the pull-request lifecycle.",
  },
  {
    id: 209,
    title: "CI Pipeline for Tests & Quality Gates",
    category: "Testing LLD",
    explanation:
      "Quality gates in CI should run:\n• Lint & type checks\n• Unit & component tests (parallelized)\n• E2E smoke tests (sharded)\n• Coverage and performance budgets\n• Visual & contract tests (optional async steps)",
    tips: '"Interview Tips / Pitfalls"\n* Cache test dependencies and run tests in parallel to speed up feedback.',
    codeString:
      "jobs: { test: { runs-on:'ubuntu-latest', steps:[{run:'pnpm test'}] } }",
    output: "Fast, reliable CI that prevents regressions before merge.",
  },
  {
    id: 210,
    title: "Observability & Test Telemetry (Test Flakiness Tracking)",
    category: "Testing LLD",
    explanation:
      "Track test reliability and failures over time:\n• Flakiness dashboards\n• Rerun heuristics for flaky tests\n• Record CI artifacts & videos for E2E failures\n• Correlate test failures with recent code/dep changes",
    tips: '"Interview Tips / Pitfalls"\n* Invest early in flakiness detection to keep test suite healthy.',
    codeString:
      "// example: upload test artifacts on failure\nif(test.failed) uploadArtifacts(recordingPath);",
    output:
      "Healthy test suite with actionable failure insights and low maintenance overhead.",
  },
];

// src/data.js

const phases = [
  {
    title: "Phase 1: The Foundation",
    subtitle: "Arrays, Pointers & Sliding Windows",
    id: "p1",
  },
  {
    title: "Phase 2: Core Structures",
    subtitle: "Trees, Heaps & Linked Lists",
    id: "p2",
  },
  {
    title: "Phase 3: Advanced Search",
    subtitle: "Binary Search, Subsets & Math",
    id: "p3",
  },
  {
    title: "Phase 4: Dynamic Programming",
    subtitle: "Knapsack, Palindromes & Strings",
    id: "p4",
  },
  {
    title: "Phase 5: Expert Graph Theory",
    subtitle: "Topological Sort, Union Find & Tries",
    id: "p5",
  },
];

const patterns = [
  {
    id: 1,
    phase: "p1",
    name: "Sliding Window",
    desc: "Used to perform a required operation on a specific window size of a given array or linked list, such as finding the longest subarray containing all 1s.",
    strategy:
      "Use 'start' and 'end' pointers. Expand 'end' until condition breaks, then shrink 'start'.",
    anchor: {
      logic:
        "let windowSum = 0, start = 0;\nfor (let end = 0; end < arr.length; end++) {\n  windowSum += arr[end];\n  while (windowSum > target) {\n    windowSum -= arr[start];\n    start++;\n  }\n  // Update Result Here\n}",
    },
    problems: [
      "Max Sum Subarray of Size K",
      "Smallest Subarray with a given sum",
      "Longest Substring with K Distinct Characters",
      "Fruits into Baskets",
      "Longest Substring Without Repeating Characters",
      "Longest Repeating Character Replacement",
      "Max Consecutive Ones III",
      "Permutation in String",
      "Minimum Window Substring",
      "Substring with Concatenation of All Words",
    ],
  },
  {
    id: 2,
    phase: "p1",
    name: "Two Pointers",
    desc: "Used in sorted arrays or linked lists to find a set of elements that fulfill a certain constraint.",
    strategy:
      "Initialize two pointers (usually Left=0, Right=N-1). Move them based on comparison results.",
    anchor: {
      logic:
        "let left = 0, right = arr.length - 1;\nwhile (left < right) {\n  const sum = arr[left] + arr[right];\n  if (sum === target) return [left, right];\n  else if (sum < target) left++;\n  else right--;\n}",
    },
    problems: [
      "Pair with Target Sum",
      "Remove Duplicates from Sorted Array",
      "Squaring a Sorted Array",
      "3Sum",
      "3Sum Closest",
      "3Sum Smaller",
      "Subarrays with Product Less than a Target",
      "Dutch National Flag Problem",
      "Trapping Rain Water",
      "Container With Most Water",
    ],
  },
  {
    id: 3,
    phase: "p1",
    name: "Fast & Slow Pointers",
    desc: "Also known as the Hare & Tortoise algorithm. Used for cycle detection in linked lists or arrays.",
    strategy:
      "Move 'fast' pointer 2 steps and 'slow' pointer 1 step. If they meet, there is a cycle.",
    anchor: {
      logic:
        "let slow = head, fast = head;\nwhile (fast !== null && fast.next !== null) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow === fast) return true; // Cycle found\n}\nreturn false;",
    },
    problems: [
      "Linked List Cycle",
      "Middle of the Linked List",
      "Start of Linked List Cycle",
      "Happy Number",
      "Palindrome Linked List",
      "Reorder List",
      "Circular Array Loop",
      "Find the Duplicate Number",
      "Linked List Cycle II",
      "Remove Nth Node From End of List",
    ],
  },
  {
    id: 4,
    phase: "p1",
    name: "Merge Intervals",
    desc: "Used to deal with overlapping intervals. Efficient for scheduling or time-range problems.",
    strategy:
      "Sort intervals by start time. Iterate and merge if 'current.start' <= 'previous.end'.",
    anchor: {
      logic:
        "intervals.sort((a, b) => a[0] - b[0]);\nconst merged = [intervals[0]];\nfor (let i = 1; i < intervals.length; i++) {\n  const prev = merged[merged.length - 1];\n  const curr = intervals[i];\n  if (curr[0] <= prev[1]) {\n    prev[1] = Math.max(prev[1], curr[1]);\n  } else {\n    merged.push(curr);\n  }\n}",
    },
    problems: [
      "Merge Intervals",
      "Insert Interval",
      "Intervals Intersection",
      "Conflicting Appointments",
      "Meeting Rooms II",
      "Minimum Number of Arrows to Burst Balloons",
      "Non-overlapping Intervals",
      "Employee Free Time",
      "Maximum CPU Load",
      "Partition Labels",
    ],
  },
  {
    id: 5,
    phase: "p1",
    name: "Cyclic Sort",
    desc: "Used when dealing with numbers in a given range (e.g., 1 to N) to find duplicates or missing numbers.",
    strategy:
      "Iterate array. If nums[i] is not at correct index (nums[i]-1), swap it to correct spot.",
    anchor: {
      logic:
        "let i = 0;\nwhile (i < nums.length) {\n  const j = nums[i] - 1;\n  if (nums[i] !== nums[j]) {\n    [nums[i], nums[j]] = [nums[j], nums[i]]; // Swap\n  } else {\n    i++;\n  }\n}",
    },
    problems: [
      "Missing Number",
      "Find All Numbers Disappeared in an Array",
      "Find the Duplicate Number",
      "Find All Duplicates in an Array",
      "Set Mismatch",
      "First Missing Positive",
      "Couples Holding Hands",
      "Find the Smallest Missing Positive Number",
      "Random Pick with Blacklist",
      "Minimize Deviation in Array",
    ],
  },
  {
    id: 6,
    phase: "p2",
    name: "List Reversal",
    desc: "Used to reverse a Linked List in-place, either completely or within a specific range.",
    strategy:
      "Use three pointers: 'prev', 'curr', and 'next'. Rotate pointers as you iterate.",
    anchor: {
      logic:
        "let prev = null, curr = head;\nwhile (curr !== null) {\n  let nextTemp = curr.next;\n  curr.next = prev;\n  prev = curr;\n  curr = nextTemp;\n}\nreturn prev;",
    },
    problems: [
      "Reverse Linked List",
      "Reverse Linked List II",
      "Reverse Nodes in k-Group",
      "Rotate List",
      "Swap Nodes in Pairs",
      "Odd Even Linked List",
      "Palindrome Linked List",
      "Swapping Nodes in a Linked List",
      "Reverse Alternating K-element Sub-list",
      "Remove Duplicates from Sorted List II",
    ],
  },
  {
    id: 7,
    phase: "p2",
    name: "Tree BFS",
    desc: "Breadth-First Search. Used to traverse a tree level-by-level.",
    strategy:
      "Use a Queue. Loop while queue is not empty. Process 'levelSize' nodes at a time.",
    anchor: {
      logic:
        "const queue = [root];\nwhile (queue.length > 0) {\n  const levelSize = queue.length;\n  const currentLevel = [];\n  for (let i = 0; i < levelSize; i++) {\n    const node = queue.shift();\n    currentLevel.push(node.val);\n    if (node.left) queue.push(node.left);\n    if (node.right) queue.push(node.right);\n  }\n  result.push(currentLevel);\n}",
    },
    problems: [
      "Binary Tree Level Order Traversal",
      "Binary Tree Zigzag Level Order Traversal",
      "Average of Levels in Binary Tree",
      "Minimum Depth of Binary Tree",
      "Binary Tree Level Order Traversal II",
      "Populating Next Right Pointers in Each Node",
      "Right View of Binary Tree",
      "Vertical Order Traversal of a Binary Tree",
      "Serialize and Deserialize Binary Tree",
      "N-ary Tree Level Order Traversal",
    ],
  },
  {
    id: 8,
    phase: "p2",
    name: "Tree DFS",
    desc: "Depth-First Search. Used to traverse a tree by going as deep as possible before backtracking.",
    strategy:
      "Use Recursion (or a Stack). Process Node, then recursively call DFS on children.",
    anchor: {
      logic:
        "function dfs(node, currentPath) {\n  if (!node) return;\n  currentPath.push(node.val);\n  if (!node.left && !node.right) {\n    // Leaf node logic here\n  }\n  dfs(node.left, currentPath);\n  dfs(node.right, currentPath);\n  currentPath.pop(); // Backtrack\n}",
    },
    problems: [
      "Path Sum",
      "Path Sum II",
      "Path Sum III",
      "Sum Root to Leaf Numbers",
      "Diameter of Binary Tree",
      "Binary Tree Maximum Path Sum",
      "Lowest Common Ancestor of a Binary Tree",
      "Validate Binary Search Tree",
      "Flatten Binary Tree to Linked List",
      "Construct Binary Tree from Preorder and Inorder",
    ],
  },
  {
    id: 9,
    phase: "p2",
    name: "Two Heaps",
    desc: "Used to find the median of a number stream or other min/max related problems efficiently.",
    strategy:
      "Maintain a MinHeap (for the larger half) and a MaxHeap (for the smaller half) of numbers.",
    anchor: {
      logic:
        "// Insert\nif (num <= maxHeap.peek()) maxHeap.push(num);\nelse minHeap.push(num);\n\n// Balance\nif (maxHeap.size > minHeap.size + 1) \n  minHeap.push(maxHeap.pop());\nelse if (maxHeap.size < minHeap.size)\n  maxHeap.push(minHeap.pop());",
    },
    problems: [
      "Find Median from Data Stream",
      "Sliding Window Median",
      "IPO",
      "Find Right Interval",
      "Kth Largest Element in a Stream",
      "Process Tasks Using Servers",
      "Minimum Cost to Hire K Workers",
      "Reorganize String",
      "Task Scheduler",
      "Seat Reservation Manager",
    ],
  },
  {
    id: 10,
    phase: "p2",
    name: "Subsets",
    desc: "Used to handle permutations and combinations using Breadth-First Search (BFS) approach.",
    strategy:
      "Start with an empty set. For each number, add it to all existing subsets to create new ones.",
    anchor: {
      logic:
        "const subsets = [[]];\nfor (const currentNumber of nums) {\n  const n = subsets.length;\n  for (let i = 0; i < n; i++) {\n    const set = [...subsets[i]];\n    set.push(currentNumber);\n    subsets.push(set);\n  }\n}",
    },
    problems: [
      "Subsets",
      "Subsets II",
      "Permutations",
      "Permutations II",
      "Combinations",
      "Combination Sum",
      "Combination Sum II",
      "Letter Combinations of a Phone Number",
      "Palindrome Partitioning",
      "Beautiful Arrangement",
    ],
  },
  {
    id: 11,
    phase: "p3",
    name: "Binary Search",
    desc: "Used to find a target in a sorted array in O(log N) time.",
    strategy:
      "Calculate 'mid'. If target < mid, search left. If target > mid, search right.",
    anchor: {
      logic:
        "let left = 0, right = arr.length - 1;\nwhile (left <= right) {\n  const mid = Math.floor(left + (right - left) / 2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] < target) left = mid + 1;\n  else right = mid - 1;\n}",
    },
    problems: [
      "Binary Search",
      "Search Insert Position",
      "Search in Rotated Sorted Array",
      "Search in Rotated Sorted Array II",
      "Find Minimum in Rotated Sorted Array",
      "Find Peak Element",
      "Search in a Sorted Array of Unknown Size",
      "Find First and Last Position of Element",
      "Capacity To Ship Packages Within D Days",
      "Split Array Largest Sum",
    ],
  },
  {
    id: 12,
    phase: "p3",
    name: "Bitwise XOR",
    desc: "Used to manipulate bits to find unique numbers or missing numbers efficiently.",
    strategy: "XOR of a number with itself is 0. XOR with 0 is the number.",
    anchor: {
      logic:
        "let result = 0;\nfor (const num of nums) {\n  result ^= num;\n}\nreturn result; // Returns the unique number",
    },
    problems: [
      "Single Number",
      "Single Number II",
      "Single Number III",
      "Missing Number",
      "Find the Difference",
      "Sum of Two Integers",
      "Reverse Bits",
      "Counting Bits",
      "Hamming Distance",
      "Total Hamming Distance",
    ],
  },
  {
    id: 13,
    phase: "p3",
    name: "Top K Elements",
    desc: "Used to find the top/smallest/frequent 'K' elements in a dataset.",
    strategy:
      "Use a MinHeap (size K) to find 'K' largest. Use MaxHeap to find 'K' smallest.",
    anchor: {
      logic:
        "for (const num of nums) {\n  minHeap.push(num);\n  if (minHeap.size() > k) {\n    minHeap.pop();\n  }\n}\nreturn minHeap.toArray();",
    },
    problems: [
      "Kth Largest Element in an Array",
      "Top K Frequent Elements",
      "K Closest Points to Origin",
      "Sort Characters By Frequency",
      "Kth Largest Element in a Stream",
      "Reorganize String",
      "Least Number of Unique Integers after K Removals",
      "Top K Frequent Words",
      "Find K Closest Elements",
      "Maximum Frequency Stack",
    ],
  },
  {
    id: 14,
    phase: "p3",
    name: "K-way Merge",
    desc: "Used to merge 'K' sorted lists/arrays.",
    strategy:
      "Insert the first element of each list into a MinHeap. Extract min, push next element from that list.",
    anchor: {
      logic:
        "minHeap.push({ val: list[0], listIndex: i, elementIndex: 0 });\nwhile (!minHeap.isEmpty()) {\n  const { val, listIdx, elIdx } = minHeap.pop();\n  result.push(val);\n  if (hasNext(listIdx)) {\n    minHeap.push(nextElement(listIdx));\n  }\n}",
    },
    problems: [
      "Merge K Sorted Lists",
      "Kth Smallest Element in a Sorted Matrix",
      "Find K Pairs with Smallest Sums",
      "Smallest Range Covering Elements from K Lists",
      "Merge Sorted Array",
      "Kth Smallest Number in Multiplication Table",
      "Ugly Number II",
      "Super Ugly Number",
      "Find Median from Data Stream",
      "Swim in Rising Water",
    ],
  },
  {
    id: 15,
    phase: "p4",
    name: "0/1 Knapsack",
    desc: "Dynamic Programming pattern where items can be selected (1) or not (0).",
    strategy:
      "Use a 2D DP array. dp[i][c] = max(profit excluding item, profit including item).",
    anchor: {
      logic:
        "for (let i = 1; i < n; i++) {\n  for (let c = 1; c <= capacity; c++) {\n    let profit1 = 0, profit2 = 0;\n    if (weights[i] <= c) \n      profit1 = profits[i] + dp[i-1][c-weights[i]];\n    profit2 = dp[i-1][c];\n    dp[i][c] = Math.max(profit1, profit2);\n  }\n}",
    },
    problems: [
      "Partition Equal Subset Sum",
      "Target Sum",
      "Last Stone Weight II",
      "Ones and Zeroes",
      "Profitable Schemes",
      "Coin Change 2",
      "Combination Sum IV",
      "House Robber",
      "Solving Questions With Brainpower",
      "Shopping Offers",
    ],
  },
  {
    id: 16,
    phase: "p4",
    name: "Unbounded Knapsack",
    desc: "Knapsack variation where items can be selected unlimited times.",
    strategy:
      "Similar to 0/1, but if we include an item, we can consider it again (index doesn't increment).",
    anchor: {
      logic:
        "// 1D array optimization\nfor (let i = 0; i < n; i++) {\n  for (let c = 1; c <= capacity; c++) {\n    if (weights[i] <= c) {\n       dp[c] = Math.max(dp[c], dp[c - weights[i]] + profits[i]);\n    }\n  }\n}",
    },
    problems: [
      "Coin Change",
      "Coin Change II",
      "Unbounded Knapsack",
      "Rod Cutting",
      "Integer Break",
      "Perfect Squares",
      "Minimum Cost For Tickets",
      "Decode Ways",
      "Word Break",
      "Combination Sum IV",
    ],
  },
  {
    id: 17,
    phase: "p4",
    name: "Fibonacci Sequence",
    desc: "Basic DP pattern where the current state depends on previous states.",
    strategy:
      "dp[i] = dp[i-1] + dp[i-2]. Optimize space by using just two variables.",
    anchor: {
      logic:
        "if (n < 2) return n;\nlet n1 = 0, n2 = 1, temp;\nfor (let i = 2; i <= n; i++) {\n  temp = n1 + n2;\n  n1 = n2;\n  n2 = temp;\n}\nreturn n2;",
    },
    problems: [
      "Fibonacci Number",
      "Climbing Stairs",
      "Min Cost Climbing Stairs",
      "House Robber",
      "House Robber II",
      "N-th Tribonacci Number",
      "Delete and Earn",
      "Jump Game",
      "Jump Game II",
      "Maximum Subarray",
    ],
  },
  {
    id: 18,
    phase: "p4",
    name: "Palindromic Subsequence",
    desc: "Used for problems involving palindromes within strings.",
    strategy:
      "If s[i] == s[j], length is 2 + dp[i+1][j-1]. Otherwise max(dp[i+1][j], dp[i][j-1]).",
    anchor: {
      logic:
        "if (s[startIndex] === s[endIndex]) {\n  dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1];\n} else {\n  dp[startIndex][endIndex] = Math.max(\n    dp[startIndex + 1][endIndex],\n    dp[startIndex][endIndex - 1]\n  );\n}",
    },
    problems: [
      "Longest Palindromic Substring",
      "Longest Palindromic Subsequence",
      "Palindromic Substrings",
      "Palindrome Partitioning",
      "Palindrome Partitioning II",
      "Minimum Insertion Steps to Make a String Palindrome",
      "Valid Palindrome III",
      "Longest Common Subsequence",
      "Shortest Palindrome",
      "Count Different Palindromic Subsequences",
    ],
  },
  {
    id: 19,
    phase: "p4",
    name: "Longest Common Subsequence",
    desc: "Find the longest subsequence present in two sequences.",
    strategy: "2D DP. If chars match, diagonal + 1. If not, max(top, left).",
    anchor: {
      logic:
        "if (s1[i] === s2[j]) {\n  dp[i][j] = 1 + dp[i-1][j-1];\n} else {\n  dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n}",
    },
    problems: [
      "Longest Common Subsequence",
      "Longest Common Substring",
      "Edit Distance",
      "Distinct Subsequences",
      "Minimum ASCII Delete Sum for Two Strings",
      "Delete Operation for Two Strings",
      "Shortest Common Supersequence",
      "Interleaving String",
      "Uncrossed Lines",
      "Max Dot Product of Two Subsequences",
    ],
  },
  {
    id: 20,
    phase: "p5",
    name: "Topological Sort",
    desc: "Used for scheduling tasks with dependencies (DAGs).",
    strategy:
      "Build Graph & Indegree. Push 0-indegree nodes to Queue. Process queue and decrement neighbors.",
    anchor: {
      logic:
        "const queue = [];\nfor (let i = 0; i < n; i++) {\n  if (inDegree[i] === 0) queue.push(i);\n}\nwhile (queue.length) {\n  const u = queue.shift();\n  order.push(u);\n  graph[u].forEach(v => {\n    inDegree[v]--;\n    if (inDegree[v] === 0) queue.push(v);\n  });\n}",
    },
    problems: [
      "Course Schedule",
      "Course Schedule II",
      "Alien Dictionary",
      "Sequence Reconstruction",
      "Parallel Courses",
      "Minimum Height Trees",
      "Longest Increasing Path in a Matrix",
      "Sort Items by Groups Respecting Dependencies",
      "Find All Possible Recipes from Given Supplies",
      "Build a Matrix With Conditions",
    ],
  },
  {
    id: 21,
    phase: "p5",
    name: "Union Find",
    desc: "Disjoint Set Union (DSU). Efficiently handles connectivity and merging sets.",
    strategy:
      "Use 'parent' array. 'Find' with path compression. 'Union' by rank/size.",
    anchor: {
      logic:
        "function find(x) {\n  if (parent[x] !== x) {\n    parent[x] = find(parent[x]); // Path compression\n  }\n  return parent[x];\n}\nfunction union(x, y) {\n  const rootX = find(x);\n  const rootY = find(y);\n  if (rootX !== rootY) parent[rootX] = rootY;\n}",
    },
    problems: [
      "Number of Provinces",
      "Redundant Connection",
      "Accounts Merge",
      "Number of Operations to Make Network Connected",
      "Most Stones Removed with Same Row or Column",
      "Longest Consecutive Sequence",
      "Graph Valid Tree",
      "Number of Islands II",
      "Satisfiability of Equality Equations",
      "Checking Existence of Edge Length Limited Paths",
    ],
  },
  {
    id: 22,
    phase: "p5",
    name: "Trie",
    desc: "Prefix Tree. Used for string search, autocomplete, and spell checkers.",
    strategy:
      "Tree where edges represent characters. Root to node path represents prefix.",
    anchor: {
      logic:
        "let node = this.root;\nfor (const char of word) {\n  if (!node.children[char]) {\n    node.children[char] = new TrieNode();\n  }\n  node = node.children[char];\n}\nnode.isEndOfWord = true;",
    },
    problems: [
      "Implement Trie (Prefix Tree)",
      "Design Add and Search Words Data Structure",
      "Word Search II",
      "Replace Words",
      "Map Sum Pairs",
      "Maximum XOR of Two Numbers in an Array",
      "Search Suggestions System",
      "Stream of Characters",
      "Longest Word in Dictionary",
      "Camelcase Matching",
    ],
  },
  {
    id: 23,
    phase: "p5",
    name: "Monotonic Stack",
    desc: "Used to find Next Greater Element or Previous Smaller Element.",
    strategy:
      "Keep stack sorted. Pop elements that violate the order before pushing new element.",
    anchor: {
      logic:
        "const stack = [];\nfor (let i = 0; i < nums.length; i++) {\n  while (stack.length && nums[i] > stack[stack.length - 1]) {\n    const popped = stack.pop();\n    // Logic for popped element\n  }\n  stack.push(nums[i]);\n}",
    },
    problems: [
      "Next Greater Element I",
      "Next Greater Element II",
      "Daily Temperatures",
      "Largest Rectangle in Histogram",
      "Maximal Rectangle",
      "Online Stock Span",
      "Trapping Rain Water",
      "Sum of Subarray Minimums",
      "Remove K Digits",
      "132 Pattern",
    ],
  },
  {
    id: 24,
    phase: "p5",
    name: "Matrix Traversal",
    desc: "DFS/BFS on 2D grids (Islands, Mazes).",
    strategy:
      "Traverse up, down, left, right. Mark visited cells to avoid cycles.",
    anchor: {
      logic:
        "function dfs(r, c) {\n  if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;\n  grid[r][c] = '0'; // Mark visited\n  dfs(r+1, c); dfs(r-1, c);\n  dfs(r, c+1); dfs(r, c-1);\n}",
    },
    problems: [
      "Number of Islands",
      "Max Area of Island",
      "Flood Fill",
      "Rotting Oranges",
      "Surrounded Regions",
      "Pacific Atlantic Water Flow",
      "Shortest Path in Binary Matrix",
      "01 Matrix",
      "As Far from Land as Possible",
      "Making A Large Island",
    ],
  },
  {
    id: 25,
    phase: "p5",
    name: "Backtracking",
    desc: "Brute force approach to find all solutions. Explore paths and backtrack if invalid.",
    strategy:
      "Place item, recursive call, check validity. If valid keep going, else remove item (backtrack).",
    anchor: {
      logic:
        "function backtrack(path) {\n  if (goalReached) { res.push([...path]); return; }\n  for (let i = 0; i < choices.length; i++) {\n    path.push(choices[i]);\n    backtrack(path);\n    path.pop(); // Backtrack\n  }\n}",
    },
    problems: [
      "N-Queens",
      "N-Queens II",
      "Sudoku Solver",
      "Word Search",
      "Generate Parentheses",
      "Letter Tile Possibilities",
      "Restore IP Addresses",
      "Split String Into Max Unique Substrings",
      "Minesweeper",
      "Robot Room Cleaner",
    ],
  },
];

const problemsDB = {
  // Sliding Window
  "Max Sum Subarray of Size K": {
    difficulty: "Easy",
    desc: "Find max sum of any contiguous subarray of size k.",
    examples: [{ input: "[2,1,5,1,3,2], k=3", output: "9" }],
    constraints: ["k > 0"],
    starterCode: `function solve(k, nums) {
  return 0;
}`,
    solution: `function solve(k, nums) {
  let maxS = 0, wSum = 0, start = 0;
  for (let end = 0; end < nums.length; end++) {
    wSum += nums[end];
    if (end >= k - 1) {
      maxS = Math.max(maxS, wSum);
      wSum -= nums[start++];
    }
  }
  return maxS;
}`,
    interviewQs: [
      { q: "What if array has negatives?", a: "Initialize maxS = -Infinity." },
    ],
  },

  "Smallest Subarray with a given sum": {
    difficulty: "Medium",
    desc: "Find the length of the smallest subarray whose sum ≥ target.",
    examples: [{ input: "[2,1,5,2,3,2], target=7", output: "2" }],
    constraints: ["Sum may exceed integer limits"],
    starterCode: `function solve(target, nums) {
  return 0;
}`,
    solution: `function solve(target, nums) {
  let minLen = Infinity, sum = 0, start = 0;
  for (let end = 0; end < nums.length; end++) {
    sum += nums[end];
    while (sum >= target) {
      minLen = Math.min(minLen, end - start + 1);
      sum -= nums[start++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`,
    interviewQs: [{ q: "Edge: no subarray?", a: "Return 0." }],
  },

  "Longest Substring with K Distinct Characters": {
    difficulty: "Medium",
    desc: "Find longest substring with at most K distinct characters.",
    examples: [{ input: "string=araaci, k=2", output: "4" }],
    constraints: ["String contains only lowercase letters"],
    starterCode: `function solve(k, str) {
  return 0;
}`,
    solution: `function solve(k, str) {
  let map = {}, start = 0, maxLen = 0;
  for (let end = 0; end < str.length; end++) {
    map[str[end]] = (map[str[end]] || 0) + 1;
    while (Object.keys(map).length > k) {
      map[str[start]]--;
      if (map[str[start]] === 0) delete map[str[start]];
      start++;
    }
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
    interviewQs: [
      { q: "What if k=0?", a: "Answer becomes 0 (no characters allowed)." },
    ],
  },

  "Fruits into Baskets": {
    difficulty: "Medium",
    desc: "Same as longest substring with at most 2 distinct characters.",
    examples: [{ input: "[1,2,1]", output: "3" }],
    constraints: ["Fruit types are integers"],
    starterCode: `function solve(fruits) {
  return 0;
}`,
    solution: `function solve(fruits) {
  let map = {}, start = 0, maxLen = 0;
  for (let end = 0; end < fruits.length; end++) {
    map[fruits[end]] = (map[fruits[end]] || 0) + 1;
    while (Object.keys(map).length > 2) {
      map[fruits[start]]--;
      if (map[fruits[start]] === 0) delete map[fruits[start]];
      start++;
    }
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
    interviewQs: [{ q: "Why 2 baskets only?", a: "Problem’s constraint." }],
  },

  "Longest Substring Without Repeating Characters": {
    difficulty: "Medium",
    desc: "Find longest substring with no repeated characters.",
    examples: [{ input: "abcabcbb", output: "3" }],
    constraints: ["All ASCII characters allowed"],
    starterCode: `function solve(str) {
  return 0;
}`,
    solution: `function solve(str) {
  let map = {}, start = 0, maxLen = 0;
  for (let end = 0; end < str.length; end++) {
    let ch = str[end];
    if (map[ch] >= start) start = map[ch] + 1;
    map[ch] = end;
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
    interviewQs: [
      { q: "Why map stores index?", a: "To skip directly past the repeat." },
    ],
  },

  "Longest Repeating Character Replacement": {
    difficulty: "Hard",
    desc: "Longest substring where you can replace ≤ k characters to make all equal.",
    examples: [{ input: "AABABBA, k=1", output: "4" }],
    constraints: ["Uppercase A–Z"],
    starterCode: `function solve(str, k) {
  return 0;
}`,
    solution: `function solve(str, k) {
  let map = {}, start = 0, maxFreq = 0, maxLen = 0;

  for (let end = 0; end < str.length; end++) {
    let ch = str[end];
    map[ch] = (map[ch] || 0) + 1;
    maxFreq = Math.max(maxFreq, map[ch]);

    while (end - start + 1 - maxFreq > k) {
      map[str[start]]--;
      start++;
    }
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
    interviewQs: [
      { q: "Why track maxFreq?", a: "Determines minimum replacements needed." },
    ],
  },

  "Max Consecutive Ones III": {
    difficulty: "Medium",
    desc: "Longest subarray containing ones with at most k zero-flips.",
    examples: [{ input: "[1,1,1,0,0,0,1,1,1,1], k=2", output: "6" }],
    constraints: ["Binary array"],
    starterCode: `function solve(nums, k) {
  return 0;
}`,
    solution: `function solve(nums, k) {
  let start = 0, zeros = 0, maxLen = 0;

  for (let end = 0; end < nums.length; end++) {
    if (nums[end] === 0) zeros++;

    while (zeros > k) {
      if (nums[start] === 0) zeros--;
      start++;
    }
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
    interviewQs: [{ q: "What if k=0?", a: "Count longest streak of 1s." }],
  },

  "Permutation in String": {
    difficulty: "Medium",
    desc: "Check if any permutation of s1 exists as substring in s2.",
    examples: [{ input: "s1=ab, s2=eidbaooo", output: "true" }],
    constraints: ["Lowercase English letters"],
    starterCode: `function solve(s1, s2) {
  return false;
}`,
    solution: `function solve(s1, s2) {
  if (s1.length > s2.length) return false;

  let map = Array(26).fill(0);
  for (let ch of s1) map[ch.charCodeAt(0) - 97]++;

  let start = 0, count = s1.length;

  for (let end = 0; end < s2.length; end++) {
    let idx = s2[end].charCodeAt(0) - 97;
    if (map[idx] > 0) count--;
    map[idx]--;

    if (count === 0) return true;

    if (end >= s1.length - 1) {
      let leftIdx = s2[start].charCodeAt(0) - 97;
      if (map[leftIdx] >= 0) count++;
      map[leftIdx]++;
      start++;
    }
  }
  return false;
}`,
    interviewQs: [
      { q: "Why 26 array?", a: "Constant memory for lowercase letters." },
    ],
  },

  "Minimum Window Substring": {
    difficulty: "Hard",
    desc: "Find the smallest substring of s containing all chars of t.",
    examples: [{ input: "s=ADOBECODEBANC, t=ABC", output: "BANC" }],
    constraints: ["Upper/lowercase allowed"],
    starterCode: `function solve(s, t) {
  return "";
}`,
    solution: `function solve(s, t) {
  let need = {}, missing = t.length;

  for (let ch of t) need[ch] = (need[ch] || 0) + 1;

  let start = 0, left = 0, right = 0, minLen = Infinity;

  for (let end = 0; end < s.length; end++) {
    if (need[s[end]] > 0) missing--;
    need[s[end]] = (need[s[end]] || 0) - 1;

    while (missing === 0) {
      if (end - start + 1 < minLen) {
        minLen = end - start + 1;
        left = start;
        right = end + 1;
      }
      need[s[start]]++;
      if (need[s[start]] > 0) missing++;
      start++;
    }
  }
  return minLen === Infinity ? "" : s.slice(left, right);
}`,
    interviewQs: [
      { q: "Why missing counter?", a: "Tracks when window is valid." },
    ],
  },

  "Substring with Concatenation of All Words": {
    difficulty: "Hard",
    desc: "Find all starting indices where substring contains all words concatenated.",
    examples: [
      { input: "s=barfoothefoobarman, words=[foo,bar]", output: "[0,9]" },
    ],
    constraints: ["All words same length"],
    starterCode: `function solve(s, words) {
  return [];
}`,
    solution: `function solve(s, words) {
  if (!words.length) return [];
  let wLen = words[0].length, totalLen = wLen * words.length;
  let res = [];

  let freq = {};
  for (let w of words) freq[w] = (freq[w] || 0) + 1;

  for (let i = 0; i < wLen; i++) {
    let start = i, count = 0, seen = {};

    for (let end = i; end <= s.length - wLen; end += wLen) {
      let word = s.substring(end, end + wLen);

      if (freq[word]) {
        seen[word] = (seen[word] || 0) + 1;
        count++;

        while (seen[word] > freq[word]) {
          let leftWord = s.substring(start, start + wLen);
          seen[leftWord]--;
          start += wLen;
          count--;
        }

        if (count === words.length) {
          res.push(start);
          let leftWord = s.substring(start, start + wLen);
          seen[leftWord]--;
          start += wLen;
          count--;
        }
      } else {
        seen = {};
        count = 0;
        start = end + wLen;
      }
    }
  }
  return res;
}`,
    interviewQs: [
      { q: "Why sliding in steps of word length?", a: "Ensures alignment." },
    ],
  },

  // Two Pointer
  "Pair with Target Sum": {
    difficulty: "Easy",
    desc: "Return indices of the two numbers such that they add up to the target.",
    examples: [{ input: "[1,2,3,4,6], target=6", output: "[1,3]" }],
    constraints: ["Sorted array"],
    starterCode: `function solve(nums, target) {
  return [];
}`,
    solution: `function solve(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    sum < target ? left++ : right--;
  }
  return [];
}`,
    interviewQs: [
      { q: "What if unsorted?", a: "Use hashmap instead of two pointers." },
    ],
  },

  "Remove Duplicates from Sorted Array": {
    difficulty: "Easy",
    desc: "Remove duplicates in-place and return new length.",
    examples: [{ input: "[2,3,3,3,6,9,9]", output: "4" }],
    constraints: ["Sorted array, modify in-place"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let next = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[next] = nums[i];
      next++;
    }
  }
  return next;
}`,
    interviewQs: [{ q: "Time Complexity?", a: "O(n)" }],
  },

  "Squaring a Sorted Array": {
    difficulty: "Easy",
    desc: "Return sorted squares of sorted array.",
    examples: [{ input: "[-2,-1,0,2,3]", output: "[0,1,4,4,9]" }],
    constraints: ["Sorted input"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let n = nums.length;
  let res = new Array(n);
  let left = 0, right = n - 1, i = n - 1;

  while (left <= right) {
    let L = nums[left] * nums[left];
    let R = nums[right] * nums[right];
    if (L > R) {
      res[i--] = L;
      left++;
    } else {
      res[i--] = R;
      right--;
    }
  }
  return res;
}`,
    interviewQs: [
      { q: "Why two pointers?", a: "Largest squares are at ends." },
    ],
  },

  "3Sum": {
    difficulty: "Medium",
    desc: "Find all unique triplets that sum to zero.",
    examples: [{ input: "[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }],
    constraints: ["Avoid duplicates"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  nums.sort((a,b)=>a-b);
  let res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        left++; right--;
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return res;
}`,
    interviewQs: [{ q: "Why sort first?", a: "To skip duplicates easily." }],
  },

  "3Sum Closest": {
    difficulty: "Medium",
    desc: "Find three numbers whose sum is closest to target.",
    examples: [{ input: "nums=[-1,2,1,-4], target=1", output: "2" }],
    constraints: ["Sorted required before two-pointer"],
    starterCode: `function solve(nums, target) {
  return 0;
}`,
    solution: `function solve(nums, target) {
  nums.sort((a,b)=>a-b);
  let closest = Infinity;

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1, right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }
      sum < target ? left++ : right--;
    }
  }
  return closest;
}`,
    interviewQs: [{ q: "Can brute force work?", a: "Yes, but O(n³)." }],
  },

  "3Sum Smaller": {
    difficulty: "Medium",
    desc: "Count triplets with sum < target.",
    examples: [{ input: "[-1,0,2,3], target=3", output: "2" }],
    constraints: ["Sorted array"],
    starterCode: `function solve(nums, target) {
  return 0;
}`,
    solution: `function solve(nums, target) {
  nums.sort((a,b)=>a-b);
  let count = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1, right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum < target) {
        count += right - left;
        left++;
      } else right--;
    }
  }
  return count;
}`,
    interviewQs: [
      { q: "Why add right-left?", a: "All pairs between left-right valid." },
    ],
  },

  "Subarrays with Product Less than a Target": {
    difficulty: "Medium",
    desc: "Count subarrays with product < target.",
    examples: [{ input: "[10,5,2,6], target=100", output: "8" }],
    constraints: ["Positive integers only"],
    starterCode: `function solve(nums, target) {
  return 0;
}`,
    solution: `function solve(nums, target) {
  if (target <= 1) return 0;

  let prod = 1, start = 0, count = 0;

  for (let end = 0; end < nums.length; end++) {
    prod *= nums[end];

    while (prod >= target) {
      prod /= nums[start++];
    }
    count += end - start + 1;
  }
  return count;
}`,
    interviewQs: [
      {
        q: "Why can't nums contain 0 or negatives?",
        a: "Product logic breaks.",
      },
    ],
  },

  "Dutch National Flag Problem": {
    difficulty: "Easy",
    desc: "Sort an array of 0s, 1s, and 2s in-place.",
    examples: [{ input: "[2,0,2,1,1,0]", output: "[0,1,1,2,2,2]" }],
    constraints: ["Only 0,1,2 allowed"],
    starterCode: `function solve(nums) {
  return nums;
}`,
    solution: `function solve(nums) {
  let low = 0, mid = 0, high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}`,
    interviewQs: [
      { q: "Why not counting sort?", a: "This is in-place with O(1) space." },
    ],
  },

  "Trapping Rain Water": {
    difficulty: "Hard",
    desc: "Compute how much water can be trapped between bars.",
    examples: [{ input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    constraints: ["Non-negative heights"],
    starterCode: `function solve(height) {
  return 0;
}`,
    solution: `function solve(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, res = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else res += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else res += rightMax - height[right];
      right--;
    }
  }
  return res;
}`,
    interviewQs: [
      { q: "Why two pointers?", a: "Water depends on smaller side." },
    ],
  },

  "Container With Most Water": {
    difficulty: "Medium",
    desc: "Find two lines forming container that holds max water.",
    examples: [{ input: "[1,8,6,2,5,4,8,3,7]", output: "49" }],
    constraints: ["Heights are non-negative"],
    starterCode: `function solve(height) {
  return 0;
}`,
    solution: `function solve(height) {
  let left = 0, right = height.length - 1, max = 0;

  while (left < right) {
    let area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);

    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}`,
    interviewQs: [{ q: "Why not brute force?", a: "O(n²) too slow vs O(n)." }],
  },

  //Fast & Slow Pointers

  "Linked List Cycle": {
    difficulty: "Easy",
    desc: "Determine whether a linked list has a cycle.",
    examples: [{ input: "1 → 2 → 3 → 4 → 2 (cycle)", output: "true" }],
    constraints: ["O(1) extra space required"],
    starterCode: `function solve(head) {
  return false;
}`,
    solution: `function solve(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    interviewQs: [
      {
        q: "Why use two pointers?",
        a: "Fast pointer laps slow, proving cycle.",
      },
    ],
  },

  "Middle of the Linked List": {
    difficulty: "Easy",
    desc: "Return the middle node of a linked list.",
    examples: [{ input: "[1,2,3,4,5]", output: "3" }],
    constraints: ["Return second middle if even count"],
    starterCode: `function solve(head) {
  return head;
}`,
    solution: `function solve(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
    interviewQs: [
      {
        q: "Why fast moves 2 steps?",
        a: "Slow reaches middle when fast hits end.",
      },
    ],
  },

  "Start of Linked List Cycle": {
    difficulty: "Medium",
    desc: "Find the node where the cycle begins.",
    examples: [
      { input: "Cycle starting at node with value=2", output: "Node(2)" },
    ],
    constraints: ["Cycle guaranteed or null"],
    starterCode: `function solve(head) {
  return null;
}`,
    solution: `function solve(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (!fast || !fast.next) return null;

  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}`,
    interviewQs: [
      {
        q: "Why reset slow to head?",
        a: "Distance logic ensures meeting at cycle start.",
      },
    ],
  },

  "Happy Number": {
    difficulty: "Easy",
    desc: "Determine if number eventually reaches 1 by replacing it with sum of square of digits.",
    examples: [{ input: "19", output: "true" }],
    constraints: ["Detect cycle in number transformations"],
    starterCode: `function solve(n) {
  return false;
}`,
    solution: `function solve(n) {
  function sqSum(num) {
    let s = 0;
    while (num > 0) {
      let d = num % 10;
      s += d * d;
      num = Math.floor(num / 10);
    }
    return s;
  }

  let slow = n, fast = sqSum(n);
  while (fast !== 1 && slow !== fast) {
    slow = sqSum(slow);
    fast = sqSum(sqSum(fast));
  }
  return fast === 1;
}`,
    interviewQs: [
      { q: "Why fast = f(f(n))?", a: "Same cycle detection as linked list." },
    ],
  },

  "Palindrome Linked List": {
    difficulty: "Medium",
    desc: "Check if a linked list is a palindrome.",
    examples: [{ input: "[1,2,2,1]", output: "true" }],
    constraints: ["O(1) space by reversing second half"],
    starterCode: `function solve(head) {
  return false;
}`,
    solution: `function solve(head) {
  let slow = head, fast = head;

  // Find middle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  function reverse(node) {
    let prev = null;
    while (node) {
      let next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return prev;
  }

  let second = reverse(slow);
  let first = head;

  while (second) {
    if (first.val !== second.val) return false;
    first = first.next;
    second = second.next;
  }
  return true;
}`,
    interviewQs: [
      {
        q: "Why reverse second half?",
        a: "Allows comparing halves in O(1) space.",
      },
    ],
  },

  "Reorder List": {
    difficulty: "Medium",
    desc: "Reorder list as L0 → Ln → L1 → Ln-1 → …",
    examples: [{ input: "[1,2,3,4]", output: "[1,4,2,3]" }],
    constraints: ["Modify in-place"],
    starterCode: `function solve(head) {
  return head;
}`,
    solution: `function solve(head) {
  if (!head || !head.next) return head;

  // find middle
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // reverse second half
  let prev = null, curr = slow;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // merge two lists
  let first = head, second = prev;

  while (second.next) {
    let t1 = first.next, t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1;
    second = t2;
  }
  return head;
}`,
    interviewQs: [
      { q: "Why reverse second half?", a: "Makes merging easier." },
    ],
  },

  "Circular Array Loop": {
    difficulty: "Hard",
    desc: "Detect cycle in array where each element gives jump direction.",
    examples: [{ input: "[2,-1,1,2,2]", output: "true" }],
    constraints: ["Cycle must be >1 length and unidirectional"],
    starterCode: `function solve(nums) {
  return false;
}`,
    solution: `function solve(nums) {
  const n = nums.length;

  function next(i) {
    return ((i + nums[i]) % n + n) % n;
  }

  for (let i = 0; i < n; i++) {
    let slow = i, fast = i;

    while (
      nums[slow] * nums[next(fast)] > 0 &&
      nums[slow] * nums[next(next(fast))] > 0
    ) {
      slow = next(slow);
      fast = next(next(fast));

      if (slow === fast) {
        if (slow === next(slow)) break; // one-element loop
        return true;
      }
    }
  }
  return false;
}`,
    interviewQs: [
      { q: "Why check direction?", a: "Cycle must have consistent direction." },
    ],
  },

  "Find the Duplicate Number": {
    difficulty: "Medium",
    desc: "Find the duplicate using cycle detection (Floyd’s algorithm).",
    examples: [{ input: "[1,3,4,2,2]", output: "2" }],
    constraints: ["Values: 1..n, array size n+1"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let slow = nums[0], fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}`,
    interviewQs: [
      {
        q: "Why treat array like a linked list?",
        a: "nums[i] is next pointer.",
      },
    ],
  },

  "Linked List Cycle II": {
    difficulty: "Medium",
    desc: "Same as Start of Cycle — return cycle entry node.",
    examples: [{ input: "Cycle at node=3", output: "3" }],
    constraints: ["O(1) space"],
    starterCode: `function solve(head) {
  return null;
}`,
    solution: `function solve(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null;

  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}`,
    interviewQs: [{ q: "Same as Start of Cycle?", a: "Yes, identical logic." }],
  },

  "Remove Nth Node From End of List": {
    difficulty: "Medium",
    desc: "Remove the nth node from the end in one pass.",
    examples: [{ input: "[1,2,3,4,5], n=2", output: "[1,2,3,5]" }],
    constraints: ["One pass required"],
    starterCode: `function solve(head, n) {
  return head;
}`,
    solution: `function solve(head, n) {
  let dummy = { next: head };
  let slow = dummy, fast = dummy;

  while (n-- > 0) fast = fast.next;
  fast = fast.next;

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
}`,
    interviewQs: [
      { q: "Why dummy node?", a: "Handles removing head node cleanly." },
    ],
  },
  // Merge Intervals

  "Merge Intervals": {
    difficulty: "Medium",
    desc: "Merge all overlapping intervals.",
    examples: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
      },
    ],
    constraints: ["Sort intervals first"],
    starterCode: `function solve(intervals) {
  return [];
}`,
    solution: `function solve(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]);
  let res = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    let prev = res[res.length - 1];
    let curr = intervals[i];

    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      res.push(curr);
    }
  }
  return res;
}`,
    interviewQs: [{ q: "Why sorting?", a: "Guarantees proper merging order." }],
  },

  "Insert Interval": {
    difficulty: "Medium",
    desc: "Insert a new interval and merge if needed.",
    examples: [
      { input: "intervals=[[1,3],[6,9]], new=[2,5]", output: "[[1,5],[6,9]]" },
    ],
    constraints: ["Intervals sorted"],
    starterCode: `function solve(intervals, newInterval) {
  return [];
}`,
    solution: `function solve(intervals, newInterval) {
  let res = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i++]);
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  res.push(newInterval);

  while (i < intervals.length) {
    res.push(intervals[i++]);
  }

  return res;
}`,
    interviewQs: [
      {
        q: "Why three stages?",
        a: "Before overlap, merge overlap, after overlap.",
      },
    ],
  },

  "Intervals Intersection": {
    difficulty: "Medium",
    desc: "Find intersection of two interval lists.",
    examples: [
      {
        input: "A=[[1,3],[5,6],[7,9]], B=[[2,3],[5,7]]",
        output: "[[2,3],[5,6],[7,7]]",
      },
    ],
    constraints: ["Both lists sorted"],
    starterCode: `function solve(a, b) {
  return [];
}`,
    solution: `function solve(a, b) {
  let i = 0, j = 0, res = [];

  while (i < a.length && j < b.length) {
    let start = Math.max(a[i][0], b[j][0]);
    let end = Math.min(a[i][1], b[j][1]);

    if (start <= end) res.push([start, end]);

    if (a[i][1] < b[j][1]) i++;
    else j++;
  }
  return res;
}`,
    interviewQs: [
      { q: "Why two pointers?", a: "Each interval consumed once." },
    ],
  },

  "Conflicting Appointments": {
    difficulty: "Easy",
    desc: "Check if any appointments overlap.",
    examples: [{ input: "[[1,4],[2,5],[7,9]]", output: "true" }],
    constraints: ["Intervals sorted"],
    starterCode: `function solve(intervals) {
  return false;
}`,
    solution: `function solve(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i-1][1]) return true;
  }
  return false;
}`,
    interviewQs: [
      { q: "What if inclusive end?", a: "Adjust < to <= based on definition." },
    ],
  },

  "Meeting Rooms II": {
    difficulty: "Medium",
    desc: "Find minimum number of rooms required for all meetings.",
    examples: [{ input: "[[0,30],[5,10],[15,20]]", output: "2" }],
    constraints: ["Use min-heap on end times"],
    starterCode: `function solve(intervals) {
  return 0;
}`,
    solution: `function solve(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]);

  let heap = []; // stores end times

  function push(x) {
    heap.push(x);
    heap.sort((a,b)=>a-b); // min-heap
  }

  for (let [start,end] of intervals) {
    if (heap.length && start >= heap[0]) heap.shift();
    push(end);
  }
  return heap.length;
}`,
    interviewQs: [
      { q: "Why store only end times?", a: "Tracks current active meetings." },
    ],
  },

  "Minimum Number of Arrows to Burst Balloons": {
    difficulty: "Medium",
    desc: "Find minimum arrows required to burst all balloons.",
    examples: [{ input: "[[10,16],[2,8],[1,6],[7,12]]", output: "2" }],
    constraints: ["Sort by end coordinate"],
    starterCode: `function solve(points) {
  return 0;
}`,
    solution: `function solve(points) {
  points.sort((a,b)=>a[1]-b[1]);
  let arrows = 1;
  let end = points[0][1];

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      arrows++;
      end = points[i][1];
    }
  }
  return arrows;
}`,
    interviewQs: [
      { q: "Why compare start with previous end?", a: "End chosen optimally." },
    ],
  },

  "Non-overlapping Intervals": {
    difficulty: "Medium",
    desc: "Find minimum number of intervals to remove for no overlaps.",
    examples: [{ input: "[[1,2],[2,3],[3,4],[1,3]]", output: "1" }],
    constraints: ["Sort by end time"],
    starterCode: `function solve(intervals) {
  return 0;
}`,
    solution: `function solve(intervals) {
  intervals.sort((a,b)=>a[1]-b[1]);
  let count = 0;
  let end = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) {
      count++;
    } else {
      end = intervals[i][1];
    }
  }
  return count;
}`,
    interviewQs: [
      {
        q: "Why greedy by earliest end?",
        a: "Maximizes room for next intervals.",
      },
    ],
  },

  "Employee Free Time": {
    difficulty: "Hard",
    desc: "Find common free time slots among employees.",
    examples: [
      {
        input: "[[1,3],[6,7]] + [[2,4]] + [[2,5],[9,12]]",
        output: "[[5,6],[7,9]]",
      },
    ],
    constraints: ["Flatten intervals"],
    starterCode: `function solve(schedules) {
  return [];
}`,
    solution: `function solve(schedules) {
  let intervals = [];
  for (let emp of schedules) {
    for (let iv of emp) intervals.push(iv);
  }

  intervals.sort((a,b)=>a[0]-b[0]);

  let merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let prev = merged[merged.length - 1];
    let curr = intervals[i];

    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }

  let free = [];
  for (let i = 1; i < merged.length; i++) {
    free.push([merged[i-1][1], merged[i][0]]);
  }

  return free;
}`,
    interviewQs: [{ q: "Why flatten schedules?", a: "Then merge globally." }],
  },

  "Maximum CPU Load": {
    difficulty: "Medium",
    desc: "Given jobs with load and time, find max CPU load at any time.",
    examples: [
      {
        input: "[(1,4,3),(2,5,4),(7,9,6)]",
        output: "7",
      },
    ],
    constraints: ["Use min-heap of end-times"],
    starterCode: `function solve(jobs) {
  return 0;
}`,
    solution: `function solve(jobs) {
  jobs.sort((a,b)=>a[0]-b[0]); // sort by start

  let heap = []; // [end, load]
  let curr = 0, maxLoad = 0;

  function push(x) {
    heap.push(x);
    heap.sort((a,b)=>a[0]-b[0]); // min-heap by end
  }

  for (let [start, end, load] of jobs) {
    while (heap.length && heap[0][0] <= start) {
      let [_, l] = heap.shift();
      curr -= l;
    }
    push([end, load]);
    curr += load;
    maxLoad = Math.max(maxLoad, curr);
  }
  return maxLoad;
}`,
    interviewQs: [
      {
        q: "Why min-heap by end?",
        a: "Jobs finishing early should exit first.",
      },
    ],
  },

  "Partition Labels": {
    difficulty: "Medium",
    desc: "Partition string so each letter appears in only one part.",
    examples: [{ input: "ababcbacadefegdehijhklij", output: "[9,7,8]" }],
    constraints: ["Track last occurrence"],
    starterCode: `function solve(s) {
  return [];
}`,
    solution: `function solve(s) {
  let last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;

  let res = [], start = 0, end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(end - start + 1);
      start = i + 1;
    }
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Why track last index?",
        a: "Ensures all chars in partition fully contained.",
      },
    ],
  },
  // Cyclic Sort
  "Missing Number": {
    difficulty: "Easy",
    desc: "Find the missing number from 0..n.",
    examples: [{ input: "[3,0,1]", output: "2" }],
    constraints: ["Use XOR or sum or cyclic sort"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let n = nums.length;
  let xor = n;
  for (let i = 0; i < n; i++) xor ^= i ^ nums[i];
  return xor;
}`,
    interviewQs: [
      { q: "Why XOR?", a: "Cancels all pairs leaving missing number." },
    ],
  },

  "Find All Numbers Disappeared in an Array": {
    difficulty: "Easy",
    desc: "Return all numbers from 1..n missing in array.",
    examples: [{ input: "[4,3,2,7,8,2,3,1]", output: "[5,6]" }],
    constraints: ["Do it without extra space"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  for (let i = 0; i < nums.length; i++) {
    let idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }

  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) res.push(i + 1);
  }
  return res;
}`,
    interviewQs: [{ q: "Why mark negative?", a: "Marks numbers as seen." }],
  },

  "Find the Duplicate Number": {
    difficulty: "Medium",
    desc: "Find duplicate without modifying array using cycle detection.",
    examples: [{ input: "[1,3,4,2,2]", output: "2" }],
    constraints: ["Cannot modify array", "O(1) extra space"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let slow = nums[0], fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}`,
    interviewQs: [
      { q: "Why Floyd’s algorithm?", a: "Array acts like linked list." },
    ],
  },

  "Find All Duplicates in an Array": {
    difficulty: "Medium",
    desc: "Find numbers that appear twice.",
    examples: [{ input: "[4,3,2,7,8,2,3,1]", output: "[2,3]" }],
    constraints: ["O(1) extra space"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    let idx = Math.abs(nums[i]) - 1;
    if (nums[idx] < 0) res.push(Math.abs(nums[i]));
    else nums[idx] = -nums[idx];
  }
  return res;
}`,
    interviewQs: [
      { q: "Why negative marking?", a: "Second visit means duplicate." },
    ],
  },

  "Set Mismatch": {
    difficulty: "Medium",
    desc: "One number duplicated, one missing.",
    examples: [{ input: "[1,2,2,4]", output: "[2,3]" }],
    constraints: ["1..n"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let dup = -1, miss = -1;

  for (let n of nums) {
    let idx = Math.abs(n) - 1;
    if (nums[idx] < 0) dup = Math.abs(n);
    else nums[idx] = -nums[idx];
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) miss = i + 1;
  }

  return [dup, miss];
}`,
    interviewQs: [{ q: "Why negative marking?", a: "Detect repeated index." }],
  },

  "First Missing Positive": {
    difficulty: "Hard",
    desc: "Find smallest missing positive integer.",
    examples: [{ input: "[3,4,-1,1]", output: "2" }],
    constraints: ["O(n) time", "O(1) space"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let n = nums.length;

  for (let i = 0; i < n; i++) {
    while (
      nums[i] > 0 &&
      nums[i] <= n &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      let idx = nums[i] - 1;
      [nums[i], nums[idx]] = [nums[idx], nums[i]];
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}`,
    interviewQs: [
      { q: "Why cyclic sort?", a: "Place each number at index number-1." },
    ],
  },

  "Couples Holding Hands": {
    difficulty: "Hard",
    desc: "Minimum swaps so couples sit side by side.",
    examples: [{ input: "[0,2,1,3]", output: "1" }],
    constraints: ["Graph / union-find or greedy"],
    starterCode: `function solve(row) {
  return 0;
}`,
    solution: `function solve(row) {
  let n = row.length;
  let pos = new Array(n);

  for (let i = 0; i < n; i++) pos[row[i]] = i;

  let swaps = 0;

  for (let i = 0; i < n; i += 2) {
    let a = row[i];
    let b = a ^ 1; // partner

    if (row[i+1] !== b) {
      swaps++;

      let partnerIndex = pos[b];
      [row[i+1], row[partnerIndex]] = [row[partnerIndex], row[i+1]];

      pos[row[partnerIndex]] = partnerIndex;
      pos[row[i+1]] = i+1;
    }
  }
  return swaps;
}`,
    interviewQs: [
      { q: "Why XOR 1 gives partner?", a: "Pairs (0,1), (2,3), (4,5)…" },
    ],
  },

  "Find the Smallest Missing Positive Number": {
    difficulty: "Medium",
    desc: "Same as First Missing Positive — cyclic sort approach.",
    examples: [{ input: "[3,4,-1,1]", output: "2" }],
    constraints: ["O(n)", "O(1) space"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let i = 0;
  while (i < nums.length) {
    let v = nums[i];
    if (v > 0 && v <= nums.length && nums[v - 1] !== v) {
      [nums[i], nums[v - 1]] = [nums[v - 1], nums[i]];
    } else i++;
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return nums.length + 1;
}`,
    interviewQs: [
      {
        q: "What are valid placements?",
        a: "1 should be at index 0, 2 at index 1…",
      },
    ],
  },

  "Random Pick with Blacklist": {
    difficulty: "Hard",
    desc: "Pick random number in range [0,n) excluding blacklist.",
    examples: [{ input: "n=7, blacklist=[2,3,5]", output: "random 0,1,4,6" }],
    constraints: ["O(1) pick", "Map blacklisted to valid range"],
    starterCode: `class Solution {
  constructor(n, blacklist) {}
  pick() {}
}`,
    solution: `class Solution {
  constructor(n, blacklist) {
    this.map = {};
    this.size = n - blacklist.length;

    let blackSet = new Set(blacklist);
    let last = n - 1;

    for (let b of blacklist) {
      if (b < this.size) {
        while (blackSet.has(last)) last--;
        this.map[b] = last;
        last--;
      }
    }
  }

  pick() {
    let x = Math.floor(Math.random() * this.size);
    return this.map[x] !== undefined ? this.map[x] : x;
  }
}`,
    interviewQs: [
      {
        q: "Why remap blacklist?",
        a: "Maps forbidden picks to valid tail range.",
      },
    ],
  },

  "Minimize Deviation in Array": {
    difficulty: "Hard",
    desc: "Minimize deviation by modifying numbers (odd→*2, even→/2).",
    examples: [{ input: "[1,2,3,4]", output: "1" }],
    constraints: ["Use max-heap"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let heap = [];
  let min = Infinity;

  for (let n of nums) {
    if (n % 2 === 1) n *= 2;
    min = Math.min(min, n);
    heap.push(n);
  }

  heap.sort((a,b)=>b-a); 

  let res = Infinity;

  while (true) {
    let max = heap.shift();
    res = Math.min(res, max - min);

    if (max % 2 === 1) break;

    max = max / 2;
    min = Math.min(min, max);
    heap.push(max);
    heap.sort((a,b)=>b-a);
  }

  return res;
}`,
    interviewQs: [
      {
        q: "Why make all numbers even first?",
        a: "Allows reducing using /2 only.",
      },
    ],
  },

  // In-place Reversal of Linked List

  "Reverse Linked List": {
    difficulty: "Easy",
    desc: "Reverse the entire linked list.",
    examples: [{ input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" }],
    constraints: ["O(1) extra space"],
    starterCode: `function solve(head) {
  return head;
}`,
    solution: `function solve(head) {
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
    interviewQs: [
      {
        q: "Iterative vs recursive?",
        a: "Recursive uses call stack (O(n) space).",
      },
    ],
  },

  "Reverse Linked List II": {
    difficulty: "Medium",
    desc: "Reverse a sub-list from position left to right.",
    examples: [
      { input: "[1,2,3,4,5], left=2, right=4", output: "[1,4,3,2,5]" },
    ],
    constraints: ["1 ≤ left ≤ right"],
    starterCode: `function solve(head, left, right) {
  return head;
}`,
    solution: `function solve(head, left, right) {
  if (left === right) return head;

  let dummy = { next: head };
  let prev = dummy;

  for (let i = 1; i < left; i++) prev = prev.next;

  let curr = prev.next;
  for (let i = 0; i < right - left; i++) {
    let temp = curr.next;
    curr.next = temp.next;
    temp.next = prev.next;
    prev.next = temp;
  }
  return dummy.next;
}`,
    interviewQs: [
      { q: "Why use dummy?", a: "Handles cases where head is reversed." },
    ],
  },

  "Reverse Nodes in k-Group": {
    difficulty: "Hard",
    desc: "Reverse nodes in groups of k.",
    examples: [{ input: "[1,2,3,4,5], k=2", output: "[2,1,4,3,5]" }],
    constraints: ["Only reverse full groups of k"],
    starterCode: `function solve(head, k) {
  return head;
}`,
    solution: `function solve(head, k) {
  function getK(node, k) {
    while (node && k > 0) {
      node = node.next;
      k--;
    }
    return k === 0;
  }

  let dummy = { next: head };
  let prev = dummy;

  while (getK(prev.next, k)) {
    let curr = prev.next;
    for (let i = 1; i < k; i++) {
      let temp = curr.next;
      curr.next = temp.next;
      temp.next = prev.next;
      prev.next = temp;
    }
    prev = curr;
  }

  return dummy.next;
}`,
    interviewQs: [
      { q: "Why not reverse incomplete group?", a: "LeetCode spec." },
    ],
  },

  "Rotate List": {
    difficulty: "Medium",
    desc: "Rotate list to the right by k places.",
    examples: [{ input: "[1,2,3,4,5], k=2", output: "[4,5,1,2,3]" }],
    constraints: ["k may be larger than length"],
    starterCode: `function solve(head, k) {
  return head;
}`,
    solution: `function solve(head, k) {
  if (!head) return head;

  let len = 1, tail = head;
  while (tail.next) {
    tail = tail.next;
    len++;
  }

  tail.next = head;
  k = k % len;

  let steps = len - k;
  while (steps--) tail = tail.next;

  let newHead = tail.next;
  tail.next = null;
  return newHead;
}`,
    interviewQs: [
      {
        q: "Why connect tail to head?",
        a: "Forms circular list for shifting.",
      },
    ],
  },

  "Swap Nodes in Pairs": {
    difficulty: "Medium",
    desc: "Swap every two adjacent nodes.",
    examples: [{ input: "[1,2,3,4]", output: "[2,1,4,3]" }],
    constraints: ["Cannot modify values"],
    starterCode: `function solve(head) {
  return head;
}`,
    solution: `function solve(head) {
  let dummy = { next: head };
  let prev = dummy;

  while (prev.next && prev.next.next) {
    let a = prev.next;
    let b = prev.next.next;

    a.next = b.next;
    b.next = a;
    prev.next = b;

    prev = a;
  }

  return dummy.next;
}`,
    interviewQs: [{ q: "Why dummy?", a: "Simplifies edge cases." }],
  },

  "Odd Even Linked List": {
    difficulty: "Medium",
    desc: "Group all odd indexed nodes first, then even.",
    examples: [{ input: "[1,2,3,4,5]", output: "[1,3,5,2,4]" }],
    constraints: ["Preserve relative order"],
    starterCode: `function solve(head) {
  return head;
}`,
    solution: `function solve(head) {
  if (!head) return head;

  let odd = head, even = head.next, evenHead = even;

  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;

    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}`,
    interviewQs: [
      { q: "Why keep evenHead?", a: "To attach evens after odds." },
    ],
  },

  "Palindrome Linked List": {
    difficulty: "Medium",
    desc: "Check if linked list is palindrome.",
    examples: [{ input: "[1,2,2,1]", output: "true" }],
    constraints: ["O(1) extra space"],
    starterCode: `function solve(head) {
  return false;
}`,
    solution: `function solve(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  function reverse(node) {
    let prev = null;
    while (node) {
      let next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return prev;
  }

  let second = reverse(slow);
  let first = head;

  while (second) {
    if (first.val !== second.val) return false;
    first = first.next;
    second = second.next;
  }
  return true;
}`,
    interviewQs: [
      { q: "Why reverse second half?", a: "Allows pairwise comparison." },
    ],
  },

  "Swapping Nodes in a Linked List": {
    difficulty: "Medium",
    desc: "Swap kth node from start and kth from end.",
    examples: [{ input: "[1,2,3,4,5], k=2", output: "[1,4,3,2,5]" }],
    constraints: ["1 ≤ k ≤ length"],
    starterCode: `function solve(head, k) {
  return head;
}`,
    solution: `function solve(head, k) {
  let first = head, second = head, curr = head;

  for (let i = 1; i < k; i++) first = first.next;

  let temp = first;
  while (temp.next) {
    temp = temp.next;
    second = second.next;
  }

  [first.val, second.val] = [second.val, first.val];
  return head;
}`,
    interviewQs: [
      { q: "Why swap values, not nodes?", a: "Simplifies pointer handling." },
    ],
  },

  "Reverse Alternating K-element Sub-list": {
    difficulty: "Medium",
    desc: "Reverse every alternate group of k nodes.",
    examples: [
      { input: "[1,2,3,4,5,6,7,8], k=2", output: "[2,1,3,4,6,5,7,8]" },
    ],
    constraints: ["Do it in-place"],
    starterCode: `function solve(head, k) {
  return head;
}`,
    solution: `function solve(head, k) {
  if (k <= 1 || !head) return head;

  let dummy = { next: head };
  let prev = dummy;
  let reverseFlag = true;

  while (true) {
    let last = prev;
    for (let i = 0; i < k && last; i++) last = last.next;
    if (!last) break;

    let curr = prev.next;
    if (reverseFlag) {
      for (let i = 0; i < k - 1; i++) {
        let next = curr.next;
        curr.next = next.next;
        next.next = prev.next;
        prev.next = next;
      }
      prev = curr;
    } else {
      prev = last;
    }

    reverseFlag = !reverseFlag;
  }

  return dummy.next;
}`,
    interviewQs: [
      { q: "Why alternate flag?", a: "Control reversal every other block." },
    ],
  },

  "Remove Duplicates from Sorted List II": {
    difficulty: "Medium",
    desc: "Remove all nodes that have duplicates — keep only distinct nodes.",
    examples: [{ input: "[1,2,3,3,4,4,5]", output: "[1,2,5]" }],
    constraints: ["Sorted list"],
    starterCode: `function solve(head) {
  return head;
}`,
    solution: `function solve(head) {
  let dummy = { next: head };
  let prev = dummy;

  while (head) {
    if (head.next && head.val === head.next.val) {
      while (head.next && head.val === head.next.val) head = head.next;
      prev.next = head.next;
    } else {
      prev = prev.next;
    }
    head = head.next;
  }
  return dummy.next;
}`,
    interviewQs: [
      {
        q: "Difference from simple duplicate removal?",
        a: "Remove entire group, not one.",
      },
    ],
  },

  // Tree BFS

  "Binary Tree Level Order Traversal": {
    difficulty: "Easy",
    desc: "Return level order traversal of a binary tree.",
    examples: [
      { input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
    ],
    constraints: ["Use BFS"],
    starterCode: `function solve(root) {
  return [];
}`,
    solution: `function solve(root) {
  if (!root) return [];
  let q = [root], res = [];

  while (q.length) {
    let size = q.length, level = [];
    while (size--) {
      let node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
    interviewQs: [
      { q: "Why queue?", a: "BFS processes nodes level by level." },
    ],
  },

  "Binary Tree Zigzag Level Order Traversal": {
    difficulty: "Medium",
    desc: "Return zigzag (alternate direction) level order traversal.",
    examples: [
      { input: "[3,9,20,null,null,15,7]", output: "[[3],[20,9],[15,7]]" },
    ],
    constraints: ["Reverse direction every row"],
    starterCode: `function solve(root) {
  return [];
}`,
    solution: `function solve(root) {
  if (!root) return [];
  let q = [root], res = [], leftToRight = true;

  while (q.length) {
    let size = q.length, level = [];
    while (size--) {
      let node = q.shift();
      if (leftToRight) level.push(node.val);
      else level.unshift(node.val);

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
    leftToRight = !leftToRight;
  }
  return res;
}`,
    interviewQs: [
      { q: "Why unshift?", a: "To reverse direction without full reverse." },
    ],
  },

  "Average of Levels in Binary Tree": {
    difficulty: "Easy",
    desc: "Return average of nodes at each level.",
    examples: [{ input: "[3,9,20,null,null,15,7]", output: "[3,14.5,11]" }],
    constraints: ["Use BFS"],
    starterCode: `function solve(root) {
  return [];
}`,
    solution: `function solve(root) {
  if (!root) return [];
  let q = [root], res = [];

  while (q.length) {
    let size = q.length, sum = 0;
    for (let i = 0; i < size; i++) {
      let node = q.shift();
      sum += node.val;
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(sum / size);
  }
  return res;
}`,
    interviewQs: [
      { q: "Difference from normal BFS?", a: "Track sum for each level." },
    ],
  },

  "Minimum Depth of Binary Tree": {
    difficulty: "Easy",
    desc: "Find minimum depth from root to nearest leaf.",
    examples: [{ input: "[3,9,20,null,null,15,7]", output: "2" }],
    constraints: ["Leaf means no children"],
    starterCode: `function solve(root) {
  return 0;
}`,
    solution: `function solve(root) {
  if (!root) return 0;

  let q = [root], depth = 1;

  while (q.length) {
    let size = q.length;

    while (size--) {
      let node = q.shift();
      if (!node.left && !node.right) return depth;
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    depth++;
  }
}`,
    interviewQs: [
      { q: "Why BFS not DFS?", a: "First leaf seen is min depth." },
    ],
  },

  "Binary Tree Level Order Traversal II": {
    difficulty: "Easy",
    desc: "Return bottom-up level order traversal.",
    examples: [
      { input: "[3,9,20,null,null,15,7]", output: "[[15,7],[9,20],[3]]" },
    ],
    constraints: ["Same as level order, then reverse"],
    starterCode: `function solve(root) {
  return [];
}`,
    solution: `function solve(root) {
  if (!root) return [];
  let q = [root], res = [];

  while (q.length) {
    let size = q.length, level = [];
    while (size--) {
      let node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res.reverse();
}`,
    interviewQs: [
      { q: "Alternate method?", a: "Unshift each level into array." },
    ],
  },

  "Populating Next Right Pointers in Each Node": {
    difficulty: "Medium",
    desc: "Connect next pointers of each node to its right node.",
    examples: [
      { input: "Perfect tree", output: "Each node points to right neighbor" },
    ],
    constraints: ["Perfect binary tree"],
    starterCode: `function solve(root) {
  return root;
}`,
    solution: `function solve(root) {
  if (!root) return root;
  let leftmost = root;

  while (leftmost.left) {
    let curr = leftmost;
    while (curr) {
      curr.left.next = curr.right;
      if (curr.next) curr.right.next = curr.next.left;
      curr = curr.next;
    }
    leftmost = leftmost.left;
  }
  return root;
}`,
    interviewQs: [
      { q: "Why O(1) space?", a: "Use already-connected next pointers." },
    ],
  },

  "Right View of Binary Tree": {
    difficulty: "Medium",
    desc: "Return visible nodes from the right side.",
    examples: [{ input: "[1,2,3,null,5,null,4]", output: "[1,3,4]" }],
    constraints: ["Right-first BFS or DFS"],
    starterCode: `function solve(root) {
  return [];
}`,
    solution: `function solve(root) {
  if (!root) return [];
  let q = [root], res = [];

  while (q.length) {
    let size = q.length;
    for (let i = 0; i < size; i++) {
      let node = q.shift();
      if (i === size - 1) res.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
}`,
    interviewQs: [{ q: "DFS alternative?", a: "Right-first DFS by depth." }],
  },

  "Vertical Order Traversal of a Binary Tree": {
    difficulty: "Hard",
    desc: "Group nodes by vertical columns (x-axis).",
    examples: [
      { input: "[3,9,20,null,null,15,7]", output: "[[9],[3,15],[20],[7]]" },
    ],
    constraints: ["Track row + col", "Sort properly"],
    starterCode: `function solve(root) {
  return [];
}`,
    solution: `function solve(root) {
  if (!root) return [];
  let q = [[root, 0, 0]];
  let map = {};

  while (q.length) {
    let [node, row, col] = q.shift();
    if (!map[col]) map[col] = [];
    map[col].push([row, node.val]);
    if (node.left) q.push([node.left, row + 1, col - 1]);
    if (node.right) q.push([node.right, row + 1, col + 1]);
  }

  let res = [];
  let cols = Object.keys(map).map(Number).sort((a,b)=>a-b);

  for (let c of cols) {
    map[c].sort((a,b)=>{
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    });
    res.push(map[c].map(x=>x[1]));
  }

  return res;
}`,
    interviewQs: [
      { q: "Why track row+col?", a: "Vertical groups and ordering rules." },
    ],
  },

  "Serialize and Deserialize Binary Tree": {
    difficulty: "Hard",
    desc: "Convert tree to string and back.",
    examples: [{ input: "[1,2,3,null,null,4,5]", output: "Serialized string" }],
    constraints: ["Use BFS"],
    starterCode: `class Codec {
  serialize(root) {}
  deserialize(data) {}
}`,
    solution: `class Codec {
  serialize(root) {
    if (!root) return "";
    let res = [], q = [root];

    while (q.length) {
      let node = q.shift();
      if (node) {
        res.push(node.val);
        q.push(node.left);
        q.push(node.right);
      } else res.push("null");
    }
    return res.join(",");
  }

  deserialize(data) {
    if (!data) return null;
    let vals = data.split(",");
    let root = { val: +vals[0], left: null, right: null };

    let q = [root];
    let i = 1;

    while (i < vals.length) {
      let parent = q.shift();
      if (vals[i] !== "null") {
        parent.left = { val: +vals[i], left: null, right: null };
        q.push(parent.left);
      }
      i++;

      if (vals[i] !== "null") {
        parent.right = { val: +vals[i], left: null, right: null };
        q.push(parent.right);
      }
      i++;
    }
    return root;
  }
}`,
    interviewQs: [
      { q: "Why BFS?", a: "Keeps full tree structure including nulls." },
    ],
  },

  "N-ary Tree Level Order Traversal": {
    difficulty: "Medium",
    desc: "BFS on N-ary tree.",
    examples: [{ input: "N-ary tree", output: "[[1],[3,2,4],[5,6]]" }],
    constraints: ["Each node has children[]"],
    starterCode: `function solve(root) {
  return [];
}`,
    solution: `function solve(root) {
  if (!root) return [];
  let q = [root], res = [];

  while (q.length) {
    let size = q.length, level = [];

    while (size--) {
      let node = q.shift();
      level.push(node.val);
      for (let child of node.children) q.push(child);
    }
    res.push(level);
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Difference from binary tree?",
        a: "Push all children, not just left/right.",
      },
    ],
  },

  // Tree DFS
  "Path Sum": {
    difficulty: "Easy",
    desc: "Check if the tree has a root-to-leaf path with a given sum.",
    examples: [
      {
        input: "[5,4,8,11,null,13,4,7,2,null,null,null,1], sum=22",
        output: "true",
      },
    ],
    constraints: ["Path must end at leaf"],
    starterCode: `function solve(root, targetSum) {
  return false;
}`,
    solution: `function solve(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return targetSum === root.val;
  return solve(root.left, targetSum - root.val) || 
         solve(root.right, targetSum - root.val);
}`,
    interviewQs: [{ q: "Why check leaf?", a: "Path must be root-to-leaf." }],
  },

  "Path Sum II": {
    difficulty: "Medium",
    desc: "Return all root-to-leaf paths that sum to target.",
    examples: [
      {
        input: "[5,4,8,11,null,13,4,7,2,null,null,5,1], sum=22",
        output: "[[5,4,11,2],[5,8,4,5]]",
      },
    ],
    constraints: ["Use DFS + backtracking"],
    starterCode: `function solve(root, targetSum) {
  return [];
}`,
    solution: `function solve(root, targetSum) {
  let res = [];
  function dfs(node, sum, path) {
    if (!node) return;
    path.push(node.val);

    if (!node.left && !node.right && sum === node.val) {
      res.push([...path]);
    } else {
      dfs(node.left, sum - node.val, path);
      dfs(node.right, sum - node.val, path);
    }
    path.pop();
  }
  dfs(root, targetSum, []);
  return res;
}`,
    interviewQs: [
      { q: "Why backtracking?", a: "To undo path after recursion." },
    ],
  },

  "Path Sum III": {
    difficulty: "Medium",
    desc: "Count paths that sum to target (paths can start/end anywhere).",
    examples: [
      { input: "[10,5,-3,3,2,null,11,3,-2,null,1], target=8", output: "3" },
    ],
    constraints: ["Use prefix-sum DFS"],
    starterCode: `function solve(root, targetSum) {
  return 0;
}`,
    solution: `function solve(root, targetSum) {
  let map = {0: 1};
  let count = 0;

  function dfs(node, curr) {
    if (!node) return;
    curr += node.val;

    if (map[curr - targetSum]) count += map[curr - targetSum];
    map[curr] = (map[curr] || 0) + 1;

    dfs(node.left, curr);
    dfs(node.right, curr);

    map[curr]--;
  }

  dfs(root, 0);
  return count;
}`,
    interviewQs: [
      {
        q: "Why prefix sum?",
        a: "Count paths ending at current node efficiently.",
      },
    ],
  },

  "Sum Root to Leaf Numbers": {
    difficulty: "Medium",
    desc: "Each root-to-leaf path forms a number; return total sum.",
    examples: [{ input: "[1,2,3]", output: "25 (12 + 13)" }],
    constraints: ["Only digits 0-9"],
    starterCode: `function solve(root) {
  return 0;
}`,
    solution: `function solve(root) {
  function dfs(node, curr) {
    if (!node) return 0;
    curr = curr * 10 + node.val;

    if (!node.left && !node.right) return curr;
    return dfs(node.left, curr) + dfs(node.right, curr);
  }
  return dfs(root, 0);
}`,
    interviewQs: [
      { q: "Why multiply by 10?", a: "To build number as path expands." },
    ],
  },

  "Diameter of Binary Tree": {
    difficulty: "Easy",
    desc: "Return longest path between any two nodes (edges count).",
    examples: [{ input: "[1,2,3,4,5]", output: "3" }],
    constraints: ["May not pass through root"],
    starterCode: `function solve(root) {
  return 0;
}`,
    solution: `function solve(root) {
  let max = 0;

  function height(node) {
    if (!node) return 0;
    let left = height(node.left);
    let right = height(node.right);
    max = Math.max(max, left + right);
    return Math.max(left, right) + 1;
  }

  height(root);
  return max;
}`,
    interviewQs: [{ q: "What is diameter?", a: "Left height + right height." }],
  },

  "Binary Tree Maximum Path Sum": {
    difficulty: "Hard",
    desc: "Return max path sum where path may start/end anywhere.",
    examples: [{ input: "[1,2,3]", output: "6" }],
    constraints: ["Can include negative values"],
    starterCode: `function solve(root) {
  return 0;
}`,
    solution: `function solve(root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (!node) return 0;

    let left = Math.max(0, dfs(node.left));
    let right = Math.max(0, dfs(node.right));

    maxSum = Math.max(maxSum, left + right + node.val);

    return Math.max(left, right) + node.val;
  }

  dfs(root);
  return maxSum;
}`,
    interviewQs: [
      {
        q: "Why clamp negative values to 0?",
        a: "Negative paths reduce total sum.",
      },
    ],
  },

  "Lowest Common Ancestor of a Binary Tree": {
    difficulty: "Medium",
    desc: "Find LCA of two tree nodes.",
    examples: [{ input: "(root, p=5, q=1)", output: "3" }],
    constraints: ["p and q always exist"],
    starterCode: `function solve(root, p, q) {
  return root;
}`,
    solution: `function solve(root, p, q) {
  if (!root || root === p || root === q) return root;

  let left = solve(root.left, p, q);
  let right = solve(root.right, p, q);

  if (left && right) return root;
  return left ? left : right;
}`,
    interviewQs: [
      { q: "Why postorder DFS?", a: "Children searched before deciding LCA." },
    ],
  },

  "Validate Binary Search Tree": {
    difficulty: "Medium",
    desc: "Check if a binary tree is a valid BST.",
    examples: [{ input: "[2,1,3]", output: "true" }],
    constraints: ["All nodes must satisfy full range constraints"],
    starterCode: `function solve(root) {
  return false;
}`,
    solution: `function solve(root) {
  function dfs(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;

    return dfs(node.left, min, node.val) &&
           dfs(node.right, node.val, max);
  }
  return dfs(root, -Infinity, Infinity);
}`,
    interviewQs: [
      { q: "Why use min/max bounds?", a: "Ensures global BST validity." },
    ],
  },

  "Flatten Binary Tree to Linked List": {
    difficulty: "Medium",
    desc: "Flatten tree into linked list in preorder.",
    examples: [{ input: "[1,2,5,3,4,null,6]", output: "1→2→3→4→5→6" }],
    constraints: ["Flatten in-place"],
    starterCode: `function solve(root) {
  return root;
}`,
    solution: `function solve(root) {
  function dfs(node) {
    if (!node) return null;
    let leftTail = dfs(node.left);
    let rightTail = dfs(node.right);

    if (leftTail) {
      leftTail.right = node.right;
      node.right = node.left;
      node.left = null;
    }

    return rightTail || leftTail || node;
  }
  dfs(root);
  return root;
}`,
    interviewQs: [{ q: "Traversal type?", a: "Preorder flattening." }],
  },

  "Construct Binary Tree from Preorder and Inorder": {
    difficulty: "Medium",
    desc: "Build binary tree using preorder & inorder arrays.",
    examples: [
      { input: "pre=[3,9,20,15,7], in=[9,3,15,20,7]", output: "root=3" },
    ],
    constraints: ["All elements are unique"],
    starterCode: `function solve(preorder, inorder) {
  return null;
}`,
    solution: `function solve(preorder, inorder) {
  let index = new Map();
  for (let i = 0; i < inorder.length; i++) index.set(inorder[i], i);

  let preIdx = 0;

  function build(l, r) {
    if (l > r) return null;

    let rootVal = preorder[preIdx++];
    let root = { val: rootVal, left: null, right: null };
    let mid = index.get(rootVal);

    root.left = build(l, mid - 1);
    root.right = build(mid + 1, r);
    return root;
  }

  return build(0, inorder.length - 1);
}`,
    interviewQs: [
      {
        q: "Why preorder + inorder works?",
        a: "Preorder gives root, inorder splits left/right.",
      },
    ],
  },

  // Two Heaps

  "Find Median from Data Stream": {
    difficulty: "Hard",
    desc: "Maintain numbers and return median efficiently.",
    examples: [{ input: "add(1), add(2), find()", output: "1.5" }],
    constraints: ["O(log n) insert"],
    starterCode: `class MedianFinder {
  constructor() {}
  addNum(num) {}
  findMedian() {}
}`,
    solution: `class MedianFinder {
  constructor() {
    this.low = []; // max-heap
    this.high = []; // min-heap
  }

  addNum(num) {
    this.low.push(num);
    this.low.sort((a,b)=>b-a);

    this.high.push(this.low.shift());
    this.high.sort((a,b)=>a-b);

    if (this.high.length > this.low.length) {
      this.low.push(this.high.shift());
      this.low.sort((a,b)=>b-a);
    }
  }

  findMedian() {
    if (this.low.length > this.high.length) return this.low[0];
    return (this.low[0] + this.high[0]) / 2;
  }
}`,
    interviewQs: [
      {
        q: "Why two heaps?",
        a: "Left = max heap, Right = min heap gives quick median.",
      },
    ],
  },

  "Sliding Window Median": {
    difficulty: "Hard",
    desc: "Return median for each sliding window.",
    examples: [
      { input: "[1,3,-1,-3,5,3,6,7], k=3", output: "[1,-1,-1,3,5,6]" },
    ],
    constraints: ["Use two heaps + lazy deletion"],
    starterCode: `function solve(nums, k) {
  return [];
}`,
    solution: `function solve(nums, k) {
  let res = [];

  function insert(heap, num, compare) {
    heap.push(num);
    heap.sort(compare);
  }

  function remove(heap, num) {
    let idx = heap.indexOf(num);
    if (idx !== -1) heap.splice(idx, 1);
  }

  let low = [], high = [];

  function rebalance() {
    if (low.length > high.length + 1) {
      insert(high, low.shift(), (a,b)=>a-b);
    } else if (high.length > low.length) {
      insert(low, high.shift(), (a,b)=>b-a);
    }
  }

  function getMedian() {
    return low.length > high.length
      ? low[0]
      : (low[0] + high[0]) / 2;
  }

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    if (!low.length || num <= low[0]) insert(low, num, (a,b)=>b-a);
    else insert(high, num, (a,b)=>a-b);

    rebalance();

    if (i >= k - 1) {
      res.push(getMedian());

      let out = nums[i - k + 1];
      if (out <= low[0]) remove(low, out);
      else remove(high, out);
      rebalance();
    }
  }

  return res;
}`,
    interviewQs: [
      { q: "Is brute force ok?", a: "Yes but O(nk log k) too slow." },
    ],
  },

  IPO: {
    difficulty: "Hard",
    desc: "Choose up to k projects to maximize capital.",
    examples: [
      { input: "k=2, W=0, Profits=[1,2,3], Capital=[0,1,1]", output: "4" },
    ],
    constraints: ["Use min-heap + max-heap"],
    starterCode: `function solve(k, w, profits, capital) {
  return 0;
}`,
    solution: `function solve(k, w, profits, capital) {
  let projects = [];
  for (let i = 0; i < profits.length; i++) {
    projects.push([capital[i], profits[i]]);
  }
  projects.sort((a,b)=>a[0]-b[0]);

  let maxHeap = [];
  let i = 0;

  while (k--) {
    while (i < projects.length && projects[i][0] <= w) {
      maxHeap.push(projects[i][1]);
      maxHeap.sort((a,b)=>b-a);
      i++;
    }
    if (!maxHeap.length) break;
    w += maxHeap.shift();
  }

  return w;
}`,
    interviewQs: [
      { q: "Why max-heap?", a: "Pick most profitable affordable project." },
    ],
  },

  "Find Right Interval": {
    difficulty: "Medium",
    desc: "For each interval find interval whose start is >= current end.",
    examples: [{ input: "[[1,2]]", output: "[-1]" }],
    constraints: ["Use binary search"],
    starterCode: `function solve(intervals) {
  return [];
}`,
    solution: `function solve(intervals) {
  let arr = intervals.map((x,i)=>[x[0], i]);
  arr.sort((a,b)=>a[0]-b[0]);

  let res = [];

  for (let iv of intervals) {
    let end = iv[1];
    let l = 0, r = arr.length - 1, ans = -1;

    while (l <= r) {
      let m = (l+r)>>1;
      if (arr[m][0] >= end) {
        ans = arr[m][1];
        r = m - 1;
      } else l = m + 1;
    }
    res.push(ans);
  }
  return res;
}`,
    interviewQs: [{ q: "Time complexity?", a: "O(n log n)" }],
  },

  "Kth Largest Element in a Stream": {
    difficulty: "Medium",
    desc: "Maintain kth largest value after each insertion.",
    examples: [{ input: "k=3, nums=[4,5,8,2], add 3", output: "4" }],
    constraints: ["Min-heap of size k"],
    starterCode: `class KthLargest {
  constructor(k, nums) {}
  add(val) {}
}`,
    solution: `class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = [];
    for (let n of nums) this.add(n);
  }

  add(val) {
    this.heap.push(val);
    this.heap.sort((a,b)=>a-b);
    if (this.heap.length > this.k) this.heap.shift();
    return this.heap[0];
  }
}`,
    interviewQs: [{ q: "Why min-heap?", a: "Root stores kth largest number." }],
  },

  "Process Tasks Using Servers": {
    difficulty: "Hard",
    desc: "Assign tasks to servers by weight and availability time.",
    examples: [
      {
        input: "servers=[3,3,2], tasks=[1,2,3,2,1,2]",
        output: "[2,2,0,2,1,2]",
      },
    ],
    constraints: ["Use two heaps"],
    starterCode: `function solve(servers, tasks) {
  return [];
}`,
    solution: `function solve(servers, tasks) {
  let free = [], busy = [];
  for (let i = 0; i < servers.length; i++) free.push([servers[i], i]);
  free.sort((a,b)=>a[0]-b[0] || a[1]-b[1]); // weight,index

  let res = [];

  for (let t = 0; t < tasks.length; t++) {
    let time = t;

    while (busy.length && busy[0][0] <= time) {
      let [freeAt, weight, idx] = busy.shift();
      free.push([weight, idx]);
      free.sort((a,b)=>a[0]-b[0] || a[1]-b[1]);
    }

    if (!free.length) {
      let [freeAt, weight, idx] = busy.shift();
      time = freeAt;
      free.push([weight, idx]);
      free.sort((a,b)=>a[0]-b[0] || a[1]-b[1]);
    }

    let [w, i] = free.shift();
    busy.push([time + tasks[t], w, i]);
    busy.sort((a,b)=>a[0]-b[0]);

    res.push(i);
  }

  return res;
}`,
    interviewQs: [
      {
        q: "Which heap tracks availability?",
        a: "Busy heap sorted by next free time.",
      },
    ],
  },

  "Minimum Cost to Hire K Workers": {
    difficulty: "Hard",
    desc: "Hire k workers minimizing cost with quality/wage ratio.",
    examples: [
      { input: "quality=[10,20,5], wage=[70,50,30], k=2", output: "105" },
    ],
    constraints: ["Sort by ratio", "Max-heap for quality"],
    starterCode: `function solve(quality, wage, k) {
  return 0;
}`,
    solution: `function solve(quality, wage, k) {
  let workers = [];
  for (let i = 0; i < quality.length; i++) {
    workers.push([wage[i]/quality[i], quality[i]]);
  }
  workers.sort((a,b)=>a[0]-b[0]);

  let heap = [];
  let qSum = 0;
  let res = Infinity;

  for (let [ratio, q] of workers) {
    heap.push(q);
    qSum += q;
    heap.sort((a,b)=>b-a);

    if (heap.length > k) qSum -= heap.shift();

    if (heap.length === k) {
      res = Math.min(res, qSum * ratio);
    }
  }
  return res;
}`,
    interviewQs: [
      { q: "Why sort by ratio?", a: "Ratio defines the minimum wage factor." },
    ],
  },

  "Reorganize String": {
    difficulty: "Medium",
    desc: "Rearrange string such that no adjacent characters match.",
    examples: [{ input: "aab", output: "aba" }],
    constraints: ["Use max-heap"],
    starterCode: `function solve(s) {
  return "";
}`,
    solution: `function solve(s) {
  let map = {};
  for (let c of s) map[c] = (map[c] || 0) + 1;

  let heap = Object.entries(map);
  heap.sort((a,b)=>b[1]-a[1]);

  let res = "";

  while (heap.length > 1) {
    let [c1,f1] = heap.shift();
    let [c2,f2] = heap.shift();

    res += c1 + c2;

    if (--f1 > 0) heap.push([c1,f1]);
    if (--f2 > 0) heap.push([c2,f2]);
    heap.sort((a,b)=>b[1]-a[1]);
  }

  if (heap.length === 1) {
    let [c,f] = heap[0];
    if (f > 1) return "";
    res += c;
  }
  return res;
}`,
    interviewQs: [
      { q: "Why 2 pops each step?", a: "Avoid placing same letter adjacent." },
    ],
  },

  "Task Scheduler": {
    difficulty: "Medium",
    desc: "Given tasks with cooldown n, compute least time to finish all tasks.",
    examples: [{ input: "tasks=[A,A,A,B,B,B], n=2", output: "8" }],
    constraints: ["Use max-heap"],
    starterCode: `function solve(tasks, n) {
  return 0;
}`,
    solution: `function solve(tasks, n) {
  let map = {};
  for (let t of tasks) map[t] = (map[t] || 0) + 1;

  let heap = Object.values(map).sort((a,b)=>b-a);
  let time = 0;

  while (heap.length) {
    let temp = [];
    let cycle = n + 1;

    while (cycle-- > 0 && heap.length) {
      let freq = heap.shift();
      if (--freq > 0) temp.push(freq);
      time++;
    }

    for (let x of temp) heap.push(x);
    heap.sort((a,b)=>b-a);

    if (heap.length) time += cycle + 1;
  }

  return time;
}`,
    interviewQs: [
      { q: "Why idle slots?", a: "Cooldown prevents immediate reuse." },
    ],
  },

  "Seat Reservation Manager": {
    difficulty: "Medium",
    desc: "Reserve lowest-numbered unreserved seat.",
    examples: [
      { input: "reserve() => 1, reserve() => 2, unreserve(1)", output: "..." },
    ],
    constraints: ["Use min-heap"],
    starterCode: `class SeatManager {
  constructor(n) {}
  reserve() {}
  unreserve(seatNumber) {}
}`,
    solution: `class SeatManager {
  constructor(n) {
    this.heap = [];
    for (let i = 1; i <= n; i++) this.heap.push(i);
    this.heap.sort((a,b)=>a-b);
  }

  reserve() {
    return this.heap.shift();
  }

  unreserve(seatNumber) {
    this.heap.push(seatNumber);
    this.heap.sort((a,b)=>a-b);
  }
}`,
    interviewQs: [
      { q: "Why min-heap?", a: "Fastest way to get smallest available seat." },
    ],
  },

  // Subsets (Backtracking)

  Subsets: {
    difficulty: "Easy",
    desc: "Generate all possible subsets (the power set).",
    examples: [
      {
        input: "[1,2,3]",
        output: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
      },
    ],
    constraints: ["No duplicates"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let res = [];
  function backtrack(start, path) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
    interviewQs: [
      { q: "Why backtracking?", a: "Need all subset combinations." },
    ],
  },

  "Subsets II": {
    difficulty: "Medium",
    desc: "Generate all subsets allowing duplicates in input, but no duplicate subsets.",
    examples: [
      { input: "[1,2,2]", output: "[[],[1],[2],[1,2],[2,2],[1,2,2]]" },
    ],
    constraints: ["Input may contain duplicates"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  nums.sort((a,b)=>a-b);
  let res = [];
  
  function backtrack(start, path) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i-1]) continue;
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
    interviewQs: [
      {
        q: "How do we avoid duplicates?",
        a: "Skip when nums[i] === nums[i-1].",
      },
    ],
  },

  Permutations: {
    difficulty: "Medium",
    desc: "Generate all permutations of a list.",
    examples: [{ input: "[1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],...]" }],
    constraints: ["All unique numbers"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let res = [];
  function backtrack(path, used) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path, used);
      used[i] = false;
      path.pop();
    }
  }
  backtrack([], {});
  return res;
}`,
    interviewQs: [
      { q: "Permutation vs subset?", a: "Permutation cares about order." },
    ],
  },

  "Permutations II": {
    difficulty: "Medium",
    desc: "Generate all unique permutations for list with duplicates.",
    examples: [{ input: "[1,1,2]", output: "[[1,1,2],[1,2,1],[2,1,1]]" }],
    constraints: ["Avoid duplicate permutations"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  nums.sort((a,b)=>a-b);
  let res = [];
  let used = Array(nums.length).fill(false);

  function backtrack(path) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i-1] && !used[i-1]) continue;

      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      used[i] = false;
      path.pop();
    }
  }
  backtrack([]);
  return res;
}`,
    interviewQs: [
      {
        q: "How avoid duplicates?",
        a: "Skip duplicate unless previous is used.",
      },
    ],
  },

  Combinations: {
    difficulty: "Medium",
    desc: "Return all combinations of k numbers from 1..n.",
    examples: [
      { input: "n=4, k=2", output: "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]" },
    ],
    constraints: ["Use backtracking"],
    starterCode: `function solve(n, k) {
  return [];
}`,
    solution: `function solve(n, k) {
  let res = [];
  function backtrack(start, path) {
    if (path.length === k) {
      res.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(1, []);
  return res;
}`,
    interviewQs: [
      { q: "Difference from subsets?", a: "Choose exactly k numbers." },
    ],
  },

  "Combination Sum": {
    difficulty: "Medium",
    desc: "Find all combinations (repetition allowed) that sum to target.",
    examples: [
      { input: "candidates=[2,3,6,7], target=7", output: "[[7],[2,2,3]]" },
    ],
    constraints: ["Unlimited reuse allowed"],
    starterCode: `function solve(candidates, target) {
  return [];
}`,
    solution: `function solve(candidates, target) {
  let res = [];
  function dfs(start, sum, path) {
    if (sum === target) {
      res.push([...path]);
      return;
    }
    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, sum + candidates[i], path);
      path.pop();
    }
  }
  dfs(0, 0, []);
  return res;
}`,
    interviewQs: [
      { q: "Why pass same index?", a: "Allows reuse of same element." },
    ],
  },

  "Combination Sum II": {
    difficulty: "Medium",
    desc: "Like Combination Sum but each number may be used once; avoid duplicates.",
    examples: [
      {
        input: "candidates=[10,1,2,7,6,1,5], target=8",
        output: "[[1,1,6],[1,2,5],[1,7],[2,6]]",
      },
    ],
    constraints: ["Numbers may repeat"],
    starterCode: `function solve(candidates, target) {
  return [];
}`,
    solution: `function solve(candidates, target) {
  candidates.sort((a,b)=>a-b);
  let res = [];

  function dfs(start, sum, path) {
    if (sum === target) {
      res.push([...path]);
      return;
    }
    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i-1]) continue;
      path.push(candidates[i]);
      dfs(i + 1, sum + candidates[i], path);
      path.pop();
    }
  }
  dfs(0, 0, []);
  return res;
}`,
    interviewQs: [
      {
        q: "Difference from Combination Sum?",
        a: "Single-use per element & skip duplicates.",
      },
    ],
  },

  "Letter Combinations of a Phone Number": {
    difficulty: "Medium",
    desc: "Return all possible letter combinations a digit string can represent.",
    examples: [
      { input: "23", output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
    ],
    constraints: ["Digits 2-9"],
    starterCode: `function solve(digits) {
  return [];
}`,
    solution: `function solve(digits) {
  if (!digits) return [];
  let map = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
  };

  let res = [];
  function backtrack(i, path) {
    if (i === digits.length) {
      res.push(path.join(""));
      return;
    }
    for (let ch of map[digits[i]]) {
      path.push(ch);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
    interviewQs: [
      { q: "Backtracking depth?", a: "Depth equals digits.length." },
    ],
  },

  "Palindrome Partitioning": {
    difficulty: "Medium",
    desc: "Partition string into all possible palindrome substrings.",
    examples: [{ input: '"aab"', output: '[["a","a","b"],["aa","b"]]' }],
    constraints: ["Check palindrome at each step"],
    starterCode: `function solve(s) {
  return [];
}`,
    solution: `function solve(s) {
  let res = [];

  function isPal(str, l, r) {
    while (l < r) {
      if (str[l] !== str[r]) return false;
      l++; r--;
    }
    return true;
  }

  function dfs(start, path) {
    if (start === s.length) {
      res.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPal(s, start, end)) {
        path.push(s.slice(start, end + 1));
        dfs(end + 1, path);
        path.pop();
      }
    }
  }

  dfs(0, []);
  return res;
}`,
    interviewQs: [
      { q: "Why check palindrome inside loop?", a: "Substrings vary in size." },
    ],
  },

  "Beautiful Arrangement": {
    difficulty: "Medium",
    desc: "Count permutations where position i and value fit divisibility rule.",
    examples: [{ input: "n=2", output: "2" }],
    constraints: ["1 <= i <= n"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  let used = Array(n+1).fill(false);
  let count = 0;

  function backtrack(i) {
    if (i > n) {
      count++;
      return;
    }
    for (let num = 1; num <= n; num++) {
      if (!used[num] && (num % i === 0 || i % num === 0)) {
        used[num] = true;
        backtrack(i + 1);
        used[num] = false;
      }
    }
  }

  backtrack(1);
  return count;
}`,
    interviewQs: [
      {
        q: "Why divisibility?",
        a: "Problem constraint defines valid placement.",
      },
    ],
  },

  // Modified Binary Search
  "Binary Search": {
    difficulty: "Easy",
    desc: "Search for a target in a sorted array using binary search.",
    examples: [{ input: "[ -1,0,3,5,9,12 ], target=9", output: "4" }],
    constraints: ["Array sorted"],
    starterCode: `function solve(nums, target) {
  return -1;
}`,
    solution: `function solve(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    else if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
    interviewQs: [
      {
        q: "Why mid = (l+r)//2?",
        a: "Splits search space in half each iteration.",
      },
    ],
  },

  "Search Insert Position": {
    difficulty: "Easy",
    desc: "Return index where target should be inserted in sorted array.",
    examples: [{ input: "[1,3,5,6], target=5", output: "2" }],
    constraints: ["Binary search"],
    starterCode: `function solve(nums, target) {
  return 0;
}`,
    solution: `function solve(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    let m = (l + r) >> 1;
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return l;
}`,
    interviewQs: [
      { q: "What if target not found?", a: "Return the left pointer." },
    ],
  },

  "Search in Rotated Sorted Array": {
    difficulty: "Medium",
    desc: "Search for target in rotated sorted array without duplicates.",
    examples: [{ input: "[4,5,6,7,0,1,2], target=0", output: "4" }],
    constraints: ["O(log n)"],
    starterCode: `function solve(nums, target) {
  return -1;
}`,
    solution: `function solve(nums, target) {
  let l = 0, r = nums.length - 1;

  while (l <= r) {
    let m = (l + r) >> 1;

    if (nums[m] === target) return m;

    if (nums[l] <= nums[m]) { 
      if (nums[l] <= target && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else {
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return -1;
}`,
    interviewQs: [
      { q: "How detect sorted half?", a: "Compare nums[l] and nums[m]." },
    ],
  },

  "Search in Rotated Sorted Array II": {
    difficulty: "Medium",
    desc: "Search target in rotated array allowing duplicates.",
    examples: [{ input: "[2,5,6,0,0,1,2], target=0", output: "true" }],
    constraints: ["Duplicates allowed"],
    starterCode: `function solve(nums, target) {
  return false;
}`,
    solution: `function solve(nums, target) {
  let l = 0, r = nums.length - 1;

  while (l <= r) {
    let m = (l + r) >> 1;

    if (nums[m] === target) return true;

    if (nums[l] === nums[m] && nums[m] === nums[r]) {
      l++; r--;
    } else if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else {
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return false;
}`,
    interviewQs: [
      {
        q: "Why shrink boundaries l++ & r--?",
        a: "Duplicates prevent determining sorted half.",
      },
    ],
  },

  "Find Minimum in Rotated Sorted Array": {
    difficulty: "Medium",
    desc: "Find the minimum element in rotated sorted array.",
    examples: [{ input: "[3,4,5,1,2]", output: "1" }],
    constraints: ["No duplicates"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let l = 0, r = nums.length - 1;

  while (l < r) {
    let m = (l + r) >> 1;
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }
  return nums[l];
}`,
    interviewQs: [
      { q: "Why compare mid with right?", a: "Min lies in unsorted side." },
    ],
  },

  "Find Peak Element": {
    difficulty: "Medium",
    desc: "Find any peak element (nums[i] > neighbors).",
    examples: [{ input: "[1,2,3,1]", output: "2" }],
    constraints: ["O(log n)"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    let m = (l + r) >> 1;
    if (nums[m] > nums[m+1]) r = m;
    else l = m + 1;
  }
  return l;
}`,
    interviewQs: [
      {
        q: "Why compare m with m+1?",
        a: "Peak always exists in higher slope direction.",
      },
    ],
  },

  "Search in a Sorted Array of Unknown Size": {
    difficulty: "Medium",
    desc: "Search target when array length unknown (ArrayReader interface).",
    examples: [{ input: "target=9", output: "index" }],
    constraints: ["Exponential range expansion"],
    starterCode: `function solve(reader, target) {
  return -1;
}`,
    solution: `function solve(reader, target) {
  let l = 0, r = 1;

  while (reader.get(r) < target) {
    l = r;
    r <<= 1;
  }

  while (l <= r) {
    let m = (l + r) >> 1;
    let val = reader.get(m);
    if (val === target) return m;
    if (val > target) r = m - 1;
    else l = m + 1;
  }

  return -1;
}`,
    interviewQs: [{ q: "Why double r?", a: "Find bounds containing target." }],
  },

  "Find First and Last Position of Element": {
    difficulty: "Medium",
    desc: "Binary search for first and last index of target in sorted array.",
    examples: [{ input: "[5,7,7,8,8,10], target=8", output: "[3,4]" }],
    constraints: ["Two binary searches"],
    starterCode: `function solve(nums, target) {
  return [-1, -1];
}`,
    solution: `function solve(nums, target) {
  function findFirst() {
    let l = 0, r = nums.length - 1, idx = -1;
    while (l <= r) {
      let m = (l+r)>>1;
      if (nums[m] >= target) r = m - 1;
      else l = m + 1;
      if (nums[m] === target) idx = m;
    }
    return idx;
  }

  function findLast() {
    let l = 0, r = nums.length - 1, idx = -1;
    while (l <= r) {
      let m = (l+r)>>1;
      if (nums[m] <= target) l = m + 1;
      else r = m - 1;
      if (nums[m] === target) idx = m;
    }
    return idx;
  }

  return [findFirst(), findLast()];
}`,
    interviewQs: [
      {
        q: "Why two searches?",
        a: "Mid moves differently for left/right boundaries.",
      },
    ],
  },

  "Capacity To Ship Packages Within D Days": {
    difficulty: "Medium",
    desc: "Binary search minimum ship capacity to deliver within D days.",
    examples: [{ input: "weights=[1,2,3,1,1], D=4", output: "3" }],
    constraints: ["Binary search answer"],
    starterCode: `function solve(weights, days) {
  return 0;
}`,
    solution: `function solve(weights, days) {
  let l = Math.max(...weights), r = weights.reduce((a,b)=>a+b, 0);

  function can(cap) {
    let d = 1, curr = 0;
    for (let w of weights) {
      if (curr + w > cap) {
        d++;
        curr = 0;
      }
      curr += w;
    }
    return d <= days;
  }

  while (l < r) {
    let m = (l + r) >> 1;
    if (can(m)) r = m;
    else l = m + 1;
  }
  return l;
}`,
    interviewQs: [
      { q: "What is search space?", a: "maxWeight → sum(weights)." },
    ],
  },

  "Split Array Largest Sum": {
    difficulty: "Hard",
    desc: "Split array into m subarrays minimizing largest sum.",
    examples: [{ input: "[7,2,5,10,8], m=2", output: "18" }],
    constraints: ["Binary search answer"],
    starterCode: `function solve(nums, m) {
  return 0;
}`,
    solution: `function solve(nums, m) {
  let l = Math.max(...nums), r = nums.reduce((a,b)=>a+b, 0);

  function can(maxSum) {
    let count = 1, curr = 0;
    for (let n of nums) {
      if (curr + n > maxSum) {
        count++;
        curr = 0;
      }
      curr += n;
    }
    return count <= m;
  }

  while (l < r) {
    let mid = (l + r) >> 1;
    if (can(mid)) r = mid;
    else l = mid + 1;
  }
  return l;
}`,
    interviewQs: [
      {
        q: "Relation to shipping capacity?",
        a: "Same binary search pattern on max section sum.",
      },
    ],
  },

  // Bitwise XOR

  "Single Number": {
    difficulty: "Easy",
    desc: "Find the number that appears exactly once when every other number appears twice.",
    examples: [{ input: "[4,1,2,1,2]", output: "4" }],
    constraints: ["O(1) extra space"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let xor = 0;
  for (let n of nums) xor ^= n;
  return xor;
}`,
    interviewQs: [
      { q: "Why XOR works?", a: "a^a=0 and 0^b=b → cancels duplicates." },
    ],
  },

  "Single Number II": {
    difficulty: "Medium",
    desc: "Every number appears three times except one — find it.",
    examples: [{ input: "[2,2,3,2]", output: "3" }],
    constraints: ["O(1) space"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let ones = 0, twos = 0;
  for (let n of nums) {
    ones = (ones ^ n) & ~twos;
    twos = (twos ^ n) & ~ones;
  }
  return ones;
}`,
    interviewQs: [
      { q: "Why two bit counters?", a: "Track bits seen once & twice." },
    ],
  },

  "Single Number III": {
    difficulty: "Medium",
    desc: "Find the two numbers that appear exactly once.",
    examples: [{ input: "[1,2,1,3,2,5]", output: "[3,5]" }],
    constraints: ["O(n)", "O(1) space"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let xor = 0;
  for (let n of nums) xor ^= n;

  let diff = xor & -xor;

  let a = 0, b = 0;
  for (let n of nums) {
    if (n & diff) a ^= n;
    else b ^= n;
  }
  return [a, b];
}`,
    interviewQs: [
      {
        q: "Why xor & -xor?",
        a: "Extracts lowest set bit to separate numbers.",
      },
    ],
  },

  "Missing Number": {
    difficulty: "Easy",
    desc: "Find the missing number in range 0..n.",
    examples: [{ input: "[3,0,1]", output: "2" }],
    constraints: ["XOR trick allowed"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) xor ^= i ^ nums[i];
  return xor;
}`,
    interviewQs: [
      { q: "Alternate method?", a: "Formula n*(n+1)/2 - sum(nums)." },
    ],
  },

  "Find the Difference": {
    difficulty: "Easy",
    desc: "Given strings s and t (t is s + one extra character), find the extra char.",
    examples: [{ input: 's="abcd", t="abcde"', output: '"e"' }],
    constraints: ["Use XOR"],
    starterCode: `function solve(s, t) {
  return "";
}`,
    solution: `function solve(s, t) {
  let xor = 0;
  for (let ch of s) xor ^= ch.charCodeAt();
  for (let ch of t) xor ^= ch.charCodeAt();
  return String.fromCharCode(xor);
}`,
    interviewQs: [
      { q: "Why XOR chars?", a: "Cancels identical chars; leftover is extra." },
    ],
  },

  "Sum of Two Integers": {
    difficulty: "Medium",
    desc: "Compute a + b without using + or - operators.",
    examples: [{ input: "a=1, b=2", output: "3" }],
    constraints: ["Use bit manipulation"],
    starterCode: `function solve(a, b) {
  return 0;
}`,
    solution: `function solve(a, b) {
  while (b !== 0) {
    let carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
    interviewQs: [
      {
        q: "Why XOR + carry?",
        a: "XOR adds bits without carry, AND<<1 adds carry.",
      },
    ],
  },

  "Reverse Bits": {
    difficulty: "Easy",
    desc: "Reverse the bits of a 32-bit unsigned integer.",
    examples: [
      { input: "00000010100101000001111010011100", output: "964176192" },
    ],
    constraints: ["32-bit"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res << 1) | (n & 1);
    n >>>= 1;
  }
  return res >>> 0;
}`,
    interviewQs: [
      {
        q: "Why >>> instead of >>?",
        a: ">>> is zero-fill shift for unsigned values.",
      },
    ],
  },

  "Counting Bits": {
    difficulty: "Easy",
    desc: "Return count of 1s (set bits) for each number 0..n.",
    examples: [{ input: "n=5", output: "[0,1,1,2,1,2]" }],
    constraints: ["DP approach preferred"],
    starterCode: `function solve(n) {
  return [];
}`,
    solution: `function solve(n) {
  let res = [0];
  for (let i = 1; i <= n; i++) {
    res[i] = res[i >> 1] + (i & 1);
  }
  return res;
}`,
    interviewQs: [
      { q: "Why dp[i >> 1]?", a: "Remove last bit and add current last bit." },
    ],
  },

  "Hamming Distance": {
    difficulty: "Easy",
    desc: "Find number of differing bits between two integers.",
    examples: [{ input: "x=1, y=4", output: "2" }],
    constraints: ["Use XOR"],
    starterCode: `function solve(x, y) {
  return 0;
}`,
    solution: `function solve(x, y) {
  let xor = x ^ y, count = 0;
  while (xor > 0) {
    xor &= xor - 1;
    count++;
  }
  return count;
}`,
    interviewQs: [{ q: "Why xor & (xor-1)?", a: "Removes lowest set bit." }],
  },

  "Total Hamming Distance": {
    difficulty: "Medium",
    desc: "Sum of pairwise Hamming distances over all number pairs.",
    examples: [{ input: "[4,14,2]", output: "6" }],
    constraints: ["Avoid O(n²) brute force"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let n = nums.length, total = 0;

  for (let bit = 0; bit < 32; bit++) {
    let ones = 0;
    for (let num of nums) {
      ones += (num >> bit) & 1;
    }
    total += ones * (n - ones);
  }
  return total;
}`,
    interviewQs: [
      { q: "Why ones * zeros?", a: "Each differing pair contributes 1." },
    ],
  },

  // Top 'K' Elements

  "Kth Largest Element in an Array": {
    difficulty: "Medium",
    desc: "Find the kth largest element in an unsorted array.",
    examples: [{ input: "[3,2,1,5,6,4], k=2", output: "5" }],
    constraints: ["Use min-heap or Quickselect"],
    starterCode: `function solve(nums, k) {
  return 0;
}`,
    solution: `function solve(nums, k) {
  let heap = [];
  for (let n of nums) {
    heap.push(n);
    heap.sort((a,b)=>a-b);
    if (heap.length > k) heap.shift();
  }
  return heap[0];
}`,
    interviewQs: [{ q: "Why a min-heap of size k?", a: "Root = kth largest." }],
  },

  "Top K Frequent Elements": {
    difficulty: "Medium",
    desc: "Return the k most frequent elements.",
    examples: [{ input: "[1,1,1,2,2,3], k=2", output: "[1,2]" }],
    constraints: ["O(n log k)"],
    starterCode: `function solve(nums, k) {
  return [];
}`,
    solution: `function solve(nums, k) {
  let freq = {};
  for (let x of nums) freq[x] = (freq[x] || 0) + 1;

  let heap = [];
  for (let key in freq) {
    heap.push([freq[key], Number(key)]);
    heap.sort((a,b)=>a[0]-b[0]);
    if (heap.length > k) heap.shift();
  }
  return heap.map(x=>x[1]);
}`,
    interviewQs: [
      { q: "Better than sorting freq?", a: "Min-heap keeps top k only." },
    ],
  },

  "K Closest Points to Origin": {
    difficulty: "Medium",
    desc: "Return the k closest points to (0,0).",
    examples: [{ input: "[[1,3],[-2,2]], k=1", output: "[[-2,2]]" }],
    constraints: ["Use max-heap of size k"],
    starterCode: `function solve(points, k) {
  return [];
}`,
    solution: `function solve(points, k) {
  let heap = [];
  function dist(p){ return p[0]*p[0] + p[1]*p[1]; }

  for (let p of points) {
    heap.push([dist(p), p]);
    heap.sort((a,b)=>b[0]-a[0]);
    if (heap.length > k) heap.shift();
  }
  return heap.map(x=>x[1]);
}`,
    interviewQs: [
      { q: "Why max-heap?", a: "Remove farthest when exceeding k." },
    ],
  },

  "Sort Characters By Frequency": {
    difficulty: "Medium",
    desc: "Sort characters of string by frequency decreasing.",
    examples: [{ input: "tree", output: "eert" }],
    constraints: ["Count + sort"],
    starterCode: `function solve(s) {
  return "";
}`,
    solution: `function solve(s) {
  let freq = {};
  for (let c of s) freq[c] = (freq[c] || 0) + 1;

  let arr = Object.entries(freq)
    .sort((a,b)=>b[1]-a[1]);

  let result = "";
  for (let [c,f] of arr) result += c.repeat(f);
  return result;
}`,
    interviewQs: [{ q: "Can we use max-heap?", a: "Yes, common alternative." }],
  },

  "Kth Largest Element in a Stream": {
    difficulty: "Medium",
    desc: "Maintain data structure to always return kth largest.",
    examples: [{ input: "k=3, nums=[4,5,8,2], add(3)", output: "4" }],
    constraints: ["Min-heap of size k"],
    starterCode: `class KthLargest {
  constructor(k, nums){}
  add(val){}
}`,
    solution: `class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = [];
    for (let n of nums) this.add(n);
  }

  add(val) {
    this.heap.push(val);
    this.heap.sort((a,b)=>a-b);
    if (this.heap.length > this.k) this.heap.shift();
    return this.heap[0];
  }
}`,
    interviewQs: [{ q: "Why min-heap?", a: "Root holds kth largest." }],
  },

  "Reorganize String": {
    difficulty: "Medium",
    desc: "Rearrange characters so no two adjacent are same.",
    examples: [{ input: "aab", output: "aba" }],
    constraints: ["Use max-heap"],
    starterCode: `function solve(s) {
  return "";
}`,
    solution: `function solve(s) {
  let freq = {};
  for (let c of s) freq[c] = (freq[c] || 0) + 1;

  let heap = Object.entries(freq).sort((a,b)=>b[1]-a[1]);

  let res = "";
  while (heap.length > 1) {
    let [c1,f1] = heap.shift();
    let [c2,f2] = heap.shift();
    res += c1 + c2;
    if (--f1 > 0) heap.push([c1,f1]);
    if (--f2 > 0) heap.push([c2,f2]);
    heap.sort((a,b)=>b[1]-a[1]);
  }

  if (heap.length === 1) {
    let [c,f] = heap[0];
    if (f > 1) return "";
    res += c;
  }
  return res;
}`,
    interviewQs: [
      { q: "Why pick 2 highest freq letters?", a: "Avoid adjacency conflict." },
    ],
  },

  "Least Number of Unique Integers after K Removals": {
    difficulty: "Medium",
    desc: "Remove k elements minimizing number of unique integers.",
    examples: [{ input: "[4,3,1,1,3,3,2], k=3", output: "2" }],
    constraints: ["Use min-heap sorted by frequency"],
    starterCode: `function solve(arr, k) {
  return 0;
}`,
    solution: `function solve(arr, k) {
  let freq = {};
  for (let x of arr) freq[x] = (freq[x] || 0) + 1;

  let counts = Object.values(freq).sort((a,b)=>a-b);

  for (let f of counts) {
    if (k >= f) k -= f;
    else break;
  }
  return counts.filter(f=>f>k).length;
}`,
    interviewQs: [
      { q: "Strategy?", a: "Remove smallest frequency items first." },
    ],
  },

  "Top K Frequent Words": {
    difficulty: "Medium",
    desc: "Return k most frequent words sorted by freq then lexicographically.",
    examples: [
      {
        input: '["i","love","leetcode","i","love","coding"], k=2',
        output: '["i","love"]',
      },
    ],
    constraints: ["freq desc, word asc"],
    starterCode: `function solve(words, k) {
  return [];
}`,
    solution: `function solve(words, k) {
  let freq = {};
  for (let w of words) freq[w] = (freq[w] || 0) + 1;

  let arr = Object.entries(freq).sort((a,b)=>{
    if (b[1] === a[1]) return a[0].localeCompare(b[0]);
    return b[1] - a[1];
  });

  return arr.slice(0,k).map(x=>x[0]);
}`,
    interviewQs: [
      { q: "Tie-break rule?", a: "Lexicographically smaller word first." },
    ],
  },

  "Find K Closest Elements": {
    difficulty: "Medium",
    desc: "Return k closest elements to x in sorted array.",
    examples: [{ input: "[1,2,3,4,5], k=4, x=3", output: "[1,2,3,4]" }],
    constraints: ["Use binary search on window"],
    starterCode: `function solve(arr, k, x) {
  return [];
}`,
    solution: `function solve(arr, k, x) {
  let l = 0, r = arr.length - k;
  while (l < r) {
    let m = (l + r) >> 1;
    if (x - arr[m] > arr[m+k] - x) l = m + 1;
    else r = m;
  }
  return arr.slice(l, l + k);
}`,
    interviewQs: [
      { q: "Why BS on answer?", a: "Window start index is monotonic." },
    ],
  },

  "Maximum Frequency Stack": {
    difficulty: "Hard",
    desc: "Stack that pops most frequent element; if tie, most recent.",
    examples: [
      {
        input: "push(5), push(7), push(5), push(7), push(4), push(5)",
        output: "pop→5",
      },
    ],
    constraints: ["freq map + stacks per freq"],
    starterCode: `class FreqStack {
  constructor(){}
  push(val){}
  pop(){}
}`,
    solution: `class FreqStack {
  constructor() {
    this.freq = {};
    this.group = {};
    this.maxFreq = 0;
  }

  push(val) {
    this.freq[val] = (this.freq[val] || 0) + 1;
    let f = this.freq[val];
    if (!this.group[f]) this.group[f] = [];
    this.group[f].push(val);
    this.maxFreq = Math.max(this.maxFreq, f);
  }

  pop() {
    let val = this.group[this.maxFreq].pop();
    this.freq[val]--;
    if (this.group[this.maxFreq].length === 0) this.maxFreq--;
    return val;
  }
}`,
    interviewQs: [
      {
        q: "Data structure choice?",
        a: "Stack list for each frequency level.",
      },
    ],
  },

  // K-way Merge

  "Merge K Sorted Lists": {
    difficulty: "Hard",
    desc: "Merge k sorted linked lists into one sorted list.",
    examples: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    ],
    constraints: ["Use min-heap"],
    starterCode: `function solve(lists) {
  return null;
}`,
    solution: `function solve(lists) {
  let heap = [];

  function push(node) {
    if (node) {
      heap.push(node);
      heap.sort((a,b)=>a.val-b.val);
    }
  }

  for (let list of lists) push(list);

  let dummy = { val: -1, next: null };
  let curr = dummy;

  while (heap.length) {
    let node = heap.shift();
    curr.next = node;
    curr = curr.next;
    push(node.next);
  }
  return dummy.next;
}`,
    interviewQs: [
      { q: "Why min-heap?", a: "Always extract smallest of k heads." },
    ],
  },

  "Kth Smallest Element in a Sorted Matrix": {
    difficulty: "Medium",
    desc: "Each row & column sorted; return kth smallest.",
    examples: [{ input: "[[1,5,9],[10,11,13],[12,13,15]], k=8", output: "13" }],
    constraints: ["Use min-heap or binary search"],
    starterCode: `function solve(matrix, k) {
  return 0;
}`,
    solution: `function solve(matrix, k) {
  let heap = [];
  let n = matrix.length;

  for (let i = 0; i < n; i++) {
    heap.push([matrix[i][0], i, 0]);
  }
  heap.sort((a,b)=>a[0]-b[0]);

  while (k-- > 1) {
    let [val,r,c] = heap.shift();
    if (c + 1 < matrix[0].length) {
      heap.push([matrix[r][c+1], r, c+1]);
      heap.sort((a,b)=>a[0]-b[0]);
    }
  }
  return heap[0][0];
}`,
    interviewQs: [
      { q: "Better approach?", a: "Binary search on value range + counting." },
    ],
  },

  "Find K Pairs with Smallest Sums": {
    difficulty: "Medium",
    desc: "Given two sorted arrays, return k pairs with smallest sum.",
    examples: [
      {
        input: "nums1=[1,7,11], nums2=[2,4,6], k=3",
        output: "[[1,2],[1,4],[1,6]]",
      },
    ],
    constraints: ["Use min-heap"],
    starterCode: `function solve(nums1, nums2, k) {
  return [];
}`,
    solution: `function solve(nums1, nums2, k) {
  if (!nums1.length || !nums2.length) return [];
  let heap = [];
  let res = [];

  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }
  heap.sort((a,b)=>a[0]-b[0]);

  while (k-- > 0 && heap.length) {
    let [sum, i, j] = heap.shift();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j+1], i, j+1]);
      heap.sort((a,b)=>a[0]-b[0]);
    }
  }
  return res;
}`,
    interviewQs: [
      { q: "Why only push next column?", a: "Rows already sorted." },
    ],
  },

  "Smallest Range Covering Elements from K Lists": {
    difficulty: "Hard",
    desc: "Find smallest range containing at least one element from each list.",
    examples: [{ input: "[[4,10,15],[1,5,20],[0,2,8]]", output: "[4,5]" }],
    constraints: ["Use min-heap + track max"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let heap = [];
  let maxVal = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    heap.push([nums[i][0], i, 0]);
    maxVal = Math.max(maxVal, nums[i][0]);
  }
  heap.sort((a,b)=>a[0]-b[0]);

  let res = [-Infinity, Infinity];

  while (true) {
    let [val,r,c] = heap.shift();
    if (maxVal - val < res[1] - res[0]) res = [val, maxVal];

    if (c + 1 === nums[r].length) break;

    let next = nums[r][c+1];
    maxVal = Math.max(maxVal, next);
    heap.push([next, r, c+1]);
    heap.sort((a,b)=>a[0]-b[0]);
  }

  return res;
}`,
    interviewQs: [
      { q: "Why track max?", a: "Range = [min in heap, max seen]." },
    ],
  },

  "Merge Sorted Array": {
    difficulty: "Easy",
    desc: "Merge sorted nums2 into nums1 in-place.",
    examples: [
      { input: "nums1=[1,2,3,0,0,0], nums2=[2,5,6]", output: "[1,2,2,3,5,6]" },
    ],
    constraints: ["Do from back"],
    starterCode: `function solve(nums1, m, nums2, n) {
  return nums1;
}`,
    solution: `function solve(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (j >= 0) {
    nums1[k--] = i >= 0 && nums1[i] > nums2[j]
      ? nums1[i--]
      : nums2[j--];
  }
  return nums1;
}`,
    interviewQs: [
      { q: "Why fill from end?", a: "Avoid overwriting nums1 values." },
    ],
  },

  "Kth Smallest Number in Multiplication Table": {
    difficulty: "Hard",
    desc: "Find kth smallest in m×n multiplication table.",
    examples: [{ input: "m=3, n=3, k=5", output: "3" }],
    constraints: ["Binary search on value range"],
    starterCode: `function solve(m, n, k) {
  return 0;
}`,
    solution: `function solve(m, n, k) {
  let l = 1, r = m * n;

  function count(x) {
    let s = 0;
    for (let i = 1; i <= m; i++) {
      s += Math.min(x / i | 0, n);
    }
    return s;
  }

  while (l < r) {
    let mid = (l + r) >> 1;
    if (count(mid) >= k) r = mid;
    else l = mid + 1;
  }
  return l;
}`,
    interviewQs: [
      { q: "Why not build table?", a: "Too large; use BS on value." },
    ],
  },

  "Ugly Number II": {
    difficulty: "Medium",
    desc: "Find the nth ugly number (prime factors 2,3,5).",
    examples: [{ input: "n=10", output: "12" }],
    constraints: ["DP with 3 pointers"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  let dp = [1];
  let i2 = 0, i3 = 0, i5 = 0;

  while (dp.length < n) {
    let next = Math.min(dp[i2]*2, dp[i3]*3, dp[i5]*5);
    dp.push(next);
    if (next === dp[i2]*2) i2++;
    if (next === dp[i3]*3) i3++;
    if (next === dp[i5]*5) i5++;
  }
  return dp[n-1];
}`,
    interviewQs: [{ q: "Why 3 pointers?", a: "Track multiples for 2,3,5." }],
  },

  "Super Ugly Number": {
    difficulty: "Medium",
    desc: "Generalization of ugly numbers with custom primes.",
    examples: [{ input: "n=12, primes=[2,7,13,19]", output: "32" }],
    constraints: ["DP with k pointers"],
    starterCode: `function solve(n, primes) {
  return 0;
}`,
    solution: `function solve(n, primes) {
  let k = primes.length;
  let dp = [1];
  let idx = new Array(k).fill(0);

  while (dp.length < n) {
    let next = Infinity;
    for (let i = 0; i < k; i++) {
      next = Math.min(next, dp[idx[i]] * primes[i]);
    }
    dp.push(next);
    for (let i = 0; i < k; i++) {
      if (dp[idx[i]] * primes[i] === next) idx[i]++;
    }
  }
  return dp[n-1];
}`,
    interviewQs: [{ q: "Why array of pointers?", a: "One for each prime." }],
  },

  "Find Median from Data Stream": {
    difficulty: "Hard",
    desc: "Insert numbers & get running median.",
    examples: [{ input: "add(1), add(2), find()", output: "1.5" }],
    constraints: ["two heaps"],
    starterCode: `class MedianFinder {
  constructor(){}
  addNum(num){}
  findMedian(){}
}`,
    solution: `class MedianFinder {
  constructor() {
    this.low = [];
    this.high = [];
  }

  addNum(num) {
    this.low.push(num);
    this.low.sort((a,b)=>b-a);

    this.high.push(this.low.shift());
    this.high.sort((a,b)=>a-b);

    if (this.high.length > this.low.length) {
      this.low.push(this.high.shift());
      this.low.sort((a,b)=>b-a);
    }
  }

  findMedian() {
    return this.low.length > this.high.length
      ? this.low[0]
      : (this.low[0] + this.high[0]) / 2;
  }
}`,
    interviewQs: [
      { q: "Why low=maxheap high=minheap?", a: "Keeps halves balanced." },
    ],
  },

  "Swim in Rising Water": {
    difficulty: "Hard",
    desc: "Min time required to go from (0,0) to (n-1,n-1) on grid.",
    examples: [{ input: "grid=[[0,2],[1,3]]", output: "3" }],
    constraints: ["Use min-heap (Dijkstra)"],
    starterCode: `function solve(grid) {
  return 0;
}`,
    solution: `function solve(grid) {
  let n = grid.length;
  let heap = [[grid[0][0],0,0]];
  let seen = Array.from({length:n},()=>Array(n).fill(false));
  let dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  while (heap.length) {
    heap.sort((a,b)=>a[0]-b[0]);
    let [t,x,y] = heap.shift();
    if (x===n-1 && y===n-1) return t;
    if (seen[x][y]) continue;
    seen[x][y] = true;

    for (let [dx,dy] of dirs) {
      let nx = x+dx, ny = y+dy;
      if (nx>=0 && ny>=0 && nx<n && ny<n && !seen[nx][ny]) {
        heap.push([Math.max(t, grid[nx][ny]), nx, ny]);
      }
    }
  }
}`,
    interviewQs: [
      { q: "Why Dijkstra?", a: "Minimize maximum cell encountered." },
    ],
  },

  // 0/1 Knapsack (DP)

  "Partition Equal Subset Sum": {
    difficulty: "Medium",
    desc: "Determine if array can be partitioned into two subsets with equal sum.",
    examples: [{ input: "[1,5,11,5]", output: "true" }],
    constraints: ["0/1 knapsack"],
    starterCode: `function solve(nums) {
  return false;
}`,
    solution: `function solve(nums) {
  let sum = nums.reduce((a,b)=>a+b,0);
  if (sum % 2 !== 0) return false;
  let target = sum / 2;

  let dp = Array(target+1).fill(false);
  dp[0] = true;

  for (let num of nums) {
    for (let t = target; t >= num; t--) {
      dp[t] = dp[t] || dp[t-num];
    }
  }
  return dp[target];
}`,
    interviewQs: [
      { q: "Why reverse loop t--?", a: "To avoid double-counting element." },
    ],
  },

  "Target Sum": {
    difficulty: "Medium",
    desc: "Count number of ways to assign +/− signs to reach target.",
    examples: [{ input: "nums=[1,1,1,1,1], target=3", output: "5" }],
    constraints: ["Transform to subset-sum count"],
    starterCode: `function solve(nums, target) {
  return 0;
}`,
    solution: `function solve(nums, target) {
  let sum = nums.reduce((a,b)=>a+b,0);
  if ((sum + target) % 2 !== 0 || sum < Math.abs(target)) return 0;

  let S = (sum + target) / 2;
  let dp = Array(S+1).fill(0);
  dp[0] = 1;

  for (let n of nums) {
    for (let s = S; s >= n; s--) {
      dp[s] += dp[s-n];
    }
  }
  return dp[S];
}`,
    interviewQs: [
      {
        q: "Why convert to subset sum?",
        a: "Equation + and - converts to target.",
      },
    ],
  },

  "Last Stone Weight II": {
    difficulty: "Medium",
    desc: "Minimize the last remaining stone by partitioning weights.",
    examples: [{ input: "[2,7,4,1,8,1]", output: "1" }],
    constraints: ["Subset sum to get closest to half"],
    starterCode: `function solve(stones) {
  return 0;
}`,
    solution: `function solve(stones) {
  let sum = stones.reduce((a,b)=>a+b,0);
  let target = Math.floor(sum / 2);

  let dp = Array(target+1).fill(false);
  dp[0] = true;

  for (let w of stones) {
    for (let t = target; t >= w; t--) {
      dp[t] = dp[t] || dp[t-w];
    }
  }

  for (let t = target; t >= 0; t--) {
    if (dp[t]) return sum - 2*t;
  }
}`,
    interviewQs: [
      {
        q: "Relation to partition equal subset sum?",
        a: "Same idea: minimize difference.",
      },
    ],
  },

  "Ones and Zeroes": {
    difficulty: "Medium",
    desc: "Max number of strings formed with m zeros and n ones.",
    examples: [
      { input: "strs=['10','0001','111001','1','0'], m=5, n=3", output: "4" },
    ],
    constraints: ["2D knapsack"],
    starterCode: `function solve(strs, m, n) {
  return 0;
}`,
    solution: `function solve(strs, m, n) {
  let dp = Array.from({length:m+1},()=>Array(n+1).fill(0));

  for (let s of strs) {
    let zeros = s.split('').filter(c=>c==='0').length;
    let ones = s.length - zeros;

    for (let i = m; i >= zeros; i--) {
      for (let j = n; j >= ones; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i-zeros][j-ones] + 1);
      }
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Why reverse loop?",
        a: "0/1 knapsack: avoid reuse of same string.",
      },
    ],
  },

  "Profitable Schemes": {
    difficulty: "Hard",
    desc: "Count profitable schemes with group size & profit constraints.",
    examples: [
      { input: "n=5, minProfit=3, group=[2,2], profit=[2,3]", output: "2" },
    ],
    constraints: ["3D DP collapses to 2D"],
    starterCode: `function solve(n, minProfit, group, profit) {
  return 0;
}`,
    solution: `function solve(n, minProfit, group, profit) {
  let MOD = 1e9+7;
  let dp = Array.from({length:n+1},()=>Array(minProfit+1).fill(0));
  dp[0][0] = 1;

  for (let idx = 0; idx < group.length; idx++) {
    let g = group[idx], p = profit[idx];
    for (let people = n; people >= g; people--) {
      for (let pr = minProfit; pr >= 0; pr--) {
        dp[people][Math.min(minProfit, pr+p)] =
          (dp[people][Math.min(minProfit, pr+p)] + dp[people-g][pr]) % MOD;
      }
    }
  }

  let sum = 0;
  for (let i = 0; i <= n; i++) sum = (sum + dp[i][minProfit]) % MOD;
  return sum;
}`,
    interviewQs: [
      { q: "Why clamp profit?", a: "Nothing above minProfit matters." },
    ],
  },

  "Coin Change 2": {
    difficulty: "Medium",
    desc: "Count ways to make up amount using coins (unlimited).",
    examples: [{ input: "amount=5, coins=[1,2,5]", output: "4" }],
    constraints: ["unbounded knapsack"],
    starterCode: `function solve(amount, coins) {
  return 0;
}`,
    solution: `function solve(amount, coins) {
  let dp = Array(amount+1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }
  return dp[amount];
}`,
    interviewQs: [
      {
        q: "Why outer loop is coins?",
        a: "Avoid counting permutation duplicates.",
      },
    ],
  },

  "Combination Sum IV": {
    difficulty: "Medium",
    desc: "Count number of ordered combinations to reach target.",
    examples: [{ input: "nums=[1,2,3], target=4", output: "7" }],
    constraints: ["Order matters"],
    starterCode: `function solve(nums, target) {
  return 0;
}`,
    solution: `function solve(nums, target) {
  let dp = Array(target+1).fill(0);
  dp[0] = 1;

  for (let t = 1; t <= target; t++) {
    for (let n of nums) {
      if (t >= n) dp[t] += dp[t-n];
    }
  }
  return dp[target];
}`,
    interviewQs: [
      {
        q: "Difference from Coin Change 2?",
        a: "Here order matters → reversed loops.",
      },
    ],
  },

  "House Robber": {
    difficulty: "Medium",
    desc: "Max money without robbing adjacent houses.",
    examples: [{ input: "[2,7,9,3,1]", output: "12" }],
    constraints: ["1D DP"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let rob1 = 0, rob2 = 0;
  for (let n of nums) {
    let newRob = Math.max(rob1 + n, rob2);
    rob1 = rob2;
    rob2 = newRob;
  }
  return rob2;
}`,
    interviewQs: [
      {
        q: "Why only 2 variables?",
        a: "DP[i] depends only on last two states.",
      },
    ],
  },

  "Solving Questions With Brainpower": {
    difficulty: "Medium",
    desc: "Choose questions with skip costs for maximum points.",
    examples: [{ input: "[[3,2],[4,3],[4,4],[2,5]]", output: "5" }],
    constraints: ["Reverse DP"],
    starterCode: `function solve(questions) {
  return 0;
}`,
    solution: `function solve(questions) {
  let n = questions.length;
  let dp = Array(n+1).fill(0);

  for (let i = n-1; i >= 0; i--) {
    let [points, skip] = questions[i];
    let take = points + (i+skip+1 <= n ? dp[i+skip+1] : 0);
    let skipOp = dp[i+1];
    dp[i] = Math.max(take, skipOp);
  }
  return dp[0];
}`,
    interviewQs: [
      { q: "Why reverse iteration?", a: "Future state needed when skipping." },
    ],
  },

  "Shopping Offers": {
    difficulty: "Medium",
    desc: "Minimize cost with individual prices + special bundled offers.",
    examples: [
      {
        input: "price=[2,5], needs=[3,2], special=[[3,0,5],[1,2,10]]",
        output: "14",
      },
    ],
    constraints: ["DFS + memo"],
    starterCode: `function solve(price, special, needs) {
  return 0;
}`,
    solution: `function solve(price, special, needs) {
  let memo = new Map();

  function dfs(needs) {
    let key = needs.join(",");
    if (memo.has(key)) return memo.get(key);

    let cost = needs.reduce((sum, need, i)=>sum + need * price[i], 0);

    for (let sp of special) {
      let tmp = [...needs];
      let valid = true;
      for (let i = 0; i < needs.length; i++) {
        tmp[i] -= sp[i];
        if (tmp[i] < 0) { valid = false; break; }
      }
      if (valid) cost = Math.min(cost, sp[sp.length-1] + dfs(tmp));
    }

    memo.set(key, cost);
    return cost;
  }

  return dfs(needs);
}`,
    interviewQs: [
      { q: "Why memo needed?", a: "Avoid recomputation of same needs vector." },
    ],
  },

  // Unbounded Knapsack

  "Coin Change": {
    difficulty: "Medium",
    desc: "Find the fewest coins needed to make up the amount.",
    examples: [{ input: "coins=[1,2,5], amount=11", output: "3" }],
    constraints: ["Unbounded knapsack (min)"],
    starterCode: `function solve(coins, amount) {
  return 0;
}`,
    solution: `function solve(coins, amount) {
  let dp = Array(amount+1).fill(Infinity);
  dp[0] = 0;

  for (let coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] = Math.min(dp[a], dp[a-coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    interviewQs: [{ q: "Why Infinity?", a: "Represents unreachable state." }],
  },

  "Coin Change II": {
    difficulty: "Medium",
    desc: "Count number of combinations that make amount.",
    examples: [{ input: "amount=5, coins=[1,2,5]", output: "4" }],
    constraints: ["Combination count (order ignored)"],
    starterCode: `function solve(amount, coins) {
  return 0;
}`,
    solution: `function solve(amount, coins) {
  let dp = Array(amount+1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a-coin];
    }
  }
  return dp[amount];
}`,
    interviewQs: [
      { q: "Why coins outer loop?", a: "To avoid permutation overcounting." },
    ],
  },

  "Unbounded Knapsack": {
    difficulty: "Medium",
    desc: "Maximize value with unlimited copies of items.",
    examples: [{ input: "weights=[2,3,4], values=[4,5,6], W=7", output: "11" }],
    constraints: ["Classic unbounded knapsack"],
    starterCode: `function solve(weights, values, W) {
  return 0;
}`,
    solution: `function solve(weights, values, W) {
  let dp = Array(W+1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    let w = weights[i], v = values[i];
    for (let cap = w; cap <= W; cap++) {
      dp[cap] = Math.max(dp[cap], dp[cap-w] + v);
    }
  }
  return dp[W];
}`,
    interviewQs: [
      {
        q: "Difference vs 0/1 knapsack?",
        a: "Cap loop moves forward (allow reuse).",
      },
    ],
  },

  "Rod Cutting": {
    difficulty: "Medium",
    desc: "Max revenue by cutting rod of length n.",
    examples: [{ input: "n=4, prices=[1,5,8,9]", output: "10" }],
    constraints: ["Unbounded knapsack"],
    starterCode: `function solve(prices, n) {
  return 0;
}`,
    solution: `function solve(prices, n) {
  let dp = Array(n+1).fill(0);

  for (let length = 1; length <= n; length++) {
    for (let cut = 1; cut <= length; cut++) {
      dp[length] = Math.max(dp[length], prices[cut-1] + dp[length-cut]);
    }
  }
  return dp[n];
}`,
    interviewQs: [
      { q: "Why nested loops?", a: "Try every possible cut size." },
    ],
  },

  "Integer Break": {
    difficulty: "Medium",
    desc: "Break integer n into sum of integers for maximum product.",
    examples: [{ input: "n=10", output: "36" }],
    constraints: ["DP or math"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  let dp = Array(n+1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      dp[i] = Math.max(dp[i], j * (i-j), j * dp[i-j]);
    }
  }
  return dp[n];
}`,
    interviewQs: [
      { q: "Why j*(i-j) vs j*dp[i-j]?", a: "Decide break vs keep integer." },
    ],
  },

  "Perfect Squares": {
    difficulty: "Medium",
    desc: "Minimum number of perfect squares summing to n.",
    examples: [{ input: "n=12", output: "3" }],
    constraints: ["DP O(n√n)"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  let dp = Array(n+1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let s = 1; s*s <= i; s++) {
      dp[i] = Math.min(dp[i], dp[i - s*s] + 1);
    }
  }
  return dp[n];
}`,
    interviewQs: [
      { q: "Why squares loop?", a: "Try all perfect squares ≤ i." },
    ],
  },

  "Minimum Cost For Tickets": {
    difficulty: "Medium",
    desc: "Min cost to travel on given days with 1/7/30-day passes.",
    examples: [{ input: "days=[1,4,6,7,8,20], costs=[2,7,15]", output: "11" }],
    constraints: ["DP by day"],
    starterCode: `function solve(days, costs) {
  return 0;
}`,
    solution: `function solve(days, costs) {
  let last = days[days.length - 1];
  let travel = new Set(days);
  let dp = Array(last+1).fill(0);

  for (let d = 1; d <= last; d++) {
    if (!travel.has(d)) {
      dp[d] = dp[d-1];
    } else {
      dp[d] = Math.min(
        dp[d-1] + costs[0],
        dp[Math.max(0, d-7)] + costs[1],
        dp[Math.max(0, d-30)] + costs[2]
      );
    }
  }
  return dp[last];
}`,
    interviewQs: [
      { q: "Why dp by day?", a: "We simulate calendar days' minimal cost." },
    ],
  },

  "Decode Ways": {
    difficulty: "Medium",
    desc: "Count the ways to decode string of digits (A=1..Z=26).",
    examples: [{ input: '"226"', output: "3" }],
    constraints: ["DP[i] depends on single & double digit"],
    starterCode: `function solve(s) {
  return 0;
}`,
    solution: `function solve(s) {
  if (s[0] === '0') return 0;
  let n = s.length;

  let dp = Array(n+1).fill(0);
  dp[0] = dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    let one = s[i-1] - '0';
    let two = Number(s.substring(i-2, i));

    if (one >= 1) dp[i] += dp[i-1];
    if (two >= 10 && two <= 26) dp[i] += dp[i-2];
  }
  return dp[n];
}`,
    interviewQs: [
      { q: "Why check one and two digits?", a: "Valid decoding rules." },
    ],
  },

  "Word Break": {
    difficulty: "Medium",
    desc: "Return true if s can be segmented into dictionary words.",
    examples: [{ input: 's="leetcode", dict=["leet","code"]', output: "true" }],
    constraints: ["DP on substring"],
    starterCode: `function solve(s, wordDict) {
  return false;
}`,
    solution: `function solve(s, wordDict) {
  let dict = new Set(wordDict);
  let n = s.length;
  let dp = Array(n+1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = i-1; j >= 0; j--) {
      if (dp[j] && dict.has(s.slice(j,i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}`,
    interviewQs: [
      { q: "Why DP not BFS?", a: "DP avoids repeated substring checks." },
    ],
  },

  "Combination Sum IV": {
    difficulty: "Medium",
    desc: "Count ordered combinations to reach target.",
    examples: [{ input: "nums=[1,2,3], target=4", output: "7" }],
    constraints: ["Order matters"],
    starterCode: `function solve(nums, target) {
  return 0;
}`,
    solution: `function solve(nums, target) {
  let dp = Array(target+1).fill(0);
  dp[0] = 1;

  for (let t = 1; t <= target; t++) {
    for (let n of nums) {
      if (t >= n) dp[t] += dp[t - n];
    }
  }
  return dp[target];
}`,
    interviewQs: [
      {
        q: "Why reverse loops compared to Coin Change 2?",
        a: "Here permutations matter.",
      },
    ],
  },

  // Fibonacci Numbers

  "Fibonacci Number": {
    difficulty: "Easy",
    desc: "Return nth Fibonacci number.",
    examples: [{ input: "n=5", output: "5" }],
    constraints: ["0 ≤ n ≤ 30"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  if (n < 2) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    interviewQs: [{ q: "Why iterative?", a: "Avoid recursion overhead." }],
  },

  "Climbing Stairs": {
    difficulty: "Easy",
    desc: "Number of ways to climb stairs taking 1 or 2 steps.",
    examples: [{ input: "n=3", output: "3" }],
    constraints: ["Fibonacci pattern"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    interviewQs: [
      {
        q: "Relation to Fibonacci?",
        a: "Same recurrence: f(n)=f(n-1)+f(n-2).",
      },
    ],
  },

  "Min Cost Climbing Stairs": {
    difficulty: "Easy",
    desc: "Min cost to climb stairs where cost is paid when stepping on index.",
    examples: [{ input: "cost=[10,15,20]", output: "15" }],
    constraints: ["DP"],
    starterCode: `function solve(cost) {
  return 0;
}`,
    solution: `function solve(cost) {
  let n = cost.length;
  let a = 0, b = 0;
  for (let i = 2; i <= n; i++) {
    let c = Math.min(b + cost[i-1], a + cost[i-2]);
    a = b;
    b = c;
  }
  return b;
}`,
    interviewQs: [
      {
        q: "Why start from step index 2?",
        a: "Virtual top beyond last stair.",
      },
    ],
  },

  "House Robber": {
    difficulty: "Medium",
    desc: "Max money robbed without robbing adjacent houses.",
    examples: [{ input: "[2,7,9,3,1]", output: "12" }],
    constraints: ["1D DP"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let rob1 = 0, rob2 = 0;
  for (let n of nums) {
    let newRob = Math.max(rob1 + n, rob2);
    rob1 = rob2;
    rob2 = newRob;
  }
  return rob2;
}`,
    interviewQs: [
      {
        q: "Why only 2 variables?",
        a: "DP[n] only depends on DP[n-1], DP[n-2].",
      },
    ],
  },

  "House Robber II": {
    difficulty: "Medium",
    desc: "Circular version of house robber; first & last are adjacent.",
    examples: [{ input: "[2,3,2]", output: "3" }],
    constraints: ["Split into two linear problems"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  if (nums.length === 1) return nums[0];

  function rob(arr) {
    let a = 0, b = 0;
    for (let x of arr) {
      let c = Math.max(b, a + x);
      a = b;
      b = c;
    }
    return b;
  }

  return Math.max(
    rob(nums.slice(0, nums.length - 1)),
    rob(nums.slice(1))
  );
}`,
    interviewQs: [
      { q: "Why two slices?", a: "You can't take both first and last house." },
    ],
  },

  "N-th Tribonacci Number": {
    difficulty: "Easy",
    desc: "Each term = sum of previous 3 numbers.",
    examples: [{ input: "n=4", output: "4" }],
    constraints: ["0 ≤ n ≤ 37"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  if (n < 3) return [0,1,1][n];
  let a = 0, b = 1, c = 1;
  for (let i = 3; i <= n; i++) {
    let d = a + b + c;
    a = b;
    b = c;
    c = d;
  }
  return c;
}`,
    interviewQs: [
      { q: "Why 3 variables?", a: "Tribonacci uses 3-term recurrence." },
    ],
  },

  "Delete and Earn": {
    difficulty: "Medium",
    desc: "Picking x gives points but deletes x±1. Convert to House Robber.",
    examples: [{ input: "[3,4,2]", output: "6" }],
    constraints: ["Transform to freq array"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let maxVal = Math.max(...nums);
  let sum = Array(maxVal+1).fill(0);

  for (let x of nums) sum[x] += x;

  let a = 0, b = 0;
  for (let v of sum) {
    let c = Math.max(b, a + v);
    a = b;
    b = c;
  }
  return b;
}`,
    interviewQs: [
      {
        q: "Why similar to House Robber?",
        a: "Selecting x blocks x-1 and x+1.",
      },
    ],
  },

  "Jump Game": {
    difficulty: "Medium",
    desc: "Return true if you can reach last index with given jumps.",
    examples: [{ input: "[2,3,1,1,4]", output: "true" }],
    constraints: ["Greedy optimal"],
    starterCode: `function solve(nums) {
  return false;
}`,
    solution: `function solve(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`,
    interviewQs: [
      { q: "Why greedy?", a: "DP not needed; max reachable index is enough." },
    ],
  },

  "Jump Game II": {
    difficulty: "Medium",
    desc: "Minimum jumps to reach last index.",
    examples: [{ input: "[2,3,1,1,4]", output: "2" }],
    constraints: ["Greedy optimal"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let jumps = 0, end = 0, far = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]);
    if (i === end) {
      jumps++;
      end = far;
    }
  }
  return jumps;
}`,
    interviewQs: [
      { q: "Why greedy works?", a: "Always use max reachable window." },
    ],
  },

  "Maximum Subarray": {
    difficulty: "Easy",
    desc: "Find contiguous subarray with maximum sum.",
    examples: [{ input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" }],
    constraints: ["Kadane’s Algorithm"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let cur = 0, best = -Infinity;
  for (let n of nums) {
    cur = Math.max(n, cur + n);
    best = Math.max(best, cur);
  }
  return best;
}`,
    interviewQs: [
      { q: "Why Kadane?", a: "O(n) and optimal for contiguous sums." },
    ],
  },

  // Palindromic Subsequence
  "Longest Palindromic Substring": {
    difficulty: "Medium",
    desc: "Return the longest palindromic substring in s.",
    examples: [{ input: '"babad"', output: '"bab" // or "aba"' }],
    constraints: ["1 ≤ s.length ≤ 1000"],
    starterCode: `function solve(s) {
  return "";
}`,
    solution: `function solve(s) {
  if (!s) return "";
  let start = 0, end = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--; r++;
    }
    return [l + 1, r - 1];
  }

  for (let i = 0; i < s.length; i++) {
    let [l1, r1] = expand(i, i);
    if (r1 - l1 > end - start) { start = l1; end = r1; }

    let [l2, r2] = expand(i, i + 1);
    if (r2 - l2 > end - start) { start = l2; end = r2; }
  }
  return s.slice(start, end + 1);
}`,
    interviewQs: [
      {
        q: "Time complexity?",
        a: "O(n²) expand-around-center. Manacher reduces to O(n).",
      },
    ],
  },

  "Longest Palindromic Subsequence": {
    difficulty: "Medium",
    desc: "Return length of the longest palindromic subsequence in s.",
    examples: [{ input: '"bbbab"', output: "4 // 'bbbb'" }],
    constraints: ["1 ≤ s.length ≤ 1000"],
    starterCode: `function solve(s) {
  return 0;
}`,
    solution: `function solve(s) {
  const n = s.length;
  if (n === 0) return 0;
  let dp = Array.from({length: n}, () => Array(n).fill(0));

  for (let i = n-1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i+1; j < n; j++) {
      if (s[i] === s[j]) dp[i][j] = 2 + (dp[i+1][j-1] || 0);
      else dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
    }
  }
  return dp[0][n-1];
}`,
    interviewQs: [
      {
        q: "Space optimization?",
        a: "Use 1D dp (iterate i from n-1..0) with careful prev tracking.",
      },
    ],
  },

  "Palindromic Substrings": {
    difficulty: "Medium",
    desc: "Count all palindromic substrings in s.",
    examples: [{ input: '"aaa"', output: "6" }],
    constraints: ["1 ≤ s.length ≤ 1000"],
    starterCode: `function solve(s) {
  return 0;
}`,
    solution: `function solve(s) {
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--; r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd
    expand(i, i + 1); // even
  }
  return count;
}`,
    interviewQs: [
      {
        q: "Alternate approach?",
        a: "DP table (O(n²) time & O(n²) space) or Manacher's algorithm for O(n).",
      },
    ],
  },

  "Palindrome Partitioning": {
    difficulty: "Medium",
    desc: "Return all palindrome partitionings of s (all splits where each part is palindrome).",
    examples: [{ input: '"aab"', output: '[["a","a","b"],["aa","b"]]' }],
    constraints: ["1 ≤ s.length ≤ 16 (combinatorial)"],
    starterCode: `function solve(s) {
  return [];
}`,
    solution: `function solve(s) {
  const n = s.length;
  const res = [];
  const path = [];
  // Precompute isPal[l][r]
  const isPal = Array.from({length:n}, () => Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i < 2 || isPal[i+1][j-1])) isPal[i][j] = true;
    }
  }

  function dfs(start) {
    if (start === n) {
      res.push([...path]);
      return;
    }
    for (let end = start; end < n; end++) {
      if (isPal[start][end]) {
        path.push(s.slice(start, end + 1));
        dfs(end + 1);
        path.pop();
      }
    }
  }

  dfs(0);
  return res;
}`,
    interviewQs: [
      {
        q: "Why precompute palindrome table?",
        a: "Avoid repeated palindrome checks; speeds up backtracking.",
      },
    ],
  },

  "Palindrome Partitioning II": {
    difficulty: "Hard",
    desc: "Return min cuts needed to partition s into palindromic substrings.",
    examples: [{ input: '"aab"', output: "1 // 'aa' | 'b'" }],
    constraints: ["1 ≤ s.length ≤ 2000"],
    starterCode: `function solve(s) {
  return 0;
}`,
    solution: `function solve(s) {
  const n = s.length;
  if (n === 0) return 0;

  // precompute palindrome table
  const isPal = Array.from({length:n}, () => Array(n).fill(false));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j] && (j - i < 2 || isPal[i+1][j-1])) isPal[i][j] = true;
    }
  }

  const cuts = Array(n).fill(Infinity);
  for (let i = 0; i < n; i++) {
    if (isPal[0][i]) {
      cuts[i] = 0;
      continue;
    }
    for (let j = 0; j < i; j++) {
      if (isPal[j+1][i]) cuts[i] = Math.min(cuts[i], cuts[j] + 1);
    }
  }
  return cuts[n-1];
}`,
    interviewQs: [
      {
        q: "Why dp on cuts?",
        a: "cuts[i] = min cuts partitioning s[0..i]; combine with palindrome table.",
      },
    ],
  },

  "Minimum Insertion Steps to Make a String Palindrome": {
    difficulty: "Hard",
    desc: "Minimum number of insertions to make s a palindrome.",
    examples: [{ input: '"leetcode"', output: "5" }],
    constraints: ["1 ≤ s.length ≤ 500"],
    starterCode: `function solve(s) {
  return 0;
}`,
    solution: `function solve(s) {
  // min insertions = n - LPS(s) where LPS = longest palindromic subsequence
  const n = s.length;
  const t = s.split("").reverse().join("");
  // compute LCS(s, t)
  let dp = Array.from({length: n+1}, () => Array(n+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i-1] === t[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  const lps = dp[n][n];
  return n - lps;
}`,
    interviewQs: [
      {
        q: "Why LCS with reversed string?",
        a: "LCS(s, reverse(s)) equals longest palindromic subsequence.",
      },
    ],
  },

  "Valid Palindrome III": {
    difficulty: "Hard",
    desc: "Given s and k, can you make s a palindrome by removing at most k chars? (or return min deletions required).",
    examples: [
      {
        input: 's="abcdeca", k=2',
        output: "true // remove 'b' and 'e' → 'acdca'",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 1000"],
    starterCode: `function solve(s, k) {
  return false;
}`,
    solution: `function solve(s, k) {
  // Equivalent: min deletions to make palindrome <= k
  const n = s.length;
  const t = s.split("").reverse().join("");
  // compute LCS length
  let dp = Array.from({length: n+1}, () => Array(n+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i-1] === t[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  const lps = dp[n][n];
  const minDeletions = n - lps;
  return minDeletions <= k;
}`,
    interviewQs: [
      {
        q: "Time/space?",
        a: "O(n²) time and O(n²) space; can optimize space to O(n).",
      },
    ],
  },

  "Longest Common Subsequence": {
    difficulty: "Medium",
    desc: "Return length of the longest common subsequence of text1 and text2.",
    examples: [{ input: 'text1="abcde", text2="ace"', output: "3" }],
    constraints: ["1 ≤ len ≤ 1000"],
    starterCode: `function solve(text1, text2) {
  return 0;
}`,
    solution: `function solve(text1, text2) {
  const m = text1.length, n = text2.length;
  let dp = Array.from({length: m+1}, () => Array(n+1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Space optimization?",
        a: "Use two 1D arrays of length n+1 and roll.",
      },
    ],
  },

  "Shortest Palindrome": {
    difficulty: "Hard",
    desc: "Add characters in front of s to make it a palindrome with minimal length; return the resulting palindrome.",
    examples: [{ input: '"aacecaaa"', output: '"aaacecaaa"' }],
    constraints: ["1 ≤ s.length ≤ 10^5 (efficient methods required)"],
    starterCode: `function solve(s) {
  return "";
}`,
    solution: `function solve(s) {
  // Find the longest prefix of s that is a palindrome.
  // Use KMP on string: s + '#' + reverse(s) to get LPS.
  const rev = s.split("").reverse().join("");
  const combined = s + '#' + rev;
  const lps = Array(combined.length).fill(0);

  for (let i = 1; i < combined.length; i++) {
    let len = lps[i-1];
    while (len > 0 && combined[i] !== combined[len]) len = lps[len-1];
    if (combined[i] === combined[len]) len++;
    lps[i] = len;
  }

  const add = rev.slice(0, s.length - lps[combined.length - 1]);
  return add + s;
}`,
    interviewQs: [
      {
        q: "Why KMP trick?",
        a: "LPS of s+'#'+rev gives length of longest palindromic prefix in O(n).",
      },
    ],
  },

  "Count Different Palindromic Subsequences": {
    difficulty: "Hard",
    desc: "Count distinct palindromic subsequences in s (modulo large prime).",
    examples: [{ input: '"bccb"', output: "6" }],
    constraints: ["Return count modulo 10^9+7; 1 ≤ s.length ≤ 1000"],
    starterCode: `function solve(s) {
  return 0;
}`,
    solution: `function solve(s) {
  // DP over intervals: dp[i][j] = count of distinct palindromic subsequences in s[i..j]
  const MOD = 1e9 + 7;
  const n = s.length;
  const dp = Array.from({length: n}, () => Array(n).fill(0));
  const next = Array(n).fill(-1);
  const prev = Array(n).fill(-1);
  const last = {};

  for (let i = 0; i < n; i++) {
    prev[i] = last[s[i]] !== undefined ? last[s[i]] : -1;
    last[s[i]] = i;
  }
  Object.keys(last).forEach(k => delete last[k]);
  for (let i = n - 1; i >= 0; i--) {
    next[i] = last[s[i]] !== undefined ? last[s[i]] : -1;
    last[s[i]] = i;
  }

  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] !== s[j]) {
        dp[i][j] = (dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1] + MOD) % MOD;
      } else {
        let ni = next[i], pj = prev[j];
        if (ni === -1 || pj === -1 || ni > pj) {
          dp[i][j] = (2 * dp[i+1][j-1] + 2) % MOD;
        } else if (ni === pj) {
          dp[i][j] = (2 * dp[i+1][j-1] + 1) % MOD;
        } else {
          dp[i][j] = (2 * dp[i+1][j-1] - dp[ni+1][pj-1] + MOD) % MOD;
        }
      }
    }
  }
  return dp[0][n-1];
}`,
    interviewQs: [
      {
        q: "Why next/prev arrays?",
        a: "Locate inside duplicates to avoid double-counting palindromic subsequences.",
      },
    ],
  },

  // Longest Common Substring
  "Longest Common Subsequence": {
    difficulty: "Medium",
    desc: "Return the length of the longest common subsequence of two strings.",
    examples: [{ input: 'text1="abcde", text2="ace"', output: "3" }],
    constraints: ["1 ≤ len(a),len(b) ≤ 1000"],
    starterCode: `function solve(text1, text2) {
  return 0;
}`,
    solution: `function solve(text1, text2) {
  const m = text1.length, n = text2.length;
  let dp = Array.from({length:m+1},()=>Array(n+1).fill(0));

  for (let i=1;i<=m;i++){
    for (let j=1;j<=n;j++){
      if(text1[i-1]===text2[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Can LCS be space optimized?",
        a: "Yes — use rolling 1D DP of size n+1.",
      },
    ],
  },

  "Longest Common Substring": {
    difficulty: "Medium",
    desc: "Return the length of the longest common contiguous substring.",
    examples: [{ input: 's1="abcd", s2="bcd"', output: "3" }],
    constraints: ["Contiguous substring, not subsequence"],
    starterCode: `function solve(s1, s2) {
  return 0;
}`,
    solution: `function solve(s1, s2) {
  const m=s1.length,n=s2.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
  let maxLen=0;

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      if(s1[i-1]===s2[j-1]){
        dp[i][j]=dp[i-1][j-1]+1;
        maxLen=Math.max(maxLen,dp[i][j]);
      }
    }
  }
  return maxLen;
}`,
    interviewQs: [
      {
        q: "Difference vs LCS?",
        a: "LCS is subsequence; LCSubstring is contiguous.",
      },
    ],
  },

  "Edit Distance": {
    difficulty: "Hard",
    desc: "Minimum operations (insert, delete, replace) to convert s to t.",
    examples: [{ input: 's="horse", t="ros"', output: "3" }],
    constraints: ["Classic DP"],
    starterCode: `function solve(word1, word2) {
  return 0;
}`,
    solution: `function solve(word1, word2) {
  const m=word1.length,n=word2.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(0));

  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      if(word1[i-1]===word2[j-1]) dp[i][j]=dp[i-1][j-1];
      else dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
    }
  }
  return dp[m][n];
}`,
    interviewQs: [{ q: "Operations allowed?", a: "Insert, delete, replace." }],
  },

  "Distinct Subsequences": {
    difficulty: "Hard",
    desc: "Count how many subsequences of s equal t.",
    examples: [{ input: 's="rabbbit", t="rabbit"', output: "3" }],
    constraints: ["DP with large counts"],
    starterCode: `function solve(s, t) {
  return 0;
}`,
    solution: `function solve(s, t) {
  const m=s.length,n=t.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(0));

  for(let i=0;i<=m;i++) dp[i][0]=1;

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      dp[i][j] = dp[i-1][j];
      if(s[i-1]===t[j-1]) dp[i][j]+=dp[i-1][j-1];
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Why dp[i][0]=1?",
        a: "Empty t is always 1 subsequence of any prefix of s.",
      },
    ],
  },

  "Minimum ASCII Delete Sum for Two Strings": {
    difficulty: "Medium",
    desc: "Min ASCII sum of deletions to make two strings equal.",
    examples: [{ input: 's1="sea", s2="eat"', output: "231" }],
    constraints: ["DP similar to LCS"],
    starterCode: `function solve(s1, s2) {
  return 0;
}`,
    solution: `function solve(s1, s2) {
  const m=s1.length,n=s2.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(0));

  for(let i=1;i<=m;i++) dp[i][0]=dp[i-1][0]+s1.charCodeAt(i-1);
  for(let j=1;j<=n;j++) dp[0][j]=dp[0][j-1]+s2.charCodeAt(j-1);

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      if(s1[i-1]===s2[j-1]) dp[i][j]=dp[i-1][j-1];
      else dp[i][j]=Math.min(
        s1.charCodeAt(i-1)+dp[i-1][j],
        s2.charCodeAt(j-1)+dp[i][j-1]
      );
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Relation to LCS?",
        a: "If chars match → no cost; else delete cheaper one.",
      },
    ],
  },

  "Delete Operation for Two Strings": {
    difficulty: "Medium",
    desc: "Min deletions to make two strings equal.",
    examples: [{ input: 's1="sea", s2="eat"', output: "2" }],
    constraints: ["Based on LCS"],
    starterCode: `function solve(s1, s2) {
  return 0;
}`,
    solution: `function solve(s1, s2) {
  const m=s1.length,n=s2.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(0));

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      if(s1[i-1]===s2[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
    }
  }

  let lcs=dp[m][n];
  return (m - lcs) + (n - lcs);
}`,
    interviewQs: [
      {
        q: "Why LCS?",
        a: "Longest common subsequence remains; delete the rest.",
      },
    ],
  },

  "Shortest Common Supersequence": {
    difficulty: "Hard",
    desc: "Return the shortest string that has both str1 and str2 as subsequences.",
    examples: [{ input: 'str1="abac", str2="cab"', output: '"cabac"' }],
    constraints: ["Build from LCS"],
    starterCode: `function solve(str1, str2) {
  return "";
}`,
    solution: `function solve(str1, str2) {
  const m=str1.length,n=str2.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(0));

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      if(str1[i-1]===str2[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
    }
  }

  let i=m, j=n, res="";
  while(i>0 && j>0){
    if(str1[i-1]===str2[j-1]){
      res = str1[i-1] + res;
      i--; j--;
    } else if(dp[i-1][j] > dp[i][j-1]){
      res = str1[i-1] + res;
      i--;
    } else {
      res = str2[j-1] + res;
      j--;
    }
  }
  while(i>0) res = str1[--i] + res;
  while(j>0) res = str2[--j] + res;
  return res;
}`,
    interviewQs: [
      {
        q: "Why build from LCS?",
        a: "LCS determines shared core; prepend all leftover chars.",
      },
    ],
  },

  "Interleaving String": {
    difficulty: "Hard",
    desc: "Check if s3 is formed by interleaving s1 and s2.",
    examples: [
      { input: 's1="aabcc", s2="dbbca", s3="aadbbcbcac"', output: "true" },
    ],
    constraints: ["DP on grid"],
    starterCode: `function solve(s1, s2, s3) {
  return false;
}`,
    solution: `function solve(s1, s2, s3) {
  const m=s1.length,n=s2.length;
  if(m+n !== s3.length) return false;

  let dp=Array.from({length:m+1},()=>Array(n+1).fill(false));
  dp[0][0]=true;

  for(let i=1;i<=m;i++) dp[i][0]=dp[i-1][0] && s1[i-1]===s3[i-1];
  for(let j=1;j<=n;j++) dp[0][j]=dp[0][j-1] && s2[j-1]===s3[j-1];

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      dp[i][j] = 
        (dp[i-1][j] && s1[i-1]===s3[i+j-1]) ||
        (dp[i][j-1] && s2[j-1]===s3[i+j-1]);
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Why 2D DP?",
        a: "dp[i][j] = can we build s3[0..i+j-1] from s1[0..i-1] & s2[0..j-1]?",
      },
    ],
  },

  "Uncrossed Lines": {
    difficulty: "Medium",
    desc: "Maximum number of connecting lines without crossing — equivalent to LCS.",
    examples: [{ input: "A=[1,4,2], B=[1,2,4]", output: "2" }],
    constraints: ["LCS formulation"],
    starterCode: `function solve(A, B) {
  return 0;
}`,
    solution: `function solve(A, B) {
  const m=A.length,n=B.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(0));

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      if(A[i-1]===B[j-1]) dp[i][j]=dp[i-1][j-1]+1;
      else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Why equal to LCS?",
        a: "Connecting same-value pairs without crossing is LCS.",
      },
    ],
  },

  "Max Dot Product of Two Subsequences": {
    difficulty: "Hard",
    desc: "Maximize dot product of subsequences from nums1 and nums2.",
    examples: [{ input: "nums1=[2,1,-2,5], nums2=[3,0,-6]", output: "18" }],
    constraints: ["DP with careful negative handling"],
    starterCode: `function solve(nums1, nums2) {
  return 0;
}`,
    solution: `function solve(nums1, nums2) {
  const m=nums1.length,n=nums2.length;
  let dp=Array.from({length:m+1},()=>Array(n+1).fill(-Infinity));

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      let prod = nums1[i-1] * nums2[j-1];
      dp[i][j] = Math.max(
        prod,
        prod + Math.max(dp[i-1][j-1], 0),
        dp[i-1][j],
        dp[i][j-1]
      );
    }
  }
  return dp[m][n];
}`,
    interviewQs: [
      {
        q: "Why dp = max(prod, prod + dp[i-1][j-1], ...)?",
        a: "Subsequence may start fresh or extend previous.",
      },
    ],
  },
  // Topological Sort

  "Course Schedule": {
    difficulty: "Medium",
    desc: "Determine if you can finish all courses given prerequisite pairs.",
    examples: [{ input: "num=2, prereq=[[1,0]]", output: "true" }],
    constraints: ["Detect cycle in directed graph"],
    starterCode: `function solve(numCourses, prerequisites) {
  return false;
}`,
    solution: `function solve(numCourses, prerequisites) {
  let graph = Array.from({length:numCourses},()=>[]);
  let indegree = Array(numCourses).fill(0);

  for (let [a,b] of prerequisites) {
    graph[b].push(a);
    indegree[a]++;
  }

  let q = [];
  for (let i=0;i<numCourses;i++)
    if (indegree[i]===0) q.push(i);

  let visited = 0;
  while (q.length) {
    let node = q.shift();
    visited++;
    for (let nxt of graph[node]) {
      if (--indegree[nxt]===0) q.push(nxt);
    }
  }
  return visited === numCourses;
}`,
    interviewQs: [
      {
        q: "Alternative approach?",
        a: "DFS cycle detection using 3-color marking.",
      },
    ],
  },

  "Course Schedule II": {
    difficulty: "Medium",
    desc: "Return ordering of courses you should take to finish all.",
    examples: [{ input: "num=2, prereq=[[1,0]]", output: "[0,1]" }],
    constraints: ["Topological sort"],
    starterCode: `function solve(numCourses, prerequisites) {
  return [];
}`,
    solution: `function solve(numCourses, prerequisites) {
  let graph = Array.from({length:numCourses},()=>[]);
  let indegree = Array(numCourses).fill(0);

  for (let [a,b] of prerequisites) {
    graph[b].push(a);
    indegree[a]++;
  }

  let q=[], order=[];
  for (let i=0;i<numCourses;i++)
    if (indegree[i]===0) q.push(i);

  while (q.length) {
    let node = q.shift();
    order.push(node);
    for (let nxt of graph[node]) {
      if (--indegree[nxt]===0) q.push(nxt);
    }
  }
  return order.length===numCourses ? order : [];
}`,
    interviewQs: [
      {
        q: "How detect impossible?",
        a: "If order size < numCourses → cycle exists.",
      },
    ],
  },

  "Alien Dictionary": {
    difficulty: "Hard",
    desc: "Determine lexicographical ordering of alien language letters.",
    examples: [{ input: '["wrt","wrf","er","ett","rftt"]', output: '"wertf"' }],
    constraints: ["Topological ordering with char graph"],
    starterCode: `function solve(words) {
  return "";
}`,
    solution: `function solve(words) {
  let graph={}, indegree={};
  for (let w of words) for (let c of w) {
    graph[c] = graph[c] || [];
    indegree[c] = 0;
  }

  for (let i=0;i<words.length-1;i++){
    let w1=words[i], w2=words[i+1];
    let minLen=Math.min(w1.length, w2.length);
    if (w1.startsWith(w2) && w1.length>w2.length) return "";
    for (let j=0;j<minLen;j++){
      if (w1[j]!==w2[j]){
        graph[w1[j]].push(w2[j]);
        indegree[w2[j]]++;
        break;
      }
    }
  }

  let q=[], res="";
  for (let c in indegree) if (indegree[c]===0) q.push(c);

  while (q.length){
    let c=q.shift();
    res+=c;
    for (let nxt of graph[c]){
      if (--indegree[nxt]===0) q.push(nxt);
    }
  }

  return res.length===Object.keys(graph).length ? res : "";
}`,
    interviewQs: [
      { q: "Edge case?", a: "Prefix violation → return empty string." },
    ],
  },

  "Sequence Reconstruction": {
    difficulty: "Medium",
    desc: "Return true if original sequence can be uniquely reconstructed from subsequences.",
    examples: [
      { input: "org=[1,2,3], seqs=[[1,2],[1,3],[2,3]]", output: "true" },
    ],
    constraints: ["Topological ordering must be unique"],
    starterCode: `function solve(org, seqs) {
  return false;
}`,
    solution: `function solve(org, seqs) {
  let n = org.length;
  let graph = Array.from({length:n+1},()=>[]);
  let indegree = Array(n+1).fill(0);

  let exists = Array(n+1).fill(false);
  for(let seq of seqs){
    for(let x of seq) exists[x] = true;
  }
  for(let x of org) if(!exists[x]) return false;

  for(let seq of seqs){
    for(let i=1;i<seq.length;i++){
      graph[seq[i-1]].push(seq[i]);
      indegree[seq[i]]++;
    }
  }

  let q=[];
  for(let i=1;i<=n;i++) if(indegree[i]===0) q.push(i);

  let idx=0;
  while(q.length===1){
    let node=q.shift();
    if(org[idx++]!==node) return false;
    for(let nxt of graph[node]){
      if(--indegree[nxt]===0) q.push(nxt);
    }
  }

  return idx===n;
}`,
    interviewQs: [
      { q: "Why queue length must be 1?", a: "Uniqueness of topo order." },
    ],
  },

  "Parallel Courses": {
    difficulty: "Medium",
    desc: "Minimum number of semesters to complete all courses with prerequisites.",
    examples: [{ input: "n=3, relations=[[1,3],[2,3]]", output: "2" }],
    constraints: ["Level-order BFS on DAG"],
    starterCode: `function solve(n, relations) {
  return 0;
}`,
    solution: `function solve(n, relations) {
  let graph = Array.from({length:n+1},()=>[]);
  let indegree = Array(n+1).fill(0);

  for(let [u,v] of relations){
    graph[u].push(v);
    indegree[v]++;
  }

  let q=[], semester=0, taken=0;
  for(let i=1;i<=n;i++) if(indegree[i]===0) q.push(i);

  while(q.length){
    let size=q.length;
    semester++;
    while(size--){
      let cur=q.shift(); taken++;
      for(let nxt of graph[cur]){
        if(--indegree[nxt]===0) q.push(nxt);
      }
    }
  }
  return taken===n ? semester : -1;
}`,
    interviewQs: [
      { q: "Relation to topo levels?", a: "Each BFS layer = semester." },
    ],
  },

  "Minimum Height Trees": {
    difficulty: "Medium",
    desc: "Find all roots of Minimum Height Trees in an undirected graph.",
    examples: [{ input: "n=4, edges=[[1,0],[1,2],[1,3]]", output: "[1]" }],
    constraints: ["Trim leaves level-by-level"],
    starterCode: `function solve(n, edges) {
  return [];
}`,
    solution: `function solve(n, edges) {
  if(n===1) return [0];
  let graph=Array.from({length:n},()=>[]);
  let deg=Array(n).fill(0);

  for(let [u,v] of edges){
    graph[u].push(v);
    graph[v].push(u);
    deg[u]++; deg[v]++;
  }

  let q=[];
  for(let i=0;i<n;i++) if(deg[i]===1) q.push(i);

  let remaining=n;
  while(remaining>2){
    let size=q.length;
    remaining-=size;
    while(size--){
      let leaf=q.shift();
      for(let nei of graph[leaf]){
        if(--deg[nei]===1) q.push(nei);
      }
    }
  }
  return q;
}`,
    interviewQs: [
      {
        q: "Why peel from outer leaves?",
        a: "Centers are last remaining nodes.",
      },
    ],
  },

  "Longest Increasing Path in a Matrix": {
    difficulty: "Hard",
    desc: "Return length of longest strictly increasing path in a matrix.",
    examples: [{ input: "[[9,9,4],[6,6,8],[2,1,1]]", output: "4" }],
    constraints: ["DFS + memo"],
    starterCode: `function solve(matrix) {
  return 0;
}`,
    solution: `function solve(matrix) {
  let m=matrix.length,n=matrix[0].length;
  let memo=Array.from({length:m},()=>Array(n).fill(0));
  let dirs=[[1,0],[-1,0],[0,1],[0,-1]];

  function dfs(x,y){
    if(memo[x][y]) return memo[x][y];
    let best=1;
    for(let [dx,dy] of dirs){
      let nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n && matrix[nx][ny]>matrix[x][y]){
        best=Math.max(best,1+dfs(nx,ny));
      }
    }
    memo[x][y]=best;
    return best;
  }

  let res=1;
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      res=Math.max(res,dfs(i,j));
    }
  }
  return res;
}`,
    interviewQs: [
      { q: "Why memo?", a: "Avoid recomputing DFS for same cell." },
    ],
  },

  "Sort Items by Groups Respecting Dependencies": {
    difficulty: "Hard",
    desc: "Topological sort on groups + items within groups.",
    examples: [
      {
        input: "n=8, m=2, group=[-1,0,0,1,0,1,0,-1]",
        output: "valid ordering",
      },
    ],
    constraints: ["2-level topo sort"],
    starterCode: `function solve(n, m, group, beforeItems) {
  return [];
}`,
    solution: `function solve(n, m, group, beforeItems) {
  for(let i=0;i<n;i++){
    if(group[i]===-1) group[i]=m++;
  }

  let itemGraph=Array.from({length:n},()=>[]);
  let itemIndeg=Array(n).fill(0);
  let groupGraph=Array.from({length:m},()=>[]);
  let groupIndeg=Array(m).fill(0);

  for(let i=0;i<n;i++){
    for(let pre of beforeItems[i]){
      itemGraph[pre].push(i);
      itemIndeg[i]++;

      if(group[pre]!==group[i]){
        groupGraph[group[pre]].push(group[i]);
        groupIndeg[group[i]]++;
      }
    }
  }

  function topo(graph, indeg){
    let q=[], res=[];
    for(let i=0;i<indeg.length;i++) if(indeg[i]===0) q.push(i);
    while(q.length){
      let u=q.shift();
      res.push(u);
      for(let v of graph[u]){
        if(--indeg[v]===0) q.push(v);
      }
    }
    return res.length===indeg.length ? res : [];
  }

  let groupOrder = topo(groupGraph, groupIndeg);
  if(!groupOrder.length) return [];

  let itemOrder = topo(itemGraph, itemIndeg);
  if(!itemOrder.length) return [];

  let bucket={};
  for(let g of groupOrder) bucket[g]=[];

  for(let it of itemOrder) bucket[group[it]].push(it);

  let ans=[];
  for(let g of groupOrder) ans.push(...bucket[g]);
  return ans;
}`,
    interviewQs: [
      {
        q: "Why two topological sorts?",
        a: "One for groups, one for items inside groups.",
      },
    ],
  },

  "Find All Possible Recipes from Given Supplies": {
    difficulty: "Medium",
    desc: "Return all recipes that can be made from ingredients recursively.",
    examples: [
      {
        input:
          'recipes=["bread"], ingredients=[["yeast","flour"]], supplies=["yeast","flour"]',
        output: '["bread"]',
      },
    ],
    constraints: ["Topological resolution of dependencies"],
    starterCode: `function solve(recipes, ingredients, supplies) {
  return [];
}`,
    solution: `function solve(recipes, ingredients, supplies) {
  let n = recipes.length;
  let indegree={}, graph={};

  let sup = new Set(supplies);

  for(let i=0;i<n;i++){
    let r=recipes[i];
    indegree[r]=ingredients[i].length;
    for(let ing of ingredients[i]){
      if(!graph[ing]) graph[ing]=[];
      graph[ing].push(r);
    }
  }

  let q=[...sup], res=[];
  while(q.length){
    let item=q.shift();
    if(graph[item]){
      for(let r of graph[item]){
        if(--indegree[r]===0){
          res.push(r);
          q.push(r);
        }
      }
    }
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Why treat supplies as initial nodes?",
        a: "They have no dependencies.",
      },
    ],
  },

  "Build a Matrix With Conditions": {
    difficulty: "Hard",
    desc: "Build k×k matrix satisfying row- and col-order conditions.",
    examples: [
      {
        input: "k=3, rowCond=[[1,2]], colCond=[[2,3]]",
        output: "valid matrix",
      },
    ],
    constraints: ["Two independent topological sorts"],
    starterCode: `function solve(k, rowCond, colCond) {
  return [];
}`,
    solution: `function solve(k, rowCond, colCond) {
  function topo(k, edges){
    let graph=Array.from({length:k+1},()=>[]);
    let indeg=Array(k+1).fill(0);

    for(let [a,b] of edges){
      graph[a].push(b);
      indeg[b]++;
    }

    let q=[], res=[];
    for(let i=1;i<=k;i++) if(indeg[i]===0) q.push(i);

    while(q.length){
      let u=q.shift();
      res.push(u);
      for(let v of graph[u]){
        if(--indeg[v]===0) q.push(v);
      }
    }
    return res.length===k ? res : [];
  }

  let rowOrder = topo(k, rowCond);
  let colOrder = topo(k, colCond);
  if(!rowOrder.length || !colOrder.length) return [];

  let posR={}, posC={};
  rowOrder.forEach((v,i)=>posR[v]=i);
  colOrder.forEach((v,i)=>posC[v]=i);

  let matrix = Array.from({length:k},()=>Array(k).fill(0));
  for(let x=1;x<=k;x++){
    matrix[posR[x]][posC[x]] = x;
  }
  return matrix;
}`,
    interviewQs: [
      {
        q: "Why two topological sorts?",
        a: "One for row constraints, one for column constraints.",
      },
    ],
  },

  // Union Find
  "Number of Provinces": {
    difficulty: "Medium",
    desc: "Return number of connected components in an adjacency matrix graph.",
    examples: [{ input: "[[1,1,0],[1,1,0],[0,0,1]]", output: "2" }],
    constraints: ["Use DFS or Union-Find"],
    starterCode: `function solve(isConnected) {
  return 0;
}`,
    solution: `function solve(isConnected) {
  const n = isConnected.length;
  let parent = Array.from({length:n}, (_,i)=>i);

  function find(x){ return parent[x]===x ? x : parent[x]=find(parent[x]); }
  function union(a,b){ parent[find(a)] = find(b); }

  for(let i=0;i<n;i++){
    for(let j=i+1;j<n;j++){
      if(isConnected[i][j]) union(i,j);
    }
  }
  let count = new Set(parent.map(find)).size;
  return count;
}`,
    interviewQs: [{ q: "Alternative?", a: "DFS/BFS to count components." }],
  },

  "Redundant Connection": {
    difficulty: "Medium",
    desc: "Find the edge that, when added, forms a cycle in an undirected tree.",
    examples: [{ input: "[[1,2],[1,3],[2,3]]", output: "[2,3]" }],
    constraints: ["Detect cycle with Union-Find"],
    starterCode: `function solve(edges) {
  return [];
}`,
    solution: `function solve(edges) {
  let parent = {};
  function find(x){ if(parent[x]==null) parent[x]=x; return parent[x]===x?x:parent[x]=find(parent[x]); }
  function union(a,b){
    let pa=find(a), pb=find(b);
    if(pa===pb) return false;
    parent[pa]=pb;
    return true;
  }
  for(let [u,v] of edges){
    if(!union(u,v)) return [u,v];
  }
  return [];
}`,
    interviewQs: [
      {
        q: "Why union returns false?",
        a: "Union fails when an edge connects two nodes already connected → cycle.",
      },
    ],
  },

  "Accounts Merge": {
    difficulty: "Medium",
    desc: "Merge emails belonging to same person using Union-Find.",
    examples: [
      {
        input: 'accounts=[["John","a@mail.com","b@mail.com"],...]',
        output: "merged accounts",
      },
    ],
    constraints: ["Union emails by name groups"],
    starterCode: `function solve(accounts) {
  return [];
}`,
    solution: `function solve(accounts) {
  let parent = {};
  function find(x){ return parent[x]===x ? x : parent[x]=find(parent[x]); }
  function union(a,b){ parent[find(a)] = find(b); }

  for(let acc of accounts){
    for(let i=1;i<acc.length;i++){
      if(!parent[acc[i]]) parent[acc[i]]=acc[i];
      union(acc[1], acc[i]);
    }
  }

  let groups={};
  for(let acc of accounts){
    for(let i=1;i<acc.length;i++){
      let p=find(acc[i]);
      groups[p] = groups[p] || new Set();
      groups[p].add(acc[i]);
    }
  }

  let res=[];
  for(let acc of accounts){
    let p=find(acc[1]);
    if(groups[p]){
      res.push([acc[0], ...Array.from(groups[p]).sort()]);
      delete groups[p];
    }
  }
  return res;
}`,
    interviewQs: [{ q: "Key idea?", a: "Union emails; group by parent root." }],
  },

  "Number of Operations to Make Network Connected": {
    difficulty: "Medium",
    desc: "Return min operations to connect all computers; if impossible return -1.",
    examples: [{ input: "n=4, connections=[[0,1],[0,2],[1,2]]", output: "1" }],
    constraints: ["Need at least n-1 edges"],
    starterCode: `function solve(n, connections) {
  return 0;
}`,
    solution: `function solve(n, connections) {
  if(connections.length < n-1) return -1;

  let parent = Array.from({length:n}, (_,i)=>i);
  function find(x){ return parent[x]===x ? x : parent[x]=find(parent[x]); }
  function union(a,b){ parent[find(a)] = find(b); }

  for(let [u,v] of connections) union(u,v);

  let comp = new Set(parent.map(find)).size;
  return comp - 1;
}`,
    interviewQs: [
      {
        q: "Why count components?",
        a: "Need comp-1 extra edges to connect components.",
      },
    ],
  },

  "Most Stones Removed with Same Row or Column": {
    difficulty: "Medium",
    desc: "Max stones you can remove such that at least one stone shares row or col.",
    examples: [{ input: "[[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]", output: "5" }],
    constraints: ["Union row and col nodes"],
    starterCode: `function solve(stones) {
  return 0;
}`,
    solution: `function solve(stones) {
  let parent={};
  function find(x){ if(parent[x]==null) parent[x]=x; return parent[x]===x?x:parent[x]=find(parent[x]); }
  function union(a,b){ parent[find(a)] = find(b); }

  for(let [r,c] of stones){
    union("r"+r, "c"+c);
  }

  let roots=new Set();
  for(let [r,c] of stones){
    roots.add(find("r"+r));
    roots.add(find("c"+c));
  }
  return stones.length - roots.size;
}`,
    interviewQs: [
      {
        q: "Why join rows and columns?",
        a: "Each connected component keeps 1 stone; rest removable.",
      },
    ],
  },

  "Longest Consecutive Sequence": {
    difficulty: "Medium",
    desc: "Return length of longest consecutive sequence.",
    examples: [{ input: "[100,4,200,1,3,2]", output: "4" }],
    constraints: ["Use HashSet or Union-Find"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let set = new Set(nums);
  let best=0;

  for(let x of set){
    if(!set.has(x-1)){        // start of sequence
      let len=1;
      while(set.has(x+len)) len++;
      best=Math.max(best,len);
    }
  }
  return best;
}`,
    interviewQs: [
      {
        q: "Why check x-1?",
        a: "Ensures O(n) by scanning only starts of sequences.",
      },
    ],
  },

  "Graph Valid Tree": {
    difficulty: "Medium",
    desc: "Return true if edges make a valid tree (connected + no cycle).",
    examples: [
      { input: "n=5, edges=[[0,1],[0,2],[0,3],[1,4]]", output: "true" },
    ],
    constraints: ["Tree has n-1 edges and 1 component"],
    starterCode: `function solve(n, edges) {
  return false;
}`,
    solution: `function solve(n, edges) {
  if(edges.length !== n-1) return false;

  let parent = Array.from({length:n},(_,i)=>i);
  function find(x){ return parent[x]===x ? x : parent[x]=find(parent[x]); }
  function union(a,b){
    let pa=find(a), pb=find(b);
    if(pa===pb) return false;
    parent[pa]=pb;
    return true;
  }

  for(let [u,v] of edges){
    if(!union(u,v)) return false;
  }
  return true;
}`,
    interviewQs: [
      {
        q: "Why edges.length != n-1 implies false?",
        a: "Tree must have exactly n-1 edges.",
      },
    ],
  },

  "Number of Islands II": {
    difficulty: "Hard",
    desc: "Dynamically add land and return number of islands after each addition.",
    examples: [
      {
        input: "m=3, n=3, positions=[[0,0],[0,1],[1,2],[2,1]]",
        output: "[1,1,2,3]",
      },
    ],
    constraints: ["Union-Find online connectivity"],
    starterCode: `function solve(m, n, positions) {
  return [];
}`,
    solution: `function solve(m, n, positions) {
  let parent=Array(m*n).fill(-1);
  function idx(x,y){ return x*n+y; }
  function find(x){ return parent[x]===x?x:parent[x]=find(parent[x]); }
  function union(a,b){
    let pa=find(a), pb=find(b);
    if(pa!==pb){ parent[pa]=pb; count--; }
  }

  let dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  let count=0, res=[];

  for(let [x,y] of positions){
    let id=idx(x,y);
    if(parent[id]!==-1){
      res.push(count);
      continue;
    }
    parent[id]=id;
    count++;

    for(let[dx,dy] of dirs){
      let nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n){
        let nid=idx(nx,ny);
        if(parent[nid]!==-1) union(id,nid);
      }
    }
    res.push(count);
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Why parent[id] = -1 initially?",
        a: "Represents water; only become island when added.",
      },
    ],
  },

  "Satisfiability of Equality Equations": {
    difficulty: "Medium",
    desc: "Check if all equations like 'a==b' and 'a!=b' can be satisfied.",
    examples: [{ input: '["a==b","b!=c","c==a"]', output: "false" }],
    constraints: ["Union equalities first"],
    starterCode: `function solve(equations) {
  return false;
}`,
    solution: `function solve(equations) {
  let parent = {};
  function find(x){ if(!parent[x]) parent[x]=x; return parent[x]===x?x:parent[x]=find(parent[x]); }
  function union(a,b){ parent[find(a)] = find(b); }

  for(let eq of equations){
    if(eq[1]==='=') union(eq[0], eq[3]);
  }

  for(let eq of equations){
    if(eq[1]==='!'){
      if(find(eq[0])===find(eq[3])) return false;
    }
  }
  return true;
}`,
    interviewQs: [
      {
        q: "Why join equality first?",
        a: "We must build components before checking inequalities.",
      },
    ],
  },

  "Checking Existence of Edge Length Limited Paths": {
    difficulty: "Hard",
    desc: "For each query (p,q,limit), check if path exists with all edges < limit.",
    examples: [{ input: "n=3, edges, queries", output: "[true,false,...]" }],
    constraints: ["Sort queries + edges; DSU offline"],
    starterCode: `function solve(n, edgeList, queries) {
  return [];
}`,
    solution: `function solve(n, edgeList, queries) {
  edgeList.sort((a,b)=>a[2]-b[2]);

  let q = queries.map((q,i)=>[...q,i]);
  q.sort((a,b)=>a[2]-b[2]);

  let parent = Array.from({length:n},(_,i)=>i);
  function find(x){ return parent[x]===x?x:parent[x]=find(parent[x]); }
  function union(a,b){ parent[find(a)] = find(b); }

  let ans = Array(queries.length).fill(false);
  let i=0;

  for(let [u,v,limit,idx] of q){
    while(i<edgeList.length && edgeList[i][2] < limit){
      union(edgeList[i][0], edgeList[i][1]);
      i++;
    }
    ans[idx] = (find(u)===find(v));
  }
  return ans;
}`,
    interviewQs: [
      {
        q: "Why offline processing?",
        a: "Sorting edges & queries ensures union only edges < limit.",
      },
    ],
  },

  // Trie

  "Implement Trie (Prefix Tree)": {
    difficulty: "Medium",
    desc: "Design a classic Trie with insert, search, and prefix operations.",
    examples: [{ input: 'insert: "apple", search: "apple"', output: "true" }],
    constraints: ["Only lowercase letters"],
    starterCode: `class Trie {
  constructor() {}
  insert(word) {}
  search(word) { return false; }
  startsWith(prefix) { return false; }
}`,
    solution: `class Trie {
  constructor() {
    this.root = {};
  }
  insert(word) {
    let node = this.root;
    for (let c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.end = true;
  }
  search(word) {
    let node = this.root;
    for (let c of word) {
      if (!node[c]) return false;
      node = node[c];
    }
    return !!node.end;
  }
  startsWith(prefix) {
    let node = this.root;
    for (let c of prefix) {
      if (!node[c]) return false;
      node = node[c];
    }
    return true;
  }
}`,
    interviewQs: [
      { q: "Why Trie instead of HashSet?", a: "Fast prefix searching." },
    ],
  },

  "Design Add and Search Words Data Structure": {
    difficulty: "Medium",
    desc: "Add words and search with wildcard '.' support.",
    examples: [{ input: 'add("bad"), search("b.d")', output: "true" }],
    constraints: ["DFS when encountering '.'"],
    starterCode: `class WordDictionary {
  constructor() {}
  addWord(word) {}
  search(word) { return false; }
}`,
    solution: `class WordDictionary {
  constructor() {
    this.root = {};
  }
  addWord(word) {
    let node = this.root;
    for (let c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.end = true;
  }
  search(word) {
    let dfs = (i, node) => {
      if (i === word.length) return !!node.end;
      let c = word[i];
      if (c === '.') {
        for (let key in node) {
          if (key !== 'end' && dfs(i+1, node[key])) return true;
        }
        return false;
      } else {
        return node[c] ? dfs(i+1,node[c]) : false;
      }
    };
    return dfs(0,this.root);
  }
}`,
    interviewQs: [
      { q: "Why DFS?", a: "Wildcard may branch into multiple Trie paths." },
    ],
  },

  "Word Search II": {
    difficulty: "Hard",
    desc: "Find all words from dictionary that exist in the board.",
    examples: [
      {
        input: 'board + ["oath","pea","eat","rain"]',
        output: '["oath","eat"]',
      },
    ],
    constraints: ["Trie + DFS"],
    starterCode: `function solve(board, words) {
  return [];
}`,
    solution: `function solve(board, words) {
  let root = {};
  for (let w of words) {
    let node = root;
    for (let c of w) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.word = w;
  }

  let m = board.length, n = board[0].length, res = [];
  function dfs(x,y,node){
    let c = board[x][y];
    if (!node[c]) return;
    node = node[c];

    if (node.word) {
      res.push(node.word);
      node.word = null;
    }

    board[x][y] = '#';
    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    for (let [dx,dy] of dirs){
      let nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n && board[nx][ny]!=='#')
        dfs(nx,ny,node);
    }
    board[x][y] = c;
  }

  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      dfs(i,j,root);
    }
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Why Trie improves speed?",
        a: "Avoids searching for every word independently.",
      },
    ],
  },

  "Replace Words": {
    difficulty: "Medium",
    desc: "Replace words in a sentence with their shortest root from dictionary.",
    examples: [
      {
        input: 'dict=["cat","bat","rat"], s="the cattle was rattled"',
        output: '"the cat was rat"',
      },
    ],
    constraints: ["Trie prefix search"],
    starterCode: `function solve(dictionary, sentence) {
  return "";
}`,
    solution: `function solve(dictionary, sentence) {
  let root = {};
  for(let w of dictionary){
    let node=root;
    for(let c of w){
      node[c] = node[c] || {};
      node=node[c];
    }
    node.end=true;
  }
  function findRoot(word){
    let node=root, tmp="";
    for(let c of word){
      if(!node[c]) return word;
      tmp+=c;
      node=node[c];
      if(node.end) return tmp;
    }
    return word;
  }
  return sentence.split(" ").map(findRoot).join(" ");
}`,
    interviewQs: [
      {
        q: "Why choose shortest root?",
        a: "Problem definition: smallest prefix in dict.",
      },
    ],
  },

  "Map Sum Pairs": {
    difficulty: "Medium",
    desc: "Insert string->value mappings, sum for all keys with a prefix.",
    examples: [{ input: 'insert("apple",3), sum("ap")', output: "3" }],
    constraints: ["Trie + prefix sums OR hash rebuild"],
    starterCode: `class MapSum {
  constructor() {}
  insert(key, val) {}
  sum(prefix) { return 0; }
}`,
    solution: `class MapSum {
  constructor() {
    this.map = {};
    this.root = {};
  }
  insert(key, val) {
    let diff = val - (this.map[key] || 0);
    this.map[key] = val;
    let node = this.root;
    for (let c of key) {
      if (!node[c]) node[c] = { sum: 0 };
      node[c].sum = (node[c].sum || 0) + diff;
      node = node[c];
    }
  }
  sum(prefix) {
    let node = this.root;
    for (let c of prefix) {
      if (!node[c]) return 0;
      node = node[c];
    }
    return node.sum || 0;
  }
}`,
    interviewQs: [
      {
        q: "Why maintain diff?",
        a: "Overwrite updates must adjust prefix sum.",
      },
    ],
  },

  "Maximum XOR of Two Numbers in an Array": {
    difficulty: "Medium",
    desc: "Find max XOR between any pair of numbers.",
    examples: [{ input: "[3,10,5,25,2,8]", output: "28" }],
    constraints: ["Trie on bits (0..31)"],
    starterCode: `function solve(nums) {
  return 0;
}`,
    solution: `function solve(nums) {
  let root = {};
  function insert(x){
    let node=root;
    for(let i=31;i>=0;i--){
      let b=(x>>i)&1;
      if(!node[b]) node[b]={};
      node=node[b];
    }
  }
  function query(x){
    let node=root, ans=0;
    for(let i=31;i>=0;i--){
      let b=(x>>i)&1, want=1-b;
      if(node[want]){
        ans|=(1<<i);
        node=node[want];
      } else node=node[b];
    }
    return ans;
  }

  insert(nums[0]);
  let best=0;
  for(let i=1;i<nums.length;i++){
    best=Math.max(best, query(nums[i]));
    insert(nums[i]);
  }
  return best;
}`,
    interviewQs: [
      {
        q: "Why bitwise Trie?",
        a: "Greedy match opposite bits to maximize XOR.",
      },
    ],
  },

  "Search Suggestions System": {
    difficulty: "Medium",
    desc: "Return top 3 lexicographically smallest suggestions for each prefix.",
    examples: [
      {
        input: 'products=["mobile","mouse",...], search="mouse"',
        output: "lists per prefix",
      },
    ],
    constraints: ["Trie or binary search sorted array"],
    starterCode: `function solve(products, searchWord) {
  return [];
}`,
    solution: `function solve(products, searchWord) {
  products.sort();
  let res=[], prefix="";

  for(let c of searchWord){
    prefix+=c;
    let start = products.findIndex(p => p.startsWith(prefix));
    if(start===-1){ res.push([]); continue; }

    let temp=[];
    for(let i=start;i<products.length && temp.length<3;i++){
      if(products[i].startsWith(prefix)) temp.push(products[i]);
      else break;
    }
    res.push(temp);
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Optimal approach?",
        a: "Binary search on sorted list with prefix range.",
      },
    ],
  },

  "Stream of Characters": {
    difficulty: "Hard",
    desc: "Given a stream of characters, check if any suffix matches a word.",
    examples: [
      { input: 'words=["cd","f","kl"]', output: "query outputs boolean" },
    ],
    constraints: ["Reverse Trie for suffix matching"],
    starterCode: `class StreamChecker {
  constructor(words) {}
  query(letter) { return false; }
}`,
    solution: `class StreamChecker {
  constructor(words) {
    this.root = {};
    this.s = [];
    for(let w of words){
      let node=this.root;
      for(let i=w.length-1;i>=0;i--){
        let c=w[i];
        if(!node[c]) node[c]={};
        node=node[c];
      }
      node.end=true;
    }
  }
  query(letter){
    this.s.push(letter);
    let node=this.root;
    for(let i=this.s.length-1;i>=0;i--){
      let c=this.s[i];
      if(!node[c]) return false;
      node=node[c];
      if(node.end) return true;
    }
    return false;
  }
}`,
    interviewQs: [
      {
        q: "Why reverse words?",
        a: "Because queries provide the string backward (suffix check).",
      },
    ],
  },

  "Longest Word in Dictionary": {
    difficulty: "Medium",
    desc: "Return the longest word buildable one char at a time such that all prefixes are valid words.",
    examples: [{ input: '["w","wo","wor","worl","world"]', output: '"world"' }],
    constraints: ["Trie or sort + hash check"],
    starterCode: `function solve(words) {
  return "";
}`,
    solution: `function solve(words) {
  words.sort();
  let good = new Set([""]);
  let best = "";

  for(let w of words){
    if(good.has(w.slice(0, w.length - 1))){
      good.add(w);
      if(w.length > best.length) best = w;
    }
  }
  return best;
}`,
    interviewQs: [
      { q: "Why sort?", a: "Ensures prefixes appear before longer words." },
    ],
  },

  "Camelcase Matching": {
    difficulty: "Medium",
    desc: "Check if each query matches camelcase pattern.",
    examples: [
      {
        input: 'queries=["FooBar","FooBarTest"], pattern="FB"',
        output: "[true,false]",
      },
    ],
    constraints: ["Uppercase must match exactly"],
    starterCode: `function solve(queries, pattern) {
  return [];
}`,
    solution: `function solve(queries, pattern) {
  function match(q,p){
    let i=0,j=0;
    while(i<q.length){
      if(j<p.length && q[i]===p[j]){ i++; j++; }
      else {
        if(q[i]<'a') return false;
        i++;
      }
    }
    return j===p.length;
  }
  return queries.map(q => match(q,pattern));
}`,
    interviewQs: [
      {
        q: "Key restriction?",
        a: "Uppercase letters cannot be dropped; lowercase can.",
      },
    ],
  },

  // Monotonic Stack

  "Next Greater Element I": {
    difficulty: "Easy",
    desc: "For each element in nums1, find next greater element in nums2.",
    examples: [
      { input: "nums1=[4,1,2], nums2=[1,3,4,2]", output: "[-1,3,-1]" },
    ],
    constraints: ["Use decreasing stack to map next greater"],
    starterCode: `function solve(nums1, nums2) {
  return [];
}`,
    solution: `function solve(nums1, nums2) {
  let st=[], map={};
  for (let x of nums2) {
    while (st.length && st[st.length-1] < x)
      map[st.pop()] = x;
    st.push(x);
  }
  return nums1.map(x => map[x] || -1);
}`,
    interviewQs: [
      { q: "What if we checked each pair?", a: "O(n^2). Stack makes it O(n)." },
    ],
  },

  "Next Greater Element II": {
    difficulty: "Medium",
    desc: "Circular array next greater element.",
    examples: [{ input: "[1,2,1]", output: "[2,-1,2]" }],
    constraints: ["Traverse twice"],
    starterCode: `function solve(nums) {
  return [];
}`,
    solution: `function solve(nums) {
  let n = nums.length, res = Array(n).fill(-1), st=[];
  for (let i=0; i<2*n; i++) {
    while (st.length && nums[st[st.length-1]] < nums[i%n])
      res[st.pop()] = nums[i%n];
    if (i < n) st.push(i);
  }
  return res;
}`,
    interviewQs: [
      { q: "Why 2*n iterations?", a: "Simulate circular behavior." },
    ],
  },

  "Daily Temperatures": {
    difficulty: "Medium",
    desc: "Return days until a warmer temperature for each day.",
    examples: [
      { input: "[73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
    ],
    constraints: ["Monotonic decreasing stack on temps"],
    starterCode: `function solve(temps) {
  return [];
}`,
    solution: `function solve(temps) {
  let n=temps.length, res=Array(n).fill(0), st=[];
  for (let i=0;i<n;i++){
    while(st.length && temps[st[st.length-1]] < temps[i]){
      let idx=st.pop();
      res[idx]=i-idx;
    }
    st.push(i);
  }
  return res;
}`,
    interviewQs: [
      { q: "Why decreasing stack?", a: "Waiting for next greater temp." },
    ],
  },

  "Largest Rectangle in Histogram": {
    difficulty: "Hard",
    desc: "Find largest rectangle under histogram bars.",
    examples: [{ input: "[2,1,5,6,2,3]", output: "10" }],
    constraints: ["Classic monotonic increasing stack"],
    starterCode: `function solve(heights) {
  return 0;
}`,
    solution: `function solve(heights) {
  let st=[], maxA=0;
  heights.push(0);

  for(let i=0;i<heights.length;i++){
    while(st.length && heights[st[st.length-1]] > heights[i]){
      let h = heights[st.pop()];
      let left = st.length ? st[st.length-1] : -1;
      let width = i - left - 1;
      maxA = Math.max(maxA, h*width);
    }
    st.push(i);
  }
  return maxA;
}`,
    interviewQs: [
      {
        q: "What’s the key idea?",
        a: "When popping, the popped height is the smallest in its range.",
      },
    ],
  },

  "Maximal Rectangle": {
    difficulty: "Hard",
    desc: "Largest rectangle consisting of only 1's in a binary matrix.",
    examples: [{ input: '[["1","0"],["1","1"]]', output: "2" }],
    constraints: ["Transform rows into histogram heights"],
    starterCode: `function solve(matrix) {
  return 0;
}`,
    solution: `function solve(matrix) {
  if (!matrix.length) return 0;
  let m=matrix.length,n=matrix[0].length;
  let heights=Array(n).fill(0), res=0;

  function largest(heights){
    let st=[], maxA=0;
    heights.push(0);
    for(let i=0;i<heights.length;i++){
      while(st.length && heights[st[st.length-1]] > heights[i]){
        let h = heights[st.pop()];
        let left = st.length?st[st.length-1]:-1;
        maxA = Math.max(maxA, h*(i-left-1));
      }
      st.push(i);
    }
    heights.pop();
    return maxA;
  }

  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      heights[j] = matrix[i][j]==='1' ? heights[j]+1 : 0;
    }
    res = Math.max(res, largest(heights));
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Why convert to histogram?",
        a: "Max rectangle in matrix reduces to histogram per row.",
      },
    ],
  },

  "Online Stock Span": {
    difficulty: "Medium",
    desc: "Return stock span—days with price ≤ today's price.",
    examples: [
      { input: "prices: 100,80,60,70,60,75,85", output: "1,1,1,2,1,4,6" },
    ],
    constraints: ["Monotonic decreasing stack"],
    starterCode: `class StockSpanner {
  constructor() {}
  next(price) { return 0; }
}`,
    solution: `class StockSpanner {
  constructor() {
    this.st = []; // pairs: [price, span]
  }
  next(price) {
    let span = 1;
    while (this.st.length && this.st[this.st.length-1][0] <= price) {
      span += this.st.pop()[1];
    }
    this.st.push([price, span]);
    return span;
  }
}`,
    interviewQs: [
      {
        q: "Why store span?",
        a: "Collapse previous consecutive lower or equal prices.",
      },
    ],
  },

  "Trapping Rain Water": {
    difficulty: "Hard",
    desc: "Compute water trapped between bars.",
    examples: [{ input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    constraints: ["Two pointers or monotonic stack"],
    starterCode: `function solve(height) {
  return 0;
}`,
    solution: `function solve(height) {
  let st=[], res=0;

  for (let i=0;i<height.length;i++){
    while (st.length && height[st[st.length-1]] < height[i]) {
      let mid = st.pop();
      if (!st.length) break;
      let left = st[st.length-1];
      let h = Math.min(height[left], height[i]) - height[mid];
      let w = i - left - 1;
      res += h * w;
    }
    st.push(i);
  }
  return res;
}`,
    interviewQs: [
      { q: "Alternate solution?", a: "Two pointers with leftMax/rightMax." },
    ],
  },

  "Sum of Subarray Minimums": {
    difficulty: "Hard",
    desc: "Sum of minimum of all subarrays.",
    examples: [{ input: "[3,1,2,4]", output: "17" }],
    constraints: ["Prev smaller + next smaller using monotonic stack"],
    starterCode: `function solve(arr) {
  return 0;
}`,
    solution: `function solve(arr) {
  let n=arr.length, mod=1e9+7;
  let left=Array(n).fill(0), right=Array(n).fill(0);
  let st=[];

  // prev less
  for(let i=0;i<n;i++){
    while(st.length && arr[st[st.length-1]] > arr[i]) st.pop();
    left[i] = st.length ? i - st[st.length-1] : i + 1;
    st.push(i);
  }

  st=[];
  // next less or equal
  for(let i=n-1;i>=0;i--){
    while(st.length && arr[st[st.length-1]] >= arr[i]) st.pop();
    right[i] = st.length ? st[st.length-1] - i : n - i;
    st.push(i);
  }

  let res=0;
  for(let i=0;i<n;i++){
    res = (res + arr[i] * left[i] * right[i]) % mod;
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Why prevLess & nextLessEqual?",
        a: "To count subarrays where arr[i] is the minimum.",
      },
    ],
  },

  "Remove K Digits": {
    difficulty: "Medium",
    desc: "Remove k digits to get smallest possible number.",
    examples: [{ input: "num=1432219, k=3", output: "1219" }],
    constraints: ["Monotonic increasing stack (digits)"],
    starterCode: `function solve(num, k) {
  return "";
}`,
    solution: `function solve(num, k) {
  let st=[];
  for (let c of num){
    while (k>0 && st.length && st[st.length-1] > c){
      st.pop(); k--;
    }
    st.push(c);
  }
  while (k>0){ st.pop(); k--; }

  let res = st.join("").replace(/^0+/, "");
  return res==="" ? "0" : res;
}`,
    interviewQs: [
      {
        q: "Why increasing stack?",
        a: "We pop larger digits to minimize result.",
      },
    ],
  },

  "132 Pattern": {
    difficulty: "Medium",
    desc: "Find if there exists a 132 pattern: i < j < k with nums[i] < nums[k] < nums[j].",
    examples: [{ input: "[3,1,4,2]", output: "true" }],
    constraints: ["Reverse scan + monotonic stack"],
    starterCode: `function solve(nums) {
  return false;
}`,
    solution: `function solve(nums) {
  let st=[], third = -Infinity;

  for (let i=nums.length-1; i>=0; i--){
    if (nums[i] < third) return true;
    while (st.length && nums[i] > st[st.length-1])
      third = st.pop();
    st.push(nums[i]);
  }
  return false;
}`,
    interviewQs: [
      {
        q: "What does 'third' represent?",
        a: "Candidate for nums[k] (middle element of 132).",
      },
    ],
  },

  // Matrix Traversal

  "Number of Islands": {
    difficulty: "Medium",
    desc: "Count connected regions of '1' in a binary grid.",
    examples: [
      { input: '[["1","1","0"],["0","1","0"],["1","0","1"]]', output: "3" },
    ],
    constraints: ["DFS or BFS"],
    starterCode: `function solve(grid) {
  return 0;
}`,
    solution: `function solve(grid) {
  let m = grid.length, n = grid[0].length, count = 0;
  function dfs(x,y){
    if(x<0||y<0||x>=m||y>=n||grid[x][y]!=="1") return;
    grid[x][y] = "0";
    dfs(x+1,y); dfs(x-1,y); dfs(x,y+1); dfs(x,y-1);
  }
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(grid[i][j]==="1"){
        count++;
        dfs(i,j);
      }
    }
  }
  return count;
}`,
    interviewQs: [
      { q: "Why DFS?", a: "DFS floods the entire island efficiently." },
    ],
  },

  "Max Area of Island": {
    difficulty: "Medium",
    desc: "Return area of the largest connected '1' region.",
    examples: [{ input: "[[0,0,1],[1,1,1],[0,1,0]]", output: "5" }],
    constraints: ["DFS flood fill"],
    starterCode: `function solve(grid) {
  return 0;
}`,
    solution: `function solve(grid) {
  let m=grid.length, n=grid[0].length;
  let best=0;
  function dfs(x,y){
    if(x<0||y<0||x>=m||y>=n||grid[x][y]===0) return 0;
    grid[x][y]=0;
    return 1 + dfs(x+1,y)+dfs(x-1,y)+dfs(x,y+1)+dfs(x,y-1);
  }
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(grid[i][j]===1) best=Math.max(best,dfs(i,j));
    }
  }
  return best;
}`,
    interviewQs: [{ q: "Alternative?", a: "BFS using queue." }],
  },

  "Flood Fill": {
    difficulty: "Easy",
    desc: "Change connected region of same color to new color.",
    examples: [
      {
        input: "image=[[1,1,1],[1,1,0]], sr=1, sc=1, color=2",
        output: "filled image",
      },
    ],
    constraints: ["DFS/BFS"],
    starterCode: `function solve(image, sr, sc, color) {
  return [];
}`,
    solution: `function solve(image, sr, sc, color) {
  let m=image.length,n=image[0].length;
  let old=image[sr][sc];
  if(old===color) return image;

  function dfs(x,y){
    if(x<0||y<0||x>=m||y>=n||image[x][y]!==old) return;
    image[x][y]=color;
    dfs(x+1,y); dfs(x-1,y); dfs(x,y+1); dfs(x,y-1);
  }
  dfs(sr,sc);
  return image;
}`,
    interviewQs: [
      {
        q: "When BFS better?",
        a: "Large depth to avoid recursion stack overflow.",
      },
    ],
  },

  "Rotting Oranges": {
    difficulty: "Medium",
    desc: "Return minutes until all oranges rot; -1 if impossible.",
    examples: [{ input: "[[2,1,1],[1,1,0],[0,1,1]]", output: "4" }],
    constraints: ["Multi-source BFS"],
    starterCode: `function solve(grid) {
  return 0;
}`,
    solution: `function solve(grid) {
  let m=grid.length,n=grid[0].length;
  let q=[], fresh=0, time=0;

  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(grid[i][j]===2) q.push([i,j]);
      if(grid[i][j]===1) fresh++;
    }
  }

  let dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  while(q.length && fresh>0){
    let size=q.length;
    while(size--){
      let [x,y]=q.shift();
      for(let [dx,dy] of dirs){
        let nx=x+dx, ny=y+dy;
        if(nx>=0&&ny>=0&&nx<m&&ny<n && grid[nx][ny]===1){
          grid[nx][ny]=2;
          fresh--;
          q.push([nx,ny]);
        }
      }
    }
    time++;
  }
  return fresh===0 ? time : -1;
}`,
    interviewQs: [
      { q: "Why BFS?", a: "Spread rotting layer-by-layer in time units." },
    ],
  },

  "Surrounded Regions": {
    difficulty: "Medium",
    desc: "Capture all 'O' regions not touching border.",
    examples: [
      { input: '[["X","X","X"],["X","O","X"],["X","X","X"]]', output: "all X" },
    ],
    constraints: ["Mark border-connected O’s first"],
    starterCode: `function solve(board) {
  return [];
}`,
    solution: `function solve(board) {
  let m=board.length,n=board[0].length;
  function dfs(x,y){
    if(x<0||y<0||x>=m||y>=n||board[x][y]!=="O") return;
    board[x][y]="#";
    dfs(x+1,y); dfs(x-1,y); dfs(x,y+1); dfs(x,y-1);
  }
  for(let i=0;i<m;i++){ dfs(i,0); dfs(i,n-1); }
  for(let j=0;j<n;j++){ dfs(0,j); dfs(m-1,j); }

  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(board[i][j]==="O") board[i][j]="X";
      if(board[i][j]==="#") board[i][j]="O";
    }
  }
  return board;
}`,
    interviewQs: [
      { q: "Why mark border-connected O’s?", a: "Only those survive." },
    ],
  },

  "Pacific Atlantic Water Flow": {
    difficulty: "Medium",
    desc: "Cells water can flow to both Pacific and Atlantic.",
    examples: [{ input: "heights matrix", output: "list of coordinates" }],
    constraints: ["Reverse flow BFS/DFS from oceans"],
    starterCode: `function solve(heights) {
  return [];
}`,
    solution: `function solve(heights) {
  let m=heights.length,n=heights[0].length;
  let pac = Array.from({length:m},()=>Array(n).fill(false));
  let atl = Array.from({length:m},()=>Array(n).fill(false));
  let dirs=[[1,0],[-1,0],[0,1],[0,-1]];

  function dfs(x,y,vis){
    vis[x][y]=true;
    for(let[dx,dy] of dirs){
      let nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n && !vis[nx][ny] && heights[nx][ny]>=heights[x][y]){
        dfs(nx,ny,vis);
      }
    }
  }

  for(let i=0;i<m;i++){ dfs(i,0,pac); dfs(i,n-1,atl); }
  for(let j=0;j<n;j++){ dfs(0,j,pac); dfs(m-1,j,atl); }

  let res=[];
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(pac[i][j] && atl[i][j]) res.push([i,j]);
    }
  }
  return res;
}`,
    interviewQs: [
      {
        q: "Why reverse DFS?",
        a: "Instead of simulating downhill, climb uphill from oceans.",
      },
    ],
  },

  "Shortest Path in Binary Matrix": {
    difficulty: "Medium",
    desc: "Shortest path from top-left to bottom-right using 8 directions.",
    examples: [{ input: "[[0,1],[1,0]]", output: "2" }],
    constraints: ["BFS shortest path"],
    starterCode: `function solve(grid) {
  return 0;
}`,
    solution: `function solve(grid) {
  let m=grid.length,n=grid[0].length;
  if(grid[0][0]===1 || grid[m-1][n-1]===1) return -1;

  let dirs=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];
  let q=[[0,0,1]];
  grid[0][0]=1;

  while(q.length){
    let [x,y,d]=q.shift();
    if(x===m-1 && y===n-1) return d;
    for(let[dx,dy] of dirs){
      let nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n && grid[nx][ny]===0){
        grid[nx][ny]=1;
        q.push([nx,ny,d+1]);
      }
    }
  }
  return -1;
}`,
    interviewQs: [
      { q: "Why BFS?", a: "Uniform cost graph → BFS gives shortest path." },
    ],
  },

  "01 Matrix": {
    difficulty: "Medium",
    desc: "For each cell with 1, find nearest 0 using multi-source BFS.",
    examples: [{ input: "[[0,0,0],[0,1,0],[1,1,1]]", output: "distances" }],
    constraints: ["Multi-source BFS"],
    starterCode: `function solve(mat) {
  return [];
}`,
    solution: `function solve(mat) {
  let m=mat.length,n=mat[0].length;
  let q=[];
  let dist=Array.from({length:m},()=>Array(n).fill(Infinity));

  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(mat[i][j]===0){
        dist[i][j]=0;
        q.push([i,j]);
      }
    }
  }

  let dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  while(q.length){
    let [x,y]=q.shift();
    for(let[dx,dy] of dirs){
      let nx=x+dx, ny=y+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n && dist[nx][ny] > dist[x][y]+1){
        dist[nx][ny]=dist[x][y]+1;
        q.push([nx,ny]);
      }
    }
  }
  return dist;
}`,
    interviewQs: [
      {
        q: "Why multi-source BFS?",
        a: "Start from all 0’s simultaneously to get shortest distances.",
      },
    ],
  },

  "As Far from Land as Possible": {
    difficulty: "Medium",
    desc: "Find ocean cell that is farthest from any land.",
    examples: [{ input: "[[1,0,1],[0,0,0],[1,0,1]]", output: "2" }],
    constraints: ["Multi-source BFS starting from land"],
    starterCode: `function solve(grid) {
  return 0;
}`,
    solution: `function solve(grid) {
  let m=grid.length,n=grid[0].length;
  let q=[], hasLand=false, hasWater=false;

  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(grid[i][j]===1){ q.push([i,j]); hasLand=true; }
      else hasWater=true;
    }
  }
  if(!hasLand || !hasWater) return -1;

  let dist=-1;
  let dirs=[[1,0],[-1,0],[0,1],[0,-1]];

  while(q.length){
    let size=q.length;
    while(size--){
      let [x,y]=q.shift();
      for(let[dx,dy] of dirs){
        let nx=x+dx, ny=y+dy;
        if(nx>=0&&ny>=0&&nx<m&&ny<n && grid[nx][ny]===0){
          grid[nx][ny]=1;
          q.push([nx,ny]);
        }
      }
    }
    dist++;
  }
  return dist;
}`,
    interviewQs: [
      {
        q: "Why BFS from land?",
        a: "Distance from nearest land = BFS layers.",
      },
    ],
  },

  "Making A Large Island": {
    difficulty: "Hard",
    desc: "Return size of largest island after flipping at most one 0 to 1.",
    examples: [{ input: "[[1,0],[0,1]]", output: "3" }],
    constraints: ["Connected component labeling + adjacency check"],
    starterCode: `function solve(grid) {
  return 0;
}`,
    solution: `function solve(grid) {
  let m=grid.length,n=grid[0].length;
  let id=2, area={};

  function dfs(x,y,id){
    if(x<0||y<0||x>=m||y>=n || grid[x][y]!==1) return 0;
    grid[x][y]=id;
    return 1 + dfs(x+1,y,id)+dfs(x-1,y,id)+dfs(x,y+1,id)+dfs(x,y-1,id);
  }

  // label islands
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(grid[i][j]===1){
        area[id]=dfs(i,j,id);
        id++;
      }
    }
  }

  let best = Math.max(0, ...Object.values(area));

  let dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  // try flipping each zero
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(grid[i][j]===0){
        let seen=new Set(), total=1;
        for(let[dx,dy] of dirs){
          let nx=i+dx, ny=j+dy;
          if(nx>=0&&ny>=0&&nx<m&&ny<n && grid[nx][ny]>1 && !seen.has(grid[nx][ny])){
            seen.add(grid[nx][ny]);
            total += area[grid[nx][ny]];
          }
        }
        best=Math.max(best,total);
      }
    }
  }
  return best;
}`,
    interviewQs: [
      {
        q: "Why mark islands with IDs?",
        a: "Prevents recounting shared neighbors.",
      },
    ],
  },

  // Backtracking

  "N-Queens": {
    difficulty: "Hard",
    desc: "Place N queens on an NxN board such that no two queens attack each other.",
    examples: [{ input: "n=4", output: '[[".Q..","...Q","Q...","..Q."]]' }],
    constraints: ["Use backtracking with sets"],
    starterCode: `function solve(n) {
  return [];
}`,
    solution: `function solve(n) {
  let res = [];
  let cols = new Set(), diag1 = new Set(), diag2 = new Set();
  let board = Array.from({length:n},()=>Array(n).fill('.'));

  function backtrack(r){
    if(r===n){
      res.push(board.map(row=>row.join("")));
      return;
    }
    for(let c=0;c<n;c++){
      if(cols.has(c) || diag1.has(r-c) || diag2.has(r+c)) continue;
      cols.add(c); diag1.add(r-c); diag2.add(r+c);
      board[r][c]="Q";
      backtrack(r+1);
      board[r][c]=".";
      cols.delete(c); diag1.delete(r-c); diag2.delete(r+c);
    }
  }
  backtrack(0);
  return res;
}`,
    interviewQs: [
      { q: "Optimize diagonal checks?", a: "Use sets keyed by r-c and r+c." },
    ],
  },

  "N-Queens II": {
    difficulty: "Hard",
    desc: "Return number of distinct solutions to the N-Queens puzzle.",
    examples: [{ input: "n=4", output: "2" }],
    constraints: ["Same as N-Queens but count only"],
    starterCode: `function solve(n) {
  return 0;
}`,
    solution: `function solve(n) {
  let count=0;
  let cols=new Set(), diag1=new Set(), diag2=new Set();

  function backtrack(r){
    if(r===n){ count++; return; }
    for(let c=0;c<n;c++){
      if(cols.has(c)||diag1.has(r-c)||diag2.has(r+c)) continue;
      cols.add(c); diag1.add(r-c); diag2.add(r+c);
      backtrack(r+1);
      cols.delete(c); diag1.delete(r-c); diag2.delete(r+c);
    }
  }
  backtrack(0);
  return count;
}`,
    interviewQs: [
      {
        q: "Any bitmask optimization?",
        a: "Yes — use bit operations for 3 attack sets.",
      },
    ],
  },

  "Sudoku Solver": {
    difficulty: "Hard",
    desc: "Solve 9x9 Sudoku puzzle in-place.",
    examples: [{ input: "board with dots", output: "solved board" }],
    constraints: ["Backtracking + row/col/box constraints"],
    starterCode: `function solve(board) {
  return board;
}`,
    solution: `function solve(board) {
  let rows=Array.from({length:9},()=>new Set());
  let cols=Array.from({length:9},()=>new Set());
  let box=Array.from({length:9},()=>new Set());

  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      let c=board[i][j];
      if(c!=='.'){
        rows[i].add(c);
        cols[j].add(c);
        box[Math.floor(i/3)*3 + Math.floor(j/3)].add(c);
      }
    }
  }

  function backtrack(r,c){
    if(r===9) return true;
    if(c===9) return backtrack(r+1,0);
    if(board[r][c]!=='.') return backtrack(r,c+1);

    for(let d=1; d<=9; d++){
      let ch = String(d);
      let b = Math.floor(r/3)*3 + Math.floor(c/3);
      if(!rows[r].has(ch) && !cols[c].has(ch) && !box[b].has(ch)){
        board[r][c]=ch;
        rows[r].add(ch); cols[c].add(ch); box[b].add(ch);

        if(backtrack(r,c+1)) return true;

        board[r][c]='.';
        rows[r].delete(ch); cols[c].delete(ch); box[b].delete(ch);
      }
    }
    return false;
  }

  backtrack(0,0);
  return board;
}`,
    interviewQs: [{ q: "How to prune?", a: "Track row/col/box sets." }],
  },

  "Word Search": {
    difficulty: "Medium",
    desc: "Check if word exists in board moving horizontally/vertically.",
    examples: [{ input: 'board + "ABCCED"', output: "true" }],
    constraints: ["DFS backtracking"],
    starterCode: `function solve(board, word) {
  return false;
}`,
    solution: `function solve(board, word) {
  let m=board.length,n=board[0].length;

  function dfs(x,y,i){
    if(i===word.length) return true;
    if(x<0||y<0||x>=m||y>=n||board[x][y]!==word[i]) return false;

    let tmp=board[x][y];
    board[x][y]="#";
    let found = dfs(x+1,y,i+1)||dfs(x-1,y,i+1)||dfs(x,y+1,i+1)||dfs(x,y-1,i+1);
    board[x][y]=tmp;
    return found;
  }

  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
      if(dfs(i,j,0)) return true;
    }
  }
  return false;
}`,
    interviewQs: [
      { q: "Why mark visited?", a: "Avoid reusing same cell in single path." },
    ],
  },

  "Generate Parentheses": {
    difficulty: "Medium",
    desc: "Generate all valid parentheses of n pairs.",
    examples: [
      {
        input: "n=3",
        output: '["((()))","(()())","(())()","()(())","()()()"]',
      },
    ],
    constraints: ["Backtracking"],
    starterCode: `function solve(n) {
  return [];
}`,
    solution: `function solve(n) {
  let res=[];
  function backtrack(cur, open, close){
    if(cur.length===2*n){ res.push(cur); return; }
    if(open<n) backtrack(cur+"(", open+1, close);
    if(close<open) backtrack(cur+")", open, close+1);
  }
  backtrack("",0,0);
  return res;
}`,
    interviewQs: [{ q: "Key constraint?", a: "close must never exceed open." }],
  },

  "Letter Tile Possibilities": {
    difficulty: "Medium",
    desc: "Count all non-empty sequences from tile letters.",
    examples: [{ input: '"AAB"', output: "8" }],
    constraints: ["Backtracking with frequency map"],
    starterCode: `function solve(tiles) {
  return 0;
}`,
    solution: `function solve(tiles) {
  let freq={};
  for(let c of tiles) freq[c]=(freq[c]||0)+1;

  function dfs(){
    let sum=0;
    for(let c in freq){
      if(freq[c]>0){
        sum++;
        freq[c]--;
        sum += dfs();
        freq[c]++;
      }
    }
    return sum;
  }
  return dfs();
}`,
    interviewQs: [
      {
        q: "Why count inside recursion?",
        a: "Each pick contributes a unique sequence.",
      },
    ],
  },

  "Restore IP Addresses": {
    difficulty: "Medium",
    desc: "Return all valid IP addresses from digits string.",
    examples: [
      { input: '"25525511135"', output: '["255.255.11.135","255.255.111.35"]' },
    ],
    constraints: ["Backtracking split into 4 parts"],
    starterCode: `function solve(s) {
  return [];
}`,
    solution: `function solve(s) {
  let res=[];
  function backtrack(i, parts){
    if(parts.length===4){
      if(i===s.length) res.push(parts.join("."));
      return;
    }
    for(let len=1; len<=3; len++){
      if(i+len > s.length) break;
      let seg = s.slice(i, i+len);
      if((seg[0]==='0' && seg.length>1) || +seg>255) continue;
      backtrack(i+len, [...parts, seg]);
    }
  }
  backtrack(0,[]);
  return res;
}`,
    interviewQs: [
      { q: "Why limit segments to length 3?", a: "IP segment max = 255." },
    ],
  },

  "Split String Into Max Unique Substrings": {
    difficulty: "Medium",
    desc: "Split string such that all substrings are unique; maximize count.",
    examples: [{ input: '"ababccc"', output: "5" }],
    constraints: ["Backtracking + used set"],
    starterCode: `function solve(s) {
  return 0;
}`,
    solution: `function solve(s) {
  let used=new Set();
  let best=0;

  function dfs(i,count){
    if(i===s.length){
      best=Math.max(best,count);
      return;
    }
    for(let j=i+1;j<=s.length;j++){
      let sub=s.slice(i,j);
      if(!used.has(sub)){
        used.add(sub);
        dfs(j,count+1);
        used.delete(sub);
      }
    }
  }
  dfs(0,0);
  return best;
}`,
    interviewQs: [
      {
        q: "Why substring splits?",
        a: "Try all partitions maximizing uniqueness.",
      },
    ],
  },

  Minesweeper: {
    difficulty: "Medium",
    desc: "Reveal cells in Minesweeper board.",
    examples: [{ input: "board click=[3,0]", output: "updated board" }],
    constraints: ["DFS expand zero cells"],
    starterCode: `function solve(board, click) {
  return [];
}`,
    solution: `function solve(board, click) {
  let [x,y]=click, m=board.length, n=board[0].length;
  if(board[x][y]==='M'){ board[x][y]='X'; return board; }

  let dirs=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];

  function dfs(i,j){
    if(board[i][j]!=='E') return;
    let mines=0;
    for(let[dx,dy] of dirs){
      let nx=i+dx, ny=j+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n && board[nx][ny]==='M') mines++;
    }
    if(mines>0){
      board[i][j]=String(mines);
      return;
    }
    board[i][j]='B';
    for(let[dx,dy] of dirs){
      let nx=i+dx, ny=j+dy;
      if(nx>=0&&ny>=0&&nx<m&&ny<n) dfs(nx,ny);
    }
  }

  dfs(x,y);
  return board;
}`,
    interviewQs: [
      { q: "Why stop on mine count?", a: "Only expand if count=0." },
    ],
  },

  "Robot Room Cleaner": {
    difficulty: "Hard",
    desc: "Control robot with API to clean all reachable cells.",
    examples: [{ input: "robot grid", output: "all cleaned" }],
    constraints: ["Backtracking with robot movement"],
    starterCode: `function solve(robot) {
  // robot has move(), turnLeft(), turnRight(), clean()
}`,
    solution: `function solve(robot) {
  let visited = new Set();
  let dirs = [[-1,0],[0,1],[1,0],[0,-1]];

  function backtrack(x,y,d){
    robot.clean();
    visited.add(x+","+y);

    for(let k=0; k<4; k++){
      let nd = (d+k)%4;
      let nx = x + dirs[nd][0];
      let ny = y + dirs[nd][1];

      if(!visited.has(nx+","+ny) && robot.move()){
        backtrack(nx,ny,nd);
        robot.turnLeft(); robot.turnLeft();
        robot.move();
        robot.turnLeft(); robot.turnLeft();
      }
      robot.turnRight();
    }
  }

  backtrack(0,0,0);
}`,
    interviewQs: [
      {
        q: "How track directions?",
        a: "Use index in dirs array; rotate via turnLeft/turnRight.",
      },
    ],
  },
};

