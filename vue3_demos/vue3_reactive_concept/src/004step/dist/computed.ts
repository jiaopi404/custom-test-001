import { ref } from './ref'
import { effect } from './effect'
export const computed = (getter: () => any): Ref<any> => {
  const _ref = ref(0)
  effect(() => {
    _ref.value = getter()
  })
  return _ref
}
