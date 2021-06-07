<template>
  <el-dialog
    :title="subProData ? '编辑项目' : '添加项目'"
    :visible.sync="dialogVisible"
    width="50%"
    height="400px"
    style="border-radius: 4px"
    :close-on-click-modal="false"
    custom-class="add-sub-project-dialog"
    @closed="closedHandler"
  >
    <el-scrollbar
      :style="{
        height: (feeItemData && feeItemData.length && subProData && !subProData.projectCategory.ifOther) ? '350px' : '250px'
      }"
    >
      <el-form
        :model="formData"
        :rules="formRules"
        ref="addSubProjectFormRef"
        label-width="150px"
        size="mini"
      >
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item :label="`项目名称`" prop="projectCategory.id">
              <tree-select
                ref="projectCategoryTreeSelect"
                :disable-branch-nodes="true"
                :options="formOptions.projectCategory"
                v-model="formData.projectCategory.id"
                :normalizer="node => ({
                  id: node.id,
                  label: node.label,
                  children: node.children,
                  isDisabled: node.disabled
                })"
                placeholder="请选择所属项目类别"
                noOptionsText="暂无数据"
                noChildrenText="暂无数据"
                noResultsText="无匹配数据"
                :showCount="true"
                :defaultExpandLevel="Infinity"
                :disabled="!formOptions.projectCategory.length || !!subProData"
              >
                <!--            node.raw 代表找到的节点数据, 找不到时: { id: xx }, 能找到时, 挂载数据-->
                <span slot="value-label" slot-scope="{ node }">{{ node.raw.name || '( 已删除或已禁用 )' }}</span>
                <label
                  slot="option-label"
                  slot-scope="{ node, count, labelClassName }"
                  :class="labelClassName"
                >
                  <el-tooltip
                    effect="dark"
                    :content="node.label"
                    placement="top-start"
                  >
                    <span>{{ node.label | ellipsis(25) }} {{ count ? `(${count})` : '' }}</span>
                  </el-tooltip>
                </label>
              </tree-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        当前选中的项目类别 ifOther 为 1, 则显示项目名称-->
        <el-row v-if="ifOther">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="项目名称" prop="proName">
              <el-input
                v-model="formData.proName"
                placeholder="请输入项目名称"
                :disabled="!!subProData"
              />
            </el-form-item>
          </el-col>
        </el-row>
