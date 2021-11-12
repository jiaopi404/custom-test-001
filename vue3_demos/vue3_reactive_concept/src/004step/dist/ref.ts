import { track, trigger } from './effect'

/**
 * ref
 * @param v
 */
export const ref = <T>(v: T): Ref<T> => {
  let _value = v
  return {
    get value () {
      track(this, 'value')
      return _value
    },
    set value (nv) {
      if (nv === _value) {
        return
      }
      _value = nv
      trigger(this, 'value')
    }
  }
}
