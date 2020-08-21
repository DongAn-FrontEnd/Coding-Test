/* ======================== 57. Insert Interval ======================== */

/* ============== 첫번째 시도, faster than 58.33% of JavaScript ============== */
// /**
//  * @param {number[][]} intervals
//  * @param {number[]} newInterval
//  * @return {number[][]}
//  */
// var insert = function(intervals, newInterval) {
//   let result = [];

//   for(var i=0 ; i<intervals.length ; i++) {
//     if(intervals[i][1] < newInterval[0]) {
//       result.push(intervals[i]);
//     }
//     else if(intervals[i][0] > newInterval[1]) {
//       result.push(newInterval);
//       newInterval = intervals[i];
//     }
//     else if(intervals[i][0] <= newInterval[1] || intervals[i][1] >= newInterval[0])
//       {
//       newInterval = [
//         Math.min(intervals[i][0], newInterval[0]),
//         Math.max(intervals[i][1], newInterval[1])
//       ];
//     }
//   }
//   result.push(newInterval);

//   return result;
// };


/* ========================  2번째, 이진 탐색 사용 ========================
faster than 73.23% of JavaScript
*/
var insert = function(intervals, newInterval) {
  let result = [];

  if(intervals.length == 0) {
    return [newInterval];
  }

  var p = helper(intervals, newInterval);
  result = intervals.slice(0, p);

  for(var i=p ; i<intervals.length ; i++) {
    if(intervals[i][1] < newInterval[0]) {
      result.push(intervals[i]);
    }
    else if(intervals[i][0] > newInterval[1]) {
      result.push(newInterval);
      newInterval = intervals[i];
    }
    else if(intervals[i][0] <= newInterval[1] || intervals[i][1] >= newInterval[0])
      {
      newInterval = [
        Math.min(intervals[i][0], newInterval[0]),
        Math.max(intervals[i][1], newInterval[1])
      ];
    }
  }
  result.push(newInterval);

  return result;
};

// intervals 의 시작점 보다 newInterval 의 시작점이 큰 곳 찾음
function helper(intervals, newInterval) {
  var low = 0;
  var high = intervals.length - 1;        // intervals[i][0] <= newIntervals[0] 인 인덱스

  while(low<high) {
    var mid = low + parseInt((high - low) / 2);
    if(newInterval[0] <= intervals[mid][0]) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return high == 0 ? 0 : high - 1;
}



/* ================================== 75. Sort Colors ================================== */

/* ================  첫번째 시도, faster than 33.53% of JavaScript ================ */
// /**
//  * @param {number[]} nums
//  * @return {void} Do not return anything, modify nums in-place instead.
//  */
// var sortColors = function(nums) {
//   nums.sort((a, b) => a - b);

//   return nums;
// };


/* ================ 두번째 시도, faster than 58.77% of JavaScript ================ */
// /**
//  * @param {number[]} nums
//  * @return {void} Do not return anything, modify nums in-place instead.
//  */
// var sortColors = function(nums) {
//   let result = [0,0,0];
//   let min_num = 2;

//   nums.forEach(el => {
//     result[el]++;
    
//   })

//   min_num = Math.min(...nums);

//   for(var i=0 ; i<nums.length ; i++) {
//     nums[i] = min_num;
//     result[min_num]--;
//     while(result[min_num] == 0 && min_num <= 2)
//       min_num++;
//   }

//   return;
// };

/* ================ 세번째 시도, faster than 95.67% of JavaScript ================ */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var sortColors = function(nums) {
  let hash = {}
  let i = 0;

  nums.forEach(el => {
    hash[el] ? hash[el]++ : (hash[el] = 1);
  });

  [0, 1, 2].forEach(key => {
    while( --hash[key] >= 0) {
      nums[i++] = key;
    }
  });

  return null;
};



/* =============================== 179. Largest Number =============================== */
// faster than 92.02% of JavaScript
/**
 * @param {number[]} nums
 * @return {string}
 */

function ff(a, b) {
  return a + b > b + a ? -1 : 1;
}

var largestNumber = function(nums) {
  nums.sort((a, b) => ff(String(a), String(b)));

  return nums[0] === 0 ? "0" : nums.join("");
}



/* ================================== 242. Valid Anagram ================================== */
// faster than 93.93%
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  let s_hash = { };
  let t_hash = { };

  // init hash
  for(let init_c = ("a").charCodeAt(0) ; init_c < ("z").charCodeAt(0) + 1 ; init_c++) {
    s_hash[String.fromCharCode(init_c)] = 0;
    t_hash[String.fromCharCode(init_c)] = 0;
  }
  
  s.split("").forEach(c => {
    s_hash[c]++;
  });

  t.split("").forEach(c => {
    t_hash[c]++;
  });

  for(let init_c = ("a").charCodeAt(0) ; init_c < ("z").charCodeAt(0) + 1 ; init_c++) {
    if(t_hash[String.fromCharCode(init_c)] != s_hash[String.fromCharCode(init_c)])
      return false;
  }

  return true;
};





