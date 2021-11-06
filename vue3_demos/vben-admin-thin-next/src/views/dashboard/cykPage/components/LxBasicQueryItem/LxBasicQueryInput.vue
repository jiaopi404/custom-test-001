<template>
  <Input
    v-model:value="model"
    :placeholder="placeholder"
    @change="changeHandler"
    @press-enter="searchHandler"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import {
  Input
} from 'ant-design-vue'
import { IInputEventPayload } from '../LxBasicQuery.vue'
import { LxLogInfo } from '/@/utils/log'

export default defineComponent({
  name: 'LxBasicQueryInput',
  components: {
    Input
  },
  props: {
    prop: { // 属性
      type: String as PropType<string>,
      default: ''
    },
    value: { // 绑定的值
      type: String as PropType<string>,
      default: ''
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请输入'
    }
  },
  emits: ['input', 'query'],
  setup (props, { emit }) {
    const model = ref<string>(props.value) // 维护自己的状态
    watch(() => props.value, (nv) => { // 重新监听
      console.log(...LxLogInfo.primary('input nv, nv', nv))
      model.value = nv
    })
    const changeHandler = () => {
      emit('input', { key: props.prop, value: model.value } as IInputEventPayload) // 修改的值
    }
    const searchHandler = () => {
      emit('query')
    }
    return {
      model,
      searchHandler,
      changeHandler
    }
  },
})
</script>

<style lang="less" scoped>
</style>