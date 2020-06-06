## 1. K번째 수

```js
function solution1(array, commands) {
  return commands.map(
    (c) => array.slice(c[0] - 1, c[1]).sort((a, b) => a - b)[c[2] - 1]
  );
}
```

정확성 테스트
테스트 1 〉 통과 (2.07ms, 37.3MB)
테스트 2 〉 통과 (2.04ms, 37.5MB)
테스트 3 〉 통과 (2.04ms, 37.2MB)
테스트 4 〉 통과 (2.01ms, 37.3MB)
테스트 5 〉 통과 (2.06ms, 37.5MB)
테스트 6 〉 통과 (2.11ms, 37.5MB)
테스트 7 〉 통과 (2.05ms, 37.3MB)

```js
function otherSolution1(array, commands) {
  return commands.map(
    ([from, to, k]) => array.slice(from - 1, to).sort((x, y) => x > y)[k - 1]
  );
}
```

```js
// function otherSolution2(array, commands) {
//   return commands.map((command) => {
//     const [sPosition, ePosition, position] = command;
//     const newArray = array
//       .filter(
//         (value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1
//       )
//       .sort((a, b) => a - b);

//     return newArray[position - 1];
//   });
// }
function otherSolution2(array, commands) {
  return commands.map(
    ([from, to, k]) =>
      array
        .filter((item, i) => i >= from - 1 && i <= to - 1)
        .sort((a, b) => a - b)[k - 1]
  );
}
```

테스트 1 〉 통과 (2.10ms, 37.2MB)
테스트 2 〉 통과 (2.32ms, 37.2MB)
테스트 3 〉 통과 (2.15ms, 37.3MB)
테스트 4 〉 통과 (2.10ms, 37.3MB)
테스트 5 〉 통과 (2.35ms, 37.5MB)
테스트 6 〉 통과 (2.19ms, 37.3MB)
테스트 7 〉 통과 (2.10ms, 37.1MB)

### 설명

commands 각 아이템을 순회하며 c[0]~c[1]번째까지의 값을 array에서 추출하고 정렬한 다음, c[2]번째의 값을 return할 배열에 저장하면 된다.

Array의 n번째는 Array[n-1]이라는 것을 고려해 c[0]-1, c[1], c[2]-1을 대입했다.

## 2. 같은 숫자는 싫어

```js
function solution2(arr) {
  const answer = [];
  arr.forEach((a, i) => a !== arr[i + 1] && answer.push(a));
  return answer;
}
```

정확성 테스트
테스트 1 〉 통과 (1.78ms, 37.4MB)
테스트 2 〉 통과 (1.87ms, 37.4MB)
테스트 3 〉 통과 (1.92ms, 37.7MB)
테스트 4 〉 통과 (1.94ms, 37.8MB)
테스트 5 〉 통과 (1.89ms, 37.5MB)
테스트 6 〉 통과 (2.04ms, 37.8MB)
테스트 7 〉 통과 (2.01ms, 37.7MB)
테스트 8 〉 통과 (1.94ms, 37.8MB)
테스트 9 〉 통과 (2.14ms, 37.6MB)
테스트 10 〉 통과 (1.76ms, 37.5MB)
테스트 11 〉 통과 (1.79ms, 37.5MB)
테스트 12 〉 통과 (1.79ms, 37.4MB)
테스트 13 〉 통과 (1.90ms, 37.7MB)
테스트 14 〉 통과 (1.95ms, 37.7MB)
테스트 15 〉 통과 (1.87ms, 37.8MB)
테스트 16 〉 통과 (2.04ms, 37.8MB)
테스트 17 〉 통과 (1.70ms, 37.5MB)
효율성 테스트
테스트 1 〉 통과 (392.45ms, 103MB)
테스트 2 〉 통과 (402.26ms, 101MB)
테스트 3 〉 통과 (389.30ms, 102MB)
테스트 4 〉 통과 (399.18ms, 103MB)

### 다른 사람 풀이

filter를 사용하면 풀었던 코드를 줄일 수 있다. 성능 또한 개선됐다.

```js
arr.filter((a, i) => a !== arr[i + 1]);
```

정확성 테스트
테스트 1 〉 통과 (1.68ms, 41.5MB)
테스트 2 〉 통과 (1.98ms, 37.8MB)
테스트 3 〉 통과 (1.88ms, 37.4MB)
테스트 4 〉 통과 (1.79ms, 37.6MB)
테스트 5 〉 통과 (1.92ms, 37.8MB)
테스트 6 〉 통과 (1.98ms, 37.6MB)
테스트 7 〉 통과 (1.80ms, 37.4MB)
테스트 8 〉 통과 (1.77ms, 37.4MB)
테스트 9 〉 통과 (2.00ms, 37.9MB)
테스트 10 〉 통과 (1.82ms, 37.5MB)
테스트 11 〉 통과 (1.84ms, 37.3MB)
테스트 12 〉 통과 (1.86ms, 37.7MB)
테스트 13 〉 통과 (1.95ms, 37.8MB)
테스트 14 〉 통과 (1.83ms, 37.4MB)
테스트 15 〉 통과 (1.98ms, 37.7MB)
테스트 16 〉 통과 (2.15ms, 37.6MB)
테스트 17 〉 통과 (1.73ms, 37.4MB)
효율성 테스트
테스트 1 〉 통과 (386.79ms, 102MB)
테스트 2 〉 통과 (387.78ms, 102MB)
테스트 3 〉 통과 (395.11ms, 103MB)
테스트 4 〉 통과 (371.72ms, 102MB)

### 설명

배열을 순회하며 arr[i], arr[i+1] 값을 비교해 값이 다를 경우,
return할 새로운 배열에 arr[i]를 push한다.

마지막 index에서는 arr[i+1]이 undefined이므로, arr[i]이 반드시 push된다.

## 3. 완주하지 못한 선수

```js
// function solution3(participant, completion) {
//   var answer = "";

//   participant.sort();
//   completion.sort();

//   for (var i = 0; i < participant.length; i++) {
//     if (participant[i] !== completion[i]) {
//       answer = participant[i];
//       return answer;
//     }
//   }
// }

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
```

정확성 테스트
테스트 1 〉 통과 (1.76ms, 37.4MB)
테스트 2 〉 통과 (1.69ms, 37.5MB)
테스트 3 〉 통과 (1.97ms, 37.7MB)
테스트 4 〉 통과 (2.29ms, 37.7MB)
테스트 5 〉 통과 (2.10ms, 37.7MB)

효율성 테스트
테스트 1 〉 통과 (28.49ms, 55MB)
테스트 2 〉 통과 (38.95ms, 61.1MB)
테스트 3 〉 통과 (43.19ms, 68.1MB)
테스트 4 〉 통과 (48.45ms, 70.1MB)
테스트 5 〉 통과 (47.89ms, 70.2MB)

### 설명

**sol 1**
첫 번째 시도에서는 participant와 completion을 sort하고, 비교를 시행했다.
첫 번째 방법은 sort 과정에서 cost가 크게 발생할 것이라 생각해 다른 방법을 생각해봤다.

**sol 2**
완주하지 못한 선수는 1명이므로, participant와 completion 배열을 concat했을 때
선수를 count하면, 완주하지 못한 선수만 홀수로 count된다.
처음에는 습관적으로.. `[...participant , ...completion]`을 사용했었는데, concat를 사용해도 immutable하기에 concat를 사용했다.
