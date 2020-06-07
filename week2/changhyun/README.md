## 1. 문자열 내 마음대로 정렬하기

```js
function solution1(strings, n) {
  return strings.sort((a, b) => {
    const [charA, charB] = [a.charAt(n), b.charAt(n)];

    if (charA > charB) {
      return 1;
    }

    if (charA < charB) {
      return -1;
    }

    return a > b ? 1 : -1;
  });
}
// sort함수를 이용해 각 character의 아스키코드를 대소 비교
```

테스트 1 〉	통과 (2.23ms, 37.5MB)
테스트 2 〉	통과 (2.09ms, 37.5MB)
테스트 3 〉	통과 (2.27ms, 37.5MB)
테스트 4 〉	통과 (2.42ms, 37.8MB)
테스트 5 〉	통과 (2.17ms, 37.4MB)
테스트 6 〉	통과 (2.49ms, 37.6MB)
테스트 7 〉	통과 (2.08ms, 37.5MB)
테스트 8 〉	통과 (2.46ms, 37.6MB)
테스트 9 〉	통과 (2.21ms, 41.5MB)
테스트 10 〉	통과 (2.51ms, 37.8MB)
테스트 11 〉	통과 (2.32ms, 37.5MB)
테스트 12 〉	통과 (2.29ms, 37.5MB)

```js
function solution1(strings, n) {
  return strings.sort((a, b) =>
    a[n] > b[n] ? 1 : a[n] < b[n] ? -1 : a > b ? 1 : -1
  );
}
// 위 코드를 삼항식으로.
// n번째 character 대소 비교 후, 같을 시 사전순으로 a,b를 정렬
```

테스트 1 〉	통과 (2.02ms, 37.4MB)
테스트 2 〉	통과 (2.14ms, 37.5MB)
테스트 3 〉	통과 (2.37ms, 37.7MB)
테스트 4 〉	통과 (2.35ms, 37.8MB)
테스트 5 〉	통과 (2.29ms, 37.4MB)
테스트 6 〉	통과 (2.36ms, 37.7MB)
테스트 7 〉	통과 (2.02ms, 37.4MB)
테스트 8 〉	통과 (2.15ms, 37.5MB)
테스트 9 〉	통과 (2.11ms, 37.4MB)
테스트 10 〉통과 (2.25ms, 37.4MB)
테스트 11 〉통과 (2.32ms, 37.5MB)
테스트 12 〉통과 (2.30ms, 37.7MB)

```js
function otherSolution1(strings, n) {
  return strings.sort((s1, s2) =>
    s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeCompare(s2[n])
  );
}
// localeCompare 메소드 사용 : https://devdocs.io/javascript/global_objects/string/localecompare

```
---
## 2. 비밀지도

```js
function solution2(n, arr1, arr2) {
  const answer = [];

  for (let i = 0; i < n; i++) {
    const zero = Array(n).fill(" ");
    const binaryTrue = (arr1[i] | arr2[i]).toString(2);

    for (let i = 0; i < binaryTrue.length; i++) {
      +binaryTrue[binaryTrue.length - 1 - i] && (zero[n - 1 - i] = "#");
    }

    answer.push(zero.join(""));
  }

  return answer;
}
```

### 설명

' '으로 채워진 길이 n짜리 배열 생성.
arr1, arr2 각 행을 xor한 후(decimal number), 2진수로 변환
변환된 2진수에서 0,1,2,4,8,16,... 순으로 1일 경우 zero arr의 ' '을 '#'으로 reassign.


테스트 1 〉	통과 (1.91ms, 37.3MB)
테스트 2 〉	통과 (2.09ms, 37.4MB)
테스트 3 〉	통과 (1.95ms, 37.4MB)
테스트 4 〉	통과 (2.04ms, 37.2MB)
테스트 5 〉	통과 (2.16ms, 37.5MB)
테스트 6 〉	통과 (2.04ms, 37.3MB)
테스트 7 〉	통과 (2.00ms, 37.5MB)
테스트 8 〉	통과 (1.99ms, 37.3MB)

