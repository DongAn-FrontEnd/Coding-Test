//242. Valid Anagram

var isAnagram = function(s,t){
    if(s.length === t.length){
        for(let i=0;i<s.length;i++){
            if(t.includes(s[i])) t = t.replace(s[i]," ");
            else return false;
        }
        return true;
    }else return false;
}

//console.log(isAnagram("anagram","nagaram"));

// var sortColors = function (nums) {
//   var colorLen = nums.length / 3;
//   nums = [];
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < colorLen; j++) {
//       nums.push(i);
//     }
//   }
//   console.log(nums);
// };


//nums = [0,0,0,1,1,2,2,2,2]

var sortColors = function(nums){
    count = [0,0,0];
    for(let i=0;i<nums.length;i++){
        count[nums[i]]++;
    }

    for(let i=0;i<nums.length;i++){
        if(i <= count[0] - 1) nums[i] = 0;
        else if(i <= count[0]+count[1]-1) nums[i] = 1;
        else nums[i] = 2;
    }
}


//console.log(sortColors([2,0,2,1,1,0]));

//Largest Number
var largestNumber = function(nums){
    var zero = nums.reduce((acc,cur)=>acc+cur);
    if(zero===0) return "0";

   
    //큰 게 앞에 
    nums.sort((a,b)=>{
        var stA = a.toString()
        var stB = b.toString();
        if(Number(stA+stB) < Number(stB+stA)){
            console.log(Number(stA+stB)+" < "+Number(stB+stA));
            //b>a
            return 1; 
        }else return -1;
    })


    var answer = "";
    for(var a of nums){
        answer += a.toString();
    }
   return answer;
    console.log(answer);
}

//console.log(largestNumber([3,30,34,5,9]));


//Reverse Pairs
// var reversePairs = function(nums){
//     let count=0;
//     for(let i=0;i<nums.length-1;i++){
//         for(let j=i+1;j<nums.length;j++){
//             if(nums[i] > nums[j]*2) count++;
//         }
//     }
//     return count;
// }
//--> Time Limit Excceded

// var reversePairs = function(nums){
//     // j : n-(i+1) //i+1개 

//     let count = 0;
//     for(let i=0;i<nums.length;i++){
//         for(let j=0;j<i;j++){
//             if(nums[j]>nums[i]*2) count++;
//         }
//     }
// }


console.log(reversePairs([1,2,3,4,5]));