<!--        上一年度预算金额 (万元) 添加的该项目类别 在 上一年度已添加 且 已批复, 选择后显示 上一年度预算金额-->
        <el-row v-if="ifShowBudgetAmountLastYear && subProData.lastYearBudgetAmount">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item required label="上一年度预算金额 (万元)">
              <span>{{ subProData.lastYearBudgetAmount | number(6) }} (万元)</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="10" :sm="24" :xs="24">
            <el-form-item :label="`${proData.type === 0 ? '预算' : '收入'}金额 (万元)`" prop="budgetAmount">
              <el-input-number
                v-model="formData.budgetAmount"
                controls-position="right"
                :max="100000"
                :precision="6"
                :min="0"
                :placeholder="`请输入${proData.type === 0 ? '预算' : '收入'}金额`"
                :disabled="countProSpecify > 0"
              />
            </el-form-item>
          </el-col>
          <el-col :md="14" :sm="24" :xs="24">
            <el-form-item required label="金额大写">
              {{ formData.budgetAmount * 10000 | n2c }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="budgetControlNumberData">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="部门控制数（万元）">
              <div>
                <span class="el-color--danger">{{ budgetControlNumberData.amount / 10000 | number(6) }}</span>
                <span style="margin-left: 10px;"><span class="el-color--danger">{{ budgetControlNumberData.amount | n2c }}</span></span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
<!--        TODO: 定额, 列表;-->
<!--        有 定额 不显示 预算细化-->
        <el-row v-if="!ifQuota && proData.type === 0">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="是否预算细化" prop="ifSpecify">
              <el-radio-group v-model="formData.ifSpecify" :disabled="countProSpecify > 0">
                <el-radio
                  v-for="item in formOptions.ifSpecify"
                  :key="item.id"
                  :label="item.id"
                >{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="proData.type === 2">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="是否收入分配" prop="ifIncDistribution">
              <el-radio-group v-model="formData.ifIncDistribution">
                <el-radio
                  v-for="item in formOptions.ifIncDistribution"
                  :key="item.id"
                  :label="item.id"
                >{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="proData.type === 2 && formData.ifIncDistribution">
          <el-col :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="部门所得金额(万元)" prop="depIncome">
              <el-input-number
                v-model="formData.depIncome"
                controls-position="right"
                :max="100000"
                :precision="6"
                :min="0"
                :placeholder="`请输入部门所得金额`"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="学校所得金额(万元)" prop="schoolIncome">
              <el-input-number
                v-model="formData.schoolIncome"
                controls-position="right"
                :max="100000"
                :precision="6"
                :min="0"
                :placeholder="`请输入学校所得金额`"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!checkDepIncomeAndSchoolIncome">
          <el-col>
            <span style="padding-left: 160px;" class="el-color--danger">
              部门所得金额 + 学校所得金额 = 收入金额
            </span>
          </el-col>
        </el-row>
        <el-row v-if="proData.type === 2">
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="收入分配依据" prop="distribution">
              <el-input
                v-model="formData.distribution"
                type="textarea"
                :rows="3"
                :autosize="{ minRows: 3, maxRows: 6 }"
                :maxlength="5000"
                placeholder="请输入收入分配依据"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="经费测算依据及预期效益" prop="calculationBasisOfFunds">
              <el-input
                v-model="formData.calculationBasisOfFunds"
                type="textarea"
                :rows="3"
                :autosize="{ minRows: 3, maxRows: 6 }"
                :maxlength="20000"
                placeholder="请输入经费测算依据及预期效益"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
<!--        bool 解释:-->
<!--        有费用项 or 经济科目数据-->
<!--        编辑子项目-->
<!--        子项目非 其他项目-->
        <el-row v-if="feeItemData && feeItemData.length && subProData && !subProData.projectCategory.ifOther">
          <el-col :md="24" :sm="24" :xs="24">
            <pro-fee-item-economic-subject
              ref="proFeeItemEconomicSubject"
              :table-data-prop="feeItemData"
              :disabled="!!subProData.ifSpecify && countProSpecify > 0"
              @update:fee-item="updateFeeItemAndEconomicHandler('fee-item', $event)"
              @update:economic-subject="updateFeeItemAndEconomicHandler('economic-subject', $event)"
            ></pro-fee-item-economic-subject>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <div class="m-t-20" slot="footer">
      <el-row type="flex" justify="end">
        <el-button @click="close" size="small">关闭</el-button>
        <el-button @click="saveProject" size="small" type="primary" :loading="loading.saveBtn">保存</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
// components
import TreeSelect from '@riophae/vue-treeselect'
import ProFeeItemEconomicSubject from '@/views/project/additionalBudget/pro-fee-item-economic-subject'
// api
import additionalBudgetControllerApi from '@/api/project/additionalBudgetControllerApi'
// util
import $commonService from '@/utils/common-serve'
import $util from '@/utils/util'
import { mapGetters } from 'vuex'
import proSpecifyController from '@/api/project/proSpecifyController'
import powerBudgetControlNumberController from '@/api/project/powerBudgetControlNumberController'
export default {
  name: 'AddSubProjectDialog',
  components: {
    TreeSelect,
    ProFeeItemEconomicSubject
  },
  props: {
    proData: { // 原项目数据
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dialogVisible: false, // 对话框
      formData: { // form data
        proName: '', // 项目名称
        projectCategory: { id: null }, // 项目类别
        budgetAmount: 0, // 预算金额
        ifIncDistribution: 0, // 是否收入分配 1 是 0 否
        ifSpecify: 0, // 是否预算细化
        depIncome: 0, // 部门所得金额
        schoolIncome: 0, // 学校所得金额
        distribution: '', // 收入分配依据
        calculationBasisOfFunds: '', // 经费测算依据
      },
      formRules: {
        'projectCategory.id': [
          { required: true, message: '请选择所属项目类别', trigger: 'blur' }
        ],
        'budgetAmount': [
          { required: true, message: `请输入${this.proData.type === 0 ? '预算' : '收入'}金额`, trigger: 'blur' }
        ],
        ifIncDistribution: [ // 是否收入分配
          { required: true, message: '请选择是否收入分配', trigger: 'blur' }
        ],
        ifSpecify: [
          { required: true, message: '请选择是否预算细化', trigger: 'blur' }
        ],
        depIncome: [
          { required: true, message: '请输入部门所得金额', trigger: 'blur' }
        ],
        schoolIncome: [
          { required: true, message: '请输入学校所得金额', trigger: 'blur' }
        ],
        proName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { pattern: $util.verification.PRO_NAME_REGEXP, message: $util.verification.PRO_NAME_TIP, trigger: 'blur' }
        ],
        distribution: [
          { required: true, message: '请输入收入分配依据', trigger: 'blur' }
        ],
        calculationBasisOfFunds: [
          { required: true, message: '请输入经费测算依据及预期效益', trigger: 'blur' }
        ]
      }, // form rules
      formOptions: { // form 表单选项列表
        projectCategory: [], // 项目类别下拉
        ifSpecify: [{ id: 1, name: '是' }, { id: 0, name: '否' }],
        ifIncDistribution: [{ id: 1, name: '是' }, { id: 0, name: '否' }]
      },
      subProData: null,
      feeItemData: null, // 费用项 or 经济科目; 费用项 和 经济科目 数据
      loading: {
        saveBtn: false
      },
      countProSpecify: 0, // 当前预算细化项目数量
      budgetControlNumberData: null // 预算控制数数据
    }
  },
  computed: {
    ...mapGetters(['configModule']),
    // 当前选中的 项目类别
    currentProjectCategory () {
      return $commonService.treeFind(this.formOptions.projectCategory, item => item.id === this.formData.projectCategory.id) || {}
    },
    ifOther () { // 当前项目类别 是否其他
      return this.currentProjectCategory.ifOther
    },
    ifQuota () { // 当前项目类别 是否定额
      return this.currentProjectCategory.ifQuota
    },
    // 添加的该项目类别 在 上一年度已添加 且 已批复, 选择后显示 上一年度预算金额
    ifShowBudgetAmountLastYear () {
      return this.subProData && !this.subProData.ifOther
    },
    userInfo () { // 用户信息
      return JSON.parse(localStorage.getItem('user'))
    },
    // 是否显示经济科目
    ifBindEconSubject () {
      return this.configModule.ifBindEconSubject
    },
    // 配置的 费用项 或 经济科目的名字
    feeItemOrEconomicsName () {
      return this.configModule.feeItemOrEconomicsName
    },
    // 检验部门所得金额与学校所得金额是否符合标准
    checkDepIncomeAndSchoolIncome () {
      return !(
        this.proData.type === 2 &&
        this.formData.ifIncDistribution &&
        !$commonService.ifNumberEqual(this.formData.budgetAmount, this.formData.depIncome + this.formData.schoolIncome, 8)
      )
    }
  },
  watch: {
  },
  methods: {
    // =========================== dialog 入口 ===================================
    createProject () {
      this.dialogVisible = true
      this.init()
    },
    /**
     * 编辑项目
     * @param subProData 项目数据
     */
    async editProject (subProData) {
      this.dialogVisible = true
      const res = await additionalBudgetControllerApi.getProjectById(subProData.id)
      this.subProData = res.data
      if (this.subProData.type === 0) { // 基本支出，统计细化项目数
        this.countProSpecifyByProjectId()
      }
      // 子项目有预算控制数，拉取预算控制数数据 (基本支出 + 非其他 + 有控制数)
      if (this.subProData.type === 0 && !this.subProData.projectCategory.ifOther && this.subProData.budgetControlAmountId) {
        this.getBudgetControlNumber()
      }
      this.init()
      this.getPrevProcess() // 前处理
      if (this.subProData.type === 0) { // 收入项目无经济科目
        this.getProFeeItemEconomicsByProId() // 获取费用项经济科目数据
      }
    },
    // =========================== 出口 =======================
    async saveProject () {
      try {
        this.loading.saveBtn = true
        // 验证 费用项金额 与 经济科目金额合计
        this.$refs['proFeeItemEconomicSubject'] && this.$refs['proFeeItemEconomicSubject'].validateBeforeSave()
        // console.log('formData is: ', this.formData)
        await this.validate() // 验证
        const _project = this.savePrevProcess()
        const res = await additionalBudgetControllerApi.saveProject(_project)
        this.$emit('refresh-list') // 刷新列表
        // 进入编辑状态
        this.editProject({ id: res.data.id })
        this.loading.saveBtn = false
        this.dialogVisible = false
        this.$message.success(this.$constants.SAVE_SUCCESS)
      } catch (err) {
        console.log('Error: Method [sub project saveProject]', err)
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
      // TODO
      this.subProData = null // 置空 subProData
      this.$refs['addSubProjectFormRef'].resetFields() // 重置表单
      this.formData.proName = '' // 填写之后，若清空项目类别，此时销毁了 el-form-item, 重置表单时无法重置 proName
      this.countProSpecify = 0
      this.budgetControlNumberData = null
    },
    // ============================ 表单控件 ========================
    // ============================ 初始化表单 ========================
    /**
     * 初始化, 获取表单数据等
     */
    init () {
      try {
        this.getProjectCategoryByProPackId()
      } catch (err) {
        console.log('[Error 添加子项目初始化错误]: ', err)
      }
    },
    // ============================ 接口 ========================
    /**
     * 根据 项目包 id 获取 项目类别树状结构
     * @return {Promise<void>}
     */
    async getProjectCategoryByProPackId () {
      const proPackId = this.proData.id
      const res = await additionalBudgetControllerApi.getProjectCategoryByProPackId(proPackId)
      // 区分添加 和 编辑
      if (!this.subProData) { // 添加时, 只显示其他项目
        const _projectCategory = $commonService.amendChildrenAndCombineCodeAndNameForTree(
          res.data,
          ['code', 'name'],
          ['label']
        ) // 修正 children
        const ifOtherLeafNodes = [] // 是 ifOther 的最子集
        $commonService.treeForEach(_projectCategory, item => {
          if (!item.parent) { // 排除 最子级 = 最父级 情况
            return
          }
          if (!item.children || !item.children.length) {
            if (item.ifOther) {
              ifOtherLeafNodes.push(item)
            }
          }
        })
        this.formOptions.projectCategory = ifOtherLeafNodes
      } else {
        this.formOptions.projectCategory = $commonService.amendChildrenAndCombineCodeAndNameForTree(
          res.data,
          ['code', 'name'],
          ['label']
        ) // 修正 children
      }
    },
    /**
     * 根据项目 id 获取 项目费用项 和 经济科目数据
     */
    async getProFeeItemEconomicsByProId () {
      try {
        const res = await additionalBudgetControllerApi.getProFeeItemEconomicsByProId(this.subProData.id, null)
        this.feeItemData = res.data
      } catch (err) {
        console.log('Error: Method [getProFeeItemEconomicsByProId]', err)
        this.$message.error(`获取${this.feeItemOrEconomicsName}数据失败`)
      }
    },
    /**
     * 获取当前编辑项目的预算细化数量
     */
    async countProSpecifyByProjectId () {
      try {
        const res = await proSpecifyController.countProSpecifyByProjectId(this.subProData.id)
        this.countProSpecify = res.data
      } catch (err) {
        console.log('Error: Method [countProSpecifyByProjectId]', err)
        this.$message.error(err.msg || err.message)
      }
    },
    /**
     * 获取 部门预算控制数
     */
    async getBudgetControlNumber () {
      try {
        const res = await powerBudgetControlNumberController.getById(this.subProData.budgetControlAmountId)
        this.budgetControlNumberData = res.data
      } catch (err) {
        console.log('Error: Method [getBudgetControlNumber]', err)
        this.$message.error(err.msg || err.message)
      }
    },
    // ============================ 处理函数 ========================
    /**
     * 保存前处理
     * @return {any} 发往数据库的 project 对象
     */
    savePrevProcess () {
      const _project = JSON.parse(JSON.stringify(this.formData))
      _project.id = this.subProData ? this.subProData.id : null // id
      _project.proName = this.ifOther ? _project.proName : this.currentProjectCategory.name
      _project.budgetAmount = this.formData.budgetAmount * 10000 // 预算金额
      _project.projectPackageId = this.proData.id // 原项目 id
      _project.addUser = this.userInfo ? { id: this.userInfo.id } : null // 申报人
      _project.declareDept = this.userInfo ? { id: this.userInfo.department && this.userInfo.department.id } : null // 申报部门
      _project.type = this.proData.type
      _project.year = this.proData.year
      _project.depIncome = this.formData.depIncome * 10000
      _project.schoolIncome = this.formData.schoolIncome * 10000
      return _project
    },
    /**
     * 获取数据的前处理操作
     */
    getPrevProcess () {
      this.formData.projectCategory.id = this.subProData.projectCategory.id
      this.formData.budgetAmount = $commonService.to10Thousand(this.subProData.budgetAmount || 0)
      this.formData.ifSpecify = this.subProData.ifSpecify
      this.formData.calculationBasisOfFunds = this.subProData.calculationBasisOfFunds
      this.formData.proName = this.subProData.proName
      this.formData.depIncome = $commonService.to10Thousand(this.subProData.depIncome || 0)
      this.formData.schoolIncome = $commonService.to10Thousand(this.subProData.schoolIncome || 0)
      this.formData.ifIncDistribution = this.subProData.ifIncDistribution || 0
      this.formData.distribution = this.subProData.distribution || ''
    },
    /**
     * 验证函数
     * @return {Promise<void>}
     */
    async validate () {
      // 验证表单
      await this.$refs['addSubProjectFormRef'].validate()
      // 验证收入情况下的预算年金额
      if (!this.checkDepIncomeAndSchoolIncome) {
        throw new Error('')
      }
      // 验证 费用项金额合计 与 预算金额 是否一致
      if (this.ifBindEconSubject && this.subProData && !this.subProData.projectCategory.ifOther && this.feeItemData && this.feeItemData.length) {
        const allAmount = this.$refs['proFeeItemEconomicSubject'].getAllAmountRef() // 费用项金额合计
        if (!$commonService.ifNumberEqual(allAmount, this.formData.budgetAmount * 10000, 2)) {
          throw new Error(`${this.feeItemOrEconomicsName}金额合计与预算金额不一致`)
        }
      }
    },
    /**
     * 行数据更新 handler
     * @param type fee-item or economic-subject
     * @param data 费用项 or 经济科目数据
     */
    async updateFeeItemAndEconomicHandler (type, data) {
      try {
        if (type === 'fee-item') {
          await additionalBudgetControllerApi.saveProFeeItemAndFather(data)
        } else if (type === 'economic-subject') {
          await additionalBudgetControllerApi.saveProFeeItemEconomic(data)
        }
      } catch (err) {
        console.log('Error: Method [updateFeeItemAndEconomicHandler]', err)
        this.$message.error(err.msg || err.message)
      }
    }
  }
}
console.log('sdsjfsdkf')
</script>

<style lang="scss" scoped>
.add-sub-project-dialog {
}
</style>
<style lang="scss">
.add-sub-project-dialog {
  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
