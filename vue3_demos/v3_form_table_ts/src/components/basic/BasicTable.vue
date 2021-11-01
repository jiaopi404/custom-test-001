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
          v-bind="column.compProps"
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
import { watch } from 'vue'
import { Recordable } from '@/components/about/types/form'
export type BasicTableColumn = {
  title: string
  prop: string
  width: string | undefined
  mimWidth: string | undefined
  compProps: Recordable
  sort?: boolean
  formatter?(value: any): any
}
export default {
  name: 'BasicTable',
  components: {
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'small',
      validator: function (value) {
        return ['small', 'mini', 'medium', 'large'].indexOf(value) > -1
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
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
  },
  // watch: {
  //   columns: {
  //     handler (nv) {
  //       this.parseColumns(nv)
  //     },
  //     deep: true,
  //     immediate: true
  //   },
  //   tableData: {
  //     handler (nv) {
  //       this.parseTableData(nv)
  //     },
  //     deep: true
  //   }
  // },
  // data () {
  //   return {
  //     realColumns: [], // 真实渲染的 columns
  //     realTableData: [], // 真实渲染的 tableData
  //   }
  // },
  setup (props) {
    const parseColumns = (columns) => {
      this.realColumns = columns.map(column => {
        const _column = Object.assign({}, column.column, column.config || {})
        _column.realProp = Symbol(_column.prop)
        return _column
      })
      // console.log('%c [真实列] ', 'color: #67C23A; font-size: 16px;', this.realColumns)
      this.parseTableData(this.tableData)
    }
    const parseTableData = (tableData) => {
      this.realTableData = tableData.map(row => {
        this.realColumns.forEach(column => {
          let value = valueGetter(row, column.prop)
          // 处理 formatter
          if (column.formatter && typeof column.formatter === 'function') {
            value = column.formatter(value)
          }
          row[column.realProp] = value
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
  },
  methods: {
    parseColumns (columns) {
      this.realColumns = columns.map(column => {
        const _column = Object.assign({}, column.column, column.config || {})
        _column.realProp = Symbol(_column.prop)
        return _column
      })
      // console.log('%c [真实列] ', 'color: #67C23A; font-size: 16px;', this.realColumns)
      this.parseTableData(this.tableData)
    },
    parseTableData (tableData) {
      this.realTableData = tableData.map(row => {
        this.realColumns.forEach(column => {
          let value = this.valueGetter(row, column.prop)
          // 处理 formatter
          if (column.formatter && typeof column.formatter === 'function') {
            value = column.formatter(value)
          }
          row[column.realProp] = value
        })
        return row
      })
    },
    valueGetter (row, prop) {
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
  }
}
</script>

<style scoped>

</style>
