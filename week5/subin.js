

//영어 끝말잇기
//test19만 통과 못함
function solution1(n,words){
    var answer = [];
    var len = 0;
    var i=0;

    //중복됐는지 6이하
    for(i; i < words.length -1; i++){
        console.log("len : "+i);
        var output = words.indexOf(words[i],i+1)
        if(output > -1){
            console.log("output : "+output);
            return [Math.floor(output%n+1) , Math.floor(output/n+1)];
        }
    }
    i = 0;
    //끝말잇기가 정상적인지
    while(len < words.length){
        console.log(" i :"+i);
        console.log(words[i]+ " : "+words[i+1]);
        if(i+1 === words.length){
            console.log("Aa");
            return [0,0];
        }
            if(words[i][words[i].length -1] !== words[i+1][0]){
                console.log(words[i+1]+" index : "+(i+1));
                console.log("i+1 : "+(i+1)+ "/ n+1 : "+(n+1));
            return [Math.floor((i+1)%n+1),Math.floor(((i+1)/n)+1)];
        }
        len++;
        i++;

    }
    return [0,0];
}


function solution(n, words){
    var answer = [];
    var len = 0;
    var i;
    for(i=0;i<=words.length-1;i++){
        //중복이 있는지
        answer.push(words[i]);
        for(var j=i; j>=0;j--){
            if(j===i) continue;
            if(words[i]===words[j]){
                return [Math.floor(i%n+1) , Math.floor(i/n+1)];
            }
        }
        //끝말잇기가 되는지
        if(i+1 > words.length-1) return [0,0];
        if(words[i][words[i].length -1] !== words[i+1][0]){
        return [Math.floor((i+1)%n+1),Math.floor(((i+1)/n)+1)];
        }
    }

    return[0,0];
}



//스킬트리
//네개만 통과함...
function solution(skill, skill_trees){
    var answer = 0;
    for(var v of skill_trees){
        var arr = new Array(26).fill(0);
        var index = 1;
        for(var i=0;i<skill.length;i++){
            var output = v.indexOf(skill[i]);
            if(output > -1){
                arr[output] = index;
            }
            index++;
        }

        var max=0;
        var flag=1;
        console.log("v : "+v);
        console.log(arr)
        var one = arr.indexOf(1);
        if(one > -1){
            arr = arr.filter(value=>value > 0);
            console.log("arr : "+arr);
            for(var i=0;i<arr.length;i++){
                if(arr[i] === max+1 ) max = arr[i];
                else {
                    flag = 0;
                    break;
                }
            }
            
        }else flag = 0;
        if(flag === 1) answer++;
    }
    return answer;
}

//console.log(solution("CBD",["BACDE","CBADF","AECB","BDA","AQWER"]));
//console.log(solution("CBD",["CXF","ASF","BDF","CEFD"]));
console.log(solution("ZXN",["ABCDE","BCDEDA"]))

//쇠막대기
//막대가 하나 추가될 때 막대++, 조각++
//레이저가 나타나면 막대 개수만큼 조각이 추가 
function solution(arrangement){
    var arr = arrangement.split('');
    var top;
    var prev;
    var pipe = 0;
    var answer = 0;
    console.log(arr);
    while(arr.length > 0){
        top = arr.length - 1;
        prev = top -1;
        if(arr[top]===')' && arr[prev]==='('){
            //레이저
            arr.pop();
            arr.pop();
            answer += pipe ;
            continue;
         }
        if(arr[top]===')'){  
            pipe++;
            answer++;
        }
        else pipe--;
        arr.pop();
    }
    return answer;
}

console.log(solution("()(((()())(())()))(())"));

H-Index
function solution1(citations){
    var answer = 0;
    citations.sort((a,b)=> b-a);
    console.log(citations);
    var index = Math.floor(citations.length /2);
    var left = 0;

    var h = citations.filter(value => value >= citations[index]).length;
    var prev = citations[index];
    if(h >= citations[index]){
        left = 1;
        index--;
    }else{
        index++;
    }
    console.log("left : "+left);
    while(index < citations.length && index >= 0){
        //citations[index] 이상 인용된 논문 h편
        h = citations.filter(value => value >= citations[index]).length;
        if(left === 1){
            if(h < citations[index]) return prev;
            else {
                console.log("index : "+index);
                prev = citations[index];
                index--;
            }
        }
        else{
            if(h >= citations[index]) return prev;
            else{
                prev = citations[index];
                index++;
            }
        }
    }
    
    return prev;
}

function solution2(citations){
    var h;
    var prev = 0;
    for(var i=0;i<=10000;i++){
        h = citations.filter(value => value >= i).length;
        if(i <= h){
            //i번 이상 인용된 논문 숫자 - h
            prev = i;
        }else return prev;
    }
};

//파일명 정렬
//안됨!! index를 어떻게 넣어야 할 지...?
function solution(file){
    var files = file.map((file,index)=>({file,index}));
    
    var compare = function(a,b){
        a = a.toLowerCase();
        b = b.toLowerCase();
        var flag1=0,flag2=0;
   
        var x = {HEAD : 0,NUMBER : '0',TAIL : 0};
        var y = {HEAD : 0,NUMBER : '0',TAIL : 0};
        for(var i=0;i<a.length;i++){
            if(flag1 === 0 && isNaN(a[i])){
                //HEAD
                x.HEAD += String(a[i]);
            }else if(flag1 === 1 && isNaN(a[i])){
                //TAIL
                x.TAIL += a[i];
            }else{
                //NUMBER
                x.NUMBER += String(a[i]);
                flag1 = 1;
            }
        }

        for(var j=0;j<b.length;j++){
            if(flag2 === 0 && isNaN(b[j])){
                //HEAD
                y.HEAD += b[j];
            }else if(flag2 === 1 && isNaN(b[j])){
                //TAIL
                y.TAIL += b[j];
            }else{
                //NUMBER
                y.NUMBER += String(b[j]);
                flag2 = 1;
            }
        }

        var seq = 0;

     
        if(x.HEAD === y.HEAD) seq = 1;
        else if(x.HEAD < y.HEAD){
        
            //더 크다 === 뒤로 가야함
            return -1;
        }else return 1;
        
        if(parseInt(x.NUMBER) === parseInt(y.NUMBER)) seq = 2;
        else if(parseInt(x.NUMBER) < parseInt(y.NUMBER)){
            return -1;
        }else return 1;
        return 0;

    };
    files.sort((a,b)=>{
        var result = compare(a.file,b.file);
        return result === 0 ? a.index - b.index : result;
    });
    return files.map(value => value.file);

}

//console.log(solution(["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"]))
//console.log(solution(["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"]));
//console.log(solution(["F23","F15"]));

