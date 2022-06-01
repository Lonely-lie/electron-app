export default {
	parents(el, parentSelector) {
		if (parentSelector === undefined) {
			parentSelector = document
		}
		var parents = []
		var p = el.parentNode
		while (p && p !== parentSelector) {
			var o = p
			parents.push(o)
			p = o.parentNode
		}
		parents.push(parentSelector)
		return parents
	},
	querySelector(domArr, domFlag) {
		var ret = []
		if (!domArr || !domArr.length) {
			return ret
		}
		if (!domFlag || !domFlag.length) {
			return ret
		}
		var flag = domFlag.substr(0, 1)
		for (let i = 0; i < domArr.length; i++) {
			if (flag == '.') {
				let classNameArr = domArr[i].className && domArr[i].className.split(' ')
				if (classNameArr && classNameArr.length) {
					classNameArr.forEach((element) => {
						if (element == domFlag.substr(1, domFlag.length - 1)) {
							ret.push(domArr[i])
						}
					})
				}
			}
			if (flag == '#' && domArr[i].id == domFlag.substr(1, domFlag.length - 1)) {
				ret.push(domArr[i])
			}
		}
		return ret
	},
	isExistImage(url) {
		return new Promise((resolve) => {
			var img = new Image()
			img.onload = function () {
				if (this.complete == true) {
					resolve(true)
					img = null
				}
			}
			img.onerror = function () {
				resolve(false)
				img = null
			}
			img.src = url
		})
	},
	// 虚拟键盘自适应，未实现
	getKeyXY(e) {
		let clientY = document.body.clientHeight
		let clientX = document.body.clientWidth

		console.log(e.target.getBoundingClientRect())
		if (!e.target) return
		let box = e.target.getBoundingClientRect()
		let boxX = box.x // dom X坐标
		let boxY = box.y // dom Y坐标
		let showX = boxX + box.width // 应该显示的位置X
		let showY = boxY + box.height // 应该显示的位置Y
	}
}
