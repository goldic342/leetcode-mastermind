// file formatting (N/A)
// Created on: 2024-09-26 15:27:40
// Source: Yandex contest (young && yandex)
// Happy coding!

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (lines) => {
  let ans = 0;

  lines.forEach((a) => {
    ans += (a / 4) >> 0;

    if (a % 4 === 1 || a % 4 === 2) {
      ans += a % 4;
    } else if (a % 4 === 3) {
      ans += 2;
    }
  });

  console.log(ans);
};

const readNumbers = () => {
  return new Promise((resolve) => {
    rl.question("", (n) => {
      n = Number(n);
      const numbers = [];

      const readNextNumber = (count) => {
        if (count < n) {
          rl.question("", (num) => {
            numbers.push(Number(num));
            readNextNumber(count + 1);
          });
        } else {
          rl.close();
          resolve(numbers);
        }
      };

      readNextNumber(0);
    });
  });
};

readNumbers().then((nums) => solution(nums));
