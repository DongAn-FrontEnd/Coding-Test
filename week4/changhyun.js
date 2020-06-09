// timer

var t1 = performance.now();
solution1(12031239123922);
var t2 = performance.now();
console.log(t2 - t1);

// #1 124 나라의 숫자

function solution1(n) {
  var answer = "";
  var count = 0;
  var numArray = [4, 1, 2];
  var temp = [];

  while (n !== 0) {
    if (n % 3 == 0) {
      temp.unshift(numArray[0]);
      n = Math.floor(n / 3) - 1;
    } else {
      temp.unshift(numArray[n % 3]);
      n = Math.floor(n / 3);
    }
    count++;
  }
  answer = temp.join("");
  return answer;
}

function solution1(n) {
  const strange = [1, 2, 4];
  const indexes = [];

  while (true) {
    indexes.push(strange[(n - 1) % 3]);
    if (n - 1 < 3) break;
    n = Math.floor((n - 1) / 3);
  }

  return indexes.reverse().join("");
}

/*

효율성 테스트
테스트 1 〉	통과 (1.68ms, 37.2MB)
테스트 2 〉	통과 (1.68ms, 37.3MB)
테스트 3 〉	통과 (1.61ms, 37.4MB)
테스트 4 〉	통과 (1.62ms, 37.3MB)
테스트 5 〉	통과 (1.58ms, 37.3MB)
테스트 6 〉	통과 (1.62ms, 37.4MB)

*/

// #2 기능개발 +4

function solution(progresses, speeds) {
  var answer = [];
  let count = 1;
  const days = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));
  let current = days[0];
  days.forEach((day, i) => {
    const nextDay = days[i + 1];
    if (current < (nextDay || Infinity)) {
      answer.push(count);
      current = nextDay;
      count = 1;
    } else {
      count++;
    }
  });
  return answer;
  // 4 2 3 4 2 7 12 4 2 31
  // 4 4 4 4 4 7 12 12 12 31
}

// #3 나누어 떨어지는 숫자 배열

function solution3(arr, divisor) {
  answer = arr.filter((i) => i % divisor === 0).sort((a, b) => a - b);
}
return answer.length === 0 ? [-1] : answer;

// #4 문자열 내림차순으로 배치하기

function solution4(s) {
  return s
    .split("")
    .sort((a, b) => (a > b ? -1 : 1))
    .join("");
}

// #5 예산 +4

function solution5(d, budget) {
  let answer = 0;
  let count = 0;
  for (let b of d.sort((a, b) => a - b)) {
    count += b;
    if (count > budget) {
      return answer;
    } else {
      answer++;
    }
  }
  return answer;
}

//#6 최대공약수 최소공배수 +2

function solution(n, m) {
  const [s, b] = [n, m].sort();
  const gcd = getGcd(s, b);

  return [gcd, (s * b) / gcd];
}

function getGcd(a, b) {
  if (b % a === 0) {
    return a;
  }

  return getGcd(b % a, a);
}

//refactoring
function solution(n, m) {
  const [s, b] = [n, m].sort();
  const getGcd = (a, b) => (b % a ? getGcd(b % a, a) : a);
  const gcd = getGcd(s, b);
  return [gcd, (s * b) / gcd];
}

// #7 수박수박수박

function solution(n) {
  var answer = Array(Math.floor(n / 2))
    .fill("수박")
    .join("");
  return n % 2 !== 0 ? answer + "수" : answer;
}

// #8 서울에서 김서방 찾기

function solution8(seoul) {
  return `김서방은 ${seoul.indexOf("Kim")}에 있다`;
}

// 성능 테스트

var t1 = performance.now();
var arr = Array(12222).fill(1);
var t2 = performance.now();
console.log(t2 - t1);
