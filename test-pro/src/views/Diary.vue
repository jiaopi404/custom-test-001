<template>
  <div class="diary">
    <el-form ref="form" :data="formData" size="mini">
      <el-form-item label="week: ">
        <el-input-number required v-model="formData.weekCount"></el-input-number>
      </el-form-item>
      <el-form-item label="day count start: ">
        <el-input-number required v-model="formData.dayCount"></el-input-number>
      </el-form-item>
      <el-form-item label="start day: ">
        <!--      <el-input-number required v-model="formData.startDay"></el-input-number>-->
        <el-date-picker v-model="formData.startDay" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="days span: ">
        <el-input-number required v-model="formData.daySpan"></el-input-number>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-button style="width: 100%;" @click="generate">generate !</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-card title="result">
      <el-input type="textarea" :autosize="true" v-model="result"></el-input>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'

const Diary = {
  name: 'Diary',
  data() {
    return {
      formData: {
        weekCount: '',
        dayCount: '',
        startDay: '',
        daySpan: '',
      },
      result: '',
      weekMap: {
        '0': 'Sun',
        '1': 'Mon',
        '2': 'Tue',
        '3': 'Wen',
        '4': 'Thur',
        '5': 'Fir',
        '6': 'Sat',
      },
      // canvasHref: ''
    }
  },
  methods: {
    async generate() {
      let result = ''
      await this.$refs['form'].validate()
      for (let i = 0; i < this.formData.daySpan; i++) {
        const _thisDate = new Date(+this.formData.startDay + i * 1000 * 60 * 60 * 24)
        const dayData = {
          dayCount: this.formData.dayCount + i,
          weekCount: this.formData.weekCount,
          date: moment(_thisDate).format('DD/MM/YYYY'),
          day: this.weekMap[_thisDate.getDay()], // 星期
        }
        result = this.getDay(dayData) + result
      }
      this.result = result
    },
    getDay(dayData) {
      return `
## day${dayData.dayCount}_week${dayData.weekCount} ${dayData.day}. ${dayData.date}

### 上午

### 下午

`
    },
    handleGetCanvas() {
      const canvas = document.querySelector('#canvas canvas')
      console.log('canvas is:', canvas)
      const context = canvas.getContext('2d')
      const base64Img = canvas.toDataURL('image/jpg')
      this.canvasHref = base64Img

      var anchor = document.createElement('a')
      if ('download' in anchor) {
        anchor.style.visibility = 'hidden'
        anchor.href = base64Img
        anchor.download = name

        document.body.appendChild(anchor)
        var evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, true)
        anchor.dispatchEvent(evt)

        document.body.removeChild(anchor)
      } else {
        location.href = bloburl
      }
    },
  },
}
export default Diary
</script>

<style lang="css">
.diary {
  text-align: left;
}
</style>
