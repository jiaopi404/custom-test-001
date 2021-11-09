<template>
  <Input
    v-model:value="model"
    :placeholder="placeholder"
    @press-enter="searchHandler"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import {
  Input
} from 'ant-design-vue'
import { IInputEventPayload } from 'src/components/LianXingBasic/src/LxBasicQuery/LxBasicQuery.vue'
import { emitEvent } from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem/lxBasicQueryItemCompTools'

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
  emits: [emitEvent.input, emitEvent.query],
  setup (props, { emit }) {
    // TODO: 看 computed 是否可以一同舍弃掉，BasicQuery 直接使用 v-model，但问题是，外部如何鉴定单个 propValue 的改变呢？
    const model = computed<string>({
      get: () => props.value,
      set: (val) => {
        emit(emitEvent.input, { key: props.prop, value: val } as IInputEventPayload) // 修改的值
      }
    })
    const searchHandler = () => {
      emit(emitEvent.query)
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
