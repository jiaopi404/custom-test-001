<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p class="about_router-link-anchor">
      <el-button type="text" @click="routeTo('AboutForm')">表单</el-button>
      <el-button type="text" @click="routeTo('AboutTable')">表格</el-button>
      <el-button type="text" @click="routeTo('AboutFormTable')">表格表单</el-button>
    </p>
    <router-view />
  </div>
</template>

<script lang="ts">
import router from '@/router'
export default {
  setup () {
    const routeRecordRow = {
      name: ''
    }
    function routeTo (routeName: string) {
      routeRecordRow.name = routeName
      router.push(routeRecordRow)
    }
    return {
      routeTo
    }
  }
}
</script>

<style lang="less">
.about {
  .about_router-link-anchor {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
