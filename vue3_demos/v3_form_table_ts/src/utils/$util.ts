import { computed } from 'vue'

class CusUtil {
  lengthLimit (value, length = 10) {
    if (typeof value === 'string' && value) {
      if (value.length > length) {
        return value.slice(0, length - 1) + '...'
      } else {
        return value
      }
    } else if (typeof value === 'number') {
      value = String(value)
      if (value.length > length) {
        return value.slice(0, length - 1) + '...'
      } else {
        return value
      }
    } else {
      return ''
    }
  }

  /**
   * 获取 attrs 中的 $listeners
   * @param attrs
   */
  getListeners (attrs) {
    return computed(() => {
      const _listeners = {}
      for (const [key, value] of Object.entries(attrs)) {
        if (key.startsWith('on')) {
          _listeners[key] = value
        }
      }
      return _listeners
    })
  }
}

const $util = new CusUtil()

export default $util
