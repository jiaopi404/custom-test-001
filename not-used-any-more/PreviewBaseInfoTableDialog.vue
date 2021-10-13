<template>
  <el-dialog
    title="预览基本信息"
    :visible.sync="dialogVisible"
    width="80%"
    style="border-radius: 4px"
    :close-on-click-modal="true"
    custom-class="preview-base-info-table-dialog"
    :append-to-body="true"
    @closed="closedHandler"
  >
    <template v-if="baseInfoData">
<!--      横向-->
      <basicInfoTable v-if="baseInfoTableOrientation === 1" ref="basicInfo" :baseInfoId="baseInfoId" :isShow="false" :isAdd="false" :baseName="baseInfoName" :remark="baseInfoRemark" @cancel="dialogVisible = false"></basicInfoTable>
<!--      纵向-->
      <basicInfoDirection v-else ref="basicInfo" :baseInfoId="baseInfoId" :isShow="false" :isAdd="false" :baseName="baseInfoName" :remark="baseInfoRemark" @cancel="dialogVisible = false"></basicInfoDirection>
    </template>
  </el-dialog>
</template>

<script>
import BasicInfoTable from "@/components/basic/basicInfo/basic-table"
import BasicInfoDirection from "@/components/basic/basicInfo/basic-direction"
import baseInfoControllerApi from '@/api/basic/baseInfoControllerApi'

/**
 * 预览基本信息 弹窗组件；
 * 调用 void show (Integer baseInfoId) 方法
 */
const PreviewBaseInfoTableDialog = {
  name: 'PreviewBaseInfoTableDialog',
  mixins: [],
  components: {
    BasicInfoTable,
    BasicInfoDirection
  },
  data () {
    return {
      dialogVisible: false,
      baseInfoId: null, // base info id
      baseInfoData: null // data of base info, including baseInfo, baseInfoAttrList; { baseInfo, baseInfoAttrList }
    }
  },
  computed: {
    // base info name
    baseInfoName () {
      return (this.baseInfoData && this.baseInfoData.baseInfo && this.baseInfoData.baseInfo.name) || ''
    },
    // orientation
    baseInfoTableOrientation () {
      return (this.baseInfoData && this.baseInfoData.baseInfo && this.baseInfoData.baseInfo.orientation) || ''
    },
    // remark
    baseInfoRemark () {
      return (this.baseInfoData && this.baseInfoData.baseInfo && this.baseInfoData.baseInfo.remark) || ''
    }
  },
  methods: {
    /**
     * 初始化
     * @param baseInfoId base info id
     */
    async show (baseInfoId) {
      this.dialogVisible = true
      this.baseInfoId = baseInfoId
      try {
        const res = await baseInfoControllerApi.getBaseInfoSaveByBaseInfoIdCtr(baseInfoId)
        this.baseInfoData = res.data
        this.$nextTick(() => {
          this.$refs.basicInfo.listBaseInfoAttrByBaseInfoIdCtr() // 初始化组件内部
        })
      } catch (err) {
        console.log('Error: Method [preview base info table dialog: show func]', err)
        if (err.data || err.message) {
          this.$message.error(err.data || err.message)
        }
      }
    },
    /**
     * closed event handler
     */
    closedHandler() {
      this.baseInfoId = null
      this.baseInfoData = null
    },
  },
}
export default PreviewBaseInfoTableDialog
</script>

<style scoped>

</style>