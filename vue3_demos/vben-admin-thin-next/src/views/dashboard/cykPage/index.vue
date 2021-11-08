<template>
  <div class="cyk-page">
    <LxBasicTreeSelectVue />
    <AButton
      @click="handleBtnClick"
    >点我点我 count: {{ count }}</AButton>
    <Divider v-bind="modalDividerProps">{{ modalDividerProps.content }}</Divider>
    <Card v-bind="modalCardProps" style="margin: 10px;">
      <AButton type="dashed" size="small" @click="modalVisible = true">打开弹窗</AButton>
      <Modal
        v-model:visible="modalVisible"
        title="弹窗试验"
        @ok="modalOkBtnHandle"
        :after-close="modalClosedHandler"
      >
        <AButton
          v-for="item in modalBtnNum"
          :key="item"
        >Button {{ item }}</AButton>
      </Modal>
    </Card>
    <Divider>查询的</Divider>
    <Card size="small" title="查询 card, 表单" style="margin: 10px;">
      <LxBasicQuery
        v-model:value="queryInfo"
        :query-schema="querySchema"
        @query="queryHandler"
      />
    </Card>
    <Divider>测试v-model组件</Divider>
    <Card size="small" title="测试v-model组件" style="margin: 10px;">
      <CusModelTest
        v-model="myArr"
      />
      <AButton @click="testMyArr">看数据</AButton>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref, toRaw } from 'vue'
import { LxBasicTreeSelectVue } from '/@/components/LianXingBasic'
import LxBasicQuery, { IQueryItemConfig } from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQuery.vue'
import {
  Button as AButton,
  Divider,
  Modal,
  Card
} from 'ant-design-vue'
import type {
  DividerProps,
  CardProps
} from 'ant-design-vue'
import { LxLogInfo } from '/@/utils/log'
import { QueryItemCompEnum } from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem'
import CusModelTest from '/@/views/dashboard/cykPage/components/CusModelTest.vue'

interface CusDividerProps extends DividerProps {
  content: string
}

export default defineComponent({
  components: {
    CusModelTest,
    LxBasicTreeSelectVue,
    AButton,
    Divider,
    Modal,
    Card,
    LxBasicQuery
  },
  setup () {
    let count = ref(0)

    const handleBtnClick = () => {
      count.value++
      console.log(...LxLogInfo.primary('value is: ', count.value))
    }
    onMounted(() => {
      console.log(...LxLogInfo.warn('mounted, value is: ', count.value))
    })
    return {
      count,
      handleBtnClick,
      // modal
      ...modalTest(),
      // form
      ...formTest(),
      // model
      ...testModel()
    }
  }
})

// TODO: table
// TODO: dialog / model
function modalTest () {
  const modalVisible: Ref<boolean> = ref<boolean>(false) // 模态框
  const modalDividerProps: CusDividerProps = reactive({
    content: 'modal',
    dashed: true
  })
  const modalCardProps: CardProps = {
    size: 'small',
    title: 'modal 的 card'
  }
  const modalBtnNum = ref<number>(3)
  /**
   * 按钮点击 handler
   * @param args
   */
  const modalOkBtnHandle = (...args) => {
    console.log(...LxLogInfo.success(args))
    modalBtnNum.value = 20
    modalVisible.value = false
  }
  const modalClosedHandler = () => {
    modalBtnNum.value = 3
  }
  return {
    modalVisible,
    modalDividerProps,
    modalCardProps,
    modalBtnNum,
    modalOkBtnHandle,
    modalClosedHandler
  }
}
// TODO: form
function formTest () {
  const queryInfo = reactive<Recordable>({
    name: '8888',
    // password: '6666'
  })
  const querySchema = reactive<IQueryItemConfig[]>([
    { prop: 'name', label: '账号', placeholder: '请输入名称', comp: QueryItemCompEnum.INPUT, col: 8 },
    // { prop: 'password', label: '密码', placeholder: '请输入密码', comp: QueryItemCompEnum.INPUT, col: 8 },
  ])
  const queryHandler = () => {
    console.log(...LxLogInfo.primary('i am gonna query', queryInfo, toRaw(queryInfo)))
  }
  return {
    queryInfo,
    querySchema,
    queryHandler
  }
}
// =============================== [v-model 测试] =========================================
function testModel () {
  let myArr = reactive<number[]>([1, 2])
  const testMyArr = () => {
    console.log(...LxLogInfo.primary(myArr, toRaw(myArr)))
  }
  const updateMyArr = (value) => {
    console.log(...LxLogInfo.primary('update my arr', value))
    // myArr = reactive(value)
  }
  return {
    myArr,
    testMyArr,
    updateMyArr
  }
}
</script>


