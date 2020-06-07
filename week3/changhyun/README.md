
## 1. [1차] 다트 게임
  
trial 1
```js
// 실패한 풀이
  function solution1(dartResult) {
    var answer = 0;
    var charValue = {
      S: 1,
      D: 2,
      T: 3,
      "*": 2,
      "#": -1,
    };
    const calc = [];
  
    for (let i = 0; i < dartResult.length; i++) {
      const prev = +dartResult[i - 1]
        ? +dartResult[i - 1] // prev가 1~9일 경우 그대로 리턴
        : +dartResult[i - 2] // 10인지를 체크하기 위해 prev 앞의 문자를 체크
        ? 10
        : 0;
      const current = dartResult[i];
      const next = dartResult[i + 1];
  
      if (current >= "D") { // current가 S D T인 경우 
        if (next === "*" || next === "#") { // 다음 값에 * #이 있는지 확인하고
          calc.push([Math.pow(prev, charValue[current]), charValue[next]]); //있을 경우, 곱해질 값 2, -1을 포함해 calc에 push
        } else {
          calc.push([Math.pow(prev, charValue[current]), 1]); // 없을 경우, 곱해질 값으로 1을 push
        }
      }
    }
    calc.forEach((each) => { // calc에 들어온 num, mul을 통해 answer를 구함.
      const [num, mul] = each;
      if (mul === -1) {
        answer += num * mul;
      } else {
        answer += num;
        answer *= mul;
      }
    });
  
    return answer;
  }
  /*
  문제에 대한 이해 부족으로 '*'일 경우, 바로 전 숫자에 대해 *2를 하지 않고, 앞에 있는 모든 숫자에 대해 *2를 실행했음.
  모든 테케를 통과하지 못함.
  */
  
  ```
  
  trial 2
  ```js
  function solution1(dartResult) {
    var answer = 0;
    const symbol = {
      D: 2,
      S: 1,
      T: 3,
      "*": 2,
      "#": -1,
    };


    // 앞의 숫자를 참조하기 위해 배열과 포인터 생성
    const powNums = []; 
    let idx = 0; 
  
    for (let i = 0; i < dartResult.length; i++) {
      const prev = dartResult[i - 1]; // 0~9 판별
      const prev2 = +dartResult[i - 2]; // 10/0 판별
      const current = dartResult[i]; // 'S,D,T' 판별
      const next = dartResult[i + 1]; // *, # 판별
  
      // 우선, 숫자를 넣고
      if (current > "C") { 
        const value = +prev ? +prev : prev2 ? 10 : 0; 
        // prev가 truthy(0~9)일 경우 prev를 리턴하고, 아닌 경우, 10인지를 판별해 10/0 리턴
        const powValue = Math.pow(value, symbol[current]);
        // prev^current을 통해 powValue 계산
        powNums.push(next === "#" ? powValue * -1 : powValue);
        // next가 #일 경우 -1을 곱해 push
        idx++;
      }

      // current가 *일 경우, push된 값을 조정 
      if (current === "*") {
        powNums[idx - 2] *= 2;
        powNums[idx - 1] *= 2;
      }
    }
  
    return powNums.reduce((a, b) => a + b, 0);
    // powNums를 모두 더해 리턴
  }
  ```

  ### 설명

  배열의 unshift / shift는 cost가 크게 발생해
  이전 값을 참조하기 위해 포인터 idx를 만들어둠.
  string을 돌며 숫자를 push할 떄마다 idx를 증가시키고,
  '*' 문자를 만날 경우 idx-2, idx-1을 통해 이전 값을 참조함.
  
  다른 사람 풀이에서는, idx를 사용하지 않고 .length를 통해 값을 참조함.


   테스트 1 〉	통과 (1.77ms, 37.5MB)
   테스트 2 〉	통과 (1.71ms, 37.5MB)
   테스트 3 〉	통과 (1.68ms, 37.4MB)
   테스트 4 〉	통과 (1.72ms, 37.5MB)
   테스트 5 〉	통과 (1.77ms, 37.4MB)
   테스트 6 〉	통과 (1.65ms, 37.5MB)
   테스트 7 〉	통과 (1.66ms, 37.5MB)
   테스트 8 〉	통과 (1.77ms, 37.5MB)
   테스트 9 〉	통과 (1.68ms, 37.5MB)
   테스트 10 〉	통과 (1.70ms, 37.8MB)
   테스트 11 〉	통과 (1.73ms, 37.4MB)
   테스트 12 〉	통과 (1.73ms, 37.6MB)
   테스트 13 〉	통과 (1.66ms, 37.5MB)
   테스트 14 〉	통과 (1.80ms, 37.7MB)
   테스트 15 〉	통과 (1.68ms, 37.5MB)
   테스트 16 〉	통과 (1.76ms, 37.4MB)
   테스트 17 〉	통과 (1.89ms, 37.7MB)
   테스트 18 〉	통과 (1.75ms, 37.5MB)
   테스트 19 〉	통과 (1.65ms, 37.5MB)
   테스트 20 〉	통과 (1.75ms, 37.4MB)
   테스트 21 〉	통과 (1.75ms, 37.4MB)
   테스트 22 〉	통과 (1.71ms, 37.4MB)
   테스트 23 〉	통과 (1.66ms, 37.4MB)
   테스트 24 〉	통과 (1.67ms, 37.4MB)
   테스트 25 〉	통과 (1.75ms, 37.7MB)
   테스트 26 〉	통과 (1.78ms, 37.7MB)
   테스트 27 〉	통과 (1.71ms, 37.5MB)
   테스트 28 〉	통과 (1.70ms, 37.8MB)
   테스트 29 〉	통과 (1.71ms, 37.5MB)
   테스트 30 〉	통과 (1.87ms, 37.8MB)
   테스트 31 〉	통과 (1.69ms, 37.7MB)
   테스트 32 〉	통과 (1.71ms, 37.5MB)

