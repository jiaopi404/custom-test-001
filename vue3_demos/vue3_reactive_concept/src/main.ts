// interface Recordable {
//   [key: string]: unknown
// }
//
// const state: Recordable = {
//   foo: 1,
//   bar: 2
// }
//
// const stateProxy = new Proxy(state, {
//   get (obj, key: string) {
//     return obj[key]
//   },
//   set (obj, key: string, value: unknown) {
//     console.log('setter: ', obj, key, value)
//     obj[key] = value
//     return true
//   }
// })
//
// stateProxy.foo = 20
//
// // 测试 ref？
//
// function ref<T> (value: T) {
//   return {
//     _value: value, // 私有属性
//     get value (): T {
//       return this._value
//     },
//     set value (v: T) {
//       console.log('ref setter', v)
//       this._value = v
//     }
//   }
// }
//
// const count = ref(8)
//
// console.log('ref count is: ', count)
// count.value = 20
