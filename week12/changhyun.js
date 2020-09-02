// 기능개발

function solution(progresses, speeds) {
  var answer = [];
  let count = 1;
  const days = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));
  let current = days[0];

  for (let i = 0; i < days.length; i++) {
    const nextDay = days[i + 1];
    if (current < (nextDay || Infinity)) {
      answer.push(count);
      current = nextDay;
      count = 1;
    } else {
      count++;
    }
  }

  return answer;
  // 4 2 3 4 2 7 12 4 2 31
  // 4 4 4 4 4 7 12 12 12 31
}

// 후보키

// 1st try
// isUnique함수 문제점

function solution(relation) {
  var answer = 0;
  const totalAttribute = relation[0].length;

  const isUnique = (node) => {
    // @param arr
    const obj = {};

    relation.forEach((row) => {
      const key = node.reduce((acc, each) => acc + row[each], "");
      obj[key] = obj[key] ? obj[key] + 1 : 1;
    });

    for (const key in obj) {
      if (obj[key] > 1) {
        return false;
      }
    }

    return true;
  };

  const stack = [[0], [1], [2], [3]];

  while (stack.length) {
    const node = stack.pop();

    if (isUnique(node)) {
      answer++;
      console.log(node);
    } else {
      const last = node.pop();
      if (last + 1 < totalAttribute) {
        node.push(last);
        node.push(last + 1);
        stack.push(node);
      }
    }
  }

  return answer;
}

// 2nd try
/*
0   1  2  3
01  12 23
012 123  
0123

0                              1          2    3
01         02          03      12   13    23  
012  013   021 022 023         123    
0123

013에 의해 0123이 최소성을 만족하지 않을 수 있음.

*/

function solution(relation) {
  var answer = 0;
  const totalAttribute = relation[0].length;

  const isUnique = (node) => {
    // @param arr
    const obj = {};

    relation.forEach((row) => {
      const key = node.reduce((acc, each) => acc + "," + row[each], "");
      obj[key] = obj[key] ? obj[key] + 1 : 1;
    });

    for (const key in obj) {
      if (obj[key] > 1) {
        return false;
      }
    }

    return true;
  };

  const stack = [[0], [1], [2], [3]];

  while (stack.length) {
    const node = stack.pop();

    if (isUnique(node)) {
      answer++;
    } else {
      let next = node[node.length - 1] + 1;
      while (next < totalAttribute) {
        stack.push([...node, next]);
        next++;
      }
    }
  }

  return answer;
}

// try 3
// stack 초기 items 수정
// 최소성 체크 추가

function solution(relation) {
  var answer = 0;
  const totalAttribute = relation[0].length;
  const minimality = [];
  const isMinimal = (node) => {
    if (
      minimality.some((candidateKey) =>
        candidateKey.every((val) => node.indexOf(val) !== -1)
      )
    ) {
      return false;
    }

    minimality.push(node);
    return true;
  };

  const isUnique = (node) => {
    const set = new Set();

    for (const row of relation) {
      const key = node.reduce((acc, each) => acc + "," + row[each], "");

      if (set.has(key)) {
        return false;
      }

      set.add(key);
    }

    return true;
  };

  const stack = [];
  let i = 0;
  while (i < totalAttribute) {
    stack.push([i]);
    i++;
  }

  while (stack.length) {
    const node = stack.shift();

    if (isUnique(node)) {
      isMinimal(node) && answer++;
    } else {
      let nextValue = node[node.length - 1] + 1;
      while (nextValue < totalAttribute) {
        stack.push([...node, nextValue]);
        nextValue++;
      }
    }
  }

  return answer;
}

