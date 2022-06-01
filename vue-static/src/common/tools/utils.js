/* 系统公共方法
 * @Author: zhanzimao
 * @Date: 2022-01-25 20:59:30
 * @Last Modified by: zhanzimao
 * @Last Modified time: 2022-06-01 13:45:37
 */

export function getCanvas(w = 384, h = 384) {
	let canvas = document.createElement('canvas')
	canvas.width = w
	canvas.height = h
	return canvas
}
/**
 * @param {Object} obj 参数对象
 * @param {Number} obj.width 宽度
 * @param {Number} obj.height 高度
 * @param {Number} obj.video video标签id
 * @param {Number} obj.rotate 选择视频
 */
export function getImgFromVideo(obj) {
	if (obj.rotate !== 0) {
		return getImgFromVideoByRotate(obj)
	}
	let canvas = getCanvas(obj.width, obj.height)
	let canvasContext = canvas.getContext('2d')
	canvasContext.drawImage(document.getElementById(obj.video), 0, 0, obj.width, obj.height)
	let base64Data = canvas.toDataURL('image/jpeg')
	let imageData = canvasContext.getImageData(0, 0, obj.width, obj.height)
	console.log('base', base64Data)
	console.log('image', imageData)
	return {
		base64Data: base64Data,
		imageData: imageData.data,
		width: imageData.width,
		height: imageData.height
	}
}
// 旋转图像信息
export function getImgFromVideoByRotate(obj) {
	console.log('obj', obj)
	// let cvs = getCanvas(obj.width, obj.height)
	// let ctx = cvs.getContext('2d')
	// ctx.translate(obj.width / 2, obj.width / 2)
	// ctx.rotate(180 * (Math.PI / 180))
	// ctx.drawImage(document.getElementById(obj.video), 0, 0, obj.width, obj.height)
	// let cvs2 = getCanvas(obj.width, obj.height)
	// let ctx2 = cvs2.getContext('2d')
	// ctx2.drawImage(cvs, 0, 0, obj.width, obj.height, 0, 0, obj.width, obj.height)
	// let base64Data = cvs2.toDataURL('image/jpeg')
	// console.log('base', base64Data)
	let w = obj.width
	let h = obj.height
	let canvasWidth = Math.max(w, h)
	let cvs = getCanvas(canvasWidth, canvasWidth)
	let ctx = cvs.getContext('2d')
	ctx.translate(canvasWidth / 2, canvasWidth / 2)
	ctx.rotate(obj.rotate * (Math.PI / 180))
	let x = -canvasWidth / 2
	let y = -canvasWidth / 2
	obj.rotate = obj.rotate % 360
	let video = document.getElementById(obj.video)
	if (obj.rotate % 180 !== 0) {
		if (obj.rotate === -90 || obj.rotate === 270) {
			x = -w + canvasWidth / 2
		} else {
			y = canvasWidth / 2 - h
		}
		const c = w
		w = h
		h = c
	} else {
		x = canvasWidth / 2 - w
		y = canvasWidth / 2 - h
	}
	ctx.drawImage(video, x, y)
	let cvs2 = getCanvas(w, h)
	let ctx2 = cvs2.getContext('2d')
	ctx2.drawImage(cvs, 0, 0, w, h, 0, 0, w, h)
	// 返回cvs2
	let base64Data = cvs2.toDataURL('image/jpeg')
	let imageData = cvs2.getContext('2d').getImageData(0, 0, obj.width, obj.height)
	console.log('base', base64Data)
	console.log('image', imageData)
	return {
		base64Data: base64Data,
		imageData: imageData.data,
		width: imageData.width,
		height: imageData.height
	}
}
