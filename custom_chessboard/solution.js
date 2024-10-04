// chessboard (N/A)
// Created on: 2024-10-03 18:47:21
// Source: Yandex contest (young && yandex)
// Happy coding!
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

const solution = (cells) => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  let ans = 0;

  cells.forEach((cell) => {
    for (let i = 0; i < 4; i++) {
      if (
        !cells.some((elem) => {
          return (
            JSON.stringify([cell[0] + dx[i], cell[1] + dy[i]]) ===
            JSON.stringify(elem)
          );
        })
      ) {
        ans++;
      }
    }
  });
  console.log(ans);
};

let n;
const cells = [];
let inputCount = 0;

const getInput = () => {
  if (n === undefined) {
    rl.question("", (answer) => {
      n = parseInt(answer);
      getInput();
    });
  } else if (inputCount < n) {
    rl.question("", (input) => {
      cells.push(input.split(" ").map(Number));
      inputCount++;
      getInput();
    });
  } else {
    rl.close();
    solution(cells);
  }
};

getInput();
