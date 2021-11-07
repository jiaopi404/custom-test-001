<template>
  <div class="about-comp">
    <a-button type="primary">Primary Button</a-button>
    <a-card size="small" title="Small size card">
      <template #extra>
        <a-button type="primary" @click="btnClkHandler">Primary Button</a-button>
      </template>
      <a-button type="primary">Primary Button</a-button>
      <div>
        <span :class="someClass['text-red']">111</span>
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {Button} from "ant-design-vue";
export default defineComponent({
  name: 'AboutComp',
  setup(props) {
    console.log('看看')
    const btnClkHandler = () => {
      console.log('点击按钮')
    }
    return {
      btnClkHandler
    }
  }
})
</script>

<style module="someClass">
.text-red {
  color: red;
}
</style>
