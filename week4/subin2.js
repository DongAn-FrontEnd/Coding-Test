// 1. 탑
// 맨 뒤에서부터 앞쪽으로 진행하면서 현재 포인터값보다 큰 값 가진 인덱스 + 1
// 점수 : +3
function solution(heights){
    var current = heights.length - 1; //현재 지표
    var pointer = heights.length - 1; //현재 지표에서 비교할 포인터 
    
    var answer = [];
    while(current > 0){
        //if(pointer === current) pointer--;
        pointer--;

        if(heights[pointer] > heights[current]){
            answer.unshift(pointer + 1);
            current--;
            pointer = current; //pointer가 반복문에서 어차피 -- 되므로 current 값으로 맞춰줌
        }

        if(pointer === -1 ){
            answer.unshift(0);
            current --;
            pointer = current;
        }
    }

    answer.unshift(0);
    return answer;
}

console.log(solution([6,9,5,7,4]));

//2. 멀쩡한 사각형
function solution(w, h){
    var x = w > h ? h : w; //작은 값
    var y = w > h ? w : h;
    var c = parseInt(Math.sqrt(Math.pow(x,2) + Math.pow(y,2))); //대각선 길이 내림
    console.log ("x : "+x);
    console.log (" c : "+c);
    console.log ("answer : "+(c/x));
    //대각선 길이 / 가로 세로중 작은 값
    var value = c / x; //x값 1당 차지하는 칸 수
    return h === w ? h * w - Math.floor(value) * x : h * w - Math.ceil(value) * x;
}
console.log(solution(3,4));

3. 다리를 지나는 트럭
function solution(bridge_length, weight, truck_weights){
    var answer = 0; //걸린 시간
    var pointer = 0;
    var currentWeight = 0; 
    var currentTruck = new Array(bridge_length).fill(0); //큐
    while(truck_weights.length > 0){
        if(truck_weights[backPointer + 1] + currentWeight <= weight){
            currentWeight += truck_weights[backPointer + 1];
            backPointer ++;
        }else {
             answer += bridge_length;
             truck_weights = truck_weights.slice(backPointer+1);//backPointer까지 나감
             backPointer = 0; //나갔으니 다시 맨 앞으로 초기화
             console.log("남은 : "+truck_weights.length);
            // currentWeight += truck_weights[0];

        }
    }
}

function solution(bridge_length,weight,truck_weights){
    var answer = 0; //걸린 시간...
    var i;
    var bridgeWeight = 0;
    var bridgeTruck = [];
    while(truck_weights.length>0){
        for(i=0;i<bridge_length;i++){
            if(bridgeWeight+truck_weights[0] <= weight){
                console.log("현재 다리 무게 : "+bridgeWeight);
                console.log("i :"+i+"다리 위의 트럭 : "+bridgeTruck);
                bridgeTruck.push(truck_weights[0]);
                bridgeWeight += truck_weights[0];
                truck_weights.shift();
                answer++;
            }else break;
        }
        console.log("다리 현재 트럭 개수 : "+bridgeTruck.length);
        //다리 길이는 남지만 다음 차가 못들어올 무게이면
        //다리 위의 트럭을 뺀다
        if(i < bridge_length && bridgeWeight+truck_weights[0] >= weight){
            console.log("다리1 : "+bridgeTruck);
            answer += bridge_length - i;
            bridgeWeight -= bridgeTruck[0];
            bridgeTruck.shift();
        }else if(bridgeTruck.length === bridge_length){
            //다리가 꽉 차 있으면
            console.log("bridgeWeight : "+bridgeWeight);
            
            bridgeWeight -= bridgeTruck[0];
            bridgeTruck.shift();
            answer++;
         }else if(truck_weights.length === 0){
             //남은 트럭이 없다면
           console.log("현재 aa : "+bridgeTruck);
           answer += bridge_length - i + 1;
           while(bridgeTruck.length > 0){
               answer+= bridge_length - i +1;
               bridgeTruck.shift();
         }
        }

    }
    return answer;
}



 console.log(solution(100,100,[10,10,10,10,10,10,10,10,10,10]));


//4. 숫자야구


