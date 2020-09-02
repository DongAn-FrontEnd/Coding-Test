/**************merge intervals***************/

/*
        not overllaped    
        f1 e1 f2 e2
        f2 e2 f1 e1
*/

var merge = function (intervals) {
  if (!intervals.length) {
    return [];
  }

  let front = 1;

  let ans = [];
  let current = 0;

  const sorted = intervals.sort((a, b) => a[0] - b[0]);

  ans.push(sorted[current]);
  current++;

  while (current < sorted.length) {
    const before = ans.pop();
    const after = sorted[current];

    const [f1, e1] = before;
    const [f2, e2] = after;

    if (e1 < f2) {
      // f1 e1 f2 e2
      ans.push(before);
      ans.push(after);
      current++;
      continue;
    }
    if (e2 < f1) {
      ans.push(after);
      ans.push(before);
      current++;
      continue;
    }

    const merged = [];
    if (f1 < f2) {
      merged.push(f1);
      merged.push(Math.max(e1, e2));
    } else {
      merged.push(f2);
      merged.push(Math.max(e1, e2));
    }

    ans.push(merged);
    current++;
  }

  return ans;
};

/************* jump game ************/

var canReach = function (arr, start) {
  const stack = [start];
  const visited = [];

  const isVisited = (i) => visited[i];
  const isBounded = (i) => i >= 0 && i < arr.length;
  const isValueZero = (i) => arr[i] === 0;

  while (stack.length) {
    const current = stack.pop();
    visited[current] = true;

    if (isValueZero(current)) return true;

    for (let i = -1; i < 2; i += 2) {
      const next = current + arr[current] * i;

      !isVisited(next) && isBounded(next) && stack.push(next);
    }
  }
  return false;
};
/**********  remove K digits ****************/

// 테케 27 실패

var removeKdigits = function (num, k) {
  const minSlice = (num, c) => {
    if (num.length === 2) {
      return Math.min(...num) + "";
    }

    const sliced = [num[0]];
    const numSize = num.length; // 4
    let coin = num.length - c;
    coin--;

    let i = 1;
    while (i < num.length && coin > 0) {
      let n = num[i];
      let remain = numSize - i;
      i++;

      if (remain > coin) {
        // 3 > 1
        let last = sliced.pop();

        if (last === n) {
          sliced.push(last);
          sliced.push(n);
          coin--;
          continue;
        }
        if (Math.min(last, n) == n) {
          sliced.push(n);
          continue;
        }
        if (Math.min(last, n) == last) {
          sliced.push(last);
          continue;
        }
      }

      sliced.push(n);
      coin--;
    }
    return sliced.join("");
  };

  const filtZero = (num) => {
    let i = 0;
    for (const c of num) {
      if (c === "0") {
        i++;
      } else {
        break;
      }
    }
    const sliced = num.slice(i);
    return sliced || "0";
  };

  let coin = k;
  let ans = num;

  while (coin > 0) {
    const zero = ans.indexOf("0");

    if (zero === -1) {
      return ans.length <= coin ? "0" : minSlice(ans, coin);
    }

    const before = ans.slice(0, zero);
    const after = ans.slice(zero);

    if (before.length === coin) {
      return filtZero(after);
    }

    if (before.length > coin) {
      return minSlice(before, coin) + after;
    }

    if (before.length < coin) {
      if (after == 0 || after === "") {
        return "0";
      }
      ans = filtZero(after);
      coin = coin - before.length;
    }
  }

  return ans;
};

/************ distance barcode *************/

const rearrangeBarcodes = (arr) => {
  const ans = [];

  // arr to hashmap
  const hash = {};
  arr.forEach((item) => {
    hash[item] = hash[item] ? ++hash[item] : 1;
  });

  // helper
  const swap = (arr, idx1, idx2) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  };

  // hash to pq, heapify up
  const pq = [null];

  Object.entries(hash).forEach((item) => {
    const [value, freq] = item;
    pq.push({ value, freq });

    let childIdx = pq.length - 1;

    while (childIdx > 1) {
      let parentIdx = Math.floor(childIdx / 2);

      if (pq[parentIdx].freq < freq) {
        swap(pq, parentIdx, childIdx);
      }
      childIdx = parentIdx;
    }
  });

  const poll = (value) => {
    let idx = 1;

    if (pq[idx].value === value) {
      const left = pq[2];
      const right = pq[3];
      if (pq[2].freq !== 0) {
        idx = 2;
        if (right && right.freq !== 0) {
          idx = pq[2] > pq[3] ? 2 : 3;
        }
      }
    }

    let head = pq[idx];

    ans.push(head.value);
    head.freq--;

    while (idx * 2 < pq.length) {
      // heapify down
      const leftIdx = idx * 2;
      const rightIdx = idx * 2 + 1;

      let childMaxIdx = leftIdx;
      if (rightIdx < pq.length) {
        childMaxIdx = pq[leftIdx].freq > pq[rightIdx].freq ? leftIdx : rightIdx;
      }
      if (pq[idx].freq < pq[childMaxIdx].freq) {
        swap(pq, idx, childMaxIdx);
        if (idx === 0) {
          head = pq[idx];
        }
      }
      idx = childMaxIdx;
    }
    return head.value;
  };

  let recent = poll();
  while (pq[1].freq) {
    const last = poll(recent);
    recent = last;
  }

  return ans;
};
