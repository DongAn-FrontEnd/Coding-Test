//캐시

function solution(cacheSize, cities){
    let cache = new Set();
    //let queue = new Array(cities.length);
    let answer = 0;
   // if(cacheSize === 0) return cities.length * 5;

    cities.forEach(element => {
        //대문자로 바꾸기 
        let city = element.toUpperCase(); 
        if(cache.has(city)){
            //캐시에 이미 존재한다면
            cache.delete(city);
            cache.add(city);
            answer += 1;
        }else{
            //캐시에 없다면
            if(cache.size < cacheSize){
                //현재 캐시가 가득 차 있지 않다면 그냥 추가 
                cache.add(city);
            }else {
                //가득 차 있다면 cache의 가장 오래 된 value 삭제 
                let firstValue = cache.values().next(); //get first entry
                cache.delete(firstValue.value);               
                cache.add(city);

            }
            answer += 5;
        }
    
    });

    return answer;
}

//console.log(solution(0, ["Jeju", "Jeju", "Seoul", "NewYork", "LA"]));

//기능개발
function development(progresses, speeds) {
  let answer = [];
  let cnt = 0;
  while (progresses.length > 0) {
    for (let i = 0; i < progresses.length; i++) {
      //각 작업 + speed
      progresses[i] += speeds[i];
      console.log("progress : "+progresses[i]);
      console.log("speeds : "+speeds[i]);
    }
    if (progresses[0] >= 100) {
      //첫번째 작업이 100넘었다면 빼기 
      progresses.shift();
      speeds.shift();
      cnt++;
      while (progresses.length > 0) {
        if (progresses[0] < 100) {
          answer.push(cnt);
          cnt = 0;
          break;
        } else {
          //그 다음 작업들도 완료되었다면 계속해서 빼기
          //아니라면 break하고 다시 다음날로 돌아가서 speed +
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

console.log(development([93, 30, 55], [1, 30, 5]));


//JadenCase 문자열 만들기

function JadenCase(s){
    let str = s.split('');
    let answer=s[0].toUpperCase();
    let before = s[0];
    console.log(str);
    for(let i=1;i<s.length;i++){
       if (before === " " && s[i] === " ") {
         //이전이 공백이고 현재도 공백
         answer += s[i];
       } else if (before === " "){
        //이전이 공백, 현재가 문자라면 대문자로
            answer += s[i].toUpperCase();
       }
       else answer += s[i].toLowerCase();
       
       before = s[i];
    }
    
    return answer;
}

// function isString(x){
//     return Object.prototype.toString.call(x) === "[object String]";
// }
//console.log(JadenCase('Hello World'));

//보석 쇼핑


function gemShopping(gems){
    let typeCount = new Set(gems).size;
    //size속성을 통해 set이 갖고 있는 항목의 수를 알아냄
    let gemLength = [];

    let gemArr = [];
    let idxArr = [];

    let jewel = {};
    let currentIdx = 0;
    gems.forEach((element,idx) => {
        let findIdx = gemArr.indexOf(element);
        //jewel[element] = idx; 
        if(findIdx < 0 ){
            //없다면
            gemArr[currentIdx] = element;
            idxArr[currentIdx] = idx+1;
            currentIdx+=1;
        }else{
            //있다면
            idxArr[findIdx] = idx+1;
        }

        //4가지 종류가 다 들어왔다면
        if(gemArr.length === typeCount){
            let idxClone = idxArr.slice();
            idxClone.sort((a,b)=> a-b);
            gemLength.push([idxClone[0],idxClone[idxClone.length-1]]);
        }
    });

    //들어온 값중 최소값을 리턴
    gemLength.sort((a,b)=>{
        if(Math.abs(a[0]-a[1]) > Math.abs(b[0]-b[1])){
            //절댓값이 a가 더 크다면 
            return 1;
        }else if(Math.abs(a[0]-a[1]) === Math.abs(b[0]-b[1])){
            //절댓값이 같다면 시작값이 더 작은 것으로 리턴
            if(a[0] < b[0]) return -1;
            else return 1;
        }else return -1;
    })

    console.log(gemArr);
    console.log(idxArr);
    console.log(gemLength);
    return gemLength[0];
   
}



 console.log(gemShopping(["ZZZ", "YYY", "NNNN", "YYY", "BBB"]));

//후보키
// function candidateKey(relation){
//     var answer = 0;
//     let primary = [];

//     for(let i=0;i<relation[0].length;i++){
//         let checkSet = new Set();
//         for(let j=0;j<relation.length;j++){
//             if(!checkSet.has(relation[j][i])){
//                 //포함 안돼있다면
//                 checkSet.add(relation[j][i]);
//             }else{
//                 checkSet.clear();
//                 break;
//             }
//         }
//         if(checkSet.size>0) primary.push(i); //기본키 추가
//     }

    //기본키 제외 최소성 만족하는 후보키 구하기

    
  //  console.log(primary);
//}

// console.log(
//   candidateKey([
//     ["100", "ryan", "music", "2"],
//     ["200", "apeach", "math", "2"],
//     ["300", "tube", "computer", "3"],
//     ["400", "con", "computer", "4"],
//     ["500", "muzi", "music", "3"],
//     ["600", "apeach", "music", "2"],
//   ])
 //);
