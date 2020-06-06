// 문자열 내 마음대로 정렬하기
// 1. 각각의 알파벳 추출
// 2. key: 알파벳 value: 그 알파벳의 인덱스의 구성을 갖는 해시 구현
// 3. a ~ z까지 해시 탐색
// 4. 추출한 값을 temp에 push
// 5. temp를 정렬 후 answer에 push
function solution1(strings, n) {

    var answer = [];
    let alphabets = [];
    let map = new Map();

    // 각각의 알파벳을 alphabets에 넣는다.
    strings.forEach(element => {
        alphabets.push(element[n]);
    });

    // key: 알파벳 value: index 로 해시테이블 구성
    for(let i = 0; i < alphabets.length; ++i){
        if(map.get(alphabets[i]) === undefined){
            let temp = [i];
            map.set(alphabets[i], temp);
        }else{
            let temp = map.get(alphabets[i]);
            temp.push(i);
            map.set(alphabets[i], temp);
        }
    }
    
    // 알파벳 a ~ z 순회
    for(let i = 'a'; i <= 'z'; i =String.fromCharCode(i.charCodeAt(0) + 1)){
        if(map.get(i) !== undefined){
            let temp = [];
            map.get(i).forEach(element =>{
                 temp.push(strings[element]);
            });
            temp.sort();
            temp.forEach(element=>{
                answer.push(element);
            });
        }
    }    
    return answer;
}

// 비밀지도
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

function solution2(n, arr1, arr2) {
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

// 시저 암호
function solution3(s, n){
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

// 정수 제곱근 판별
function solution4(n) {
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

// 크레인 인형뽑기 게임
function solution5(board, moves) {
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

// 모의고사
function solution6(answers) {
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

// 체육복
function solution7(n, lost, reserve) {
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