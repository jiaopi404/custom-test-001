<template>
  <div class="cus-form-table">
    <h3>form table</h3>
    <comp-test-slot>
<!--      <template v-slot:someName="{ someProp }">-->
      <template #someName="{ someProp }">
        <div>{{ someProp }}</div>
      </template>
    </comp-test-slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CompTestSlot from '../basic/CompTestSlot'
export default defineComponent({
  name: 'CusFormTable',
  components: {
    CompTestSlot
  },
  setup () {
    return {
    }
  }
})
</script>

<style scoped>

</style>
