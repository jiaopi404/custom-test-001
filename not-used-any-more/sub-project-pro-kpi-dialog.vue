<template>
  <el-dialog
    title="绩效指标"
    :visible.sync="dialogVisible"
    width="50%"
    height="400px"
    style="border-radius: 4px"
    :close-on-click-modal="false"
    custom-class="sub-project-pro-kpi-dialog"
    @closed="closedHandler"
  >
    <el-scrollbar style="height: 350px;">
      <performance-indicators
        v-if="subProData"
        :pro-data="subProData"
      ></performance-indicators>
    </el-scrollbar>
    <div class="m-t-20" slot="footer">
      <el-row type="flex" justify="end">
        <el-button @click="close" size="small">关闭</el-button>
        <el-button @click="save" size="small" type="primary">保存</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import PerformanceIndicators from '@/components/basic/performanceIndicators'
export default {
  name: 'SubProjectProKPIDialog',
  props: {
    proData: { // 原项目数据
      type: Object,
      default: null
    }
  },
  components: {
    PerformanceIndicators
  },
  data () {
    return {
      dialogVisible: false, // 对话框
      subProData: null // 子项目数据
    }
  },
  methods: {
    // ============================ 生成 与 关闭 ========================
    /**
     * 打开对话框 ref 调用
     */
    open (subProData) {
      this.dialogVisible = true
      this.subProData = subProData
      this.subProData.subName = '项目清单'
    },
    /**
     * 生成项目
     */
    save () {
      this.dialogVisible = false
    },
    close () {
      this.dialogVisible = false
    },
    /**
     * 弹窗动画关闭
     */
    closedHandler () {
      this.subProData = null
    },
    // ============================ 接口 get ========================
    // ============================ 接口 post ========================
    // ============================ 表单控件 ========================
    // ============================ 初始化表单 ========================
  }
}
</script>

<style lang="scss" scoped>
.sub-project-pro-kpi-dialog {}
</style>

