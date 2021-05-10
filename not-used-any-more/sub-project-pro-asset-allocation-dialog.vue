<template>
  <el-dialog
    title="资产配置"
    :visible.sync="dialogVisible"
    width="70%"
    style="border-radius: 4px"
    :close-on-click-modal="false"
    custom-class="sub-project-pro-asset-allocation-dialog"
    @closed="closedHandler"
  >
    <asset-allocation-list
      v-if="!!subProData"
      :pro-data="subProData"
    ></asset-allocation-list>
  </el-dialog>
</template>

<script>
import AssetAllocationList from '@/views/project/additionalBudget/assetAllocationList'
export default {
  name: 'SubProjectProAssetAllocationDialog',
  props: {
    proData: { // 原项目数据
      type: Object,
      default: null
    }
  },
  components: {
    AssetAllocationList
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
      this.subProData = false
    },
    // ============================ 接口 get ========================
    // ============================ 接口 post ========================
    // ============================ 表单控件 ========================
    // ============================ 初始化表单 ========================
  }
}
</script>

<style lang="scss" scoped>
.sub-project-pro-asset-allocation-dialog {}
</style>
