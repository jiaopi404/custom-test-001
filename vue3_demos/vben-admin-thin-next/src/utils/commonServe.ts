import { decodeByBase64, encryptByBase64 } from '/@/utils/cipher'

/**
 * 工具类
 */
class CommonServe {
  constructor () {
  }
  // ======================== [obj == base64] ===========================
  objToBase64 (obj) {
    return encryptByBase64(JSON.stringify(obj))
  }
  base64ToObj (base64Str) {
    return JSON.parse(decodeByBase64(base64Str))
  }
  treeForEach(data, fn, level = 0) {
    level = 0
    data.forEach(item => {
      fn(item, level)
      if (item.children && item.children.length) {
        this.treeForEach(item.children, fn, level + 1)
      }
    })
  }
}

const $commonServe = new CommonServe()
export default $commonServe
