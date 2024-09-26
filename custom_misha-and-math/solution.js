// misha and math (N/A)
// Created on: 2024-09-26 17:46:34
// Source: Yandex contest (young && yandex)
// Happy coding!

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (n, nums) => {
  let state = "start";
  const ans = [];

  nums.forEach((a) => {
    if (state === "start") {
      if (a % 2 === 0) {
        ans.push("+");
      } else {
        state = "last_odd";
      }
    } else if (state === "last_odd") {
      if (a % 2 === 0) {
        ans.push("+");
        state = "mult";
      } else {
        ans.push("×");
      }
    } else {
      ans.push("×");
    }
  });
  console.log(ans.join(""));
};

rl.question("", (n) => {
  rl.question("", (nums) => {
    solution(Number(n), nums.split(" ").map(Number));
    rl.close();
  });
});
