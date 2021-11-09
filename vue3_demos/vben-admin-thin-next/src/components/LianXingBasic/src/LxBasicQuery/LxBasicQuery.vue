<template>
  <div class="lx-basic-query">
    <a-form
      class="lx-basic-query__form"
      :model="value"
      :label-col="{ span: 8 }"
    >
      <a-row
        v-for="(queryRow, rowIndex) in querySchemaComputed"
        :key="rowIndex"
      >
        <a-col
          v-for="(queryCol, colIndex) in queryRow"
          :key="queryCol.prop"
          :span="queryCol.col"
        >
          <a-form-item :label="queryCol.label" :name="queryCol.prop">
            <component
              :is="queryCol.comp"
              :value="valueComputed[queryCol.prop]"
              :prop="queryCol.prop"
              :placeholder="queryCol.placeholder"
              v-bind="queryCol.compProps || { index: colIndex }"
              @input="compInputHandler"
              @query="queryHandler"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="lx-basic-query__operation-container">
      <a-button type="primary" @click="btnClickHandler('query')">Query!</a-button>
      <a-button @click="btnClickHandler('cancel')">Reset</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, onMounted, reactive, ExtractPropTypes, toRaw, toRef, isReactive, isRef } from 'vue'
import {
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Select as ASelect,
  Col as ACol,
  Row as ARow,
  Button as AButton,
} from 'ant-design-vue'
import lxBasicQueryItemCompMixin from '/@/components/LianXingBasic/src/LxBasicQuery/lxBasicQueryItemCompMixin'
import { QueryItemCompEnum } from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem'
import { LocationQuery } from 'vue-router'
import { isEqual } from 'lodash-es'
import $commonServe from '/@/utils/commonServe'
import { useRouter, useRoute } from 'vue-router'
// import { LxLogInfo } from '/@/utils/log'

// =============================== [typings] =========================================
interface LxBasicQueryConfig { // 配置 接口
  defaultCol: number
}

const lxBasicQueryConfig: LxBasicQueryConfig = { // 配置
  defaultCol: 8
}

export interface IQueryItemConfig { // 查询项的
  prop: string
  label: string
  placeholder: string
  comp: QueryItemCompEnum
  compProps?: Recordable
  col?: number // 栅格系统，占多少
}

/**
 * input 事件的 payload
 */
export interface IInputEventPayload {
  key: string
  value: number | string | number[] | string[] | Date // 联合类型
}
const lxBasicQueryProps: {
  value?: Recordable | { required: true },
  querySchema?: IQueryItemConfig[] | { required: true }
} | null = {}
export type LxBasicQueryProps = Partial<ExtractPropTypes<typeof lxBasicQueryProps>>;

/**
 * 获取 col，大于 24 或者 空 则 赋 8
 * @param col
 */
function getCol (col) {
  return col ? (col > 24 ? lxBasicQueryConfig.defaultCol : col) : lxBasicQueryConfig.defaultCol
}

