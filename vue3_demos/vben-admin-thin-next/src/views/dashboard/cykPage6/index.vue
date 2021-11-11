<template>
  <div class="cyk-page-6">
    <a-card
      title="这是标题"
    >
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Activity name" v-bind="validateInfos.name">
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
        <a-form-item label="Activity zone" v-bind="validateInfos.region">
          <a-select v-model:value="modelRef.region" placeholder="please select your zone">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Activity type" v-bind="validateInfos.type">
          <a-checkbox-group v-model:value="modelRef.type">
            <a-checkbox value="1" name="type">Online</a-checkbox>
            <a-checkbox value="2" name="type">Promotion</a-checkbox>
            <a-checkbox value="3" name="type">Offline</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
          <a-button style="margin-left: 10px" @click="showValidateInfo">show Validate Info</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card title="测试 reactive 响应式对象">
      <a-space>
        <div>time: {{ state1.time }}</div>
        <a-button @click="testFn">go !</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, unref } from 'vue'
import {
  Space as ASpace,
  Card as ACard,
  Input as AInput,
  TreeSelect,
  Form as AForm,
  FormItem as AFormItem,
  CheckboxGroup as ACheckboxGroup,
  Checkbox as ACheckbox,
  Select as ASelect,
  SelectOption as ASelectOption
} from 'ant-design-vue'
import AButton from '/@/components/Button/src/BasicButton.vue'
// import { getTreeList } from '/@/api/demo/tree'
// import commonServe from '/@/utils/commonServe'

const useForm = AForm.useForm

function testForm () {
  const modelRef = reactive({
    name: '',
    region: undefined,
    type: [],
  });
  const rulesRef = reactive({
    name: [
      {
        required: true,
        message: 'Please input name',
      },
    ],
    region: [
      {
        required: true,
        message: 'Please select region',
      },
    ],
    type: [
      {
        required: true,
        message: 'Please select type',
        type: 'array',
      },
    ],
  });
  const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
  const onSubmit = () => {
    validate()
      .then(() => {
        console.log(toRaw(modelRef));
      })
      .catch(err => {
        console.log('error', err);
      });
  };
  // 看什么结构
  const showValidateInfo = () => {
    console.log(validateInfos, 'validateInfos', toRaw(validateInfos))
  }
  return {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    validateInfos,
    resetFields,
    modelRef,
    onSubmit,
    showValidateInfo
  };
}

// 测试 reactive 和 ref 的特性
function testReactiveRef () {
  const state1 = reactive({
    time: new Date()
  })
  const testFn = () => {
    // state1.time.setDate(state1.time.getDate() + 1) // 看会不会刷新
    state1.time = new Date() // 修改为新对象
    console.log(toRaw(state1), 'row state')
  }
  return {
    state1,
    testFn
  }
}

export default defineComponent({
  name: 'CykPage4',
  components: {
    AButton,
    ASpace,
    ACard,
    AInput,
    TreeSelect,
    AForm,
    AFormItem,
    ACheckboxGroup,
    ACheckbox,
    ASelect,
    ASelectOption
  },
  setup () {
    return {
      ...testForm(),
      ...testReactiveRef()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
