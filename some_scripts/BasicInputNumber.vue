<template>
  <el-input
    type="text"
    v-model="model"
    @change="changeHandler"
    @blur="blurHandler"
    @focus="focusHandler"
    :size="size"
    :placeholder="placeholder"
  ></el-input>
</template>

<script>
export default {
  name: 'BasicInputNumber',
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    size: {
      type: String,
      default: 'small',
      validator: function (value) {
        return ['large', 'medium', 'small', 'mini'].indexOf(value) > -1
      }
    },
    formatter: {
      type: Function
    },
    parser: {
      type: Function
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    precision: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入...'
    }
  },
  data () {
    return {
      model: '',
      modelCache: ''
    }
  },
  computed: {
    modelComputed () {
      return this.parse(this.model)
    }
  },
  watch: {
    value: {
      handler (nv) {
        // console.log('watcher: ', nv)
        this.model = this.format(nv)
        if (nv !== this.modelComputed) {
          this.$emit('input', this.modelComputed)
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 修正值
     * @param value
     * @returns {string|number}
     */
    amend (value) {
      if (isNaN(Number(value))) {
        return this.modelCache
      } else {
        value = this.minFormatter(value)
        value = this.maxFormatter(value)
        return Number(value)
      }
    },
    format (value) {
      value = this.amend(value)
      this.modelCache = value
      value = this.precisionFormatter(value)
      if (this.formatter) {
        value = this.formatter(value)
      }
      return value
    },
    parse (value) {
      if (this.parser) {
        return Number(this.parser(value))
      } else {
        return Number(value)
      }
    },
    precisionFormatter (value) {
      if (!this.precision) { // 格式化为整数
        return Math.round(value)
      } else {
        return Number(value).toFixed(this.precision)
      }
    },
    minFormatter (min) {
      // min
      if (typeof this.min === 'undefined') {
        return min
      } else {
        return min < this.min ? this.min : min
      }
    },
    maxFormatter (max) {
      // max
      if (typeof this.max === 'undefined') {
        return max
      } else {
        return max > this.max ? this.max : max
      }
    },
    changeHandler (value) {
      value = this.parse(value)
      this.model = this.format(value)
      this.$emit('input', this.modelComputed)
    },
    blurHandler () {
      this.$emit('blur', this.modelComputed)
    },
    focusHandler () {
      this.$emit('focus', this.modelComputed)
    }
  }
}
console.log('sdfsdsdfksdkjsfkklsd')
</script>

<style lang="scss" scoped>
</style>
