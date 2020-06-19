// 위장

function solution(clothes) {
  let hash = {};
  clothes.forEach(([cloth, species]) => (hash[species] = ++hash[species] || 1));
  return Object.values(hash).reduce((a, b) => (a + 1) * (b + 1) - 1);
}

/*
설명 : 모든 옷의 종류가 다르기 때문에 hash에 species 개수를 구하고, 경우의 수를 계산
*/

// 다음 큰 숫자
function solution(n) {
  const count = n
    .toString(2)
    .split("")
    .filter((i) => i === "1").length;
  while (true) {
    n++;
    if (
      count ===
      n
        .toString(2)
        .split("")
        .filter((i) => i === "1").length
    )
      break;
  }

  return n;
}
// refactoring
function solution(n) {
  const countStrOne = (n) =>
    n
      .toString(2)
      .split("")
      .filter((i) => i === "1").length;

  const count = countStrOne(n);

  while (true) {
    n++;
    if (count === countStrOne(n)) break;
  }

  return n;
}

/* 

효율성 test

테스트 1 〉	통과 (1.70ms, 37.5MB)
테스트 2 〉	통과 (1.70ms, 37.5MB)
테스트 3 〉	통과 (1.71ms, 37.4MB)
테스트 4 〉	통과 (1.67ms, 37.3MB)
테스트 5 〉	통과 (1.74ms, 37.5MB)
테스트 6 〉	통과 (1.71ms, 37.6MB)

설명

노가다...
효율성이 매우 안 좋은 알고리즘이라 생각
규칙을 못 찾아 while문에서 숫자를 1씩 늘려가면서
이진수로 바꿔 1의 개수를 구하고, 원래 값의 1의 개수(count)와 같을 경우, 그 값을 return

*/

// 구명보트

function solution(people, limit) {
  var answer = 0;
  people.sort((a, b) => b - a);
  const length = people.length;
  let back = people.findIndex((i) => i <= limit / 2);
  back = back === -1 ? length : back;
  let front = back - 1;

  const count = { front: front + 1, back: length - back };
  let isMoreBack = true;
  while (isMoreBack) {
    if (people[front] + people[back] <= limit) {
      answer++;
      front--;
    } else {
      if (back > length - 1 || front < 0) isMoreBack = false;
    }
    back++;
  }

  const extra = count.front - answer + Math.ceil((count.back - answer) / 2);
  answer += extra;

  return answer;
}

people.sort((b, a) => b - a);

// Running Sum of 1d Array

var runningSum = function (nums) {
  const arr = Array(nums.length);
  arr[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    arr[i] = arr[i - 1] + nums[i];
  }

  return arr;
};

// shuffle the array

var shuffle = function (nums, n) {
  const length = nums.length;
  const arr = Array(length);
  const half = length % 2 === 0 ? length / 2 : (length - 1) / 2;

  for (let i = 0; i < half; i++) {
    arr[2 * i] = nums[i];
    arr[2 * i + 1] = nums[i + half];
  }

  if (length % 2 === 1) {
    arr[length - 1] = nums[length - 1];
  }

  return arr;
};
