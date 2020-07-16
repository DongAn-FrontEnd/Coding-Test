//숫자야구

function solution(baseball) {
  var arr = new Array(988).fill(1);
  baseball.forEach((element) => {
    let value = String(element[0]);
    let strike = element[1];
    let ball = element[2];

    for (let i = 123; i <= 987; i++) {
      if (arr[i] === 0) continue;
      let str = String(i);
      if (str[0] === str[1] || str[0] === str[2] || str[1] === str[2]) {
        arr[i] = 0;
        continue;
      }
      if (str.indexOf("0") > -1) {
        arr[i] = 0;
        continue;
      }

      //strike 조건 - 인덱스, 숫자 일치
      let match = str.split("").reduce((acc, cur, idx) => {
        return cur === value[idx] ? acc + 1 : acc;
      }, 0);
      if (match !== strike) {
        arr[i] = 0;
        continue;
      }

      //ball 조건 - 인덱스 불일치, 숫자 일치
      let match2 = str.split("").reduce((acc, cur, idx) => {
        const index = value.indexOf(cur);
        return index !== idx && index > -1 ? acc + 1 : acc;
      }, 0);
      if (match2 !== ball) {
        arr[i] = 0;
      }
    }
  });

  return arr.filter((val, idx) => idx >= 123 && val !== 0).length;
}

//FindWords

var countCharacters = function(words,chars){
    var answer = 0;
    words.forEach(element => {
        let clone = [...chars];
        for(let i=0;i<element.length;i++){
            let idx = clone.indexOf(element[i]);
            if(idx > -1 ) clone.splice(idx,1);
       }

        if(clone.length + element.length === chars.length) answer+=element.length;
        console.log(clone);

    });

    return answer;
}

//Runtime : 360ms, 28.39%


var countCharacters = function (words, chars) {
  return words.reduce((acc, cur) => {
    var char = [...chars];
    return [...cur].every((x) => {
      var idx = char.indexOf(x);
      if (idx > -1) return (char[idx] = true);
    })
      ? acc + cur.length
      : acc;
  }, 0);
};

//160ms, 71.61%
//every() - 배열의 모든 요소가 통과하는지. 모든 원소가 조건에 만족하면 true 하나라도 아니면 false리턴

//ForRook

var numRookCaptures = function (board) {
  var pawn = 0;
  var x, y; //rook의 위치
  var a, b;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === "R") {
        x = i;
        y = j;
      }
    }
  }
  /*1. [x,0] ~ [x, y-1]
      2. [x,y+1] ~ [x, 8]
      3. [0,y] ~ [x-1,y]
      4. [x+1,y] ~ [8,y]
    */
  var block = false; //안막힌 상태
  var minus = -1;
  var i = x;
  var j = y;
  while (true) {
    if (j === 0) {
      j = y;
      minus = -minus;
    }
    if (board[i][j] === "B") {
      if (j < y) {
        j = y;
        minus = -minus;
      } else break;
    }
    if (board[i][j] === "p") {
      pawn++;
      if (j < y) {
        j = y;
        minus = -minus;
      } else break;
    }

    j += minus;

    console.log(j);
    if (j === 8) break;
  }

  i = x;
  j = y;
  minus = -1;
  block = false;

  while (true) {
    if (i === 0) {
      i = x;
      minus = -minus;
    }
    if (board[i][j] === "B") {
      if (i < x) {
        i = x;
        minus = -minus;
      } else break;
    }
    if (board[i][j] === "p") {
      pawn++;
      if (i < x) {
        i = x;
        minus = -minus;
      } else break;
    }

    i += minus;

    console.log(i);
    if (i === 8) break;
  }

  return pawn;
};

//carpet

function solution(brown, yellow) {
  var answer = [];
  var x, y;
  var need;
  for (let i = 3; i < (brown + yellow) / 2; i++) {
    if ((brown + yellow) % i === 0) {
      //나눠진다면 여기서부터 brown이 외곽 1줄이 되는지 체크
      x = (brown + yellow) / i; //가로
      y = i; //세로

      //필요한 brown 개수
      need = 2 * (x + y) - 4;
      if (brown === need) {
        answer.push(x, y);
        break;
      }
    }
  }

  return answer;
}