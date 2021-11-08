<template>
  <Select
    v-model:value="value2"
    :options="options"
    mode="multiple"
    :size="size"
    placeholder="Please select"
    style="width: 200px"
    @popupScroll="popupScroll"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  Select
} from 'ant-design-vue'


export default defineComponent({
  name: 'LxBasicQuerySelect',
  components: {
    Select
  },
  props: []
})
</script>

<style lang="less" scoped>
</style>
