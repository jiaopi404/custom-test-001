<template>
  <div class="about">
    <h1>This is an about page</h1>
    <canvas ref="qrcodeCanvas" id="qrcodeCanvas" style="height: 200px; width: 200px;"></canvas>
    <button @click="generateQRCode">生成二维码</button>
  </div>
</template>

<script>
import QRCode from 'qrcode'
const About = {
  name: 'About',
  methods: {
    generateQRCode () {
      console.log('生成 qr code', QRCode)
      const data = {
        page: 'pagesSub/rmb/add-rmb/index',
        query: {
          id: 123
        }
      }
      console.log(`http://budget.joriving.com/mini_app/rmb?data=${JSON.stringify(data)}`)
      QRCode.toCanvas(this.$refs.qrcodeCanvas, `http://budget.joriving.com/mini_app/rmb?data=${JSON.stringify(data)}`, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
    }
  }
}
export default About
</script>

<style lang="css">
.about {}
</style>
