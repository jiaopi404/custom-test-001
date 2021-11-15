import { track, trigger } from './effect'

/**
 * base proxy handler
 */
export const baseProxyHandler: ProxyHandler<any> = {
  get: (target, key, receiver) => {
    // console.log('proxy getter: ', target, key)
    const result = Reflect.get(target, key, receiver) // 反射拿值
    track(target, key) // effect
    return result
  },
  set: (target, key, value, receiver) => {
    // console.log('proxy setter: ', target, key, value)
    const oldValue = target[key]
    if (oldValue === value) {
      return false
    }
    Reflect.set(target, key, value, receiver)
    trigger(target, key)
    return true
  }
}
