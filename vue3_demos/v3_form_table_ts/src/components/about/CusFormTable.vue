<template>
  <div class="cus-form-table">
    <h3>form table</h3>
    <table-column-anchor
      value="112233"
      v-on:anchor-click="anchorClickHandler"
      v-on:cus-event="cusEventHandler"
    />
  </div>
</template>

<script>
import TableColumnAnchor from '../basic/TableColumnAnchor'
const CusFormTable = {
  name: 'CusFormTable',
  components: {
    TableColumnAnchor
  },
  setup () {
    const anchorClickHandler = (args) => {
      console.log('anchor click, ', args)
    }
    const cusEventHandler = (args) => {
      console.log('cus event handler, ', args)
    }
    return {
      anchorClickHandler,
      cusEventHandler
    }
  }
}
export default CusFormTable
</script>

<style scoped>

</style>
