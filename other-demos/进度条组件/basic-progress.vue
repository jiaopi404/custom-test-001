<template>
  <transition
    name="dialog-fade"
  >
    <div class="basic-progress" v-if="percent !== 0">
      <div class="basic-progress__shadow"></div>
      <div class="basic-progress__box">
        <div class="basic-progress__title layout__flex-row__center__center">
          <div style="color: #fff; font-size: 18px; font-weight: bold; margin-right: 10px;">{{ progressInfo }}</div>
          <div
            class="basic-progress__title-dot"
            v-for="(i, index) in 5"
            :key="'title-dot--' + i"
            :style="{
              // animation: `example 2s ${((index + 1) / 6 * 2) .toFixed(2)}s infinite;`
              'animation-name': 'example',
              'animation-duration': '2s',
              'animation-delay': `${((index + 1) / 5 * 2) .toFixed(2)}s`,
              'animation-iteration-count': 'infinite'
            }"
          ></div>
        </div>
        <div class="basic-progress__axis">
          <div class="basic-progress__axis-long basic-progress__axis-line"></div>
          <div
            class="basic-progress__axis-short basic-progress__axis-line"
            v-for="(i, index) in lineNum"
            :key="'axis-line--' + i"
            :class="{ 'basic-progress__axis-line-light': ((index + 1) / lineNum <= percent / 100) || (index + 1) % (Math.floor(lineNum / dividerNum)) === 0 }"
          ></div>
          <div class="basic-progress__axis-long basic-progress__axis-line"></div>
        </div>
        <div class="basic-progress__progress layout__flex-row__center__center">
          <div class="el-color--primary basic-progress__progress-flag">开始</div>
          <div class="basic-progress__progress-box">
            <div class="basic-progress__progress-back">
              <div
                class="basic-progress__progress-front"
                :style="{
                  width: (100 - percent) + '%'
                }"
              ></div>
            </div>
            <div
              class="basic-progress__pointer"
              :style="{
                left: percent + '%'
              }"
            >
              <div class="basic-progress__pointer-icon">
                <i
                  class="iconfont icona-21-02 basic-progress__pointer-icon-1"
                  :style="{
                    color: getColor()
                  }"
                ></i>
                <i class="iconfont iconbc2 basic-progress__pointer-icon-2"></i>
              </div>
              <div
                class="basic-progress__pointer-percent"
                :style="{
                  color: getColor()
                }"
              >{{ percent }}</div>
            </div>
          </div>
          <div class="el-color--success basic-progress__progress-flag">完成</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

const pointerColorList = ['#5B8FF9', '#48E9FC', '#83EEFF', '#73ECBB', '#6BF24A']
const BasicProgress = {
  name: 'BasicProgress',
  data () {
    return {
      lineNum: 80, // 所有线
      dividerNum: 6, // 短分割线数量
      percent: 0, // 当前百分比
      intervalId: null,
      timeoutId: null,
      stopPercent: 80, // 停在80%
    }
  },
  computed: {
    ...mapGetters(['progress']),
    visible () { // 是否显示
      return this.progress && this.progress.show
    },
    timeSpan () {
      return this.progress && this.progress.timeSpan
    },
    progressInfo () {
      return this.progress && this.progress.info
    }
  },
  watch: {
    visible: {
      handler (nv, ov) {
        if (nv) { // 显示
          this.initProgress()
          document.body.appendChild(this.$el) // 放到 body
        } else {
          this.completeProgress()
        }
      }
    }
  },
  mounted () {
    console.log('this.progress is: ', this.progress)
    // document.body.appendChild(this.$el) // 放到 body
  },
  destroyed () {
    // remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  methods: {
    initProgress () {
      this.percent = 0
      this.intervalId = setInterval(() => {
        this.percent++
        if (this.percent === this.stopPercent) {
          clearInterval(this.intervalId)
        }
      }, this.timeSpan / 100)
    },
    // 完成进度条
    completeProgress () {
      clearInterval(this.intervalId) // 清掉
      const _percent = this.percent
      this.intervalId = setInterval(() => {
        this.percent += 3
        if (this.percent >= 100) { // 100 时结束
          clearInterval(this.intervalId)
          this.resetProgress()
        }
      }, (300 * 3 / (100 - _percent)))
    },
    resetProgress () {
      this.percent = 0
    },
    getColor () {
      return pointerColorList[Math.floor(this.percent / 100 * pointerColorList.length)]
    }
  }
}
export default BasicProgress
</script>

