function solution(N, stages) {
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
    let sortedMap = new Map([...map.entries()].sort((a, b) =>{
        if(a[0] === b[0]){
            a[0] - b[0];
        }else{
            b[1] - a[1];
        }        
    }))
    for(let key of sortedMap.keys()) answer.push(key);
    return answer;
}