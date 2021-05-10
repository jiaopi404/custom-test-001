<!--
添加陈欠项目组件
-->
<template>
  <div class="add-project-cq">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="subProjectProSpecifyAddForm"
      label-width="150px"
      size="mini"
    >
      <el-row>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="项目类别" prop="aaa">
            <tree-select
              ref="projectCategoryTreeSelect"
              :disable-branch-nodes="true"
              :options="formOptions.aaa"
              v-model="formData.aaa.id"
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
              :disabled="!formOptions.aaa.length || !!subProData"
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
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="项目发生年度" prop="bbb">
            <el-select v-model="formData.bbb" placeholder="请选择项目发生年度">
              <el-option
                v-for="item in formOptions.bbb"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="原预算项目名称(经费来源)" prop="ccc">
            <el-input
              v-model="formData.ccc"
              placeholder="请输入原预算项目名称"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="原预算项目编码" prop="ddd">
            <el-input
              v-model="formData.ddd"
              placeholder="请输入原预算项目编码"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="采购(其他)项目名称" prop="eee">
            <el-input
              v-model="formData.eee"
              placeholder="请输入采购(其他)项目名称"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="合同金额(万元)" prop="fff">
            <el-input-number
              v-model="formData.fff"
              controls-position="right"
              :max="100000"
              :precision="6"
              :min="0"
              placeholder="请输入合同金额"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="欠款金额(万元)" prop="ggg">
            <el-input-number
              v-model="formData.ggg"
              controls-position="right"
              :max="100000"
              :precision="6"
              :min="0"
              placeholder="请输入欠款金额"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item :label="`${yearOfIntendedPayment}拟支付金额(万元)`" prop="iii">
            <el-input-number
              v-model="formData.iii"
              controls-position="right"
              :max="100000"
              :precision="6"
              :min="0"
              placeholder="请输入拟支付金额"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="项目完成日期" prop="jjj">
            <el-date-picker
              v-model="formData.jjj"
              type="date"
              placeholder="选择项目完成日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item label="项目签订日期" prop="kkk">
            <el-date-picker
              v-model="formData.kkk"
              type="date"
              placeholder="选择项目签订日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="24" :md="24" :sm="24" :xs="24">
          <el-form-item label="是否完成签收" prop="lll">
            <el-radio-group
              v-model="formData.lll"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="24" :md="24" :sm="24" :xs="24">
          <el-form-item label="欠款原因" prop="mmm">
            <el-input
              v-model="formData.mmm"
              type="textarea"
              :rows="3"
              :autosize="{ minRows: 3, maxRows: 6 }"
              :maxlength="50"
              placeholder="请输入收入分配依据"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="24" :md="24" :sm="24" :xs="24">
          <el-form-item label="备注" prop="nnn">
            <el-input
              v-model="formData.mmm"
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
    </el-form>
  </div>
</template>

<script>
import $util from '@/utils/util'
import TreeSelect from '@riophae/vue-treeselect'

export default {
  name: 'AddProjectCq',
  components: {
    TreeSelect
  },
  props: {
    proData: { // 陈欠原项目
      type: Object,
      default: null
    }
  },
  data () {
    return {
      formData: {
        aaa: { id: null }, // 项目类别
        bbb: '', // 项目发生年度
        ccc: '', // 原预算项目名称(经费来源)
        ddd: '', // 原预算项目编码
        eee: '', // 采购(其他)项目名称
        fff: 0, // 合同金额(万元)
        ggg: 0, // 欠款金额(万元)
        iii: 0, // yearOfIntendedPayment拟支付金额(万元)
        jjj: new Date(), // 项目完成日期
        kkk: new Date(), // 项目签订日期
        lll: 1, // 是否完成签收
        mmm: '', // 欠款原因
        nnn: '' // 备注
      },
      formRules: {
        'aaa.id': [
          { required: true, message: '请选择项目类别', trigger: 'blur' }
        ],
        bbb: [
          { required: true, message: '请选择项目发生年度', trigger: 'blur' }
        ],
        ccc: [
          { required: true, message: '请输入原预算项目名称', trigger: 'input' },
          { pattern: $util.verification.PRO_NAME_REGEXP, message: $util.verification.PRO_NAME_TIP, trigger: 'blur' }
        ],
        ddd: [
          { required: true, message: '请输入原预算项目编码', trigger: 'input' },
          { pattern: $util.verification.ORIGIN_PRO_NUMBER_REGEXP, message: $util.verification.ORIGIN_PRO_NUMBER_TIP, trigger: 'blur' }
        ],
        eee: [
          { required: true, message: '请输入采购(其他)项目名称', trigger: 'input' },
          { pattern: $util.verification.PRO_NAME_REGEXP, message: $util.verification.PRO_NAME_TIP, trigger: 'blur' }
        ],
        fff: [
          { required: true, message: '请输入合同金额', trigger: 'blur' }
        ],
        ggg: [
          { required: true, message: '请输入欠款金额', trigger: 'blur' }
        ],
        iii: [
          { required: true, message: '请输入拟支付金额', trigger: 'blur' }
        ],
        jjj: [
          { required: true, message: '请选择项目完成日期', trigger: 'blur' }
        ],
        kkk: [
          { required: true, message: '请选择项目签订日期', trigger: 'blur' }
        ],
        lll: [
          { required: true, message: '请选择是否完成签收', trigger: 'blur' }
        ],
        mmm: [
          { required: true, message: '请输入欠款原因', trigger: 'blur' }
        ],
      },
      formOptions: {
        aaa: [], // 获取项目类别接口,
        bbb: [], // 本地根据当前年份生成
      },
      subProData: null // 陈欠子项目，编辑的项目
    }
  },
  computed: {
    // 配置中的拟支付年份
    yearOfIntendedPayment () {
      return new Date().getFullYear()
    }
  },
  methods: {
    /**
     * 初始化组件
     * @param subProData
     */
    initComp (subProData) {
      if (!subProData) { // 新建
      } else { // 编辑
        this.subProData = subProData
      }
      // TODO: 初始化表单值，选中项等, 包含修正选项
    },
    /**
     * 重置组件
     */
    resetComp () {
      this.subProData = null
    },
  }
}
</script>

<style scoped>

</style>
