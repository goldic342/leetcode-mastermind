// Memoize (Medium)
// https://leetcode.com/problems/memoize/
// ID: 2623
// Category: JavaScript
// Created on: 2024-09-30 17:13:01
// Source: LeetCode
// Happy coding!

/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const hashMap = new Map();

  return function (...args) {
    if (!hashMap.has(JSON.stringify(args))) {
      const res = fn(...args);
      hashMap.set(JSON.stringify(args), res);
      return res;
    } else {
      return hashMap.get(JSON.stringify(args));
    }
  };
}

// Example test cases:
// Test case 1: "sum"
// => ["call","call","getCallCount","call","getCallCount"]
// => [[2,2],[2,2],[],[1,2],[]]
// Test case 2: "factorial"
// => ["call","call","call","getCallCount","call","getCallCount"]
// => [[2],[3],[2],[],[3],[]]
// Test case 3: "fib"
// => ["call","getCallCount"]
// => [[5],[]]
