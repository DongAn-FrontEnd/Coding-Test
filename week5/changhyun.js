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
// Solved solution , 테케 9 : 최소가 length보다 클 때 [24,42]

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
  var answer = [];
  let numberIdx = {};
  files.sort((a, b) => {
    const [strA, numA] = getStringNumber(a);
    const [strB, strB] = getStringNumber(b);
  });
}
function getStringNumber(str) {
  const string = "";
  const number = "";
  let findNum = false;
  let i = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] > 10) {
      // 문자열일 떄
      if (foundString) return;
      string += str[i];
    } else {
      // 숫자가 나올 떄
      foundString = false;
      number += str[i];
    }
  }
  return [string, +number];
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
