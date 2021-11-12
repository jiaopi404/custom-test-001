// import { ref, reactive, computed, effect } from './MyVue'
//
// const product = reactive({ price: 2, quantity: 5 })
//
// // let total = 0
// //
// // effect(() => {
// //   total = product.price + product.quantity
// //   console.log('in effect, total is: ', total)
// // })
//
// const totalRef = computed(() => {
//   return product.price + product.quantity
// })
//
// console.log('total value is: ', totalRef.value)
// product.price = 3
// console.log('total value is: ', totalRef.value)
