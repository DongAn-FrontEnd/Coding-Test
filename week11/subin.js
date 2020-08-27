

// var sortArr = function (barcodes) {
//   barcodes.sort((a, b) => {
//     return b[1] - a[1];
//   });
// };

// var rearrangeBarcodes = function(barcodes){
    
    // let ele = {};
    // for(let i=0;i<barcodes.length;i++){
    //     if(ele[barcodes[i]] === undefined) ele[barcodes[i]] = 1;
    //     else ++ele[barcodes[i]];
    // }
   
    // let sortable = [];
    // for (var val in ele){ //val = key
    //     sortable.push([val,ele[val]]);
    // }
   
//     sortable.sort((a,b)=>{
//         return b[1] - a[1];
//     })

//     console.log(sortable);

//     const ret = [];
//     ret[0] = sortable[0][0];
//     sortable[0][1]--;
//     console.log("ret[0] : "+ret[0]);
//     let idx = 1;
//     while(idx<barcodes.length){
//         let idx1 = 0;
//         while(idx1<sortable.length){
//             console.log("aa : "+sortable[idx1][0]+" bb : "+ret[idx-1]);
//             if(sortable[idx1][0] === ret[idx-1] ){
//                  idx1++;
//                  console.log("b");
//             }
//             else{
//                 console.log("a : "+sortable[idx]);
//                 ret[idx] = sortable[idx1][0];
//                 sortable[idx1][1]--;
//                 idx++;
//                 break;
//             }
//         }
//         sortArr(sortable);
//         console.log(sortable);
//     }
    
//     return ret;
    
// }

var rearrangeBarcodes = function (barcodes) {
  let keyArr = [];
  let valueArr = [];
  let keyIdx = 0;
  for (let i = 0; i < barcodes.length; i++) {
    let find = keyArr.findIndex((val, idx) => val === barcodes[i]);

    if (find >= 0) {
      //갖고 있다면
      valueArr[find]++;
    } else {
      keyArr[keyIdx] = barcodes[i];
      valueArr[keyIdx] = 1;
      keyIdx++;
    }
  }

  let integratedArr = [];
  for (let i = 0; i < keyArr.length; i++) {
    integratedArr[i] = [keyArr[i], valueArr[i]];
  }

  //----
  sortArr(integratedArr);
  let answer = [];
//   let conditionIdx = 1;
//   answer[0] = integratedArr[0][0];
//   integratedArr[0][1]--;

//   while (conditionIdx < barcodes.length) {
//     sortArr(integratedArr);
//     let conditionIdx2 = 0;
//     while (conditionIdx2 < integratedArr.length) {
//       if (answer[conditionIdx - 1] !== integratedArr[conditionIdx2][0]) {
//         //같지 않다면 answer에 넣는다

//         answer[conditionIdx] = integratedArr[conditionIdx2][0];
//         integratedArr[conditionIdx2][1]--;
//         conditionIdx++;
//         break;
//       } else {
//         conditionIdx2++;
//       }
//     }
//   }

  let idx = 0;
  for(let i=0;i<integratedArr.length;i++){
      for(let j=0;j<integratedArr[i][1];j++){
        answer[idx] = integratedArr[i][0];
        idx += 2;
        if(idx >= barcodes.length) idx=1;
      }
  }

 return answer;
};


//console.log(rearrangeBarcodes([1,1,1,1,2,2,3,3]));

//Jump Game3
var canReach = function(arr,start){
    let stack = [];
    let step = Array(arr.length).fill(false);
    stack[0] = start;

    while(stack.length > 0){
        let pop = stack.shift(); //첫번째 element 뽑기
        step[pop] = true;
        if(arr[pop] === 0) return true; 

        let one = pop + arr[pop];
        let two = pop - arr[pop];
        if(one >= 0 && arr.includes(arr[one]) && step[one] === false) stack.unshift(one);
        if(two >= 0 && arr.includes(arr[two]) && step[two] === false) stack.unshift(two);
    }

    return false;
}


//console.log(canReach([0,3,0,6,3,3,4],6));

//Remove K Digits
var removeKdigits = function(num, k){
    let cloneSmall = num.slice();
    num = num.split('');
    let answer = [];
    let start=0;
    for(let i=0;i<num.length-k;i++){
      let smallest = Number(cloneSmall);
        for(let j=start;j<=k+i;j++){
            if(smallest > num[j]){
              smallest = num[j];
              start = j+1;
            }
        }
      
        answer.push(smallest);
       
    }
    return String(Number(answer.join('')));
}




console.log(removeKdigits("1432219",2));