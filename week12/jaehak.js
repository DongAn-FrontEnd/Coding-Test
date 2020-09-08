/* ============================= 캐시 ============================= */
// 첫번째 풀이
// 실패
function solution(cacheSize, cities) {
	let answer = 0;
	let queue = [];

	for (var city of cities) {
		city = city.toUpperCase();
		const idx = queue.indexOf(city);

		if (queue.length < cacheSize) {
			if (idx !== -1) {
				queue.splice(idx, 1);
				answer += 1;
			} else answer += 5;
			queue.push(city);
		} else {
			if (idx !== -1) {
				queue.splice(idx, 1);
				answer += 1;
			} else {
				queue.shift();
				answer += 5;
			}

			queue.push(city);
		}
	}

	return answer;
}

// 반례!!!!! 답: 10, 결과 9
solution(0, ["Jeju", "Jeju", "Jeju", "Jeju", "Jeju"]);

// 두번째 풀이
function solution(cacheSize, cities) {
	let answer = 0;
	let queue = [];

	for (var city of cities) {
		city = city.toUpperCase();
		const idx = queue.indexOf(city);

		if (idx !== -1) {
			queue.splice(idx, 1);
			queue.push(city);
			answer += 1;
		} else {
			queue.push(city);
			answer += 5;
		}

		if (queue.length > cacheSize) {
			queue.shift();
		}
	}

	return answer;
}



/* ========================== JadenCase_문자열_만들기 ========================== */
function solution(s) {
	var answer = s.replace(/\w/gi, (c) => c.toLowerCase());
	answer = answer.replace(/^\w| \w/gi, (str) => str.toUpperCase());

	return answer;
}


/* ================================== 기능개발 ================================== */
function solution(progresses, speeds) {
	let answer = [1];

	for (var i = 0; i < progresses.length; i++) {
		progresses[i] = Math.ceil((100 - progresses[i]) / speeds[i]);
	}

	let max_value = progresses[0];
	let j = 0;

	for (var i = 1; i < progresses.length; i++) {
		if (progresses[i] > max_value) {
			max_value = progresses[i];
			answer.push(1);
			j++;
		} else {
			answer[j]++;
		}
	}

	return answer;
}


/* ================================== 후보키 ================================== */
function solution(relation) {
	var answer = [];

	for (var i = 0; i < Math.pow(2, relation[0].length); i++) {
		// bit 값으로 String을 만드며 앞에부터 0을 채움
		var f_bit = Number(i).toString(2).padStart(relation[0].length, "0");
		var hubo_key_pool = new Set();

		answer.push(f_bit);
		for (var tuple of relation) {
			var temp = "";

			// tupe로 조합되는 키
			for (var j = 0; j < f_bit.length; j++) {
				if (f_bit[j] == "1") temp += tuple[j];
			}

			if (hubo_key_pool.has(temp)) {
				answer.pop();
				break;
			} else hubo_key_pool.add(temp);
		}

		// 유일성을 만족하는지? (기존의 가지고 있는 키와 비교)
		for (var hubo_key of answer.slice(0, answer.length - 1)) {
			const isHave =
				(parseInt(hubo_key, 2) & parseInt(f_bit, 2)) == parseInt(hubo_key, 2);
			// 1011 & 0011 == 0011 이면 11이 겹치니 안됨
			if (isHave) {
				answer.pop();
				break;
			}
		}
	}

	return answer.length;
}

/* ============================= 보석쇼핑 ============================= */
// O(n^2)

function solution(gems) {
	var answer = [0, gems.length];
	let all_list = new Set(gems);
	let stack = [];
	let pos = [];

	for (var i = 0; i < gems.length; i++) {
		const cur_in_idx = stack.indexOf(gems[i]);

		if (cur_in_idx !== -1) {
			stack = [stack.splice(cur_in_idx)];
			pos = [pos.splice(cur_in_idx)];
		}
		stack.push(gems[i]);
		pos.push(i);

		if (all_list.size == stack.length) {
			answer =
				answer[1] - answer[0] > pos[pos.length - 1] - pos[0]
					? [pos[0], pos[pos.length - 1]]
					: answer;
		} else {
			answer[0] = Math.max(answer[0], pos[0]);
		}
	}

	return [answer[0] + 1, answer[1] + 1];
}


// Map을 이용
// O(n)
function solution(gems) {
	var answer = [0, gems.length - 1];
	let gem_list = new Set(gems);             // 잼의 종류
	let cur_list = new Map();                 // 현재 가지고 있는 잼(key)의 개수(value)
	let [start, end] = [0, 0];

	cur_list.set(gems[0], 1);

	while (start <= end && end < gems.length) {
		if (cur_list.size === gem_list.size) {
			if (answer[1] - answer[0] > end - start) {
				answer = [start, end];
			}

			if (cur_list.get(gems[start]) - 1 > 0) {
				cur_list.set(gems[start], cur_list.get(gems[start]) - 1);
			} else {
				cur_list.delete(gems[start]);
			}
			start++;
		} else {
			end++;
			cur_list.set(gems[end], (cur_list.get(gems[end]) | 0) + 1);
		}
	}

	return [answer[0] + 1, answer[1] + 1];
}

