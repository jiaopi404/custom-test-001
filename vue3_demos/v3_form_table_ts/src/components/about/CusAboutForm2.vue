<template>
  <div class="cus-about-form-2">
    <h3>about form</h3>
    <el-form
      ref="cusForm"
      label-width="auto"
      size="small"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="username" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="please enter username..."
        />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="please enter password..."
          type="password"
        />
      </el-form-item>
      <el-form-item label="password cap">
        {{ passwordCap }}
      </el-form-item>
    </el-form>
    <el-row align="flex" justify="center">
      <el-col>
        <el-button size="mini" type="primary" @click="submitForm">submit</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { FormInfo } from '@/components/about/types/form'

const CusAboutForm2 = defineComponent({
  name: 'CusAboutForm2',
  setup () {
    const formInfo = reactive<FormInfo>({
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: []
      },
      formOptions: {
        school: /sdfds/
      },
      formDataKey: {}
    } as FormInfo)
    return {}
  }
})
export default CusAboutForm2
</script>

<style scoped>

</style>
