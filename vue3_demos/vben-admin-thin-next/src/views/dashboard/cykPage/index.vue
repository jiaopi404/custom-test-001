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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue'
import { LxBasicTreeSelectVue } from '/@/components/LianXingBasic'
import LxBasicQuery, { QueryItemConfig, QueryItemComp } from '/@/views/dashboard/cykPage/components/LxBasicQuery.vue'
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

interface CusDividerProps extends DividerProps {
  content: string
}

export default defineComponent({
  components: {
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
      ...formTest()
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
    name: '',
    password: ''
  })
  const querySchema = reactive<QueryItemConfig[]>([
    { prop: 'name', placeholder: '请输入名称', comp: QueryItemComp.INPUT, col: 8 },
    { prop: 'password', placeholder: '请输入密码', comp: QueryItemComp.INPUT, col: 6 },
  ])
  const queryHandler = (value) => {
    console.log(...LxLogInfo.primary(value))
  }
  return {
    queryInfo,
    querySchema,
    queryHandler
  }
}
</script>


