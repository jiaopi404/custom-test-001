<template>
  <div class="cyk-page-3">
    <ASpace direction="vertical">
      <ACard title="card1">
        <ASpace direction="vertical">
          <MyModelArrComp
            v-model:value="formData"
            :options="formOptions"
            @change="mcChangeHandler"
            @confirm="mcConfirmHandler"
          />
          <AButton @click="viewData">view Data</AButton>
        </ASpace>
      </ACard>
    </ASpace>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, unref } from 'vue'
import {
  Space as ASpace,
  Card as ACard,
  Input
} from 'ant-design-vue'
import AButton from '/@/components/Button/src/BasicButton.vue'
import MyModelArrComp, { MyOption } from '/@/views/dashboard/cykPage4/MyModelArrComp.vue'

function testMyModelArrComp () {
  const formData = ref<number[]>([])
  const formOptions = ref<MyOption[]>([
    { value: 0, label: '你看看' },
    { value: 1, label: '我卡哪款呢' }
  ])
  const mcChangeHandler = (v) => {
    console.log(v, 'change', unref(v))
  }
  const mcConfirmHandler = (v) => {
    console.log(v, 'confirm')
  }
  const viewData = () => {
    console.log(formData, 'form data ref')
    console.log(formData.value, 'value log')
  }
  return {
    formData,
    formOptions,
    mcChangeHandler,
    mcConfirmHandler,
    viewData
  }
}

export default defineComponent({
  name: 'CykPage4',
  components: {
    AButton,
    ASpace,
    ACard,
    Input,
    MyModelArrComp
  },
  setup () {
    return {
      ...testMyModelArrComp()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
