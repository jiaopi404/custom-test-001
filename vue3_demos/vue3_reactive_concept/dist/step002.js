"use strict";
// // ======================== [deps Map] ===========================
// const depsMap = new Map<string, Set<Effect>>()
//
// const track = (key: string, effect: Effect) => {
//   let dep = depsMap.get(key)
//   if (!dep) {
//     dep = new Set<Effect>()
//     depsMap.set(key, dep)
//   }
//   dep.add(effect)
// }
// const trigger = (key: string) => {
//   let dep = depsMap.get(key)
//   dep && dep.forEach(effect => effect())
// }
//
// const product = { price: 2, quantity: 5 }
// let total = 0
//
// const effect: Effect = () => {
//   total = product.price * product.quantity
// }
//
// track('price', effect)
//
// console.log('before trigger, total: ', total)
// trigger('price')
// console.log('after trigger, total: ', total)
