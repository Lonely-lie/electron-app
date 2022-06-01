<template>
	<div class="prompt-wrap">
		<div class="prompt-icon" v-if="!!params.type" :class="params.type"></div>
		<div class="prompt-message" :style="{ width: `${params.msgWidth}px`, height: `${params.msgHeight}px` }">{{ params.message }}</div>
		<div class="prompt-btn" v-if="params.showBtn">
			<el-button @click="rightBtn" :type="params.rightBtnType">{{ params.rightBtnText }}</el-button>
			<el-button class="btn" @click="leftBtn" :type="params.leftBtnType" v-if="params.showLeftBtn">{{ params.leftBtnText }}</el-button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['params'],
	data() {
		return {}
	},
	methods: {
		leftBtn() {
			if (this.params.leftBtnClose) {
				this.$parent.close('leftBtn')
			} else {
				this.params.callback({
					type: 'leftBtnClick'
				})
			}
		},
		rightBtn() {
			if (this.params.rightBtnClose) {
				this.$parent.close('rightBtn')
			} else {
				this.params.callback({
					type: 'rightBtnClick'
				})
			}
		}
	}
}
</script>
<style lang="less">
.prompt-outer {
	background: rgba(255, 255, 255, 1);
	min-width: auto;
	.x-dialog-header {
		border-bottom: 0;
		padding-right: 0;
		height: 45px;
		background: transparent !important;
		.x-dialog-close {
			margin: 0;
			font-size: 20px;
		}
	}

	.prompt-wrap {
		border-radius: 4px;
		padding: 95px 20px 10px;
		width: 720px;
		height: 430px;
		box-sizing: border-box;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		background-color: transparent;
		text-align: center;

		.prompt-header {
			position: relative;
			width: 100%;
			height: 20px;
			line-height: 20px;
		}

		.prompt-icon {
			background-position: center center;
			background-repeat: no-repeat;
			width: 128px;
			height: 128px;
			background-size: 100% 100%;
			margin: auto;
			// margin-top: 48px;
			&.confirm {
				display: inline-block;
				vertical-align: middle;
				background-image: url(~@/common/assets/images/components/prompt_warn.png);
			}
			&.warning {
				display: inline-block;
				vertical-align: middle;
				background-image: url(~@/common/assets/images/components/prompt_warn.png);
			}
			&.success {
				display: inline-block;
				vertical-align: middle;
				background-image: url(~@/common/assets/images/components/prompt_success.png);
			}
			&.error {
				display: inline-block;
				vertical-align: middle;
				background-image: url(~@/common/assets/images/components/prompt_warn.png);
			}
		}
		.prompt-message {
			text-align: center;
			font-weight: 400;
			word-break: break-all;
			font-size: 32px;
			margin-top: 45px;
			color: rgba(51, 51, 51, 1);
		}
		.prompt-btn {
			display: flex;
			padding-left: 160px;
			padding-right: 160px;
			justify-content: space-between;
			margin-top: 30px;
			.gxx-button {
				width: 160px;
				height: 56px;
				background: rgba(232, 93, 104, 1);
				border-radius: 4px;
				line-height: 56px;
				color: rgba(255, 255, 255, 1);
				.gxx-button-content {
					font-size: 24px;
					justify-content: center;
					align-items: center;
					padding: 0 41px;
				}
			}
			.btn {
				background: rgba(46, 145, 232, 1);
			}
		}
	}
}
</style>
