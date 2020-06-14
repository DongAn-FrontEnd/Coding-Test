// 피보나치 수
function solution(n) {
    let f = new Array(n + 1);
    f[0] = 0; f[1] = 1;
    for(let i = 2; i <= n; ++i) f[i] = (f[i - 1] + f[i - 2]) % 1234567;    
    return f[n];
}

// 소수 찾기
// 1. 소수 판별 function
// 2. 길이가 1부터 n까지 숫자 조합 function
function solution(numbers) {
    var answer = 0;    
    let joinResult = [];

    // numbers 데이터를 순열로 변환
    for(let i = 0; i < numbers.length; ++i){
        let splitResult =permute([], [], numbers.split(""), i)
        for(let j = 0; j < splitResult.length; ++j)
            joinResult.push(parseInt(splitResult[j].join("")));
    }    
    // 중복 제거 후 변환한 데이터 마다 소수 판별
    joinResult.filter((item, index) => joinResult.indexOf(item) === index).forEach(e => {
        if(isPrime(e)) ++answer;
    })
    
    return answer;
}

console.log(solution("011"));

// 순열
function permute(permArr,usedChars, input, r) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == r) {
      permArr.push(usedChars.slice());
    }
    permute(permArr, usedChars, input, r);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

// 소수
function isPrime(num){
    if(num === 2) return true;
    if(num % 2 === 0 || num === 1) return false;

    let root = Math.sqrt(num);
    for(let i = 3; i <= root; i += 2){
        if(num % i === 0) return false;
    }
    return true;
}

// 쇠막대기
function solution(arrangement) {
  var answer = 0;
  let line = [];
  for(let i = 0; i < arrangement.length - 1; ++i){    
    // case 1. ((
    if(arrangement[i] === '(' && arrangement[i + 1] === '(') line.push(0);
    // case 2. ()
    if(arrangement[i] === '(' && arrangement[i + 1] === ')') line = line.map(e => e + 1);
    // case 3. ))
    if(arrangement[i] === ')' && arrangement[i + 1] === ')') answer += line.pop() + 1;
  }
  return answer;
}