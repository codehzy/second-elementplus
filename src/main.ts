import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import toLine from './utils'
import mUI from './components'

const app = createApp(App)

for (const key in Icons) {
  // 注册组件
  app.component(`el-icon${toLine(key)}`, (Icons as any)[key])
}
app.use(router).use(ElementPlus).use(mUI)
app.mount('#app')
