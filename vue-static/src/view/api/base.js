import request from '@/common/libraries/request'
import { baseHost } from '../../config/net.config'
const base = {
	/**
	 * get请求示例
	 * @param {object} params
	 * @returns
	 */
	testget(params) {
		return request({
			url: baseHost + 'express/list',
			method: 'get',
			params
		})
	},
	/**
	 * post请求示例
	 * @param {*} data
	 * @returns
	 */
	testpost(data) {
		return request({
			url: baseHost + 'express/login',
			method: 'post',
			data
		})
	},
	/**
	 * json格式请求示例
	 * @param {*} data
	 * @returns
	 */
	testjson(data) {
		return request({
			url: baseHost + 'json/config/center/relation/find',
			method: 'post',
			data,
			isPayload: true
		})
	},
	/**
	 * 登录
	 * @param {object} data
	 * @param {string} data.username
	 * @param {string} data.password
	 * @returns Promise
	 */
	login(data) {
		return request({
			url: baseHost + '/oauth/token',
			method: 'post',
			data
		})
	},
	/**
	 * 退出登录
	 * @param {object} data
	 * @param {string} data.access_token
	 * @returns Promise
	 */
	logout(data) {
		return request({
			url: baseHost + '/oauth/logout',
			method: 'post',
			data
		})
	},
	/**
	 *
	 * @param {object} params
	 * @param {object} params.page  页码
	 * @param {object} params.size  数量
	 * @param {object} params.name  名字
	 */
	getListTest(params) {
		return request({
			url: baseHost + '/pages/list',
			method: 'get',
			params
		})
	}
}
export default base
