const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})


console.log(222)
p1.then(res => {
  console.log(1)
})
