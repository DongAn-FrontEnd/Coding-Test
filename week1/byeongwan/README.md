# 1. K번째 수
''' javascript
    function solution(array, commands) {
    var answer = [];

    for (var i = 0; i < commands.length; ++i) {
        var temp = array.slice(commands[i][0] - 1, commands[i][1]);
        temp.sort(function(a, b){
            return a - b;
        });
        answer.push(temp[commands[i][2] - 1])
    }

    return answer;
}
'''
---
테스트 1 〉	통과 (2.04ms, 37.8MB)
테스트 2 〉	통과 (2.02ms, 37.5MB)
테스트 3 〉	통과 (2.10ms, 37.5MB)
테스트 4 〉	통과 (2.13ms, 37.5MB)
테스트 5 〉	통과 (2.10ms, 37.4MB)
테스트 6 〉	통과 (2.15ms, 37.6MB)
테스트 7 〉	통과 (2.15ms, 37.4MB)
---