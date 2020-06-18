
//1. 다음 큰 숫자
// 효율성  테스트
// 테스트 1 〉	통과 (3.64ms, 37.8MB)
// 테스트 2 〉	통과 (3.90ms, 37.5MB)
// 테스트 3 〉	통과 (3.46ms, 37.4MB)
// 테스트 4 〉	통과 (3.81ms, 37.9MB)
// 테스트 5 〉	통과 (3.85ms, 37.7MB)
// 테스트 6 〉	통과 (3.57ms, 37.6MB)

function solution(n){
    var answer = n+1;
    var ori = change(n);
    console.log(ori.split(''));
    var one_length = ori.split('').filter(val=>val === '1').length;

    while(true){
        //n+1부터 1의 개수 셈 
        var num = '';
        var n = answer;
        var answer_one = 0;
        while(n !== 1){
            if(n%2 === 1){
                answer_one++;
            }
            num += String(n%2);
            n = parseInt(n/2);
            if(answer_one >= one_length) break;
        }
        if(answer_one === one_length-1) break;
        answer++;
    }

    return answer;


}

function change(n){
    var num ='';
    var r;
    while(n!==1){
        num += String(n%2);
        n = parseInt(n / 2);
    }

    return '1'+num;
}

// console.log(solution(15));

//2. 위장
//실행 시까지 키를 알 수 없고, 모든 키가 동일한 type이며 모든 값들이 동일한 type일 경우
//objects보다는 map
//각 개별 요소에 대해 적용해야 하는 로직이 있을 경우에는 objects
// function solution(clothes){
//     var cloth= {};
//     var answer = 0;
//     var wear_len = 0; //1의 값보다 더 큰 옷 개수
//     var wear_type = 0; //옷 종류
//     for(var wear of clothes){
//         if(cloth[wear[1]] === undefined){
//          wear_type++;
//          cloth[wear[1]] = 1;
//         }
//         else {
//             ++cloth[wear];
//             wear_len++;
//         }
//     } 
//     console.log("옷 종류 : "+wear_type);
//     console.log("1보다 큰 : "+wear_len);
//     var com = 0;

//     for(var i=1;i<=wear_type;i++){
//         answer += combination(wear_type,i);
//         com += combination(wear_type-1,i-1);
//         console.log("com : "+com);
//     }

//     console.log(answer);
//     console.log(com);
//     console.log("len : "+wear_len);
//     return answer + com * wear_len + wear_len;

// }

// function permute(n,p){
//     var answer = 1; //개수
//     for(var i=n-p+1 ; i<=n;i++) answer *= i;
//     return answer;

// }

// function combination(n,p){
//     if(p === 0) return 0;
//     var answer = permute(n,p) / factorial(p);
//     return answer;
// }

// function factorial(n){
//     var answer = 1;
//     for(var i=1;i<=n;i++) answer *= i;
//     return answer;
// }

//console.log(permute(4,3));
//console.log(solution([["yellow_hat","headgear"],["blue_sunglasses","eyewear"],["green_turban","headgear"]]));
//console.log(solution([["A","head"],["B","head"],["C","head"],["D","up"],["E","up"],["F","down"]]));

//구명보트
// function solution1(people,limit){
//     var answer = 0;
//     var idx = 0;
//     var peopleBoat = people.filter(val => val <= 60);
//     peopleBoat.sort((a,b)=>a-b);
//     console.log("peopleBoat : "+peopleBoat);
//     answer += people.length - peopleBoat.length; //60 초과되는 사람들 보트 하나씩 할당
//     console.log(answer+"개");
//     //50,50,70,80  0 1   1 0
//     for(var i = peopleBoat.length-1;i>=0;i--){
//         if(idx > i) break;
//         if(idx === i){
//             answer++;
//             break;
//         }
//         if(peopleBoat[i] + peopleBoat[idx] <= limit){
//             idx++;
//         }
//         answer++;
//     } 

//     return answer;
// }

//이것만 통과 
// 효율성  테스트
// 테스트 1 〉	통과 (30.43ms, 39.5MB)
// 테스트 2 〉	통과 (25.06ms, 39.3MB)
// 테스트 3 〉	통과 (28.11ms, 39.1MB)
// 테스트 4 〉	통과 (21.35ms, 39.5MB)
// 테스트 5 〉	통과 (25.06ms, 39.1MB)

