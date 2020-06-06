# 1. 문자열 내 마음대로 정렬하기
``` javascript
    function solution(array, commands) {
    var answer = [];

    for (var i = 0; i < commands.length; ++i) {
        var temp = array.slice(commands[i][0] - 1, commands[i][1]);
        temp.sort(function(a, b){
            return a - b;
        });
        answer.push(temp[commands[i][2] - 1])
    }

    return answer;
}
```
- 테스트 1 〉	통과 (2.10ms, 37.5MB)
- 테스트 2 〉	통과 (6.40ms, 37.1MB)
- 테스트 3 〉	통과 (2.30ms, 37.4MB)
- 테스트 4 〉	통과 (2.28ms, 37.5MB)
- 테스트 5 〉	통과 (2.28ms, 37.5MB)
- 테스트 6 〉	통과 (2.33ms, 37.6MB)
- 테스트 7 〉	통과 (2.30ms, 37.5MB)
- 테스트 8 〉	통과 (2.30ms, 37.6MB)
- 테스트 9 〉	통과 (2.28ms, 37.4MB)
- 테스트 10 〉통과 (2.50ms, 37.8MB)
- 테스트 11 〉통과 (2.30ms, 37.4MB)
- 테스트 12 〉통과 (2.56ms, 37.7MB)

---

# 2. 비밀지도
``` javascript
// 1. 숫자를 2진수 배열에 담기
// 2. 두 배열을 비교하여 둘 다 0이면 공백 아니면 #

// 10진수를 2진수로 변환
function decimalToBinary(value, n){
    let arr = [];
    
    for(let i = 0; i < n; ++i){
        arr.push(value % 2);
        value = parseInt(value / 2);
    }
    return arr.reverse();    
}

function solution(n, arr1, arr2) {
    var answer = [];
    let arr1ToBin = [];
    let arr2ToBin = [];

    arr1.forEach(elemet => {
        arr1ToBin.push(decimalToBinary(elemet, n));
    });

    arr2.forEach(elemet=>{
        arr2ToBin.push(decimalToBinary(elemet, n));
    });

    for(let i = 0; i < n; ++i){
        let temp = "";
        for(let j = 0; j < n; ++j){
            if(arr1ToBin[i][j] === 0 && arr2ToBin[i][j] === 0){
                temp += " ";
            }else{
                temp += "#";
            }            
        }
        answer.push(temp);
    }
    
    return answer;
}
```
- 테스트 1 〉	통과 (1.87ms, 37.6MB)
- 테스트 2 〉	통과 (1.98ms, 37.6MB)
- 테스트 3 〉	통과 (1.85ms, 37.3MB)
- 테스트 4 〉	통과 (1.86ms, 37.4MB)
- 테스트 5 〉	통과 (1.82ms, 37.4MB)
- 테스트 6 〉	통과 (2.04ms, 37.5MB)
- 테스트 7 〉	통과 (1.88ms, 37.3MB)
- 테스트 8 〉	통과 (1.81ms, 37.3MB)

---
# 3. 시저 암호
``` javascript
function solution(s, n){
    let answer = "";
    for(let i = 0; i < s.length; ++i){
        let temp = s.charCodeAt(i); // 문자를 아스키코드로 변환

        // 공백 체크
        if(temp == 32){ 
            answer += " ";
            continue;
        } 
        // 대문자 체크
        else if(temp >= 65 && temp <= 90){
            temp += n;
            if(temp > 90){
                temp = temp % 90 + 64;
            }
        }
        // 소문자 체크
        else{
            temp += n;
            if(temp > 122){
                temp = temp % 122 + 96;
            }
        }
        answer += String.fromCharCode(temp);    // 아스키코드를 문자로 변환
    }
    return answer;
}
```
- 테스트 1 〉	통과 (1.61ms, 37.4MB)
- 테스트 2 〉	통과 (1.66ms, 37.4MB)
- 테스트 3 〉	통과 (1.67ms, 37.5MB)
- 테스트 4 〉	통과 (1.72ms, 37.5MB)
- 테스트 5 〉	통과 (1.62ms, 37.4MB)
- 테스트 6 〉	통과 (1.65ms, 37.4MB)
- 테스트 7 〉	통과 (1.63ms, 37.8MB)
- 테스트 8 〉	통과 (1.72ms, 37.5MB)
- 테스트 9 〉	통과 (1.67ms, 37.8MB)
- 테스트 10 〉	통과 (1.89ms, 37.5MB)
- 테스트 11 〉	통과 (1.76ms, 37.4MB)
- 테스트 12 〉	통과 (1.70ms, 37.5MB)
- 테스트 13 〉	통과 (3.99ms, 37.7MB)

