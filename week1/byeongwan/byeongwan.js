// K번째 수
function solution1(array, commands) {
  var answer = [];

  for (var i = 0; i < commands.length; ++i) {
    var temp = array.slice(commands[i][0] - 1, commands[i][1]);
    temp.sort(function (a, b) {
      return a - b;
    });
    answer.push(temp[commands[i][2] - 1]);
  }

  return answer;
}

// 같은 숫자는 싫어
function solution2(arr) {
  var answer = [];
  answer.push(arr[0]); // 비어있으니 넣고 시작

  for (var i = 1; i < arr.length; ++i) {
    var temp = arr[i]; // 배열의 요소를 순차적으로 temp에 담기
    if (answer[answer.length - 1] != temp) {
      // 제일 뒷자리와 temp값 비교
      answer.push(temp); // 다르면 temp를 추가
    }
  }
  return answer;
}

// 완주하지 못한 선수
function solution3(participant, completion) {
  var answer = "";

  // 완주자 해시맵을 만들어서 이름별로 몇명이 완주했는지 구축
  var completionMap = new Map();
  for (var i = 0; i < completion.length; ++i) {
    var value = completionMap.get(completion[i]);
    if (value !== undefined) {
      ++value;
      completionMap.set(completion[i], value);
    } else {
      completionMap.set(completion[i], 1);
    }
  }

  // 참가자 목록별로 비교한다
  for (var i = 0; i < participant.length; ++i) {
    var value = completionMap.get(participant[i]);
    // 같은 이름이 있다면 빼고, 0보다 작으면 비완주자 return
    if (value !== undefined) {
      --value;
      if (value < 0) {
        return participant[i];
      }
      completionMap.set(participant[i], value);
    }
    // 같은 이름이 없다면 비완주자 return
    else {
      return participant[i];
    }
  }
  return answer;
}
