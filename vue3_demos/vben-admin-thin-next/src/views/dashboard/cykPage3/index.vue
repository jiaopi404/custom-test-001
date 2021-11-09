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
    </ASpace>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  Space as ASpace,
  Card as ACard,
} from 'ant-design-vue'
import LxBasicQuerySelect from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem/LxBasicQuerySelect.vue'
import AButton from '/@/components/Button/src/BasicButton.vue'

function multiValueComposition () {
  let multiValue = reactive<string[]>(['a1'])
  return {
    multiValue
  }
}

export default defineComponent({
  name: 'CykPage3',
  components: {
    AButton,
    LxBasicQuerySelect,
    ASpace,
    ACard
  },
  setup () {
    const multiValueMixin = multiValueComposition()
    // const testObj = reactive({
    //   a: 1,
    //   b: 2,
    //   c: ['a1']
    // })
    // ======================== [test to refs] ===========================
    const showData = _ => {
      console.log('%c [multi value is: ] ', 'color: #67C23A; font-size: 16px;', multiValueMixin.multiValue)
    }
    const changeData = () => {
      multiValueMixin.multiValue.push('b2')
    }
    return {
      showData,
      ...multiValueMixin,
      changeData
    }
  }
})
</script>

<style lang="less" scoped>
</style>
