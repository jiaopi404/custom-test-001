<template>
  <el-dialog
    title="项目细化"
    :visible.sync="dialogVisible"
    width="70%"
    height="400px"
    style="border-radius: 4px"
    :close-on-click-modal="false"
    custom-class="sub-project-pro-specify-dialog"
    @closed="closedHandler"
  >
    <el-scrollbar style="height: 350px;">
      <basic-summary>
        <span>总计: {{ totalAmount | number(2) }}元 大写: {{ totalAmount | n2c }}</span>
      </basic-summary>
      <basic-add-btn add-name="添加细化项目" @click="editProSpecify('')" />
<!--      <el-form-->
<!--        :model="formData"-->
<!--        :rules="formRules"-->
<!--        ref="subProjectProSpecifyAddForm"-->
<!--        label-width="0"-->
<!--        size="mini"-->
<!--      >-->
        <el-table
          :data="tableData"
          size="small"
          style="width: 100%"
          :default-sort="{ prop: 'addDateTime', order: 'descending' }"
          :stripe="true"
          @sort-change="setSort"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            fixed="left"
          ></el-table-column>
          <el-table-column
            prop="proName"
            label="项目名称"
            :show-overflow-tooltip="true"
            min-width="150"
            fixed="left"
          >
            <template slot-scope="{ row }">
              <span>{{ row.proName }}</span>
<!--              <span v-if="currentRowId !== row.id">{{ row.proName }}</span>-->
<!--              <el-form-item-->
<!--                v-else-->
<!--                prop="proName"-->
<!--              >-->
<!--                <el-input-->
<!--                  v-model="formData.proName"-->
<!--                  placeholder="请输入项目名称"-->
<!--                />-->
<!--              </el-form-item>-->
            </template>
          </el-table-column>
          <el-table-column
            prop="proNumber"
            label="项目编号"
            :show-overflow-tooltip="true"
            min-width="150"
          >
            <template slot-scope="{ row }">
              <span>{{ row.proNumber }}</span>
<!--              <span v-if="currentRowId !== row.id">{{ row.proNumber }}</span>-->
<!--              <span v-else>{{ formData.proNumber }}</span>-->
            </template>
          </el-table-column>
          <el-table-column
            label="预算金额 (元)"
            min-width="200"
          >
            <template slot-scope="{ row }">
              <span>{{ (row.budgetAmount || 0) | number(2) }}</span>
<!--              <span v-if="currentRowId !== row.id">{{ (row.budgetAmount || 0) | number(2) }}</span>-->
<!--              <el-form-item prop="budgetAmount" v-else>-->
<!--                <el-input-number-->
<!--                  v-model="formData.budgetAmount"-->
<!--                  controls-position="right"-->
<!--                  :max="100000"-->
<!--                  :precision="2"-->
<!--                  :min="0"-->
<!--                  placeholder="请输入预算金额"-->
<!--                />-->
<!--              </el-form-item>-->
            </template>
          </el-table-column>
          <el-table-column
            label="项目建设摘要"
            min-width="200"
          >
            <template slot-scope="{ row }">
              <!--          calculationBasisOfFunds-->
<!--              <basic-readonly-textarea-->
<!--                :value="row.projectSummary"-->
<!--              />-->
              <el-button type="text" @click="viewProjectSummary(row)">查看</el-button>
<!--              <basic-readonly-textarea-->
<!--                v-if="currentRowId !== row.id"-->
<!--                :value="row.projectSummary"-->
<!--              />-->
<!--              <el-form-item prop="projectSummary" v-else>-->
<!--                <el-input-->
<!--                  v-model="formData.projectSummary"-->
<!--                  type="textarea"-->
<!--                  :rows="1"-->
<!--                  :autosize="{ minRows: 1, maxRows: 3 }"-->
<!--                  :maxlength="2000"-->
<!--                  placeholder="请输入项目建设摘要"-->
<!--                  show-word-limit-->
<!--                />-->
<!--              </el-form-item>-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            :min-width="90"
          >
            <template slot-scope="{ row }">
<!--              <template v-if="currentRowId !== row.id">-->
              <el-tooltip content="编辑">
                <el-button type="text" @click="editProSpecify(row)">
                  <i class="iconfont iconfont-24 iconbianji"></i>
                </el-button>
              </el-tooltip>
