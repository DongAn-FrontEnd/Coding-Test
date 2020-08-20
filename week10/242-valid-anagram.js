/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

const countCharacters = (str, list) => {
  for (let ch of str) {
    const idx = ch.charCodeAt(0) - 97;
    list[idx] ? list[idx]++ : (list[idx] = 1);
  }
};

var isAnagram = function(s, t) {
  let ret = true;
  const containList = [new Array(26), new Array(26)];

  countCharacters(s, containList[0]);
  countCharacters(t, containList[1]);

  for (let i = 0; i < 26; i++) {
    if (containList[0][i] !== containList[1][i]) {
      ret = false;
      break;
    }
  }

  return ret;
};