```js
function otherSolution2(n, arr1, arr2) {
  return arr1.map((v, i) =>
    addZero(n, (v | arr2[i]).toString(2)).replace(/1|0/g, (a) =>
      +a ? "#" : " "
    )
  );
}

const addZero = (n, s) => {
  return "0".repeat(n - s.length) + s;
};
const fillZero = (n, s) => Array(n-s.length).fill('0').join('') +s

```

---

## 3. 시저 암호

```js
function solution3(s, n) {
  var answer = "";
  for (let c of s) {
    let ascii = c.charCodeAt();
    if (ascii >= 97) {
      //소문자일 때
      ascii = ((ascii + n - 97) % 26) + 97;
    } else if (65 <= ascii && ascii <= 90) {
      //대문자일
      ascii = ((ascii + n - 65) % 26) + 65;
    } else {
      ascii = 32;
    }
    answer += String.fromCharCode(ascii);
  }
  return answer;
}

function solution3(s, n) {
  var answer = "";
  for (let c of s) {
    if ((c = " ")) {
      answer += " ";
      return;
    }

    let ascii = c.charCodeAt();

    ascii >= 97
      ? (ascii = ((ascii + n - 97) % 26) + 97) // 대문자일 때 ascii값 조정
      : (ascii = ((ascii + n - 65) % 26) + 65); // 소문자일 때 ascii값 조정

    answer += String.fromCharCode(ascii);
  }
  return answer;
}
```

### 설명

문자를 아스키로 변환 후, 대/소문자의 'A'/'a'를 index 0으로 조정하고(-97), 
n번째 아스키를 26으로 나눠 나머지를 구해 다시 'A'/'a' 아스키값을 더해줌.
위 변환식을 통해 n > 'z', n > 'Z'인 경우를 처리

아스키가 아닐 경우, ' ' 할당

---

## 4. 정수 제곱근 판별

```js
function solution4(n) {
  var x = Math.sqrt(n);
  return Number.isInteger(x) ? Math.pow(x + 1, 2) : -1;
}
// sqrt가 정수인지 아닌지를 통해 판별
```

테스트 1 〉	통과 (1.63ms, 37.2MB)
테스트 2 〉	통과 (1.70ms, 37.8MB)
테스트 3 〉	통과 (1.66ms, 37.2MB)
테스트 4 〉	통과 (1.66ms, 37.2MB)
테스트 5 〉	통과 (1.63ms, 37.4MB)
테스트 6 〉	통과 (1.76ms, 37.1MB)
테스트 7 〉	통과 (1.72ms, 37.2MB)
테스트 8 〉	통과 (1.63ms, 37.3MB)
테스트 9 〉	통과 (1.61ms, 37.5MB)
테스트 10 〉통과 (1.63ms, 37.2MB)
테스트 11 〉통과 (1.65ms, 37.4MB)
테스트 12 〉통과 (1.61ms, 37.2MB)
테스트 13 〉통과 (1.68ms, 37.4MB)
테스트 14 〉통과 (1.66ms, 37.5MB)
테스트 15 〉통과 (1.62ms, 37.3MB)
테스트 16 〉통과 (1.63ms, 37.3MB)
테스트 17 〉통과 (1.70ms, 37.1MB)
테스트 18 〉통과 (1.69ms, 37.3MB)

```js
function otherSolution4(n) {
  var x = 1;
  while (x * x < n) {
    x++;
  }
  return x * x === n ? (x + 1) * (x + 1) : -1;
}
// 위 solution과의 성능 차이를 비교하기 위해 가져옴.
```

