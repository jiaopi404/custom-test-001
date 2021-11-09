<template>
  <div class="cyk-page-3">
    <ASpace direction="vertical">
      <ACard title="card1">
        <ASpace>
          <span>下拉：</span>
          <LxBasicQuerySelect
            v-model:multiValue="multiValue"
            style="width: 200px;"
          />
          <AButton @click="showData(multiValue)">show data</AButton>
          <AButton @click="changeData">change multiValue</AButton>
        </ASpace>
      </ACard>
      <ACard title="测试一下列表">
        <ul>
          <li>reactive 的列表</li>
          <li
            v-for="item in tableData"
            :key="item.id"
            style="width: 100px;"
          >{{ item.id }}: {{ item.name }}</li>
        </ul>
        <AButton @click="getData">get data</AButton>
        <ul>
          <li>ref 的列表</li>
          <li v-for="item in tableDataRef" :key="item.id" @click="refItemClickHandler(item)">
            {{ item }}
          </li>
        </ul>
        <AButton @click="getDataRef">get data ref</AButton>
      </ACard>
      <ACard title="行内编辑试一下啦">
        <ul>
          <li>行内编辑一下</li>
          <li
            v-for="item in tableDataEditable"
            :key="item.id"
          >
            <Input
              v-model:value="item.name"
              placeholder="输入一下"
            />
          </li>
          <AButton @click="editableHandler">editable handler</AButton>
        </ul>
      </ACard>
    </ASpace>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue'
import {
  Space as ASpace,
  Card as ACard,
  Input
} from 'ant-design-vue'
import LxBasicQuerySelect from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem/LxBasicQuerySelect.vue'
import AButton from '/@/components/Button/src/BasicButton.vue'

function multiValueComposition () {
  let multiValue = ref<string[]>(['a1'])
  // ======================== [test to refs] ===========================
  const showData = _ => {
    console.log('%c [multi value is: ] ', 'color: #67C23A; font-size: 16px;', multiValue.value)
  }
  const changeData = () => {
    multiValue.value.push('b2')
  }
  return {
    multiValue,
    showData,
    changeData,
  }
}

interface MyData {
  id: number
  name: string
}

function tableComposition () {
  // ======================== [reactive] ===========================
  const dataGetter = () => {
    const _data: MyData[] = []
    for (let i = 0; i < 10; i++) {
      _data.push({ id: i, name: (Math.random() * 100).toFixed(5) })
    }
    return _data
  }
  let tableData = reactive<MyData[]>(dataGetter())

  const getData = () => {
    // 模拟获取数据
    setTimeout(() => {
      const _data = dataGetter()
      console.log(_data, 111)
      // tableData = reactive<MyData[]>(_data)
      // 1. 通过proxy 进行修改
      tableData.splice(0, 10, ..._data) // 通过代理修改时
    }, 1000)
  }
  // ======================== [ref] ===========================
  let tableDataRef = ref<MyData[]>(dataGetter())
  const getDataRef = () => {
    setTimeout(() => {
      const _data = dataGetter()
      console.log(_data, 222)
      tableDataRef.value = _data
    })
  }
  const refItemClickHandler = (item) => {
    console.log(item, 888)
  }
  // ======================== [editable] ===========================
  // let tableDataEditable = reactive<MyData[]>(dataGetter())
  let tableDataEditable = ref<MyData[]>(dataGetter())
  const editableHandler = () => {
    // console.log(toRaw(tableDataEditable), 888)
    // console.log(tableDataEditable.value, 888) // Proxy ???
    // 改一下 value 看有没有响应特性
    tableDataEditable.value = dataGetter() // 修改后，依然有响应式？？？ 可能改变 value 之后会重新进行响应式计算
  }
  return {
    tableData,
    getData,
    tableDataRef,
    getDataRef,
    refItemClickHandler,
    tableDataEditable,
    editableHandler
  }
}

export default defineComponent({
  name: 'CykPage3',
  components: {
    AButton,
    LxBasicQuerySelect,
    ASpace,
    ACard,
    Input
  },
  setup () {
    return {
      ...multiValueComposition(),
      ...tableComposition()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
