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


// 파일명 정렬 - fail
function solution(files) {
  var answer = [];
  let map = new Map();  

  return files.sort((a,b) => {
    // HEAD 비교
    let aHead;
    let bHead;
    let aIdx;
    let bIdx;
    for(let i = 0; i < a.length; ++i){
      if(!isNaN(a[i])){
        aHead = a.slice(0, i).toLowerCase();
        aIdx = i;
        break;
      }
    }
    for(let i = 0; i < b.length; ++i){
      if(!isNaN(b[i])){
        bHead = b.slice(0, i).toLowerCase();
        bIdx = i;
        break;
      }
    }
    // HEAD가 같다면 NUMBER 비교
    if(aHead === bHead){      
      let aNum;
      let bNum;
      for(let i = aIdx; i < a.length; ++i){
          if(isNaN(a[i]) || i > aIdx + 5){
            aNum = parseInt(a.slice(aIdx, i));
            aIdx = i;
            break;
          }
      }
      for(let i = bIdx; i < b.length; ++i){
        if(isNaN(b[i]) || i > bIdx + 5){
          bNum = parseInt(b.slice(bIdx, i));
          bIdx = i;
          break;
        }
      }
      // NUMBER가 같다면 TAIL 비교
      if(aNum !== bNum) return aNum - bNum;
      else{
        let aTail = a.slice(aIdx, a.length).toLowerCase();
        let bTail = b.slice(bIdx, b.length).toLowerCase();
        return +(aTail > bTail);
      }
    }
    // HEAD가 다르면 문자열 비교
    else return +(a > b);    
  })
}

// 영어 끝말잇기
function solution(n, words) {  
  let speakingCounts = new Array(n).fill(0); // 사람 마다 말한 횟수를 저장
  let wordsMap = new Map();  
  let wordsLen = words.length;  
  let idx = 1;
  wordsMap.set(words[0], 1);
  speakingCounts[0] = 1;
  for(let i = 1; i < wordsLen; ++i){
    ++speakingCounts[idx];      // 말한 횟수 추가
    
    // 이미 등장한 단어 or 앞 사람의 마지막 글자와 현재 사람의 첫 글자가 다름 or 글자가 1개라면 return
    if(wordsMap.get(words[i]) || words[i-1].slice(-1) !== words[i][0] || words[i].length === 1) return[idx+1, speakingCounts[idx]];
    
    // 조건을 만족하지 않으면
    wordsMap.set(words[i], 1);  // 해시맵에 단어 추가
    ++idx;                      // 다음 사람으로 인덱스 가리키기
    idx %= n;                   // n으로 mod연산하여 순환하기
  }
  return [0,0];
}

// H-Index
function solution(citations) {
  let h = citations[0];
  let citationsLen = citations.length;
  let upCount;
  let downCount;
  
  citations.sort((a, b) => b - a); // 오름차순 정렬
  while (true) {
    upCount = 0;
    downCount = 0;
    for (let i = 0; i < citationsLen; ++i)
    {
      if (citations[i] >= h) ++upCount;      
      else ++downCount;      
    }
    if (upCount >= h && downCount <= h) return h;
    --h;
  }  
}