// wheel of fortune (N/A)
// Created on: 2024-10-04 15:01:06
// Source: Yandex contest (young && yandex)
// Happy coding!
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (n, a, b, k, sectors) => {
  const minSector = ((a - 1) / k) >> 0;
  const maxSector = ((b - 1) / k) >> 0;
  let ans = -1;

  for (let j = 0; j < 2; j++) {
    const usedSectors = Array(n).fill(false);
    for (let i = minSector; i <= maxSector; i++) {
      ans = Math.max(ans, sectors[i % n]);
      if (usedSectors[i % n]) {
        break;
      }

      usedSectors[i % n] = true;
    }
    sectors = [sectors[0], ...sectors.slice(1).reverse()];
  }

  console.log(ans);
};

rl.question("", (n) => {
  rl.question("", (sectors) => {
    rl.question("", (nums) => {
      solution(
        parseInt(n),
        ...nums.split(" ").map(Number),
        sectors.split(" ").map(Number),
      );
      rl.close();
    });
  });
});