export default defineComponent({
  name: 'LxBasicQuery',
  components: {
    AForm,
    AFormItem,
    AInput,
    ASelect,
    ACol,
    ARow,
    AButton
  },
  mixins: [
    lxBasicQueryItemCompMixin
  ],
  props: {
    value: { // 双向绑定的值
      type: Object as PropType<Recordable>,
      required: true,
      default: () => {}
    },
    querySchema: {
      type: Array as PropType<IQueryItemConfig[]>,
      default: () => []
    },
    // TODO: size
    // TODO: disabled
    // TODO: 是否需要把查询参数存到 url 中
    ifUpdateUrl: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: ['query', 'update:value'],
  setup (props, { emit }) {
    // ======================== [data] ===========================
    // ======================== [computed] ===========================
    // 1. 根据 querySchema 计算出合理的 row 和 col
    const querySchemaComputed = computed<Array<IQueryItemConfig[]>>(() => {
      return props.querySchema.reduce((prev, queryItemConfig) => {
        let _lastRow = prev?.[prev.length - 1] // 最后一行
        if (!_lastRow) { // 无最后一行， push 空列表
          _lastRow = []
          prev.push(_lastRow)
        }
        const _lastRowColSum = _lastRow.reduce((prev, queryItemConfigRow) => {
          prev += getCol(queryItemConfigRow.col) // 默认 8 格
          return prev
        }, 0) // 最后一行的 col 合计
        if (_lastRowColSum + getCol(queryItemConfig.col) > 24) { // 最后一行超了，push
          const _nextRow = [queryItemConfig]
          prev.push(_nextRow)
        } else {
          _lastRow.push(queryItemConfig)
        }
        return prev
      }, [] as Array<IQueryItemConfig[]>)
    })
    // 2. 使用 computed 值代替传入的对象，目标是改变对象
    const valueComputed = computed<Recordable>({
      get () {
        return props.value
      },
      set (value) {
        emit('update:value', value)
      }
    })
    // ======================== [life cycle] ===========================
    const { resetFields } = AForm.useForm(props.value, /* rules */reactive([]))
    onMounted(() => {
      // const _formData = toRef(props, 'value') // ref
      // console.log('isReactive(props.value)', isReactive(props.value)) // true
      // console.log('isRef(props.value)', isRef(props.value)) // false
      // const _isReactive = isReactive
      // const _isRef = isReactive
      // _isReactive(_formData.value) // true
    })
    // ======================== [methods] ===========================
    const compInputHandler = (payload: IInputEventPayload) => {
      // const _obj = updateObj(props.value, payload)
      // console.log(...LxLogInfo.primary(JSON.stringify(toRaw(_obj))))
      // emit('update:value', updateObj(props.value, payload))
      props.value[payload.key] = payload.value // 直接修改对象
      const _rawValue: Recordable = toRaw(valueComputed.value)
      _rawValue[payload.key] = payload.value
      valueComputed.value = _rawValue
      // emit('update:value') // 通知更新？ 通过 computed 通知更新
    }
    const queryHandler = () => { // 不知道会不会变化呢
      // beforeQuery(props, router, route)
      emit('query')
    }
    const btnClickHandler = (flag: 'query' | 'cancel') => {
      if (flag === 'query') {
        // emit('update:value', props.value)
        // beforeQuery(props, router, route)
        emit('query')
      } else {
        // TODO: resetFields 不生效？
        resetFields()
        // emit('update:value')
        valueComputed.value = {}
        // beforeQuery(props, router, route)
        emit('query')
      }
    }
    // ======================== [ 处理查询参数 ] ===========================
    // processQueryParam(props, emit, router, route)
    return {
      valueComputed,
      querySchemaComputed,
      queryHandler,
      compInputHandler,
      btnClickHandler
    }
  },
})

// /**
//  * 处理查询参数
//  * @param props PropType<T>
//  * @param emit
//  * @param router
//  * @param route
//  */
// function processQueryParam (props, emit, router, route) {
//   if (props.ifUpdateUrl) {
//     const _query: LocationQuery = route.query
//     const _queryInfoUrlParam = _query.queryInfo // 查询参数中的 queryInfo
//     if (_queryInfoUrlParam) { // 如果有查询参数，判断与当前的是不是一致
//       const _queryInfo = $commonServe.base64ToObj(_queryInfoUrlParam)
//       console.log(_queryInfo, 'sfs')
//       const _curQueryInfo = toRaw(props.value)
//       if (!isEqual(_queryInfo, _curQueryInfo)) { // 如果不一致，修改当前路由
//         for (const [key] of Object.entries(_curQueryInfo)) {
//           props.value[key] = _queryInfo[key] // 将当前页面的 queryInfo 初始化
//         }
//         emit('update:value') // 提醒更新
//       }
//     } else { // 如果没有查询参数，将当前的 参数 添加到 url-param 中
//       // const _curQueryInfo = toRaw(props.value)
//       // const _curQueryInfoUrlParam = $commonServe.objToBase64(_curQueryInfo)
//       // router.replace({
//       //   name: route.name,
//       //   query: { ..._query, queryInfo: _curQueryInfoUrlParam }
//       // })
//       beforeQuery(props, router, route)
//     }
//   }
// }
//
// /**
//  * 查询之前做的事
//  * @param props
//  * @param router
//  * @param route
//  */
// function beforeQuery (props, router, route) {
//   const _curQueryInfo = toRaw(props.value)
//   const _curQueryInfoUrlParam = $commonServe.objToBase64(_curQueryInfo)
//   router.replace({
//     name: route.name,
//     query: { ...route.query, queryInfo: _curQueryInfoUrlParam }
//   })
// }
</script>

<style lang="less" scoped>
.lx-basic-query {
  .lx-basic-query__operation-container {
    display: flex;
  }
}
</style>
