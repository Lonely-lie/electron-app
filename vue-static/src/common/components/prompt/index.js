import Vue from 'vue'
import info from './info'
export default {
	/**
	 * 信息弹窗
	 * @param {Object}   params               参数对象
	 * @param {String}   params.title         标题
	 * @param {String}   params.message       提示
	 * @param {String}   params.type          弹窗类型，默认无，选项：confirm warning success error
	 * @param {Boolean}  params.autoClose     是否自动关闭，默认true
	 * @param {Number}   params.timeout       延时关闭弹窗时长，默认1.5秒，即1.5*1000
	 * @param {Boolean}  params.showBtn       是否显示按钮，默认true
	 * @param {Boolean}  params.showLeftBtn   是否显示取消按钮，默认true
	 * @param {String}   params.leftBtnText   左边按钮文字，默认为'取消'
	 * @param {String}   params.leftBtnType  左边按钮类型：info,default,error,warn 默认info
	 * @param {String}   params.rightBtnText  右边按钮文字，默认为'确定'
	 * @param {String}   params.rightBtnType 右边按钮颜色：info,default,error,warn 默认default
	 * @param {String}   params.drag.enabled  是否支持拖动，默认为true
	 * @param {String}   params.drag.boundary 是否拖动时不能超出当前窗口边界，默认为true
	 * @param {Number}   params.msgWidth      提示文字的宽度，默认 'auto'，例如：300
	 * @param {Number}   params.msgHeight     提示文字的高度，默认 'auto'，例如：150
	 * @param {Function} params.callback      回调
	 * 示例一：
	 * prompt.info({
	 *     title: "确认弹窗",
	 *     type: "confirm",
	 *     message: "笔录未完成签名确认，完成笔录后无法编辑， 是否确认完成笔录？",
	 *     callback(res) {}
	 * });
	 * 示例二：
	 * prompt.info({
	 *     title: "成功弹窗",
	 *     type: "success",
	 *     message: "笔录已完成！",
	 *     drag: {
	 *         enabled: true
	 *     },
	 *     showBtn: false,
	 *     callback(res) {}
	 * });
	 */
	info(params) {
		params = Object.assign(
			{
				title: '',
				message: '',
				type: '',
				autoClose: true,
				timeout: 1000,
				showBtn: true,
				showLeftBtn: true,
				leftBtnText: '取消',
				leftBtnClose: true,
				leftBtnType: 'info',
				rightBtnText: '确认',
				rightBtnClose: true,
				rightBtnType: 'default',
				drag: {
					enabled: true,
					boundary: true
				},
				msgWidth: 'auto',
				msgHeight: 'auto'
			},
			params
		)
		const ret = Vue.prototype.$dialog({
			title: params.title,
			wrapClass: 'prompt-outer info',
			showHeader: false,
			showFooter: false,
			component: info,
			componentParams: params
		})
		ret.on.then((res) => {
			params.callback && params.callback(res)
		})
		if (params.autoClose && !params.showBtn) {
			window.setTimeout(() => {
				ret.close()
			}, params.timeout)
		}
		return ret
	}
	/**
	 * 待UI出来开发
	 * 提示弹窗（没有头部，没有底部操作按钮，纯信息提示，可倒计时）
	 * @param {Object}   params                参数对象
	 * @param {String}   params.icon           弹窗图标，默认无，选项： loading
	 * @param {String}   params.message        提示
	 * @param {Boolean}  params.autoClose      是否自动关闭，默认true
	 * @param {Number}   params.timeout        延时关闭弹窗时长，默认1.5秒，即1.5*1000
	 * @param {Boolean}  params.showCountdown  是否显示倒计时，默认false
	 * @param {Number}   params.msgWidth       提示文字的宽度，默认 'auto'，例如：300
	 * @param {Number}   params.msgHeight      提示文字的高度，默认 'auto'，例如：150
	 * @param {String}   params.customClass    遮罩层自定义类名，样式文件已有：'x-dialog-transparent':无透明度遮罩
	 * @param {Function} params.callback       回调
	 */
	// tip(params) {}
}
