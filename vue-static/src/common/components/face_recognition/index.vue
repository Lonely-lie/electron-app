<template>
	<div class="faceBox">
		<div class="title">人脸记录</div>
		<div class="face-content">
			<div class="videoBox" :style="{ transform: `rotate(${obj.rotate}deg)` }">
				<video id="faceVideo" autoplay></video>
			</div>
			<div class="loading-bg" :class="{ 'loading-rotate': isOn }"></div>
		</div>
	</div>
</template>
<script>
import { media } from '@serve'
import { getImgFromVideo } from '@tools/utils'
export default {
	name: 'face-recognition',
	data() {
		return {
			isOn: true,
			videoStream: null,
			faceStatus: 0, // 0初始化，1倒数，2拍照分析，3完成
			obj: {
				width: 480,
				height: 480,
				video: 'faceVideo',
				rotate: 270
			},
			faceImg: {}
		}
	},
	mounted() {
		this.startVideo()
		this.obj.rotate = this.$store.getters['app/config'].face?.rotate || 270
	},
	methods: {
		// 开始播放摄像头流
		startVideo() {
			media.getUserMedia().then(
				(mediaStream) => {
					if (!mediaStream) {
						this.$basePrompt.info({
							type: 'confirm',
							showBtn: true,
							message: '摄像头设备异常,请检查摄像头!',
							callback: (ret) => {}
						})
						return
					}
					this.mediaStream = mediaStream
					try {
						document.getElementById('faceVideo').srcObject = mediaStream
					} catch (error) {
						document.getElementById('faceVideo').src = URL.createObjectURL(mediaStream)
					}
					setTimeout(() => {
						// this.faceStatus = 1
						this.cutVedio()
						this.checkFace()
					}, 3000)
				},
				(ret) => {
					console.log(ret)
				}
			)
		},
		checkFace() {
			console.log(this.faceImg)
			this.$electronServe.checkFace(this.faceImg).then((r) => {
				console.log('人脸检测结果-------', r)
			})
		},
		// 停止播放流
		stopVideo() {
			this.mediaStream?.getTracks().forEach(function (track) {
				track.stop()
			})
		},
		// 抓怕图片
		cutVedio() {
			this.faceImg = getImgFromVideo(this.obj)
		}
	}
}
</script>
<style lang="less" scoped>
.faceBox {
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-bottom: 95px;
	width: 800px;
	margin: auto;
	border-radius: 10px;
	.title {
		color: rgba(255, 255, 255, 1);
		font-size: 44px;
		font-weight: 600;
		text-align: center;
		height: 45px;
		margin-bottom: 50px;
	}
	.face-content {
		position: relative;
		.videoBox {
			width: 384px;
			height: 384px;
			background-color: red;
			border-radius: 192px;
			#faceVideo {
				width: 100%;
				height: 100%;
				border-radius: 192px;
				object-fit: fill;
			}
		}
		.loading-bg {
			width: 384px;
			height: 384px;
			position: absolute;
			top: 0;
			left: 0;
			background-size: 100% 100%;
			border-radius: 192px;
			&.loading-rotate {
				animation: circling 1.2s linear 0s infinite;
				background-image: url('~@/common/assets/images/components/face/roatIcon.png');
			}
		}
	}
}
@keyframes circling {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
