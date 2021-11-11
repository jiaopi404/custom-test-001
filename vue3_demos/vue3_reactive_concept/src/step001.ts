// const price = 5
// const quantity = 10
// let total = 0
//
// let dep = new Set<Effect>() // save the effect，依赖关系
//
// // some effect
// let effect = () => { total = price * quantity }
// function track () {
//   dep.add(effect)
// }
// function trigger () {
//   dep.forEach(effect => {
//     effect()
//   })
// }
//
// console.log('before trigger, total: ', total)
//
// track()
// trigger()
//
// console.log('after trigger, total: ', total)
