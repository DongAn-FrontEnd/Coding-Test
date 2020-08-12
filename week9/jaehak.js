/* prettier-ignore */
/* ================================= 1047. Remove All Adjacent Duplicates In String ================================= */

/**
 * @param {string} S
 * @return {string}
 */

var removeDuplicates = function (S) {
	let stack = []; // 스택

	// 스택의 마지막 문자와 현재 S[i]의 문자를 비교 ? 스택에서 빼거나 : 스택에 S[i] 를 넣음
	for (var i = 0; i < S.length; i++)
		S[i] === stack[stack.length - 1] ? stack.pop() : stack.push(S[i]);

	// 배열을 문자열로 출력
	return stack.join("");
};

/* ======================================================= result =======================================================

Runtime: 84 ms, faster than 88.34% of JavaScript online submissions for Remove All Adjacent Duplicates In String.
Memory Usage: 44.8 MB, less than 40.08% of JavaScript online submissions for Remove All Adjacent Duplicates In String.

======================================================================================================================= */

/* ================================= 1209. Remove All Adjacent Duplicates in String II ================================= */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

var removeDuplicates = function (s, k) {
	// 스택에 k-1개 만큼의 문자열을 먼저 넣음
	let stack = s.substring(0, k).split("");

	for (var i = k; i < s.length; i++) {
		stack.push(s[i]);

		if (stack.length >= k) {
			// 연속하는 문자열 계속해서 없애기
			if (
				stack.slice(-k).every((element) => element === stack[stack.length - 1])
			)
				stack.splice(stack.length - k);
		}
	}

	return stack.join("");
};

removeDuplicates("deeedbbcccbdaa", 3);

console.log();

/* =============================================================================================================================

Runtime: 788 ms, faster than 18.75% of JavaScript online submissions for Remove All Adjacent Duplicates in String II.
Memory Usage: 44.7 MB, less than 8.07% of JavaScript online submissions for Remove All Adjacent Duplicates in String II.

=============================================================================================================================*/

/* =============================== 895. Maximum Frequency Stack =============================== */
var FreqStack = function () {
	this.hash = {}; // 스택이 가지고 있는 해당 값의 개수
	this.frequency = {}; // 키:[] => 키만큼의 빈도수를 가진 숫자 즉, 같은 빈도면 빠져나갈 숫자 순
	this.many_idx = 1; // 최대 많이 가지고 있는 개수
};

/**
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function (x) {
	if (x in this.hash) {
		this.hash[x]++;
	} else {
		this.hash[x] = 1;
	}

	if (this.hash[x] in this.frequency) this.frequency[this.hash[x]].push(x);
	else {
		this.frequency[this.hash[x]] = [x];
	}

	this.many_idx = Math.max(this.hash[x], this.many_idx);

	// 가장 많은 개수 설정
	return null;
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
	const result = this.frequency[this.many_idx].pop();

	if (this.frequency[this.many_idx].length === 0) {
		// 빈 배열은 지움
		delete this.frequency[this.many_idx];

		// 최대 개수 값 마이너스
		this.many_idx--;
	}

	// 빠진 값은 개수에서 마이너스
	this.hash[result]--;

	return result;
};

/*
Runtime: 368 ms, faster than 78.48% of JavaScript online submissions for Maximum Frequency Stack.
Memory Usage: 57.5 MB, less than 40.51% of JavaScript online submissions for Maximum Frequency Stack.
*/