function solution2(people,limit){
    var answer = 0;
    var idx = 0;
    people.sort((a,b)=>a-b);
    //50,50,70,80  0 1   1 0
    for(var i = people.length-1;i>=0;i--){
        if(idx > i) break;
        if(idx === i){
            answer++;
            break;
        }
        if(people[i] + people[idx] <= 100){
            idx++;
        }
        answer++;
    } 

    return answer;
}

//땅따먹기
// 효율성  테스트
// 테스트 1 〉	통과 (76.85ms, 72.6MB)
// 테스트 2 〉	통과 (74.61ms, 89.6MB)
// 테스트 3 〉	통과 (74.17ms, 89.9MB)
// 테스트 4 〉	통과 (77.58ms, 89.3MB)
function solution(land){
    var dp = new Array(land.length * 4).fill(0);
    for(var i=0;i<land.length;i++){
        for(var j=0;j<4;j++){
            dp[i*4+j] = land[i][j];
        }
    }
   
    // for(var i=0;i<land.length;i++){
    //     for(var j=0;j<4;j++){
    //         if((i+j) % 4 === j) continue; //같은 열 패스 
    //         if(dp[i+4]<land[i][j]+dp[i+j]) dp[i+j+3] = land[i][j]+dp[i+j];
    //     }
    // }
    console.log(dp);

    // for(var i=1;i<land.length*4;i++){
    //    // dp[i+3] = Math.max(land[i-1][i%4],land[i-1][i%4+1],land[i-1][i%4+2]) + land[Math.floor((i+3)/4)][(i+1)%4];
    //    if(i+3 === land.length*4) break;
    //    for(var j=0;j<4;j++){
    //         console.log("i : "+i+" j :"+j);
    //         console.log("dp["+(i+3)+"]의 예비값 : "+"dp["+(i+3-4+j)+"]");
    //         if((i+3)%4 === (i+3)-4+j) continue; //dp[4]-> dp[0]이면 패스 
    //         if(dp[i+3] < dp[(i+3)-4+j] + land[Math.floor((i+3)/4)][(i+3)%4]) {
    //             dp[i+3] = dp[(i+3)-4+j] + land[Math.floor((i+3)/4)][(i+3)%4]; 
    //             console.log("dp["+(i+3)+"]은 "+ (dp[(i+3)-4+j] + land[Math.floor((i+3)/4)][(i+3)%4])); 
    //         }
    //     }
    // }

    for(var i=4;i<land.length * 4; i++){
        if(i%4 === 0){
            dp[i] = Math.max(dp[i],dp[i-4+1]+land[Math.floor(i/4)][i%4],dp[i-4+2]+land[Math.floor(i/4)][i%4],dp[i-4+3]+land[Math.floor(i/4)][i%4]);
            //dp[4] => dp[1] dp[2] dp[3]
    
            
        }
        else if(i%4 === 1){
        
            dp[i] = Math.max(dp[i],dp[i-4-1]+land[Math.floor(i/4)][i%4],dp[i-4+1]+land[Math.floor(i/4)][i%4],dp[i-4+2]+land[Math.floor(i/4)][i%4]);
            //dp[5] => dp[1] dp[2] dp[3]
        }else if(i%4 === 2){
            dp[i] = Math.max(dp[i],dp[i-4-2]+land[Math.floor(i/4)][i%4],dp[i-4-1]+land[Math.floor(i/4)][i%4],dp[i-4+1]+land[Math.floor(i/4)][i%4]);
            //dp[6] => dp[0] dp[1] dp[3]
        }else{
            //dp[7] => dp[0] dp[1] dp[2]
            dp[i] = Math.max(dp[i],dp[i-4-3]+land[Math.floor(i/4)][i%4],dp[i-4-2]+land[Math.floor(i/4)][i%4],dp[i-4-1]+land[Math.floor(i/4)][i%4]);
        }
     
    console.log("dp["+i+"]는 "+dp[i]);   
    }
    return Math.max(dp[land.length*4-1],dp[land.length*4-2],dp[land.length*4-3],dp[land.length*4-4]);

}

console.log(solution([[1,2,3,5],[5,6,7,8],[4,3,2,1]]));
