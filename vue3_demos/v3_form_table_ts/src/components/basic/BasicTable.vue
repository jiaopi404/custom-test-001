<template>
  <el-table
    ref="basicTable"
    :data="realTableData"
    :size="size"
    style="width: 100%"
    empty-text="暂无数据"
    v-bind="$attrs"
  >
    <slot name="pre-prefix-column"></slot> <!-- 用于自定义select 列 -->
    <el-table-column :selectable="selectable" type="selection" width="50" fixed="left" v-if="multiple">
    </el-table-column>
    <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
    <slot name="prefix-column"></slot>
    <slot name="prefix-column-1"></slot>
    <slot name="prefix-column-2"></slot>
    <slot name="prefix-column-3"></slot>
    <slot name="prefix-column-4"></slot>
    <el-table-column
      v-for="(column, columnIndex) in realColumns"
      :key="`prop-${columnIndex}-` + column.prop"
      :width="column.width"
      :label="column.title"
      :min-width="column.minWidth"
      :sortable="column.sort && 'custom'"
      :show-overflow-tooltip="true"
      :prop="column.prop"
      :fixed="column.fixed || false"
      :align="align"
    >

      <template #default="{ row }">
        <component
          :is="column.component"
          :value="row[column.realProp]"
          :prop="column.prop"
          :row="row"
          v-bind="{ ...cusListeners, ...column.compProps }"
        />
      </template>
    </el-table-column>
    <slot name="suffix-column"></slot>
    <slot name="suffix-column-1"></slot>
    <slot name="suffix-column-2"></slot>
    <slot name="suffix-column-3"></slot>
    <slot name="suffix-column-4"></slot>
  </el-table>
</template>

<script lang="ts">
// table column comps
import { defineComponent, reactive, watch, PropType } from 'vue'
import TableColumnAnchor from '@/components/basic/TableColumnAnchor.vue'
import TableColumnPlainText from '@/components/basic/TableColumnPlainText.vue'
import { BasicTableColumn, BasicTableColumnProps } from '@/components/basic/table'
import $util from '@/utils/$util'
import { Recordable } from '../about/types/form'

/**
 * 列组件
 */
export default defineComponent({
  name: 'BasicTable',
  components: {
    TableColumnAnchor,
    TableColumnPlainText
  },
  props: {
    columns: {
      type: Array as PropType<any>,
      required: true
    },
    tableData: {
      type: Array as PropType<unknown>,
      required: true
    },
    size: {
      type: String as PropType<string>,
      default: 'small',
      validator: function (value: string) {
        return ['small', 'mini', 'medium', 'large'].indexOf(value) > -1
      }
    },
    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    align: {
      type: String as PropType<string>,
      default: 'left'
    },
    selectable: { // 多选时列是否可选
      type: Function,
      default: () => {
        return () => {
          return true
        }
      }
    }
  } as any,
  setup (props, { attrs }) {
    // ======================== [state] ===========================
    let realColumns = reactive<BasicTableColumnProps[]>([])
    let realTableData = reactive([])
    // ======================== [methods] ===========================
    const parseColumns = (columns: BasicTableColumn[]) => {
      realColumns = columns.map(column => {
        const _column: BasicTableColumnProps = Object.assign({}, column.column, column.config || {})
        _column.realProp = Symbol(_column.prop)
        // 处理 width 与 minWidth, 二者异或关系
        if (_column.width === undefined) {
          _column.minWidth = _column.minWidth || '110px'
        }
        if (_column.minWidth === undefined) {
          _column.width = _column.width || '110px'
        }
        return _column
      })
      // console.log('%c [真实列] ', 'color: #67C23A; font-size: 16px;', this.realColumns)
      parseTableData(props.tableData)
    }
    const parseTableData = (tableData: any) => {
      realTableData = tableData.map(row => {
        realColumns.forEach((column: BasicTableColumnProps) => {
          let value = valueGetter(row, column.prop)
          // 处理 formatter
          if (column.formatter && typeof column.formatter === 'function') {
            value = column.formatter(value)
          }
          row[column.realProp as symbol] = value
        })
        return row
      })
    }
    const valueGetter = (row, prop) => {
      let value = row
      if (prop === '') {
        return row
      }
      try {
        const propList = prop.split('.')
        propList.forEach(propItem => {
          value = value[propItem]
        })
        return value
      } catch (err) {
        // 空指针错误一般是
        return null
      }
    }
    // ======================== [watcher] ===========================
    watch(
      () => props.columns,
      parseColumns,
      {
        deep: true,
        immediate: true
      }
    )
    watch(
      () => props.tableData,
      parseTableData,
      {
        deep: true,
        immediate: true
      }
    )
    // ======================== [computed] ===========================
    const cusListeners = $util.getListeners(attrs)
    // ======================== [onMounted] ===========================
    return {
      realColumns,
      realTableData,
      cusListeners
    }
  }
})
</script>

<style scoped>

</style>
