<template>
  <div class="comp-test-slot">
    <slot name="someName" :some-prop="1112222">aaa</slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CompTestSlot'
})
</script>

<style scoped>

</style>
