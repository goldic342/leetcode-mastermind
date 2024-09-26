// trees painting (N/A)
// Created on: 2024-09-26 13:28:38
// Source: Yandex contest (young && yandex)
// Happy coding!
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (p, v, q, m) => {
  const [minv, maxv] = [p - v, p + v];
  const [minm, maxm] = [q - m, q + m];

  if (Math.max(minv, minm) <= Math.min(maxv, maxm)) {
    console.log(Math.max(maxv, maxm) - Math.min(minv, minm) + 1);
  } else {
    console.log(maxv - minv + 1 + maxm - minm + 1);
  }
};

rl.question("", (first) => {
  rl.question("", (second) => {
    const [p, v] = first.split(" ").map(Number);
    const [q, m] = second.split(" ").map(Number);
    solution(p, v, q, m);
    rl.close();
  });
});