테스트 1 〉	통과 (1.72ms, 37.3MB)
테스트 2 〉	통과 (11.85ms, 37.5MB)
테스트 3 〉	통과 (1.67ms, 37.6MB)
테스트 4 〉	통과 (5.03ms, 37.4MB)
테스트 5 〉	통과 (1.92ms, 37.2MB)
테스트 6 〉	통과 (1.70ms, 37.4MB)
테스트 7 〉	통과 (3.13ms, 37.3MB)
테스트 8 〉	통과 (1.74ms, 37.2MB)
테스트 9 〉	통과 (1.93ms, 37.4MB)
테스트 10 〉통과 (3.72ms, 37.3MB)
테스트 11 〉통과 (3.77ms, 37.5MB)
테스트 12 〉통과 (3.72ms, 37.3MB)
테스트 13 〉통과 (1.60ms, 37.3MB)
테스트 14 〉통과 (3.87ms, 37.3MB)
테스트 15 〉통과 (1.90ms, 37.2MB)
테스트 16 〉통과 (1.79ms, 37.3MB)
테스트 17 〉통과 (1.69ms, 37.5MB)
테스트 18 〉통과 (1.64ms, 37.3MB)

---

## 5. 크레인 인형뽑기 게임

```js
function solution5(board, moves) {
  var answer = 0;
  var input = [];

  moves.forEach((move) => {
    for (let row = 0; row < board.length; row++) {
      const doll = board[row][move - 1];

      if (doll) {
        input.push(doll);
        if (input.slice(-2, -1)[0] === doll) {
          input.pop();
          input.pop();
          answer += 2;
        }

        board[row][move - 1] = 0;
        return;
      }
    }
  });
  return answer;
}
```

### 설명

moves의 각 move를 순회하며
board의 0번째부터 마지막 row까지 move에 해당되는 column index를 살펴
doll이 있을 경우 input에 doll을 push하고 for문을 종료
만약 last doll이 currentDoll과 같을 경우, for문을 종료하기 전,
input에서 pop을 2회 시행하고, answer에 인형 추가.

테스트 1 〉	통과 (1.90ms, 37.4MB)
테스트 2 〉	통과 (1.99ms, 37.4MB)
테스트 3 〉	통과 (2.01ms, 37MB)
테스트 4 〉	통과 (2.74ms, 37.4MB)
테스트 5 〉	통과 (1.98ms, 37.3MB)
테스트 6 〉	통과 (1.98ms, 37.2MB)
테스트 7 〉	통과 (2.14ms, 37.2MB)
테스트 8 〉	통과 (2.15ms, 37.3MB)
테스트 9 〉	통과 (2.12ms, 37.1MB)
테스트 10 〉	통과 (2.20ms, 37.3MB)
테스트 11 〉	통과 (2.28ms, 37.4MB)

---

## 6. 모의고사

```js
function solution6(answers) {
  var answer = [];
  var p1 = [1, 2, 3, 4, 5];
  var p2 = [2, 1, 2, 3, 2, 4, 2, 5];
  var p3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  var pAnsCount = [0, 0, 0];
  var [p1Length, p2Length, p3Length] = [p1.length, p2.length, p3.length];

  answers.forEach((ans, i) => {
    ans === p1[i % p1Length] && pAnsCount[0]++;
    ans === p2[i % p2Length] && pAnsCount[1]++;
    ans === p3[i % p3Length] && pAnsCount[2]++;
  });

  var max = Math.max(...pAnsCount);

  pAnsCount.forEach((c, i) => c === max && answer.push(i + 1));

  return answer;
}
```

### 설명

각 정답에 대해 p1, p2, p3별 채점 결과를 pAnsCount에서 count하고,
count된 값의 max값을 찾아,
max값과 동일한 pAns를 찾아 answer에 push (index + 1로 인덱스 조정)

테스트 1 〉	통과 (2.00ms, 37.6MB)
테스트 2 〉	통과 (2.01ms, 37.3MB)
테스트 3 〉	통과 (2.08ms, 37.7MB)
테스트 4 〉	통과 (2.07ms, 37.3MB)
테스트 5 〉	통과 (2.08ms, 37.3MB)
테스트 6 〉	통과 (2.08ms, 37.3MB)
테스트 7 〉	통과 (2.51ms, 37.3MB)
테스트 8 〉	통과 (2.21ms, 37.4MB)
테스트 9 〉	통과 (3.74ms, 37.5MB)
테스트 10 〉통과 (2.46ms, 37.5MB)
테스트 11 〉통과 (3.69ms, 37.5MB)
테스트 12 〉통과 (3.56ms, 37.4MB)
테스트 13 〉통과 (2.03ms, 37.5MB)
테스트 14 〉통과 (3.66ms, 37.5MB)

