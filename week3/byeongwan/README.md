# 1. 다트게임

``` javascript
// 1. dartResult를 1세트, 2세트, 3세트로 나누기
// 2. 각 문자열 해석
// 3. 해석값 더하기
function solution(dartResult) {
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
```
정확성  테스트
- 테스트 1 〉	통과 (1.72ms, 37.6MB)
- 테스트 2 〉	통과 (1.79ms, 37.4MB)
- 테스트 3 〉	통과 (1.71ms, 37.3MB)
- 테스트 4 〉	통과 (1.72ms, 37.5MB)
- 테스트 5 〉	통과 (1.72ms, 37.4MB)
- 테스트 6 〉	통과 (1.80ms, 37.5MB)
- 테스트 7 〉	통과 (1.85ms, 37.6MB)
- 테스트 8 〉	통과 (1.80ms, 37.4MB)
- 테스트 9 〉	통과 (1.70ms, 37.4MB)
- 테스트 10 〉	통과 (1.80ms, 37.7MB)
- 테스트 11 〉	통과 (1.78ms, 37.4MB)
- 테스트 12 〉	통과 (1.76ms, 37.4MB)
- 테스트 13 〉	통과 (1.80ms, 37.5MB)
- 테스트 14 〉	통과 (1.68ms, 37.5MB)
- 테스트 15 〉	통과 (1.73ms, 37.3MB)
- 테스트 16 〉	통과 (1.72ms, 37.4MB)
- 테스트 17 〉	통과 (1.77ms, 37.5MB)
- 테스트 18 〉	통과 (1.76ms, 37.4MB)
- 테스트 19 〉	통과 (1.78ms, 37.5MB)
- 테스트 20 〉	통과 (1.73ms, 37.5MB)
- 테스트 21 〉	통과 (1.75ms, 37.3MB)
- 테스트 22 〉	통과 (1.79ms, 37.4MB)
- 테스트 23 〉	통과 (1.73ms, 37.5MB)
- 테스트 24 〉	통과 (1.77ms, 37.5MB)
- 테스트 25 〉	통과 (1.72ms, 37.4MB)
- 테스트 26 〉	통과 (1.69ms, 37.4MB)
- 테스트 27 〉	통과 (1.76ms, 37.5MB)
- 테스트 28 〉	통과 (1.74ms, 37.5MB)
- 테스트 29 〉	통과 (1.80ms, 37.6MB)
- 테스트 30 〉	통과 (1.82ms, 37.5MB)
- 테스트 31 〉	통과 (1.81ms, 37.5MB)
- 테스트 32 〉	통과 (1.75ms, 37.3MB)

---

# 2. 소수 찾기
```javascript
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

function solution(n) {
    return isPrime(n);
}
```

정확성  테스트
- 테스트 1 〉	통과 (1.65ms, 37.6MB)
- 테스트 2 〉	통과 (1.61ms, 37.5MB)
- 테스트 3 〉	통과 (1.72ms, 37.4MB)
- 테스트 4 〉	통과 (1.81ms, 37.4MB)
- 테스트 5 〉	통과 (1.77ms, 37.4MB)
- 테스트 6 〉	통과 (4.01ms, 37.4MB)
- 테스트 7 〉	통과 (1.97ms, 37.5MB)
- 테스트 8 〉	통과 (2.16ms, 37.6MB)
- 테스트 9 〉	통과 (4.38ms, 37.6MB)
- 테스트 10 〉	통과 (9.91ms, 39.6MB)
- 테스트 11 〉	통과 (19.75ms, 44.4MB)
- 테스트 12 〉	통과 (11.69ms, 39.7MB)
효율성  테스트
- 테스트 1 〉	통과 (18.98ms, 44.7MB)
- 테스트 2 〉	통과 (19.57ms, 44.5MB)
- 테스트 3 〉	통과 (19.86ms, 44.7MB)
- 테스트 4 〉	통과 (18.82ms, 44.5MB)

---

# 3. 두 정수 사이의 합
```javascript
function solution(a, b) {
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
```
정확성  테스트
- 테스트 1 〉	통과 (1.69ms, 37.5MB)
- 테스트 2 〉	통과 (1.68ms, 37.4MB)
- 테스트 3 〉	통과 (1.70ms, 37.5MB)
- 테스트 4 〉	통과 (25.25ms, 37.8MB)
- 테스트 5 〉	통과 (17.43ms, 37.6MB)
- 테스트 6 〉	통과 (16.09ms, 38.1MB)
- 테스트 7 〉	통과 (8.48ms, 37.7MB)
- 테스트 8 〉	통과 (12.33ms, 37.7MB)
- 테스트 9 〉	통과 (10.55ms, 37.7MB)
- 테스트 10 〉	통과 (4.27ms, 37.8MB)
- 테스트 11 〉	통과 (1.65ms, 37.5MB)
- 테스트 12 〉	통과 (1.84ms, 37.3MB)
- 테스트 13 〉	통과 (1.77ms, 37.3MB)
- 테스트 14 〉	통과 (1.59ms, 37.4MB)
- 테스트 15 〉	통과 (1.70ms, 37.5MB)
- 테스트 16 〉	통과 (1.71ms, 37.4MB)

---

