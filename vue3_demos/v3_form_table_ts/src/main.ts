import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import AntD from 'ant-design-vue'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
// app.config.errorHandler = (err, vm, info) => {
//   console.error(err)
//   console.log('[Error]', err, vm, info)
// }

app.use(ElementPlus)
  .use(AntD)
  .use(store)
  .use(router)
  .mount('#app')