// 5. 실패율
// 3,4,16,17 ... 실패
// 맵으로 key를 인덱스, value를 실패율로 두고
// value로 sort함.

//map을 sort할 때 value로만 sort했을 때는 실패했었는데
//조건 추가해주니까 통과함
function solution(N, stages){
    var dividePerson = stages.length; //남은사람
    var person = stages.length;
    var currentStage = 1;
    var answer =[]; //각 스테이지별 실패율
    var count; //해당 스테이지에 막힌 사람 수 
    while(currentStage <= N){
        count = 0; 
        for(var i=0;i<stages.length;i++){
            if(stages[i] === currentStage){
                console.log("i ; "+i+" stage : "+currentStage);
                count++;
                person--;
            }
        }
        console.log("count : "+count+" person : "+dividePerson);
        if(count===0 && dividePerson===0) answer[currentStage-1] = 0;
        else if(dividePerson===0 && count > 0){ answer[currentStage -1] = 1;
            console.log("person : "+person+" count : "+count);
        }
        else {
            answer[currentStage-1] = count/dividePerson;
            dividePerson = person; 
        
        }
        currentStage++;
    }

    var filters = new Map();
    for(var i= 0; i<answer.length;i++){
        console.log("스테이지 : "+(i+1)+" 실패율 : "+answer[i]);
        filters.set(i+1,answer[i]);
    }
    var failSort = new Map([...filters.entries()].sort((a,b)=>
           {if(b[1]===a[1]) return b[0] > a[0] ? -1 : 1; 
           else return b[1]-a[1]}
        ));
    //실패율 value로 sort 
   
    for(const key of failSort){
        console.log("key : "+key)
    }
    answer = [...failSort.keys()];
    return answer;
}

//console.log(solution(4,[4,4,4,4,4]));
//https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript

//+11
//객체에 스테이지 인덱스, 실패율을 넣음
function solution(N, stages){
    var person = stages.length;
    var currentStage = 1;
    var score = [];
    while(currentStage <= N){
        var count = stages.filter((value) => value === currentStage).length;
        //현재 스테이지와 같은 사람 수 
        var failure;
        if(count === 0 && person === 0) failure = 0;
        else if(count > 0 && person === 0 ) failure = 1;
        else failure = count / person;
        score.push({stage : currentStage, fail : failure});
        
        person -= count;
        currentStage++;
    }

    score.sort((a,b)=> {
        if(a.fail === b.fail){
            return a.stage < b.stage ? -1 : 1;
        }else{
            return b.fail - a.fail;
        }
    });

    return score.map(item =>{
        return item.stage;
    })
}

console.log(solution(4,[4,4,4,4,4]));

6. 가장 큰 수
+11
처음엔 자릿수 비교를 자릿수가 작은 수는 그대로 인덱스 유지하면서 
큰 수만 인덱스를 옮겨가며 비교하는 식으로 했었는데 그러니까 1~6, 11번 X
문자를 붙이는 식으로 해야됨. + 근데 이건 11번 통과X
11번 통과하려고 0000은 0으로 따로 처리
function solution(numbers){
    var zeroCheck = numbers.reduce(function(acc,cur){
        return acc+cur;
    },0);
    if(zeroCheck === 0) return String(0);

   numbers.sort((a,b)=>{
       var first = String(a);
       var second = String(b);
       if(first.length === second.length){
           return b - a;
       }else{
           var big = first.length + second.length;
           var one = (first+second).split(''); //a
           var two = (second+first).split(''); //b
           var i=0, j=0;
           while(big > 0){
               console.log("i : "+i+" j : "+j);
               console.log("비교1 : "+one+" 비교2 : "+two);
               if(one[i] !== two[j]){
                   console.log("one : "+one[i]+" two : "+two[j]);
                   var re = one[i]>two[j]? a : b;
                   console.log(re);
                   //a : b, b : a는 안됨
                 return one[i]>two[j] ? -1 : 1;
               }else{
                   if(i<one.length-1) i++;
                   if(j<two.length-1) j++;
               }
               big--;
           }
       }
   })

    return numbers.join('');
}

console.log(solution([0,0,0,0,0,0]));