---

# 4. 정수 제곱근 판별
``` javascript
function solution(n) {    
    let x = 0;

    while(true){
        ++x;
        if(x * x === n){
            return (x + 1) * (x + 1);
        } else if(x >= n){
            return -1;
        }    
    }    
}
```
- 테스트 1 〉	통과 (9.62ms, 37.6MB)
- 테스트 2 〉	통과 (13.81ms, 37.5MB)
- 테스트 3 〉	통과 (17.44ms, 37.6MB)
- 테스트 4 〉	통과 (5.26ms, 37.4MB)
- 테스트 5 〉	통과 (2.53ms, 37.4MB)
- 테스트 6 〉	통과 (2.67ms, 37.5MB)
- 테스트 7 〉	통과 (3.52ms, 37.5MB)
- 테스트 8 〉	통과 (1.88ms, 37.3MB)
- 테스트 9 〉	통과 (2.66ms, 37.4MB)
- 테스트 10 〉	통과 (3.55ms, 37.4MB)
- 테스트 11 〉	통과 (3.50ms, 37.5MB)
- 테스트 12 〉	통과 (3.53ms, 37.6MB)
- 테스트 13 〉	통과 (3.51ms, 37.5MB)
- 테스트 14 〉	통과 (3.52ms, 37.6MB)
- 테스트 15 〉	통과 (2.61ms, 37.4MB)
- 테스트 16 〉	통과 (1.84ms, 37.5MB)
- 테스트 17 〉	통과 (1.66ms, 37.5MB)
- 테스트 18 〉	통과 (1.72ms, 37.4MB)

---

# 5. 크레인 인형뽑기 게임
``` javascript
function solution(board, moves) {
    var answer = 0;
    let boardSize = board.length;
    let basket = new Array();
    // 1. board 데이터로 인형 쌓기
    let stack = new Array();
    for(let i = 0; i < boardSize; ++i){
        stack.push(new Array());
    }
    for(let i = boardSize - 1; i >= 0; --i){
        for(let j = 0; j < boardSize; ++j){
            if(board[i][j] !== 0){
                stack[j].push(board[i][j]);
            }
        }
    }
    
    // 2. moves에 따라 basket에 옮기기
    moves.forEach(function(e){
        let temp = stack[e - 1].pop();
        if(temp !== undefined){
            basket.push(temp);
        }
    })

    // 3. 인형 제거
    let idx = 0;
    while (idx !== basket.length){
        if(basket[idx] === basket[idx + 1]){
            basket.splice(idx, 2);
            answer += 2;
            idx = 0;
            continue;
        }
        ++idx;
    }
    return answer;
}
```

- 테스트 1 〉	통과 (1.77ms, 37.4MB)
- 테스트 2 〉	통과 (1.73ms, 37.5MB)
- 테스트 3 〉	통과 (1.74ms, 37.6MB)
- 테스트 4 〉	통과 (2.17ms, 37.5MB)
- 테스트 5 〉	통과 (1.77ms, 37.5MB)
- 테스트 6 〉	통과 (1.75ms, 37.4MB)
- 테스트 7 〉	통과 (1.81ms, 37.5MB)
- 테스트 8 〉	통과 (2.06ms, 37.4MB)
- 테스트 9 〉	통과 (1.96ms, 37.8MB)
- 테스트 10 〉	통과 (2.05ms, 37.4MB)
- 테스트 11 〉	통과 (3.31ms, 37.5MB)

---

