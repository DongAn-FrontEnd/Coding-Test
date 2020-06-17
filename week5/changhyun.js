// # 피보나치 수열

// 시간 초과, 테케 13/14 실패
function solution(n) {
  const fib = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return (fib(n - 1) + fib(n - 2)) % 1234567;
  };
  return fib(n);
}

// +9 문제 오류였음 : 피보나치 결과를 나눠서 push
// 시간 : O(n) 공간 : O(1)
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
// 시간 : O(nlogn + n) = O(nlogn)
// 공간 : O(n)
function solution(citations) {
  const sorted = citations.sort((a, b) => b - a);

  if (sorted[0] === 0) return 0;

  // for (let i = 0; i < sorted.length; i++) {
  //   if ((sorted[i + 1] || 0) <= i + 1) return i + 1;
  // } //아래와 같이 최적화
  for (let i = 1; i < sorted.length + 1; i++) {
    if ((sorted[i] || 0) <= i) return i;
  }
}

/*

내림차순으로 정렬 시, index+1을 x값, index에 해당하는 item value를 y값으로 생각
y=x 값과 같거나 더 작은 값이 나올 경우, y=x에 해당되는 index+1 값을 리턴함.
array의 모든 값이 y=x 직선 위에 존재할 경우(최소가 length보다 클 때)를 처리하기 위해,
length+1까지 for문을 돌리고, array[length] (undefined)가 나올 경우 if문이 반드시 true가 되게끔 0을 or처리해 length값을 return함. 

*/

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
// 같은 글자가 k개 일 떄,
// 시간 : O(n*(1+1+1+1+1+(n-k)[has판별]+1+1)) = O(n*(n-k))
function solution(n, words) {
  const check = new Set();

  let i = 0;
  while (i < words.length) {
    let player = (i % n) + 1;
    let tern = Math.floor(i / n) + 1;

    if ((words[i - 1] || words[0][0]).slice(-1) !== words[i][0]) {
      // 뒷/앞글자가 서로 다를 떄
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

/*

같은 문자를 체크하기 위해 set 객체 생성
words 배열의 index를 i로 저장하고, while문을 통해 words 배열을 순회
player는 나머지를, tern은 몫을 통해 구하고,
1. 앞에 위치한 단어의 뒷글자 (words[i-1].slice(-1)과 현재 index에 위치한 words[i]의 첫글자를 비교해 다를 경우 리턴.
2. 이미 나온 단어일 경우 리턴.
1,2 조건에 해당되지 않는 단어일 경우, check에 단어를 추가하고, 다음 단어를 확인 

*/

// # [3차] 파일명 정렬 +9

// ' '는 0이 됨. isNaN으로 체크 불가 >> charCodeAt을 사용.
// js sort는 unstable sort임 따라서, 비교 값이 같을 경우 index를 따져줘야함.
// sort문에서, str과 num을 구해놓고 비교 >> 문자가 다를 경우 곧바로 return하면 되는데, 이렇게 구할 피룡가 없음.
// 풀리긴 했지만 비효율적이라 생각

// 시간 복잡도 : O(n[map] * nlogn[sort] * (str.length+str.length+5)*n[map]) = O(n^3logn*`str.length`)
function solution(files) {
  const getStringNumber = (str) => {
    let string = ""; // 처음 등장하는 문자열
    let number = ""; // 처음 등장하는 숫자열
    let foundString = false;

    for (let i = 0; i < str.length; i++) {
      let strCode = str[i].charCodeAt();
      if (strCode > 57 || strCode < 48) {
        // 문자일 떄
        if (foundString) break;
        string += str[i];
      } else {
        // 숫자일 떄
        foundString = true; // 숫자 이후의 문자 순회를 방지
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
      // getStringNumber의 비용이 클 거라 생각

      if (strA > strB) return 1;
      if (strA < strB) return -1;
      if (numA > numB) return 1;
      if (numA < numB) return -1;
      if (numA === numB) return a.i - b.i;
    })
    .map((obj) => obj.item);
}

/*

설명 : files의 각 아이템에 대해 첫 문자열과, 첫 숫자열을 찾아 대소비교.
stable한 sort를 위해 file의 item과 index를 객체에 저장하고, sort문에서 item이 동일할 경우 index 비교를 통해 stable을 보장함.

*/

// const alphabet = (str) => 1 or numberIndex;
// const number = (index, str) => 1

// sort문을 바로 실행해, 순차적으로 따져보려 시도해봄.
// +'  ' = 0, stability를 고려해서 다시 풀어봐야할 풀이
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

// # 소수 찾기

// # 스킬트리

// 테케 2,5,14 통과
function solution(skill, skill_trees) {
  var answer = 0;
  let skillSet = skill.split("");
  let currentCheck = 0;

  skill_trees.forEach((skill_tree) => {
    let isPossible = true;
    for (let c of skill_tree) {
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

// 통과 +6
// 시간복잡도 : O(s+st*item.length*(s-currentCheck))
function solution(skill, skill_trees) {
  var answer = 0;
  let skillSet = skill.split("");

  skill_trees.forEach((skill_tree) => {
    let isPossible = true;
    let currentChar = 0;

    for (let c of skill_tree) {
      if (c === skillSet[currentChar]) {
        // 스킬셋과 단어 위치가 같으면, 다음 단어를 체크.
        currentChar++;
        continue;
      }
      for (let i = currentChar + 1; i < skillSet.length; i++) {
        // 단어가 다를 경우에는, skillset을 돌며 같은 단어가 있는지 확인
        if (skillSet[i] === c) {
          isPossible = false;
          break;
          // 있을 경우, 선행 스킬을 배우지 않았으므로 answer값 증가 없이 forEach문 다음 item 순회
        }
      }
      // 만약 skillset에 포함된 단어가 모두 포함되지 않을 경우, skill_tree의 다음 문자를 skillset과 비교

      if (!isPossible) return;
    }
    answer++;
  });

  return answer;
}
/*



*/

// # 쇠막대기 +3
// 시간 복잡도 O(n * (1+1+3||(2||3))) = O(n * 5) d = O(n)
function solution(arrangement) {
  let answer = 0;
  let stage = 0;
  for (let i = 0; i < arrangement.length; i++) {
    const cur = arrangement[i];
    const next = arrangement[i + 1];

    if (cur === "(" && next === ")") {
      // 레이저 위치일 경우
      answer += stage;
      i += 1; // 레이저 다음 괄호로 넘기기 위해
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

/*
  설명 : 
  레이저 위치일 경우, stage값을 answer에 추가.
  좌괄호일 경우, stage를 증가
  우괄호일 경우, stage 감소 및 answer++(층 분리에 의한 +1)
*/

/* 풀이 중 생각해본 접근 방식들
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
