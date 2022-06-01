import Vue from 'vue'
import axios from 'axios'
import { baseURL, contentType, requestTimeout, successCode, loginInterception, noPermissionCode, invalidCode } from '@/config'
import store from '@store'
import qs from 'qs'
const instance = axios.create({
	baseURL,
	timeout: requestTimeout,
	headers: {
		'Content-Type': contentType
	}
})
const checkCode = (code, msg) => {
	switch (code) {
		case invalidCode:
			Vue.prototype.$message.error('登录失效,请重新登录！')
			if (loginInterception) {
				setTimeout(() => {
					location.reload()
				}, 1000)
			}
			break
		case noPermissionCode:
			Vue.prototype.$message.error('抱歉,没有权限！')
			break
		default:
			Vue.prototype.$message.error(msg || `接口异常！code：${msg}`)
			break
	}
}
// 请求拦截
instance.interceptors.request.use(
	(config) => {
		// 判断
		let token = store.getters['user/accessToken']
		config.headers['Authorization'] = token
		if (config.isPayload) config.headers['Content-Type'] = 'application/json'
		if (config.data && !config.isPayload) config.data = qs.stringify(config.data)
		return config
	},
	(error) => {
		// 错误处理
		return Promise.reject(error)
	}
)
// 返回拦截
instance.interceptors.response.use(
	// 返回处理
	(response) => {
		const { data } = response
		const { code, msg } = data
		if (!successCode.includes(code) || !code) checkCode(code, msg || `${code || ''}未知原因！`)
		return data
	},
	// 错误处理
	(error) => {
		const { response, message } = error
		const { status, data } = response
		checkCode(status, data.msg || message)
		return Promise.reject(error)
	}
)

export default instance
