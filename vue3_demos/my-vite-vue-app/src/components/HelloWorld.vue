<script lang="ts" setup>
import { ref, reactive } from 'vue'
import AboutComp from './AboutComp.vue'

defineProps({
  msg: String
})

type Recordable<T = any> = Record<string, T>

const count = ref(0)
let i = 0
const tableData = reactive<Recordable[]>([
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
  { id: ++i, name: 'good' + Math.random().toFixed(2) },
])
</script>

<template>
  <h1>{{ msg }}</h1>

  <about-comp></about-comp>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <ul>
    <li
      v-for="(item, index) in tableData"
      :key="index"
    >id: {{ item.id }}, name: {{ item.name }}</li>
  </ul>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
