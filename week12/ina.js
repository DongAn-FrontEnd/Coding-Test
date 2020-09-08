//
// JadenCase 문자열 만들기
//

//테스트 케이스
const s1 = "3people unFollowed me";
const s2 = "for the last week";

//풀이 1.
//(1.68ms, 37.2MB)
function solution(s) {
    // s를 글자 단위로 자른다
    let answerArray = s.split('');

    // 첫번째 글자 or 공백 뒤에 오는 글자 => capitalize
    // 그 외 => to lowercase
    for (let i = 0; i < answerArray.length; i++) {
        if (i === 0 || answerArray[i - 1] === " ") {
            answerArray[i] = answerArray[i].toUpperCase();
        } else {
            answerArray[i] = answerArray[i].toLowerCase();
        }
    }

    const answer = answerArray.join('');
    return answer;
}
console.log(solution(s1));



//풀이 2. (풀이 1보다 평균 속도 느림)
//(3.42ms, 37.2MB)
//(1.69ms, 37.3MB)
function solution2(s) {
    //단어 단위로 자른 뒤
    //각 단어의 첫번째 글자는 uppercase
    //각 단어의 !첫번째 글자는 lowercase
    //charAt(idx) : 해당 index 번째 글자 return
    //substring(startIdx,(endInx)) : start~end index 글자들 return (end Index 글자 미포함)
    return s.split(" ").map(v => v.charAt(0).toUpperCase() + v.substring(1).toLowerCase()).join(" ");
}

//
// 캐시 문제
//


//캐시 주머니, 도시 배열
function solution3(cacheSize, cities) {
    let resultTime = 0; //시간 초기값 0(+1,+5)
    let cachePocket = []; //캐시 주머니
    let citiesRefined = []; //대조 위해 city 대소문자 통일

    //1.대소문자 통일하여 배열 정돈
    citiesRefined = cities.map((city) => city.toLowerCase());
    //2.for문
    for (let i = 0; i < cities.length; i++) {
        //A. 캐시 사이즈 0일 경우 매회 cache miss
        if (cacheSize === 0) {
            resultTime = 5 * (cities.length);
        }
        //B. 캐시 사이즈 1 이상
        //B-1. 도시 개수 <= 캐시 크기(캐시 넉넉해서 삭제 불필요)
        else if (citiesRefined.length < cacheSize) {
            cachePocket.push(citiesRefined[i]);
            resultTime += 5;

        } else {
            //B-2. 도시 개수 >= 캐시 크기
            //캐시주머니에 해당 도시 존재하지 않는다면,
            if (cachePocket.indexOf(citiesRefined[i]) < 0) {
                //캐시 주머니의 가장 오래된 요소를 지우고 return
                if (cachePocket.length >= cacheSize) {
                    cachePocket.shift();
                }
                cachePocket.push(citiesRefined[i]);
                resultTime += 5; //cache miss
            } else {
                //해당 도시가 도시 배열에 이미 존재한다면,
                resultTime += 1; //cache hit
                cachePocket.splice(cachePocket.indexOf(citiesRefined[i]), 1);
                cachePocket.push(citiesRefined[i]);
            }
        }
    }
    return cachePocket, resultTime;
}
// console.log(solution3(3, ["Jeju", "Pangyo", "NewYork", "newyork", "hi"])); //16 
// console.log(solution3(2, ["Jeju", "Pangyo", "NewYork"])); //16 
// console.log(solution3(4, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"])); //25 ()

//
//기능개발 문제
//

function solution4(progresses, speeds) {
    const answer = [];
    const requiredDays = [];
    const releaseDates = [];

    for (let i = 0; i < progresses.length; i++) {
        //각 작업마다 소요되는 일수 담은 배열
        requiredDays.push(Math.ceil((100 - progresses[i]) / speeds[i]));

        //각 작업의 실제 배포일 배열
        if (i === 0 || releaseDates[i - 1] <= requiredDays[i]) {
            releaseDates.push(requiredDays[i]);
        } else {
            releaseDates.push(releaseDates[i - 1]);
        }

    }

    for (let j = 0; j < releaseDates.length; j++) {
        //배포되는 작업 개수 배열
        if (j === 0 || releaseDates[j - 1] !== releaseDates[j]) {
            answer.push(1);
        } else {
            answer[answer.length - 1]++;
        }
    }

    // console.log("requiredDays", requiredDays);
    // console.log("releaseDates", releaseDates);

    return answer;
}
// console.log(solution4([93, 30, 55], [1, 30, 5])); //[2,1] (7일째에 2개 배포, 9일째에 1개 배포)
// console.log(solution4([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])); //[1, 3, 2] (5일 10일 20일)


//
//후보키 문제
//

function solution5(relation) {
    const cols = relation[0].length; // 컬럼 길이
    const rows = relation.length; //로우 길이
    const sets = Math.pow(2, cols); //b00001을 cols만큼 왼쪽으로 옮기기(2의 cols승) => 컬럼의 조합의 숫자
    const sk = new Set();

    //모든 세트 반복
    for (let i = 1; i < sets; i++) {
        const tmp = new Set();
        //row&cols 반복
        for (let row = 0; row < rows; row++) {
            let key = '';
            for (let col = 0; col < cols; col++) {
                if (i & (Math.pow(2, cols))) key = String(key) + String(relation[row][col])
            }
            tmp.add(key)
        }
        if (tmp.size === rows) sk.add(i)
    }

    for (let i of sk) {
        for (let j of sk) {
            if (i >= j) continue
            if ((i & j) === i) sk.delete(j)
        }
    }

    console.log(Array.from(sk).map(e => e.toString(2)))

    return sk.size
}

const a = [
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"]
];
console.log(solution5(a));