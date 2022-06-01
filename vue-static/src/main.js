import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/view/api/' // 接口
import './plugins'
import '@/common/components'
import './AppInit.js'
require('./../mock') // mock，不用注释
Vue.config.productionTip = false
Vue.prototype.$http = api
new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App)
})
