// 1047. Remove All Adjacent Duplicates In String

var removeDuplicates = function (S) {
  const stack = [];
  let lastIndex = -1;

  for (const char of S) {
    if (stack[lastIndex] === char) {
      stack.pop();
      lastIndex--;
    } else {
      // empty or different char
      stack.push(char);
      lastIndex++;
    }
  }

  return stack.join("");
};

// 1209. Remove All Adjacent Duplicates in String II

// 첫 번째 풀이 시간 5%
var removeDuplicates = function (s, k) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const lastIndex = stack.length - 1;
    let isSame = true;
    stack.push(s[i]);

    for (let j = 0; j < k - 1; j++) {
      if (stack[lastIndex - j] !== s[i]) {
        isSame = false;
        break;
      }
    }
    if (isSame) {
      stack.splice(-k);
    }
  }

  return stack.join("");
};

// 두 번째 풀이 시간 40%
var removeDuplicates = function (s, k) {
  const stack = [[s[0], 1]];

  for (let i = 1; i < s.length; i++) {
    const curChar = s[i];

    if (!stack.length) {
      stack.push([curChar, 1]);
      continue;
    }

    let [lastChar, lastSameCount] = stack[stack.length - 1];

    if (lastChar === curChar) {
      stack.pop();
      lastSameCount++;
      lastSameCount !== k && stack.push([curChar, lastSameCount]);
    } else {
      stack.push([curChar, 1]);
    }
  }

  return stack.map(([char, count]) => char.repeat(count)).join("");
};

//  895. Maximum Frequency Stack

// 첫 번째 풀이 : 시간 17%
var FreqStack = function () {
  this.count = {};
  this.bottom = new StackLayer();
};

var StackLayer = function () {
  this.stack = [];
  this.upper = null;
};

FreqStack.prototype.push = function (x) {
  this.count[x] = this.count[x] ? this.count[x] + 1 : 1;

  let current = this.bottom;
  let depth = this.count[x] - 1;

  while (depth > 0) {
    if (current.upper) {
      current = current.upper;
    } else {
      current.upper = new StackLayer();
      current = current.upper;
    }
    depth--;
  }

  current.stack.push(x);
};

FreqStack.prototype.pop = function () {
  let current = this.bottom;

  while (current.upper) {
    if (current.upper.stack.length) {
      current = current.upper;
    } else {
      break;
    }
  }

  const popped = current.stack.pop();
  this.count[popped]--;

  return popped;
};

// 두 번째 풀이 시간 98%

var FreqStack = function () {
  this.count = {};
  this.stacks = [null, []];
};

FreqStack.prototype.push = function (x) {
  this.count[x] = this.count[x] ? this.count[x] + 1 : 1;

  let floor = this.count[x];

  if (!this.stacks[floor]) {
    this.stacks[floor] = [];
  }

  this.stacks[floor].push(x);
};

FreqStack.prototype.pop = function () {
  const topStack = this.stacks.pop();

  const popped = topStack.pop();
  this.count[popped]--;

  if (topStack.length) {
    this.stacks.push(topStack);
  }

  return popped;
};
