import Vue from 'vue'
import dialog from './dialog'

let caller = (options) => {
	//options 为调用组件方法时传入的配置选项
	//将vue组件变为构造函数
	let ConfirmConstructor = Vue.extend(dialog)
	//实例化组件
	let newInstance = new ConfirmConstructor()
	//合并配置选项
	Object.assign(newInstance, options)
	//使用$mount()后  可以理解为创建虚拟的dom
	document.body.appendChild(newInstance.$mount().$el)

	return newInstance.show((vm) => {
		newInstance = null
	})
}
export default caller
