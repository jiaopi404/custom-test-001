<template>
  <Input
    v-model:value="model"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import {
  Input
} from 'ant-design-vue'
import { IInputEventPayload } from '../LxBasicQuery.vue'

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
    const model = computed<string>({
      get: () => props.value,
      set: (val) => {
        emit('input', { key: props.prop, value: val } as IInputEventPayload) // 修改的值
      }
    })
    const searchHandler = () => {
      emit('query')
    }
    return {
      model,
      searchHandler,
    }
  },
})
</script>

<style lang="less" scoped>
</style>