const $commonServe = {
  /**
   * toString 方法
   * @param value {any}
   * @return {string}
   */
  cusToString (value) {
    return Object.prototype.toString.call(value)
  },
  /**
   * 验证表单域
   * @param formComp {string} 表单组件
   * @param _fields {string}
   * @param rowIndexList 未传递值时，直接验证 _fields
   * @param propTemplate prop 的模板，需要有 $index $prop 进行替换
   * @returns {Promise<unknown>}
   */
  validateFields (formComp, _fields, rowIndexList = [], propTemplate = 'tableData.$index.$prop') {
    return new Promise((resolve, reject) => {
      let _fieldsMultiRow = []
      const $indexRegexp = new RegExp('\\$index')
      const $propRegexp = new RegExp('\\$prop')
      if (rowIndexList.length) {
        _fields.forEach(item => {
          rowIndexList.forEach(rowIndex => {
            const _prop = propTemplate.replace($indexRegexp, rowIndex + '').replace($propRegexp, item)
            _fieldsMultiRow.push(_prop)
          })
        })
      } else {
        _fieldsMultiRow = _fields
      }
      let count = 0
      let _fieldIndex = 0
      const errMsgList = []
      formComp.validateField(_fieldsMultiRow, function (errMsg, errObj) {
        _fieldIndex++
        if (!errMsg) {
          count++
        }
        errMsgList.push({
          fieldIndex: _fieldIndex,
          prop: _fieldsMultiRow[_fieldIndex],
          errMsg
        })
      })
      if (count !== _fieldsMultiRow.length) {
        reject(new Error(`表单验证错误, _fields: ${JSON.stringify(_fieldsMultiRow)}, _errors: ${JSON.stringify(errMsgList)}`))
      }
      resolve()
    })
  }
}

export default $commonServe
