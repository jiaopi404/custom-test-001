import $util from 'utils/util'

const $commonService = {
  /**
   * 常量
   */
  // 连续提交等待时间
  loadingTime: 6,
  // 允许上传的图片类型 gif,jpg,png,bmp
  imageTypes: ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/bmp'],
  /**
   * 允许上传的文件类型
   doc   'application/msword'
   docx  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
   xls   'application/vnd.ms-excel'
   xlsx  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
   ppt   'application/vnd.ms-powerpoint'
   pptx  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
   pub   'application/vnd.ms-publisher'
   txt   'text/plain'
   pdf   'application/pdf'
   dxf   'application/dxf'
   dwg   'application/acad'
   dwf   'application/x-dwf'
   * @type {number}
   */
  fileType1: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pub', 'txt', 'pdf', 'dxf','dwg', 'dwf', 'bak', 'dwt', 'zip', 'rar'],
  fileType2: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    , 'application/vnd.ms-publisher', 'text/plain', 'application/pdf', 'application/dxf', 'application/zip', 'application/acad', 'application/x-dwf', 'application/x-zip-compressed', 'application/octet-stream'],
  fileTypes: [],
  // 允许上传的单个文件大小默认 5M (单位MB)
  // allowUploadMaxSize: store.state.config.configInfo ? Number(store.state.config.configInfo.configBaseInfo.uploadImageMaxSize) : null,
  // // token名称
  // token = `${environment.localStoragePrefix}` + '-session-token';
  // 游客可访问url (首页, 注册, 忘记密码, 登录)
  noLoginCanActiveUrl: [
    '/auth/register',
    '/auth/forgetPW',
    '/auth/login/simple'
  ],
  // admin登录后可访问的菜单
  adminLoginCanActiveUrl: [
    '/dashboard/default',
    '/dashboard/index',
    '/person', '/proConfig', '/position', '/department', '/user',
    '/dictionary', '/organization', '/warning',
    '/countersign', '/goodsUnit', '/goods',
    '/downloadType', '/download', ''],
  // 用户登陆后可访问的菜单
  // TODO
  purchaseLoginCanActiveUrl: [],
  // 下拉框拼接
  getNameAndCode(option) {
    if (option.code) {
      return option.code + ' - ' + option.name
    } else {
      return option.name
    }
  },
  // 树级结构进行拼接name+code
  getTreeNode(data) {
    for (const i of data) {
      if (i['code']) {
        i['name'] = i['code'] + ' - ' + i['name']
      }
      if (i['children'] && i['children'].length > 0) {
        this.getTreeNode(i['children'])
      }
    }
  },

  // 树级结构区分启用禁用
  getTreeData(data) {
    for (const i of data) {
      if (i['useMark'] === 0) {
        i['name'] = i['name'] + '（禁用）'
      }
      if (i['children'] && i['children'].length > 0) {
        this.getTreeData(i['children'])
      }
    }
  },
  // 局部字典呈现拼接name+code
  getNameAndCodeArr(option) {
    if (option['code']) {
      return option['code'] + ' - ' + option['name']
    } else {
      return option['name']
    }
  },
  getBlockNumAndProName(option) {
    return '第' + option.blockNum + '标段 - （' + option.proName + '）'
  },

  // 通用项目人及电话呈现拼接
  customPerAndTel(perName, mobile) {
    // return perName + '(' + mobile + ')' ;
    return mobile ? perName + '（' + mobile + '）' : perName + ''
  },
  /**
   * 模态框确定
   * @param url
   * @param body
   * @param shortMsg
   * @param title
   * @param {Http} httpStatus
   * @param {boolean} isNotShowSuccessAlert
   * @param {string} msg
   * @returns {any}
   */
  /**
   * 同步方法
   */
  regTest: (reg, value) => reg.test(value),

  // 判断是不是允许的图片类型
  isAllowImage: v => $commonService.imageTypes.indexOf(v) > -1,

  // 判断是否是允许的文件类型(flag: 是否包括图片格式)
  isAllowFile: (v, num, flag) => {
    if (num === 1) {
      $commonService.fileTypes = $commonService.fileType1
    } else if (num === 2) {
      $commonService.fileTypes = $commonService.fileType2
    }
    if (flag) {
      return $commonService.imageTypes.indexOf(v) > -1 || $commonService.fileTypes.indexOf(v) > -1
    } else {
      return $commonService.fileTypes.indexOf(v) > -1
    }
  },

  // 判断单个上传文件大小是否符合
  isAllowUploadMaxSize: (v, myMaxSize) => myMaxSize ? v / 1024 / 1024 < myMaxSize : v / 1024 / 1024 < $commonService.allowUploadMaxSize,
  debounce(fn, milliseconds) {
    let timer = 0
    return function () {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, milliseconds)
    }
  },
  /**
   * 节流
   * @param fn
   * @param milliseconds
   * @return {function(...[*]=)}
   */
  throttle (fn, milliseconds) {
    let timer = 0
    return function () {
      if (timer) {
        return
      }
      fn.apply(this, arguments)
      timer = setTimeout(() => {
        timer = 0
      }, milliseconds)
    }
  },
  /**
   * 树转扁平化数据方法
   * @param data []
   * @param fn 参数 item
   * @return []
   */
  treeFlat(data, fn) {
    const result = []
    data.forEach(item => {
      result.push(fn(item))
      if (item.children && item.children.length) {
        result.push(...this.treeFlat(item.children, fn))
      }
    })
    return result
  },
  /**
   * 扁平专属
   * @param data
   * @param fields 字段名
   * @returns {*}
   */
  flatToTree (data, fields = { ID: 'id', PARENT: 'parentId', CHILDREN: 'children' }) {
    if (typeof fields !== 'object') {
      fields = { ID: 'id', PARENT: 'parentId', CHILDREN: 'children' }
    }
    const ID = fields.ID || 'id'
    const PARENT = fields.PARENT || 'parentId'
    const CHILDREN = fields.CHILDREN || 'children'
    const parentIdMap = {
      root: []
    }
    data.forEach(item => {
      if (!item[PARENT]) {
        parentIdMap['root'].push(item)
        return
      }
      if (!Object.prototype.hasOwnProperty.call(parentIdMap, item[PARENT])) {
        parentIdMap[item[PARENT]] = []
      }
      parentIdMap[item[PARENT]].push(item)
    })
    const result = {}
    this.connector(result, 'root', parentIdMap, { CHILDREN, ID })
    // console.log(result.children)
    return result[CHILDREN]
  },

  connector (result, key, parentMap, { CHILDREN, ID }) {
    if (parentMap[key]) {
      result[CHILDREN] = parentMap[key]
      result[CHILDREN].forEach(item => {
        this.connector(item, item[ID], parentMap, { CHILDREN, ID })
      })
    } else {
      return result
    }
  },
  /**
   * 树 找到某个节点 的方法
   * @param data []
   * @param fn 参数 item
   * @return {*|null|obj}
   */
  treeFind(data, fn) { // treeFind 方法找到某个节点
    for (const item of data) {
      if (fn(item)) { // 找到, 返回节点
        return item
      }
      if (item.children && item.children.length) {
        const tmpResult = this.treeFind(item.children, fn)
        if (tmpResult) {
          return tmpResult
        }
      }
    }
    return null
  },
  /**
   * 树 过滤方法, 过滤掉 fn 返回 falsy 的数据
   * @param data
   * @param fn
   * @return {*}
   */
  treeFilter(data, fn) {
    return data.filter(item => {
      if (item.children && item.children.length) {
        item.children = this.treeFilter(item.children, fn)
      }
      return fn(item)
    })
  },
  treeMap(data, fn) {
    const $data = JSON.parse(JSON.stringify(data))
    this.treeForEach($data, fn)
    return $data
  },
  treeForEach(data, fn, level) {
    level = 0
    data.forEach(item => {
      fn(item, level)
      if (item.children && item.children.length) {
        this.treeForEach(item.children, fn, level + 1)
      }
    })
  },
  /**
   * 树归并方法
   * @param data 树数据
   * @param fn 迭代器, 参数 (prev, item, index)
   * @param prev 归并初始值, 默认 0
   * @return {*}
   */
  treeReduce (data, fn, prev = 0) {
    data.forEach((item, index) => {
      prev = fn(prev, item, index)
      if (item.children && item.children.length) {
        prev = this.treeReduce(item.children, fn, prev)
      }
    })
    return prev
  },
  /**
   * 修正 tree 的 children 字段, 当 children 字段下为空数组, 修正为 undefined
   * @param treeData
   * @return {*}
   */
  amendTreeChildren (treeData) {
    this.treeForEach(treeData, item => {
      if (item.children && !item.children.length) {
        item.children = undefined
      }
    })
    return treeData
  },
  /**
   * 转万
   * @param number
   * @return {number}
   */
  to10Thousand (number) {
    return Number(((number) / 10000).toFixed(6))
  },
  /**
   * 树 组合字段 通用方法 + 修正树的 children 字段; 注! 会修改原数组
   * @param data 树数据
   * @param paramArr 默认 [code, name]
   * @param resultField 默认 name
   * @param amendChildren 是否要修正树的 children 字段 默认 true
   */
  amendChildrenAndCombineCodeAndNameForTree (data, paramArr, resultField, amendChildren) {
    if (!paramArr) {
      paramArr = ['code', 'name']
    }
    if (!resultField) {
      resultField = 'name'
    }
    if (typeof amendChildren === 'undefined') {
      amendChildren = true
    }
    this.treeForEach(data, item => {
      const valueArr = paramArr.map(param => item[param])
        .filter(value => Object.prototype.toString.call(value) !== '[object Null]' && typeof value !== 'undefined' && value !== '')
      item['_' + resultField] = item[resultField] // 将原本的值进行缓存
      item[resultField] = valueArr.join(' - ')
      if (amendChildren) {
        if (item.children && !item.children.length) {
          item.children = undefined
        }
      }
    })
    return data
  },
  /**
   * 判断两个数字是否在误差范围内相等
   * @param num1
   * @param num2
   * @param precision 精度， 10^-precision
   * @return {boolean}
   */
  ifNumberEqual (num1, num2, precision = 6) {
    return Math.abs(num1 - num2) < Math.pow(10, -1 * precision)
  },
  getGreetingNote () {
    const hour = new Date().getHours()
    if (hour <5) {
      return '晚上好'
    } else if (hour >= 5 && hour < 9) {
      return '早上好'
    } else if (hour >= 9 && hour < 11) {
      return '上午好'
    } else if (hour >= 11 && hour < 13) {
      return '中午好'
    } else if (hour >= 13 && hour < 18) {
      return '下午好'
    } else if (hour >= 18) {
      return '晚上好'
    }
  },
  /**
   * 小数位格式化，最终结果 Number
   * @param num
   * @param precision
   * @returns {number}
   */
  toFixedNumber (num, precision = 2) {
    if (typeof num !== 'number' || !num) {
      return 0
    }
    return Number(num.toFixed(precision))
  },
  /**
   * 分页多选的逻辑
   * @param selected 多页选中的 item id
   * @param selection 当前页选中的 rows
   * @param row 当前行
   */
  pageSelected (selected, selection, row) {
    // 1. 如果 row 在 selection 中，表示选中
    // 2. 如果 row 不在 selection 中，表示反选
    // 3. 根据选中与反选，修改 selected
    const selectionIndexOfRow = selection.findIndex(item => item.id === row.id)
    if (selectionIndexOfRow === -1) { // 找不到，删除
      selected.splice(selected.indexOf(row.id), 1)
    } else {
      selected.push(row.id)
    }
    return selected
  },
  // /**
  //  * 分页多选逻辑，为 @selection-change
  //  * @param selected
  //  * @param selection
  //  * @param tableData
  //  * @return {*}
  //  */
  // pageSelectedForSelectionChange (selected, selection, tableData) {
  //   // 1. 如果 selection 中有，表示选中了
  //   // 2. 如果 selection 中没有，表示没选中
  //   // 3. 分两组，分别处理
  //   const _pageSelected = tableData.filter(item => selection.findIndex(selectedItem => selectedItem.planDrawmoneyInfo.id === item.planDrawmoneyInfo.id) > -1)
  //   const _pageNotSelected = tableData.filter(item => selection.findIndex(selectedItem => selectedItem.planDrawmoneyInfo.id === item.planDrawmoneyInfo.id) === -1)
  //   _pageSelected.forEach(item => {
  //     if (selected.indexOf(item.planDrawmoneyInfo.id) === -1) { // 没有，添加进
  //       selected.push(item.planDrawmoneyInfo.id)
  //     }
  //   })
  //   _pageNotSelected.forEach(item => {
  //     const _index = selected.indexOf(item.planDrawmoneyInfo.id)
  //     if (_index > -1) { // 有，删掉
  //       selected.splice(_index, 1)
  //     }
  //   })
  //   return selected
  // },
  // pageSelectionChange (selected, selection, tableData) {
  //   // 1. 如果 selection 中有，表示选中了
  //   // 2. 如果 selection 中没有，表示没选中
  //   // 3. 分两组，分别处理
  //   const _pageSelected = tableData.filter(item => selection.findIndex(selectedItem => selectedItem.rmbSettlementAccount.id === item.rmbSettlementAccount.id) > -1)
  //   const _pageNotSelected = tableData.filter(item => selection.findIndex(selectedItem => selectedItem.rmbSettlementAccount.id === item.rmbSettlementAccount.id) === -1)
  //   _pageSelected.forEach(item => {
  //     if (selected.indexOf(item.rmbSettlementAccount.id) === -1) { // 没有，添加进
  //       selected.push(item.rmbSettlementAccount.id)
  //     }
  //   })
  //   _pageNotSelected.forEach(item => {
  //     const _index = selected.indexOf(item.rmbSettlementAccount.id)
  //     if (_index > -1) { // 有，删掉
  //       selected.splice(_index, 1)
  //     }
  //   })
  //   return selected
  // },
  // paySelected (selected, selection, tableData) {
  //   // 1. 如果 row 在 selection 中，表示选中
  //   // 2. 如果 row 不在 selection 中，表示反选
  //   // 3. 根据选中与反选，修改 selected
  //   const _pageSelected = tableData.filter(item => selection.findIndex(selectedItem => selectedItem.rmbreimburse.id === item.rmbreimburse.id) > -1)
  //   const _pageNotSelected = tableData.filter(item => selection.findIndex(selectedItem => selectedItem.rmbreimburse.id === item.rmbreimburse.id) === -1)
  //   _pageSelected.forEach(item => {
  //     if (selected.indexOf(item.rmbreimburse.id) === -1) { // 没有，添加进
  //       selected.push(item.rmbreimburse.id)
  //     }
  //   })
  //   _pageNotSelected.forEach(item => {
  //     const _index = selected.indexOf(item.rmbreimburse.id)
  //     if (_index > -1) { // 有，删掉
  //       selected.splice(_index, 1)
  //     }
  //   })
  //   return selected
  // },
  /**
   * 分页多选逻辑，为 @selection-change
   * @param selected
   * @param selection
   * @param tableData
   * @param prop 获取值，取值的路径
   * @return {*}
   */
  pageSelectedForSelectionChangeCustomProp (selected, selection, tableData, prop = 'id') {
    // 1. 如果 row 在 selection 中，表示选中
    // 2. 如果 row 不在 selection 中，表示反选
    // 3. 根据选中与反选，修改 selected

    const _pageSelected = tableData.filter(item => selection.findIndex(selectedItem => $commonService.valueGetter(selectedItem, prop) === $commonService.valueGetter(item, prop)) > -1)
    const _pageNotSelected = tableData.filter(item => selection.findIndex(selectedItem => $commonService.valueGetter(selectedItem, prop) === $commonService.valueGetter(item, prop)) === -1)
    _pageSelected.forEach(item => {
      if (selected.indexOf($commonService.valueGetter(item, prop)) === -1) { // 没有，添加进
        selected.push($commonService.valueGetter(item, prop))
      }
    })
    _pageNotSelected.forEach(item => {
      const _index = selected.indexOf($commonService.valueGetter(item, prop))
      if (_index > -1) { // 有，删掉
        selected.splice(_index, 1)
      }
    })
    return selected
  },
  /**
   * 剩余金额 getter，计算剩余金额，返回数字
   * @param project
   */
  remainAmountGetterNumber (project) {
    return project.finalAmount - project.carryOverAmount - project.employAmount - project.alreadyReAmount
  },
  /**
   * 剩余金额 getter
   * @param project 项目对象
   * @param ifYuan 单位是否是元
   * @returns {string}
   */
  remainAmountGetter (project, ifYuan = 1) {
    const remainAmount = $commonService.remainAmountGetterNumber(project)
    if (ifYuan) {
      return $util.toThousand(remainAmount, 2) // 元
    } else { // 万元
      return $util.toThousand(remainAmount / 10000, 6) // 元
    }
  },
  codeNameFilter (object, codeNameField = { code: 'code', name: 'name' }) {
    if (!codeNameField || !codeNameField.code || typeof codeNameField.code !== 'string' || !codeNameField.name || typeof codeNameField.name !== 'string') {
      codeNameField = {
        code: 'code',
        name: 'name'
      }
    }
    return object ? (
      object[codeNameField.code] ? `${object[codeNameField.code]}-${object[codeNameField.name]}` : (object[codeNameField.name] || '-')
    ) : '-'
  },
  /**
   * 递归获取名字
   * @param obj
   * @param nameArr
   * @param fields
   * @param connector
   * @returns {*}
   */
  getNameRecursive (obj, nameArr = [], fields = { name: 'name', parent: 'parent' }, connector = '/') {
    if (!obj) {
      return nameArr.join(connector)
    } else {
      if (obj.parent) {
        nameArr.push(obj[fields.name])
      }
      return $commonService.getNameRecursive(obj.parent, nameArr, fields, connector)
    }
  },
  /**
   * 清洗外键，防止发送数据过于庞大
   * @param data
   * @param foreignKeyPropList
   */
  cleanForeignKey (data, foreignKeyPropList) {
    foreignKeyPropList.forEach(item => {
      data[item] = data[item] ? { id: data[item].id } : null
    })
  },
  cloneShallowWithForeignKeyId (obj, disabledKeyList = []) {
    return Object.entries(obj).reduce((prev, [key, value]) => {
      if (disabledKeyList.indexOf(key) > -1) { // 禁用的列名
        return prev
      }
      if (typeof value === 'object' && value) { // 表明是对象，且有值，取其中的 id
        prev[key] = { id: value.id }
      } else {
        prev[key] = value
      }
      return prev
    }, {})
  },
  /**
   * 获取值
   * @param row
   * @param prop
   * @return {null|*}
   */
  valueGetter (row, prop) {
    let value = row
    if (prop === '') {
      return row
    }
    try {
      const propList = prop.split('.')
      propList.forEach(propItem => {
        value = value[propItem]
      })
      return value
    } catch (err) {
      // 空指针错误一般是
      return null
    }
  },
  /**
   * 添加 css 样式表规则，调用 以及 参数规则如下：
   * addStylesheetRules([
       ['h2', // 还接受第二个参数作为数组中的数组
       ['color', 'red'],
       ['background-color', 'green', true], // 'true' for !important rules
       ],
       ['.myClass',
       ['background-color', 'yellow'],
       ],
     ])
   * @param decls
   * @return {*[]} cssRuleIndexArr 返回添加的规则的index列表，方便删除
   */
  addStylesheetRules(decls) {
    let style = document.createElement('style')
    document.getElementsByTagName('head')[0].appendChild(style)
    if (!window.createPopup) { /* For Safari */
      style.appendChild(document.createTextNode(''))
    }
    let s = document.styleSheets[document.styleSheets.length - 1]
    let cssRuleIndexArr = []
    for (let i = 0, dl = decls.length; i < dl; i++) {
      let j = 1, decl = decls[i], selector = decl[0], rulesStr = ''
      if (Object.prototype.toString.call(decl[1][0]) === '[object Array]') {
        decl = decl[1]
        j = 0
      }
      for (let rl = decl.length; j < rl; j++) {
        let rule = decl[j]
        rulesStr += rule[0] + ':' + rule[1] + (rule[2] ? ' !important' : '') + ';\n'
      }

      cssRuleIndexArr.push(s.cssRules.length)
      console.log('rules str is: ', rulesStr)
      if (s.insertRule) {
        s.insertRule(selector + '{' + rulesStr + '}', s.cssRules.length)
      } else { /* IE */
        s.addRule(selector, rulesStr, -1)
      }
    }
    return cssRuleIndexArr
  },
  /**
   * 删除指定 index 的样式规则或者
   * @param index
   */
  delStylesheetRules(index) {
    let s = document.styleSheets[document.styleSheets.length - 1]
    if (index) {
      s.deleteRule(index)
    } else {
      s.deleteRule(s.cssRules.length - 1)
    }
  },
  /**
   * 生成 uuid
   * @return {string}
   */
  uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
  },
  /**
   * 验证表单域
   * @param formComp 表单组件
   * @param _fields
   * @param rowIndexList 未传递值时，直接验证 _fields
   * @param propTemplate prop 的模板，需要有 $index $prop 进行替换
   * @returns {Promise<unknown>}
   */
  validateFields (formComp, _fields, rowIndexList = [], propTemplate = 'tableData.$index.$prop') {
    return new Promise((resolve, reject) => {
      let _fieldsMultiRow = []
      const $indexRegexp = new RegExp("\\$index")
      const $propRegexp = new RegExp("\\$prop")
      if (rowIndexList.length) {
        _fields.forEach(item => {
          rowIndexList.forEach(rowIndex => {
            let _prop = propTemplate.replace($indexRegexp, rowIndex + '').replace($propRegexp, item)
            _fieldsMultiRow.push(_prop)
          })
        })
      } else {
        _fieldsMultiRow = _fields
      }
      let count = 0
      let _fieldIndex = 0
      let errMsgList = []
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
        reject(`表单验证错误, _fields: ${JSON.stringify(_fieldsMultiRow)}, _errors: ${JSON.stringify(errMsgList)}`)
      }
      resolve()
    })
  },
  /**
   * 返回一个浅拷贝对象，移除一个 key
   * @param obj
   * @param key
   * @return {{}}
   */
  removeKey (obj, key) {
    return Object.entries(obj).reduce((prev, [_key, _value]) => {
      if (_key === key) {
        return prev
      } else {
        prev[_key] = _value
      }
      return prev
    }, {})
  },
  /**
   * 删除某个元素
   * @param arr any[]
   * @param args any[]
   */
  deleteElements(arr, ...args) {
    args.forEach(toDelItem => {
      const _index = arr.findIndex(item => Object.is(item, toDelItem))
      if (_index > -1) {
        arr.splice(_index, 1)
      }
    })
  }
}
export default $commonService
