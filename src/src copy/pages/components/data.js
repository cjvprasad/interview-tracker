export const msqDSAData = [
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
      { q: "Recursive vs iterative complexity?", a: "Recursive: O(2^n), Iterative: O(n)." },
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
      (n) => { return [`Input: ${n}`, "⚠️ Recursion tree too large to trace linearly."]; },
      (n) => { return [`Input: ${n}`, "Using Memoization Object to store results..."]; },
      (n) => {
        const logs = [];
        logs.push(`Input: ${n}`);
        let a = 0, b = 1;
        if (n <= 1) return [`Result: ${n}`];
        for (let i = 2; i <= n; i++) {
          let c = a + b;
          logs.push(`i=${i}: ${a} + ${b} = ${c}`);
          a = b; b = c;
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
      { q: "How to solve in O(n)?", a: "Use frequency counting instead of sorting." },
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
        for (const c of s) { count[c] = (count[c] || 0) + 1; }
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
      { q: "Can you solve in O(n)?", a: "Use a hash map storing visited values." },
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
      { q: "Why only one transaction?", a: "This is the basic version of the stock problem." },
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
        let min = Infinity, profit = 0;
        for (const p of prices) {
          logs.push(`Price: ${p}`);
          if (p < min) { min = p; logs.push(`📉 New Min: ${min}`); }
          const pot = p - min;
          if (pot > profit) { profit = pot; logs.push(`💰 New Max Profit: ${profit}`); }
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
      { q: "Can duplicates exist?", a: "Yes, skip duplicates when tracking second max." },
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
        let max = -Infinity, sec = -Infinity;
        for (const n of arr) {
          logs.push(`Val: ${n} | Max: ${max} | 2nd: ${sec}`);
          if (n > max) {
            sec = max; max = n;
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
        for(let i=0; i<k; i++){
            const val = arr.pop();
            arr.unshift(val);
            logs.push(`Step ${i+1} (Pop ${val} & Unshift): [${arr}]`);
        }
        return logs;
      },
      (arr, k) => { return ["Creates a copy array and maps indices. (O(n) space)"]; },
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
      }
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
      { q: "Why two-pointer approach?", a: "One pointer for overwriting unique values." },
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
      (nums) => { return ["Uses JS Set() to filter. O(n) space."]; },
      (nums) => {
        const logs = [];
        let i = 1;
        logs.push(`Start: [${nums}]`);
        for (let j = 1; j < nums.length; j++) {
          if (nums[j] !== nums[j - 1]) {
            logs.push(`New unique found (${nums[j]}) at j=${j}. Write to i=${i}`);
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