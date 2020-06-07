// 1. 문자열 내 마음대로 정렬하기

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

function solution1(strings, n) {
  return strings.sort((a, b) =>
    a[n] > b[n] ? 1 : a[n] < b[n] ? -1 : a > b ? 1 : -1
  );
}

function otherSolution1(strings, n) {
  return strings.sort((s1, s2) =>
    s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeCompare(s2[n])
  );
}

// 2. 비밀지도

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

// 3. 시저 암호

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

function otherSolution3(s, n) {
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

// 4. 정수 제곱근 판별

function solution4(n) {
  var x = Math.sqrt(n);
  return Number.isInteger(x) ? Math.pow(x + 1, 2) : -1;
}

function otherSolution4(n) {
  var x = 1;
  while (x * x < n) {
    x++;
  }
  return x * x === n ? (x + 1) * (x + 1) : -1;
}

// 5. 크레인 인형뽑기 게임

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

// moves의 각 move를 순회하며
// board의 0번째부터 마지막 row까지 move에 해당되는 column index를 살펴
// doll이 있을 경우 input에 doll을 push하고 for문을 종료
// 만약 last doll이 currentDoll과 같을 경우, for문을 종료하기 전,
// input에서 pop을 2회 시행하고, answer에 인형 추가.

// 6. 모의고사

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

function solution6(answers) {
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

// 7. 체육복

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
