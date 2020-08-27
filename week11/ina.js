// 문제 56
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

// 풀이
// Runtime: 84 ms, faster than 85.43% of JavaScript online submissions for Merge Intervals.
// 풀이요약 ==> 1. 배열 오름차순 정렬 2. for문으로 <인터벌 겹칠때/겹치지 않을 때> 각각 <앞배열 앞값&뒷배열뒷값 /기존 배열> result에 push

const merge1 = (intervals) => {
  //1. 빈 배열 투입할 경우  (=> 그대로 리턴)
  if (!intervals.length) return intervals;

  //결과값을 담을 빈 배열
  var result = [];

  //2. 주어진 intervals 오름차순으로 정렬하기 (=> 앞값 기준으로 정렬하되, 앞값이 동일할 경우 뒷값 기준으로 정렬)
  intervals.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  //3. 인터벌 겹치지 않는 경우/겹치는 경우 나누어 result 배열에 push.
  for (var i = 0; i < intervals.length; i++) {
    var prev = result[result.length - 1];
    //3-1. 인터벌 겹치지 않는 경우(or첫번째 인터벌인 경우) => 인터벌 그대로 result에 push
    if (i == 0 || intervals[i][0] > prev[1]) {
      result.push(intervals[i]);
    } //3-2. 인터벌 겹칠 경우 => 앞 인터벌의 두번째값과 뒤 인터벌의 두번째값 중 큰 값으로 교체
    else {
      prev[1] = Math.max(prev[1], intervals[i][1]);
    }
  }
  return result;
};

const example1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
const example2 = [
  [1, 4],
  [4, 5],
];
console.log(merge1(example1));
console.log(merge1(example2));

// 문제 1306.

// Input: arr = [4,2,3,0,3,1,2], start = 5
// Output: true
// Explanation:
// All possible ways to reach at index 3 with value 0 are:
// index 5 -> index 4 -> index 1 -> index 3
// index 5 -> index 6 -> index 4 -> index 1 -> index 3 //문제

// Input: arr = [3,0,2,1,2], start = 2
// Output: false
// Explanation: There is no way to reach at index 1 with value 0.

//풀이 (BFS)
const canReach = (arr, start) => {
  const visited = new Set();
  const queue = [start];
  for (let len = 0, max = arr.length; len < queue.length; ++len) {
    const idx = queue[len];
    if (visited.has(idx)) continue;
    if (arr[idx] === 0) return true;
    visited.add(idx);
    idx + arr[idx] < max && queue.push(idx + arr[idx]);
    idx - arr[idx] >= 0 && queue.push(idx - arr[idx]);
  }
  return false;
};

//
//문제 402. Remove K Digits
//Input: num = "1432219", k = 3
// Output: "1219"
// Explanation: Remove the three digits 4, 3, and 2
// to form the new number 1219 which is the smallest.
//
var removeKdigits = function (num, k) {
  const stack = []; //지우고 남은 거 스택에 쌓기
  let removed = 0;

  for (let n of num) {
    while (stack.length && n < stack[stack.length - 1] && removed < k) {
      stack.pop();
      removed += 1;
    }
    stack.push(n);
  }

  // remove all remaining large numbers
  while (removed < k) {
    stack.pop();
    removed += 1;
  }

  // remove all beginning zeroes
  while (stack.length && stack[0] === "0") {
    stack.shift();
  }

  return stack.length ? stack.join("") : "0";
};
