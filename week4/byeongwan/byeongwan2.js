// 1. 탑 
function solution1(heights) {    
    var answer = [];

    while(heights.length){
        let pivot = heights.pop();
        let flag = false;
        for(let i = heights.length; i >= 0; --i){
            if(heights[i] > pivot){
                answer.unshift(i + 1);
                flag = true;
                break;
            }
        }
        if(!flag) answer.unshift(0);
    }
    return answer;
}

// 2. 멀쩡한 사각형 - X

// 3. 다리를 지나는 트럭
function solution3(bridge_length, weight, truck_weights) {
    var sec = 0;
    let runnigList = [];
    let lenList = [];
    let nowWeight = 0;
    while(runnigList.length || truck_weights.length){
        let count = 0;  // 빠져 나간 트럭 수
        // 1초 증가
        ++sec;
        // runningList가 비어 있거나 무게가 견딜 수 있다면 대기 트럭 추가
        if(!runnigList.length || weight >= nowWeight + truck_weights[0]){
            nowWeight += truck_weights[0];
            runnigList.push(truck_weights.shift());
            lenList.push(bridge_length);
        }

        // 남은 다리 길이 감소
        for(let i = 0; i < runnigList.length; ++i){
            --lenList[i];
            if(lenList[i] <= 0){
                ++count;
                nowWeight -= runnigList[i]
            }
        }

        // 다리 위 트럭 제거
        runnigList.splice(0, count);
        lenList.splice(0, count);
    }    
    return sec + 1;  
}

// 4. 숫자야구 - X

// 5. 실패율 - X
function solution5(N, stages) {
    var answer = [];
    let people = stages.length;
    let successList = new Array(N + 1).fill(0);
    let tryList = new Array(N + 1).fill(0);
    let failList = new Array(N + 1).fill(0);
    let map = new Map();
    
    for(let value of stages){
        // 각 스테이지 마다 성공한 횟수 등록
        for(let i = 1; i < value; ++i) ++successList[i]
        
        // 각 스테이지 마다 시도한 횟수 등록
        for(let i = 1; i <= value; ++i) ++tryList[i]        
    }
        
    // 각 배열마다 실패율 할당
    for(let i = 1; i <= N; ++i){
        let success = successList[i];
        let trial = tryList[i];
        
        if(!trial) failList[i] = 0;        
        else failList[i] = 1 - (success / tryList[i]);        
    }    

    // 맵에 할당
    for(let i = 1; i <= N; ++i){
        map.set(i, failList[i]);
    }
    
    // 맵 내림차순 정렬
    let sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    for(let key of sortedMap.keys()) answer.push(key);
    return answer;
}

// 6. 가장 큰 수
function solution6(numbers) {
    var answer = '';
    let temp = [];
    for(let i = 0; i < numbers.length; ++i) temp.push(numbers[i].toString());
    temp.sort().reverse();
    for(let i = 0; i < temp.length - 1; ++ i){
        let nextSize = temp[i + 1].length;
        if(temp[i].slice(0, nextSize) === temp[i+1] && temp[i].length > temp[i + 1].length){
            if(temp[i][nextSize] <= temp[i+1][0] && temp[i + 1][nextSize - 1] !== '0'){
                let t = temp[i];
                temp[i] = temp[i+1];
                temp[i+1] = t;         
            }
        }
    }
    
    for(let val of temp){
        if(val[0] !== '0') answer += val;
    }
    if(answer === "") answer = '0';
    return answer;
}