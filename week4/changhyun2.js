// 트럭
// failed - 테케 통과

function solution(bridge_length, weight, truck_weights) {
  const set = new Set();
  const trucks = [truck_weights[0]];
  let onBridge = truck_weights[0];
  let time = bridge_length + 1;

  for (let i = 1; i < truck_weights.length; i++) {
    const truck = truck_weights[i];

    onBridge += truck;

    if (onBridge > weight) {
      onBridge = truck;
      time += bridge_length;
    } else {
      time++;
    }
  }

  return time;
}

// 실패율 +8
function solution(N, stages) {
  let count = {};
  stages.forEach((stage) => (count[stage] = ++count[stage] || 1));

  let total = stages.length;

  let percent = [];

  for (let i = 1; i < N + 1; i++) {
    if (count[i]) {
      percent.push([i, count[i] / total]);
      total -= count[i];
    } else {
      percent.push([i, 0]);
    }
  }

  return percent
    .sort((a, b) => (b[1] === a[1] ? a[0] - b[0] : b[1] - a[1]))
    .map((i) => i[0]);
}

// 7. 멀쩡한 사각형

function solution(w, h) {
  var answer = w * h;

  if (w === h) {
    return answer - w;
  }

  for (let i = 0; i < h; i++) {
    answer -= Math.ceil(((i + 1) * w) / h) - Math.floor((i * w) / h);
  }

  return answer;
}

// 8. 탑
function solution(N, stages) {
  let count = {};
  stages.forEach((stage) => (count[stage] = ++count[stage] || 1));

  let total = stages.length;

  let percent = [];

  for (let i = 1; i < N + 1; i++) {
    if (count[i]) {
      percent.push([i, count[i] / total]);
      total -= count[i];
    } else {
      percent.push([i, 0]);
    }
  }
  const ans = percent.sort((a, b) => parseFloat(b[1] - a[1]).map((i) => i[0]));
  return ans;
}

// 자기주도적 목표한 결과 달성
// 덕질 경험
// 시간 관리
// 상호작용을 통해 시너지
// 인정받는 개발자로 성장하고 싶음
// 부스트캠프 커뮤니티를 존중, 건강한 학습 문화 기여
// 4일 1차 코테
// 11일 2차 코테

// 열정, 집중력을 증명할 증빙자료

// 가장 큰 수

// 테케만 통과
function solution(numbers) {
  return numbers
    .map((n) => n.toString().split(""))
    .sort((a, b) => {
      if (a[0] === b[0]) {
        if (
          a[1] === undefined
            ? a[0]
            : (a[1] === b[1]) === undefined
            ? b[0]
            : b[1]
        ) {
          return b[2] === undefined
            ? +b[1]
            : +b[2] - a[2] === undefined
            ? +a[1]
            : +a[2];
        }
        return +b[1] - +a[1];
      }
      return +b[0] - +a[0];
    })
    .map((i) => i.join(""))
    .join("");
}

function solution(numbers) {
  return numbers
    .map((n) => n.toString().split(""))
    .sort((a, b) => {
      if (a[0] === b[0]) {
        if ((a[1] || a[0]) === (b[1] || b[0])) {
          return (a[2] || a[1] || a[0]) < (b[2] || b[1] || b[0]);
        }
        return (a[1] || a[0]) < (b[1] || b[0]);
      }
      return a[0] < b[0];
    })
    .map((i) => i.join(""))
    .join("");
}

function solution(numbers) {
  const compare = (a, b) =>
    a[0] === b[0]
      ? (a + b).length === 2
        ? 0
        : compare(a.slice(1) || a[0], b.slice(1) || b[0])
      : a[0] < b[0];

  return (
    +numbers
      .map((n) => n.toString())
      .sort((a, b) => compare(a, b))
      .join("") + ""
  );
}
