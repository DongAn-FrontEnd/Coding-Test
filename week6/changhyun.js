function solution(n) {
  const binary = "0" + n.toString(2);
  let occured = false;
  let ans = "";

  for (let i = binary.length - 1; i >= 0; i--) {
    const prev = binary[i - 1];
    const cur = binary[i];
    if (!occured && prev === "0" && cur === "1") {
      ans = "10" + ans;
      i -= 1;
      occured = true;
    }
    ans = binary[i] + ans;
  }

  return parseInt(ans, 2);
}

// 다음 큰 숫자 통과
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
