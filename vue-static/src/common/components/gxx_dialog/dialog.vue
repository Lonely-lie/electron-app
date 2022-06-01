<template>
	<div class="x-dialog-wrap">
		<div class="x-dialog-container layer-anim layer-anim-00" :class="wrapClass" v-drag="drag">
			<div class="x-dialog-header" v-show="showHeader" id="dragElement">
				<span class="x-dialog-title">{{ title }}</span>
				<i class="x-dialog-close el-icon-close" @click="close('close')" id="ignoreDrag" v-show="showHeaderClose"></i>
			</div>
			<div class="x-dialog-content" :class="contentClass">
				<component v-if="!!component" v-bind:is="component" :params="componentParams" @getReturn="getReturn"></component>
				<div v-if="!component" v-html="content"></div>
			</div>
			<div class="x-dialog-footer" v-show="showFooter">
				<button class="x-dialog-cancel" @click="close('cancel')">{{ cancelText }}</button>
				<button class="x-dialog-confirm" @click="close('confirm')">{{ confirmText }}</button>
			</div>
		</div>
	</div>
</template>

<script>
import dom from '@common/tools/dom_util'
export default {
	name: 'GxxDialog',
	data() {
		return {
			title: '标题',
			drag: {
				enabled: true,
				boundary: true
			},
			content: '',
			contentClass: '',
			wrapClass: '',
			component: null,
			componentParams: {},
			showHeader: true,
			showHeaderClose: true,
			showFooter: false,
			confirmText: '确定',
			cancelText: '取消',
			returnData: null
		}
	},
	directives: {
		drag(el, binding) {
			if (binding.value.enabled) {
				let { x, y } = binding.modifiers
				var offsetX, offsetY, clientX, clientY
				el.style.position = 'absolute'
				el.querySelector('#dragElement').style.cursor = 'move'
				el.addEventListener('mousedown', mousedown)
				function mousedown(e) {
					var parents = dom.parents(e.target)
					if (e.target.id == 'ignoreDrag' || dom.querySelector(parents, '#ignoreDrag').length != 0 || dom.querySelector(parents, '#dragElement').length == 0) {
						return
					}
					offsetX = e.offsetX
					offsetY = e.offsetY
					clientX = e.clientX
					clientY = e.clientY
					el.style.left = clientX - offsetX + 'px'
					el.style.top = clientY - offsetY + 'px'
					document.addEventListener('mousemove', mousemove)
					document.addEventListener('mouseup', mouseup)
				}
				function mousemove(e) {
					clientX = e.clientX
					clientY = e.clientY
					let left = 0,
						top = 0
					if (binding.value.boundary) {
						let width = el.clientWidth,
							height = el.clientHeight
						let clientHeight = document.body.clientHeight,
							clientWidth = document.body.clientWidth
						let tempLeft = clientX - offsetX,
							tempTop = clientY - offsetY
						if (tempLeft < 0) {
							left = 0
						} else if (clientWidth - tempLeft < width) {
							left = clientWidth - width
						} else {
							left = clientX - offsetX
						}
						if (tempTop < 0) {
							top = 0
						} else if (clientHeight - tempTop < height) {
							top = clientHeight - height
						} else {
							top = clientY - offsetY
						}
					} else {
						left = clientX - offsetX
						top = clientY - offsetY
					}
					el.style.left = left + 'px'
					el.style.top = top + 'px'
				}
				function mouseup(e) {
					document.removeEventListener('mousedown', mousedown)
					document.removeEventListener('mousemove', mousemove)
				}
			}
		}
	},
	methods: {
		show(cb) {
			var self = this
			typeof cb === 'function' && cb.call(this, this)
			this.on = new Promise((resolve) => {
				self.resolve = resolve
			})
			return this
		},
		close(type) {
			var ret = this.resolve({
				type: type,
				data: this.returnData
			})
			if (typeof ret == 'undefined' || ret == true) {
				this.hide()
			}
		},
		hide() {
			try {
				document.body.removeChild(this.$el)
				this.$destroy()
			} catch (err) {}
		},
		getReturn(data) {
			this.returnData = data
			this.$emit('message', { data })
		}
	}
}
</script>

<style lang="less">
.x-dialog-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.3);
	z-index: 2000;
}
.x-dialog-container {
	background: #dcecfa;
	box-shadow: 0px 6px 14px 0px rgba(6, 31, 88, 0.1);
	border-radius: 4px;
	min-width: 300px;
}
.layer-anim {
	animation-fill-mode: both;
	animation-duration: 0.3s;
}
@keyframes layer-bounceIn {
	0% {
		opacity: 0;
		transform: scale(0.5);
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
}

.layer-anim-00 {
	animation-name: layer-bounceIn;
}
.x-dialog-header {
	height: 40px;
	position: relative;
	padding-right: 40px;
	box-sizing: border-box;
	font-weight: 700;
}
.x-dialog-title {
	line-height: 40px;
	height: 40px;
	padding-left: 10px;
	display: block;
}
.x-dialog-close {
	position: absolute;
	right: 0;
	top: 0;
	width: 40px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	color: #5f709a;
	font-size: 18px;
	font-weight: 700;
}
.x-dialog-close:hover {
	color: #fe2e2e;
}
.x-dialog-close:active {
	color: #cd100f;
}
.x-dialog-footer {
	/* height: 58px; */
	padding: 10px;
	/* line-height: 58px; */
	/* border-top: solid 1px #eee; */
	text-align: center;
	box-sizing: border-box;
	button + button {
		margin-left: 20px;
	}
}
.x-dialog-footer button {
	padding: 6px 15px;
	font-family: 'Microsoft Yahei', sans-serif;
	border-radius: 4px;
	margin-left: 10px;
	height: 30px;
	cursor: pointer;
	background: #8ca0cf;
	border: 1px solid #dcdfe6;
	color: #fff;
}
.x-dialog-cancel:hover {
	border-color: #abbfee;
	background-color: #abbfee;
}
.x-dialog-cancel:active {
	border-color: #8ba4e0;
	background-color: #8ba4e0;
}
.x-dialog-confirm {
	color: #fff !important;
	background-color: #2b5fda !important;
	border-color: #2b5fda !important;
}
.x-dialog-confirm:hover {
	background: #497fff !important;
	border-color: #497fff !important;
	color: #fff;
}
.x-dialog-confirm:active {
	background: #356ced !important;
	border-color: #356ced !important;
	color: #fff;
}
</style>
