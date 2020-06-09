// 1. 124 나라의 숫자 +10 시간복잡도: O(n) 공간복잡도: ?
function solution1(n) {
    /* 10진     3진     124   
        1        1       1
        2        2       2
        3        10      4
        4        11      11
        5        12      12
        6        20      14
        7        21      21
        8        22      22    
        9        100     24    
    */

    let share = n;      // 몫
    let remainer;   // 나머지
    var answer = '';

    while(share !== 0){
        remainer = share % 3;
        share = Math.floor(share / 3);
        if(remainer === 0){
            answer = '4' + answer;
            share -= 1
        }
        else if(remainer === 1) answer = '1' + answer;
        else if(remainer === 2) answer = '2' + answer;        
    }    
    return answer;
}
/*
효율성  테스트
테스트 1 〉	통과 (1.68ms, 37.2MB)
테스트 2 〉	통과 (1.71ms, 37.4MB)
테스트 3 〉	통과 (1.70ms, 37.3MB)
테스트 4 〉	통과 (1.66ms, 37.2MB)
테스트 5 〉	통과 (1.67ms, 37.3MB)
테스트 6 〉	통과 (1.68ms, 37.1MB)
*/

// 2. 기능개발 +? (예전에 풂) 시간복잡도: O(n^2) 공간복잡도: ?
function solution2(progresses, speeds) {
    var answer = [];

    while(progresses.length){
        let count = 0;
        for(let i = 0; i < speeds.length; ++i){
            progresses[i] += speeds[i];
        }

        for(let i = 0; i < progresses.length; ++i){
            if(progresses[i] < 100) break;
            else ++count;                            
        }

        for(let i = 0; i < count; ++i){
            progresses.shift();
            speeds.shift();
        }

        count > 0 && answer.push(count);
    }

    return answer;
}


// 3. 나누어 떨어지는 배열 +2 시간복잡도: O(n) 공간복잡도: ?
function solution3(arr, divisor) {
    var answer = [];
    for(let e of arr) if(e % divisor === 0) answer.push(e);
    if(answer.length){
        answer.sort(function(a, b){return a - b;});
        return answer;    
    }else return [-1];
    
}

// 4. 문자열 내림차순으로 배치하기 +4 시간복잡도: O(nlogn) 공간복잡도: ?
function solution4(s) {
    let arr = s.split("");
    arr.sort();
    arr.reverse();
    return arr.join("");
}

// 5. 예산 +6 시간복잡도: O(n) 공간복잡도: ?
// 1. 최소값 꺼내기
// 2. 예산 차감
function solution5(d, budget) {
    d.sort((a,b) => {return b - a;});   // 내림차순 정렬    
    let count = 0;
    
    while(budget > 0 && d.length > 0){
        budget -= d.pop();
        if(budget < 0) return count;
        ++count;
    }
    return count;
}

// 6. 최대공약수와 최소공배수 +4 시간복잡도: O(n) 공간복잡도: ?
// 1. n , m을 소인수분해 하여 배열로 리턴
// 2. 리턴한 배열로 해시 테이블 생성 key : 소인수분해 값 value : 갯수
// 3. 최대공약수는 갯수가 2 이상인 key의 곱
// 4. 최소공배수는 최대공약수 * n / 최대공약수 * m /최대공약수
function solution6(n, m) {
    if(n === m)
        return [n,n];
    
    let nList = primeFactorization(n);
    let mList = primeFactorization(m);
    let map = new Map();
    let GCD = 1;    // 최대공약수
    let LCM = 0;    // 최소공배수
    let temp = [];
    for(let key of nList){
        let temp = map.get(key);
        if(temp) map.set(key, ++temp);
        else map.set(key, 1);        
    }
    for(let key of mList){
        let temp = map.get(key);
        if(temp) map.set(key, ++temp);
        else map.set(key, 1);        
    }

    for(let key of map.keys()){
        let value = map.get(key)
        if( value > 1){
            temp.push(key);
        }
    }
    GCD = temp.pop();
    LCM = n * m / GCD;

    return [GCD, LCM];
}

// 소인수분해
function primeFactorization(n){
    let arr = [];
    let div = 1;
    while(div <= n){
        if(n % div === 0) arr.push(div);
        ++div;
    }
    return arr;
}

// 7. 수박수박수박수박수박수? +1 시간복잡도: O(n) 공간복잡도: ?
function solution7(n) {
    let even = "수박";
    let odd = "수";
    let share = parseInt(n / 2);
    let mod = n % 2;
    var answer = '';

    for(let i = 0; i < share; ++i)
        answer += even;
    if(mod) answer += odd;
        
    return answer;
}

// 8. 서울에서 김서방 찾기 +1 시간복잡도: O(n) 공간복잡도: ?
function solution8(seoul) {
    for(let i = 0; i < seoul.length; ++i) if(seoul[i] === "Kim") return `김서방은 ${i}에 있다`;
}