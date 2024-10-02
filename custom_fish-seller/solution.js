// fish seller (N/A)
// Created on: 2024-10-02 19:30:35
// Source: Yandex contest (young && yandex)
// Happy coding!

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (n, k, days) => {
  let maxIncome = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k + 1; j++) {
      if (i + j < n) {
        maxIncome = Math.max(maxIncome, days[i + j] - days[i]);
      }
    }
  }

  console.log(maxIncome);
};

rl.question("", (nums) => {
  rl.question("", (n) => {
    solution(...nums.split(" ").map(Number), n.split(" ").map(Number));
    rl.close();
  });
});
