const {performance} = require('perf_hooks');

//1. 124나라의 숫자
//+12
function Xsolution(n){
    while(n !== 0){
    
        n = parseInt(n / 3);
        y = n % 3; //
        console.log("n : "+n);
        //if (y===0) value = arr[(y+2)%3] //한 칸씩 왼쪽으로 당기기
        console.log("y : "+y);
        answer += y===0 ? arr[(y+2)%3] * cnt : answer + arr[y] * cnt;
        console.log("answer ; "+answer);
        cnt *= 10;
    }

}

function solution(n){
    var answer = 0;
    var y;
    var cnt = 1; //자릿수
    var arr = [4,1,2]; //0->4 1->1 2->2

    while (n > 0 ){
        y = n % 3;
        n = parseInt(n/3);
        if(y === 0) n -= 1;
        answer += arr[y] * cnt;
        cnt *= 10;
    }

    return String(answer);
    
}

// 효율성  테스트 30
// 테스트 1 〉	통과 (1.70ms, 37.3MB)
// 테스트 2 〉	통과 (1.70ms, 37.3MB)
// 테스트 3 〉	통과 (1.68ms, 37.4MB)
// 테스트 4 〉	통과 (1.66ms, 37.5MB)
// 테스트 5 〉	통과 (1.66ms, 37.3MB)
// 테스트 6 〉	통과 (1.58ms, 37.4MB)


//n-1은 3의 배수일 시 n -=1 한 것과 같음
function otherSolution1(n){
    return n === 0 ? '' : otherSolution1(parseInt((n - 1) / 3)) + [1, 2, 4][(n - 1) % 3];
}



  
//2. 기능개발
//맨 앞부터 차례로 빠져나가기
//배열[0]만 가리키고 있음
//q는 progresses 복사할 필요 없이 그냥 progresse 쓰면 됐는데
function solution(progresses, speeds) {
    var answer = [];
    var cnt = 0;
    while(progresses.length>0){
        for(var i=0; i<progresses.length;i++){
            progresses[i] += speeds[i];
            
        }
        if(progresses[0] >= 100){
            progresses.shift();
            speeds.shift();
            cnt++;
            while(progresses.length > 0){
                if(progresses[0] < 100){
                    answer.push(cnt);
                    cnt = 0;
                    break;
                }
                else{
                    progresses.shift();
                    speeds.shift();
                    cnt++;
                }
            }
        }

    }
    answer.push(cnt);
    return answer;
}

function otherSolution2(progresses, speeds) {
    let answer = [0];
    let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
    //남은 진행상황 / 속도로 각자 끝낼 수 있는 날짜를 안에 넣어 놓음 
    //예제 -> 7 3 9 일 
    let maxDay = days[0]; //가장 먼저 나가야하는 기능이 maxDay

    for(let i = 0, j = 0; i< days.length; i++){
        if(days[i] <= maxDay) {
            //maxDay와 그 다음 날짜들의 day가 작거나 같다면 같이 나가게 되므로
            //answer에 기능 수 추가
            answer[j] += 1;
        } else {
            //아니라면 앞에 것들은 이미 추가된 상태이므로(큐) 
            //그 뒤는 maxDay가 뒤의 날짜들로 갱신되어 answer 배열에 값 추가
            maxDay = days[i];
            answer[++j] = 1;
            
        }
    }

    return answer;
}

var t1 = performance.now();
solution([93,30,55],[1,30,5]);
var t2 = performance.now();
console.log (t2 - t1);

var t3 = performance.now();
otherSolution2([93,30,55],[1,30,5]);
var t4 = performance.now();
console.log(t4 - t3);

//3. 나누어 떨어지는 숫자 배열

function solution(arr, divisior){
    var answer = [];
    for(var i=0;i<arr.length;i++){
        if(arr[i] % divisior === 0) answer.push(arr[i]);
    }

    if(answer.length === 0 ) answer.push(-1);
    else answer.sort((a,b)=>{
        return a-b;
    });
    return answer;
}

//4. 문자열 내림차순으로 배치하기

function solution(s){
    var arr = s.split('');
    arr.sort();
    return arr.reverse().join('');
}

console.log(solution("Zbcdefg"));

// 5. 예산
// 당연히 안될줄 알았는데 됐다
// 그냥 sort하고 차례로 빼기
function solution(d, budget){
    var cnt = 0;
    
    d.sort((a,b)=>{
        return a-b;
    });

    while(budget >= d[0]){
        budget -= d[0];
        cnt++;
        d.shift();
        if(d.length === 0) break;
    }
    return cnt;
}

// 6.최대공약수와 최소공배수 
// 1053(+5)
function solution(n, m) {
    var answer = [];
    var x = n, y = m;
    var r = 0;
    while(m!=0){
        r = n % m;
        n = m;
        m = r;
    }
    answer.push(n);
    answer.push(x * y / n);
    return answer;
}


function greatestCommonDivisor(a, b) {return b ? greatestCommonDivisor(b, a % b) : Math.abs(a);} //b가 0이 되면 a 리턴 그 전까지 재귀로 a = b, b = a%b의 값 넣기 반복
function leastCommonMultipleOfTwo(a, b) {return (a * b) / greatestCommonDivisor(a, b);}
function gcdlcm(a, b) {
    return [greatestCommonDivisor(a, b),leastCommonMultipleOfTwo(a, b)];
}




// 7. 수박수박...
function solution(n){
    var arr = ['수','박'];
    var str = '';
    for(var i=0;i<n;i++){
        str += arr[i%2]
    }
    return str;
}

console.log(solution(4));


//8. 서울에서 김서방 찾기
function solution(seoul){
    var index = seoul.indexOf('Kim');
    return "김서방은 "+index+"에 있다";
}

console.log(solution(["Jane","Kim"]))