<style lang="scss" scoped>
@import "~@/style/element-variables.scss";
$baseZIndex: 4000;
$titleDotSize: 4px;
@keyframes example {
  0% {
    background-color: $--color-white;
  }
  25% {
    background-color: $--color-primary-light-5;
  }
  50% {
    background-color: $--color-primary;
  }
  75% {
    background-color: $--color-primary-light-5;
  }
  100% {
    background-color: $--color-white;
  }
}
.basic-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: $baseZIndex;
  .basic-progress__shadow {
    position: absolute;
    top: 0;
    left: 0;
    height: 120%;
    width: 100%;
    z-index: $baseZIndex + 1;
    background-color: rgba(0, 0, 0, .6);
  }
  .basic-progress__box {
    position: absolute;
    top: 38.2%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 700px;
    z-index: $baseZIndex + 2;
    background-color: #2A2A2A;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: 0 50px;
    border-radius: 30px;
    box-shadow: $--box-shadow-darker;
    .basic-progress__title {
      margin-bottom: 15px;
      .basic-progress__title-dot {
        height: $titleDotSize;
        width: $titleDotSize;
        background-color: #fff;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 5px;
      }
    }
    .basic-progress__axis {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: flex-end;
      padding: 0 30px;
      margin-bottom: 15px;
      .basic-progress__axis-line {
        width: 1px;
        background-color: #666;
        &.basic-progress__axis-line-light {
          background-color: $--color-white;
        }
        &.basic-progress__axis-long {
          height: 30px;
          background-color: $--color-white;
        }
      }
      .basic-progress__axis-short {
        height: 10px;
        margin-bottom: 2px;
      }
    }
    .basic-progress__progress {
      width: 100%;
      .basic-progress__progress-flag {
        flex: none;
      }
      .basic-progress__progress-box {
        flex: 1;
        width: 1px;
        position: relative;
        margin: 0 5px;
        .basic-progress__pointer {
          position: absolute;
          top: 10px;
          transform: translate(-50%, -50%);
          .basic-progress__pointer-percent {
            text-align: center;
          }
          .basic-progress__pointer-icon {
            position: relative;
            height: 40px;
            width: 30px;
            .basic-progress__pointer-icon-1 {
              //color: $--color-success;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 46px;
              text-shadow: $--box-shadow-darker;
              transition: all .3s;
            }
            .basic-progress__pointer-icon-2 {
              color: $--color-white;
              position: absolute;
              top: 65%;
              left: 50%;
              //transform: translate(-49%, -50%);
              font-size: 21px;
              animation-name: icon_rotate;
              animation-duration: 5s;
              animation-iteration-count: infinite;
              animation-timing-function: linear;
            }
          }
        }
        .basic-progress__progress-back {
          width: 100%;
          height: 10px;
          border-radius: 5px;
          //overflow: hidden;
          box-shadow: $--box-shadow-darker;
          background-image: linear-gradient(to right, #5B8FF9, #48E9FC, #83EEFF, #73ECBB, #6BF24A);
          display: flex;
          justify-content: flex-end;
          .basic-progress__progress-front {
            border-radius: 5px;
            height: 100%;
            //margin: 0 -5px;
            background-color: #fff;
            //background-image: linear-gradient(to right, #5B8FF9, #48E9FC, #83EEFF, #73ECBB, #6BF24A);
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import "~@/style/element-variables.scss";
@keyframes example {
  0% {
    background-color: $--color-white;
  }
  25% {
    background-color: $--color-primary-light-5;
  }
  50% {
    background-color: $--color-primary;
  }
  75% {
    background-color: $--color-primary-light-5;
  }
  100% {
    background-color: $--color-white;
  }
}
@keyframes icon_rotate {
  0% {
    transform: translate(-48%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-48%, -50%) rotate(180deg);
  }
  100% {
    transform: translate(-48%, -50%) rotate(360deg);
  }
}
</style>
