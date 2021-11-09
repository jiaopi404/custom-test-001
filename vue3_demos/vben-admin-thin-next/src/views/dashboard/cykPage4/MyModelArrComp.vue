<template>
  <div class="my-model-arr-comp">
    <ul>
      <li>下拉菜单，请选择</li>
      <li
        v-for="opt of options"
        :key="opt.value"
        @click="optItemClickHandler(opt)"
      >
        <Space>
          <span>{{ opt }}</span>
          <span v-if="getIfChecked(opt.value)">✅</span>
        </Space>
      </li>
      <li>
        <AButton @click="confirm">confirm</AButton>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRaw } from 'vue'
import { Space } from 'ant-design-vue'
import AButton from '/@/components/Button/src/BasicButton.vue'

export interface MyOption {
  value: number
  label: string
}

function mySelectComp (props, { emit }) {
  const modelComputed = computed<number[]>({
    get () {
      return props.value
    },
    set (value) { // 更新，只有重设数组值时才会执行
      emit('update:value', value)
      emit('change', value)
    }
  })
  const getIfChecked = (value) => { // 同 vue2 一样，会实时更新
    return modelComputed.value.findIndex(item => item === value) > -1
  }
  const confirm = () => {
    emit('confirm', toRaw(modelComputed.value))
  }
  /**
   * 改值
   * @param opt
   */
  const optItemClickHandler = (opt: MyOption) => {
    const _index = modelComputed.value.findIndex(item => item === opt.value)
    const _arr = [...modelComputed.value]
    if (_index === -1) { // 没找到
      _arr.push(opt.value)
    } else {
      _arr.splice(_index, 1)
    }
    modelComputed.value = _arr
  }
  return {
    modelComputed,
    getIfChecked,
    confirm,
    optItemClickHandler
  }
}

export default defineComponent({
  name: 'MyModelArrComp',
  components: {
    AButton,
    Space
  },
  props: {
    value: {
      type: Array as PropType<number[]>,
      default: () => [],
      required: true
    },
    options: {
      type: Array as PropType<MyOption[]>,
      default: () => []
    }
  },
  emits: ['update:value', 'change', 'confirm'],
  setup (props, ctx) {
    return {
      ...mySelectComp(props, ctx)
    }
  }
})
</script>

<style lang="less" scoped>
</style>
