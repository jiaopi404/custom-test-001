<template>
  <Select
    v-model:value="computedMultiValue"
    :mode="mode"
    style="width: 100%"
    placeholder="Please select"
    :options="options"
    @change="handleChange"
  />
  <AButton @click="showData">组件中 show data</AButton>
</template>

<script lang="ts">
import { computed, defineComponent, isReactive, isReadonly, onRenderTracked, PropType, ref, toRaw, watch } from 'vue'

import {
  Select
} from 'ant-design-vue'
import AButton from '/@/components/Button/src/BasicButton.vue'


export default defineComponent({
  name: 'LxBasicQuerySelect',
  components: {
    AButton,
    Select
  },
  props: {
    mode: { // 模式，单选or 多选
      type: String as PropType<string>,
      default: 'multiple'
    },
    multiValue: { // 多选绑定值
      type: Array as PropType<string[]>,
      default: () => []
    },
    options: {
      type: Array as PropType<{ value: string | number, label: string }[]>,
      default: () => {
        return [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
      }
    }
  },
  setup (props, { emit }) {
    let computedMultiValue = computed<string[]>({
      get () {
        console.log('看看这个会不会改变呢？？？', props.multiValue, isReadonly(props.multiValue), isReactive(props.multiValue))
        return props.multiValue
      },
      set (value) {
        console.log('in multi value setter: ', value)
        // 直接修改 props.multiValue
        // const oldLength = props.multiValue.length
        // for (let i = 0; i < oldLength; i++) {
        //   props.multiValue.pop()
        // }
        // const newLength = (value as string[]).length
        // for (let i = 0; i < newLength; i++) {
        //   props.multiValue.push((value as string[])[i])
        // }
        emit('update:multiValue', value) // 这样是最简洁的了
        // emit('update:multiValue', value)
      }
    })
    // 看一下能不能 watch 到
    // watch(
    //   () => props.multiValue,
    //   (nv, ov) => {
    //     console.log('%c [watcher multivalue, nv, ov] ', 'color: #67C23A; font-size: 16px;', nv, ov)
    //     // computedMultiValue = ref<string[]>(nv) // 设置 computedMultiValue 值
    //     computedMultiValue.value = toRaw(nv)
    //   },
    //   {
    //     deep: true
    //   }
    // )
    const handleChange = (e) => {
      console.log('change handler, is: ', e, props, emit)
    }
    const showData = () => {
      console.log('show data: ', props.multiValue, toRaw(props.multiValue))
    }
    onRenderTracked((e) => {
      // debugger
      console.log('render tracked', e)
    })
    return {
      computedMultiValue,
      handleChange,
      showData
    }
  }
})
</script>

<style lang="less" scoped>
</style>
