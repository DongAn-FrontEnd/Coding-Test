// 179.

const largestNumber = (nums) => {
  // edge case
  if (nums.length === 0) {
    return "0";
  }

  // 숫자 배열을 문자열 배열로 변환
  nums = nums.map((num) => num.toString());

  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  // Array.prototype.sort([compareFunction])의 compareFunction이
  // 0보다 작은 값을 반환하면 a를 먼저,
  // 0보다 큰 값을 반환하면 b를 먼저 위치시키는 특성을 이용하여 배열을 정렬
  const sorted = nums.sort((a, b) => parseInt(b + a) - parseInt(a + b));

  // 정렬된 배열의 첫 원소가 "0"이면 나머지 원소도 다 "0"일 것이므로 "0"을 반환
  if (sorted[0] === "0") {
    return "0";
  }

  return sorted.reduce((acc, cur) => (acc += cur), "");
};

// 242.

const isAnagram = (s, t) => {
  return s.split("").sort().join("") === t.split("").sort().join("");
};

const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;

  const alphaTable = {};

  for (let char of s) {
    if (!alphaTable[char]) {
      alphaTable[char] = 1;
      continue;
    }

    alphaTable[char]++;
  }

  for (let char of t) {
    if (!alphaTable[char] || 0) return false;

    alphaTable[char]--;
  }

  return true;
};

// https://leetcode.com/problems/valid-anagram/discuss/66484/Accepted-Java-O(n)-solution-in-5-lines
const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;

  const alpha = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    alpha[s.charCodeAt(i) - "a".charCodeAt(0)]++;
    alpha[t.charCodeAt(i) - "a".charCodeAt(0)]--;
  }

  for (let count of alpha) {
    if (count !== 0) return false;
  }

  return true;
};

// 75.

const sortColors = (nums) => {
  let front = 0;
  let rear = nums.length - 1;
  let current = 0;

  while (current <= rear) {
    if (nums[current] === 0) {
      nums[current] = nums[front];
      nums[front] = 0;
      current++;
      front++;
    } else if (nums[current] === 2) {
      nums[current] = nums[rear];
      nums[rear] = 2;
      rear--;
    } else {
      current++;
    }
  }
};
