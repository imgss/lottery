export function random(max) {
  return Math.floor(Math.random() * max);
}

/**
 * 
 * @param {string[]} names 候选人列表 
 * @param {number} count 有几个获奖的人 
 */
export function getLucks(names, count = 1) {
  if (names.length < count) {
    return names;
  }
  const result = [];
  while (result.length < count) {
    const luckyOne = names[random(names.length)];
    console.log(luckyOne);
    if (!result.includes(luckyOne)) {
      result.push(luckyOne)
    }
  }
  return result;
}