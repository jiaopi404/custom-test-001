<template>
  <div class="sub-project-list">
    <el-row style="padding-bottom: 10px">
      <el-col :span="24">
        <el-button type="primary" @click="generateProject" size="mini">+ 生成</el-button>
      </el-col>
    </el-row>
    <basic-summary>
      <span style="margin-right: 15px"
        >总计: {{ (total.totalBudgetAmount / 10000) | number(6) }} 万元</span
      >
      <span>金额大写: {{ total.totalBudgetAmount | n2c }}</span>
    </basic-summary>
    <basic-add-btn add-name="添加项目" @click="createProject" v-if="ifProPackageContainIfOther" />
    <el-table
      :data="tableData"
      size="small"
      style="width: 100%"
      :default-sort="{ prop: 'addDateTime', order: 'descending' }"
      :stripe="true"
      @sort-change="setSort"
    >
      <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
      <el-table-column
        prop="proName"
        :label="`${proData.type === 2 ? '收入' : ''}项目名称`"
        :show-overflow-tooltip="true"
        min-width="150"
        fixed="left"
      ></el-table-column>
      <el-table-column
        prop="projectCategory.name"
        label="项目类别"
        :show-overflow-tooltip="true"
        width="200"
      >
        <template slot-scope="{ row }">{{ row.projectCategory | fpcName }}</template>
      </el-table-column>
      <el-table-column
        :label="`上一年度${proData.type === 0 ? '预算' : '收入'}金额 (万元)`"
        width="100"
      >
        <template slot-scope="{ row }">
          <span>{{ (row.lastYearBudgetAmount || 0) | number(6) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${proData.type === 2 ? '收入' : '预算'}金额 (万元)`" width="100">
        <template slot-scope="{ row }">
          <span>{{ ((row.budgetAmount || 0) / 10000) | number(6) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="proData.type === 0"
        label="部门控制数 (万元)"
        width="100"
      >
        <template slot-scope="{ row }">
          <span>{{ ((row.powerBudgetControlNumber && row.powerBudgetControlNumber.amount) || 0) | number(6) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="relevantDept.name"-->
<!--        label="归口部门"-->
<!--        :show-overflow-tooltip="true"-->
<!--        width="100"-->
<!--      ></el-table-column>-->
      <el-table-column
        label="部门所得金额 (万元)"
        width="100"
        v-if="proData.type === 2"
      >
        <template slot-scope="{ row }">
          <span>{{ (row.depIncome / 10000) | number(6) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学校所得金额 (万元)" width="100" v-if="proData.type === 2">
        <template slot-scope="{ row }">
          <span>{{ (row.schoolIncome / 10000) | number(6) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分配依据" width="100" v-if="proData.type === 2">
        <template slot-scope="{ row }">
          <!--          calculationBasisOfFunds-->
          <el-button type="text" @click="viewDistribution(row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="经费测算依据" width="100">
        <template slot-scope="{ row }">
          <!--          calculationBasisOfFunds-->
          <el-button type="text" @click="viewCalculationBasisOfFunds(row)">查看</el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="statusId.name"-->
      <!--        label="项目状态"-->
      <!--        width="100"-->
      <!--      ></el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="addDateTime"-->
      <!--        label="添加日期"-->
      <!--        width="100"-->
      <!--      >-->
      <!--        <template slot-scope="{ row }">{{ row.addDateTime | dateFormatter('YYYY-MM-DD') }}</template>-->
      <!--      </el-table-column>-->
      <el-table-column label="操作" fixed="right" :min-width="200">
        <template slot-scope="{ row }">
          <!-- <el-button type="text" @click="editProject(row)">编辑</el-button> -->
          <el-button
            v-if="row.proCode === configModule.meetingFeeCode"
            type="text"
            @click="meetingFee(row)"
            >会议费</el-button
          >
          <el-button
            v-if="row.proCode === configModule.trainingFeeCode"
            type="text"
            @click="trainingFee(row)"
            >培训费</el-button
          >
          <!-- <el-button v-if="row.ifSpecify" type="text" @click="editProSpecify(row)">项目细化</el-button> -->
          <!-- <el-button type="text" @click="editProAssetAllocation(row)">资产配置清单</el-button> -->
          <el-tooltip content="编辑">
            <el-button type="text" @click="editProject(row)">
              <i class="iconfont iconfont-24 iconbianji"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="项目细化" v-if="row.ifSpecify && row.type === 0">
            <el-button type="text" @click="editProSpecify(row)">
              <i class="iconfont iconfont-24 iconxihua"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="资产配置清单" v-if="row.type === 0 && ifAssetAllocation">
            <el-button type="text" @click="editProAssetAllocation(row)">
              <i class="iconfont iconfont-24 iconxihua"></i>
            </el-button>
          </el-tooltip>
          <!--          子项目是否显示绩效指标: 最子级 项目类别属性: 是否显示绩效指标 = 是-->
          <!--          如何显示绩效指标内容:-->
          <!--            是否自用绩效指标 = 否, 库管理中, 代码 jdbc 的基本支出的项目类别的绩效指标内容-->
          <!--            是否自用绩效指标 = 否, 库管理中, 自身项目类别名称的绩效指标内容-->
          <el-tooltip content="绩效指标" v-if="row.projectCategory.ifShowKpi && row.type === 0">
            <el-button type="text" @click="editProKPI(row)">
              <i class="iconfont iconfont-24 iconxihua"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除">
            <el-button type="text">
              <i
                class="iconfont iconfont-24 iconshanchu el-color--danger"
                @click="delProject(row)"
              ></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <basic-paginator ref="basicPaginator" @page-change="pageChangeHandler"></basic-paginator>
    <sub-project-add-dialog
      ref="subProjectAddDialog"
      :pro-data="proData"
      @refresh-list="getSubProjectList"
    />
    <readonly-text-dialog ref="readonlyTextDialog" />
    <sub-project-generate-dialog
      ref="subProjectGenerateDialog"
      :pro-data="proData"
      @refresh-list="getSubProjectList"
    />
    <sub-project-pro-kpi-dialog
      v-if="proData.type === 0"
      ref="subProjectProKpiDialog"
      :pro-data="proData"
    />
    <sub-project-pro-asset-allocation
      v-if="proData.type === 0"
      ref="subProjectProAssetAllocation"
      :pro-data="proData"
    />
    <sub-project-pro-specify-dialog
      v-if="proData.type === 0"
      ref="subProjectProSpecify"
      :pro-data="proData"
      @refresh-list="getSubProjectList"
    />
    <!-- <meeting-fee v-if="meetFee" :proData="proData" :id="id"></meeting-fee>
    <training-fee v-if="trainFee" :id="projectid"></training-fee> -->
    <sub-project-meeting-dialog ref="subProjectMeetingDialog" :pro-data="proData" :id="projectid">
    </sub-project-meeting-dialog>
    <sub-project-training-dialog ref="subProjectTrainingDialog" :pro-data="proData" :id="projectid">
    </sub-project-training-dialog>
  </div>
</template>

<script>
// components
import SubProjectAddDialog from './sub-project-add-dialog';
import ReadonlyTextDialog from './readonly-text-dialog';
import SubProjectGenerateDialog from './sub-project-generate-dialog';
import SubProjectProKpiDialog from './sub-project-pro-kpi-dialog';
import SubProjectProAssetAllocation from './sub-project-pro-asset-allocation-dialog';
import SubProjectProSpecifyDialog from './sub-project-pro-specify-dialog';
import BasicSummary from '@/components/basic/basic-summary';
import BasicAddBtn from '@/components/basic/basic-add-btn';
import BasicPaginator from '@/components/basic/basic-paginator';
// api
import additionalBudgetControllerApi from '@/api/project/additionalBudgetControllerApi';
import $commonService from '@/utils/common-serve';
import { mapGetters } from 'vuex';
import SubProjectMeetingDialog from './sub-project-meeting-dialog.vue';
import SubProjectTrainingDialog from './sub-project-training-dialog.vue';
import MeetingFee from '@/components/project/special-project/meeting-fee.vue';
import TrainingFee from '@/components/project/special-project/training-fee.vue';
export default {
  name: 'SubProjectList',
  components: {
    SubProjectAddDialog,
    ReadonlyTextDialog,
    BasicSummary,
    BasicAddBtn,
    SubProjectGenerateDialog,
    SubProjectProKpiDialog,
    SubProjectProAssetAllocation,
    SubProjectProSpecifyDialog,
    BasicPaginator,
    SubProjectMeetingDialog,
    SubProjectTrainingDialog,
    MeetingFee,
    TrainingFee
  },
  props: {
    // 原项目数据
    proData: { type: Object, default: null },
  },
  data() {
    return {
      projectid: null,
      tableData: [],
      total: {
        // 总计金额
        totalBudgetAmount: 0,
      },
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      // 当前项目包对应的项目类别中的所有最子级是否包含 ifOther 类型项目, 如果true, 才显示 添加项目 按钮
      ifProPackageContainIfOther: false,
      meetFee: false,
      trainFee: false,
    };
  },
  watch: {
    proData: {
      handler(nv, ov) {
        this.getSubProjectList(this.id);
        this.getIfProPackageContainIfOther();
      },
    },
  },
  computed: {
    id() {
      // 原项目 id
      return this.proData && this.proData.id;
    },
    ...mapGetters(['configModule']),
    // 是否存在资产配置
    ifAssetAllocation() {
      return this.configModule.ifAssetAllocation || false;
    },
  },
  mounted() {
    console.log('module', this.configModule);
    this.getSubProjectList(this.id);
    this.getIfProPackageContainIfOther();
  },
  methods: {
    // =================================== 批量操作 添加 生成 编辑 删除 资产配置清单 绩效指标 点击事件 ===========================
    /**
     * 创建项目
     */
    createProject() {
      this.$refs['subProjectAddDialog'].createProject();
    },
    /**
     * 生成项目
     */
    generateProject() {
      this.$refs['subProjectGenerateDialog'].open();
    },
    /**
     * 编辑项目
     * @param proData 项目数据
     */
    editProject(proData) {
      console.log('proData', proData);
      this.$refs['subProjectAddDialog'].editProject(proData);
    },
    /**
     * 删除项目
     * @param row 某一行数据
     */
    delProject(row) {
      this.$confirm(this.$constants.DEL_CONFIRM_TIP, this.$constants.TIP_TIP, {
        confirmButtonText: this.$constants.CONFIRM_TIP,
        cancelButtonText: this.$constants.CANCEL_TIP,
        type: 'warning',
      })
        .then(() => {
          additionalBudgetControllerApi
            .deleteProject(row.id)
            .then((res) => {
              this.$message({
                type: 'success',
                message: this.$constants.DEL_SUCCESS,
              });
              this.getSubProjectList(this.id);
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: this.$constants.DEL_FAIL,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$constants.CANCEL,
          });
        });
    },
    /**
     * 编辑 项目细化
     */
    editProSpecify(row) {
      this.$refs['subProjectProSpecify'].open(row);
    },
    // 编辑 会议费
    meetingFee(row) {
      this.projectid = row.id;
      // this.meetFee = true
      this.$refs['subProjectMeetingDialog'].open(row);
    },
    // 编辑 培训费
    trainingFee(row) {
      this.projectid = row.id;
      // this.trainFee = true
      this.$refs['subProjectTrainingDialog'].open(row);
    },
    /**
     * 编辑 资产配置
     */
    editProAssetAllocation(row) {
      this.$refs['subProjectProAssetAllocation'].open(row);
    },
    /**
     * 编辑 绩效指标
     */
    editProKPI(row) {
      this.$refs['subProjectProKpiDialog'].open(row);
    },
    // =================================== 获取数据 ===========================
    /**
     * 获取子项目清单
     * @param id
     * @return {Promise<void>}
     */
    async getSubProjectList(id) {
      if (!id) {
        id = this.id;
      }
      const pageAndSort = {
        sorts: [{ dir: 'desc', prop: 'addDateTime' }],
        queryList: [
          { param: 'ifDelete', type: 'equal', value: [0] },
          { param: 'projectPackageId', type: 'equal', value: [id] },
        ],
        page: { pageNum: this.page.pageNum, pageSize: this.page.pageSize },
      };
      const res = await additionalBudgetControllerApi.getProjectPageList(pageAndSort);
      this.tableData = res.data.page.content;
      this.$refs['basicPaginator'].updateTotal(res.data.page.totalElements);
      this.total.totalBudgetAmount = res.data.totalBudgetAmount || 0;
      // 5个统计字段
      // totalAlreadyReAmount
      // totalBudgetAmount
      // totalCarryOverAmount
      // totalCollectedAmount
      // totalFinalAmount
    },
    // =================================== 事件处理 ===========================
    /**
     * 查看 收入分配依据
     */
    viewDistribution(row) {
      console.log('查看收入分配依据', row.distribution);
      this.$refs['readonlyTextDialog'].show('收入分配依据', row.distribution || '暂无数据');
    },
    /**
     * 查看经费测算依据
     */
    viewCalculationBasisOfFunds(row) {
      this.$refs['readonlyTextDialog'].show(
        '经费测算依据',
        row.calculationBasisOfFunds || '暂无数据'
      );
    },
    // =================================== 分页 + 排序 ========================
    setSort() {},
    /**
     * page change 的 handler
     * @param pageNum
     * @param pageSize
     */
    pageChangeHandler({ pageNum, pageSize }) {
      this.page = { pageNum, pageSize };
      this.getSubProjectList(this.id);
    },
    pageReset() {
      this.page = { pageNum: 1, pageSize: 10 };
      this.$refs['basicPaginator'].updatePage({ pageNum: 1, pageSize: 10 });
    },
    /**
     * 计算 ifProPackageContainIfOther
     */
    async getIfProPackageContainIfOther() {
      try {
        const proPackId = this.proData.id;
        const res = await additionalBudgetControllerApi.getProjectCategoryByProPackId(proPackId);
        this.ifProPackageContainIfOther = !!$commonService.treeFind(res.data, (item) => {
          // 最子级 ifOther
          if (!item.children || !item.children.length) {
            return item.ifOther;
          } else {
            return false;
          }
        });
      } catch (err) {
        console.log('Error: Method [getIfProPackageContainIfOther]', err);
        this.$message.error(err.msg || err.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-project-list {
}
</style>
