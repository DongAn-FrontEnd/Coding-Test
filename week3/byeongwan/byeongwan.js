// [1차] 다트 게임
// 1. dartResult를 1세트, 2세트, 3세트로 나누기
// 2. 각 문자열 해석
// 3. 해석값 더하기
function solution1(dartResult) {
    let strings = [];   // 세트 별 문자열
    let scores = [];    // 세트 별 점수
    let idx = [];       // 숫자 index
    for(let i = 2; i < dartResult.length; ++i){
        let pivot = dartResult.charCodeAt(i);
        let prePivot = dartResult.charCodeAt(i - 1);
        if(pivot >= 48 && pivot <= 57){
            if(prePivot < 48 || prePivot > 57) idx.push(i);
        }
    }
    strings.push(dartResult.slice(0, idx[0]));
    strings.push(dartResult.slice(idx[0], idx[1]));
    strings.push(dartResult.slice(idx[1], dartResult.length));

    for(let i = 0; i < 3; ++i){
        let scoreTemp = "";
        let temp = parseInt(strings[i][0]); if(temp >= 0 && temp <= 9) scoreTemp += strings[i][0];
        temp = parseInt(strings[i][1]); if(temp >= 0 && temp <= 9) scoreTemp += strings[i][1];
        scores[i] = parseInt(scoreTemp);

        for(let j = 1; j < strings[i].length; ++j){
            if(strings[i][j] === 'D') scores[i] = Math.pow(scores[i], 2);
            else if(strings[i][j] === 'T') scores[i] = Math.pow(scores[i], 3);

            if(strings[i][j] === '*'){
                if(i === 0){
                    scores[i] *= 2;
                }
                else{
                    scores[i] *= 2;
                    scores[i - 1] *= 2;
                }
            }

            if(strings[i][j] === '#') scores[i] *= -1;
        }
    }
    return scores[0] + scores[1] + scores[2];
}

// 소수 찾기
function isPrime(n){
    if(n <= 1) return 0;

    let primeNumbers = Array(n + 1);
    let primeCount = 0;
    for(let i = 2; i <= n; ++i){
        primeNumbers[i] = true;
    }

    for(let i = 2; i <= n; ++i){
        if(primeNumbers[i]){
            for(let j = i * i; j <= n; j += i){
                primeNumbers[j] = false;
            }
        }
    }

    for(let i = 2; i <= n; ++i){
        if(primeNumbers[i]) ++primeCount;
    }
    return primeCount;
}

function solution2(n) {
    return isPrime(n);
}

// 두 정수 사이의 합
function solution3(a, b) {
    var answer = 0;
    if(a > b){
        for(let i = b; i <= a; ++i){
            answer += i;
        }
    }
    else{
        for(let i = a; i <= b; ++i){
            answer += i;
        }
    }
    return answer;
}

// 문자열 내 p와 y 개수
// 1. p의 개수 구하기: pCount
// 2. y의 개수 구하기: yCount
// 3. p === y이면 return true
// 4. 아니면 return false
function solution4(s){        
    let pCount = 0;
    let yCount = 0;
    
    for(let i = 0; i < s.length; ++i){
        if(s[i] === 'p' || s[i] === 'P') ++pCount;
        else if(s[i] === 'y' || s[i] === 'Y') ++yCount;
    }

    if(pCount === yCount) return true;
    else return false;
}

// 2016년
// 1. 월별 일수 배열 데이터 생성: dates
// 2. 요일 배열 데이터 생성: days
// 3. 입력 날짜와 1월1일 날짜 차이 계산
// 4. 7로 나눈 나머지만큼 idx에 추가
// 5. return days[idx]
function solution5(a, b) {
    let dates = [31,29,31,30,31,30,31,31,30,31,30,31];
    let days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    let idx = 5;
    let offset = 0;
    for(let i = 0; i < a- 1; ++i){
        offset += dates[i];
    }    
    offset += b - 1;
    offset %= 7;
    idx = (idx + offset) % 7;
    return days[idx];
}

// 가운데 글자 가져오기
function solution6(s) {
    let len = s.length;
    let idx = parseInt(len / 2);
    if(len % 2 === 0){
        return s[idx-1] + s[idx];    
    }
    else{
        return s[idx];
    }
}