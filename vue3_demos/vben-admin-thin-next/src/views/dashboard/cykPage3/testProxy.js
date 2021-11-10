const arr = [1, 3, 5]

const arrState = new Proxy(arr, {
  get (arr, index) {
    return arr[index]
  },
  set (arr, index, value) {
    console.log(arr, index, value, 'setter')
    arr[index] = value
    return true // 这个必须
  }
})

arrState.push(7)
// arrState.splice(2, 1, 66)
// arrState.pop()
console.log('arr is: ', arr)
