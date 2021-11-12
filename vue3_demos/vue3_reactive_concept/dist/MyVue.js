"use strict";
// const targetMap = new WeakMap<any, DepsMap>()
// let activeEffect: Effect | null = null
// export const effect = (eff: Effect) => {
//   activeEffect = eff
//   activeEffect() // 会触发 Proxy 或 ref 的 getter
//   activeEffect = null
// }
//
// function track(target: any, key: string) {
//   let depsMap: DepsMap | undefined = targetMap.get(target)
//   if (!depsMap) {
//     depsMap = new Map<string, Set<Effect>>()
//     targetMap.set(target, depsMap)
//   }
//   let dep = depsMap.get(key)
//   if (!dep) {
//     dep = new Set<Effect>()
//     depsMap.set(key, dep)
//   }
//   if (activeEffect) {
//     dep.add(activeEffect)
//   }
// }
//
// function trigger (target: any, key: string) {
//   let depsMap: DepsMap | undefined = targetMap.get(target)
//   if (depsMap) {
//     let dep = depsMap.get(key)
//     console.log('trigger', key, ', depLength: ', dep && dep.size)
//     if (dep) {
//       dep.forEach(effect => effect())
//     }
//   }
// }
//
// export function reactive<T extends object>(target: T) {
//   const _handler: ProxyHandler<typeof target> = {
//     get: (_target, key: string, receiver) => {
//       console.log('proxy getter', JSON.stringify(_target), key)
//       const result = Reflect.get(_target, key, receiver)
//       track(_target, key)
//       return result
//     },
//     set: (_target, key: string, value, receiver) => {
//       console.log('proxy setter', JSON.stringify(_target), key, value)
//       const oldValue = (_target as { [key: string | number]: any })[key]
//       if (oldValue === value) {
//         return false
//       }
//       Reflect.set(_target, key, value, receiver)
//       trigger(_target, key)
//       return true
//     }
//   }
//   return new Proxy(target, _handler)
// }
//
// export const ref = <T>(target: T): Ref<T> => {
//   // 新建一个对象，返回，闭包闭起来
//   let _value = target
//   const _obj = {
//     get value () {
//       track(_obj, 'value')
//       console.log('in ref getter: ', _value)
//       return _value
//     },
//     set value (v) {
//       console.log('in ref setter: ', v)
//       // ref 的value的改变
//       const oldValue = _value
//       if (oldValue !== v) {
//         trigger(_obj, 'value')
//         _value = v
//       }
//     }
//   }
//   return _obj
// }
//
// export const computed = (getter: () => any) => {
//   const result = ref(0)
//   effect(() => {
//     result.value = getter()
//   })
//   return result
// }
