/* =========================== 56. Merge Intervals =========================== */
// 85.33%
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
	let result = [];

	intervals.sort((a, b) => a[0] - b[0]);

	let new_interval = intervals[0];

	for (var i = 1; i < intervals.length; i++) {
		if (intervals[i][0] <= new_interval[1]) {
			new_interval = [
				Math.min(intervals[i][0], new_interval[0]),
				Math.max(intervals[i][1], new_interval[1]),
			];
		} else {
			result.push(new_interval);
			new_interval = intervals[i];
		}
	}

	result.push(new_interval);

	return result[0] === undefined ? [] : result;
};

/* ================================= 402. Remove K Digits ================================= */
// faster than 72.02% of JavaScript
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */

// k 는 지워야할 수
var removeKdigits = function (num, k) {
	let stack = [];
	let deleteCnt = 0; // 현재까지 지운 개수

	for (var i = stack.length; i < num.length; i++) {
		// 순차적으로 올라가다가 갑자기 아래로 내려가는 곳 찾아 지움
		// 예) stack = 1237, num[i] = 3
		// => num[i] < stack[stack.length - 1] 이므로 stack.pop()
		while (
			stack.length > 0 &&
			num[i] < stack[stack.length - 1] &&
			deleteCnt < k
		) {
			stack.pop();
			deleteCnt++;
		}

		stack.push(num[i]);
	}

	// 어차피 stack 안의 수는 오름차 순이니 뒤부터 지우면 저절로 작은 숫자가 됨
	while (deleteCnt < k) {
		stack.pop();
		deleteCnt++;
	}

	// "0200" 될때를 대비해서 0 제거
	while (stack[0] == "0") {
		stack = stack.slice(1, stack.length);
	}

	// "10", 2 => "0" 대비
	return stack[0] === undefined ? "0" : stack.join("");
};

/* ====================== 714. Best Time to Buy and Sell Stock with Transaction Fee ====================== */
// 75.00%
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
	let result = 0;

	// 현재 맨 처음 주식을 하나 사서 이득이 -
	let current_profit = -prices[0];

	for (var i = 0; i < prices.length; i++) {
		// 가지고 있는 주식 안팔음 / 주식 팔음
		result = Math.max(result, current_profit + prices[i] - fee);

		// 전에 주식을 샀을 때 / 저번에 주식을 안사고 이번 주식을 살 때, result 비교
		current_profit = Math.max(current_profit, result - prices[i]);
	}

	return result;
};

/* =============================== 1054. Distant Barcodes ================================= */
//  62.50%
/**
 * @param {number[]} barcodes
 * @return {number[]}
 */
/**
 * @param {number[]} barcodes
 * @return {number[]}
 */
var rearrangeBarcodes = function (barcodes) {
	let how_many = {};

	for (var item of barcodes) {
		how_many[item] ? how_many[item]++ : (how_many[item] = 1);
	}

	let heap = [];

	for (var key in how_many) {
		heap.push({
			key: key,
			value: how_many[key],
		});
	}

	heap = [[0, 0], ...heap.sort((a, b) => b.value - a.value)];

	// 만약 1종류의 숫자밖에 업는 경우 즉, 바코드 입력이 하나일 때
	if (!heap[2]) {
		return [heap[1].key];
	}

	let result = [];

	while (heap[1].value > 0) {
		result.push(parseInt(heap[1].key));
		heap[1].value--;

		let j = 1;
		let temp; // heap의 요소끼리 바꿀때 사용하는 변수

		if (heap[3] && heap[1].value < heap[3].value) {
			temp = heap[1];
			heap[1] = heap[2];
			heap[2] = heap[3];
			heap[3] = temp;
			j = 3;
		} else {
			[heap[1], heap[2]] = [heap[2], heap[1]];
			j = 2;
		}

		while (j * 2 < heap.length && heap[j].value <= heap[j * 2].value) {
			if (j * 2 + 1 < heap.length && heap[j].value < heap[j * 2 + 1].value) {
				[heap[j], heap[j * 2 + 1]] = [heap[j * 2 + 1], heap[j]];
				j = j * 2 + 1;
			} else {
				[heap[j], heap[j * 2]] = [heap[j * 2], heap[j]];
				j = j * 2;
			}
		}
	}

	return result;
};

/* ======================= 1306. Jump Game III =======================*/
// faster than 91.21% of JavaScript
/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
	let visited = new Set();
	let q = [start];

	while (q.length > 0) {
		const cur_idx = q.shift();
		if (arr[cur_idx] === 0) return true;

		if (visited.has(cur_idx)) continue;

		const next_left = cur_idx - arr[cur_idx];
		if (next_left >= 0) q.push(next_left);

		const next_right = cur_idx + arr[cur_idx];
		if (next_right <= arr.length - 1) q.push(next_left, next_right);
		visited.add(cur_idx);
	}

	return false;
};
