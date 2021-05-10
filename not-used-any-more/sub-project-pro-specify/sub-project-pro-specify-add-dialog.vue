<template>
  <el-dialog
    title="添加预算细化"
    :visible.sync="dialogVisible"
    width="50%"
    height="400px"
    style="border-radius: 4px"
    :close-on-click-modal="false"
    custom-class="sub-project-pro-specify-add-dialog"
    @closed="closedHandler"
    :append-to-body="true"
  >
    <el-scrollbar style="height: 350px;">
<!--      // 添加专项项目-->
      <el-form
        :model="formData"
        :rules="formRules"
        ref="subProjectProSpecifyAddForm"
        label-width="150px"
        size="mini"
      >
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="项目名称" prop="proName">
              <el-input
                v-model="formData.proName"
                placeholder="请输入项目名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item required label="项目编号" prop="proNumber">
              <el-input
                v-model="formData.proNumber"
                placeholder="项目编号"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item label="预算金额 (元)" prop="budgetAmount">
              <el-input-number
                v-model="formData.budgetAmount"
                controls-position="right"
                :max="1000000000"
                :precision="2"
                :min="0"
                placeholder="请输入预算金额"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="24" :xs="24">
            <el-form-item required label="金额大写">
              <span>{{ formData.budgetAmount || 0 | n2c }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="项目建设摘要" prop="projectSummary">
              <el-input
                v-model="formData.projectSummary"
                type="textarea"
                :rows="3"
                :autosize="{ minRows: 3, maxRows: 6 }"
                :maxlength="15000"
                placeholder="请输入项目建设摘要"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
<!--      // 添加费用项和经济科目-->
      <pro-fee-item-economic-subject
        v-if="subProData && !subProData.projectCategory.ifOther && dialogVisible && feeItemData && feeItemData.length"
        ref="proFeeItemEconomicSubject"
        :table-data-prop="feeItemData"
        :if-yuan="true"
      ></pro-fee-item-economic-subject>
    </el-scrollbar>
    <div class="m-t-20" slot="footer">
      <el-row type="flex" justify="end">
        <el-button @click="close" size="small">关闭</el-button>
        <el-button @click="save" size="small" type="primary" :loading="loading.saveBtn">保存</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
// components
import ProFeeItemEconomicSubject from '@/views/project/additionalBudget/pro-fee-item-economic-subject'
// utils and so on
import { mapGetters } from 'vuex'
import proSpecifyController from '@/api/project/proSpecifyController'
import $util from '@/utils/util'
import $commonService from '@/utils/common-serve'
import additionalBudgetControllerApi from '@/api/project/additionalBudgetControllerApi'
export default {
  name: 'SubProjectDialog',
  components: {
    ProFeeItemEconomicSubject
  },
  props: {
    subProData: { // 子项目数据
      type: Object,
      default: null
    }
  },
  data () {
    const proSpecifyNameValidator = (rule, value, cb) => {
      proSpecifyController.checkProSpecifyRepeat(
        value,
        this.subProData.id,
        this.proSpecifyData && this.proSpecifyData.id
      ).then(res => {
        if (res.data) {
          cb()
        } else {
          cb(new Error('名称重复'))
        }
      }).catch(err => {
        cb(new Error(err.msg || err.message || '接口失效, 请重试'))
      })
    }
    const proSpecifyNameValidatorDebounce = $commonService.debounce(proSpecifyNameValidator, 500)
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
          { pattern: $util.verification.PRO_SPECIFY_NAME_REGEXP, message: $util.verification.PRO_SPECIFY_NAME_TIP, trigger: 'blur' },
          { validator: proSpecifyNameValidatorDebounce }
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
      feeItemData: null // 费用项 + 经济科目数据
    }
  },
  computed: {
    ...mapGetters(['configBaseInfo'])
  },
  methods: {
    // ============================ 生成 与 关闭 ========================
    /**
     * 打开对话框 ref 调用
     */
    open (proSpecifyData) {
      this.dialogVisible = true
      this.proSpecifyData = proSpecifyData || null
      this.init()
      this.getProFeeItemEconomicsByProId()
      console.log('this.subProData is: ', this.subProData)
    },
    /**
     * 保存项目
     */
    async save () {
      try {
        this.loading.saveBtn = true
        await this.validate()
        // 组织数据
        const _proSpecify = JSON.parse(JSON.stringify(this.formData))
        _proSpecify.proNumber = null
        _proSpecify.projectId = this.subProData.id
        _proSpecify.id = this.proSpecifyData ? this.proSpecifyData.id : null
        const _feeItemList = this.$refs['proFeeItemEconomicSubject'] && this.$refs['proFeeItemEconomicSubject'].getTableDataRef()
        // 调取接口
        await proSpecifyController.saveProSpecifyAndProFeeItem(_proSpecify, _feeItemList || [])
        // 告知父组件刷新
        this.$emit('save-success')
        this.dialogVisible = false
        this.loading.saveBtn = false
      } catch (err) {
        console.log('Error: Method [save proSpecify dialog]', err)
        if (err.msg || err.message) {
          this.$message.error(err.msg || err.message)
        }
        this.loading.saveBtn = false
      }
    },
    close () {
      this.dialogVisible = false
    },
    /**
     * 弹窗动画关闭
     */
    closedHandler () {
      // this.$refs['subProjectProSpecifyAddForm'].resetFields()
      this.formData = { // 手动初始化
        proName: '',
        proNumber: '',
        budgetAmount: 0,
        projectSummary: ''
      }
    },
    // ============================ 接口 get ========================
    /**
     * 根据项目 id 获取 项目费用项 和 经济科目数据
     */
    async getProFeeItemEconomicsByProId () {
      try {
        const res = await additionalBudgetControllerApi.getProFeeItemEconomicsByProId(
          this.subProData.id,
          this.proSpecifyData ? this.proSpecifyData.id : null
        )
        if (!this.proSpecifyData) { // 表示添加 细化项目, 拉取项目 费用项数据
          // 清空 amount 值
          $commonService.treeForEach(res.data, item => {
            item.amount = 0
            if (item.listEconomics && item.listEconomics.length) {
              item.listEconomics.forEach(economic => {
                economic.amount = 0
              })
            }
          })
        }
        this.feeItemData = res.data
      } catch (err) {
        console.log('Error: Method [getProFeeItemEconomicsByProId]', err)
        this.$message.error(`获取${this.feeItemOrEconomicsName}数据失败`)
      }
    },
    // ============================ 接口 post ========================
    // ============================ 表单控件 ========================
    // ============================ 初始化表单, 表单验证 ========================
    init () {
      if (!this.proSpecifyData) { // 新建
        // 项目编号
        this.formData.proNumber = `${this.configBaseInfo.codePrefix || ''}${this.subProData.year}XXXXX`
      } else {
        ['proName', 'proNumber', 'budgetAmount', 'projectSummary'].forEach(item => {
          this.formData[item] = this.proSpecifyData[item]
        })
      }
    },
    /**
     * 验证
     * @return {Promise<void>}
     */
    async validate () {
      await this.$refs['subProjectProSpecifyAddForm'].validate() // 验证
      // 验证经济科目
      this.$refs['proFeeItemEconomicSubject'] && this.$refs['proFeeItemEconomicSubject'].validateBeforeSave()
      // 验证费用项合计与 预算金额
      if (this.subProData && !this.subProData.projectCategory.ifOther && this.feeItemData && this.feeItemData.length) {
        const feeItemAllAmount = this.$refs['proFeeItemEconomicSubject'].getAllAmountRef()
        if (feeItemAllAmount !== this.formData.budgetAmount) {
          throw new Error('费用项合计金额与预算金额不相等')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-project-pro-specify-add-dialog {}
</style>