```js
function otherSolution6(answers) {
  var answer = [];
  var a1 = [1, 2, 3, 4, 5];
  var a2 = [2, 1, 2, 3, 2, 4, 2, 5];
  var a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  var a1c = answers.filter((a, i) => a === a1[i % a1.length]).length;
  var a2c = answers.filter((a, i) => a === a2[i % a2.length]).length;
  var a3c = answers.filter((a, i) => a === a3[i % a3.length]).length;
  var max = Math.max(a1c, a2c, a3c);

  if (a1c === max) {
    answer.push(1);
  }
  if (a2c === max) {
    answer.push(2);
  }
  if (a3c === max) {
    answer.push(3);
  }

  return answer;
}
// answers에서 정답의 개수를 저장해
// max와 같을 경우 push
// answer를 세 번 도는 것과, answer를 한 번 돌며 a1,a2,a3와 비교하는 것 중 어떤 게 더 빠를까..?
// 자료 길이가 길어질수록 solution6가 더 빠르지 않을까..생각해봄(p의 개수만큼 filter하는 것에 대한 cost(add index, arr.push()))

```


테스트 1 〉	통과 (1.77ms, 37.4MB)
테스트 2 〉	통과 (1.73ms, 37.2MB)
테스트 3 〉	통과 (1.77ms, 37.2MB)
테스트 4 〉	통과 (1.75ms, 37.3MB)
테스트 5 〉	통과 (1.79ms, 37.2MB)
테스트 6 〉	통과 (3.11ms, 37.4MB)
테스트 7 〉	통과 (2.38ms, 37.4MB)
테스트 8 〉	통과 (2.02ms, 37.4MB)
테스트 9 〉	통과 (3.22ms, 37.7MB)
테스트 10 〉	통과 (2.38ms, 37.3MB)
테스트 11 〉	통과 (3.22ms, 37.6MB)
테스트 12 〉	통과 (2.94ms, 37.4MB)
테스트 13 〉	통과 (1.79ms, 37.3MB)
테스트 14 〉	통과 (3.27ms, 37.5MB)

---

## 7. 체육복
```js
function failed7(n, lost, reserve) {
  let answer = n - lost.length;

  let lostReserve = lost.concat(reserve).sort((a, b) => a - b);

  for (let i = 0; i < lost.length; i++) {
    const [before, current, next] = [lost[i - 1], lost[i], lost[i + 1]];

    const lastLostIdx = lostReserve.lastIndexOf(current);
    if (
      current - lostReserve[lastLostIdx - 1] === 1 &&
      lostReserve[lastLostIdx - 1] !== before
    ) {
      answer += 1;
      lostReserve.splice(0, lastLostIdx + 1);
      continue;
    } else if (
      lostReserve[lastLostIdx + 1] - current === 1 &&
      lostReserve[lastLostIdx + 1] !== next
    ) {
      answer += 1;
      lostReserve.splice(0, lastLostIdx + 2);
      continue;
    }
    if (current - lostReserve[lastLostIdx - 1] === 0) {
      answer += 1;
    }

    lostReserve.splice(0, lastLostIdx + 1);
  }

  return answer;
}
```
### failed7 설명

O(n)으로 만들어보고자 시도한 풀이였으나 splice에서 cost가 발생하기도 하며
답도 안 나옴.
다음 날 풀어본 풀이가 아래 풀이.


