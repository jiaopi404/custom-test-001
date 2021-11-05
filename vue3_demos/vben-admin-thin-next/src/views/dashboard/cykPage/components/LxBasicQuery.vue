<template>
  <div class="lx-basic-query">
    <a-form
      :model="value"
    >
      <a-row
        v-for="(queryRow, rowIndex) in querySchemaComputed"
        :key="rowIndex"
      >
        <a-col
          v-for="queryCol in queryRow"
          :key="queryCol.prop"
          :span="queryCol.col"
        >
          <a-form-item :label="queryCol.label" :name="queryCol.prop">
            <component
              :is="queryCol.comp"
              v-model:value="value[queryCol.prop]"
              :placeholder="queryCol.placeholder"
              v-bind="queryCol.compProps || {}"
              @change="queryHandler"
            ></component>
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
import { computed, defineComponent, ExtractPropTypes, onMounted, ref } from 'vue'
import {
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Select as ASelect,
  Col as ACol,
  Row as ARow,
  Button as AButton,
} from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/lib/form/FormItem'

interface LxBasicQueryConfig { // 配置 接口
  defaultCol: number
}

const lxBasicQueryConfig: LxBasicQueryConfig = { // 配置
  defaultCol: 8
}

export enum QueryItemComp {
  INPUT = 'a-input',
  SELECT = 'a-select'
}
export interface QueryItemConfig { // 查询项的
  prop: string
  label: string
  placeholder: string
  comp: QueryItemComp
  compProps?: Recordable
  col?: number // 栅格系统，占多少
}
// const lxBasicQueryProps: {
//   value: Recordable | { required: true },
//   querySchema: QueryItemConfig[] | { required: true }
// }
// export type LxBasicQueryProps = Partial<ExtractPropTypes<typeof lxBasicQueryProps>>;

/**
 * 获取 col，大于 24 或者 空 则 赋 8
 * @param col
 */
function getCol (col) {
  return col ? (col > 24 ? lxBasicQueryConfig.defaultCol : col) : lxBasicQueryConfig.defaultCol
}

export default defineComponent({
  name: 'LxBasicQuery',
  emits: ['query', 'update:value'],
  components: {
    AForm,
    AFormItem,
    AInput,
    ASelect,
    ACol,
    ARow,
    AButton
  },
  props: {
    value: { // 双向绑定的值
      type: Object,
      required: true
    },
    querySchema: {
      type: Array
    },
    // TODO: size
    // TODO: disabled
    // TODO: 是否需要把查询参数存到 url 中
  },
  setup (props, { emit }) {
    // ======================== [data] ===========================
    // ======================== [computed] ===========================
    // 1. 根据 querySchema 计算出合理的 row 和 col
    const querySchemaComputed = computed<Array<QueryItemConfig[]>>(() => {
      return props.querySchema.reduce((prev, queryItemConfig: QueryItemConfig) => {
        let _lastRow = prev?.[prev.length - 1] // 最后一行
        if (!_lastRow) { // 无最后一行， push 空列表
          _lastRow = []
          prev.push(_lastRow)
        }
        const _lastRowColSum = _lastRow.reduce((prev, queryItemConfigRow: QueryItemConfig) => {
          prev += getCol(queryItemConfigRow.col) // 默认 8 格
          return prev
        }, 0) // 最后一行的 col 合计
        if (_lastRowColSum + queryItemConfig.col > 24) { // 最后一行超了，push
          const _nextRow = [queryItemConfig]
          prev.push(_nextRow)
        } else {
          _lastRow.push(queryItemConfig)
        }
        return prev
      }, [])
    })
    // ======================== [life cycle] ===========================
    const { resetFields } = AForm.useForm(props.value)
    onMounted(() => {})
    // ======================== [methods] ===========================
    const queryHandler = () => { // 不知道会不会变化呢
      emit('update:value', props.value)
      emit('query', props.value)
    }
    const btnClickHandler = (flag: 'query' | 'cancel') => {
      if (flag === 'query') {
        emit('update:value', props.value)
        emit('query', props.value)
      } else {
        // TODO: resetFields 不生效？
        resetFields()
        emit('update:value', props.value)
        emit('query', props.value)
      }
    }
    return {
      querySchemaComputed,
      queryHandler,
      btnClickHandler
    }
  },
})
</script>

<style lang="less" scoped>
</style>
