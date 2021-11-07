<template>
  <div class="cyk-page-2">
    <Form :model="formData" :label-col="{ span: 4, offset: 0 }" :wrapper-col="{ offset: 0, span: 8 }">
      <FormItem label="name" name="name">
        <Input
          v-model:value="formData.name"
          placeholder="please enter name"
          @change="inputChangeHandler"
          @press-enter="pressEnterHandler"
        />
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  Form,
  FormItem,
  Input
} from 'ant-design-vue'
import { LxLogInfo } from '/@/utils/log'

export default defineComponent({
  name: 'CykPage2',
  components: {
    Form,
    FormItem,
    Input
  },
  setup () {
    const formData = reactive({
      name: ''
    })
    // =============================== [event] =========================================
    const inputChangeHandler = (e) => {
      console.log(...LxLogInfo.primary('input: ', e))
    }
    const pressEnterHandler = (e) => {
      console.log(...LxLogInfo.primary('press enter: ', e))
    }
    return {
      formData,
      inputChangeHandler,
      pressEnterHandler
    }
  }
})
</script>

<style lang="less" scoped>
</style>