<template>
  <div class="lx-basic-query">
    <a-form
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
              v-model:value="value[queryCol.prop]"
              :prop="queryCol.prop"
              :placeholder="queryCol.placeholder"
              v-bind="queryCol.compProps || { index: colIndex }"
              @input="compInputHandler"
              @query="queryHandler"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-button type="primary" @click="btnClickHandler('query')">Query!</a-button>
          <a-button @click="btnClickHandler('cancel')">Reset</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, onMounted, reactive, ExtractPropTypes } from 'vue'
import {
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Select as ASelect,
  Col as ACol,
  Row as ARow,
  Button as AButton,
} from 'ant-design-vue'
import lxBasicQueryItemCompMixin from '/@/views/dashboard/cykPage/components/lxBasicQueryItemCompMixin'
import { QueryItemCompEnum } from '/@/views/dashboard/cykPage/components/LxBasicQueryItem'
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
    // ======================== [life cycle] ===========================
    const { resetFields } = AForm.useForm(props.value, reactive([]))
    onMounted(() => {})
    // ======================== [methods] ===========================
    const compInputHandler = (payload: IInputEventPayload) => {
      // const _obj = updateObj(props.value, payload)
      // console.log(...LxLogInfo.primary(JSON.stringify(toRaw(_obj))))
      // emit('update:value', updateObj(props.value, payload))
      props.value[payload.key] = payload.value // 直接修改对象
      emit('update:value') // 通知更新？
    }
    const queryHandler = () => { // 不知道会不会变化呢
      emit('query')
    }
    const btnClickHandler = (flag: 'query' | 'cancel') => {
      if (flag === 'query') {
        // emit('update:value', props.value)
        emit('query')
      } else {
        // TODO: resetFields 不生效？
        resetFields()
        emit('update:value')
        emit('query')
      }
    }
    return {
      querySchemaComputed,
      queryHandler,
      compInputHandler,
      btnClickHandler
    }
  },
})
</script>

<style lang="less" scoped>
</style>
