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
}

const $util = new CusUtil()

export default $util
