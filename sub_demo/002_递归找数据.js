const _ = require('lodash');
const _data = [{id: 1, name: '2', children: [{id: 2, name: '33', children: []}]}];

// function recursiveGetById (data, id, result) {
//   if (data.id === id) {
//     result.push(data);
//     return;
//   }
//   data.children.forEach(item => recursiveGetById(item, id, result))
// }
//
// const result = [];
// recursiveGetById({ children: _data }, 2, result)
// console.log(result);

function recursive2 (list, id, result) {
  if (!list || list.length === 0) {
    return result;
  }
  for (const item of list) {
    if (item.id === id) {
      result = item;
    }
    if (result && result.id === id) {
      return result;
    }
    const _result = recursive2(item.children, id, result);
    if (_result) {
      return _result;
    }
  }
}

console.log(recursive2(_data, 2, null));
console.log(recursive2(_data, 2, null)); // daily push
console.log(recursive2(_data, 2, null)); // daily push
console.log(recursive2(_data, 2, null)); // daily push

const a = {
  foo: 1,
  bar: 2
}

const b = { ...{foo:1,bar:2} };
console.log(b);