/* ================================== 493. Reverse Pairs ==================================*/
/* 첫번째 트라이, Runtime: 548 ms, faster than 9.09% of JavaScript */

// var reversePairs = function(nums) {
//   const [start, end] = [0, nums.length - 1];
//   return mergeSort(nums, start, end);
// };
// 
// 
// // i > j * 2 라는 조건을 이용하여 합병 정렬을 이용한다.
// // 부분 리스트가 정렬된 것과 처음 배열에서 답을 구하는 것은 같다.
// 
// // ex) [1, 5, 3, 4, 1] => 3
// //
// // [1, 5], [3, 4, 1] => 0, 2 (올라간 j를 더함)
// // 정렬 [1, 5], [1, 3, 4]
// // [1, 5, 1, 3, 4] => 1
// // => 0 + 2 + 1 = 4
// function mergeSort(list, start, end) {
//   const mid = start + parseInt((end - start) / 2);
//   let cnt = 0;
// 
//   // 재귀 탈출 조건 start는 무조건 end 이하임
//   if(start >= end)
//     return 0;
// 
//   cnt = mergeSort(list, start, mid) + mergeSort(list, mid + 1, end);
// 
//   // i 는 비교할 수가 있는 인덱스
//   // j 는 비교당하는 수가 있는 인덱스
//   for(var [i, j] = [start, mid + 1] ; i <= mid ; i++) {
//     // 이미 크기 순으로 정렬된 배열들이니 
//     // i > j * 2 이 아닌 경우 현재 i에서 j 뒤로 가도 식을 만족할 수 가 없음
//     // 따라서, 다음 i를 j와 비교해야함
//     while(list[i] > list[j] * 2 && j <= end) {
//       j++;
//     }
// 
//     // 지금까지 조건에 맞아 상승한 j만큼 더함
//     cnt += j - (mid + 1)
//   }
// 
//   sortSubArr(list, start, end + 1);
// 
//   return cnt;
// }
// 
// function sortSubArr(list, start, end) {
//   const subList = list.slice(start, end);
// 
//   subList.sort((a, b) => a - b);
//   list.splice(start, end - start, ...subList);
// }
// 


/* 두번째 트라이, Runtime: 236 ms, faster than 50.00% of JavaScript */

var reversePairs = function(nums) {
  const [start, end] = [0, nums.length - 1];
  return mergeSort(nums, start, end);
};


// i > j * 2 라는 조건을 이용하여 합병 정렬을 이용한다.
// 부분 리스트가 정렬된 것과 처음 배열에서 답을 구하는 것은 같다.

// ex) [1, 5, 3, 4, 1] => 3
//
// [1, 5], [3, 4, 1] => 0, 2 (올라간 j를 더함)
// 정렬 [1, 5], [1, 3, 4]
// [1, 5, 1, 3, 4] => 1
// => 0 + 2 + 1 = 4
function mergeSort(list, start, end) {
  const mid = start + parseInt((end - start) / 2);
  let cnt = 0;

  // 재귀 탈출 조건 start는 무조건 end 이하임
  if(start >= end)
    return 0;

  cnt = mergeSort(list, start, mid) + mergeSort(list, mid + 1, end);

  // i 는 비교할 수가 있는 인덱스
  // j 는 비교당하는 수가 있는 인덱스
  for(var [i, j] = [start, mid + 1] ; i <= mid ; i++) {
    // 이미 크기 순으로 정렬된 배열들이니 
    // i > j * 2 이 아닌 경우 현재 i에서 j 뒤로 가도 식을 만족할 수 가 없음
    // 따라서, 다음 i를 j와 비교해야함
    while(list[i] > list[j] * 2 && j <= end) {
      j++;
    }

    // 지금까지 조건에 맞아 상승한 j만큼 더함
    cnt += j - (mid + 1)
  }

  sortSubArr(list, start, end, mid);

  return cnt;
}

// 소팅 부분 변경
function sortSubArr(list, start, end, mid) {
  const temp = new Array(end - start + 1);
  let count = 0;
  let left_idx = start;
  let right_idx = mid + 1;

  // 왼쪽 인덱스가 절반까지 혹은 오른쪽 인덱스가 마지막까지인지
  while( left_idx <= mid && right_idx <= end ) {
    if(list[left_idx] < list[right_idx]) {
      temp[count++] = list[left_idx++];
    } else {
      temp[count++] = list[right_idx++];
    }
  }

  // 남은 left 확인
  while(left_idx <= mid) {
    temp[count++] = list[left_idx++];
  }

  // 남은 right 확인
  while(right_idx <= end) {
    temp[count++] = list[right_idx++];
  }

  for(var j=0 ; j < temp.length ; j++) {
    list[start + j] = temp[j];
  }
}