# 6. 모의고사
``` javascript
function solution(answers) {
    var answer = [];

    let count = [0,0,0];
    let num1 = [1,2,3,4,5];
    let num2 = [2,1,2,3,2,4,2,5];
    let num3 = [3,3,1,1,2,2,4,4,5,5];

    // 정답 체크
    for(let i = 0; i < answers.length; ++i){
        // 1번 수포자
        if(num1[i % num1.length] === answers[i]){
            ++count[0];
        }

        // 2번 수포자
        if(num2[i % num2.length] === answers[i]){
            ++count[1];
        }

        // 3번 수포자
        if(num3[i % num3.length] === answers[i]){
            ++count[2];
        }
    }

    // 최댓값 찾기
    let max = Math.max.apply(null, count);
    for(let i = 0; i < 3; ++i){
        if(count[i] === max){
            answer.push(i+1);
        }
    }

    return answer;
}
```

- 테스트 1 〉	통과 (2.03ms, 37.4MB)
- 테스트 2 〉	통과 (2.02ms, 37.5MB)
- 테스트 3 〉	통과 (2.00ms, 37.4MB)
- 테스트 4 〉	통과 (2.03ms, 37.4MB)
- 테스트 5 〉	통과 (2.00ms, 37.4MB)
- 테스트 6 〉	통과 (2.04ms, 37.4MB)
- 테스트 7 〉	통과 (2.64ms, 37.5MB)
- 테스트 8 〉	통과 (2.22ms, 37.6MB)
- 테스트 9 〉	통과 (4.89ms, 37.4MB)
- 테스트 10 〉	통과 (2.61ms, 37.4MB)
- 테스트 11 〉	통과 (4.91ms, 37.6MB)
- 테스트 12 〉	통과 (5.01ms, 37.4MB)
- 테스트 13 〉	통과 (2.11ms, 37.4MB)
- 테스트 14 〉	통과 (4.90ms, 37.6MB)

---

# 7. 체육복
``` javascript
function solution(n, lost, reserve) {
    var answer = 0;
    
    // lost, reserve 정렬
    lost.sort(function(a, b){
        return a - b;
    })
    let temp = lost.slice();    // lost 복사
    reserve.sort(function(a, b){
        return a - b;
    })

    // 여벌 체육복이 도난 당한 경우
    for(let i = 0; i < lost.length; ++i){
        let reserveIdx = reserve.indexOf(lost[i]);
        if(reserveIdx !== -1){
            let tempIdx = temp.indexOf(lost[i]);
            temp.splice(tempIdx, 1);
            reserve.splice(reserveIdx, 1);            
        }
    }

    lost = temp.slice();

    // temp 원소 마다 빌릴 수 있는지 탐색    
    for(let i = 0; i < lost.length; ++i){        
        let reserveIdx = reserve.indexOf(lost[i] - 1);
        if(reserveIdx !== -1){
            let tempIdx = temp.indexOf(lost[i]);
            temp.splice(tempIdx, 1);
            reserve.splice(reserveIdx, 1);
            continue;
        }
        reserveIdx = reserve.indexOf(lost[i] + 1); 
        if(reserveIdx !== -1){
            let tempIdx = temp.indexOf(lost[i]);
            temp.splice(tempIdx, 1);
            reserve.splice(reserveIdx, 1);
        }
    }
    
    answer = n - temp.length;

    return answer;
}
```

- 테스트 1 〉	통과 (2.16ms, 37.3MB)
- 테스트 2 〉	통과 (2.18ms, 37.3MB)
- 테스트 3 〉	통과 (2.23ms, 37.5MB)
- 테스트 4 〉	통과 (2.21ms, 37.5MB)
- 테스트 5 〉	통과 (2.14ms, 37.4MB)
- 테스트 6 〉	통과 (2.05ms, 37.3MB)
- 테스트 7 〉	통과 (2.11ms, 37.5MB)
- 테스트 8 〉	통과 (2.08ms, 37.3MB)
- 테스트 9 〉	통과 (2.10ms, 37.3MB)
- 테스트 10 〉	통과 (2.17ms, 37.4MB)
- 테스트 11 〉	통과 (2.16ms, 37.4MB)
- 테스트 12 〉	통과 (2.13ms, 37.6MB)