// 캐시
// Doubly linked list 구현
function solution(cacheSize, cities) {
  var answer = 0;

  function Node(val, next = null, prev = null) {
    this.value = val;
    this.next = next;
    this.prev = prev;
  }

  function Cache(maxSize) {
    this.head = null;
    this.tail = null;
    this.maxSize = maxSize;
    this.size = 0;

    this.unshift = (value) => {
      const newNode = new Node(value, this.head);

      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        this.size = 1;
        return;
      }

      this.head.prev = newNode;
      this.head = newNode;
      this.size++;
    };

    this.adjustSize = () => {
      if (this.size > this.maxSize) {
        const newTail = this.tail.prev;
        newTail.next = null;
        this.tail = newTail;
        this.size--;
      }
    };

    this.find = (nodeValue) => {
      let current = this.head;

      while (current) {
        if (current.value === nodeValue) {
          if (current === this.head) {
            return true;
          }

          if (current === this.tail) {
            this.tail = current.prev;
            this.tail.next = null;
          } else {
            current.next.prev = current.prev;
            current.prev.next = current.next;
          }

          this.head.prev = current;
          current.next = this.head;
          current.prev = null;
          this.head = current;

          return true;
        }

        current = current.next;
      }

      return false;
    };
  }

  const cache = new Cache(cacheSize);
  if (cacheSize === 0) {
    return 5 * cities.length;
  }
  cities.forEach((_city) => {
    const city = _city.toLowerCase();

    if (cache.find(city)) {
      answer += 1;
    } else {
      cache.unshift(city);
      cache.adjustSize();
      answer += 5;
    }
  });

  return answer;
}

// 배열 사용
function solution(cacheSize, cities) {
  var answer = 0;

  function Cache() {
    this.stack = [];

    // hit miss 유무 return
    // hit일 경우 기존 값을 unshift
    this.find = (city) => {
      const index = this.stack.indexOf(city);
      if (index !== -1) {
        this.stack.unshift(this.stack.splice(index, 1)[0]);
        return true;
      }
      return false;
    };

    // cacheSize 초과할 경우, 마지막 값 pop
    this.unshift = (city) => {
      this.stack.unshift(city);
      if (this.stack.length > cacheSize) {
        this.stack.pop();
      }
    };
  }

  const cache = new Cache();

  cities.forEach((city) => {
    const lowered = city.toLowerCase();
    if (cache.find(lowered)) {
      answer += 1;
    } else {
      cache.unshift(lowered);
      answer += 5;
    }
  });

  return answer;
}

// 보석 쇼핑 시간초과

function solution(gems) {
  const set = new Set();
  gems.forEach((gem) => set.add(gem));
  const gemSetSize = set.size;
  const gemsLength = gems.length;

  let comparator = {};
  const add = (gem) => {
    if (comparator[gem]) {
      comparator[gem]++;
      return;
    }
    comparator[gem] = 1;
    comparator.size++;
  };
  const substract = (gem) => {
    comparator[gem]--;
    comparator[gem] === 0 && comparator.size--;
  };

  let length = gemSetSize;

  while (length <= gemsLength) {
    comparator = { size: 0 };
    let first = 0;
    let last = length - 1;

    for (let i = 0; i < length; i++) {
      const gem = gems[i];
      add(gem);
    }
    if (comparator.size === gemSetSize) {
      return [first + 1, last + 1];
    }
    // 012
    while (true) {
      last++;
      if (last === gemsLength) {
        break;
      }
      // 123, 234, 345
      substract(gems[first]);
      add(gems[last]);
      first++;
      if (comparator.size === gemSetSize) {
        return [first + 1, last + 1];
      }
    }
    length++;
  }
}
// set 사용 시간 초과
function solution(gems) {
  const set = new Set();
  gems.forEach((gem) => set.add(gem));
  const gemSetSize = set.size;
  const gemsLength = gems.length;

  const add = (comparator, gem) => {
    const gemCount = comparator.get(gem);
    gemCount ? comparator.set(gem, gemCount + 1) : comparator.set(gem, 1);
  };
  const substract = (comparator, gem) => {
    const gemCount = comparator.get(gem);
    gemCount > 1 ? comparator.set(gem, gemCount - 1) : comparator.delete(gem);
  };

  let length = gemSetSize;

  while (length <= gemsLength) {
    let comparator = new Map();
    for (let i = 0; i < length; i++) {
      const gem = gems[i];
      add(comparator, gem);
    }

    if (comparator.size === gemSetSize) {
      return [1, length];
    }

    let first = 0;
    let last = length - 1;
    // 012
    while (true) {
      last++;
      if (last === gemsLength) {
        break;
      }
      // 123, 234, 345
      substract(comparator, gems[first]);
      add(comparator, gems[last]);
      first++;
      if (comparator.size === gemSetSize) {
        return [first + 1, last + 1];
      }
    }
    length++;
  }
}

