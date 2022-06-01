import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import electronServe from '@electronServe'
console.log('应用初始化')
Vue.prototype.$electronServe = electronServe.order
console.log('Vue.prototype.$electronServe', Vue.prototype.$electronServe)
Vue.prototype.$electronServe.getConfig().then((resp) => {
	console.log('config', resp.data)
	store.dispatch('app/setConfig', resp)
	if (resp.data.sys.useTest) {
		// router.push('test')
		console.log('测试,,,,,进入测试页面,未设置')
	}
})
