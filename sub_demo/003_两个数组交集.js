

// Problem: 求两个数组的交集
const firstArray = [2, 2, 4, 1];
const secondArray = [1, 2, 0, 2];
// 实现 intersection 函数
// @interview start

function intersection (arr1, arr2)  {
  return arr1.filter(item => arr2.indexOf(item) !== -1).reduce((prev, item) => {
    if (prev.indexOf(item) === -1) {
      prev.push(item);
    }
    return prev;
  }, []);
}

function intersection2 (arr1, arr2) {
  return [...new Set(arr1.filter(item => arr2.indexOf(item) !== -1))];
}

function intersection3 (arr1, arr2) {
  return [...new Set(arr1.filter(item => arr2.indexOf(item) !== -1))];
}

console.log(intersection(firstArray, secondArray));
console.log(intersection2(firstArray, secondArray));
console.log(intersection3(firstArray, secondArray));
console.log('爱js')
console.log('爱js')
console.log('爱js❤️')