```js
function othersSolution1(dartResult) {
    var sdt = ["S", "D", "T"];
    var sdtn = [1, 2, 3];
    var opt = ["*", "#"];
    var arr = []; //숫자로 치환후 옵션 처리 제외한 모음
    var num = ""; //두자리 이상 숫자일경우
    var t = dartResult.split("");//한글자씩 자름
    for(var i=0; i<t.length; i++) {
        if(isNaN(t[i])) { //숫자가 아닐때
            if(opt.indexOf(t[i]) == -1) {   // 옵션아닐때
                var tmp = Math.pow(parseInt(num), sdtn[sdt.indexOf(t[i])]);
                arr.push(tmp);
            }else if(opt[1] == t[i]){   //아차상일 경우
                var tmp = arr.pop()*-1;
                arr.push(tmp);
            }else {     //스타상일 경우
                var t1 = arr.pop()*2;
                var t2 = arr.pop()*2;
                if(t2) {
                    arr.push(t2);
                }
                arr.push(t1)
            }
            num = "";
        }else{ // 숫자일때
            num += t[i];
        }
    }
    return arr.reduce((a,b)=>a+b);
}
```

### 다른 사람 풀이 설명

자료를 pop해서 수정하고 수정 후, push하는 방법을 사용 

---

## 2. 소수 찾기
  
trial 1
```js
//효율성 시간 초과
  function solution2(n) {
    var answer = 0;
  
    if (n > 2) {
      let i = 3;
  
      while (i <= n) {
        isPrime(i) && answer++;
        i++;
      }
  
      return ++answer;  //n이 2일 때
    }
    return 1;
  }
  
  function isPrime(n) {
    let i = 2;
    while (i <= Math.sqrt(n)) {
      if (n % i === 0) return false;
  
      i++;
    }
    return true;
  }
  /* 
  isPrime
    2 ~ sqrt값까지 약수인지 판별
  
  solution2
    입력값이 2부터 주어지므로, 2일 경우 1을 return하고
    n이 3일 때부터는, 3부터 n까지 소수인지 판별해 소수일 경우, answer를 증가시킴.
    이 경우, n까지의 정수에 대해 매번 isPrime을 실행하므로 효율성이 꽝.
  */
```

