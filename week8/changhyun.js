/******************* 타겟 넘버 ********************/
function solution(numbers, target) {
  let answer = 0;

  const stack = [
    [numbers[0], 0],
    [-numbers[0], 0],
  ];
  while (stack.length) {
    let [sum, index] = stack.pop();

    index += 1;
    const next = numbers[index];

    if (index < numbers.length) {
      stack.push([sum + next, index]);
      stack.push([sum - next, index]);
    } else {
      sum === target && answer++;
    }
  }
  return answer;
}

/***************** 네트워크 *******************/
function solution(n, computers) {
  var answer = n;
  const visited = Array(n).fill(0);
  const checkLinkedComputers = (computer) => {
    visited[computer] = 1;

    for (let j = 0; j < n; j++) {
      if (visited[j] === 1) continue;

      const isLinkedComputer = computers[computer][j];
      if (isLinkedComputer) {
        visited[j] = 1;
        checkLinkedComputers(j);
        answer--;
      }
    }
  };

  for (let i = 0; i < n; i++) {
    checkLinkedComputers(i);
  }

  return answer;
}

/********** maximum depth of N-ary Tree *************/

// DFS 풀이법
// 비교 연산 때문인지 속도가 느림
var maxDepth = function (root) {
  if (!root) return 0;

  root.depth = 1;
  const stack = [root];

  let depth = 1;

  while (stack.length) {
    const node = stack.pop();
    if (node.children) {
      [...node.children].forEach((childNode) => {
        childNode.depth = node.depth + 1;
        if (depth < childNode.depth) depth = childNode.depth;
        stack.push(childNode);
      });
    }
  }

  return depth;
};

// BFS 풀이법
// 최대값을 구하는 문제이므로 BFS가 더
var maxDepth = function (root) {
  if (!root) return 0;

  const stack = [root];

  let depth = 1;
  let children = 1;

  while (stack.length) {
    while (children) {
      const node = stack.shift();
      children--;

      if (node.children) stack.push(...node.children);
    }
    children = stack.length;
    depth++;
  }

  return --depth;
};

// children 변수를 만들 필요 없이, while문 내에서 stack.length를 활용하면 됐음.
var maxDepth = function (root) {
  if (!root) return 0;

  const stack = [root];

  let depth = 0;

  while (stack.length) {
    const children = stack.length;

    for (let i = 0; i < children; i++) {
      const node = stack.shift();
      if (node.children) stack.push(...node.children);
    }
    depth++;
  }

  return depth;
};

/**************** increasingBST ******************* */

// 첫 번째 시도 : 사이클 발생 (tail = tail.right에서 , tail에 left가 포함되어 할당되기 떄문)
// 다른 풀이 참고 : tail.left = null로

var increasingBST = function (root) {
  let newRoot = new TreeNode(0);
  let tail = newRoot;

  const traverse = (cur) => {
    if (!cur) return;

    traverse(cur.left);
    tail.right = cur;
    tail = tail.right;
    traverse(cur.right);
  };

  traverse(root);
  return newRoot.right;
};

// 탐색마다 새로운 node를 생성
var increasingBST = function (root) {
  let newRoot = new TreeNode(0);
  let tail = newRoot;

  const traverse = (cur) => {
    if (!cur) return;

    traverse(cur.left);
    tail.right = new TreeNode(cur.val);
    tail = tail.right;
    traverse(cur.right);
  };

  traverse(root);
  return newRoot.right;
};
