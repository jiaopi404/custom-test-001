import { createApp } from 'vue'
import App from './App.vue'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(AntD)
  .mount('#app')
