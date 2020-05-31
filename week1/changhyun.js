// 1. K번째 수

function solution1(array, commands) {
  return commands.map(
    (c) => array.slice(c[0] - 1, c[1]).sort((a, b) => a - b)[c[2] - 1]
  );
}

// 더 좋은 풀이 : destructing을 사용해 명시적으로 array item을 사용할 수 있다.
function otherSolution1(array, commands) {
  return commands.map(
    ([from, to, k]) => array.slice(from - 1, to).sort((x, y) => x > y)[k - 1]
  );
}

//! sort 함수에서 a-b를 callback하지 않을 경우, 1,4,11은 1, 11, 4로 sort된다.

// 2. 같은 숫자는 싫어
function solution2(arr) {
  const answer = [];
  arr.forEach((a, i) => a !== arr[i + 1] && answer.push(a));
  return answer;
}
// 더 좋은 풀이 : 필터를 사용하면 위 코드를 줄일 수 있다.
function otherSolution2(arr) {
  return arr.filter((a, i) => a !== arr[i + 1]);
}

// 3. 완주하지 못한 선수
function solution3(participant, completion) {
  const obj = {};

  participant
    .concat(completion)
    .forEach((i) => (obj[i] ? obj[i]++ : (obj[i] = 1)));

  for (let key of Object.keys(obj)) {
    if (obj[key] % 2 === 1) {
      return key;
    }
  }
}
