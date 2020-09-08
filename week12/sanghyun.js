// ///////////////////
// // lvl2. 기능개발 //
// //////////////////
function solution(progresses, speeds) {
  const daysLeft = progresses.map((prog, index) =>
    Math.ceil((100 - prog) / speeds[index])
  );

  let localMax = daysLeft[0];
  let count = 1;
  const answer = [];

  for (let i = 1; i < daysLeft.length; i++) {
    if (daysLeft[i] > localMax) {
      answer.push(count);
      count = 1;
      localMax = daysLeft[i];
      continue;
    }

    count++;
  }

  answer.push(count);

  return answer;
}

////////////////
// lvl2. 캐시 //
///////////////
function solution(cacheSize, cities) {
  if (cacheSize === 0) {
    return 5 * cities.length;
  }

  cities = cities.map((city) => city.toLowerCase());

  let answer = 0;
  const cache = [];

  for (let i = 0; i < cities.length; i++) {
    let indexInCache = cache.findIndex((city) => city === cities[i]);

    if (indexInCache > -1) {
      cache.splice(indexInCache, 1);
      cache.unshift(cities[i]);
      answer += 1;
      continue;
    }

    cache.unshift(cities[i]);

    if (cache.length > cacheSize) {
      cache.pop();
    }
    answer += 5;
  }

  return answer;
}

// /////////////////////////////////
// // lvl2. JadenCase 문자열 만들기 //
// /////////////////////////////////
function solution(s) {
  return s
    .split(" ")
    .map((word) => {
      const firstChar = word.charAt(0).toUpperCase();
      return firstChar + word.slice(1).toLowerCase();
    })
    .join(" ");
}

///////////////////
// lvl3. 보석쇼핑 //
///////////////////
function solution(gems) {
  const gemCount = new Set(gems).size;

  if (gemCount === 1) {
    return [1, 1];
  }

  const gemMap = new Map();
  const candidates = [];

  gems.forEach((gem, ind) => {
    if (gemMap.has(gem)) {
      gemMap.delete(gem);
    }

    gemMap.set(gem, ind);

    if (gemMap.size === gemCount) {
      candidates.push([gemMap.values().next().value + 1, ind + 1]);
    }
  });

  let answer = candidates[0];

  for (let i = 1; i < candidates.length; i++) {
    if (candidates[i][1] - candidates[i][0] < answer[1] - answer[0]) {
      answer = candidates[i];
    }
  }

  return answer;
}

/////////////////
// lvl2. 후보키 //
/////////////////
// 포기함 ..
// permutation 결과를 하나하나 비교?????

function solution(relation) {
  let answer = 0;

  const processed = relation.reduce((acc, tuple) => {
    tuple.forEach((field, index) => {
      if (!acc[index]) {
        acc[index] = [];
      }

      acc[index].push(field);
    });

    return acc;
  }, []);

  for (let i = 0; i < processed.length; i++) {
    if (processed[i].length === new Set(processed[i]).size) {
      answer++;
      processed.splice(i, 1);
      i--;
    }
  }

  return answer;
}
