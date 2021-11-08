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
}

const $commonServe = new CommonServe()
export default $commonServe
