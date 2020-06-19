// 다음 큰 숫자
function solution(n) {
    let nCount = countOne(decimalToBinary(n));
    while(true){
      ++n;
      let biggerNumCount = countOne(decimalToBinary(n));
      if(nCount === biggerNumCount) return n;
    }  
  }
  
  function decimalToBinary(data){
    let bin = "";
    while(data !== 0){
      let remainder = data % 2;
      data = parseInt(data / 2);
      bin = remainder.toString()+ bin;
    }
    return bin;
  }
  
  function countOne(data){
    let count = 0;
    for(let i = 0; i < data.length; ++i)
      if(data[i] === "1") ++count;      
    return count;
  }

// 위장
function solution(clothes) {
    var answer = 1;
    
    var hash = new Map();
    
    for(var i = 0; i < clothes.length; ++i){
        var value = hash.get(clothes[i][1]);
        // value가 있다면 1증가하여 set
        if(value !== undefined){
            ++value;
            hash.set(clothes[i][1], value);
        }
        // value가 있다면 1로 set
        else{            
            hash.set(clothes[i][1], 1);
        }
    }
    // values를 가지고와서 반복
    var it = hash.values();
    for(var i = 0; i < hash.size; ++i){
        answer *= (it.next().value + 1);    // 안입는 경우도 추가하여 +1
    }
    
    answer -= 1;    // 아무것도 안입는 경우를 뺀다 -1
    return answer;
}

// 땅따먹기 - Fail

// 구명보트
function solution(people, limit) {
    var boat = 0;
    let front = 0;
    let back = people.length - 1;
    people.sort((a,b) => b - a);
    while(front <= back){
        if(people[front] + people[back] <= limit)
            --back;        
        ++front;
        ++boat;
    }
    return boat;
}