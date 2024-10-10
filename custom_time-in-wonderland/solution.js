// time in wonderland (N/A)
// Created on: 2024-10-10 17:04:49
// Source: Yandex Cup (algorithms test contest)
// Happy coding!
// This problem seems to be very easy

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

rl.question("", (nums) => {
  const [h, m] = nums.split(" ").map(Number);

  console.log(h === 0 ? 0 : 12 - h, m === 0 ? 0 : 60 - m);
  rl.close();
});
