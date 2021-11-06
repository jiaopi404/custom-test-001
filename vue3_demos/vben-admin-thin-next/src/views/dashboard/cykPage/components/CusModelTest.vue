<template>
  <div class="cus-model-test">
    <ul>
      <li
        v-for="item in modelValue"
        :key="item"
      >{{ item }}</li>
    </ul>
    <Button @click="btnClickHandler">点击，push一个随机数</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  Button
} from 'ant-design-vue'

export default defineComponent({
  name: 'CusModelTest',
  components: {
    Button
  },
  props: {
    modelValue: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const btnClickHandler = () => {
      // 无 reactive
      // emit('update:modelValue', [...props.modelValue, Math.floor(Math.random() * 100)])
      // 有 reactive
      // emit('update:modelValue', reactive<number[]>([...props.modelValue, Math.floor(Math.random() * 100)]))
      // 直接修改 props.modelValue
      props.modelValue.push(Math.floor(Math.random() * 100))
      emit('update:modelValue')
    }
    return {
      btnClickHandler
    }
  }
})
</script>

<style lang="less" scoped>
</style>