trial 2
```js
//효율성 시간 초과
  
  function solution2(n) {

    if (n === 2) {
      return 1;
    }
    if (n === 3) {
      return 2;
    }
    if (n <= 5) {
      return 3;
    }
    if (n <= 7) {
      return 4;
    }
  
    let answer = 4;
    for (let i = 11; i <= n; i += 2) {
      if (i % 3 == 0) continue;
      if (i % 5 == 0) continue;
      if (i % 7 == 0) continue;
      if (isPrime(i)) {
        answer += 1;
      }
    }
  
    return answer;
  }

  /*
    2,3,5,7까지의 n에 대해 구해진 결과를 리턴하고,
    11부터 홀수에 대해서만 소수를 판별해 소수 판별 시행을 줄여봄.
    3, 5, 7의 배수일 경우 소수 판별 없이 다음 정수로 넘어감.
  */
```
trial 3
```js
  // 효율성 통과
    
  function solution2(n) {
    let answer = 0;
    const primeArr = Array(n + 1).fill(1);
    //인덱스와 정수를 일치시키기 위해 n+1 array 생성
  
    primeArr[0] = 0;
    primeArr[1] = 0;
    //prime이 아닌 0,1은 0으로 체크
  
    fillPrimeArr(2, primeArr);
    fillPrimeArr(3, primeArr);
    fillPrimeArr(5, primeArr);
    fillPrimeArr(7, primeArr);

    for (let i = 11; i <= Math.sqrt(n); i += 2) {
    //11부터 홀수가 prime일 경우, fillPrime 시행
      if (i % 3 === 0) continue;
      if (i % 5 === 0) continue;
      if (i % 7 === 0) continue;
      isPrime(i) && fillPrimeArr(i, primeArr);
    }
  
    for (let tf of primeArr) {
      tf && answer++;
    }
  
    return answer;
  }
  
  function isPrime(num) {
    for (let i = 11; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }
  
  function fillPrimeArr(prime, arr) {
    for (let i = prime * 2; i < arr.length; i += prime) {
      arr[i] = 0;
      //prime은 1로 남기고 prime의 배수는 모두 0으로 체크
    }
  }

``` 

### 설명
  
   2,3,5,7의 조합으로 2~10을 만들 수 있음. 따라서, 모든 소수의 배수는 2,3,5,7의 배수.
   단, 소수 곱하기 소수는 2,3,5,7의 조합으로 만들 수 없다.
   즉, 소수의 배수는 2,3,5,7의 조합으로 만들 수 없다.
   가령, n이 11의 제곱일 경우, 121은 2,3,5,7의 배수로 판별이 불가능.
   따라서 11의 제곱부터 13의 제곱 사이의 정수에 대해서는 소수 11의 배수인지에 대한 판별(fillPrimeArr)이 필요함.

   그러므로 n의 제곱근까지는 홀수에 대해 prime인지를 판별해 fillPrimeArr를 시행한다.
  

   테스트 1 〉	통과 (1.84ms, 37.3MB)
   테스트 2 〉	통과 (2.02ms, 37.3MB)
   테스트 3 〉	통과 (1.87ms, 37.2MB)
   테스트 4 〉	통과 (1.95ms, 37.5MB)
   테스트 5 〉	통과 (1.93ms, 37.6MB)
   테스트 6 〉	통과 (3.05ms, 37.6MB)
   테스트 7 〉	통과 (2.05ms, 37.4MB)
   테스트 8 〉	통과 (2.59ms, 37.4MB)
   테스트 9 〉	통과 (3.37ms, 38.1MB)
   테스트 10 〉	통과 (14.88ms, 40.3MB)
   테스트 11 〉	통과 (30.31ms, 45MB)
   테스트 12 〉	통과 (15.33ms, 40.6MB)

   효율성  테스트
   테스트 1 〉	통과 (34.69ms, 45.6MB)
   테스트 2 〉	통과 (34.33ms, 45.2MB)
   테스트 3 〉	통과 (35.00ms, 45.7MB)
   테스트 4 〉	통과 (34.00ms, 45.1MB)
 
```js
function othersSolution2(n) {
    const s = new Set();
    for(let i=1; i<=n; i+=2){
        s.add(i);
    }
    s.delete(1);
    s.add(2);
    // 2,3,5,7,9,11,13,... 2와 n이하의 홀수
 
    for(let j=3; j<Math.sqrt(n); j++){
        if(s.has(j)){
             for(let k=j*2; k<=n; k+=j){    
                s.delete(k);
             }
             //소수의 배수를 모두 지움.
        }
    }
    return s.size;
}
// trial 3와 반대 방식으로 푼 풀이 
// set을 사용 지니어스..
// 먼저 채우고
// set에 포함되었을 경우, delete
```
테스트 1 〉	통과 (127.86ms, 62.5MB)
테스트 2 〉	통과 (114.94ms, 62.4MB)
테스트 3 〉	통과 (125.80ms, 62.5MB)
테스트 4 〉	통과 (136.61ms, 62.4MB)


```js

function othersSolution2(n){
  let s= [...Array(n).keys()] // [0,1,2,3,4,5,...,n-1,n]
  // console.log(s);
  s[0]=0
  for(let i=2; i<=parseInt(n**.5)+1;i++){
    // console.log(i);

    for (let j=2 ; j<=(n-i)/i+1; j++){ // j <= n/i
      s[i*j-1]=0
    }  
  }
  return s.filter(x=>Boolean(x)).length;
}
```

