// # 피보나치 수열

// 시간 초과, 테케 13/14 실패
function solution(n) {
  const fib = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return solution(n - 1) + solution(n - 2);
  };
  return fib(n) % 1234567;
}

// +9 문제 오류였음 : 피보나치 결과를 나눠서 push

function solution(n) {
  const fib = [0, 1];

  for (let i = 0; i < n - 1; i++) {
    fib.push((fib[i] + fib[i + 1]) % 1234567);
  }
  return fib.pop();
}

// # H-index

// 테케 9, 16 실패
function solution(citations) {
  const sorted = citations.sort((a, b) => b - a);

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i + 1] <= i + 1) return i + 1;
  }
}

// 테케 16 : 0일 떄 처리

function solution(citations) {
  const sorted = citations.sort((a, b) => b - a);
  if (sorted[0] === 0) return 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i + 1] <= i + 1) return i + 1;
  }
}
// 통과 , 테케 9 : 최소가 length보다 클 때 [24,42]

function solution(citations) {
  const sorted = citations.sort((a, b) => b - a);

  if (sorted[0] === 0) return 0;

  for (let i = 0; i < sorted.length; i++) {
    if ((sorted[i + 1] || 0) <= i + 1) return i + 1;
  }
}

// find(element, idex) return element
// indexOf(value, startIndex) return index
// findIndex(element, index) return index

// # N개의 최소공배수 +7

function solution(arr) {
  const gcd = (a, b = 1) => {
    let r = a % b;
    while (b) {
      a = b;
      b = r;
      r = a % b;
    }
    return a;
  };

  return arr.reduce((accum, num, i) => (accum * num) / gcd(accum, num), arr[0]);
}

// # 끝말잇기 +4

function solution(n, words) {
  const check = new Set();

  let i = 0;
  while (i < words.length) {
    let player = (i % n) + 1;
    let tern = Math.floor(i / n) + 1;

    if ((words[i - 1] || words[0][0]).slice(-1) !== words[i][0]) {
      // 뒷자리, 앞자리 다를 떄
      return [player, tern];
    }

    if (check.has(words[i])) {
      // 이미 나온 단어일 떄
      return [player, tern];
    }

    check.add(words[i]);

    i++;
  }

  return [0, 0];
}

// # [3차] 파일명 정렬 // 테케 1,2만 통과

// sort문에서, str과 num을 구해놓고 비교 >> 문자가 다를 경우 곧바로 return하면 되는데, 이렇게 구할 피룡가 없음.
function solution(files) {
  const getStringNumber = (str) => {
    let string = "";
    let number = "";
    let foundString = false;

    for (let i = 0; i < str.length; i++) {
      let strCode = str[i].charCodeAt();
      if (strCode > 57 || strCode < 48) {
        // 문자열일 떄
        if (foundString) break;
        string += str[i];
      } else {
        // 숫자가 나올 떄
        foundString = true;
        number += str[i];
      }
    }
    return [string.toUpperCase(), +number];
  };

  return files
    .map((item, i) => ({ item, i }))
    .sort((a, b) => {
      const [strA, numA] = getStringNumber(a.item);
      const [strB, numB] = getStringNumber(b.item);

      if (strA > strB) return 1;
      if (strA < strB) return -1;
      if (numA > numB) return 1;
      if (numA < numB) return -1;
      if (numA === numB) return a.i - b.i;
    })
    .map((obj) => obj.item);
}

// const alphabet = (str) => 1 or numberIndex;
// const number = (index, str) => 1

function solution(files) {
  return files.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (isNaN(+a[i])) {
        // 문자일 경우
        if (a[i].toLowerCase() !== b[i].toLowerCase())
          return a[i] > (b[i] || -Infinity); // b가 undefined일 경우, swap
      } else {
        if (isNaN(b[i])) return -1; // a의 str 부분이 모두 일치하고 b가 더 긴 str일 경우
        // a,b 앞문자열 길이가 같을 경우,
        let numA = "";
        let numB = "";

        for (let j = i; j < Math.max(a.length, b.length); j++) {
          if (+a[i] < 10) {
            numA += a[i];
          }

          if (+b[i] < 10) {
            numB += b[i];
            continue;
          }

          if (isNaN(a[i]) && isNaN(+b[i])) return; // a[i], b[i] 모두 숫자가 아닐 떄 for문 종료
        }

        return +numA > +numB;
      }
    }
  });
}

// 통과 +9  +' '는 0이 됨. isNaN으로 체크 불가 >> charCodeAt을 사용.
// js sort는 unstable sort임 따라서, map을 사용해 index를 잡아줘야함.

// # 소수 찾기

// 테케 2,5,14 통과
function solution(skill, skill_trees) {
  var answer = 0;
  let skillSet = skill.split("");
  let currentCheck = 0;
  skill_trees.forEach((item) => {
    let isPossible = true;
    for (let c of item) {
      for (let i = currentCheck + 1; i < skillSet.length; i++) {
        if (skillSet[i] === c) {
          isPossible = false;
          currentCheck++;
        }
        break;
      }
      if (!isPossible) return;
    }
    answer++;
  });

  return answer;
}

// # 스킬트리 +6

function solution(skill, skill_trees) {
  var answer = 0;
  let skillSet = skill.split("");

  skill_trees.forEach((item) => {
    let isPossible = true;
    let currentCheck = 0;

    for (let c of item) {
      if (c === skillSet[currentCheck]) {
        currentCheck++;
        continue;
      }
      for (let i = currentCheck + 1; i < skillSet.length; i++) {
        if (skillSet[i] === c) {
          isPossible = false;
          break;
        }
      }

      if (!isPossible) return;
    }
    answer++;
  });

  return answer;
}

// # 쇠막대기 +3
/*
0 () 1 2 3 ()() 2 3 () 2 () 1 0 1 ()
   
1층에선, +1 (add)
2층에선, +2 (add)
3층에선, +3 (add)
내려갈 경우, +1
3,3,+1,3,+1,2,+1,+1,1,+1

3 : 1+1, 1
2 : 1+1
1 : 1+1+1+1, 1
아래층으로 갈 경우, 새로운 스타트
'0' '33','3','2','1'
*/

function solution(arrangement) {
  let answer = 0;
  let stage = 0;

  for (let i = 0; i < arrangement.length; i++) {
    const cur = arrangement[i];
    const next = arrangement[i + 1];

    if (cur === "(" && next === ")") {
      answer += stage;
      i += 1;
    } else {
      if (cur === "(") {
        stage++;
      } else {
        stage--;
        answer++;
      }
    }
  }
  return answer;
}
// function solution(arrangement) { 위 식을 가독성 좋게 만드려면..?
//   let ans = 0;
//   let stage = 0;
//   arrangement.reduce((ans, current, i) => {
//     if (current === current[i + 1]) {
//       ans += stage;
//       return ans;
//     } else {
//       if (current === "(") {
//         stage++;
//       } else {
//         stage--;
//         ans--;
//       }
//     }
//   });
// }
