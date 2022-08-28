const arr = [1,2,3,4,1,2,2,2];
const result = arr.reduce((prev, item) => {
  if (!prev[item]) {
    prev[item] = 1;
  } else {
    prev[item] === 1 && prev.result.push(item);
    prev[item]++;
  }
  return prev;
}, { result: [] }).result
console.log(result);

console.log("daily push") // daily push