<!--              <el-button type="text" @click="showEconomicSubject(row)">查看经济科目</el-button>-->
              <el-tooltip content="删除">
                <el-button type="text">
                  <i class="iconfont iconfont-24 iconshanchu el-color--danger" @click="delProject(row)"></i>
                </el-button>
              </el-tooltip>
<!--              </template>-->
<!--              <template v-else>-->
<!--                <el-button type="text" @click="save()" :loading="loading.saveBtn">保存</el-button>-->
<!--                <el-button type="text" @click="cancel()">取消</el-button>-->
<!--              </template>-->
            </template>
          </el-table-column>
        </el-table>
<!--      </el-form>-->
    </el-scrollbar>
<!--    <div class="m-t-20" slot="footer">-->
<!--      <el-row type="flex" justify="end">-->
<!--        <el-button @click="close" size="small">关闭</el-button>-->
<!--        <el-button @click="save" size="small" type="primary">保存</el-button>-->
<!--      </el-row>-->
<!--    </div>-->
    <sub-project-pro-specify-add-dialog
      ref="subProjectProSpecifyAddDialog"
      :sub-pro-data="subProData"
      @save-success="getProSpecifyByProjectId"
    />
    <readonly-text-dialog ref="readonlyTextDialog"></readonly-text-dialog>
  </el-dialog>
</template>

<script>
// components
import SubProjectProSpecifyAddDialog from './sub-project-pro-specify/sub-project-pro-specify-add-dialog'
import BasicSummary from '@/components/basic/basic-summary'
import BasicAddBtn from '@/components/basic/basic-add-btn'
// import BasicReadonlyTextarea from '@/components/basic/basic-readonly-textarea'
import ReadonlyTextDialog from '@/components/project/add-project/sub-project-list/readonly-text-dialog'
// mixins
// import SubProjectProSpecifyAddMixin from '@/components/project/add-project/sub-project-list/sub-project-pro-specify/sub-project-pro-specify-add-mixin'
// api
import proSpecifyController from '@/api/project/proSpecifyController'
export default {
  name: 'SubProjectProSpecifyDialog',
  // mixins: [SubProjectProSpecifyAddMixin],
  components: {
    SubProjectProSpecifyAddDialog,
    BasicAddBtn,
    BasicSummary,
    ReadonlyTextDialog
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
      subProData: null, // 子项目数据
      tableData: []
    }
  },
  computed: {
    // 总计金额
    totalAmount () {
      return this.tableData.reduce((prev, item) => prev + item.budgetAmount, 0)
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
      this.getProSpecifyByProjectId()
    },
    close () {
      this.dialogVisible = false
    },
    /**
     * 弹窗动画关闭
     */
    closedHandler () {
      // this.resetAddForm()
      this.$emit('refresh-list')
    },
    // ============================ 接口 get ========================
    /**
     * 根据项目 id 获取 细化项目列表
     */
    async getProSpecifyByProjectId () {
      const res = await proSpecifyController.listProSpecifyByProjectIdCtr(this.subProData.id)
      this.tableData = res.data
    },
    // ============================ 接口 post ========================
    // ============================ 操作列 和 按钮 ========================
    /**
     * 编辑或添加项目细化
     * @param row
     */
    editProSpecify (row) {
      // this.initAddForm(row)
      this.$refs['subProjectProSpecifyAddDialog'].open(row)
    },
    /**
     * 查看经济科目
     * @param row
     */
    showEconomicSubject (row) {},
    delProject (row) {
      console.log('删除 子项目: ', row)
      this.$confirm('确认删除该条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        proSpecifyController.deleteProSpecifyById(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.getProSpecifyByProjectId()
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败, 请重试'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    /**
     * 查看项目建设摘要
     * @param row
     */
    viewProjectSummary (row) {
      this.$refs['readonlyTextDialog'].show('项目建设摘要', row.projectSummary)
    },
    // ============================ 表格行为 ========================
    setSort () {}
  }
}
</script>

<style lang="scss" scoped>
.sub-project-pro-specify-dialog {}
</style>
