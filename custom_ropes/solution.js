// ropes (N/A)
// Created on: 2024-10-03 18:06:09
// Source: Yandex contest (young && yandex)
// Happy coding!
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (n, ropes) => {
  let max = 0;
  let summ = 0;

  ropes.forEach((rope) => {
    if (rope > max) max = rope;
    summ += rope;
  });

  if (max * 2 > summ) console.log(max * 2 - summ);
  else console.log(summ);
};

rl.question("", (n) => {
  rl.question("", (ropes) => {
    solution(Number(n), ropes.split(" ").map(Number));
    rl.close();
  });
});
