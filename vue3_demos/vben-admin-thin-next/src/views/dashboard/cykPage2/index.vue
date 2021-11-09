<template>
  <div class="cyk-page-2">
<!--    <Form :model="formData" :label-col="{ span: 4, offset: 0 }" :wrapper-col="{ offset: 0, span: 8 }">-->
<!--      <FormItem label="name" name="name">-->
<!--        <Input-->
<!--          v-model:value="formData.name"-->
<!--          placeholder="please enter name"-->
<!--          @change="inputChangeHandler"-->
<!--          @press-enter="pressEnterHandler"-->
<!--        />-->
<!--      </FormItem>-->
<!--    </Form>-->
<!--    <div>-->
<!--      <div>count down</div>-->
<!--      <CountButton-->
<!--        :value="80"-->
<!--        :count="99"-->
<!--      >i am a count button</CountButton>-->
<!--    </div>-->
<!--    <CollapseContainer>-->
<!--      <template #title>-->
<!--        <span>this is title</span>-->
<!--      </template>-->
<!--      <template #action>-->
<!--        <span>this is action</span>-->
<!--      </template>-->
<!--      <template v-slot:default>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--        <div>this is content</div>-->
<!--      </template>-->
<!--    </CollapseContainer>-->
    <div>------------------------------------------------------------------------------------</div>
    <LxBasicQuery
      v-model:value="queryInfo"
      :query-schema="querySchema"
      @query="queryHandler"
    />
    <AButton @click="doChangeQuerySchema">do change query schema</AButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue'
// import {
//   Form,
//   FormItem,
//   Input
// } from 'ant-design-vue'
import { LxLogInfo } from '/@/utils/log'
// import CountButton from '/@/components/CountDown/src/CountButton.vue'
// import CollapseContainer from '/@/components/Container/src/collapse/CollapseContainer.vue'
import LxBasicQuery, { IQueryItemConfig } from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQuery.vue'
import { QueryItemCompEnum } from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem'
import AButton from '/@/components/Button/src/BasicButton.vue'
// import { decodeByBase64, encryptByBase64 } from '/@/utils/cipher'

export default defineComponent({
  name: 'CykPage2',
  components: {
    AButton,
    LxBasicQuery,
    // CollapseContainer,
    // CountButton,
    // Form,
    // FormItem,
    // Input
  },
  setup () {
    // test
    // processUrlParam()
    // const formData = reactive({
    //   name: ''
    // })
    // // =============================== [event] =========================================
    // const inputChangeHandler = (e) => {
    //   console.log(...LxLogInfo.primary('input: ', e))
    // }
    // const pressEnterHandler = (e) => {
    //   console.log(...LxLogInfo.primary('press enter: ', e))
    // }
    return {
      // formData,
      // inputChangeHandler,
      // pressEnterHandler,
      ...formTest()
    }
  }
})

// TODO: form
function formTest () {
  const queryInfo = ref<Recordable>({
    name: '8888',
    password: '6666'
  })
  const querySchema = reactive<IQueryItemConfig[]>([
    { prop: 'name', label: '账号', placeholder: '请输入名称', comp: QueryItemCompEnum.INPUT, col: 8 },
    { prop: 'password', label: '密码', placeholder: '请输入密码', comp: QueryItemCompEnum.INPUT, col: 8 },
  ])
  const queryHandler = () => {
    console.log(...LxLogInfo.primary('i am gonna query', queryInfo, queryInfo.value, toRaw(queryInfo.value)))
  }
  // 看是否可以动态得添加属性! 确实可以，如果做的通用一点，甚至可以动态得绑定查询项，这就牛逼 plus 了
  const doChangeQuerySchema = () => {
    querySchema.push({ prop: 'verifyCode', label: '验证码', placeholder: '请输入验证码', comp: QueryItemCompEnum.INPUT, col: 8 })
  }
  return {
    queryInfo,
    querySchema,
    queryHandler,
    doChangeQuerySchema
  }
}

// function processUrlParam () {
//   const _tmpQueryInfo = {
//     name: '111',
//     pwd: '密码'
//   }
//   const jsonStr = JSON.stringify(_tmpQueryInfo)
//   const _str = encryptByBase64(jsonStr)
//   console.log('%c [_str is: ] ', 'color: #67C23A; font-size: 16px;', _str)
//   const _deStr = decodeByBase64(_str)
//   console.log('%c [de str is: ] ', 'color: #67C23A; font-size: 16px;', _deStr)
//   console.log(JSON.parse(_deStr))
// }
</script>

<style lang="less" scoped>
</style>
