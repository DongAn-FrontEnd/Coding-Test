// ## tribonacci

// recursion : timeout
var tribonacci = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 1;

  return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
};

// for문
var tribonacci = function (n) {
  const tri = [0, 1, 1];
  for (let i = 3; i < n + 1; i++) {
    tri[i] = tri[i - 1] + tri[i - 2] + tri[i - 3];
  }
  return tri[n];
};

// ## majority element

// sort
var majorityElement = function (nums) {
  return nums.sort((a, b) => a - b)[Math.floor(nums.length / 2)];
};

// hash map
var majorityElement = function (nums) {
  const obj = {};
  const halfSize = nums.length / 2;

  nums.forEach((num) => (obj[num] = ++obj[num] || 1));

  for (let key in obj) {
    if (obj[key] > halfSize) {
      return +key;
    }
  }
};

// ##  minimum subsequence

var minSubsequence = function (nums) {
  if (nums.length === 1) return nums;

  let sum = nums.reduce((a, b) => a + b);
  let subSum = 0;
  const subArr = [];

  nums.sort((a, b) => b - a);

  for (let i = 0; i < nums.length; i++) {
    sum -= nums[i];
    subSum += nums[i];
    subArr.push(nums[i]);
    if (subSum > sum) return subArr;
  }
};

// ## Divisor Game

// 홀-홀 = 짝 짝-홀 = 홀
var divisorGame = function (N) {
  return N % 2 === 0;
};
