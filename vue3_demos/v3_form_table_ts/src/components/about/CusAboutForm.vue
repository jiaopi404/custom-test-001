<template>
  <div class="cus-about-form">
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

<script>
import { reactive, onMounted, ref, computed, defineComponent } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'CusAboutForm',
  setup (props, { $refs }) {
    // ======================== [data] ===========================
    const formData = reactive({
      username: '',
      password: ''
    })
    const formRules = reactive({
      username: [
        { required: true, message: 'please enter username...', trigger: 'change' }
      ],
      password: [
        { required: true, message: 'please enter pwd...', trigger: 'change' },
        { validator: asyncPwdValidator, trigger: 'change' }
      ]
    })
    // ======================== [ref] ===========================
    const cusForm = ref(null) // ref
    // ======================== [computed] ===========================
    const passwordCap = computed(() => formData.password.toUpperCase())
    // ======================== [mounted] ===========================
    onMounted(() => {
      // 设置初始用户名
      formData.username = '你好'
    })
    // ======================== [methods] ===========================
    async function submitForm () {
      try {
        console.log(cusForm.value)
        if (cusForm.value) {
          await cusForm.value.validate()
          // 表单验证通过
        }
      } catch (err) {
        console.log('Error: Method [submit form]', err)
        if (err.data || err.message) {
          ElMessage.error(err.data || err.message)
        }
      }
    }
    return {
      formData,
      formRules,
      cusForm,
      passwordCap,
      submitForm
    }
  }
})
function asyncPwdValidator (rule, value, cb) {
  const pwdPattern = /^[a-z][a-z0-9.]+$/
  if (!pwdPattern.test(value)) {
    return cb(new Error('password is not allowed...'))
  }
  return cb()
}
// async function validate (formComp) {
//   await formComp.validate()
// }
</script>

<style scoped>

</style>
