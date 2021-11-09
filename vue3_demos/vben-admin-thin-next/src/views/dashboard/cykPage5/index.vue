<template>
  <div class="cyk-page-5">
    <TreeSelect
      v-if="treeList.length"
      v-model:value="treeValue"
      style="width: 300px"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="treeList"
      placeholder="Please select"
      tree-default-expand-all
    >
      <template #title="{ key, value }">
        <span style="color: #08c" v-if="key === '0-0-1'">Child Node1 {{ value }}</span>
      </template>
    </TreeSelect>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, unref } from 'vue'
import {
  Space as ASpace,
  Card as ACard,
  Input,
  TreeSelect
} from 'ant-design-vue'
import AButton from '/@/components/Button/src/BasicButton.vue'
import { getTreeList } from '/@/api/demo/tree'
import commonServe from '/@/utils/commonServe'

function testTreeSelectComp () {
  const treeList = ref([])
  getTreeList().then(res => {
    // console.log(res, 'res is: ')
    const _data = res?.data.data
    commonServe.treeForEach(_data, (item) => {
      item.value = item.id
      item.label = item.name
      item.key = item.id
    })
    treeList.value = _data
    console.log(treeList.value, 'ksfjlsdfjsdkl')
  })
  const treeValue = ref()
  return {
    treeList,
    treeValue
  }
}

export default defineComponent({
  name: 'CykPage4',
  components: {
    AButton,
    ASpace,
    ACard,
    Input,
    TreeSelect
  },
  setup () {
    return {
      ...testTreeSelectComp()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
