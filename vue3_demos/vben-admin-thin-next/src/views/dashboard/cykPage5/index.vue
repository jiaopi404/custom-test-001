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
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Activity name" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.name" />
      </a-form-item>
      <a-form-item label="Activity zone" v-bind="validateInfos.region">
        <a-select v-model:value="modelRef.region" placeholder="please select your zone">
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity type" v-bind="validateInfos.type">
        <a-checkbox-group v-model:value="modelRef.type">
          <a-checkbox value="1" name="type">Online</a-checkbox>
          <a-checkbox value="2" name="type">Promotion</a-checkbox>
          <a-checkbox value="3" name="type">Offline</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
      </a-form-item>
    </a-form>
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
