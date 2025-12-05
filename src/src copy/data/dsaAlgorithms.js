export const dsaAlgorithms = [
  {
    id: 1,
    title: "Two Pointers (Arrays)",
    category: "Arrays & Strings",
    algorithm:
      "Use two indices (left/right) moving towards each other or in same direction to solve problems in O(n).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Input: arr=[1, 2, 3, 4, 6], target=6",
      "L=0(1), R=4(6) -> Sum=7 (>6) -> Dec R",
      "L=0(1), R=3(4) -> Sum=5 (<6) -> Inc L",
      "L=1(2), R=3(4) -> Sum=6 (Found)",
    ],
    edgeCases: ["Array has 1 element", "No pair exists", "Negative numbers"],
    tips: [
      "Great for 'Two Sum' on sorted arrays.",
      "Used for reversing strings or checking palindromes.",
    ],
    code: `function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) return [left + 1, right + 1];
    else if (sum < target) left++;
    else right--;
  }
  return [];
}`,
  },
  {
    id: 2,
    title: "Sliding Window (Fixed)",
    category: "Arrays & Strings",
    algorithm:
      "Maintain a window of size k. Slide it one step right: subtract element leaving, add element entering.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Arr: [1, 4, 2, 10, 2], k=3",
      "Init window [0..2]: 1+4+2 = 7. Max=7",
      "Slide 1: 7 - 1 (left) + 10 (new) = 16. Max=16",
      "Slide 2: 16 - 4 + 2 = 14. Max=16",
    ],
    edgeCases: ["k > array length", "k = 1"],
    tips: [
      "Identified by keywords like 'subarray of size k', 'longest substring'.",
      "Distinguish between Fixed vs Dynamic window.",
    ],
    code: `function maxSumSubarray(arr, k) {
  if (arr.length < k) return null;
  let currentSum = 0;
  // First window
  for (let i=0; i<k; i++) currentSum += arr[i];
  let maxSum = currentSum;
  // Slide
  for (let i=k; i<arr.length; i++) {
    currentSum += arr[i] - arr[i-k];
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
  },
  {
    id: 3,
    title: "Binary Search",
    category: "Search",
    algorithm:
      "Find element in sorted array by repeatedly dividing search interval in half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    dryRun: [
      "Arr: [1, 3, 5, 7, 9], Target: 7",
      "Mid=5. 5 < 7? Yes, ignore left.",
      "New Range: [7, 9]. Mid=7. Found.",
    ],
    edgeCases: [
      "Empty array",
      "Target smaller/larger than all",
      "Duplicates (if finding first/last)",
    ],
    tips: [
      "Only works on sorted data.",
      "Careful with overflow: mid = l + Math.floor((r-l)/2)",
    ],
    code: `function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}`,
  },
  {
    id: 4,
    title: "Merge Sort",
    category: "Sorting",
    algorithm:
      "Divide & Conquer. Recursively split array in half, sort halves, then merge them.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    dryRun: [
      "Split [4, 2, 1, 3] -> [4, 2] | [1, 3]",
      "Split [4, 2] -> [4]|[2] -> Merge -> [2, 4]",
      "Merge [2, 4] and [1, 3] -> [1, 2, 3, 4]",
    ],
    edgeCases: ["Already sorted", "Reverse sorted"],
    tips: [
      "It is a STABLE sort (preserves order of duplicates).",
      "Guaranteed O(n log n) unlike Quicksort.",
    ],
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let res = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return [...res, ...left.slice(i), ...right.slice(j)];
}`,
  },
  {
    id: 5,
    title: "BFS (Graph/Tree)",
    category: "Graph",
    algorithm:
      "Breadth-First Search. Explore neighbors layer by layer using a Queue.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    dryRun: [
      "Q: [Start]",
      "Pop Start, add neighbors A, B -> Q: [A, B]",
      "Pop A, add neighbors -> Q: [B, C]",
    ],
    edgeCases: ["Disconnected graph", "Cycles (Need visited set)"],
    tips: [
      "Use for 'Shortest Path' in unweighted graphs.",
      "Level order traversal.",
    ],
    code: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
  },
];
