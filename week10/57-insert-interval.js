// newInterval이 없다면
// ...interval answer에 push
// ...step++
//
// 겹치면
// ...newInterval 교체
// ...intervals shift
// ...step++
//
// 안겹치면
// ...newInterval, interval 위치 비교해서 앞에있는거만 answer에 push
// ......interval > newInterval (interval이 뒤에 있을 때)
// .........newInterval answer에 push
// .........newInterval = null
// .........step++ 안함
// ......interval < newInterval (newInterval이 뒤에 있을 때)
// .........interval이 answer에 들어감 (intervals shift)
// .........step++
//
// 완전 같다면
// ...newInterval answer에 push
// ...newInterval = null
// ...shift++
//
// 맨 마지막에
// ...newInterval이 null이라면 종료
// ...newInterval이 null이 아니라면 answer에 newInterval push

/*
let step = 0;
const length = intervals.length;
while(length > step) {
    
}
*/

const isOverlap = (interval, newInterval) => {
  const [s, e] = [interval[0], interval[1]];
  const [nS, nE] = [newInterval[0], newInterval[1]];

  if (s <= nE && nS <= e) return 0; // 겹칠때
  if (s > nE) return 1; // 안겹칠 때 interval > newInterval
  if (e < nS) return 2; // 안겹칠 때 interval < newInterval
};

var insert = function(intervals, newInterval) {
  let step = 0;
  const length = intervals.length;
  const answer = [];

  while (length > step) {
    const interval = intervals[step];
    let overlap;

    if (newInterval === null) {
      // newInterval이 없다면
      answer.push(interval);
      step++;
    } else {
      overlap = isOverlap(interval, newInterval);
      if (overlap === 0) {
        // 겹치면
        // console.log(`>> ${interval}, ${newInterval} 겹쳤다 (${overlap})`);
        // ...newInterval 교체
        newInterval[0] = Math.min(interval[0], newInterval[0]);
        newInterval[1] = Math.max(interval[1], newInterval[1]);
        step++;
      } else if (overlap === 1) {
        // 안겹치고, interval > newInterval이면
        // console.log(`>> ${interval} > ${newInterval} 안겹쳤다 (${overlap})`);
        answer.push(newInterval);
        newInterval = null;
      } else if (overlap === 2) {
        // 안겹치고, interval < newInterval이면
        // console.log(`>> ${interval} < ${newInterval} 안겹쳤다 (${overlap})`);
        answer.push(interval);
        step++;
      }
    }
  }

  if (newInterval !== null) answer.push(newInterval);

  return answer;
};

console.log(insert([[1, 3], [6, 9]], [2, 5]));
console.log(insert([[1, 3], [4, 7], [8, 10]], [2, 6]));
/* try-3
 const fill = (v, start, end, at) => {
  for (let i = start; i < end; i++) {
    at[i] = v;
  }
};

var insert = function(intervals, newInterval) {
  const isContain = {};
  const answer = [];

  intervals.forEach(interval => {
    const [start, end] = interval;
    fill(true, start, end, isContain);
  });

  fill(true, newInterval[0], newInterval[1], isContain);

  const sortedKeys = Object.keys(isContain)
    .sort((a, b) => a - b)
    .map(item => Number(item));
  const length = sortedKeys.length;

  answer.push([sortedKeys[0]]);

  for (let idx = 1; idx < length; idx++) {
    const curr = sortedKeys[idx];
    const prev = sortedKeys[idx - 1];

    if (curr - prev > 1) {
      answer[answer.length - 1].push(prev + 1);
      answer.push([curr]);
    }
  }

  answer[answer.length - 1].push(sortedKeys[length - 1] + 1);

  return answer;
};
*/