테스트 1 〉	통과 (89.87ms, 77MB)
테스트 2 〉	통과 (90.15ms, 77.2MB)
테스트 3 〉	통과 (85.44ms, 76.4MB)
테스트 4 〉	통과 (85.02ms, 77.2MB)

---

## 3. 두 정수 사이의 합

```js
function solution3(a, b) {
    return a > b ? (a+b)*(a-b+1)/2 : (a+b)*(b-a+1)/2 
}
// 가우스 덧셈 활용
```

---

## 4. 문자열 내 p와 y의 개수

```js
  function solution4(s){
    let count = 0;
    
    for(let c of s){
        if(c==='p'||c==='P') count++
        if(c==='y'||c==='Y') count--
    }
    
    return count===0 ? true : false
}
```

---

  ## 5. 2016년
  
  ```js
  function solution5(a, b) {
    var day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var dayCount = b;
    dayCount += (a - 1) * 31 - Math.floor((a - 1) / 2);  //홀수달 31 짝수달 30 기준으로 월 별 이전달 일수 계산
    a > 8 && a % 2 === 1 && dayCount++;  //8월부터는 홀수달일 경우 +1
    a > 2 && dayCount--;  //2월은 29일까지이므로 -1
  
    return day[(dayCount + 4) % 7];  1월 1일 금요일에 맞춰 조정
  }
  ```

  ### 설명

  date를 사용하지 않고 풀어본 풀이
  dayCount에 일수를 할당한 후, 월에 따라 dayCount를 증가시킴.
  홀수달을 31일로, 짝수달을 30일로 계산해 a월일 경우, a-1월까지의 일수를 구하고,
  a가 9일때부터 8월달부터 발생하는 오차를 수정
  2월을 포함할 경우 오차 수정
  최종적으로 1월 1일의 index를 기준으로 dayCount를 계산.

   테스트 1 〉	통과 (1.77ms, 37.4MB)
   테스트 2 〉	통과 (1.64ms, 37.5MB)
   테스트 3 〉	통과 (1.61ms, 37.5MB)
   테스트 4 〉	통과 (1.61ms, 37.5MB)
   테스트 5 〉	통과 (1.65ms, 37.5MB)
   테스트 6 〉	통과 (1.67ms, 37.4MB)
   테스트 7 〉	통과 (1.71ms, 37.5MB)
   테스트 8 〉	통과 (1.67ms, 37.6MB)
   테스트 9 〉	통과 (1.63ms, 37.5MB)
   테스트 10 〉	통과 (1.69ms, 37.3MB)
   테스트 11 〉	통과 (1.65ms, 37.4MB)
   테스트 12 〉	통과 (1.67ms, 37.4MB)
   테스트 13 〉	통과 (1.70ms, 37.4MB)
   테스트 14 〉	통과 (1.65ms, 37.5MB)

  ```js
  function solution5(a, b) {
    var day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var date = new Date(2016, a - 1, b);
    return day[date.getDay()];
  }
  ```

---

  ## 6. 가운데 글자 가져오기

  ```js
  function solution6(s) {
    var m = Math.floor(s.length/2);
    return s.length%2===0? s.substring(m-1, m+1):s[m];
  }
  ```

  테스트 1 〉	통과 (1.67ms, 37.3MB)
테스트 2 〉	통과 (1.66ms, 37.3MB)
테스트 3 〉	통과 (1.67ms, 37.3MB)
테스트 4 〉	통과 (1.66ms, 37.2MB)
테스트 5 〉	통과 (1.67ms, 37.4MB)
테스트 6 〉	통과 (1.65ms, 37.5MB)
테스트 7 〉	통과 (1.65ms, 37.2MB)
테스트 8 〉	통과 (1.78ms, 37.5MB)
테스트 9 〉	통과 (1.69ms, 37.5MB)
테스트 10 〉통과 (1.66ms, 37.3MB)
테스트 11 〉통과 (1.69ms, 37.4MB)
테스트 12 〉통과 (1.65ms, 37.2MB)
테스트 13 〉통과 (1.75ms, 37.4MB)
테스트 14 〉통과 (1.63ms, 37.2MB)
테스트 15 〉통과 (1.69ms, 37.5MB)
테스트 16 〉통과 (1.66ms, 37.4MB)