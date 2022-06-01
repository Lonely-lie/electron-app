import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入moment.js
import moment from 'moment'
// 设置本地时区
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.use(ElementUI)