```js
function solution7(n, lost, reserve) {
  let answer = n - lost.length;

  const R = Array(31).fill(0);

  reserve.forEach((r) => (R[r] = 1));

  for (let i = 0; i < lost.length; i++) {
    const l = lost[i];

    if (R[l]) {
      R[l] = 0;
      answer++;
    } else if (R[l - 1]) {
      R[l - 1] = 0;
      answer++;
    } else if (R[l + 1] && l + 1 !== lost[i + 1]) {
      R[l + 1] = 0;
      answer++;
    }
  }
  return answer;
}
```

### 설명

소수 찾기 문제를 풀며 힌트를 얻어,
학생의 인원 수만큼 배열로 공간을 만들어 
학생n의 여벌 보유 유무를 R[n]으로 조회할 수 있게 함.
남는 체육복을 1로 채우고,
lost의 각 item을 조회해 
본인이 여벌이 있을 경우, 본인의 여벌을 사용하고
본인 여벌이 없을 경우 n-1, n+1 순으로 인접 학생의 여벌을 확인해 있을 경우 그 여벌을 사용함.
이렇게만 코드를 짰을 때 12번째에서 error가 발생했음.
```js
why?

2,3,4
  3,4,5
//2번째 학생이 3번째 학생의 체육복을 사용해
2,3,4
    4,5가 되고
//3번째 학생은 4번째 학생의 체육복을 사용함
2,3,4
     ,5
//4번째 학생은 5번째를 사용
2,3,4

//실제로는, 3,4는 본인의 여벌을 사용하고 2번째는 사용할 여벌이 없음.

```
따라서, n번째 잃어버린 학생 대해 학생 n+1의 여벌 체육복이 있을 경우, n+1번째 학생이 체육복을 잃어버렸는지 확인하는 코드를 추가함.

공간을 최소화할 필요가 있을 경우, lost와 reserve에 있는 최대값+1 길이의 array를 0으로 채우고 시작하면 됨.


테스트 1 〉	통과 (1.80ms, 37.4MB)
테스트 2 〉	통과 (1.69ms, 37.4MB)
테스트 3 〉	통과 (1.79ms, 37.5MB)
테스트 4 〉	통과 (1.72ms, 37.4MB)
테스트 5 〉	통과 (1.75ms, 37.4MB)
테스트 6 〉	통과 (1.76ms, 37.5MB)
테스트 7 〉	통과 (1.74ms, 37.5MB)
테스트 8 〉	통과 (1.75ms, 37.6MB)
테스트 9 〉	통과 (1.68ms, 37.5MB)
테스트 10 〉	통과 (1.71ms, 37.3MB)
테스트 11 〉	통과 (1.80ms, 37.3MB)
테스트 12 〉	통과 (1.79ms, 37.4MB)
```js
function otherSolution7(n, lost, reserve) {
  return (
    n -
    lost.filter((a) => {
      const b = reserve.find((r) => Math.abs(r - a) <= 1);
      if (!b) return true;
      reserve = reserve.filter((r) => r !== b);
    }).length
  );
}
```

### 설명

완전탐색을 메소드를 활용해 구현한 코드
하지만 위의 이유로 12번째 테케에서 에러 발생
무시하고 생각해본다면, lost에서 여벌을 사용할 수 있는 학생을 filtering함.
reserve에서 인접한 학생이 있을 경우 lost에서 제거하고,
reserve에서 인접한 학생을 제거함.


테스트 1 〉	통과 (1.78ms, 37.8MB)
테스트 2 〉	통과 (1.74ms, 37.4MB)
테스트 3 〉	통과 (1.71ms, 37.3MB)
테스트 4 〉	통과 (1.81ms, 37.5MB)
테스트 5 〉	통과 (1.78ms, 37.4MB)
테스트 6 〉	통과 (1.74ms, 37.3MB)
테스트 7 〉	통과 (1.78ms, 41.6MB)
테스트 8 〉	통과 (1.77ms, 37.5MB)
테스트 9 〉	통과 (1.68ms, 37.5MB)
테스트 10 〉	통과 (1.75ms, 37.5MB)
테스트 11 〉	통과 (1.71ms, 37.4MB)
테스트 12 〉	실패 (3.02ms, 37.7MB)
