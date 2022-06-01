/**
 * 发送终端监听指令
 */
import store from '@/store'
let order = {}
const { ipcRenderer } = window.require('electron')
order = {
	getConfig() {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('read-config')
			ipcRenderer.on('get-config', (event, arg) => {
				resolve({ event, data: arg })
			})
		})
	},
	checkFace(faceObj) {
		return new Promise((resolve, reject) => {
			let result = ipcRenderer.sendSync('face_checkFace', JSON.stringify(faceObj.imageData), faceObj.width, faceObj.height)
			console.log('人脸结果-------', result)
			resolve(result)
		})
	}
}
export default order
