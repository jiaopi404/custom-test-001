import { mapGetters } from 'vuex'
import proSpecifyController from '@/api/project/proSpecifyController'
import $util from '@/utils/util'
export default {
  name: 'SubProjectDialog',
  components: {
  },
  props: {
    // subProData: { // 子项目数据
    //   type: Object,
    //   default: null
    // }
  },
  data () {
    return {
      dialogVisible: false, // 对话框
      proSpecifyData: null, // 项目细化项目数据
      formData: {
        proName: '',
        proNumber: '',
        budgetAmount: 0,
        projectSummary: ''
      },
      formRules: {
        proName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { pattern: $util.verification.PRO_NAME_REGEXP, message: $util.verification.PRO_NAME_TIP, trigger: 'blur' }
        ],
        budgetAmount: [
          { required: true, message: '请输入预算金额', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              if (typeof value === 'number') {
                cb()
              } else {
                cb(new Error('请输入数字金额'))
              }
            }
          },
        ],
        projectSummary: [
          { required: true, message: '请输入项目建设摘要', trigger: 'blur' }
        ]
      },
      formOptions: {},
      loading: {
        saveBtn: false
      },
      currentRowId: 0 // 编辑行的 id; 0 表示非编辑状态; 其他值表示 编辑状态; -999 表示 添加行;
    }
  },
  computed: {
    ...mapGetters(['configBaseInfo'])
  },
  methods: {
    /**
     * 保存项目
     */
    async save () {
      try {
        this.loading.saveBtn = true
        await this.$refs['subProjectProSpecifyAddForm'].validate() // 验证
        // 组织数据
        const _proSpecify = JSON.parse(JSON.stringify(this.formData))
        _proSpecify.projectId = this.subProData.id
        _proSpecify.id = this.currentRowId === -999 ? null : this.currentRowId
        // 调取接口
        await proSpecifyController.saveProSpecify(_proSpecify)
        // 告知父组件刷新
        // this.$emit('save-success')
        this.getProSpecifyByProjectId() // 刷新列表
        this.resetAddForm() // 重置表单
        this.loading.saveBtn = false
      } catch (err) {
        console.log('[save pro specify, ERROR]: ', err)
        this.loading.saveBtn = false
      }
    },
    /**
     * 取消编辑
     */
    cancel () {
      this.$refs['subProjectProSpecifyAddForm'].resetFields()
      this.$nextTick(() => {
        this.currentRowId = 0
        this.tableData = this.tableData.filter(item => item.id !== -999)
      })
    },
    /**
     * 重置 编辑表单
     */
    resetAddForm () {
      this.currentRowId = 0 // 当前编辑行置空
      this.formData = {
        proName: '',
        proNumber: '',
        budgetAmount: 0,
        projectSummary: ''
      }
    },
    // ============================ 接口 get ========================
    // ============================ 接口 post ========================
    // ============================ 表单控件 ========================
    // ============================ 初始化表单的数据 ========================
    initAddForm (row) {
      if (this.currentRowId) {
        return
      }
      // this.$refs['subProjectProSpecifyAddDialog'].open(row)
      if (!row) { // 添加行
        this.formData.proNumber = `${this.configBaseInfo.codePrefix || ''}XXXXXXX`
        const _proSpecify = JSON.parse(JSON.stringify(this.formData))
        _proSpecify.id = -999
        this.tableData.push(_proSpecify)
        this.currentRowId = -999 // 添加行, -1 表示非编辑状态, null 表示添加状态, 其他表示编辑状态
      } else { // 编辑行
        for (let key in this.formData) {
          if (!Object.hasOwnProperty.call(this.formData, key)) {
            return
          }
          this.formData[key] = row[key]
        }
        this.currentRowId = row.id
      }
    }
  }
}
