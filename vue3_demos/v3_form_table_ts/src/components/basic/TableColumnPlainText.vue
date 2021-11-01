<template>
  <span class="table-column-plain-text">{{ valueCpd }}</span>
</template>

<script lang="ts">
import { computed } from 'vue'
import $util from '@/utils/$util'
import { Recordable } from '@/components/about/types/form'
const TableColumnPlainText = {
  name: 'TableColumnPlainText',
  props: {
    value: {
      type: [String, Object, Number]
    }
  },
  setup (props: Recordable<any>) {
    const valueCpd = computed(() => {
      if (props.value === 0) {
        return '0'
      } else {
        return $util.lengthLimit(props.value, 10)
      }
    })
    return {
      valueCpd
    }
  }
}
export default TableColumnPlainText
</script>

<style scoped>

</style>