for (let i = 0; i < last - 1; i++) {
  add(comparator, gems[last]);
}
while (true) {
  if (start === 0) {
    add(comparator, gems[last]);
    if (comparator.size === gemSetSize) {
      return [first + 1, last + 1];
    }
    while (true) {
      last++;
      if (last === gemsLength) {
        break;
      }
      substract(comparator, first);
      first++;
      add(comparator, last);
      if (comparator.size === gemSetSize) {
        return [first + 1, last + 1];
      }
    }
  }
  if (end === gemsLength) {
    first--;
    add(comparator, gems[first]);
    if (comparator.size === gemSetSize) {
      return [first + 1, last + 1];
    }
    while (true) {
      first--;
      last--;
      if (first === -1) {
        break;
      }
      add(comparator, gems[first]);
      substract(comparator, gems[last]);
      if (comparator.size === gemSetSize) {
        return [first + 1, last + 1];
      }
    }
  }
}
// sliding left to right, right to left 여전히 시곤초과
function solution(gems) {
  const set = new Set();
  gems.forEach((gem) => set.add(gem));
  const gemSetSize = set.size;
  const gemsLength = gems.length;

  const add = (comparator, gem) => {
    const gemCount = comparator.get(gem);
    gemCount ? comparator.set(gem, gemCount + 1) : comparator.set(gem, 1);
  };
  const substract = (comparator, gem) => {
    const gemCount = comparator.get(gem);
    gemCount > 1 ? comparator.set(gem, gemCount - 1) : comparator.delete(gem);
  };

  let comparator = new Map();
  let first = 0;
  let last = gemSetSize - 1;

  for (let i = 0; i < last; i++) {
    add(comparator, gems[i]);
  }

  // 01
  while (true) {
    console.log(first, last);
    if (first === 0) {
      add(comparator, gems[last]);
      // 012
      if (comparator.size === gemSetSize) {
        return [first + 1, last + 1];
      }
      while (true) {
        if (last + 1 === gemsLength) {
          break;
        }
        substract(comparator, gems[first]);
        first++;
        last++;
        add(comparator, gems[last]);
        // 123, first:1, last:3
        // 234
        // 345
        if (comparator.size === gemSetSize) {
          return [first + 1, last + 1];
        }
      }
      continue;
    }

    if (last === gemsLength - 1) {
      first--;
      add(comparator, gems[first]);
      if (comparator.size === gemSetSize) {
        return [first + 1, last + 1];
      }
      while (true) {
        if (first - 1 === -1) {
          break;
        }
        substract(comparator, gems[last]);
        last--;
        first--;
        add(comparator, gems[first]);
        if (comparator.size === gemSetSize) {
          return [first + 1, last + 1];
        }
      }
      last++;
    }
  }
}

// 투포인터 사용 통과

function solution(gems) {
  const set = new Set(gems);
  const gemSetSize = set.size;
  const gemsLength = gems.length;

  const add = (comparator, gem) => {
    const gemCount = comparator.get(gem);
    gemCount ? comparator.set(gem, gemCount + 1) : comparator.set(gem, 1);
  };
  const substract = (comparator, gem) => {
    const gemCount = comparator.get(gem);
    gemCount > 1 ? comparator.set(gem, gemCount - 1) : comparator.delete(gem);
  };

  let start = 0;
  let end = 0;
  let comparator = new Map();
  const stack = [];

  while (true) {
    if (end === gemsLength) {
      break;
    }

    add(comparator, gems[end]);

    if (comparator.size === gemSetSize) {
      while (comparator.size === gemSetSize) {
        substract(comparator, gems[start]);
        start++; // start 포인터 이동
      }
      stack.push([start - 1, end]);
    }

    end++; // end 포인터 이동
  }

  // 최소값 찾기
  let min = Infinity;
  let minIndex = 0;
  stack.forEach((item, i) => {
    const [front, end] = item;
    if (end - front < min) {
      min = end - front;
      minIndex = i;
    }
  });
  return stack[minIndex].map((i) => i + 1);
}
