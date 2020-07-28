
//N-th Tribonacci Number
var tribonacci = function(n) {
    var zero = 0;
    var one = 1;
    var two = 1;
    var answer=0;
    if(n === 0) return 0;
    else if (n === 1) return 1;
    else if (n === 2) return 1;
    for(var i=3;i<=n;i++){
        answer = one + two + zero;
        zero = one;
        one = two;
        two = answer;
    }
    
    return answer;
    
};


// var tribonacci = function(n) {
//     if(n === 0) return 0;
//     else if (n === 1) return 1;
//     else if (n === 2) return 1;
    
//     return tribonacci(n-1) + tribonacci(n-2) + tribonacci(n-3);
    
// };

var tribonacci = function(n){
    var dp = [];
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;
    for(var i=3;i<=n;i++){
        dp[i] = dp[i-1] + dp[i-2] + dp[i-3];
    }

    return dp[n];
}

// console.log(tribonacci(4));

// function solution(n){
//     if(n === 0) return 0;
//     if(n === 1) return 1;
//     if(n === 2) return 1;
//     var a = 0;
//     var b,c = 1;

//     return getTribonacci(a,b,c,n,2);

// };

// function getTribonacci(a,b,c,n,count){
//     next_num = a+b+c;
//     a = b;
//     b = c;
//     c = next_num;

//     if(count == n) return c;
//     else return getTribonacci(a,b,c,n,count);

// }

//Maximum call stack size exceeded

//-----------------------------------

//Split a String in Balanced Strings
var balancedStringSplit = function(s) {
    var Rlen = 0;
    var Llen = 0;
    var output=0;
    for(var i=0;i<s.length;i++){
        if(s[i]==='R') Rlen++;
        else Llen++;
        
        if(Rlen === Llen){
            Rlen = 0;
            Llen = 0;
            output++;
        }
        return output;
    }
};

console.log(balancedStringSplit('RLRRLLRLRL'));

//---------------------
//Majority Element
var majorityElement = function(nums) {
    var arr = new Map();
    var max = [0,0]; // 값 횟수
    for(var i=0;i<nums.length;i++){
        if(arr.has(nums[i])){
            var val = arr.get(nums[i]);
            arr.set(nums[i],++val);
            console.log(nums[i],arr.get(nums[i]));
        }else{
            arr.set(nums[i],1);
        }

        var value = arr.get(nums[i]);
        if(value>=max[1]){
            max[0] = nums[i];
            max[1] = value;
        }
    }  
    return max[0];
};

//console.log(majorityElement([1]));

//Divisor Game
var divisorGame = function(N){
    return N % 2 === 0 ? true : false;
}

var divisorGame = function(N){
    var dp = [];
    dp[1] = 0; // Alice's move : 0 -- false;
    dp[2] = dp[1] + 1; // Alice's Move : 0 + 1 -- true
    
    for(var i=3;i<=N;i++){
        dp[i] = dp[i-1] + 1;
    }
    return dp[N] % 2 === 0 ? false : true;
}

//console.log(divisorGame(4));

//----------
//Maximum Subarray
var maxSubArray = function(nums){
    

    

   
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));

//---------------
//Minimum Subsequence in Non-Increasing Order
var minSubsequence = function(nums) {
    nums.sort((a,b)=> b-a);
    var total = nums.reduce((acc,cur)=>acc+cur);
    var i = 0;
    var ret = 0;
    while(true){
        ret += nums[i];
        if(ret > Math.floor(total/2)) break;
        i++;
    }

    var arr = [];
    for(var j = 0 ; j<= i;j++){
        arr.push(nums[j]);
    }
    return arr;
};

// console.log(minSubsequence([4,3,10,9,8]));