# 4. 문자열 내 p와 y 개수
```javascript
// 1. p의 개수 구하기: pCount
// 2. y의 개수 구하기: yCount
// 3. p === y이면 return true
// 4. 아니면 return false
function solution(s){        
    let pCount = 0;
    let yCount = 0;
    
    for(let i = 0; i < s.length; ++i){
        if(s[i] === 'p' || s[i] === 'P') ++pCount;
        else if(s[i] === 'y' || s[i] === 'Y') ++yCount;
    }

    if(pCount === yCount) return true;
    else return false;
}
```
정확성  테스트
- 테스트 1 〉	통과 (1.73ms, 37.4MB)
- 테스트 2 〉	통과 (1.58ms, 37.4MB)
- 테스트 3 〉	통과 (1.64ms, 37.4MB)
- 테스트 4 〉	통과 (1.71ms, 37.3MB)
- 테스트 5 〉	통과 (1.65ms, 37.4MB)
- 테스트 6 〉	통과 (1.65ms, 37.7MB)
- 테스트 7 〉	통과 (1.68ms, 37.4MB)
- 테스트 8 〉	통과 (1.69ms, 37.5MB)
- 테스트 9 〉	통과 (1.59ms, 37.5MB)
- 테스트 10 〉	통과 (1.76ms, 37.4MB)
- 테스트 11 〉	통과 (1.60ms, 37.4MB)
- 테스트 12 〉	통과 (1.59ms, 37.5MB)
- 테스트 13 〉	통과 (1.59ms, 37.5MB)
- 테스트 14 〉	통과 (1.66ms, 37.5MB)
- 테스트 15 〉	통과 (1.67ms, 37.7MB)
- 테스트 16 〉	통과 (1.65ms, 37.4MB)
- 테스트 17 〉	통과 (1.58ms, 37.5MB)
- 테스트 18 〉	통과 (1.71ms, 37.5MB)
- 테스트 19 〉	통과 (1.58ms, 37.4MB)
- 테스트 20 〉	통과 (1.72ms, 37.4MB)
- 테스트 21 〉	통과 (1.62ms, 37.4MB)
- 테스트 22 〉	통과 (1.60ms, 37.8MB)
- 테스트 23 〉	통과 (1.66ms, 37.5MB)
- 테스트 24 〉	통과 (1.68ms, 37.4MB)
- 테스트 25 〉	통과 (1.63ms, 37.8MB)
- 테스트 26 〉	통과 (1.70ms, 37.4MB)
- 테스트 27 〉	통과 (1.59ms, 37.4MB)
- 테스트 28 〉	통과 (1.61ms, 37.5MB)

---

# 5. 2016년
```javascript
// 1. 월별 일수 배열 데이터 생성: dates
// 2. 요일 배열 데이터 생성: days
// 3. 입력 날짜와 1월1일 날짜 차이 계산
// 4. 7로 나눈 나머지만큼 idx에 추가
// 5. return days[idx]
function solution(a, b) {
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
```
정확성  테스트
- 테스트 1 〉	통과 (1.66ms, 37.5MB)
- 테스트 2 〉	통과 (1.69ms, 37.5MB)
- 테스트 3 〉	통과 (1.64ms, 37.5MB)
- 테스트 4 〉	통과 (1.72ms, 37.4MB)
- 테스트 5 〉	통과 (1.64ms, 37.4MB)
- 테스트 6 〉	통과 (1.58ms, 37.4MB)
- 테스트 7 〉	통과 (1.71ms, 37.5MB)
- 테스트 8 〉	통과 (1.70ms, 37.5MB)
- 테스트 9 〉	통과 (1.62ms, 37.4MB)
- 테스트 10 〉	통과 (1.57ms, 37.6MB)
- 테스트 11 〉	통과 (1.69ms, 37.3MB)
- 테스트 12 〉	통과 (1.66ms, 37.6MB)
- 테스트 13 〉	통과 (1.71ms, 37.4MB)
- 테스트 14 〉	통과 (1.65ms, 37.4MB)

---

# 6. 가운데 글자 가져오기
```javascript
function solution(s) {
    let len = s.length;
    let idx = parseInt(len / 2);
    if(len % 2 === 0){
        return s[idx-1] + s[idx];    
    }
    else{
        return s[idx];
    }
}
```
정확성  테스트
- 테스트 1 〉	통과 (1.57ms, 37.4MB)
- 테스트 2 〉	통과 (1.65ms, 37.3MB)
- 테스트 3 〉	통과 (1.64ms, 37.3MB)
- 테스트 4 〉	통과 (1.66ms, 37.3MB)
- 테스트 5 〉	통과 (1.65ms, 37.3MB)
- 테스트 6 〉	통과 (1.64ms, 37.5MB)
- 테스트 7 〉	통과 (1.66ms, 37.4MB)
- 테스트 8 〉	통과 (1.59ms, 37.3MB)
- 테스트 9 〉	통과 (1.66ms, 37.5MB)
- 테스트 10 〉	통과 (1.71ms, 37.4MB)
- 테스트 11 〉	통과 (1.56ms, 37.3MB)
- 테스트 12 〉	통과 (1.64ms, 37.4MB)
- 테스트 13 〉	통과 (1.65ms, 37.7MB)
- 테스트 14 〉	통과 (1.72ms, 37.4MB)
- 테스트 15 〉	통과 (1.69ms, 37.4MB)
- 테스트 16 〉	통과 (1.57ms, 37.4MB)