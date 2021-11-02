<template>
  <span class="table-column-anchor el-color--primary" @click.stop="anchorClickHandler">
<!--     el-cursor&#45;&#45;pointer-->
    {{ value }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTableColumnEvent } from '@/components/basic/table'

export default defineComponent({
  name: 'TableColumnAnchor',
  emits: [BasicTableColumnEvent.ANCHOR_CLICK],
  props: {
    value: { // value 要显示的数据
      type: [String, Number, Object]
    },
    prop: { // 用以标识的字段
      type: [String, Object],
      default: 'name'
    },
    row: {
      type: Object
    },
    // 接收其他的负载信息，用于更好的区分与判断 anchor 的行为
    payload: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * 点击 anchor 处理时间，emit 出 row 和 prop
     */
    anchorClickHandler (): void {
      this.$emit(BasicTableColumnEvent.ANCHOR_CLICK, { row: this.row, value: this.value, prop: this.prop, payload: this.payload })
    }
  }
})
</script>

<style scoped>
    .table-column-anchor{
        /* 鼠标形状 */
        cursor:pointer
    }
</style>
