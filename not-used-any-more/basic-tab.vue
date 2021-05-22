<template>
  <div class="basic-tab layout__flex-row__space-between__center">
    <div class="basic-tab__tab-container layout__flex-row__left__center">
      <div
        class="basic-tab__tab-item layout__flex-row__left__center"
        v-for="tab in tabList"
        :key="tab.index"
      >
        <el-badge
          class="basic-tab__badge"
          :value="tab.num"
          :hidden="!tab.num"
          @click.native="handleTabClick(tab)"
        >
          <div
            class="basic-tab__tab"
            :class="tab.index === currentTabIndex ? 'basic-tab__tab--current' : ''"
          >{{ tab.name }}</div>
        </el-badge>
      </div>
    </div>
    <div class="basic-tab__slot-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const BasicTab = {
  name: 'BasicTab',
  props: {
    // tabList 列表
    tabList: {
      type: Array,
      default: () => [
        { index: 0, name: '待办事项', num: 0 },
        { index: 1, name: '已办事项', num: 0 },
        { index: 2, name: '暂缓事项', num: 0 }
      ]
    }
  },
  data () {
    return {
      currentTabIndex: 0
    }
  },
  methods: {
    /**
     * 点击 tab 事件 handler
     * @param tab tab item
     */
    handleTabClick (tab) {
      this.currentTabIndex = tab.index
      this.$emit('click:tab', tab.index)
    }
  }
}
export default BasicTab
</script>

<style lang="scss" scoped>
@import "~@/style/element-variables.scss";
$height: 35px;
.basic-tab {
  flex: none;
  height: $height;
  padding: 0 5px;
  background-color: $--color-white;
  margin-bottom: 10px;
  .basic-tab__tab-container {
    height: 100%;
    .basic-tab__tab-item {
      width: 100px;
      height: 100%;
      .basic-tab__badge {
        height: 100%;
        cursor: pointer;
        .basic-tab__tab {
          padding: 0 5px;
          flex: none;
          height: 100%;
          line-height: $height;
          color: $--color-text-primary;
          font-size: $--font-size-base;
          border-bottom: 2px solid transparent;
          //cursor: pointer;
          transition: all .3s;
        }
        .basic-tab__tab--current {
          color: $--color-primary;
          border-bottom: 2px solid $--color-primary-light-6;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.basic-tab {
  .basic-tab__badge {
    .el-badge__content {
      top: calc(100% * .28);
    }
  }
}
</style>