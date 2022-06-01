/* 系统公共方法
 * @Author: zhanzimao
 * @Date: 2022-01-25 20:59:30
 * @Last Modified by: zhanzimao
 * @Last Modified time: 2022-05-26 15:33:34
 */
import store from '@/store'

const media = {
	// 获取摄像头设备
	getUserMedia() {
		return new Promise((resolve, reject) => {
			navigator.mediaDevices
				.enumerateDevices()
				.then((devices) => {
					let ret = devices.filter((item) => {
						return item.kind == 'videoinput' && item.label == store.getters['app/config'].face.faceVideo
					})
					console.log('获取的人脸摄像头----', ret)
					let constraints = {}
					if (ret[0]?.deviceId) {
						constraints.video = { optional: [{ sourceId: ret[0].deviceId }] }
						navigator.mediaDevices
							.getUserMedia(constraints)
							.then((mediaStream) => {
								resolve(mediaStream)
							})
							.catch((err) => {
								console.error('摄像头获取异常!' + err)
								resolve(false)
							})
					} else {
						resolve(false)
					}
				})
				.catch((err) => {
					console.log('err', err)
					resolve(false)
				})
		})
	}
}

export { media }
