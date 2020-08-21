// 57-insert-interval
const isOverlap = (interval, newInterval) => {
  const [s, e] = [interval[0], interval[1]];
  const [nS, nE] = [newInterval[0], newInterval[1]];

  if (s <= nE && nS <= e) return 0; // 겹칠때
  if (s > nE) return 1; // 안겹칠 때 interval > newInterval
  if (e < nS) return 2; // 안겹칠 때 interval < newInterval
};

var insert = function(intervals, newInterval) {
  let step = 0;
  const length = intervals.length;
  const answer = [];

  while (length > step) {
    const interval = intervals[step];
    let overlap;

    if (newInterval === null) {
      // newInterval이 없다면
      answer.push(interval);
      step++;
    } else {
      overlap = isOverlap(interval, newInterval);
      if (overlap === 0) {
        // 겹치면
        // console.log(`>> ${interval}, ${newInterval} 겹쳤다 (${overlap})`);
        // ...newInterval 교체
        newInterval[0] = Math.min(interval[0], newInterval[0]);
        newInterval[1] = Math.max(interval[1], newInterval[1]);
        step++;
      } else if (overlap === 1) {
        // 안겹치고, interval > newInterval이면
        // console.log(`>> ${interval} > ${newInterval} 안겹쳤다 (${overlap})`);
        answer.push(newInterval);
        newInterval = null;
      } else if (overlap === 2) {
        // 안겹치고, interval < newInterval이면
        // console.log(`>> ${interval} < ${newInterval} 안겹쳤다 (${overlap})`);
        answer.push(interval);
        step++;
      }
    }
  }

  if (newInterval !== null) answer.push(newInterval);

  return answer;
};

// 75-sort-colors
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  return nums.sort((a, b) => a - b);
};

// 179-largest-number
const removeZeroAtStart = nums => {
  const length = nums.length - 1;
  let startIdxNotZero = length;

  for (let i = 0; i < length; i++) {
    const num = nums[i];
    if (num > 0) {
      startIdxNotZero = i;
      break;
    }
  }

  return nums.slice(startIdxNotZero, length + 1);
};

var largestNumber = function(nums) {
  const ret = nums
    .sort((a, b) => {
      const [strA, strB] = [a.toString(), b.toString()];
      if (strA + strB > strB + strA) return -1;
      if (strB + strA > strA + strB) return 1;
      return 0;
    })
    .join("");

  return removeZeroAtStart(ret);
};

// 242-valid-anagram
const countCharacters = (str, list) => {
  for (let ch of str) {
    const idx = ch.charCodeAt(0) - 97;
    list[idx] ? list[idx]++ : (list[idx] = 1);
  }
};

var isAnagram = function(s, t) {
  let ret = true;
  const containList = [new Array(26), new Array(26)];

  countCharacters(s, containList[0]);
  countCharacters(t, containList[1]);

  for (let i = 0; i < 26; i++) {
    if (containList[0][i] !== containList[1][i]) {
      ret = false;
      break;
    }
  }

  return ret;
};
