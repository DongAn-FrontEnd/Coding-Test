// py 개수 찾기

function solution(s){
    s = s.toLowerCase();
    var p=0,y=0;
    for(var i = 0 ; i<s.length;i++){
        if(s[i]==='p') p++;
        else if(s[i]==='y') y++;
    }

    return p===y?true:false;
}


//소수 찾기

function solution(n){
    var num = [];
    var i,j,answer = 0;

    for(i=0;i<=n;i++){
        num[i]=0;
        num[1]=1;

    }

    for(i=2;i<=n;i++){
        for(j=2;i*j<=n;j++){
            num[i*j] = 1;
        }
    }

    for(i=1;i<=n;i++){
        if(num[i]!=1) answer++;
    }
    return answer;
}

//두 정수사이의 값

function solution(a, b) {
    var answer = 0;
    var min = a>b ? b : a;
    var max = a>b ? a : b;
    for(var i = min ; i <= max ; i++){
        answer += i;
    }
    
    return answer;
}

function solution(char){
    if (char.length % 2 == 1){ 
        return char[parseInt(char.length/2)]

    }
    else return char[(char.length/2)-1] + char[char.length/2]
}
