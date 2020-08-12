// 숫자야구

/*

답 : abc

123 1s 1b

3 >> 1개
2 >> ab c, ac b, bc a 

142

241

1~9 1~9 1~9

123

124
232
321


*/

// Find Words That Can Be Formed by Characters

/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  const charsLength = chars.length;
  const arr = Array(26).fill(0);
  let answer = 0;

  for (const char of chars) {
    const charCode = char.charCodeAt() - 97;
    arr[charCode] = ++arr[charCode] || 1;
  }

  for (const word of words) {
    if (word.length > charsLength) continue;

    const tempArr = [...arr];
    let valid = true;
    for (const char of word) {
      const charCode = char.charCodeAt() - 97;

      if (tempArr[charCode]) {
        tempArr[charCode] -= 1;
      } else {
        valid = false;
        break;
      }
    }
    if (valid) answer += word.length;
  }

  return answer;
};

var countCharacters = function (words, chars) {
  const hash = {};
  let answer = 0;

  for (char of chars) {
    hash[char] ? hash[char]++ : (hash[char] = 1);
  }

  words.forEach((word) => {
    const chars = { ...hash };
    for (char of word) {
      if (chars[char]) {
        chars[char]--;
      } else {
        return;
      }
    }
    answer += word.length;
  });

  return answer;
};

var countCharacters = function (words, chars) {
  const map = new Map();
  let answer = 0;

  for (char of chars) {
    map.has(char) ? map.set(char, map.get(char) + 1) : map.set(char, 1);
  }

  words.forEach((word) => {
    const tempMap = new Map(map);
    for (char of word) {
      if (tempMap.get(char)) {
        tempMap.set(char, tempMap.get(char) - 1);
      } else {
        return;
      }
    }
    answer += word.length;
  });

  return answer;
};

// 카펫

function solution(brown, yellow) {
  var answer = [];
  const total = brown + yellow;

  let y = 0;
  for (let x = Math.floor(Math.sqrt(total)); x <= total; x++) {
    if (total % x === 0) {
      y = total / x;
      if (2 * x + 2 * y - 4 === brown) return y > x ? [y, x] : [x, y];
    }
  }

  return answer;
}

// 체스
var numRookCaptures = function (board) {
  const bfs = [];
  const length = board.length;
  const visited = Array(length)
    .fill(0)
    .map((i) => (i = Array(length).fill(0)));
  const mid = Math.floor(length / 2);
  const R = [0, 0];
  let answer = 0;

  const queue = new Queue();
  queue.enqueue(mid, mid);

  while (true) {
    // get R position
    const node = queue.dequeue();
    const { y, x } = node;

    if (board[y][x] === "R") {
      R[0] = y;
      R[1] = x;
      break;
    }

    if (0 <= y < length && 0 <= x < length) {
      if (!visited[y][x]) {
        visited[y][x] = 1;

        queue.enqueue(y + 1, x);
        queue.enqueue(y, x + 1);
        queue.enqueue(y - 1, x);
        queue.enqueue(y, x - 1);
      }
    }
  }

  const [y, x] = R;
  console.log(y, x);
  let top = y - 1;
  let bottom = y + 1;
  let left = x - 1;
  let right = x + 1;

  while (top >= 0) {
    const char = board[top][x];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    top--;
  }

  while (bottom < length) {
    const char = board[bottom][x];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    bottom++;
  }
  while (left >= 0) {
    const char = board[y][left];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    left--;
  }

  while (right < length) {
    const char = board[y][right];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    right++;
  }

  return answer;
};

function Queue() {
  this.head = null;
  this.tail = null;
  this.enqueue = (y, x) => {
    const newNode = new Node(y, x);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  };
  this.dequeue = () => {
    if (this.head === this.tail) {
      const head = this.head;
      this.head = null;
      this.tail = null;
      return head;
    } else {
      const originHead = this.head;
      this.head = this.head.next;
      return originHead;
    }
  };
}

function Node(y, x) {
  this.y = y;
  this.x = x;
}

/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function (board) {
  const getR = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "R") {
          return [i, j];
        }
      }
    }
  };

  R = getR();
  const [y, x] = R;
  const length = board.length;
  let answer = 0;

  let top = y - 1;
  let bottom = y + 1;
  let left = x - 1;
  let right = x + 1;

  while (top >= 0) {
    const char = board[top][x];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    top--;
  }

  while (bottom < length) {
    const char = board[bottom][x];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    bottom++;
  }
  while (left >= 0) {
    const char = board[y][left];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    left--;
  }

  while (right < length) {
    const char = board[y][right];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B") {
      break;
    }
    right++;
  }

  return answer;
};

var numRookCaptures = function (board) {
  const getR = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "R") {
          return [i, j];
        }
      }
    }
  };

  R = getR();
  const [y, x] = R;
  const length = board.length;
  let answer = 0;

  let top = y - 1;
  let bottom = y + 1;
  let left = x - 1;
  let right = x + 1;

  while (true) {
    const char = board[top][x];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B" || top === 0) {
      break;
    }
    top--;
  }

  while (true) {
    const char = board[bottom][x];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B" || bottom === length - 1) {
      break;
    }
    bottom++;
  }
  while (true) {
    const char = board[y][left];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B" || left === 0) {
      break;
    }
    left--;
  }

  while (true) {
    const char = board[y][right];
    if (char === "p") {
      answer++;
      break;
    } else if (char === "B" || right === length - 1) {
      break;
    }
    right++;
  }

  return answer;
};
