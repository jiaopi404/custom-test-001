<template>
  <div class="cus-about-form-2">
    <h3>about form</h3>
    <el-form
      ref="elFormRef"
      label-width="auto"
      size="small"
      :model="formInfo.formData"
      :rules="formInfo.formRules"
    >
      <el-form-item label="username" prop="username">
        <el-input
          v-model="formInfo.formData.username"
          placeholder="please enter username..."
        />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          v-model="formInfo.formData.password"
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
import { defineComponent, reactive, ref, computed } from 'vue'
import { FormInfo } from '@/components/about/types/form'
import { ElForm } from 'element-plus'

const CusAboutForm2 = defineComponent({
  name: 'CusAboutForm2',
  setup () {
    const formInfo = reactive<FormInfo>({
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          { required: true, message: 'please enter username', trigger: 'change' }
        ]
      },
      formOptions: {
        school: []
      }
    })
    const elFormRef = ref<typeof ElForm | null>(null)
    const passwordCap = computed(() => (formInfo.formData.username as string).toUpperCase())
    const submitForm = async () => {
      if (elFormRef.value !== null) {
        await elFormRef.value.validate()
        console.log('validate completed')
      }
    }
    return {
      formInfo,
      elFormRef,
      passwordCap,
      submitForm
    }
  }
})
export default CusAboutForm2
</script>

<style scoped>

</style>
