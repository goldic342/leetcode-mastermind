// profitable startup (N/A)
// Created on: 2024-09-26 17:06:25
// Source: Yandex contest (young && yandex)
// Happy coding!

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (n, k, d) => {
  const numbers = [];

  for (let i = 0; i < 10; i++) {
    if ((n * 10 + i) % k === 0) {
      numbers.push(i);
      break;
    }
  }
  if (!numbers.length) {
    console.log(-1);
    return;
  }

  numbers.unshift(n);

  for (let i = 0; i < d - 1; i++) {
    numbers.push(0);
  }

  console.log(numbers.join(""));
};

rl.question("", (string) => {
  solution(...string.split(" ").map(Number));
  rl.close();
});
