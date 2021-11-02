<template>
  <div class="cus-about-table">
    <h3>about table, 以下表格</h3>
    <basic-table
      :table-data="tableData"
      :columns="tableColumns"
      @anchor-click="anchorClickHandler"
    />
  </div>
</template>

<script lang="ts">
import BasicTable from '../basic/BasicTable.vue'
import { reactive } from 'vue'
import { BasicTableColumn, BasicTableColumnComp } from '../basic/table'

export default {
  name: 'CusAboutTable',
  components: {
    BasicTable
  },
  setup () {
    const tableData = reactive([
      { id: 1, name: 'aaa', anchor: '点我点我' },
      { id: 2, name: 'bbb', anchor: '点他点我' }
    ])
    let tableColumns: BasicTableColumn[] = [
      {
        column: {
          title: 'ID',
          prop: 'id',
          width: '150',
          component: BasicTableColumnComp.TableColumnPlainText
        }
      },
      {
        column: {
          title: '名称',
          prop: 'name',
          minWidth: '150',
          component: BasicTableColumnComp.TableColumnPlainText
        }
      },
      {
        column: {
          title: '链接',
          prop: 'anchor',
          width: '120',
          component: BasicTableColumnComp.TableColumnAnchor
        }
      }
    ]
    tableColumns = reactive(tableColumns)
    const anchorClickHandler = (e) => {
      console.log('组件中拦截到了事件', e)
    }
    return {
      tableData,
      tableColumns,
      anchorClickHandler
    }
  }
}
</script>

<style scoped>

</style>
