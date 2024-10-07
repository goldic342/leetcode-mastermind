// room square (N/A)
// Created on: 2024-10-07 15:50:36
// Source: CodeRun
// Happy coding!
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n, start, points) => {
  const queue = [start];
  const checkedPoints = [];

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  for (let i = 0; i < queue.length; i++) {
    for (let j = 0; j < 4; j++) {
      const pointPos = [queue[i][0] + dx[j], queue[i][1] + dy[j]];
      const point = points[pointPos[0]][pointPos[1]];

      if (
        point === "." &&
        !queue.some((elem) => {
          return JSON.stringify(pointPos) === JSON.stringify(elem);
        })
      ) {
        queue.push(pointPos);
      }

      console.log(queue);
    }
  }

  console.log(queue.length);
};

let a, b;
let n;
const points = [];
let inputCount = 0;

const getInput = () => {
  if (n === undefined) {
    rl.question("", (answer) => {
      n = parseInt(answer) + 1;
      getInput();
    });
  } else if (inputCount < n) {
    rl.question("", (input) => {
      if (inputCount === n - 1) {
        [a, b] = input.split(" ").map(Number);
      } else {
        points.push(input.split(""));
      }
      inputCount++;
      getInput();
    });
  } else {
    rl.close();
    solution(n - 1, [a - 1, b - 1], points);
  }
};

getInput();
