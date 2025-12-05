// --- DATA STRUCTURES ---
const phases = [
  { title: "Phase 1: The Foundation", id: "p1" },
  { title: "Phase 2: Core Structures", id: "p2" },
  { title: "Phase 3: Advanced Search", id: "p3" },
  { title: "Phase 4: Dynamic Programming", id: "p4" },
  { title: "Phase 5: Expert Graph Theory", id: "p5" },
];

// UPDATED PATTERNS (With formatted Anchor Logic)
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
    "Substring with Concatenation of All Words"
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
    "Container With Most Water"
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
    "Remove Nth Node From End of List"
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
    "Partition Labels"
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
    "Minimize Deviation in Array"
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
    "Remove Duplicates from Sorted List II"
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
    "N-ary Tree Level Order Traversal"
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
    problems:[
    "Path Sum",
    "Path Sum II",
    "Path Sum III",
    "Sum Root to Leaf Numbers",
    "Diameter of Binary Tree",
    "Binary Tree Maximum Path Sum",
    "Lowest Common Ancestor of a Binary Tree",
    "Validate Binary Search Tree",
    "Flatten Binary Tree to Linked List",
    "Construct Binary Tree from Preorder and Inorder"
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
    "Seat Reservation Manager"
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
    "Beautiful Arrangement"
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
    "Split Array Largest Sum"
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
    "Total Hamming Distance"
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
    "Maximum Frequency Stack"
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
    "Swim in Rising Water"
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
    "Shopping Offers"
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
    "Combination Sum IV"
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
    "Maximum Subarray"
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
    "Count Different Palindromic Subsequences"
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
    "Max Dot Product of Two Subsequences"
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
    problems:[
    "Course Schedule",
    "Course Schedule II",
    "Alien Dictionary",
    "Sequence Reconstruction",
    "Parallel Courses",
    "Minimum Height Trees",
    "Longest Increasing Path in a Matrix",
    "Sort Items by Groups Respecting Dependencies",
    "Find All Possible Recipes from Given Supplies",
    "Build a Matrix With Conditions"
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
    "Checking Existence of Edge Length Limited Paths"
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
    problems:[
    "Implement Trie (Prefix Tree)",
    "Design Add and Search Words Data Structure",
    "Word Search II",
    "Replace Words",
    "Map Sum Pairs",
    "Maximum XOR of Two Numbers in an Array",
    "Search Suggestions System",
    "Stream of Characters",
    "Longest Word in Dictionary",
    "Camelcase Matching"
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
    "132 Pattern"
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
    "Making A Large Island"
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
    "Robot Room Cleaner"
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



// FULL PROBLEMS DATABASE (One solution per pattern for demo)
// const problemsDB = {
//   "Maximum Sum Subarray of Size K": {
//     difficulty: "Easy",
//     desc: "Find max sum of contiguous subarray of size k.",
//     examples: [{ input: "[2,1,5,1,3,2], k=3", output: "9" }],
//     constraints: ["k > 0"],
//     starterCode: "function solve(k, nums) {\n  return 0;\n}",
//     solution:
//       "function solve(k, nums) {\n  let maxS=0, wSum=0, start=0;\n  for(let end=0; end<nums.length; end++) {\n    wSum+=nums[end];\n    if(end >= k-1) {\n      maxS = Math.max(maxS, wSum);\n      wSum -= nums[start++];\n    }\n  }\n  return maxS;\n}",
//     interviewQs: [{ q: "Negative numbers?", a: "Init max to -Infinity" }],
//   },

//   "Pair with Target Sum": {
//     difficulty: "Easy",
//     desc: "Find indices of two numbers that add up to target.",
//     examples: [{ input: "[1,2,3,4,6], t=6", output: "[1,3]" }],
//     constraints: ["Sorted"],
//     starterCode: "function solve(nums, t) {\n  return [-1,-1];\n}",
//     solution:
//       "function solve(nums, t) {\n  let l=0, r=nums.length-1;\n  while(l<r){\n    let s=nums[l]+nums[r];\n    if(s===t) return [l,r];\n    if(s<t) l++; else r--;\n  }\n  return [-1,-1];\n}",
//     interviewQs: [{ q: "Unsorted?", a: "HashMap O(N)" }],
//   },

//   "Linked List Cycle": {
//     difficulty: "Easy",
//     desc: "Detect if list has cycle.",
//     examples: [{ input: "head=[3,2,0,-4]", output: "true" }],
//     constraints: [],
//     starterCode: "function hasCycle(head) {\n  return false;\n}",
//     solution:
//       "function hasCycle(head) {\n  let s=head, f=head;\n  while(f && f.next) {\n    s=s.next; f=f.next.next;\n    if(s===f) return true;\n  }\n  return false;\n}",
//     interviewQs: [{ q: "O(1) space?", a: "Yes, Floyd's Algo" }],
//   },

//   "Merge Intervals": {
//     difficulty: "Medium",
//     desc: "Merge overlapping intervals.",
//     examples: [{ input: "[[1,3],[2,6]]", output: "[[1,6]]" }],
//     constraints: [],
//     starterCode: "function merge(intervals) {\n  return [];\n}",
//     solution:
//       "function merge(intervals) {\n  intervals.sort((a,b)=>a[0]-b[0]);\n  const res=[intervals[0]];\n  for(let i=1; i<intervals.length; i++) {\n    let prev=res[res.length-1], curr=intervals[i];\n    if(curr[0]<=prev[1]) prev[1]=Math.max(prev[1], curr[1]);\n    else res.push(curr);\n  }\n  return res;\n}",
//     interviewQs: [{ q: "Complexity?", a: "O(N log N)" }],
//   },

//   "Missing Number": {
//     difficulty: "Easy",
//     desc: "Find missing number in 0..n",
//     examples: [{ input: "[3,0,1]", output: "2" }],
//     constraints: [],
//     starterCode: "function missing(nums) {\n  return 0;\n}",
//     solution:
//       "function missing(nums) {\n  let i=0, n=nums.length;\n  while(i<n){\n    let j=nums[i];\n    if(j<n && nums[i]!==nums[j]) [nums[i],nums[j]]=[nums[j],nums[i]];\n    else i++;\n  }\n  for(i=0;i<n;i++) if(nums[i]!==i) return i;\n  return n;\n}",
//     interviewQs: [{ q: "XOR approach?", a: "XOR index vs value" }],
//   },

//   "Reverse Linked List": {
//     difficulty: "Easy",
//     desc: "Reverse a singly linked list.",
//     examples: [{ input: "[1,2,3]", output: "[3,2,1]" }],
//     constraints: [],
//     starterCode: "function reverse(head) {\n  return null;\n}",
//     solution:
//       "function reverse(head) {\n  let prev=null, curr=head;\n  while(curr){\n    let next=curr.next;\n    curr.next=prev;\n    prev=curr;\n    curr=next;\n  }\n  return prev;\n}",
//     interviewQs: [{ q: "Recursive?", a: "Yes" }],
//   },

//   "Binary Tree Level Order Traversal": {
//     difficulty: "Medium",
//     desc: "Level-by-level traversal.",
//     examples: [
//       { input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
//     ],
//     constraints: [],
//     starterCode: "function levelOrder(root) {\n  return [];\n}",
//     solution:
//       "function levelOrder(root) {\n  if(!root) return [];\n  let q=[root], res=[];\n  while(q.length){\n    let len=q.length, row=[];\n    for(let i=0;i<len;i++){\n      let n=q.shift();\n      row.push(n.val);\n      if(n.left) q.push(n.left);\n      if(n.right) q.push(n.right);\n    }\n    res.push(row);\n  }\n  return res;\n}",
//     interviewQs: [{ q: "DFS vs BFS?", a: "BFS uses Queue" }],
//   },

//   "Path Sum": {
//     difficulty: "Easy",
//     desc: "Has root-to-leaf path summing to target?",
//     examples: [{ input: "root, 22", output: "true" }],
//     constraints: [],
//     starterCode: "function hasPathSum(root, t) {\n  return false;\n}",
//     solution:
//       "function hasPathSum(root, t) {\n  if(!root) return false;\n  if(!root.left && !root.right && t===root.val) return true;\n  return hasPathSum(root.left, t-root.val) || hasPathSum(root.right, t-root.val);\n}",
//     interviewQs: [{ q: "Iterative?", a: "Use Stack" }],
//   },

//   "Find Median from Data Stream": {
//     difficulty: "Hard",
//     desc: "Find median of stream.",
//     examples: [{ input: "add(1), add(2), med()", output: "1.5" }],
//     constraints: [],
//     starterCode: "class MedianFinder {}",
//     solution:
//       "// Requires PriorityQueue implementation in JS\n// 1. MaxHeap (small half)\n// 2. MinHeap (large half)\n// Balance sizes.",
//     interviewQs: [{ q: "Why Heaps?", a: "O(1) access" }],
//   },

//   Subsets: {
//     difficulty: "Medium",
//     desc: "Find all subsets.",
//     examples: [{ input: "[1,2,3]", output: "[[],[1],...]" }],
//     constraints: [],
//     starterCode: "function subsets(nums) {\n  return [];\n}",
//     solution:
//       "function subsets(nums) {\n  let res=[[]];\n  for(let n of nums){\n    let len=res.length;\n    for(let i=0;i<len;i++) res.push([...res[i], n]);\n  }\n  return res;\n}",
//     interviewQs: [{ q: "Count?", a: "2^N" }],
//   },

//   "Binary Search": {
//     difficulty: "Easy",
//     desc: "Find target index.",
//     examples: [{ input: "[-1,0,3,5,9], 9", output: "4" }],
//     constraints: ["Sorted"],
//     starterCode: "function search(nums, t) {\n  return -1;\n}",
//     solution:
//       "function search(nums, t) {\n  let l=0, r=nums.length-1;\n  while(l<=r){\n    let m=Math.floor((l+r)/2);\n    if(nums[m]===t) return m;\n    if(nums[m]<t) l=m+1; else r=m-1;\n  }\n  return -1;\n}",
//     interviewQs: [{ q: "Overflow?", a: "l+(r-l)/2" }],
//   },

//   "Single Number": {
//     difficulty: "Easy",
//     desc: "Find unique number.",
//     examples: [{ input: "[2,2,1]", output: "1" }],
//     constraints: [],
//     starterCode: "function singleNumber(nums) {\n  return 0;\n}",
//     solution:
//       "function singleNumber(nums) {\n  let res=0;\n  for(let n of nums) res^=n;\n  return res;\n}",
//     interviewQs: [{ q: "XOR logic?", a: "x^x=0" }],
//   },

//   "Kth Largest Element in an Array": {
//     difficulty: "Medium",
//     desc: "Find Kth largest.",
//     examples: [{ input: "[3,2,1,5,6,4], k=2", output: "5" }],
//     constraints: [],
//     starterCode: "function findKth(nums, k) {\n  return 0;\n}",
//     solution:
//       "function findKth(nums, k) {\n  nums.sort((a,b)=>b-a);\n  return nums[k-1];\n}",
//     interviewQs: [{ q: "Faster?", a: "QuickSelect O(N)" }],
//   },

//   "Merge K Sorted Lists": {
//     difficulty: "Hard",
//     desc: "Merge K lists.",
//     examples: [{ input: "[[1,4,5],[1,3,4]]", output: "[1,1,3,4,4,5]" }],
//     constraints: [],
//     starterCode: "function mergeK(lists) {\n  return null;\n}",
//     solution: "// Use MinHeap of size K\n// Push heads, pop min, push next",
//     interviewQs: [{ q: "Complexity?", a: "N log K" }],
//   },

//   "Partition Equal Subset Sum": {
//     difficulty: "Medium",
//     desc: "Can partition into two equal sums?",
//     examples: [{ input: "[1,5,11,5]", output: "true" }],
//     constraints: [],
//     starterCode: "function canPart(nums) {\n  return false;\n}",
//     solution:
//       "function canPart(nums) {\n  let sum=nums.reduce((a,b)=>a+b,0);\n  if(sum%2!==0) return false;\n  let t=sum/2, dp=new Array(t+1).fill(false);\n  dp[0]=true;\n  for(let n of nums){\n    for(let i=t; i>=n; i--) dp[i]=dp[i]||dp[i-n];\n  }\n  return dp[t];\n}",
//     interviewQs: [{ q: "Why backwards?", a: "Reuse array" }],
//   },

//   "Coin Change": {
//     difficulty: "Medium",
//     desc: "Fewest coins to make amount.",
//     examples: [{ input: "[1,2,5], 11", output: "3" }],
//     constraints: [],
//     starterCode: "function coinChange(coins, amt) {\n  return -1;\n}",
//     solution:
//       "function coinChange(coins, amt) {\n  let dp=new Array(amt+1).fill(Infinity);\n  dp[0]=0;\n  for(let c of coins){\n    for(let i=c; i<=amt; i++) dp[i]=Math.min(dp[i], dp[i-c]+1);\n  }\n  return dp[amt]===Infinity?-1:dp[amt];\n}",
//     interviewQs: [{ q: "Greedy?", a: "Fails for some cases" }],
//   },

//   "Fibonacci Number": {
//     difficulty: "Easy",
//     desc: "F(n).",
//     examples: [{ input: "4", output: "3" }],
//     constraints: [],
//     starterCode: "function fib(n) {\n  return 0;\n}",
//     solution:
//       "function fib(n) {\n  if(n<2) return n;\n  let a=0, b=1;\n  for(let i=2; i<=n; i++) { let t=a+b; a=b; b=t; }\n  return b;\n}",
//     interviewQs: [{ q: "Space?", a: "O(1)" }],
//   },

//   "Longest Palindromic Substring": {
//     difficulty: "Medium",
//     desc: "Longest palindrome in s.",
//     examples: [{ input: "babad", output: "bab" }],
//     constraints: [],
//     starterCode: "function longestPal(s) {\n  return '';\n}",
//     solution:
//       "function longestPal(s) {\n  let max='';\n  const expand=(l,r)=>{\n    while(l>=0 && r<s.length && s[l]===s[r]) {l--;r++;}\n    if(r-l-1>max.length) max=s.substring(l+1,r);\n  };\n  for(let i=0; i<s.length; i++) { expand(i,i); expand(i,i+1); }\n  return max;\n}",
//     interviewQs: [{ q: "Manacher?", a: "O(N)" }],
//   },

//   "Longest Common Subsequence": {
//     difficulty: "Medium",
//     desc: "LCS of two strings.",
//     examples: [{ input: "abcde, ace", output: "3" }],
//     constraints: [],
//     starterCode: "function lcs(t1, t2) {\n  return 0;\n}",
//     solution:
//       "function lcs(t1, t2) {\n  let dp=Array(t1.length+1).fill(0).map(()=>Array(t2.length+1).fill(0));\n  for(let i=1; i<=t1.length; i++){\n    for(let j=1; j<=t2.length; j++){\n      if(t1[i-1]===t2[j-1]) dp[i][j]=1+dp[i-1][j-1];\n      else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);\n    }\n  }\n  return dp[t1.length][t2.length];\n}",
//     interviewQs: [{ q: "Space opt?", a: "2 rows" }],
//   },

//   "Course Schedule": {
//     difficulty: "Medium",
//     desc: "Can finish courses?",
//     examples: [{ input: "2, [[1,0]]", output: "true" }],
//     constraints: [],
//     starterCode: "function canFinish(n, p) {\n  return true;\n}",
//     solution:
//       "function canFinish(n, p) {\n  let g=Array.from({length:n},()=>[]), inD=Array(n).fill(0);\n  for(let [c, pre] of p) { g[pre].push(c); inD[c]++; }\n  let q=[], count=0;\n  for(let i=0;i<n;i++) if(inD[i]===0) q.push(i);\n  while(q.length){\n    let u=q.shift(); count++;\n    for(let v of g[u]) { inD[v]--; if(inD[v]===0) q.push(v); }\n  }\n  return count===n;\n}",
//     interviewQs: [{ q: "Algorithm?", a: "Kahn's / Topo Sort" }],
//   },

//   "Number of Provinces": {
//     difficulty: "Medium",
//     desc: "Connected components.",
//     examples: [{ input: "[[1,1,0]...]", output: "2" }],
//     constraints: [],
//     starterCode: "function findCircleNum(M) {\n  return 0;\n}",
//     solution:
//       "function findCircleNum(M) {\n  let p=M.map((_,i)=>i), count=M.length;\n  const find=x=>p[x]===x?x:p[x]=find(p[x]);\n  for(let i=0; i<M.length; i++){\n    for(let j=i+1; j<M.length; j++){\n      if(M[i][j] && find(i)!==find(j)) { p[find(i)]=find(j); count--; }\n    }\n  }\n  return count;\n}",
//     interviewQs: [{ q: "Time?", a: "N^2 approx" }],
//   },

//   "Implement Trie (Prefix Tree)": {
//     difficulty: "Medium",
//     desc: "Insert, Search, StartsWith.",
//     examples: [{ input: "insert(apple)", output: "null" }],
//     constraints: [],
//     starterCode: "class Trie {}",
//     solution:
//       "class TrieNode{constructor(){this.c={};this.end=false}}\nclass Trie{\n  constructor(){this.root=new TrieNode()}\n  insert(w){let n=this.root;for(let c of w){if(!n.c[c])n.c[c]=new TrieNode();n=n.c[c]}n.end=true}\n}",
//     interviewQs: [{ q: "Complexity?", a: "O(L)" }],
//   },

//   "Next Greater Element I": {
//     difficulty: "Easy",
//     desc: "Next greater in nums2.",
//     examples: [{ input: "[4,1,2], [1,3,4,2]", output: "[-1,3,-1]" }],
//     constraints: [],
//     starterCode: "function nextGreater(n1, n2) {\n  return [];\n}",
//     solution:
//       "function nextGreater(n1, n2) {\n  let m=new Map(), s=[];\n  for(let n of n2){\n    while(s.length && n>s[s.length-1]) m.set(s.pop(), n);\n    s.push(n);\n  }\n  return n1.map(n=>m.get(n)||-1);\n}",
//     interviewQs: [{ q: "Why stack?", a: "Decreasing monotonic" }],
//   },

//   "Number of Islands": {
//     difficulty: "Medium",
//     desc: "Count islands '1'.",
//     examples: [{ input: "grid", output: "1" }],
//     constraints: [],
//     starterCode: "function numIslands(grid) {\n  return 0;\n}",
//     solution:
//       "function numIslands(grid) {\n  let c=0;\n  const dfs=(i,j)=>{\n    if(i<0||j<0||i>=grid.length||j>=grid[0].length||grid[i][j]==='0')return;\n    grid[i][j]='0';\n    dfs(i+1,j);dfs(i-1,j);dfs(i,j+1);dfs(i,j-1);\n  };\n  for(let i=0;i<grid.length;i++)\n    for(let j=0;j<grid[0].length;j++)\n      if(grid[i][j]==='1'){c++;dfs(i,j);}\n  return c;\n}",
//     interviewQs: [{ q: "BFS vs DFS?", a: "Both work" }],
//   },

//   "N-Queens": {
//     difficulty: "Hard",
//     desc: "Place N queens.",
//     examples: [{ input: "n=4", output: "..." }],
//     constraints: [],
//     starterCode: "function solveNQueens(n) {\n  return [];\n}",
//     solution:
//       "// Backtracking with sets for cols, diag1, diag2\n// Recursive function place(row)",
//     interviewQs: [{ q: "Time?", a: "N!" }],
//   },
// };
