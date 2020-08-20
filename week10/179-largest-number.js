// 입력으로 들어오는 배열(nums)의 위치를 잘 정렬해서 가장 큰 숫자를 만드는 문제
//
// # Testcase 1
// Input: [3,30,34,5,9]
// Output: "9534330"
//
// # Testcase 2
// Input: [10,2]
// Output: "210"
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
