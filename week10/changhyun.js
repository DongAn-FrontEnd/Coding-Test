// 242. Valid Anagram 시간 88~97%

// 첫 번째 풀이
var isAnagram = function (s, t) {
  if (s === t) return true;
  if (s.length !== t.length) false;

  const check = Array(97 + 26).fill(0);

  for (c of s) {
    check[c.charCodeAt()]++;
  }

  for (let i = 0; i < t.length; i++) {
    const charCode = t[i].charCodeAt();
    check[charCode]--;
    if (check[charCode] < 0) return false;
  }

  for (let i = 97; i < check.length; i++) {
    if (check[i] > 0) {
      return false;
    }
  }

  return true;
};

// sort() >> nlogn
// so used for loop and memo

// 다른 방법으로 70 ~ 93%
// 조건문 때문에 느린 듯

var isAnagram = function (s, t) {
  if (s === t) return true;
  if (s.length !== t.length) return false;

  const hash = {};

  for (c of s) {
    hash[c] = hash[c] ? hash[c] + 1 : 1;
  }

  for (c of t) {
    if (!hash[c]) return false;
    hash[c]--;
  }
  return true;
};

// 179. Largest Number

// 첫 시도 e notatino 문제
/*
Input
[999999998,999999997,999999999]
Output
"1e+27"
Expected
"999999999999999998999999997"
*/
var largestNumber = function (nums) {
  nums.sort((a, b) => {
    if (a.toString() + b < b.toString() + a) {
      return 1;
    }

    return -1;
  });

  return (+nums.join("")).toString();
};

// 풀이
// 둘 다 비슷 50~96%
// 1.
var largestNumber = function (nums) {
  nums.sort((a, b) => {
    if (a.toString() + b < b.toString() + a) {
      return 1;
    }

    return -1;
  });

  let str = "";
  const firstIndex = nums.findIndex((num) => num);

  if (firstIndex !== -1) {
    for (let i = firstIndex; i < nums.length; i++) {
      str += nums[i];
    }
  }

  return str ? str : "0";
};
// 2.
var largestNumber = function (nums) {
  nums.sort((a, b) => {
    if (a.toString() + b < b.toString() + a) {
      return 1;
    }

    return -1;
  });

  let str = "";
  const firstIndex = nums.findIndex((num) => num);

  return nums.splice(firstIndex).join("");
};

// 493. Reverse Pairs

// 첫 번째 풀이 : brute force
// 당연히 시간 초과

var reversePairs = function (nums) {
  const isImportantReverse = (i, j) => {
    if (i < j && nums[i] > 2 * nums[j]) {
      return true;
    }
    return false;
  };

  let ans = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (isImportantReverse(i, j)) ans++;
    }
  }

  return ans;
};

// 두 번째 풀이 : case33 time out
var reversePairs = function (nums) {
  if (nums.length === 0) return 0;

  const sorted = nums
    .map((num, i) => [num, i])
    .sort((a, b) => (a[0] > b[0] ? 1 : -1));

  let size = sorted.length;
  let pairsCount = 0;
  let backIndex = 1;
  let foundBackIndex = false;

  for (let i = 0; i < size; i++) {
    const front = sorted[i];

    for (let j = backIndex; j < size; j++) {
      if (sorted[j][0] > 2 * front[0]) {
        backIndex = j;
        foundBackIndex = true;
        break;
      }
      if (j === size - 1) {
        backIndex++;
        foundBackIndex = false;
      }
    }
    if (!foundBackIndex) continue;

    let lastIndex = backIndex;
    while (lastIndex < size) {
      const back = sorted[lastIndex];
      if (back[1] < front[1]) pairsCount++;
      lastIndex++;
    }
  }

  return pairsCount;
};

// 75. Sort Colors
// merge sort는 새로운 arr를 리턴하므로 사용 불가
// 기본 sorts 중 가장 빠른 insertion sort 사용

var sortColors = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    const temp = nums[i];

    for (let j = i - 1; j >= 0; j--) {
      if (temp >= nums[j]) {
        nums[j + 1] = temp;
        break;
      }

      nums[j + 1] = nums[j];
      if (j === 0) nums[j] = temp;
    }
  }
};
