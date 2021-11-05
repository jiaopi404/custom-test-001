<template>
  <div class="lx-basic-tree-select">
    <div>树下拉组件 {{ a }}</div>
    <div>
      <button @click="a++">a++: {{ a }}</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const a = ref(0);
      return {
        a,
      };
    },
  });
</script>
